# Round 21 — seeing a late-braking failure

Both candidates show two runs of the page's interactive Arrive example. Only
the slowing radius changes between the runs: 36 units and 8 units. They share
the same target, starting state, speed and acceleration limits, response time,
time step and stopping rule. This is a controlled example of one failure mode,
not a comparison that imposes a common structure on different implementations.

A: **Both runs on one chart** — [A.png](A.png) aligns the traces directly.

B: **One chart per run** — [B.png](B.png) gives each trace its own space with
identical scales.

A.png is first and B.png second, matching their captions and question. The
primary images frame the explanation; full reading context and 360, 768 and
1440 px captures are in `captures/`. The operator selected A on 2026-10-26;
the separate-chart template is removed. D021 records the choice. Prior choices remain,
including round-20 A's grouping by implementation and both switchable RxJS views.

The comparison addresses a gap in the existing limitations prose: it names
overshoot but does not show one. Keeping the prose alone would leave that
mechanism abstract. Both renderings use the same computed traces and explanation;
only chart grouping changes. They were built sequentially without an A/B runtime
flag, extra story or route.

`calculateArriveStep` now accepts a slowing radius defaulting to the existing
36. The same function generates both traces. For radius 8 the bounded numerical
probe observed a maximum sampled position of 103.92999953232008 at 7.8 s, then
a return and stop at 100. The default run never passes 100. The chart shows
4–16 seconds and positions 50–110, encompassing both peaks; its text states that
zoom and the fixed time step. The reported 3.93-unit overshoot is rounded. This
is evidence for the declared initial conditions, not a general guarantee about
every radius or motion configuration.

The facade derives these traces only while the limits explanation is open and
reuses them during unrelated study interactions. Closing the section removes
its plot data and drawing; the expansion-deferred explanation component remains
constructed. Reopening reconstructs the same traces. No idle animation runs.

Tools lint and unit tests passed. The first build stopped on two unused
description translation keys planned for the other candidate; those redundant
keys were removed, and both candidates now associate their graphics with the
visible result and scale explanation. Translation, token, component and
Storybook checks then passed.

Both candidates passed browser checks at 360, 768 and 1440 px, with no page
errors, overflow or serious/critical axe findings. The checks confirm equal
trace points and prose, visible peaks within the plot, deferred construction,
collapse/reopen behavior, unchanged traces when the main time changes, the
selected implementation grouping and the reactive-view switch. Their shared
content SHA-256 is
`a471001fec2cbd982bc1a08cc30acf12a8a8bb51e3eb13a114a077d6ee785ff6`.
Both primary images and the narrow B explanation were visually inspected.

The existing criteria and design workers separately reviewed the current source,
actual prose and both templates without writes or execution; both reported zero
actionable findings. Root owns the executable observations above. The eye doctor
process remains open.

All 17 catalog browser checks passed at 20:35Z, including the expanded failure
example, its reported overshoot, removal of its drawing on collapse, retained
explanation component and correct reconstruction without resetting main time.
