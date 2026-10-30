"""Write the raw material for the project notebook, from the original dataset.

    python3 data/notebook_sources.py SRC     SRC = a checkout's Schependomlaan folder

Writes notebook/sources/: plain files an assistant can read, one per kind of
record, each dated. They restate the dataset; nothing is interpreted here.
People's names (BCF comment authors) are left out. Standard library only.
"""
from __future__ import annotations

import csv
import glob
import html
import json
import re
import sys
import zipfile
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "notebook" / "sources"


def rows(name):
    with (HERE / "linked" / name).open(encoding="utf-8") as f:
        return list(csv.DictReader(f))


def glossary():
    with (HERE / "glossary-tasks.csv").open(encoding="utf-8") as f:
        return {r["name_nl"]: r["name_en"] for r in csv.DictReader(f)}


def schedule(en):
    lines = ["# Contractor's schedule, version of 18 February 2015",
             "",
             "Source: `Planning/XML/Uitvoering Schependomlaan 18-02-2015.xml` (Microsoft Project XML).",
             "Planned dates as of 18 February 2015. Names in Dutch, with Collegica's English translation.",
             "",
             "| UID | Task (Dutch) | Task (English) | Start | Finish | Working days | Predecessors (UIDs) |",
             "|---|---|---|---|---|---|---|"]
    for t in rows("tasks.csv"):
        lines.append(f"| {t['uid']} | {t['name_nl']} | {en.get(t['name_nl'], '')} | {t['start']} | {t['finish']} "
                     f"| {t['duration_days']} | {t['predecessors']} |")
    return "\n".join(lines) + "\n"


def eventlog(en):
    links = rows("element_tasks.csv")
    match = {m["synchro_task"]: m for m in rows("task_match.csv")}
    elems = {e["guid"]: e for e in rows("elements.csv")}
    by_task = defaultdict(list)
    for l in links:
        by_task[l["synchro_task"]].append(l)
    lines = ["# 4D event log: which task built which element, and the as-built check",
             "",
             "Source: `Event log/Eventlog with As Built information/...csv` (exported from the 4D model in Synchro).",
             "Each row of the original links one model element (IFC GUID) to one task, with the task's planned",
             "dates in the 4D model, and says whether the element was in place on time (`On time` / `Too late`).",
             "The log records whether an element was late, not by how many days.",
             "",
             f"In total: {len(links)} element-task links, {len({l['guid'] for l in links})} elements, "
             f"{len(by_task)} tasks. On time: {sum(l['as_built'] == 'on_time' for l in links)}; "
             f"late: {sum(l['as_built'] == 'late' for l in links)}.",
             "",
             "| Task id | Task (Dutch) | Task (English) | Planned in 4D model | Planned in 18 Feb schedule | Elements | On time | Late | Main element types |",
             "|---|---|---|---|---|---|---|---|---|"]
    for tid, ls in sorted(by_task.items(), key=lambda kv: kv[1][0]["planned_start"]):
        m = match[tid]
        types = Counter(elems[l["guid"]]["ifc_class"].removeprefix("Ifc") for l in ls).most_common(3)
        sched = f"{m['schedule_start']} to {m['schedule_finish']}" if m["schedule_uid"] else "not found"
        lines.append(f"| {tid} | {ls[0]['task_name_nl']} | {en.get(ls[0]['task_name_nl'], '')} "
                     f"| {ls[0]['planned_start']} to {ls[0]['planned_finish']} | {sched} | {len(ls)} "
                     f"| {sum(l['as_built'] == 'on_time' for l in ls)} | {sum(l['as_built'] == 'late' for l in ls)} "
                     f"| {', '.join(f'{c} {n}' for c, n in types)} |")
    return "\n".join(lines) + "\n"


def cell_rows(z, sheet, shared):
    x = z.read(sheet).decode("utf-8")
    out = []
    for r in re.findall(r"<row[^>]*>(.*?)</row>", x, re.S):
        vals = []
        for attrs, v in re.findall(r'<c r="[A-Z]+\d+"([^>]*)>(?:<f>.*?</f>)?(?:<v>(.*?)</v>)?', r, re.S):
            vals.append(shared[int(v)] if 't="s"' in attrs and v else v)
        out.append(vals)
    return out


