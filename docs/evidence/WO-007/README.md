# WO-007 implementation and repair evidence

The current repair is recorded under [Repair of VER-001](#repair-of-ver-001).
The earlier implementation evidence below remains historical.

Dispatch: `resume: next`, 2026-10-24. Executor: Codex CLI 0.164.0,
gpt-6-astra, max, from canonical session readback. Implementation and independent worker review are complete. Gate outcomes and the criterion handoff are recorded below.

## Entry

- Launchpad and target physical roots verified before Git operations. Target
  worktree is `DotLn-Angular-wo007`, branch `wo-007`, initially clean.
- Target `git fetch origin` succeeded; `git rev-parse origin/main` and `HEAD`
  both reported `90fa6e8d879cb499107ff79d1051c200d17c1cbc`, the declared base.
- Canonical status selected WO-007, active, with its WO-006 dependency met.
  `npm run resume -- next` dispatched once and reserved this executor's writer.
- `rg -c -- '--draft' scripts/worktree.mjs` reported 5.
- `npm run plan -- check` on launchpad main passed: eight receipts and eight
  passes. Existing outward-path advisories remain the order's documented
  carry-in; they concern later publication text, not this implementation.
- Initial target `npm ci` passed (934 packages); its audit reported 11 moderate
  and one high vulnerability. The later audit diagnosis and compatible patch repair are recorded in WO-007-D006; the resulting audit is clean.
- `npx nx report`: Node 26.9.0, npm 11.19.1, Nx packages 23.3.0, TypeScript
  6.0.3; local cache `.nx/cache`; daemon disabled for commands.

## Evidence conventions

Probes run sequentially through the launchpad's `harness.mjs bounded` wrapper.
Declared gates run through their canonical helpers. Gate judgments and the
criterion ledger derive from the passing executable evidence recorded below.

## Review plan

Two fresh, read-only Codex workers reviewed only the order and implementation diff:
one adversary of acceptance criteria and one design improver. Both use
gpt-6.1-sol at max, worker type `codex-spawn-agent`. This is two admissions
out of the session cap of 20; no implementation delegation or descendants are
planned or used. The root is the only writer in each registered worktree.

## Implementation observations

- The four libraries were generated through Nx and their testing secondary
  entries are recorded in the target generator log. NgRx Signals 22.0.1,
  toolkit 22.0.0 and MSW 3.0.3 are installed. Toolkit call state and
  synchronization are reused with an explicit injected storage strategy.
- Vitest/UI/coverage 5.0.5 resolve the MSW 3 peer mismatch without disabling
  enforcement. `npm ls @ngrx/signals msw vitest` exits 0.
- Installed MSW uses `onUnhandledFrame`, not the provisional order spelling.
  Node tests set it to `error`; the unmatched-request spec observes failure.
- The production branch comparison first retained a 474.50 kB lazy mock chunk
  with the object flag and again with a literal imported flag. The builder
  define eliminated the import; the production content scan finds neither
  `setupWorker` nor `mockServiceWorker`, and the worker file is absent.
- The recorded fixture, unavailable fixture and schema moved byte-for-byte
  into board-data-access testing ownership. SHA-256 values, respectively:
  `5557fc64cb764293e64fc480ccd6d1a7d0d0c244f5c8696db4b1eba1d5a35d26`,
  `35fda84e06a450ffc86374027c892924ce6302c32ba19ad455a8b7cde371fae3`,
  `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`.
  The schema matches the cited starter v0.94.0 kit file; the target retains its
  own copy and gains no dependency on the launchpad.
- Source scans find all six event groups only in shared/events, no standalone
  creator elsewhere, no `withEffects` or `BoardFixtureToken`, and the only
  production `localStorage` reference in the shared storage provider. The
  order's forbidden Node import/require scan finds nothing.
- The shared network test setup is outside app/library runtime sources.
  Boundary fixtures permit feature data access to the shared helper layer
  while refusing feature data access to a peer.

## Browser startup evidence

A bounded Playwright experiment served the built optimized mocked output on a
fresh loopback origin, without a real API. With the worker present it rendered
all five tabs and logged `[MSW] Mocking enabled.`. The experiment then physically
renamed the output worker, opened a fresh browser context on that origin, and
observed the shell, API-unavailable board and dismissible error notice. Exactly
one `Mock startup unavailable; continuing application bootstrap.` line appeared.
The worker was restored and browser/server processes closed in `finally`.
No tracked worker or visual baseline was changed.

The initial browser suite passed 39/40; its existing keyboard test pressed Tab
before asynchronous bootstrap. It now waits for the five tabs before making the
same keyboard/focus assertions. Independent review added the four regression
cases described in [self-review](self-review.md).

## Preflight

The complete preflight ran before the first canonical target gate. The final
results below identify the actual command outcomes, not a composition of partial
gate rows.

- `npx nx run-many -t lint test build --output-style=static`: PASS,
  2026-10-24T11:49:40Z, 69.203 s bounded run. Fourteen projects; eleven unit-test
  projects, 29 test files and 91 tests pass; production build passes. Tooling
  also passes 24 tests, all 21 foundation TypeScript configurations, structural
  and negative boundary checks. Hygiene: zero exceptions, ten inspected files.
- `npm audit`: PASS, zero vulnerabilities after the scoped patch repair.

- `npx nx format:check`, `npm run lint:fixtures`, `npm run lint:components`,
  `npm run lint:hygiene`, `npm run check:fixtures`, `npm run i18n:check`, and
  `npm ls @ngrx/signals msw vitest`: each PASS, 2026-10-24T11:50:43Z.
- `npx nx e2e dotln-e2e --output-style=static`: PASS, all 40 browser cases,
  2026-10-24T11:51:52Z. This includes the independent-review regressions,
  accessibility thresholds, responsive board checks and the Storybook catalog.
- The configured-production experiment initially exposed an invalid
  comma-separated Nx configuration name falling back to the default. After
  repair, `npm run env:prime` and `npm run build:configured` PASS at
  2026-10-24T11:54:12Z. The emitted JavaScript contains the probe's primed API
  path and no MSW markers; the worker is absent. The three newly generated local
  configuration files were removed in `finally`; no local values were committed.
  Production cache is bypassed only for this intentionally local build command.
- `npx nx build dotln --configuration=mocked --output-style=static`: PASS,
  2026-10-24T11:55:15Z; worker present, optimized initial bundle 492.62 kB.
  The worker-present/physically-absent browser experiment was repeated on these
  current bytes and passed at 11:55:15Z. The [missing-worker screenshot](worker-missing.png)
  was opened and visually inspected: shell, notice, API base and retry are legible.

- After the configured-build and primer-validation repairs, the combined
  `npx nx run-many -t lint test build --output-style=static` preflight passed
  again at 2026-10-24T11:56:37Z (44.768 s, 14 projects, the same 91 unit tests;
  eligible unchanged tasks used Nx cache). The tooling cases additionally
  reject unsupported primer flag names so generated typed settings stay valid.
  `npx nx format:check` passed on the final target bytes at 11:57:05Z.
- `npm run meta`, `npm run publication:check`, `npm run format` and
  `npm run sync` passed in the launchpad; sync reported every artifact current.
- `npm run release -- prepare --local` returned the declared target-order
  outcome: no launchpad release and no changed files.

## Canonical gates

Preflight was complete before the first target gate. The launchpad document
preflight passed all 14 suites in 14.649 s at 2026-10-24T11:58:04Z.

The initial target plain and review gates passed in 29.096 s and 67.217 s,
respectively, with review completing at 2026-10-24T11:59:54Z. A final read improved
the script reference's purpose/use descriptions; the next pair caught only that
document's formatting. Workspace formatting repaired it, then both complete
gates were rerun on the current tree.

The final target plain gate passed in 29.225 s: install 5.851 s, lint 21.958 s,
test 0.421 s and format 0.995 s. The final review gate passed in 45.276 s at
2026-10-24T12:10:59Z:

| Declared review command | Result | Duration |
| --- | --- | ---: |
| install | PASS | 6.047 s |
| lint | PASS | 21.552 s |
| test | PASS | 0.439 s |
| format | PASS | 1.111 s |
| build | PASS | 0.394 s |
| e2e | PASS | 0.434 s |
| visual | PASS | 15.299 s |

Canonical review reference:
`target-gate:c2bc11e0-f570-4ea5-beaa-f3702ee111ea`, target tree
`094a236414173c07255d4c44379261fb134f15ae`, HEAD remains the declared base
`90fa6e8d879cb499107ff79d1051c200d17c1cbc`. The canonical helper revalidated
this row against the current target tree. Every command ran, with eligible
unchanged Nx tasks using cache. The gate verified unchanged non-ignored target
bytes and HEAD before/after each command
and across the whole run. The visual baseline diff is empty.

The final document gate runs after the last handoff edit and is consumed by
`implementation-ready`; that completion command runs no gate. The [handoff](handoff.md)
contains all nine judgments. The [host boundary](host-qualification.md) records
that publication is a later phase. All four independent findings are fixed;
the single adjacent queue item is completed at queue revision 5, with no next
item or deferred defect. No scratch repository or background monitor remains.

## Usage and review accounting

Usage is available through `harness usage` for the active dispatch, source
`codex-transcript-counter`; the handoff observation cutoff is
2026-10-24T12:10:59.719Z. Cumulative counters remain in ignored receipts and the
session response. USD cost and aggregate worker-token coverage are unknown.
The harness admission counter reports zero observed workers with an unknown
uncounted remainder; the explicit spawn records and completed reports establish
two workers used, within the cap of twenty. Neither spawned descendants.


## Repair of VER-001

Dispatch: `resume: fix`, 2026-10-24. The same session also received the operator's
request for reasonable paragraph-like spacing in TypeScript. Canonical status
selected WO-007 and VER-001 in `needs-fix`; one fix dispatch reserved the writer.
The original order, failed report, profile, cited house rules and reference
material, relevant implementations and tests were read. The failure report stays
immutable. No change was made to an acceptance criterion.

[Decisions D012–D016](decisions.md#wo-007-d012) record the repaired rules:

- F1: the registered `ErrorHandler` delegates to Angular's default reporter with
  the original value, then dispatches the application notice. The state test
  checks the actual provider, console value identity, dispatched payload and
  store entry for an Error with a cause, a string, a plain object and null.
- F2: the unmatched-request test owns an ephemeral loopback server and proves it
  receives no request. The server closes in `finally`, including setup failure.
  Both state reference documents now describe this proof.
- F3: `ErrorNotice` retains the event source, independently of `AppError.kind`.
  The shell test supplies kind `unknown` for both origins, verifies distinct
  messages and verifies dismissal restores the older notice.
- F4: D015 records starter v0.94.0, the kit schema path and SHA-256
  `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`.
  `shasum -a 256` matched the target-owned copy and kit file.
- Readability: reviewed 102 changed/added TypeScript and configuration files,
  excluding deliberate negative fixtures; added paragraph boundaries in 50.
  Related aliases, imports and fields stay grouped. The reviewed formatting
  diff preserves runtime behavior and template text. Also corrected the stale
  conventions sentence to name the already-installed undici 7.30.1 override.

### Repair preflight

`npx nx run-many -t lint test build --skip-nx-cache --output-style=static`
passed all 14 projects at 2026-10-24T14:27:59Z in 67.894 s: 30 unit-test files,
95 tests, 24 tooling tests, all 21 foundation compiler configurations, structural
and negative checks, and the production build. The first two full attempts
passed the unit and build work but failed only the new Node import's ordering;
the prescribed ESLint import autofix repaired it, and this complete rerun passed.

Every remaining preflight command passed: Nx format check, lint fixtures,
component conventions, event hygiene (zero exceptions; ten files), fixture
validation, translation extraction and e2e type checking. The uncached browser
preflight passed all 40 cases against the optimized mocked build and Storybook
at 2026-10-24T14:28:35Z in 28.604 s. Visual baselines remain unchanged.

### Proof discrimination and served behavior

A repository-free scratch copy ran both test versions against the installed
MSW 3.0.3, changing only the setup strategy for each arm. The bounded comparison
completed at 2026-10-24T14:29:53Z in 11.938 s:

| Unmatched-request spec | `error` | `bypass` | Option absent |
| --- | --- | --- | --- |
| Previous closed-port test | Passed | Passed | Passed |
| Repaired live-server test | Passed | Failed as intended | Failed as intended |

Both repaired negative arms failed because the request resolved with the live
server's `{ reached: true }` body instead of rejecting. This distinguishes the
policy from connection refusal without matching MSW's diagnostic wording. The
old test was cheaper to set up but cannot prove the policy; the live endpoint
adds a local resource that is owned and closed by the test.

A fresh uncached production build and served-browser probe passed at
2026-10-24T14:31:06Z. With its own API answering 404, the board showed unavailable
and the request notice. Dispatching a browser ErrorEvent reported the original
error in the console and showed the application notice. Dismissing it restored
the earlier HTTP notice. The production worker was absent. The browser and server
closed in `finally`. The [application-notice screenshot](repaired-error-notice.png)
was read and visually checked for the correct message and the visible shell.

### Repair review

Separate root review passes checked the failure-class invariants and the
maintainability/readability of the repair diff. No worker was spawned for this
repair; the skill requires fresh workers before implementation-ready only.
The earlier two-worker implementation review remains in [self-review](self-review.md).
Five encountered findings are fixed: the four verification findings plus the
stale reference sentence. The operator's spacing request is also complete.
The mutation comparison and served-browser probe add cases beyond the report's
quoted examples; the repaired ErrorHandler test adds non-Error thrown values.
The goal matched the dispatch: preserve diagnostics and error flow, strengthen
the proof, correct the recorded provenance, and improve readability without
changing the order or its product behavior beyond the repairs.

Release preparation again reported no launchpad release for this target order.
Publication remains with the later lifecycle roles. The canonical repair gates
and current criterion judgments are recorded in [handoff](handoff.md).


### Canonical repair gates

The repair's launchpad document preflight passed 14 suites in 15.169 s at
2026-10-24T14:33:42Z. Target plain then passed in 73.755 s at
2026-10-24T14:35:42Z, reference
`target-gate:95e28609-9b05-46c8-805d-220e27d6d004`. Target review passed in
76.557 s at 2026-10-24T14:37:17Z, reference
`target-gate:75d17027-dee4-42a5-a860-3d6de7cd9a0c`. Both bind target tree
`ca510cfc8945adc92afafa19280c2ee7c16fd7bb` and the unchanged base HEAD.

| Review command | Result | Duration |
| --- | --- | ---: |
| install | PASS | 5.901 s |
| lint | PASS | 22.343 s |
| test | PASS | 0.433 s |
| format | PASS | 1.012 s |
| build | PASS | 2.526 s |
| e2e | PASS | 28.839 s |
| visual | PASS | 15.503 s |

The review's test command reused eligible Nx task results; the independent
uncached preflight above establishes all 95 executed unit cases. All 40 browser
cases and all 33 visual comparisons passed. The canonical helper validated
unchanged non-ignored target bytes before and after the commands. Both worktrees
have clean diff checks, and the visual-baseline diff is empty. The final document
row after the last authored edit is bound by repair-complete, which runs no gate.

The four verifier follow-ups are settled in the canonical register. The repair
queue's completion names this evidence and the final document check. No other
pending follow-up was reclassified. The final usage cutoff and available totals
are reported in the response and ignored receipts.
