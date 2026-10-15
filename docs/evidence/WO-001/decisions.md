# WO-001 decisions

Structured decisions of the WO-001 executor session (environment truth),
dispatched by the operator's `resume: next` on 2026-10-14. Each JSON block is
the record `npm run meta` indexes.

## WO-001-D001 Record the operator's local settings change and sandbox retry

The operator created `.claude/settings.local.json` before this dispatch and
asked for a note that it was needed, then asked for the sandbox and lock
acquisition checks to be retried with the sandbox off. Both are recorded in
[`environment.md`](../../discovery/environment.md#operator-note-local-claude-code-settings)
by metadata only.

```json
{
  "id": "WO-001-D001",
  "date": "2026-10-14",
  "dispatch": "resume: next; the operator reported adding a local Claude Code settings file, asked that the need be noted, and asked to retry the sandbox and lock acquisition checks with the sandbox off",
  "decision": "Record the local settings file as operator-attested with observed metadata only, the operator-reported pre-change refusal as operator-attested, and the retried confinement probe (not in force) and a direct shipped-lock acquisition (acquired and released twice) as observed; label local-over-user precedence ambiguous for want of a recorded pre-change refusal.",
  "evidence": [
    "git check-ignore -v .claude/settings.local.json: .gitignore:18; modification time 2026-10-14T09:00:08Z, before the 09:00:47Z dispatch",
    "node docs/evidence/WO-001/probe-confinement.mjs: marker claude-code, write to .claude/hooks written, inForce false, probeFilesLeft 0",
    "node docs/evidence/WO-001/probe-host-lock.mjs: acquired 126 ms, then 3 ms",
    "user settings sandbox.enabled true; project-local settings sandbox.enabled false",
    "no earlier sandbox or lock-acquisition run in this instance's local harness records (pattern counts only)"
  ],
  "rejected": [
    "Copy the allow rules into the record: they are operator-private configuration that may name local paths or tools, and this record copies only effort, model and sandbox switches (environment.md header).",
    "Treat the failing kernel-lock test as the retry result: it fails at import on a fixture the export does not ship, before any lock is taken (WO-001-D004)."
  ],
  "reopenWhen": "The operator changes the user-level sandbox posture, or this instance commits a project setting that replaces the ignored local file."
}
```

## WO-001-D002 Hand the operator an upstream issue prompt at the end of the order

```json
{
  "id": "WO-001-D002",
  "date": "2026-10-14",
  "dispatch": "resume: next; the operator asked for a copy-paste prompt for the upstream DotLn worker naming the kit issues met here, at the end of this order or of the session if the lifecycle loop stalls",
  "decision": "Close the executor handoff, or the session if the execute, verify, final review and release close loop stalls, with one copy-paste prompt for the upstream DotLn worker that names each decision here carrying a followup (WO-001-D004 through WO-001-D007) with its evidence and intended fix, the final-review path for the seeded order on main (WO-001-D007) first because it gates this order.",
  "evidence": [
    "Four kit-owned gaps were met outside this order's write authority (scripts/, docs/product/, the executor procedure), all in files hashed in KIT-MANIFEST.json",
    "docs/planning/followups.json carries them as FUP-890bb31b940f69c3, FUP-a922520a7e074954, FUP-0e05466fbfbe8548 and FUP-2bbb348a91f7ea40"
  ],
  "rejected": [
    "File the issues upstream from this session: publishing outside this repository needs separate operator authorization.",
    "Edit the kit files here: the order's authority admits writes only under docs/discovery/, docs/control/local/ and docs/evidence/WO-001/, and kit edits would diverge from KIT-MANIFEST.json."
  ],
  "reopenWhen": "The operator authorizes filing upstream directly from a session, or docs/planning/followups.json becomes the agreed upstream channel."
}
```

## WO-001-D003 Run each harness smoke from scratch, not the live smoke

```json
{
  "id": "WO-001-D003",
  "date": "2026-10-14",
  "dispatch": "resume: next (WO-001 checklist items 2 and 3)",
  "decision": "Run the one permitted print-mode smoke per harness from a scratch directory outside the repository under the bounded wrapper, and leave the live smoke untested.",
  "evidence": [
    "Claude, Codex and Copilot smokes each returned OK in their structured formats (environment.md, section 2)",
    "The bounded wrapper refuses outside the Git root (Git host observation unavailable), so it starts at the root and changes into scratch"
  ],
  "rejected": [
    "Smoke inside the repository: a second session would fire this launchpad's hooks and contend for the one-writer reservation held by this session.",
    "Run DOTLN_LIVE_HARNESS=1 node scripts/harness-live-smoke.mjs executor 001: the order leaves it to the instance and it launches a full harness session, beyond a bounded inspection."
  ],
  "reopenWhen": "A later order needs observed in-repository hook firing or instruction loading for Codex or Copilot, or the operator asks for the live smoke."
}
```

## WO-001-D004 Shipped host-guard test imports an unshipped fixture

`scripts/test-host-guard.test.mjs` ships in this launchpad (it is in
`KIT-MANIFEST.json`), but it imports `corpus/harness/bounded-findings.mjs`,
which the export does not carry. Running it fails at module load
(`ERR_MODULE_NOT_FOUND`) before any test runs. `npm test` here does not select
it because its suite, `runner-fixtures`, is core-only, so no gate fails; a
direct run, such as the operator's lock-acquisition retry, does.

```json
{
  "id": "WO-001-D004",
  "date": "2026-10-14",
  "dispatch": "resume: next; the operator asked to retry the sandbox and lock acquisition checks now that the sandbox is off",
  "decision": "Record the packaging defect and defer its fix to the upstream kit; exercise the shipped lock directly instead. The operator-directed retry ran this core-only test file once, which crosses the order's non-goal of running core suites in this instance; it failed at import and no core suite ran again.",
  "evidence": [
    "Kit v0.81.0 (UPSTREAM.md tag): node --test --test-name-pattern=\"WO-185 kernel locks\" scripts/test-host-guard.test.mjs: ERR_MODULE_NOT_FOUND corpus/harness/bounded-findings.mjs, tests 1, fail 1",
    "Kit v0.81.0 (UPSTREAM.md tag): scripts/test-runner.mjs declares runner-fixtures as kit core-only and lists corpus/harness/bounded-findings.mjs among its sources",
    "Kit v0.81.0 (UPSTREAM.md tag): corpus/harness/ in this export holds only id-corpus-lib.mjs, wo101-id-corpus.test.mjs and wo101-support.mjs"
  ],
  "rejected": [
    "Copy the fixture from core: the Clean Room floor and this order's authority forbid importing kit files outside the export.",
    "Delete the shipped test here: it is a kit-manifest file, and deleting it would diverge from KIT-MANIFEST.json."
  ],
  "reopenWhen": "The upstream kit either ships the fixture with the test or stops exporting core-only test files.",
  "followup": "Upstream kit export: ship every source scripts/test-runner.mjs lists for the runner-fixtures suite (corpus/harness/bounded-findings.mjs among them) with scripts/test-host-guard.test.mjs, or stop exporting the core-only runner-fixtures test files to launchpads."
}
```

## WO-001-D005 Discover misses Codex and Copilot effort selectors

`npm run discover -- harness <name>` sets `sessionEffortSelector` only when the
harness help matches `--effort`. Copilot 1.0.94 names its selector
`--reasoning-effort`, and Codex 0.162.1 selects effort through
`-c model_reasoning_effort=...`, so the probe reports
`effortSelectorPresent: false` for both. This order recorded both selectors
directly instead.

```json
{
  "id": "WO-001-D005",
  "date": "2026-10-14",
  "dispatch": "resume: next (WO-001 deliverable: effortReadbackProbe selectors)",
  "decision": "Record Copilot's selector as observed from copilot --help and Codex's as documented locally from scripts/probe-codex-effort.mjs, beside discover's version rows, and defer the probe fix to the upstream kit.",
  "evidence": [
    "Kit v0.81.0 (UPSTREAM.md tag): npm run discover -- harness copilot-cli: effortSelectorPresent false; copilot --help: --reasoning-effort [none, minimal, low, medium, high, xhigh, max]",
    "Kit v0.81.0 (UPSTREAM.md tag): npm run discover -- harness codex-cli: effortSelectorPresent false, configSelectorPresent true",
    "Kit v0.81.0 (UPSTREAM.md tag): scripts/discover.mjs: effortSelectorPresent is /--effort\\b/ on the help text"
  ],
  "rejected": [
    "Leave the Copilot and Codex selectors unrecorded: every later attestation from those harnesses would then rest on persisted values alone.",
    "Patch scripts/discover.mjs here: it is kit-owned and outside this order's write authority."
  ],
  "reopenWhen": "The upstream discover probe records these selectors itself; the hand-recorded rows can then be replaced by a rerun.",
  "followup": "Upstream kit: teach scripts/discover.mjs probeHarness to recognize Copilot's --reasoning-effort (with its value list from the help) and Codex's -c model_reasoning_effort selector, so a launchpad's discovery records them without hand edits. Codex help lists no effort values: take them from the kit's scripts/probe-codex-effort.mjs list, or record the selector with values unknown."
}
```

## WO-001-D006 Exported execution guide links to paths the launchpad lacks

Of the 57 distinct relative link targets in the exported
`docs/product/07-execution-guide.md`, 51 do not exist in this launchpad, and 46
of those are not among the core documents `UPSTREAM.md` lists as pointers.
Examples: `../AI-HARNESS-SECURITY.md` (the launchpad's copy sits at the
repository root), `../evidence/WO-090/README.md`, `../work-orders/WO-079-worktree-sync.md`.

```json
{
  "id": "WO-001-D006",
  "date": "2026-10-14",
  "dispatch": "resume: next (reading docs/product/07-execution-guide.md, Model-specific notes, for the Codex effort contract)",
  "decision": "Record the dangling links with a reproducible inventory and defer their repair to the upstream kit export.",
  "evidence": [
    "Kit v0.81.0 (UPSTREAM.md tag): docs/evidence/WO-001/execution-guide-links.txt (generated by docs/evidence/WO-001/execution-guide-links.mjs): 57 distinct relative targets, 51 missing, 46 missing and absent from UPSTREAM.md pointers",
    "Kit v0.81.0 (UPSTREAM.md tag): docs/AI-HARNESS-SECURITY.md absent; AI-HARNESS-SECURITY.md present at the repository root as a sanitized template"
  ],
  "rejected": [
    "Rewrite the links here: docs/product/ is kit-owned and outside this order's write authority.",
    "Ignore them: a reader following the guide's pointers in a launchpad reaches nothing."
  ],
  "reopenWhen": "The upstream export rewrites core-only links to pinned upstream pointers or lists them in UPSTREAM.md.",
  "followup": "Upstream kit export: rewrite relative links in exported product documents that resolve to core-only evidence, planning or work-order paths into pinned upstream pointers (or list them in UPSTREAM.md), and point the AI-HARNESS-SECURITY.md links at the launchpad's root copy; docs/evidence/WO-001/execution-guide-links.txt lists every target in 07-execution-guide.md."
}
```

## WO-001-D007 Release preparation does not apply to the seeded order on main

The executor procedure's release step refused because this seeded first order
runs on `main`, as the README's activation step places it, while
`release prepare` requires a branch named after the order. This order changes
no versioned component, so there was nothing to classify or bump.

```json
{
  "id": "WO-001-D007",
  "date": "2026-10-14",
  "dispatch": "resume: next (executor procedure step 4)",
  "decision": "Record the refusal and continue to the document and product gates without a release preparation; the order's diff touches only docs/discovery/, docs/evidence/WO-001/ and generated indexes (WO-001-D010).",
  "evidence": [
    "npm run release -- prepare --local: Error: release prepare requires the selected wo-NNN worktree; nothing was written",
    "Kit v0.81.0 (UPSTREAM.md tag): scripts/lib/release-preparation.mjs line 113: the current branch must equal the order id in lower case",
    "Kit v0.81.0 (UPSTREAM.md tag): README.md step 6 activates WO-001 on main; git branch --show-current: main",
    "Kit v0.81.0 (UPSTREAM.md tag): scripts/worktree.mjs publish looks up a worktree on branch wo-001 and otherwise throws no worktree found for wo-001; the final-review procedure authorizes pushing only the order's WO branch and never main (.claude/skills/dotln-reviewer/SKILL.md line 67); not yet run"
  ],
  "rejected": [
    "Start a wo-001 worktree to satisfy the step: the order was activated and dispatched on main, and moving it would change its recorded branch without operator direction.",
    "Mark the step done: no preparation ran."
  ],
  "reopenWhen": "Final review or release close for WO-001 requires a release preparation that main cannot produce, or the operator moves WO-001 to a wo-001 worktree.",
  "followup": "Upstream kit: give the seeded WO-001 that README.md activates on main a documented path through release prepare --local and final review (which publishes only a wo-NNN branch through worktree publish), either by starting it in a wo-001 worktree or by admitting main for it."
}
```

## WO-001-D008 Generate the missing lineage index the document gate needs

The first `npm run test:docs` failed its `lineage` check, and seven checks that
depend on it, because `docs/lineage/README.md` did not exist. README setup step
6 generates it with `node scripts/lineage.mjs index`; that step had not run in
this instance. The failure was inherited from the base commit, not introduced
by this order.

```json
{
  "id": "WO-001-D008",
  "date": "2026-10-14",
  "dispatch": "resume: next (executor procedure step 8, document gate; adjacent repair)",
  "decision": "Run node scripts/lineage.mjs index once to generate docs/lineage/README.md, a generated projection of the existing idea ledger, instead of carrying the inherited failure into review.",
  "evidence": [
    "npm run test:docs: FAIL lineage: ENOENT docs/lineage/README.md; entropy, reader-profiles, plan, registrations, artifact-corpus, plan-refutation-current and resident-bind failed on the lineage preflight",
    "node scripts/lineage.mjs index: Generated docs/lineage/README.md (949 bytes, zero idea entries)",
    "README.md setup step 6 names this command"
  ],
  "rejected": [
    "Carry the failure to verification: the procedure requires the document gate green, and the repair is the documented setup command with no authored content.",
    "Hand the operator the command: the executor procedure forbids asking the operator to run a command in its place when the session can run it."
  ],
  "reopenWhen": "A later kit update ships the lineage index in the export or changes the setup steps so a fresh instance already has it."
}
```

## WO-001-D009 Record the effort-level readback value

The order's authority says "no secrets in output (environment variable names
only, never values)", while its deliverable requires a readback
`{ "classification", "value" }` per harness. For Claude Code that readback is
the `CLAUDE_EFFORT` environment variable, which `npm run discover` itself
records as `selectedSessionReadback.value`.

