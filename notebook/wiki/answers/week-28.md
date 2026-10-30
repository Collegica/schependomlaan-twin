---
type: Answer
title: What was planned for week 28 of 2015, and what that week's scan found
sources:
  - id: schedule
    resource: sources/2015-02-18-schedule.md
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

# Week 28 of 2015: planned work and what the scan found

**Short answer:** week 28 (6 to 12 July 2015) was planned for window and door frames, the end of the second facade-setting run, the change from the first to the second brickwork run, a reinforcement-and-pour cycle, the last day of a building-services run, and setting out, including setting out the roof.[^schedule] The scan found 89 planned elements missing, more than in any other scanned week. They were matched to brickwork, facade elements, window and door frames and the precast concrete band.[^scans]

What the records **cannot** say: what was actually built that week, by how many days anything was late, or why elements were missing.[^eventlog] No source gives a cause, so this answer gives none.

## What was planned

| Task (Dutch) | Task (English) | Planned | Event log |
|---|---|---|---|
| Installateurs | Building services contractors | 2015-07-01 to 2015-07-06 | ST00680: 13 of 13 on time |
| Stelwerk buitengevel | Setting outer facade elements | 2015-07-02 to 2015-07-08 | ST00950: 50 of 171 late |
| Plaatsen kozijnen | Install window and door frames | 2015-07-06 to 2015-07-10 | ST00980: 50 of 171 late |
| Metselwerk | Brickwork | 2015-06-25 to 2015-07-08 | ST01050: 280 of 280 on time |
| Metselwerk | Brickwork | 2015-07-09 to 2015-07-21 | ST01060: 60 of 527 late |
| Wapening | Reinforcement | 2015-07-07 to 2015-07-08 | ST00710: 13 of 13 on time |
| Stort | Concrete pour | 2015-07-09 | ST00750: 13 of 13 on time |
| Maatvoering | Setting out | 2015-07-10 | not in log |
| Maatvoering kap | Setting out roof | 2015-07-10 to 2015-07-16 | not in log |

Dates come from the 18 February 2015 schedule.[^schedule] On-time/late status comes from the event log.[^eventlog] Maatvoering kap on 2015-07-10 is the first task in the schedule's roof section.[^schedule] The README lists an as-planned model for week 28 dated 10 july.[^readme]

## What the scan found

The scans cover 22 June to 26 July 2015. In week 28, 89 planned elements were not found on site.[^scans]

**By element name:**[^scans]
- 46 *buitenblad* (outer leaf)
- 31 *merk*
- 10 *afdekker* (cover/coping)
- 2 *gevelisolatie* (facade insulation)

**By matched task:**[^scans]
- Metselwerk (brickwork): 58
- Stelwerk buitengevel (setting outer facade elements): 31
- Plaatsen kozijnen (window and door frames): 31
- Prefab betonband (precast concrete band): 10

The scan source names the task but not the run, and it does not say which name prefix belongs to which task.[^scans] The task counts add up to 130, which is more than the 89 elements. The wiki does not record how the matches overlap (open question 18).

## How it compares with the plan

- **Frames and facade elements.** The same number of missing elements, 31, was matched to Stelwerk buitengevel and to Plaatsen kozijnen. This also happened in weeks 27 and 29.[^scans] In the event log, ST00950 and ST00980 both have 50 late links and identical element types (Window 153, Door 18).[^eventlog] See [facade-setting and frame tasks share their elements](../findings/facade-and-frame-tasks-share-elements.md).
- **Brickwork.** 58 missing elements were matched to Metselwerk this week. Week 29 has only 4, and no other scanned week has any.[^scans] The first run, ST01050 (planned to end 2015-07-08), was on time for all 280 elements. The second run, ST01060 (planned to start 2015-07-09), has 60 late links.[^eventlog]
- **Concrete band ahead of plan.** 10 elements were matched to Prefab betonband. That task was planned for 2015-08-17 to 2015-08-18, a month after this week.[^scans][^schedule] This is open question 3.
- **Structure and setting out.** The scan matched no missing elements to Installateurs, Wapening, Stort, Maatvoering or Maatvoering kap.[^scans] Both concrete tasks were on time for all 13 elements.[^eventlog]

See also the [week 28 page](../weeks/2015-w28.md), [brickwork](../trades/metselwerk-brickwork.md), [facade elements](../trades/stelwerk-buitengevel-facade-elements.md), [window and door frames](../trades/kozijnen-window-and-door-frames.md) and [precast concrete band](../trades/prefab-betonband-precast-concrete-band.md).

## What this answer cannot tell you

- What was actually built in week 28, or how late anything was (open question 16).
- Why 89 elements were missing, and whether the missing frames and facade elements are the same windows and doors (open question 7).
- Why concrete band elements planned for August were expected in July (open question 3).
- How the 89 missing elements break down across the four matched tasks (open question 18).

[^schedule]: sources/2015-02-18-schedule.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^readme]: sources/2020-06-08-dataset-readme.md
