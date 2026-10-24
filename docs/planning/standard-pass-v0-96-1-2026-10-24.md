# The standard pass on starter v0.96.1: the update first, core's second answers, WO-013's fix route, the fixture renames and the receipt-008 amendments, 2026-10-24

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-24 at 21:29Z naming a
standard pass with the latest upstream and carrying core's second answer
block of the day, which answers this fork's requests of 2026-10-24 (the
first pass, §11) and the blocker WO-013 met at its final review. The
dispatch is captured verbatim in ignored intake
(`docs/intake/notes/planning-2026-10-24-second.md`, SHA-256
`32a697b7c11563c62ceb8fefa10d796204364aec53ad1984e7409cf031eb6e11`), a
sibling record and never a source to copy from. The operator's one later
word in the session, that the update's merge was complete, is the go-ahead
the standing direction expects (the operator merges, the session finishes).

This document is planner synthesis of that capture; this instance's records
(the eight previous planning documents and their receipts, WS-001, the
operator record, the profile, the register, the control segments, the
orders); core's release notes for v0.95.0, v0.96.0 and v0.96.1 and the kit at
`5ad686d1`; WO-013's live records read from its worktree
(`../DotLn-Instance-wo013`: `docs/control/orders/WO-013.jsonl`,
`docs/evidence/WO-013/decisions.md` D008 and D009, VER-001 and FINAL-001,
all uncommitted there and the executor's to commit); WO-007's moved records
in the target (`docs/dotln/verifications/WO-007/VER-001.md` and `VER-002.md`
at `4304a9d5`); the target repository at `2ab4f285`; and the kit's own
sources where a decision needed them (`scripts/lib/outward-lint.mjs` for the
identifier matcher, `scripts/lib/plan-receipts.mjs` for the amendment
binding, `scripts/lib/work-order-workstream.mjs` for the workstream check).
The clean-room screen found public packages, a public-domain text, the
platform's public segments and the operator's own repositories; the only
private material read is the operator's own capture, paraphrased.

Authority: a document-only planning pass on
`planning/2026-10-24-standard-pass-v0-96-1` from clean `main` at `ac89626`
(after #26). The update ran before the branch opened, on the standing
direction of 2026-10-23 and 2026-10-24 that the update goes first so that
any fix reaches the planning branch: a detached preview worktree under
`.runtime/`, one merge on `chore/starter-update-v0.96.1`, one repair commit,
the gates, pull request #26, the operator's merge and
`node scripts/launchpad.mjs update --finish` on `main` (D1). The pass
amends six orders, activates nothing, publishes nothing in the target, edits
no active order's text and never merges. Its refutation is the pass's
independent verification (§14).

Fan-out plan, stated before the first spawn: one refuter, no research
workers, no descendants; the 20-admission cap leaves 19. The dispatch line
named no Fable worker, so the refuter is the default `dotln-worker`.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `36b2ae5` at the dispatch, clean (WO-007's review and records merged as #25); after #26, `main` at `ac89626` (starter v0.96.1, core `5ad686d1…`), bootstrapped by `update --finish` (35 generated surfaces, the local-terms list present) | `git status`, the finish output |
| WO-007 | phase `closed`; VER-001 `fail` (13:14Z, F1: the new application `ErrorHandler` discarded every error, a regression of behavior `main` had), repair at 14:41Z, VER-002 `pass`, FINAL-001 `pass`; merged in DotLn-Angular as #5 (`2ab4f285`, 16:23Z); `DotLn Angular v0.2.0` published 16:26Z | `npm run resume -- status --json`, `npm run plan -- failures`, the target's `docs/dotln/verifications/WO-007/`, `gh api`, `gh release list` |
| WO-013 | in its worktree (`wo-013` at `36b2ae5`), uncommitted: activated 16:32Z at `bc9133e9` (the provisional base, the target's empty initial commit), `ImplementationReady` 17:11Z, VER-001 `pass` 17:27Z (all seven criteria), FINAL-001 `fail` 17:40Z on D008's blocker; phase `needs-fix`, legal next action `fix`; the draft commit `1e24c088` has parent `2ab4f285` and the verified tree `df45f1b3`, 83 files; the publish was refused before any push because the Change table was composed from `bc9133e9` (515 files, 17 of them earlier orders' moved records whose identifiers the lint refuses). The launchpad's committed record does not see this yet: the index on `main` reads WO-013 as `draft` | the worktree's `WO-013.jsonl`, `decisions.md` D008 and D009, `current.md`, FINAL-001 |
| Upstream | three refresh commits past the v0.94.0 base: v0.95.0 (core WO-220, twenty boarded follow-ups, published 14:12Z), v0.96.0 (WO-080, workstreams from document to board and pilot, 17:31Z), v0.96.1 (WO-230, the merge-base publish and the plan gate's record-path filter, 21:25Z, four minutes before the dispatch); the tag `v0.96.1` dereferences to `upstream/main` `d61519d`; the preview reported 76 replaced, 3 added, 0 removed, 0 refused, 919 unchanged, no instance actions, build `fnv1a64:9a7073ea6ba64ffe` to `fnv1a64:89c252a87a21a514` | `git fetch upstream`, `gh release view` on `DylanBWood/DotLn`, the bounded preview from a detached worktree |
| The update's one repair | `npm run sync` on the merge refused the index: `WS-001: WO-011 must declare **Workstream:** WS-001 in its order`, the refusal core's v0.96.0 notes predicted for this fork; the one-line field added to WO-011 and WO-012 made the plan gate refuse their changed bytes against bound execution amendments (`unmatched execution amendment WO-011 row 1`, then `WO-012 row 3`); the gate's own withdraw route was used (D1) | the sync and gate outputs, `scripts/lib/plan-receipts.mjs` `requireMatchedAmendments` |
| The gates on the update branch | `harness check` 35 surfaces with no drift; `launchpad verify` 998 files at `5ad686d1`; `npm test` 7 passed in 13.22 s; `npm run test:docs` 14 passed in 15.25 s with 0.1 s of lane wait (12 passed and 2 failed before the withdrawals); `plan check` 8 receipts, 8 passes, three advisories (the target fixture names), the five advisories on the kit's own record paths gone | the gate summaries |
| Pull request #26 | `:arrow_up: Take starter v0.96.1`, opened ready at 21:45:12Z, merged by the operator at 21:46:06Z (`ac89626`); `update --finish` fetched, checked the fast-forward, advanced `main` and ran bootstrap (one preparation step) | `gh pr create`, `gh pr view`, the finish output |
| `plan start` | window since receipt 008: 1 failed verification (WO-007 VER-001), 1 repair, 1 order made ready, 2 withdrawn amendments, 0 off-ramps, 0 corrections; record: 1 of 10 final reviews with an escape; local: 3 interventions (1 unclassified), 0 host denials, 0 long phases, 0 repeated gate runs; reader scores unavailable (no profile record, no reader due); conditions 0 holding, 0 unknown, 145 decision conditions and 78 register rows not evaluated | `npm run plan -- start standard-pass-v0-96-1`, `npm run plan -- failures`, `npm run plan -- conditions` |
| Register | 24 pending rows at revision `6fb07acd…`, all deferred; the C7 row of the first 2026-10-24 pass fires on core's answer (§8); the two literal-host-rules rows (2026-10-19 C2 and 2026-10-23 C2) fire on this pass with WO-007's two publish observations in hand (§3, §8) | `npm run plan -- followups --export` |
| DotLn-Angular | `main` at `2ab4f285` (#5), two Releases (`v0.1.0`, `v0.2.0`), no open pull request; the registered clone clean at that commit; WO-013's target worktree `../DotLn-Angular-wo013` on `wo-013` at `2ab4f285` with the order's uncommitted tree | `gh api`, `gh pr list`, `git -C ../DotLn-Angular status` |
| The kit's board schema | `packages/console/uifa-board-v1.schema.json` at v0.96.1 has SHA-256 `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`, the digest the target's committed copy and WO-007 pin (core's item 4 holds at v0.96.1) | `shasum -a 256` |
| The fork's role stamps | at v0.96.1 the executor skill's `Origin` stamp carries 19 ids, each of the five other role skills 13, the worker type 6, unchanged from v0.94.0 (no role text changed in v0.96.1) | one script over `.claude/skills/dotln-*/SKILL.md` and `.claude/agents/dotln-worker.md` |
| The lint's matcher | `/(?<![\p{L}\p{N}_])(?:wo-[0-9]{3}(?:-d[0-9]{3})?|fup-…|ver-…|final-…|review-…|ws-[0-9]{3})(?![\p{L}\p{N}_])/u`; a body naming `segments/order-221.json`, `segments/order-226.json` and `order-221-derived-v0.json` passes `node scripts/outward-lint.mjs pr-body --target` (`launchpadIdentifiers: pass`), and the same body with `segments/WO-221.json` and `wo-221-derived-v0.json` is refused with two `identifier.launchpad` findings | `scripts/lib/outward-lint.mjs` lines 47 to 48; the two lint runs |
| The host | 16 logical CPUs, load 9.3 at the conditions read; lanes capacity 8, four holders from another checkout (the operator's other sessions) | the conditions output |

## 3. Reopening observations

Fired conditions, each re-disposed in §8: FUP-ffa034330edc5ff0 (C7 of the
first 2026-10-24 pass, the record-path advisory: core answered, D3 renames
the three fixtures and the kit's paths stay); FUP-1508c6254455ccf3 and
FUP-98c85b750cb36bd4 (the literal host-rules fallback, whose condition
named this pass with WO-007's two publish observations in hand: both
publishes were hook-admitted and allowed by the host without a prompt, so
the fallback is declined, D10). WO-013-D008's own reopening condition (a
starter update changes target-publish base handling) has occurred with
v0.96.1 and is answered by D009's route, which the operator chose during the
final review; nothing in this pass reopens it again. No deferred row's
lifecycle condition fired on WO-007's close except the three above.

## 4. Observations, dated 2026-10-24

| Item | Observed | Source |
| --- | --- | --- |
| v0.95.0 (core WO-220) | twenty register rows on the resident, the vertical, the console, intake and triage, audit, the corpus lanes and the kernel's admission: structural admission of new commands, typed refusal of recovered source-change results, compound live-status phases, review-loop invocation bounds, the browser witness's abort signal, retained qualification records; kernel 0.8.0, skeleton 0.68.0, browser-evidence 0.2.0, console 0.4.8; none of it touches a surface this fork uses | core's release notes, Read before upgrading |
| v0.96.0 (core WO-080) | workstream documents validated (one `dotln-workstream` block per `WS-NNN-*.md`, members mirroring the orders' leading `**Workstream:**` fields, `self` for an order without a `**Repository:**` line); the index gains a Workstreams section and a `dotln-workstreams` record line (repository, base, phase, verdict, integration, stale, observed target commit per member); `index --check` regenerates the grouping from that line without opening clones; the `separate` track; console 0.5.0's Workstreams section without a schema change; the notes name this fork's interim WS-001 (WO-011 and WO-012 as `self` without the field) as a refusal until the field is added; two known follow-ups, one of them that a `self` member's base and integration follow the HEAD of the refreshing checkout (FUP-2811605b8e865d2d) | the same |
| v0.96.1 (core WO-230) | the session publish, draft and final, fetches the target's base branch first, reads the merge base of the subject and the fetched commit, and describes the Change table, the base-tree exemption and the no-change check from it whenever the activation base is its ancestor, naming the activation base beside it in the body; a failed fetch refuses before any push with the prepared work retained; a same-tree draft retry recomposes the body when its history is longer than one commit; the plan gate skips the open target order's own `evidence`, `verifications` and `finalReviews` paths; the episode form keeps the request's base; the criss-cross merge-base case is untested; the fork's three fixture names are refused at first publish unless renamed; patch release, no component version change, no role text change | the same |
| The update | one merge commit `2d15457` (82 files, 3,784 insertions, 444 deletions, no conflict; `CLAUDE.md` and `docs/PLAYBOOK.md` untouched upstream; `README.md` one added row; `docs/workstreams/README.md`, an instance seed unchanged since export, took upstream's convention text; `UPSTREAM.md` 998 manifest files; product 07 replaced; the harness manifest and fifteen hooks replaced); `npm ci`; `harness emit` 35 surfaces with no drift; lineage index current; `npm run sync` refused the index until the field repair, then every artifact current; the repair commit `2f29099` (the two fields, the two withdrawal events, the regenerated index pages) | the commands on the branch |
| The index after v0.96.0 | WS-001's fourteen members grouped; on the update branch the three `self` members (WO-003, WO-011, WO-012) read `integration: diverged; stale: yes`, because a `self` member's base follows the HEAD of the refreshing checkout and that branch had moved past `main` (core's FUP-2811605b8e865d2d); regenerated on this planning branch before its first commit, with HEAD equal to `main`, they read `current; stale: no`; every DotLn-Angular member reads `behind; stale: yes` against the target's `main` at `2ab4f285` (the closed orders by design, the open ones on the provisional base `bc9133e9`); WO-013 reads `phase: draft` because its control segment is uncommitted in its worktree | `docs/work-orders/README.md` on both branches |
| The plan gate after the renames | after D3 and D4, `npm run plan -- check` prints no advisory (§14 records the run) | the command on the branch |
| WO-007's first verification | VER-001 failed on F1 alone (the `ErrorHandler` regression: an uncaught error reached no surface and the shell showed it as a failed request), with F2 to F4 boarded (F2: the spec for criterion 4's MSW unhandled-request option passed with the option removed); the repair of 14:41Z answered them and VER-002 passed all nine criteria; nothing is left for a pass to route | the target's `docs/dotln/verifications/WO-007/VER-001.md` and `VER-002.md`, the failure feed |

## 5. The operator's direction, synthesized

**The update first, again.** The outcome asked for is the fork at starter
v0.96.1 with the pass on top of it; the standing direction (2026-10-23 and
2026-10-24, D1 each) puts the update before the planning branch so that
core's fixes reach the pass, and the operator merged #26 within a minute
(D1).

**Core's second answers, read against the records.** The blocker is fixed in
v0.96.1 and taken; WO-013's route is the one the operator chose during its
final review (D009, route (a)): the fix dispatch integrates `main` and
republishes from the merge base. Core's seven numbered items are read
against the record each names (§7): the three target fixtures are renamed
(D3), the conditions table is the gate summary's reading, the board schema's
digest holds, the bases publish right either way, the segment counts agree,
WO-224 is next at core.

**The pass that follows WO-007's merge.** The first 2026-10-24 pass froze
seven orders at its judged subject and named the pass after WO-007's merge
as the one that amends them for receipt 008's twenty-four known issues and
pays the refutation. This is that pass (D4). WO-013, active and in
`needs-fix`, is the exception: its text is not edited here (D5).

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 Starter v0.96.1 is taken through update pull request #26, opened
  ready from `main` before the planning branch, merged by the operator and
  finished on `main` by the session; the branch carries one repair, the
  `**Workstream:** WS-001` field on WO-011 and WO-012 that v0.96.0's
  workstream check requires, made admissible to the plan gate by withdrawing
  the two execution amendments the gate bound to those closed orders'
  bytes.** Source: the dispatch; README §Taking upstream updates; core's
  v0.96.0 Read before upgrading, which names this fork's WS-001; the gate's
  own message (`withdraw it explicitly or restore its approved bytes`) and
  `withdrawPlanAmendment` in `scripts/lib/plan-receipts.mjs`. Rejected:
  opening the planning branch first (the pass would have run on the v0.94.0
  publish and the fork's WO-013 fix would still wait); leaving the update
  branch red with the refusal named, as #21 did on 2026-10-23 (the repair is
  one line per order and the README's update route says to resolve such
  files by hand before committing); restoring the approved bytes (the index
  then refuses); dropping WO-011 and WO-012 from WS-001's block (they are
  members whose edges WO-005 and WO-006 depend on, and the kit's design is
  the field). The two `PlanExecutionAmendmentWithdrawn` events carry the
  reason; the operator's authorizations of 2026-10-20 and 2026-10-21 stand
  in WO-011-D004 and WO-012-D004 and the approved bytes are otherwise
  preserved. The interaction (a field the index check requires on a closed
  order whose amendment the plan gate binds) goes to core as §11 item 1.
  NoOp cost: WO-013 waiting in `needs-fix` with no route open. Reopen: #26
  is reverted, or core rules that the withdrawals should be undone.
- **D2 Core's second answer block is read against v0.96.1: the blocker's
  fix (core WO-230) is in the kit this fork now carries; WO-013's route is
  the operator's `resume: fix` dispatch in its worktree, which integrates
  `main`, confirms against the updated kit that the draft publish composes
  its Change table from the merge base (83 rows from `2ab4f285`), applies
  D004's generator-log move, and hands back to re-verification and final
  review, as D009's follow-up already says; this pass changes nothing in
  WO-013's text, base or events.** Source: the paste's blocker paragraph;
  WO-013-D008 and D009; core's release notes for v0.96.1 (`describedTargetBase`,
  the fetch-first rule, the body naming both commits). Rejected: route (b),
  withdrawing WO-013 and activating a successor on `2ab4f285` (the operator
  chose (a) and the fix is now unblocked); a base advance event (core
  declined it by design, the activation base stays the base of every
  record). Reopen: the fix's draft publish is refused again, or
  DotLn-Angular's `main` advances past `2ab4f285` before the fix integrates
  (D009's own condition).
- **D3 The three target-side fixture names that carry a platform order id
  are renamed in WO-016 and WO-017: `segments/WO-221.json` to
  `segments/order-221.json`, `segments/WO-226.json` to
  `segments/order-226.json`, `wo-221-derived-v0.json` to
  `order-221-derived-v0.json`; the kit's own record paths stay as they are;
  candidate C7 is settled.** Source: core's item 1 (the advisory and the
  lint share one matcher; the lint reads the branch, the commits, the title
  and the body, whose Change table lists every path); the matcher in
  `scripts/lib/outward-lint.mjs` (`wo-[0-9]{3}` between non-word boundaries)
  and the two lint runs of §2, which pass the new names and refuse the old.
  Rejected: names without the number (`long-cycle`, `short-cycle`: the
  platform order's number is what lets the operator connect a fixture to
  the public segment, and the matcher does not read a bare number);
  leaving the rename to the executor by decision (the criteria name the
  files, and a criterion is judged as written). Reopen: the lint's matcher
  changes to read a bare number as an identifier.
- **D4 WO-008 and WO-014 to WO-018 are amended, each by the pass that
  receipt 008 named: the base clause (since v0.96.1 activation on the
  provisional base publishes right, a pass may set the base to the
  predecessor's merge commit and none is required to), the record-path
  advisory closed at v0.96.1, and receipt 008's known issues written into
  the text they narrow.** Per order: WO-014 gains the `provenance: 'map' |
  'public-work'` pairing on `Tool` (so WO-018's toy-source tools fit the
  schema and the mapped-rows count rule excludes them), the rule that a
  rerun continues the batch's own worker and counts once under the twelve,
  the checkers' observability rule as the counter-pressure on criterion 3's
  quota (a short work is recorded, never force-fitted), and the two-data-paths
  note until candidate C1; WO-015's interpreter refuses an uninterpreted
  transform kind visibly with its reason (the engine, step 3, criterion 1),
  the virtual-time driver is its own, and the rail selects the first-scene
  tools by the ids the decisions file names at activation and the works from
  `catalog-summary.json` (the Objective, the rail, steps 8 and 12, criterion
  4); WO-016 renames its records types `OrderStrip`, says in the Objective,
  the caption composite, step 10 and criterion 7 that only `addWait` moves
  the use case's beats, and reads the role stamps at activation instead of
  hard-coding a starter and its counts (the Cites line, step 5, criterion 3),
  with the fixture rename of D3 in the design, step 4 and criterion 1;
  WO-017 gives `BasePaths.Twin` its `routePermissions` entry and a signed-in
  e2e path (the Feature, steps 10 and 11, criterion 7), makes `twin:check`
  fail on an absent base (the registry check, step 4, criterion 4), carries
  D3's rename (the derivation, step 3, criterion 1) and records the
  zero-patience finding as a known issue with the operator's rule standing
  and the safe default stated (the three figures as written; the operator
  may name a fourth result); WO-018 moves the map into its own directory
  under `check-map.mjs` outside the tool allow-list's scan (the design, step
  4, criterion 1), uses the `public-work` provenance, makes "never a passage"
  mechanical (a word-run overlap check run with `--text` against the fetched
  text, its zero result recorded; step 2's negative fixture, step 4,
  criterion 1), reads the works from the summary so no criterion says six,
  and counts a mapper's rewrite once; WO-008's criterion 1 asserts that no
  stored value equals a token the mock issued (covering opaque tokens), the
  Cost line and the mocked-provider design say the signing key pair is
  generated at start and never committed, and the unexercised provider swap
  is a known issue for a later member. Source: receipt 008's known issues
  (the first 2026-10-24 pass, §9.2); the orders' own text; the execution
  guide's screens (a scope decision is written into every criterion it
  narrows; no criterion requires a reading of natural language). Rejected:
  leaving the known issues on the catalog rows for executors to meet inside
  their authority (the first pass named this pass for the amendments, and
  an executor meeting a criterion defect pays a failed verification);
  amending WO-017's result fold with a fidelity figure (the operator's rule
  forbids agreement scoring; the fourth result is theirs to name). NoOp
  cost: six orders activating with the defects the refuter named. Reopen:
  this pass's refutation holds on an amendment, or an executor records that
  an amended clause cannot be met as written.
- **D5 WO-013's text is not amended: the order is active and in
  `needs-fix`, its criteria stand on VER-001, and its two receipt-008 known
  issues (the dependency on WO-007 is merge ordering rather than a
  functional need; "sub-app" names both a menu group and a feature library)
  are the fix dispatch's and the next final review's to meet inside the
  order's authority and record in its decisions, as the first pass said an
  executor does for an order activated before the amendment.** Source: the
  execution guide (a planning pass never edits an active order's judged text
  without operator direction; an execution amendment is the executor's
  route); WO-013's live phase. Rejected: an execution amendment from this
  pass (the operator has not authorized a scope change, and none is needed
  for the fix). Reopen: WO-013 is withdrawn under D008's route (b), in which
  case the successor takes these amendments at filing.
- **D6 The sequence is WO-013, WO-014, WO-015, WO-016, WO-008, WO-017,
  WO-018, serial; WO-007 leaves as closed.** Source: the first 2026-10-24
  pass's D11 (unchanged reasons: the operator sees the menu, the catalog,
  the scene and the machinery view before authentication and the twin);
  the index's Closed section as WO-007's record. Rejected: a lane pair of
  WO-014 and WO-016, both of which depend only on WO-013 (their surfaces
  share the shell's `BasePaths` enum, `app.routes.ts`, the menu in `app.ts`
  and the i18n files, so the second to merge pays a conflict, and the
  operator runs one worktree at a time); candidate C2 records the pair with
  its condition. Reopen: the operator says they will run two worktrees at
  once.
- **D7 No base is set: the only predecessor that has merged is WO-007, whose
  successor WO-013 is already active on the provisional base; every other
  open order's predecessor is unmerged, and under v0.96.1 the provisional
  base publishes right, so the Depends-on clauses no longer require a
  planning pass between orders.** Source: core's item 5; the Depends-on
  lines; v0.96.1's publish. Rejected: setting WO-014's base to a commit that
  does not exist yet; filing a planning pass as a precondition of every
  activation (the first 2026-10-24 pass's clauses did this, and WO-013
  activated without one). Reopen: a publish under v0.96.1 misdescribes a
  change from a provisional base, or the index's `stale` mark starts to
  gate something.
- **D8 WS-001 is `active`: WO-003 to WO-007, WO-011 and WO-012 are merged
  and WO-013 is active; the member table records WO-013's base and the
  v0.96.1 reading for the others; the delivery states record WO-007's
  merge and release, WO-013's phase and route, and the amendments of D3 and
  D4.** Source: the kit's workstream convention (proposed, active,
  delivered, abandoned); the facts of §2. Rejected: leaving `proposed`
  (four members have merged). Reopen: the operator abandons the workstream.
- **D9 The repository profile records WO-007's merge (#5, `2ab4f285`) and
  `DotLn Angular v0.2.0`, WO-013's activation and the publish blocker with
  its fix route, and the v0.96.1 reading of provisional bases; the operator
  record gains the dated bullets of this pass (the pace, the fix dispatch
  after a failed final review, the update-branch repair and the withdraw
  route).** Source: the facts of §2 and D1, D2, D4. Rejected: rewriting the
  profile's `Checked:` line (WO-007's reviewed commit is the last verified
  tree; `main` is its merge). Reopen: the next close.
- **D10 The register: C7 settled by core's answer and D3; the two
  literal-host-rules rows declined, because WO-007's draft and final
  publishes of 2026-10-24 were hook-admitted and allowed by the host without
  a prompt (#25 records them) and WO-013's refusal came from the kit's lint
  before the host saw a call; the other twenty-one rows left with their
  conditions; four new candidates (§10) deferred with theirs.** Source: the
  rows' own reopening conditions; `docs/evidence/WO-007/host-qualification.md`
  as #25 merged it. Rejected: filing the literal host-rules order (two
  observations say the hook's admission suffices). Reopen: a hook-admitted
  target publish is denied by the host's classifier.
- **D11 Requests to core are written as the operator's paste (§11): one
  question (the workstream field against the plan gate's amendment
  binding), one observation to confirm (the self members' `diverged` marks
  on a branch refresh), confirmations in the field and acknowledgements;
  nothing for core on the DotLn-Angular work.** Source: the operator's
  standing preference for a paste-ready prompt; D1 and §4. Rejected: a
  GitHub issue on the platform (the paste stays the route until WO-193).
  Reopen: WO-193 lands.
- **D12 No research worker is spawned; one refuter judges the pass's
  subject (the six amended orders and the sequence), as the default
  `dotln-worker`, because the dispatch line named no Fable worker.** Source:
  the kit's worker pins; the dispatch line. Rejected: `dotln-worker-fable`
  (not named). Reopen: the operator names Fable on a dispatch line.
- **D13 The failure feed is routed: WO-007's VER-001 fail was a regression
  the verifier reproduced (F1) and the repair answered within 87 minutes;
  VER-002 and FINAL-001 passed; the two withdrawn amendments are D1's; no
  order is filed and no criterion is changed for them.** Source: the feed;
  the target's VER-001 and VER-002. Rejected: a house rule for the
  `ErrorHandler` (WO-007's repaired code and its e2e are the rule now).
  Reopen: a later order's verification fails on the same surface.
- **D14 The index's `diverged` marks on the three `self` members are
  recorded as core's known follow-up and left: they appear when the refresh
  runs on a branch whose HEAD has moved past `main` (the update branch), and
  this pass regenerated the index before its first commit, with HEAD equal
  to `main`, so the committed record of this pass reads `current`; the
  committed `index --check` passes on the recorded facts either way, and no
  decision here reads the mark.** Source: core's v0.96.0 notes
  (FUP-2811605b8e865d2d), the index on the update branch and on this branch.
  Rejected: a separate `main` checkout for the refresh (the pass's writer is
  this checkout, and regenerating before the first commit gives the same
  reading). After the subject commit, `npm run meta -- --plan-cost`
  regenerated the index at the branch's new head and the three members read
  `diverged` again; the pass restored the pre-commit record, which
  `index --check` and `npm run sync` accept as current, so what merges to
  `main` reads `current`. Reopen: core fixes the refresh, or a reader of
  the board or the index acts on the mark; candidate C3 carries it.

## 7. Core's answers of 2026-10-24 (second pass), read against v0.96.1

The branch question: `f33cad53` and `acd1c94f` are on core's `main`
(pull request #238); recorded, the first pass's D18 is closed. The blocker:
filed as WO-230 first in core's queue and shipped as v0.96.1 at 21:25Z,
taken by #26 (D1); WO-013's fix is the operator's next dispatch (D2); WO-008
and WO-014 to WO-018 declare the same base and are covered (D4, D7). Then
item by item: **1** target-side paths only, the kit's paths kept, the three
fixtures renamed before their first publish and the names verified against
the lint (D3; C7 settled); **2** recorded; **3** the conditions table keeps
only rows whose every source id is in this fork's own records, so it prints
empty until such rows exist, and the gate summary and the recorded gate row
are the fork's readings (recorded; the instance-side table is core's
deferral, reopened when a threshold on this fork's gate timing is wanted);
**4** recorded, and the digest `7d20e785…` verified again at v0.96.1 (§2);
**5** recorded; no new order's predecessor has merged, so no base is set,
and under WO-230 the clauses say so (D7); **6** agreed, 16 and 6 rows;
**7** recorded; WO-224 is now first in core's queue, so the Entropy Reducer
on WS-001's repositories (FUP-4cbacbbeca2cefab) keeps its condition.

## 8. The register

Twenty-four pending rows read at revision `6fb07acd…`. `followups --sync`
minted the four rows of §10 (C1 FUP-d1dadda4ed57029c, C2
FUP-3372acd8d62e8cc7, C3 FUP-d3451c7078e670ab, C4 FUP-4ddf0151d707734a;
revision `d09a3892…`), and `--apply` took seven dispositions in one batch
from a contained ignored request file (the three below and the four
deferrals). C3's entry was then reworded with the planning branch's own
reading of the mark, so the next sync minted it again as
FUP-d541e70c6f87eaa6 and marked the first row `needs-review`; a second
apply marks the first a duplicate of the second and defers the second with
C3's reason. The register's revisions are in §14:

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-ffa034330edc5ff0 | C7 of the first 2026-10-24 pass (the record-path advisory) | settled: core's item 1 (target-side paths only; the kit's paths kept); the three fixtures renamed in WO-016 and WO-017 and verified against the lint (D3) |
| FUP-1508c6254455ccf3 | C2 of 2026-10-23 (the literal host-rules self order) | declined: WO-007's draft and final publishes were hook-admitted and allowed by the host without a prompt (#25); WO-013's refusal was the kit's lint before any host call; reopens if a hook-admitted target publish is denied by the host's classifier (D10) |
| FUP-98c85b750cb36bd4 | C2 of 2026-10-19 (the `hostRules: "literal"` fallback) | declined: the same observations and condition (D10) |
| FUP-4cbacbbeca2cefab | C1 of 2026-10-21 (the Entropy Reducer on WS-001's repositories) | left: WO-224 is first in core's queue after WO-230; reopens when its release lands |
| FUP-d1253c8eb7d324d7 | WO-007-D019 (the first order touching each surface; WO-013 expected) | left: WO-013 is active in `needs-fix`; its fix dispatch disposes the row's (a) when the shell's routes add a second `RouteId`, within the order's authority |
| the other nineteen | the deferred candidates of 2026-10-21, 2026-10-23 and the first 2026-10-24 pass (C1 to C6 and C8), WO-004-D010, D013; WO-005-D009, D011; WO-006-D014, D015; WO-007-D018; WO-012-D008; the house library pass | left as they are with their conditions unchanged |

## 9. Orders amended, the sequence and the known issues carried

Six orders amended (D3, D4); WO-013 unchanged (D5); the sequence reads
WO-013, WO-014, WO-015, WO-016, WO-008, WO-017, WO-018, serial (D6); no base
set (D7). Receipt 008's twenty-four known issues are disposed: twenty-one
written into the six orders' text (§6 D4 lists where), WO-013's two left to
its fix dispatch and final review (D5), and WO-007's four closed with the
order (its production board shows the unavailable state until candidate C1,
as its own known issue already says; criterion 2's exception count, the
three intervention paths and the five amending passes are history now that
the order is closed, and the intervention paths are core's candidate for
the final-review row).

### 9.1 Known issues from this pass's receipt, by order

The refutation (§14) returned `aligned-with-findings` with seventeen known
issues and no hold; WO-013 and WO-014 are carried by hash (WO-014's
amendments touched its design, fan-out rule and known issues, none of them
judged fields). The five judged orders are frozen at the judged subject, so
the pass that follows WO-013's merge amends them for these and pays its
refutation then; they are listed here so nothing is re-derived, and an
executor who activates an order before that amendment meets each inside the
order's authority and records it in the decisions file. The receipt's
reopening observations are on the receipt.

- **WO-015.** (a) Criterion 2's literal canvas-tag grep misses a canvas
  made through `document.createElement('canvas')`, `Renderer2`,
  `OffscreenCanvas` or a second `getContext` call outside the wrapper; the
  next amendment adds those forms to the grep. (b) Criterion 4's first-scene
  list is set by the executor's own decisions file, so a list too small to
  carry flock, arrive, wedge, line and column would pass; the amendment names
  those five as the floor. (c) Criterion 1 asserts a refused step carries a
  reason, not that the frame hash and the clock are unchanged after it. (d)
  No criterion covers a stored `dotln-angular.scene` value that no longer
  parses; falling back to the idle field is the old behavior.
- **WO-016.** (a) The slot labels (harness, model, effort) have no field in
  the six-field allow-list unless `actor` is a composite the reader parses;
  `actor` is also the one field that could carry a personal account name
  copied from the platform's records, which the no-absolute-path check does
  not cover, so the reducer's scrub screens it. (b) Slot semantics: the
  Objective names four role slots plus the operator figure, criterion 7
  counts five slots, and `role-mechanisms.json` lists no repairer; the
  repairer slot is the executor role at `resume: fix`, and the card says so.
  (c) The sink's configured destination and what a drop does when the sink
  is set but down (apply and persist in the browser, one toast) are not
  pinned by a criterion.
- **WO-008.** (a) Criterion 1's storage grep over `apps/dotln/src` meets any
  storage helper WO-015 or WO-016 places there first; the grep is scoped to
  `libs/shared/auth/src` plus the app's own files, or the earlier orders keep
  storage inside their libraries. (b) Guarding every `BasePaths` member
  retrofits a session onto the scene, machinery and tools e2e specs, which
  the Cost line does not name, and WO-018's e2e names no sign-in. (c) A
  production build carries no provider, so every guarded sub-app refuses
  until the operator supplies one; `jose` belongs in `devDependencies`,
  which the order does not say. (d) The Cost line lacks the `Refutations
  paid` entry the other orders carry (two: receipts 001 and this pass's).
- **WO-017.** (a) Readiness is not defined in the criteria; if it is the
  hand-back's arrival, a zero-duration variant dominates all three figures
  (candidate C4 carries the operator's fourth result). (b) `twin:check` fails
  on an absent base commit in a fresh or shallow clone, an environment gap
  read as a gate failure; and the never-delete rule grows the twin chunk
  without bound while Git keeps the history anyway. (c) WO-015's scene
  clock, WO-016's replay clock and WO-017's scheduler are three time
  abstractions with no shared tick contract required.
- **WO-018.** (a) `check-map.mjs` is invoked directly and is not a declared
  gate command, so a later map edit could pass the gate; the amendment wires
  it into `check:fixtures` as the catalog and record checks are. (b) Whether
  the run's nineteen toy titles count as prose from the run is undecided;
  the decisions file records that an id and a short title are not. (c) The
  six toy-source tool sets rest on public knowledge of mostly copyrighted
  works with no text to run the overlap check against; each definition
  names its public source in the decisions file. (d) A worker's statement
  that no quarantine file was read is self-attested; the fan-out record
  names the harness read observation where one exists.

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The workstream field against the plan gate: starter v0.96.0's index
  check requires `**Workstream:** WS-NNN` on every member order, and the
  plan gate refuses that one-line change on a closed order whose bytes an
  execution amendment binds, so this fork withdrew two amendments to add
  the field (D1).** Reopen when core answers §11 item 1 (an admitted
  metadata-field change for closed orders, or an index check that accepts a
  closed member without the field); then the withdrawals are revisited or
  left as the record.
- **C2 A lane pair of WO-014 and WO-016, both depending on WO-013 alone,
  with the shell's shared files (`BasePaths`, `app.routes.ts`, the menu in
  `app.ts`, the i18n files) assigned to one of them by decision so the other
  rebases cleanly.** Reopen when the operator says they will run two
  worktrees at once; then the pass before the pair assigns the shared files
  and marks the pair in the sequence.
- **C3 The index's `self` members read `diverged` and `stale` whenever
  `work-orders index` runs on a branch whose HEAD has moved past `main`
  (the update branch did; a planning pass that regenerates before its first
  commit reads `current`) (core's FUP-2811605b8e865d2d).** Reopen when core
  changes the refresh to read `main` for `self` members, or when a reader of
  the board or the index acts on the mark; then the pass records the fix or
  asks.
- **C4 The twin's fourth result: a figure a zero-patience variant pays, so
  that results alone can tell a faithful twin from a trivial one without
  scoring agreement with the operator's beats (receipt 008 on WO-017; the
  safe default is the three figures as written).** Reopen on the operator's
  word naming the result; then WO-017's fold is amended by the pass that
  hears it, or by an execution amendment if WO-017 is active.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged except where §8 says
otherwise: the first 2026-10-24 pass's C1 to C6 and C8 (the mining store
and the app's API, the Babylon.js painter, manim, the graduation route, the
remaining toys, the twin's later lanes, the board under `/machinery`), CI
on the fork, required approvals, retitling the two published `DotLn`
Releases, a lane pair of small self orders, the workstream pass's C1 to
C10, the Entropy Reducer on WS-001's repositories and the house library's
granularity pass.

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning
session; the fork's next pass reads the answer. Each item names the record
it rests on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its second planning pass of 2026-10-24 on starter v0.96.1 (docs/planning/standard-pass-v0-96-1-2026-10-24.md §2, §4, §6 and §11), answering your second answer block of 2026-10-24. Read each against the record it names; file, decline or defer each with its reopening condition.

1. Question: v0.96.0's workstream check (scripts/lib/work-order-workstream.mjs) requires every WS-001 member to declare **Workstream:** WS-001, and your Read before upgrading named this fork's WO-011 and WO-012 as the members that would refuse until the field is added. Adding that one line to those two closed orders made the plan gate refuse their changed bytes against the execution amendments bound on 2026-10-20 and 2026-10-21 (requireMatchedAmendments: unmatched execution amendment WO-011 row 1, then WO-012 row 3). The fork used the gate's own route, npm run plan -- amend-order <WO> --withdraw <row> <reason>, appending two PlanExecutionAmendmentWithdrawn events with the reason recorded and the operator's authorizations left standing in WO-011-D004 and WO-012-D004; the update branch then merged green. Two questions: should a leading metadata field such as **Workstream:** be an admitted non-criterion change on a closed order, as the release-header correction is, so the withdrawal is not needed; or should the index check accept a closed member without the field? Until you answer, the withdrawals stand as the record and the fork files no order.

2. Observation to confirm: npm run work-orders -- index run on the update branch (HEAD one merge past main) recorded the three self members (WO-003, WO-011, WO-012) as integration diverged, stale yes, because a self member's base follows the HEAD of the refreshing checkout (your FUP-2811605b8e865d2d); the same command on the planning branch before its first commit (HEAD equal to main) recorded them current. A planning pass that regenerates after committing would carry the mark into main at merge; index --check passes on the recorded facts either way. Is the intended repair that index reads main for self members, or that the lifecycle's refresh on main overwrites it? No ask beyond the answer.

3. Confirmations in the field at v0.96.1: the preview took 76 replaced, 3 added, 0 removed, 0 refused, 919 unchanged kit files with no conflict and no re-emit drift (build fnv1a64:9a7073ea6ba64ffe to fnv1a64:89c252a87a21a514); npm test 7 passed; npm run test:docs 14 passed; harness check 35; launchpad verify 998 files at 5ad686d1; npm run plan -- check on the update branch printed three advisories (the three target fixture names) and none of the eight on the kit's own record paths (your WO-230-D002 confirmed); update --finish advanced main and bootstrapped (third use). The board schema's digest is 7d20e785… at v0.96.1 (your item 4 confirmed).

4. Item 1 done: the fork renamed segments/WO-221.json, segments/WO-226.json and wo-221-derived-v0.json to segments/order-221.json, segments/order-226.json and order-221-derived-v0.json in WO-016 and WO-017 before any publish, and verified with node scripts/outward-lint.mjs pr-body --target that a Change table naming the new paths passes (launchpadIdentifiers: pass) while the old names are refused with two identifier.launchpad findings. No ask.

5. WO-013: the fix dispatch in its worktree is the first field use of WO-230's merge-base publish (a verified draft at parent 2ab4f285 with 83 files, activated at bc9133e9, the target's empty initial commit). The fork records what the publish composed and whether the body named both commits in its next block. Item 3 (the conditions table) recorded as you say; items 2, 5, 6 and 7 acknowledged; WO-224 awaited for the Entropy Reducer on WS-001's repositories.

6. Nothing is asked of core for the DotLn-Angular work; the fork amended WO-008 and WO-014 to WO-018 from its own receipt 008 and left WO-013's text to its fix.
```

## 12. Write-backs

- `docs/work-orders/WO-014-toolbox-catalog-pipeline.md`,
  `WO-015-soldier-scene.md`, `WO-016-machinery-view.md`,
  `WO-017-digital-twin-patience-lane.md`,
  `WO-018-art-of-war-map-and-toys.md`,
  `WO-008-authentication-and-permissions.md`: amended (D3, D4).
- `docs/planning/sequence.md`: WO-007 removed; seven entries, serial (D6).
- `docs/workstreams/WS-001-dotln-angular.md`: delivery state `active`, the
  member bases, the delivery-state rows (D8).
- `docs/repositories/dotln-angular.md`: WO-007's merge and release,
  WO-013's activation and route, the base reading (D9).
- `docs/operator/README.md`: the dated bullets of D9.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.
- On the update branch, merged as #26: `docs/work-orders/WO-011-…` and
  `WO-012-…` (the field), `docs/control/plan-refutations.jsonl` (two
  withdrawals), the index pages (D1).

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path, the
foundation where a feature is added by convention: WO-013's fix unblocked
by the kit the fork now carries (D1, D2), the six orders behind it corrected
where their refuter found the defects before any of them pays a failed
verification (D4), the three names that would have refused a first publish
renamed and the rename verified against the lint rather than asserted (D3),
and the clauses that put a planning pass between every two orders replaced
by the kit's own merge-base publish (D7), so the operator can run WO-014
straight after WO-013 merges. What the pass refuses to do: edit an active
order's judged text (D5), score the twin's agreement with the operator's
beats (D4, C4), drop members from WS-001 to dodge a gate (D1), or treat a
branch's `diverged` mark as a fact about the work (D14). What stays manual by
the kit's design: the merge of this pass, the fix dispatch in WO-013's
worktree, the resume phrases, the paste to core. Lenses that changed the
plan: shifting the burden (the gate's refusal on WO-011 was met with the
gate's own route and a question to core, not with a red update branch for
the operator to merge anyway); the fixes-that-fail trap (a planning pass
between every two orders, which WO-013's activation had already skipped, is
removed rather than re-required); rule beating (WO-017's zero-patience
variant is named in the order so a result-only judgment is read with it in
view, instead of the pass inventing a figure the operator did not ask for);
and acting before understanding (the update's one repair was tried, read
back as a gate refusal, and traced to its binding in the kit's code before
the route was chosen). The outcome matched the aim as read at entry: the
update first and merged, the pass on the new kit, core's answers read, the
orders amended, WO-013's route stated for the operator.

Cost: no research workers; one refuter (§14 records its worker time, tokens
and tool uses and the dispatch-to-file wall-clock); the preview 0.2 s; the
update's gates about 29 s of task time plus two more document-suite runs
(the refusal and the repair); the plan-start, failures and conditions reads
under 2 s; the two lint runs under a second; `npm run meta -- --plan-cost`
recorded the table after the subject revision. Two slips cost nothing
durable and are recorded: the upstream fetch pulled five starter tags into
the local repository (deleted at once, none pushed; the previous passes
record the same slip), and the first run of the order-edit script matched
two passages by guessed line breaks and stopped, so the six files were
restored and the script re-run with the passages read from the files.
Document ceilings: no product document is edited by this pass, so
`docs/control/doc-ceilings.json` is unchanged; the kit's product documents
are kit files and carry no instance ceiling.

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.

Results on the subject before its commit (the commit hashes are recorded
with the refutation below): `npm run meta` no budget breach (WO-007 tokens
96,929,115; first verification failed in 1 of the last 8 closed orders; 0
reopen candidates; unset limits unset); `followups --sync` minted four rows
(§10's C1 to C4, revision `d09a3892…`) and, after C3's entry was reworded, a
fifth (`6df6447a…`); `--apply` took seven dispositions in one batch (the
three of §8 and the four deferrals; revision `06c80ed2…`) and then two (the
first C3 row a duplicate of the second, the second deferred; revision
`c73358dd…`); 83 rows, 25 pending, none untriaged or needing review;
`work-orders index` regenerated both pages with the seven-entry sequence and
the `self` members `current` (`--check` PASS); `lineage index` regenerated
and current; `docs-check` PASS (1 product document at 2,095 non-exempt bytes
under the 2,305 ceiling; 14 declared historical link occurrences; 1 declared
home-path line; one pre-existing advisory on a filed record);
`publication:check` reporting no editions declared; `plan check` failing
before the receipt only because the new dated heading needs one
(`planning pass planning-d693ddbce103291d needs a receipt`). The document
gate before the receipt was not run, so the refuter's reads met no live
gate; `npm run test:docs` after the receipt is recorded below.

Commits: the subject `d759232` (fifteen files: the six orders, the sequence,
WS-001, the profile, the operator record, the ledger and its index, the
register, the index pages and this document), the cost table `a3ea7be`, the
receipt `8e0ac1f`, then the known-issues commit that carries this section.

Refutation: one fresh `dotln-worker` (the default type; the dispatch line
named no Fable worker), spawned in the background with only the canonical
prompt the helper printed (`npm run plan -- refute`, pass scope, 79,605
bytes: the identity, mask and lens, the work order, the compiled subject,
the output instructions, the result schema and the worker instructions), its
schema and the instruction to return the frozen JSON and a one-line
statement. It read that one file and nothing else, judged WO-015, WO-016,
WO-008, WO-017 and WO-018 (the five orders whose judged fields changed;
WO-013 and WO-014 carried by hash), and returned `aligned-with-findings`
on every order and for the plan, with seventeen known issues (§9.1) and no
hold: no supplied observation shows a failure and the subject supplies no
vision passage id. Worker time 586 s, 158,558 worker tokens, 5 tool uses.
The receipt helper refused the first filing because the statement named the
absolute scratch path; the same worker replaced the two paths with `<tmp>/`
placeholders in 25 s without touching `result.json` (its SHA-256 `f2e3e470…`
unchanged before and after), and the second filing succeeded. Receipt
`2026-10-24-planning-d693ddbce103291d-009` (`docs/planning/refutations/`),
worker type `dotln-worker`, scope `pass`, 919,352 ms from dispatch to file
(15.3 minutes, the repair included), judged subject `sha256:8a2ffd23…`
equal to the committed and workspace subjects; the gate after it: 9
receipts, 9 passes, no advisory. Dispositions: none needed (no hold); the
seventeen known issues are on the receipt and in §9.1 for the next pass.

Session cost at the handoff (`node scripts/harness.mjs usage`, source
`claude-transcript-message-usage`, scope `dispatch`): 15,811,964 total
tokens (15,199,226 cached input, 435,212 cache-write input, 1,646 input,
175,880 output; reasoning output and USD cost unavailable) over 142 steps and
119 commands at 22:27Z, before the document suite and the pull request; one
subagent of the cap of 20, 19 remaining. The update's wall-clock from the
dispatch at 21:29Z to the finished `main` at about 21:47Z was 18 minutes,
seven of them the operator's merge; the planning branch opened at 21:47Z.

`npm run test:docs` after the receipt, on the tree that carries this
section: 14 passed, 0 failed, 17.36 s of wall-clock, 14 fresh tasks, 0.2 s
of lane wait behind checkout unknown; `plan` and `plan-refutation-current`
PASS on receipt 009. The run at the final commit is reported in the pull
request.