```json
{
  "id": "WO-001-D009",
  "date": "2026-10-14",
  "dispatch": "resume: next (WO-001 deliverable: effortReadbackProbe readback; self-review finding)",
  "decision": "Record the CLAUDE_EFFORT value xhigh in environment.json and environment.md as the one named exception to the names-only rule, reading that rule as scoped to secrets: an effort level is not a credential, token, host or account identifier, and the deliverable requires it.",
  "evidence": [
    "npm run discover -- harness claude-code wrote selectedSessionReadback with channel CLAUDE_EFFORT and value xhigh",
    "scripts/resume.mjs hasRecordedEffortValue reads selectedSessionReadback.value",
    "docs/evidence/WO-001/check-attestation.mjs: claude-code 2.1.299 xhigh prints no advisory"
  ],
  "rejected": [
    "Drop the Claude readback and label it untested: the value was observed, and the deliverable names this shape.",
    "Record other environment values: none is needed, and every other variable stays named only."
  ],
  "reopenWhen": "The operator rules that no environment value may be recorded, even a non-secret readback; then remove selectedSessionReadback.value for claude-code and label the readback untested."
}
```

## WO-001-D010 Account for writes outside the order's paths

The order's authority admits writes under `docs/discovery/`,
`docs/control/local/` and `docs/evidence/WO-001/`. These other effects
happened, each named here with what admitted it.

