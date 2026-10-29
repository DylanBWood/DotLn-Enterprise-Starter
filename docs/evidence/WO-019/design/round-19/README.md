# Round 19 — explaining the RxJS event flow

Both candidates explain the same illustrative sequence: three ticks of 0.1 s,
an initial target of 100, a target change to 80 between ticks one and two, and a
stop emission after tick three. Both retain identical introductory text,
behavior rules and pseudocode. Only the visual representation changes.

A: **Data-flow diagram** — [A.png](A.png) traces how the frame and target inputs
join, pass through the state accumulator and stop condition, and reach drawing.

B: **Event timeline** — [B.png](B.png) walks through the events in order, including
the target change that produces no state and the next tick that samples it.

The first review image is A and the second is B, matching the image captions and
question. Full-context and 360 px captures are in `captures/`. The operator
selected both on 2026-10-26 and directed the same switchable-view solution as
the initial Movement/Velocity explanation. The eye doctor process remains open.

The two versions were built sequentially in the same `StudyExplanation`
component, without a comparison input, route or story. A used two source nodes
and connected operator nodes; B uses an ordered timeline with state transitions.
Shared text and pseudocode have the same SHA-256 in both browser checks. The
selected implementation now retains both drawings behind a Data flow / Event
timeline switch, with one shared scenario, rule list and pseudocode. This is
supported reading behavior, not an A/B preview flag. D018 records the direction.

Both versions are constructed only when the reactive explanation first expands.
The browser checks cover retained views on collapse, multiple open explanations,
the existing numerical calculation, the shared movement/velocity time, serif
reading typography, tight definition lines, initially closed source notes,
related concepts at the article's end, page errors and horizontal overflow at
360 and 1440 px. The static trace does not autoplay or run an animation loop.

The RxJS 7.8.2 documentation was checked through Context7 and the official
[withLatestFrom source](https://github.com/ReactiveX/rxjs/blob/7.8.2/src/internal/operators/withLatestFrom.ts)
and [takeUntil source](https://github.com/ReactiveX/rxjs/blob/7.8.2/src/internal/operators/takeUntil.ts).
A bounded executable probe using RxJS subjects verified targets 100, 80, 80 on
three successive states, previous-state accumulation, no output on target-only
change, stopping on a notifier emission, and continued output when the notifier
only completes. The S0–S3 labels describe accumulated states, not numerical
positions or the main diagram's current timeline.

Tools lint, translation keys, component rules, Storybook builds and both-width
browser probes passed for the pair. The ordinary algorithm and full RxJS
pseudocode remain unchanged.

The selected switch passed its keyboard browser regression and six rendered
checks (both views at 360, 768 and 1440 px) at 19:56Z. Each check found only the
active diagram constructed, unchanged shared text and main timeline, no document
overflow and zero serious/critical axe findings. Collapse/reopen retained the
selected view. Evidence: [selected checks](selected-checks.json),
[Data flow, desktop](captures/selected-flow-1440.png),
[Event timeline, desktop](captures/selected-timeline-1440.png), with the other
widths and explanation close-ups in `captures/`.

The new browser regression initially used an incorrectly scoped locator, then
compared rendered text with DOM text. The test was corrected to scope the child
locator relatively and compare rendered text consistently; the product behavior
did not require a correction. The standalone axe probe also needed an explicit
browser context. The successful retry above is the evidence for the switch.
