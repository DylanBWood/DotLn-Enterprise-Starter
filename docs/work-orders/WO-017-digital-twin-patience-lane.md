# WO-017 — The digital twin's first lane: the operator's patience after a hand-back as RxJS that runs on virtual time over the recorded WO-221, judged by the results of the order it would have run and never by agreement with the operator's beats, with every variant of the model kept as code and old versions never deleted

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `libs/shared/twin-model` (the variants as RxJS code, the
registry, the results fold), the `twin` feature's page, lanes, variant picker,
flips, result cell, facade and store, the derivation script and its fixture,
the variant registry check, two documents, about 55 source files; adds no
runtime dependency. Removes nothing. Wall-clock: about 6 to 9 hours of
executor work plus the fixed cycle; unknown until run. Context bytes: WS-001
§The app and its sub-apps and §The operator's model, design C §1.4, §2, §3,
C1 and §5.2 to §5.3 read at the run's folder, the records and replay
libraries, this order, about 170 KB. Commands added in the target:
`npm run twin:derive`, `npm run twin:check`. Tokens: unknown until run.
Steps: 15. Re-mints: none. Refutations paid: one (the 2026-10-24 pass's
receipt on this text).
**Nomination provenance:** the operator's decisions of 2026-10-24 (ignored
intake capture `docs/intake/notes/planning-2026-10-24.md`, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9):
the operator's model lives in the UI first as a personality-fidelity digital
twin with variations and old versions kept, nothing held back from it, judged
by results only, the RxJS that describes the operator being the RxJS that
runs; its first lane is the patience lane over WO-221, after re-deriving its
data (eight operator rows; the 87.8-minute gap followed a hand-back with no
verdict). Design file this order builds from, read at the run's folder on
this machine (core's ignored intake, read-only; the digest pins what was
read): `out/angular/design-operator-model-testbed.md` §1.4 (WO-221 re-counted),
§2 (the decision dataset's field set), §3 (the patience class, the stream
catalogue, the controls), C1 (the lane) and §5.2 to §5.3 (the replay loader
and virtual time in the browser); SHA-256
`22ee568897d2f3d92b3b7119e34981f49939db3eefb96d13ab9f142dc17197ef`. Nothing
from the run is copied here beyond ids, short titles and generic terms. The
design's fidelity cell (hits against the operator's recorded beats) is not
built: the operator decided the twin is judged by results, so this order
replaces that figure with the result fold below. Planner-synthesized by the
2026-10-24 planning pass ([planning document](../planning/mining-run-orders-2026-10-24.md)
§4, §6 D9 and §9). Opaque identifier, not a priority. Amended by the
2026-10-24 second pass ([planning document](../planning/standard-pass-v0-96-1-2026-10-24.md) §6 D3 and D4): the derived
fixture's name, the `routePermissions` entry and the signed-in e2e path, the
registry check's failure on an absent base, the base clause and receipt 008's
known issues. Amended by the 2026-10-25 pass ([planning document](../planning/standard-pass-v0-99-0-2026-10-25.md)
§6 D4): receipt 009's known issues (readiness defined, the registry check's
message on an absent base and the variants as lazy chunks, one tick contract
on the replay library).
**Depends on:** WO-016 merged (hard: the `records` fixture pack and fold, the
`replay` clock and the `/machinery` group this lane joins); WO-008 merged
(hard: the member before this one in the sequence; the base above is provisional: since starter v0.96.1 (core WO-230) the target publish describes the change from the merge base of the subject and the target's `main` and names the activation base beside it, so activation on this base publishes right; the planning pass that runs after WO-008 merges may set it to that merge commit, and none is required to (the 2026-10-24 second pass, D4)).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-016",
    "relation": "hard",
    "reason": "the records fixture pack, the concert fold and the replay clock this lane replays; the Machinery menu group it joins"
  },
  {
    "workOrderId": "WO-008",
    "relation": "hard",
    "reason": "the preceding member in the serial chain; the base line is provisional and publishes right under starter v0.96.1's merge-base publish"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 1, 7, 8, 10, 12, 15; §The app and its sub-apps; §The operator's
model); `docs/repositories/dotln-angular.md`; `docs/operator/README.md`; the
target's `docs/ai-reference/machinery-rules.md` and
`docs/dev-reference/architecture/machinery.md`; the `records` and `replay`
libraries at the base; design C at the sections named above; the planning
document's §4 tables for WO-221.