```json
{
  "id": "WO-001-D010",
  "date": "2026-10-14",
  "dispatch": "resume: next (self-review finding on write scope)",
  "decision": "Keep the executor procedure's generated projections (docs/work-orders/README.md and HISTORY.md from npm run work-orders -- index, docs/lineage/decisions-index.md from npm run meta, docs/planning/followups.json from npm run plan -- followups --sync, docs/lineage/README.md per WO-001-D008) and acknowledge two transient effects: the confinement probe created and deleted one file in .claude/hooks, and the lock probe compiled its native helper into a scratch directory outside the repository.",
  "evidence": [
    "The executor skill procedure requires npm run work-orders -- index after dispatch, npm run meta after decisions change, and npm run plan -- followups --sync after a decision names a followup",
    "probe-confinement.mjs output: probeFilesLeft 0; node scripts/harness.mjs check passed after the probe writes (34 generated surfaces)",
    "The lock helper host-lock-<digest> was written into the private scratch directory passed to probe-host-lock.mjs"
  ],
  "rejected": [
    "Skip the generated projections: the procedure and the document gate require them current.",
    "Skip the confinement probe: the operator asked for the sandbox check to be retried, and it is the launchpad's own sandbox test."
  ],
  "reopenWhen": "A verifier finds a generated projection or the .claude/hooks directory changed beyond what these commands produce."
}
```

