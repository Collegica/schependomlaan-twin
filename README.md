# Schependomlaan Twin

Replay the construction of a real building, element by element. Schependomlaan
is a housing project in Nijmegen, the Netherlands, built in 2015 and
documented as an open dataset by TU Eindhoven with the contractor and its
partners. This app joins three parts of that dataset:

- the contractor's **as-planned 3D model** (IFC), 3,505 elements;
- the **schedule** and the **event log** that link 2,358 elements to the
  tasks that built them, with planned dates;
- the **as-built check**: for each element and task, on time or late
  (3,467 on time, 194 late).

Drag the timeline through 2015 and the building assembles itself: work under
way in amber, finished work in teal, work the as-built check flagged late in
red. Click an element for its tasks; pick a late task to see where it ran late.

It's a replay, not a live twin: a twin in the strict sense stays in sync with
the building through live data. This is the record of one, which is where a
construction company's own twin starts.

## The data

| Folder | What it is | Made by |
|---|---|---|
| `data/linked/` | The linked tables: `tasks.csv`, `elements.csv`, `element_tasks.csv`, `task_match.csv`, `summary.json` | `python3 data/build.py` |
| `data/glossary-*.csv` | English names for the Dutch task names and NL-SfB building codes (Collegica's translation, not reviewed by the project team) | by hand |
| `model/model.bin`, `model/model.json` | The planned model's geometry, packed for the web: quantised positions, an element index per vertex, triangle indices; per element its IFC GUID and colour | `python3 data/geometry.py <glb>` |
| `model/twin.json` | Per element, in the geometry's order: type, building code, material, and its tasks with planned dates and as-built status | `python3 data/twin.py` |

The source is pinned to one commit of buildingSMART's
[Community-Sample-Test-Files](https://github.com/buildingsmart-community/Community-Sample-Test-Files)
(`IFC 2.3.0.1 (IFC 2x3)/Schependomlaan`). The geometry comes from
`IFC Schependomlaan incl planningsdata.ifc`, converted with IfcOpenShell's
IfcConvert 0.9.0 (`--use-element-guids`); its element GUIDs match the event
log (2,358 of 2,359), the design model's do not. The event log's 72 tasks
match the schedule's 157 by name and dates (64) or by name with moved dates
(8); `task_match.csv` records which.

Everything in `data/` and `model/` is standard-library Python; the viewer
(`src/viewer.js`) is plain WebGL2. No dependencies.

## Credits and licence

**The data** is derived from the *Schependomlaan* dataset, gathered for Stijn
van Schaijk's master's thesis at the Information Systems for the Built
Environment group, TU Eindhoven, with Hendriks Bouw en Ontwikkeling, ROOT, TNO
and RAAMAC, and published in buildingSMART's
[Community-Sample-Test-Files](https://github.com/buildingsmart-community/Community-Sample-Test-Files)
(folder `IFC 2.3.0.1 (IFC 2x3)/Schependomlaan`) under the
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
The dataset's own README adds that its owners gave permission for
scientific and academic use.

**What we changed:** the as-planned model converted to glTF and re-packed
for the web (`model/`); the schedule, event log and scan comparisons joined
into tables (`data/linked/`); Dutch task names and NL-SfB labels translated
into English (`data/glossary-*.csv`); the records restated as notebook
sources, without the coordination comments' authors, and a notebook written
from them by an AI assistant (`notebook/`). Everything in `data/`, `model/`
and `notebook/` is released under CC BY 4.0, crediting the people and
organisations above. If you are one of them and want something corrected or
removed, please open an issue.

**Our code** (`src/`, `scripts/`, the `.py` files in `data/`) is MIT. See
[`LICENSE`](LICENSE).

## Run and test

Node 22, nothing to install.

```bash
npm start          # http://localhost:8000/
npm test           # the embedding contract, and the timeline against the data
npm run build      # dist/schependomlaan-twin-web.tar.gz
```
