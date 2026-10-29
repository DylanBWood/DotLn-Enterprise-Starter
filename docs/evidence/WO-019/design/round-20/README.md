# Round 20 — reading the implementation comparison

The references explanation now connects this study with gdx-ai's public Arrive
implementation. Both candidates contain the same six facts, source links,
introduction and integration takeaway. Only grouping changes.

A: **Grouped by implementation** — [A.png](A.png) reads the study's three
decisions together, then the library's corresponding decisions.

B: **Grouped by algorithm step** — [B.png](B.png) puts both implementations
under each decision: desired speed, acceleration and arrival.

The root review images are A.png and B.png in that order, matching captions and
the question. These images frame the implementation comparison itself; full
reading context and additional captures at 360, 768 and 1440 px live in
`captures/`. Both corrected primary images were visually inspected after their captures
passed at 20:16Z and 20:17Z respectively; the mobile A comparison was also read.
The operator selected A on 2026-10-26 because implementations need not share
the same steps. Each implementation now keeps its own explanation together;
the rejected step-grouping template is removed. D020 records the content
principle. The eye doctor process remains open.

The initial pair did not introduce either subject clearly enough. The operator
asked what the library/file and the study meant; this was a missing-content
correction, not a grouping preference. D019 records the correction. Both versions
now identify the interactive example as the simulation behind this page's
Movement/Velocity diagrams and worked calculation, introduce gdx-ai as a Java
game-AI library, explain what Arrive.java contains, and state the purpose of the
comparison. The initial images and checks remain in
[`captures/context-omitted/`](captures/context-omitted/).

The explanations were authored from the local tested Arrive model and the
[public gdx-ai source](https://github.com/libgdx/gdx-ai/blob/master/gdx-ai/src/com/badlogic/gdx/ai/steer/behaviors/Arrive.java),
read on 2026-10-26. The public code scales speed inside its deceleration radius,
limits acceleration computed from velocity error and response time, and returns
zero steering inside its arrival tolerance. It does not integrate the owner's
position or directly zero the owner's velocity. The note about keeping stopping
and integration consistent is an explanatory inference from that distinction,
not a claim that the library is defective. No external code was copied into the
product, and the library was not executed by this comparison.
The introduction and motion-update explanation were also checked against the
[library README](https://github.com/libgdx/gdx-ai) and
[steering documentation](https://github.com/libgdx/gdx-ai/wiki/Steering-Behaviors),
with Context7 resolving `/libgdx/gdx-ai` and returning the official documentation.

The two renderings are sequential template revisions, with no runtime grouping
flag, extra story or route. A groups the six translated fact paragraphs in two
sections; B groups those same paragraphs in three sections. Typography, styles,
source notes and the remaining reading are identical. Browser checks compare
the fact and shared-text hashes, defer construction until the references section
opens, retain the selected Data flow/Event timeline switch, preserve the main
time and article-footer relations, and check errors, overflow and serious/critical
axe findings at all three widths.

After the context correction, both groupings passed all three widths with shared
content SHA-256 `fd11bec895b4b0d6667dc73587ed7085568420fc4ec4551e56b353dfd8cd7a86`.
Tools lint, translation keys, component rules and Storybook builds passed. All
17 catalog browser checks passed at 20:17Z. The complete 83-test browser run at
20:12Z predates only this wording and introduction correction.
