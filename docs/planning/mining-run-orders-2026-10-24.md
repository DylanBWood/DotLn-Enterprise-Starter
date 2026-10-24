# The mining run's designs cut into DotLn-Angular orders: starter v0.94.0 first, core's answers, the corrected subject, WO-013 to WO-018 and the sequence, 2026-10-24

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-24 at about 04:26Z
naming a standard pass with the latest upstream and carrying core's answer
block to this fork's requests of 2026-10-23. While the update ran they held
the pass twice (a short hold, then a word to continue the update pull request
while the planning pass waited), merged update #23 and asked that it be
finished while the hold stood, then pasted a prompt another session had
written for them, withdrew it as wrong, pasted a corrected version, and at
about 04:57Z stated the direction in their own words: nine decisions on the
DotLn-Angular work and six orders to cut in a sequence they left to the pass,
with three rules for the orders. Every message is captured verbatim in ignored intake
(`docs/intake/notes/planning-2026-10-24.md`, nine entries, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c` at the
ninth entry), a sibling record, never a source to copy from. The operator's
own statement (entry 9) binds; the two pasted prompts (entries 5 and 8) are
read as its context where they agree with it (D2).

This document is planner synthesis of that capture; this instance's records
(the six previous planning documents and their receipts, WS-001, the operator
record, the profile, the register, the control segments, the orders); core's
release notes for v0.94.0 and the kit at `49d8c4c3`; core's planning document
`docs/planning/intake-mining-run-routing-2026-10-24.md` §9 and §10, read
from core's local planning branch at `f33cad53` and `acd1c94f` (D18); the
platform's public control segments `docs/control/orders/WO-221.jsonl` and
`WO-226.jsonl` at core `origin/main` `49d8c4c3`; the target repository at
`90fa6e8d`; and, read-only at the run's folder on this machine, the files of
the operator's 2026-10-22 intake mining run the operator named, at the
sections each order needed: `out/angular/README.md`,
`out/angular/dotln-angular-forward.md` (§1, §2, §3, §5, §7),
`out/angular/toys.jsonl` (summarized by a script, not read row by row),
`out/angular/design-toolbox-toy-scene.md` (§0 to §4), `design-agents-in-concert.md`
(§1), `design-operator-model-testbed.md` (§1.1 to §1.4, §2, §3, C1, §5.2 to
§5.3), `out/process/ui-vision-see-the-agents.md` (V7, §4, §6), the two
toolbox captures, `out/maps/README.md`, `digest/queue-and-rules.md` §1.2 items
14 to 18 and `digest/key-ideas.md` themes 2, 4, 5 and 6; the digests of each
are in §4. `design-flow-and-constraint.md`, `design-planning-riff-surface.md`,
`critic-notes.md`, the catalog entries, the registers, the probes and every
quarantine file were not opened; nothing was re-ranked or re-synthesized; the
designs are the designs (D17). The clean-room screen found public packages,
public standards, a public-domain text and the operator's own repositories;
the only private material read is the operator's own capture and their own
run, paraphrased, with nothing copied into a committed file beyond ids, short
titles and generic terms (D2).

Authority: a document-only planning pass on
`planning/2026-10-24-mining-run-orders` from clean `main` at `9acd5ce`
(after #23). The update ran before the branch opened, on the operator's
continue-and-hold direction, through the README's update route: a secondary
worktree under `.runtime/`, one merge, the gates, pull request #23, the
operator's merge and `node scripts/launchpad.mjs update --finish` on `main`
(D1). The pass files six target orders, amends two, activates nothing,
publishes nothing in the target and never merges. Its refutation is the
pass's independent verification (§14).

Fan-out plan, stated before the first spawn: one refuter, no research
workers, no descendants; the 20-admission cap leaves 19. The operator's run is
the research and the operator directed that it not be redone.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `0d35b2a` at the dispatch, clean; after #23, `main` at `9acd5ce` (starter v0.94.0, core `49d8c4c3…`), bootstrapped by `update --finish` (35 generated surfaces, the local-terms list present) | `git status`, the finish output |
| WO-006 | phase `closed`; VER-001 and FINAL-001 `pass`; `DotLn Angular v0.1.0` published 2026-10-21 | `npm run resume -- status --json`, the canonical status in `docs/control/current.md` |
| Upstream | one refresh commit past the v0.93.0 base: v0.94.0 (core WO-219, fifty boarded follow-ups, published 2026-10-23T23:52Z); the preview reported 118 replaced, 4 added, 0 removed, 0 refused, 873 unchanged, no instance actions, build `fnv1a64:b0a806b195c9f83e` to `fnv1a64:9a7073ea6ba64ffe` | `git fetch --no-tags upstream`, the bounded preview from a detached worktree, `gh release view v0.94.0` |
| The gates on the update branch | `npm test` 7 passed; `npm run test:docs` 14 passed, 0 failed, 16.58 s wall, 0.1 s lane wait: `plan` and `plan-refutation-current` green for the first time since WO-006's records moved | the gate summaries |
| `plan start` | window since receipt 007: 0 failed verifications, 0 repairs, 0 orders made ready, 0 off-ramps, 0 amendments; record: 1 of 9 final reviews with an escape; local: 7 interventions (6 unclassified), 0 host denials, 0 long phases, 0 repeated gate runs; reader scores unavailable (`docs/control/reader-profiles.json` absent, no reader due); conditions 0 holding, 0 unknown, 125 decision conditions and 64 register rows not evaluated | `npm run plan -- start mining-run-orders`, `npm run plan -- failures` |
| `plan conditions --slow` | prints an empty measurement table at v0.94.0 (0 holds, 0 unknown, 0.3 s); the instance conditions now filter by known sources and hold with three samples (core WO-219), so no gate median is reported from this probe; the readings of the two gate runs are the measurement (§4) | `npm run plan -- conditions --slow` |
| Register | 23 pending rows at revision `786352ff…`, all deferred; three name WO-007 by text; the C4 row of the 2026-10-23 pass (take the fix) fired on #23 and the C3, C5, live-view, command-surface and WO-006-D005 rows are re-disposed by the operator's decisions (§3, §8) | `npm run plan -- followups --export` |
| DotLn-Angular | `main` at `90fa6e8d` (#4), no open pull request, one Release; `BasePaths` has one member; the shell's nav carries one link; Node 26.9.0, Nx 23.3.0, Angular 22.2.3; the lint's tag constraints read from `eslint.config.mjs` (a `type:util` depends only on `type:util`; `type:models` on nothing; a feature never on a feature) | the operator's clone, read-only |
| Core's answers | the paste's nine answers match core's §9 at `f33cad53` (the commit the operator's second paste cites, `acd1c94f`, is the cost-table refresh on top of it, on core's local planning branch and not on GitHub at 04:54Z) | `git -C ../DotLn show`, `gh api repos/DylanBWood/DotLn/commits/acd1c94f` (404) |
| The run | the folder is present at the path the operator gave; the eleven map files hold 3,463 rows in one schema (`work, slug, part, chapter, section, concept, type, definition, related, dotlnHooks, verified`); the five design files, the forward synthesis, the toys file and the two captures carry the digests of §4 | `wc -l`, `shasum -a 256`, one script over the JSONL keys and `type` values |
| The host | 16 logical CPUs, load 2.8 at the conditions read; lanes capacity 8, no holders | the conditions output |

## 3. Reopening observations

Fired conditions, each re-disposed in §8: FUP-ac2bff24bf9b8bae (C4 of the
2026-10-23 pass, taking the fix: core's release notes name it and #23 took it);
FUP-3ffd3702c8425fd4 and FUP-52178afa5a081d86 (the UX ideation after the
platform pass consumed the run: the platform pass merged its decisions into
the operator's statement and the designs are the run's own, so no ideation
is run); FUP-a67e7d4b53614f6c (the live-view design's token question: core
answered, and the operator's decision that the app is not wired to core
closes the live view over the resident); FUP-2af7f27fd0e0fe34 and
FUP-d50229455aad453c (the live view and the command surface over the
platform's contracts: closed by the same decision); FUP-deccd7ed510d2b77
(the pattern workshop's seeing half: the machinery view is it);
FUP-ba9813e8b2705de8 (WO-006-D005, grouping before a second app: the
operator's decision answers it and WO-013 confirms it); FUP-4c3c0351adc4c2cc
(a planning check for Preflight tokens: v0.94.0 ships it). No deferred row's
lifecycle condition fired on a close, because no order closed since receipt
007.

## 4. Observations, dated 2026-10-24

| Item | Observed | Source |
| --- | --- | --- |
| Starter v0.94.0 | core WO-219: 34 register rows settled with a fixture case and a paired control, 13 declined to planning, 3 operator packets; the plan gate's amendment reader resolves a moved execution-amendment decision through its binding (D061); `override-record` at a closed order; `work-orders index --check` resolves each open order's Preflight `npm test -- --only` tokens; `followups --apply` accepts a request file from the granted scratchpad; the SourceBundle screen refuses a compact JWT and a URL-userinfo password; canonical corrected actors; the publish helper admitted only in its node spelling from main's committed closure; the executor and reviewer role texts exceed their cold-start ceilings by core's measure | core's release notes, `Read before upgrading` |
| The update | the secondary worktree, one merge commit `0dd4ee1` (123 files, no conflict; `CLAUDE.md`, `README.md` and `docs/PLAYBOOK.md` untouched upstream; `UPSTREAM.md`, product 07 and 08 replaced; 22 harness surfaces replaced), `npm ci`, `harness emit` 35 surfaces with no drift, lineage index current, `npm run sync` every artifact current, `harness check` 35, `launchpad verify` 995 files at `49d8c4c3`, `npm test` 7 passed in 14.01 s, `npm run test:docs` 14 passed in 16.58 s; pull request #23 opened ready at 04:40Z and merged by the operator at about 04:42Z; `update --finish` fetched, checked and advanced `main` to `9acd5ce` and ran bootstrap | the commands on the branch, `gh pr create`, the finish output |
| The plan gate on `main` | `npm run plan -- check` exits 0: 7 receipts, 7 passes, the 2026-10-23 receipt's judged, committed and workspace subjects equal (`sha256:403f4b67…`); six advisories, new at v0.94.0: WO-007 and WO-008 each name three launchpad record paths carrying their order id (`docs/evidence/WO-NNN/host-qualification.md`, `preview-pr.json`, `docs/final-reviews/WO-NNN/RELEASE-NOTES.md`) in their execution plans, with the advice to rename the file before a draft publish meets it | the command on `main` after the finish |
| The slow probe | `npm run plan -- conditions --slow` prints no measurement row; the two document-gate runs of this session took 16.58 s (the update branch) and the earlier 15.95 s wall with 0.1 s of lane wait; the plan task 0.76 s and the refutation-current task 0.59 s inside the gate | the probe, the gate summaries |
| Core's `acd1c94f` | a local commit on core's planning branch (`Refresh the planning cost table`) over `f33cad53` (`Record the operator's answers on the mining run, hand the instance its prompt, withdraw the drafted orders and dispose the register`); GitHub has no such commit at 04:54Z; §9 at `f33cad53` rewrites the earlier `2add5670` framing (the fork's block "taken in" became "the instance's prompt") and compresses the nine answers into one paragraph whose content equals the paste; §10's twenty-seven decisions are unchanged | `git -C ../DotLn log`, `git show`, a diff of the two revisions' §9 and §10 |
| The run's files | `out/angular/README.md` `4810fd33…`; `dotln-angular-forward.md` `c05dea11…`; `toys.jsonl` `411e486e…` (19 rows, slices A 3, B 4, C 4, D 4, E 4); `design-toolbox-toy-scene.md` `aab22ca1…`; `design-agents-in-concert.md` `70d14655…`; `design-operator-model-testbed.md` `22ee5688…`; `design-flow-and-constraint.md` `f6245a38…` and `design-planning-riff-surface.md` `d1c7ab30…` (digests taken, files not opened); `ui-vision-see-the-agents.md` `d3bbf3a2…`; `toolbox-ui-capture.md` `1686ea50…`; `toolbox-toy-scene-capture.md` `7cc9b2c0…`; `out/maps/README.md` `9b6c905f…`; `digest/queue-and-rules.md` `b60a7607…`; `digest/key-ideas.md` `f99633b5…`; each order names the full digest of the file it builds from | `shasum -a 256` at 04:56Z; the files are ignored intake and may change |
| The catalog's rows | 3,463 across eleven files: `ai-for-games-3e-part-a` 389, `part-b` 379, `enterprise-integration-patterns` 288, `poeaa` 455, `rxjs-core` 481, `rxjs-patterns` 261, `geb-map-part-1` 237, `part-2` 336, `tt/map-part-1` 364, `part-2` 134, `part-3` 139; one schema; `type` values concept 1,233, technique 586, pattern 427, principle 353, tool 259, trade-off 186, anti-pattern 154, data-structure 133, algorithm 130, observation 2 | `wc -l`, one script over the keys and types |
| WO-221, re-derived | 16 rows at core `49d8c4c3`; 8 operator rows (no actor: `WorkOrderActivated`, three `VerificationRequested`, two `RepairRequested`, two `FinalReviewRequested`); 7 gaps after a hand-back, in minutes: 87.8 after `ImplementationReady` (no verdict; unmet criteria 3 and 4), 109.9 after VER-001 `fail`, 1.7 after `RepairCompleted`, 1.4 after VER-002 `pass`, 2.1 after FINAL-001 `fail`, 18.2 after `RepairCompleted`, 5.9 after VER-003 `pass`; 227.0 waiting minutes; span 1,110.3 minutes (18.5 h); hand-backs by `claude-fable-5-1`, `gpt-6-astra` and `claude-opus-5-5` on two harnesses; row 12's actor carries `mode: subagents` | `git show origin/main:docs/control/orders/WO-221.jsonl`, one script |
| WO-226, re-derived | 6 rows; 3 operator rows; gaps 316.0 (after `ImplementationReady`) and 31.7 (after the `pass`) minutes; 163.8 minutes of implementation, 34.3 of verification, 34.3 of final review | the same |
| The kit's board schema | `packages/console/uifa-board-v1.schema.json` at v0.94.0 has SHA-256 `7d20e785…`, the digest the target's committed copy and WO-007 pin | `shasum -a 256` |
| The target | `BasePaths { Board }`; `app.routes.ts` one lazy child and a root redirect to the board (the e2e asserts `/board`); the shell layout's `[nav]` slot takes the app's links; `libs/shared/ui` wrappers `dialog`, `menu`, `tabs`; `check:fixtures` runs the board check with `assertScrubbed` and an Ajv schema pin; `.env`, `.env.*` ignored, `.env.example` kept; budgets 500 kB warn and 1 MB error initial, 4 kB and 8 kB per component style; no `docs/intake/` | the clone at `90fa6e8d` |
| The fork's role stamps | the executor skill's `Origin` stamp carries 19 ids, each of the five other role skills 13, the worker type 6 (starter v0.94.0) | `.claude/skills/dotln-*/SKILL.md`, `.claude/agents/dotln-worker.md` |

