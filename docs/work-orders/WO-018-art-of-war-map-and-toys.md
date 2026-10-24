# WO-018 — The first public mining into the app's own store: The Art of War mapped from its public-domain text into catalog rows and typed into tools through the catalog pipeline, and toys designed as catalog records for the six mined sources that have none (Meadows, Pirsig, Poincaré, Gladwell, Taleb and the 5S set), with the toy shelf that lists every toy the app knows

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `map-artofwar.json` and `tools-artofwar.json` to the catalog
data, `toy-v0.schema.json` and `toys.ts` to the models, `toys.json` (the six
new toy records and the ids and short titles of the run's nineteen), the
toy-source tool files, the toy shelf page under Tools, the map and toy checks,
two documents, about 30 source files plus about 300 data rows; adds no
runtime dependency. Removes nothing. Wall-clock: about 4 to 6 hours of
executor work, of which two fan-outs run in parallel, plus the fixed cycle;
unknown until run. Context bytes: WS-001 §The app and its sub-apps, the
catalog rules, the maps README and design B §3 read at the run's folder,
this order, about 120 KB for the executor; the mappers read one public-domain
text. Commands added in the target: `npm run catalog:check` already covers
the new files; `npm run toys:check`. Tokens: unknown until run; recorded per
worker. Steps: 14. Re-mints: none. Refutations paid: one (the 2026-10-24
pass's receipt on this text).
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
`out/angular/toys.jsonl` (the nineteen toy ids and titles; SHA-256
`411e486e086218e9988e26c2f290dd302115518b3c049279fef3793e3efea0fb`). Nothing
from the run is copied here beyond ids, short titles and generic terms; the
quarantine files are never opened. Planner-synthesized by the 2026-10-24
planning pass ([planning document](../planning/mining-run-orders-2026-10-24.md)
§6 D10 and §9). Opaque identifier, not a priority.
**Depends on:** WO-014 merged (hard: the `Tool` schema, the catalog data
layout, the allow-list check, the merge script and the classifier brief this
order reuses); WO-017 merged (hard: the member before this one in the
sequence, whose merge commit becomes this order's base; the base above is
provisional and is set by the planning pass that follows WO-017).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-014",
    "relation": "hard",
    "reason": "the Tool schema, the catalog layout, the allow-list check and the merge script this order's map pass and toy records reuse"
  },
  {
    "workOrderId": "WO-017",
    "relation": "hard",
    "reason": "the preceding member in the serial chain; its merge commit becomes this order's base before activation"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 3, 5, 10, 15; §The app and its sub-apps, the clean-room rule
and the public-mining rule); `docs/repositories/dotln-angular.md`;
`docs/operator/README.md`; `docs/control/budgets.json` (`subagentCap`); the
target's `docs/ai-reference/catalog-rules.md` and
`docs/dev-reference/architecture/catalog.md`; the maps README and design B §3
at the sections named above.

**Objective:** The Art of War enters the catalog the way every work does,
through its own map pass: concept rows in the maps' schema written in the
mappers' own words from the public-domain English text, committed as the
app's own data, then typed into tools with five faces by the catalog
pipeline's brief, so the commander-and-squad scene a later toy builds has
tactics to draw on; six toys exist as records in the app for the six mined
sources that had none, each naming its source, scene type, question, metric
and the tools it needs, with those tools typed into the catalog from public
knowledge of the works; and the toy shelf at `/tools/toys` lists every toy
the app knows, the run's nineteen by id, title and source and the six new
ones in full, so the operator can pick the next toy to build.

**Observed gap (dated 2026-10-24; restated by the pass that sets the base):**
The Art of War has no rows anywhere in the run and the run's commander toy
carries placeholders for it; Meadows, Pirsig, Poincaré, Gladwell, Taleb and
the 5S set were mined by the run but none of its nineteen toys draws on
them; the app has no toy record type and no shelf; the catalog's six works
and their tools exist since WO-014 and its allow-list check admits only ids,
short titles and generic terms. A public-domain English translation of The
Art of War is available from Project Gutenberg (the 1910 Lionel Giles
translation, ebook 132); the mappers read it once and commit no passage.

**Design:**

- **Map rows for a new work** (`libs/shared/catalog/src/data/map-artofwar.json`,
  schema `map-row-v0.schema.json`): `{ id: 'aow:<n>', work: 'artofwar',
  chapter, section, concept, type, definition, related: ToolId[], verified:
  '<chapter reference>' }` where `definition` is the mapper's own words, at
  most 240 characters, about the public-domain text and never a passage of
  it; thirteen chapters; the critic samples twenty rows against the text and
  returns the rows that misstate it, which the mapper rewrites. This is the
  first map the app owns: a work mined in public into the app's own store,
  the direction the operator gave; the run's maps stay in intake and only
  their typed tools came across in WO-014.
- **Typing** reuses WO-014's classifier brief and `merge-checkpoints.mjs`:
  one classifier over the map's rows writes `tools-artofwar.json`; the
  critic's sample covers the typed transforms as WO-014's checkers did.
- **Toy records** (`libs/shared/models/src/lib/toys.ts`, `toy-v0.schema.json`,
  `libs/shared/catalog/src/data/toys.json`): `Toy { id, source: WorkSlug,
  title, sceneType: SceneTypeId, tools: ToolId[], question, metric: MetricId[],
  faces: { selection: SelectionTarget; transform: TransformKind | 'untyped' },
  status: 'designed' | 'built' | 'graduated' | 'did-not-stick', origin:
  'run-2026-10-22' | 'this-app' }`; `title` at most 80 characters and
  `question` at most 160, in generic terms. The run's nineteen toys enter as
  `{ id, title, source, status: 'designed', origin: 'run-2026-10-22' }` with
  no question, tools or faces, because their designs stay in intake; the six
  new toys enter in full with `origin: 'this-app'`. `toys:check` validates
  the schema, the allow-list and that every tool id a toy names exists in
  the catalog.
- **The toy designers' fan-out** (eight workers: six designers, one per
  source, one synthesizer, one critic): each designer is given the toy
  pattern (a toy is a scene with units or stations, a selection, a transform
  from the closed enum or a proposal for one, an observable and a metric),
  the catalog's scene types and enums, public knowledge of its source work,
  the source's candidate ids from the run's probe listing (ids only, no
  prose; no quarantine file), and returns one toy record plus up to five
  tools for its source with five faces typed from public knowledge of the
  work (`tools-<source>.json`, `map: null`, `provenance: 'public-work'`); the
  synthesizer orders the six toys by what the operator can play with
  soonest on the scene engine and writes `toys-summary.json`; the critic
  reads the six records and returns findings the executor disposes. A
  transform kind the enum lacks is recorded as `untyped` with the proposed
  kind in its reason; the enum grows only by a decision (WO-014's rule).
  Together with the map pass (two mappers, one critic, one classifier) the
  order dispatches at most twelve workers, each a `dotln-worker` or
  `dotln-worker-fable` on the operator's dispatch, under the launchpad's
  `subagentCap`; `node scripts/harness.mjs usage <session>` is read before
  the first spawn and at handoff.
- **The toy shelf** (`libs/features/tools` gains `ChildPaths.Toys = 'toys'`
  and `toys-page` over `ToolsFacade`): one card per toy (title, source,
  scene type, status, the question when present, the tools it names as links
  into the catalog browser); filters by source and status; the Tools home
  lists Toys beside Catalog.
- **Documents:** `docs/dev-reference/architecture/catalog.md` gains §Mining
  a new work (the map schema, the public-text rule, the critic's sample, the
  typing pass) and §Toys (the record, the shelf, the status ladder);
  `docs/ai-reference/catalog-rules.md` gains the rules (a map row's
  definition is the mapper's own words and never a passage; a toy names its
  tools by id; the enum grows only by decision).

Rejected: committing the run's toy designs or its probe prose (axis: the
operator's clean-room rule; the designs stay in intake and the app carries
ids and short titles); mapping The Art of War from the run's placeholders
(axis: a work enters the catalog only through its own map pass); writing
the six toy designs as documents (axis: the record is the toy's design in
this app, and the shelf is where the operator reads it; a prose design would
be derived from intake); a single worker for both fan-outs (axis: the
checkpoint rule and the twelve-worker cap).

