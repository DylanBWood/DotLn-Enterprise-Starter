# Round 22 — reading the ordinary pseudocode

A: **Full code, then explanations** — [A.png](A.png).

B: **Code interleaved with explanations** — [B.png](B.png).

Both contain the same Arrive pseudocode and four explanations: detecting an
actual stop, choosing desired velocity, limiting acceleration and updating
velocity before position. The notes distinguish response time from the time
advanced by one update. This grouping describes this example's own code; it
does not impose these parts on other implementations.

The primary images and their captions use A then B. Full-context and 360, 768
and 1440 px captures live in `captures/`. The pair was completed at the operator's
requested pausing point on 2026-10-26.

The candidates are sequential template revisions with no runtime comparison
input, route or extra story. Both build successfully and pass the three-width
browser probe. Code text, explanations and headings share SHA-256
`0ff004acd7730013fac1e2893c383e2a7aa4c9f1a388b841f02f87a65e55fb46`.
Code-block width, font family, size, line height and weight match per viewport.
There are no page errors, horizontal overflow or serious/critical axe findings.

Checks retain expansion-triggered construction and the view on collapse, the
timeline-following worked calculation, both reactive views, round-20 grouping A,
round-21 combined chart A, serif reading typography, closed source notes and
relations at the article footer. Both primary images were visually inspected.

The retained-code browser regression was generalized from one `pre` element to
the whole guide and its unchanged code content.

## Outcome

The operator chose both on 2026-10-28: a mix of A and B, with the interleaved
code hidden at first behind an expand or accordion control (capture SHA-256
`66335ad0…`). The selected template shows the complete code first, then the four
explanations; each explanation keeps the lines B gave it, inside a native
disclosure that starts closed and sits where B placed the code. Each explanation
appears once. WO-019-D024 records the direction and the correction: the morning
session that first received it recorded it nowhere, and the pair was asked again.

The selected design passed six rendered checks (closed and with one step open,
at 360, 768 and 1440 px): the complete code is first and canonical, the four
step fragments join to it, each step summary is described by its heading, one
step opens and closes from the keyboard, and there are no serious/critical axe
findings, horizontal overflow or page errors. Evidence:
[selected checks](selected-checks.json),
[closed, desktop](captures/selected-1440-guide.png),
[one step open, desktop](captures/selected-1440-open.png), with the other widths
in `captures/`. The catalog browser spec passed 18 of 18 with a new regression
for the closed step disclosures and the generalized retained-code regression.
The operator then ended the comparisons for this order (WO-019-D025).
