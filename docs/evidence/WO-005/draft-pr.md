# WO-005

DotLn-Angular gains its three foundation libraries. `@dotln-angular/core` holds the typed environment, the injection tokens, the canonical routes, the base-path token and provider composition; `@dotln-angular/utils` holds the `R` and `RA` namespaces with corrected composition types and specs derived from the upstream test suites; `@dotln-angular/i18n` holds Transloco loading, the missing-key handler and the house `t` pipe. Each library has a `testing` secondary entry point with a test kit for every injectable and token. The `dotln` app now boots through `provideDotlnCore()` and `provideDotlnI18n()`, renders its heading through `'home.title' | t` and loads the home page lazily.

## What a reviewer gets

- `libs/shared/core`: `EnvironmentConfig` with `EnvironmentConfigToken` and `provideEnvironmentConfig()`, `BasePaths` and `HomePaths` with `buildRoute()`, `AppBasePathToken` read from `<base href>` (the one root-provided factory, pending the operator's ruling), `provideDotlnCore()` and the application adapter `provideDotlnI18n()`. Core may now depend on i18n; i18n stays independent of core.
- `libs/shared/i18n`: `provideI18n()` with a loader that serves only configured languages beneath the base path, a missing-key handler that throws in development and returns the key in production, `TPipe` (`t`) and the re-exported `translateSignal`.
- `libs/shared/utils`: `R` and `RA` re-export Ramda 0.32.0 and Ramda Adjunct 6.1.0, with house declarations for `filter` and `isNonEmptyString`; each used function has one upstream-derived spec with its license header, and `THIRD-PARTY-NOTICES.md` holds both license texts.
- Environments and proxy: development, production and generated local environments with file replacements; `.env.example` and `npm run env:prime`, which validates public settings and writes the ignored local environment and a local proxy; `apps/dotln/proxy.conf.json` wired to `serve`.
- Enforcement: the `dotln/token-names` lint rule and `check:tokens` share one inspector; `check:templates`, `check:kits`, `i18n:check` and the foundation type checks run in CI and in the uncached `tools:lint` target, each with a negative fixture.
- Build cache: `nx.json` disables the Angular CLI disk cache so a Git worktree never writes the base checkout's cache; Nx task caching stays in `.nx/cache`.
- Documentation: `docs/dev-reference/architecture/foundation.md`, `docs/ai-reference/foundation-rules.md`, the updated conventions and generator log, and a paraphrased provenance paragraph in the WO-004 record.

## Validation

- The declared review gate (install, lint, test, format, build, e2e) passed with no tracked-byte mutation.
- The independent verification met all eight acceptance criteria on uncached runs: 39 unit tests, 17 tooling tests, the production and local builds, the Chromium end-to-end test, each structural check on the workspace and on its negative fixture, and a live request through the development proxy.
- `npm audit` reports no vulnerabilities.

## Limits and follow-ups

- This draft is for review before final acceptance; the final review pushes the reviewed commit to this branch and marks the pull request ready.
- Verification recorded seven follow-ups, none blocking. The widest are a readonly lint rule that does not reach app or library files, and the `R` and `RA` namespaces carrying nearly all of Ramda and Ramda Adjunct into the production bundle.
- No release is recorded for this change in this repository.
