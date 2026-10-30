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
