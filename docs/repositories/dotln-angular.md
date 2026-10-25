# dotln-angular — profile

**Class:** `angular-nx-monorepo`
**Base branch:** `main`
**Checked:** `99a30befa150e5d77a64259013e62b9d0372270e` (WO-013's reviewed
commit of 2026-10-25, the verified draft commit its final review accepted
without a change, over the base `2ab4f28501628cf95dd0102c42440fd7de9f8055`,
WO-007's merge commit; WO-013 adds no dependency, so the versions below are
unchanged from WO-007's reviewed commit `db4d648d`).
Node 26.9.0, npm 11.19.1, Nx 23.3.0, Angular 22.2.3, TypeScript 6.0.3 and
Vitest 5.0.5 (with its UI and coverage packages, aligned from 4.1.12 by WO-007
for MSW 3) were observed, with Transloco 8.4.0, Ramda 0.32.0, Ramda Adjunct
6.1.0 and AnalogJS 2.9.1 added by WO-005, Angular Aria 22.2.3, the CDK 22.2.3,
Storybook 10.6.3, axe-core for Playwright 4.14.0, Ajv 8.20.0 and the Inter
variable font 5.3.0 added by WO-006, and NgRx Signals 22.0.1, the Angular
Architects NgRx toolkit 22.0.0 and MSW 3.0.3 added by WO-007. The declared
review gate, with the catalog and visual commands below, passed at that
commit's tree with no tracked-byte mutation; the order's evidence records the
preflight and gate results. WO-006 merged as pull request #4
(`90fa6e8d879cb499107ff79d1051c200d17c1cbc`, 2026-10-21T21:11Z) and closed
at that commit as `DotLn Angular v0.1.0` (Release published
2026-10-21T21:14:44Z); its decisions, verification and final review live
once, under `docs/dotln/` in this repository, bound from the launchpad's
control segment. WO-007's base is that merge commit (planning pass of
2026-10-23); WO-007 merged as pull request #5
(`2ab4f28501628cf95dd0102c42440fd7de9f8055`, 2026-10-24T16:23Z) and closed at
that commit as `DotLn Angular v0.2.0` (Release published 2026-10-24T16:26Z),
its records under `docs/dotln/` at `4304a9d5`. WO-013 activated on 2026-10-24
at the provisional base `bc9133e9`; its verified draft (parent `2ab4f285`, 83
files) was refused at publish because the kit described the change from the
activation base (WO-013-D008); its fix integrated `main` at starter v0.96.1,
whose publish describes the change from the merge base of the subject and
this repository's `main` (core WO-230; WO-013-D010), VER-002 passed at tree
`dc997234…` and its draft publish opened pull request #6 (`99a30bef…`, 83
files, CI green), and FINAL-002 found every criterion met and no new
defect but was refused by the kit's pre-review commit lint, which still ranged 17 commits from the activation base and met two
merged subjects of 78 and 90 characters (WO-013-D015); starter v0.97.1 (core
WO-231) lints the described range and reached the launchpad's `main` on
2026-10-25 (#28). The repair integrated it through starter v0.99.0 and
main `04c45cfa` on 2026-10-25, reproduced the passing one-commit lint and
seven regression controls, and preserved the target tree (WO-013-D016,
D017). VER-003 reproduced the corrected lint and republished #6 at the same
tree, and FINAL-003 accepted the order on 2026-10-25 with every criterion
met and no new finding, its unit and browser suites rerun uncached at
`99a30bef` (WO-013-D018, D019). The final publish pushed that commit and the
records commit `61cf1ae9` over the draft and marked #6 ready the same day. The 2026-10-24 planning pass restated the app's subject on the
operator's decisions (one app with sub-apps behind a menu, not wired to
core, its data from public mining into its own store; WS-001 §The app and
its sub-apps), moved WO-007's board route to the app's own API with
`uifa-board-v1` kept as the response shape, and filed WO-013 to WO-018
(the sub-app shell, the toolbox catalog, the soldier scene, the machinery
view, the digital twin's patience lane, The Art of War map and the toy
shelf) with provisional bases; since starter v0.96.1 an order activated on
its provisional base publishes right, and a pass may set the base to the
predecessor's merge commit without being required to (the 2026-10-24 second
planning pass, D4 and D7).

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
paths. WO-006 adds the house UI, app layout and recorded-board feature.

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
`env NX_DAEMON=false NX_ISOLATE_PLUGINS=false` to keep plugin workers in process. CI also runs `npm run lint:fixtures` to prove that a
forbidden dependency is rejected, `npm run test:tooling` for title validation
and literal argument handling, `npm run typecheck:e2e` for the NodeNext
Playwright files, and `npm run boards` to print visible boards.

WO-005 adds `env:prime`, `i18n:check`, `check:templates`, `check:tokens`,
`check:kits` and `typecheck:foundations`. The `tools` project's uncached `lint`
target runs the three structural checks, translation extraction, foundation
compiler checks, negative lint fixtures and tooling tests, so the declared
gate exercises them through its existing lint command. WO-006 adds
`lint:components`, `check:shared-types` and `check:fixtures` to that target.
The e2e target builds the local Storybook catalog as a dependency; the review
gate also runs the visual target. Baselines under the e2e source tree are
tracked inputs, not disposable output.

