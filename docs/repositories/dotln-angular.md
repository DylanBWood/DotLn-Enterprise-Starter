# dotln-angular — profile

**Class:** `angular-nx-monorepo`
**Base branch:** `main`
**Checked:** `3e1c3d18cf4caaebf9a768c8137be227201e0ba9` (WO-004's reviewed
commit of 2026-10-18 over the base `bc9133e932a00d33c15bc5289d683b8078f51ee4`).
Node 26.9.0, npm 11.19.1, Nx 23.3.0, Angular 22.2.3, TypeScript 6.0.3 and
Vitest 4.1.12 were observed. The commands below passed the declared review
gate at that commit; the order's evidence records the preflight and gate
results.

The launchpad that registers a repository owns its profile; this file is
repo-native convention authority for sessions acting in
`DylanBWood/DotLn-Angular`, read on demand for an order whose `Repository:`
line names `dotln-angular`. Prose here grants no authority beyond the
registration's envelope in `dotln.config.json`.

## Purpose and standards to emulate

The workstream document [WS-001](../workstreams/WS-001-dotln-angular.md)
carries the outcome, the twenty-one house rules and the component taxonomy.
WO-004 demonstrates the shell app in `apps/dotln`. Shared and feature
libraries remain later orders; their paths become examples only after they
exist.

## Commands

The gate the registration declares runs these in the target worktree, each
bound to the non-ignored bytes before and after (a command that changes a
tracked file fails the gate):

| Purpose | Command                                    | Notes                                                        |
| ------- | ------------------------------------------ | ------------------------------------------------------------ |
| install | `npm ci`                                   | Node version from `.node-version`; the operator uses fnm     |
| lint    | `npx nx run-many -t lint`                  | plain and review                                             |
| test    | `npx nx run-many -t test`                  | plain and review; Vitest, no watch                           |
| format  | `npx nx format:check`                      | plain and review                                             |
| build   | `npx nx run-many -t build`                 | review                                                       |
| e2e     | `npx nx run-many -t e2e`                   | review; needs `npx playwright install --with-deps chromium`  |

The target's package scripts `lint`, `test`, `format:check`, `build` and `e2e`
mirror those Nx commands. The registration prefixes checks with
`env NX_DAEMON=false`. CI also runs `npm run lint:fixtures` to prove that a
forbidden dependency is rejected, `npm run test:tooling` for title validation
and literal argument handling, `npm run typecheck:e2e` for the NodeNext
Playwright files, and `npm run boards` to print visible boards.

## Local application startup

Run `npm ci`, then `npx nx serve dotln` (or `npm start`). Open the address
Nx prints; the home page shows the heading **DotLn**. The scaffold requires
no environment file, API or account. Playwright starts its own server at
`http://127.0.0.1:4200`, refuses to reuse an existing process, and checks the
heading, document title and absence of page errors. MSW and the environment
primer belong to WO-005 and are not installed by this scaffold.

## Branch and pull-request policy

Branches: `wo-NNN` while an order runs (the launchpad creates it), `<type>/<slug>`
for the published change (`worktree publish --target-worktree --branch`). Pull
requests target `main`; the merge method is a merge commit whose message is
the pull-request title (repository setting, operator-owned). A session never
pushes to `main`, merges, tags or changes repository settings, except where
an order the operator dispatched names the setting (WO-010). The
registration permits `repo.push`, `pr.open` and `pr.thread.resolve` through the
operator grant; everything else stays local. Draft at verified (planning
pass of 2026-10-18, D5): after the session that records
`verification-result pass` has done so, it runs `worktree publish WO-NNN
--target-worktree --draft --branch <type>/<slug> …`, which commits from the
tree, pushes the branch and opens a draft pull request for the operator and
an automated reviewer; the final review reads the threads into the order's
`preview-pr.json`, routes each, and publishes with the same command without
`--draft`, which reuses the branch and the pull request. Starter v0.85.0
carries the form (update pull request #8 of 2026-10-19); WO-011 declares
the disposable output the v0.85.0 close deletes and the core-named-tag
guard, and no target order activates before it merges (a typed hard edge on
WO-005; planning pass of 2026-10-19, D2). DotLn-Angular declares no target
release: the kit titles a declared target Release by the registration id and
the tag, and the operator wants `DotLn Angular`, so the option waits, boarded
as a blocker, on a target display name in the kit (2026-10-19, D4); WO-011's
write-back adds the `## Release close` section with the declared roots.
Rules in force, read back on 2026-10-20: the active `main` ruleset targets
the default branch with no bypass actors. Its `pull_request` rule accepts
merge commits only, `required_status_checks` requires the `checks` run from
GitHub Actions (app 15368), `non_fast_forward` refuses force pushes, and
`deletion` refuses branch deletion. No approving review is required.
DotLn-Angular automatically deletes a pull request's head branch on merge.
The [active branch rules](../evidence/WO-010/readback-dotln-angular.json)
and [ruleset and repository-setting readbacks](../evidence/WO-010/README.md)
record the applied policy.

## Demonstrated architecture

- Standalone bootstrap: `apps/dotln/src/main.ts`.
- Zoneless, router and fetch HTTP providers: `apps/dotln/src/app/app.config.ts`.
- Slim outlet shell and eager home placeholder: `apps/dotln/src/app/app.ts`
  and `apps/dotln/src/app/app.routes.ts`.
- Tagged dependencies: `eslint.config.mjs`; the isolated fixture runner is
  `tools/check-lint-fixtures.mjs`.
- Unit and browser checks: `apps/dotln/src/app/app.spec.ts`,
  `apps/dotln/src/app/home.spec.ts`, `apps/dotln-e2e/src/example.spec.ts`.

Provide functions, injection tokens, lazy feature routes, wrappers,
composites, layouts, mappers, containers, facades, stores, test kits, MSW
handlers, interceptors and guards remain later workstream members.

## Upstream references

- `nrwl/nx@23.3.0 astro-docs/src/content/docs/technologies/angular/` — the
  generators every project is created with (the generator log records each
  invocation).
- `angular/angular@v22.2.3 adev/src/content/best-practices` — the style
  guide and performance guidance house rule 1 defers to.
- `ngrx/platform` — not installed in WO-004; record the selected version when
  later members add SignalStore and the Events plugin.
- `primefaces/primeng` — not installed in WO-004; the vendor choice and its
  license are checked when the feature order introduces wrappers.
