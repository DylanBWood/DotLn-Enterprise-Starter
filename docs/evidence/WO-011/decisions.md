# WO-011 decisions

The operator's approval of the bounded execution amendment is captured in
ignored intake at `docs/intake/notes/wo011-execution-amendment-2026-10-20.md`,
SHA-256 `8e0b97a1c74f1795bb758f79d8b6bc9a5a50f9e9f35b75c0ccba2f8b127d96d3`.
The record below paraphrases it.

## WO-011-D001

```json
{
  "id": "WO-011-D001",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Add exactly the eleven authorized disposable roots to the angular-nx-monorepo class. Preserve every existing configuration key and value, the absent target release policy and the denial of release.close.",
  "evidence": [
    "WO-011 Design and execution step 2; latest-upstream-2026-10-19 planning decisions D4 and D5",
    "scripts/lib/config.mjs validates, deduplicates and sorts the class and registration paths",
    "scripts/test-configuration-root.mjs covers class composition, normalization, absent release and invalid paths",
    "DotLn-Angular at 651d76ff: .gitignore names all eleven output roots; apps/dotln/project.json builds under dist/apps/dotln"
  ],
  "rejected": [
    {"option": "No change", "reason": "Known ignored build output would remain undeclared at release close."},
    {"option": "Declare the same paths on the registration", "reason": "The authorized class owns this shared workspace shape."},
    {"option": "Declare source directories or local environment files", "reason": "Close deletes ignored files beneath a declared path; those files are not the authorized regenerable output."},
    {"option": "Declare a target release now", "reason": "The kit cannot provide the required DotLn Angular display name; the existing planning blocker remains."}
  ],
  "reopenWhen": "A target close or a changed generator configuration identifies a concrete output path outside the declared roots, or the kit gains the target release display name."
}
```

## WO-011-D002

```json
{
  "id": "WO-011-D002",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Set the shared clone setting remote.upstream.tagOpt to --no-tags and record the explicit named-tag preview cleanup in the repository profile. No tag deletion was needed: v0.85.0 was absent before the setting.",
  "evidence": [
    "WO-011 execution step 3 and operator-review assumptions explicitly authorize the setting",
    "The entry local tag list contained only v0.1.0, v0.2.0, v0.3.0 and v0.3.1",
    "The entry origin query for refs/tags/v0.85.0 produced no output and exited 0",
    "scripts/release.mjs uses local tags for preparation and ancestral local tags for local surface checks",
    "latest-upstream-2026-10-19 section 8.2 requires the profile to record the clone-local scope and explicit-tag exception"
  ],
  "rejected": [
    {"option": "Rely on each session remembering not to fetch tags", "reason": "Planning recorded an actual baseline failure after an ordinary upstream fetch."},
    {"option": "Change global Git configuration or a push hook", "reason": "The authorized effect is this clone's upstream fetch policy."}
  ],
  "reopenWhen": "Core changes the starter fetch route or release-baseline rule, or a readback shows a core-named tag in this clone or its origin."
}
```

## WO-011-D003

```json
{
  "id": "WO-011-D003",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Record checkout-relative disposable matching, the repeated base dependency-install cost, and WO-005's live-admission observation without expanding the eleven-root declaration or claiming a qualified host.",
  "evidence": [
    "scripts/lib/target-worktree-close.mjs underDisposable compares a path to the declared root or its slash-prefixed descendants; it does not match a basename at any depth",
    "scripts/test-target-worktree.mjs covers deletion in both checkouts and refusal of undeclared .env files",
    "DotLn-Angular at 651d76ff has no root tsconfig.json and its tsconfig.base.json disables declaration; Nx 23.3.0 isUsingTsSolutionSetup therefore returns false",
    "Nx 23.3.0 nxE2EPreset routes this non-solution workspace's result, HTML and CI blob output below root dist/.playwright; no currently configured nested declaration is required",
    "The 2026-10-19 planning pass D6 and section 8.2 assign generated environment-file cleanup to WO-005's target worktree, retain operator ownership of the base files, and distinguish the WO-005 hook observation from WO-006 host qualification",
    "plan followups --touching matched only FUP-4b545ffb6f9dd6e9: its Angular-cache gate-argv condition depends on WO-005 step 5, which has not run; it remains deferred on its existing terms"
  ],
  "rejected": [
    {"option": "Treat every same-named nested directory as disposable", "reason": "That contradicts the shipped matcher and could cause an incorrect close-readiness claim."},
    {"option": "Add speculative nested source paths", "reason": "The current configured outputs are covered and the frozen exact list authorizes no speculative deletion root."},
    {"option": "Run a synthetic or live target publication in this self order", "reason": "Only a verified target order can make the designated live observation; it is an explicit non-goal here."}
  ],
  "reopenWhen": "WO-005 records the designated observation or changes output locations, WO-006 observes a prompt or denial without interim entries, or the Angular-cache follow-up's recorded condition occurs."
}
```

