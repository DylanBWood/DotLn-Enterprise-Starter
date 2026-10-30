# dotln-angular — profile

**Class:** `angular-nx-monorepo`

**Base branch:** `main`

**Checked:** `0df9db56`, WO-015's reviewed head (`1eb63058`, the verified tree, and the review's checkbox repair) over WO-019's merge `38f8afd`, open as DotLn-Angular #9; the latest release is `DotLn Angular v0.5.0`.

**Toolchain:** Node 26.9.0, npm 11.19.1, Nx 23.3.0, Angular 22.2.3, TypeScript
6.0.3 and Vitest 5.0.5.

**Libraries:** Transloco 8.4.0, Ramda 0.32.0, Ramda Adjunct 6.1.0, AnalogJS 2.9.1,
Angular Aria and the CDK 22.2.3, Storybook 10.6.3, axe-core for Playwright 4.14.0,
Ajv 8.20.0, the Inter variable font 5.3.0, NgRx Signals 22.0.1, the Angular
Architects NgRx toolkit 22.0.0 and MSW 3.0.3.

**Subject:** one app with sub-apps behind a menu, not wired to core; its data
comes from public mining into its own store (WS-001 §The app and its sub-apps).

**History:** each order's merges, releases, verifications and reviews live in its
records (`docs/dotln/` in the repository; `docs/evidence/`, `docs/verifications/`
and `docs/final-reviews/` here) and in Git, not in this profile.

The launchpad that registers a repository owns its profile; this file is
repo-native convention authority for sessions acting in
`DylanBWood/DotLn-Angular`, read on demand for an order whose `Repository:`
line names `dotln-angular`. Prose here grants no authority beyond the
registration's envelope in `dotln.config.json`.

## Purpose and standards to emulate

The workstream document [WS-001](../workstreams/WS-001-dotln-angular.md)
carries the outcome, the house rules and the component taxonomy. The shell
app is `apps/dotln`; the shared core, utils and i18n libraries, the house UI,
the app layout and the features live under `libs/`, and §Demonstrated
architecture names the file that shows each convention.

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
| e2e     | `npx nx run-many -t e2e`                   | review; optimized mocked app and Storybook behavior/axe checks; needs Chromium |
| visual  | `npx nx e2e-visual dotln-e2e`              | review; tracked macOS pixel baselines, separate macOS CI job |

The target's package scripts `lint`, `test`, `format:check`, `build` and `e2e`
mirror those Nx commands. The registration prefixes checks with
`env NX_DAEMON=false NX_ISOLATE_PLUGINS=false` to keep plugin workers in process. CI runs the workspace checks once
(`nx run workspace-tools:lint`), `typecheck:e2e`, `boards`, `check:bundle` and the
affected projects' lint, test, build and e2e; a macOS job runs the visual suite.

The `workspace-tools` project's uncached `lint` target runs, in this order,
`check:templates`, `check:tokens`, `check:kits`, `i18n:check`,
`typecheck:foundations`, `test:tooling`, `lint:components`,
`check:shared-types`, `check:fixtures` (which runs `catalog:check`),
`lint:hygiene` and `check:scripts`, so the declared gate exercises them
through its existing lint command. `lint:fixtures`, `env:prime`,
`check:bundle` and `perf:sample` are helpers outside the gate. Every tool
script states its purpose and whether it runs in a gate, as a helper or as a
module in the target's `docs/dev-reference/workspace/scripts.md`, which
`check:scripts` enforces (WS-001 rule 26). The e2e target builds the local
Storybook catalog as a dependency; the review gate also runs the visual
target. Baselines under the e2e source tree are tracked inputs, not
disposable output.

Angular's additional disk cache is disabled in the target's `nx.json`
(WO-005-D013): installed Angular 22.2.3's
`node_modules/@angular/build/src/utils/normalize-cache.js` resolves a relative
CLI cache path through a linked worktree's common Git directory to the clone's
base checkout, so a worktree would share the base checkout's cache. Nx caching
stays in `.nx/cache` and Vite uses Angular's separate local path inside the
worktree. Because `@angular/build` enables the dev server's dependency
prebundling only while that cache is enabled, `nx serve` reports prebundling
disabled, and e2e serves production builds instead. An absolute cache path
would keep both at the cost of machine-specific configuration; the comparison
and build readback are in WO-005's evidence and the generator log. Reopen this
choice when Angular supports a portable worktree-local cache setting or when
dev-server rebuild time becomes a concern.

## Local application startup

