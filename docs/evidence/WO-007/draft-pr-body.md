## Summary

State in the app now flows one way through typed events. The actor board loads over HTTP from the app's own API in the `uifa-board-v1` shape, answered by MSW in development, in tests and in a new optimized `mocked` build. The board's selected panel survives a reload, and the shell shows request failures and application errors as notices.

- `libs/shared/events` (`@dotln-angular/events`): six event groups in four tier directories (`app`, `navigation`, `data-access`, `ui`), with a spec that checks each source's tier prefix and that sources are unique.
- `libs/shared/data-access` (`@dotln-angular/data-access`): toolkit call state, a `withCommand` feature that wires one action, success and failure trinity, `withPersistedState` over an injected storage token bound by `provideDotlnStorage()`, and the base-URL, timeout and error interceptors behind `provideDotlnHttp()`.
- `libs/shared/state` (`@dotln-angular/state`): `FeatureFlagStore` (environment flags, with `?ff=<flag>:<on|off>` overrides only where the environment admits them), `NavigationStore` (canonical routes with query and fragment), `ErrorStore`, and an application `ErrorHandler` that keeps Angular's console report of the original error and adds a shell notice.
- `libs/features/board-data-access` (`@dotln-angular/board-data-access`): `BoardStore` and `BoardApi` for `GET <apiBaseUrl>/uifa-board-v1`, with MSW handlers for the recorded fixture, its unavailable variant, a `503` refusal and a timeout. `BoardFacade` composes the stores, and the fixture provider token is removed. The selected panel persists under the browser storage key `dotln-angular.board`, and nothing else is written.
- Shell notices: a `dotln-toast` wrapper in `ui` and a `shell-notices` container in the shell library, which tell request failures from application errors. The board shows loading through the skeleton and errors through the empty state.
- MSW 3.0.3: the browser worker starts only when the environment enables mocks, through an awaited dynamic import whose failure falls through to bootstrap. Vitest fails any unhandled request. The production build carries neither the worker nor the mocks.
- Checks and documents: `npm run lint:hygiene` (the one-way tier flow check, with three negative fixtures), `npm run msw:init`, `npm run check:scripts`, and the documents `events-and-state.md`, `state-rules.md` and `scripts.md`. The conventions gain house rules 8, 12 and 16.

## Verification

At the tree this draft carries, the independent verification ran these commands without the Nx cache:

- `npx nx run-many -t lint test build`: 14 projects, 95 unit tests and 24 tooling tests.
- `npx nx e2e dotln-e2e`: 40 browser tests against the served `mocked` build and the Storybook catalog.
- `npx nx e2e-visual dotln-e2e`: 33 screenshot comparisons, with no baseline changed.
- `npx nx build dotln --configuration=production` and `--configuration=mocked`: the production output has no worker and no mock code, and the mocked output carries the worker.
- `npm run format:check`, `lint:fixtures`, `lint:components`, `lint:hygiene` (0 exceptions), `check:fixtures`, `i18n:check`, `check:scripts`, `check:kits`, `check:shared-types` and `typecheck:e2e`.

Specs were also checked against deliberate regressions in a scratch copy. The unhandled-request spec fails when the MSW strategy is `bypass` or absent. The error handler spec fails without the console report, and the notice spec fails when every notice uses the request-failure text.

## Known follow-ups

None of these blocks the change.

- `NavigationStore` always builds the board route. Map route ids to paths when a second route arrives.
- The persisted-state feature writes the default selection when the board store is created, before any selection.
- Dismissal has two paths: the facade calls the store directly, and the store's dismissed-notice reducer is never dispatched.
- Devtools are decided at runtime, so their code ships in the production bundle although it never runs there.
- The toast wrapper has no Storybook story, and the failure state has no axe check.

## Notes

The app's own API is mocked until its data store exists, and the `uifa-board-v1` response shape is kept so that store replaces the handler and nothing else. Until then, a production build with no API at its configured base URL shows the board's unavailable state and a notice; no recorded fallback ships in production. The screenshot baselines are macOS only.
