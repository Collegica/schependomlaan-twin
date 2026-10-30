---
type: Overview
title: What the dataset contains and how far to trust it
sources:
  - id: readme
    resource: sources/2020-06-08-dataset-readme.md
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
  - id: scans
    resource: sources/2015-07-26-scan-comparisons-weeks-26-30.md
  - id: checks
    resource: sources/2015-06-19-coordination-checks.md
  - id: schedule
    resource: sources/2015-02-18-schedule.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T17:52:00-04:00
verified: []
stale_after: 2027-04-30
---

# What the dataset contains and how far to trust it

The published dataset holds: the design model (.IFC and Archicad .PLA); clash-detection issues in BCF and Tekla BIMsight packages; subcontractor models in .IFC and .DWG (flooring, walls, stairs, fencing, steel, roofs, prefab); coordination models; the schedule in .pdf and .xml; as-planned models in .IFC and Synchro format; as-built point clouds; the as-planned/as-built comparison; and event logs.[^readme] Data owners allowed its use for scientific and academic purposes.[^readme]

The README warns: *"Some files contain some errors and therefore have to be treated carefully."*[^readme]

## How each record in `sources/` was made

| Record in this notebook | Made from | Notes |
|---|---|---|
| Schedule of 18 February 2015 | `Uitvoering Schependomlaan 18-02-2015.xml`, Microsoft Project XML[^schedule] | Planned dates only. |
| Coordination checks | `.bcfzip` files[^checks] | The README says a quality check was run on the design model with Solibri Model Checker, and subcontractor models were checked in Tekla BIMsight during engineering.[^readme] Some subcontractors delivered .DWG instead of IFC.[^readme] |
| 4D event log | CSV exported from the 4D model in Synchro[^eventlog] | Says *whether* an element was in place on time, not by how many days.[^eventlog] |
| Scan comparisons, weeks 26–30 | `comparison_all weeks.xlsx`[^scans] | Point clouds from drone video of weeks 26, 27, 28, 29 and 30, made with structure-from-motion by RAAMAC; compared with the as-planned IFC by a Matlab algorithm by RAAMAC.[^readme] |

## Known limits

- **Synchro export changed the IFC.** The elevation tree and the property sets changed on export; original property sets were merged into one `SynchroResourcePropertyset`.[^readme]
- **As-planned snapshots.** As-planned models were exported for week 26 (26 june), week 27 (3 july), week 28 (10 july), week 29 (17 july), week 30 (24 july) and week 37 (11 sept).[^readme] Only weeks 26–30 have scan comparisons in this notebook.[^scans]
- **Fake actors.** One event log adds actors; the README says *"Those actors are fake and not realistic."*[^readme] This notebook does not use it.
- **Two dates per task.** The event log carries both the 4D-model dates and the 18 February schedule dates, and they differ for some tasks. See [4D model dates differ from the 18 February schedule](findings/4d-model-vs-schedule-dates.md).

[^readme]: sources/2020-06-08-dataset-readme.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^checks]: sources/2015-06-19-coordination-checks.md
[^schedule]: sources/2015-02-18-schedule.md
