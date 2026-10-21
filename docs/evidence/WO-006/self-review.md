# WO-006 independent self-review

Two fresh, read-only workers received only the active order and diff packets.
Both ran the skill-prescribed Codex worker model `gpt-6.1-sol`, effort `max`;
neither edited files, ran checks, dispatched a lifecycle action or spawned a
child. The root session used two workers within the cap of twenty. The same
workers reread corrected diffs; no replacement reviewer was spawned.

| Worker | Original findings | Corrected readback |
| --- | ---: | --- |
| Criteria adversary | 3 | All 3 fixed; no new regression found |
| Design, simplicity and maintainability | 4 | All 4 fixed; no new concern found |

One private-diagnostic finding was shared by both reports. Deduplicated:
`self-review: found 6; fixed 6; recorded 0`.

| Finding | Correction and verification |
| --- | --- |
| Private local diagnostic entered the initial diff packet | Ignore `/docs/control/local/` and exclude both private roots before reading packet inputs. Rebuilt packets omit those entries; both workers explicitly skipped the original content. Nothing was staged or committed. WO-006-D009 records the correction. |
| Unsupported versions were traversed as v1 before rejection | Return the incompatible view model before collection access, guard panel selection, and exercise a version-only input in the container spec and catalog. |
| Fixture CLI exceptions could print paths or raw JSON | Emit controlled stage diagnostics; CLI tests exercise missing input, malformed JSON, failed output and validation failures without exposing their marker or temporary path. |
| Unavailable sections hid retained rows | Render retained rows beneath the unavailable explanation and test that their indexed IDs remain in the DOM. |
| Destroying a closed dialog could steal focus | Clear saved focus after close and restore on destruction only while open; the spec moves focus elsewhere after close before destroying the component. |
| Cell types admitted combinations rejected by the schema | Use a discriminated status/value/explanation union; mapper tests and foundation compiler checks pass. |

Focused executable verification after corrections: UI 15 tests, board 11 tests,
tooling 22 tests, all 13 foundation compiler configurations and the e2e
TypeScript configuration passed. The complete preflight and gates are recorded
in [implementation evidence](README.md).

The workers' static reviews do not prove runtime, gate or visual outcomes.
The root executor owns the executable checks and
[actual image inspection](visual-review.md). Their corrected reports leave no
outstanding finding. The separately recorded app-grouping suggestion is a
future architectural evaluation, not a review defect (WO-006-D005).
