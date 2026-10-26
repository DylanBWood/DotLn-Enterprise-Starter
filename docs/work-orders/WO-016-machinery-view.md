# WO-016 — The machinery view: one recorded order's agents in their role slots over scrubbed, field-reduced copies of the platform's WO-221 and WO-226 segments, each agent's active gems, supports and prose sections readable, a mechanism change the operator drops on an agent redrawing the example use case with the before as a ghost, the operator's own ideas persisted in the browser and saved to ignored intake through a local sink, and the shared records and replay libraries

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `machinery.ts` to `libs/shared/models`, `libs/shared/records`
(reader, folds, fixture pack, kit), `libs/shared/replay` (the virtual-time
clock), the `machinery` feature's page, strip, slots, cards, shelf, editor,
facade and store, `libs/features/machinery-data-access`, the segment reducer
and the record fixture check, the idea sink process, three fixtures, two
documents, about 75 source files; adds no runtime dependency. Removes the
arriving page WO-013 shipped for `/machinery`. Wall-clock: about 8 to 12
hours of executor work plus the fixed cycle; unknown until run. Context
bytes: WS-001 §The app and its sub-apps, design A §1 and §1.6, the UI
vision §4 and V7 read at the run's folder, the fork's role skill stamps,
this order, about 190 KB. Commands added in the target: `npm run idea-sink`.
Tokens: unknown until run. Steps: 17. Re-mints: none. Refutations paid: four (receipts 008 to 010 on the earlier texts; the 2026-10-26 pass's receipt on this one).
**Nomination provenance:** the operator's decisions of 2026-10-24 (ignored
intake capture `docs/intake/notes/planning-2026-10-24.md`, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9):
the machinery view shows an agent, a change to its gems, supports or
mechanisms dropped on it, and what changes in the example use case, so the
operator can tune the mechanisms until they run without them and then see
agents working in concert; workers are metaphors, today separate agents in
their role slots; select-then-apply first, drag later; the ideas the operator
drops are theirs and are also saved to ignored intake; scrubbed copies of the
platform's WO-221 and WO-226 records are a stopgap. Design files this order
builds from, read at the run's folder on this machine (core's ignored intake,
read-only; digests pin what was read): `out/angular/design-agents-in-concert.md`
§1 (the concert strip) and §1.6 (its first buildable slice; SHA-256
`70d14655e88d5540b92e1700e56a385bb700b0e2a3152897882ecf0a74023676`);
`out/process/ui-vision-see-the-agents.md` §4 (the idea card as data and how
a drop changes an example without changing the platform) and V7 (SHA-256
`d3bbf3a21e5b0892e117d71d604acd779e8fdbe08350f0cf3a9bd074f0fcedd2`);
`out/angular/dotln-angular-forward.md` §2.0 (the shared substrate's lint
placement; SHA-256
`c05dea11b47547b5e6dd9e9880758539c3a36648cda1d281a7b9a54a1f8daaf8`). The design files are the operator's own research and lie outside the clean room (WS-001 rule 23 as corrected on 2026-10-26). Planner-synthesized by the 2026-10-24 planning pass
([planning document](../planning/mining-run-orders-2026-10-24.md) §4 (the
re-derived WO-221 and WO-226 tables), §6 D8 and §9). Opaque identifier, not a
priority. Amended by the 2026-10-24 second pass ([planning document](../planning/standard-pass-v0-96-1-2026-10-24.md)
§6 D3 and D4): the fixture file names, criterion 3's starter and counts, the
records types' name, the caption rule, the base clause and receipt 008's known
issues. Amended by the 2026-10-25 pass ([planning document](../planning/standard-pass-v0-99-0-2026-10-25.md)
§6 D4): receipt 009's known issues (the `actor` composite and its scrub, the
repairer slot, the sink's directory rule and a drop while the sink is down). Amended by the 2026-10-26 pass ([planning document](../planning/acceptance-by-use-2026-10-26.md) §6 D9): rule 24's acceptance-by-use criterion (criterion 10) and the walkthrough, the design brief of rule 25, and receipt 010's items: the sink checks `Origin` and `Host` (its item (a)), its default directory is DotLn-Angular's own ignored tree and never the launchpad's intake (b), criterion 3 reads the counts the executor recorded and names no starter's figures (c), `machinery.md` carries the rule per idea kind (d), a stored value that fails to parse is covered by a spec (e), the fixtures' `actor` values are the observed labels (f), the row counts are asserted by a spec rather than a line grep (g), and the copies' sources are the platform's public repositories (h).
**Depends on:** WO-013 merged (hard: the `/machinery` route and the Machinery
menu group; the base above is provisional: since starter v0.96.1 (core WO-230) the target publish describes the change from the merge base of the subject and the target's `main` and names the activation base beside it, so activation on this base publishes right; the planning pass that runs after WO-015, the member before this one in the sequence, merges may set it to that merge commit, and none is required to (the 2026-10-24 second pass, D4)).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-013",
    "relation": "hard",
    "reason": "the machinery route and menu group this order fills; the base line is provisional and publishes right under starter v0.96.1's merge-base publish"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 3, 5, 8, 10, 12, 15, 18; §The app and its sub-apps, operating
rules I1 to I3); `docs/repositories/dotln-angular.md`;
`docs/operator/README.md`; this launchpad's `.claude/skills/dotln-*/SKILL.md`
first lines (the Origin stamps, at the starter the launchpad carries at activation) and `CLAUDE.md` §Start here
(the one-line role obligations); the target's `docs/ai-reference/*` and
`tools/scripts/scrub-board-fixture.mjs` at the base; the platform's public
`docs/control/orders/WO-221.jsonl` and `WO-226.jsonl` at the commit the
reducer records; design A and the UI vision at the sections named above.