**Objective:** at `/twin` the operator sees WO-221 as one time axis with its
sixteen beats as glyphs, a recorded lane carrying the operator's eight beats
as reference marks, and a twin lane carrying where the chosen variant of the
twin's patience stream fires after each hand-back when the order is replayed
on virtual time; the result cell beside the lanes states what the order would
have cost under the twin: the virtual close time, the twin's total waiting
minutes and the number of times it fired before anything was ready, each next
to the recorded order's 1,110.3 minutes and the operator's 227.0 waiting
minutes; a variant picker lists every variant ever written with its version
and lineage, and a flip (a duration or a multiplier changed) redraws the twin
lane at once with a near-transparent ghost of the previous position and
recomputes the result cell; the operator saves a kept flip as a new variant
by exporting the TypeScript the UI generates, because the RxJS that describes
the operator is the RxJS that runs; the recorded lane never moves and no
agreement figure against it is computed or shown; WO-226 is the second order.

**Observed gap (dated 2026-10-24; restated by the pass that sets the base):**
the app has no model of the operator; WO-016 ships the field-reduced WO-221
and WO-226 copies, the fold and the replay clock but no stream that decides
when to dispatch; the re-derived WO-221 table (the 2026-10-24 planning
document §4): 16 rows, 8 operator rows (the activation, three verification
requests, two repair requests, two final-review requests), seven gaps after a
hand-back of 87.8 (after the implementation hand-back, no verdict), 109.9
(after the first verification's fail), 1.7, 1.4, 2.1 (after the first final
review's fail), 18.2 and 5.9 minutes, 227.0 waiting minutes in all, a span
of 1,110.3 minutes; the worker durations from each request to its completion
are in the same rows. Whether `VirtualTimeScheduler` or `TestScheduler` serves
a browser replay cleanly, and the default frame cap, were not verified by the
run; WO-016's replay clock takes a resolution parameter as the hedge. The
operator has decided: results only, variants kept, nothing held back.

**Design:**

- **The model as code** (`libs/shared/twin-model`, `scope:shared`,
  `type:util`, RxJS only, `@dotln-angular/twin-model` and `/testing`): a
  `TwinVariant { id, version, since, supersedes?, describe: (handBacks$,
  scheduler, params) => Observable<TwinDispatch>, params: ParamSpec[] }`;
  `variants/v0-patience-table.ts` (one duration per hand-back kind: after
  the implementation hand-back, after a pass, after a fail, after a repair,
  after a review fail, seeded from the recorded order's own gaps rounded to
  the minute, with two optional multipliers, one on the fails so far and one
  on a report-size proxy that is `unknown` until a size is recorded) built on
  `delayWhen(timer(d, scheduler))`; `variants/v0-quiet-period.ts` on
  `debounceTime`; `variants/v0-check-in.ts` on `auditTime`; `presenceRace`
  listed as locked because no presence source exists in the copies;
  `variants/index.ts` the registry, and `variants.json` the manifest (id,
  version, file, since, supersededBy); every parameter is a named value in
  the variant file with its default; a flip is a runtime override of those
  values and a kept flip is exported as a new variant file the operator
  commits. Nothing is held back from a variant: it may read every field the
  copies carry. Variants load lazily by id (`import('./variants/<file>')`),
  so the twin's initial chunk carries the registry index and the production
  budget check reads it; a kept variant adds one lazy chunk, never bytes to
  the initial one.
- **The result fold** (`results.ts`, pure): replays the order on virtual time
  with the twin deciding each dispatch moment and the recorded worker
  durations (completion minus request, per phase, from the copy) following
  each dispatch. A hand-back is ready at the `recordedAt` of its completion
  row, the only moment the six-field copy carries; waiting minutes count
  from that moment to the twin's dispatch, and a dispatch before it is
  early. The fold yields the virtual close time, the twin's total waiting
  minutes, the count of dispatches fired before the preceding hand-back
  existed (zero by construction for a patience table, counted so a later
  variant that fires on a timer is judged), and the same three figures for
  the recorded dispatches as the baseline. The baseline replay must
  reproduce the recorded close time within one virtual second; that spec is
  the fold's fidelity. No hit rate, no tolerance band, no agreement count
  against the operator's beats is computed anywhere in the feature.
- **The derivation** (`tools/scripts/twin/derive-operator-rows.mjs`,
  `npm run twin:derive`): reads `segments/order-221.json` (WO-016's copy of
  the platform's WO-221 segment), prints the operator rows (count and kinds),
  the gaps after each hand-back with the preceding row's type and verdict,
  the total waiting minutes and the span; writes `order-221-derived-v0.json`
  beside the fixtures, named by the fixture's name and never by the
  platform's order id because the target's outward lint refuses a launchpad
  identifier in any path the pull request lists (core's answer of 2026-10-24,
  item 1); the spec asserts the numbers above and that the 87.8-minute gap
  follows a hand-back with no verdict.
- **The registry check** (`tools/scripts/twin/check-variants.mjs`,
  `npm run twin:check`): every manifest id has its file and every file is in
  the manifest; the manifest at `HEAD` contains every id the manifest at the
  order's base contains (read with `git show <base>:…`); a removed id fails
  the check, and so does an absent or unreadable base commit or base
  manifest: the check never passes vacuously. An absent base commit is
  refused with its own message naming the commit and the fetch that supplies
  it (`git fetch origin <base>` in a shallow or fresh clone), distinct from a
  removed id's; the registered clone the gate runs in is full, so the gate
  never meets it. Old versions are kept to play with.
- **Feature** (`libs/features/twin`, `scope:dotln`, `type:feature`,
  `twinRoutes`; `BasePaths.Twin = 'twin'`, listed in the Machinery menu
  group, with its entry in WO-008's `routePermissions` adjacency list, whose
  coverage spec requires every `BasePaths` member, and a signed-in e2e path
  through WO-008's mocked provider): `twin-page` (container) over `TwinFacade` (signals for the order,
  the variant, the flips, the resolution; one `vm` with the beat glyphs, the
  recorded lane, the twin lane, the ghost lane and the result cell);
  composites `marble-lane` (inline SVG marks plus a `<pre translate="no">`
  ASCII marble line as the text equivalent), `result-cell` (a key-value list:
  virtual close, waiting minutes, early fires, each beside the recorded
  baseline; `unknown` admitted), `variant-picker` (a menu of registry
  entries with version and lineage), `flip-panel` (steppers per parameter, no
  free text), `export-variant` (a dialog showing the generated TypeScript
  with a copy button and a download); mappers `beat-glyph` (kind and verdict
  to a native emoji with a text equivalent), `lane-mapper`; a layout.
  `TwinStore` (`libs/features/twin-data-access`) persists the chosen variant
  and the current flips through `withPersistedState` under
  `dotln-angular.twin`. The replay runs on `@dotln-angular/replay`'s
  `ReplayClock` and its virtual scheduler, flushed synchronously, so a flip
  redraws without a clock and the twin adds no third time abstraction
  (WO-015's scene clock drives frames, WO-016's replay clock drives recorded
  time, and the twin replays on the latter); the scheduler question is
  answered once at step 6 and recorded in the architecture document.
- **Documents:** `docs/dev-reference/architecture/twin.md` (the twin as
  code, the variant lineage rule, the result fold and its baseline spec, the
  scheduler answer, what the lane claims and does not) and
  `docs/ai-reference/twin-rules.md` (a variant is a TypeScript file and is
  never deleted; the twin is judged by the order's results, never by
  agreement with recorded beats; nothing is held back from it; the recorded
  lane never moves; no free-text parameters; nothing writes outside browser
  storage).

Rejected: a fidelity cell scoring hits against the operator's beats (axis:
the operator's decision, results only; there are many paths from a hand-back
to a close); a JSON model interpreted at runtime (axis: the operator's
decision, the RxJS that describes is the RxJS that runs); deleting or
overwriting a superseded variant (axis: old versions are kept to play with);
a live journal or presence source (axis: none exists in the copies; the kind
is shown locked).

Live-run surfaces at the base: WO-006's served production build and
Storybook; WO-007's MSW worker; the sub-apps of WO-013 to WO-016; WO-008's
sign-in.

**Deliverables:** the twin-model library with three variants, the registry,
the manifest and the result fold; the derivation and the check with their
npm scripts; the derived fixture; the twin feature and its data-access
library with kits; the menu item; the two documents; `docs/evidence/WO-017/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-017.
2. Generate `libs/shared/twin-model` (`scope:shared,type:util`),
   `libs/features/twin` (`scope:dotln,type:feature`) and
   `libs/features/twin-data-access` (`scope:dotln,type:data-access`) with
   logged commands and testing entry points. Check: `npx nx show projects`
   lists the three.
3. `derive-operator-rows.mjs`, `npm run twin:derive`, `order-221-derived-v0.json`;
   its spec asserts 8 operator rows, the seven gaps, 227.0 waiting minutes,
   the 1,110.3-minute span and that the first gap follows a hand-back with
   no verdict. Check: `npm run test:tooling` exits 0.
4. The three variants, the registry, the manifest and `check-variants.mjs`
   with `npm run twin:check`; a tooling test removes an id from a copy of
   the manifest and asserts the check fails, and a second runs the check
   against an absent base commit and asserts it fails with the message
   naming the commit and the fetch. Check: `npm run twin:check` exits 0;
   `npm run test:tooling` exits 0.
5. `results.ts` with marble specs: the baseline replay reproduces the
   recorded close within one virtual second and the operator's 227.0
   waiting minutes; the patience-table variant yields its own three figures;
   a flip changes only the twin's figures. Check: `npx nx test twin-model`
   exits 0.
6. The scheduler question answered: the browser replay runs on the replay
   library's virtual scheduler with the resolution parameter; recorded in
   `twin.md` with the frame cap observed and the statement that the twin
   shares the replay clock's tick contract and defines readiness as the
   completion row. Check: a spec flushes a full WO-221 replay at one
   frame per recorded second.
7. `TwinStore` with `withPersistedState` under `dotln-angular.twin`. Check:
   the persisted-state spec over a fake storage asserts the key prefix and
   no other write.
8. Composites, mappers, layout, container, facade; stories `Wo221`,
   `Wo226`, `Flipped`. Check: `npx nx test twin` exits 0; `npm run
   lint:components` exits 0.
9. The variant export: the generated TypeScript for a kept flip compiles
   against `TwinVariant` (a spec writes it to a temporary file and type
   checks it). Check: the spec passes.
10. `BasePaths.Twin`, its `routePermissions` entry, the lazy route, the
    Machinery menu item, `twin.*` i18n keys. Check: `npm run i18n:check`
    exits 0; `npx nx test core` exits 0 with the `routePermissions`
    coverage spec; `npx nx build dotln --configuration=production` exits 0.
11. e2e `apps/dotln-e2e/src/twin.spec.ts`: sign in through the mocked
    provider; two lanes and the result cell with the recorded baseline; the variant picker lists three variants; a flip
    redraws the twin lane and leaves the recorded marks where they were;
    the export dialog shows TypeScript; the chosen variant survives a
    reload; the keyboard path over every flip; axe at the board spec's
    threshold; no horizontal overflow at 360, 768 and 1440. Check: `npx nx
    e2e dotln-e2e` exits 0.
12. Documents: `twin.md`, `twin-rules.md`, pointers, `conventions.md`.
    Check: files exist.
13. Dependency check as WO-015 step 14. Check: prints nothing.
14. Gate plain and review. Check: passing rows, no tracked-byte mutation.
15. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the twin-model variant and the result fold; WS-001's
    delivery states updated by the final review. Check: `npm run test:docs`.
    Then the publish, review and records steps as WO-007 steps 15 to 17,
    with the branch `feat/twin-patience-lane`, the title `feat: add the
    digital twin's patience lane`, `docs/evidence/WO-017/` and
    `docs/final-reviews/WO-017/`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run check:fixtures`,
`npm run catalog:check`, `npm run twin:check`, `npm run test:tooling`,
`npm run i18n:check`, `npx nx e2e dotln-e2e`; in the launchpad order
worktree `npm run test:docs`; then the target gate plain and review once
each.

**Acceptance criteria (all required)**

1. `npm run twin:derive` exits 0 and `order-221-derived-v0.json` records 8
   operator rows, seven gaps of 87.8, 109.9, 1.7, 1.4, 2.1, 18.2 and 5.9
   minutes, a waiting total of 227.0 minutes and a span of 1,110.3 minutes,
   with the first gap's preceding row carrying no verdict (a spec asserts
   each).
2. `npx nx test twin-model` exits 0 with marble specs asserting that the
   baseline replay with the recorded dispatches reproduces the recorded close
   time within one virtual second, that waiting minutes and early fires are
   counted from each hand-back's completion row, that the patience-table
   variant's three result figures are computed, and that a flip changes the twin's figures
   and lane and nothing on the recorded lane.
3. `grep -rliE "hit ?rate|hits/n|tolerance band" libs/shared/twin-model/src libs/features/twin/src libs/features/twin-data-access/src --include='*.ts'`
   prints nothing, and the result cell's `vm` type has no field named `hits`
   (a spec asserts the field set: virtual close, waiting minutes, early
   fires, each with its baseline).
4. `variants.json` lists at least three variants with files that exist,
   `npm run twin:check` exits 0, a tooling test proves a manifest with a
   removed id fails the check, and a second tooling test proves the check
   fails, not passes, when the base commit is absent, with a message naming
   the commit and the fetch to run.
5. `grep -rl "JSON.parse" libs/shared/twin-model/src --include='*.ts' | grep -v spec`
   prints nothing (no interpreted model), and the export spec type-checks a
   generated variant against `TwinVariant`.
6. The persisted-state spec asserts every key written starts with
   `dotln-angular.twin` and no other storage, cookie or network write occurs;
   `grep -rlE "from 'node:|from \"node:|require\(" libs/shared/twin-model/src libs/features/twin/src libs/features/twin-data-access/src --include='*.ts' | grep -v spec`
   prints nothing.
7. `npx nx e2e dotln-e2e` exits 0 and includes: a sign-in through WO-008's
   mocked provider, then the two lanes and the result cell with the recorded
   baseline on `/twin` (`routePermissions` covers `BasePaths.Twin`, and
   WO-008's coverage spec passes); three variants in the picker;
   a flip redrawing the twin lane and leaving the recorded marks; the export
   dialog showing TypeScript; the chosen variant present after a reload; the
   keyboard path over every flip; axe at the board spec's threshold; no
   horizontal overflow at 360, 768 and 1440.
8. `docs/dev-reference/architecture/twin.md` records the scheduler chosen
   (the replay library's), the frame cap observed and that readiness is the
   hand-back's completion row, `docs/ai-reference/twin-rules.md` states that
   a variant is never deleted and that the twin is judged by results only
   (`grep -c "results" docs/ai-reference/twin-rules.md` is at least 1),
   `package.json`'s `dependencies` keys equal the base's, and the production
   build's budget output names no twin chunk over budget (each variant a
   lazy chunk).
9. `node scripts/target-gate.mjs WO-017 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs,
`docs/evidence/WO-017/README.md` and
`docs/evidence/WO-017/host-qualification.md`.

**Known issues and carry-ins:** The base line is provisional and publishes right under starter v0.96.1 (the merge-base publish of core WO-230; WO-013's fix dispatch is its first use in this fork); a pass may set it to the predecessor's merge commit. Seven gaps in one order are a toy's sample; the result
cell prints the figures for this order and claims nothing beyond it; the
grid over a dozen orders and the operator's own blind replay are later lanes
(candidate C6). The record has no presence, so a variant that waits for the
operator's return is shown locked. Report sizes are not in the six-field
copies, so the size multiplier reads `unknown` until a later copy carries a
size. Starter v0.96.1's plan gate no longer advises on this order's own launchpad record paths (core's answer of 2026-10-24, item 1); they stay as the kit names them and the publish command's body file must not name them. From receipt 008 (the 2026-10-24 pass's refutation),
carried into this text by the 2026-10-24 second pass: judged by results
alone, a variant with every patience duration at zero yields the best of the
three figures (a virtual close of about 883.3 minutes, zero waiting minutes,
zero early fires) while modelling no one, because the fold replays the
recorded worker durations after each dispatch and a patience table never
fires before a hand-back exists. The operator's rule stands, results only and
never agreement with the recorded beats, so this order adds no fidelity
figure; the result cell shows such a variant's figures as they are and the
twin's document states this limit. The operator may name a fourth result that
a zero-patience twin pays (for instance the cost of a dispatch issued before
the hand-back's report could have been read); the pass that hears it amends
the fold, and until then the safe default is the three figures as written.
`BasePaths.Twin` now carries its `routePermissions` entry and the e2e signs
in first; `twin:check` fails on an absent base. From receipt 009 (the second
2026-10-24 pass's refutation), carried into this text by the 2026-10-25
pass: readiness is the completion row's `recordedAt`, the only moment the
copy carries, so a zero-patience variant dominates the three figures by
construction and the fourth result stays the operator's to name (candidate
C4 of the second 2026-10-24 pass; the fold, step 6, criteria 2 and 8);
`twin:check` names the commit and the fetch on an absent base (step 4,
criterion 4); variants are lazy chunks under the budget (the model, criterion
8); the twin replays on the replay library's clock and adds no third tick
contract (the feature, step 6, criterion 8).
This order activates only on a launchpad whose starter carries core WO-221's
`--draft` form; the draft pull request and its workflow runs are a
final-review obligation read from `docs/evidence/WO-017/preview-pr.json`,
never a criterion. `Target release classification: minor` and `Target
release notes: reviewed` were set by the 2026-10-24 pass under WO-012's
declared policy.

**Non-goals:** a fidelity or agreement figure against the operator's beats;
the dozen-order grid, the blind replay and the ring; a live route, journal
digests or presence; a wait policy shipped to the platform (a graduated idea
goes to core as a GitHub issue); any write outside browser storage.

**Operator-review assumptions:** the operator accepts the three result
figures as the first judgment of the twin, seeds the first variant from
their own recorded gaps, and reads the one draft pull request before final
review, which the final publish reuses.
