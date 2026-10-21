# WO-006 host qualification

The executor has not published a draft or final pull request. This session is
Codex CLI 0.163.0, model `gpt-6-astra`, effort `max`, from the canonical session
readback. It makes no Claude Code auto-mode or hook-admission observation.

The order's verified-phase session records the draft publication episode
here after `verification-result pass`. It must record the actual helper
invocation, host/version/mode, admission kind and timestamp, prompt or denial
and response if any, trust-pattern and registration readback, and draft pull
request URL. Private journal contents must not be copied.

Final review adds the same observed fields for its publication without
`--draft`; release close adds the judged base-output policy and actual tag and
Release names. Those future observations are evidence obligations of their
separate dispatches, not facts supplied by this executor.

## Verified-phase draft publish (VER-001 session, 2026-10-21)

- Host: Claude Code 2.1.306 with auto mode on; model `claude-opus-5-5`, effort
  `xhigh` from `CLAUDE_EFFORT`. The publish was attempted after
  `verification-result pass` recorded VER-001 and status read `verified`.
- Helper command line as run, verbatim, from the launchpad root:
  `node scripts/worktree.mjs publish WO-006 --target-worktree --draft --branch feat/component-taxonomy --title "feat: add the component taxonomy, shell layout and actor board" --body-file docs/evidence/WO-006/draft-pr-body.md`
- Journal: the PreToolUse rows at 2026-10-21T14:49:53.4Z show only the
  generic effect check (`lifecycle.run`, allowed). No row carries
  `registeredTargetAdmission`, and there is no "Registered-target admission
  withheld" advisory. The cause: the session ran the helper with a
  `2>&1 | tail -20` suffix, the hook's plain-word parser declines piped or
  redirected commands without writing a row, and so the registered-target
  admission never evaluated. Claude Code's auto-mode classifier then denied
  the call. The journal records it as a
  `PermissionDenied` row at 2026-10-21T14:50:03.980Z, typed event
  `HostPermissionDenied`, rule `[Unrequested Commit in a Connected App]`, plus
  a delegated advisory row. That advisory says the operator can run the
  command with the `!` prefix or retry through `/permissions` → Recently
  denied, and that the hook requests no retry.
- Prompt: none. The classifier denied the call without asking, so nobody
  answered. The session did not route around the denial; it retried only
  after the operator authorized a retry (below).
- Effects: none. Target `HEAD` remains `5102783f`, no `refs/dotln/draft/WO-006`
  ref exists, there is no target-publication record, and nothing was pushed.
  No pull request exists, so there is no URL and no draft state to report.
- Trust entries by pattern: the project `.claude/settings.json` allow list is
  empty, and the user-level settings carry no allow entry matching `worktree`,
  `publish`, `git push` or `gh pr`. `hostRules` is absent from the
  `dotln-angular` registration in `dotln.config.json`.
- Authority on record: the operator grant `operator.dotln-angular.publication`
  admits `repo.push` and `pr.open` for an order branch. The host permission
  layer decides independently of that grant.
- The reviewed body is
  [draft-pr-body.md](draft-pr-body.md). No private journal contents are
  copied here: only row kinds, timestamps, the typed event, the rule name and
  the hook's own advisory are reported.

