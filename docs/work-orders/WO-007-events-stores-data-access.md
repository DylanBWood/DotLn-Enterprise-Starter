# WO-007 — Events, stores and data access for DotLn-Angular: the tiered event groups in `events`, NgRx SignalStore with the Events plugin, call state and the trinity through `data-access`, `HomeStore` behind `HomeFacade`, the app-tier stores for feature flags, navigation with canonical routes and errors in `state`, HTTP interceptors for base URL, timeouts and errors, MSW in development and in tests, and the action-hygiene check

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Cost:** adds `libs/shared/events`, `libs/shared/data-access`,
`libs/shared/state`, `libs/features/home-data-access`, the MSW worker and
handlers, the interceptors, the hygiene check script, about 70 source files;
adds `@ngrx/signals`, `@angular-architects/ngrx-toolkit` (or a house
`withCallState`), `msw` to the workspace. Removes `HomeFacade`'s static data.
Wall-clock: about 6 to 8 hours of executor work plus the fixed cycle; unknown
until run. Context bytes: WS-001 house rules 8, 11, 16, the NgRx Events plugin
and toolkit declarations, the MSW browser and Node guides, this order, about
150 KB. Commands added in the target: `npm run lint:hygiene`, `npm run msw:init`.
Tokens: unknown until run. Steps: 15. Re-mints: none.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5 and §8),
on the operator's direction of 2026-10-17 (ignored intake capture, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`): NgRx
SignalStore with events for data access, feature orchestration and global
concerns; action hygiene with one-way mapping across tiers and unique UI
events; canonical routes with query parameters; every event visible to every
feature in `shared/events` by source tier; `withCallState` and the
`action`, `actionSuccess`, `actionFailure` trinity; MSW; a feature-flag store
primed from `.env` with query-parameter overrides for quick testing; error
handling, timeouts and the many cases not enumerated. Versions from the
pass's research read (planning document §4): `@ngrx/signals` 22.0.1 with the
Events plugin stable and `withEffects` renamed `withEventHandlers`;
`@angular-architects/ngrx-toolkit` 22.0.0 with `withCallState`; MSW 3.0.3.
Planner-synthesized. Opaque identifier, not a priority. Clean-room screen:
public packages and the operator's own patterns.
**Depends on:** WO-006 merged (hard: `HomeFacade`, the container and the
shell this order wires to stores; the base above is provisional and is set to
WO-006's merge commit by the planning pass that follows it).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-006",
    "relation": "hard",
    "reason": "the facade and container this order connects to stores; the base line is set to its merge commit before activation"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 5, 8, 10, 11, 15, 16, 21); `docs/repositories/dotln-angular.md`;
`docs/operator/README.md`; the target's `docs/ai-reference/*`; the
`@ngrx/signals/events` declarations (`event`, `eventGroup`, `on`,
`withReducer`, `withEventHandlers`, `Dispatcher`, `Events`, `injectDispatch`,
`provideDispatcher`) and `@ngrx/signals/resource` at the installed version;
the toolkit's `withCallState`; the MSW browser and Node integration guides for
3.x (`msw/http`, `msw/browser`, `msw/node`).

**Objective:** state in DotLn-Angular flows one way through typed events:
UI events dispatched by containers through facades, data-access events as
reusable commands with call state, navigation events resolved by one store
through canonical routes, app events for flags and errors; every event is
declared in `@dotln-angular/events` under its tier, the hygiene check counts
the exceptions, `HomeStore` loads tiles through HTTP answered by MSW in
development and in tests, and the shell shows the error store's state.

**Observed gap (dated 2026-10-18; restated by the pass that sets the base):**
no NgRx, no events, no HTTP and no mocks; `HomeFacade` reads static signals.
The Events plugin is stable since NgRx 21 and `withEffects` is now
`withEventHandlers`; the toolkit's `withCallState` exists for 22; MSW 3.x
moved `http` and `HttpResponse` to `msw/http`; `resource()` and
`httpResource()` are stable in Angular 22 (planning document §4).

**Design:**

- `libs/shared/events` (`@dotln-angular/events`, `type:events`): one file
  per group, grouped by tier directory: `app/` (`appShellEvents`,
  `featureFlagEvents`, `errorEvents`), `navigation/` (`navigationEvents`:
  `navigate({ route, query? })`, `back()`, `replaceQuery(query)`),
  `data-access/` (`homeHttpEvents`: `load`, `loadSuccess`, `loadFailure`),
  `ui/` (`homePageEvents`: `opened`, `refreshRequested`, `tileSelected`).
  Each `eventGroup({ source: '[<Tier> <Name>]', events })` with `type<T>()`
  payloads. A spec asserts every source string's tier prefix matches its
  directory and sources are unique. Rule 16's flow table lives in
  `docs/ai-reference/state-rules.md`.
