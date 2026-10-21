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
