# dotln-angular — profile

**Class:** `angular-nx-monorepo`
**Base branch:** `main`
**Checked:** `2e983e8ad40252b90453b5b03ae65f7f49525df5` (WO-005's reviewed
commit of 2026-10-20 over the base `651d76ff68e9b3a38fe770226deb634bca28b54c`,
WO-004's merge commit). Node 26.9.0, npm 11.19.1, Nx 23.3.0, Angular 22.2.3,
TypeScript 6.0.3 and Vitest 4.1.12 were observed, with Transloco 8.4.0, Ramda
0.32.0, Ramda Adjunct 6.1.0 and AnalogJS 2.9.1 added by WO-005. The commands
below passed the declared review gate at that commit; the order's evidence
records the preflight and gate results.

The launchpad that registers a repository owns its profile; this file is
repo-native convention authority for sessions acting in
`DylanBWood/DotLn-Angular`, read on demand for an order whose `Repository:`
line names `dotln-angular`. Prose here grants no authority beyond the
registration's envelope in `dotln.config.json`.

## Purpose and standards to emulate

The workstream document [WS-001](../workstreams/WS-001-dotln-angular.md)
carries the outcome, the twenty-one house rules and the component taxonomy.
WO-004 demonstrates the shell app in `apps/dotln`. WO-005 adds shared core,
utils and i18n in its target worktree; the examples below identify their source
paths. Feature libraries remain later orders.

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

WO-005 adds `env:prime`, `i18n:check`, `check:templates`, `check:tokens`,
`check:kits` and `typecheck:foundations`. The `tools` project's uncached `lint`
target runs the three structural checks, translation extraction, foundation
compiler checks, negative lint fixtures and tooling tests, so the declared
gate exercises them through its existing lint command.

Cache finding, 2026-10-20: installed Angular 22.2.3's
`node_modules/@angular/build/src/utils/normalize-cache.js` resolves a relative
CLI cache path through a linked worktree's common Git directory to the clone's
base checkout. The target's `nx.json` disables that additional Angular disk
cache and retains Nx caching in `.nx/cache`; Vite uses Angular's separate local
path inside the worktree. Disabling that cache also disables the dev server's
Vite dependency prebundling: `@angular/build`'s dev-server options enable
prebundling only while the cache is enabled, so every `nx serve` and the e2e
dev server print that prebundling will not be used because caching is
disabled (VER-001 F6, WO-005-D013). An absolute Angular cache path also stays
local and keeps both the disk cache and prebundling, but would require
machine-specific configuration. WO-005 chooses portable isolation at that
whole cost and records the comparison and build readback in its evidence and
the target generator log. No registration argv change is needed. Reopen this
choice when Angular supports a portable worktree-local cache setting or when
dev-server rebuild time becomes a concern.

## Local application startup

Run `npm ci`, then `npx nx serve dotln` (or `npm start`). Open the address
Nx prints; the home page shows the heading **DotLn**. The scaffold requires
no environment file, API or account. Playwright starts its own server at
`http://127.0.0.1:4200`, refuses to reuse an existing process, and checks the
heading, document title and absence of page errors. WO-005 adds `.env.example`,
`npm run env:prime` and the `local` serve configuration for public local
settings. Default development still requires no environment file or API.
MSW belongs to a later workstream member.

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
WO-005; planning pass of 2026-10-19, D2). DotLn-Angular declared no target
release while the kit titled a declared target Release by the registration id
and the tag (2026-10-19, D4); starter v0.87.0 (update pull request
#14 of 2026-10-20) carries `release.displayName`, and WO-012
declares the policy and `DotLn Angular` (planning pass of 2026-10-20, D2).
The same starter admits only the node spelling of the helper for a
registered target, `node scripts/worktree.mjs publish WO-NNN --target-worktree …`
run from the launchpad root at the phases that make the draft and closed
forms legal; raw `git`, `gh` and `npm` forms, the
`npm run worktree -- publish` spelling included, receive no
registered-target admission and are left to host permissions. WO-006's draft
and final publishes use the node spelling. The release-close policy below
records the declared roots.
Rules in force, read back on 2026-10-20: the active `main` ruleset targets
the default branch with no bypass actors. Its `pull_request` rule accepts
merge commits only, `required_status_checks` requires the `checks` run from
GitHub Actions (app 15368), `non_fast_forward` refuses force pushes, and
`deletion` refuses branch deletion. No approving review is required.
DotLn-Angular automatically deletes a pull request's head branch on merge.
The [active branch rules](../evidence/WO-010/readback-dotln-angular.json)
and [ruleset and repository-setting readbacks](../evidence/WO-010/README.md)
record the applied policy.

## Release close

Starter v0.87.0 (update pull request #14, 2026-10-20) adds
three things this section carries once WO-012 merges: a declared target
release titled `DotLn Angular <tag>` (the first tag `v0.1.0`) with
`release.close` in the allowed effects; `baseDisposablePolicy: "judge-only"`,
under which the close keeps the base checkout's output after the same
judgment and still refuses undeclared ignored material there; and
`contributions.operatorAuthor`, the commit identity the kit's publish helper
exempts from its sign-off rule. The first target close ran on 2026-10-20 for
WO-005 under the default policy: it deleted `.nx` (119 files), `dist` (10)
and `node_modules` (37,877) in the target worktree and found nothing to
delete in the base checkout, which held no ignored file; nothing was
reinstalled. The v0.87.0 README previews a named starter release through a
non-tag ref (`git fetch --no-tags upstream refs/tags/vX.Y.Z:refs/upstream-releases/vX.Y.Z`),
and the local release checks exclude an annotated starter tag by its
message, so the named-tag deletion step below is no longer needed. Until
WO-012 merges, the paragraphs below describe the registration as WO-011 left
it.

WO-011 declares the class's disposable output. `loadConfig` composes it into
the registration as this sorted list:

```json
[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]
```

Starter v0.85.0 deletes ignored files beneath these paths in both the target
worktree and the clone's base checkout at close, without moving them to
scratch. The base checkout consequently needs `npm ci` again before use
after its dependencies are deleted; its build caches must also regenerate.
The match is relative to each checkout, not a directory-name glob:
`test-output/result.json` is covered, while
`apps/example/test-output/result.json` is not. The merged scaffold's build
and Nx Playwright preset use paths under root `dist`; a later generator or
configuration that introduces nested output must identify its exact path
before extending the declaration. Never declare `apps/` or `libs/` as
disposable.

`.env`, `.env.*` and
`apps/dotln/src/environments/environment.local.ts` remain undeclared.
An undeclared ignored file refuses close; the base refusal may name only
its top-level directory. WO-005's sessions remove the two generated local
environment files from its target worktree after the checks that create
them and record that removal (the 2026-10-19 planning pass §8.2). Local
material in the base checkout remains the operator's responsibility.

The registration has no `release` key and continues to deny `release.close`.
Target publication therefore creates no target tag or Release. This was
boarded pending a kit option that titles the Release `DotLn Angular`;
starter v0.85.0 used the registration id and tag, and starter v0.87.0 admits
the display name WO-012 declares. The planning pass's
[target-name blocker](../planning/latest-upstream-2026-10-19.md#6-decisions-and-noop-records)
reopens when that option exists.

The launchpad clone's shared Git configuration sets
`remote.upstream.tagOpt` to `--no-tags`; this is local to that clone and is
not transmitted by its pull request. Ordinary upstream fetches therefore
do not follow the starter's tags. An explicit named-tag preview still
creates its requested tag: for example, fetch with
`git fetch --no-tags upstream tag v0.85.0`, run that release's preview, then
delete that preview tag with `git tag -d v0.85.0`. Keep starter/core tags off this
fork's `origin`. The readbacks are in
[WO-011 evidence](../evidence/WO-011/README.md).

WO-005's verified-phase draft publish is the first live observation of the
kit's publication admission. Its session records the hook's decision from
the session journal, whether the host prompted, and which interim trust
entries were present. Under the 2026-10-19 planning decision D6 those entries
stay for WO-005. An admitted hook decision is followed by a planning pass
asking the operator to remove them; WO-006's draft then tests whether the
host honors that admission without the entries. A prompt or denial there
reopens the literal-host-rules fallback through a self order. WO-011 runs
no live episode and makes no host-qualification claim.

## Demonstrated architecture

- Standalone bootstrap: `apps/dotln/src/main.ts`.
- Zoneless, router and fetch HTTP providers: `apps/dotln/src/app/app.config.ts`.
- Slim outlet shell and lazy home route: `apps/dotln/src/app/app.ts`
  and `apps/dotln/src/app/app.routes.ts`.
- Tagged dependencies: `eslint.config.mjs`; the isolated fixture runner is
  `tools/check-lint-fixtures.mjs`.
- Unit and browser checks: `apps/dotln/src/app/app.spec.ts`,
  `apps/dotln/src/app/home.spec.ts`, `apps/dotln-e2e/src/example.spec.ts`.
- Provider composition:
  `libs/shared/core/src/lib/providers/provide-dotln-core.ts`.
- Typed environment and token:
  `libs/shared/core/src/lib/environment/environment-config.ts`.
- Route enums, builder and base-path token:
  `libs/shared/core/src/lib/paths/routes.ts` and `app-base-path.ts`.
- Reusable i18n: `libs/shared/i18n/src/lib/provide-i18n.ts`; application adapter:
  `libs/shared/core/src/lib/i18n/provide-dotln-i18n.ts`. Core depends on i18n;
  shared i18n remains independent of core.
- House utility declarations: `libs/shared/utils/src/lib/ramda/filter.ts` and
  `ramda-adjunct/is-non-empty-string.ts`, backed by upstream-derived runtime
  examples and separate compiler assertions.
- Test kits: `libs/shared/core/testing/src/lib/core-test-kits.ts` and
  `libs/shared/i18n/testing/src/lib/i18n-test-kits.ts`, exported through each
  library's `testing` secondary entry point.

Wrappers, composites, layouts, mappers, containers, facades, stores, MSW
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
