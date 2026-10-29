# WO-019 executor self-review

Two fresh read-only Codex workers reviewed the order and target diff on
2026-10-26, with no parent conversation: `criteria_review` and `design_review`,
both `gpt-6.1-sol` at `max` effort. They edited no files, ran no checks, spawned
no descendants and dispatched no lifecycle action. The root remained the sole
writer. Explicit worker count: 2 of cap 20; other unobserved activity is unknown.

The review inputs were the work order and complete target changes, split into
source and generated-data diffs. The workers reviewed the source changes and
sampled generated data; neither claimed to inspect every generated row.

## Criteria adversary: 2 findings

1. Chapters without section headings could not expand their Concepts group:
   contents grouped missing sections as an empty string while the reducer
   compared it with undefined. GEB Preface and Dialogue rows were affected.
   The executor normalized that state across grouping, navigation, opening and
   restore; unit and browser regressions cover opening and reload persistence.
2. The objective browser test asserted only the first clause of Two-level
   formation steering's definition. It now asserts the complete shipped
   definition as a literal fixture, so truncation cannot satisfy the check.

The first issue was noticed by the design worker and transferred to the
criteria adversary for ownership; it is counted once.

## Design improver: 2 findings

1. Every study interaction re-derived three facet option sets from the whole
   catalog. A separate computed facet model now depends only on tools and
   translated labels, keeping scrubbing and disclosure changes independent.
2. Join failures hid useful operation context. File read/parse and output
   write/replace boundaries now report the operation and declared basename;
   JSONL parse failures also carry the line. Raw parser/OS messages and absolute
   paths stay out of diagnostics. Tooling tests exercise safe parse and missing
   source diagnostics.

Both workers re-read the focused fixes in an updated diff and reported no
remaining gap on 2026-10-26. All four fixes are applied. The catalog unit suite
passed 21 checks, tooling passed 37 checks, and the focused GEB navigation/reload
browser regression passed. The full-definition browser assertion also passed.
The separate route-controls failure was fixed, its focused rerun passed, and
the complete 81-test browser suite passed on 2026-10-26 at 16:26Z. The workspace
lint/test/build preflight and bundle check also passed in that rerun. Later
design changes still require their relevant checks. Neither worker claimed
independent verification or final design acceptance.

## Focused review after the worked example and cleanup

The same two workers read the current amended order and scoped code diff,
without another data-row review. The criteria worker found one additional P2:
reselecting Arrive could clear model expansion state while leaving the retained
native disclosure open, making its calculation disappear. The design worker
transferred the same finding rather than count it separately and reported zero
additional design findings.

The executor fixed the state reset to depend on an actual selected-id change.
Tools lint/unit tests and a browser regression passed at 19:16Z. The latter
covers history and search reselection, subsequent scrubbing and reset after
visiting a different concept and returning. The criteria worker's focused
readback reported zero remaining gaps. These were static code reviews, not
independent verification or final design acceptance.

## Focused review of the reactive explanation

The same workers reviewed the round-19 component, template, styles and supplied
semantic-probe source. The criteria worker also checked the displayed
translation values and pseudocode. Both reported zero
additional findings. The design review found no runtime comparison state or
obsolete data-flow machinery in candidate B; the criteria review found the event
sequence and displayed wording consistent with the pseudocode. This review does
not choose between A and B or end the operator's comparison process. The full
82-test browser suite and Tools unit tests passed at 19:36Z.

The later stream switch and round-20 reference comparison received another
focused read-only review by the same workers. The criteria worker read the
actual translated prose and container binding in a supplement; the reference
facts were checked against the root's recorded reading of the public source,
not a separate external-source inspection. Both workers reported zero new
findings. The browser regression verifies independent view state, shared text
and collapse/reopen behavior; all six selected view/width checks passed at
19:56Z. Round 20 retains the same six facts in both groupings, with passing
browser and accessibility checks. The operator subsequently selected A; the rejected grouping was removed without adding runtime comparison state.

The same workers separately reviewed the round-21 source packet, including the
shared motion calculation, conditional derivation, actual displayed prose and
both sequential chart templates. Each reported zero actionable findings. The
root's numerical probe and unit/browser checks establish execution; the workers
performed static review only. The operator later selected round-21 A; the rejected template was removed. Final acceptance remains open.

Those two workers' count for the 2026-10-26 execution was found 5; fixed 5;
recorded 0.

## 2026-10-28 closeout: three fresh reviewers

