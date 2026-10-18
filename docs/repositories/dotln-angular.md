# dotln-angular — profile

**Class:** `angular-nx-monorepo`
**Base branch:** `main`
**Checked:** `bc9133e932a00d33c15bc5289d683b8078f51ee4` (the repository's only
commit; no files). WO-004 scaffolds the workspace and refreshes this line and
the commands table against the scaffolded commit.

The launchpad that registers a repository owns its profile; this file is
repo-native convention authority for sessions acting in
`DylanBWood/DotLn-Angular`, read on demand for an order whose `Repository:`
line names `dotln-angular`. Prose here grants no authority beyond the
registration's envelope in `dotln.config.json`.

## Purpose and standards to emulate

The workstream document [WS-001](../workstreams/WS-001-dotln-angular.md)
carries the outcome, the twenty-one house rules and the component taxonomy.
Until WO-004 merges there is no code to emulate; after it, the shell app
`apps/dotln`, the first libraries under `libs/shared/` and the first feature
under `libs/features/home` are the demonstrated standards, and this section
names one path per pattern.

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

## Local application startup

`npx nx serve dotln` serves `apps/dotln` on the port Nx prints; MSW answers
HTTP in development (`environment.mocks` true by default until an API exists).
The app is up when the shell renders and the browser console shows the MSW
worker's "Mocking enabled" line. A `.env` file (ignored; `.env.example` is
committed) primes the local environment file through the primer script WO-005
adds.

## Branch and pull-request policy

Branches: `wo-NNN` while an order runs (the launchpad creates it), `<type>/<slug>`
for the published change (`worktree publish --target-worktree --branch`). Pull
requests target `main`; the merge method is a merge commit whose message is
the pull-request title (repository setting, operator-owned). A session never
pushes to `main`, merges, tags or changes repository settings. The
registration permits `repo.push`, `pr.open` and `pr.thread.resolve` through the
operator grant; everything else stays local. Interim review route: after a
verification pass, the executor pushes `wo-NNN` and opens a draft pull request
so the operator and an automated reviewer can comment before final review;
the published pull request supersedes it and the operator closes the draft.

## Demonstrated architecture

Filled by WO-004 and the members after it, one path per pattern: the zoneless
bootstrap, a provide function, an injection token, a feature's routes export, a
wrapper, a composite, a layout, a mapper, a container, a facade, a store with
events, a test kit, an MSW handler, an interceptor, a guard.

## Upstream references

- `nrwl/nx@<installed tag> docs/shared/packages/angular` — the generators every
  project is created with (the generator log records each invocation).
- `angular/angular@<installed tag> adev/src/content/best-practices` — the
  style guide and performance guidance house rule 1 defers to.
- `ngrx/platform@<installed tag> projects/ngrx.io/content/guide/signals` — the
  SignalStore and Events plugin APIs house rule 8 names.
- `primefaces/primeng@<installed tag> LICENSE.md` — the MIT license the
  wrapper rule depends on.

WO-004 replaces each `<installed tag>` with the version it installed.
