---
type: Answer
title: Which parts of the building ran late, and what the scans and coordination checks say about them
sources:
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
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Which parts of the building ran late?

**Short answer:** almost entirely the facade (GEVEL). Of 3661 element-task links in the event log, 194 were late; 190 of those sit in six facade tasks, 2 in a calcium silicate wall task and 2 in the roof.[^eventlog] Every task planned to start before 2015-06-18 was on time for all its elements.[^eventlog] The scans of weeks 26–30 found missing elements in the same facade trades, and the coordination checks, made on the models before construction, commented on several of the same trades.[^scans][^checks]

What the records **cannot** say: when anything was actually built, by how many days it was late, or why.[^eventlog] No source states a cause, so none is given here.

## The late tasks

| Task id | Task (Dutch) | Task (English) | Planned (4D model) | Late | Of |
|---|---|---|---|---|---|
| ST00970 | Plaatsen kozijnen | Install window and door frames | 2015-06-18 to 2015-06-24 | 7 | 176 |
| ST00510 | Lijmwerk kalkzandsteen elementen | Glue-laid calcium silicate elements | 2015-06-19 to 2015-06-23 | 2 | 19 |
| ST00950 | Stelwerk buitengevel | Setting outer facade elements | 2015-07-02 to 2015-07-08 | 50 | 171 |
| ST00980 | Plaatsen kozijnen | Install window and door frames | 2015-07-06 to 2015-07-10 | 50 | 171 |
| ST01060 | Metselwerk | Brickwork | 2015-07-09 to 2015-07-21 | 60 | 527 |
| ST01070 | Metselwerk | Brickwork | 2015-07-22 to 2015-08-04 | 13 | 199 |
| ST01000 | Prefab betonband | Precast concrete band (facade) | 2015-08-17 to 2015-08-18 | 10 | 84 |
| ST01130 | Plaatsen scharnierkap incl. goot en platte daken | Install hinged roof incl. gutter and flat roofs | 2015-08-28 to 2015-09-17 | 2 | 313 |

All rows from the event log.[^eventlog] The 194 late links need not be 194 distinct elements: ST00950 and ST00980 have identical counts and element types (Window 153, Door 18), so their 50 late links may be the same 50 windows and doors.[^eventlog] For ST01070 the 18 February schedule gives a longer period, 2015-07-22 to 2015-08-25.[^schedule]

Details: [late elements finding](../findings/late-elements-facade-and-roof.md), [GEVEL phase](../phases/gevel-facade.md).

## Part by part: late, missing, and checked

### Window and door frames — Plaatsen kozijnen
- **Late:** 57 links — 7 in the first run (ST00970), 50 in the second (ST00980), 0 in the third (ST00990, 14 elements).[^eventlog]
- **Missing in the scans:** in every scanned week — 7, 50, 31, 14 and 4 in weeks 26 to 30.[^scans] In week 26 the 7 missing equal in number the 7 late links of ST00970; neither source lists element ids.[^scans][^eventlog] The scans name the task but not the run.[^scans]
- **Coordination checks:** the Linden checks of 11-05-2015 and 18-05-2015 asked for frames to be moved — *"kozijnen staan te ver naar buiten. Graag 170mm naar binnen verplaatsen"* (frames too far out; move 170mm inward), *"Kozijn staat 820mm te ver naar buiten"* (frame 820mm too far out), and 7 frames 1mm inward.[^checks] (The item that came back on 18-05-2015, *"Deze ben je nog vergeten 2x"*, is about interior boarding touching the calcium silicate, not about frames.[^checks]) The Willemsen check of 17-06-2015 raised the framing (*rekwerken*) above frames not cut out of the gutter framing (16x).[^checks] The checks carry no status, so whether these were fixed is not recorded.[^checks]

See [window and door frames](../trades/kozijnen-window-and-door-frames.md).

### Setting outer facade elements — Stelwerk buitengevel
- **Late:** 50 links, all in the second run (ST00950); the first run (ST00940) was on time for all 165 elements.[^eventlog] The schedule's third run (2015-07-16 to 2015-07-22) is not in the event log.[^schedule][^eventlog]
- **Missing in the scans:** 50 in week 27, 31 in week 28, 14 in week 29 — the same numbers matched to Plaatsen kozijnen in those weeks.[^scans]
- **Coordination checks:** no check is described in the wiki as being about this task by name. Related comments on the facade support (*geveldrager*): Jordahl (20-04-2015) asked for it to be modelled 60mm higher, and Willemsen raised cut-outs for 11 facade supports.[^checks] Whether these are the same elements is not stated.

See [facade elements](../trades/stelwerk-buitengevel-facade-elements.md) and [facade-setting and frame tasks share their elements](../findings/facade-and-frame-tasks-share-elements.md).

