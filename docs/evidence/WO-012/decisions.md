# WO-012 decisions

## WO-012-D001

```json
{
  "id": "WO-012-D001",
  "date": "2026-10-21",
  "dispatch": "resume: next",
  "decision": "Declare DotLn Angular target releases and move release.close into the registration allowance and both lists of the existing operator grant. Keep all other configuration values and grant fields unchanged.",
  "evidence": [
    "WO-012 Design and execution steps 2 and 3; planning pass latest-upstream-fixes-2026-10-21 sections 6 D2 and 9.2(c)",
    "The 2026-10-19 direction, capture SHA-256 01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177, supersedes the 2026-10-17 tagging reservation; its capture digest remains in the grant reason",
    "The bounded semantic comparison lists exactly the five intended configuration changes; readAuthorityGrantRegistry and authorizeRegisteredEffects admit all four effects through the committed operator grant; authorizeRegisteredPublication also returns successfully",
    "scripts/release.mjs prepares the target release only after authorizeRegisteredEffects admits release.close; its title uses the registered displayName"
  ],
  "rejected": [
    {
      "option": "Declare the policy without updating the grant",
      "reason": "The release would still refuse at close; both the authority profile and the operator grant must admit the effect."
    },
    {
      "option": "Rename the registration or create a second grant",
      "reason": "The existing repository identity and single grant already bind the control records and publication route."
    }
  ],
  "reopenWhen": "The operator changes the target release policy or the kit changes the registered release contract."
}
```

## WO-012-D002

```json
{
  "id": "WO-012-D002",
  "date": "2026-10-21",
  "dispatch": "resume: next",
  "decision": "Select judge-only for base-checkout disposable output, preserving the eleven composed roots, target-worktree deletion and refusal of undeclared ignored material. Document the additional collision refusal and the current non-tag preview route.",
  "evidence": [
    "WO-012 Design; scripts/lib/target-worktree-close.mjs checks collisions before moving the base with --no-overwrite-ignore",
    "Existing scripts/test-target-worktree-close.mjs cases cover both cleanup policies and refusal of retained output colliding with fetched tracked paths; these fixtures were read, not rerun as an instance behavior claim",
    "loadConfig returns the same sorted eleven-root disposable array as before",
    "README Taking upstream updates and planning pass latest-upstream-fixes-2026-10-21 section 9.2(g) replace the old explicit-tag preview deletion with refs/upstream-releases/v0.88.0"
  ],
  "rejected": [
    {
      "option": "Leave the default delete policy",
      "reason": "It would continue deleting the operator base checkout output that this order is intended to retain."
    },
    {
      "option": "Broaden the disposable roots or automatically delete a collision",
      "reason": "Neither is authorized by the order; a collision requires preserving the output elsewhere or a reviewed policy change."
    }
  ],
  "reopenWhen": "The kit changes base-output handling, an actual collision occurs, or a target generator creates output outside the declared roots."
}
```

## WO-012-D003

```json
{
  "id": "WO-012-D003",
  "date": "2026-10-21",
  "dispatch": "resume: next",
  "decision": "Declare contributions.operatorAuthor from the latest non-merge author on main and leave historicalWorkOrders undeclared. Preserve the separate final-review sign-off observation and WO-006 live publication observation.",
  "evidence": [
    "The exact public author readback is recorded once in command-output.json; equality with git log --no-merges -1 --format=%an <%ae> main is true",
    "scripts/lib/contributions.mjs compares every author in origin/main..HEAD with the configured identity or a matching Signed-off-by trailer; Git configuration supplies no exemption",
    "WO-001 is closed under control; loadConfig returns historicalWorkOrders as an empty array",
    "Planning pass latest-upstream-fixes-2026-10-21 section 9.2(a) asks for the first branch-commit sign-off readback, while the executor skill forbids branch commits before final review; the order Known issues already assigns the publish-time PASS lines to that reviewer",
    "The operator record and planning section 4 record removal of the interim host trust entries; WO-006 must use the node-spelled helper and record the hook decision and host response"
  ],
  "rejected": [
    {
      "option": "Add sign-off trailers in place of the declared exemption",
      "reason": "The order explicitly chooses the existing public operator identity; every later omitted trailer would otherwise block publication."
    },
    {
      "option": "Declare WO-001 historical",
      "reason": "It is a controlled closed order, not pre-control history."
    },
    {
      "option": "Commit early or run a live target publication to obtain the carry-in observation",
      "reason": "Those actions belong to final review and the designated target episode, respectively; the executor does not manufacture them."
    }
  ],
  "reopenWhen": "The public operator author identity changes, a publish-time commit fails the sign-off rule, or WO-006 records a host prompt or denial after admission."
}
```

