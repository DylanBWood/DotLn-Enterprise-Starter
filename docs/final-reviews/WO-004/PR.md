# WO-004

DotLn-Angular becomes a working Nx 23.3.0 integrated monorepo on Angular 22.2.3: the slim, standalone, zoneless `dotln` shell renders a one-line home page, Vitest and Playwright cover it, Sass, ESLint flat configuration with tagged module boundaries and Prettier are wired, CI runs the same checks on every pull request, a workflow prepends the gitmoji for a title's conventional type, and the two documentation roots exist with the generator log. Every later order in this workstream (shared libraries, the component taxonomy, stores, authentication) builds on this workspace.

## What a reviewer gets

- The workspace and shell: `nx.json` with a worktree-local cache and the generator defaults, `tsconfig.base.json` with an empty alias map until libraries arrive, `apps/dotln` with `main.ts`, `app.config.ts` (zoneless change detection, router with component input binding, fetch HTTP), the `App` outlet shell, the eager `Home` placeholder and two unit specs, and `apps/dotln-e2e` with one Chromium smoke test that asserts the title, the home heading inside the main landmark and no page errors.
- Lint and boundaries: the root ESLint configuration declares `@nx/enforce-module-boundaries` with one row for each `scope:*` and `type:*` tag of the house rules, refuses TypeScript `private` members in favor of `#private`, and prefers signals and readonly outputs; `npm run lint:fixtures` builds an isolated Nx graph and proves the boundary rule rejects a forbidden dependency while accepting an allowed one.
- CI and titles: `.github/workflows/ci.yml` runs format, fixtures, tooling tests, the e2e type check, the board count and `nx affected -t lint test build e2e` on pull requests and pushes to `main`; `.github/workflows/pr-title.yml` with `.github/gitmoji-map.json` and `tools/pr-title.mjs` prepends the gitmoji for the conventional type; every action is pinned to a commit.
- Documentation: `README.md`, `docs/dev-reference/README.md`, `docs/dev-reference/workspace/conventions.md` (house rules 1 to 6, 12, 13, 15 and 19 to 21 restated by number), `docs/dev-reference/workspace/generator-log.md` (every generator command, its Nx version and its result, including the refused and discarded attempts) and `docs/ai-reference/README.md`.
- Two commits: the scaffold, then a fix found by the automated review of draft #1: a decorated title whose conventional type changed kept its old gitmoji; the helper now replaces a prefix that does not match the title's own type, with regression tests.
- The order, its decisions, the verification report and the final review are filed under `docs/dotln/` in this branch, with the bytes the review recorded; that directory is excluded from the formatter.

## Validation

- Acceptance criteria 1, 2, 3, 4, 5 and 7 are met on the verifier's own uncached runs and the final review's reproduction: `nx` 23.3.0, `@angular/core` 22.2.3, `typescript` 6.0.3 and `vitest` 4.1.12 installed with no `zone.js`; lint, test, build, format check and e2e each exit 0; every boundary row is declared and the fixture check observes the rule fail; the generator log covers both projects; the workflows run the declared checks and all five action pins are full commit SHAs.
- Criterion 6 (the draft pull request's title workflow and threads) was ordered after the verification pass, so it was waived there by the operator and is recorded as waived. It was then observed on draft #1: the title workflow run completed with success and the live title begins with `:sparkles:`, CI completed with success, and the automated review's two comments were captured and routed, one repaired here and one boarded as a follow-up.
- The declared review gate (install, lint, test, format, build, e2e) passed at the reviewed commit with no tracked-byte mutation; the final review also ran lint and test without the Nx cache, the seven tooling tests, the fixture check, the e2e type check and the format checks at the same tree.
- Verification VER-001 passed with four follow-ups; final review FINAL-001 passed with one finding, repaired in the second commit. The draft's reviewer thread on fork pull requests is boarded, not changed, because its suggested trigger would run the workflow file from `main`, which holds no workflow until this change merges.

## Limits and follow-ups

- Pull requests from forks: the title workflow runs with a read-only token there and cannot edit the title; the failure message names repository permissions rather than the fork token. Same-repository pull requests, the route this workstream uses, are unaffected. The repair is a later change, after this merge.
- Draft pull request #1 is superseded by this pull request; it carries the same scaffold under a work-in-progress commit and closes at the operator's hand.
- No release is recorded for this change in this repository; the branch merges with a merge commit whose message is the pull-request title, and the next planning pass sets the base of the shared-libraries order to that merge commit.
