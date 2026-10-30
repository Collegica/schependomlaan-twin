# 4D event log: which task built which element, and the as-built check

Source: `Event log/Eventlog with As Built information/...csv` (exported from the 4D model in Synchro).
Each row of the original links one model element (IFC GUID) to one task, with the task's planned
dates in the 4D model, and says whether the element was in place on time (`On time` / `Too late`).
The log records whether an element was late, not by how many days.

In total: 3661 element-task links, 2358 elements, 72 tasks. On time: 3467; late: 194.

| Task id | Task (Dutch) | Task (English) | Planned in 4D model | Planned in 18 Feb schedule | Elements | On time | Late | Main element types |
|---|---|---|---|---|---|---|---|---|
| ST00060 | Stellen bruggetjes | Set up setting-out frames | 2015-02-26 to 2015-02-27 | 2015-02-26 to 2015-02-27 | 1 | 1 | 0 | Slab 1 |
| ST00070 | Nuts invoeren | Bring in utility lines | 2015-03-02 to 2015-03-04 | 2015-03-02 to 2015-03-04 | 1 | 1 | 0 | Slab 1 |
| ST00080 | Werkvloer liftput | Blinding layer in lift pit | 2015-03-03 to 2015-03-03 | 2015-03-03 to 2015-03-03 | 1 | 1 | 0 | Slab 1 |
| ST00100 | Bekisten liftvloer | Formwork for lift pit floor | 2015-03-04 to 2015-03-04 | 2015-03-04 to 2015-03-04 | 1 | 1 | 0 | Slab 1 |
| ST00090 | Wapening liftvloer | Reinforcement for lift pit floor | 2015-03-04 to 2015-03-04 | 2015-03-04 to 2015-03-04 | 1 | 1 | 0 | Slab 1 |
| ST00110 | Stort liftvloer | Pour lift pit floor | 2015-03-05 to 2015-03-05 | 2015-03-05 to 2015-03-05 | 1 | 1 | 0 | Slab 1 |
| ST00130 | Bekisten liftwanden | Formwork for lift shaft walls | 2015-03-06 to 2015-03-06 | 2015-03-06 to 2015-03-06 | 17 | 17 | 0 | Beam 11, Wall 4, WallStandardCase 2 |
| ST00140 | Wapening liftwanden | Reinforcement for lift shaft walls | 2015-03-09 to 2015-03-09 | 2015-03-09 to 2015-03-09 | 17 | 17 | 0 | Beam 11, Wall 4, WallStandardCase 2 |
| ST00150 | Stort liftwanden | Pour lift shaft walls | 2015-03-10 to 2015-03-10 | 2015-03-10 to 2015-03-10 | 17 | 17 | 0 | Beam 11, Wall 4, WallStandardCase 2 |
| ST00200 | Stellen funderingkist incl. poeren | Set foundation formwork incl. pad footings | 2015-03-12 to 2015-03-20 | 2015-03-12 to 2015-03-20 | 32 | 32 | 0 | Beam 32 |
| ST00210 | Wapening | Reinforcement | 2015-03-19 to 2015-03-24 | 2015-03-19 to 2015-03-24 | 32 | 32 | 0 | Beam 32 |
| ST00230 | Stort | Concrete pour | 2015-03-25 to 2015-03-25 | 2015-03-25 to 2015-03-25 | 32 | 32 | 0 | Beam 32 |
| ST00250 | Opstorten fundering | Pour foundation upstands | 2015-03-26 to 2015-04-02 | 2015-03-26 to 2015-04-02 | 39 | 39 | 0 | Beam 39 |
| ST00310 | Stelwerk metselwerk onder peil | Setting brickwork below ground-floor level | 2015-04-07 to 2015-04-07 | 2015-04-07 to 2015-04-07 | 50 | 50 | 0 | Wall 36, WallStandardCase 14 |
| ST00320 | Metselwerk onderpeil (buitenblad) | Brickwork below ground-floor level (outer leaf) | 2015-04-08 to 2015-04-14 | 2015-04-08 to 2015-04-14 | 50 | 50 | 0 | Wall 36, WallStandardCase 14 |
| ST00350 | Kanaalplaatvloer leggen (lev. week 16) | Lay hollow-core floor (delivery week 16) | 2015-04-13 to 2015-04-13 | 2015-04-13 to 2015-04-13 | 51 | 51 | 0 | Slab 51 |
| ST00370 | Afstorten kanaalplaat | Pour topping on hollow-core slab | 2015-04-16 to 2015-04-16 | 2015-04-16 to 2015-04-16 | 27 | 27 | 0 | Slab 27 |
| ST00420 | Plaatsen stalen kolommen | Erect steel columns | 2015-04-20 to 2015-04-20 | 2015-04-20 to 2015-04-20 | 5 | 5 | 0 | Column 5 |
| ST00460 | Stelwerk kalkzandsteen | Setting calcium silicate elements | 2015-04-21 to 2015-04-21 | 2015-04-21 to 2015-04-21 | 24 | 24 | 0 | Wall 15, WallStandardCase 9 |
| ST00490 | Lijmwerk kalkzandsteen elementen | Glue-laid calcium silicate elements | 2015-04-22 to 2015-04-24 | 2015-04-22 to 2015-04-24 | 24 | 24 | 0 | Wall 15, WallStandardCase 9 |
| ST00560 | Leggen breedplaat incl. Veiligheid | Lay precast floor planks incl. edge protection | 2015-05-01 to 2015-05-04 | 2015-05-01 to 2015-05-06 | 23 | 23 | 0 | Slab 23 |
| ST00600 | Randkist | Edge formwork | 2015-05-07 to 2015-05-08 | 2015-05-07 to 2015-05-08 | 23 | 23 | 0 | Slab 23 |
| ST00660 | Installateurs | Building services contractors | 2015-05-07 to 2015-05-12 | 2015-05-07 to 2015-05-12 | 23 | 23 | 0 | Slab 23 |
| ST00630 | Stalen balken | Steel beams | 2015-05-11 to 2015-05-11 | 2015-05-11 to 2015-05-11 | 27 | 27 | 0 | Slab 23, Beam 4 |
| ST00690 | Wapening | Reinforcement | 2015-05-13 to 2015-05-14 | 2015-05-13 to 2015-05-18 | 23 | 23 | 0 | Slab 23 |
| ST00730 | Stort | Concrete pour | 2015-05-19 to 2015-05-19 | 2015-05-19 to 2015-05-19 | 23 | 23 | 0 | Slab 23 |
| ST00430 | Prefab trappen en bordes | Precast stairs and landing | 2015-05-21 to 2015-05-21 | 2015-05-21 to 2015-05-21 | 9 | 9 | 0 | Railing 4, Stair 3, Beam 2 |
| ST00470 | Stelwerk kalkzandsteen | Setting calcium silicate elements | 2015-05-22 to 2015-05-22 | 2015-05-22 to 2015-05-22 | 50 | 50 | 0 | WallStandardCase 35, Wall 15 |
| ST00500 | Lijmwerk kalkzandsteen elementen | Glue-laid calcium silicate elements | 2015-05-26 to 2015-05-28 | 2015-05-26 to 2015-05-28 | 51 | 51 | 0 | WallStandardCase 35, Wall 16 |
| ST00540 | Opstellen | Erect | 2015-05-29 to 2015-06-02 | 2015-05-29 to 2015-06-02 | 36 | 36 | 0 | Slab 36 |
| ST00570 | Leggen breedplaat incl. Veiligheid | Lay precast floor planks incl. edge protection | 2015-06-03 to 2015-06-04 | 2015-06-03 to 2015-06-04 | 13 | 13 | 0 | Slab 13 |
| ST00610 | Randkist | Edge formwork | 2015-06-05 to 2015-06-08 | 2015-06-05 to 2015-06-08 | 13 | 13 | 0 | Slab 13 |
| ST00670 | Installateurs | Building services contractors | 2015-06-05 to 2015-06-10 | 2015-06-05 to 2015-06-10 | 13 | 13 | 0 | Slab 13 |
| ST00700 | Wapening | Reinforcement | 2015-06-11 to 2015-06-12 | 2015-06-11 to 2015-06-12 | 13 | 13 | 0 | Slab 13 |
| ST00740 | Stort | Concrete pour | 2015-06-15 to 2015-06-15 | 2015-06-15 to 2015-06-15 | 28 | 28 | 0 | Slab 28 |
| ST00940 | Stelwerk buitengevel | Setting outer facade elements | 2015-06-16 to 2015-06-22 | 2015-06-16 to 2015-06-22 | 165 | 165 | 0 | Wall 144, WallStandardCase 21 |
| ST00440 | Prefab trappen en bordes | Precast stairs and landing | 2015-06-17 to 2015-06-17 | 2015-06-17 to 2015-06-17 | 5 | 5 | 0 | Stair 3, Beam 2 |
| ST00480 | Stelwerk kalkzandsteen | Setting calcium silicate elements | 2015-06-18 to 2015-06-18 | 2015-06-18 to 2015-06-18 | 17 | 17 | 0 | Wall 11, WallStandardCase 6 |
| ST00970 | Plaatsen kozijnen | Install window and door frames | 2015-06-18 to 2015-06-24 | 2015-06-18 to 2015-06-24 | 176 | 169 | 7 | Window 84, Door 48, Wall 29 |
| ST00510 | Lijmwerk kalkzandsteen elementen | Glue-laid calcium silicate elements | 2015-06-19 to 2015-06-23 | 2015-06-19 to 2015-06-23 | 19 | 17 | 2 | Wall 11, WallStandardCase 6, Slab 2 |
| ST00550 | Opstellen | Erect | 2015-06-24 to 2015-06-26 | 2015-06-24 to 2015-06-26 | 13 | 13 | 0 | Slab 13 |
| ST01050 | Metselwerk | Brickwork | 2015-06-25 to 2015-07-08 | 2015-06-25 to 2015-07-08 | 280 | 280 | 0 | Wall 144, Covering 115, WallStandardCase 21 |
| ST00580 | Leggen breedplaat incl. Veiligheid | Lay precast floor planks incl. edge protection | 2015-06-29 to 2015-06-30 | 2015-06-29 to 2015-06-30 | 13 | 13 | 0 | Slab 13 |
| ST00620 | Randkist | Edge formwork | 2015-07-01 to 2015-07-02 | 2015-07-01 to 2015-07-02 | 13 | 13 | 0 | Slab 13 |
| ST00680 | Installateurs | Building services contractors | 2015-07-01 to 2015-07-06 | 2015-07-01 to 2015-07-06 | 13 | 13 | 0 | Slab 13 |
| ST00950 | Stelwerk buitengevel | Setting outer facade elements | 2015-07-02 to 2015-07-08 | 2015-07-02 to 2015-07-08 | 171 | 121 | 50 | Window 153, Door 18 |
| ST00980 | Plaatsen kozijnen | Install window and door frames | 2015-07-06 to 2015-07-10 | 2015-07-06 to 2015-07-10 | 171 | 121 | 50 | Window 153, Door 18 |
| ST00710 | Wapening | Reinforcement | 2015-07-07 to 2015-07-08 | 2015-07-07 to 2015-07-08 | 13 | 13 | 0 | Slab 13 |
| ST01060 | Metselwerk | Brickwork | 2015-07-09 to 2015-07-21 | 2015-07-09 to 2015-07-21 | 527 | 467 | 60 | Covering 272, Wall 178, Beam 37 |
| ST00750 | Stort | Concrete pour | 2015-07-09 to 2015-07-09 | 2015-07-09 to 2015-07-09 | 13 | 13 | 0 | Slab 13 |
| ST00790 | Staalconstuctie dak | Roof steel structure | 2015-07-13 to 2015-07-16 | 2015-07-13 to 2015-07-16 | 47 | 47 | 0 | Beam 36, Member 6, Column 5 |
| ST00820 | Prefab trappen en bordes 2e verd. | Precast stairs and landing, 2nd floor | 2015-07-13 to 2015-07-13 | 2015-07-13 to 2015-07-13 | 5 | 5 | 0 | Stair 3, Beam 2 |
| ST00800 | Stelwerk /lijmwerk lift | Lift shaft: setting and glue-laid blocks | 2015-07-15 to 2015-07-16 | 2015-07-15 to 2015-07-16 | 7 | 7 | 0 | WallStandardCase 5, Wall 2 |
| ST01120 | Plaatsen scharnierkap incl. goot en platte daken | Install hinged roof incl. gutter and flat roofs | 2015-07-16 to 2015-08-06 | 2015-07-16 to 2015-08-27 | 85 | 85 | 0 | BuildingElementPart 34, Covering 25, Slab 16 |
| ST00840 | Opstellen | Erect | 2015-07-16 to 2015-07-20 | 2015-07-16 to 2015-07-20 | 9 | 9 | 0 | Slab 9 |
| ST00850 | Leggen breedplaat incl. Veiligheid | Lay precast floor planks incl. edge protection | 2015-07-20 to 2015-07-21 | 2015-07-20 to 2015-07-21 | 9 | 9 | 0 | Slab 9 |
| ST00990 | Plaatsen kozijnen | Install window and door frames | 2015-07-20 to 2015-07-24 | 2015-07-20 to 2015-07-24 | 14 | 14 | 0 | Window 12, BuildingElementProxy 1, WallStandardCase 1 |
| ST01070 | Metselwerk | Brickwork | 2015-07-22 to 2015-08-04 | 2015-07-22 to 2015-08-25 | 199 | 186 | 13 | Covering 107, Wall 92 |
| ST00870 | Randkist | Edge formwork | 2015-07-22 to 2015-07-23 | 2015-07-22 to 2015-07-23 | 9 | 9 | 0 | Slab 9 |
| ST00880 | Installateurs | Building services contractors | 2015-07-22 to 2015-07-27 | 2015-07-22 to 2015-08-17 | 9 | 9 | 0 | Slab 9 |
| ST01000 | Prefab betonband | Precast concrete band (facade) | 2015-08-17 to 2015-08-18 | 2015-08-17 to 2015-08-18 | 84 | 74 | 10 | Covering 70, BuildingElementPart 14 |
| ST00890 | Wapening | Reinforcement | 2015-08-18 to 2015-08-19 | 2015-08-18 to 2015-08-19 | 9 | 9 | 0 | Slab 9 |
| ST00910 | Stort | Concrete pour | 2015-08-20 to 2015-08-20 | 2015-08-20 to 2015-08-20 | 9 | 9 | 0 | Slab 9 |
| ST01130 | Plaatsen scharnierkap incl. goot en platte daken | Install hinged roof incl. gutter and flat roofs | 2015-08-28 to 2015-09-17 | 2015-08-28 to 2015-09-18 | 313 | 311 | 2 | BuildingElementPart 211, Slab 56, Covering 39 |
| ST01200 | Dakbedekking platte daken | Flat-roof covering | 2015-08-28 to 2015-09-03 | 2015-08-28 to 2015-09-03 | 38 | 38 | 0 | Covering 32, Slab 6 |
| ST01170 | Dakramen | Roof windows | 2015-08-28 to 2015-09-03 | 2015-08-28 to 2015-09-03 | 85 | 85 | 0 | Covering 69, Wall 11, Slab 4 |
| ST01150 | Zinken bekleding dakkapelen | Zinc cladding of dormers | 2015-08-28 to 2015-09-03 | 2015-08-28 to 2015-09-03 | 80 | 80 | 0 | Covering 65, Wall 11, Slab 4 |
| ST01220 | Dakpannen | Roof tiles | 2015-09-04 to 2015-09-17 | 2015-09-04 to 2015-09-18 | 30 | 30 | 0 | Covering 30 |
| ST01210 | Dakbedekking platte daken | Flat-roof covering | 2015-09-18 to 2015-10-01 | 2015-09-21 to 2015-10-02 | 47 | 47 | 0 | Covering 36, Window 5, WallStandardCase 4 |
| ST01160 | Zinken bekleding dakkapelen | Zinc cladding of dormers | 2015-09-21 to 2015-10-02 | 2015-09-21 to 2015-10-02 | 149 | 149 | 0 | Covering 117, BuildingElementPart 24, Wall 8 |
| ST01230 | Dakpannen | Roof tiles | 2015-09-29 to 2015-10-12 | 2015-09-29 to 2015-10-12 | 12 | 12 | 0 | Covering 12 |
| ST01250 | Zink goot | Zinc gutter | 2015-10-09 to 2015-10-15 | 2015-10-09 to 2015-10-15 | 12 | 12 | 0 | Covering 12 |
