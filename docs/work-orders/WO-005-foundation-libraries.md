# WO-005 — Foundation libraries for DotLn-Angular: `core` (the typed environment with its production file replacement and `.env` primer, injection tokens, paths and canonical routes, the base-path token, provider composition), `utils` (the `R` and `RA` namespaces with composition typing and ported specs), `i18n` (Transloco with the house `t` pipe), the test-kit convention through secondary entry points, and the proxy configuration

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Cost:** adds three libraries under `libs/shared/` with their `testing`
entry points, the environment files and primer, the proxy configuration, the
lint rules for tokens and `#private`, about 40 source files; adds `ramda`,
`ramda-adjunct`, `@types/ramda`, `@jsverse/transloco` and `dotenv` to the
workspace. Removes the placeholder page's inline strings (moved to `en.json`).
Wall-clock: about 4 to 6 hours of executor work plus the fixed cycle; unknown
until run. Context bytes: WS-001, the generator log, this order, the Transloco
and Ramda type declarations, about 80 KB. Commands added in the target:
`npm run env:prime`, `npm run i18n:check`. Tokens: unknown until run. Steps:
13. Re-mints: none.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5 and §8),
on the operator's direction of 2026-10-17 (ignored intake capture, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`):
functional, declarative, reactive first with Ramda and Ramda Adjunct behind
`import { R, RA } from '@dotln-angular/utils'`; Transloco for all user-facing
text; environment file with a typed `EnvironmentConfig`, `.env` priming and
`environment.prod.ts` with file replacements; providers for everything and
injection tokens with the `dotln-angular.<scope>.<lib>.<name>` description;
`BasePaths` and `<Feature>Paths` enums with lazy loading; `AppBasePathToken`
from `<base href>`; test kits for nearly every injectable; proxy configuration;
`#private`, `readonly`, `no-unused-vars` warn with the underscore opt-out.
Versions from the pass's research read (planning document §4).
Planner-synthesized. Opaque identifier, not a priority. Clean-room screen:
public packages, their public test suites (MIT and BSD-3-Clause) and the
operator's own patterns.
**Depends on:** WO-004 merged (hard: the workspace, its tags and its gate
exist; this order's base is set to WO-004's merge commit by the planning pass
that follows it; the base above is provisional).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-004",
    "relation": "hard",
    "reason": "the scaffolded workspace this order adds libraries to; the base line is set to its merge commit before activation"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 3, 4, 5, 7, 9, 10, 11, 12, 13); `docs/repositories/dotln-angular.md`;
`docs/operator/README.md`; the target's `docs/ai-reference/README.md` and
`docs/dev-reference/workspace/conventions.md` as WO-004 left them; the Nx
generator help for `@nx/angular:library` and
`@nx/angular:library-secondary-entry-point`; the Transloco provider and loader
API of the installed version; the Ramda and Ramda Adjunct type declarations.

**Objective:** `apps/dotln` boots from `provideDotlnCore()`, reads a typed
`EnvironmentConfig` through `EnvironmentConfigToken` with a production
replacement and a `.env` primer, builds every URL from `BasePaths` through the
canonical route builders and `AppBasePathToken`, renders its one page's text
through Transloco's `t` pipe, and imports `R` and `RA` from
`@dotln-angular/utils` with types that compose; every injectable introduced
has a test kit in its library's `testing` entry point and a spec that uses it.

**Observed gap (dated 2026-10-18, target `main` at `bc9133e9`; restated by
the pass that sets the base):** the workspace has no libraries, no
environment type, no i18n and no utilities; `tsconfig.base.json` has no
`@dotln-angular/*` paths. Transloco 8.4.0's pipe is named `transloco`, so the
operator's `'key' | t` form needs a house pipe; Transloco has no typed keys
(the typed-keys lint is a later member). Ramda 0.32.0 ships no types
(`@types/ramda` 0.32.0 re-exports `types-ramda`); Ramda Adjunct 6.1.0 ships
its own types and is BSD-3-Clause.

**Design:**

