# The standard pass on starter v0.93.0: the update first, WO-007's base, the plan gate's moved-record reader, and the mining run paused, 2026-10-23

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-23 at 15:25Z naming a
standard pass with the latest upstream, and carried a premade prompt they
had written for the platform's planning session: the take-in of their
2026-10-22 intake mining run, a research pass of their own in the DotLn
platform over its private intake, the works they reference and a forward
design for DotLn and for DotLn-Angular. They proposed pausing that take-in
in this fork if the pass agreed. While the pass ran they gave four more
directions: take the update first and merge it, so that any fix reaches the
planning branch; a question on where a target order's decisions should
live; the merge of #21; and the approval of one host-denied call. Every
message is captured verbatim in ignored intake
(`docs/intake/notes/planning-2026-10-23.md`, SHA-256
`701262d85556f1445fc09c579379c0fc6a3133b08c41537d34b9474d1dca9d23`), a
sibling record, never a source to copy from. This document is planner
synthesis of that capture, this instance's records (the five previous
planning documents and their receipts, WS-001, the operator record, the
profile, WO-006's moved records in DotLn-Angular, the register and the
control segments), the starter's five releases from v0.89.0 to v0.93.0
with core's release notes, core's fork-notes planning pass of 2026-10-21
(its §4, §5, §6 and §13) and product 04 §Later console hosts at core's
`main`, and the probes of §4. The mining run was read at its two entry
files only (its README and its planning dispatch), as context for D8;
nothing from it is routed, quoted or promoted here. The clean-room screen
found the operator's own repositories, public packages and public
documentation; the only private material read is the operator's own
capture, paraphrased.