## 5. The operator's direction, synthesized

**The update first, again.** The outcome asked for is the fork at starter
v0.94.0 with the pass on top of it; the operator's hold explicitly admitted
the update while the planning pass waited (D1).

**Holds are holds.** Three times the operator stopped the pass with a few
words; each time the session stopped where it stood, reported the exact
state and wrote nothing until the next word; a pasted prompt the operator
called wrong was kept in the capture and not acted on (D2).

**The corrected subject.** Nine decisions, in the operator's own words
(entry 9), bind this fork's plan for DotLn-Angular: one app with sub-apps
behind a menu; the sandbox where every idea is a toy first; feedback to DotLn
through GitHub issues and never a control record; not wired to core, its
data from public mining into its own store through its own API, with
scrubbed copies of WO-221 and WO-226 as a stopgap; the machinery view's
purpose; workers as metaphors in role slots, select-then-apply first, ideas
saved to ignored intake; the soldier scene as its own sub-app, 2D first; the
digital twin's rules; agents collaborate (D12).

**Six orders, the sequence the pass's.** The shell and menu; the catalog pipeline
with at most twelve workers checkpointed per map; the soldier scene; the
machinery view over the scrubbed records; the twin's patience lane, judged by
results, after re-deriving WO-221's data; The Art of War mapped and toys
designed for the six sources without one, after the catalog (D5 to D11).