## WO-012-D004

```json
{
  "id": "WO-012-D004",
  "date": "2026-10-21",
  "dispatch": "resume: next; operator-approved title correction",
  "decision": "Apply the approved one-line title correction: spell the starter revision as 0.88.0 and append the release-assignment placeholder. The starter version remains 0.88.0; the application target follows the existing patch classification. No deliverable, criterion, non-goal or other order text changes.",
  "evidence": [
    "Operator authorization captured in docs/intake/notes/wo012-title-correction-2026-10-21.md, SHA-256 6b95d6e080f3d61daae36ff103b54f5e414d12625785af002add258321bbb40e; the operator approved the concrete title correction in this session",
    "npm run release -- prepare --local exited 1: error: release prepare requires one README version matching the work-order target",
    "scripts/lib/release-preparation.mjs reads any strict version in the heading as the application target; the filed heading used v0.88.0 descriptively while README prepares Launchpad v0.3.2",
    "scripts/lib/plan-subject.mjs includes the title in the judged subject, so the correction is bound through plan amend-order before the planning check"
  ],
  "rejected": [
    {
      "option": "Change README to claim Launchpad v0.88.0",
      "reason": "That confuses the upstream starter version with the fork patch release."
    },
    {
      "option": "Modify the kit parser or omit release preparation",
      "reason": "Kit changes are outside scope, and the required release can be assigned through the approved title repair."
    }
  ],
  "reopenWhen": "The amended order fails its planning check or the observed release baseline changes before publication."
}
```

## WO-012-D005

```json
{
  "id": "WO-012-D005",
  "date": "2026-10-21",
  "dispatch": "resume: next",
  "decision": "Follow the current complete-run handoff sequence and judge the uncommitted executor candidate with the working-tree diff and untracked inventory. Record pre-activation observations only to their actual visibility.",
  "evidence": [
    "Product 07 Discipline and Preflight before the full gate require one complete review run after formatting and sync, then a document run after final document edits; they explicitly supersede older separate-preflight sequencing",
    "The executor skill forbids branch commits before final review; the literal main...HEAD comparison is empty until that role commits the reviewed candidate",
    "At entry canonical status selected active WO-012, HEAD equaled main, the manifest named 977 files at a54f8d6520ed54d05e5209455c67541562716404, and the three source guards counted 6, 13 and 2",
    "The operator starts the worktree; this executor did not observe the earlier main document gate or activation stdout. scripts/worktree.mjs contains the single missing-identity advisory, but a source read is not proof of that earlier emission",
    "Planning pass latest-upstream-fixes-2026-10-21 section 9.2 supplies the exact-one delivery-row, joined-text, grant-admission and tag-preview carry-ins"
  ],
  "rejected": [
    {
      "option": "Repeat worktree activation to capture its advisory",
      "reason": "The worktree and active order already exist; repeating a lifecycle action would not recover the original observation."
    },
    {
      "option": "Claim a source-predicted advisory as observed",
      "reason": "The original activation output is unavailable to this session."
    },
    {
      "option": "Run focused Preflight suites before the complete run",
      "reason": "The current guide explicitly avoids that duplicate execution; one complete selection covers the same instance suites."
    }
  ],
  "reopenWhen": "A required check fails, the candidate exceeds the allowed paths, or final review finds that the committed candidate differs from these working bytes."
}
```