- `libs/shared/data-access` (`@dotln-angular/data-access`, `type:data-access`):
  `withCallState` from the toolkit (if its peer range admits the installed
  Angular; otherwise a house `withCallState` with `setLoading`, `setLoaded`,
  `setError`, recorded), `withCommand({ trigger, success, failure, call })`
  wiring one trinity: on `trigger` set loading and call, on `call` success
  dispatch `success`, on failure dispatch `failure` with a typed `AppError`;
  `provideDotlnHttp()` with interceptors `baseUrlInterceptor` (from
  `EnvironmentConfig.apiBaseUrl`), `timeoutInterceptor` (per request through
  `RequestTimeoutToken`, an `HttpContextToken`, default from the environment)
  and `errorInterceptor` (maps `HttpErrorResponse` and timeouts to
  `errorEvents.httpFailed` with the request's correlation id and never swallows
  the error). `AppError` is a discriminated union (`network`, `timeout`,
  `http`, `unknown`) in `@dotln-angular/models`.
- `libs/shared/models` (`@dotln-angular/models`, `type:models`): `AppError`,
  `Tile` DTOs, `FeatureFlags`.
- `libs/features/home-data-access` (`@dotln-angular/home-data-access`,
  `type:data-access`): `HomeStore = signalStore(withState, withCallState, withReducer(on(homePageEvents.opened, homePageEvents.refreshRequested → trigger)), withCommand(homeHttpEvents.load…), withEventHandlers(…))`
  provided by `provideHomeDataAccess()` in `homeRoutes`' providers; `HomeApi`
  (an injectable using `HttpClient`, typed DTOs); `testing/` with
  `provideHomeStoreTestKit()` and the MSW handlers for home endpoints.
  `HomeFacade` now composes `HomeStore` and `FeatureFlagStore` into `vm`;
  its intents dispatch `homePageEvents`.
- `libs/shared/state` (`@dotln-angular/state`, `type:state`):
  `FeatureFlagStore` (initial flags from `EnvironmentConfig.featureFlags`,
  overrides from the URL query `ff=<flag>:<on|off>` read once at boot,
  `featureFlagEvents.overridden` dispatched for each), `NavigationStore`
  (handles `navigationEvents` through `Router` using `buildRoute` from
  `core`, including `queryParamsHandling`), `ErrorStore` (collects
  `errorEvents`, exposes `latest` and `count`, dismiss intent). Provided by
  `provideDotlnState()` from `app.config.ts`; these are the app-tier
  singletons house rule 10 admits.
- Hygiene check: `tools/scripts/check-event-hygiene.mjs` reads every
  `*.store.ts`, finds `on(<group>.<event>` and `dispatch(<group>.<event>`
  calls, resolves each group's tier by its import path in `events`, and
  refuses a dispatch to the store's own tier or a flow not in rule 16's
  table, except lines carrying `// hygiene-exception: <reason>`, which it
  counts and prints; `npm run lint:hygiene` runs it and CI prints the count.
  Fixture stores under `tools/lint-fixtures/hygiene/` fail it once each.
- MSW: `npm run msw:init` runs `npx msw init apps/dotln/public --save`;
  `apps/dotln/src/mocks/browser.ts` with `setupWorker(...handlers)` started in
  `main.ts` only when `environment.mocks` is true, before `bootstrapApplication`;
  handlers live beside each data-access library's `testing/` and are
  aggregated in `apps/dotln/src/mocks/handlers.ts`; Vitest setup files start
  `setupServer` from `msw/node` with `onUnhandledFrame: 'error'`; Playwright
  runs against `nx serve dotln` with mocks on.
- Shell: the error store's `latest` renders through a `dotln-toast` wrapper
  added to `ui` (vendor behind the wrapper) from the shell layout; the home
  container shows `loading` through `dotln-skeleton` and `error` through
  `dotln-empty-state`.
- Documents: `docs/dev-reference/architecture/events-and-state.md` (tiers,
  flow, trinity, call state, stores, MSW, with one path each) and
  `docs/ai-reference/state-rules.md` (rule 16 as a table, `withEventHandlers`
  not `withEffects`, kits, MSW usage); `conventions.md` gains rules 8, 16.

Rejected: effects chaining data-access events to other data-access events
(axis: rule 16); `resource()` exposed to components (axis: components read
`vm` only; `resource()` may serve inside a store, recorded if used); a global
`ErrorHandler` replacement alone (axis: the store is the single surface and the
interceptor feeds it; `ErrorHandler` still forwards uncaught errors to
`errorEvents.unhandled`).