Cache finding, 2026-10-20: installed Angular 22.2.3's
`node_modules/@angular/build/src/utils/normalize-cache.js` resolves a relative
CLI cache path through a linked worktree's common Git directory to the clone's
base checkout. The target's `nx.json` disables that additional Angular disk
cache and retains Nx caching in `.nx/cache`; Vite uses Angular's separate local
path inside the worktree. Disabling that cache also disables the dev server's
Vite dependency prebundling: `@angular/build`'s dev-server options enable
prebundling only while the cache is enabled, so `nx serve` reports that
prebundling is disabled. WO-006 e2e serves production builds instead (VER-001 F6, WO-005-D013). An absolute Angular cache path also stays
local and keeps both the disk cache and prebundling, but would require
machine-specific configuration. WO-005 chooses portable isolation at that
whole cost and records the comparison and build readback in its evidence and
the target generator log. No registration argv change is needed. Reopen this
choice when Angular supports a portable worktree-local cache setting or when
dev-server rebuild time becomes a concern.

## Local application startup

Run `npm ci`, then `npx nx serve dotln` (or `npm start`). Open the address
Nx prints; the root redirects to `/board` and shows **The actor board** through its own mocked HTTP API. No environment file, API or account is required. Playwright starts its own server at
`http://127.0.0.1:4200`, refuses to reuse an existing process, and checks the
heading, document title and absence of page errors. WO-005 adds `.env.example`,
`npm run env:prime` and the `local` serve configuration for public local
settings. Default development still requires no environment file or API.
WO-007 uses MSW 3 in development and the optimized `mocked` configuration,
serving the unchanged `uifa-board-v1` fixture from the app's own API route.
Production excludes the worker and fixtures and reports HTTP unavailability
when its configured API is absent. It does not read the platform's resident.

## Branch and pull-request policy

