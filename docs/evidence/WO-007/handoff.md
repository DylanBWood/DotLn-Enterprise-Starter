# WO-007 repair handoff

The repair closes VER-001 F1–F4: uncaught values retain Angular's console
reporting, HTTP and application notices are distinguished by their event source,
the MSW refusal test discriminates the configured policy, and the schema
provenance is recorded in decisions. The operator's additional readability
request is complete: 102 TypeScript/configuration files reviewed and paragraph
spacing improved in 50, with related lines kept together. The stale dependency
reference is also corrected. The outcome matches the dispatched scope.

**Actor attestation:** {"harness":"codex-cli","harnessVersion":"0.164.0","model":"gpt-6-astra","effort":"max","source":"codex-session-readback"}

The original implementation remains: the board loads its own HTTP API through
MSW in development and tests, typed event tiers, SignalStore call state,
injected persistence, canonical navigation and shell notices. The immutable
[verification report](../../verifications/WO-007/VER-001.md) is the failure
source. [Repair evidence](README.md#repair-of-ver-001) records the commands,
comparison and served-browser results; [D012–D016](decisions.md#wo-007-d012)
record the choices and reopening conditions.

**Criterion 1:** met — Current source scans find all creators only under shared/events. The tier/source and uniqueness spec passes in the uncached run and current target gates.

**Criterion 2:** met — Event hygiene passes with zero exceptions and ten inspected files. The tooling run passes the three independent negative fixtures and the outside-store consumer case; all 24 tooling tests pass.

**Criterion 3:** met — BoardStore retains toolkit call state, injected persistence, UI reducers and the withCommand outcome trinity. The current data-access and board-data-access suites pass all HTTP success, unavailable/503 refusal, network/HTTP failure, timeout, relative-base and absolute-URL cases. The source scan finds no withEffects.

**Criterion 4:** met — MSW 3.0.3 and the tracked public worker remain. The five awaited-start helper cases pass. The repaired unmatched-request test passes against a live loopback endpoint under error and fails under bypass and absent strategies; the old test passes all three, as the bounded comparison records. The original served missing-worker evidence remains applicable to unchanged startup code.

**Criterion 5:** met — The current production and optimized mocked builds pass. The fresh production probe confirms the worker is absent, the current configuration excludes the worker and mock import, and flag overrides remain disabled. The browser preflight and review e2e run exercise the optimized mocked build with its worker.

**Criterion 6:** met — All 40 browser cases pass uncached and in the review gate, covering the five panels, forced failure and notices, flags, canonical query navigation, copied anchors and persistence on reload. No BoardFixtureToken remains. The separate production probe additionally verifies uncaught reporting, the application notice and restoration of the older request notice on dismissal.

**Criterion 7:** met — Persistence tests pass for namespaced selected-slice writes, no other storage/cookie/network writes, blocked storage, bad JSON and unknown panel ids. The current scan finds localStorage only in the storage provider and no prohibited Node import in runtime app/library TypeScript.

**Criterion 8:** met — The architecture, state-rules and scripts-reference documents exist and remain accurate. Both state documents explain the strengthened live-server proof and error origins. The rule 16 table and trinity clause remain. Script-reference validation passes for 24 npm scripts and 14 tool files; translation and structural checks pass.

**Criterion 9:** met — Canonical plain and review gates pass at target tree ca510cfc8945adc92afafa19280c2ee7c16fd7bb, on unchanged HEAD 90fa6e8d879cb499107ff79d1051c200d17c1cbc. Plain reference target-gate:95e28609-9b05-46c8-805d-220e27d6d004 completed in 73.755 s; review reference target-gate:75d17027-dee4-42a5-a860-3d6de7cd9a0c completed in 76.557 s at 2026-10-24T14:37:17Z. Every declared command passed with no non-ignored-byte mutation. Visual comparisons passed against unchanged baselines. The original full preflight preceded the first target gate, and this repair reran the complete uncached target preflight plus the 14-suite launchpad document preflight before its gates. The final npm run test:docs row after this handoff's last edit is consumed by repair-complete.

self-review: found 5; fixed 5; recorded 0

This repair closes four verifier findings and one stale reference found during
review. Separate root passes checked the failure rules and maintainability;
no new worker was spawned, and no finding is deferred. The original two-worker
implementation review and its four fixes remain recorded in
[self-review](self-review.md). The four verification follow-ups are settled
through the canonical register. The single repair queue item includes the
operator's spacing direction and its checks; its completed disposition is
required before recording this handoff.

No release version changes for this target order; release preparation returned
that declared outcome. Scratch copies contain no nested repository. Probes and
browser servers have exited, and no monitor started by this session remains.
MacOS visual checks are local evidence; this repair makes no CI-run claim.
Independent verification and publication stay with their separate dispatches.

Process-cost readback is available from codex-transcript-counter, scope dispatch,
observed at 2026-10-24T14:37:17.050Z. Cumulative totals stay in ignored receipts
and the response; they include repeated cached input, not unique context.
USD is unknown. Zero worker admissions were used in this repair.

Next phase: the operator's separate `resume: verify` dispatch.