Three fresh `dotln-worker` agents (claude-opus-5-5) reviewed the current order
and the complete target and launchpad diffs on 2026-10-28, read-only and without
descendants, with nonoverlapping briefs: a criteria adversary (counterexamples,
failed criteria, missing regression tests), a design improver (structure,
coupling, error handling, maintainability) and a consistency reviewer
(write-backs, versions, generated data, fixtures and evidence sources). Each was
reused once for a focused check of the repairs. Session count: 3 of the cap of 20.
The root remained the only writer. Duplicates are counted once, and transfers
that raised a new item count for the reviewer that raised them. D026 records the
material repairs.

**Criteria adversary — found 12; fixed 10; recorded 2.** Fixed: the browser suite
never asserted six shelf works (F1, P1); its Enter case could not fail (F2);
rxc:310's URL note was classified partial (F3, also found by the other two);
long unbroken titles overflowed at 360 px in results and history (F4); eight
relations linked a concept to itself (F5); no committed axe or overflow check
ran with the study open, and no test proved the check refuses a dangling
relation (F8). Its transfers, all fixed: two catalog stores from route
providers; the parameter line's stray space and indent (a style-specificity
defect); search results showing work slugs; chapter buttons that claimed
expansion but could not collapse. Recorded: the scene link (F6, follow-up
`FUP-f1c8c645eb537501`, D028) and readings the browser's Back cannot return to
(F7, `FUP-ebc4ad49cf1ea093`, D029). Its follow-up found the shelf's new throw for
an unlisted work, the same item as the design improver's N1.

**Design improver — found 18; fixed 13; recorded 5.** Fixed: presentational code
imported the data-access library while lint could not see it (4); the v0
reader's public surface and orphaned schema (5); join failures without location
(6); `firstThree` and an undocumented filter dimension (8; `LayoutSide` stays
because criterion 6 requires it); duplicated limits, the batch folder rule, the
key-order place line and the shelf's invented scene (9); a hard-coded study id
(10; story ids declined as display fixtures); an unguarded copy of the test
translations (11; e2e selector style declined). Follow-up, all fixed: the
shelf's throw (N1), title lookup inside the search composite (N2), half-derived
chart lines (N3), a wrong comment about loading once (N4), unvalidated values
in join diagnostics (N5) and an unused public export. Recorded: the Arrive
study's literal geometry and prose (2), its duplicated open state (3) and its
focus and id ownership (7) as `FUP-5e9566b63fb44fb1` (D030); the Tools home
loading every chunk (12) as part of `FUP-ebc4ad49cf1ea093` (D029); Enter opening
the first result of the visible page, declined because typing resets to the
first page.

**Consistency reviewer — found 47; fixed 42; recorded 5.** Fixed: the decisions
index (F1); the catalog document's colours, full schema, new-work steps, join
and event statements and stale pointers (F2, F4, F5, F8–F10, F19, F20); the
rules file's reading rules and stale quota rule (F3, F6); G6's "No fixed page
width" (F7); the profile's comparison line and narrative (F12, F25); the
evidence README, host qualification, walkthrough, preflight record and this
record (F13, F15–F18); the pause record's superseded note and a private session
identifier (F14; its 19:43Z document-gate time is correct, as the target's
`tmp/wo019-doc-gate-round19.log` shows 14 passed at 19:43:40Z); the catalog
baselines (F21); wording written before D025 (F22, F24); criterion 4's
percentages. Follow-up, all fixed: the README's RxJS figure after the re-join
(N1), the summary seed and recorded totals for a new work (N2), the summary date
(N3), the format-after-join step (N4) and a comment edited after the Preflight
(N5; the final Preflight covers it). Recorded: the decision-file order (F23,
cosmetic; the integrate helper appends its records); the walkthrough's two-key
`ar` search (the Objective's two keystrokes; the browser suite covers `arrive`
with Enter); the initial graph's Aria and CDK bytes (no menu or overlay module;
attribution in the README); the join taking the run directory rather than a maps
root (documented); the check's own copy of the scene kinds (plain Node tooling
cannot import the TypeScript model; the data spec ties both lists). Its final
check of the write-backs after the gates found 12 more, all fixed: the profile's
and the target `foundation.md`'s old CI and gate descriptions; the order's
Preflight document gate, which had not run before the target gates and now
does; the performance comparison's wording; the gates and D031 missing from host
qualification; the walkthrough and sample predating the last no-render
refactors; the self-review count's scope; D027's follow-up unnamed; the profile
narrative stopping at D030; a comparison claim in D026 the record did not show;
under-reported closeout failures; and D027's inventory counts.

The code fixes passed the final Preflight at 2026-10-28T22:13:50Z–22:17:27Z. The
reviewers performed static review; execution evidence is the root's.

self-review (2026-10-28 closeout): found 77; fixed 65; recorded 12
