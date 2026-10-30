# WO-015 host qualification

Observed 2026-10-30 during executor work under Claude Code 2.1.314, with the model
claude-opus-5-5 and the effort `max` read from the session (`CLAUDE_EFFORT`, selected rather than
effective). The registered launchpad and target worktrees were resolved before Git operations, and
the launchpad lifecycle owned the single writer throughout. The three review workers stayed
read-only; none spawned a descendant, and their later rounds resumed the same agents, so the count
stayed at 3 of the cap of 20.

The dispatch bound was extended without limit for wall clock and complete runs, on the operator's
direction of a feedback loop for as long as necessary (D003), and that extension lasts until this
phase completes.

The host's guards acted twice, and neither stopped the work. A write to `/tmp` was refused, so logs
went to the session's scratch directories instead. Playwright refused to reuse port 4200 while a
local server held it, so servers were stopped before browser suites ran. The operator was asked two
questions through the host's own dialog, which is how the end of the loop and the first comparison
round were decided (D015).

Executed local surfaces: the optimized production app, the mocked app, Storybook through the browser
and visual suites, Vitest, Playwright, the fixture, token, catalog, translation, bundle and template
checks, and compilation of the end-to-end specs. Throwaway engine probes ran from the session
scratchpad, one process at a time, and wrote nothing to either repository.

No pull request, push, commit or publish happened in this dispatch. The publish invocation, the
hook's decision and the host's belong to final review, which records them here as the repository
profile requires.


## Independent verification and draft publication — 2026-10-30

The independent pass ran under Codex CLI 0.166.0, gpt-6.1-sol at selected effort max,
from the active thread's readback. It recorded `VER-001: pass` after the final
`npm run test:docs` row passed. The report remains immutable. Twenty-four new
walkthrough captures and three slider-access captures are under `walkthrough/`;
`VER-001-probes.json` preserves their identities and the independent measurements.
All locally started browsers and HTTP servers exited before the result.

The order's step 17 inherits WO-007 step 15 and the repository profile's draft-at-verified
route. That is the standing authority for the draft publication in this phase; the
executor section above had deferred its qualification to final review. From this
launchpad worktree, the exact registered helper was run:

```sh
node scripts/worktree.mjs publish WO-015 --target-worktree --draft --branch feat/soldier-scene --title "feat: add the soldier scene with flock, arrive and formation" --body-file docs/evidence/WO-015/draft-pr-body.md
```

The host tool ran it successfully, exit 0. There was no host permission rejection.
A pre-tool hook admission row is unobserved at Codex's unhooked tool boundary; the
helper itself checked the committed registration, authority grant and target bundle
in process. No automatic hook admission is claimed.

It created the draft commit `96a62d103f66fff6b61e02cb981624992fab6d9d` and opened
[draft pull request 9](https://github.com/DylanBWood/DotLn-Angular/pull/9) on
`feat/soldier-scene` toward `main`. A read-only forge read confirmed the draft flag,
branch and exact head. The repository's title workflow decorated the prescribed
conventional title with `:sparkles:`. The commit's tree is the verified
`fbad54f93626d1cde1321a59a94b46e2e42c50e1`. The helper confirmed HEAD and the index
were unchanged; a separate Git read confirmed HEAD remains `38f8afd6e1507483c58a662f2df7c3974dfd62b0`
and the draft commit has that verified tree. Target `git diff --check` passes.

Final review remains the legal next phase. It owns the draft's automated review
comments and workflow runs, release notes, records movement and ready publication.

## Final review — 2026-10-30

The final review ran under Claude Code 2.1.314 with the model `claude-fable-5-1`, which the
operator set as the session model immediately before the dispatch, at effort `xhigh` read from
`CLAUDE_EFFORT` (selected, not effective), dispatched by `resume: final review` at 19:06Z in the
`wo-015` launchpad worktree. The hook recorded the dispatch once and allocated FINAL-001. No worker
was spawned: 0 of the cap of 20.

The host's guards acted three times, and none stopped the work. The integrate helper refused a
hand-made intake archive rooted at `intake/` and accepted the kit's `scripts/backup-intake.sh`
archive rooted at `docs/intake/`. The bounded wrapper flagged the Nx daemon as a surviving process
after the first probe chain, whose three tasks had all passed; the daemon was stopped and every later
probe ran with `NX_DAEMON=false NX_ISOLATE_PLUGINS=false`, the registration's own environment. A
first browser regression written as two Playwright key presses passed on the verified bytes and was
replaced by one that lands the activation and the clear in one task, which fails there (D020).

Executed local surfaces: the target review gate through the kit's runner (seven commands, 161 s, at
the repaired tree), the scene, scene-engine and lint tasks fresh, the Playwright scene cases under
the bounded wrapper, the launchpad's `publication:check`, `harness check` and
`release check-surfaces --local` after the no-op integration, and `npm run test:docs`. The target
commits were made with `git commit-tree` from the verified tree object and an ordinary commit for
the repair; no reset, restore or stash was used.

