# The run that produced `wiki/`

On 30 October 2026, Claude Code 2.1.314 (model `claude-opus-5-5`) was given a
copy of this folder with `wiki/` holding only an empty index and log, and four
requests, one at a time, in headless mode, allowed to read and write files in
the folder and list directories, nothing else:

| Step | Request | Turns | Time | API cost (US$) |
|---|---|---|---|---|
| 1 | "Ingest every file in sources/, oldest first." | 52 | 8 min | 2.62 |
| 2 | "Which parts of the building ran late, and what do the scans and the coordination checks say about them?" | 14 | 1 min | 0.88 |
| 3 | "What was planned for week 28 of 2015, and what did that week's scan find?" | 13 | 1 min | 0.73 |
| 4 | "Lint the wiki." | 69 | 5 min | 2.26 |

US$6.49 in all. Nothing in `wiki/` was edited by hand afterwards.

`sources/` is generated from the dataset by `data/notebook_sources.py`; the
coordination checks are restated without their authors' names.

## What it produced

21 pages (overview, dataset, four phases, five trades, five weeks, three
findings, the coordination issue log, open questions), two answers, the index
and the log. `wiki/open-questions.md` lists 21 questions for the site team,
including:

- the facade-setting and window-frame tasks have identical late counts (50)
  and element types: the same windows and doors under two tasks?
- the scans count frames missing 106 times in five weeks; the event log has
  57 late frame links;
- the week 28 scan expects 10 precast band elements that the schedule plans
  for mid-August;
- the 4D model ends eight tasks earlier than the February schedule: which plan
  was "late" measured against?

The lint (step 4) found and corrected its own overreach: pages that paired
scan element names with tasks, which the scan records never do; "match"
where counts were only equal; and one misattributed coordination comment.
No page states a cause; patterns are listed as questions.
