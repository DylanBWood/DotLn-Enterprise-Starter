# WO-011 — FINAL-001

**Verdict:** pass.
**Date:** 2026-10-20.
**Work order:** [WO-011](../../work-orders/WO-011-starter-v0.85.0-registration.md).
**Verification sequence:** [VER-001](../../verifications/WO-011/VER-001.md) (pass). It had one follow-up finding, F1: WS-001 does not state that WO-005's draft publish is the first live observation of the kit's admission, and its WO-011 delivery-state row reads `proposed`. F1 is recorded in [WO-011-D007](../../evidence/WO-011/decisions.md#wo-011-d007) and boarded as `FUP-53f596d1a9e029f1`. No repair dispatch occurred.
**Subject:** the full `wo-011` diff against `main` at `9dbe9f2`. It covers the `disposable` declaration in [`dotln.config.json`](../../../dotln.config.json); §Release close and the reworded policy sentence in [`docs/repositories/dotln-angular.md`](../../repositories/dotln-angular.md); WS-001's delivery-state row; the release claim in [`README.md`](../../../README.md) and the order's amended heading and criteria 1 and 5 at `v0.3.2`; the planning log's amendment event; the order's evidence (command record, gate summary, meter snapshot, worker self-review and [handoff](../../evidence/WO-011/handoff.md)); [decisions](../../evidence/WO-011/decisions.md) D001 to D009; the control segment and projection; the follow-up register; and the work-order and decisions indexes. It also covers the main clone's shared Git configuration and tags and `origin`'s tags, which those records describe.
**Publication:** [PR.md](PR.md) and [RELEASE-NOTES.md](RELEASE-NOTES.md) beside this report.
**Ideation receipt:** none exists for this order. Its provenance is the 2026-10-19 latest-upstream [planning pass](../../planning/latest-upstream-2026-10-19.md) (§4 and §6 D2, D4, D5, D6 and D8) with its refutation receipt [`2026-10-19-planning-e0dd1f8a7a5b84af-003`](../../planning/refutations/2026-10-19-planning-e0dd1f8a7a5b84af-003.md) (aligned-with-findings, no hold, six known issues for WO-011), and candidate C1 of the 2026-10-18 main-rules pass. The six §8.2 carry-ins are discharged. (a) The profile assigns the removal of WO-005's two generated environment files to WO-005's sessions. (b) The profile states the named-tag rule. (c) WS-001 carries a line naming `docs/evidence/WO-011`, which `main` lacks. (d) The executor read the shipped matcher, recorded that it is anchored at the checkout's root, and declared no nested root. (e) The evidence and the profile record the recurring reinstall. (f) The clause was reworded through the operator-approved amendment. D007 disposes the receipt's six known issues: the criterion-4 condition occurred (VER-001 F1), and the other five have not. My readback from 13:27Z confirms that, as far as each can be observed before the merge.

Reviewer: Claude Code 2.1.304, model `claude-opus-5-5`, dispatched by the operator's `resume: final review` on 2026-10-20 in the `wo-011` worktree. Effort is `max`, read from `CLAUDE_EFFORT`; that is the selected effort, not proof of the effective one. The order recommends reviewer effort `xhigh`; the operator selected `max` for this session, and the attestation records what was selected. No worker was spawned. The executor ran under Codex CLI 0.163.0 (`gpt-6-astra`, max) and the verifier under Claude Code 2.1.304 (`claude-opus-5-5`, max).

**Actor attestation:** {"harness":"claude-code","harnessVersion":"2.1.304","model":"claude-opus-5-5","effort":"max","source":"claude-session-readback"}
**Process cost:** entry 90031 tokens; handoff 13222836 tokens; source claude-transcript-message-usage

Usage scope: `dispatch`. The entry reading was cut off at 2026-10-20T13:25:45.133Z, after the skill loaded and canonical status was taken. The handoff reading was cut off at 2026-10-20T13:38:40.738Z, after the release notes and the PR body were written and before this report was filed. Both are cumulative counters: the handoff total includes 12,895,972 cached input tokens re-read across 88 steps, which is not unique context. USD cost is unavailable. Fan-out plan: zero of the 20-agent `subagentCap`, because every claim was one I could run myself; the readback observed zero (exact-observed). Final counters after filing stay in the ignored receipt and the session response. Cost compared with the equivalent outcome: the product gate was not rerun, because the integration moved no code byte and the executor's complete row stands at the unchanged identity. The reproduction took a few seconds of bounded probe work. The only gate this review pays for is the document gate after the reports.

## Method and limits

The operator's phrase selected WO-011 in `final-review`. The session hook recorded the dispatch once and allocated this report, and its briefing printed the usage command and the cost-line rule.

What I read:

- The order and its cited sections: planning §4, §6 D2, D4, D5, D6 and D8, §8.2 and §9; README §Taking upstream updates; core's v0.85.0 notes §Read before upgrading, read with `gh release view`; `validateDisposablePaths`, `validateClasses`, `validateRepositoryRelease` and the composition in `scripts/lib/config.mjs`; `publishTargetRelease` and the target Release title in `scripts/release.mjs`; `underDisposable` and the base refusal in `scripts/lib/target-worktree-close.mjs`; DotLn-Angular's profile and WS-001; and 07 §Preflight before the full gate and §Verification review and attack.
- The publication contract, 08 §PRs and commits and §Release-note edition, and the reader profile of each surface I wrote: the balanced default, since no profile file is declared.
- The operator record, and the WO-011 findings of refutation receipt 003 with their reopening conditions.
- The whole diff listed under Subject.
- VER-001, decisions D001 to D007 and the integration stub, the handoff, the self-review, the evidence README, the gate summary, the command record's 27 entries and the control segment's five events.
- The amendment capture in ignored intake, to check D004's scope and paraphrase against it.
- The follow-up rows that match WO-011, and the integration helper.

Lenses:

- Correctness: the order's value is what the close and the fetch then do, not only the bytes.
- Operator flow: each close now deletes material in the operator's DotLn-Angular checkout, and a tag preview needs a manual cleanup.
- Authority and private data: the order changes a shared Git setting and rests two criteria on an operator approval.
- Maintainer in six months: the profile section is what the next order's sessions will read.

I also judged the design: nothing simpler holds the contract. Platform fit does not apply, since no capability was added.

Traps named before the material choices:

- Anchoring on VER-001's pass. I reran every criterion after the integration instead.
- Failing criteria 1 and 5 on their filed words. Refused: the capture's digest matches D004, the capture approves exactly the three changes the diff makes, and `plan check` binds the amended bytes, so the amendment is judged from the record.
- Reading the empty literal `main...HEAD` as a failure. Refused: nothing is committed before final review, so I wrote the tree to be committed through a scratch index and compared it with `main`; the literal form runs again after the commit.
- Repairing WS-001 or the operator record in this order. Refused: neither change is in the Design, and both belong to a planning pass, so both are boarded.
- Rerunning the complete gate although the integration moved no code byte. Refused, because the code identity says what was tested.

The NoOp, a report without integration and publication, would have left WO-005's typed edge waiting on nothing.

Reproduction ran under `node scripts/harness.mjs bounded --` where it ran kit code, one process at a time and outside any gate. The probe sources, `wo011-gate-rows.mjs` and `wo011-json-delta.mjs`, are in the DotLn session scratch. The remote reads were `git ls-remote` and `gh release view`; nothing remote was written. From 2026-10-20T13:27Z:

- Step 2 readback: exactly `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]` and then `no-release`, exit 0.
- Key-by-key comparison of `dotln.config.json` with `main`: `added ["classes.angular-nx-monorepo.disposable"]`, `removed []`, `changed []`. The added value is the Design's list in the Design's order, and the validator accepts each entry as a contained, normalized relative path.
- Tag guard: `git config --get remote.upstream.tagOpt` printed `--no-tags`; `--show-origin --show-scope` places it at local scope in the clone's shared `.git/config`, and `extensions.worktreeConfig` is unset. `git tag --list v0.85.0` and `git ls-remote --tags origin refs/tags/v0.85.0` printed nothing, exit 0. The local tags are `v0.1.0`, `v0.2.0`, `v0.3.0` and `v0.3.1`, and `origin` holds each of them.
- Kit and harness: `kit: 964 files verified at f577979ed04e98cccb3a29a9535ba6172d09a8c9` and `harness check: 34 generated surfaces; local-terms list: present`, both exit 0. Every kit file matches the manifest, so none of the changed paths is a kit file.
- Counts: `^## Release close` 1 and `__screenshots__` 1 in the profile; `WO-011` 4 and `docs/evidence/WO-011` 1 in WS-001. On `main` the four counts are 0, 0, 4 and 0. The section follows §Branch and pull-request policy.
- Committed-tree preview: a scratch index built from `HEAD` plus `git add -A` wrote tree `3009fe76f8a2c1b78a503bddf82da79bb7695fd3`. Compared with `main`, it changes 21 paths: `README.md`, `dotln.config.json` and 19 paths under `docs/`. The `README.md` change is the one release line, `v0.3.1` to `v0.3.2`.
- Code: `underDisposable` matches a path equal to a declared root or under it followed by `/`. The base refusal maps each undeclared ignored path to its top-level directory. Both refusals say regenerable output is deleted at close and never moved to scratch. `publishTargetRelease` returns before any tag or Release unless the policy is `declared`, and a declared Release is titled with the registration id and the tag.
- Core's v0.85.0 notes: the base-checkout judgment and deletion, never to scratch; the top-level naming of nested material; keeping core's tags off a fork's origin; and no qualified host. Each agrees with the profile.
- Amendment: the capture's SHA-256 is `8e0b97a1c74f1795bb758f79d8b6bc9a5a50f9e9f35b75c0ccba2f8b127d96d3`, as D004 records. The capture approves three changes: a parseable title, a clarified criterion 1 and the README claim in criterion 5. The order's diff is exactly those three hunks. `plan check` exits 0 and lists WO-011 as an `authorized-execution-amendment` under D004; the judged hash is `main`'s order bytes (`f961e1ce…`) and the current hash is the worktree's (`537592aa…`).
- Stale references: `grep -n 'upgrade order'` prints line 127 of the operator record and line 175 of WO-005 (this review's F1).
- Hygiene: `git diff --check main` exits 0, and every untracked file ends with a newline and has no trailing whitespace. `npm run terms -- check` over the 21 subject files reported no match. No subject file contains a home path, an email address or the capture's wording.

Limits:

- No live close can run, because no target order is at `verified`. The close's behavior rests on the shipped code, VER-001's matcher probe and core's notes.
- The tag guard is a clone-local setting, observed in this clone only.
- That `v0.85.0` was absent before the setting (D002) rests on the executor's entry readback, which the record does not keep. The current state agrees.
- The executor's two worker reports exist only as the dispositions in `self-review.md`.
- The local-terms list is observed only as `present`.

## Criterion judgments

**Criterion 1:** met — Expected: the step 2 readback prints exactly the sorted list and then `no-release`, and the diff adds the one `disposable` key and removes no existing key or value. Observed: after the integration, the readback printed exactly those two lines, exit 0. The key-by-key comparison with `main` lists one added path, `classes.angular-nx-monorepo.disposable`, and nothing removed or changed. The line diff rewrites the one-line class object, which the amended clause admits. The literal `git diff main...HEAD -- dotln.config.json` is judged on the tree to be committed, whose `dotln.config.json` is the working tree's, and it runs again after the commit. Evidence: the probes above, D001, D004 and VER-001 criterion 1. Severity: none.

**Criterion 2:** met — Expected: `--no-tags`, then no output, then no output. Observed: exactly that, each exit 0, with the setting in the clone's shared configuration that every worktree reads. Evidence: the tag-guard probe, D002 and VER-001 criterion 2. Severity: none.

**Criterion 3:** met — Expected: `kit: 964 files verified at f577979ed04e98cccb3a29a9535ba6172d09a8c9`, and a harness check that exits 0 printing a line that begins `harness check:`. Observed: that line, and `harness check: 34 generated surfaces; local-terms list: present`, both exit 0. Evidence: the probes, the command record and VER-001 criterion 3. Severity: none.

**Criterion 4:** met — Expected: `1`, at least 1, and at least 4. Observed: `1`, `1` and `4`. The discriminating count the planning receipt asked for, `docs/evidence/WO-011` in WS-001, is `1` here and `0` on `main`. The receipt's reopening condition for this criterion occurred, and VER-001 F1 routes it as a follow-up; I concur (see Findings). Evidence: the counts above, D007 and VER-001 criterion 4. Severity: none.

**Criterion 5:** met — Expected: the branch's changed files are `dotln.config.json`, the generated release-version claim in `README.md`, this order and files under `docs/` only. Observed: the tree to be committed changes `dotln.config.json`, `README.md` (its one release line, `v0.3.1` to `v0.3.2`) and 19 paths under `docs/`, the order among them; this report and the release notes add two more under `docs/`. Evidence: the committed-tree preview, D004 and VER-001 criterion 5. Severity: none.

**Criterion 6:** met — Expected: `npm test` and `npm run test:docs` pass at the final identity, and the Preflight suites passed before the full run. Observed: the complete `npm test -- --review` row at code identity `ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99` (exit 0, 7 fresh suites, none unrun, recorded 2026-10-20T12:47:08.018Z) stands after the integration and formatting, which left that identity and the instance input digest unchanged, and the completion consumes it. The order's Preflight line makes that complete run, with `kit-verify` inside it, the Preflight, as 07 §Preflight before the full gate directs, and its six structural checks finish before any suite starts. `npm run test:docs` runs after this report's last edit, and the completion consumes that row. Evidence: `gate-summary.json`, the gate-rows probe, D006 and VER-001 criterion 6. Severity: none.

## Implementation review

The change applies the Design as written. The declaration is the Design's list in the Design's order, on the class where the gate and the supports are declared, and `loadConfig` sorts it. The executor kept `checks` and `supports` on one line and put the new array after them, so the line diff shows one rewritten line plus added lines; the amended clause and the key-by-key comparison settle that. No simpler change holds the contract: a registration-level key would avoid the rewritten line, but the Design rejected it, and nothing else in the configuration grammar declares disposable output.

The profile's Release close section agrees with the code and with core's notes on each point I checked. Deletion happens in both checkouts and never moves anything to scratch. The match is anchored at each checkout's root. The base refusal names the top-level directory. There is no target tag or Release while the policy is absent and `release.close` is denied, and a declared Release would carry the registration id and the tag. The tag setting is clone-local, with the named-tag exception, and the first admission observation follows D6's sequence. The section tells the operator the three things they must do: reinstall in the base checkout after a close, remove local files there, and delete a preview tag. A maintainer can see why `.env` stays undeclared and why `apps/` must never be declared. The reworded sentence above it now points to the section instead of to WO-011's future write-back.

The executor's decisions hold. D001 to D003 match the Design and the code. D004 stays within the capture: the capture approves three changes, the diff makes exactly those three, and the planning log binds the result. D005's version is the next patch above `v0.3.1`, the latest tag both locally and on `origin`. D006's working-tree method for criteria 1 and 5 is correct before a commit exists, and this review supplies the committed form. D007, the verifier's decision, disposes the receipt's six known issues; I checked each disposition against the current state.

Authority and private data: the order changed one Git setting in the operator's clone, which the order and its operator-review assumptions authorize, and no account, host or repository setting. The records cite the intake captures by digest and paraphrase them; no committed file contains the capture's wording, a home path, a hostname or a credential.

Process health: `npm run meta` reports no reopen candidate, and WO-011's machinery share is 0.357 (Δ -0.467).

## Integration and release surfaces

`npm run worktree -- integrate WO-011 --intake-backup`, given an archive in the session scratch holding the 2 intake files, fetched `origin/main` at `9dbe9f256c2adb142680ed91d7dd1f54a012a228`. That is the same commit as `wo-011`, so the merge changed nothing. Checkpoint `refs/dotln/checkpoint/WO-011/6` and the named stash `ff83e286f288165d3ff65415d45ba5ecbadf988f` are retained, and the 21 working-tree entries were restored intact. The worktree holds ignored intake (the amendment capture D004 cites), so `npm run backup:intake` archived it to the session scratch first; the intake itself was left untouched. Every regeneration step completed: runtime, harness bundle and manifest, control projection, release preparation, decision stub, decisions index, follow-up register and meta, and the work-order index. Release preparation reported `WO-011 target v0.3.2 remains current` and refreshed only the meter snapshot and the PR meter block. The code identity after the integration, and again after `npm run format`, is `ea976e67…`, unchanged, so the executor's complete row stands and no fresh complete run is owed. [WO-011-D008](../../evidence/WO-011/decisions.md#wo-011-d008) completes the integration record, including the affected checks as run, and [WO-011-D009](../../evidence/WO-011/decisions.md#wo-011-d009) boards this review's finding. `npm run meta` regenerated the decisions index and the follow-up register after both.

Release surfaces: the order heading and the README block carry `v0.3.2` from the executor's release preparation (D005), the next patch above `v0.3.1`, which is the latest tag both locally and on `origin`. `check-surfaces --local` passed all 48 rules after the integration, and again after the PR body and the release notes were written. These include the release block at `v0.3.2` above `v0.3.1`; five component versions unchanged from `v0.3.1`, with every component source unchanged; the workspace pins; the GitHub body profile of `PR.md` and `RELEASE-NOTES.md`; and the license surfaces, where the `docs/LEGAL.md` pins are unavailable because this instance declares no such file. The release notes carry the contract's five sections, one physical line per paragraph.

## Findings

VER-001's F1 stands as routed. WS-001's WO-011 row reads `proposed`, and WS-001 does not state the first admission observation: `grep -n '| WO-011 | proposed' docs/workstreams/WS-001-dotln-angular.md` prints line 296, and `grep -c -i -E 'draft publish|admission|first live'` on the same file prints `0`. The Design gives WS-001 only the delivery-state row, the state can follow only the merge, and where the statement lives is the planning pass's choice. I therefore concur with D007 and leave `FUP-53f596d1a9e029f1` for that pass. Verification found it, so it is not an escape, and the block below does not list it again.

This review's F1 is new scope: it lies outside the order's criteria and declared surfaces. Two planning-owned records still assign work to the upgrade order, which the 2026-10-19 planning pass filed as WO-011. The operator record's Manual steps preference (line 127) says the interim trust entries are removed once that order shows the kit's admission carries the push. WO-005's Design (line 175) boards a registration-side cache setting for that order. WO-011 can do neither, because it runs no live episode and precedes WO-005. Planning decision D6 keeps the entries for WO-005's draft publish, and `FUP-4b545ffb6f9dd6e9` routes the cache setting to a later self order. A session that reads the operator record after this merge could ask the operator to remove the entries before WO-005, which is the blocked-session risk D6 avoids. To reproduce, run `grep -n 'upgrade order' docs/operator/README.md docs/work-orders/WO-005-foundation-libraries.md`. Severity: low; it breaks no criterion and no behavior `main` had. [WO-011-D009](../../evidence/WO-011/decisions.md#wo-011-d009) records it, and the register boards it as `FUP-3875e6d408c74d3d` for the next planning pass that edits the operator record or amends WO-005. Its class is `new-scope` because neither file is in the verified subject, and the integration did not introduce it.

<!-- dotln-findings:start -->
[{"id": "F1", "route": "follow-up", "class": "new-scope", "summary": "The operator record and WO-005 still assign the trust-entry removal and the cache setting to the upgrade order (WO-011), which D6 and FUP-4b545ffb6f9dd6e9 moved to WO-005's draft publish and a later self order."}]
<!-- dotln-findings:end -->

## Executed checks and product gate

- `npm run format`: run after the last edit outside the reports. All 287 files it checks were unchanged; the format gate ignores `.md`, `.json` and `.jsonl` files.
- `npm test -- --review`: not rerun. The complete row at code identity `ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99` (review selection, 7 passed, 0 failed, 11,557 ms, recorded 2026-10-20T12:47:08.018Z by the executor) is the row the completion consumes. The gate-rows probe found it as the one candidate after the integration, and again after formatting.
- `npm run test:docs`: the first run after the reports were written passed 14 of 14 tasks in 29.70 s. Besides the three historical advisories the order names, `docs-check` raised one new advisory on `PR.md`: a criterion's wording in quotation marks, in a sentence that names the operator, read as attributed words. I reworded it without quotation marks, so it no longer quotes anything. The gate runs again after this report's last edit. The completion consumes that passing row for the working tree as it stands, and the `FinalReviewCompleted` event records it.
- `git diff --check main`: clean, and the untracked records have no trailing whitespace.
- `npm run release -- check-surfaces --local`, `node scripts/launchpad.mjs verify`, `node scripts/harness.mjs check`, `npm run publication:check` (no editions declared), `npm run plan -- check`, `npm run work-orders -- index --check` (both indexes current) and `npm run terms -- check` over the 21 subject files: results as recorded above.
- `npm run plan -- followups --touching`: before this review's decision, 2 of 9 pending rows matched, `FUP-4b545ffb6f9dd6e9` (deferred) and `FUP-53f596d1a9e029f1` (untriaged), both on `WO-011` alone, and both stay as they are. D009 adds `FUP-3875e6d408c74d3d`.
- `npm run adjacent -- list`: revision 0, no items.
- Background monitors: none started, and no agent was launched.

The outcome matched the order's Design and criteria. The class declares the eleven roots, this clone fetches no upstream tags and neither side holds a core-named tag, the gates pass at v0.85.0 on this instance's records, and the profile records the close, the no-release policy and the first admission observation. The objective also names WS-001 as a home for that last statement; it waits on the planning follow-up that VER-001 routed. Only the `wo-011` branch is published, after this result is recorded. This report's evidence and usage have the cutoffs above; later completion receipts do not revise these bytes.
