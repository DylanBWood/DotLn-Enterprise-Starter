# WO-014 implementation self-review

self-review: found 2; fixed 2; recorded 0

Two fresh workers received only an order copy and an immutable diff packet. Both
used `codex-spawn-agent`, selected `gpt-6.1-sol`, effort `max`, without inherited
conversation. Neither wrote a repository file or ran a repository gate. They are
separate from the twelve catalog workers; root remained the sole coding writer.

| Worker | Brief | Found | Fixed | Recorded | Report |
| --- | --- | ---: | ---: | ---: | --- |
| design_improver | Simpler structure, coupling, error handling and maintainability; no criterion verdicts or adversarial test design | 2 | 2 | 0 | [Design report](design-review.md) |
| criteria_adversary | Concrete counterexamples, failed criteria and missing regression tests; no design cleanup | 0 | 0 | 0 | [Criteria report](criteria-review.md) |

The design review found that selecting a lower list row could update details
outside the viewport. Selection now focuses and reveals the details; its return
action restores the selected page and focuses the original row. The browser
regression exercises a lower row on a later page and the full browser run passes.

It also found generic validation failures hid the offending row. Diagnostics now
report an allow-listed batch, sanitized JSON pointer and failure category. They
withhold rejected values, unknown property names and input paths. The tooling
regression proves both location reporting and non-disclosure; all 29 tooling
tests pass. The prohibited-definition CLI fixture reports `/tools/0` and exits 1.

The criteria review independently parsed the packet's eight checkpoints and
checked row identity, line coverage, digest agreement, counts and typed examples.
It found no actionable issue. Its pending gate and usage observations were
accurate for its explicitly unfinished packet; final evidence belongs to the
executor handoff. It did not independently run application tests or verify the
original maps or books. No separate-pass fallback was used.