**Three rules.** Each order names the design file it builds from; nothing
from intake enters a committed file beyond ids, short titles and generic
terms; the quarantine files are never opened (D2, D6).

**Core's answers.** Nothing in core blocks; item 1 is fixed and taken; item
2's route stands; item 7 is answered and, under the operator's decision,
moot for this app (D14).

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 Starter v0.94.0 is taken through update pull request #23, opened
  ready from `main` before the planning branch, merged by the operator and
  finished on `main` by the session while the planning pass held; the plan
  gate is green on every branch and core's blocking item is settled in the
  field.** Source: the dispatch; the operator's hold-and-continue message;
  README §Taking upstream updates; the 2026-10-23 pass's D1 (the mechanics
  are the pass's). Rejected: a draft (nothing was red); opening the planning
  branch first (the pass would have sat on the v0.93.0 reader and its own
  receipt helper would have exited 1 again). NoOp cost: WO-007 implemented
  and waiting at verification. Reopen: #23 is reverted.
- **D2 The operator's own statement of 2026-10-24 (capture entry 9) is the
  direction this pass acts on; the two pasted prompts are its context and
  nothing from the withdrawn one is acted on where it differs; the one
  difference (the prompts asked for the design file by path and SHA-256, the
  operator's statement by name) is resolved by recording both, because the
  run is ignored intake that may change and the digest pins what was read;
  the clean-room rule for the orders is the operator's: ids, short titles
  and generic terms only, and no quarantine file.** Source: entries 5 to 9
  of the capture; CLAUDE.md §Clean Room. Rejected: reading the three
  versions as three dispatches (one pass, one direction; the operator said
  the first was wrong); dropping the digests (a reader of an order a week
  from now needs to know which bytes it was cut from). Reopen: the operator
  says a digest is unwanted.
- **D3 WO-007 is amended: the ten known issues of receipt 007 are repaired
  in the text ((a) the worker file excluded from the production output and
  asserted absent, (b) a `mocked` build configuration for e2e and play, (c)
  the hygiene check reads every non-spec file that dispatches, (d) the
  standalone `event()` creator refused outside `events`, (e) the Node grep
  scoped to browser sources and widened to bare specifiers, (f) the
  persisted state's failure behavior and a storage token bound in
  `data-access`, (g) the worker start awaited with a fallthrough, (h)
  superseded with the token, (i) no waiver carried, (j) persistence across
  reloads on the same origin); the board's data path moves from the
  platform resident's loopback to the app's own API with `uifa-board-v1`
  kept as the response shape, and the console base URL, the bearer-token
  interceptor and the console primer variables go; the plan-gate carry-in
  closes at v0.94.0; step 17 records core's confirmation of the correction
  route.** Source: receipt 007's known issues (§9.1); the operator's
  decision that the app is not wired to core; core's items 1 and 2; v0.94.0's
  advisory. Rejected: keeping the loopback route as an unused configuration
  (an interceptor attaching a token to a host the app never reads is a
  security surface for nothing); a house `GET /board` path (the versioned
  shape the fixture and the kit schema carry costs nothing to keep and lets
  the store member change a handler, not a feature). NoOp cost: an order
  frozen with ten known defects and a data path the operator has ruled
  out. Reopen: the operator wires the app to a resident, or core changes
  `uifa-board-v1`.
- **D4 WO-008 is amended: the carry-in closes at v0.94.0, the record-path
  advisory is named, and the order takes its place after WO-016 with its
  base set to that merge commit by the pass that follows it; the dependency
  on WO-007 stands.** Source: D3; D11. Rejected: leaving WO-008 second (the
  sandbox is served soonest by the menu, the catalog, the scene and the
  machinery view, none of which gates a route; see D11). Reopen: the
  operator moves it.
- **D5 WO-013 is filed: the shell's sub-app menu as a shell template with the
  router links in the app, the `scene` and `machinery` routes with arriving
  pages, the Tools group rendered empty, the sub-app grouping convention
  (WS-001 rule 22; WO-006-D005 settled) and two reference documents.**
  Source: the operator's order (1); the forward design §2.0 (one enum member,
  one lazy route, one nav link, one i18n block, one document per slice); the
  target's lint (the shell is `type:ui` and may not import the router).
  Rejected: a menu component owning the router; a second app; moving the
  board under `/machinery` now (C8). NoOp cost: six sub-app orders each
  inventing the menu. Reopen: the operator renames the groups or moves the
  board.
- **D6 WO-014 is filed: the `Tool` schema with five faces and the closed
  transform enum, the 3,463 rows typed by eight classifiers, two sampling
  checkers, one synthesizer and one critic (at most twelve `dotln-worker`
  agents, checkpointed per map and rerun per map), the catalog library with
  its loader as the seam for the later API, the allow-list and scrub check
  that admits ids, short titles and generic terms and refuses every other
  map field, and the catalog browser under Tools.** Source: the operator's
  order (2) and clean-room rule; the toolbox captures (the five faces; the
  task that never ran); design B §2.1 (the shape and the enum); the maps
  README (the schema, the ids, the counts); queue item 14 (the twelve-worker
  shape). The allow-list is the operator's rule made mechanical, so a
  classifier's slip cannot commit a definition. Rejected: committing the map
  rows; one worker; an open transform string; HTTP now. NoOp cost: a scene
  with ten hand-typed tools and no toolbox. Reopen: the mining store exists
  (C1), or the operator changes the field rule.