Run `npm ci`, then `npx nx serve dotln` (or `npm start`). Open the address
Nx prints; the root redirects to `/scene` and shows **The soldier scene**, and
`/board` shows **The actor board** through its own mocked HTTP API. No
environment file, API or account is required: MSW 3 answers the app's own API
in development and in the optimized `mocked` configuration, serving the
`uifa-board-v1` fixture; `.env.example`, `npm run env:prime` and the `local`
serve configuration carry public local settings for whoever wants them.
Production excludes the worker and fixtures and reports HTTP unavailability
when its configured API is absent; it does not read the platform's resident.
Playwright starts its own server at `http://127.0.0.1:4200`, refuses to reuse
an existing process, and checks the heading, document title and absence of
page errors.

## Branch and pull-request policy

Branches: `wo-NNN` while an order runs (the launchpad creates it), `<type>/<slug>`
for the published change (`worktree publish --target-worktree --branch`). Pull
requests target `main`; the merge method is a merge commit whose message is
the pull-request title (repository setting, operator-owned). A session never
pushes to `main` or merges; repository settings change only where an order
the operator dispatched names the setting (WO-010). Target tags and Releases
use the declared release-close route below. The registration permits
`repo.push`, `pr.open`, `pr.thread.resolve` and `release.close` through the
operator grant.

Draft at verified (planning pass of 2026-10-18, D5): after the session that
records `verification-result pass` has done so, it runs
`node scripts/worktree.mjs publish WO-NNN --target-worktree --draft --branch <type>/<slug> --title <title> --body-file <path>`
from the launchpad root, which commits from the tree, pushes the branch and
opens a draft pull request for the operator and an automated reviewer; the
final review reads the threads into the order's `preview-pr.json`, routes
each, and publishes with the same command without `--draft`, which reuses
the branch and the pull request. The kit admits only that node spelling for
a registered target, run plainly from the launchpad root at the phases that
make the draft and closed forms legal: raw `git`, `gh` and `npm` forms, the
`npm run worktree -- publish` spelling included, receive no registered-target
admission, and a helper hidden by a pipe, a redirect, a `cd` or a variable
prefix gets a near-miss advisory and no admission; both are left to host
permissions. The admission compares only the registration's publication
fields (`baseBranch`, `authorityProfile`, `release`, the roots) and the
grants file with `main`'s committed bytes, so an order that edits its own
gate command still publishes. Launchpad identifiers (`WO-NNN`,
`WO-NNN-DNNN`, `FUP-<16 hex>`, `VER-NNN`, `FINAL-NNN`, `REVIEW-NNN`,
`WS-NNN`) refuse in the branch, the commits, the title and the composed
body, so an order's commits name their change and not the order. The
launchpad's `docs/control/outward-vocabulary.json` lists `reviewTerms`,
empty, so `launchpad`, `gem` and `mask` are ordinary words in this
repository; each private local-terms line carries a `refuse:` or `review:`
mode, a review item refusing the publish until the reviewer confirms the
printed digest with `--confirm-terms sha256:<digest>`.

Rules in force on `main` (read back 2026-10-20): the active ruleset targets
the default branch with no bypass actors; its `pull_request` rule accepts
merge commits only, `required_status_checks` requires the `checks` run from
GitHub Actions (app 15368), `non_fast_forward` refuses force pushes, and
`deletion` refuses branch deletion; no approving review is required; the
repository deletes a pull request's head branch on merge. The
[active branch rules](../evidence/WO-010/readback-dotln-angular.json) and
[ruleset and repository-setting readbacks](../evidence/WO-010/README.md)
record the applied policy.

## Release close

