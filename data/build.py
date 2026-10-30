"""Build the linked Schependomlaan tables from the original dataset.

    python3 data/build.py            # downloads the three source files it needs
    python3 data/build.py --src DIR  # or reads them from a checkout of the original

Standard library only. The source is the Schependomlaan dataset in
buildingSMART's Community-Sample-Test-Files repository, pinned to one commit
so the tables are reproducible. Writes data/linked/:

  tasks.csv          the contractor's schedule (Microsoft Project XML, 18 Feb 2015)
  elements.csv       every building element the event log mentions
  element_tasks.csv  which task built which element, planned dates, on time or late
  task_match.csv     how each event-log task was matched to the schedule
  summary.json       counts, dates and checks, for the article and the tests
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import io
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

REPO = "buildingsmart-community/Community-Sample-Test-Files"
COMMIT = "ca3a8e2b94ef79f1a8b28ca0863a7477fb1dd92d"
BASE = "IFC 2.3.0.1 (IFC 2x3)/Schependomlaan"
SOURCES = {
    "schedule": "Planning/XML/Uitvoering Schependomlaan 18-02-2015.xml",
    "eventlog": "Event log/Eventlog with As Built information/"
                "Schependomlaan eventlog as planned data incl as built data.csv",
    "eventlog_planned": "Event log/Eventlog As Planned/eventlog IFC schependomlaan.csv",
}
OUT = Path(__file__).resolve().parent / "linked"
NS = {"p": "http://schemas.microsoft.com/project"}


def read_source(key: str, src: Path | None) -> str:
    rel = f"{BASE}/{SOURCES[key]}"
    if src:
        return (src / SOURCES[key]).read_text(encoding="utf-8-sig")
    url = (f"https://raw.githubusercontent.com/{REPO}/{COMMIT}/"
           + urllib.parse.quote(rel))
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read().decode("utf-8-sig")


def iso(d: str) -> str:
    """Event-log dates are day-month-year (26-2-2015)."""
    return dt.datetime.strptime(d, "%d-%m-%Y").date().isoformat() if d else ""


def schedule(xml: str) -> list[dict]:
    root = ET.fromstring(xml)
    by_uid, tasks = {}, []
    for t in root.findall("p:Tasks/p:Task", NS):
        g = lambda k: (t.findtext(f"p:{k}", "", NS) or "").strip()
        preds = [p.findtext("p:PredecessorUID", "", NS)
                 for p in t.findall("p:PredecessorLink", NS)]
        row = {
            "uid": g("UID"), "id": g("ID"), "outline": g("OutlineNumber"),
            "level": g("OutlineLevel"), "name_nl": g("Name"),
            "summary": g("Summary") == "1", "milestone": g("Milestone") == "1",
            "start": g("Start")[:10], "finish": g("Finish")[:10],
            "duration_days": round(_hours(g("Duration")) / 8, 2),
            "predecessors": " ".join(p for p in preds if p),
        }
        if row["uid"] == "0":          # the project summary row
            continue
        by_uid[row["uid"]] = row
        tasks.append(row)
    return tasks


def _hours(iso_duration: str) -> float:
    """PT16H0M0S -> 16.0"""
    m = re.fullmatch(r"PT(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?", iso_duration)
    if not m:
        return 0.0
    h, mi, se = (float(x or 0) for x in m.groups())
    return h + mi / 60 + se / 3600


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", type=Path, help="a checkout's Schependomlaan folder")
    args = ap.parse_args()

    tasks = schedule(read_source("schedule", args.src))
    rows = list(csv.DictReader(io.StringIO(read_source("eventlog", args.src))))
    planned = list(csv.DictReader(io.StringIO(read_source("eventlog_planned", args.src))))

    # Elements: one row per GUID, from both logs (the as-built log is a superset).
    elements: dict[str, dict] = {}
    for r in rows + [{**p, "IfcClass": "Ifc" + p["ifcClass"]} for p in planned]:
        g = r["GUID"]
        if not g or g in elements:
            continue
        code, _, label = r["Nl-sfb"].partition("_")
        elements[g] = {"guid": g, "ifc_class": r["IfcClass"], "nlsfb_code": code,
                       "nlsfb_label_nl": label, "material": r["Material"],
                       "resource": r.get("Resource", "")}

    # Event-log tasks (Synchro ids, ST00060…) matched to the schedule by name,
    # then by dates: 64 match exactly, the rest by name with moved dates.
    leaf = [t for t in tasks if not t["summary"]]
    synchro: dict[str, dict] = {}
    for r in rows:
        if r["TaskID"] and r["TaskID"] not in synchro:
            synchro[r["TaskID"]] = {"name": r["TaskName"].strip(),
                                    "start": iso(r["TaskStart"]), "finish": iso(r["TaskFinish"])}
    matches = []
    for sid, s in sorted(synchro.items()):
        same = [t for t in leaf if t["name_nl"].lower() == s["name"].lower()]
        exact = [t for t in same if t["start"] == s["start"] and t["finish"] == s["finish"]]
        if exact:
            t, how = exact[0], "name and dates"
        elif same:
            # nearest start date among same-named tasks
            t = min(same, key=lambda t: abs((dt.date.fromisoformat(t["start"])
                                             - dt.date.fromisoformat(s["start"])).days))
            how = "name, nearest date"
        else:
            t, how = None, "none"
        matches.append({"synchro_task": sid, "name_nl": s["name"],
                        "eventlog_start": s["start"], "eventlog_finish": s["finish"],
                        "schedule_uid": t["uid"] if t else "", "schedule_start": t["start"] if t else "",
                        "schedule_finish": t["finish"] if t else "", "matched_by": how})
    uid_of = {m["synchro_task"]: m["schedule_uid"] for m in matches}

    links = []
    for r in rows:
        if not r["TaskID"]:
            continue
        links.append({"guid": r["GUID"], "synchro_task": r["TaskID"],
                      "schedule_uid": uid_of.get(r["TaskID"], ""),
                      "task_name_nl": r["TaskName"].strip(),
                      "planned_start": iso(r["TaskStart"]), "planned_finish": iso(r["TaskFinish"]),
                      "as_built": {"On time": "on_time", "Too late": "late"}.get(
                          r["Element on time or not"], "")})

    OUT.mkdir(exist_ok=True)
    write(OUT / "tasks.csv", tasks)
    write(OUT / "elements.csv", sorted(elements.values(), key=lambda e: e["guid"]))
    write(OUT / "element_tasks.csv", links)
    write(OUT / "task_match.csv", matches)

    linked = {l["guid"] for l in links}
    summary = {
        "source": {"repository": REPO, "commit": COMMIT, "files": SOURCES},
        "schedule": {"tasks": len(tasks), "leaf_tasks": len(leaf),
                     "start": min(t["start"] for t in tasks), "finish": max(t["finish"] for t in tasks)},
        "elements": len(elements), "elements_with_tasks": len(linked),
        "element_task_links": len(links),
        "as_built": dict(Counter(l["as_built"] or "unknown" for l in links)),
        "late_by_task": Counter(f'{l["synchro_task"]} {l["task_name_nl"]}'
                                for l in links if l["as_built"] == "late").most_common(),
        "eventlog_tasks": len(synchro),
        "task_matching": dict(Counter(m["matched_by"] for m in matches)),
        "ifc_classes": dict(Counter(e["ifc_class"] for e in elements.values()).most_common()),
    }
    (OUT / "summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({k: summary[k] for k in ("schedule", "elements", "elements_with_tasks",
                                              "element_task_links", "as_built", "task_matching")}, indent=1))


def write(path: Path, rows: list[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)


if __name__ == "__main__":
    sys.exit(main())