def scans(src: Path):
    z = zipfile.ZipFile(src / "Comparison As Planned As Built" / "comparison_all weeks.xlsx")
    shared = [html.unescape(re.sub(r"<[^>]+>", "", m)) for m in
              re.findall(r"<si>(.*?)</si>", z.read("xl/sharedStrings.xml").decode("utf-8"), re.S)]
    names = re.findall(r'<sheet name="([^"]+)"', z.read("xl/workbook.xml").decode("utf-8"))
    elems = {e["guid"]: e for e in rows("elements.csv")}
    by_resource = {e["resource"]: e["guid"] for e in elems.values() if e["resource"]}
    task_of = defaultdict(set)
    for l in rows("element_tasks.csv"):
        task_of[l["guid"]].add(l["task_name_nl"])
    lines = ["# Weekly laser scans compared with the planned model, weeks 26 to 30 of 2015",
             "",
             "Source: `Comparison As Planned As Built/comparison_all weeks.xlsx`. For each week, the elements",
             "the 4D model planned to be in place that were not found in that week's point cloud",
             "(laser scan of the site). Weeks 26 to 30 run from 22 June to 26 July 2015.",
             ""]
    for i, week in sorted(enumerate(names), key=lambda x: int(x[1])):
        data = cell_rows(z, f"xl/worksheets/sheet{i + 1}.xml", shared)[2:]
        data = [d for d in data if len(d) >= 4 and d[3]]
        kinds = Counter(re.sub(r"_\(#\d+\)$", "", d[0]).split(" ")[0] for d in data)
        # The weekly exports carry new GUIDs; the resource name ("merk C_(#685294)") is stable.
        linked = [by_resource[d[0]] for d in data if d[0] in by_resource]
        tasks = Counter(t for g in linked for t in task_of[g])
        lines += [f"## Week {week}", "",
                  f"{len(data)} planned elements missing from the scan. By name prefix: "
                  + ", ".join(f"{k} {n}" for k, n in kinds.most_common()) + ".",
                  f"{len(linked)} of them matched to the event log by name; their tasks: "
                  + (", ".join(f"{t} ({n})" for t, n in tasks.most_common()) or "none") + ".", ""]
    return "\n".join(lines) + "\n"


def clashes(src: Path):
    lines = ["# Model coordination checks (BCF issues), March to June 2015",
             "",
             "Source: the `.bcfzip` files under `Coordination model and subcontractors models/Checks/BCF/`",
             "and `Design model IFC/`. Each file is one check of a subcontractor's model against the design",
             "model; each issue has the checker's comments (in Dutch, quoted as written). Authors' names omitted.",
             ""]
    total = 0
    def when(p):
        m = re.search(r"(\d\d)-(\d\d)-(\d{4})", p)
        return m.group(3) + m.group(2) + m.group(1) if m else "0"
    for f in sorted(glob.glob(str(src / "**" / "*.bcfzip"), recursive=True), key=when):
        z = zipfile.ZipFile(f)
        name = Path(f).stem
        issues = []
        for n in sorted(x for x in z.namelist() if x.endswith("markup.bcf")):
            x = z.read(n).decode("utf-8", "replace")
            title = html.unescape((re.search(r"<Title>(.*?)</Title>", x, re.S) or [None, ""])[1]).strip()
            comments = [html.unescape(c).strip() for c in re.findall(r"<Comment>(.*?)</Comment>", x, re.S) if c.strip()]
            party = (re.findall(r"<VerbalStatus>(.*?)</VerbalStatus>", x) or [""])[0]
            issues.append((title, party, comments))
        total += len(issues)
        lines += [f"## {name}", "", f"{len(issues)} issues."]
        for title, party, comments in issues:
            text = " / ".join(dict.fromkeys(comments)) or title
            lines.append(f"- {text}" + (f" (addressed to: {party})" if party else ""))
        lines.append("")
    lines.insert(5, f"{total} issues in {len(glob.glob(str(src / '**' / '*.bcfzip'), recursive=True))} check files.\n")
    return "\n".join(lines) + "\n"


def main(src: Path):
    OUT.mkdir(parents=True, exist_ok=True)
    en = glossary()
    files = {
        "2015-02-18-schedule.md": schedule(en),
        "2015-10-15-event-log-by-task.md": eventlog(en),
        "2015-07-26-scan-comparisons-weeks-26-30.md": scans(src),
        "2015-06-19-coordination-checks.md": clashes(src),
    }
    readme = (src / "README.md").read_text(encoding="utf-8")
    files["2020-06-08-dataset-readme.md"] = "# The dataset's own README (as published)\n\n" + readme
    for name, text in files.items():
        (OUT / name).write_text(text, encoding="utf-8")
        print(f"{name}: {len(text):,} characters")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