Branches: `wo-NNN` while an order runs (the launchpad creates it), `<type>/<slug>`
for the published change (`worktree publish --target-worktree --branch`). Pull
requests target `main`; the merge method is a merge commit whose message is
the pull-request title (repository setting, operator-owned). A session never
pushes to `main` or merges; repository settings change only where an order
the operator dispatched names the setting (WO-010). Target tags and Releases
use the declared release-close route below. The registration permits
`repo.push`, `pr.open`, `pr.thread.resolve` and `release.close` through the
operator grant. Draft at verified (planning
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
and the tag (2026-10-19, D4); starter v0.87.0 carries
`release.displayName`, taken by this fork inside starter v0.88.0 (update
pull request #16 of 2026-10-21, after the draft #14 of 2026-10-20 was
closed as superseded), and WO-012 declares the policy, `DotLn Angular` and
the operator grant naming `release.close` (planning passes of 2026-10-20,
D2, and 2026-10-21, D2).
The same starter admits only the node spelling of the helper for a
registered target, `node scripts/worktree.mjs publish WO-NNN --target-worktree …`
run from the launchpad root at the phases that make the draft and closed
forms legal; raw `git`, `gh` and `npm` forms, the
`npm run worktree -- publish` spelling included, receive no
registered-target admission and are left to host permissions. WO-006's draft
and final publishes use the node spelling. The release-close policy below
records the declared roots.
Starter v0.90.0 and v0.91.0 (taken by #21 on 2026-10-23) change what the
publish judges: the registered-target admission compares only the
registration's publication fields (`baseBranch`, `authorityProfile`,
`release`, the roots) and the grants file with main's committed bytes, so
an order that edits its own gate command still publishes; a helper hidden
by a pipe, a redirect, a `cd` or a variable prefix gets a near-miss
advisory and no admission; launchpad identifiers (`WO-NNN`, `WO-NNN-DNNN`,
`FUP-<16 hex>`, `VER-NNN`, `FINAL-NNN`, `REVIEW-NNN`, `WS-NNN`) refuse in
the branch, the commits, the title and the composed body, so an order's
commits name their change and not the order; the launchpad's
`docs/control/outward-vocabulary.json` lists `reviewTerms`, empty since the
planning pass of 2026-10-23, so `launchpad`, `gem` and `mask` are ordinary
words in this repository; and each private local-terms line carries a
`refuse:` or `review:` mode, a review item refusing the publish until the
reviewer confirms the printed digest with `--confirm-terms sha256:<digest>`.
WO-006's publishes of 2026-10-21 ran under the earlier rules and are
recorded in its host-qualification record.
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

WO-012 declares `release: { "policy": "declared", "displayName": "DotLn Angular" }`
on the `dotln-angular` registration under starter v0.88.0. A target order's
release close creates an annotated tag and a GitHub Release titled
`DotLn Angular <tag>`; the first is `DotLn Angular v0.1.0` while the target
has no release baseline. The tag annotation opens with the same title. The
registration allows `release.close`, and the existing operator grant
`operator.dotln-angular.publication` names it in both `effects` and
`operations`, alongside `repo.push`, `pr.open` and `pr.thread.resolve`.
The release-close route is authorized to tag and publish the Release under
the operator's direction of 2026-10-19; merging, repository settings and
package publication remain with the operator. The close reads this
launchpad's merged `main` registration and grant. The first close ran on
2026-10-21 for WO-006: tag `v0.1.0`, Release `DotLn Angular v0.1.0`, the
worktree and branch removed, the retained record under the launchpad's
ignored control directory. From WO-007 on, `**Target release notes:**
reviewed` on the order makes the Release body the order's reviewed
`RELEASE-NOTES.md` at the merged revision (starter v0.91.0), linted as a
target's text.

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
The UI planning pass adds the headers to WO-006,
WO-007 and WO-008 and WO-006's typed dependency on WO-012 before activation.

`baseDisposablePolicy: "judge-only"` keeps the clone's base-checkout output
after the same ignored-material and filesystem judgment. The target
worktree's declared disposable output is still deleted at close. `loadConfig`
composes the class's declaration into this sorted list, unchanged by WO-012; WO-006 adds only the exact generated probe-diagnostic path below:

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
trailer. Mutable Git configuration grants no exemption. WO-012's final
review records the helper's `PASS contribution-signoff` lines before
publication; the target publish route itself does not run that rule.

The launchpad clone's shared Git configuration sets
`remote.upstream.tagOpt` to `--no-tags`; this is local to that clone and is
not transmitted by its pull request. Ordinary upstream fetches therefore
do not follow the starter's tags. The current README's named-release
preview uses a non-tag ref:
`git fetch --no-tags upstream refs/tags/v0.88.0:refs/upstream-releases/v0.88.0`.
Use that ref for the detached preview worktree and `preview --from`; no local
tag is created or deleted. Keep starter/core tags off this fork's `origin`.
The original setting readbacks are in
[WO-011 evidence](../evidence/WO-011/README.md).

WO-006's verified-phase draft publish uses
`node scripts/worktree.mjs publish WO-006 --target-worktree --draft` with its
reviewed branch, title and body-file arguments, run from the launchpad root;
the final publish uses the same helper without `--draft`. Raw `git`, `gh`
and `npm` forms receive no registered-target admission. WO-005's draft was
admitted with the interim trust entries present; the operator removed those
entries on 2026-10-20, as the planning pass of 2026-10-21 records. WO-006's
session records the exact helper invocation, the hook's decision and whether
the host prompts or denies after that admission, with no private journal
contents copied. A prompt or denial reopens the existing literal-host-rules
fallback through a self order. WO-012 runs no live target episode and makes
no host-qualification claim.

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
  `libs/features/machinery/src/lib/machinery.routes.ts`; arriving containers
  compose the house empty-state template. Scene, Machinery and Tools are the
  menu groups; the root continues to redirect to the actor board at `/board`.
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

WO-007 adds stores, MSW handlers and interceptors; WO-013 adds the sub-app menu
and arriving routes. Guards remain WO-008; the catalog, the scene engine, the
records and replay libraries, the twin model and the toy shelf are WO-014 to
WO-018's.

## Upstream references

- `nrwl/nx@23.3.0 astro-docs/src/content/docs/technologies/angular/` — the
  generators every project is created with (the generator log records each
  invocation).
- `angular/angular@v22.2.3 adev/src/content/best-practices` — the style
  guide and performance guidance house rule 1 defers to.
- `ngrx/platform@22.0.1` (`@ngrx/signals` with the Events plugin) and
  `angular-architects/ngrx-toolkit@22.0.0` (`withCallState`, `withStorageSync`,
  `withDevtools`), installed by WO-007 (WO-007-D002), with MSW 3.0.3 answering
  the app's own API in development and tests; the versions were read from the
  installed declarations and the planning pass's research (2026-10-18, §4).
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
  dependency; the same bytes ship as a kit file of the launchpad since
  starter v0.93.0 (verified at v0.94.0 by the 2026-10-24 pass), and the
  app keeps the shape as its own API's response contract for the board. The exact schema SHA-256 is
  `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`.
  Since starter v0.93.0 the launchpad carries the same schema as a kit
  file, `packages/console/uifa-board-v1.schema.json`, byte-identical to
  that digest, beside `packages/console/runtime-status-v1.schema.json`
  (SHA-256 `600bb73ab38b663a8356f305e6080729689b71f99bdd32665f634d7537b29bed`),
  so the pin's provenance is a kit file from WO-007 on; the target's
  committed copy stays, because this repository never depends on the
  launchpad.
- `DylanBWood/DotLn@c670e6288ecb221ef2416cef06f920006866bc5d packages/skeleton/src/console-loopback.ts`
  (core WO-225, starter v0.93.0) — the resident's loopback serves
  `GET /uifa-board-v1` and `GET /runtime-status-v1` to a caller on
  `127.0.0.1` with the bound port in `Host`, a local `Origin` or none, and
  `Authorization: Bearer <token>` from the resident's
  `console-loopback-v1.json` descriptor; `503` in the console refusal shape
  when a projection is unavailable. WO-007 retains only this response shape for the app's own API. The
  resident and its token are not a data source for this app.