- **D7 WO-015 is filed: the pure scene engine as `type:util`, twenty units on
  a 2D canvas behind `SceneRenderer`, the rail fed by the catalog, RTS
  selection, flock, arrive and the two-level formation with slot roles,
  determinism by default with a seed shown, lifecycle roles as the default
  unit labels with the UIFA set as a switch, compositions persisted through
  WO-007's feature, and the wrapper sentence admitting a browser drawing API
  (WS-001 rule 14 and the taxonomy).** Source: the operator's order (3) and
  decisions (2D first, Babylon later, the scene a sub-app in its own right);
  design B §1 to §4. Rejected: WebGL now; SVG for the field; a behaviour per
  role; randomness by default; the engine inside the feature. NoOp cost: the
  baby example the operator called a goal in itself stays on paper. Reopen:
  the operator asks for 3D (C2) or names another label set.
- **D8 WO-016 is filed: the machinery view over six-field copies of WO-221
  and WO-226 (ordinal, type, time, order, actor, verdict; no path; the
  commit recorded; the existing scrub check), the records and replay
  libraries every later toy reads, each agent's active mechanisms by id from
  the fork's own role files, the operator's ideas as titled mechanism
  changes applied select-then-apply with a ghost and a presentation-only
  band, no generated cards, and the ideas persisted in the browser and
  appended to the repository's ignored intake by a local sink process the
  operator runs beside the dev server.** Source: the operator's order (4)
  and decisions (slots, select-then-apply, ideas saved to ignored intake, no
  cards from records); design A §1 and §1.6; the UI vision §4; the forward
  design §2.0 for the lint placement of the records library. The sink
  writes inside the target repository because the executor's writes and the
  app's process stay inside their own root; the operator points the sink at
  another intake by one ignored variable. Rejected: the resident's loopback;
  generated cards; drag; the launchpad's intake as the default sink;
  episodes as the unit. NoOp cost: the operator's founding picture stays in
  the run's prose. Reopen: the mining store exists (C1); the operator asks
  for drag or the episode view.
- **D9 WO-017 is filed: the twin's patience lane over WO-221 on virtual
  time, the model as RxJS code with variants kept and a check that refuses
  a removed one, judged by the results of the order it would have run (the
  virtual close time, the waiting minutes, the early fires, each beside the
  recorded baseline) and never by agreement with the operator's beats; the
  design's fidelity cell is not built; WO-221 re-derived by this pass (§4)
  and re-derived again by the order's first step.** Source: the operator's
  order (5) and decisions (results only; variations and old versions kept;
  nothing held back; the RxJS that describes is the RxJS that runs; re-derive
  the data first); design C §1.4, §2, §3, C1, §5.2 to §5.3. The result fold
  is this pass's reading of "judged by results" for a replayed order: the
  only results a replay can produce are the order's close and the attention
  spent, so those are the figures. Rejected: the hit rate; an interpreted
  model; deleting variants; a presence source. NoOp cost: the operator's
  model stays a design. Reopen: the operator names a different result
  figure, or a journal digest gives the lane a presence source.
- **D10 WO-018 is filed: The Art of War mapped into the catalog from its
  public-domain text (two mappers, one critic, one classifier; definitions
  in the mappers' own words and never a passage), toys for Meadows, Pirsig,
  Poincaré, Gladwell, Taleb and the 5S set designed as `toy-v0` records
  with their tools typed from public knowledge of the works (six designers,
  one synthesizer, one critic), the run's nineteen toys listed by id and
  title, and the toy shelf under Tools; at most twelve workers across the
  two fan-outs.** Source: the operator's order (6) and clean-room rule;
  queue items 15 and 17; the maps README; the run's README §Sources with no
  toy. A toy record rather than a prose design is how the operator's rule
  (ids, short titles, generic terms) and the operator's wish (every idea a
  toy in the app) meet: the record is what the app can show and the operator
  can pick from. This is also the first public mining into the app's own
  store, the direction the operator gave for the app's data. Rejected:
  committing the run's toy designs; mapping from placeholders; prose designs
  in a worktree's ignored intake (lost at close). NoOp cost: a commander
  scene with no tactics and six sources with no way into the app. Reopen:
  the operator names a different translation or asks for a toy to be built.
- **D11 The sequence is WO-007, WO-013, WO-014, WO-015, WO-016, WO-008,
  WO-017, WO-018, serial, each base the predecessor's merge commit.** Source:
  the operator's statement, which leaves the sequence to the pass and places
  the sixth order after the second; WS-001's dependency plan (every member edits the workspace files,
  so no two run side by side). The reading: WO-013 is small and gives the
  frame the day after WO-007; WO-014 and WO-015 realize the baby example the
  operator called a goal in itself; WO-016 realizes the founding picture;
  none of the four gates a route, so authentication (WO-008) follows them
  and precedes the twin, the first content about the operator; WO-018 is
  content and design work that blocks nothing. Rejected: WO-008 second (the
  foundation's critical path still ends in it, but the sandbox the operator
  asked for is served sooner this way and security gates nothing yet);
  WO-014 before WO-013 (the catalog browser needs the Tools group); a lane
  pair (the workspace files overlap). NoOp cost: none; a sequence is a
  reading. Reopen: the operator moves an entry by a word, or a member's
  surfaces turn out disjoint and the operator will run two at once.
