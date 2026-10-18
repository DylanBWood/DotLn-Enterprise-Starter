# WO-003 — FINAL-001

**Verdict:** pass.
**Date:** 2026-10-18.
**Work order:** [WO-003](../../work-orders/WO-003-register-dotln-angular.md).
**Verification sequence:** [VER-001](../../verifications/WO-003/VER-001.md) (fail: one document-validation regression, F1), the `resume: fix` repair of F1 recorded in the executor [handoff](../../evidence/WO-003/handoff.md), and [VER-002](../../verifications/WO-003/VER-002.md) (pass, no finding).
**Subject:** the full `wo-003` diff against `main` at `2b515fa`: [`dotln.config.json`](../../../dotln.config.json), the operator grant in [`packages/skeleton/loadouts/grants.json`](../../../packages/skeleton/loadouts/grants.json), [`docs/control/outward-vocabulary.json`](../../control/outward-vocabulary.json), the order's heading and the README release block at `v0.2.0`, the order's [evidence](../../evidence/WO-003/README.md), [decisions](../../evidence/WO-003/decisions.md) D001 to D014, the executor [handoff](../../evidence/WO-003/handoff.md) and meter snapshot, the control segment and projection, the work-order and decisions indexes, and the follow-up register.
**Publication:** [PR.md](PR.md) and [RELEASE-NOTES.md](RELEASE-NOTES.md) beside this report.
**Ideation receipt:** none exists for this order. Its provenance is the 2026-10-18 angular-workstream [planning pass](../../planning/angular-workstream-2026-10-18.md) (§5, §6 and §8.1) and the planning [refutation receipt](../../planning/refutations/2026-10-18-planning-afc1740dd0afc954-001.md) `2026-10-18-planning-afc1740dd0afc954-001`, which returned aligned-with-findings with no hold; the WO-003 carry-in it names (cite the dispatch capture as the grant's authority; record the absence of the ignored local grant file) is discharged by D009.

Reviewer: Claude Code 2.1.302, model `claude-fable-5-1`, effort `max`
read from `CLAUDE_EFFORT` (selected, not effective), dispatched by the
operator's `resume: final review` on 2026-10-18 in the `wo-003` worktree.
The order recommends reviewer effort `xhigh`; this report records the
session's actual selection. No worker was spawned.

**Actor attestation:** {"harness":"claude-code","harnessVersion":"2.1.302","model":"claude-fable-5-1","effort":"max","source":"claude-session-readback"}
**Process cost:** entry 196,805 tokens; handoff 9,202,111 tokens; source claude-transcript-message-usage

Usage scope: `dispatch`. Entry cutoff 2026-10-18T04:23:53.638Z, read after
the skill loaded and canonical status was taken; handoff cutoff
2026-10-18T05:03:59.464Z, read before this report was filed. Both are cumulative
counters, mostly cached input, not unique context size; cost in dollars is
unavailable. Fan-out plan: zero of the 20-agent `subagentCap`; the readback
observed zero, exact-observed, and no named claim needed a worker I could
not run myself. Final counters after filing stay in the ignored receipt and
the session response. Cost against the equivalent outcome: the product
review gate costs under a second in this instance, which selects only
`kit-verify` and `harness`, and the executor's and repair's `npm test` rows
at the unchanged code identity still stand; the document gate is the one
cost that grew, because it runs twice (before and after the reports) and
its first run here waited about 26 minutes for a host lane before its five seconds of tasks.

## Method and limits

The operator's phrase selected WO-003 in `final-review`; the session hook
recorded the dispatch once and allocated this report, and its briefing
printed the usage command and the cost-line rule. Read: the order and its
cited sections of the execution guide (where the control plane finds its
documents, workflow closeout and releases, preflight before the full gate,
verification review and attack, model-specific notes, operator recovery
controls), the repository convention and the `dotln-angular` profile,
WS-001, the operator record, the publication contract (PRs and commits;
the release-note edition), the whole diff listed under Subject, VER-001 and
VER-002, decisions D001 to D013, the handoff, the evidence README, the
control segment's eleven events, the three cited source modules
(`config.mjs`, `authority-grants.mjs`, `outward-lint.mjs`), the worktree,
publish, result-transition, findings-block and cost-line implementations,
and the reader profile of each publication surface (balanced default; no
profile file declared).

Lenses: correctness of the registration against the six criteria;
authority and private data for the grant, the capture-bound waivers and the
ignored records; operator flow through the integration, release and
publication route; and what a maintainer reading the registration in six
months will misread. Traps named before the material choices: anchoring on
VER-002's pass, met by reproducing every criterion's command and the
authority boundaries in my own bounded probe; re-litigating the two waived
criteria, which the recorded off-ramp forbids (a waiver whose capture hash
matches is judged from the record and never put back to the operator);
disposing WO-003's own follow-up rows because the integration advisory
listed them, refused because none of their conditions has occurred; and
editing a verified record or a kit file to make a check pass, refused. The
NoOp, a report without integration and publication, would have left the
operator's merge waiting on nothing.

Reproduction ran under `node scripts/harness.mjs bounded --`, one process
at a time, outside any gate, with the probe source `wo003-final-probe.mjs`
in the DotLn session scratch:

- Thirty assertions held in 0.36 s: criterion 1's exact summary; the empty
  class; the eight allowed and two denied effects, one writer, the 2100
  expiry and `AuthorityRevoked`; six argv beginning `env NX_DAEMON=false`
  with the Design's timeouts; criterion 2's exact projection and equal
  `effects` and `operations`; `authorizeRegisteredPublication` accepting the
  real grant at the current clock and refusing an empty registry, a
  `host-policy` origin, another repository, missing operations, an expired
  profile (`repo.push: authority expired`) and an explicit push denial
  (`repo.push: effect denied`), none of which reaches transport; five
  in-memory malformed configurations refused by name (a review selection
  omitting a plain command, an undeclared class, an escaping documentation
  root, a zero timeout, an unknown repository key); the three step-3 lint
  calls with their exit codes; `launchpad` refused as a term, `DotLn`
  accepted, an unknown type refused as `subject.type`, and the two-word
  term `resume phrase` caught in a body; eleven types and six terms; the
  profile a regular file and not a symlink; and `git ls-tree main --
  dotln.config.json` empty, the cause of criterion 4's refusal.
- `npm run resume -- status --json`: exit 0. `npm run work-orders -- index
  --check`: PASS for both pages. `npm run terms -- check` over the three
  code files and the five record files: `local-terms list: present`, no
  match. `test -f docs/repositories/dotln-angular.md`: ok.
- The capture named by D011 and by both waivers hashes to
  `d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03`,
  matching the two `CriterionWaived` events (ordinals 4 and 5, recorded by
  the verifier session with its own attestation), so the waivers are judged
  from the record. The planning capture (SHA-256 `4f14c6c0…`) lives in the
  original checkout's intake, not this worktree's; the executor reproduced
  its digest there (D009), and this review takes the digest from the order,
  the planning document and the grant's reason.

Limits: no target argv was executed, by the order's own non-goal; the gate
declarations are judged by the validator and the profile's commands table,
and WO-004's first gate run is where a wrong argv surfaces. The executor's
two worker reports remain unavailable as files, as both verifications
recorded; their dispositions are in the handoff. I did not rerun the
state-changing clone command: VER-001 reproduced its refusal, and its cause
is a property of `main` that this review observed directly. The lint's
private local-terms coverage is observed only as `present`; no term was
printed. The kit's loader, authority machinery, lint and gates are both the
consumers of this registration and the instruments that judged it; my
assertions and the actual CLI outputs are independent observations of the
subject, not a certification of the machinery.

## Criterion judgments

**Criterion 1:** met. Expected: the loader prints the exact registration summary and canonical status exits 0. Observed: `main .. angular-nx-monorepo docs/dotln docs/repositories/dotln-angular.md install,lint,test,format install,lint,test,format,build,e2e`, reproduced by my probe through `loadConfig`; `npm run resume --silent -- status --json` exited 0 and selected WO-003 in `final-review`. Evidence: evidence README § Step 1, VER-002, the probe. Severity: none. The expiry (D001), the envelope id `target-orders` (D010) and the uniform `env NX_DAEMON=false` argv (D002) are sound: the kernel and the publication path compare expiry with the wall clock, the compiled envelope takes the minimum of the base and the profile, and the composed id does not repeat the repository id.

**Criterion 2:** met. Expected: exactly one grant, `["operator","dotln-angular","pr.open,pr.thread.resolve,repo.push"]`. Observed: exactly that projection; `operations` equals `effects`; the optional ignored `docs/control/local/authority-grants.json` is absent in this worktree, so no host-policy grant joins the count (D009). The grant's `reason` names the captured direction by its digest, SHA-256 4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa, and states what stays with the operator. Evidence: README § Step 2; the probe's seven authorization cases. Severity: none.

**Criterion 3:** met. Expected: the vocabulary exists and the three lint commands print `pass`, `refused` naming `subject.shape`, and `pass`, recorded in the README. Observed: exit 0 with every check `pass`; exit 1 with the single finding `subject.shape` at column 1; exit 0; the README records the complete JSON of each, and the worktree's ignored local-terms list was registered first (D003) so `localTerms` reports `pass`. Evidence: README § Step 3; the probe. Severity: none.

**Criterion 4:** unmet, waived by 4. Expected: the README records `Recorded local clone for dotln-angular.` and an unchanged Git status. Observed: the README records the refusal `error: unknown repository id "dotln-angular"` (exit 1) and an unchanged status, because `worktree clone` records into the main-branch worktree and validates the id against `main`'s configuration, which carries no `dotln.config.json` until this order merges (D004; my probe confirmed the empty `git ls-tree`). The recorder's acceptance of this registration and clone path was proved against this worktree's own configuration. The criterion is waived from the captured direction (ordinal 4); the release-close session performs the step from the main checkout once it holds the merge (`FUP-1eec5d4255b0162c`), with WO-004's `worktree start` as the fallback. Not relabeled as a pass.

**Criterion 5:** met. Expected: the profile is the regular file the registration names, and the index check passes with WO-003 active or closed and WO-004 carrying its `Repository:` pair. Observed: a contained regular file, not a symlink, at the path criterion 1 printed; `npm run work-orders -- index --check` PASS for README and HISTORY; WO-003 is shown in `final-review` with target v0.2.0 and WO-004 with `dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4`. Evidence: README § Steps 6 and 7; my run after the integration. Severity: none.

**Criterion 6:** unmet, waived by 5. Expected: `npm test` and `npm run test:docs` pass at the final identity and the four Preflight suites passed before the full run. Observed: both gates pass at code identity `cecf3d63…` (the executor's and repair's rows, the review gate and the document gate below), but the Preflight clause does not hold: `outward-lint` is core-only and refused by name (D005), and `authority-grants` fails its fifth subtest, which asserts the committed registry is empty, the negation of this order's grant (D008); `configuration-root` and `target-worktree` passed. The criterion is waived from the same capture (ordinal 5); the two suites are boarded upstream and for planning (`FUP-29f02563e4477b69`, `FUP-46062529c4c46ac3`). Not relabeled as a pass.

## Implementation review

The registration is the smallest faithful representation of the Design:
one class with nothing to share, one repository with every field the
Design lists, one grant with exactly the three effects the publication path
requires, and a vocabulary whose one judgment call (that `DotLn` names the
product and is not an internal term) is recorded in the planning document
and verified by the lint. Where the Design left a value open, the executor
chose and recorded: the envelope id (D010), the uniform daemon prefix on
`npm ci` (D002), and the far expiry kept because the kernel does compare
with the wall clock (D001; the Design's premise that no wall-clock check
existed was wrong, and the chosen value is right regardless). Authority
stays narrow: the profile denies `package.publish` and `release.close`, the
grant never names `main`, and the compiled envelope can only narrow the
base.

D007 (release preparation rewrote the README's generated version line
although the order's non-goals name the README release claim) is defensible
and I accept it: the claim's name is untouched, `release.displayName` stays
undeclared, the version line is the kit's own write that every versioned
self order makes, and the document gate's surface check would fail without
it. The operator declined to rule on it (D011) and the criteria adversary
judged it defensible; nothing in the subject depends on a different reading.

Maintainability: the configuration is self-describing and validated
positively, so a maintainer who adds a command or a field gets a refusal
naming the path. The profile document carries the same commands table, so
the two can drift; WO-004 is the order that refreshes the profile's
`Checked` line and table against the scaffolded commit. The grant's
`reason` is long but says exactly what the authority is for and what it is
not. The one record a maintainer will need and not find is the two worker
reports, which exist only as dispositions in the handoff.

Private data: the grant and the decisions name captures by digest only; the
local-terms list was copied, compared and never printed (D003); no
hostname, credential or home path is committed (`$HOME` stands for the home
directory in records).

## Integration and release surfaces

`npm run worktree -- integrate WO-003 --intake-backup <archive>` found
`main` and `wo-003` at the same commit
`2b515fa981f0b889a22843133c68914f86ed2cea`, so the merge changed nothing;
checkpoint `refs/dotln/checkpoint/WO-003/12` and the named stash
`c42cb20b7ceb20458670615ccd63965ac2bb427f` are retained, and the seventeen
working-tree entries were restored intact. The intake backup had to be
written into the DotLn session scratch: the script's default destination is
the repository's parent directory, outside the reviewer's outside-write
grants. Every regenerate step completed (runtime, harness bundle and
manifest, control projection, release preparation, decision stub, meta,
work-order index) with no pending step: the v0.83.0 starter already on
`main` verifies the carried kit instead of building it and selects the
publication-locks step only where an edition page is declared, which is
what WO-001-D013 asked for; and the reader profile command now prints the
balanced default when no profile file is declared, which is what
WO-001-D015 asked for. Both rows (`FUP-4f19a91d71d95bc9`,
`FUP-2a5dc809710f399e`) are disposed as settled in the register with that
evidence; the four WO-003 rows the advisory only matched by text stay as
filed. The integration record is completed in
[WO-003-D014](../../evidence/WO-003/decisions.md#wo-003-d014-complete-the-integration-record-main-and-wo-003-were-the-same-commit-and-two-wo-001-follow-ups-are-settled-by-the-v0830-starter).

Release surfaces: the order's heading and the README block carry `v0.2.0`
from the executor's release preparation (D006, D007); `npm run release --
prepare --local` during the integration reported `WO-003 target v0.2.0
remains current` and refreshed the meter snapshot and the meter block in
`PR.md`. `npm run release -- check-surfaces --local`: every rule passed:
the release block at v0.2.0 above the local tag v0.1.0; five component
versions, with `@dotln/skeleton` at 0.59.1 against v0.1.0's 0.59.0 as the
check requires for changed sources, a bump the v0.83.0 starter update
brought to `main` and not this order; six workspace pins;
the GitHub body profile of `PR.md`; the license surfaces; `docs/LEGAL.md`
pins unavailable because this instance declares no such file. `npm run
publication:check`: no editions declared. `node scripts/harness.mjs check`:
34 generated surfaces; local-terms list present.

## Findings

No finding. Nothing in the verified subject is defective inside
verification's instructed scope, the integration raised no conflict and no
new defect, and the release surfaces pass. The two unmet criteria are
waived limitations of the kit's sequencing and core-state assertions,
recorded in D004, D005 and D008 with their follow-ups, not defects of the
registration. Two operator-flow observations are recorded for the kit
without a finding, because neither broke anything and neither was
reproduced as a refusal: the intake backup's default destination lies
outside a role's write grants, and `plan followups --apply` needs its
request file inside the repository, so a reviewer writes it under the
ignored control-local directory and removes it afterwards.

<!-- dotln-findings:start -->
[]
<!-- dotln-findings:end -->

## Executed checks and product gate

- `npm run format`: applied; no file changed.
- `npm run test:docs`: 17 passed, 0 failed; the seventeen tasks took about five seconds of work, but the run took 1582.65 s of wall clock, recorded 2026-10-18T05:02:29.031Z, because the scheduler waited for a host lane before the first task with no other gate running, which WO-001's final review also observed; recorded as an observation for the kit, not a finding. Advisories: the pre-existing WO-003-D003 and WO-001 FINAL-001 operator-word advisories, and one on a VER-002 paragraph, a filed report this review does not edit. A further run after this report, the PR body and the release notes were written passed 17 of 17 again in 5.33 s with no lane wait, recorded 2026-10-18T05:05:55.505Z; the two advisories that run would have raised on this report and the release notes were resolved first (a capture digest added where the rule asks for one; a sentence split), so only the three pre-existing advisories remain.
- `npm test -- --review`: 2 passed, 0 failed, 0.55 s (`kit-verify` 0.10 s, 928 files verified at `7b8206f4b97d290473e4e619271521f496ce56aa`; `harness` 0.20 s), a fresh run recorded 2026-10-18T05:02:30.049Z at code identity
  `cecf3d631e7e6aff515368e6b2ec1f9f5c68420edd6ae6ea372eabcb56492463`
  (`kit-verify` and `harness`, the only suites this instance's review
  selection carries, since no machinery suite source changed). The
  executor's and the repair's `npm test` rows at the same identity still
  stand: `coveringGateCheck` found two candidates and none displaced.
- `git diff --check`: clean, including the untracked records.
- `node scripts/harness.mjs check`, `npm run release -- check-surfaces
  --local`, `npm run publication:check`, `npm run work-orders -- index
  --check` and `npm run terms -- check`: as recorded above.
- Background monitors: none started; no agent launched.

The outcome matched the operator's direction: the registration passes every
criterion that is not waived, the two waivers are judged from their
capture, the integration and release surfaces are prepared, the release
notes are written, and the `wo-003` branch alone is published after this
result is recorded. This report's evidence and usage have the cutoffs
above; later completion receipts do not revise these bytes.