- `libs/shared/core` (`@dotln-angular/core`, tags `scope:shared,type:core`),
  generated with `nx g @nx/angular:library core --directory=libs/shared/core --importPath=@dotln-angular/core --tags=scope:shared,type:core --style=scss --unitTestRunner=vitest-analog`
  (Nx's default runner for a non-buildable library; the exact command goes to
  the generator log). Contents: `environment/` with `EnvironmentConfig`
  (`production`, `apiBaseUrl`, `mocks`, `featureFlags: Record<string, boolean>`,
  `i18n: { defaultLang, availableLangs }`, `auth` placeholder typed as
  `unknown` until WO-008), `EnvironmentConfigToken = new InjectionToken<EnvironmentConfig>('dotln-angular.shared.core.environment-config')`
  and `provideEnvironmentConfig()`; `paths/` with `BasePaths` (`Home = 'home'`)
  and the `HomePaths` placeholder, `buildRoute()` returning
  `{ commands, queryParams }` from enums and typed parameters;
  `AppBasePathToken` (`dotln-angular.shared.core.app-base-path`) with
  `provideAppBasePath()` reading `document.querySelector('base')?.getAttribute('href') ?? '/'`;
  `providers/provide-dotln-core.ts` composing them. Every token is
  `PascalCaseToken` with the description string of house rule 10;
  `providedIn: 'root'` is used only for `AppBasePathToken`'s factory and the
  decision records the operator's pending ruling.
- Environments in the app: `apps/dotln/src/environments/environment.ts`
  (development defaults, `mocks: true`), `environment.prod.ts`
  (`production: true`, `mocks: false`), `environment.local.ts` (ignored,
  generated), with `fileReplacements` in the `production` configuration and
  a `local` configuration replacing with the generated file. `tools/scripts/prime-environment.mjs`
  reads `.env` through `dotenv` and writes `environment.local.ts` from
  `EnvironmentConfig` keys prefixed `DOTLN_`; `.env.example` lists them;
  `npm run env:prime` runs it. Secrets never enter the committed files.
- `libs/shared/utils` (`@dotln-angular/utils`, `type:util`): `ramda.ts`
  exporting `R` as a namespace re-export of `ramda` and `ramda-adjunct.ts`
  exporting `RA`, through `public_api.ts` as `export * as R from './ramda'`
  only where the namespace form preserves generics; where a function's
  curried generic loses inference through the namespace, a typed wrapper in
  `utils` restores it and the decision names the function. For every Ramda or
  Ramda Adjunct function the workspace uses, one spec ported from the
  library's public test suite (attribution comment with the upstream path and
  license) runs against the house export, so the re-export cannot silently
  break a function.
- `libs/shared/i18n` (`@dotln-angular/i18n`, `type:i18n`): `provideDotlnI18n()`
  wrapping `provideTransloco` with a `TranslocoHttpLoader` reading
  `/i18n/<lang>.json` relative to `AppBasePathToken`, `defaultLang` and
  `availableLangs` from `EnvironmentConfig`, `reRenderOnLangChange`, a
  missing-key handler that throws in development; the house `TPipe`
  (`name: 't'`, extending `TranslocoPipe`) so templates read `'home.title' | t`;
  `translateSignal` re-exported for class code. `apps/dotln/public/i18n/en.json`
  holds the shell's strings; `npm run i18n:check` runs
  `transloco-keys-manager find` against the templates with
  `--emit-error-on-extra-keys`.
- Test kits: each library gets a `testing` secondary entry point
  (`nx g @nx/angular:library-secondary-entry-point --library=<project> --name=testing`),
  importing as `@dotln-angular/<lib>/testing`, exporting
  `provide<Name>TestKit(overrides?)` functions that return the providers a
  spec needs plus handles (`{ providers, config }`), and
  `provideDotlnI18nTestKit()` on `TranslocoTestingModule`. The spike in step
  7 confirms the entry point compiles and lints under Nx's wiring; the
  fallback is a sibling `<lib>-testing` library, recorded.
