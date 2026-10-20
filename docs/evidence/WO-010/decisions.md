# WO-010 decisions

## WO-010-D001

```json
{
  "id": "WO-010-D001",
  "date": "2026-10-20",
  "dispatch": "resume: next; release prepare",
  "decision": "Assign application target v0.3.1, the next patch above the observed release baseline v0.3.0, to the heading and the README version claim.",
  "evidence": [
    "release baseline v0.3.0 (local tags)",
    "patch classification declared in docs/work-orders/WO-010-protect-main-both-repositories.md"
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

## WO-010-D002

```json
{
  "id": "WO-010-D002",
  "date": "2026-10-20",
  "dispatch": "resume: next; operator reports existing fork protection and supplies its settings screenshot",
  "decision": "Retain the existing fork ruleset 25354095 without a write or account switch. Use the matching branch-rule and ruleset metadata endpoints plus the operator-supplied UI evidence for the empty bypass list; disclose that bypass actors were not visible through the current API account. Record the operator-attested creation through the dylanwoodconsulting web login and its stated reason; do not introduce admin-right or organization changes.",
  "evidence": [
    "README.md: fork ruleset list has one active main ruleset; its branch readback matches ruleset-fork.json",
    "README.md: fork permissions.admin is false; its detail response omits bypass_actors rather than returning an empty array",
    "GitHub REST repository rules reference, read 2026-10-20: bypass_actors is returned only to an account with write access to the ruleset",
    "Operator screenshot retained in ignored docs/intake/wo010-fork-bypass.png; SHA-256 9f3bf3d26b368affc4c29c7e848b919c2ea483632d67db4efbb75d35049ba10a; active main ruleset, default-branch target and empty bypass list visually inspected",
    "Operator clarification of 2026-10-20 identifies dylanwoodconsulting as the web account used to apply the fork ruleset, deliberately avoiding CLI admin-right changes or an organization arrangement; ignored docs/intake/notes/wo010-fork-settings-origin.md, SHA-256 2fe98b3bd405c9e99b541c2b7d81189c521c10a7d558304eea1afb9b2bcb7411"
  ],
  "rejected": [
    {
      "option": "Reapply or create another fork ruleset",
      "reason": "Naive intervention would change an already matching setting and require extra account access; the NoOp preserves the observed policy."
    },
    {
      "option": "Treat an omitted bypass_actors field as an empty list",
      "reason": "The documented permission boundary makes that inference false."
    },
    {
      "option": "Require an owner-account switch despite the supplied UI evidence",
      "reason": "The requested policy and live rules are already established; the order permits the operator UI route and the screenshot closes the remaining evidence gap."
    },
    {
      "option": "Grant the CLI account admin access or introduce an organization arrangement",
      "reason": "The operator deliberately chose the owner web login to avoid those changes; the existing matching ruleset requires neither."
    }
  ],
  "reopenWhen": "The fork rules differ on a fresh readback, the operator reports a changed bypass list, or independent verification finds the screenshot insufficient to establish the policy."
}
```

## WO-010-D003

```json
{
  "id": "WO-010-D003",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Apply the declared DotLn-Angular ruleset and enable its automatic head-branch deletion as DylanBWood, then compare both live branch readbacks against the committed policy inputs. Keep the comparator limited to rule types and expected parameters, with ruleset metadata and bypass evidence recorded separately.",
  "evidence": [
    "README.md: DotLn-Angular admin true, no existing ruleset, checks from github-actions app 15368 succeeded",
    "README.md: POST of ruleset-dotln-angular.json returned active main ruleset 25452385; PATCH and independent GET both returned delete_branch_on_merge true",
    "README.md: Angular detail endpoint returned active, target branch, default-branch condition, no exclusions and bypass_actors []",
    "Comparison evidence: both live pairs and the self-comparison match; changed merge method, check integration, missing/extra/duplicate rules, missing parameter and malformed JSON are rejected; reordered rules match",
    "GitHub returns extra default pull-request parameters in both readbacks; the declared required approval count remains zero",
    "The operator accepted the specified split: automatic head-branch deletion on for DotLn-Angular, off for the fork"
  ],
  "rejected": [
    {
      "option": "No change to DotLn-Angular",
      "reason": "Its initial endpoints showed no rules and automatic head-branch deletion false."
    },
    {
      "option": "Compare whole JSON responses byte for byte",
      "reason": "Readbacks add metadata and server defaults; the order requires matching declared rule types and parameters."
    },
    {
      "option": "Change merge settings, add more rules, or enable head-branch deletion on the fork",
      "reason": "These are explicit non-goals; the operator accepted retaining that scope."
    }
  ],
  "reopenWhen": "An endpoint differs from the declared policy, or a server-added parameter changes the intended approval or merge behavior."
}
```

## WO-010-D004

```json
{
  "id": "WO-010-D004",
  "date": "2026-10-20",
  "dispatch": "resume: next",
  "decision": "Use the current execution guide handoff sequence: complete review run after formatting and regeneration, final handoff, document gate, then implementation-ready. Retain FUP-4c3c0351adc4c2cc as deferred because its planning-check seam is unchanged and its reopening condition has not occurred.",
  "evidence": [
    "docs/product/07-execution-guide.md: Discipline and Preflight before the full gate explicitly supersede the older focused-preflight-before-complete sequence",
    "npm test -- --list on 2026-10-20 lists kit-verify and the six structural checks named by this order",
    "npm run plan -- followups --touching matched FUP-4c3c0351adc4c2cc only on WO-010; it reopens on a later dropped or renamed Preflight suite or core declining the check",
    "npm run adjacent -- list returned revision 0 with no items",
    "Release preparation assigned patch v0.3.1; no component source changes require a version bump"
  ],
  "rejected": [
    {
      "option": "Run focused preflight suites before the complete gate",
      "reason": "The current cited handoff rule avoids that duplicate execution and requires the complete run directly."
    },
    {
      "option": "Mark the pending planning-check follow-up settled",
      "reason": "This settings order implements no such check and opens none of its conditions."
    },
    {
      "option": "Commit or publish during execution",
      "reason": "Verification, final review and release close retain their separate dispatches."
    }
  ],
  "reopenWhen": "A later kit revision changes the declared suites or handoff rule, or this work touches the pending planning-check seam."
}
```

## WO-010-D005

```json
{
  "id": "WO-010-D005",
  "date": "2026-10-20",
  "dispatch": "resume: next; required worker self-review",
  "decision": "Record the criteria worker's endpoint-proof concern as an evidence-method deviation. The operator supplied a settings screenshot in direct response to the executor's request to confirm an empty bypass list or make the owner account available, then explained the deliberate owner-web route. Use that supplied UI evidence for the fork bypass list and the matching branch endpoint for criterion 4. Do not label the omitted API field as proof or change account rights.",
  "evidence": [
    "self-review.md: criteria adversary found one P2 endpoint-proof concern; design improver found none",
    "The order title asks for endpoint readbacks, but criterion 4 specifically consumes the fork branch-rules endpoint and comparator; that comparison passed",
    "The order permits owner-web application; the screenshot was supplied after the executor offered direct confirmation of the empty bypass list as an alternative to owner CLI access",
    "WO-010-D002 names the screenshot and the operator's later explanation of avoiding CLI admin rights or an organization arrangement",
    "README.md explicitly separates API readbacks, UI observation and operator attestation"
  ],
  "rejected": [
    {
      "option": "Claim all fork settings were proved through the API",
      "reason": "The current account cannot see bypass actors; that would overstate the evidence."
    },
    {
      "option": "Repeat the request for owner-account access or confirmation",
      "reason": "The operator already supplied the requested UI evidence and explained the chosen route; the declared criterion 4 endpoint comparison is met."
    },
    {
      "option": "Change the policy or waive the no-bypass requirement",
      "reason": "The UI evidence shows the required empty list; no policy criterion is waived."
    }
  ],
  "reopenWhen": "Fresh independent evidence contradicts the screenshot or the operator requires endpoint-only bypass proof; an owner-authenticated detail readback can then replace the UI evidence without changing the ruleset."
}
```

## WO-010-D006

```json
{
  "id": "WO-010-D006",
  "date": "2026-10-20",
  "dispatch": "resume: verify; dispose the planning receipt's known issues for WO-010",
  "decision": "Keep compare-rules.mjs as it is and judge ruleset enforcement from the ruleset readbacks. The planning receipt's criterion-1 reopening condition occurred on its enforcement half: the script prints match for copies of ruleset-fork.json whose enforcement is disabled or evaluate, because it compares rules only, as the order's Design specifies, and the branch-rules readback it reads carries no enforcement field. Every merge-method change it was given prints differ. The rulesets are proved active by the ruleset list, detail and GraphQL readbacks, and the branch-rules endpoint returns rules from active rulesets only, so a ruleset that is not active leaves a readback that prints differ. The receipt's other three known issues have not occurred: neither ruleset has a bypass actor (DotLn-Angular's detail readback, and GraphQL for both), CI reports checks from app 15368 on pull requests, and criterion 4 is met without a waiver. This records the disposition the executor's evidence omitted (VER-001 F1).",
  "evidence": [
    "Planning receipt 2026-10-19-planning-e0dd1f8a7a5b84af-003, WO-010 findings: four known issues with their reopening conditions",
    "VER-001 comparator attack: copies of ruleset-fork.json with enforcement disabled or evaluate print match, exit 0 (4 cases); allowed_merge_methods changed to merge and squash, squash alone, squash and merge, an empty list, or removed from the readback side print differ, exit 1 (7 cases)",
    "GitHub REST reference for repository rules, read 2026-10-20: Get rules for a branch does not return rules in rulesets with evaluate or disabled enforcement; observed the same day on public repositories, where a disabled default-branch ruleset of nodejs/node and an evaluate-mode default-branch ruleset of microsoft/vscode are absent from their main branch rules",
    "Live readbacks of 2026-10-20 from 04:14:55Z: both rulesets are active in the list and detail endpoints; every rule in both branch readbacks carries the id of its repository's main ruleset (25452385, 25354095); both branch readbacks are byte-identical to the committed files",
    "Bypass: DotLn-Angular's detail readback has bypass_actors [] and current_user_can_bypass never; GraphQL bypassActors totalCount is 0 for both rulesets, read as DylanBWood, who holds push only on the fork; GraphQL gives true counts to a viewer without write access to a ruleset (cli/cli ruleset 4898070: the REST detail omits bypass_actors, GraphQL totalCount 1)",
    "Required check: DotLn-Angular's ci.yml runs on pull_request and on push to main with job checks; main and the head commits of pull requests #1 and #2 carry a check run named checks from app 15368",
    "Criterion 4 is met by the branch-rules comparison with no waiver; the fork readback returns three rules"
  ],
  "rejected": [
    {
      "option": "Fail criterion 1",
      "reason": "Criterion 1's text holds: the files parse, the listing prints the two lines and the self-comparison prints match. The reopening shows what the script does not check, not a wrong answer for what it checks, and enforcement has its own readbacks."
    },
    {
      "option": "Extend compare-rules.mjs to compare enforcement",
      "reason": "The branch-rules readback it compares against carries no enforcement field, so such a check could read only the expected file; it would also widen the script beyond the Design's comparison, which is implementation the verifier does not write."
    },
    {
      "option": "Leave the reopened known issue as a report sentence",
      "reason": "Final review and the next planning pass read the order's decisions, so the disposition belongs there."
    }
  ],
  "reopenWhen": "A claim that a ruleset is active rests on compare-rules.mjs alone; or, after WO-010 merges, either ruleset's detail or GraphQL readback shows a bypass actor, a current_user_can_bypass value other than never, or an enforcement other than active; or the first DotLn-Angular pull request after WO-010 has no check run named checks."
}
```

## WO-010-D007

<!-- integration refs/dotln/checkpoint/WO-010/6 -->

```json
{
  "id": "WO-010-D007",
  "date": "2026-10-20",
  "dispatch": "resume: final review; worktree integrate WO-010",
  "decision": "Integration record completed by the reviewer: main and wo-010 were the same commit 5037ba8975d949fcb471a9f2c9b364b768e53f96, which the integration fetched as origin/main, so the merge changed nothing; the checkpoint, both bases and the named stash are retained, the twenty-one working-tree entries were restored intact, and the ignored intake was archived to the session scratch first and left in place. Carried-forward claims judged against the integrated base: WO-010-D001 to D006 stand unchanged, because no byte of main moved under them, and the live settings they rest on read back unchanged on 2026-10-20 from 11:58Z: both branch-rule readbacks are byte-identical to the committed files, both rulesets are active with current_user_can_bypass never and a GraphQL bypass count of zero, and DotLn-Angular's delete_branch_on_merge is true. Release preparation reported the target v0.3.1 current and refreshed only the meter snapshot and the PR meter block. The code identity after integration is 032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86, the identity of the executor's complete review row, so that row stands for the final review's npm test claim and no fresh complete run is owed. No component-version collision: every component source is unchanged and the surface check passes every rule. The one follow-up row the implementation-ready advisory matched, FUP-4c3c0351adc4c2cc, stays as D004 left it: the change opened no planning-check seam and its condition has not occurred. Changed evidence inputs are recorded here, never by editing verified records.",
  "evidence": [
    "refs/dotln/checkpoint/WO-010/6",
    "base 5037ba8975d949fcb471a9f2c9b364b768e53f96",
    "upstream 5037ba8975d949fcb471a9f2c9b364b768e53f96",
    "release preparation: WO-010 target v0.3.1 remains current. Files changed: docs/evidence/WO-010/meta.json, docs/final-reviews/WO-010/PR.md. Meter snapshot: docs/evidence/WO-010/meta.json, 4090 bytes. Tag observation: local snapshot only.",
    "git status --porcelain --untracked-files=all listed the same 21 entries before and after the integration; npm run backup:intake archived the three intake files to the session scratch before it, and the two ignored files still match the SHA-256 digests D002 records",
    "npm run release -- check-surfaces --local after the integration: 48 PASS rows, 0 FAIL rows; PASS release-block: observed v0.3.1; expected v0.3.1 (work-order target v0.3.1; latest local tag v0.3.0); every component-version row src unchanged",
    "node scripts/harness.mjs check: 34 generated surfaces; local-terms list: present",
    "npm run publication:check: no editions declared",
    "gate rows at code identity 032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86 after the integration: one complete review row, exit 0, recorded 2026-10-20T04:09:10.219Z, seven required suites, none unrun",
    "Reviewer's live readback of 2026-10-20 from 11:58Z as DylanBWood: both rules/branches/main responses byte-identical to the committed readbacks (SHA-256 2afcc95ac44274a0e3bd00ac40143c41d2a5492f02b55b7e8aef5a38fcf52641 and 79c2ad14192603672de3eced0db1727e1e6776d01888c80c8a8fa7f2aa7b9e3e) and compare-rules.mjs printing match for the committed, live and unauthenticated reads; rulesets 25452385 and 25354095 active, include ~DEFAULT_BRANCH, exclude [], current_user_can_bypass never; GraphQL bypassActors totalCount 0 for both; delete_branch_on_merge true on DotLn-Angular",
    "npm run plan -- followups --touching: 1 of 8 pending rows matched, FUP-4c3c0351adc4c2cc (deferred), on WO-010 alone; npm test -- --list still lists kit-verify"
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
      "reason": "Final review disposes only a row whose seam the change opened or whose condition occurred; this row matched on the order id alone and kit-verify still runs."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a kit revision drops or renames kit-verify while WO-010 is open, which reopens the row D004 left pending."
}
```

Integration date: 2026-10-20. Original base: `5037ba8975d949fcb471a9f2c9b364b768e53f96`.
Fetched main: `5037ba8975d949fcb471a9f2c9b364b768e53f96`. Checkpoint: `refs/dotln/checkpoint/WO-010/6`.
Named stash retained: `46db4ecc31e7b99406115bbca15bf3b4199783ed` (WO-010 integrate 2026-10-20).
Resolved projections: none.
Release preparation: WO-010 target v0.3.1 remains current. Files changed: docs/evidence/WO-010/meta.json, docs/final-reviews/WO-010/PR.md. Meter snapshot: docs/evidence/WO-010/meta.json, 4090 bytes. Tag observation: local snapshot only.
Carried-forward claims: D001 to D006 stand unchanged against the integrated base, because main and `wo-010` were the same commit; the complete review row at code identity `032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86` stands; the live branch rules, both rulesets' state and DotLn-Angular's head-branch setting read back unchanged at 11:58Z.
Authored conflicts observed: none.
Affected checks: `npm run release -- check-surfaces --local` (48 PASS, 0 FAIL), `node scripts/harness.mjs check` (34 generated surfaces) and `npm run publication:check` (no editions declared) were run after the integration; `npm test -- --review` is supplied by the standing complete row at the unchanged code identity.