WO-012 declares `release: { "policy": "declared", "displayName": "DotLn Angular" }`
on the `dotln-angular` registration. A target order's release close creates
an annotated tag and a GitHub Release titled `DotLn Angular <tag>`, whose
annotation opens with the same title; the releases so far run from `v0.1.0`
to `v0.5.0` on the repository's Releases page. The registration allows
`release.close`, and the operator grant `operator.dotln-angular.publication`
names it in both `effects` and `operations`, alongside `repo.push`,
`pr.open` and `pr.thread.resolve`. The release-close route is authorized to
tag and publish the Release under the operator's direction of 2026-10-19;
merging, repository settings and package publication remain with the
operator. The close reads this launchpad's merged `main` registration and
grant, removes the worktree and branch, and keeps its retained record under
the launchpad's ignored control directory. `**Target release notes:**
reviewed` on the order makes the Release body the order's reviewed
`RELEASE-NOTES.md` at the merged revision, linted as a target's text.

Before any `dotln-angular` order starts, its authority must carry exactly
one `**Target release classification:**` header naming `patch`, `minor` or
`major` on the same line. First count every declaration with
`grep -c '^\*\*Target release classification:\*\*' <order>`, then count recognized
values with
`grep -cE '^\*\*Target release classification:\*\*[[:space:]]*(patch|minor|major)([^[:alnum:]_]|$)' <order>`.
Both counts must be 1. Counting only recognized values misses a second header
with a malformed value. The kit checks recognized headers only at close;
the before-start check also rejects that malformed-duplicate case, which is
boarded in [WO-012-D008](../evidence/WO-012/decisions.md#wo-012-d008).

`baseDisposablePolicy: "judge-only"` keeps the clone's base-checkout output
after the same ignored-material and filesystem judgment. The target
worktree's declared disposable output is still deleted at close. `loadConfig`
composes the class's declaration into this sorted list, which includes the exact generated probe-diagnostic path:

```json
[".angular",".nx","__screenshots__","coverage","dist","docs/control/local/harness/memory-incidents.jsonl","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]
```

The bounded probe wrapper can create the named diagnostic in the target worktree.
Treat it as private: ignore it and exclude it from review packets; only that
exact generated file is disposable, not the surrounding local-control directory.

The match is relative to each checkout, not a directory-name glob:
`test-output/result.json` is covered, while
`apps/example/test-output/result.json` is not. The merged scaffold's build
and Nx Playwright preset use paths under root `dist`; a later generator or
configuration that introduces nested output must identify its exact path
before extending the declaration. Never declare `apps/` or `libs/` as
disposable. The preview and close receipt name the base policy and retained
output; keeping dependencies and caches avoids the base reinstall required
by the default `delete` policy.

`.env`, `.env.*` and
`apps/dotln/src/environments/environment.local.ts` and
`apps/dotln/src/environments/public-config.local.ts` remain undeclared.
An undeclared ignored file refuses close in either checkout. A target order
removes generated local environment files after the checks that create them
and records the removal; local material in the base checkout remains the
operator's responsibility. `judge-only` also refuses when retained base
output collides with a path the fetched base tracks:
`judge-only output collides with fetched tracked paths`. The base merge uses
`--no-overwrite-ignore`. Move the output outside the conflicting paths before
retrying; changing the registration back to `delete` is a separate reviewed
policy change, not an automatic cleanup fallback.

The launchpad's `contributions.operatorAuthor` declares the public author
identity read from `git log --no-merges -1 --format='%an <%ae>' main`.
The launchpad `worktree publish` helper compares every commit author in
`origin/main..HEAD` with that declaration: the operator's own commits need
no sign-off, while every other author needs a matching `Signed-off-by`
trailer. Mutable Git configuration grants no exemption; the target publish
route itself does not run that rule.

The launchpad clone's shared Git configuration sets
`remote.upstream.tagOpt` to `--no-tags`; this is local to that clone and is
not transmitted by its pull request. Ordinary upstream fetches therefore
do not follow the starter's tags. A named starter release is previewed from
a non-tag ref:
`git fetch --no-tags upstream refs/tags/vX.Y.Z:refs/upstream-releases/vX.Y.Z`.
Use that ref for the detached preview worktree and `preview --from`; no local
tag is created or deleted. Keep starter/core tags off this fork's `origin`.
The original setting readbacks are in
[WO-011 evidence](../evidence/WO-011/README.md). Each target order's
host-qualification record names the exact publish invocation it ran, the
hook's decision and the host's; a prompt or denial reopens the
literal-host-rules fallback through a self order.

## Demonstrated architecture

- Standalone bootstrap: `apps/dotln/src/main.ts`.
- Zoneless, router and fetch HTTP providers: `apps/dotln/src/app/app.config.ts`.
- Projected shell and lazy board route: `apps/dotln/src/app/app.ts`
  and `apps/dotln/src/app/app.routes.ts`.
- Tagged dependencies: `eslint.config.mjs`; the isolated fixture runner is
  `tools/check-lint-fixtures.mjs`.
- Unit and browser checks: `apps/dotln/src/app/app.spec.ts`,
  `apps/dotln-e2e/src/board.spec.ts`, `apps/dotln-e2e/src/storybook.spec.ts`
  and the two `*.visual.spec.ts` files.
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

- Fragment: `libs/shared/ui/src/lib/fragments/badge/badge.ts`.
- Template: `libs/shared/ui/src/lib/templates/button/button.ts`.
- Wrapper: `libs/shared/ui/src/lib/wrappers/tabs/tabs.ts`.
- Composite: `libs/features/board/src/lib/composites/board-row/board-row.ts`.
- Layout: `libs/dotln/shell/src/lib/layouts/app-layout/app-layout.ts`.
- Sub-app menu templates:
  `libs/dotln/shell/src/lib/templates/sub-app-menu/sub-app-menu.ts` and
  `sub-app-menu-group.ts` beside it. The app projects groups and router links;
  the menu owns the navigation landmark and the group owns its list fallback.
- Lazy sub-app routes: `libs/features/scene/src/lib/scene.routes.ts` and
  `libs/features/machinery/src/lib/machinery.routes.ts`; Machinery's arriving
  container composes the house empty-state template. Scene, Machinery and Tools
  are the menu groups; the root redirects to the soldier scene at `/scene`, and
  the actor board keeps its own route at `/board`.
- Mapper: `libs/features/board/src/lib/mappers/cell-value-mapper/cell-value-mapper.ts`.
- Container: `libs/features/board/src/lib/containers/board-page/board-page.ts`.
- Facade: `libs/features/board/src/lib/facades/board.facade.ts`.
- Data path: the app's own `GET <apiBaseUrl>/uifa-board-v1` through
  `libs/features/board-data-access/src/lib/board-api.ts`, `BoardStore`, facade
  and container. MSW serves the unchanged fixture from
  `libs/features/board-data-access/testing/src/lib/board-handlers.ts` in
  development and tests. Production displays unavailable on HTTP failure.
- Store: `libs/features/board-data-access/src/lib/board-store.ts`.
- UI event group: `libs/shared/events/src/lib/ui/board-page-events.ts`.
- Interceptors: `libs/shared/data-access/src/lib/interceptors.ts`.
- Persistence: `libs/shared/data-access/src/lib/with-persisted-state.ts`, with
  the browser binding in `storage-token.ts` beside it.
- App stores: `libs/shared/state/src/lib/`; shell notices:
  `libs/dotln/shell/src/lib/containers/shell-notices/shell-notices.ts`.
- Role and convention checks: `eslint.config.mjs`, `tools/check-taxonomy-fixtures.mjs`,
  `tools/scripts/check-component-order.mjs` and `tools/scripts/check-shared-types.mjs`.
- Component catalog: `.storybook/`, component-local stories, and
  `docs/dev-reference/workspace/storybook.md`.

- Catalog contract: `libs/shared/models/src/lib/toolbox.ts` and the closed
  `tool-v1` schema in `libs/shared/catalog/src/schema/`. Eight checkpoints supply
  3,463 definitions with source places, relations, hooks and verification notes.
  The loader retains a v0 compatibility reader for one release and the explicit
  `CatalogToken` provider seam. `tools/scripts/catalog/join-maps.mjs` validates
  all eleven declared source digests before writing, resolving only unique exact
  relation titles within a work; schema, inventory and relation checks cover
  the generated data.
- Tools routes: `libs/features/tools/src/lib/tools.routes.ts`; `/tools` shows
  the works and last reading. `/tools/catalog` composes the shelf, contents,
  reading, search facets and history through its event-backed facade. The last
  ten readings and chosen location persist; the search query and back stack do
  not. Reading mappers present the full source definition and application faces
  as prose. The final app wildcard renders a translated not-found page.
- Concept studies: the Arrive example in `libs/features/tools/src/lib/` is
  authored separately from source data. It adds a time-scrubbed motion
  illustration, ordinary and RxJS pseudocode, limits and public references.
  Standalone explanations use Angular `@defer` on first expansion; closed
  sections create no explanation view, and visited sections retain their view on
  collapse. Design comparisons and their outcome live in WO-019 evidence.
- Scene engine: `libs/shared/scene-engine` is pure TypeScript tagged `type:util`,
  so every later scene reuses it. `interpreter.ts` reads a catalog tool through its
  parameter names, with no code per tool, and `run.ts` keeps a live run and its
  replay the same. A run is a seed and a list of steps; `trial-known-outcome.json`
  pins its frame hashes. `docs/dev-reference/architecture/scene.md` holds the rules.
- Renderer seam: `libs/features/scene/src/lib/renderers/scene-renderer.ts` is what
  a painter implements, with canvas, text and null painters behind it, so a later
  painter changes neither the engine nor the feature.
- Drawing wrapper: `libs/features/scene/src/lib/wrappers/scene-canvas/` owns the only
  `<canvas>`. A wrapper may own a browser drawing API, as `component-taxonomy.md`
  records.
- Field skin: `libs/shared/ui/src/styles/_field-skin.scss` is a token layer under
  `[data-skin='field']` over the plain skin, reaching the shell around the page
  through `html:has()`; `[data-full-bleed]` in the app's styles is the one rule that
  is not a token.
- Concept mapping: `docs/dev-reference/architecture/concept-mapping.md` records
  the UIFA engineer's exploration purpose, cross-area metaphors, diagnostic
  mappings, RxJS modelling and candidate graduation to platform behavior.
  Typed status measures the current toy contract, not conceptual usefulness.
- Menu composition: `@dotln-angular/ui/menu` keeps menu behavior and its small
  controlled filter composite on the lazy Tools path; overlay providers are
  supplied there instead of through the eager UI provider.
- Performance: `npm run check:bundle` asserts route placement and reports package
  attribution; `npm run perf:sample` records controlled local journeys. The
  target's performance guide distinguishes local evidence from field Core Web
  Vitals and assigns ordinary calibration to the implementing session.
- Curated utilities: the house R/RA entry points expose application-used
  functions only, with runtime surface checks and compiler assertions.

Where each area came from, for the reader who wants its record: the
workspace, tooling and CI (WO-004); core, utils, i18n and the test kits
(WO-005); the taxonomy, the house `ui` library, the shell layout and the
board (WO-006); events, stores, data access, MSW and persistence (WO-007);
the sub-app menu and the arriving routes (WO-013); the catalog pipeline
(WO-014) and the reading surface over it (WO-019); the scene engine and the
soldier scene (WO-015). Guards are WO-008's; the records and replay libraries,
the twin model and the toy shelf are WO-016 to WO-018's.

## Upstream references

- `nrwl/nx@23.3.0 astro-docs/src/content/docs/technologies/angular/` — the
  generators every project is created with (the generator log records each
  invocation).
- `angular/angular@v22.2.3 adev/src/content/best-practices` — the style
  guide and performance guidance house rule 1 defers to.
- `ngrx/platform@22.0.1` (`@ngrx/signals` with the Events plugin) and
  `angular-architects/ngrx-toolkit@22.0.0` (`withCallState`, `withStorageSync`,
  `withDevtools`), installed by WO-007 (WO-007-D002), with MSW 3.0.3 answering
  the app's own API in development and tests; the versions are read from the
  installed declarations.
- `angular/components@v22.2.3 src/aria` and `src/cdk` — the behavior
  libraries WO-006 wraps (Angular Aria, stable since v22 and MIT; the CDK's
  overlay, a11y and dialog entry points); no vendor component library is
  installed (planning pass of 2026-10-21, D2). PrimeNG 22.x ships under the
  PrimeUI License with a required key, and its last MIT release peers
  Angular 21, so it is not a candidate.
- `DylanBWood/DotLn@a54f8d6520ed54d05e5209455c67541562716404 packages/console/uifa-board-v1.schema.json`,
  `packages/console/README.md` and `docs/product/04-interfaces.md`
  (§Plural UI hosts, one projection contract; §Actor board v0; §Later
  console hosts; §Console parity contract v1) — the view model the `board`
  feature renders and the host rules WS-001 §The console restates; WO-006
  pins the schema's commit and SHA-256 in its decisions and the generator
  log, and the pin is reported stale by `resume: status`, never a live
  dependency; the app keeps the shape as its own API's response contract
  for the board. The exact schema SHA-256 is
  `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`; the
  launchpad carries the same bytes as a kit file,
  `packages/console/uifa-board-v1.schema.json`, beside
  `packages/console/runtime-status-v1.schema.json` (SHA-256
  `600bb73ab38b663a8356f305e6080729689b71f99bdd32665f634d7537b29bed`), and
  the target's committed copy stays, because this repository never depends
  on the launchpad.
- `DylanBWood/DotLn@c670e6288ecb221ef2416cef06f920006866bc5d packages/skeleton/src/console-loopback.ts`
  (core WO-225, starter v0.93.0) — the resident's loopback serves
  `GET /uifa-board-v1` and `GET /runtime-status-v1` to a caller on
  `127.0.0.1` with the bound port in `Host`, a local `Origin` or none, and
  `Authorization: Bearer <token>` from the resident's
  `console-loopback-v1.json` descriptor; `503` in the console refusal shape
  when a projection is unavailable. WO-007 retains only this response shape for the app's own API. The
  resident and its token are not a data source for this app.
