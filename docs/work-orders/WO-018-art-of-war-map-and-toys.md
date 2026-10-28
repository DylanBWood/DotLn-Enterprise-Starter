# WO-018 — The first public mining into the app's own store: The Art of War mapped from its public-domain text into catalog rows and typed into tools through the catalog pipeline, the run's nineteen toys carried in full and six new toys designed for the mined sources that have none (Meadows, Pirsig, Poincaré, Gladwell, Taleb and the 5S set), and the toy shelf where the operator reads what each toy would show and picks the next one to build

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `map-artofwar.json` and `tools-artofwar.json` to the catalog
data, `toy-v0.schema.json` and `toys.ts` to the models, `toys.json` (the
run's nineteen toys in full and the six new ones), the toy-source tool
files, the toy shelf and the toy page under Tools, the map and toy checks,
two document sections, about 32 source files plus about 300 data rows; adds
no runtime dependency. Removes nothing. Wall-clock: about 4 to 6 hours of
executor work, of which two fan-outs run in parallel, plus the fixed cycle;
unknown until run. Context bytes: WS-001 §The app and its sub-apps, the
catalog rules as WO-019 leaves them, the maps README, design B §3 and
`toys.jsonl` read at the run's folder, this order, about 190 KB for the
executor; the mappers read one public-domain text. Commands added in the
target: `npm run toys:check`; `npm run catalog:check` and `catalog:join`
already cover the new files. Tokens: unknown until run; recorded per worker.
Steps: 14. Re-mints: none. Refutations paid: three (the 2026-10-24 pass's
receipt on the first text, the 2026-10-26 pass's on the rewrite, the
2026-10-28 pass's on this one).
**Nomination provenance:** the operator's decisions of 2026-10-24 (ignored
intake capture `docs/intake/notes/planning-2026-10-24.md`, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9):
after the catalog pipeline, map The Art of War and design toys for the six
mined sources that have none; the app's data comes from public mining into
its own store. Design files this order builds from, read at the run's folder
on this machine (core's ignored intake, read-only; digests pin what was
read): `digest/queue-and-rules.md` §1.2 items 15 and 17 (the map pass and
the six-source toy design, each sized under the twenty-agent rule; SHA-256
`b60a7607797cd781c94dc2b872e5e478ab1eb18b42964e967d1f45269e2beb31`),
`out/maps/README.md` (the row schema a map follows; SHA-256
`9b6c905f7a2772e5f4eb60d66f66527629467e0b549f586232870c16cc3ad5e0`),
`out/angular/README.md` §Sources with no toy (SHA-256
`4810fd3337dc3fedaaf3e37f1fe2a0841e79a91bc73dd9db38833d104223762c`) and
`out/angular/toys.jsonl` (the nineteen toys: id, rank, slice, purpose,
horizon, design anchor, sources, tools, records replayed, question,
evidence, what each graduates into, first slice, dependencies; SHA-256
`411e486e086218e9988e26c2f290dd302115518b3c049279fef3793e3efea0fb`). The
run is the operator's own research and lies outside the clean room (WS-001
rule 23 as corrected on 2026-10-26); the quarantine files stay closed
because they were quarantined for employer material. Planner-synthesized by
the 2026-10-24 planning pass ([planning document](../planning/mining-run-orders-2026-10-24.md)
§6 D10 and §9); amended by the 2026-10-24 second pass and the 2026-10-25
pass for receipts 008 and 009. Rewritten by the 2026-10-26 pass
([planning document](../planning/acceptance-by-use-2026-10-26.md) §6 D8) on
the operator's direction of that day (capture SHA-256
`9ec78ddbc267936d59fc7fe88b4a8b9c8d42d4692979db31be5129c817fd72a6`): the
"never a passage" overlap check, the "mapper's own words" rule and the
"ids and short titles only" reading of the nineteen toys rested on a rule
the operator never gave and go; the toys enter in full; the map rows carry
the public text's maxims where a maxim is the concept; the shelf is a page
the operator reads to pick the next toy, accepted by use (rule 24) and
briefed for its look (rule 25). Amended by the 2026-10-28 pass
([planning document](../planning/standard-pass-v0-100-0-2026-10-28.md) §6
D4 and D6): the design comparison reads as the operator corrected it in
WO-019, with the shelf's first pair named, and receipt 011's items are
written in: the fan-out stops by decision when its token total passes
WO-014's recorded order total (its item (a)); the operator's ruling on the
run's toy designs is recorded at activation (b); criterion 6 gains the
production build within the declared budgets with the chunk sizes beside
WO-019's (c); the three meanings of "store" are named (d). Opaque
identifier, not a priority.
**Depends on:** WO-014 merged (hard: the `Tool` schema and the classifier
brief this order's map pass reuses); WO-019 merged (hard: the `v1` schema
with definitions, the join, and the catalog check as it leaves them); WO-017
merged (hard: the member before this one in the sequence; the base above is
provisional: since starter v0.96.1 (core WO-230) the target publish describes the change from the merge base of the subject and the target's `main` and names the activation base beside it, so activation on this base publishes right; the planning pass that runs after WO-017 merges may set it to that merge commit, and none is required to (the 2026-10-24 second pass, D4)).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-014",
    "relation": "hard",
    "reason": "the Tool schema and the classifier brief this order's map pass reuses"
  },
  {
    "workOrderId": "WO-019",
    "relation": "hard",
    "reason": "the v1 schema with definitions, the join and the catalog check this order's map and toys extend"
  },
  {
    "workOrderId": "WO-017",
    "relation": "hard",
    "reason": "the preceding member in the serial chain; the base line is provisional and publishes right under starter v0.96.1's merge-base publish"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 3, 5, 10, 15, 23, 24, 25; §The app and its sub-apps and §Design
direction); `docs/repositories/dotln-angular.md`; `docs/operator/README.md`;
`docs/control/budgets.json` (`subagentCap`); the target's
`docs/ai-reference/catalog-rules.md` and
`docs/dev-reference/architecture/catalog.md` as WO-019 leaves them; the maps
README, design B §3 and `toys.jsonl` at the sections named above.

