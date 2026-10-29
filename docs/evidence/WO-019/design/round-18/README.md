# Round 18 — search order in a reading session

The session begins with Two-level formation steering in AI for Games. Then the
reader types `ar`. Both candidates use the same query, matching rule, 2,189
matches, facets, 30-result page size and layout. Only ordering differs, so the
first page can contain different members of the same overall result set.

A: **All works equally** — [A.png](A.png). Sort by title-match strength, then
alphabetically across works. Arrive is 14th and below the initial viewport at
both tested widths.

B: **Current work first** — [B.png](B.png). Sort by title-match strength, then
prefer the current work, then alphabetically. Arrive is second and inside the
initial viewport at both tested widths. An exact title in another work still
outranks a prefix match in the current work. Other works remain searchable;
this is prioritization, not a filter.

The pair was captured sequentially from two revisions. No A/B option or
component branch was added. The operator selected A on 2026-10-26. The B implementation was removed. All earlier preferences remain selected and are not reopened here.

Catalog and Tools lint/unit tests passed, including cases for exact matches,
current-work priority, another selected work and retaining other works. Both
candidate probes passed navigation to Arrive at 1440 and 360 with no overflow
or browser errors. The objective browser journey now explicitly types two
characters, asserts Arrive is in the viewport, clicks it and restores history;
that journey passed for candidate B. Keyboard Enter still opens an exact result.
Full-page/mobile captures and per-candidate observations are retained here.

The operator questioned the premise and how a current work was inferred. Here,
work meant source book. B used the single persisted book selection, changed by
choosing a shelf entry or opening a concept; it used neither activity inference
nor a time window or history-count threshold. The question did not explain that
premise clearly. A retains global title-match ranking without that book bias.
The selected A journey keeps Arrive on the first results page after two typed
characters and explicitly scrolls to it before the selection click; no claim is
made that it appears within the initial viewport.