## WO-011-D004

```json
{
  "id": "WO-011-D004",
  "date": "2026-10-20",
  "dispatch": "resume: next; operator-approved bounded execution amendment",
  "decision": "Apply the operator-approved three-part amendment: remove strict version tokens from the descriptive heading so release preparation can assign the patch version, clarify criterion 1 as preservation of every existing configuration key and value, and allow only the generated README release-version claim in criterion 5. All eleven roots, behavior, remaining criteria and non-goals stay as filed.",
  "evidence": [
    "Operator approval captured in docs/intake/notes/wo011-execution-amendment-2026-10-20.md, SHA-256 8e0b97a1c74f1795bb758f79d8b6bc9a5a50f9e9f35b75c0ccba2f8b127d96d3",
    "The read-only release-preparation probe refused because the original heading contained two v0.85.0 tokens plus the unassigned-version placeholder",
    "The existing one-line class object necessarily changes line layout when disposable is added; the semantic probe proves every old key and value survives",
    "The current executor release-preparation duty requires the README claim, but the original criterion 5 excluded that root file",
    "The operator reviewed the exact three-hunk proposed patch before approving"
  ],
  "rejected": [
    {"option": "Silently relax the judged criteria", "reason": "The work order owns scope and an execution amendment requires explicit operator authorization."},
    {"option": "Edit kit parsing or omit release preparation", "reason": "Kit-file changes are a non-goal and the approved document repair preserves the intended patch release."},
    {"option": "Treat a layout-only deletion as removal of existing configuration", "reason": "The executable semantic comparison is the meaningful preservation check."}
  ],
  "reopenWhen": "The approved correction cannot pass the planning check or release preparation, or any behavior or root outside the approved amendment would need to change."
}
```

## WO-011-D005

