---
type: Overview
title: Schependomlaan at a glance
sources:
  - id: schedule
    resource: sources/2015-02-18-schedule.md
  - id: checks
    resource: sources/2015-06-19-coordination-checks.md
  - id: scans
    resource: sources/2015-07-26-scan-comparisons-weeks-26-30.md
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
  - id: readme
    resource: sources/2020-06-08-dataset-readme.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Schependomlaan at a glance

Schependomlaan is a project in Nijmegen (the coordination model file is *Schependomlaan Nijmegen.tbp*).[^readme] Its data were collected for a master thesis at the ISBE group of TU Eindhoven, with Hendriks Bouw en Ontwikkeling, ROOT, TNO and RAAMAC.[^readme] The design model was made in Archicad by ROOT bv, by order of Hendriks Bouw en Ontwikkeling.[^readme]

## Planned timeline (schedule of 18 February 2015)

The contractor's schedule of 18 February 2015 has five phases:[^schedule]

| Phase | First planned task starts | Last planned task finishes | Page |
|---|---|---|---|
| UITVOERING (construction) | 2015-02-19 (NUTS aanslutingen, utility connections) | 2015-08-20 (Stort, concrete pour) | [Construction](phases/uitvoering-construction.md) |
| GEVEL (facade) | 2015-06-16 (Stelwerk buitengevel, setting outer facade elements) | 2015-08-25 (Metselwerk, brickwork) | [Facade](phases/gevel-facade.md) |
| DAK (roof), with the tasks listed under it up to AFBOUW | 2015-07-10 (Maatvoering kap, setting out roof) | 2015-12-10 (Buiteninrichting, external works) | [Roof](phases/dak-roof.md) |
| AFBOUW (finishing) | 2015-09-04 | 2015-12-01 | [Finishing and handover](phases/afbouw-opleveren-finishing-handover.md) |
| OPLEVEREN (handover) | 2015-12-03 (Voorschouw, pre-handover inspection) | 2015-12-17 (Opleveren, handover) | [Finishing and handover](phases/afbouw-opleveren-finishing-handover.md) |

## What happened, as far as the records say

- **Before construction:** 102 coordination issues in 23 check files compared subcontractor models with the design model, March to June 2015.[^checks] See [the coordination issue log](issue-log/coordination-checks.md).
- **On time or late:** the 4D event log links 2358 elements to 72 tasks in 3661 element-task links; 3467 links were on time and 194 late.[^eventlog] Every late link belongs to a task planned to start on or after 2015-06-18.[^eventlog] See [Late elements are all in tasks from 18 June 2015 on, mostly the facade](findings/late-elements-facade-and-roof.md).
- **Missing from the site:** laser scans of weeks 26 to 30 found 9, 50, 89, 18 and 4 planned elements missing.[^scans] See the week pages ([26](weeks/2015-w26.md), [27](weeks/2015-w27.md), [28](weeks/2015-w28.md), [29](weeks/2015-w29.md), [30](weeks/2015-w30.md)).

The records give planned dates and on-time/late flags; they do not give actual build dates or the length of any delay.[^eventlog] What is unclear is listed in [open questions](open-questions.md).

[^schedule]: sources/2015-02-18-schedule.md
[^checks]: sources/2015-06-19-coordination-checks.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^readme]: sources/2020-06-08-dataset-readme.md