## WO-001-D011 Recover the verified order after the starter update

This record synthesizes the operator's 2026-10-15 direction and supplied
evidence from the original checkout's session. Historical actions below are
operator-attested; the startup and integrity checks in this worktree are
identified separately as observed. The operator made no Git changes: the
original checkout's session performed them under the operator's authorization.
The operator merged the update pull request.

The move satisfies D007's stated reopening condition. This new record reopens
that decision without editing its historical bytes. Release preparation and
final review belong in `wo-001`; this session is limited to startup, recording
the direction and confirming preservation, then stops for the operator's
separate final-review dispatch.

```json
{
  "id": "WO-001-D011",
  "date": "2026-10-15",
  "dispatch": "scope expand: operator direction of 2026-10-15: take starter v0.82.0 into main by its own PR, move WO-001's verified records into this wo-001 worktree, run the README recovery startup, record the direction, handle D007's reopening, then stop",
  "decision": "Retain the completed starter update on main and WO-001's recovered records on wo-001, preserving the recorded verified phase and VER-001 pass. Reopen WO-001-D007 because the operator-authorized move to wo-001 removes the observed main-branch mismatch; the refreshed README supplies the recovery route. Keep release preparation and final review for the separate operator dispatch, without claiming that either has run. Confirm restored-record integrity and retain the named recovery stash in the original checkout.",
  "evidence": [
    "Operator-attested before the update: resume status on main was WO-001 verified, VER-001 pass, legal next action final-review; the writer reservation belonged to the directing session and no other agent was working in that checkout.",
    "Operator-attested upstream revision: upstream/main fb3cd05, Refresh starter to v0.82.0; core 7b66f8b, tag v0.82.0; its scripts carry WO-210 tests.",
    "Operator-attested preview with the incoming launchpad from a temporary detached worktree, removed afterwards: 46 replaced, 11 added, 3 removed, 0 refused, 866 unchanged; no instance actions declared.",
    "Operator-attested preservation: the untracked generated docs/lineage/README.md from WO-001-D008 was deleted before the stash, as the README requires. Stash WO-001 main recovery, c2bce2cdb672ac6800b11cf7273f2d9958049c24, holds the docs/planning/followups.json change and 17 untracked files.",
    "Operator-attested update branch: chore/starter-update fast-forwarded to fb3cd05; harness emit changed no tracked file; the lineage index was committed as c1f9a12; harness check and lineage index --check both exited 0.",
    "Operator-attested publication: gh pr create was refused twice by Claude Code's auto-mode permission check. Under operator authorization, the original-checkout session added a pull-request allow rule to its ignored .claude/settings.local.json; the retry opened origin PR #1. No private settings contents are copied into this record.",
    "Operator-attested merge: the operator merged PR #1 as 2ed8447; the original-checkout session fast-forwarded main to it, ran bootstrap and confirmed main was clean.",
    "Operator-attested move: git worktree add -b wo-001 ../DotLn-Instance-wo-001 main, followed by git stash apply c2bce2cdb672ac6800b11cf7273f2d9958049c24 in the new worktree, restored 18 paths, each byte-identical to the stash.",
    "Operator-attested override history: the original session's attempt to write this record into the new worktree was refused by DotLn as an outside-project write (WO-144). The operator entered operator override: at 2026-10-15T13:57:21.661Z and ended it at 2026-10-15T14:00:12.621Z. The one write attempted under the override was denied by Claude Code's auto-mode permission check, so the override changed nothing. No order was open in the original checkout, and the harness requested that this history be recorded in the order's decisions.",
    "Observed at this session's entry: physical cwd and Git root are the selected wo-001 worktree; branch wo-001, HEAD 2ed844790d3b5a660612f257646a51a1f380553e. The recovery stash remains listed. Direct comparison with its tracked tree and third-parent untracked tree found all 18 restored paths byte-identical with matching executable modes, before this session's writes.",
    "Observed recovery startup: node scripts/bootstrap.mjs exited 0 (2 preparation steps, 34 generated harness surfaces). The worktree's own ignored local-terms list was registered from the original checkout's list without displaying its contents; npm run terms -- check CLAUDE.md README.md docs/product/07-execution-guide.md exited 0 with local-terms list: present. npm run meta exited 0 and regenerated the work-order index.",
    "Observed canonical status after startup: npm run resume -- status --json exited 0 with WO-001 verified, latestVerification VER-001, latestVerdict pass, finalReview null and legalNextActions [final-review]. The preserved control segment has four events ending in VerificationCompleted; VER-001's bytes match the reportHash in that event. The control records, executor handoff and filed verification were preserved, not rewritten or replayed.",
    "Observed reopening evidence: the refreshed README's WO-001 recovery section requires startup in wo-001, preserves the recorded phase without reactivation or repeated verification, and places release preparation and final review in wo-001. D007's follow-up is FUP-2bbb348a91f7ea40; npm run meta synchronizes this reopening observation into that existing source for the separately dispatched final review to judge."
  ],
  "rejected": [
    "Commit WO-001's records on main or on chore/starter-update: the dedicated starter update PR must carry no work-order records.",
    "Reactivate WO-001 or repeat VER-001: recovery preserves a verified order and its filed passing report; final-review remains the legal next action.",
    "Edit D007 or the historical handoff and verification to describe the new branch: preserve the original evidence and record the changed circumstances in this new decision with a structured reopening reference.",
    "Run release preparation or final review during this startup session: the operator limited this dispatch to startup, decision recording and an integrity report, then stop.",
    "Leave the recovery and override history unrecorded: that would omit the operator's direction and D007's now-observed reopening trigger.",
    "Drop the recovery stash after applying it: the operator requires it retained in the original checkout until integrity is confirmed; this session leaves it intact."
  ],
  "reopenWhen": "A restored record fails comparison with the retained stash, the recorded verified phase or VER-001 hash no longer agrees with the preserved control segment, release preparation or final review reproduces D007's routing refusal on wo-001, or the operator changes this recovery direction.",
  "reopens": {
    "decisionId": "WO-001-D007",
    "observation": "The operator authorized moving WO-001 into its own worktree; this session observed branch wo-001 at merged-main commit 2ed8447 with all 18 restored paths intact and canonical status still verified with VER-001 pass and final-review next. This satisfies D007's condition that the operator moves WO-001 to a wo-001 worktree. Release preparation and final review remain unrun in this startup session."
  }
}
```