Authority: a document-only planning pass on
`planning/2026-10-23-standard-pass-v0-93-0` from clean `main` at `3ee154d`
(after #21). The update itself ran before the branch opened, on the
operator's direction of the same session, through the README's update
route: a secondary worktree under `.runtime/`, one merge, the gates, pull
request #21, the operator's merge, and `node scripts/launchpad.mjs update
--finish` on `main`. The pass files no new order, activates nothing,
publishes nothing in the target, and never merges. Its refutation is the
pass's independent verification (§14).

Fan-out plan, stated before the first spawn: one refuter, no research
workers, no descendants; the 20-admission cap leaves 19.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `8ba47c1` at the dispatch, clean; `v0.1.0` to `v0.3.3` tags on `origin`; after #21, `main` at `3ee154d` (starter v0.93.0, core `c670e628…`), bootstrapped by `update --finish` (35 generated surfaces, the local-terms list present) | `git status`, `git ls-remote --tags origin`, the finish output |
| WO-006 | phase `closed`, VER-001 and FINAL-001 `pass`; merged in DotLn-Angular as #4 (`90fa6e8d`, 2026-10-21T21:11Z); Release `DotLn Angular v0.1.0` published 2026-10-21T21:14:44Z at that commit; the retained close record present; its records merged here as #20; one `RecordCorrected` off-ramp (ordinal 8, the final review's product-gate binding) | `npm run resume -- status --json`; `gh release list` on `DylanBWood/DotLn-Angular`; `gh pr view 4`; `docs/control/orders/WO-006.jsonl`; the retained directory's listing |
| Upstream | five refresh commits past the v0.88.0 base: v0.89.0 (core WO-217), v0.90.0 (WO-226), v0.91.0 (WO-227), v0.92.0 (WO-225), v0.93.0 (WO-229, core published 2026-10-23); `git merge-tree` from `main` reports no conflict | `git fetch upstream --tags` (which overrode `tagOpt --no-tags`; the eight starter tags deleted locally, none pushed), `gh release view` on `DylanBWood/DotLn` |
| The gates on `main` | `node scripts/docs-check.mjs` with the v0.88.0 runtime fails on five lines of WO-006's close records (four links to the moved `decisions.md`, one home path in `host-qualification.md`); `npm run plan -- check` fails with `execution amendment decision must be a contained regular file` | the two runs in the primary checkout before #21 |
| `plan start` | window since receipt 006: 0 failed verifications, 0 repairs, 1 order made ready, 1 off-ramp (`RecordCorrected`), 3 amendments (WO-006-D007, thrice bound), 0 withdrawn; record: 1 failed first verification in 9 closed orders, 1 of 9 final reviews with an escape; local: 8 failed gate rows (7 on WO-006), 3 shell diagnostics, 2 release closes (WO-006: one dry run, one publish), 0 host denials, 8 interventions (7 planner, 6 unclassified), 1 long phase (WO-006's implementation, 7,716 s against the 1,829 s median), 0 repeated gate runs; reader scores unavailable (`docs/control/reader-profiles.json` absent, as in every pass of this instance; no reader due) | `npm run plan -- start standard-pass-v0-93-0`, `npm run plan -- failures` |
| `plan conditions` | 1 hold (`gate-task:target-worktree`, the same two samples as the two previous passes); 10 unknown; the plan-check and document-gate probes exit 1 on the plan gate's defect (§4), so their medians are unknown; `harness lanes`: capacity 8, no holders | `npm run plan -- conditions --slow` (19.3 s) |
| Register | 26 pending rows at revision `1f601740…` (1 needs-review, 6 open, 19 deferred); three name WO-007 by text; the C1, C2 and C6 rows of the UI pass and the wall-clock row have fired (§3) | `npm run plan -- followups --export`, `--touching WO-007 WO-008` |
| The board | `npm run console -- board --json` at v0.93.0 renders this launchpad's board: `uifa-board-v1`, 5 panels, 21 sources (10 available), 304,363 bytes, zero home or temporary paths, the Work panel's `orders` section available with 9 rows (WO-225 in the field) | the bounded probe (1,050 ms) |
| DotLn-Angular | `main` at `90fa6e8d` (#4); Angular 22.2.3, Aria 22.2.3, Nx 23.3.0, TypeScript 6.0.3; `BoardFacade` injects `BoardFixtureToken`; `docs/dotln/` holds WO-004's, WO-005's and WO-006's decisions, verifications and final reviews | the operator's clone; `package.json`; the facade, token, provider and route files |
| Core's answers | the fork-notes pass of 2026-10-21 decided the fork's eighteen items (its §4.1 and §4.2) and wrote the answer block for this pass (§13); four of its five orders have shipped (WO-226, WO-227, WO-225, WO-229); WO-219 and WO-224 remain queued | `git show origin/main:docs/planning/fork-notes-and-operator-questions-2026-10-21.md` |
| The mining run | present at the platform's ignored intake (`docs/intake/notes/2026-10-22-intake-mining-run/`, 63 files under `merged/` and `provenance/` beside the digests and designs); its README says the first DotLn-Angular slice cannot be cut until OD-021, OD-023 to OD-026 and OD-163 are decided, and its dispatch file proposes the operator's paste as the route | the README and `PLANNING-DISPATCH.md`, read once |
| The host | 16 logical CPUs, load 4.7 at the conditions read; the document gate 15.7 s and 16.6 s wall on the update branch with 0.1 s of lane wait | the gate summaries |

## 3. Reopening observations

Fired conditions, each re-disposed in §8: FUP-2af7f27fd0e0fe34 (C1 of the
UI pass, the live view; core serves the status and the board to a browser
host since v0.92.0), FUP-d50229455aad453c (C2, the command surface; the
loopback admits a local origin on the contract and invoke routes),
FUP-1f5953e14b1077b4 (C6, the readable work view; the collector reads an
export's segments), FUP-d771ffe939902128 (the document gate's wall-clock;
core answered and v0.93.0 attributes the wait), FUP-a36dae4a6766b9ef
(WO-001-D014, the prompt hook dispatching a phrase that leads a longer
message; observed today), FUP-98c85b750cb36bd4 and FUP-2479f6d32b2396a8
(the literal host-rules fallback and a trust entry at registration; WO-006's
draft publish was the observation, and it observed a withheld admission,
not a hook allow), FUP-db45bfeb533eeee6 (C7, the framework evidence to
core; core declined the decision), FUP-39e7a2f6db6b7f84 and
FUP-e22968a92b1bb18c (WO-006-D019 and D018; v0.91.0 and v0.90.0 carry the
repairs), FUP-b0b01939c2ecf037 (WO-006-D021; this pass edits WS-001) and
FUP-52178afa5a081d86 (WO-006-D022; WO-007's base is set here). The timing
hold on `gate-task:target-worktree` rests on the same two samples as before
and stays a NoOp (D12). No other deferred row's lifecycle condition fired
on WO-006's close.

## 4. Observations, dated 2026-10-23

| Item | Observed | Source |
| --- | --- | --- |
| The five releases | v0.89.0 (WO-217): 58 register rows on the gate, the runner, the host guard and gate evidence; a complete `npm test` row stands only while each task's latest execution passed; `npm run sync` writes only on a recognized stale report; the host guard recovers a lost record. v0.90.0 (WO-226): an export's carried runtime is restored where a build was tried; `node scripts/launchpad.mjs update --finish`; the admission compares publication fields; a hidden helper gets a near-miss advisory; the dispatch is read from the first content line of a paste; the opt-in `dotln-worker-fable` type. v0.91.0 (WO-227): `reviewTerms` (an empty list admitted; `terms` read as the same list for one release with an advisory); `refuse:` and `review:` modes on the private list; launchpad identifiers refused in a target's branch, commits, title and body; `--confirm-terms sha256:<digest>`; `Target release notes: reviewed`; the stored pull-request body's shape. v0.92.0 (WO-225): a path-free board with five failure codes; the two loopback read routes; `npm run build` a no-op in a kit; the two schemas as kit files; segmented control reads; browser-safe client exports. v0.93.0 (WO-229): WAIT lines label holders by checkout relation; the gate summary and row carry the lane wait; the slow condition judges an execution-only median; `harness lanes`; measured structural host requests | core's release notes, each release's Read before upgrading |
| The update | preview with the incoming launchpad from a detached worktree under the bounded wrapper: 178 replaced, 14 added, 0 removed, 0 refused, 799 unchanged; build `fnv1a64:881e2843f7728c46` to `fnv1a64:b0a806b195c9f83e`; no instance actions; one merge commit `782a019` with no conflict (`CLAUDE.md` untouched upstream; `README.md` auto-merged with the fork's release claim; `UPSTREAM.md` and the three kit documents replaced); `npm ci`; `harness emit` 35 surfaces with no drift; lineage index current; `npm run sync` every artifact current, nothing to commit; `harness check` 35 surfaces; `launchpad verify` 991 files at `c670e628…`; `npm test` 7 passed in 13.66 s | the commands on the branch |
| The inherited document failure | `docs-check` fails on `docs/evidence/WO-006/README.md:64`, `host-qualification.md:56`, `:91`, `:147` and `docs/final-reviews/WO-006/RECORDS-PR.md:8`: four links to `decisions.md`, which `target-records` moved into DotLn-Angular at 16:50Z on 2026-10-21, and one line quoting the operator-run publish command with its worktree path; `main` fails the same five with the v0.88.0 runtime, so the failure came in with #20 | the gate on the update branch; `node scripts/docs-check.mjs` on `main` |
| The declaration | the update branch's second commit (`4656df5`) declares the four links historical in `docs/control/doc-baseline.json` with the note shape the 2026-10-20 pass used for WO-005, and the home-path line by its fingerprint in the baseline's first `homePaths` entry; `docs-check` then passes with 10 declared link occurrences and 1 declared home-path line; the records are untouched | the commit; the second gate run |
| The plan gate's defect | `plan` and `plan-refutation-current` fail with `execution amendment decision must be a contained regular file`: `amendmentDecision` in `scripts/lib/plan-receipts.mjs` requires `docs/evidence/WO-006/decisions.md` to be a contained regular file before it calls `readDecisions`, which at v0.93.0 returns all 26 of WO-006's decisions through the target binding; WO-006's three `PlanExecutionAmended` events of 2026-10-21 (12:45Z, 13:13Z and 14:09Z, all binding D007) predate the move at 16:50Z. `npm run plan -- check` on `main` fails the same way at v0.88.0. WO-006 is the first closed target order with an execution amendment, so the reader had never met a moved decision. The probe: `readDecisions(root, { workOrder: "WO-006" })` returns 26 rows, `WO-006-D001` to `D026`, at the launchpad path through the binding | the gate on the update branch; the node probe; `git show main:scripts/lib/plan-receipts.mjs` |
| The receipt helper under the defect | `fileDirectRefutation` (`scripts/lib/plan-direct.mjs`) validates, screens, writes and commits the receipt pair, then calls `checkPlanGate`; a failing gate throws after the commit, so the receipt files and the command exits nonzero | the function's source |
| Pull request #21 | `:arrow_up: Take starter v0.93.0`, opened ready at 15:37Z with the two inherited failures named, merged by the operator at 15:40Z; `update --finish` fetched, checked the fast-forward, advanced `main` to `3ee154d` and ran bootstrap (one preparation step) | `gh pr create`, the finish output |
| Core's answers, read at v0.93.0 | items 2 to 5 of the UI pass's block landed in v0.92.0 and are confirmed in the field by the board probe (zero paths, the `orders` section available, the schemas present, `npm run console` running); item 6 landed in v0.90.0 and is confirmed by today's finish; item 10 landed in v0.93.0 (the gate summary's lane-wait line observed); items 1, 7, 8 and 9 are acknowledged; the vocabulary ruling and the admission narrowing landed in v0.91.0 and v0.90.0; the records-publish correction WO-006's review needed (`resume correct --set productGate`) is not answered in core's block | core's §4.2, §6 and §13; the probes |
| The host admission | WO-006's three publication attempts: the verifier's piped spelling (no admission row; classifier denial), the plain spelling (admission withheld on byte equality; classifier denial), and the operator's `!` run; the final review's `cd`-prefixed spelling (no admission row; the classifier allowed it without a prompt). No live publish has yet seen the hook's `allow` meet the classifier | `docs/evidence/WO-006/host-qualification.md` |
| The vocabulary | `docs/control/outward-vocabulary.json` on `main` carried `terms` with one opaque placeholder (the operator's edit of 2026-10-21, committed with WO-006's records); at v0.93.0 the key is read as `reviewTerms` with an advisory and an empty list is admitted; the private local-terms list is present (count not read; its terms are never printed) and its lines' modes are the operator's | the file; `npm run terms -- check`; `validateOutwardVocabulary` at v0.93.0 |
| The loopback shape | `GET /uifa-board-v1` and `GET /runtime-status-v1` answer a caller on `127.0.0.1` whose `Host` is `127.0.0.1:<bound port>`, whose `Origin` is absent or `http(s)://127.0.0.1` or `localhost` with any port, and whose `Authorization` is `Bearer <token>`; the descriptor `console-loopback-v1.json` in the resident's store carries host, port and token; `GET /console-commands-v1` and `POST /console-commands-v1/invoke` admit the same local origin; a missing projection is `503` in the console refusal shape; `@dotln/console/client` exports `readBoard(connection)` and `readRuntimeStatus(connection)` with no Node API | `packages/skeleton/dist/src/console-loopback.js`; `packages/console/dist/src/console-client.js`; core WO-225's notes |
| The platform's console principle | product 04 §Later console hosts now carries the operator's direction of 2026-10-21 (core's capture): the console serves operator flow and knowledge, never a skin over data; the method is pairwise comparison of candidate screens the operator judges; UI state persists in a host-owned store apart from control records; using the console never writes a control record or disturbs a gate; a shell reads the projections of the checkout it points at over versioned contracts | `git show origin/main:docs/product/04-interfaces.md` |
| WO-006's decisions that name this pass | D021 (five conventions, the pass that edits WS-001), D022 (the UX ideation, persistence and isolation; the pass that sets WO-007's base), D023 (the speed and efficiency preference for the operator record), D018 and D019 (the admission and the vocabulary), D024 (the board's local anchors), D014 and D015 (bundle attribution and the lint's three forms), D005 (app grouping) | `docs/dotln/evidence/WO-006/decisions.md` in the target |
| The mining run | an unofficial research run the operator authorized on 2026-10-22 over 235 of 238 intake files, ten probed works, six mapped works, a target operating model, five DotLn-Angular design documents, toys and critic notes; 163 open decisions of which 15 are to be decided first, OD-021 (where the forward Angular work lives) among them; its README names audit creep, unrepaired critic findings and unverified maps as known defects; its dispatch file is the operator's pasted prompt | the run's README and `PLANNING-DISPATCH.md` |

## 5. The operator's direction, synthesized

**The update first.** The outcome asked for is the fork at starter v0.93.0
with the planning pass on top of it, so that core's fixes serve the pass.
The pass took the update through pull request #21 before opening its
branch, the operator merged it within minutes, and the session finished it
with the kit's new command (D1).

**A standard pass.** Between orders, after WO-006's close: WO-007's base
and the amendments receipt 006 left for this pass, the fired register
rows, core's answers read at the new kit, the operator record, and the
prompt for the next platform pass (D3, D4, D7, D10, D11, D14).

**The mining run, paused.** The operator proposed pausing this fork's
take-in of their run if the pass agreed; it agrees (D8): the run's own
entry says the first DotLn-Angular slice waits on decisions the platform
pass puts to the operator, and that pass is the run's designed consumer.
The fork records the run as context with its reversal condition and takes
the routed fork blocks later.

**Where decisions live.** The operator asked whether a target order's
decisions living in the target is an issue. It is not; the kit reader that
still wants the launchpad file is (D2).

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 Starter v0.93.0 is taken through update pull request #21, opened
  ready from `main` before the planning branch, with the inherited
  document failure declared historical on the update branch and the
  inherited plan-gate failure named, not hidden.** Source: the operator's
  dispatch and their ordering direction (capture §1); README §Taking
  upstream updates; the 2026-10-21 pass's D1 and D5 (the mechanics are the
  pass's). The pull request is ready, not draft, because the update is
  clean and both remaining failures reproduce on `main` with the previous
  runtime; the declaration is instance-owned, in `docs/control/`, the
  route the 2026-10-20 pass used for WO-005, and the records are
  untouched. The session finished the merge with `update --finish` rather
  than a hand fast-forward and bootstrap, the route v0.90.0 added.
  Rejected: a draft (nothing in the update is red; a draft would hold back
  the fixes the operator asked for); opening the planning branch first
  (the operator's direction, and the pass would have sat on the v0.88.0
  reader); leaving the five record lines failing (the update branch's gate
  would not have run its plan tasks at all). NoOp cost: the fork a week
  behind the kit that answers its own requests. Reopen: #21 is reverted,
  or a kit release changes the baseline's shape.
- **D2 The plan gate's moved-record reader is core's defect, the first and
  blocking item of §11, and this fork works under it rather than around
  it: the pass's own document gate shows the two plan tasks red, the
  refutation receipt files because the helper commits before it runs the
  gate, WO-007 and WO-008 carry the state as a known issue, and activation
  is not blocked while verification is, with the operator's waive off-ramp
  named as the alternative to waiting.** Source: §4 (the probe showing
  `readDecisions` already follows the binding; only the containment check
  refuses); the operator's question of 15:50Z. Every order's last criterion
  names `npm run test:docs`, so no order in this fork can pass verification
  until a starter release carries the fix and the fork takes it, or the
  operator waives that clause (`npm run resume -- waive`, never by the
  order's own executor, with their words recorded). Rejected: a fork-local
  patch of `scripts/lib/plan-receipts.mjs` (the true-fork path the README
  names; `launchpad verify` would report it and the kit would never merge
  the change); a local copy of `decisions.md` beside the binding (two
  copies of one record, which the move was designed to prevent, and the
  docs-check declarations would then be wrong); `operator override:` for
  ordinary verification (a recovery control, recorded as such). NoOp cost:
  WO-007 implemented and waiting at verification. Reopen: core's release
  notes name the fix; then a pass, or the operator's `planning: bring in
  latest upstream`, takes it before WO-007's verification.
- **D3 WO-007 is made ready on its base: `90fa6e8d` (WO-006's merge
  commit), the observed gap restated at that base, the nine amendments
  receipt 006 named, WO-006-D022's persistence and isolation requirements,
  the platform's loopback route shape, the shell's notices container, the
  board's local anchors (D024), the scripts reference (D021 (d)), rule 12
  in the templates it writes, the publication rules of v0.91.0 with the
  `!` fallback named, the records-publish correction route, `Target
  release notes: reviewed`, and the plan-gate carry-in.** Source: receipt
  006's known issues (a) to (i), now disposed (§9.1); WO-006-D022 and
  D024; product 04 §Later console hosts; WO-225's loopback; WO-227's
  rules; the operator's note on the Release text (core's §5, note 6). The
  route shape is the amendment with a design reason: `BoardApi` requests
  `/uifa-board-v1` under a console base URL and the interceptor attaches
  the bearer token only there, so the live-view member changes
  configuration and the token's arrival, not the data path; the handler
  mocks the real shape, as D3 of the UI pass said it would once core
  served one. Persistence starts in browser storage under one key prefix
  through one store feature, because I1 names a store the app owns apart
  from control records and nothing else exists yet; I2 is written as a
  criterion the spec and a grep can judge. The fixture is not refreshed
  (33 visual baselines rest on it; the schema's provenance moves to the
  kit file with the same digest). Rejected: a house `GET /board` path
  (the live member would rewrite the handler and the API); persisting UI
  state in the platform host (no host runs for this launchpad; I1 names
  the app's own store); the app root as the notices container (rule 2
  keeps the app slim; the shell library owns containers); refreshing the
  fixture now (visual churn for no criterion). NoOp cost: an order that
  mocks a shape the platform does not serve, and a selected panel lost on
  every reload. Reopen: WO-006's facade shape changes before activation,
  or core changes the loopback's routes or token form.
- **D4 WO-008 is amended for the same publication rules, the reviewed
  release notes and the plan-gate carry-in; its base stays provisional
  until WO-007 merges.** Source: D3; the orders' texts. Rejected: leaving
  WO-008 at the v0.87.0 wording (its publish step would tell an executor
  to do what v0.91.0 refuses). Reopen: WO-007 merges.
- **D5 The outward vocabulary reads `reviewTerms: []`; the placeholder
  term and the `terms` key go; `launchpad`, `gem` and `mask` are ordinary
  words in DotLn-Angular; the private local-terms list's modes are the
  operator's to mark before WO-007's first publish.** Source: core's
  ruling of 2026-10-21 (§6.1 of its pass: the list is a review list, an
  empty list is admitted from WO-227's release, keep the placeholder until
  then); WO-006-D019's follow-up; the operator's words of 2026-10-21 that
  they would raise the change in this pass (paraphrased in the
  host-qualification record). The host's classifier denied the first
  write of this file as a security weakening; the operator approved the
  call (capture §1), and the edit stands: the placeholder reviewed
  nothing, and at v0.91.0 a review word refuses nothing on its own. The
  pass cannot read or edit the private list and says so. Rejected:
  listing words to review (none the operator named; a word is added when
  a publish shows one worth reviewing). Reopen: a publish names a word the
  operator wants reviewed, or core changes the list's semantics.
- **D6 The literal host-rules self order is not filed; WO-007's draft
  publish under v0.90.0's admission is the first live observation of a
  hook `allow` meeting the host's classifier, the `!` run is WO-007's
  named fallback for that one step, and the next pass files the self order
  if the classifier denies an admitted call.** Source: WO-006's three
  attempts (§4: two denials with no admission or a withheld one, one allow
  with no admission); core's §6.2 (no page states whether a hook allow
  prevails; only a live publish decides); the operator record (a trust
  entry a publication step needs is named in the order before
  activation). Rejected: filing the self order now (an unqualified
  mechanism, a full cycle paid before the observation it would answer,
  and blocked at verification by D2 like every order); restoring host
  allow entries (the operator removed them on purpose). NoOp cost: at most
  one hand step in WO-007's draft publish. Reopen: the classifier denies
  the admitted call, or core qualifies the host.
- **D7 The live view, the command surface and the readable work view
  stay unfiled although their platform contracts landed in v0.92.0: the
  screens are the operator's pairwise judgment over candidates the UX
  ideation produces, WO-007 carries the route shape so the live member is
  configuration and the token's arrival, and the command surface also
  waits for WO-008's session model.** Source: the fired rows (§3); product
  04's method; D022. Rejected: filing the live view now (its first design
  questions, a resident for this launchpad and how the token reaches a
  browser, are not decided, and the operator asked for candidates to judge
  before a specification). NoOp cost: none until WO-007 merges. Reopen:
  WO-007 merged and a candidate chosen (the live view, the work view);
  WO-008 merged and a candidate chosen (the command surface).
- **D8 The mining run is context in this pass, not source: its take-in
  waits for the platform's planning pass, which the operator's own prompt
  dispatches; the UX ideation WO-006-D022 asks for runs in this fork after
  that pass merges, over the routed fork blocks; and the persistence and
  isolation halves of D022, which are concrete, go into WO-007 and WS-001
  now.** Source: the operator's proposal to pause (capture §1); the run's
  README (the first DotLn-Angular slice waits on OD-021, OD-023 to OD-026
  and OD-163; the critics' audit-creep warning; the unrepaired Angular
  critic findings) and its dispatch file (the paste is the designed route;
  the run holds the operator's own designs for DotLn-Angular, which the
  platform pass routes as fork blocks). Taking the run here first would
  route designs the operator has not decided where to house, duplicate
  the platform pass's routing, and spend research workers on a corpus the
  operator already read once under their own authorization. The pass
  read the README and the dispatch file only, routed nothing, and cites
  no KI or OD beyond those two files' own lists. Rejected: running the
  research fan-out the operator record asks for (it asks for it instead
  of asking the operator to restate the product; here the operator has
  already done the research, and the platform pass is where it lands);
  consuming a part of the run (the operator's rule for the platform pass
  is drop nothing silently, and a partial take-in here would). NoOp cost:
  the UX ideation one platform pass later; WO-007 does not wait on it.
  Reopen: the platform pass that consumes the run merges, and its answer
  block carries the fork blocks; then the fork's next pass takes them in
  and runs the ideation with the operator's pairwise test.
- **D9 WS-001 is amended: the member rows and delivery states (WO-006
  merged and released; WO-007 based), rule 12 gains one projected element
  per line and the 40-line section threshold (WO-006-D021 (a) and (b)),
  §The console gains the shipped state, the loopback shape, the operating
  rules I1 to I3, the pairwise method and the updated road table, and
  the framework sentence records core's decline.** Source: D021's five
  conventions, of which (a) and (b) are conventions a workstream states,
  (d) is WO-007's document, and (c) and (e) are a pass over the house
  library's templates, recorded as C1; product 04. The 40-line threshold
  is the pass's number from the one instance the operator named (a
  104-line template and 58 lines of styles in one file); the operator
  may replace it. Rejected: allocating (c) and (e) to WO-007 (a pass over
  the house library's templates is not WO-007's outcome). Reopen: the
  operator names another threshold, or the first order that touches the
  house library's templates.
- **D10 The register: fourteen rows re-disposed as §8 says, five
  candidate rows minted and deferred, the rest left with their
  conditions unchanged.** Source: §3 and §8. Reopen: as each row says.
- **D11 The operator record changes, dated 2026-10-23: the pace (WO-006's
  close, the update first, the plan-gate state); the finish route; the
  Fable worker rule; the speed and efficiency preference (WO-006-D023,
  the operator's words of 2026-10-21); the operator's own research runs
  and the pause; where a target order's records live; outward words.**
  Source: today's capture and WO-006-D023's capture. Reopen: the operator
  changes any of them.
- **D12 The fired timing hold and the ten unknown rows stay NoOps; the
  document gate's wall-clock row is settled by core's answer and
  v0.93.0's attribution, with this pass's own readings recorded.** The
  `target-worktree` hold rests on the same two samples the two previous
  passes read. The wall-clock row's cause was another checkout's gate in
  the per-user lane registry (core's A2 and B10); v0.93.0 labels holders
  and reports the wait apart from the work; today's runs were 15.7 s and
  16.6 s wall with 0.1 s of wait. The slow condition's own medians are
  unknown while its probe fails on D2's defect. Reopen: a
  `target-worktree:file:*` row above one and a half times its thirty-day
  median once three samples exist; the document gate's execution-only
  median above 30 s once the probe runs again.
- **D13 WO-001-D014's row is settled by today's observation: the prompt
  hook dispatched `planning:` from the first content line of a message
  that continued for several lines and carried a pasted block, resolving
  the planner role (v0.90.0's first-line rule).** Source: the hook's
  dispatch context at 15:25Z. Reopen: a dispatch line fails to resolve
  under the same shape.
- **D14 Requests to core are written as the operator's prompt (§11),
  blocking item first; the refuter runs as the default `dotln-worker`
  because the dispatch line did not name Fable, and the receipt records
  the worker type.** Source: the operator record's standing preference;
  v0.90.0's rule. Reopen: the operator names Fable on a dispatch line.
- **D15 WO-006's close is complete and recorded here: DotLn-Angular #4
  merged at `90fa6e8d`, `DotLn Angular v0.1.0` published at that commit
  on 2026-10-21, the retained record present, one `RecordCorrected`
  off-ramp binding the final review's product gate (the records-publish
  refusal, carried to core as §11 item 2), the first final review of this
  fork with new-scope findings only and no escape.** Source: §2.
  Rejected: nothing to repair. Reopen: a later `plan failures` reads the
  close as withheld or absent.

Immaterial lenses for the document-only writes (orders, workstream,
profile, operator record, register, ledger, vocabulary): the same as the
previous passes'; no code, configuration beyond the instance's own
`docs/control/`, activation, tag, publication in the target, or merge.

## 7. Core's answers of 2026-10-21, read against v0.93.0

Core's fork-notes pass read the fork at `8ba47c1` and answered both
request blocks. What this pass does with each answer: A1 and A3 to A8,
B1, B7, B8 and B9 are acknowledged and need nothing here; A2 and B10 are
settled by D12; B2 to B5 are confirmed in the field by the board probe
(zero paths, the `orders` section with nine rows, the two schemas as kit
files, `npm run console` running on the carried runtime) and shape WO-007
(D3); B6 is confirmed by today's `update --finish`; the vocabulary ruling
is applied by D5; the admission narrowing and the near-miss advisory are
written into WO-007's and WO-008's publish steps (D3, D4); the Release
text answer is applied through the `Target release notes` header (D3,
D4); the evidence-line answer is taken (no template line asks the close to
fill it; WO-007's evidence names the host-qualification record the roles
write at their phases). Core's classification stands: nothing it filed
blocks WO-007 or WO-008. What core did not see, because it happened after
its read or was never asked: the plan gate's moved-record reader (D2) and
the records-publish correction (D15), both in §11.

## 8. The register

Twenty-six pending rows read at revision `1f601740…`. Dispositions applied
in one batch after `followups --sync` minted the rows of §10:

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-b0b01939c2ecf037 | WO-006-D021 (five conventions) | settled: (a) and (b) in WS-001 rule 12 (D9); (d) WO-007's scripts reference (D3); (c) and (e) the candidate C1 |
| FUP-52178afa5a081d86 | WO-006-D022 (the UX ideation, persistence, isolation) | deferred: persistence and isolation in WO-007 and WS-001 (D3, D9); the ideation after the platform pass consumes the 2026-10-22 run (D8) |
| FUP-39e7a2f6db6b7f84 | WO-006-D019 (the fixture's name) | settled: v0.91.0 made the list a review list and D5 empties it; the fixture keeps its name |
| FUP-e22968a92b1bb18c | WO-006-D018 (the admission for an order that edits its registration) | settled: v0.90.0 compares publication fields and names a hidden helper; the classifier half is FUP-98c85b750cb36bd4 |
| FUP-98c85b750cb36bd4 | C2 of 2026-10-19 (the literal host-rules fallback) | deferred: WO-007's draft publish under v0.90.0's admission is the observation; a classifier denial of an admitted call files the self order (D6) |
| FUP-2479f6d32b2396a8 | WO-004-D013 (a trust entry at registration) | deferred: the same observation (D6) |
| FUP-db45bfeb533eeee6 | C7 of 2026-10-21 (the framework evidence to core) | settled: core declined the decision; the readings are the fork's own, refined by FUP-7bbf34bdd0925297 |
| FUP-2af7f27fd0e0fe34 | C1 of 2026-10-21 (the live view) | deferred: the contract landed in v0.92.0; WO-007 carries the route shape; reopens when WO-007 merges and the operator chooses its candidate (D7) |
| FUP-1f5953e14b1077b4 | C6 of 2026-10-21 (the readable work view) | deferred: the Work panel's `orders` section reads an export's segments; reopens when the operator chooses its candidate (D7) |
| FUP-d50229455aad453c | C2 of 2026-10-21 (the command surface) | deferred: the loopback serves the contract to a local origin; reopens when WO-008 merges and the operator chooses its candidate (D7) |
| FUP-d771ffe939902128 | C2 of 2026-10-21 (the document gate's wall-clock) | settled: another checkout's gate held the lanes; v0.93.0 attributes the wait (D12) |
| FUP-a36dae4a6766b9ef | WO-001-D014 (the prompt hook's phrase) | settled: observed today under v0.90.0's first-line rule (D13) |
| FUP-e9c71a41e7c1eb8b | WO-006-D024 (the board's local anchors) | allocated to WO-007 (step 6, criterion 6) |
| FUP-bad9c9ecbecaca67 | WO-006-D013 (the skip link and the anchors) | duplicate: the skip link was repaired by D024; its anchor remainder is FUP-e9c71a41e7c1eb8b |
| the other twelve | WO-005-D009, D011; WO-006-D005, D014, D015; WO-012-D008; WO-004-D010; C5 of 2026-10-19; C1 of 2026-10-21 (the Entropy Reducer); C3, C4, C5 of the UI pass | left as they are with their conditions unchanged |

## 9. Orders amended and the sequence

WO-006, closed, leaves the sequence. WO-007 is rewritten on its base (D3)
and WO-008 amended (D4); the sequence reads WO-007, WO-008, serial,
unchanged in order. WS-001 carries the member rows, rule 12, §The console
and the delivery states (D9). The profile carries WO-006's merge and
close, the v0.90.0 and v0.91.0 publication rules, the first close and the
kit-shipped contracts. The operator record carries D11.

### 9.1 Receipt 006's known issues on WO-007, disposed

(a) criterion 2's fixture set and step 8's expected count are written; (b)
the hygiene check resolves tiers from the source prefix and inspects
`withCommand` arguments; (c) criterion 5's per-path grep is dropped; (d)
criterion 4 reads at least one `setupWorker` and names the option as the
installed declaration spells it; (e) the shell gains a `containers/`
directory with the notices container and a `ShellFacade`; (f) only mocked
builds render the board, and a production build without a host shows the
unavailable state naming the console base URL; (g) the flag is
`sourcesFooter`; (h) this pass's refutation is counted in the Cost line;
(i) the deliverables name the board store, API and handlers. Receipt 006's
five issues on WO-006 were the executor's carry-ins and are closed with
the order.

### 9.2 Known issues from this pass's receipt, by order

The refutation (§14) returned `aligned-with-findings` with ten known
issues on WO-007 and no hold; WO-008 is carried by hash. WO-007 is frozen
at the judged subject, and it cannot be verified before the starter carries
core's plan-gate fix (D2), so the pass that takes that update amends
WO-007 for these ten and pays its refutation then; they are listed here so
nothing is re-derived. An executor who activates WO-007 before that
amendment meets each inside the order's authority and records it in the
decisions file.

WO-007, amendments for the next pass:

- **(a) Criterion 5 and the worker file.** The Angular builder copies
  `public/` into every configuration's output, so the production bundle
  check must also assert that `dist/apps/dotln/browser/mockServiceWorker.js`
  is absent (the production configuration excludes the worker asset, or
  the worker lives outside `public/`).
- **(b) Criteria 5 and 6 need a third build configuration.** Production
  ships with mocks and overrides off; the e2e target serves a named
  `mocked` configuration (production optimization, `environment.mocks`
  and `featureFlagOverrides` on, its own environment file), recorded in
  the decisions file, and the published artifact stays the production
  configuration.
- **(c) Criterion 2 and the hygiene check's scope.** The check reads every
  non-spec `*.ts` under `libs` and `apps` that calls `dispatch(`,
  `injectDispatch(` or `Dispatcher`, not only stores and facades; the
  interceptor's and `ErrorHandler`'s dispatches to app-tier events are
  flows rule 16 admits (data-access to app).
- **(d) Criterion 1 and the `event(` creator.** The grep also refuses the
  standalone `event(` creator outside `libs/shared/events`.
- **(e) Criterion 7's Node grep.** Scoped to browser-side sources
  (excluding `*.config.ts` and the e2e project) and widened to bare
  specifiers (`fs`, `path`, `os`, `child_process`) and dynamic
  `import('node:`.
- **(f) Persisted state's failure behavior and the storage binding.** A
  throwing or blocked storage, a non-JSON value or an unknown panel id
  degrade to the in-memory default panel, each with a spec; the real
  `localStorage` is bound through a token in `data-access`, never under
  `apps/dotln/src`, so WO-008's criterion 1 grep stays clean.
- **(g) The worker start.** Awaited with a timeout; a rejected import or
  start falls through to bootstrap with one logged line, and a test with
  the worker file removed shows the shell and the unavailable state.
- **(h) The token's scope and its source.** The interceptor matches the
  console origin by parsed URL (origin and path prefix with a trailing
  slash), with specs for a non-console URL and a prefix-sharing origin;
  `console.token` is `null` in every environment file and no primer
  variable bakes a token into the bundle; the token's arrival is the
  live-view member's (C5).
- **(i) Criterion 9's waiver path.** The pass that takes the update
  decides, before activation, whether the fix shipped; a waiver is a
  recorded operator decision, never a carried default.
- **(j) The cross-checkout clause.** Browser storage is per origin, so the
  objective reads "across reloads on the same origin"; the cross-checkout
  persistence is the live-view member's host-owned store question.

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The house library's granularity, shared-Sass and blank-lines pass:
  components as building blocks, shared Sass where three components
  repeat a rule, about a fifth more blank lines where they help a reader
  through an autofixing rule, and the hugging layout reformatted where it
  is met (WO-006-D021 (c) and (e)).** Reopen when the first order after
  WO-007 touches the house library's templates, or the operator directs
  the pass; then it is filed as one order on `libs/shared/ui`.
- **C2 The literal host-rules self order: `hostRules: "literal"` on the
  `dotln-angular` registration so `worktree start` writes WO-NNN's exact
  publish rules into the launchpad's local host settings and the close
  removes them (D6).** Reopen when WO-007's draft publish, admitted by the
  hook, is denied by the host's classifier; then the next pass files it
  before WO-008.
- **C3 The UX ideation over the console: two or three candidate screens
  built from the operator's tasks, each saying what it lets the operator
  do and what it shows on demand, judged pairwise by the operator
  (WO-006-D022; D8).** Reopen when the platform's planning pass that
  consumes the 2026-10-22 intake mining run merges and its answer block
  carries the routed fork blocks; then the fork's next pass runs it with
  research workers over the platform's records and those blocks.
- **C4 Taking the starter release that carries core's fix for the plan
  gate's moved-record reader (D2).** Reopen when core's release notes
  name the fix; then a pass, or the operator's `planning: bring in latest
  upstream`, takes it before WO-007's verification, or the operator waives
  the gate clause of WO-007's criterion 9 instead.
- **C5 The live-view member's first design: a resident for this launchpad
  and how its loopback token reaches the browser (a connect screen, a
  primer, or a host-written file), with `GET /runtime-status-v1` beside
  the board (D7).** Reopen when C3's candidate for the live view is chosen
  and WO-007 is merged.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged except where §8 says
otherwise: CI on the fork, required approvals, retitling the two published
`DotLn` Releases, a lane pair of small self orders (the main-rules pass's
C2 to C5), the workstream pass's C1 to C10 (typed translation keys, the
WoW tooling app, the example API and a real identity provider, the
console feature now cut as D3 of the UI pass, production environment, one
word that runs the queue, kit gaps, an issue-filing helper, orders
spanning repositories, a second feature by convention), the Entropy
Reducer on WS-001's repositories, and the UI pass's C3 to C5 (the pattern
workshop, the arrival screen, counterfactuals and QA).

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning
session (D14), in either order with their own mining-run dispatch; the
fork's next pass reads both answers. Each item names the record it rests
on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its standard pass of 2026-10-23 on starter v0.93.0 (docs/planning/standard-pass-v0-93-0-2026-10-23.md §4, §6 and §11), answering your fork-notes pass of 2026-10-21 (§13). Read each against the record it names; file, decline or defer each with its reopening condition, and say for item 1 whether it blocks the fork's next order.

1. Blocking: the plan gate reads an execution amendment's decision only from a contained launchpad file. amendmentDecision in scripts/lib/plan-receipts.mjs checks containedRegularFile(docs/evidence/WO-NNN/decisions.md) before it calls readDecisions, which at v0.93.0 already returns the moved decisions through their target binding (the fork's probe: 26 rows for WO-006 at the launchpad path). WO-006 is the first closed target order with an execution amendment (three PlanExecutionAmended events on 2026-10-21 binding WO-006-D007, before target-records moved the file at 16:50Z), so npm run plan -- check and the plan and plan-refutation-current tasks of npm run test:docs fail on every branch of the fork with "execution amendment decision must be a contained regular file", at v0.88.0 and at v0.93.0. Every order's last criterion names npm run test:docs, so no order in the fork can pass verification until a starter release carries the fix. Ask: judge the decision through readDecisions and the binding, as docs-check does since WO-223, and ship it as the next release; until then the fork's WO-007 can be implemented and not verified, or its operator waives the clause.

2. A target order's records publish needs a correction the kit could avoid. WO-006's final review (2026-10-21) published the launchpad's records branch only after npm run resume -- correct 8 --set productGate=<evidenceRef>: a target order's final-review-result records no launchpad product gate, while the records publish reads one from the review's control event, so the review session ran npm test -- --review at the integrated identity and bound it by correction (docs/evidence/WO-006/README.md §Final review publication). Ask: let a target order's final-review-result carry the launchpad's complete row, or let the records publish accept a passing row at the identity without a correction.

3. Confirmations in the field at v0.93.0: board --json renders the fork's launchpad with zero home or temporary paths, 5 panels, 21 sources (10 available), the Work panel's orders section available with 9 rows, 304,363 bytes (your B2 to B5); npm run console runs on the carried runtime; the two schemas are kit files with the digests the fork had pinned; node scripts/launchpad.mjs update --finish fetched, checked the fast-forward, advanced main and ran bootstrap after #21 (your B6); the gate summary prints the lane-wait line with its relation (0.1 s behind checkout unknown) and harness lanes lists capacity 8 with no holders (your A2 and B10); the dispatch was read from the first content line of a multi-line message carrying a pasted block (WO-226 D010; the fork's WO-001-D014 row is settled).

4. The document gate's medians under WO-229: the fork cannot measure them while item 1 fails the probe (plan conditions --slow reports the plan-check and document-gate samples unknown with probe exit 1); the two gates it ran today took 15.72 s and 16.64 s wall with 0.1 s of lane wait. The fork's register row is settled on your answer; the next reading waits on item 1.

5. The outward vocabulary: the fork renamed terms to reviewTerms and emptied the list (your §6.1); the operator's private list keeps its lines unmarked until the operator marks them, so under WO-227 they are review items at the fork's next publish. No ask; recorded so the reviewer's confirmation at WO-007's publish reads as intended.

6. The host admission at the fork's next publish: WO-007's draft publish runs the plain node spelling with no prefix under WO-226's admission, so it is the first episode in which the hook's allow can meet the host's classifier; the fork records the admission row and the host's decision in WO-007's host-qualification record and files the literal host-rules self order only if the classifier denies. Read it as the live qualification your §6.2 waits for when it lands.

7. The console after the board: the fork wrote the operator's three operating requirements (persistence in an app-owned store, isolation from control and gates, versioned contracts) and the pairwise method into WS-001 §The console; WO-007 mocks GET /uifa-board-v1 under a console base URL with the bearer token attached only there, so the live member changes configuration and the token's arrival. Question for the contracts: how should a browser shell obtain the loopback token from console-loopback-v1.json without the operator pasting it, and is a resident for an exported instance expected to run from npm run skeleton or another command? The fork's live-view candidate waits on that answer and on the operator's screen choice.

8. The operator's 2026-10-22 intake mining run: the fork's pass paused its own take-in (the run's README says the first DotLn-Angular slice waits on OD-021, OD-023 to OD-026 and OD-163, which your pass puts to the operator), read only the run's README and dispatch file, routed nothing, and takes the routed fork blocks from your answer block afterwards; its UX ideation over the console runs after that. If your pass routes a DotLn-Angular toy, slice or riff card to the fork, name it in the answer block with its OD decisions.

9. Acknowledged: your §4.1 items 1, 3 to 8 and §4.2 items 1, 7, 8, 9; WO-219 and WO-224 still queued (the fork's two rows keep waiting).
```

## 12. Write-backs

- `docs/work-orders/WO-007-events-stores-data-access.md`: rewritten on
  its base (D3).
- `docs/work-orders/WO-008-authentication-and-permissions.md`: the
  publication rules, the release-notes header, the carry-in (D4).
- `docs/planning/sequence.md`: WO-006 leaves.
- `docs/workstreams/WS-001-dotln-angular.md`: the member rows, the
  dependency plan, rule 12, §The console (the shipped state, the
  operating rules I1 to I3, the method, the road table, the framework
  sentence), the delivery states (D9).
- `docs/repositories/dotln-angular.md`: WO-006's merge and close, MSW's
  arrival, the v0.90.0 and v0.91.0 publication rules, the first close and
  the reviewed notes, the kit-shipped contracts and the loopback (D3).
- `docs/operator/README.md`: the dated bullets of D11.
- `docs/control/outward-vocabulary.json`: `reviewTerms: []` (D5).
- `docs/control/doc-baseline.json`: the five declarations, on the update
  branch before this pass (D1).
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the
  candidates of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path, the
foundation where a feature is added by convention: WO-007 ready on a real
base, with the shape the platform now serves and the requirements the
operator stated for the console, so the next merge moves the console from
a recorded board to a loaded one (D3); the kit's defect named where it
blocks, with the operator's two routes around the wait stated plainly
(D2); the road after WO-008 kept as the operator's judgment over candidates
rather than a specification written first (D7, D8); and core receiving the
one observation only a consumer could make, first (D14). What the pass
refuses to do: patch the kit in the fork, duplicate a moved record,
override a gate for ordinary work, file an order on an unqualified host
mechanism, or route the operator's research before the operator has
decided where it lives. What stays manual by the kit's design: the merge
of this pass, the worktree start, the resume phrases, the paste to core
and the marking of the private list. Lenses that changed the plan: seeking
the wrong goal (the house `GET /board` replaced by the platform's route
shape); shifting the burden (the plan-gate defect is core's to fix, and
the fork does not carry a patched reader to pass its own gate); process
activity is not progress (no self order for host rules before the
observation that would justify it; no UX ideation before the research the
operator already did is routed); the operator's own trap, acting before
understanding (the mining run read at its entry only, and paused on their
word). The outcome matched the aim as read at entry: the update first, a
standard pass on top of it, the mining run paused with its reversal
condition recorded.

Cost: no research workers; one refuter (§14); the board probe 1,050 ms;
the plan-start, conditions and failures reads about 25 s together; the
update's four gates about 30 s of task time; `npm run meta -- --plan-cost`
records the table after the subject commit; the handoff reading of process
cost is in §14 and the pull request. Document ceilings: no product
document changed in this pass (`docs/product/purpose.md` keeps its
1,939-byte ceiling at 1,762 non-exempt bytes; the kit's product documents
are kit files and carry no instance ceiling).

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check` (expected to fail on
D2's defect until core ships the fix), `npm run test:docs` (expected 12
passed, 2 failed, the two plan tasks).

Results at the subject commit `186ceb6` (cost table) over `4d7493c` (the
subject): `npm run meta` no budget breach (operator directions 4, up 3,
the operator's four messages of this session); `followups --sync` minted
five rows (§10's C1 to C5) and `--apply` took nineteen dispositions in
one batch from a contained ignored file (register revision `786352ff…`;
23 pending rows); `work-orders index --check` PASS (both pages current)
after the sequence's two entries were separated so they read serial, not
as a lane pair; `lineage index` regenerated and current; `docs-check`
PASS (1 product document; 10 declared historical link occurrences, 1
declared home-path line; the three pre-existing advisories on filed
records); `publication:check` reporting no editions declared; `plan
check` failing on D2's defect. The document gate before the receipt: 12
passed, 2 failed (`plan` and `plan-refutation-current`, the defect),
15.95 s of wall-clock, 14 fresh tasks, 0.1 s of lane wait behind checkout
unknown.

Refutation: one fresh `dotln-worker` (the default type; the dispatch line
named no Fable worker; the host read back `claude-opus-5-5` to the worker
and no effort) on the canonical prompt from `npm run plan -- refute` at
base `186ceb6`, default pass scope (WO-007 plus the sequence; WO-008
carried by hash), dispatched at 16:07:27Z. The worker returned its
judgment and statement in its final message, as briefed; the parent saved
them as ignored local files and filed the receipt. Receipt
[`2026-10-23-planning-668813faab47b0ee-007`](refutations/2026-10-23-planning-668813faab47b0ee-007.md),
verdict `aligned-with-findings`, 0 holds, 10 known issues (§9.2),
dispatch-to-file 542,888 ms (9.0 minutes; the worker's own run 370,441 ms,
114,448 tokens, 16 tool uses). The worker's statement names what it read:
the whole prompt; WO-007 in full and four passages of WO-008; read-only
Git listings; no planning document, sequence file, cost table, receipt,
intake, operator record, ledger or decisions record; no kit, npm, network,
model or agent command; no write. Two of its shell attempts were refused
by the harness's active-gate hook and did not run. The judged, committed
and workspace subjects agree (`sha256:403f4b67…`). The receipt helper
committed the receipt pair (`1f05479`) and then exited 1 at the plan gate
on D2's defect, as §4 predicted; the receipt is filed and the gate state is
the kit's, not the pass's. After the receipt and the known-issues record,
the document gate at the handoff identity is recorded in the pull request.

Process cost at handoff (`node scripts/harness.mjs usage <session>`,
source `claude-transcript-message-usage`, scope `dispatch`, observed
2026-10-23T16:15:35Z): 21,236,125 total tokens (2,238 input, 20,566,974
cached input, 472,819 cache-write, 194,094 output; reasoning tokens and
cost unknown, the counters unavailable); 165 steps, 161 commands; 1 of 20
subagent admissions used, exact-observed, none unresolved. The fan-out
matched the plan stated in §1: one refuter, no research workers, no
descendants. The outcome matched the aim as read at entry: the update
first and merged, the pass on the new kit, WO-007 ready on its base, the
mining run paused with its reversal condition, and the blocking defect
named to core with its fix.
