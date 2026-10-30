---
type: Issue log
title: Open questions — what the records leave unclear
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

# Open questions

Questions for the site team and for whoever holds the original files. None of these has an answer in `sources/`.

## Disagreements between sources

1. **Two sets of planned dates.** For eight tasks the 4D model ends earlier than the 18 February schedule (e.g. Plaatsen scharnierkap ST01120: 2015-08-06 vs 2015-08-27).[^eventlog] Which plan was the on-time/late check measured against? Was the 4D model built from a later version of the schedule? See [the finding](findings/4d-model-vs-schedule-dates.md).
2. **Roof elements missing before the roof was due.** Week 26's scan lists 2 missing elements named *dakisolatie* (roof insulation) and matched 2 missing elements to Plaatsen scharnierkap,[^scans] whose first run was planned from 2015-07-16.[^schedule] It also matched 2 to Lijmwerk kalkzandsteen elementen, which has 2 late slabs.[^scans][^eventlog] The 9 missing elements carry 11 task matches, but the scan does not say which elements or prefixes go with which task.[^scans] Are the 2 *dakisolatie* elements the ones matched to the roof task and to the calcium silicate task? Were they planned for week 26 in the 4D model, or is the name match wrong?
3. **Concrete band missing in July.** Week 28's scan matched 10 elements to Prefab betonband,[^scans] planned for 2015-08-17 to 2015-08-18 in both the schedule and the 4D model.[^eventlog] Why were they expected on site by week 28?
4. **Missing frames versus late frames.** Across weeks 26–30 the scans matched 106 missing-element counts to Plaatsen kozijnen (7 + 50 + 31 + 14 + 4),[^scans] while the event log has 57 late frame links (7 + 50 + 0).[^eventlog] Were the same elements counted missing in several weeks?
5. **Late brickwork after the scans ended.** ST01070 Metselwerk (planned from 2015-07-22) has 13 late elements,[^eventlog] and ST01000 and ST01130, planned in August–September, have late elements,[^eventlog] but the scan comparisons end in week 30.[^scans] How was lateness determined for elements after week 30? (The README lists an as-planned model for week 37, 11 sept, but no scan comparison for it.[^readme])
6. **Third facade run missing from the 4D model.** The schedule has a third Stelwerk buitengevel run, 2015-07-16 to 2015-07-22;[^schedule] the event log has no matching task.[^eventlog] Likewise the cycle 1 Opstellen, cycle 2 and 3 Stalen balken, the second Dakramen and the first Zink goot are in the schedule but not in the event log.[^schedule][^eventlog]

## Patterns to ask the site team about (no cause is stated in any source)

7. **Facade elements and window frames late in the same weeks.** ST00950 Stelwerk buitengevel and ST00980 Plaatsen kozijnen each have 50 late links with identical element types,[^eventlog] and the scans matched equal numbers of missing elements to both in weeks 27–29.[^scans] Were these the same windows and doors? If so, what held them up — the frames, the facade elements, or something else?
8. **Window and door elements under a facade-setting task.** Why does the 4D model link Window 153 and Door 18 to Stelwerk buitengevel (ST00950)?[^eventlog]
9. **Brickwork late in the run after the frames.** ST01060 Metselwerk (2015-07-09 to 2015-07-21) has 60 late links; it was planned to start while the second frame run, ST00980 (2015-07-06 to 2015-07-10, 50 late links), was still under way.[^eventlog] Is there a dependency between them on site? The schedule lists no predecessor for the brickwork runs other than the previous brickwork run.[^schedule]
10. **Window-frame model corrections.** The Linden check of 11-05-2015 asked for frames to be moved 170mm and 1mm inward and reported one frame 820mm too far out.[^checks] The item raised again on 18-05-2015 (*"Deze ben je nog vergeten 2x"*) is #05, the interior boarding touching the calcium silicate, not a frame item.[^checks] Were the frame corrections made before the frames were installed?
11. **Long spans with few working days in summer.** In the schedule, Installateurs runs 2015-07-22 to 2015-08-17 with 4.0 working days, Metselwerk 2015-07-22 to 2015-08-25 with 10.0, Plaatsen scharnierkap 2015-07-16 to 2015-08-27 with 16.0.[^schedule] Was there a planned non-working period in these weeks?

## Gaps in the records

12. **Were the coordination issues closed?** The checks carry no status.[^checks]
13. **Which company did which trade?** The checks name companies (Waardo, Geelen, Xella, Multicom, Bernts, Ytong, FEK, Jordahl, Linden, Willemsen) but not their trades, except the steel check addressed to Bernts.[^checks] The schedule names no companies.[^schedule]
14. **Who is the contractor?** The schedule is described as the contractor's schedule;[^schedule] the README says the design model was made by order of Hendriks Bouw en Ontwikkeling,[^readme] but no source names the main contractor as such.
15. **What does the element prefix *merk* mean?** It accounts for most missing frame and facade elements.[^scans]
16. **Actual dates.** No source gives actual start or finish dates, the length of any delay, or whether handover happened on the planned 2015-12-17.[^eventlog][^schedule]
17. **Do the check comments concern the late elements?** The coordination checks comment on frames, facade supports, cover bands, calcium silicate and the roof,[^checks] the same trades that have late links,[^eventlog] but the checks give no task ids or element ids. Were any of the checked elements among those later late or missing? (Raised by [where it ran late](answers/where-it-ran-late.md).)
18. **How do week 28's 89 missing elements split across tasks?** The scan matched 58 to Metselwerk, 31 to Stelwerk buitengevel, 31 to Plaatsen kozijnen and 10 to Prefab betonband: 130 matches for 89 elements.[^scans] Which elements were matched to more than one task, and which name prefix (*buitenblad*, *merk*, *afdekker*, *gevelisolatie*) goes with which task? (Raised by [week 28](answers/week-28.md).)

## Raised by the lint of 2026-10-30

19. **Is *Willemsen* a company?** The check files address WAARDO, GEELEN, LINDEN and the others in capitals; Willemsen is the only addressee written in mixed case.[^checks] The source says authors' names were omitted,[^checks] and this notebook treats Willemsen as a company. If it is a person's name, the wiki should name the company instead.
20. **How to translate *rekwerken*.** Willemsen 17-06-2015 #03 reads *"Rekwerken boven kozijnen zitten aan spouwzijde en zijn niet uit de gootrekken gespaard. 16x"*.[^checks] Earlier pages called these "lintels"; they now say "framing (*rekwerken*)". Which is the right term on site?
21. **One 4D period starts earlier, not only ends earlier.** For ST01210 Dakbedekking platte daken (flat-roof covering), the 4D model starts on 2015-09-18 and the schedule on 2015-09-21.[^eventlog] For the other seven differing tasks, only the finish date differs.[^eventlog] Does this change which plan the on-time check used (question 1)?

[^schedule]: sources/2015-02-18-schedule.md
[^checks]: sources/2015-06-19-coordination-checks.md
[^scans]: sources/2015-07-26-scan-comparisons-weeks-26-30.md
[^eventlog]: sources/2015-10-15-event-log-by-task.md
[^readme]: sources/2020-06-08-dataset-readme.md
