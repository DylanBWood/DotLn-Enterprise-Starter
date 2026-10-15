# WO-001 — FINAL-001

**Verdict:** pass.
**Date:** 2026-10-15.
**Work order:** [WO-001](../../work-orders/WO-001-environment-truth.md).
**Verification sequence:** [VER-001](../../verifications/WO-001/VER-001.md) (pass), the only verification; no repair followed it.
**Subject:** the full `wo-001` diff against `main` at `2ed8447`: [environment.md](../../discovery/environment.md), [environment.json](../../discovery/environment.json), the order's evidence scripts and link inventory, [decisions](../../evidence/WO-001/decisions.md) D001 to D015, the executor [handoff](../../evidence/WO-001/handoff.md), the verifier's [probe record](../../evidence/WO-001/verification-probes.json) and [probe script](../../evidence/WO-001/verification-probes.mjs), the control segment and projection, the work-order and decisions indexes, and the follow-up register.
**Publication:** [PR.md](PR.md) and [RELEASE-NOTES.md](RELEASE-NOTES.md) beside this report.

Reviewer: Claude Code 2.1.300, model `claude-fable-5-1`, effort `max`
read from `CLAUDE_EFFORT` (selected, not effective), dispatched by the
operator's `resume: final review` on 2026-10-15 in the `wo-001` worktree.
The order permits any reviewer effort; this report records the session's
actual selection.

**Actor attestation:** {"harness":"claude-code","harnessVersion":"2.1.300","model":"claude-fable-5-1","effort":"max","source":"claude-session-readback"}
**Process cost:** entry 579,216 tokens; handoff 4,727,036 tokens; source claude-transcript-message-usage