### Brickwork — Metselwerk
- **Late:** 60 links in the second run (ST01060) and 13 in the third (ST01070); the first run (ST01050, 280 elements) and the below-ground brickwork in April were on time.[^eventlog]
- **Missing in the scans:** 58 in week 28 and 4 in week 29.[^scans] The same weeks list 46 and 2 missing elements named *buitenblad* (outer leaf) and 2 each week named *gevelisolatie* (facade insulation), but the scan does not say which name prefix goes with which task.[^scans] None in week 30, and the scans end before most of the third run's planned period.[^scans][^schedule]
- **Coordination checks:** the Willemsen checks asked for the gutter to be 110mm shorter so brickwork passes behind it.[^checks] Multicom #02 (01-04-2015, again 10-04-2015) concerns extending the cover bands to the brickwork reveal.[^checks]

See [brickwork](../trades/metselwerk-brickwork.md).

### Precast concrete band — Prefab betonband
- **Late:** 10 of 84 links (ST01000), planned 2015-08-17 to 2015-08-18.[^eventlog]
- **Missing in the scans:** 10 in week 28 (the same week lists 10 missing elements named *afdekker*; the scan does not link prefixes to tasks) — a month before the task's planned start in both the schedule and the 4D model.[^scans][^schedule][^eventlog]
- **Coordination checks:** the ROOT-Vebo model-quality check found two *"IFC_Vebo afdekker AB 80/106x300"* coverings intersecting; Multicom and FEK discussed cover bands (*afdekbanden*) and their cast-in fixings.[^checks] Whether these are the ST01000 elements is not stated.

See [concrete band](../trades/prefab-betonband-precast-concrete-band.md).

### Calcium silicate walls — Lijmwerk kalkzandsteen elementen
- **Late:** 2 of 19 links in the third run (ST00510, 2015-06-19 to 2015-06-23); element types Wall 11, WallStandardCase 6, Slab 2.[^eventlog] All other calcium silicate tasks were on time.[^eventlog]
- **Missing in the scans:** in week 26 the scan matched 2 missing elements to this task and 2 to the roof task; the 9 missing that week were 7 named *merk* and 2 named *dakisolatie* (roof insulation), and the scan does not say which went with which task.[^scans]
- **Coordination checks:** Multicom (31-03-2015): *"Constructeur geeft op het laatste moment aan dat de balkons opgelegd moeten worden"* (the structural engineer says at the last moment that the balconies must be supported), bearing 200mm into the calcium silicate.[^checks] Willemsen (17-06-2015, again 19-06-2015): roof timber intersecting the calcium silicate (4x).[^checks]

See [calcium silicate walls](../trades/kalkzandsteen-calcium-silicate.md).

### Roof — Plaatsen scharnierkap
- **Late:** 2 of 313 links in the second run (ST01130, 2015-08-28 to 2015-09-17); the other roof tasks in the log were on time.[^eventlog]
- **Missing in the scans:** in week 26 the scan matched 2 missing elements to this task, whose first run was not planned until 2015-07-16.[^scans][^schedule] The scans end in week 30, before ST01130's planned period.[^scans]
- **Coordination checks:** three Willemsen checks (26-05-2015, 17-06-2015, 19-06-2015) raised 20 issues on the roof, gutter and dormers, including the clashes with calcium silicate and frames above.[^checks]

See [DAK phase](../phases/dak-roof.md).

## How the three records line up — and where they don't

- **Same trades, same weeks.** The trades with late links are the trades with missing elements in the scans.[^eventlog][^scans] Week 28 had the most missing elements (89).[^scans]
- **Checks came first.** The last Linden check (18-05-2015) and the Willemsen check of 17-06-2015, both with comments on frames, predate the first planned frame run (2015-06-18), and the last roof check (19-06-2015) predates the first planned roof run (2015-07-16).[^checks][^schedule] The checks are comments on models, not site records, and do not reference task ids or element ids, so they cannot be tied to particular late elements.[^checks]
- **Counts disagree.** The scans matched 106 missing-element counts to frames over five weeks, against 57 late frame links.[^scans][^eventlog] The concrete band was counted missing a month before it was planned.[^scans][^schedule] These and the questions they raise are in [open questions](../open-questions.md) (questions 2–5, 7–10).

## What this answer cannot tell you

- Actual build dates, how many days late, or why any element was late (open question 16).
- Whether the coordination issues were closed before installation (questions 10 and 12).
- Whether any check comment refers to the same elements that were later late (question 17).

[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^checks]: sources/2015-06-19-coordination-checks.md
[^schedule]: sources/2015-02-18-schedule.md
