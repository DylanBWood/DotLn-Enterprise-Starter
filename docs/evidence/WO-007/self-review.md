# Independent implementation review

Two fresh read-only workers used `codex-spawn-agent`, model `gpt-6.1-sol`,
effort `max`, and received only the active order and a complete target diff.
Neither ran probes, changed files or spawned descendants. The executor is the
only writer. The planned and actual worker count is two of the cap of twenty.

The criteria adversary found three P2 issues. The design improver found three
P2 issues. Two findings overlapped; there are four distinct findings:

| Finding | Workers | Resolution | Regression evidence |
| --- | --- | --- | --- |
| Direct subscription dispatch escaped the event-hygiene rule | Both | Inspect `subscribe` scopes as well as `pipe` and reducer scopes | Tooling cases reject both direct and piped subscription mappings |
| An old target fragment superseded a later selected panel on reload | Criteria adversary | Explicit tab selection clears a superseded fragment; internal anchor focus retains it | Copied-anchor browser case selects Work, reloads and retains Work |
| Copied anchors retained old query parameters after query-only navigation | Both | LinkMapper derives query parameters from a reactive ActivatedRoute signal | Mapper unit case replaces the query through navigation events and checks the existing href |
| A hidden provenance footer kept valid evidence anchors unreachable | Design improver | An explicit source/evidence fragment reveals the footer while active | Flag-off browser case follows evidence and checks visibility/focus |

The executor accepted and fixed all four. Checks and gate outcomes are recorded
in the evidence README; the workers made static judgments and did not claim a
runtime pass. No finding was deferred and no independent finding was dismissed.

self-review: found 4; fixed 4; recorded 0