**Objective:** (the operator's session, WS-001 rule 24) the operator opens Tools, Toys and
sees twenty-five toys on a shelf, grouped by the five purposes the run gave
them (agents in concert, the toolbox and the toy scene, the operator-model
testbed, the planning and riff surface, flow and the constraint) and the
six new ones under their sources; each toy shows its title, its source
works, its one-line question and its status (designed, built, graduated,
did not stick). They open The Twenty and read, in a measure set for reading,
what the toy is (its purpose), what they would see on screen, the question
it answers, the evidence it would produce, what it would graduate into, the
records it replays, and the tools it needs as links into the catalog, where
each tool reads; its status says built and links to the scene. They open
The patience lane and read the same. They open a new toy, Meadows' leverage
points as a scene, and read its question, its scene type, its metric and
the tools designed for it, each typed from the work and linked. They filter
to one source and to designed toys, and decide which to build next; the
card says how to say so (a GitHub issue on the platform's repository, the
graduation route). The catalog now carries The Art of War: they open it on
the catalog's shelf, read a chapter, read a maxim's row with the maxim
itself where the maxim is the concept, and see the tactics typed for the
commander scene to come. What the operator learns is what every toy in the
run would show them; what they decide is the next one to build.

**Observed gap (dated 2026-10-26; restated by the pass that sets the base):**
The Art of War has no rows anywhere in the run and the run's commander toy
carries placeholders for it; Meadows, Pirsig, Poincaré, Gladwell, Taleb and
the 5S set were mined by the run but none of its nineteen toys draws on
them; the app has no toy record type and no shelf; the catalog's six works
and their tools exist since WO-014, and since WO-019 every tool carries its
definition, relations and hooks and the check validates schema and counts
only. The run's `toys.jsonl` carries the nineteen toys in full with their
question, evidence, graduation path, tools and sources; the operator's own
research is the app's subject matter and enters as data. A public-domain
English translation of The Art of War is available from Project Gutenberg
(the 1910 Lionel Giles translation, ebook 132); the mappers read it and
commit concept rows that carry the maxim where the maxim is the concept.

**Design:**

- **Map rows for a new work** (`libs/shared/catalog/src/maps/map-artofwar.json`,
  schema `map-row-v0.schema.json`; its own directory, because a map row is
  the source the join reads and `check-catalog.mjs` scans `src/data/` only;
  `check-map.mjs` validates the maps directory against the schema and runs
  inside `check:fixtures` after the catalog and record checks): `{ id:
  'aow:<n>', work: 'artofwar', chapter, section, concept, type, definition,
  maxim?: string, related: string[], hooks: { domain, clause }[], verified:
  '<chapter reference>' }`, where `definition` is the mapper's reading of the
  concept and `maxim` is the sentence of the Giles text that states it,
  carried verbatim because the text is public domain and the maxim is the
  concept; thirteen chapters; the critic samples twenty rows against the
  text and returns the rows that misstate it, which the mapper rewrites.
  This is the first map the app owns: a work mined in public into the app's
  own store, the direction the operator gave; the text's source and SHA-256
  are recorded in the evidence README.
- **Typing and joining** reuse WO-014's classifier brief, WO-019's
  `join-maps.mjs` (which learns the in-repo maps directory as a second
  root) and `merge-checkpoints.mjs`: one classifier over the map's rows
  writes `tools-artofwar.json`; the join carries the definition, maxim,
  relations and hooks into the tools; the critic's sample covers the typed
  transforms as WO-014's checkers did; the `v1` summary's `maps` list gains
  the map with its digest.
- **Toy records** (`libs/shared/models/src/lib/toys.ts`, `toy-v0.schema.json`,
  `libs/shared/catalog/src/data/toys.json`): `Toy { id, title, purpose,
  sources: WorkSlug[], sceneType: SceneTypeId | null, question, youWouldSee,
  evidence: string[], graduatesInto: string | null, recordsReplayed:
  string[], tools: ToolId[], metric: MetricId[], faces?: { selection;
  transform }, status: 'designed' | 'built' | 'graduated' | 'did-not-stick',
  origin: 'run-2026-10-22' | 'this-app', designAnchor: string | null,
  dependencies: string[] }`. The run's nineteen toys enter in full from
  `toys.jsonl` (the fields mapped one to one; `youWouldSee` from each toy's
  scene paragraph in its design file by the anchor the row names), with
  The Twenty and the patience lane marked `built` when WO-015 and WO-017
  have merged and linked to their routes; the six new toys enter in full
  with `origin: 'this-app'`. `toys:check` validates the schema and that
  every tool id a toy names exists in the catalog.
- **The toy designers' fan-out** (eight workers: six designers, one per
  source, one synthesizer, one critic): each designer is given the toy
  pattern (a toy is a scene with units or stations, a selection, a
  transform from the closed enum or a proposal for one, an observable and a
  metric), the catalog's scene types and enums, the work's rows in the run
  where the source was mined (the probes and lenses by path; no quarantine
  file), and returns one toy record plus up to five tools for its source
  with five faces and a definition in its own words from the work, each
  naming the work and chapter or named concept in a `source` string
  (`tools-<source>.json`, `provenance: 'public-work'` with `map: null`, the
  pairing WO-014's schema declares, outside the mapped-rows count rule); the
  synthesizer orders the six toys by what the operator can play with
  soonest on the scene engine and writes `toys-summary.json`; the critic
  reads the six records and returns findings the executor disposes. A
  transform kind the enum lacks is recorded as `untyped` with the proposed
  kind in its reason; the enum grows only by a decision (WO-014's rule).
  Together with the map pass (two mappers, one critic, one classifier) the
  order dispatches at most twelve workers (a mapper's rewrite of the rows
  the critic names continues that mapper and counts once, as WO-014's reruns
  did), each a `dotln-worker` or `dotln-worker-fable` on the operator's
  dispatch, under the launchpad's `subagentCap`; `node scripts/harness.mjs
  usage <session>` is read before the first spawn and at handoff. The stop
  rule is declared before the spend: the executor reads each worker's token
  total as it returns and stops the fan-out with a recorded decision when
  the workers' totals summed with the session's own pass WO-014's recorded
  order total as `npm run meta` prints it at activation (117,733,609 tokens
  on 2026-10-26).
- **The toy shelf** (`libs/features/tools` gains `ChildPaths.Toys = 'toys'`
  and `ChildPaths.Toy = 'toys/:id'`; `toys-page` and `toy-page` over
  `ToolsFacade`): the shelf as rows grouped by purpose and then by source
  for the six new ones (title, sources, the one-line question, status);
  filters by source and status as facets; `toy-page` as a reading surface in
  the catalog's measure and type scale: purpose, what you would see, the
  question, the evidence, what it graduates into, the records it replays,
  the tools as links into the catalog's reading, the status with a link to
  the route when built, and the graduation route sentence; the Tools home
  lists Toys beside Catalog with the count of designed and built toys.
- **Design brief** (WS-001 rule 25): the shelf and the toy page use the
  catalog's type scale, measure and work colours; the shelf is a list of
  rows with the question legible at a glance, never a card grid; the toy
  page is prose with the tools as links; the status is a word, not a badge
  grid; nothing animated at rest. The comparison runs as the operator's eye
  doctor test (rule 25 as revised on 2026-10-28): the first pair is the
  shelf grouped by the run's five purposes with the six new toys under their
  sources, against one list ordered by what the operator can play with
  soonest (the synthesizer's order), both rendered at 1440 and 360 during
  execution, A then B with the round named in the question and both
  captions; the preference makes the next pair, content and usability
  before cosmetic polish, until the operator says the process is done, and a
  preferred candidate alone is not acceptance; the rejected implementation
  leaves the code when its round is decided, its screenshots and an
  implementation record under `docs/evidence/WO-018/design/` the history;
  nothing is relitigated for this order.
- **Documents:** `docs/dev-reference/architecture/catalog.md` gains §Mining a
  new work (the map schema with the maxim field, the public-text rule, the
  critic's sample, the typing and join) and §Toys (the record, the shelf,
  the status ladder, the graduation route); `docs/ai-reference/catalog-rules.md`
  gains the rules (a map row carries the mapper's definition and the public
  text's maxim where it is the concept; a toy names its tools by id and
  enters with its full design; the enum grows only by decision).

Rejected: mapping The Art of War from the run's placeholders (axis: a work
enters the catalog only through its own map pass); the nineteen toys as id
and short title only (axis: the rule that reading rested on was never the
operator's, and a shelf of titles is the hollow page again); an overlap
check of the map's definitions against the text (axis: the text is public
domain and the maxim is the point; the check enforced a rule nobody gave);
a single worker for both fan-outs (axis: the checkpoint rule and the
twelve-worker cap); prose design documents for the six toys instead of
records (axis: the record is what the shelf shows and the operator reads).

Live-run surfaces at the base: WO-006's served production build and
Storybook; the sub-apps of WO-013 to WO-017; WO-019's catalog.

**Deliverables:** the map and tool files for The Art of War; the toy type,
schema and `toys.json`; the six sources' tool files; the toy shelf and the
toy page; the checks and npm script; the two document sections;
`docs/evidence/WO-018/` with the fan-out record, the walkthrough and its
screenshots.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-018; read `node
   scripts/harness.mjs usage <session>` and record the subagent remainder;
   record in the decisions file the operator's ruling of 2026-10-26 that the
   run's toy designs and the works they reference lie outside the clean room
   (WS-001 rule 23; capture SHA-256 `9ec78ddb…`), the warrant for carrying
   `toys.jsonl` and the design anchors as data.
2. `map-row-v0.schema.json` (with `maxim`), `toy-v0.schema.json`, `toys.ts`;
   `tools/scripts/catalog/check-map.mjs` (wired into `check:fixtures`) and
   `check-toys.mjs` with `npm run toys:check`; negative fixtures (a map row
   without a definition; a toy naming an unknown tool id) under
   `tools/lint-fixtures/catalog/`. Check: `npm run test:tooling` exits 0.
3. Fetch the public-domain text once into the session scratch and record
   its source and SHA-256 in the evidence README; write the mapper brief
   (the schema, the maxim rule, the chapter split) into
   `docs/evidence/WO-018/fan-out.md`. Check: the brief names no absolute
   path.
4. Dispatch two mappers (chapters 1 to 6 and 7 to 13) and the map critic;
   rewrite the sampled rows the critic names; merge into
   `src/maps/map-artofwar.json`. Check: `node tools/scripts/catalog/check-map.mjs`
   exits 0 and the row count and the critic's sample are recorded in the
   evidence README.
5. Dispatch one classifier with WO-014's brief over the new map; merge
   `tools-artofwar.json`; run the join over the in-repo map. Check: `npm run
   catalog:check` exits 0 and `npm run catalog:report` lists The Art of War
   with its typed tools and the maxims carried.
6. Write the toy designers' brief into `fan-out.md`; dispatch the six
   designers; merge their toy records and tool files. Check: `npm run
   toys:check` exits 0 over the six records.
7. Dispatch the synthesizer and the critic; dispose findings in the
   decisions file; write `toys-summary.json`. Check: the evidence README
   lists at most twelve workers with their statements and, beside each, the
   launchpad's own observation: the session's harness journal under
   `docs/control/local/harness/` searched for the quarantine directory's
   name, with the row count found (zero expected) or `unobserved` where the
   harness kept no journal rows for that worker.
8. The run's nineteen toys in full in `toys.json` from `toys.jsonl` and the
   design anchors (origin `run-2026-10-22`), The Twenty and the patience
   lane marked built with their routes. Check: `npm run toys:check` exits 0
   over 25 records and a spec asserts the two built toys link to
   `BasePaths.Scene` and `BasePaths.Twin`.
9. `ChildPaths.Toys` and `ChildPaths.Toy`, `toys-page`, `toy-page`, the
   facets, the Tools home item, `tools.toys.*` i18n keys, stories `Shelf`
   (the selected form), `ToyBuilt`, `ToyDesigned`, and one story per shelf
   candidate while its round is open. Check: `npx nx test tools` exits 0;
   `npm run i18n:check` and `npm run lint:components` exit 0.
10. e2e `apps/dotln-e2e/src/toys.spec.ts`: `/tools/toys` lists 25 toys; a
    filter by source narrows to one; The Twenty's page shows its question
    and what you would see and links a tool into `/tools/catalog` and its
    status into `/scene`; a new toy's page shows its question and its typed
    tools; axe; no overflow at 360, 768 and 1440. Check: `npx nx e2e
    dotln-e2e` exits 0.
11. The walkthrough: the executor performs the Objective's session in the
    served production build, saves one screenshot per step at 360, 768 and
    1440 under `docs/evidence/WO-018/walkthrough/` and writes
    `docs/evidence/WO-018/walkthrough.md` with the dated steps and, for three
    toys, what each would show in the executor's words; the verifier
    repeats the session independently for criterion 1. Check: the files
    exist.
12. Documents: the two sections and the rules. Check: files carry the new
    headings.
13. Dependency check as WO-015 step 15; gate plain and review. Check: prints
    nothing; passing rows, no tracked-byte mutation.
14. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the first app-owned map and the toy shelf; WS-001's
    delivery states updated by the final review. Check: `npm run test:docs`.
    Then the publish, review and records steps as WO-007 steps 15 to 17,
    with the branch `feat/art-of-war-and-toys`, the title `feat: map The Art
    of War and add the toy shelf`, `docs/evidence/WO-018/` and
    `docs/final-reviews/WO-018/`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run check:fixtures`,
`npm run catalog:check`, `npm run toys:check`, `npm run test:tooling`,
`npm run i18n:check`, `npx nx e2e dotln-e2e`; in the launchpad order
worktree `npm run test:docs`; then the target gate plain and review once
each.

**Acceptance criteria (all required)**

1. **Use (WS-001 rule 24).** The verifier performs the Objective's session
   in the served production build: open Tools, Toys; open The Twenty and
   follow a tool into the catalog and its status into the scene; open The
   patience lane; open the Meadows toy; filter to one source and to
   designed toys; open The Art of War on the catalog's shelf and read a
   maxim's row. The VER report carries a `## Walkthrough` section with the
   dated steps and names the screenshots at 360, 768 and 1440 under
   `docs/evidence/WO-018/walkthrough/` (`ls docs/evidence/WO-018/walkthrough | wc -l`
   prints at least 12), and states in the verifier's own words what each of
   the three opened toys would show. The criterion is met only when every
   step completed and that statement is present.
2. `node tools/scripts/catalog/check-map.mjs` exits 0 over
   `libs/shared/catalog/src/maps/map-artofwar.json`: every row has `id`,
   `work`, `chapter`, `section`, `concept`, `type`, `definition`, `related`,
   `hooks` and `verified`, thirteen chapters are present, at least one row
   per chapter carries a `maxim`, `npm run check:fixtures` runs the map
   check (its output names `check-map`), and the evidence README records the
   public text's source and SHA-256 and the critic's sampled row count.
3. `npm run catalog:check` exits 0 with `tools-artofwar.json` present and
   every one of its rows carrying a definition, and `npm run catalog:report`
   lists `artofwar` with a scene type and at least three tools whose
   transform kinds are members of `TransformKind`.
4. `npm run toys:check` exits 0 over `toys.json` with 25 records: 19 with
   `origin: 'run-2026-10-22'` each carrying `purpose`, `question`,
   `youWouldSee`, `evidence`, `sources` and `tools` (a spec asserts no
   empty field among them), and 6 with `origin: 'this-app'` (one each for
   `meadows`, `pirsig`, `poincare`, `gladwell`, `taleb`, `fives`) carrying a
   scene type, a question, a metric and at least one tool id that exists in
   the catalog; every `public-work` tool carries a `definition` and a
   `source` string naming its work and chapter or concept; a tooling test
   proves a toy naming an unknown tool id fails the check.
5. `docs/evidence/WO-018/README.md` lists at most twelve workers across the
   two fan-outs with their labels and one-line statements, each saying no
   quarantine file was read, with the launchpad's read observation beside
   each (the harness journal's row count for the quarantine path, or
   `unobserved`), records each worker's token total and the session's own
   beside WO-014's recorded order total with the decision that stopped the
   fan-out if their sum passed it, and records the subagent count from
   `node scripts/harness.mjs usage <session>` at handoff.
6. `npx nx e2e dotln-e2e` exits 0 and includes the step 10 cases, axe at the
   board spec's threshold and no horizontal overflow at 360, 768 and 1440;
   `grep -rlE "<dl|dotln-key-value-list" libs/features/tools/src` prints
   nothing; `npx nx build dotln --configuration=production` exits 0 within
   the declared budgets with the shelf and the toy page in the lazy Tools
   chunks, and the evidence README records each catalog and toys chunk's
   size beside WO-019's figures.
7. `docs/dev-reference/architecture/catalog.md` carries the headings
   `Mining a new work` and `Toys`, and `docs/ai-reference/catalog-rules.md`
   states that a map row may carry the public text's maxim and that a toy
   enters with its full design (`grep -c "full design"
   docs/ai-reference/catalog-rules.md` is at least 1); `package.json`'s
   `dependencies` keys equal the base's.
8. `node scripts/target-gate.mjs WO-018 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs,
`docs/evidence/WO-018/README.md`, `docs/evidence/WO-018/fan-out.md`,
`docs/evidence/WO-018/walkthrough.md` and its screenshots, and
`docs/evidence/WO-018/host-qualification.md`.

**Known issues and carry-ins:** The base line is provisional and publishes
right under starter v0.96.1 (the merge-base publish of core WO-230); a pass
may set it to the predecessor's merge commit. The six new toys are designed,
not built; building one is a later member the operator picks from the shelf
(candidate C5). The commander-and-squad scene the tactics serve is a later
toy. A transform kind the enum lacks stays `untyped` with the proposal in
its reason until a decision grows the enum. The maxims of a public-domain
text are carried verbatim; a later map of a work still in copyright carries
the mapper's definition and no passage, an ordinary publishing matter the
order that maps it decides, not a clean-room one. Starter v0.96.1's plan
gate no longer advises on this order's own launchpad record paths; they
stay as the kit names them and the publish command's body file must not
name them. From receipts 008 and 009, kept in this text: the map lives in
its own directory under its own check; the toy-source tools carry
`provenance: 'public-work'` with `map: null` and the mapped-rows count rule
does not count them; the map check runs inside `check:fixtures`; a worker's
no-quarantine statement is self-attested and the fan-out record puts the
launchpad's own read observation beside it. From receipt 010: the overlap
window (its item (a)) is moot with the check; the toy-source tools now
carry definitions (its item (b)); "store" means the committed data here and
the deferred mining store in candidate C1, and the `v1` summary admits an
in-repo map (its item (c)); the commands and checks this horizon adds are
recorded against the orders' own rows (its item (d)). From receipt 011 (the
2026-10-26 pass's refutation), carried into this text by the 2026-10-28
pass: the fan-out's token ceiling is WO-014's recorded order total, with a
decision at the stop (the fan-out bullet, criterion 5); the operator's
ruling on the run's designs is recorded at activation (step 1); the
production build within the declared budgets is criterion 6's; "store" has
three meanings here, the committed data the app ships (this order's rows),
the mining store that stays candidate C1 of 2026-10-24, and the Tools
feature's SignalStores; the shelf's form is chosen through the rounds of
rule 25 as revised on 2026-10-28. This order activates
only on a launchpad whose starter carries core WO-221's `--draft` form; the
draft pull request and its workflow runs are a final-review obligation read
from `docs/evidence/WO-018/preview-pr.json`, never a criterion. `Target
release classification: minor` and `Target release notes: reviewed` were
set by the 2026-10-24 pass under WO-012's declared policy.

**Non-goals:** building any of the six toys; the commander scene; mining
Gladwell book by book or any further work; a live agent; the graduation
route's issue export (candidate C4).

**Operator-review assumptions:** the operator accepts the Giles translation
as the public text and its maxims carried verbatim, accepts the run's toy
rows as the shelf's records, and reads the one draft pull request before
final review, which the final publish reuses.
