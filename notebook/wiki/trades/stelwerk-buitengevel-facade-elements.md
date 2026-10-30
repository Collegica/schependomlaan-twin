---
type: Trade
title: Stelwerk buitengevel (setting outer facade elements)
sources:
  - id: schedule
    resource: sources/2015-02-18-schedule.md
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
  - id: scans
    resource: sources/2015-07-26-scan-comparisons-weeks-26-30.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Stelwerk buitengevel (setting outer facade elements)

The schedule has three runs of Stelwerk buitengevel; the event log has two.[^schedule][^eventlog] The second run had 50 late element-task links.[^eventlog]

| Task id | Planned | Elements | On time | Late | Main element types |
|---|---|---|---|---|---|
| ST00940 | 2015-06-16 to 2015-06-22 | 165 | 165 | 0 | Wall 144, WallStandardCase 21 |
| ST00950 | 2015-07-02 to 2015-07-08 | 171 | 121 | 50 | Window 153, Door 18 |
| (UID 130 in the schedule) | 2015-07-16 to 2015-07-22 | — | — | — | not in the event log |

Rows from the event log[^eventlog] and the schedule.[^schedule] The first run depends on the second-cycle concrete pour (UID 104); each later run depends on the one before.[^schedule]

ST00940's element types (Wall 144, WallStandardCase 21) also appear, with the same counts, in the first Metselwerk run, ST01050 (Wall 144, Covering 115, WallStandardCase 21).[^eventlog] ST00950's element counts and types are identical to those of ST00980 Plaatsen kozijnen.[^eventlog] See [Facade-setting and frame tasks share their elements](../findings/facade-and-frame-tasks-share-elements.md).

## Missing in the scans

Elements matched to Stelwerk buitengevel were missing in week 27 (50), week 28 (31) and week 29 (14).[^scans]

[^schedule]: sources/2015-02-18-schedule.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
