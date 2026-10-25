# WO-013 host observations

Executor: Codex CLI 0.164.0, `gpt-6-astra`, selected effort `max`, source
`codex-session-readback`, 2026-10-24. The canonical `resume next` dispatch
reserved this session's writer. One writable agent operates the launchpad and
its registered target worktree; the two review workers were read-only.

Source edits and bounded probes ran under the host's existing permissions.
Codex tool calls have no project hook enforcement here; no Claude hook
admission or host-prompt qualification is claimed. No account, tool or repository
settings were changed. The existing Angular/Nx dependency versions were retained.

The stale target base was recovered with a clean fast-forward to the already
merged predecessor, as [WO-013-D001](decisions.md#wo-013-d001) records. No
activation, checkpoint or registry history was rewritten, and no commit was
created by the executor.

Draft publication belongs to the verifier after its independent pass; final
publication belongs to final review. This executor made no publication attempt.
Those roles append their actual helper invocation and host outcome when run.

## Verified-phase draft publish (VER-001 session, 2026-10-24)

- Host: Claude Code 2.1.310 with auto mode on; model `claude-opus-5-5`,
  effort `xhigh` from `CLAUDE_EFFORT`. The publish ran after
  `verification-result pass` recorded VER-001 and status read `verified`.
- Helper command line as run, verbatim, from the launchpad root, with no
  pipe, redirect, directory change or variable prefix:
  `node scripts/worktree.mjs publish WO-013 --target-worktree --draft --branch feat/sub-app-menu --title "feat: add the sub-app menu and the scene and machinery routes" --body-file docs/evidence/WO-013/draft-pr-body.md`
- Before the run: this worktree's `dotln.config.json`,
  `docs/control/outward-vocabulary.json` and `scripts/worktree.mjs` were
  byte-identical to `main`, and main's checkout was clean. The reviewed body
  passed `node scripts/outward-lint.mjs pr-body --target` and the helper's
  GitHub body profile; the title and the branch passed their profiles.
- Journal: at 2026-10-24T17:27:36.944Z the hook recorded a
  `registeredTargetAdmission` row of kind `helper` for this order and
  `dotln-angular`, after two allowed effect rows at 17:27:36.573Z and
  17:27:36.634Z. The call ended in a `PostToolUseFailure` row at
  17:27:37.688Z, the helper's exit 1. No `PermissionDenied` row exists for
  this call.
- Host decision: allowed without a prompt. No one was asked, and no one
  answered.
- Helper outcome: refused before any push, "target publish refused: outward
  lint: pr-body refused: identifier.launchpad", with 26 findings on the
  composed body's Change-table rows at lines 146 to 162. Every one is the
  path of an earlier order's record under `docs/dotln/`. The helper computes
  the table from the activation's base `bc9133e9…`, the empty initial
  commit, so it lists 515 files instead of the change's 83.
  [WO-013-D008](decisions.md#wo-013-d008) records the cause, the safe
  default and the operator's route.
- Local state the helper left, as designed for a refused draft: the ref
  `refs/dotln/draft/WO-013` at `1e24c0884c2bafd7ad29b3f20b4368ff2be7b1a2`
  (parent `2ab4f285…`, tree `df45f1b3…`, the verified tree) and one
  `DraftPrepared` event in the launchpad's ignored publication store under
  main's checkout (counted, not printed). Target `HEAD` remains `2ab4f285…`, and
  the working tree still shows its 44 uncommitted paths. Neither was
  removed.
- Readback: a follow-up read-only check that included
  `git ls-remote origin refs/heads/feat/sub-app-menu` was denied by the
  auto-mode classifier. Its row is a `PermissionDenied` at
  2026-10-24T17:27:58.988Z, typed event `HostPermissionDenied`, rule
  `[Out-of-Place Publication]`. The session did not retry it or route around
  it; the local refs were read separately. That no branch reached the remote
  rests on the helper's order of operations (lint before push) and its
  refusal, not on a remote read.
- Interventions: none. The refusal was a lint refusal, not a host denial, so
  the operator's `!`-prefixed fallback does not apply and was not used.
  Status records no correction and no override for WO-013.
- Follow-up rows: `FUP-1508c6254455ccf3`, `FUP-2479f6d32b2396a8` and
  `FUP-98c85b750cb36bd4` reopen when a hook-admitted target publish is
  denied by the host classifier. This publish was admitted and allowed, so
  that condition did not occur. Only the separate readback was denied.
- No private journal contents are copied here: only row kinds, timestamps,
  the typed event, the rule name and the admission kind.

## Repair dispatch, 2026-10-24

Codex CLI 0.164.0, `gpt-6-astra`, selected effort `max`, with
`codex-session-readback`. The canonical fix dispatch reserved the launchpad
writer. One writable agent operated the launchpad and target; zero workers
were spawned. No host-prompt or Claude-hook qualification is claimed.

The operator expanded scope to integrate main. The canonical integration
helper advanced the launchpad to `a7a076247cd817cec0b3f57c5d1fc9f44668da0c`,
with no authored conflict and with its checkpoint and stash retained. The
target main remains `2ab4f28501628cf95dd0102c42440fd7de9f8055`, already HEAD.

The bounded publication probe fetched target main, composed the old prepared
draft against its fetched merge base and passed the normal outward lint and
body profile: 83 change rows and no earlier-order record rows. The activation
base stayed unchanged and is disclosed in the body. Six imported regression
cases also passed, using isolated fixture repositories; the fixture runner
cleans those repositories. [Repair gate results](repair-gates.json) record
the complete instance and target reviews.

No live publish helper was invoked in this repair. The verifier's following
dispatch owns draft publication after judging the repaired target tree. No
push, pull-request operation, target branch commit or account/tool-setting
change occurred. The local draft ref is preserved; the actual remote publish
outcome remains unobserved here.

## Verified-phase draft publish (VER-002 session, 2026-10-24)

- Host: Claude Code 2.1.310; model `claude-opus-5-5`, effort `xhigh` from
  `CLAUDE_EFFORT`. The publish ran after `verification-result pass`
  recorded [VER-002](../../verifications/WO-013/VER-002.md) and status read
  `verified`, with `final-review` the only legal next action.
- Helper command line as run, verbatim, from the launchpad root, with no
  pipe, redirect, directory change or variable prefix:
  `node scripts/worktree.mjs publish WO-013 --target-worktree --draft --branch feat/sub-app-menu --title "feat: add the sub-app menu and the scene and machinery routes" --body-file docs/evidence/WO-013/draft-pr-body.md`
- Before the run: this worktree's `dotln.config.json`,
  `docs/control/outward-vocabulary.json` and `scripts/worktree.mjs` were
  byte-identical to `main` at `a7a076247cd817cec0b3f57c5d1fc9f44668da0c`,
  and main's checkout was clean (0 porcelain lines). The reviewed body passed
  `node scripts/outward-lint.mjs pr-body --target`; the title and the branch
  passed their profiles.
- Journal: at 2026-10-24T23:09:29.274Z the hook recorded a
  `registeredTargetAdmission` row of kind `helper` for `dotln-angular`. The
  call's PostToolUse rows follow at 23:09:35Z. The session has no
  `PermissionDenied` row. Its single `PostToolUseFailure` row, at
  22:57:21Z, belongs to an earlier read command and not to this call.
- Host decision: allowed. No permission prompt surfaced in this session.
- Helper output: "Pushed draft feat/sub-app-menu at
  99a30befa150e5d77a64259013e62b9d0372270e and opened draft pull request #6
  on github.com/DylanBWood/DotLn-Angular; HEAD and the index are unchanged."
- Local readback: target `HEAD` remains
  `2ab4f28501628cf95dd0102c42440fd7de9f8055` on `wo-013`. The ref
  `refs/dotln/draft/WO-013` now points at `99a30bef…`, whose parent is
  `2ab4f285…` and whose tree is `dc997234bc57801c1909a76fa45f5524f3e3dfab`,
  the verified tree. `git diff --name-only 2ab4f285 99a30bef` lists 83 files.
  The working tree still shows its 44 uncommitted paths.
- Remote readback: `gh pr view 6 --repo DylanBWood/DotLn-Angular` was
  allowed. It reads number 6, `isDraft` true, state `OPEN`, head
  `feat/sub-app-menu` at `99a30bef…`, base `main`, created
  2026-10-24T23:09:34Z, at https://github.com/DylanBWood/DotLn-Angular/pull/6.
  The title reads ":sparkles: feat: add the sub-app menu and the scene and
  machinery routes". The helper's title had no gitmoji. The operator record
  names a repository workflow that adds it after a pull request opens, and
  this session did not observe that run itself. Threads and
  workflow runs were not read here; final review reads them into
  `preview-pr.json`.
- Interventions: none. No `--confirm-terms` was needed, and no host denial
  occurred, so the operator's `!`-prefixed fallback was not used.
- Outcome against the record: [WO-013-D010](decisions.md#wo-013-d010)'s
  reopening condition, a refused current-tree verification publish, did not
  occur. The blocker that [D008](decisions.md#wo-013-d008) and
  [D009](decisions.md#wo-013-d009) route is cleared for the draft. Final
  review reuses this branch and pull request. The register rows for D008
  and D009 stay pending for final review to dispose. `FUP-2479f6d32b2396a8`
  reopens when a hook-admitted target publish is denied by the host
  classifier. This publish was admitted and allowed, so that condition did
  not occur.
- No private journal contents are copied here: only row kinds, timestamps,
  the admission kind and the registration id.

## Verified-phase draft republish (VER-003 session, 2026-10-25)

- Host: Claude Code 2.1.310; model `claude-opus-5-5`, effort `xhigh` from
  `CLAUDE_EFFORT`. The publish ran after `verification-result pass`
  recorded [VER-003](../../verifications/WO-013/VER-003.md) and status read
  `verified`, with `final-review` the only legal next action.
- Helper command line as run, verbatim, from the launchpad root, with no
  pipe, redirect, directory change or variable prefix:
  `node scripts/worktree.mjs publish WO-013 --target-worktree --draft --branch feat/sub-app-menu --title "feat: add the sub-app menu and the scene and machinery routes" --body-file docs/evidence/WO-013/draft-pr-body.md`
- Before the run: this worktree's `dotln.config.json`,
  `docs/control/outward-vocabulary.json`, `scripts/worktree.mjs` and
  `scripts/lib/target-publish.mjs` were byte-identical to `main` at
  `04c45cfae32d337b367496f79f708d0913f1cb7f`, and main's checkout was clean
  (0 porcelain lines). The unchanged body passed
  `node scripts/outward-lint.mjs pr-body --target`; the title and the branch
  passed their profiles.
- Journal: at 2026-10-25T22:09:42.753Z the hook recorded a
  `registeredTargetAdmission` row of kind `helper` for `dotln-angular`. The
  call's PostToolUse rows follow at 22:09:46Z. The session has no
  `PermissionDenied` row.
- Host decision: allowed. No permission prompt surfaced in this session.
- Helper output: "Already published draft feat/sub-app-menu at
  99a30befa150e5d77a64259013e62b9d0372270e; refreshed the body of pull
  request #6 on github.com/DylanBWood/DotLn-Angular; HEAD and the index are
  unchanged."
- Local readback: target `HEAD` and `refs/dotln/draft/WO-013` both remain
  `99a30bef…`, tree `dc997234bc57801c1909a76fa45f5524f3e3dfab`, with 0
  porcelain lines. `git ls-remote origin` reads `feat/sub-app-menu` at
  `99a30bef…` and `main` at `2ab4f285…`, so nothing was pushed.
- Remote readback: `gh pr view 6 --repo DylanBWood/DotLn-Angular` reads
  number 6, `isDraft` true, state `OPEN`, head `feat/sub-app-menu` at
  `99a30bef…`, base `main`. The body refresh set the title to the helper's
  form, without the gitmoji. That edit started the repository's "Pull
  request title" run 40238888097, whose `title` job succeeded at
  2026-10-25T22:10:03Z, and the title reads again ":sparkles: feat: add the
  sub-app menu and the scene and machinery routes". No CI run was started,
  because the head did not move. The 2026-10-24 CI run 40141573159 at this
  head stands. Threads and comments were not read here; final review reads
  them into `preview-pr.json`.
- Interventions: none. No `--confirm-terms` was needed, and no host denial
  occurred.
- Outcome against the record: the republish the follow-ups of
  [D015](decisions.md#wo-013-d015) and [D017](decisions.md#wo-013-d017)
  assign to this verification ran at the same tree and reused the same
  commit and pull request. The register rows for D008, D009 and D015 stay
  pending for final review to dispose. `FUP-2479f6d32b2396a8`'s condition, a
  hook-admitted target publish denied by the host classifier, did not occur.
- No private journal contents are copied here: only row kinds, timestamps,
  the admission kind and the registration id.

## Final publish (FINAL-003 session, 2026-10-25)

- Host: Claude Code 2.1.310; model `claude-opus-5-5`, effort `xhigh` from
  `CLAUDE_EFFORT`. The publish ran after `final-review-result pass` recorded
  FINAL-003 and `target-records` added the records commit `61cf1ae9…` in the
  target, and after this worktree's records were committed (`f51d128`,
  `8f18110`), so the launchpad checkout was clean.
- Helper command line as run, verbatim, from the launchpad root, with no
  pipe, redirect, directory change or variable prefix:
  `node scripts/worktree.mjs publish WO-013 --target-worktree --branch feat/sub-app-menu --title ":sparkles: feat: add the sub-app menu and the scene and machinery routes" --body-file docs/final-reviews/WO-013/PR.md`
- Journal: at 2026-10-25T22:32:20.308Z the hook recorded a
  `registeredTargetAdmission` row of kind `helper` for `dotln-angular`. The
  call's PostToolUse rows follow at 22:32:26Z. The session has no
  `PermissionDenied` row.
- Host decision: allowed. No permission prompt surfaced in this session.
- Helper output: "Pushed feat/sub-app-menu at
  61cf1ae9e8434bd73d1bbd89c16850996a9e7e27 over draft
  99a30befa150e5d77a64259013e62b9d0372270e and marked pull request #6 on
  github.com/DylanBWood/DotLn-Angular ready."
- Local readback: target `HEAD` is `61cf1ae9…`, the records commit, whose
  parent is the reviewed commit `99a30bef…`; 0 porcelain lines.
  `git ls-remote origin` reads `feat/sub-app-menu` at `61cf1ae9…` and `main`
  at `2ab4f285…`, so the target's `main` did not advance before the push.
- Remote readback: `gh pr view 6 --repo DylanBWood/DotLn-Angular` reads
  number 6, `isDraft` false, state `OPEN`, mergeable, head
  `feat/sub-app-menu` at `61cf1ae9…`, base `main`, title ":sparkles: feat:
  add the sub-app menu and the scene and machinery routes", updated
  2026-10-25T22:32:26Z. CI run 40240672471 started at 22:32:29Z on the new
  head.
- Interventions: none. No `--confirm-terms` was needed, and no host denial
  occurred.
- Outcome against the record: the final publish composed the change from
  the merge base, pushed under the draft's lease and reused pull request #6,
  as WO-013-D019 planned. The reopening conditions of the D008, D009 and
  D015 rows did not occur, and this outcome is what settles them.
  `FUP-2479f6d32b2396a8`'s condition, a hook-admitted target publish denied
  by the host classifier, did not occur: all four of this order's publish
  calls were admitted by the hook and allowed by the host.
- No private journal contents are copied here: only row kinds, timestamps,
  the admission kind and the registration id.
