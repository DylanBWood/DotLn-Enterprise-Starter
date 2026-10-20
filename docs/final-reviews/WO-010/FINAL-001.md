# WO-010 — FINAL-001

**Verdict:** pass.
**Date:** 2026-10-20.
**Work order:** [WO-010](../../work-orders/WO-010-protect-main-both-repositories.md).
**Verification sequence:** [VER-001](../../verifications/WO-010/VER-001.md) (pass). It had one follow-up finding, F1: the comparator's blind spot for `enforcement`, and no recorded disposition of the planning receipt's known issues. F1 was fixed in evidence as [WO-010-D006](../../evidence/WO-010/decisions.md#wo-010-d006). No repair dispatch occurred.
**Subject:** the full `wo-010` diff against `main` at `5037ba8`. It covers the two declared ruleset files, the two branch-rule readbacks and `compare-rules.mjs` under [`docs/evidence/WO-010/`](../../evidence/WO-010/README.md); the replaced policy sentence in [`docs/repositories/dotln-angular.md`](../../repositories/dotln-angular.md); the release claim in [`README.md`](../../../README.md) and the order heading at `v0.3.1`; the order's evidence (command record, gate summary, meter snapshot, worker self-review and [handoff](../../evidence/WO-010/handoff.md)); [decisions](../../evidence/WO-010/decisions.md) D001 to D007; the control segment and projection; and the work-order and decisions indexes. It also covers the live settings of `DylanBWood/DotLn-Angular` and `dylanwoodconsulting/DotLn-Enterprise-Starter` that those records describe.
**Publication:** [PR.md](PR.md) and [RELEASE-NOTES.md](RELEASE-NOTES.md) beside this report.
**Ideation receipt:** none exists for this order. Its provenance is the 2026-10-18 main-rules [planning pass](../../planning/main-rules-and-platform-items-2026-10-18.md) (§4, §5 and §6 D1, D2 and D10), with its refutation receipt [`2026-10-18-planning-14fefa7dc1ee9d3b-002`](../../planning/refutations/2026-10-18-planning-14fefa7dc1ee9d3b-002.md) (aligned-with-findings, no hold) and the WO-010 carry-ins in that pass's §8.2. The 2026-10-19 latest-upstream [planning pass](../../planning/latest-upstream-2026-10-19.md) (§6 D7) amended it, with its refutation receipt [`2026-10-19-planning-e0dd1f8a7a5b84af-003`](../../planning/refutations/2026-10-19-planning-e0dd1f8a7a5b84af-003.md) (aligned-with-findings, no hold, four known issues for WO-010). The three §8.2 carry-ins are discharged. Each ruleset's detail is recorded; the executor's projection left out `current_user_can_bypass`, which VER-001 and this review record. A copy with a changed merge method prints `differ`. DotLn-Angular's `checks` run was recorded on `main` before its ruleset was applied. D006 disposes the receipt's four known issues: the comparator condition occurred on its enforcement half, and the bypass, `checks` and waiver conditions have not occurred. My readback of 11:58Z confirms that, as far as each can be observed before the merge.

Reviewer: Claude Code 2.1.304, model `claude-opus-5-5`, dispatched by the operator's `resume: final review` on 2026-10-20 in the `wo-010` worktree. Effort is `max`, read from `CLAUDE_EFFORT`; that is the selected effort, not proof of the effective one. The order recommends reviewer effort `xhigh`; the operator selected `max` for this session, and the attestation records what was selected. No worker was spawned. The executor ran under Codex CLI 0.163.0 (`gpt-6-astra`, max) and the verifier under Claude Code 2.1.304 (`claude-opus-5-5`, max).

**Actor attestation:** {"harness":"claude-code","harnessVersion":"2.1.304","model":"claude-opus-5-5","effort":"max","source":"claude-session-readback"}
**Process cost:** entry 90,404 tokens; handoff 11,189,861 tokens; source claude-transcript-message-usage

Usage scope: `dispatch`. The entry reading was cut off at 2026-10-20T11:53:09.248Z, after the skill loaded and canonical status was taken. The handoff reading was cut off at 2026-10-20T12:06:15.232Z, after the release notes and the PR body were written and before this report was filed. Both are cumulative counters: the handoff total includes 10,913,531 cached input tokens re-read across turns, which is not unique context. USD cost is unavailable. Fan-out plan: zero of the 20-agent `subagentCap`. The readback observed zero (exact-observed), and every claim was one I could run myself. Final counters after filing stay in the ignored receipt and the session response. Cost compared with the equivalent outcome: the product gate was not rerun, because the integration moved no code byte and the executor's complete row stands at the unchanged identity. The live reproduction took about ten seconds of bounded probe work. The only gate this review pays for is the document gate after the reports. It runs twice, because the first run failed on a phrase in the release notes (see §Executed checks and product gate).

## Method and limits

The operator's phrase selected WO-010 in `final-review`. The session hook recorded the dispatch once and allocated this report, and its briefing printed the usage command and the cost-line rule.

What I read:

- The order and its cited sections: planning §4, §5 and §6 D1, D2, D10 and D14; the profile's §Branch and pull-request policy; the operator record's standing preferences; and 07 §Verification review and attack and §Discipline's adjacent-repair rule.
- The publication contract: 08 §PRs and commits and §Release-note edition.
- The WO-010 findings of both refutation receipts and the §8.2 carry-ins.
- The whole diff listed under Subject.
- VER-001, decisions D001 to D006 and the integration stub, the handoff, the self-review, the evidence README, the gate summary and the control segment's five events.
- The follow-up register's matched row, the integration helper, and the rules for criterion lines, the cost line and the findings block.
- GitHub's available-rules page and its REST reference for repository rules, read on 2026-10-20, and DotLn-Angular's `ci.yml`.
- The reader profile of each publication surface: the balanced default, since no profile file is declared.

Lenses:

- Correctness: three criteria rest on a comparison script and two on live settings.
- Authority and private data: the order changed two live repositories, binds the operator's own account, and its records cite captures.
- Operator flow: a wrong rule blocks every merge, and no one can bypass it.
- Maintainer in six months: the policy files and the comparator are what the next reader reruns.

I also judged the design: nothing simpler holds the contract. Platform fit does not apply, since no capability was added.

Traps named before the material choices:

- Anchoring on VER-001's pass. I re-read every criterion live instead.
- Accepting, on the executor's word, that the server-added `require_extra_approval_for_unattributed_changes: true` is harmless. I read GitHub's page: the matching option has no effect at zero required approvals, and it is on by default, which matches both readbacks.
- Handing the fork's hidden bypass list back to the operator. Refused, because GraphQL and `current_user_can_bypass` answer it through the API.
- Rerunning the complete gate although the integration moved no code byte. Refused, because the code identity says what was tested.
- Rewording the profile's `pull_request` sentence. It names the rule and its merge-method limit without saying in words that a pull request is required. I left it, because the rule type's name carries that meaning, and an imperfection noticed in passing is not a defect.

The NoOp, a report without integration and publication, would have left the operator's merge waiting on nothing.

Reproduction ran under `node scripts/harness.mjs bounded --`, one process at a time and outside any gate. The probe sources, `wo010-final-probe.mjs` and `wo010-gate-rows.mjs`, are in the DotLn session scratch. Every GitHub call was a `GET` or a GraphQL query, made as `DylanBWood` from 2026-10-20T11:58:02Z:

- Policy files: the order's step-2 command printed exactly `ruleset-dotln-angular deletion,non_fast_forward,pull_request,required_status_checks` and `ruleset-fork deletion,non_fast_forward,pull_request`. The self-comparison printed `match`, exit 0.
- DotLn-Angular's `rules/branches/main`: SHA-256 `2afcc95a…`, byte-identical to the committed readback. It has four rules, each from ruleset `25452385`, and `required_status_checks` is `[{"context":"checks","integration_id":15368}]`.
- The fork's `rules/branches/main`: SHA-256 `79c2ad14…`, byte-identical. It has three rules, each from ruleset `25354095`.
- An unauthenticated `curl` of each endpoint returned the same JSON. `compare-rules.mjs` printed `match`, exit 0, for each policy file against the committed, live and unauthenticated readbacks: six runs.
- Rulesets: each repository has one ruleset across the `branch`, `tag` and `push` targets. Each is named `main` and is `active`, with include `~DEFAULT_BRANCH`, exclude `[]` and `current_user_can_bypass: never`. DotLn-Angular's detail has `bypass_actors: []`; it was created at 04:02:55.255Z and updated 176 ms later. The fork's detail omits `bypass_actors` for this push-only account; it was created at 2026-10-18T18:57:17.708Z. GraphQL `bypassActors.totalCount` is 0 for both, read with viewer permission `ADMIN` and `WRITE` respectively.
- Other protection: classic branch protection answers 404 on both repositories. `rules/branches/` for `wo-010`, `feat/some-slug`, `planning/some-pass` and `chore/starter-update-x` returns `[]` on both.
- Repository settings: DotLn-Angular has `delete_branch_on_merge: true` and the fork `false`. Both allow merge, squash and rebase, with title `PR_TITLE` and message `BLANK`; these are unchanged, as the non-goals require.
- CI: DotLn-Angular's `ci.yml` runs on every `pull_request` and on pushes to `main`. Its job is `checks` with no display name, so the check run is named `checks`. `main` carries a `checks` run from app 15368 that succeeded. No pull request has been opened on DotLn-Angular since the ruleset was created, and its only remote branch is `main`.
- Merges under the fork's ruleset: pull requests #8, #9 and #10 merged after 2026-10-18T18:57Z, each as a two-parent merge commit (`98b3934`, `c085769` and `5037ba8`).
- Criterion 5 checks: `grep -c "readback-dotln-angular.json" docs/repositories/dotln-angular.md` printed `1`. `npm run work-orders -- index --check` printed `PASS docs/work-orders/README.md is current` and `PASS docs/work-orders/HISTORY.md is current`, exit 0.
- Intake: the screenshot and the notes file match the SHA-256 digests D002 records. I read the notes file to check the paraphrase: the committed records share no run longer than two words with it, so the operator is paraphrased, never quoted. I did not open the screenshot; the API readbacks above establish what it was cited for.

Limits:

- The `checks` requirement on a real pull request, and the bypass state after the merge, can be observed only after WO-010 merges and DotLn-Angular's next pull request opens, as D006's reopening conditions say.
- That the owning account created the fork's ruleset rests on the operator's statement, because the history endpoint is closed to a push-only account.
- `require_extra_approval_for_unattributed_changes` is absent from the REST reference read today. Its link to the documented option rests on the name and the default.
- `compare-rules.mjs` is both under review and an instrument. Criteria 2 and 4 also rest on byte identity with the live responses.
- The executor's two worker reports exist only as the dispositions in `self-review.md`.
- The local-terms list is observed only as `present`. `npm run terms -- check` over the 21 subject files reported no match and printed no term.

## Criterion judgments

**Criterion 1:** met — Expected: both files parse, the step-2 listing prints exactly its two lines, and the self-comparison prints `match`. Observed: exactly those two lines, and `match`, exit 0. Evidence: the probe, the evidence README §Comparison evidence and VER-001 criterion 1. Severity: none.

**Criterion 2:** met — Expected: the DotLn-Angular readback, compared with `ruleset-dotln-angular.json`, prints `match` and names the four rule types with the `checks` context. Observed: the live response is byte-identical to `readback-dotln-angular.json` (SHA-256 `2afcc95ac44274a0e3bd00ac40143c41d2a5492f02b55b7e8aef5a38fcf52641`). The committed, live and unauthenticated reads each print `match`, exit 0. The readback names `deletion`, `non_fast_forward`, `pull_request` and `required_status_checks`, the last with `{"context":"checks","integration_id":15368}`. Evidence: the probe, the README and VER-001 criterion 2. Severity: none.

**Criterion 3:** met — Expected: `true`. Observed: `gh api repos/DylanBWood/DotLn-Angular --jq .delete_branch_on_merge` printed `true` at 11:58:10Z. Evidence: the probe and the README. Severity: none.

**Criterion 4:** met — Expected: the fork readback, compared with `ruleset-fork.json`, prints `match`, or the README records `blocked`. Observed: the first branch holds. The live response is byte-identical to the committed readback (SHA-256 `79c2ad14192603672de3eced0db1727e1e6776d01888c80c8a8fa7f2aa7b9e3e`), and the committed, live and unauthenticated reads each print `match`, exit 0. There is no `blocked` record and no waiver. Evidence: the probe, the README, D002 and VER-001 criterion 4. Severity: none.

**Criterion 5:** met — Expected: the profile section names the readback file and the four rule types in force, and the index check exits 0. Observed: `grep -c` printed `1`. The section names `pull_request`, `required_status_checks`, `non_fast_forward` and `deletion`, and each of its statements agrees with the live readback. `npm run work-orders -- index --check` printed two `PASS` lines, exit 0. Evidence: the probe, the checks above and VER-001 criterion 5. Severity: none.

**Criterion 6:** met — Expected: `npm test` and `npm run test:docs` pass at the final identity, and the Preflight suites passed before the full run. Observed: the complete `npm test -- --review` row at code identity `032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86` (exit 0, 7 fresh suites, none unrun, recorded 2026-10-20T04:09:10.219Z) stands after the integration, which left that identity and the instance input digest unchanged, and the completion consumes it. The order's Preflight line makes that complete run, with `kit-verify` inside it, the Preflight, as D004 records; VER-001's `--only kit-verify` row (7 passed) sits at the same identity. `npm run test:docs` runs after this report's last edit, and the completion consumes that row. Evidence: `gate-summary.json`, the gate-rows probe and VER-001 criterion 6. Severity: none.

## Implementation review

The change applies the Design as written. The two policy files are the Design's documents byte for byte, apart from an empty `exclude` list that the server returns anyway. DotLn-Angular's ruleset was created once from its file (one version in its history, per VER-001), and its head-branch setting was turned on by one call. The fork's file served as the checklist for the operator's UI route, which the Design allows, and its readback is the same. The comparator is the smallest form of the contract: it requires unique rule types on both sides and equal lengths, and each expected parameter must be deep-equal. It fails closed on malformed input, and VER-001's 26 negative variations held. It compares rules only. D006 records this, and because the branch endpoint returns only active rules, a rules-only comparison is enough for criteria 2 and 4.

The profile paragraph replaces exactly the sentence the order named, and each of its statements matches the readback. The executor's decisions hold. D002 and D005 keep API observations, the screenshot and the operator's statement apart, and they do not present the fork's hidden `bypass_actors` as an empty list. D003 keeps the comparator to the declared rule types and parameters, and D004 leaves the matched follow-up row pending. D006, the verifier's decision, disposes the receipt's known issues. Two records are thinner than the order asked for. The README summarizes the step-7 and step-8 check outputs instead of quoting them, and its fork detail projection omits `current_user_can_bypass`, which a 2026-10-18 carry-in named. VER-001 and this review record both outputs, so every claim has its evidence; I do not count either as a defect.

Authority and private data: the effects stayed within the operator's dated exception in the operator record's Standing preferences. That means one ruleset and one setting on DotLn-Angular, no write to the fork, and no change to account rights, merge settings or organization structure. The records name only the operator's public repositories and accounts, GitHub's public app id and the rulesets' ids, all of which any reader of either repository can see. The operator is paraphrased, with the capture cited by digest. No hostname, credential or home path is committed.

Process health: `npm run meta` reports one reopen candidate, seeking-the-wrong-goal. The machinery share rose to 0.751 (Δ 0.036), and it has worsened over three consecutive orders. For a settings order with almost no diff, the fixed cycle is most of the work. This is an observation for the next planning pass, not a defect of this subject.

## Integration and release surfaces

`npm run worktree -- integrate WO-010 --intake-backup <archive in the session scratch, 3 files>` fetched `origin/main` at `5037ba8975d949fcb471a9f2c9b364b768e53f96`, the same commit as `wo-010`, so the merge changed nothing. Checkpoint `refs/dotln/checkpoint/WO-010/6` and the named stash `46db4ecc31e7b99406115bbca15bf3b4199783ed` are retained, and the 21 working-tree entries were restored intact. The worktree holds ignored intake (the screenshot and the notes file D002 cites), so `npm run backup:intake` archived it to the session scratch first; the intake itself was left untouched. Every regeneration step completed: runtime, harness bundle and manifest, control projection, release preparation, decision stub, decisions index, follow-up register and meta, and the work-order index. Release preparation reported `WO-010 target v0.3.1 remains current` and refreshed only the meter snapshot and the PR meter block. The code identity after the integration is `032cfe30…`, unchanged, so the executor's complete row stands and no fresh complete run is owed. [WO-010-D007](../../evidence/WO-010/decisions.md#wo-010-d007) completes the integration record, including the affected checks as run, and `npm run meta` regenerated the decisions index after it.

Release surfaces: the order heading and the README block carry `v0.3.1` from the executor's release preparation (D001). That is the next patch above `v0.3.0`, the latest tag both locally and on origin. `check-surfaces --local` after the integration passed all 48 rules. These include the release block at `v0.3.1` above `v0.3.0`; five component versions unchanged from `v0.3.0`, with every component source unchanged; the workspace pins; the GitHub body profile of `PR.md`; and the license surfaces. The release notes beside this report carry the contract's five sections, one physical line per paragraph.

## Findings

No finding. Nothing in the verified subject is defective within verification's instructed scope, the integration raised no conflict or new defect, and the release surfaces pass. VER-001's F1 was fixed in evidence before this review and stays fixed: none of D006's reopening conditions had occurred at 11:58Z.

<!-- dotln-findings:start -->
[]
<!-- dotln-findings:end -->

## Executed checks and product gate

- `npm run format`: run after the last edit outside the reports. All 287 files it checks were unchanged; the format gate ignores `.md`, `.json` and `.jsonl` files.
- `npm test -- --review`: not rerun. The complete row at code identity `032cfe307c27581f969158174b805c6a2fd5691f3a9851b9c10939794bbb8e86` (review selection, 7 passed, 0 failed, 12,139 ms, recorded 2026-10-20T04:09:10.219Z by the executor) is the row the completion consumes. The gate-rows probe after the integration, and again after formatting, found it as the one candidate.
- `npm run test:docs`: the first run after the reports were written failed in 14,212 ms, with 4 suites passed and 10 failed. The `generated` structural check failed on `github-body-profile`, which refused `RELEASE-NOTES.md` line 7: the checker reads the inline `<type>/<slug>` as raw HTML, which reviewed notes do not allow, even inside a code span. The nine suites after it stopped at the failed structural preflight; nothing else failed. I reworded that one phrase to name the branches in words, and `npm run release -- check-surfaces --local` then passed every rule. The gate runs again after this report's last edit. The completion consumes that passing row for the working tree as it stands, and the `FinalReviewCompleted` event records it.
- `git diff --check`: clean, and the untracked records have no trailing whitespace.
- `npm run release -- check-surfaces --local`, `node scripts/harness.mjs check`, `npm run publication:check`, `npm run work-orders -- index --check`, `npm run format:check` and `npm run terms -- check` over the 21 subject files: results as recorded above.
- `npm run plan -- followups --touching`: 1 of 8 pending rows matched, `FUP-4c3c0351adc4c2cc`, on `WO-010` alone; it stays pending.
- `npm run adjacent -- list`: revision 0, no items.
- Background monitors: none started, and no agent was launched.

The outcome matched the operator's direction. Both `main` branches are under active rulesets with no bypass actor, and DotLn-Angular requires its `checks` run and deletes head branches on merge. Every criterion is met without a waiver, the integration and release surfaces are prepared and the release notes are written. Only the `wo-010` branch is published, after this result is recorded. This report's evidence and usage have the cutoffs above; later completion receipts do not revise these bytes.
