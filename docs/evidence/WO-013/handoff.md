# WO-013 repair handoff

Dispatch: `resume: fix`, 2026-10-25. This repair addresses FINAL-002 F1,
the pre-review commit lint ranging from the activation base and refusing
subjects already merged into the target's main branch.

Integrated main `04c45cfae32d337b367496f79f708d0913f1cb7f` through
`npm run worktree -- integrate WO-013`, taking starter v0.99.0 and core's
v0.97.1 lint repair. The two documentation conflicts preserve the newer
planning amendments and the local review history. Checkpoint
`refs/dotln/checkpoint/WO-013/16`, the integration stash and the verified
intake backup remain retained. [D016](decisions.md#wo-013-d016) records the
integration, changed evidence inputs and carried-forward claims.

The repaired rule checks the subject's commits from its merge base with the
fetched target main, when that merge base descends from the activation base.
The activation base remains provenance. The same lint used by
`final-review-result pass` now passes for the actual draft: one commit with a
61-character subject, instead of the 17-commit range containing the two
78/90-character merged subjects. The [executable probe](repair-commit-lint.mjs)
checks clean target status and an unchanged control segment before and after.
Seven imported transition regressions pass, including absent-ref fallback
with origin offline and new format, identifier and attribution refusals.
See [lint evidence](repair-review-lint.json) and [D017](decisions.md#wo-013-d017).

Target HEAD remains `99a30befa150e5d77a64259013e62b9d0372270e`, tree
`dc997234bc57801c1909a76fa45f5524f3e3dfab`, with clean status. No target byte
changed. The current target-gate reader accepts the existing complete review
row `target-gate:b11301fb-7e55-4bd4-b12e-69c65e5f22eb` against this exact tree
and the current command declaration. Its seven commands, zero target-byte
mutation and zero new base-checkout files are recorded in the prior
[gate results](repair-gates.json); [current gate evidence](repair-review-gates.json)
records the reuse observation. No application or browser test is claimed
fresh in this repair. All four filed verification/final-review reports still
match their recorded hashes.

**Criterion 1:** met — the unchanged core routes declare Scene and Machinery; app.routes.ts lazy-loads both features and retains the Board redirect. The read source and accepted target review row cover the literal checks, core tests and app build at this tree.

**Criterion 2:** met — the unchanged menu and group templates contain no injection or router import. The read menu spec asserts one labelled navigation landmark, three projected groups, valid lists and the empty Tools line. The accepted target lint/test row covers the shell suite at this tree.

**Criterion 3:** met — the unchanged feature entry points export their routes only and both projects retain scope:dotln/type:feature. Both suites are selected by the accepted target test command; FINAL-002 records the uncached four-project run at this same tree. D005's literal multi-project command issue remains a recorded order-text limitation, with its run-many remedy now applied to later orders by planning.

**Criterion 4:** met — the accepted target review row covers e2e and visual at the unchanged tree. The read sub-apps browser spec covers all three menu headings, both arriving pages, root redirect, keyboard access, the board's axe threshold and no overflow at 360/768/1440. FINAL-002 records VER-002's 57 uncached browser tests at this tree. This repair reuses that evidence and does not claim a new browser run.

**Criterion 5:** met — the four menu keys remain in the unchanged en.json, and tools:lint includes i18n checking in the accepted target gate. The historical structural checks and FINAL-002's literal readback identify the required keys.

**Criterion 6:** met — both unchanged sub-app reference documents and their control-record/graduation rules remain present. The generator log retains the two library invocations, attempts and results under the corrected dated heading. The prior preservation check and the unchanged target tree preserve this criterion's evidence.

**Criterion 7:** met — targetGateEvidence accepts the review row for all seven declared commands at the exact current target tree without mutation; the original full Preflight precedes the first gate in command-results.json. The fresh launchpad complete review passes, and completion consumes the passing npm run test:docs row run after this handoff's last edit.

The complete `npm test -- --review` passed seven fresh tasks in 14.482 seconds
at code identity `dbd80775eda0b78bb08729662389d78c2905051201848699f91eb04b1adbc897`,
recorded 2026-10-25T21:52:13.617Z. Host-lane waiting was 50 ms. The seven
imported lint regressions took 23.835 seconds. Publication, installed-harness,
release-surface and planning checks pass; planning reports 10 receipts,
10 passes and no advisories. `npm run sync` reports all nine artifact groups
current. Release preparation records the target-order no-op; no local
component version was changed.

self-review: found 1; fixed 1; recorded 0

That line preserves the original implementation's two worker counts in
[self-review](self-review.md). This repair spawned zero workers. Its separate
review passes checked the real source/range/criteria, then the imported
negative controls, preserved target identity, filed report hashes and current
gate coverage. No new defect was found. The two-fresh-worker rule applies to
implementation-ready; this dispatch records repair-complete.

**Actor attestation:** {"harness":"codex-cli","harnessVersion":"0.164.0","model":"gpt-6-astra","effort":"max","source":"codex-session-readback"}

**Process cost:** entry 43471 tokens; handoff 4336905 tokens; source codex-transcript-counter

Scope: dispatch. Entry cutoff: 2026-10-25T21:44:29.029Z. Handoff cutoff:
2026-10-25T21:52:22.455Z, before this handoff and the final document gate.
The handoff total includes 4,186,752 cached input tokens; these are cumulative
usage counters, not unique context. USD cost is unavailable. Final counters
stay in the ignored receipt and response. Reusing the unchanged target gate
preserves the same checked outcome; the fresh complete launchpad run pays for
the changed kit, and the seven transition controls directly cover the repair.
No design fork requiring a comparative implementation experiment arose.

The outcome matches the dispatch: the integration blocker's lint now passes,
with the original target and criteria preserved. D005's multi-project wording
is handled in the amended orders; its dependency wording remains with
FUP-2138dd6781c01e55 if a successor is filed. D007's not-found work is allocated
to WO-014. D008/D009/D015's publication rows remain deferred through the next
independent verification and final review, with their repair steps recorded
as discharged. No live final-review result or publication is inferred from
the read-only lint probe.

The adjacent queue has no pending item. The nested-repository scan found none
outside intake, private control, installed dependencies and generated caches;
symlinks were not traversed. Imported test fixtures remove their temporary
repositories. No independent monitor or server was started. Current authored
outputs are read back; generated artifacts are covered by generation/check
evidence. No push, PR operation, target commit or release publication occurred.
Next is the operator's `resume: verify` dispatch; its verifier republishes the
draft after a pass, and final review remains a separate dispatch.
