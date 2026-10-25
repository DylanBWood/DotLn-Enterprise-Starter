# WO-015 — The soldier scene: twenty units on a 2D canvas behind a renderer seam, a toolbox rail fed by the catalog, real-time-strategy selection, flock, arrive and a two-level formation with slot roles, a deterministic seeded clock, before-and-after trials, and the pure scene engine every later scene reuses

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `libs/shared/scene-engine` (pure TypeScript), the `scene`
feature's page, layout, rail, inspector, text layer, canvas wrapper, log,
trial compare, facade, store, clock and tokens, four fixtures, the scene
fixture check, two documents, one taxonomy sentence, about 70 source files;
adds no runtime dependency. Removes the arriving page WO-013 shipped for
`/scene`. Wall-clock: about 8 to 12 hours of executor work plus the fixed
cycle; unknown until run. Context bytes: WS-001 house rules 1, 5, 12, 14, 18
and §The app and its sub-apps, design B §1 to §4 read at the run's folder,
the catalog types, this order, about 180 KB. Commands added in the target:
none. Tokens: unknown until run. Steps: 16. Re-mints: none. Refutations paid:
one (the 2026-10-24 pass's receipt on this text).
**Nomination provenance:** the operator's decisions of 2026-10-24 (ignored
intake capture `docs/intake/notes/planning-2026-10-24.md`, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9):
the soldier scene is a sub-app in its own right, twenty units, a tool rail
from the catalog, RTS selection, flock, arrive, formation, 2D first behind a
renderer seam with Babylon.js later; the baby example the operator gave on
2026-10-22. Design file this order builds from, read at the run's folder on
this machine (core's ignored intake, read-only; the digest pins what was
read): `out/angular/design-toolbox-toy-scene.md` §1 (the 2D canvas decision
and the clock), §2 (selection, equip, clarify, trial, compositions), §3 T1
and §4 (the first buildable slice), §5 (the shared substrate); SHA-256
`aab22ca10a41fa873c78e36e076a411b273a3bac49536e21e1b4949ba0f25253`; with
`out/process/toolbox-toy-scene-capture.md` (SHA-256
`7cc9b2c088d4efd00d813303fa291fd725a7e56915fd2e9e8ec3154bb679f67f`). Nothing
from the run is copied here beyond ids, short titles and generic terms.
Planner-synthesized by the 2026-10-24 planning pass
([planning document](../planning/mining-run-orders-2026-10-24.md) §6 D7 and
§9). Opaque identifier, not a priority. Amended by the 2026-10-24 second pass
([planning document](../planning/standard-pass-v0-96-1-2026-10-24.md) §6 D4): the interpreter's refusal of an
uninterpreted kind, the rail's selection by recorded ids and the summary's
works, the clock's virtual driver as this order's own, the base clause and
receipt 008's known issues. Amended by the 2026-10-25 pass
([planning document](../planning/standard-pass-v0-99-0-2026-10-25.md) §6 D4): receipt 009's known issues (the
canvas search beyond the tag, the first-scene floor, the refused step's
unchanged frame and clock, the stored value that no longer parses).
**Depends on:** WO-014 merged (hard: the `Tool` types, the closed transform
enum, the catalog's typed tools and the first three per work the rail
lists; the base above is provisional: since starter v0.96.1 (core WO-230) the target publish describes the change from the merge base of the subject and the target's `main` and names the activation base beside it, so activation on this base publishes right; the planning pass that runs after WO-014 merges may set it to that merge commit, and none is required to (the 2026-10-24 second pass, D4)).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-014",
    "relation": "hard",
    "reason": "the Tool types, the transform enum and the catalog the rail and the engine's interpreter read; the base line is provisional and publishes right under starter v0.96.1's merge-base publish"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 1, 5, 8, 10, 12, 14, 15, 18; §Design: the Tipping Point
taxonomy, the wrapper sentence on browser drawing APIs; §The app and its
sub-apps); `docs/repositories/dotln-angular.md`; `docs/operator/README.md`;
the target's `docs/ai-reference/*`, `docs/dev-reference/architecture/
component-taxonomy.md` and `catalog.md`; `libs/shared/models/src/lib/toolbox.ts`
at the base; design B at the sections named above.

**Objective:** at `/scene` the operator sees twenty units idling on a plain
field, each labelled with a lifecycle role; selects units as in a real-time
strategy game (click, shift-click, marquee, double-click for a squad, Escape
to clear, and the keyboard through the text layer); picks a tool from a rail
fed by the catalog (the first scene's movement and formation tools, the
typed rows the decisions file names by id at activation, about ten in design
B's first slice, plus the catalog's first three tools for each work the
summary lists, untyped ones shown as a special case with a clarify
affordance); reads its five faces and parameters
and sees the computed effect as ghost arrows before applying; applies flock,
arrive and a wedge, line or column formation with slot roles assigned from a
cost table; watches cohesion radius, collisions, heading variance, time to
objective and stalled units change in real time; compares the branch before
and after an equip with the first divergence marked; saves compositions that
survive a reload; and nothing leaves the browser. The same seed and the same
steps reproduce the same frames; under reduced motion the field is still
until Step or Play; the canvas is a projection of a frame the text layer also
renders, and the renderer sits behind one interface so a 3D painter can
replace it later without touching the engine.

**Observed gap (dated 2026-10-24; restated by the pass that sets the base):**
`/scene` renders WO-013's arriving page; no engine, canvas, clock or scene
feature exists; the workspace has no canvas, chart or 3D dependency and its
unit tests run under jsdom, which has no 2D context; WO-014's catalog types
the first scene's tools (`aifg-a:131`, `112`, `118`, `145`, `144`, `125`,
`104`, `149`, `177` to `179`, `184`, `186`, `187`, `174`) with the transform
kinds `steer.blend`, `steer.priority`, `formation.twoLevel`,
`formation.fixed` and `objective.set`; WO-007's `withPersistedState` is the
single write path to browser storage; the operator has decided 2D first and
determinism as evidence.

**Design:**

- **Engine** (`libs/shared/scene-engine`, `scope:shared`, `type:util`,
  `@dotln-angular/scene-engine` and `/testing`; pure TypeScript, no Angular,
  no DOM): vectors and kinematics; steering (seek, arrive with slow and
  target radii, separation with linear or inverse-square falloff, velocity
  matching, wander on a seeded generator); weighted blending clipped to the
  unit's maximum acceleration; priority steering (the avoidance group first,
  silent when nothing fires); two-level formation (an anchor steered as a
  unit and moderated toward the members' mean, slots from a pattern,
  members arriving at their slots) with patterns wedge, line and column and
  a greedy most-constrained-first slot assignment over a cost table by role;
  fixed formation as the contrast; a fixed-step clock (1/60 s simulated per
  tick); `SceneFrame`; the transform interpreter (a `CompositionStep` with a
  `TransformKind` from the catalog becomes a behaviour on the selected
  units; a step whose kind this engine does not interpret, nine of the
  fourteen kinds at this order, is refused with a reason naming the kind,
  and the inspector shows that refusal on Apply instead of applying nothing
  silently); metrics (cohesion radius, collisions, heading variance, time to
  objective, stalled units, anchor-to-mean distance, slot error, assignment
  cost); frame hash; first divergence between two branches. Its own types
  (`SceneDefinition`, `Unit`, `UnitState`, `SceneFrame`, `CompositionStep`,
  `Trial`) and nothing from `models`, so it stays `type:util`.
- **Renderer seam.** `SceneRenderer` (`draw(frame, selection, ghost?)`,
  `resize`, `dispose`) with `CanvasSceneRenderer` (one `draw` per animation
  frame on a 2D context; no retained DOM per unit), `TextSceneRenderer` (the
  DOM text layer the specs, Storybook and axe assert on) and
  `NullSceneRenderer` (tests). The engine emits a frame; the painters render
  it. A WebGL or Babylon.js painter later implements the same interface
  behind a dependency decision (candidate C2 of the 2026-10-24 planning
  document).
- **Feature** (`libs/features/scene`, replacing the arriving page): `scene-page`
  (container) over `SceneFacade`; `scene-layout` (slots canvas, rail,
  inspector, metrics, transport; fluid); composites `toolbox-rail` (tools
  from the catalog: the first-scene tools by the ids the decisions file names
  and `firstThree(work)` for each work `catalog-summary.json` lists; filters
  by work and kind; an untyped tool is a special case
  with its reason and an Ask button), `unit-inspector` (the five faces, the
  parameters with defaults, the preview rows, Apply, Ask), `metric-strip`
  (label, value, unit; `unknown` admitted), `unit-list` (the text layer: one
  row per unit with id, role label, position and speed buckets, state,
  selected; Space toggles), `tool-log`, `trial-compare` (two series per metric
  as inline SVG); wrapper `scene-canvas` (owns the `<canvas>` and the
  painter; pointer events emit `select`, `marquee`, `pointAt`; honours
  reduced motion); mappers `frame-mapper`, `tool-mapper` (catalog `Tool` to
  the engine's behaviour), `metric-mapper`. `SceneFacade` holds signals for
  scene, selection, tools, selected tool, branch, trial, playing and frame
  number and exposes `select`, `toggle`, `marquee`, `setObjective`,
  `chooseTool`, `preview`, `equip`, `play`, `pause`, `step`, `fork`,
  `compare`, `save`, `exportJson`, `importJson`, `ask`. The frame loop is an
  RxJS stream on the clock folded into frames, painted directly, and sampled
  into signals at the animation frame or slower, so zoneless change
  detection runs at most once per frame.
- **Store and clock.** `SceneStore` (`libs/features/scene-data-access`,
  `type:data-access`): a SignalStore whose live frame state is in memory
  and whose saved compositions and clarify notes persist through WO-007's
  `withPersistedState({ key: 'scene', select })` under `dotln-angular.scene`;
  JSON export and import. A stored value under that key that fails to parse
  or to validate against the composition schema is ignored, the idle field
  renders and the tool log notes it; it is never thrown and never rewritten
  until the operator saves. `SceneClock` with three drivers: animation frame,
  manual `tick(n)` (specs and reduced motion), and RxJS virtual time (this
  order's own driver; WO-016's replay clock lands later over a generic
  `{ recordedAt }` shape and may adopt it, so nothing here waits on it).
- **Selection** shown twice, as rings on the canvas and as checked rows in
  the text layer; the unit's role label is what a person reads and its id is
  the DOM and test identity.
- **Determinism** by default: a seed shown in the transport; `feel` is a
  toggle that reseeds every run and is labelled as such; a trial compares two
  branches from one seed over the same frames and marks the first divergence.
- **Unit labels:** the lifecycle roles (8 executor, 4 verifier, 3 reviewer,
  2 repairer, 1 planner, 1 refuter, 1 release-close) as the fixture's
  default, with the board's five UIFA roles as a second label set the
  operator can switch; the label is a label, the behaviours come from the
  toolbox.
- **Clarify:** an untyped tool or a parameter without a default opens the
  clarify panel: the question is the operator's typed note, the answer comes
  from `clarifications.json` when one matches or from the operator's own note,
  and unanswered requests export as JSON; no live agent.
- **Fixtures** (`libs/features/scene/src/testing/fixtures/`): `scene-twenty.json`,
  `cost-table.json`, `trial-known-outcome.json` (expected metric series and
  frame hashes, generated once by the engine's spec and committed),
  `clarifications.json` (two entries); `tools/scripts/check-scene-fixtures.mjs`
  (Ajv against `scene-v0.schema.json` plus `assertScrubbed`) wired into
  `check:fixtures`.
- **Taxonomy:** a wrapper may own a browser drawing API such as `<canvas>`
  (the pass wrote the sentence into WS-001; this order adds it to
  `component-taxonomy.md`); the lint's wrapper rules admit `ElementRef`
  already.
- **Documents:** `docs/dev-reference/architecture/scene.md` (the engine, the
  seam, the clock, the loop's coalescing rule, determinism, how a tool
  becomes a behaviour) and `docs/ai-reference/scene-rules.md` (the engine
  imports nothing from Angular or the DOM; one signal write per frame at
  most; the text layer is the accessibility surface; a tool without a typed
  transform never executes; nothing leaves the browser).

Rejected: WebGL or Babylon.js now (axis: the operator's decision, 2D first
with the painter behind a seam; a dependency decision is the operator's);
SVG for the field (axis: the later heat layer draws hundreds of cells per
frame, and canvas draws it as one image); a behaviour per role (axis: the
behaviours come from the toolbox, the label is a label); randomness by
default (axis: determinism makes the known outcome and the first divergence
checkable); the engine inside the feature (axis: every later scene reuses
it, and `type:util` keeps it free of Angular).

Live-run surfaces at the base: WO-006's served production build and
Storybook; WO-007's MSW worker; WO-013's menu; WO-014's catalog browser.

**Deliverables:** the engine with its specs and kit; the scene feature and
its data-access library with kits; the renderer seam and three painters; the
four fixtures and their check; the taxonomy sentence; the two documents;
`docs/evidence/WO-015/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-015.
2. Generate `libs/shared/scene-engine` (`scope:shared,type:util`) and
   `libs/features/scene-data-access` (`scope:dotln,type:data-access`) with
   logged commands and testing entry points. Check: `npx nx show projects`
   lists both.
