## Release overview

This release registers DotLn-Angular as the first target repository of this instance, so that its first target order can activate, run the repository's declared gate in its own worktree and publish a pull request the operator merges. It is for the operator and the sessions that work here: one `dotln.config.json` at the root, one operator grant in the authority registry and one outward vocabulary for the publication lint, each written as the kit documents it.

## Read before upgrading

Authority changes: the committed grant registry `packages/skeleton/loadouts/grants.json` goes from empty to one operator grant that admits pushing an order branch, opening a pull request and resolving review threads in `DylanBWood/DotLn-Angular`; merging, tagging, repository settings and package publication stay with the operator, and the registered authority profile denies `package.publish` and `release.close`, limits writers to one and expires on 2100-01-01. No schema or data migration: `dotln.config.json` declares `version: 1` and moves no document root, so every existing record stays where it is. Required operator action after the merge: `resume: release close` in `main`. That session also records the local clone before WO-004 starts, by running `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"` from the main checkout once it holds the merge, because the command validates the repository id against `main` and refused before this merge. Known limitation: two of the order's four Preflight suites cannot pass in this kit, and the operator waived that criterion together with the pre-merge clone record; both are boarded as follow-ups.

## Substantive changes

- Repository registration: `dotln.config.json` declares the class `angular-nx-monorepo` (no shared checks or supports yet) and the repository `dotln-angular` with base branch `main`, worktree parent `..` (target worktrees land beside the clone), its profile document `docs/repositories/dotln-angular.md`, documentation root `docs/dotln`, the authority profile, and a gate of six commands (`npm ci`; `nx run-many -t lint`, `test`, `build`, `e2e`; `nx format:check`) each run under `env NX_DAEMON=false` with timeouts of ten minutes for install, lint and format, fifteen for test and build and twenty for e2e; the plain selection is install, lint, test and format, and review adds build and e2e.
- Publication authority: the operator grant `operator.dotln-angular.publication` with `repo.push`, `pr.open` and `pr.thread.resolve` in both effects and operations; the kit's publication path accepts it and refuses an empty registry, a non-operator origin, another repository, missing operations, an expired profile and an explicit push denial.
- Outward vocabulary: `docs/control/outward-vocabulary.json` with the eleven conventional types and six internal terms; a gitmoji in front of a pull-request title is refused with `subject.shape`, which the target repository's title workflow (WO-004) answers by prepending the gitmoji after the pull request opens, and `DotLn` is accepted because it names the product.
- Records: the order's evidence with every command output, decisions D001 to D014, the executor handoff, verifications VER-001 and VER-002 and this final review under the order's directories; the order heading and the README release block carry `v0.2.0`.

## Progressive polish

None.

## Evidence and compatibility

- Source: the `wo-003` branch over `main` at `2b515fa`; release close produces the tag and manifest from the final-review record.
- Records: WO-003 (`docs/work-orders/WO-003-register-dotln-angular.md`), evidence and decisions WO-003-D001 to D014 under `docs/evidence/WO-003/`, verifications VER-001 (fail, one metadata regression repaired) and VER-002 (pass), and final review FINAL-001 (pass, no finding) beside these notes.
- Gates at the reviewed revision: `npm run test:docs` 17 passed, 0 failed; `npm test -- --review` 2 passed, 0 failed (0.55 s); `git diff --check` clean; `node scripts/harness.mjs check` passed; `npm run release -- check-surfaces --local` passed every rule. Component versions: `@dotln/skeleton` 0.59.1 against 0.59.0 at v0.1.0, a bump the v0.83.0 starter update brought to `main` and not this order; the other four packages are unchanged.
- Known limitations: the gate commands are declared and not yet run (WO-004 runs them first); the clone record waits for the merge; the Preflight suites `outward-lint` (core-only) and `authority-grants` (empty-registry assertion) cannot pass in this kit and are boarded upstream in `docs/planning/followups.json`, with the Preflight line itself a planning follow-up.
