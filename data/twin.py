"""Join the linked tables to the geometry for the app.

    python3 data/twin.py      (after build.py and geometry.py)

Writes model/twin.json: tasks with English names, and for each element in
model.json's order its type, building code, material and the tasks that
built it, each with its planned dates and whether the as-built check found
it on time or late. Standard library only.
"""
from __future__ import annotations

import csv
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
LINKED = HERE / "linked"
MODEL = HERE.parent / "model"


def rows(name: str) -> list[dict]:
    with (LINKED / name).open(encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> None:
    names = {r["name_nl"]: r["name_en"] for r in csv.DictReader((HERE / "glossary-tasks.csv").open(encoding="utf-8"))}
    codes = {r["code"]: {"nl": r["label_nl"], "en": r["label_en"]}
             for r in csv.DictReader((HERE / "glossary-nlsfb.csv").open(encoding="utf-8"))}
    model = json.loads((MODEL / "model.json").read_text())
    elements = {e["guid"]: e for e in rows("elements.csv")}
    links = rows("element_tasks.csv")

    task_ids = sorted({l["synchro_task"] for l in links})
    first = {}
    for l in links:
        t = first.setdefault(l["synchro_task"], l)
    tasks = []
    for tid in task_ids:
        l = first[tid]
        nl = l["task_name_nl"]
        tasks.append({"id": tid, "nl": nl, "en": names.get(nl, nl),
                      "start": l["planned_start"], "finish": l["planned_finish"]})
    index = {t["id"]: i for i, t in enumerate(tasks)}

    by_guid: dict[str, list] = {}
    for l in links:
        by_guid.setdefault(l["guid"], []).append(
            [index[l["synchro_task"]], {"on_time": 0, "late": 1}.get(l["as_built"], -1)])

    classes: list[str] = []
    out = []
    missing = 0
    for e in model["elements"]:
        meta = elements.get(e["guid"])
        if meta is None:
            missing += 1
            meta = {"ifc_class": "", "nlsfb_code": "", "material": ""}
        c = meta["ifc_class"].removeprefix("Ifc")
        if c not in classes:
            classes.append(c)
        out.append({"c": classes.index(c), "s": meta["nlsfb_code"], "m": meta["material"],
                    "t": sorted(by_guid.get(e["guid"], []), key=lambda x: tasks[x[0]]["start"])})

    starts = [t["start"] for t in tasks]
    finishes = [t["finish"] for t in tasks]
    twin = {
        "project": "Schependomlaan, Nijmegen (2015)",
        "range": {"start": min(starts), "finish": max(finishes)},
        "classes": classes, "codes": codes, "tasks": tasks, "elements": out,
    }
    (MODEL / "twin.json").write_text(json.dumps(twin, ensure_ascii=False, separators=(",", ":")) + "\n")
    with_tasks = sum(1 for e in out if e["t"])
    late = sum(1 for e in out if any(x[1] == 1 for x in e["t"]))
    print(f"{len(out)} elements ({missing} without metadata), {with_tasks} with tasks, "
          f"{late} flagged late; {len(tasks)} tasks, {twin['range']}")


if __name__ == "__main__":
    main()
