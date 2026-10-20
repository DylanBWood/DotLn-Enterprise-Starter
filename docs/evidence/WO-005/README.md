# WO-005 executor evidence

The operator dispatched `resume: next` on 2026-10-20. The target is the paired
DotLn-Angular `wo-005` worktree at base
`651d76ff68e9b3a38fe770226deb634bca28b54c`. The source is uncommitted at
executor handoff. The base and draft-route guards passed before implementation;
WO-011's hard dependency was met. No publication or account change is part of
this executor result.

The target generator log records the three library and three testing
secondary-entry-point invocations. [Decisions](decisions.md) records the
core/i18n dependency split, the corrected utility typing contract, the cache
comparison, generated-runner repairs, environment/extractor choices and the
operator's future UI direction. [Self-review](self-review.md) records both
independent workers and their focused rereviews.

## Implemented surfaces

- `libs/shared/core`: typed environment, injection tokens, base path, canonical
  route enums/builders and application provider composition. Its i18n adapter
  derives the reusable translation configuration from core's tokens.
- `libs/shared/i18n`: independent configuration, Transloco loading and missing
  keys, the `t` pipe and `translateSignal`, with no import from core.
- `libs/shared/utils`: `R`/`RA` namespaces, type-only repairs for `filter` and
  `isNonEmptyString`, and four attributed upstream-derived spec files.
- Each library has its generated `testing` secondary entry point. Compiler
  checks exercise those entry points and the house utility type assertions.
- App development/production/local environments, validated `.env` primer,
  tracked default proxy and generated local proxy, translated lazy home page.
- Shared token-name lint inspection, private/readonly/signal rules, template
  and kit checks, negative fixtures and CI integration through `tools:lint`.
- Developer and agent references, updated conventions, license notices and
  the authorized paraphrase of WO-004's target provenance.

## Executed preflight

All probes used the bounded wrapper, one at a time. The final target preflight
ran at `2026-10-20T15:01:01.333Z`–`2026-10-20T15:01:24.241Z`, after the
implementation corrections:

| Command | Observed result |
| --- | --- |
| `npx nx format:check` | Exit 0 |
| `npx nx run-many -t lint test build --output-style=static` | Exit 0; 11 tasks, 0 cache hits |
| `npm run lint:fixtures` | Exit 0; forbidden dependency, TypeScript private, bare/aliased/namespace bad tokens rejected; valid controls admitted |
| `npm run i18n:check` | Exit 0; no missing or extra keys |
| `npx nx e2e dotln-e2e --output-style=static` | Exit 0; one fresh Chromium test |
| `npm audit --json` | Exit 0; zero vulnerabilities across the full dependency tree |

The unit results were 24 utils, 6 core, 7 i18n and 2 app tests: **39 passed**.
The uncached `tools:lint` target also passed six TypeScript configurations
and **17 tooling tests**. Its extractor negatives deliberately report missing
and extra keys and verify nonzero results without altering catalogs.

The three structural commands exited 0 on the workspace. Separate CLI probes
observed exit 1 for the bad-token, literal-text, missing-provider-spread and
missing-exported-kit fixtures. The fixture runner additionally invokes real
ESLint against bad and valid controls in an isolated Nx graph.

## Environment and cache evidence

`cp .env.example .env` and `npm run env:prime` generated the local environment
and proxy. `git check-ignore` confirmed the local environment files are
ignored. Uncached local and production builds both exited 0. The two
session-created local environment files were removed after the checks.
Production disables mocks, local configuration selects the generated files,
and the serve-target readback confirms `proxy.conf.json` is wired.

The installed Angular 22.2.3 cache normalizer was compared with its relative
default, an absolute worktree path and disabled disk caching. Relative
resolution selected the base checkout; an absolute path stayed within the
worktree; disabling the additional Angular cache preserved portable target
configuration. Nx's `.nx/cache` remains enabled. The base checkout's
`.angular` directory was absent before and after both builds. The profile
and generator log record the tradeoff and reopening condition.

## Static and structural readbacks

`npx nx show projects --json` includes `core`, `utils` and `i18n`. Each
project has `scope:shared` and its specified type tag, and all six public and
testing aliases exist. Four utility spec files match the four used functions.
Both required license texts exist. The target WO-004 document contains
exactly one `paraphrased` marker.

No nested scratch repository was found outside ignored dependency/runtime/
cache/intake roots in either worktree. `git diff --check` passed for the
target. The standalone structural checks and library specs establish the
token, provider, translation and test-kit claims.

## Gate and lifecycle record

The launchpad document preflight passed all 14 fresh tasks in 13,480 ms,
recorded at `2026-10-20T15:05:45.065Z`, before the first target gate. Its
three advisories concern existing WO-001/WO-003 records.

| Declared target gate | Result | Commands | Duration |
| --- | --- | --- | --- |
| `node scripts/target-gate.mjs WO-005` | PASS | install, lint, test, format | 15,774 ms |
| `node scripts/target-gate.mjs WO-005 --review` | PASS | install, lint, test, format, build, e2e | 18,545 ms |

The review row was recorded at `2026-10-20T15:06:51.953Z`, reference
`target-gate:a658b13b-9fc8-4ad7-ae67-b41943d6aac5`, target tree
`76cead3ad2a501eebc09b7bef926bce496fa655e`. Both gates observed no
non-ignored-byte or HEAD mutation. The canonical readback confirmed the
review row at the current tree and its coverage of the plain selection.
Nx reused eligible task caches; the preflight above executed all 11
lint/test/build tasks and the browser test freshly.

The installed target harness passed its seven-surface integrity check using
the base launchpad runtime named by its existing installation. The handoff
records the launchpad complete gate; a final document gate follows the last
handoff edit.

Release preparation returned the target-order no-release outcome.
Verification, the verified-phase draft publication and final review remain
their separate dispatches. No live GitHub workflow or publication-admission
observation is claimed here.

The UI direction is recorded as follow-up `FUP-6d2755b3ac7c8ab9`, assigned to
the next UI planning pass before WO-006. It calls for reconciling current
PrimeNG licensing and the operator's house-component preference, evaluating
Angular Aria and amending the judged UI plan through the planning route.