## WO-001-D012 Record the operator's scope expansion for release preparation and publication from wo-001

The operator's `resume: final review` dispatch on 2026-10-15 carried an
explicit scope expansion for WO-001. The order's authority admits writes under
`docs/discovery/`, `docs/control/local/` and `docs/evidence/WO-001/` only, and
it was activated on `main` under the v0.81.0 README, which
[WO-001-D007](#wo-001-d007-release-preparation-does-not-apply-to-the-seeded-order-on-main)
recorded as the reason release preparation refused. The recorded recovery
([WO-001-D011](#wo-001-d011-recover-the-verified-order-after-the-starter-update))
moved the order to `wo-001`, so D007's reopen condition is met. The expansion
authorizes, for this final review only, release preparation in `wo-001`, the
release lines only if the starter update had left any absent (it left none),
the review surfaces and release notes a self order requires, and publication
of the `wo-001` branch alone. The starter update on `main` is base, not
WO-001's change. The operator directed that `npm run plan -- amend-order` not
be run: it refuses the seeded WO-001 because no planning receipt has judged
it, which is existing behavior, and this expansion changes no byte of the
order's text, so there is no amended text to bind.

```json
{
  "id": "WO-001-D012",
  "date": "2026-10-15",
  "dispatch": "resume: final review; operator scope expansion of 2026-10-15: record it, skip amend-order (refuses the seeded order), D007's reopen condition is met, prepare the release locally, write release notes, review, publish only wo-001",
  "decision": "Record the operator's expansion as the authority for this final review's effects beyond the order's own write paths: release preparation in wo-001, the release lines only if the starter update had left any absent, the review surfaces and release notes under docs/final-reviews/WO-001/, and publication of the wo-001 branch alone. Treat the v0.82.0 starter update on main as base, so the branch carries only WO-001's records. Do not run npm run plan -- amend-order: the operator directed against it and the expansion changes no byte of the order's text.",
  "evidence": [
    "Observed at this session's entry on wo-001: node scripts/bootstrap.mjs exited 0 (34 generated surfaces; local-terms list: present); the worktree's ignored local-terms list has the same SHA-256 as the main checkout's list, 9 lines, contents not printed; npm run terms -- check README.md CLAUDE.md package.json printed local-terms list: present; npm run meta exited 0; npm run resume -- status --json showed WO-001 verified, VER-001 pass, finalReview null and legalNextActions [final-review].",
    "Observed: docs/work-orders/WO-001-environment-truth.md already ends its heading with (v0.1.0) and declares Release classification: minor; README.md carries one DOTLN-RELEASE-BEGIN/END block holding the single line This source prepares DotLn `v0.1.0`. All three came with the starter update commits on main (2ed8447 Take starter v0.82.0), so this session added no release line.",
    "Observed: git rev-parse origin/main, main and HEAD all print 2ed844790d3b5a660612f257646a51a1f380553e, and git log main..wo-001 is empty, so the branch's publication diff is WO-001's records alone.",
    "WO-001-D007 reopenWhen names the operator moving WO-001 to a wo-001 worktree; WO-001-D011 records that move and reopens D007.",
    "The reviewer procedure names npm run plan -- amend-order for an expansion that changes a judged order's text; this expansion changes none, and the operator directed that the command not be run."
  ],
  "rejected": [
    "Run npm run plan -- amend-order WO-001 WO-001-D012: the operator directed against it, the seeded order has no planning receipt for it to bind, and no order text changed.",
    "Add the release lines again or edit the order's text: every line the zero-marker refusal would name is already present from the starter update, and a second copy would make release prepare refuse a duplicate declaration.",
    "Publish main or the starter update as part of this order: the final-review phrase and the operator's words authorize pushing wo-001 and opening its pull request only."
  ],
  "reopenWhen": "The operator withdraws or changes this expansion, release preparation on wo-001 assigns a target other than v0.1.0, or a planning receipt later judges WO-001 and the planning log needs the expansion bound through amend-order."
}
```

## WO-001-D013 Complete the integration record after the starter update

<!-- integration refs/dotln/checkpoint/WO-001/6 -->

`worktree integrate` wrote this record as a draft during the final review;
the reviewer completed it. `main` and `wo-001` were the same commit, so
the merge changed nothing. The starter update that made them equal is base,
not WO-001's change, and it satisfied four of the executor's carried-forward
upstream follow-ups, which are disposed in the register with this record as
their source.

```json
{
  "id": "WO-001-D013",
  "date": "2026-10-15",
  "dispatch": "resume: final review; worktree integrate WO-001",
  "decision": "Integration record completed by the reviewer: main and wo-001 were the same commit, so the merge changed nothing and both bases, the checkpoint and the named stash are retained. Carried-forward claims judged against the integrated base: the v0.82.0 starter update satisfied the conditions of WO-001-D004, WO-001-D005, WO-001-D006 and WO-001-D007, so their follow-up rows are disposed as settled in docs/planning/followups.json; D001 to D003 and D008 to D010 stand unchanged. No component-version collision exists: no release tag exists yet and release preparation keeps v0.1.0. Changed evidence inputs are recorded here rather than by editing the verified records. The two regeneration steps the integration left pending are kit gaps in a launchpad and are boarded as the follow-up below.",
  "evidence": [
    "npm run worktree -- integrate WO-001: Bases 2ed844790d3b5a660612f257646a51a1f380553e -> 2ed844790d3b5a660612f257646a51a1f380553e; authored conflicts none; retained stash b753993a73e6718bd265b91dabd9d5b0b3f80c26 (WO-001 integrate 2026-10-15); checkpoint refs/dotln/checkpoint/WO-001/6; 19 working-tree entries after it, the 18 restored records plus docs/final-reviews/WO-001/PR.md.",
    "Pending: runtime: npm run build --silent: ENOENT tsconfig.json; pending: publication locks: missing lock for docs/publication/everyday-ai-user-toc.md. This export carries compiled runtime without package sources or a tsconfig and declares no edition page (npm run publication:check: publication: no editions declared), so neither step can complete in a launchpad and --continue repeats the same two pending lines.",
    "Kit v0.82.0 (UPSTREAM.md tag): scripts/test-host-guard.test.mjs is absent from the export, so the shipped-test-without-fixture defect of WO-001-D004 no longer exists here; corpus/harness/ still holds only id-corpus-lib.mjs, wo101-id-corpus.test.mjs and wo101-support.mjs.",
    "Kit v0.82.0 (UPSTREAM.md tag): scripts/discover.mjs line 39 probes Copilot with --reasoning-effort and line 47 records Codex's -c model_reasoning_effort=<value> control, the fix WO-001-D005 asked for; the hand-recorded rows in environment.json stay the dated record until a later order reruns discover.",
    "Kit v0.82.0 (UPSTREAM.md tag): node docs/evidence/WO-001/execution-guide-links.mjs now prints Distinct targets 57; missing 50; missing and unlisted 0, and ../../AI-HARNESS-SECURITY.md exists; the filed inventory stays the v0.81.0 record WO-001-D006 cites (57; 51; 46).",
    "Kit v0.82.0 (UPSTREAM.md tag): README.md step 6 starts WO-001 in its own worktree and the recovery section places release preparation and final review in wo-001; npm run release -- prepare --local on wo-001: WO-001 target v0.1.0 remains current; this final review runs on wo-001, the path WO-001-D007 asked for.",
    "Changed evidence input: claude --version prints 2.1.300 on 2026-10-15 while the dated record observed 2.1.299 on 2026-10-14; the verifier's installed probe therefore fails its version assertion now, and parseActor accepts a 2.1.300 attestation on the recorded 2.1 version line without advisory.",
    "Changed evidence input: docs/evidence/WO-001/check-attestation.mjs attests the running session's CLAUDE_EFFORT; in this max session its claude-code xhigh case refuses by the parser's readback-equality rule, as its header comment anticipates, while the verifier's records probe with operator-attested fixtures still accepts all three recorded pairs with zero advisories.",
    "npm run release -- check-surfaces --local: every rule PASS (release block v0.1.0, five component versions with no previous release, six workspace pins, GitHub body profile, license surfaces); docs/LEGAL.md pins unavailable because this instance declares no such file. node scripts/harness.mjs check: 34 generated surfaces; local-terms list: present."
  ],
  "rejected": [
    {
      "option": "Rewrite reviewed commits or discard the integration stash",
      "reason": "Both histories and recovery material must remain available."
    },
    {
      "option": "Edit scripts/lib/worktree-integration.mjs so the regenerate step skips the runtime build and the publication locks in a launchpad",
      "reason": "The file is kit-owned and hashed in KIT-MANIFEST.json; the gap breaks no criterion and no behavior main had, so it is a follow-up by rule."
    },
    {
      "option": "Regenerate docs/evidence/WO-001/execution-guide-links.txt or environment.json against v0.82.0",
      "reason": "They are the verified dated records; the changed inputs are recorded here and in the final-review report instead."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a later kit update makes the integration's regenerate step complete in this launchpad, or a rerun of discover disagrees with the hand-recorded selector rows.",
  "followup": "Upstream kit: make worktree integrate's regenerate step skip the runtime build where the export carries compiled runtime without package sources (no tsconfig.json) and skip publication locks where no edition page is declared, so an integration in a launchpad can report complete instead of leaving two pending steps that --continue can never clear."
}
```

Integration date: 2026-10-15. Original base: `2ed844790d3b5a660612f257646a51a1f380553e`.
Fetched main: `2ed844790d3b5a660612f257646a51a1f380553e`. Checkpoint: `refs/dotln/checkpoint/WO-001/6`.
Named stash retained: `b753993a73e6718bd265b91dabd9d5b0b3f80c26` (WO-001 integrate 2026-10-15).
Resolved projections: none.
Release preparation: WO-001 target v0.1.0 remains current. Files changed: docs/final-reviews/WO-001/PR.md. Meter snapshot not written: this checkout holds no session journal of WO-001. Tag observation: local snapshot only.
Carried-forward claims: judged above; D004 to D007 satisfied by the v0.82.0 starter and disposed as settled, the rest unchanged; no acceptance judgment is recorded here, FINAL-001 records it.
Authored conflicts observed: none.
Affected checks: `node scripts/harness.mjs check` passed (34 generated surfaces; local-terms list: present); `npm run publication:check` reported no editions declared; `npm run release -- check-surfaces --local` passed every rule; `npm test -- --review` is recorded in FINAL-001.md.

## WO-001-D014 Record the dispatch gap met when the phrase arrived with the operator's direction

```json
{
  "id": "WO-001-D014",
  "date": "2026-10-15",
  "dispatch": "resume: final review (session startup; the operator's first message carried the phrase and its scope expansion as one pasted prompt)",
  "decision": "Record the dispatch gap met at startup and continue. The prompt hook matches a whole resume phrase, so the operator's pasted message beginning resume: final review recorded no dispatch and bound no role; the session recorded the dispatch itself with npm run resume -- final-review --work-order WO-001, which is legal but binds no session role, leaving usage counters, the scratch grant and output-read receipts unavailable until the operator typed the bare phrase, which bound the role and replayed the recorded dispatch. The process-cost entry counter is the first reading after that binding.",
  "evidence": [
    "UserPromptSubmit hook context at 2026-10-15T14:08:05Z: observed facts only, usage unavailable, no dispatch receipt; npm run resume -- briefing then printed error: no dispatch is recorded in phase verified; run: npm run resume -- final-review --work-order WO-001.",
    ".claude/hooks/read-observer.mjs matches input.prompt.trim() against the whole intents resume: next, resume: fix, resume: verify, resume: final review and resume: release close; a prompt that continues past the phrase matches none.",
    "After the CLI dispatch: node scripts/harness.mjs usage 68bfa282-8336-4b28-b2c9-0b5428054587 printed Token measurement requires an active role and dispatch start; a write to the Claude Code scratchpad was refused as an outside-project write for role unknown (WO-144); npm run release -- prepare --local printed Meter snapshot not written: this checkout holds no session journal of WO-001.",
    "After the operator typed resume: final review at 2026-10-15T14:23:07Z: hook context DotLn resolved role reviewer; Dispatch final-review is already recorded (phase final-review); continue without repeating it. node scripts/harness.mjs usage then printed 579,216 total tokens at dispatch scope (source claude-transcript-message-usage, observed 2026-10-15T14:24:08Z), subagents 0 of cap 20, exact-observed."
  ],
  "rejected": [
    "Repeat the final-review dispatch so the hook binds the role: a recorded transition is never repeated to repair a receipt.",
    "Record the cost line as unknown with cause no-session after the role bound: the counters became readable and are recorded with their cutoff instead."
  ],
  "reopenWhen": "The kit's prompt hook accepts a phrase followed by operator direction, or binds the session role when the dispatch command runs inside a Claude Code session; then the startup direction can travel in one message again.",
  "followup": "Upstream kit: let the prompt hook dispatch a resume phrase that leads a longer operator message (an operator's scope expansion naturally follows the phrase), and let a lifecycle dispatch run from the CLI inside a Claude Code session bind that session's role, so usage readback, outside-write grants and output-read receipts do not depend on a second bare prompt."
}
```

## WO-001-D015 Write the publication surfaces under the default balanced profile

```json
{
  "id": "WO-001-D015",
  "date": "2026-10-15",
  "dispatch": "resume: final review (reading the reader profile for each publication surface before writing PR.md and RELEASE-NOTES.md)",
  "decision": "Write the PR title, PR body, commit subjects and release notes under the balanced profile the publication contract names as the default, because this instance declares no docs/control/reader-profiles.json and the reader command cannot print guidance without it.",
  "evidence": [
    "npm run reader -- profile prTitle (and prBody, commitSubject, releaseNotes, releasePage): ENOENT docs/control/reader-profiles.json; npm run release -- prepare --local ends with Reader profile (releaseNotes) unavailable: ENOENT.",
    "docs/product/08-publication-compiler.md, PRs and commits: without an operator choice, each surface uses the balanced profile; docs/publication/examples/ is absent from this export, so no nearest example is available either.",
    "The facts, limits, required sections and attribution rule are governed by that section and the release-note edition section, which this review applies directly."
  ],
  "rejected": [
    "Create docs/control/reader-profiles.json here: an operator choice of presentation belongs to a planning pass, not to a final review.",
    "Skip the profile read: the reviewer procedure requires it; the attempt and its outcome are recorded instead."
  ],
  "reopenWhen": "The operator chooses reader profiles for this instance, or the kit prints balanced guidance when the profile file is absent.",
  "followup": "Upstream kit: make npm run reader -- profile <surface> and the publish and release-prepare guidance print the balanced default, saying that no profile file is declared, instead of failing with ENOENT when docs/control/reader-profiles.json is absent from a launchpad."
}
```