**Objective:** at `/machinery` the operator sees one recorded order (WO-221,
switchable to WO-226) as a strip of beats left to right in recorded time,
the distance between beats proportional to the minutes between rows; above
it the four role slots (executor, verifier, repairer, reviewer) and the
operator as a figure at the edge; stepping the anchor fills a slot with the
agent that made the next row, labelled by harness, model and effort, with a
hand-back card reading pass, fail or no verdict; a refilled slot keeps the
earlier occupant as a ghost; opening an agent shows its declared obligation,
the mechanisms it runs with (the role's active gems and supports by id and
its prose sections by key, from the launchpad's own role files at the
starter version named) and what it waited on; a shelf holds the operator's
own ideas, each a titled mechanism change (remove or add a gem or support,
narrow the knowledge to listed inputs, set the rung, add a wait with its
cause, replace a prose section with the operator's own words); selecting an
idea then an agent redraws that agent's card and the use case's beats under
the idea's caption with the before as a ghost and a band saying presentation
only, nothing written (the caption names what the change shows in the use
case and says so when the beats are unchanged); a refused drop stays visible
with its reason; the
operator's ideas and applied state persist in browser storage and, when the
local sink runs, every dropped idea is also appended to the repository's
ignored intake; nothing else leaves the browser.

**Observed gap (dated 2026-10-24; restated by the pass that sets the base):**
`/machinery` renders WO-013's arriving page; the app has no record reader,
fold, replay clock or fixture pack beyond the board's; no copy of a control
segment exists in the target. The platform's public segments at core
`49d8c4c3`: WO-221 has 16 rows, 8 of them operator rows (the activation,
three verification requests, two repair requests, two final-review
requests, none carrying an actor), seven gaps after a hand-back of 87.8,
109.9, 1.7, 1.4, 2.1, 18.2 and 5.9 minutes (the 87.8-minute gap followed
the implementation hand-back, which carries no verdict; the 109.9-minute gap
followed the first verification's fail), a span of 1,110.3 minutes, hand-backs
by three models on two harnesses; WO-226 has 6 rows, 3 operator rows and two
gaps of 316.0 and 31.7 minutes (re-derived by the 2026-10-24 planning pass,
§4). The launchpad's role files at starter v0.94.0 stamp the executor skill
with 19 mechanism ids and each of the other five role skills with 13, and the
worker type with 6. The operator has decided: slots, select-then-apply, no
generated cards, ideas saved to ignored intake.

**Design:**

- **Types** (`libs/shared/models/src/lib/machinery.ts`, `type:models`):
  `ControlEventLite { ordinal, type, recordedAt, workOrderId, actor?: {
  harness, model, effort, mode? }, verdict?: 'pass' | 'fail' }` and nothing
  else, the operator's field list (`actor` is one composite object with
  exactly those keys, declared in the schema with `additionalProperties:
  false`; a slot label reads its three values as they are, and the reader
  never splits or derives them); `SlotId` (`executor`, `verifier`,
  `repairer`, `reviewer`); `Beat`, `Episode`, `OrderStrip` (beats,
  episodes, anchor, totals of operator and worker minutes, omissions; named a
  strip, not a scene, so that "scene" stays the scene engine's and the
  catalog's word);
  `MechanismChange` (`removeGem(id)`, `addGem(id)`, `removeSupport(id)`,
  `addSupport(id)`, `narrowKnowledge(inputs)`, `setRung(n)`, `addWait(minutes,
  cause)`, `replaceProse(sectionKey, text)`); `IdeaCard { id, title, by:
  'operator', change: MechanismChange, appliesTo: SlotId[], caption,
  createdAt, status: 'draft' | 'applied' | 'did-not-stick', claims:
  'presentation-only' }`; `RoleMechanisms { role, gems: string[], supports:
  string[], proseSections: string[], source: { file, starter } }`.
- **Records** (`libs/shared/records`, `scope:shared`, `type:data-access`,
  `@dotln-angular/records` and `/testing`): `scene-reader.ts` (a fixture's
  rows to `ControlEventLite[]`, tolerant of an unknown `type`, which becomes
  an `unknown` beat and is never dropped); `concert-fold.ts` (rows to
  `OrderStrip`: the slot for a row is a fixed table by `type`, the
  implementation hand-back to the executor, a verification completion to the
  verifier, a repair completion to the repairer, a final-review completion
  to the reviewer, every request and the activation to the operator, else
  `unknown`; gaps from `recordedAt` differences; a refilled slot's earlier
  occupant kept as a ghost; a `mode: 'subagents'` actor flagged as a colony
  of unknown size); `apply-ideas.ts` (a pure fold of mechanism changes over a
  copy of the scene and the role mechanisms; a change whose `appliesTo`
  excludes the target is refused with the reason); the fixture pack under
  `/testing` (`segments/order-221.json`, `segments/order-226.json`,
  `role-mechanisms.json`) and `provideRecordsTestKit()`. The two segment
  files are named by the platform order's number alone, never `WO-NNN`,
  because the target's outward lint refuses a launchpad identifier in any
  path the pull request's Change table lists (core's answer of 2026-10-24,
  item 1; the 2026-10-24 second pass verified the names against the lint);
  the platform id stays inside each file as `source.order`.
- **Replay** (`libs/shared/replay`, `scope:shared`, `type:util`): `replayOn(events,
  scheduler, zero)` emitting each event at its `recordedAt` offset on an
  injected scheduler; `ReplayClock` (position, speed, `jumpTo`) over RxJS
  virtual time with a resolution parameter (one frame per recorded second by
  default); `toAsciiMarble`; `frames`. Takes a generic `{ recordedAt }` shape so
  it imports no models. WO-017 reuses it.
- **Fixtures.** `tools/scripts/reduce-control-segment.mjs <segment.jsonl>
  <out.json> --commit <sha>` keeps exactly the fields of `ControlEventLite`,
  writes `{ schema: 'control-event-lite-v0', source: { repository:
  'DylanBWood/DotLn', commit, order }, rows }`, runs `assertScrubbed` over
  every string, each `actor` value included, which must read as a harness,
  model or effort label (a value carrying `@`, a path separator or a dotted hostname fails), and prints PASS or FAIL without values; the committed fixtures carry the `actor` values the platform's rows recorded (harness, model and effort as observed labels, never a pin); run by hand against the platform's public repository at a recorded commit, as the board fixture was captured; the platform's control segments and its role files are public repositories, so the copies' sources are public, and the fixture's `source` block names the repository.
  `tools/scripts/check-record-fixtures.mjs` (Ajv against
  `control-event-lite-v0.schema.json` with `additionalProperties: false`,
  plus `assertScrubbed`) wired into `check:fixtures`.
  `role-mechanisms.json` lists, per role, the ids the launchpad's role skill
  stamps carry and the prose section keys of each skill, with the file name
  and the starter version as its source; the repairer slot has no skill of
  its own, because the repairer is the executor role at `resume: fix`, so
  the file maps `repairer` to the executor's entry and the agent card says
  so; copied as data by the executor from
  the launchpad kit files at activation, which records the starter and the
  per-role counts it read in the decisions file (at starter v0.96.1 the
  executor stamp carries 19 ids and each other role 13; a later starter may
  differ, and the order never hard-codes them).
- **Feature** (`libs/features/machinery`, replacing the arriving page, with
  `libs/features/machinery-data-access`): `machinery-page` (container) over
  `MachineryFacade` (`vm = computed(() => applyIdeas(fold(segment),
  roleMechanisms, applied))`); composites `beat-strip` (beats as buttons with
  pressed state; gaps as inline SVG widths with a floor so a one-minute gap
  stays visible; a text equivalent per gap), `slot-row` (four slots and the
  operator figure; ghosts as reduced-opacity figures with an earlier-occupant
  line), `agent-card` (harness, model and effort badge; declared obligation;
  mechanisms as a key-value list of gems, supports and prose sections;
  waiting on), `idea-shelf` (the operator's cards; the new-idea form with a
  title, a change kind from a menu, its parameters and the target roles; no
  generated cards), `use-case-caption` (what the applied change shows in the
  use case: `addWait` moves the beats after its target by its minutes; every
  other change redraws the agent's card and the caption says the beats are
  unchanged), `sandbox-band`; mappers `declared-line`,
  `phase-glyph` (native emoji with a text equivalent), `gap-scale`; a layout.
  `MachineryStore` (SignalStore) holds the applied ideas and the shelf with
  WO-007's `withPersistedState({ key: 'machinery', select })` under
  `dotln-angular.machinery`; the strip itself derives from the fixture and
  never persists. Order switch WO-221 and WO-226. Select-then-apply with the
  keyboard: pick a card, then a slot or an agent; no drag.
- **The idea sink** (`tools/idea-sink/idea-sink.mjs`, `npm run idea-sink`): a
  local Node process on `127.0.0.1` at `DOTLN_IDEA_SINK_PORT` (default 4310)
  that accepts `POST /ideas` only when the request's `Origin` header is the development origin and its `Host` is the loopback address and port (any other origin or host is refused with 403), refuses a body over 16 KB, never logs a body, and appends one JSON line per idea to
  `DOTLN_INTAKE_SINK_DIR` (default `docs/intake/ideas/` in the DotLn-Angular checkout the sink runs from, never the launchpad's intake, which this order adds to `.gitignore` with a `.gitkeep`), creating
  `ideas-YYYY-MM-DD.jsonl`; the sink refuses to start when the resolved
  directory lies in no Git repository or is not ignored by the one that
  contains it (`git check-ignore -q <dir>` exits nonzero), so an idea never
  lands in a tracked path, a control directory or the launchpad; both variables documented in `.env.example`, values
  never committed. The app posts a dropped idea when
  `environment.ideaSinkUrl` is a string (development:
  `http://127.0.0.1:4310/ideas`; production: `null`); the drop is applied
  and persisted in browser storage first, then posted, and a failed post
  (the sink set but down) is one toast through WO-007's error store, so
  nothing is lost and nothing blocks. The operator
  runs the sink beside `nx serve` from their own checkout, so the ideas land
  in that checkout's ignored intake and are not lost in a browser.
- **Design brief** (WS-001 rule 25): the strip is a timeline instrument across the page's width, the gaps drawn as distance with their minutes beside them, the beats as glyphs in one phase palette; the four slots as figures above it in the one role palette the scene and the catalog share, a ghost at reduced opacity; the agent card as prose in the catalog's measure (what it was obliged to do, what it ran with, what it waited on) with the mechanisms as a readable list of names, never a definition-list grid; the idea shelf as rows; the sandbox band as text; nothing animated at rest. Two candidate layouts, the slots above a horizontal strip and the slots beside a vertical one, are built as stories and rendered at 1440 and 360; both screenshots go in the pull request, the operator picks one there, the decisions file records the pick and the other is deleted before final review.
- **Documents:** `docs/dev-reference/architecture/machinery.md` (the records
  and replay libraries, the fold's slot table, the fixture reducer and its
  field list, the idea sink, the rule per idea kind (only `addWait` moves the beats; every other kind redraws the card and the caption says the beats are unchanged), what the view claims and does not) and `docs/ai-reference/machinery-rules.md` (fixtures carry the six fields and
  no path; the fold decides nothing and derives slots from the type table;
  an unknown type renders as unknown, never dropped; a drop changes a copy
  and claims presentation only; no generated cards; nothing writes a control
  record).

Rejected: reading the platform's resident over its loopback (axis: the
operator's decision that the app is not wired to core; the stopgap is a
scrubbed copy, the store comes later); generated idea cards from records
(axis: the operator's decision; the ideas are theirs); drag and drop now
(axis: select-then-apply first); the launchpad's intake as the sink's
default (axis: the app's process writes inside its own repository; the
operator points the sink elsewhere by one variable); episodes as the unit
instead of slots (axis: the operator's words, separate agents in their role
slots today; the episode view is a later toggle).

Live-run surfaces at the base: WO-006's served production build and
Storybook; WO-007's MSW worker; WO-013's menu; WO-014's catalog; WO-015's
scene.

**Deliverables:** the types; the records and replay libraries with kits; the
reducer and the check; the three fixtures; the machinery feature and its
data-access library; the idea sink and its tooling test; the two documents;
`docs/evidence/WO-016/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-016.
2. Generate `libs/shared/records` (`scope:shared,type:data-access`),
   `libs/shared/replay` (`scope:shared,type:util`) and
   `libs/features/machinery-data-access` (`scope:dotln,type:data-access`)
   with logged commands and testing entry points. Check: `npx nx show
   projects` lists the three.
3. `machinery.ts` types; `control-event-lite-v0.schema.json`;
   `reduce-control-segment.mjs`; `check-record-fixtures.mjs` wired into
   `check:fixtures`; a tooling test that the reducer drops every field
   outside the list and refuses an absolute path. Check: `npm run
   test:tooling` exits 0.
4. Produce `segments/order-221.json` and `segments/order-226.json` from the
   platform's public segments at a recorded commit; record the commit and
   the row counts (16 and 6) in the decisions file. Check: `npm run
   check:fixtures` exits 0.
5. `role-mechanisms.json` from the launchpad's six role skill stamps and
   the worker type at the starter the launchpad carries at activation (ids and
   section keys only), with the file name and starter version per role; the
   executor records the starter and the per-role counts read in the decisions
   file and sets the spec's expected counts from them. Check: a spec asserts
   each role's count in the file equals the expected count the executor set.
6. `scene-reader.ts`, `concert-fold.ts`, `apply-ideas.ts` with specs: the
   WO-221 fold yields 16 beats, 8 operator beats and the seven gaps of the
   planning document's table within one second; the WO-226 fold yields 6
   beats and gaps of 316.0 and 31.7 minutes; an unknown type yields an
   `unknown` beat; the refilled verifier slot keeps a ghost; a refused idea
   returns its reason and leaves the scene unchanged. Check: `npx nx test
   records` exits 0.
7. `replay`: `replayOn`, `ReplayClock`, `toAsciiMarble`, `frames`; a marble
   spec reproduces the WO-221 rows at their frames. Check: `npx nx test
   replay` exits 0.
8. `MachineryStore` with `withPersistedState` under `dotln-angular.machinery`.
   Check: the persisted-state spec over a fake storage asserts the key prefix
   and no other write.
9. Composites, mappers, layout, container, facade; stories `RecordedWO221`,
   `RecordedWO226`, `UnknownEventType`, `IdeaApplied`. Check: `npx nx test
   machinery` exits 0; `npm run lint:components` exits 0.
10. The idea shelf's new-idea form, select-then-apply, the ghost, the band,
    the caption, the refusal. Check: a facade spec applies `narrowKnowledge`
    to the verifier at beat 4 and the card's mechanism count falls while the
    ghost keeps the before and the caption says the beats are unchanged; a
    second spec applies `addWait` and the beats after the target move by its
    minutes.
11. The idea sink process, `npm run idea-sink`, `.env.example` lines,
    `.gitignore` entry for `docs/intake/`, `environment.ideaSinkUrl`
    (development string, production `null`), the post on drop with the
    toast on failure. Check: a tooling test starts the sink on an ephemeral
    port with a temporary ignored directory, posts one idea and asserts one JSON line appended; a second post over 16 KB is refused; a post whose `Origin` is not the development origin or whose `Host` is not the loopback is refused; a third test
    starts it on a tracked directory of a temporary repository and asserts
    the refusal; a facade spec with the post failing asserts the idea is
    applied and present in the fake storage.
12. Replace the arriving page in `machineryRoutes`; `machinery.*` i18n keys;
    the Machinery menu group lists Board and Agents. Check: `npm run
    i18n:check` exits 0; `npx nx build dotln --configuration=production`
    exits 0 and `grep -rl "127.0.0.1" dist/apps/dotln/browser` prints
    nothing.
13. e2e `apps/dotln-e2e/src/machinery.spec.ts`: sixteen beat buttons, four
    role slots and the operator figure; stepping to the second beat fills the executor slot; the
    verifier slot shows a ghost after beat 8; an idea created in the form,
    applied to the verifier, redraws the card with the ghost and the band; a
    refused drop stays visible with its reason; the idea survives a reload;
    the keyboard path across beats and the shelf; axe at the board spec's threshold; no horizontal overflow at 360, 768 and 1440; then the walkthrough: the executor performs the Objective's session in the served production build, saves one screenshot per step at 360, 768 and 1440 under `docs/evidence/WO-016/walkthrough/` and writes `docs/evidence/WO-016/walkthrough.md` with the dated steps and what the caption said at each drop. Check: `npx nx e2e dotln-e2e` exits 0 and the walkthrough files exist.
14. Documents: `machinery.md`, `machinery-rules.md`, pointers,
    `conventions.md`. Check: files exist.
15. Dependency check as WO-015 step 15. Check: prints nothing.
16. Gate plain and review. Check: passing rows, no tracked-byte mutation.
17. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the records fold, the replay clock and the machinery
    container; WS-001's delivery states updated by the final review. Check:
    `npm run test:docs`. Then the publish, review and records steps as WO-007
    steps 15 to 17, with the branch `feat/machinery-view`, the title `feat:
    add the machinery view over recorded orders`, `docs/evidence/WO-016/`
    and `docs/final-reviews/WO-016/`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run check:fixtures`,
`npm run catalog:check`, `npm run test:tooling`, `npm run i18n:check`,
`npx nx e2e dotln-e2e`; in the launchpad order worktree `npm run test:docs`;
then the target gate plain and review once each.

**Acceptance criteria (all required)**

1. `libs/shared/records/testing/src/fixtures/segments/order-221.json` and
   `order-226.json` validate against `control-event-lite-v0.schema.json` with
   `additionalProperties: false` over the fields `ordinal`, `type`,
   `recordedAt`, `workOrderId`, `actor`, `verdict`, carry a `source.commit`
   and no absolute path (`npm run check:fixtures` exits 0), and a spec asserts `order-221.json` carries 16 rows and `order-226.json` 6, and `ls libs/shared/records/testing/src/fixtures/segments | grep -ciE '^wo-'`
   prints 0.
2. `npx nx test records` exits 0 with specs asserting: the WO-221 fold has 8
   operator beats and the seven gaps 87.8, 109.9, 1.7, 1.4, 2.1, 18.2 and
   5.9 minutes within one second each, the first following a hand-back with
   no verdict; the WO-226 fold has gaps of 316.0 and 31.7 minutes; an
   unknown `type` yields an `unknown` beat; the verifier slot carries one
   ghost after its refill; and `applyIdeas` refuses a card whose `appliesTo`
   excludes the target with a reason while the scene stays unchanged.
3. `role-mechanisms.json` lists, for the executor, planner, refuter,
   release-close, reviewer and verifier, the ids each role's Origin stamp
   carries at the starter the launchpad carried at activation, each role
   naming its source file and that starter version (a spec asserts each role's count against the counts the executor recorded in the decisions file from the files read at activation; no starter's figures are written here, because they change with the starter),
   the `repairer` slot reads the executor's entry and its card states that
   the repairer runs the executor role at `resume: fix` (a spec asserts the
   card's text), and
   `grep -c "/Users/" libs/shared/records/testing/src/fixtures/role-mechanisms.json`
   prints 0.
4. `grep -rl "generated" libs/features/machinery/src/testing/fixtures`
   prints nothing and the shelf's fixture of ideas is empty at first render
   (a spec asserts zero cards before the operator creates one).
5. The tooling test for the idea sink passes (`npm run test:tooling` exits
   0): one post appends one JSON line to a temporary ignored directory, a
   body over 16 KB is refused, a request whose `Origin` is not the development origin or whose `Host` is not the loopback is refused, and the sink refuses to start on a directory that is not Git-ignored;
   `environment.prod.ts` sets `ideaSinkUrl` to `null` and
   `grep -rl "127.0.0.1" dist/apps/dotln/browser` prints nothing after
   `npx nx build dotln --configuration=production`.
6. The persisted-state spec asserts every key written starts with
   `dotln-angular.machinery` and no other storage, cookie or network write
   occurs except the sink post when `ideaSinkUrl` is set, a spec with that post failing asserts the dropped idea is applied and persisted, a spec seeding `dotln-angular.machinery` with a value that does not parse asserts the shelf renders empty and the strip renders; and
   `grep -rlE "from 'node:|from \"node:|require\(" libs/shared/records/src libs/shared/replay/src libs/features/machinery/src libs/features/machinery-data-access/src --include='*.ts' | grep -v spec`
   prints nothing.
7. `npx nx e2e dotln-e2e` exits 0 and includes: sixteen beat buttons, four
   role slots and the operator figure on `/machinery`; the executor slot filled at the second beat;
   a ghost in the verifier slot after the eighth; an idea created, applied
   and redrawn with the ghost, the presentation-only band and a caption
   naming what changed; a refused drop
   visible with its reason; the idea present after a reload; the keyboard
   path across the beats and the shelf; axe at the board spec's threshold;
   no horizontal overflow at 360, 768 and 1440.
8. `docs/dev-reference/architecture/machinery.md` and
   `docs/ai-reference/machinery-rules.md` exist and the rules file states
   that the fold decides nothing and that no card is generated from records
   (`grep -c "generated" docs/ai-reference/machinery-rules.md` is at least 1);
   `package.json`'s `dependencies` keys equal the base's.
9. `node scripts/target-gate.mjs WO-016 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight line ran before the first full gate.
10. **Use (WS-001 rule 24).** The verifier performs the Objective's session in the served production build: open `/machinery` on WO-221; step the anchor to the second beat and read the executor's card; step past the eighth and find the verifier's ghost; open an agent and read its obligation, its mechanisms and what it waited on; create an idea in the shelf, apply it to the verifier and read the caption and the band; apply a refused drop and read its reason; reload and find the idea; switch to WO-226. The VER report carries a `## Walkthrough` section with the dated steps and names the screenshots at 360, 768 and 1440 under `docs/evidence/WO-016/walkthrough/` (`ls docs/evidence/WO-016/walkthrough | wc -l` prints at least 12), and states in the verifier's own words what the applied idea changed in the use case. The criterion is met only when every step completed and that statement is present.

**Evidence gate:** the gate rows, the recorded command outputs, `docs/evidence/WO-016/README.md`, `docs/evidence/WO-016/walkthrough.md` and its screenshots, and `docs/evidence/WO-016/host-qualification.md`.

**Known issues and carry-ins:** The base line is provisional and publishes right under starter v0.96.1 (the merge-base publish of core WO-230; WO-013's fix dispatch is its first use in this fork); a pass may set it to the predecessor's merge commit. The copies are a stopgap the operator named: when the
mining store exists (candidate C1), the fixture pack becomes a route behind
the same facade or is deleted. The strip's axis is time, never cost, and a
gap includes idle time; the view labels a long gap as nobody dispatched,
never as the operator idle, because the record has no presence. The prose
sections are listed by key; replacing one applies the operator's own words
to the copy and never to a kit file. Starter v0.96.1's plan gate no longer advises on this order's own launchpad record paths (core's answer of 2026-10-24, item 1); they stay as the kit names them and the publish command's body file must not name them. From receipt 008
(the 2026-10-24 pass's refutation), carried into this text by the 2026-10-24
second pass: only `addWait` moves the use case's beats and the caption says
so for every other change (the Objective, the `use-case-caption` composite
and step 10); criterion 3 reads the role stamps at activation instead of
hard-coding a starter and its counts; and the records types are `OrderStrip`,
not `ConcertScene`, so that "scene" is not overloaded across the fold, the
scene engine and the catalog. From receipt 009 (the second 2026-10-24 pass's
refutation), carried into this text by the 2026-10-25 pass: `actor` is one
composite the schema declares and the reducer's scrub screens each of its
values (the types, the reducer, criterion 1); the repairer slot reads the
executor's entry and its card says why, and the e2e counts four role slots
and the operator figure (the fixtures, step 13, criteria 3 and 7); the sink
refuses a directory that is not Git-ignored, and a drop while the sink is
down is applied and persisted before the post (the sink, step 11, criteria
5 and 6). This order activates only on a launchpad whose
starter carries core WO-221's `--draft` form; the draft pull request and its
workflow runs are a final-review obligation read from
`docs/evidence/WO-016/preview-pr.json`, never a criterion. `Target release
classification: minor` and `Target release notes: reviewed` were set by the
2026-10-24 pass under WO-012's declared policy.

**Non-goals:** a live connection to any resident or to core; drag; generated
idea cards; agents in concert beyond one order's slots (the fleet, the
blackboard room and the flow instruments of the run are later members,
candidate C5); the digital twin's lane (WO-017); any write outside browser
storage and the local sink; a token axis.

**Operator-review assumptions:** the operator accepts the six-field copy as
the stopgap, runs the idea sink beside the dev server from their own
checkout when they want ideas saved, and reads the one draft pull request
before final review, which the final publish reuses.
