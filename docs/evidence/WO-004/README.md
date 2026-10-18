# WO-004 executor evidence

The operator dispatched `resume: next` on 2026-10-18. The target is the
DotLn-Angular `wo-004` worktree, based on the initially empty repository at
`bc9133e932a00d33c15bc5289d683b8078f51ee4`. The executor has not committed or
published the branch. The target's generator log records all generator
invocations, rejected outputs and the final baseline. Decisions are in
[decisions.md](decisions.md).

## Version observation

`npx nx report`, run under the bounded wrapper on 2026-10-18, exited 0.
Its version section was:

```text
Node           : 26.9.0
OS             : darwin-arm64
Native Target  : aarch64-macos
npm            : 11.19.1
daemon         : Disabled

nx                 : 23.3.0
@nx/js             : 23.3.0
@nx/eslint         : 23.3.0
@nx/workspace      : 23.3.0
@nx/angular        : 23.3.0
@nx/devkit         : 23.3.0
@nx/eslint-plugin  : 23.3.0
@nx/playwright     : 23.3.0
@nx/web            : 23.3.0
typescript         : 6.0.3
```

This Nx version's report omits the Angular framework and Vitest versions.
`npm ls nx @angular/core typescript vitest undici --depth=1` exited 0 and
observed `@angular/core@22.2.3`, `typescript@6.0.3`, `vitest@4.1.12`,
`nx@23.3.0` with overridden `undici@7.29.1`, and jsdom's independent
`undici@8.12.2`. The separate package-tree observation supplies the two
versions the report omits. `npx nx show projects --json` lists only `dotln`
and `dotln-e2e`.

## Local checks before the declared gate

Every probe uses the launchpad's `harness bounded` wrapper. Nx probes set
`NX_DAEMON=false NX_ISOLATE_PLUGINS=false`; the latter avoids transient
plugin-worker survivors observed in the first generator-help probe.
The declared gate uses the registration's unchanged command argv.

- `npm install` after the scoped override: one package changed, no peer error.
- `npm audit`: exited 0, found 0 vulnerabilities.
- `npx nx run-many -t lint test build`: exited 0, four tasks succeeded.
- `npx playwright install --with-deps chromium`: exited 0; installed Chromium
  and its headless shell at Playwright's selected revision.
- `npx nx e2e dotln-e2e`: exited 0; the smoke test checks the title, the home
  heading in the main landmark, and absence of browser page errors.
- `npx nx format:check`: exited 0.
- `npm run lint:fixtures`: exited 0; an actual isolated Nx graph rejects
  `models → util` with `@nx/enforce-module-boundaries` and accepts
  `util → util` as the control. It removes its temporary files afterward.
- `npm run test:tooling`: five tests passed, none skipped; all gitmoji
  types, malformed titles, stale events, current-title idempotence, literal
  shell-like text and lookup failures preventing an edit.
- `npm run typecheck:e2e`: exited 0 after correcting the generated CommonJS
  configuration for its `.mts` file and supplying explicit Node 26 types.
  CI now runs this check because browser execution alone does not type-check.
- `npx prettier --check .github`: exited 0.
- `npm run boards`: exited 0, board count 0.

The final target preflight after all review corrections ran at
2026-10-18T12:50:47Z–12:50:53Z: format check, four lint/test/build tasks
(three fresh and one cached), and one freshly executed Chromium smoke test.
The two unit-test files contain two passing tests. The launchpad's
`npm run format` exited 0; `npm run test:docs` then passed all 17 tasks
in 5.37 seconds before the first declared target gate. Its three advisories
refer to existing records for WO-001 and WO-003, not this order.
No claim here establishes a live GitHub workflow run.

## Declared gates

Both commands ran from the launchpad order worktree after the final preflight:

| Command | Result | Checks | Total command duration |
| --- | --- | --- | --- |
| `node scripts/target-gate.mjs WO-004` | PASS | install, lint, test, format | 6,456 ms |
| `node scripts/target-gate.mjs WO-004 --review` | PASS | install, lint, test, format, build, e2e | 7,691 ms |

The review row was recorded at `2026-10-18T12:52:14.245Z` with reference
`target-gate:cc68c1bd-f473-48f0-8a98-a7171bef346f` and target tree hash
`028a72f4549768e4ed7b2a956556e21560209655`. Every declared command executed
successfully, and the gate observed no non-ignored source-byte or HEAD mutation.
Nx reused valid task caches in the gates; the current-source preflight above
also executed the application tests and browser smoke test. The recorded HEAD
is still the empty baseline, not a claimed scaffold commit: the tree hash binds
the uncommitted workspace checked here. `targetGateEvidence` subsequently
confirmed the passing review row at the current tree and its coverage of the
plain selection.

Static checks also found five of five workflow `uses:` entries pinned to full
commit SHAs, zero `zone.js` dependencies, and exactly one line containing
`provideZonelessChangeDetection` in `app.config.ts`. The two project names are
both accounted for by the generator log. See [self-review.md](self-review.md)
for the independent worker findings and correction review.

## Release and local harness

`npm run release -- prepare --local` reported: target order records no
release; no files changed. Generated local harness files are excluded from
formatting. After recovering six formatter-only changes against their
original generated hashes, `checkTargetHarness` passed for all seven target
surfaces. Temporary generator trees contain no nested Git repositories.

## Post-verification live obligation

Criterion 6 is **unmet at executor handoff**: the order requires independent
verification to pass before opening the interim draft pull request. No draft
has been opened and no GitHub workflow or settings failure is claimed. After
that pass, the authorized interim route must record the draft number and the
completed title workflow showing `:sparkles:`; final review must capture and
route its threads in `preview-pr.json`. This is the remaining lifecycle
obligation, not a waived criterion. See WO-004-D002.

## Interim draft pull request

After VER-001 passed, the operator set the work-in-progress draft rule
(WO-004-D012). The scaffold was committed on `wo-004` as `65ca027`
(`feat: WIP scaffold the Nx and Angular workspace`), and the gate's tree hash
stayed `028a72f4549768e4ed7b2a956556e21560209655`. Claude Code's auto mode
refused the session's push, so the operator ran one manual command that
updated the Claude Code trusted-repo settings, pushed `wo-004` and opened the
draft (WO-004-D013).

- Draft pull request: [#1](https://github.com/DylanBWood/DotLn-Angular/pull/1),
  opened 2026-10-18.
- Title workflow: run `39135428377` (`pull_request`) completed with
  `success`; the live title is
  `:sparkles: feat: WIP scaffold the Nx and Angular workspace`.
- CI: run `39135428411` (`pull_request`) completed with `success`.
- Copilot review: requested with `gh pr edit 1 --add-reviewer @copilot`; the
  pull request's timeline shows `review_requested` for Copilot.
- Final review undoes the work-in-progress commit, captures the threads in
  `preview-pr.json` and publishes the reviewed pull request; the operator then
  closes this draft.