Usage scope: `dispatch`. Entry cutoff 2026-10-15T14:24:08.865Z, the first
readable counter: the readback at the session's true entry was refused for
want of an active role, because the operator's first message carried the
phrase inside a longer pasted prompt and the role bound only when the bare
phrase was typed
([WO-001-D014](../../evidence/WO-001/decisions.md#wo-001-d014-record-the-dispatch-gap-met-when-the-phrase-arrived-with-the-operators-direction)).
Handoff cutoff 2026-10-15T14:41:35.307Z. Cost in dollars is unavailable. No
subagent was launched: the readback observed zero of cap 20, exact-observed,
with the unobserved remainder unknown. Final counters remain in the ignored
receipts and the session response.

## Method and limits

The operator's phrase selected WO-001 in `verified`; the dispatch was
recorded once (the briefing had reported none) and allocated this report.
The operator's message also carried an explicit scope expansion, recorded
as [WO-001-D012](../../evidence/WO-001/decisions.md#wo-001-d012-record-the-operators-scope-expansion-for-release-preparation-and-publication-from-wo-001):
release preparation on `wo-001`, the release lines only if the starter update
had left any absent, the release notes a self order requires, and publication
of `wo-001` alone; `npm run plan -- amend-order` was not run on the operator's
direction, and the expansion changes no byte of the order's text.

I read the order, the whole diff listed under Subject, VER-001 with its
probe record, decisions D001 to D011, the handoff, the control segment's four
events, the publication contract (PRs and commits; release-note edition) and
the execution guide's sections on verification review and workflow closeout.
Lenses: correctness of the records against the five criteria; authority and
private data; operator flow through the recovery and publication route; and
what a maintainer reading a dated snapshot will misread in six months.

Traps named before the material choices: anchoring on VER-001's pass, met by
reproducing the consequential claims myself; treating kit gaps met during
integration as blocking, which the rule forbids when no criterion and no
behavior `main` had is broken; editing kit files or the verified records to
make a dated probe pass again, refused; and running `amend-order` against the
operator's direction, not done. The NoOp, a report without publication, would
have failed the operator's explicit direction. Fan-out plan: zero of the 20
subagent cap; no named claim needed a worker I could not run myself.

Reproduction ran under `node scripts/harness.mjs bounded --`, one process at a
time, outside any gate:

- `node docs/evidence/WO-001/check-attestation.mjs`: the Codex and Copilot
  pairs parse with no advisory and the control version prints one, as filed;
  the Claude case refuses in this session because the script attests the
  running session's `CLAUDE_EFFORT` with the readback source and this session
  selects `max` where the executor's selected `xhigh`, which its header
  comment anticipates.
- `npm run terms -- check` over all nineteen added or changed paths plus the
  order: `local-terms list: present`, no match.
- `verification-probes.mjs records`: 66 classifications against the eight
  labels, 8 checklist groups, 4 audit groups; the three recorded pairs accepted
  with zero advisories; the unobserved-version and unobserved-effort controls
  one advisory each; duplicate and missing flags refused. `terms-controls` and
  `behavior` reproduce VER-001 exactly.
- `verification-probes.mjs installed`: fails its version assertion because
  the installed Claude Code is 2.1.300 on 2026-10-15 while the dated record
  observed 2.1.299; `parseActor` accepts a 2.1.300 attestation on the
  recorded 2.1 version line without advisory. `followups`: fails at
  `scripts/test-host-guard.test.mjs`, which the v0.82.0 export no longer
  ships; the mode also asserts the `main` activation branch of 2026-10-14.
  Both are evidence drift against a dated record, not defects of it.
- `node docs/evidence/WO-001/execution-guide-links.mjs` at v0.82.0 prints
  57 distinct targets, 50 missing, 0 missing and unlisted; the filed inventory
  stays the v0.81.0 record (57; 51; 46) that D006 cites.

Limits: the dated snapshot drifts from the live install, as above; VER-001's
limit that the executor's two worker reports are unavailable carries forward;
the live harness smoke stays untested; the reader profile command cannot
print guidance in this instance, so the publication surfaces follow the
balanced default
([WO-001-D015](../../evidence/WO-001/decisions.md#wo-001-d015-write-the-publication-surfaces-under-the-default-balanced-profile)).
Two record corrections were made in this review: the `dispatch` lines of D011
and D012 were shortened to the control-prefix grammar the document gate
enforces (a prefix and at most 240 characters of paraphrase); each record's
prose and evidence still carry the full direction, and nothing else in them
changed. The integration draft D013 was completed as the procedure requires.

## Criterion judgments

**Criterion 1:** met. Expected: every checklist item labeled, each unknown with
its reason. Observed: the classification summary and section tables label all
eight checklist groups and every facet of item 2 for each harness; the
`records` probe found every `classification` within the declared eight labels
and every untested, not-found, ambiguous or blocked entry carrying a reason.
Manual reading of the page agrees with the JSON on every consequential value.
Evidence: `environment.md` sections 1 to 5 and its summary; `environment.json`
`checklist`; the `records` observation. Severity: none.

**Criterion 2:** met. Expected: observed versions and the declared effort
selector shapes per harness, and no discovery advisory for an attestation of
an observed version and effort. Observed: `effortReadbackProbe.harnesses`
carries `versions[].classification/value`, `sessionEffortSelector` with
`values`, `persistedEffortSelector` with `value`, and a `selectedSessionReadback`
or `effortReadbackNote` for each harness; the `records` probe accepted the
three recorded pairs with zero advisories; the executor's own
`implementation-ready` attestation stands in the control segment, which the
evidence gate reads. Evidence: `environment.json`, the `records` observation
and `npm run resume -- status --json`. Severity: none. Limit: the live
install moved to 2.1.300 after the record; the parser accepts it on the
recorded version line.

**Criterion 3:** met. Expected: the registration step records the printed
status, with any match refused and fixed. Observed: the record states the
list existed with nine terms, ignored by Git, and that the check printed
`local-terms list: present` over the named documents and over every file the
order adds or changes, with no match; this session registered the worktree's
own list from the main checkout's (same digest, contents never printed) and
reproduced `present` over all changed paths. Evidence: `environment.md`
section 4, `environment.json` `localTerms`, this review's bounded run.
Severity: none.

**Criterion 4:** met. Expected: the harness smoke observed with its output, or
blocked with its missing input. Observed: `node scripts/harness.mjs check`
recorded with `harness check: 34 generated surfaces; local-terms list:
present` and exit 0, bounded and unbounded; reproduced by this review with the
same output after the starter update. The live smoke is untested with its
reason (D003). Evidence: `environment.md` section 3, `environment.json`
`harnessSmoke`. Severity: none.

**Criterion 5:** met. Expected: each audit question answered or labeled
unknown, naming no host, gateway, vendor policy or internal service. Observed:
four audit sections and four machine-readable groups cover intermediary and
provider behavior, foreground versus delegated metering, interruption recovery
and managed-settings precedence; the `records` probe's scan of the audit
section found no URL or hostname; manual reading found generic descriptions
and reasons on every unknown. Evidence: `environment.md` section 5,
`environment.json` `auditQuestions`. Severity: none.

## Implementation review

The paired human and machine records agree on every consequential claim I
checked: harness versions, selector controls and value lists, persisted
effort, readback channels, the three smoke results, the harness-check output
and the local-terms status. Provenance is explicit about which rows `discover`
wrote and which were hand-recorded, and D005 says why. The evidence scripts
are small, reproducible from the repository root, and each states its
assumptions in a header; the one session-dependent script (the attestation
check) says so. Private data stays out: environment variables are named only,
with the non-secret `CLAUDE_EFFORT` level as the one recorded exception D009
justifies; home paths are written `~` and `<repo>`; settings are reduced to
switches and counts; the local terms were screened over every file.

Maintainability: the record is a dated snapshot, and the install has already
moved by one patch. The record says when it was taken and the parser reads
the version line, so a reader is not misled; a later order that reruns
`discover` replaces the hand-recorded rows, which D005's reopen condition and
the settled follow-up already name. The verifier's probe script encodes two
facts of 2026-10-14 (a shipped test file and the `main` branch) that the
v0.82.0 starter changed; it remains the immutable evidence of VER-001 and is
not edited.

## Integration and release surfaces

`npm run worktree -- integrate WO-001` found `main` and `wo-001` at the same
commit, `2ed844790d3b5a660612f257646a51a1f380553e`, so the merge changed
nothing; the checkpoint `refs/dotln/checkpoint/WO-001/6` and the named stash
`b753993a73e6718bd265b91dabd9d5b0b3f80c26` are retained, and the nineteen
working-tree entries were restored intact. Its regenerate step left two
pending lines, `runtime: npm run build --silent: ENOENT tsconfig.json` and
`publication locks: missing lock for docs/publication/everyday-ai-user-toc.md`,
which `--continue` can never clear in an export that carries compiled runtime
without package sources and declares no edition page; that is finding F1,
boarded in
[WO-001-D013](../../evidence/WO-001/decisions.md#wo-001-d013-complete-the-integration-record-after-the-starter-update).

Carried-forward claims judged against the integrated base: the v0.82.0
starter satisfied the conditions of D004 (the test file is no longer
exported), D005 (`discover` now probes `--reasoning-effort` and records the
Codex config selector), D006 (the link inventory resolves or is listed) and
D007 (the README starts WO-001 in `wo-001` and routes a `main` activation
there). Their follow-up rows are disposed as settled in the register with
that evidence; D001 to D003 and D008 to D010 stand unchanged. The starter
update on `main` is base, not WO-001's change: `git log main..wo-001` is
empty and the branch adds records under `docs/` only.

Release surfaces: the order's heading already carries `(v0.1.0)` and
`Release classification: minor`, and the README's release block holds the
single generated claim line, all from the starter update, so no line was
added. `npm run release -- prepare --local` on `wo-001`: `WO-001 target v0.1.0
remains current`, writing only the meter block into `PR.md` (the meter
snapshot is not written because the executor's session journal lives in the
original checkout). `npm run release -- check-surfaces --local`: every rule
passed (release block, five component versions with no previous release, six
workspace pins, GitHub body profile, license surfaces); `docs/LEGAL.md` pins
are unavailable because this instance declares no such file. `node
scripts/harness.mjs check`: 34 generated surfaces, local-terms list present.
`npm run publication:check`: no editions declared.

## Findings

Classes follow the execution guide: F1 and F3 arose from integrating `main`
and preparing the release, so they are `integration`; F2 arose from the
dispatch channel at session start, outside verification's scope and outside
release preparation, so it is `new-scope`. None is an escape: nothing in the
verified subject is defective, and no criterion is unmet. Each is boarded
with a named follow-up in the decision cited and carries a register row.

<!-- dotln-findings:start -->
[
  {"id": "F1", "route": "follow-up", "class": "integration", "summary": "worktree integrate's regenerate step cannot complete in a launchpad: it runs npm run build without a tsconfig.json and demands publication locks for undeclared edition pages (WO-001-D013, FUP-4f19a91d71d95bc9)"},
  {"id": "F2", "route": "follow-up", "class": "new-scope", "summary": "A resume phrase that leads a longer operator prompt records no dispatch, and a CLI dispatch binds no session role, so usage, scratch grants and output reads stay unobserved until a bare phrase is typed (WO-001-D014, FUP-a36dae4a6766b9ef)"},
  {"id": "F3", "route": "follow-up", "class": "integration", "summary": "npm run reader -- profile and the release-prepare guidance fail with ENOENT instead of printing the balanced default when docs/control/reader-profiles.json is absent (WO-001-D015, FUP-2a5dc809710f399e)"}
]
<!-- dotln-findings:end -->

## Executed checks and product gate

- `npm run format`: applied; the document gate's format task passes.
- `npm run test:docs`: 19 passed, 0 failed, 14.89 s, recorded
  2026-10-15T14:33:13.785Z, after the D011 and D012 dispatch corrections and
  a meta refresh; the earlier runs failed on those two dispatch lines and on
  the stale decisions index they left.
  A further run after this report, the PR body and the release notes were
  written passed 19 of 19 again, recorded 2026-10-15T14:59:38.350Z; its
  tasks took 15 s, but the scheduler waited 830 s for a host lane before the
  first task with no other gate running, which is recorded as an observation
  for the kit, not as a finding.
- `npm test -- --review`: 16 passed, 0 failed, 448.19 s, recorded
  2026-10-15T14:40:51.713Z at code identity
  `c414a0ecdb08709caf8a8f9fac278af037360d897cc6ccbcedce492572c659e2`
  (kit-verify, format, backup-intake, publication-fixtures,
  beacon-portability, release-preparation, checkpoint, adjacent-queue,
  siblings-fixtures, derived-orders, codex-continuation, authority-grants,
  registrations, work-orders-fixtures, portfolio, target-worktree; the
  core-only suites are listed as not carried). The executor's row at the
  v0.81.0 identity no longer covered this tree, so the gate ran fresh; the
  `target-worktree` suite took 444 s of the total.
- `git diff --check`: clean, including the untracked records.
- `node scripts/harness.mjs check`, `npm run release -- check-surfaces
  --local` and `npm run publication:check`: as recorded above.

The outcome matched the operator's direction: the records pass every
criterion, the integration and release surfaces are prepared, the release
notes are written, and the `wo-001` branch alone is published after this
result is recorded. This report's evidence and usage have the cutoffs above;
later completion receipts do not revise these bytes.
