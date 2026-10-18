# The Angular workstream, 2026-10-18

## 1. Subject, authority and provenance

The operator opened `planning: let's start this planning pass for this fork`
on 2026-10-17 and then dictated the direction for DotLn-Angular over about
sixty messages in one Claude Code session, under a protocol they set at the
start: the session acknowledges, asks only genuine questions, and starts work
only when told. The operator said "go forth and plan" at the end. Every
operator message is captured verbatim in ignored intake
(`docs/intake/notes/planning-angular-workstream-2026-10-18.md`, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`); the
operator's 2024 Film Study notes, the germ of the component taxonomy, sit
beside it (`docs/intake/notes/2026-10-17-film-study.pdf`, SHA-256
`43adc54da4ed1735e1fb2309f887b9ed04801992c2af7a19c6e7f6a758ef1d08`). Both are
sibling records, never sources to copy from. This document is planner
synthesis of those captures, this instance's records, the kit's scripts and
one research read of public package registries and documentation (§4). The
clean-room screen found no employer material, credential, private hostname or
identifier in the captures; the operator's own Angular patterns are theirs
and are synthesized here at their direction.

Entry was clean `main` at `5a28719` (the v0.83.0 starter take), WO-001 closed
with FINAL-001 passed and no release close, no active order. The pass runs on
`planning/2026-10-18-angular-workstream`, created by `plan start` (UTC date;
the operator's local date was 2026-10-17). Only the parent writes this
checkout. Fan-out plan: two background `dotln-worker` agents against the cap
of 20, one research worker (§4, spawned at 00:03Z, finished at 00:22Z) and the
planning refuter (§12), with no descendants.

Aim, as read: register DotLn-Angular in this launchpad, cut the foundation
of the Angular monorepo as bounded orders in the operator's stack and
conventions, synthesize and improve the operator's component taxonomy, and
record a durable understanding of the operator that binds every harness and
role. Traps named before the material choices: filing a generic Angular
scaffold instead of the operator's stated one (the direction is the source,
the research only checks versions); filing far-future orders whose bases and
inputs do not exist yet (§6 D5 and §9); treating the operator's sarcasm as
agreement (the operator record, §10); and letting the kit's assumptions
(reserved historical ids, planning-time bases) pass silently (§6 D4 and D5,
§9 kit gaps). The NoOp at entry would have left the fork without a
registration, the Angular repository empty, the taxonomy in a PDF nobody
else can read, and the operator's preferences in one session's memory.

## 2. Entry observations

`plan start` and `plan failures`: 1 failed-report item since the record began
(FINAL-001, review findings: 2 integration, 1 new-scope, 0 escapes), 0 failed
verifications, 0 failed final reviews, 0 repairs, 1 order made ready, 0
corrections, 0 off-ramps, 0 amendments; 1 local release close (WO-001's
records, not a tag), 2 local host denials, 95 interventions (87 unclassified;
prompt-hook rows of the WO-001 sessions and this one), 0 long phases, 0
repeated gate runs; recent tracks: 1 counted, `unknown` (WO-001 carried no
`Track:` line; every order filed here does). Reader scores: unavailable, no
`docs/control/reader-profiles.json` is declared and no reader run is due.
Phase medians over the one closed order: implementation 1,920 s, verification
854 s, final review 2,697 s.

FINAL-001's three findings are the only failures to route: F1 and F3
(integration: the `worktree integrate` regenerate step's ENOENT in an export
without package sources, and the publication lock) became WO-001-D013's
follow-up; F2 (new scope: the prompt hook and a phrase that leads a longer
message) became WO-001-D014's. Both rows are disposed in §7.

## 3. Reopening observations

`plan conditions` at 00:00Z (2.2 s): 1 hold, 10 unknown, 15 decision
conditions and 7 register rows not evaluated.

- Holds: `gate-task:target-worktree`, latest fresh task 444.259 s against a
  thirty-day median of 38.649 s from one sample (threshold 57.97 s). NoOp: a
  median of one sample is the other sample; the 444 s row is WO-001's final
  review gate during the v0.82.0 starter take, the only full gate this
  instance has run, and the suite is kit machinery, not this instance's work.
  Nothing changes now. Reopen when a second fresh full gate records the task
  above twice the then-median with at least three samples; then an order
  decides between excluding core-only suites from the instance gate and
  reporting upstream.
- Unknown (10): each names a core condition source absent here
  (`FUP-fb8cbeabbddef397`, `WO-086-D006` with core's roadmap path,
  `FUP-8a4e201d861208ad`, `FUP-be1103fbfdd14653`, `FUP-7f9a27e6ed6c44b3`,
  `FUP-e96221b106cd136a`). NoOp: the kit's condition table names core's rows;
  an instance cannot evaluate them and should not invent thresholds. Reopen
  when a kit update ships instance-scoped condition sources.
- Measured and not holding: plain gate 21.4 s median; the other four gate
  tasks within threshold.

## 4. Research read: the stack as observed on 2026-10-17

One `dotln-worker` read the npm registry, package files and official
documentation and wrote its findings to session scratch (not a repository
record; each value carried its source and label). What the orders rely on:

| Item | Observed | Consequence |
| --- | --- | --- |
| Angular | 22.2.3 latest; Node `^22.22.3 \|\| ^24.15.0 \|\| >=26`; TypeScript `>=6.0 <6.1` (npm `latest` is 7.0.2) | pin TypeScript `~6.0.3` |
| `ng new` | Vitest, standalone, zoneless, OnPush, 2025 file names by default; `resource`, `httpResource`, `rxResource` stable | house rule 1 follows the defaults |
| Nx | 23.3.0; generators install Angular `~22.1.0`; unit-test runner values `vitest-angular`, `vitest-analog`, `jest`, `none`; `vitest-angular` default for apps, `vitest-analog` for non-buildable libraries; Vitest capped at 4.x | D7 |
| Nx cache | 23.x shares cache and database across every checkout of one workspace under the home directory; `nx reset` clears the shared directory; `cacheDirectory` opts out; `NX_DAEMON=false` overrides `nx.json` | D11 |
| AnalogJS | 2.8.1; peers admit Angular 22; Nx pins `~2.6.0` | fallback of house rule 5 |
| NgRx | `@ngrx/signals` 22.0.1; Events plugin stable since 21; `withEffects` renamed `withEventHandlers`; toolkit 22.0.0 with `withCallState` | WO-007 |
| PrimeNG | 22.1.2 under the PrimeUI License (license key; free Community License for small entities and non-commercial open source); 21.1.10 last MIT, peers Angular 21; `@primeuix/themes` 3.x and `primeicons` 8.x the same | D6 |
| Transloco | 8.4.0; pipe named `transloco`; no typed keys; keys-manager 8.1.1 extracts and finds | D12 |
| MSW | 3.0.3 (`msw/http`, `msw/browser`, `msw/node`; Node >=22.12) | WO-007 |
| Ramda | 0.32.0 with `@types/ramda`; ramda-adjunct 6.1.0, BSD-3-Clause, ships types | WO-005 |
| Playwright, lint | 1.64.1; angular-eslint 22.6.0; typescript-eslint 8.71.2; ESLint 10.13.0; Prettier 3.9.10; Sass through `sass-embedded` | WO-004 |
| GitHub | merge-commit title can be the pull-request title (set on both repositories by the operator, observed through the API); `gh pr create --title` passes `:memo:` through | D9 |

Observed by this session: `DylanBWood/DotLn-Angular` is public, has one
commit (`bc9133e932a00d33c15bc5289d683b8078f51ee4`) and no files; its merge
settings are merge commit with `PR_TITLE` and `BLANK`; the fork
(`dylanwoodconsulting/DotLn-Enterprise-Starter`) has the same;
`DylanBWood/DotLn-WoW-Forever` still has `MERGE_MESSAGE` and `PR_TITLE`. The
local clone is at the operator's `~/Projects/DotLn-Angular`. `gh` is logged in
as the operator.

## 5. The operator's direction, synthesized

The direction is recorded once, as the twenty-one house rules and the design
section of [WS-001](../workstreams/WS-001-dotln-angular.md), so every member
order cites a number instead of restating prose. In short: the latest Angular
with its best practices and browser speed first; signals everywhere, zoneless,
standalone; an Nx integrated monorepo with slim apps and feature libraries,
every project created by a generator with the command recorded; Vitest,
Playwright, MSW, Sass; functional first through `R` and `RA`; NgRx SignalStore
with events, declared by tier in one library with one-way action hygiene;
Transloco for every string; providers for everything with described tokens;
lazy routes from path enums through canonical builders; test kits for nearly
every injectable; conventional commits and gitmoji titles; security that a
real organization would accept; WCAG 2.2 AA within reason; documentation for
people and for sessions.

The germ: the operator's Film Study notes map Gladwell's Salesmen, Connectors
and Mavens onto presentational, compositional and knowing components, with
levels inside each. The pass kept the analogy and made it checkable: seven
kinds (Fragment, Template, Wrapper; Composite, Layout; Mapper, Container),
one question per role ("does it look right", "does it fit together", "what
does it mean"), the sentence "knowledge down, intent up, Mavens out", and seven
rules each enforced by a lint glob, a test or a review item. Two
contradictions in the notes are resolved (D2). The operator's later ideas
(the WoW tooling app with a configuration intermediate representation, a
quiz mode, graphics-settings rating) are recorded as candidates (§9), not
orders.

The operator's own preferences, tone and protocol are recorded in
[`docs/operator/README.md`](../operator/README.md), bound to every role
through `CLAUDE.md` § Start here (D15).

## 6. Decisions and NoOp records

Each decision names its source, the rejected alternative and the evidence
that reopens it. Immaterial lenses are grouped at the end.

- **D1 The WoW functionality lives in the monorepo.** Operator direction:
  `DotLn-WoW-Forever` becomes an app inside DotLn-Angular with its own
  libraries (Nx libraries need not be TypeScript), and the sibling repository
  stays as a proposed home if it grows unwieldy. Rejected: registering the
  sibling now (nothing to run there). Reopen when the WoW app's libraries
  dominate the workspace graph or the operator asks for the split. The
  registration order (WO-003) names the sibling as a non-goal.
- **D2 The taxonomy resolves two contradictions in the germ.** "Wrapper"
  appeared as a Salesman level, a Connector level and a Maven level; it now
  means the vendor adapter only, with Layout as the composition role and
  Mapper as the knowledge role. "No outputs, a mediator service" is replaced
  by outputs plus the Events plugin's stream, because a presentational
  component that injects a service is no longer testable without injection
  and the platform's own grain is inputs and outputs; the event stream is the
  mediator, visible to everyone and owned by no component. Rejected: keeping
  levels as ranks (value is in the Law of the Few, not in rank). Reopen when a
  feature's output drilling exceeds two hops in more than one container and
  splitting containers does not resolve it.
- **D3 One order per subsystem, six orders, serial.** The operator's shape
  ("ten pull requests over two to four weeks, auth at week three") is read
  as subsystems: registration, scaffold, foundation libraries, taxonomy and
  first feature, events and state, authentication. Product 07's sizing rule
  (one outcome per subsystem, no bundling of unrelated subsystems) gives six.
  Rejected: ten thin orders (ten fixed cycles for the same work); one order
  (a verifier reading sixty surfaces). Reopen when WO-004's full cycle costs
  more than a day of operator time; then merge WO-005 into WO-006.
- **D4 Order ids start at WO-003.** `scripts/lib/dependencies.mjs` hard-codes
  `WO-001` and `WO-002` as historical ids that may not be hard dependencies
  (observed: `work-orders index` refused WO-003's hard edge on WO-002 with
  "historical id cannot be a hard or satisfied dependency"). The registration
  order is WO-003 and the chain runs to WO-008; WO-002 is never used in this
  instance. Rejected: a `reference-only` edge (activation would not be
  blocked). Kit gap recorded in §9 for upstream. Reopen when the kit scopes
  the set to core.
- **D5 Successor bases are provisional and set by the next pass.**
  `worktree start` creates the target worktree at the commit the
  `Repository:` line names, so WO-005 to WO-008 cannot name their true bases
  until their predecessors merge. Each carries the repository's only commit
  as a provisional base, its first step refuses to activate while
  `origin/main` differs from the line, and the planning pass after each merge
  sets the line and refutes the changed order under the default pass scope.
  Rejected: filing only WO-003 and WO-004 now (the operator asked for the
  foundation in the plan and the refuter should judge the chain as a whole);
  amending through `amend-order` from the executor (the edit must precede
  activation and `main` requires a pull request). Kit gap recorded in §9.
  Reopen when the kit admits a base that resolves at activation.
- **D6 PrimeNG 22 is declined under the operator's own condition.** The
  operator said "if PrimeNG is free, let's use that". PrimeNG 22.x ships under
  the PrimeUI License with a required key; the last MIT release peers Angular
  21. The pass does not choose a vendor for the operator: WO-006 names the
  decision as the operator's before activation and proposes Angular Material
  with the CDK (MIT, maintained with Angular). The wrapper rule makes the
  choice cheap to change; no criterion depends on the vendor identity.
  Rejected: adopting PrimeNG 22 under the Community License on the operator's
  behalf (a license acceptance is theirs); pinning PrimeNG 21 (incompatible
  with Angular 22). Reopen when the operator names the vendor.
- **D7 Unit tests take Nx's defaults.** `vitest-angular` for the application
  (Angular's own builder), `vitest-analog` for non-buildable libraries (Nx's
  default since the runner enum changed), Vitest 4.x because Nx caps it. The
  operator's June 2026 failure is explained: a plain `vitest` value no longer
  exists and non-buildable libraries need the Analog wiring. Rejected: one
  runner everywhere by making every library buildable (cost without benefit).
  Reopen when Nx lifts the Vitest 5 cap or unifies the runners.
- **D8 Interim review route: a draft pull request at verified.** The operator
  wants to read the code and have an automated reviewer comment before final
  review. The kit opens the pull request only after a passing final review,
  and core's own ledger records the same idea as a candidate on 2026-10-16
  (a draft at verified, threads read by the final review). Until the kit
  carries it, each target order pushes `wo-NNN` after the verification pass,
  opens a draft pull request, records its number, and the final review reads
  the threads into evidence and routes each item as a finding, a boarded
  follow-up or a discard; the published pull request on `<type>/<slug>`
  supersedes it and the operator closes the draft. Rejected: skipping
  `worktree publish` and marking the draft ready (no `PullRequestOpened`
  record, no target-records binding). Reopen when the kit lands the draft
  route; then the orders' interim step is struck by amendment.
- **D9 Gitmoji titles come from a repository workflow.** The outward lint the
  target publish runs requires `type(scope)?: subject` and refuses a leading
  shortcode (`subject.shape`), so a session cannot title a published pull
  request with a gitmoji. WO-004 adds a workflow that prepends the gitmoji for
  the conventional type after the pull request opens; merge commits then
  carry the gitmoji title the operator wants. Rejected: changing the lint
  (kit file); the operator editing each title (recurring rescue). Reopen when
  the kit's vocabulary admits an optional leading gitmoji.
- **D10 DotLn's records in the target live under `docs/dotln`.** The
  registration sets `documentationRoot` so order records stay apart from
  `docs/dev-reference` and `docs/ai-reference`. Rejected: the default `docs`
  (records would interleave with the reference material a colleague reads).
  Reopen if the kit's records step needs the default root.
- **D11 Nx cache per worktree and no daemon in gates.** Nx 23 shares the
  cache across checkouts and `nx reset` clears it for all; `cacheDirectory:
  ".nx/cache"` isolates each worktree, and the gate's argv run under
  `env NX_DAEMON=false` so a gate leaves no daemon in a worktree. Rejected:
  the shared cache (a reset in one worktree would empty the others').
  Reopen when Nx scopes `reset` to one checkout.
- **D12 The `t` pipe is a house alias over Transloco.** Transloco's pipe is
  `transloco`; the operator's `'key' | t` form is one subclass. Typed keys and
  the drift lint are a later member (C1), by direction. Reopen when Transloco
  ships typed keys.
- **D13 `providedIn: 'root'` is limited to app-tier singletons until the
  operator rules.** The operator left the question open; WO-005 applies the
  provide-function default and records the ruling when it comes.
- **D14 File names follow Angular's 2025 style guide** (no `.component`
  suffix), because house rule 1 defers to the platform's default. Reopen on
  the operator's word; the `type` generator option restores the suffix.
- **D15 The operator record is one file bound through the contract.**
  `docs/operator/README.md` is read by every harness and role through the
  `Read[all roles]` line in `CLAUDE.md` § Start here (`AGENTS.md` is the same
  file; Copilot reuses the Claude registration). Rejected: a Claude-only
  memory (the operator asked for one record binding every harness). Reopen
  when the operator changes a recorded preference; the next pass updates the
  record with the date.
- **D16 The outward vocabulary's terms exclude `DotLn`.** The target's
  product is DotLn, so the word must reach its pull requests; the terms are
  the launchpad-internal words (`launchpad`, `gem`, `gems`, `mask`, `masks`,
  `resume phrase`). Reopen when a published body is refused on a word that
  belongs to the product.
- **D17 Ideas are not ledgered by this pass.** The ledger holds the
  operator's own ideas from ideation dispatches; a planning pass adds the
  registration heading only. The WoW and taxonomy ideas are recorded here
  and in WS-001; an `ideation:` dispatch can ledger them with their statuses.
- **D18 The purpose is declared.** `docs/product/purpose.md` carries the one
  `dotln-purpose` block the refutation goal standard composes; without it the
  refuter judges against an "unavailable" purpose. Its ceiling is set in §11.

Immaterial lenses for the document-only writes (purpose, record, workstream,
profile, orders): no shared compute beyond the two workers, no proxy goal,
no process that provokes process; the orders' acceptance criteria are
command-based so the evidence cannot pass without the behavior.

## 7. The register and the failures consumed

The register held 7 rows at entry (3 settled, 1 needs-review, 3 untriaged;
revision `1e91978d…`). The pass disposed the four pending rows in one
`--apply` batch (revision `46efb418…` after):

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-2bbb348a91f7ea40 | WO-001-D007 (seeded order on main) | `settled` again at source revision 6: the v0.82.0 starter still routes the seeded order into `wo-001`; this instance's first order is closed |
| FUP-2a5dc809710f399e | WO-001-D015 (reader profile guidance) | `deferred`: upstream kit; routed through the operator's upstream issue prompt (WO-001-D002); NoOp keeps the balanced default |
| FUP-4f19a91d71d95bc9 | WO-001-D013 (integrate regenerate ENOENT) | `deferred`: upstream kit; integrations here run the two steps by hand as FINAL-001 did |
| FUP-a36dae4a6766b9ef | WO-001-D014 (phrase leading a longer message) | `deferred`: upstream kit; the operator types the bare phrase first, as the operator record says |

FINAL-001's findings F1 to F3 are these rows' sources; nothing else failed.
No row was allocated to an order: none of the four is this fork's to fix.

## 8. Orders cut and the sequence

Six orders, one serial group (no lane pair: every member edits the
workspace's shared configuration files), WO-001 retired from the sequence as
closed. Each order carries `Model:`, three-role `Effort:`, `Track:`, `Cost:`
with additions and removals, provenance naming the capture, a dated observed
gap, a Design with rejected alternatives, a numbered execution plan whose
steps name a file and a check, a `Preflight:` line, criteria whose last names
the gate and `npm run test:docs`, known issues, non-goals and
operator-review assumptions.

| Order | Repository | Outcome | Hard edge |
| --- | --- | --- | --- |
| [WO-003](../work-orders/WO-003-register-dotln-angular.md) | self | `dotln.config.json` registering `dotln-angular` (class, authority profile, gate, profile, `docs/dotln`), the operator grant, the outward vocabulary, the local clone record | none |
| [WO-004](../work-orders/WO-004-scaffold-dotln-angular-workspace.md) | dotln-angular @ `bc9133e9` | the Nx and Angular 22 workspace, slim `dotln` app, Vitest, Playwright, Sass, lint, boundaries, CI with the gitmoji workflow, the two documentation roots and the generator log; the first target order | WO-003 merged |
| [WO-005](../work-orders/WO-005-foundation-libraries.md) | dotln-angular (provisional base) | `core`, `utils`, `i18n`, test kits, environments and primer, proxy | WO-004 merged |
| [WO-006](../work-orders/WO-006-component-taxonomy-shell-home.md) | dotln-angular (provisional base) | `ui` (fragments, templates, wrappers, composites), the role lint, the shell layout, the `home` feature, axe in e2e | WO-005 merged |
| [WO-007](../work-orders/WO-007-events-stores-data-access.md) | dotln-angular (provisional base) | `events` by tier, `data-access` with call state and the trinity, `HomeStore`, `state` (flags, navigation, errors), interceptors, MSW, the hygiene check | WO-006 merged |
| [WO-008](../work-orders/WO-008-authentication-and-permissions.md) | dotln-angular (provisional base) | `auth`: OpenID Connect with PKCE behind a port, in-memory tokens, single-flight refresh, session state machine, permissions from an adjacency list, mocked provider, the failure matrix | WO-007 merged |

Two screens from product 07 were applied: no order claims "no code ships";
no criterion reads natural language (each names a command and its expected
output). Live-run surfaces are named at the base in WO-004 (Actions, the pull
requests, `gh`, the gate rows) and inherited by the later orders.

## 9. Candidates not filed, with their reopening conditions

- **C1 Typed translation keys and the drift lint.** A schema-driven type for
  `'scope.key' | t` and a lint that fails when `en.json` drifts (the operator
  built this before; Transloco has no built-in). File when WO-005 merges and
  a second language or a second feature's strings exist.
- **C2 The WoW tooling app.** `apps/wow` with `libs/wow/*`, including
  non-TypeScript libraries for addons (Nx run-commands targets), a WoW
  configuration intermediate representation mirroring DotLn's, watered-down
  views, a keybind and UI prototyping bed, a quiz mode for muscle memory,
  macro variations, and a rating of graphics settings with stored matchups
  and automated in-game switching. File when WO-006 merges (the shell and
  taxonomy exist to host a second app); the operator's idea text is in the
  capture.
- **C3 The example API and a real identity provider.** `apps/api` behind the
  `AuthClient` port and `apiBaseUrl`, replacing the mocked provider by
  configuration. File when WO-008 merges and the operator chooses a provider
  (they named a hosted provider as likely).
- **C4 The DotLn console feature.** Core's intent for DotLn-Angular is the
  Angular shell rendering the actor-board view model (console v1). File when
  the foundation is delivered and core publishes the view model contract.
- **C5 Production environment and preview deployment.** `environment.prod.ts`
  with file replacements lands in WO-005; a hosted preview is unplanned
  until the operator names a host.
- **C6 One "go" that runs the queue.** The operator asked whether, after this
  branch merges, one word could run every order through every phase and
  merge. Not with this kit: each phase is a resume phrase the operator types,
  the merge is the operator's by rule, and the next order needs its own
  phrase; core's router (its WO-192) is only mentioned in this kit's guide and
  portfolios preauthorize derived 5S orders only. Reopen when a starter update
  carries the router or an unattended route for hand-written orders.
- **C7 Kit gaps for upstream** (routed through the operator's issue prompt
  until a dotln helper files them, which is itself a candidate, C8):
  (a) `historicalDependencyIds` hard-codes core's `WO-001` and `WO-002`, so an
  instance cannot make its second order a hard dependency (D4); (b) a target
  order's base is fixed at planning time while `worktree start` creates the
  worktree there, so a chain of target orders needs one pass per member to
  set bases (D5); (c) the draft pull request at verified (D8; core's
  2026-10-16 ideation); (d) the outward lint's title shape refuses a leading
  gitmoji (D9); (e) `followups --apply` refuses the host scratchpad the role
  grants for other writes, so the batch had to pass through the ignored
  control lane; (f) `plan start` dates the branch in UTC while the operator's
  day may differ.
- **C8 A dotln helper that files issues upstream.** The operator wants to
  submit issues and feature requests to the primary DotLn repository from
  this fork, for core's own planning cycle. File when the operator authorizes
  the remote effect and names the issue template.
- **C9 Orders spanning several repositories.** A lockstep upgrade across
  repositories as one workstream with members in each. The workstream
  document already groups per-repository members; file when a second
  repository is registered.

## 10. Write-backs

- `docs/product/purpose.md` (new): the instance's purpose block (D18).
- `CLAUDE.md` § Start here: the `Read[all roles]` line for the operator
  record (D15).
- `docs/operator/README.md` (new): the operator record.
- `docs/workstreams/WS-001-dotln-angular.md` (new): outcome, members, house
  rules, the taxonomy, delivery states.
- `docs/repositories/dotln-angular.md` (new): the registration's profile.
- `docs/planning/sequence.md`: WO-001 retired; WO-003 to WO-008 filed.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage index
  regenerated.
- `docs/planning/followups.json`: the four dispositions (§7).
- `docs/control/doc-ceilings.json`: the purpose ceiling (§11).
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/decisions-index.md`:
  regenerated.

## 11. Goal alignment, cost and document ceilings

The outcome the orders enable is the purpose's critical path: a registered
repository, one witnessed target order, a foundation where a feature is added
by convention. Lenses that changed the plan: shifting the burden to the
intervenor (D8 and D9 remove recurring operator edits of titles and manual
code reads before review; D5 keeps one pass per member as the honest cost
until the kit resolves bases); success to the successful (D6 refuses to let
PrimeNG's prior investment decide a license question that is the operator's);
rule beating (every criterion names a command and expected output; the hygiene
check counts exceptions instead of forbidding them, so the count is the
signal). Process activity is not progress: the six orders are the smallest
set that delivers the foundation the operator described.

Cost: `npm run meta -- --plan-cost` records the table after the subject
commit; the research worker ran 18.9 minutes of wall-clock and 143 tool uses
for the facts in §4 (host readback: 221,905 tokens). The refuter's wall-clock
is recorded in §12. Document ceilings: `docs/product/purpose.md` measured 1,365
non-exempt bytes; ceiling 1,502 (plus one tenth) in `docs/control/doc-ceilings.json`.
The kit's product documents are kit files and carry no instance ceiling.

## 12. Validation and independent judgment

Checks run on the committed subject before the refutation (results recorded
here when they ran): `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index --check`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run meta`, `npm run plan -- check`,
`npm run test:docs`.

Refutation: one fresh `dotln-worker` on the canonical prompt from
`npm run plan -- refute` (default pass scope: the six orders and the
sequence), result and statement saved under the ignored control lane and
filed with `npm run plan -- receipt`. Receipt, verdict, holds and their
dispositions, and dispatch-to-file wall-clock are appended below by the pass
when filed.