Operator note (paraphrased; [WO-006-D018](decisions.md#wo-006-d018)): the
operator had removed the Claude Code host values allowing GitHub push on
purpose, because DotLn's registered-target admission is meant to carry target
publication. They authorized a retry with the plain spelling.

### Retry with the plain spelling

- Command as run, verbatim, from the launchpad root and with no pipe or
  redirection:
  `node scripts/worktree.mjs publish WO-006 --target-worktree --draft --branch feat/component-taxonomy --title "feat: add the component taxonomy, shell layout and actor board" --body-file docs/evidence/WO-006/draft-pr-body.md`
- Journal: at 2026-10-21T14:53:09.967Z the hook evaluated the admission and
  withheld it, recording the advisory "Registered-target admission withheld:
  registration, target or canonical status fact unreadable (publication
  authority differs from main's committed dotln.config.json); host
  permissions decide." The generic effect row followed (`lifecycle.run`,
  allowed). At 2026-10-21T14:53:25.916Z there is a `PermissionDenied` row,
  typed event `HostPermissionDenied`, rule `[Create Public Surface]`.
- Cause: this order worktree's `dotln.config.json` adds the `visual` gate
  command, the in-process plugin flag and the disposable diagnostic path, so
  it differs from main's committed bytes, and the admission requires byte
  equality. Final review's publish will meet the same refusal until those
  records reach main.
- Prompt: the classifier denied the publish without a prompt. A following
  read-only journal check was also denied, with rule
  `[Out-of-Place Publication]`. The operator reported manually approving a
  command in this sequence, and noted that auto-mode rejections often never
  reach them, which shifts the burden to the intervenor.
- Effects: none. Target `HEAD` is `5102783f`, no `refs/dotln/draft/WO-006` ref
  exists, nothing was pushed and no pull request exists.

### Operator run with the `!` prefix

- The operator ran the same command verbatim with the `!` prefix, so the host
  layer did not intervene. The helper refused it at the outward lint:
  `error: target publish refused: outward lint: pr-body refused: vocabulary.launchpad (line 147)`.
- Cause ([WO-006-D019](decisions.md#wo-006-d019)): the helper-generated Change
  table lists `libs/features/board/src/testing/fixtures/launchpad-board-2026-10-21.json`,
  and the outward vocabulary refuses that term. The reviewed body passes on
  its own.
- Effects: target `HEAD` is `5102783f`, no `refs/dotln/draft/WO-006` ref exists
  and there is no target-publication record. At most, the helper's
  `commit-tree` step, which runs before the lint, left one unreferenced commit
  object.

### Successful operator run, 2026-10-21

- The operator first edited the outward vocabulary in main's checkout, the
  copy the helper reads. An empty `terms` list was refused with "invalid
  outward vocabulary: require nonempty types and terms". The operator then set
  `terms` to a single opaque placeholder; that change is uncommitted in main's
  checkout. The operator then synced this order worktree's copy to match
  main's, so both copies are byte-identical and valid. They will raise the
  change in the next fork planning pass.
- The operator ran the same helper command verbatim with the `!` prefix. The
  helper printed: "Pushed draft feat/component-taxonomy at
  a9e58af4aabc370eb82edcdd2b9b0f619cc809f0 and opened draft pull request #4
  on github.com/DylanBWood/DotLn-Angular; HEAD and the index are unchanged."
- Readback through `gh pr view 4`: https://github.com/DylanBWood/DotLn-Angular/pull/4
  is `OPEN` with `isDraft: true`, head `feat/component-taxonomy` at
  `a9e58af4aabc370eb82edcdd2b9b0f619cc809f0`, base `main`, and the reviewed
  title. Target `HEAD` remains `5102783f`, and `refs/dotln/draft/WO-006`
  points at `a9e58af`.
- Admission: the operator's `!` run went through the shell directly, outside
  the hook and the auto-mode classifier. No registered-target admission
  carried any attempt (D018).

Final review reads the draft's threads and workflow runs into
`preview-pr.json` and inherits D018's and D019's follow-ups. Main's
vocabulary change is still uncommitted in its checkout. This worktree carries
the same bytes, so they merge with WO-006's records unless the fork planning
pass decides otherwise.

Release-close note: keep main's checkout edit through final review's
non-draft publish, because the outward lint reads main's working copy. After
WO-006's pull requests merge and before release close, discard the edit in
main's checkout (`git checkout -- docs/control/outward-vocabulary.json`) and
fast-forward main; the merged records bring back the same bytes. Without
that, `worktree finish` refuses a main checkout with tracked changes
(`scripts/worktree.mjs` calls `ensureMaterialClean(mainPath, …, { leaving: false })`).
Landing the change on main first, through its own pull request, removes this
step.

## Closed-phase publish (FINAL-001 session, 2026-10-21)

- Host: Claude Code 2.1.306 with auto mode on; model `claude-fable-5-1`, effort
  `xhigh` from `CLAUDE_EFFORT`. The publish ran after
  `final-review-result pass` (16:49:43Z) and `target-records` (16:50:00Z),
  with the instance records committed on `wo-006` at `c92fcff`.
- Helper command line as run, verbatim, from the launchpad root, as the
  briefing spelled it, prefixed by the shell's directory change and the
  launchpad variable, with no pipe or redirection:
  `cd /Users/dylanwood/Projects/DotLn-Instance-wo006 && DOTLN_LAUNCHPAD='/Users/dylanwood/Projects/DotLn-Instance-wo006' node '/Users/dylanwood/Projects/DotLn-Instance-wo006/scripts/worktree.mjs' publish WO-006 --target-worktree --branch feat/component-taxonomy --title "feat: add the component taxonomy, shell layout and actor board" --body-file docs/final-reviews/WO-006/PR.md`
- Journal: the PreToolUse rows at 2026-10-21T16:50:57.448Z to .518Z show the
  outside-write check unobserved (destination not extractable), the
  no-attribution unit allowed, the generic effect row (`shell.run`,
  allowed), the writer-isolation unit allowed, and the three hook timings.
  No row carries `registeredTargetAdmission` and there is no
  "Registered-target admission withheld" advisory: the admission did not
  evaluate, because the call reached the hook with the directory change and
  the variable assignment in front of the node spelling, which the plain-word
  parser does not read as the helper form (the same class as the verifier's
  first attempt, D018, where a pipe had the same effect). The PostToolUse
  rows at 16:51:04.958Z to .981Z show the lint-suppression unit allowed and
  the observe row (reviewer, WO-006, finalReview). No `PermissionDenied` or
  `HostPermissionDenied` row exists for the call.
- Prompt: none. The host's auto-mode classifier allowed the call without
  asking; nobody answered anything. This is the opposite outcome from the
  verifier's two attempts, on the same host and settings, and the cause of
  the difference is unobserved.
- Effects: the helper printed "Pushed feat/component-taxonomy at
  5eee5951baed8e6cddf19a6c4050607253b85eb5 over draft
  a9e58af4aabc370eb82edcdd2b9b0f619cc809f0 and marked pull request #4 on
  github.com/DylanBWood/DotLn-Angular ready." Readback through `gh pr view 4`:
  `OPEN`, `isDraft: false`, `MERGEABLE`, head `5eee5951…` (the draft commit,
  the skip-link repair `eb7dfdf0…` and the records commit), base `main`, the
  reviewed title; the title run 39638473965 completed with success and the CI
  run 39638474008 was in progress at readback. Target `HEAD` on `wo-006` is
  `5eee5951…`; `refs/dotln/draft/WO-006` still names `a9e58af4…`.
- Trust entries by pattern: the project `.claude/settings.json` has no allow
  list (a four-entry deny list only); the user-level settings carry no allow
  entry, and none of their auto-mode environment entries matches `worktree`,
  `publish`, `git push` or `gh pr` (0 matches); `hostRules` is absent
  from the `dotln-angular` registration. No private journal contents or
  entry names are copied here.
- Authority on record: the operator grant `operator.dotln-angular.publication`
  admits `repo.push` and `pr.open` for an order branch; the host decided
  alone, since the registered-target admission did not evaluate.

Release-close observation: to be recorded by the close.