**Deliverables:** the four libraries and `models`; the home store, API and
handlers; the interceptors; MSW wiring; the hygiene script and fixtures; the
two documents; `docs/evidence/WO-007/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-007.
2. Install `@ngrx/signals`, the toolkit and `msw` at the versions `npx nx report`
   admits; log them. Check: `npm ls @ngrx/signals msw` exits 0.
3. Generate `events`, `models`, `data-access`, `state`, `home-data-access`
   with logged commands and tags. Check: `npx nx show projects` lists them.
4. `events` groups and the tier spec. Check: `npx nx test events` exits 0.
5. `models`, then `data-access` (`withCallState`, `withCommand`,
   interceptors, `provideDotlnHttp()`), each with specs and kits. Check:
   `npx nx test data-access` exits 0.
6. `home-data-access` (`HomeStore`, `HomeApi`, handlers, kit); `HomeFacade`
   rewired; `homeRoutes` providers. Check: `npx nx test home home-data-access`
   exits 0.
7. `state` stores and `provideDotlnState()`; `app.config.ts` wiring. Check:
   `npx nx test state` and `npx nx build dotln` exit 0.
8. Hygiene script, fixtures, `npm run lint:hygiene`, CI step. Check:
   `npm run lint:hygiene` exits 0 and prints the exception count (0), and
   fails on each fixture.
9. MSW init, browser worker, Node setup in each Vitest setup file, handlers
   aggregation. Check: `npx nx serve dotln` logs the worker's enabled line
   (recorded), `npx nx run-many -t test` exits 0 with `onUnhandledFrame: 'error'`.
10. `dotln-toast` wrapper and the shell's error surface; home loading and
    error states. Check: `npx nx e2e dotln-e2e` exits 0 including a test that
    forces `loadFailure` through an MSW handler and sees the empty state and
    the toast.
11. Documents and `conventions.md`. Check: files exist; `npm run i18n:check`
    exits 0.
12. Gate plain and review. Check: passing rows, no mutation (the MSW worker
    file is tracked and unchanged by the gate).
13. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains a store, an event group, an interceptor and a handler
    path. Check: `npm run test:docs`.
14. Commit; `implementation-ready`; draft pull request after the verification
    pass (`feat: add events, signal stores, data access and MSW`).
15. Handoff; at final review `target-records` and
    `worktree publish WO-007 --target-worktree --branch feat/events-and-state --title "feat: add events, signal stores, data access and MSW" --body-file <reviewed body>`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run i18n:check`,
`npx nx e2e dotln-e2e`; in the launchpad order worktree `npm run test:docs`;
then the target gate plain and review once each.

**Acceptance criteria (all required)**

1. Every `eventGroup(` call in the workspace is under `libs/shared/events/src/lib/{app,navigation,data-access,ui}/`
   (`grep -rl "eventGroup(" libs apps --include=*.ts | grep -v "libs/shared/events/src/lib/" | grep -v spec`
   prints nothing) and `npx nx test events` exits 0 with the tier-prefix and
   uniqueness spec.
2. `npm run lint:hygiene` exits 0 on the workspace, prints the exception
   count, and exits nonzero on each fixture under `tools/lint-fixtures/hygiene/`
   (an own-tier dispatch, a data-access to data-access mapping, a UI to UI
   mapping).
3. `grep -rc "withEffects" libs apps --include=*.ts | grep -v ":0"` prints
   nothing; `HomeStore` uses `withCallState`, a reducer on `homePageEvents`
   and event handlers dispatching `homeHttpEvents.loadSuccess` or
   `loadFailure`, and `npx nx test home-data-access` exits 0 with specs for
   success, HTTP failure and timeout through MSW handlers.
4. `grep -c "setupWorker" apps/dotln/src/mocks/browser.ts` is 1,
   `apps/dotln/public/mockServiceWorker.js` exists, every Vitest setup file
   under `libs` and `apps` that any spec's HTTP reaches starts `setupServer`
   with `onUnhandledFrame: 'error'`, and the browser worker starts only when
   `environment.mocks` is true (`grep -c "environment.mocks" apps/dotln/src/main.ts`
   is at least 1).
5. `npx nx e2e dotln-e2e` exits 0 and includes: tiles rendered from the
   mocked endpoint; a forced failure showing the empty state and the toast;
   `?ff=<flag>:on` changing a flagged element; a navigation triggered by
   `navigationEvents.navigate` landing on the canonical route with its query
   parameters.
6. `docs/dev-reference/architecture/events-and-state.md` and
   `docs/ai-reference/state-rules.md` exist and the rules file carries the
   rule 16 flow table.
7. `node scripts/target-gate.mjs WO-007 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs and
`docs/evidence/WO-007/README.md`.

**Known issues and carry-ins:** the base line is provisional until the pass
after WO-006 sets it; `withCallState` source (toolkit or house) is decided at
step 5 from the installed peer ranges; `resource()` inside stores is admitted
only with a decision naming the store.

**Non-goals:** authentication, tokens and permissions (WO-008); a real API;
persistence (`withStorageSync`); devtools beyond `withDevtools` in
development; a second feature.

**Operator-review assumptions:** the operator reads the draft pull request
before final review.