3. Engine: vectors, kinematics, steering, blending, priority, formation,
   slot assignment, clock, frame, interpreter, metrics, hash, divergence;
   specs for each known input (arrive stops inside the target radius;
   blending clips; priority is silent with nothing to avoid; the anchor
   stays within a bound of the members' mean; greedy assignment equals the
   hand-computed table; determinism over 600 frames; the interpreter refuses
   an uninterpreted kind with a reason naming it and leaves the next frame
   hash and the clock's tick count equal to a run without that step). Check: `npx nx test
   scene-engine` exits 0.
4. `SceneRenderer`, `CanvasSceneRenderer`, `TextSceneRenderer`,
   `NullSceneRenderer`; `SceneClock` with the three drivers. Check: `npx nx
   test scene` exits 0 with the clock's manual and virtual drivers.
5. Fixtures and `check-scene-fixtures.mjs`; `trial-known-outcome.json`
   generated once by the engine spec. Check: `npm run check:fixtures` exits 0.
6. `SceneStore` with `withPersistedState` for compositions and notes;
   `tool-mapper` from catalog `Tool` to behaviour. Check: `npx nx test
   scene-data-access` exits 0 including the persisted-state spec over a fake
   storage asserting the `dotln-angular.scene` key and no other write.
7. Composites, the wrapper, mappers, layout, container, facade; stories
   `Twenty`, `ReducedMotion`, `UntypedTool`. Check: `npx nx test scene` exits
   0; `npm run lint:components` exits 0.
8. The rail reads the catalog (`firstThree` for each work the summary lists
   and the first-scene tools by the ids the decisions file names at
   activation, a list whose floor is one tool each for flock, arrive and the
   wedge, line and column formations); the inspector's preview arrows; equip appends a step. Check:
   a facade spec applies flock to twelve units and the cohesion metric falls.
9. RTS selection on the canvas and the text layer. Check: specs for click,
   shift-click, marquee, double-click, Escape and Space.
10. Trials: fork, compare, first divergence; export and import. Check: the
    facade spec's export-then-import yields equal state.
11. Replace the arriving page in `sceneRoutes`; `scene.*` i18n keys;
    `component-taxonomy.md` gains the wrapper sentence. Check: `npm run
    i18n:check` exits 0; `npx nx build dotln --configuration=production`
    exits 0.
12. e2e `apps/dotln-e2e/src/scene.spec.ts`: twenty rows in the text layer;
    Step advances the frame counter under reduced motion; the rail lists the
    first-scene tools the decisions file names (flock, arrive, wedge, line
    and column at least) and three per work the summary lists; a marquee selects at least two
    units and Escape clears; equip Flock changes the cohesion metric's text;
    a saved composition survives a reload; axe at the board spec's threshold;
    no horizontal overflow at 360, 768 and 1440; the root still redirects to
    `/board`. Check: `npx nx e2e dotln-e2e` exits 0.
13. Documents: `scene.md`, `scene-rules.md`, pointers, `conventions.md`.
    Check: files exist.
14. Dependency check: `node -e` compares `package.json` `dependencies` keys
    with the base's and prints nothing when equal. Check: prints nothing.
15. Gate plain and review. Check: passing rows, no tracked-byte mutation.
16. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the engine, the wrapper and the seam; WS-001's
    delivery states updated by the final review. Check: `npm run test:docs`.
    Then the publish, review and records steps as WO-007 steps 15 to 17,
    with the branch `feat/soldier-scene`, the title `feat: add the soldier
    scene with flock, arrive and formation`, `docs/evidence/WO-015/` and
    `docs/final-reviews/WO-015/`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run check:fixtures`,
`npm run catalog:check`, `npm run i18n:check`, `npx nx e2e dotln-e2e`; in the
launchpad order worktree `npm run test:docs`; then the target gate plain and
review once each.

**Acceptance criteria (all required)**

1. `grep -rlE "@angular|document\.|window\." libs/shared/scene-engine/src --include='*.ts' | grep -v spec`
   prints nothing, and `npx nx test scene-engine` exits 0 with specs that
   two runs from one seed and one step list produce identical frame hashes
   over 600 frames, that flock with the separation weight at zero yields
   collisions greater than zero within 600 frames while the default weights
   reach and keep zero after settling, that greedy slot assignment equals
   the committed hand-computed table, that the first divergence between a
   branch before and after an equip is the equip frame plus one, and that
   the interpreter refuses a step whose kind it does not interpret with a
   reason naming the kind while the next frame's hash and the clock's tick
   count equal those of a run without that step.
2. `libs/features/scene/src/lib/wrappers/scene-canvas/` owns the only
   `<canvas>` in the feature (`grep -rl "<canvas" libs/features/scene/src`
   prints exactly that component's file, and
   `grep -rlE "createElement\(['\"]canvas|OffscreenCanvas|getContext\(" libs/features/scene/src --include='*.ts' | grep -v spec | grep -v wrappers/scene-canvas/`
   prints nothing), `SceneRenderer` has `Canvas`,
   `Text` and `Null` implementations, and the feature's specs run with the
   null renderer under jsdom (`npx nx test scene` exits 0).
3. The facade's frame loop writes signals at most once per animation frame
   (a spec with the manual clock ticks 60 times and asserts at most one
   `vm` change per driver frame).
4. `npx nx e2e dotln-e2e` exits 0 and includes: twenty rows in the text
   layer; Step advancing the frame counter under `reducedMotion: 'reduce'`;
   the rail listing every first-scene tool the decisions file names, a list
   whose floor is one tool each for flock, arrive and the wedge, line and
   column formations, and three tools for each work `catalog-summary.json`
   lists; a marquee
   selecting at least two units and Escape clearing
   the selection; equip Flock changing the cohesion metric's text; a saved
   composition present after a reload; axe at the board spec's threshold;
   no horizontal overflow at 360, 768 and 1440; the root redirecting to
   `/board`.
5. The persisted-state spec asserts every key written starts with
   `dotln-angular.scene` and no other storage, cookie or network write
   occurs, and a second spec seeds that key with a value that does not parse
   and with one of an older shape and asserts that the facade yields the
   idle twenty units; `grep -rlE "from 'node:|from \"node:|require\(" libs/shared/scene-engine/src libs/features/scene/src libs/features/scene-data-access/src --include='*.ts' | grep -v spec`
   prints nothing.
6. `package.json`'s `dependencies` keys equal the base's (the step 14
   command prints nothing), and `npx nx build dotln --configuration=production`
   exits 0 within the declared budgets.
7. `docs/dev-reference/architecture/component-taxonomy.md` carries the
   sentence admitting a wrapper that owns a browser drawing API
   (`grep -c "drawing API" docs/dev-reference/architecture/component-taxonomy.md`
   is at least 1); `docs/dev-reference/architecture/scene.md` and
   `docs/ai-reference/scene-rules.md` exist.
8. `node scripts/target-gate.mjs WO-015 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs,
`docs/evidence/WO-015/README.md` and
`docs/evidence/WO-015/host-qualification.md`.

**Known issues and carry-ins:** The base line is provisional and publishes right under starter v0.96.1 (the merge-base publish of core WO-230; WO-013's fix dispatch is its first use in this fork); a pass may set it to the predecessor's merge commit. The catalog's first-scene tools are typed by WO-014's
classifiers; if a needed tool arrives `untyped`, this order types it with a
recorded decision rather than failing on the rail. The Babylon.js painter,
the second populations (DotLn's agents as units) and the pathfinding, heat
and commander toys of design B are later members (candidates C2 and C5 of the
2026-10-24 planning document). Starter v0.96.1's plan gate no longer advises on this order's own launchpad record paths (core's answer of 2026-10-24, item 1); they stay as the kit names them and the publish command's body file must not name them. From receipt 008 (the
2026-10-24 pass's refutation), carried into this text by the 2026-10-24
second pass: a step whose transform kind the engine does not interpret is
refused visibly with its reason (the engine, step 3 and criterion 1); the
virtual-time driver is this order's own and WO-016's replay may adopt it;
and the rail selects the first-scene tools by the ids the decisions file
names at activation from the catalog's typed rows (the observed gap lists
fifteen candidate ids and design B's first slice names ten, and map lines may
move), with the works read from the summary so a later work changes the
rail without a text change here. From receipt 009 (the second 2026-10-24
pass's refutation), carried into this text by the 2026-10-25 pass: the
canvas search covers `createElement`, `OffscreenCanvas` and `getContext`
outside the wrapper (criterion 2); the first-scene list has a floor (step
8, step 12, criterion 4); a refused step leaves the frame hash and the clock
unchanged (step 3, criterion 1); a stored value that fails to parse yields
the idle field (the store, criterion 5). This order activates only on a launchpad whose
starter carries core WO-221's `--draft` form; the draft pull request and its
workflow runs are a final-review obligation read from
`docs/evidence/WO-015/preview-pr.json`, never a criterion. `Target release
classification: minor` and `Target release notes: reviewed` were set by the
2026-10-24 pass under WO-012's declared policy.

**Non-goals:** 3D or any rendering dependency; pathfinding, obstacles, a
commander, channels, an influence map; a live agent for clarify;
persistence beyond compositions and notes; any read of the platform or any
write outside the browser; a DotLn analog claim from a flock.

**Operator-review assumptions:** the operator accepts the lifecycle roles as
the default unit labels with the UIFA set as a switch, determinism as the
default, and reads the one draft pull request before final review, which
the final publish reuses.
