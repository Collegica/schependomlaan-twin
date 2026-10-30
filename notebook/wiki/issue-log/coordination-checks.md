---
type: Issue log
title: Model coordination checks, March to June 2015 (102 issues)
sources:
  - id: checks
    resource: sources/2015-06-19-coordination-checks.md
  - id: readme
    resource: sources/2020-06-08-dataset-readme.md
  - id: schedule
    resource: sources/2015-02-18-schedule.md
generated:
  by: claude-opus-5-5
  at: 2026-10-30T18:03:28-04:00
verified: []
stale_after: 2027-04-30
---

# Model coordination checks, March to June 2015

Before construction, subcontractors' models were checked against the design model; the checker's comments were saved as BCF issues: 102 issues in 23 check files.[^checks] The README says the design model was quality-checked with Solibri Model Checker and the subcontractor models were checked in Tekla BIMsight during the engineering phase.[^readme]

These are comments on models, not records of site events. The source gives no status, so it does not say whether any issue was closed.[^checks]

## By company

| Company (addressee) | Check files (date in file name) | Issues | What the comments are about |
|---|---|---|---|
| WAARDO | 18-03-2015, 26-03-2015 | 17 + 2 | Openings (*sparingen*) to add, move or enlarge (ø130mm, 250x250, 750x350 meter-cupboard openings); hollow-core slab (*kanaalplaat*) to run through; floor 120mm shorter at the bay windows (*erker*); crawl-space hatches dropped.[^checks] |
| GEELEN | V1, V2, V3+Dak, all 20-03-2015 | 5 + 2 + 6 | Floor-plank (*breedplaat*) lengths (10mm shorter, 98mm longer, 130mm shorter, 375mm longer at a bay where *"vloer heeft hier geen oplegging"* — the floor has no support here); meter-cupboard and utility openings; a larger opening for a steel beam.[^checks] |
| XELLA | Xella BG 20-03-2015 | 2 | Tolerance around openings already in the base model; whether a dimension was agreed with VEBO.[^checks] |
| MULTICOM | 26-03-2015, 31-03-2015, 01-04-2015, 10-04-2015 | 6 + 1 + 2 + 4 | Balconies, landings (*bordessen*) and cover bands (*afdekbanden*): drainage, cast-in fixings for railings, and the balconies' bearing in the calcium silicate walls.[^checks] |
| BERNTS | Controle staalconstructie 27-03-2015 | 9 | Steel structure: beam lengths and bearings (e.g. HE200B to bear 300mm; beams 91mm shorter), holes ø8mm at 500mm centres, rafter position moved 45mm.[^checks] |
| YTONG | 01-04-2015 | 2 | Changed layout of plot 1 (*Kavel 1*, buyer's changes); whether a wall can be built in Ytong.[^checks] |
| FEK | 16-04-2015, 07-05-2015 | 3 + 3 | Stair and balcony railings (*hekwerken*, *leuningen*): modelling them, matching cast-in fixings, a railing running into the roof.[^checks] |
| JORDAHL | 20-04-2015 | 3 | A beam not cut out; facade support (*geveldrager*) to be modelled 60mm higher.[^checks] |
| LINDEN | 11-05-2015, 18-05-2015 | 5 + 1 | Window frames (*kozijnen*) out of position (170mm, 820mm, 1mm); interior boarding touching the calcium silicate.[^checks] |
| Willemsen | 26-05-2015, 17-06-2015, 19-06-2015 | 9 + 9 + 2 | Roof (*kap*), gutter (*goot*) and dormers (*dakkapellen*): openings for rainwater pipes, cut-outs for 11 facade supports, gutter 110mm shorter so brickwork passes behind it, roof timber clashing with calcium silicate (4x), framing (*rekwerken*) above frames (16x), Rockpanel cladding.[^checks] |
| Open (internal model quality) | ROOT-Vebo, HB_Nutsvoorzieningen, ROOT-Compleet | 1 + 2 + 6 | Objects intersecting or inside each other in the models: Vebo covers, gas object, insulation, zinc and roof.[^checks] |

Three issues have no addressee: Geelen V1 #03, Geelen V2 #01 and Geelen V3+Dak #02.[^checks]

## Issues raised more than once

Some comments appear again in a later file, sometimes with an addition:[^checks]

- Waardo #01 and #06 (18-03-2015) return on 26-03-2015 with *"Graag ook de zijkanten inkorten"* (please also shorten the sides) and *"Graag nog 1 sparing wijzigingen en 2 toevoegen deze was ik vergeten"* (please change 1 more opening and add 2 that I had forgotten).
- Multicom #02 (01-04-2015), extending the cover bands to the brickwork reveal, returns on 10-04-2015.
- FEK #02 (16-04-2015) returns on 07-05-2015 with: bolts do not yet fully match the cast-in fixings, *"ik verwacht dat dit wel in de speling op lte lossen is maar weet het niet zeker"* (as written) (I expect it can be solved within the tolerance, but I am not sure).
- Linden #05 (11-05-2015) returns on 18-05-2015: *"Deze ben je nog vergeten 2x"* (you still forgot this one, 2x).
- Willemsen #02 (17-06-2015), roof timber intersecting the calcium silicate 4x, returns on 19-06-2015.

## Notable comments

- **Late structural change to balconies.** Multicom, 31-03-2015: *"Constructeur geeft op het laatste moment aan dat de balkons opgelegd moeten worden."* (The structural engineer says at the last moment that the balconies must be supported.)[^checks]
- **Missing reference file.** Willemsen, 26-05-2015: *"ik was vergeten de IFC van de geveldrager in de map Onderleggers te plaatsten. Deze staat er nu wel in."* (I had forgotten to put the facade-support IFC in the reference folder; it is there now.)[^checks]

## Timing against the schedule

The last Linden check (18-05-2015), whose comments are about window frames, came before the first planned Plaatsen kozijnen (window and door frames, 2015-06-18); the last Willemsen check (19-06-2015), whose comments are about the roof, came before the first planned Plaatsen scharnierkap (hinged roof, 2015-07-16).[^checks][^schedule] Whether the checks were resolved before those dates is not recorded.

[^checks]: sources/2015-06-19-coordination-checks.md
[^readme]: sources/2020-06-08-dataset-readme.md
[^schedule]: sources/2015-02-18-schedule.md
