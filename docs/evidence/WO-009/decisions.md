# WO-009 decisions

## WO-009-D001

```json
{
  "id": "WO-009-D001",
  "date": "2026-10-19",
  "dispatch": "resume: next; release prepare",
  "decision": "Assign application target v0.3.0, the next minor above the observed release baseline v0.2.0, to the heading and the README version claim.",
  "evidence": [
    "release baseline v0.2.0 (local tags)",
    "minor classification declared in docs/work-orders/WO-009-release-display-name.md"
  ],
  "rejected": [
    {
      "option": "An activation-completion paragraph in the roadmap",
      "reason": "The tag is the record and the roadmap's release history is generated from tags (WO-086); this decision keeps the base and the classification."
    }
  ],
  "reopenWhen": "The observed baseline or the classification changes before publication; a later collision is recorded as its own decision."
}
```

## WO-009-D002

```json
{
  "id": "WO-009-D002",
  "date": "2026-10-19",
  "dispatch": "resume: next",
  "decision": "Declare Launchpad as this instance's release.displayName and let the existing release preparation generate the README claim. Preserve all other configuration, component versions and published Releases.",
  "evidence": [
    "docs/work-orders/WO-009-release-display-name.md: Objective, Design and Non-goals",
    "scripts/lib/config.mjs: validateRelease accepts the name; the configuration probe printed Launchpad",
    "scripts/lib/release-preparation.mjs: releaseClaimLine renders the configured name",
    "scripts/release.mjs: releaseEdition reads the configuration at the release commit and releaseTitle takes its first line",
    "scripts/test-release-preparation.mjs: configured-name normalization and collision-retiming coverage",
    "scripts/test-release.sh: custom-identity coverage preserves an earlier release after a later rename",
    "release prepare --local assigned v0.3.0 above the only local release baseline v0.2.0; check-surfaces passed without a component bump",
    "The instance-qualified GitHub release query on 2026-10-19 returned DotLn v0.1.0 and DotLn v0.2.0"
  ],
  "rejected": [
    {
      "option": "No change",
      "reason": "The absent declaration defaults to DotLn and would not fulfill the requested future release name."
    },
    {
      "option": "Edit release machinery or hand-edit the README claim",
      "reason": "The existing configuration contract and preparation already implement the requested behavior; extra machinery would exceed this order's scope."
    },
    {
      "option": "Retitle existing Releases or change the target repository's release name",
      "reason": "Both effects are explicit non-goals."
    }
  ],
  "reopenWhen": "The operator changes the name, or release close observes a title inconsistent with the configuration at the release commit."
}
```

## WO-009-D003

```json
{
  "id": "WO-009-D003",
  "date": "2026-10-19",
  "dispatch": "resume: next",
  "decision": "Apply the order's explicit minor classification and the current executor handoff rule. Judge the uncommitted candidate's scope with the working-tree diff and untracked file inventory, retaining the literal branch-diff observation for final review.",
  "evidence": [
    "The order's Release classification and Objective explicitly require minor and v0.3.0; its trailing operator-review assumption still says patch",
    "docs/operator/README.md: Standing preferences records Launchpad v0.3.0",
    "docs/product/07-execution-guide.md: Discipline and Preflight before the full gate supersede older separate-preflight sequencing with one complete npm test -- --review run",
    "The executor skill forbids branch commits before final review",
    "git diff --name-only main...HEAD produced no paths before any branch commit; git diff main -- dotln.config.json adds only the release section"
  ],
  "rejected": [
    {
      "option": "Assign a patch version from the stale trailing assumption",
      "reason": "It contradicts the dated operator direction and explicit classification."
    },
    {
      "option": "Run focused preflight suites before the complete gate",
      "reason": "The current cited execution guide expressly replaces that older sequencing and avoids duplicate suite execution."
    },
    {
      "option": "Commit early to make the branch-only diff nonempty",
      "reason": "Final review owns branch commits; the executor can establish the candidate's scope without moving HEAD."
    }
  ],
  "reopenWhen": "The operator changes the classification, the governing handoff rule changes, or final review finds a path outside the allowed scope."
}
```

## WO-009-D004

```json
{
  "id": "WO-009-D004",
  "date": "2026-10-19",
  "dispatch": "resume: verify; dispose the follow-up row the implementation-ready advisory matched",
  "decision": "Leave FUP-4c3c0351adc4c2cc pending as it is. It matched only on the order id: WO-009 opens no planning-check seam, and the row's reopening condition has not occurred because kit-verify, the suite WO-009's Preflight names, still runs. This records the disposition the implementation-ready advisory asked for and the executor's evidence omitted (VER-001 F1).",
  "evidence": [
    "docs/control/orders/WO-009.jsonl, ImplementationReady advisory: 1 pending follow-up row names a file this change touches or WO-009",
    "npm run plan -- followups --touching on 2026-10-19: 1 of 8 pending rows matched, FUP-4c3c0351adc4c2cc (deferred; C5, a planning check for Preflight tokens absent from npm test -- --list), matched on WO-009 alone",
    "npm test -- --only kit-verify at code identity 032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86: 7 passed, 0 failed, 7 fresh tasks",
    "docs/evidence/WO-009 held no FUP identifier or disposition before this record"
  ],
  "rejected": [
    {
      "option": "Dispose the row as settled",
      "reason": "Its seam is a kit planning check that this order does not touch, and its condition has not occurred; final review disposes only a row whose seam the change opened or whose condition occurred."
    },
    {
      "option": "Fail the verification",
      "reason": "A missing disposition breaks no acceptance criterion and no behavior main had, so it is a follow-up, fixed here in evidence."
    }
  ],
  "reopenWhen": "A kit revision drops or renames kit-verify while WO-009 is open, or final review finds the change opened the row's planning-check seam."
}
```