Live-run surfaces at the base: WO-006's served production build and
Storybook; the sub-apps of WO-013 to WO-017.

**Deliverables:** the map and tool files for The Art of War; the toy type,
schema and `toys.json`; the six sources' tool files; the toy shelf; the
checks and npm script; the two document sections; `docs/evidence/WO-018/`
with the fan-out record.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-018; read `node
   scripts/harness.mjs usage <session>` and record the subagent remainder.
2. `map-row-v0.schema.json`, `toy-v0.schema.json`, `toys.ts`;
   `tools/scripts/catalog/check-map.mjs` and `check-toys.mjs` with
   `npm run toys:check`; negative fixtures (a definition over 240
   characters; a toy naming an unknown tool id) under
   `tools/lint-fixtures/catalog/`. Check: `npm run test:tooling` exits 0.
3. Fetch the public-domain text once into the session scratch and record
   its source and SHA-256 in the evidence README; write the mapper brief
   (the schema, the own-words rule, the chapter split) into
   `docs/evidence/WO-018/fan-out.md`. Check: the brief names no absolute
   path.
4. Dispatch two mappers (chapters 1 to 6 and 7 to 13) and the map critic;
   rewrite the sampled rows the critic names; merge into
   `map-artofwar.json`. Check: `node tools/scripts/catalog/check-map.mjs`
   exits 0 and the row count is recorded.
