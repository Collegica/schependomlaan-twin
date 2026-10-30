---
type: Trade
title: Plaatsen kozijnen (window and door frames)
sources:
  - id: schedule
    resource: sources/2015-02-18-schedule.md
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
  - id: scans
    resource: sources/2015-07-26-scan-comparisons-weeks-26-30.md
  - id: checks
    resource: sources/2015-06-19-coordination-checks.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Plaatsen kozijnen (window and door frames)

Window and door frames were planned in three runs. 57 of their element-task links were late, and frame elements were missing from the scan in every week from 26 to 30.[^eventlog][^scans]

## Plan and on-time record

| Task id | Planned | Elements | On time | Late | Main element types |
|---|---|---|---|---|---|
| ST00970 | 2015-06-18 to 2015-06-24 | 176 | 169 | 7 | Window 84, Door 48, Wall 29 |
| ST00980 | 2015-07-06 to 2015-07-10 | 171 | 121 | 50 | Window 153, Door 18 |
| ST00990 | 2015-07-20 to 2015-07-24 | 14 | 14 | 0 | Window 12, BuildingElementProxy 1, WallStandardCase 1 |

Rows from the event log; the 4D dates match the 18 February schedule for all three.[^eventlog][^schedule]

## Missing in the scans

| Week | Missing elements matched to Plaatsen kozijnen |
|---|---|
| 26 | 7 |
| 27 | 50 |
| 28 | 31 |
| 29 | 14 |
| 30 | 4 |

All counts from the scan comparison.[^scans] The scan source names the task but not the task id, so it does not say which of the three runs each element belongs to.[^scans]

## Same elements as the facade-setting task

ST00980 Plaatsen kozijnen and ST00950 Stelwerk buitengevel (setting outer facade elements) have the same counts: 171 elements, 121 on time, 50 late, Window 153, Door 18.[^eventlog] In weeks 27, 28 and 29 the scans matched the same number of missing elements to both tasks.[^scans] See [Facade-setting and frame tasks share their elements](../findings/facade-and-frame-tasks-share-elements.md).

## Model checks before construction

Two checks of the Linden model, on 11-05-2015 and 18-05-2015, asked for frames to be moved: *"kozijnen staan te ver naar buiten. Graag 170mm naar binnen verplaatsen"* (frames are too far out; please move 170mm inward), *"Kozijn staat 820mm te ver naar buiten"* (frame is 820mm too far out) and *"7 kozijnen staan niet exact op juiste plaats, graag 1mm naar binnen verplaatsen"* (7 frames not exactly in place; please move 1mm inward).[^checks] The Willemsen check of 17-06-2015 also raised frame interfaces with the roof: framing (*rekwerken*) above frames not cut out of the gutter framing (16x), and finishing board and insulation 119mm from the frame where 30mm was wanted.[^checks] See [the coordination issue log](../issue-log/coordination-checks.md).

[^schedule]: sources/2015-02-18-schedule.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^checks]: sources/2015-06-19-coordination-checks.md