## WO-012-D006

```json
{
  "id": "WO-012-D006",
  "date": "2026-10-21",
  "dispatch": "resume: next; release prepare",
  "decision": "Assign application target v0.3.3, the next patch above the observed release baseline v0.3.2, to the heading and the README version claim.",
  "evidence": [
    "release baseline v0.3.2 (local tags)",
    "patch classification declared in docs/work-orders/WO-012-starter-v0.88.0-registration.md"
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

## WO-012-D007

```json
{
  "id": "WO-012-D007",
  "date": "2026-10-21",
  "dispatch": "resume: next; executor output review",
  "decision": "Reconcile the profile branch-policy paragraph with the declared release-close policy: keep main pushes and merges prohibited and settings operator-owned, while directing target tags and Releases through release close and listing its fourth granted effect.",
  "evidence": [
    "The profile previously said sessions never tag and that everything beyond the three publication effects stays local; those sentences would contradict the authorized release.close declaration and rewritten section",
    "This is a consistency repair within the named repository-profile surface and shares its document and publication checks; no authority beyond the order declaration is added"
  ],
  "rejected": [
    {
      "option": "Leave the earlier unconditional tagging prohibition beside the authorized close route",
      "reason": "The same profile would give two conflicting descriptions of the declared grant."
    }
  ],
  "reopenWhen": "The operator changes the grant or the kit changes the publication and release-close boundary."
}
```

## WO-012-D008

```json
{
  "id": "WO-012-D008",
  "date": "2026-10-21",
  "dispatch": "resume: next; criteria-adversary finding 1",
  "decision": "Strengthen the profile pre-start check to count all classification declarations as well as recognized values, and board the kit parser defect for core. The instance documentation refuses a valid header paired with a malformed duplicate; the shipped kit parser remains unchanged because kit edits are a non-goal.",
  "evidence": [
    "The criteria adversary found that the single grep counted only recognized values and could admit a malformed duplicate",
    "classification-probe.json executes the current targetReleaseClassification function extracted from scripts/release.mjs with fixture text: a patch header plus a banana header returns patch; the corrected two-count profile check refuses it",
    "The same bounded probe admits one patch header and refuses two recognized headers and the patchwork suffix; exit 0",
    "The root also removed the earlier branch-policy tagging prohibition that contradicted the new release route, recorded separately in WO-012-D007"
  ],
  "rejected": [
    {
      "option": "Repair scripts/release.mjs and the platform fixtures in this instance order",
      "reason": "Both are carried kit files, and WO-012 expressly excludes kit edits; a core repair is needed before a starter update can carry it."
    },
    {
      "option": "Keep the recognized-value count as the sole precheck or claim the kit detects every duplicate",
      "reason": "The demonstrated malformed duplicate passes that count and the actual kit function."
    }
  ],
  "reopenWhen": "Core takes up the parser repair, a starter update carries it, or an actual target order contains a malformed duplicate classification.",
  "followup": "Core planning: make scripts/release.mjs targetReleaseClassification count all Target release classification declarations before validating the sole value. Add a scripts/test-target-worktree-release.mjs regression for one valid header plus one malformed duplicate and retain missing, multiple-valid and invalid-value cases; run the target-worktree suite and core required gates. Priority 2; source WO-012 classification-probe.json. This instance keeps the two-count pre-start check until the repaired starter is taken."
}
```

## WO-012-D009

<!-- integration refs/dotln/checkpoint/WO-012/6 -->

```json
{
  "id": "WO-012-D009",
  "date": "2026-10-21",
  "dispatch": "resume: final review; worktree integrate WO-012",
  "decision": "Integration record completed by the reviewer: main and wo-012 were the same commit 1d53bc48b6e14562e6581b4f9c41671d4f2e04d0, which the integration fetched as origin/main, so the merge changed nothing; the checkpoint, both bases and the named stash are retained, the eleven modified tracked files and sixteen untracked files were restored, and the only bytes that differ from the stash are the integration's own regenerations (this record's stub and its index row, the meter snapshot and the PR meter block); the ignored intake was archived to the session scratch first and left in place. Carried-forward claims judged against the integrated base: WO-012-D001 to D008 stand unchanged, because no byte of main moved under them, and the state they rest on read back unchanged on 2026-10-21 from 03:29Z. Release preparation reported the target v0.3.3 current and refreshed only the meter snapshot and the PR meter block. The code identity after the integration and after npm run format is d3d72e3eeedf9036af51dcca8f8bf551804d226a219e7cb248304a825e600f2e, the identity of the executor's complete review row, so that row stands for the final review's npm test claim and no fresh complete run is owed. No component-version collision: this order changes no component source, the skeleton, compiler and console versions moved with the starter updates already merged on main since v0.3.2, and the surface check passes every rule. Of the four pending follow-up rows that match WO-012, none has a reopening condition that occurred, so each stays as it is. Two duties the order assigns to this review are placed by the lifecycle after the report is filed: the release-close dry run of step 9 belongs to the release-close session, and the publish helper's contribution-signoff lines are printed at publication; this review records a pre-filing simulation of the sign-off rule instead. Changed evidence inputs are recorded here, never by editing verified records.",
  "evidence": [
    "refs/dotln/checkpoint/WO-012/6",
    "base 1d53bc48b6e14562e6581b4f9c41671d4f2e04d0",
    "upstream 1d53bc48b6e14562e6581b4f9c41671d4f2e04d0",
    "release preparation: WO-012 target v0.3.3 remains current. Files changed: docs/evidence/WO-012/meta.json, docs/final-reviews/WO-012/PR.md. Meter snapshot: docs/evidence/WO-012/meta.json, 4130 bytes. Tag observation: local snapshot only.",
    "Against the retained stash be3416a8f63851d0a21ecf715375977249372bba: git diff --stat shows only docs/lineage/decisions-index.md (one added row) among tracked files, and of the stash's sixteen untracked files only decisions.md, meta.json and PR.md differ; npm run backup:intake archived the two intake files to the session scratch before the integration, and the title capture still matches the SHA-256 that WO-012-D004 records",
    "The step 2 readback after the integration printed the Design's five lines and a sixth line byte-equal to git log --no-merges -1 --format='%an <%ae>' main (compared with cmp); the step 3 readback printed 1 1 operator true true 4 4; a key-path comparison of dotln.config.json with main lists exactly the five named changes and no key-order change; the grant keeps its key order, grantId, version, grantedBy and repo and appends release.close to effects and operations",
    "authorizeRegisteredEffects with the candidate registration and the committed grant authorizes release.close, repo.push, pr.open and pr.thread.resolve and refuses package.publish and pr.merge; main's registration with the candidate grant refuses release.close (effect denied), and the candidate registration with main's grant or no grant refuses it",
    "node scripts/launchpad.mjs verify: kit: 977 files verified at a54f8d6520ed54d05e5209455c67541562716404; node scripts/harness.mjs check: harness check: 34 generated surfaces; local-terms list: present; npm run publication:check: no editions declared; npm run plan -- check exit 0, listing WO-012 as an authorized-execution-amendment under WO-012-D004",
    "npm run release -- check-surfaces --local after the integration: 48 PASS rows, 0 FAIL rows; PASS release-block: observed v0.3.3; expected v0.3.3 (work-order target v0.3.3; latest local tag v0.3.2); component versions beacons 0.1.1 and kernel 0.6.0 unchanged, compiler 0.28.0, console 0.4.3 and skeleton 0.63.1 changed by the starter refreshes on main",
    "gate rows at code identity d3d72e3eeedf9036af51dcca8f8bf551804d226a219e7cb248304a825e600f2e and instance input digest sha256:3b0d877971f6b649a43eea9bffe315c5fcd971ba089740a288e2f2fc606908cf after the integration and after npm run format: one complete review row, fresh, seven required suites, none unrun or stale, exit 0, 13,824 ms, recorded 2026-10-21T03:04:36.327Z",
    "npm run plan -- followups --touching: 4 of 16 pending rows matched. FUP-2232a29f1061494f stays deferred: the kit is still a54f8d6 and WO-006 to WO-008 each count 0 declarations. FUP-4c3c0351adc4c2cc stays deferred: the kit is unchanged since the planning pass read it. FUP-854bc432690eb6fd stays deferred: the UI planning pass has not opened. FUP-d771ffe939902128 stays deferred: npm run plan -- conditions --slow, run in this worktree at main's commit, measured a document-gate median of 16.43 s against 30 s, and the executor's step 4 document runs took 15.35 s and 14.58 s, not above 60 s",
    "Sign-off simulation in a throwaway clone of the candidate bytes with no author override: two commits gave two PASS contribution-signoff lines (observed operator author); an added outside-author commit without a trailer failed and passed once signed off; the clone was removed. This checkout's effective author and committer identities equal the declared string",
    "scripts/release.mjs: release close must run from the main control-plane checkout and reads the control state merged on origin/main, and its record is written under the main checkout's ignored control/local/retained directory even when the close refuses; scripts/worktree.mjs: publish requires a clean committed tree with the committed final-review gate row and prints the contribution-signoff lines before any push, returning on a FAIL line"
  ],
  "rejected": [
    {
      "option": "Rewrite reviewed commits or discard the integration stash",
      "reason": "Both histories and recovery material must remain available."
    },
    {
      "option": "Start a fresh npm test -- --review after the integration",
      "reason": "The integration and formatting moved no code byte, so the code identity is the one the executor's passing complete row judged; the completion consumes that row, and a fresh run would only duplicate it."
    },
    {
      "option": "Run npm run release -- close WO-012 --dry-run at final review, as step 9 says",
      "reason": "Before the merge origin/main holds no WO-012 control state, the command must run from the main checkout, and even its refusal writes a retained attempt record there that the release-close session would later read; that session's own --dry-run previews the close."
    },
    {
      "option": "Commit the series before recording the result so that FINAL-001 quotes the publish helper's lines",
      "reason": "The reviewer commits only after a passing result, and the series includes this report, the release notes and the completion event, so no run before filing can judge every commit the publish judges; the helper refuses before any push on a FAIL line, so an opened pull request shows every line passed."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a later integration before the merge changes dotln.config.json, the grant, the profile, WS-001 or the kit's release, close, publish or contribution code, or when the publish helper prints a FAIL contribution-signoff line."
}
```

Integration date: 2026-10-21. Original base: `1d53bc48b6e14562e6581b4f9c41671d4f2e04d0`.
Fetched main: `1d53bc48b6e14562e6581b4f9c41671d4f2e04d0`. Checkpoint: `refs/dotln/checkpoint/WO-012/6`.
Named stash retained: `be3416a8f63851d0a21ecf715375977249372bba` (WO-012 integrate 2026-10-21).
Resolved projections: none.
Release preparation: WO-012 target v0.3.3 remains current. Files changed: docs/evidence/WO-012/meta.json, docs/final-reviews/WO-012/PR.md. Meter snapshot: docs/evidence/WO-012/meta.json, 4130 bytes. Tag observation: local snapshot only.
Carried-forward claims: D001 to D008 stand unchanged against the integrated base, because main and `wo-012` were the same commit; the complete review row at code identity `d3d72e3eeedf9036af51dcca8f8bf551804d226a219e7cb248304a825e600f2e` stands; the configuration, grant and admission readbacks, the kit and harness checks and the document counts read back unchanged from 03:29Z.
Authored conflicts observed: none.
Affected checks: `npm run release -- check-surfaces --local` (48 PASS, 0 FAIL), `node scripts/harness.mjs check` (34 generated surfaces) and `npm run publication:check` (no editions declared) were run after the integration; `npm test -- --review` is supplied by the standing complete row at the unchanged code identity.
