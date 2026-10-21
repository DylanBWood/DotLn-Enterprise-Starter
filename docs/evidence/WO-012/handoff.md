# WO-012 executor handoff

Dispatch: `resume: next`, 2026-10-21 UTC. Harness: `codex-cli`;
harness version: `0.163.0`; model: `gpt-6-astra`; effort: `max`;
source: `codex-session-readback`. Canonical status supplied these values
at 03:03:12 UTC. The worktree remains on `wo-012` without branch commits.

The outcome matches the order's goal: this instance declares the target
release name `DotLn Angular`, permits and grants `release.close`, preserves
judged base-checkout output and declares the operator's public commit author.
The profile and WS-001 describe the resulting policy. Release preparation
assigned Launchpad `v0.3.3` above the local `v0.3.2` baseline after the
operator-approved title correction; no kit or component version changed.

## Acceptance criteria

**Criterion 1:** met — [command-output.json](command-output.json) records the
exact configuration and grant readbacks, equality of the declared author
with the non-merge author on `main`, and the deep comparison admitting only
the five named changes. The unchanged composed disposable list has eleven
roots; historical orders load as `[]`. The real registry and authorization
functions admit release close and the three existing publication effects
using the committed operator grant.

**Criterion 2:** met — the manifest readback and `launchpad verify` both
name 977 files at `a54f8d6520ed54d05e5209455c67541562716404`;
`harness check` exits 0 for 34 generated surfaces. The complete gate also
passes `kit-verify` and the generated-artifact check. See
[command-output.json](command-output.json), [sync-output.txt](sync-output.txt)
and [complete-gate.txt](complete-gate.txt).

**Criterion 3:** met — the work-order index check passes both pages, the
historical status count is zero and the history section is `None.`.
[command-output-extra.json](command-output-extra.json) retains those outputs.

**Criterion 4:** met — the profile counts are one release-close heading,
three release-name lines, three judge-only lines, two node-helper lines and
two collision lines. Both superseded phrases count zero, including a
line-joined check. WS-001 has six order references, one evidence-path line
and exactly one delivery row. [command-output.json](command-output.json)
retains the counts. The reviewed profile also rejects malformed duplicate
release classifications; [classification-probe.json](classification-probe.json)
executes and confirms its two-count check.

**Criterion 5:** met — [scope-probe.json](scope-probe.json) asserts the working
diff against `main` plus non-ignored untracked files contains only the allowed
paths. `git diff --check` passes. Later evidence attachments stay under this
order's `docs/evidence/` directory. The executor rule forbids branch commits,
so final review must repeat the literal `main...HEAD` comparison after it
commits the candidate; an empty committed diff is not offered as proof of
this uncommitted change. [WO-012-D005](decisions.md#wo-012-d005).

**Criterion 6:** met — the complete `npm test -- --review` passed seven
fresh tasks, zero failed, in 13.82 seconds at code identity
`d3d72e3eeedf9036af51dcca8f8bf551804d226a219e7cb248304a825e600f2e`.
The captured `npm run test:docs` passed fourteen fresh tasks, zero failed,
in 15.35 seconds at the same code identity; [document-gate.txt](document-gate.txt)
retains its stdout. After attaching that output and finishing this handoff,
the required final document validation supplies the current-tree row that
completion consumes. The current guide's complete-run rule covers the six
structural checks and `kit-verify` together; no focused preflight was repeated. See
[gate-summary.json](gate-summary.json) and [WO-012-D005](decisions.md#wo-012-d005).

## Review and recorded limits

self-review: found 3; fixed 2; recorded 1

The [two worker reports](self-review.md) record criteria adversary 1/1/0 and
design improver 0/0/0 (found/fixed/recorded). Root output review adds 2/1/1.
Both workers were fresh read-only `gpt-6.1-sol` workers at requested effort
`max`, with no descendants; two workers were used against cap 20. Their
effective settings were not independently observed.

The kit parser accepts a valid release-classification header paired with a
malformed duplicate. This order fixes the profile precheck and records the
kit repair as deferred `FUP-2232a29f1061494f`, with reproduction, proposed fix
and checks in [WO-012-D008](decisions.md#wo-012-d008). Editing the kit is an
explicit non-goal. The branch-policy contradiction was corrected in the
same profile and reread by both workers (WO-012-D007).

The operator had already activated this worktree. The pre-activation gate
on `main` and activation advisory count are unobserved; source guards and
canonical active status were checked at entry. No activation was repeated.
Final review owns the first branch-commit sign-off observation and the
publish helper's `PASS contribution-signoff` lines. WO-006 owns the future
live target and host-admission observation. This order makes neither claim.

Current authored outputs were read; generated indexes, release surfaces
and the installed harness were checked through their generators. The final
document validation must run after the last edit and completion must consume
its current row. No background monitor is left running at completion.

## Usage and handoff boundary

Entry usage was 37,278 total tokens, source `codex-transcript-counter`, scope
`dispatch`, cutoff `2026-10-21T02:52:45.617Z`; cost was unavailable. The
handoff usage readout and final counters belong in the ignored receipt and
session response, as the executor rule requires. Two review workers were
explicitly launched; unobserved accounting is not inferred.

This handoff leaves independent verification and final review to their
separate dispatches. No branch publication, merge, target episode or release
publication occurred in this executor session.
