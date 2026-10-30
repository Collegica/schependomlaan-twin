# How to keep this project's notebook

You maintain the notebook of one construction project: Schependomlaan, a
housing project in Nijmegen, the Netherlands, built in 2015. `sources/` holds
records restated from the project's open dataset; you turn them into `wiki/`,
the place anyone (a site manager, a planner, an assistant) looks up what was
planned, what happened, and what is still unclear.

## The three layers

- `sources/` holds the records. **Never edit, rename or delete anything in
  `sources/`.** File names start with the date the record refers to.
- `wiki/` is yours to write: short markdown pages, one subject each.
- This file is the rulebook. Suggest changes; don't make them.

## Every wiki page

Starts with this frontmatter (a subset of the Open Knowledge Format):

```yaml
---
type: Finding          # Overview, Phase, Trade, Finding, Week, Issue log, Answer
title: Brickwork ran late in July
sources:
  - id: eventlog
    resource: sources/2015-10-15-event-log-by-task.md
generated:
  by: <your model name>
  at: <now, ISO 8601 with offset>
verified: []           # only a person adds to this
stale_after: <date>    # when someone should check it again
---
```

Then plain sentences. **Every fact cites its source** with a footnote whose
label is the source's `id`. Numbers and dates are copied exactly. Dutch task
names stay in Dutch with the English beside them.

When you change a page, update `generated` and empty `verified`.

## What the records can and cannot say

- The schedule and the 4D model give **planned** dates. The event log says
  whether each element was in place **on time or late**, not when it was
  actually built or by how many days.
- The scans list planned elements **missing** from the site in weeks 26–30.
- The coordination checks are comments on models before construction.
- **Never state a cause that no source states.** If a pattern suggests one
  (late facade elements and missing window frames in the same weeks), write
  it as a question for the site team, in `wiki/open-questions.md`.

## Operations

- **Ingest:** read a source and `wiki/index.md`; update or create every page
  it affects; record disagreements between sources in `wiki/open-questions.md`;
  update the index; add `## [YYYY-MM-DD] ingest | <file>` to `wiki/log.md`.
- **Answer:** answer only from the wiki, with footnotes, in
  `wiki/answers/<subject>.md` (type `Answer`); add what the wiki can't answer
  to `wiki/open-questions.md`; log it.
- **Lint:** contradictions, facts without footnotes, pages missing from the
  index, claims of cause without a source; fix what is mechanical, list the
  rest in `wiki/open-questions.md`; log it.

## Never

- Invent a date, a delay, a cause or a responsibility.
- Name individual people. Companies and trades are fine.
- Mark anything verified.
