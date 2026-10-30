---
type: Finding
title: Facade-setting and frame tasks share their elements
sources:
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
  - id: scans
    resource: sources/2015-07-26-scan-comparisons-weeks-26-30.md
  - id: schedule
    resource: sources/2015-02-18-schedule.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Facade-setting and frame tasks share their elements

Two tasks with different names carry identical figures in the event log:[^eventlog]

| Task id | Task (Dutch) | Task (English) | Planned | Elements | On time | Late | Main element types |
|---|---|---|---|---|---|---|---|
| ST00950 | Stelwerk buitengevel | Setting outer facade elements | 2015-07-02 to 2015-07-08 | 171 | 121 | 50 | Window 153, Door 18 |
| ST00980 | Plaatsen kozijnen | Install window and door frames | 2015-07-06 to 2015-07-10 | 171 | 121 | 50 | Window 153, Door 18 |

The scans agree: in weeks 27, 28 and 29 the missing elements matched to Stelwerk buitengevel and to Plaatsen kozijnen are the same number each week (50, 31, 14).[^scans]

A similar overlap exists one run earlier: ST00940 Stelwerk buitengevel (Wall 144, WallStandardCase 21) and ST01050 Metselwerk (Wall 144, Covering 115, WallStandardCase 21).[^eventlog]

**Consequence for counting.** The event log has 3661 links for 2358 elements, so an element can link to more than one task; the 194 late links therefore need not be 194 distinct late elements.[^eventlog] The 50 late links of ST00950 and the 50 of ST00980 may be the same 50 windows and doors; the sources show identical counts but do not list element ids here.

The third Stelwerk buitengevel run in the schedule (2015-07-16 to 2015-07-22) has no counterpart in the event log.[^schedule][^eventlog]

Why the 4D model links window and door elements to a facade-setting task is not stated in any source; see [open questions](../open-questions.md).

[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^schedule]: sources/2015-02-18-schedule.md