- **D12 WS-001 is restated around the corrected subject: the outcome, the
  members and delivery states, the dependency plan with the typed edges,
  rules 22 (sub-apps) and 23 (the sandbox and the clean room for mined
  data), the wrapper sentence in rule 14 and the taxonomy, §The app and its
  sub-apps replacing §The console (the operator's nine decisions, the menu,
  the board's data path, H1 to H5 and G1 to G6 kept, I1 to I3 revised, the
  method restated as toys first, the road), and §The operator's model; the
  purpose record's product paragraph is restated and its ceiling set at the
  measured bytes plus one tenth.** Source: the operator's decisions; D3 to
  D11. Rejected: a second workstream for the sandbox (one workstream for
  now, the operator's word). Reopen: the operator changes a decision, or
  the app grows past one workstream by their word.
- **D13 The register: twelve rows re-disposed as §8 says, eight candidate
  rows minted and deferred, the other eleven left with their conditions
  unchanged.** Source: §3 and §8. Reopen: as each row says.
- **D14 Core's answers are read against v0.94.0: item 1 settled in the
  field (the plan gate green on `main`); item 2's route recorded in WO-007
  step 17 as the designed route; items 3, 5, 6 and 9 acknowledged; item 4
  measured as far as the probe allows (§4); item 7 recorded, and moot for
  this app under the operator's decision that it is not wired to core, so
  the live view, the command surface and the live-view design candidate are
  declined rather than deferred; item 8 is the subject of this pass.**
  Source: §7. Reopen: the operator wires the app to a resident.
- **D15 The operator record changes, dated 2026-10-24: the pace (#23, the
  holds, the withdrawn prompt, the six orders); the finish route; the
  subject of the app; the research-run rule (read the named files, redo
  nothing, open no quarantine file); the request route (the paste until
  WO-193; ideas as GitHub issues); the Fable worker rule; the operator's
  model; mined data in commits; holds.** Source: the capture. Reopen: the
  operator changes any of them.
- **D16 Requests to core are written as the operator's prompt (§11), with
  one question (the v0.94.0 record-path advisory on a target order's
  launchpad evidence paths) and the confirmations; the refuter runs as the
  default `dotln-worker` because the dispatch line did not name Fable, and
  the receipt records the worker type.** Source: the operator record's
  standing preference; v0.90.0's rule; §4. Reopen: the operator names Fable
  on a dispatch line.
- **D17 No research worker is spawned: the operator's run is the research,
  the operator directed that it not be redone, and the pass read the named
  files itself at the sections each order needed; the critic notes, the
  catalog entries, the registers, the probes, the two designs no order
  builds from and every quarantine file stay unopened.** Source: the
  operator's statement and the two prompts; the operator record's
  research-before-asking rule, which asks for workers instead of asking the
  operator, not instead of reading what the operator already produced.
  Rejected: a worker per design file (a summary between the design and the
  order loses the detail the orders carry). NoOp cost: none. Reopen: a
  later pass needs a corpus the operator has not read.
- **D18 Core's `acd1c94f` is read from core's local planning branch, where
  it exists over `f33cad53`, because GitHub had no such commit at the read;
  the paste's answers equal §9 at `f33cad53`, which rewrote the earlier
  `2add5670` framing and left §10 unchanged; the fork records the local
  reading and asks core to confirm the branch merged (§11).** Source: §2 and
  §4. Reopen: core's `main` carries the document.
- **D19 Item 4 stays unknown from the probe: `conditions --slow` prints no
  measurement row at v0.94.0 and the gate's own summaries are the reading
  (16.58 s and 15.95 s wall, 0.1 s of lane wait, the plan task under one
  second); the fork asks core whether the slow probe is expected to print
  gate rows for an instance.** Source: §4. Reopen: the probe prints rows.

Immaterial lenses for the document-only writes (orders, workstream,
profile, purpose, operator record, register, ledger): the same as the
previous passes'; no code, configuration beyond the instance's own
`docs/control/`, activation, tag, publication in the target, or merge.

## 7. Core's answers of 2026-10-24, read against v0.94.0

Core's pass of 2026-10-24 read the fork's nine items of 2026-10-23 at
`49d8c4c3` and answered them in its §9; the operator relayed the answers
three times (entries 1, 8 and 9 of the capture). What this pass does with
each: **1** (blocking, the amendment reader) is fixed in WO-219 and taken by
#23; `npm run plan -- check` passes on `main` with the 2026-10-23 receipt's
subject intact (D1). **2** (the records-publish correction) stands as the
designed route in `closed`; WO-007 step 17 records it; a final-review result
carrying the launchpad row is core's candidate. **3, 5, 6, 9** acknowledged;
WO-224 queued third at core. **4** (the document-gate medians) measured as
§4 allows; the slow probe prints no rows (D19). **7** (the console token): a
browser never reads the descriptor; the shell's local host process reads
the owner-only file and hands the connection to the browser; an export's
resident runs on the carried runtime through the kit's build-first scripts
and the shipped console opens with `npm run console -- live --store
.runtime/resident`. Recorded; under the operator's decision of the same day
the app is not wired to core, so no member of this workstream reads the
descriptor or the loopback, and the question is closed rather than carried
(D14). **8** (the corrected subject and the run's routes) is this pass's
subject; core ranks nothing and files nothing for the DotLn-Angular work,
and the fork's request route stays the paste until WO-193, with ideas for
core as GitHub issues on the platform's repository (D16). Nothing in core
blocks WO-007 or any order filed here.

## 8. The register

Twenty-three pending rows read at revision `786352ff…`. Dispositions applied
in one batch after `followups --sync` minted the rows of §10:

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-ac2bff24bf9b8bae | C4 of 2026-10-23 (take the fix) | settled: #23 took starter v0.94.0; `plan check` passes on `main` (D1) |
| FUP-3ffd3702c8425fd4 | C3 of 2026-10-23 (the UX ideation) | settled: the operator's run is the research and its designs are the orders' sources; no ideation runs (D2, D17) |
| FUP-52178afa5a081d86 | WO-006-D022 (the ideation half) | settled: the same; the persistence and isolation halves were WO-007 and WS-001 already |
| FUP-a67e7d4b53614f6c | C5 of 2026-10-23 (the live view's token and resident) | declined: core answered the question and the operator decided the app is not wired to core (D14); reopens if the operator wires the app to a resident |
| FUP-2af7f27fd0e0fe34 | C1 of 2026-10-21 (the live view) | declined: the same decision; the machinery view over the app's own data is the facet (WO-016); reopens if the operator asks for live platform status in the app, which the mining store would have to carry |
| FUP-d50229455aad453c | C2 of 2026-10-21 (the command surface) | declined: the app writes no control record and performs no effect; promotion is a GitHub issue; reopens if the operator decides the app may issue commands |
| FUP-deccd7ed510d2b77 | C3 of 2026-10-21 (the pattern workshop) | allocated to WO-016: the drop on an agent and the redrawn use case are the seeing half; the compiled diff stays core's |
| FUP-ba9813e8b2705de8 | WO-006-D005 (grouping before a second app) | allocated to WO-013: the operator's decision answers it (one app, sub-apps as feature libraries, rule 22) and WO-013 confirms it by the generator log |
| FUP-4c3c0351adc4c2cc | C5 of 2026-10-19 (a Preflight-token check) | settled: starter v0.94.0's `work-orders index --check` resolves each open order's Preflight tokens |
| FUP-1f5953e14b1077b4 | C6 of 2026-10-21 (the readable work view) | deferred: reopens when WO-016 merges and the operator asks for the work view over the app's own data |
| FUP-70df0fbdafe8c2d6 | C4 of 2026-10-21 (the arrival screen) | deferred: reopens when the mining store carries status (the live view it waited for is declined) |
| FUP-64fb4e3de04debbe | C5 of 2026-10-21 (counterfactuals and QA) | deferred: WO-015's trials and WO-017's flips are the first counterfactuals; reopens when both merge |
| the other eleven | WO-004-D010, D013; WO-005-D009, D011; WO-006-D014, D015; WO-012-D008; C2 of 2026-10-19 and C2 of 2026-10-23 (host rules); C1 of 2026-10-21 (the Entropy Reducer); C1 of 2026-10-23 (the house library pass) | left as they are with their conditions unchanged |

## 9. Orders filed and amended, and the sequence

WO-007 is amended on its base (D3) and WO-008 amended (D4); WO-013 to WO-018
are filed with provisional bases (D5 to D10); the sequence reads WO-007,
WO-013, WO-014, WO-015, WO-016, WO-008, WO-017, WO-018, serial (D11). WS-001
carries the members, the typed edges, rules 22 and 23, §The app and its
sub-apps and §The operator's model (D12). The profile carries the restated
subject and the board's data path. The operator record carries D15.

### 9.1 Receipt 007's known issues on WO-007, disposed

(a) criterion 5 asserts the worker file absent from the production output
and present in the `mocked` output; (b) the `mocked` configuration exists
and the e2e runs against it; (c) the hygiene check reads every non-spec file
that dispatches and the interceptors' and `ErrorHandler`'s flows are
admitted; (d) criterion 1 refuses the standalone `event(` creator outside
`events`; (e) criterion 7's grep is scoped to browser sources, excludes
config files and the e2e project and covers bare specifiers and dynamic
`import('node:`; (f) three degradation specs and `StorageToken` bound in
`data-access`; (g) the awaited start with the fallthrough and the recorded
run with the worker removed; (h) superseded: no console token exists, and the
base-URL interceptor's spec covers the absolute-URL case; (i) no waiver: the
fix shipped in v0.94.0 and #23 took it; (j) "across reloads on the same
origin".

### 9.2 Known issues from this pass's receipt, by order

The refutation (§14) returned `aligned-with-findings` with twenty-four known
issues and no hold; WO-008 is carried by hash. The seven judged orders are
frozen at the judged subject, so the pass that follows WO-007's merge (the
pass that sets WO-013's base) amends them for these and pays its refutation
then; they are listed here so nothing is re-derived, and an executor who
activates an order before that amendment meets each inside the order's
authority and records it in the decisions file. The receipt's reopening
observations are on the receipt.

- **WO-007.** (a) In production the board shows the unavailable state until
  the mining store's API exists (candidate C1), while the bundled sub-apps
  work; the pass that files C1 decides whether the production build falls
  back to the recorded board meanwhile, and the operator plays on the
  `mocked` configuration until then. (b) Criterion 2 should require the
  hygiene exception count to be 0, as the design says. (c) Steps 15 to 17
  carry three intervention paths (the terms re-run, the operator's `!`
  fallback, the product-gate correction) that every later member copies;
  core's candidate for the final-review row would remove the third. (d)
  Five amending passes and three refutations before activation: no further
  pass amends WO-007's text before it activates.
- **WO-013.** (a) The dependency on WO-007 is merge ordering, not a
  functional need (the menu template injects nothing and the arriving pages
  have no store); the reason line should say so, and a lane pair with WO-007
  stays open to a later pass. (b) "Sub-app" names both a menu group and a
  feature library; the twin sits under the Machinery group; the convention
  documents should define the two words apart.
- **WO-014.** (a) The catalog is bundled JSON while the board is HTTP: two
  data paths until C1 states the rule. (b) Twelve workers sit at the cap
  with no slack for the reruns step 7 requires; a rerun is a resumed
  worker or the cap is read as twelve plus reruns, decided before the
  first spawn. (c) Criterion 3's three-typed-tools-per-work quota can be
  met by force-fitting a transform; the checkers' observability question is
  the counter-pressure.
- **WO-015.** (a) A typed tool whose transform kind the engine does not
  interpret (nine of fourteen kinds) needs a visible refusal with its
  reason on Apply. (b) `SceneClock`'s virtual driver says it is shared
  with WO-016's replay, which lands later; WO-016 lifts the virtual driver
  into `libs/shared/replay` or WO-015 ships it there first. (c) The
  observed gap lists fifteen first-scene ids and the rail says ten; the rail
  selects by the catalog's first-scene set, named by id in the decisions
  file at activation, since the map lines may move.
- **WO-016.** (a) Only `addWait` changes the use case's beats; the other
  mechanism changes redraw the agent's card; the facade spec and criterion
  7 should name what each change shows in the use case, and the caption
  should say when the beats are unchanged. (b) Criterion 3 hard-codes
  starter v0.94.0 and the stamp counts 19 and 13; the executor reads the
  counts from the launchpad's role files at activation and records the
  starter it read. (c) "Scene" is overloaded across the records fold, the
  scene engine and the catalog's scene types; a rename of the records types
  (`ConcertScene` to `OrderStrip`) is the cheapest fix.
- **WO-017.** (a) A variant with every duration at zero scores best on all
  three result figures, so results alone cannot tell a faithful twin from a
  trivial one; the pass that amends it adds the figure the operator wants
  for that (the recorded lane as a reference, never a score, is the
  operator's rule; the open question is which result penalizes firing
  before the operator would have read). (b) `BasePaths.Twin` needs a
  `routePermissions` entry and a signed-in e2e path under WO-008's guards.
  (c) `twin:check` must fail, not pass vacuously, when the base commit is
  absent.
- **WO-018.** (a) The map rows carry the fields WO-014's allow-list refuses,
  in the directory WO-014's check scans: the map files need their own
  directory and schema under `check-map.mjs`, outside `check-catalog`'s
  scope, by a recorded decision. (b) The toy-source tools (`map: null`)
  fail `tool-v0`'s required `map` and the row-count rule: the schema takes
  a `provenance` discriminator and the count rule applies to mapped works
  only. (c) Criterion 3 of WO-014 and criterion 4 of WO-015 say "six
  works"; WO-018 regenerates `catalog-summary.json` and the scene rail's
  assertion reads the works from the summary. (d) "Never a passage" gets a
  mechanical word-run overlap check against the recorded text. (e) Twelve
  workers at the cap with no slack for the mapper's rewrite, as WO-014.
- **The record-path advisory (all orders).** After the receipt, `plan check`
  prints eleven advisories: the kit's own launchpad evidence paths in
  WO-007, WO-008, WO-014 and WO-018, and three fixture names that carry a
  platform order id (`segments/WO-221.json`, `segments/WO-226.json`,
  `wo-221-derived-v0.json`) in WO-016 and WO-017. The fixture names are
  the question for core (§11 item 1): if the target's outward lint reads a
  committed file name as an identifier, the executor names the fixtures
  `order-221` and `order-226` by a recorded decision and the criteria that
  name them are amended by the next pass.

### 9.3 The six orders at a glance

| Order | What lands | Design file (SHA-256 prefix) | Fan-out |
| --- | --- | --- | --- |
| WO-013 | the sub-app menu, `/scene` and `/machinery` arriving, rule 22, two documents | forward §2.0 `c05dea11…`; README `4810fd33…` | none |
| WO-014 | the `Tool` schema, 3,463 rows typed, the allow-list check, the catalog library and browser | captures `7cc9b2c0…`, `1686ea50…`; design B §2.1 `aab22ca1…`; maps README `9b6c905f…`; queue §1.2 `b60a7607…` | at most 12 |
| WO-015 | the scene engine, the 2D canvas behind the seam, the rail, RTS selection, flock, arrive, formation | design B `aab22ca1…`; capture `7cc9b2c0…` | none |
| WO-016 | the machinery view over the six-field copies, records and replay, the idea sink | design A `70d14655…`; UI vision `d3bbf3a2…`; forward §2.0 `c05dea11…` | none |
| WO-017 | the twin's patience lane, variants as code, the result fold | design C `22ee5688…` | none |
| WO-018 | The Art of War mapped and typed, six toy records, the toy shelf | queue §1.2 `b60a7607…`; maps README `9b6c905f…`; README `4810fd33…`; toys `411e486e…` | at most 12 |

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The mining store and the app's own HTTP API: a store the app fills
  from public sources (the run's maps are not public; the first public source
  is WO-018's text), served through `GET` routes the catalog loader, the
  board, the records and the toys read, replacing the committed data files
  and the stopgap copies of WO-221 and WO-226 (the operator's decision of
  2026-10-24).** Reopen when WO-018 merges and the operator names the next
  public source, or when a stopgap copy limits a toy; then it is filed as
  one order with the example API member WS-001 proposes.
- **C2 The Babylon.js painter behind the scene's renderer seam, with a
  dependency decision record, a notices entry and a measured lazy chunk
  (the operator's decision: 2D first, Babylon.js later).** Reopen when
  WO-015 merges and the operator asks.
- **C3 manim in the monorepo, as a non-TypeScript library beside the toys
  (the operator's decision of 2026-10-24).** Reopen on the operator's word.
- **C4 The graduation route from the app: a toy's card exported as the body
  of a GitHub issue on the platform's repository, filed by the operator from
  the app or the sink, never as a control record.** Reopen when the operator
  promotes the first idea; then it is a small utility order under Tools.
- **C5 The run's remaining toys as later members, each in its design file
  by id: the blackboard room and the fleet (design A), the commander, the
  heat map and the toolbox loop (design B), the fidelity grid, the blind
  replay and the ring (design C), the shelf, the did-not-stick table, the
  phrase shelf and the ladder replay (design D), the walk, the constraint
  ribbon, the rope and the return (design E).** Reopen when the operator
  plays with the first sub-apps and picks the next toy from the shelf
  (WO-018); then one order per toy or per design's slice, as the operator
  says.
- **C6 The twin's later lanes: the grid over a dozen orders, the operator's
  own blind replay, the ring over replayed windows, each judged by results
  under the rule WO-017 sets.** Reopen when WO-017 merges and the operator
  names the lane.
- **C7 The v0.94.0 record-path advisory: `plan check` advises renaming a
  target order's launchpad evidence paths (`host-qualification.md`,
  `preview-pr.json`, `RELEASE-NOTES.md`) because they carry the order id;
  this pass keeps the kit's own paths and asks core whether the advisory
  means target-side paths only (§11 item 1).** Reopen when core answers;
  then the orders' known issues are amended or the files renamed by the
  executor.
- **C8 Moving the actor board under the machinery sub-app's routes
  (`/machinery/board`) with a redirect from `/board`, once WO-016 lands
  `/machinery` and the operator wants one home for the view of DotLn's
  machinery.** Reopen when WO-016 merges and the operator asks; then a small
  order or a step of the next machinery member.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged except where §8 says
otherwise: CI on the fork, required approvals, retitling the two published
`DotLn` Releases, a lane pair of small self orders (the main-rules pass's
C2 to C5), the workstream pass's C1 to C10 (typed translation keys, the
WoW tooling app, the example API and a real identity provider, production
environment, one word that runs the queue, kit gaps, an issue-filing helper,
orders spanning repositories, a second feature by convention), the Entropy
Reducer on WS-001's repositories, the house library's granularity pass (C1
of 2026-10-23) and the literal host-rules self order (C2 of 2026-10-23).

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning
session; the fork's next pass reads the answer. Each item names the record
it rests on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its planning pass of 2026-10-24 on starter v0.94.0 (docs/planning/mining-run-orders-2026-10-24.md §4, §6, §7 and §11), answering your pass of 2026-10-24 (intake-mining-run-routing-2026-10-24.md §9 and §10, read from your local planning branch at f33cad53 and acd1c94f because GitHub had no such commit at 04:54Z on 2026-10-24; confirm the branch merged). Read each against the record it names; file, decline or defer each with its reopening condition.

1. Question: at v0.94.0, npm run plan -- check prints eleven advisories on the fork's eight open orders: the kit's own launchpad evidence paths (docs/evidence/WO-NNN/host-qualification.md, preview-pr.json, fan-out.md, docs/final-reviews/WO-NNN/RELEASE-NOTES.md) named in execution plans, and three fixture file names in the target that carry a platform order id (segments/WO-221.json, segments/WO-226.json, wo-221-derived-v0.json, the scrubbed copies of your public segments), each with the advice to rename the file before a draft publish meets it. The target publish refuses launchpad identifiers in the target's branch, commits, title and body (WO-227). Two questions: is the advisory meant for target-side paths only, or should a target order's launchpad evidence files be named without the order id; and does the outward lint read a committed file name such as WO-221.json as an identifier, or only the branch, the messages, the title and the body? The fork keeps the kit's paths, tells its executors not to name them in the body file, and carries this as candidate C7 until you answer.

2. Confirmations in the field at v0.94.0: the update took 118 replaced, 4 added, 0 removed, 0 refused, 873 unchanged kit files with no conflict and no re-emit drift; npm test 7 passed; npm run test:docs 14 passed with plan and plan-refutation-current green for the first time since the fork's WO-006 records moved (your item 1, WO-219-D061, confirmed); plan check on main reads the 2026-10-23 receipt's subject intact; launchpad verify 995 files at 49d8c4c3; update --finish advanced main and bootstrapped (your WO-226 route, second use).

3. Item 4: npm run plan -- conditions --slow prints an empty measurement table at v0.94.0 (0 holds, 0 unknown, 125 decision conditions and 64 register rows not evaluated); the gate's own summaries read 16.58 s and 15.95 s wall with 0.1 s of lane wait and the plan task under one second. Is the slow probe expected to print gate rows for an instance after WO-219's filter by known sources, or is the gate summary now the instance's only reading? No ask beyond the answer.

4. Item 7 recorded: the browser never reads console-loopback-v1.json, the shell's local host hands the connection, an export's resident runs on the carried runtime. Under the operator's decision of 2026-10-24 (your §10 D4) the fork's app is not wired to core, so no member of WS-001 reads the descriptor or the loopback; the fork's live-view and command-surface candidates are declined, not deferred, and WO-007's board route is the app's own API with uifa-board-v1 kept as the response shape (the kit schema's digest 7d20e785… verified at v0.94.0). The question is closed on our side.

5. Item 8 done: the fork cut WO-013 (the sub-app shell and menu), WO-014 (the toolbox catalog pipeline, at most twelve workers checkpointed per map), WO-015 (the soldier scene, 2D behind a renderer seam), WO-016 (the machinery view over six-field copies of your public WO-221 and WO-226 segments at 49d8c4c3, with a local idea sink into the target's ignored intake), WO-017 (the digital twin's patience lane, judged by results, variants kept as code) and WO-018 (The Art of War mapped from its public-domain text and toys as records for six sources), sequence WO-007, WO-013, WO-014, WO-015, WO-016, WO-008, WO-017, WO-018, each naming the run's design file by path and SHA-256 and copying nothing beyond ids, short titles and generic terms. Nothing is asked of core for this work; graduated ideas arrive as GitHub issues on DylanBWood/DotLn, and the paste stays the fork's request route until WO-193.

6. WO-221 re-derived from your public segment at 49d8c4c3 for the twin's first lane: 16 rows, 8 operator rows, seven gaps after a hand-back of 87.8 (after ImplementationReady, no verdict), 109.9, 1.7, 1.4, 2.1, 18.2 and 5.9 minutes, 227.0 waiting minutes, a 1,110.3-minute span; WO-226: 6 rows, gaps 316.0 and 31.7. Recorded so your record and ours agree; no ask.

7. Acknowledged: items 2, 3, 5, 6, 9; WO-224 queued third; WO-193 awaited for the typed request channel.
```

## 12. Write-backs

- `docs/work-orders/WO-013-sub-app-shell-and-menu.md`,
  `WO-014-toolbox-catalog-pipeline.md`, `WO-015-soldier-scene.md`,
  `WO-016-machinery-view.md`, `WO-017-digital-twin-patience-lane.md`,
  `WO-018-art-of-war-map-and-toys.md`: filed (D5 to D10).
- `docs/work-orders/WO-007-events-stores-data-access.md`: rewritten on its
  base (D3).
- `docs/work-orders/WO-008-authentication-and-permissions.md`: the carry-in,
  the advisory, the sequence position (D4).
- `docs/planning/sequence.md`: the eight entries, serial (D11).
- `docs/workstreams/WS-001-dotln-angular.md`: restated (D12).
- `docs/product/purpose.md`: the product paragraph restated (D12);
  `docs/control/doc-ceilings.json`: the ceiling at the measured bytes plus
  one tenth.
- `docs/repositories/dotln-angular.md`: the subject, the data path, the
  members, the schema's kit provenance.
- `docs/operator/README.md`: the dated bullets of D15.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path, the
foundation where a feature is added by convention, now carrying the
operator's sandbox: six orders cut from the operator's own designs, each
buildable on the workspace as it is, each reversible by deleting its
libraries, route, enum member and i18n block, placed so the operator sees the
menu, the catalog, the scene and the machinery view before authentication
and the twin (D5 to D11); WO-007 unblocked and repaired (D3); the kit's fix
taken first (D1); the clean room for mined data made mechanical where a
slip would matter most, the catalog (D6); core asked one question, not
eight (D16). What the pass refuses to do: redo the operator's research,
re-rank their designs, open a quarantine file, commit a definition or a
design paragraph from intake, wire the app to a resident the operator has
ruled out, or read the operator's hold as anything but a hold. What stays
manual by the kit's design: the merge of this pass, the worktree starts, the
resume phrases, the paste to core, the idea sink the operator runs when they
play. Lenses that changed the plan: seeking the wrong goal (the twin's
fidelity cell replaced by the result fold the operator asked for); shifting
the burden (the pass placed the sequence instead of asking which first, and
read the record instead of asking what a design meant); the fixes-that-fail
trap (a worktree's ignored intake as the home of designs, which the close
deletes; toy records and a sink into the repository instead); the operator's
own trap, acting before understanding (three holds honored; the withdrawn
prompt kept, not acted on). The outcome matched the aim as read at entry and
restated by the operator: the update first and merged, the pass on the new
kit, core's answers read, the six orders cut and sequenced, nothing
re-researched.

Cost: no research workers; one refuter (§14: 765 s of worker time, 248,577
worker tokens, 18 tool uses; 17.4 minutes from dispatch to the filed
receipt); the preview 0.2 s; the four gates of the update about 31 s of task
time; the plan-start, failures and conditions reads under 2 s; the
re-derivation scripts under 1 s; `npm run meta -- --plan-cost` recorded the
table after the subject commit; the handoff reading of process cost is in
§14 and the pull request. Document
ceilings: `docs/product/purpose.md` is restated; its ceiling is set in
`docs/control/doc-ceilings.json` at the measured non-exempt bytes plus one
tenth, citing this document (§14 records the figure); the kit's product
documents are kit files and carry no instance ceiling.

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.

Results at the subject commit `ae935a9` (cost table) over `1e88694` (the
subject): `npm run meta` no budget breach (operator directions 4, up 3);
`followups --sync` minted eight rows (§10's C1 to C8, revision
`8d84796d…`) and `--apply` took twenty dispositions in one batch from a
contained ignored file (the twelve of §8 and the eight deferrals; register
revision `ff3e299d…`; 31 pending rows); `work-orders index --check` PASS
(both pages current) after the eight-entry sequence; `lineage index`
regenerated and current; `docs-check` PASS (1 product document at 2,095
non-exempt bytes under the new 2,305 ceiling; 10 declared historical link
occurrences, 1 declared home-path line; one pre-existing advisory on a filed
record; one advisory on this document's quoted operator words repaired by
paraphrase before the commit); `publication:check` reporting no editions
declared; `plan check` failing before the receipt only because the new dated
heading needed one, and passing after it with eleven record-path advisories
(§9.2). The document gate before the receipt was not run, so the refuter's
reads met no live gate; after the receipt `npm run test:docs` is 14 passed,
0 failed, 16.19 s of wall-clock, 14 fresh tasks, 0.1 s of lane wait behind
checkout unknown.

Refutation: one fresh `dotln-worker` (the default type; the dispatch line
named no Fable worker; the host read back `claude-opus-5-5` to the worker
and no effort) on the canonical prompt from `npm run plan -- refute` at base
`ae935a9`, default pass scope (WO-007 and WO-013 to WO-018 plus the
sequence; WO-008 carried by hash), dispatched at 05:42:42Z. The worker
returned its judgment and statement in its final message, as briefed; the
parent saved them as ignored local files and filed the receipt. Receipt
[`2026-10-24-planning-45059c186a40389b-008`](refutations/2026-10-24-planning-45059c186a40389b-008.md),
verdict `aligned-with-findings`, 0 holds, 24 known issues (§9.2),
dispatch-to-file 1,044,393 ms (17.4 minutes; the worker's own run 765,053 ms,
248,577 tokens, 18 tool uses). The worker's statement names what it read: the
whole prompt; the sequence; WO-013 to WO-018 in full; WO-007 in full through
the host's saved copy of a `cat` output outside the repository, which it
disclosed; four passages of WO-008; the six role skills' first lines for
the stamp counts; `UPSTREAM.md`'s tag; read-only Git listings; no planning
document, receipt, intake, operator record, ledger, decisions record,
workstream file or other order; no kit, npm, network, model or agent
command; no write; no hook refusal. The judged, committed and workspace
subjects agree (`sha256:6e10fe61…` at `ae935a9`). The receipt helper
committed the receipt pair (`377f397`) and ran the plan gate green.

Process cost at handoff (`node scripts/harness.mjs usage <session>`,
source `claude-transcript-message-usage`, scope `dispatch`, observed
2026-10-24T05:59:22Z): 14,397,508 total tokens (1,078 input, 13,526,641
cached input, 599,319 cache-write, 270,470 output; reasoning tokens and
cost unknown, the counters unavailable); 116 steps, 110 commands; 1 of 20
subagent admissions used, exact-observed, none unresolved. The fan-out
matched the plan stated in §1: one refuter, no research workers, no
descendants. The outcome matched the aim as read at entry and restated by
the operator: the update first and merged, the pass on the new kit, core's
answers read, the six orders cut from the operator's own designs with
nothing re-researched, the sequence placed, the holds honored.