```json
{
  "id": "WO-011-D005",
  "date": "2026-10-20",
  "dispatch": "resume: next; release prepare",
  "decision": "Assign application target v0.3.2, the next patch above the observed release baseline v0.3.1, to the heading and the README version claim.",
  "evidence": [
    "release baseline v0.3.1 (local tags)",
    "patch classification declared in docs/work-orders/WO-011-starter-v0.85.0-registration.md"
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

## WO-011-D006

```json
{
  "id": "WO-011-D006",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Use the cited current handoff sequence: one complete review run after formatting and regeneration, then the final document run after the report. Establish executor scope from the working tree and untracked inventory, and leave the committed main...HEAD comparison to final review.",
  "evidence": [
    "Product 07 Preflight before the full gate expressly reads older separate-preflight wording under the current complete-run rule",
    "The executor skill forbids branch commits before final review",
    "The literal git diff --name-only main...HEAD is empty while this executor's authorized changes remain uncommitted",
    "WO-011-D004 records the operator-approved README-only addition to criterion 5's allowed root paths",
    "npm run sync reported only meta as stale and regenerated it; format, runtime, lineage, index, release surfaces, siblings, harness and publication were current. No kit or component bytes changed."
  ],
  "rejected": [
    {"option": "Run focused Preflight suites before the complete run", "reason": "The current cited guide forbids that duplicate sequence; the complete selection supplies the structural and kit-verify coverage."},
    {"option": "Commit early to populate the branch comparison", "reason": "The executor can verify all candidate bytes without taking the final review's commit action."},
    {"option": "Add a new test suite for the configuration declaration", "reason": "Existing validator and close fixtures cover the implementation, and the bounded exact-readback and semantic-delta probe directly check this order's change."}
  ],
  "reopenWhen": "The working candidate exceeds the approved scope, the current handoff checks fail, or final review's committed comparison differs from this candidate."
}
```

## WO-011-D007

```json
{
  "id": "WO-011-D007",
  "date": "2026-10-20",
  "dispatch": "resume: verify; dispose the planning receipt's known issues for WO-011",
  "decision": "Record criterion 4 as met and dispose the planning receipt's six known issues for WO-011. The criterion-4 issue's reopening condition occurs with that record: step 6 keeps WS-001's WO-011 delivery-state row at proposed, and WS-001 states what the close does (its dependency paragraph) and that no target release is declared until the kit can name one (its member row), but not that WO-005's draft publish is the first live observation of the kit's admission, which only the profile's Release close section states. The executor met the planning pass's carry-in, a WS-001 line naming docs/evidence/WO-011 that main lacks, and the Design gives WS-001 only that row, so nothing is repaired in this order and the WS-001 wording passes to the next planning pass that edits WS-001 (VER-001 F1). The other five issues have not occurred: WO-005 has not run, no target close has run under starter v0.85.0, WO-011 has not merged, and criterion 1 was neither failed nor waived because the operator-approved amendment of WO-011-D004 reworded its clause.",
  "evidence": [
    "Planning receipt 2026-10-19-planning-e0dd1f8a7a5b84af-003: six WO-011 known issues with their reopening conditions; the planning document's section 8.2, WO-011 carry-ins (a) to (f)",
    "WS-001 at the candidate: the member row and the dependency paragraph, both unchanged from main, carry the no-target-release and close statements; no line names the draft publish or the admission; the WO-011 delivery-state row reads proposed and links docs/evidence/WO-011/README.md; the closed WO-003 and WO-004 rows also read proposed, so planning passes, not executors, set that column",
    "Counts at the candidate: '^## Release close' 1 and '__screenshots__' 1 in the profile, 'WO-011' 4 and 'docs/evidence/WO-011' 1 in WS-001; on main 0, 0, 4 and 0",
    "The shipped underDisposable, evaluated from scripts/lib/target-worktree-close.mjs against the composed list: root output such as dist/.playwright/apps/dotln-e2e/playwright-report/index.html, coverage/apps/dotln/index.html and tmp/anything is deleted; apps/dotln/coverage/index.html, apps/dotln/src/app/__screenshots__/a.png, libs/a/test-output/x, .nxfoo/x, distribution/x, .env and apps/dotln/src/environments/environment.local.ts are not covered, and the base refusal names apps/, libs/ or the file itself",
    "DotLn-Angular at 651d76ff: the build's outputPath is dist/apps/dotln; the spec outDir is ../../dist/out-tsc; there is no root tsconfig.json, so Nx 23.3.0's isUsingTsSolutionSetup is false and its Playwright preset writes under dist/.playwright (preset.ts and ts-solution-setup.ts at tag 23.3.0, read through the GitHub API); the unit-test target sets no browsers option; the base checkout lists no untracked or ignored file on 2026-10-20",
    "Tag guard on 2026-10-20: remote.upstream.tagOpt reads --no-tags from the clone's shared .git/config, also from the main checkout; the local tags v0.1.0, v0.2.0, v0.3.0 and v0.3.1 are all on origin; release check-surfaces --local passes release-block at v0.3.2; in a scratch repository with Git 2.55.0 a plain fetch follows no tag under the setting, while git fetch --no-tags upstream tag <name> still creates the named tag; the README's named-release preview still has no deletion step",
    "Criterion 1's clause: the capture docs/intake/notes/wo011-execution-amendment-2026-10-20.md has SHA-256 8e0b97a1c74f1795bb758f79d8b6bc9a5a50f9e9f35b75c0ccba2f8b127d96d3, as WO-011-D004 records; npm run plan -- check exits 0 and lists WO-011 as an authorized execution amendment under WO-011-D004; the JSON delta of dotln.config.json against main adds classes.angular-nx-monorepo.disposable and removes or changes nothing"
  ],
  "rejected": [
    {
      "option": "Fail criterion 4",
      "reason": "Its three counts hold, the evidence-link count discriminates (1 at the candidate, 0 on main), and step 6 sets the state to proposed, so the row is as the order specifies."
    },
    {
      "option": "Add the first-admission sentence to WS-001 during verification",
      "reason": "The verifier writes evidence and its report, never the implementation it judges, and the Design assigns WS-001 only the delivery-state row."
    },
    {
      "option": "Leave the reopened known issue as a report sentence",
      "reason": "Final review and the next planning pass read the order's decisions, so the disposition belongs here."
    }
  ],
  "reopenWhen": "WS-001 is edited again without settling where the first-admission statement lives; or another known issue's own condition occurs: a target close names .env, apps/ or a nested output root as undeclared ignored material, a close's disposable.base row counts files its gate did not write, the operator reports losing base-checkout material after a close, or after WO-011 merges a clone lists a tag that origin does not hold or a release-block check names a core version.",
  "followup": "The next planning pass that edits WS-001, at the latest the pass after WO-005 that planning decision D6 schedules: set WO-011's delivery state from its merge, and either add to WS-001 that WO-005's verified-phase draft publish is the first live observation of the kit's publication admission or record that the DotLn-Angular profile's Release close section is that statement's single home."
}
```

## WO-011-D008

<!-- integration refs/dotln/checkpoint/WO-011/6 -->

```json
{
  "id": "WO-011-D008",
  "date": "2026-10-20",
  "dispatch": "resume: final review; worktree integrate WO-011",
  "decision": "Integration record completed by the reviewer: main and wo-011 were the same commit 9dbe9f256c2adb142680ed91d7dd1f54a012a228, which the integration fetched as origin/main, so the merge changed nothing; the checkpoint, both bases and the named stash are retained, the twenty-one working-tree entries were restored intact, and the ignored intake was archived to the session scratch first and left in place. Carried-forward claims judged against the integrated base: WO-011-D001 to D007 stand unchanged, because no byte of main moved under them, and the state they rest on read back unchanged on 2026-10-20 from 13:27Z: the composed disposable list and the no-release readback, the one added configuration key, remote.upstream.tagOpt --no-tags in the clone's shared configuration, no v0.85.0 tag in the clone or on origin, and every local tag also on origin. Release preparation reported the target v0.3.2 current and refreshed only the meter snapshot and the PR meter block. The code identity after integration is ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99, the identity of the executor's complete review row, so that row stands for the final review's npm test claim and no fresh complete run is owed. No component-version collision: every component source is unchanged and the surface check passes every rule. Of the two pending follow-up rows that match WO-011, FUP-4b545ffb6f9dd6e9 stays deferred because WO-005's step 5 has not run, and FUP-53f596d1a9e029f1 stays with the next planning pass that edits WS-001, as D007 routes it. Changed evidence inputs are recorded here, never by editing verified records.",
  "evidence": [
    "refs/dotln/checkpoint/WO-011/6",
    "base 9dbe9f256c2adb142680ed91d7dd1f54a012a228",
    "upstream 9dbe9f256c2adb142680ed91d7dd1f54a012a228",
    "release preparation: WO-011 target v0.3.2 remains current. Files changed: docs/evidence/WO-011/meta.json, docs/final-reviews/WO-011/PR.md. Meter snapshot: docs/evidence/WO-011/meta.json, 4135 bytes. Tag observation: local snapshot only.",
    "git status --porcelain --untracked-files=all listed the same 21 entries before and after the integration; npm run backup:intake archived the two intake files to the session scratch before it, and the amendment capture still matches the SHA-256 that D004 records",
    "The step 2 readback after the integration printed the sorted eleven-root list and then no-release, exit 0; a key-by-key comparison of dotln.config.json with main lists one added path, classes.angular-nx-monorepo.disposable, and no removed or changed path",
    "git config --get remote.upstream.tagOpt printed --no-tags, set at local scope in the clone's shared .git/config with no worktree configuration; git tag --list v0.85.0 and git ls-remote --tags origin refs/tags/v0.85.0 printed nothing; after the integration's fetch of origin's tags the local tags are v0.1.0, v0.2.0, v0.3.0 and v0.3.1, each also on origin",
    "npm run release -- check-surfaces --local after the integration: 48 PASS rows, 0 FAIL rows; PASS release-block: observed v0.3.2; expected v0.3.2 (work-order target v0.3.2; latest local tag v0.3.1)",
    "node scripts/launchpad.mjs verify: kit: 964 files verified at f577979ed04e98cccb3a29a9535ba6172d09a8c9; node scripts/harness.mjs check: 34 generated surfaces; local-terms list: present; npm run publication:check: no editions declared",
    "npm run plan -- check exit 0, listing WO-011 as an authorized execution amendment under WO-011-D004 whose judged hash is main's order bytes and whose current hash is the worktree's",
    "gate rows at code identity ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99 and instance input digest sha256:69a933e45b6164c8216505a2464f7b3272f37d7c34ca55615e2e4c45ce3e7332 after the integration: one complete review row, exit 0, recorded 2026-10-20T12:47:08.018Z, seven required suites, none unrun",
    "npm run plan -- followups --touching: 2 of 9 pending rows matched, FUP-4b545ffb6f9dd6e9 (deferred) and FUP-53f596d1a9e029f1 (untriaged), each on WO-011 alone"
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
      "option": "Add the first-admission sentence to WS-001 at final review and dispose FUP-53f596d1a9e029f1",
      "reason": "The Design gives WS-001 only the delivery-state row, the row also asks for WO-011's delivery state to follow its merge, which no session can record before the merge, and where the statement lives is the choice D007 hands to the next planning pass."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a later integration before the merge changes dotln.config.json, the profile, WS-001 or the kit's close or release code."
}
```

Integration date: 2026-10-20. Original base: `9dbe9f256c2adb142680ed91d7dd1f54a012a228`.
Fetched main: `9dbe9f256c2adb142680ed91d7dd1f54a012a228`. Checkpoint: `refs/dotln/checkpoint/WO-011/6`.
Named stash retained: `ff83e286f288165d3ff65415d45ba5ecbadf988f` (WO-011 integrate 2026-10-20).
Resolved projections: none.
Release preparation: WO-011 target v0.3.2 remains current. Files changed: docs/evidence/WO-011/meta.json, docs/final-reviews/WO-011/PR.md. Meter snapshot: docs/evidence/WO-011/meta.json, 4135 bytes. Tag observation: local snapshot only.
Carried-forward claims: D001 to D007 stand unchanged against the integrated base, because main and `wo-011` were the same commit; the complete review row at code identity `ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99` stands; the configuration readback, the tag guard and the tags in the clone and on origin read back unchanged from 13:27Z.
Authored conflicts observed: none.
Affected checks: `npm run release -- check-surfaces --local` (48 PASS, 0 FAIL), `node scripts/harness.mjs check` (34 generated surfaces) and `npm run publication:check` (no editions declared) were run after the integration; `npm test -- --review` is supplied by the standing complete row at the unchanged code identity.

## WO-011-D009

```json
{
  "id": "WO-011-D009",
  "date": "2026-10-20",
  "dispatch": "resume: final review; board a finding outside the order's criteria and surfaces",
  "decision": "Board, without repairing it in this order, two planning-owned records that still assign work to the upgrade order, which the 2026-10-19 planning document's section 9 identifies as WO-011. The operator record's Manual steps preference says the operator's interim autoMode.environment entries are removed once that order shows the kit's admission carries the push, and WO-005's Design boards a registration-side Angular cache setting for that order. WO-011 runs no live episode and precedes WO-005, so it can do neither: planning decision D6 keeps the entries for WO-005's verified-phase draft publish, after which the next pass asks for their removal and WO-006's draft tests the host, and FUP-4b545ffb6f9dd6e9 and WO-011's known issues route the cache setting to a later self order. Neither file is a WO-011 surface or criterion, and the operator record changes only through the operator or a planning pass, so the correction goes to the next planning pass that edits either file (this review's F1).",
  "evidence": [
    "grep -n 'upgrade order' docs/operator/README.md prints line 127, the end of the Manual steps preference's removal condition; the same search in docs/work-orders/WO-005-foundation-libraries.md prints line 175, the end of the Design's cache-setting sentence",
    "docs/planning/latest-upstream-2026-10-19.md: section 9's carried candidates file the upgrade order, the main-rules pass's C1, as WO-011; D6 keeps the interim entries for WO-005 and makes WO-005's draft publish the first observation of the admission; section 11 writes back to the operator record only D10's directions",
    "The same pass re-deferred FUP-2479f6d32b2396a8 because the qualification moved from the upgrade order to WO-005's draft publish, and filed FUP-c60b54b317ec79f7 (the entries' removal, after which the operator record says so) and FUP-4b545ffb6f9dd6e9 (a self order edits the registration)",
    "WO-011's known issues and the profile's Release close section: WO-011 runs no live episode and makes no host-qualification claim, and the cache setting waits for a later self order"
  ],
  "rejected": [
    {
      "option": "Edit the operator record or WO-005 in this order",
      "reason": "Neither is a declared surface of WO-011; the operator record changes only when the operator says so or a planning pass records it, and WO-005 is a judged order whose text changes through a planning pass."
    },
    {
      "option": "Leave it as a report sentence",
      "reason": "Every role reads the operator record at session start, so the correction needs a register row that the next planning pass sees."
    },
    {
      "option": "Route it as blocking",
      "reason": "It breaks no WO-011 criterion and no behavior main had; a finding outside the criteria is a follow-up by rule."
    }
  ],
  "reopenWhen": "A session cites the operator record's condition to ask for the interim entries' removal before WO-005's draft publish, or WO-005's executor reaches its step 5 while its Design still names the upgrade order.",
  "followup": "The next planning pass that edits docs/operator/README.md or amends WO-005 (section 8.2 of the 2026-10-19 planning document already assigns WO-005 an amendment): restate the Manual steps removal condition as planning decision D6's sequence, and make WO-005's Design board a registration-side cache setting for the later self order that FUP-4b545ffb6f9dd6e9 names instead of the upgrade order."
}
```