The publish invocations, the hook's decision and the host's are appended below after the result.

### The final publish

From this launchpad worktree's root, after `final-review-result pass` (19:38:15Z), `target-records`
(records commit `b4c51461`, 19:38:50Z) and the instance records commit `8d71ec8`, the exact registered
helper was run plainly, with no environment prefix, pipe or redirect:

```sh
node scripts/worktree.mjs publish WO-015 --target-worktree --branch feat/soldier-scene --title "feat: add the soldier scene with flock, arrive and formation" --body-file docs/final-reviews/WO-015/PR.md
```

The host ran it without a permission prompt; exit 0. Its one output line: pushed `feat/soldier-scene`
at `b4c51461014a835ea470542de3ab5b95a570d86d` over the draft `96a62d103f66fff6b61e02cb981624992fab6d9d`
and marked pull request 9 on `github.com/DylanBWood/DotLn-Angular` ready. The kit's pre-tool admission
line is not part of the command's output and was not otherwise surfaced; the plain node spelling from
the launchpad root is the form the registered-target admission covers, and no near-miss advisory was
seen. A read-only forge read at 19:42Z confirmed `isDraft` false, head `b4c51461`, the three commits
(`1eb63058` the verified tree, `0df9db56` the checkbox repair, `b4c51461` the records), the title
decorated by the repository's workflow with `:sparkles:`, the title check passed at 19:42:13Z, the CI
`checks` run in progress and `visual` queued, so the merge state read blocked until they finish; no
review, comment or thread. The records branch publish follows this section's commit and is recorded in
the preview record.

### Operator override recovery — 2026-10-30

After the publish, CI's `typecheck:e2e` step on pull request 9 failed on the final review's
browser regression: `scene.spec.ts(117,11): error TS2551: Property 'click' does not exist on type
'HTMLElement | SVGElement'`. The operator reported it and asked how every phase had missed it, then
authorized recovery with `operator override:` (ignored capture
`docs/intake/notes/wo-015-override-2026-10-30.md`, SHA-256
`9d37ee27af8606eb71f242fcf23a379bd4012d230e2290946f75a3bfcf07a738`, entries 1 and 2). The hook
suspended its enforcement for the session; host permissions still applied, and no lifecycle dispatch
or passing check is claimed.

The cause and the gap: the line was the review's own (D020); ESLint, Playwright, the registered gate
and the order's Preflight line do not type-check the e2e project, CI does, and the review did not run
`typecheck:e2e` after changing an e2e spec. The decision is D022 in the target's decisions file.

What ran, from this launchpad root: `npm run typecheck:e2e` under the bounded wrapper reproduced the
error at `b4c51461`; the one-line annotation (`input: HTMLInputElement`) was applied; `typecheck:e2e`
exited 0; `node scripts/target-gate.mjs WO-015 --review` passed all seven commands at the corrected
tree `5c7aa4b6fceec12052ebe41adc5ced180f4694d4` (row `target-gate:6e817aaa-872c-41bd-a562-ec734fea6e3a`,
2026-10-30T21:17:28Z, 138 s, test and build replayed from the Nx cache because no unit input changed);
`npx nx format:check` passed again after D022 was written. Two commits followed on `wo-015`:
`cc0e58ed` (`test: type the checkbox regression's element for the e2e type check`) and `4260fea1`
(`docs: record the e2e type-check correction and the gate gap it exposed`), both passing the outward
commit lint with the target flag.

Bypassed, named truthfully: the kit's closed-phase publish helper refuses a head past the records
commit, so the branch was pushed with `git push origin wo-015:feat/soldier-scene` from the target
worktree (`b4c5146..4260fea`), outside the registered-target admission; no repair, verify or review
phase re-judged the change, because the lifecycle has none after a passing final review; the
`TargetRecordsCommitted` binding still names the records as of `b4c51461`, so the launchpad's decisions
index and follow-up register do not carry D022 until a planning pass reads the target's records. A
read-only forge read at 21:19Z confirmed head `4260fea1`, five commits, the pull request still ready,
and both CI runs in progress. The override record is appended from the main checkout when the operator
ends the override, as the hook's advisory names.

The pull request's body was then refreshed with `gh pr edit 9 --body-file`, because the raw push
left the helper's composed body at the first publish: the reviewed PR.md as updated above, followed by
the helper's Change and Target checks sections as published, and one line naming the corrected tree's
gate. The host ran it without a prompt; the kit's publish helper did not compose this body.
