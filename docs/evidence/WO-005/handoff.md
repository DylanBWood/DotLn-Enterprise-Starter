# WO-005 executor handoff

The foundation libraries are implemented in the paired DotLn-Angular `wo-005`
worktree. Core composes the typed environment, routes and providers; shared
i18n owns reusable translation behavior and core adapts its application
configuration; utils preserves upstream runtime functions while correcting
the demonstrated type defects. Testing entry points, environment priming,
proxy configuration, enforcement, documentation and notices are in place.
[Evidence](README.md), [decisions](decisions.md) and
[self-review](self-review.md) record the observations and corrections.

**Criterion 1:** met — `npx nx show projects --json` includes core, utils and i18n; executable readbacks confirmed each `scope:shared` and specified type tag, and all six production/testing aliases. All three generated testing secondary entry points compile and lint; no fallback was needed.
**Criterion 2:** met — `npm run check:tokens` passed on the workspace and exited 1 on bad-token.ts. `npm run lint:fixtures` observed the expected private-keyword and token failures through real ESLint, including aliases and namespace constructors with valid controls. The root tools project has a lint target exercised by the declared gate. ESLint and the standalone token check share one inspector.
**Criterion 3:** met — `.env.example` priming wrote the ignored environment.local.ts and generated local proxy; local and production builds both passed. Production and local file replacements are present. The two session-created environment files were removed after their checks. Environment parsing regressions validate values and diagnostics.
**Criterion 4:** met — the lazy home template uses `'home.title' | t`, and the document title uses the house translateSignal export. `npm run check:templates` passed the workspace and exited 1 on literal-text.ts. `npm run i18n:check` passed; its negative regressions detect missing and extra keys without editing catalogs.
**Criterion 5:** met — `npm run check:kits` passed the workspace and exited 1 on both missing-provider-spread and missing-exported-kit fixtures. Every introduced injectable and token has an exported kit. The library specs use those kits; 39 unit tests passed across core, utils, i18n and the app. Lexical-scope regressions prevent unrelated kit aliases from validating one another.
**Criterion 6:** met — the four used functions named in public_api.ts have four attributed upstream-derived spec files, and THIRD-PARTY-NOTICES.md contains both MIT and BSD-3-Clause texts. The 24 utility tests and separate compiler assertions passed, including the intended number[] result, variable-length filtered tuples, optional dictionary keys, narrowing, currying, placeholders, dispatch and transducer examples.
**Criterion 7:** met — apps/dotln/proxy.conf.json maps `/api`; an executable project readback confirms the serve target names proxy.conf.json. Local serve selects the proxy generated from DOTLN_API_PROXY_TARGET.
**Criterion 8:** met — both declared target gates passed without non-ignored-byte or HEAD mutation. The review row is target-gate:a658b13b-9fc8-4ad7-ae67-b41943d6aac5 at tree 76cead3ad2a501eebc09b7bef926bce496fa655e. The complete target preflight and launchpad `npm run test:docs` ran before the first target gate; the document preflight passed 14 fresh tasks. The final document gate after this handoff is consumed by implementation-ready.

self-review: found 5; fixed 5; recorded 0 — criteria adversary 2 findings, design reviewer 2 findings, executor 1 additional finding. Both workers closed their findings in focused rereviews with 0 remaining or new findings. The two fresh read-only workers used the requested gpt-6.1-sol/max pin; no descendants were launched. Counts and static-review limits are in self-review.md.

`npm test -- --review` passed the installed launchpad's complete review
selection: 7 fresh tasks, 0 failures, no unrun suites, unchanged code identity
and build outputs. Its row was recorded at `2026-10-20T15:08:28.633Z`,
duration 38,779 ms, code identity
`ea976e67e7a0c819bf24e9060e0a94acf2c17105a1cf807ea864a66cdba58f99`.
This included 26,338 ms waiting for host lanes. The target gates separately
establish the application result. The full target dependency audit reported
zero vulnerabilities. The target harness passed all seven integrity surfaces.

Goal alignment: the result matches the operator's foundation and house-typing
intent. The same-day correction restores the intended type assertions and
repairs the declarations rather than accepting their defects. Independent
review and negative fixtures expose convention bypasses instead of treating
passing happy paths as completion. The cache comparison selected portable
worktree isolation with an explicit incremental-cache tradeoff. No encountered
implementation defect remains deferred.

The operator's later UI direction is recorded in WO-005-D006 and follow-up
FUP-6d2755b3ac7c8ab9 for the next UI planning pass before WO-006: evaluate a
house-owned component library with Angular Aria, reconcile the PrimeNG
licensing assumption and amend the judged plan through its planning route.
The adjacent implementation queue is empty at revision 0.

Release preparation returned the target-order no-release outcome. Source
remains uncommitted under the executor rule. Verification, the draft
publication after its pass and final review remain separate dispatches.
No live GitHub workflow or publication-admission result is claimed.

The executor read the current authored outputs and the generated-artifact
checks. Completion attestation uses the current-session readback:
codex-cli 0.163.0, gpt-6-astra, max, source codex-session-readback.
Usage was read from the harness at the `2026-10-20T15:08:58.886Z` cutoff,
source codex-transcript-counter, scope dispatch; cost is unavailable.
Final counters remain in ignored receipts and the operator response.
Two worker launches are explicitly accounted for because automatic observation
reported zero admissions and an unknown uncounted remainder.