## WO-009-D005

<!-- integration refs/dotln/checkpoint/WO-009/6 -->

```json
{
  "id": "WO-009-D005",
  "date": "2026-10-19",
  "dispatch": "resume: final review; worktree integrate WO-009",
  "decision": "Integration record completed by the reviewer: main and wo-009 were the same commit c085769f61c2a38b7d55e8ae549562adf8ef0896, so the merge changed nothing; the checkpoint, both bases and the named stash are retained and the eleven working-tree entries were restored intact. Carried-forward claims judged against the integrated base: WO-009-D001 to D004 stand unchanged, because no byte of main moved under them; release preparation reported the target v0.3.0 current and refreshed only the meter snapshot and the PR meter block. The code identity after integration is 032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86, the identity of the executor's complete review row, so that row stands for the final review's npm test claim and no fresh complete run is owed. No component-version collision: every component source is unchanged and the surface check passes every rule. The one follow-up row the implementation-ready advisory matched, FUP-4c3c0351adc4c2cc, stays as D004 left it: the change opened no planning-check seam and its condition has not occurred. Changed evidence inputs are recorded here, never by editing verified records.",
  "evidence": [
    "refs/dotln/checkpoint/WO-009/6",
    "base c085769f61c2a38b7d55e8ae549562adf8ef0896",
    "upstream c085769f61c2a38b7d55e8ae549562adf8ef0896",
    "release preparation: WO-009 target v0.3.0 remains current. Files changed: docs/evidence/WO-009/meta.json, docs/final-reviews/WO-009/PR.md. Meter snapshot: docs/evidence/WO-009/meta.json, 4049 bytes. Tag observation: local snapshot only.",
    "npm run release -- check-surfaces --local after the integration: 48 PASS rows, 0 FAIL rows; PASS release-block: observed v0.3.0; expected v0.3.0 (work-order target v0.3.0; latest local tag v0.2.0); every component-version row src unchanged",
    "node scripts/harness.mjs check: 34 generated surfaces; local-terms list: present",
    "npm run publication:check: no editions declared",
    "gate rows at code identity 032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86 after the integration: one complete review row, exit 0, recorded 2026-10-19T17:00:21.843Z, seven required suites, none displaced",
    "npm run plan -- followups --touching: 1 of 8 pending rows matched, FUP-4c3c0351adc4c2cc (deferred), on WO-009 alone"
  ],
  "rejected": [
    {
      "option": "Rewrite reviewed commits or discard the integration stash",
      "reason": "Both histories and recovery material must remain available."
    },
    {
      "option": "Start a fresh npm test -- --review after the integration",
      "reason": "The integration moved no code byte, so the code identity is the one the executor's passing complete row judged; the completion consumes that row, and a fresh run would only duplicate it."
    },
    {
      "option": "Dispose FUP-4c3c0351adc4c2cc at final review",
      "reason": "Final review disposes only a row whose seam the change opened or whose condition occurred; this row matched on the order id alone and kit-verify still runs (7 passed in the reviewer's own --only run)."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a kit revision drops or renames kit-verify while WO-009 is open, which reopens the row D004 left pending."
}
```

Integration date: 2026-10-19. Original base: `c085769f61c2a38b7d55e8ae549562adf8ef0896`.
Fetched main: `c085769f61c2a38b7d55e8ae549562adf8ef0896`. Checkpoint: `refs/dotln/checkpoint/WO-009/6`.
Named stash retained: `b11e8d2f8ede22985446d10d1faf3ffed5ee98ca` (WO-009 integrate 2026-10-19).
Resolved projections: none.
Release preparation: WO-009 target v0.3.0 remains current. Files changed: docs/evidence/WO-009/meta.json, docs/final-reviews/WO-009/PR.md. Meter snapshot: docs/evidence/WO-009/meta.json, 4049 bytes. Tag observation: local snapshot only.
Carried-forward claims: D001 to D004 stand unchanged against the integrated base, because main and `wo-009` were the same commit; the complete review row at code identity `032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86` stands; the two published Releases keep the titles the executor observed (`DotLn v0.1.0`, `DotLn v0.2.0`), and `Launchpad v0.3.0` remains established by composition until release close observes it.
Authored conflicts observed: none.
Affected checks: `npm run release -- check-surfaces --local` (48 PASS, 0 FAIL), `node scripts/harness.mjs check` (34 generated surfaces) and `npm run publication:check` (no editions declared) were run after the integration under the bounded wrapper; `npm test -- --review` is supplied by the standing complete row at the unchanged code identity.