5. Dispatch one classifier with WO-014's brief over the new map; merge
   `tools-artofwar.json`. Check: `npm run catalog:check` exits 0 and
   `npm run catalog:report` lists The Art of War with three typed tools.
6. Write the toy designers' brief into `fan-out.md`; dispatch the six
   designers; merge their toy records and tool files. Check: `npm run
   toys:check` exits 0 over the six records.
7. Dispatch the synthesizer and the critic; dispose findings in the
   decisions file; write `toys-summary.json`. Check: the evidence README
   lists at most twelve workers with their statements.
8. The run's nineteen toys as id-and-title records in `toys.json` (origin
   `run-2026-10-22`). Check: `npm run toys:check` exits 0 over 25 records.
9. `ChildPaths.Toys`, `toys-page`, the toy cards, filters, the Tools home
   item, `tools.toys.*` i18n keys, stories. Check: `npx nx test tools` exits
   0; `npm run i18n:check` exits 0.
10. e2e `apps/dotln-e2e/src/toys.spec.ts`: `/tools/toys` lists 25 toys; a
    filter by source narrows to one; a new toy's card shows its question and
    links its tools into the catalog browser; axe; no overflow. Check: `npx
    nx e2e dotln-e2e` exits 0.
11. Documents: the two sections and the rules. Check: files carry the new
    headings.
12. Dependency check as WO-015 step 14. Check: prints nothing.
13. Gate plain and review. Check: passing rows, no tracked-byte mutation.
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

1. `node tools/scripts/catalog/check-map.mjs` exits 0 over
   `map-artofwar.json`: every row has `id`, `work`, `chapter`, `section`,
   `concept`, `type`, `definition` (at most 240 characters), `related` and
   `verified`, thirteen chapters are present, and the evidence README
   records the public text's source and SHA-256 and the critic's sampled
   row count.
2. `npm run catalog:check` exits 0 with `tools-artofwar.json` present, and
   `npm run catalog:report` lists `artofwar` with a scene type and three
   tools whose transform kinds are members of `TransformKind`.
3. `npm run toys:check` exits 0 over `toys.json` with 25 records: 19 with
   `origin: 'run-2026-10-22'` carrying only `id`, `title`, `source` and
   `status`, and 6 with `origin: 'this-app'` (one each for `meadows`,
   `pirsig`, `poincare`, `gladwell`, `taleb`, `fives`) carrying a scene
   type, a question of at most 160 characters, a metric and at least one
   tool id that exists in the catalog; a tooling test proves a toy naming an
   unknown tool id fails the check.
4. `docs/evidence/WO-018/README.md` lists at most twelve workers across the
   two fan-outs with their labels and one-line statements, each saying no
   quarantine file was read, and records the subagent count from
   `node scripts/harness.mjs usage <session>` at handoff.
5. `npx nx e2e dotln-e2e` exits 0 and includes: `/tools/toys` listing 25
   toys; a filter by source narrowing to one; a new toy's card showing its
   question and linking a tool into `/tools/catalog`; axe at the board
   spec's threshold; no horizontal overflow at 360, 768 and 1440.
6. `docs/dev-reference/architecture/catalog.md` carries the headings
   `Mining a new work` and `Toys`, and `docs/ai-reference/catalog-rules.md`
   states that a map row's definition is the mapper's own words and never a
   passage (`grep -c "never a passage" docs/ai-reference/catalog-rules.md`
   is at least 1); `package.json`'s `dependencies` keys equal the base's.
7. `node scripts/target-gate.mjs WO-018 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs,
`docs/evidence/WO-018/README.md`, `docs/evidence/WO-018/fan-out.md` and
`docs/evidence/WO-018/host-qualification.md`.

**Known issues and carry-ins:** the base line is provisional until the pass
after WO-017 sets it. The six toys are designed, not built; building one is
a later member the operator picks from the shelf (candidate C5). The
commander-and-squad scene the tactics serve is a later toy. A transform kind
the enum lacks stays `untyped` with the proposal in its reason until a
decision grows the enum. The v0.94.0 advisory on launchpad record paths
applies as in WO-013. This order activates only on a launchpad whose starter
carries core WO-221's `--draft` form; the draft pull request and its
workflow runs are a final-review obligation read from
`docs/evidence/WO-018/preview-pr.json`, never a criterion. `Target release
classification: minor` and `Target release notes: reviewed` were set by the
2026-10-24 pass under WO-012's declared policy.

**Non-goals:** building any of the six toys; the commander scene; mining
Gladwell book by book or any further work; copying any passage of the text
or any prose from the run; a live agent.

**Operator-review assumptions:** the operator accepts the Giles translation as
the public text, accepts toy records as the form a designed toy takes in
this app, and reads the one draft pull request before final review, which
the final publish reuses.