- Lint: `@typescript-eslint/no-unused-vars` already at `warn` with the
  underscore patterns (WO-004); `no-restricted-syntax` for TypeScript
  `private`; `@typescript-eslint/prefer-readonly` (type-aware) on class
  members; `@angular-eslint/prefer-signals`; a custom
  `no-restricted-syntax` rule refusing `new InjectionToken(` whose first
  argument does not start with `dotln-angular.` (selector on the literal).
- Proxy: `apps/dotln/proxy.conf.json` mapping `/api` to the
  `DOTLN_API_PROXY_TARGET` from the primed environment, wired to `serve`.
- Page: the WO-004 placeholder page reads its heading through `'home.title' | t`.

Rejected: a `shared/testing` library holding every kit (axis: a kit lives
beside the thing it provides, so a library's `testing` entry point is the
platform's own convention); exposing Transloco's `transloco` pipe directly
(axis: the operator's `t` form is the house canonical way and the alias is
one class); typed translation keys here (axis: not day one, by direction).

**Deliverables:** the three libraries with `testing` entry points; the
environment files, primer and proxy; the lint rules; `en.json`; the generator
log lines; `docs/dev-reference/architecture/foundation.md` and
`docs/ai-reference/foundation-rules.md`; `docs/evidence/WO-005/`.

**Execution plan:**

1. Base guard: in the target clone, `git fetch origin && git rev-parse origin/main`
   must equal the base this order's `Repository:` line names; if not, stop
   and report that a planning pass must set the base (the line is set by the
   pass after WO-004 merges). Then `npm run worktree -- start WO-005 docs/work-orders/WO-005-foundation-libraries.md`.
   Check: `npm run resume -- status --json` shows the base.
2. `docs/dev-reference/workspace/generator-log.md`: append each generator
   command before running it. Check: three library lines and three
   secondary-entry-point lines after step 7.
3. `libs/shared/core`: generate; write `environment/`, `paths/`,
   `providers/`, `public_api.ts`, `index.ts`. Check: `npx nx test core` and
   `npx nx lint core` exit 0.
4. `apps/dotln/src/environments/*`, `tools/scripts/prime-environment.mjs`,
   `.env.example`, `project.json` configurations (`production`
   `fileReplacements`, `local`), `package.json` `env:prime`. Check:
   `cp .env.example .env && npm run env:prime && npx nx build dotln --configuration=local`
   exits 0 and `environment.local.ts` is ignored (`git check-ignore -q apps/dotln/src/environments/environment.local.ts`).
5. `libs/shared/utils`: generate; `ramda.ts`, `ramda-adjunct.ts`,
   `public_api.ts`; the ported specs under `src/lib/upstream-specs/` with
   attribution comments. Check: `npx nx test utils` exits 0 and
   `grep -rl "ported from" libs/shared/utils/src/lib/upstream-specs | wc -l`
   equals the number of functions `public_api.ts` names as used.
6. `libs/shared/i18n`: generate; provider, loader, `TPipe`, missing-key
   handler; `apps/dotln/public/i18n/en.json`; `package.json` `i18n:check`.
   Check: `npx nx test i18n` and `npm run i18n:check` exit 0.
7. Test kits: generate the `testing` entry point for each library; write the
   kits; one spec per library uses its kit. Check: `npx nx run-many -t lint test`
   exits 0; on failure of the entry-point wiring, record the decision and use
   sibling `<lib>-testing` libraries.
8. Lint rules in `eslint.config.mjs` as the Design states, with
   `tools/lint-fixtures/private-keyword.ts` and `tools/lint-fixtures/bad-token.ts`
   expected to fail under `npm run lint:fixtures`. Check: `npm run lint:fixtures`
   exits 0.
9. `apps/dotln`: `app.config.ts` uses `provideDotlnCore({ environment })` and
   `provideDotlnI18n()`; the page uses `| t`; `proxy.conf.json` wired. Check:
   `npx nx build dotln` and `npx nx e2e dotln-e2e` exit 0.
10. Documentation: `docs/dev-reference/architecture/foundation.md` (the
    environment, tokens, paths, utils, i18n, kits, with one path each),
    `docs/ai-reference/foundation-rules.md` (imperative rules: token naming,
    `provide*()` only, `| t` for strings, `R`/`RA` imports, kits for
    injectables), `docs/dev-reference/workspace/conventions.md` updated with
    house rules 7, 9, 10, 11. Check: each file exists and
    `npm run i18n:check` still exits 0.
11. Gate: `node scripts/target-gate.mjs WO-005` and `--review`. Check:
    passing rows, no mutation.
12. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the paths for a provide function, a token, the routes
    enums and a test kit. Check: `npm run test:docs` exits 0.
13. Commit; `implementation-ready`; after the verification pass, the draft
    pull request (`feat: add the core, utils and i18n foundation libraries`);
    handoff per §Discipline; at final review `target-records` and
    `worktree publish WO-005 --target-worktree --branch feat/foundation-libraries --title "feat: add the core, utils and i18n foundation libraries" --body-file <reviewed body>`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`, `npm run i18n:check`,
`npx nx e2e dotln-e2e`; in the launchpad order worktree `npm run test:docs`;
then `node scripts/target-gate.mjs WO-005` and `--review` once each.

**Acceptance criteria (all required)**

1. `npx nx show projects` lists `core`, `utils` and `i18n`, each tagged
   `scope:shared` and its `type:*` from house rule 3 (read from the project
   configuration), and `tsconfig.base.json` maps `@dotln-angular/core`,
   `@dotln-angular/utils`, `@dotln-angular/i18n` and the three
   `@dotln-angular/<lib>/testing` paths (or, under the recorded fallback, the
   three `@dotln-angular/<lib>-testing` paths).
2. `grep -rhoE "new InjectionToken<[^>]*>\('[^']+'" libs apps | grep -vc "'dotln-angular\."`
   prints 0, and `npm run lint:fixtures` exits 0 by observing the `#private`
   and token-name rules fail on their fixtures.
3. `cp .env.example .env && npm run env:prime` writes
   `apps/dotln/src/environments/environment.local.ts`, which Git ignores;
   `npx nx build dotln --configuration=production` and
   `--configuration=local` both exit 0; `grep -c fileReplacements apps/dotln/project.json`
   is at least 1.
4. `grep -rhoE "'[a-z0-9.-]+' \| t\b" apps/dotln/src libs | wc -l` is at
   least 1 and `grep -rE ">[^<{]*[A-Za-z]{3,}[^<}]*<" apps/dotln/src/app --include=*.html --include=*.ts | grep -v "| t" | wc -l`
   prints 0 (no literal user-facing text outside the pipe), and
   `npm run i18n:check` exits 0.
5. Every spec file under `libs/shared/*/src` that provides an injectable does
   so through a `provide*TestKit` import from a `testing` entry point
   (`grep -rL "TestKit" $(grep -rl "TestBed.configureTestingModule" libs/shared --include=*.spec.ts)`
   prints nothing), and `npx nx run-many -t test` exits 0.
6. `libs/shared/utils/src/lib/upstream-specs/` holds one ported spec per
   function `public_api.ts` documents as used, each with an attribution
   comment naming the upstream file, and `npx nx test utils` exits 0.
7. `node scripts/target-gate.mjs WO-005 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs and
`docs/evidence/WO-005/README.md`.

**Known issues and carry-ins:** the base line is provisional until the pass
after WO-004 sets it (planning document §6); the `providedIn: 'root'` default
awaits the operator's ruling and is recorded as a decision; Nx secondary entry
points for non-buildable libraries are a spike with a recorded fallback.

**Non-goals:** UI components or a vendor library (WO-006); NgRx, events, MSW
(WO-007); authentication (WO-008); typed translation keys (later member); a
second language file beyond `en.json`.

**Operator-review assumptions:** the operator accepts `providedIn: 'root'`
limited to the base-path token until they rule; the operator reads the draft
pull request before final review.
