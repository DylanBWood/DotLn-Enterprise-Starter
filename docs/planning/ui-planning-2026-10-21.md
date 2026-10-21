# The UI: WO-006's base, the house component library over Angular Aria, and the actor board as the console's first screen, 2026-10-21

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-21 at 04:09Z (the
evening of 2026-10-20 for them) naming the UI planning pass the two previous
passes had scheduled, and gave eight directions while the pass ran: read
the product from the DotLn platform's own records (its private intake, its
idea ledger and its product pages) through research fan-out rather than
asking them to restate it; split that intake across several agents; a note
that WO-012's release close had run before `node scripts/bootstrap.mjs`;
that DotLn is a platform whose UI spans the orchestration view and the
platform's loadout authoring, inspection, preview, counterfactuals and QA;
that the console sits over `uifa-board-v1`; and the vision and genesis of
the UI (a UI that makes the platform better and shows the agents' work
intuitively as they run more freely; the earliest idea being the leadership
and personal-development book shelf overlaid on real agents to see how it
changes their behavior). Every message is captured verbatim in ignored
intake (`docs/intake/notes/planning-ui-2026-10-21.md`, SHA-256
`58478e8d07e3a40ac562f408e513e575d99702d9d3545dab5e940144c77d0b56`), a
sibling record, never a source to copy from. This document is planner
synthesis of that capture, this instance's records (the four previous
planning documents and their receipts, WS-001, the operator record, the
profile, WO-005's moved decisions in DotLn-Angular), the research reads of
§4, the board this launchpad renders, and the public vendor facts of §4.
The clean-room screen found the operator's own repositories, public
packages and public documentation; the platform's private intake was read
in paraphrase only and nothing from it is quoted here; the research reports
flagged the employer references, account identifiers and absolute paths
they met by file and line, and none reached a committed surface. The one
private identifier the pass handles on purpose is the home-directory name
inside six absolute paths the board's JSON carries, which WO-006 scrubs
before a fixture lands in the public target (D3).

Entry was clean `main` at `a9f8ed3` (WO-012's records merged as #18 at
04:00:57Z), WO-001, WO-003, WO-004, WO-005, WO-009, WO-010, WO-011 and
WO-012 closed, no active order, `v0.3.3` the latest tag on `origin` with its
Release `Launchpad v0.3.3` published at 04:04:31Z, and DotLn-Angular's
`main` at `5102783f` (WO-005's merge, pull request #3 of 2026-10-20). The
pass runs on `planning/2026-10-21-ui-planning`, created by `plan start`;
only the parent writes this checkout. Fan-out plan, stated before the first
spawn against the cap of 20 (admissions observed at entry: 0 of 20, exact):
four research workers at first (the product pages, the private intake, the
ledger and planning documents, the vendor facts), seven more when the
operator asked for the intake to be split (four date ranges of notes, two
over the chats, one over the images and the founding-drawing records), and
the planning refuter (§14): twelve `dotln-worker` agents, no descendants.

Process cost at entry (`node scripts/harness.mjs usage <session>`, source
`claude-transcript-message-usage`, scope `dispatch`, observed
2026-10-21T04:09:45Z): 90,633 total tokens (4 input, 67,454 cached input,
22,452 cache-write, 723 output; reasoning tokens and cost unknown, the
counters unavailable).

Aim, as read: WO-006 made activatable (its base, release header, typed edge
and publish spelling), the component vendor settled from the operator's
direction of 2026-10-20 and today's facts, and the UI planned as the DotLn
console the platform's records already describe, with the first screen cut
into WO-006 and the road after it recorded. Traps named before the material
choices: asking the operator to restate a product their records carry
(answered by the fan-out, §4); taking the fork's own purpose sentence as
the platform's identity (the platform's records say agentic platform and
console; D7); choosing a vendor the operator's own condition excludes
(D2); keeping a placeholder feature the product never asked for because it
was filed first (D3); growing WO-006 beyond one outcome (the board renderer
replaces the tile grid at the same size; the console's other facets are
later members, D5); reading a research worker's report that a slice of the
intake never says a thing as a finding against the fork's own dated capture
(both stand, with their dates; D7); and repairing a close that is already
complete (D12). The
NoOp at entry: WO-006 cannot activate (no base, no header, a vendor its
Design names that fails the operator's condition), the console has no
recorded first screen, and the operator's directions of today stay in a
transcript.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `a9f8ed3`, clean; `v0.3.0` to `v0.3.3` tags; the fork's `origin` is `dylanwoodconsulting/DotLn-Enterprise-Starter`, `upstream` the starter | `git status`, `git tag`, `git remote -v` |
| WO-012 | phase `closed`, VER-001 and FINAL-001 `pass`, latest attestation claude-code 2.1.305 / claude-opus-5-5 / max; legal next actions `release-close, next, activate` as after every close since WO-011 | `npm run resume -- status --json`; `git show 60a1a76:docs/control/current.md` |
| WO-012's close | tag `v0.3.3` at `a9f8ed3` on `origin`; Release `Launchpad v0.3.3` published 04:04:31Z; no worktree, no `wo-012` branch; the retained record complete (§6 D12) | `git ls-remote --tags origin`; `gh release view v0.3.3 -R dylanwoodconsulting/DotLn-Enterprise-Starter`; `git worktree list`; `docs/control/local/retained/WO-012/` |
| DotLn-Angular | `main` at `5102783f` (#3, 2026-10-20 16:55Z); Angular 22.2.3, Nx 23.3.0, TypeScript 6.0.3; `libs/shared/{core,i18n,utils}`, `apps/dotln` with one placeholder page, `tools/` with the structural checks and lint fixtures | the operator's clone; `package.json`; `eslint.config.mjs` |
| `plan failures` | window since receipt 005: 0 failed verifications, 0 repairs, 2 amendment rows (both `WO-012-D004`, the previous pass's binding recorded twice at 02:56Z), 1 order made ready; record: 1 failed first verification in 8 closed orders | `npm run plan -- failures` |
| `plan conditions` | 1 hold, `gate-task:target-worktree` (444.3 s against a 38.6 s median of one sample; the previous pass's D10 reading stands, D9); 10 unknown (core condition sources absent); 99 decision conditions and 41 register rows not evaluated | `npm run plan -- conditions` |
| Register | 16 pending rows at revision `56565a99…`; three name WO-006 by text (`followups --touching`); two fire on this pass (FUP-854bc432690eb6fd, FUP-6d2755b3ac7c8ab9) and four lint rows fire on the first order that edits the lint rules (§8) | `npm run plan -- followups --export`, `--touching WO-006 WO-007 WO-008` |
| The board | `node packages/console/dist/src/cli.js board --json` renders this launchpad's board: `uifa-board-v1`, fidelity `lossy-read-only`, 5 panels, 5 role answers, 21 sources (8 available, 13 unavailable), 91 evidence entries, 359,857 bytes; six absolute local paths in its sources; the Work panel's `orders` section unavailable (`control unavailable`) | the bounded probe of §4 |

## 3. Reopening observations

The deferred rows whose conditions open on this pass: FUP-854bc432690eb6fd
(the UI planning pass before WO-006; its base, release header, typed edge
and vendor) and FUP-6d2755b3ac7c8ab9 (WO-005-D006: reconcile the PrimeNG
assumption with current licensing and the operator's preference for a
house-owned component library, evaluating Angular Aria) fire now and are
settled by D1 and D2. FUP-a4dd921172ce3900 (WO-005-D022, the duplicate
type-name check, reopening when the UI pass amends WO-006), FUP-c3840fd4fef3f7bc
(WO-005-D021, the import-order rule), FUP-cb62c2b6f12d44ae (WO-005-D020,
the inline-template rule) and FUP-0dab0b63b20fae7d (WO-005-D008,
`prefer-readonly` effective) open on the first order that edits the lint
rules; WO-006 is that order, and D1 allocates them to it. The timing hold
on `gate-task:target-worktree` rests on the same two samples the previous
pass read (one fresh target-worktree task of 444 s against a one-sample
median) and stays a NoOp with its condition unchanged (D9). No other
deferred row's lifecycle condition fired on WO-012's close.

## 4. Observations, dated 2026-10-21

Eleven `dotln-worker` research reads, each written to session scratch and
returned in full; nothing from the platform's private intake is quoted and
every report flagged the private material it met by file and line.

**The platform's product pages** (DotLn `docs/product/04-interfaces.md`,
`06-roadmap.md`, `12-workstream-application.md`, `13-uifa-roles.md`,
`packages/console`): the terminal is complete and the console equal, both
running the same commands against one state machine; several UI hosts may
coexist over one projection contract (an Angular shell as the conventional
candidate, Babylon.js the spatial one), none owning a second state machine;
console v0 is the actor board (UIFA v0), a read-only projection with five
panels (Actors, Builds, Mechanisms, Work, Blueprint), each naming the UIFA
roles it serves and the question it answers, exported as `uifa-board-v1`
(a 316-line schema: six required top-level properties, exactly five panels
and five role answers, eight definitions, every object closed; cell states
`known`, `unknown`, `unavailable`; section and source states `available`,
`unavailable`; links are `{label, target}` to local ids); console v1 is the
Angular shell in the operator's consumer rendering those actor panels;
command invocation goes through the parity contract (`console-commands-v1`,
24 identifiers over a loopback socket bound to the local user with a bearer
token and local origins only), which excludes `console board`; the board
reaches a host as `board --json`, as the static `--html` page or by
importing the pure `projectBoard(sources)`; `runtime-status-v1` is the
resident's atomic status file (actors, live episodes, presence, holds,
budget, open orders) read by the text host; the design direction is a
glyph grammar (motion means transition, accessibility first, CSS never
decides behavior, no utility-class strings in domain state), native emoji
first, skins as labelled lossy projections, semantic zoom, preview never
install, an RPG and Path-of-Exile skin as the default later, and an arrival
screen that answers what changed since the last visit, what is in progress,
what needs a decision and what can continue under existing authority. The
stale statements the worker found (version lines, a component version in
the console README, two cut orders cited in product 13) go to core in §11.

**The platform's idea ledger and planning records**: the adopted decisions
that bind this pass, in paraphrase with their dates. 2026-08-31: plural UI
hosts share one projection contract; the operator-fluent Angular setup is
an evaluation baseline, not a pre-selected stack. 2026-09-04 and 2026-09-05:
the interface is named for actors (UIFA, "user interfaces for actors"), a
human discipline with five roles (product lead, showrunner, engineer,
tester, devops); DotLn is an agentic platform, not agent orchestration.
2026-09-06, operator-directed: console v0 is UIFA v0, the actor board, with
the showrunner's work-order board as one panel; the Angular repository's
first change is an actor view, not a phase table; DotLn-Angular has three
purposes (the architecture exemplar, the proof that an instance builds
another repository, a console for DotLn). 2026-09-08, operator-directed:
target-application orders live in the forks; the runtime's UI is contracts
in core and hosts in the forks; the always-on runtime carries the UI to
author, inspect and audit, live agent status and work-order status.
2026-10-11 and 2026-10-13, operator-directed: four repositories, four jobs;
the console sits over `uifa-board-v1`; early Angular work is foundational
and visual output verifies; the ledger's adopted entry that a DotLn UI comes
soon from the fork's own Angular orders, once the instance can publish
target orders (core's WO-210, closed at v0.82.0); the operator uses the UI
to understand DotLn; Angular work pays
its own tests. 2026-10-19: the fork's request for session and order status
with a direction channel is deferred in core until WO-193 lands or the fork
files its console order. Core has no seed set of Angular orders and files
no target-application order; its WO-080 (queued) adds a Workstreams section
to the board's Work panel additively; its framework decision for the
console waits on the shell's evidence; a browser cannot open the user-bound
loopback socket and no bridge is recorded.

**The platform's private intake** (165 notes, 25 chats, 49 images; eight
workers): the operator's own words, paraphrased by date. August 2026: the
terminal as the only interface at first; a dashboard of work in flight that
must work offline; a UI for managing agents with user experience first; a
prototype that showed every agent on one model while the bill showed
another, so the UI must show the true model; a deliberately silly,
approachable UI of minis you drop book ideas onto, with each effect made
clear; keep the business, leadership and Japanese terms and present them
RPG-style with many equivalent representations; Path of Exile links as the
final piece; every behavior with its opposite; operator presence and absence
as a state the system tracks. September 2026: flow over babysitting; a
readable list of work orders with order, dependencies and status, not a
dense table; parallel lanes and their capacity; live context, subagent
progress, model and effort readouts at all times; costs that are measured,
never invented; the Protíno idea (type to a small world of agents and watch
behavior change); UIFA named and its five roles; the runtime with its UIs
on the critical path; a webpage, Electron or whatever is fastest with 3D as
open questions; no fixed widths on an ultrawide display. October 2026:
weeks without a UI; the five-repository win condition; the operator uses the
UI to understand DotLn; foundational first, visuals verify, and whichever
slice comes first is acceptable; a draft pull request at verified; no
agent-orchestration as the product's name. What the intake does not settle:
browser versus desktop host, remote or multi-device access, authentication
for the console, whether the UI merges, and what "check in on a running
session" means beyond reading status. The images hold no UI drawing: they
are book pages, leadership-ladder and control references, and two
screenshots of the operator's own pull-request list; the founding-drawing
records are a remining pass, not a drawing.

**Vendor facts** (registry, angular.dev, primeui.dev, GitHub, all read
2026-10-21):

| Item | Observed | Consequence |
| --- | --- | --- |
| `@angular/aria` | 22.2.3 (2026-10-14), MIT; stable since v22 per the roadmap and the v22 release page; peers `@angular/cdk 22.2.3` exactly and `@angular/core ^22 \|\| ^23`; eight patterns with test harnesses (accordion, combobox, grid, listbox, menu with menubar, tabs, toolbar, tree); no dialog, tooltip, radio group or toast; popups positioned by the CDK overlay in its own examples; the application owns markup and styles; last breaking changes in 22.0.0 (2026-06-03); 13 open labelled issues, two tabs bugs open | D2: the behavior layer; tabs is the representative component |
| `@angular/cdk` | 22.2.3, MIT; unstyled `Dialog`, `cdk/menu`, `cdk/listbox`, `FocusTrap`, `LiveAnnouncer`, overlay over the native Popover API | D2: overlay, focus trap, announcer and dialog beside Aria |
| `@angular/material` | 22.2.3, MIT; built on the CDK, no Aria import | declined, D2 |
| PrimeNG | 22.1.3 (2026-10-20) under the PrimeUI License with a license-key manager; the Community License is conditional (seats, revenue, capital), renewed yearly, and bars redistribution as a component library; last MIT release 21.1.10 peers Angular 21; `@primeuix/themes` 3.x and `primeicons` 8.x the same | declined, D2 |
| Angular | 22.2.3; Angular 23 scheduled about June 2027; v22 active until 2027-06, LTS until 2028-06; zoneless default; signal forms and the resource APIs stable since 22.0 | house rule 1 holds |
| `@axe-core/playwright` | 4.14.0, MPL-2.0; tags `wcag2a` to `wcag22aa`; the one WCAG 2.2 rule (`target-size`) is disabled by default | WO-006 step 12 adds the notice; criterion 6 keeps the tags |
| Headless alternatives | ng-primitives 0.131.x (Apache-2.0), Spartan brain 1.8.0 (MIT, Tailwind peer), radix-ng 1.2.1 (MIT) | not chosen: Aria is the Angular team's, stable, MIT, and already pins the CDK |

**This instance's console** (bounded probe, `node scripts/harness.mjs bounded -- node packages/console/dist/src/cli.js board --json`,
261 ms): the board of §2. `npm run console` cannot run here because the
script builds first and an export has no `tsconfig.json`; the compiled CLI
runs directly. The export carries no `uifa-board-v1.schema.json` (only the
compiled `dist`); the Work panel's `orders` section is unavailable because
the console reads `docs/control/resume.jsonl`, which an instance with
per-order segments does not have. Each goes to core (§11).

**WO-012's close** (the operator's note): the release-close session started
at 04:01:16Z before `node scripts/bootstrap.mjs` had run on the
fast-forwarded `main`; its first prompt at 04:01:21Z was withheld by the
hook ("runtime preparation failed at `npm run build --silent`: no
`tsconfig.json`"), the snapshot appeared at 04:02Z, and the helper then ran
three times: a dry run at 04:03:42Z, the publishing run at 04:04:23Z (tag
`v0.3.3` at `a9f8ed3`, Release created, the worktree removed with its
preservation receipt, branch `wo-012` deleted) and a retry at 04:07:28Z
that found the Release existing and `main` clean. The journal carries 125
`snapshot-missing` advisory rows for that session, the writer events show
the reservation acquired and released twice, and the retained directory
holds `release-close.json` (with both earlier attempts archived),
`terms.txt`, the worktree-removal receipt and the usage receipt. One host
denial at 04:08:15Z, after the close had completed, names a 212-byte Bash
input by digest only; its command is unknown to this pass. Nothing is
missing from the record (D12).

## 5. The operator's direction, synthesized

The UI is the DotLn console: a user interface for actors, over the actor
board's view model first, and in time over the live status, the command
contract and the authoring contracts the platform publishes. Three aims,
from today's capture read against the platform's records: show the work
agents do, intuitively, as they run more freely (the orchestration view:
live sessions, status, check-ins); make the platform better through what
the UI surfaces (readable work, costs, interventions, drift); and the
genesis, overlay the book shelf on real agents and watch their behavior
change (the pattern workshop: loadout authoring, inspection, preview,
counterfactuals, QA). The first screen is the actor board, because the
platform adopted on 2026-09-06 that the first Angular change is an actor
view and not a phase table, because the operator confirmed `uifa-board-v1`
today, and because it is the one view model that exists as data in this
launchpad now. The component layer is house-owned, with Angular Aria and
the CDK supplying behavior behind wrappers, because the operator said so on
2026-10-20 and the facts of §4 make it the stable, MIT, Angular-team route.
Everything the operator left open in the intake (host, remote access,
authentication, what a check-in does) is recorded as a later member's
reopening condition, not decided here.

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 WO-006 is made activatable: base `5102783f`, the observed gap
  restated, a typed hard edge on WO-012, the `Target release classification`
  header (minor) on WO-006, WO-007 and WO-008, the node-spelled draft
  publish in all three, the host-qualification record as WO-006's evidence
  obligation, and the four lint follow-ups of WO-005 allocated to WO-006.**
  Source: the 2026-10-20 pass's D7 and C1; the 2026-10-21 pass's D2 and D7;
  core's answers of 2026-10-19 and 2026-10-20 (the fields of the
  qualification row); WO-005-D008, D020, D021 and D022, whose conditions
  name the first order that edits the lint rules. The first three
  `DotLn Angular` releases are minor (a feature each; the first has no
  baseline and reads `v0.1.0`). Rejected: patch (nothing is a fix); leaving
  the lint follow-ups for a later order (WO-006 rewrites `eslint.config.mjs`
  and would pay the fixture work twice). Reopen: the operator names another
  classification, or core changes the header's grammar.
- **D2 No vendor component library: the house `ui` library owns every
  component's API, markup, styling and tests; Angular Aria supplies
  keyboard, focus and ARIA behavior and the CDK supplies overlay, focus
  trap, announcer and dialog, both imported only in `wrappers/` and the
  provider file; the Aria evaluation WO-005-D006 asked for is WO-006's
  step 2 with the Tabs pattern as the representative component.** Source:
  WO-005-D006 (the operator's direction of 2026-10-20) and §4's facts
  (Aria 22.2.3 stable, MIT, pinning the CDK; PrimeNG 22 under a key; the
  operator's condition for PrimeNG was that it be free). Rejected: PrimeNG
  22 under the Community License (the operator's condition; a seat-capped,
  yearly-renewed license in a public reference workspace); Angular Material
  (ownership: the operator wants the component layer house-owned, and
  Material's look would be the house look); ng-primitives, Spartan or
  radix-ng (third-party maintainers, Tailwind or 0.x; Aria is the Angular
  team's). The wrapper rule keeps the choice cheap to change, and no
  criterion depends on which library carries the behavior. Reopen: the
  evaluation at step 2 fails on keyboard, focus or axe (then CDK-only
  house behavior, recorded), or the operator names a vendor.
- **D3 WO-006's feature is the actor board: `libs/features/board` renders
  `uifa-board-v1` read-only from a recorded, scrubbed board of this
  launchpad, Actors panel first, with the host rules H1 to H5 and the
  design rules G1 to G6 of WS-001 §The console; the tile grid is
  replaced.** Source: the platform's adopted decision of 2026-09-06 (an
  actor view, not a phase table), the operator's confirmation today that
  the console sits over `uifa-board-v1`, and the board this launchpad
  renders now (§2). The board renderer is schema-generic (panel, section,
  row, cell and link components over the document) and no larger than the
  tile grid it replaces; it demonstrates every taxonomy kind once. The
  fixture is this launchpad's board with its six absolute paths scrubbed
  (a home-directory name is a private identifier; the public target gets
  none) and the schema pinned from core's `main` at `a54f8d65` with its
  SHA-256, a contract document rather than a machinery file (the
  platform's rule that DotLn-Angular never receives a machinery file is
  read as the harness bundle and scripts, and §11 asks core to ship the
  schema in the export so no copy is needed). Rejected: keeping the tile
  grid (a placeholder the product never asked for; "visuals verify things
  work" is met better by the real contract); rendering `runtime-status-v1`
  first (no resident writes a status file for this launchpad, and the
  operator's check-in wish needs the live view, which waits on that);
  loading the board over HTTP in WO-006 (no browser-reachable host exists;
  WO-007 mocks the endpoint). NoOp cost: a console whose first feature
  shows nothing of DotLn. Reopen: core publishes a browser-reachable board
  (then WO-007's handler becomes the real host's shape), or the operator
  names another first screen.
- **D4 WO-007 is re-targeted to the board (`BoardStore`, `BoardApi` with
  `GET /board`, `boardPageEvents` and `boardHttpEvents`, the handlers
  serving WO-006's fixture, `BoardFixtureToken` removed) and WO-008's
  path enum reads `BoardPaths`; both keep their scope otherwise.** Source:
  D3; the orders' texts. Rejected: leaving WO-007 on tiles (its criterion 6
  would test a feature that no longer exists). Reopen: WO-006's final
  review changes the facade's shape.
- **D5 The console's road after WO-008 is recorded as later members with
  reopening conditions in WS-001 §The console, not filed: the live view
  over `runtime-status-v1`, the command surface over the parity contract,
  the pattern workshop (the genesis), the arrival screen, counterfactual
  and QA views, and the readable work view.** Source: the operator's three
  aims of today; the platform's contracts and queue (§4: no browser bridge,
  no equip preview command, WO-080 queued, WO-193 queued). Each row names
  the contract it needs and the observation that reopens it. Rejected:
  filing the live view now (its data source does not exist in this
  launchpad); filing the workshop now (its commands are not in the
  contract; core's roadmap holds the rung). NoOp cost: none until a
  contract lands. Reopen: as each row says; or the operator directs a
  member regardless of its contract.
- **D6 The console's host and design rules are written into WS-001
  (H1 to H5 from the platform's contract; G1 to G6 from the platform's
  glyph grammar and the operator's intake) and WO-006 enforces each by a
  spec or a lint.** Source: §4. Rejected: a new product document in this
  instance (one more ceiling and gate for text that belongs to the
  workstream that applies it). Reopen: core changes the contract.
- **D7 Naming: DotLn is an agentic platform, its UI is the console, the
  first screen is the actor board, and the UI's facets are the orchestration
  view, loadout authoring, inspection, preview, counterfactuals and QA;
  this fork's records use those names, and `docs/product/purpose.md`
  keeps its sentence until the operator changes it.** Source: the
  platform's intake of 2026-09-05 (agentic platform, not agent
  orchestration), the fork's own capture of 2026-10-18 (status and
  check-ins through the UI alone) and today's capture (orchestration as
  one facet among the platform's). Both captures are the operator's words
  at their dates; the later one frames the earlier. Rejected: amending the
  purpose block in this pass (it is the refutation goal standard's purpose
  and the operator's own sentence; a pass does not rewrite it on a
  vocabulary reading). Reopen: the operator changes the purpose sentence.
- **D8 The register: FUP-854bc432690eb6fd and FUP-6d2755b3ac7c8ab9
  settled (D1, D2); FUP-a4dd921172ce3900, FUP-c3840fd4fef3f7bc,
  FUP-cb62c2b6f12d44ae and FUP-0dab0b63b20fae7d allocated to WO-006 (D1);
  the other ten rows left as they are with their conditions unchanged.**
  Source: §3 and §8. Reopen: as each row says.
- **D9 The fired timing hold and the ten unknown rows stay NoOps.** The
  `target-worktree` hold rests on the same two samples the previous pass
  read; nothing new was measured. Reopen: a `target-worktree:file:*` row
  above one and a half times its own thirty-day median once three samples
  exist, or a kit revision evaluates the core-only sources in an instance.
- **D10 The operator record changes, dated 2026-10-21.** Research before
  asking (the product lives in the platform's records; a pass fans research
  out and splits a large corpus across agents); the pace (#17 and #18
  merged, WO-012 closed as Launchpad v0.3.3, this pass, then WO-006's
  worktree); the bootstrap note on the lifecycle bullet; the naming bullet
  (D7). Source: today's capture. Reopen: the operator changes any of them.
- **D11 Requests to core are written as the operator's prompt (§11):
  the board's absolute paths, the schema absent from the export, the
  console's control source in an export, the `npm run console` build step,
  a browser-reachable read of the board and status, the release-close
  session that started before bootstrap, the UI plan, and the stale
  statements the research found.** Source: the operator record's standing
  preference; §4. Reopen: core's WO-193 channel lands.
- **D12 WO-012's close is complete and fully recorded; no repair.** The
  session's hooks ran advisory until the snapshot appeared, the first
  prompt was withheld, and the helper then published the tag and Release,
  removed the worktree and the branch, and wrote the retained record with
  both earlier attempts archived; the retry re-checked the Release and
  published nothing twice. The one denied call after completion is unknown
  by command and changed nothing the record covers. Source: §4's reads of
  the journal, the writer events, the retained directory, the tag and the
  Release. Rejected: re-running the close (nothing is missing; a retry is
  the kit's own idempotent re-check, which the operator already ran once).
  Reopen: a later `plan start` or `plan failures` reads WO-012's close as
  withheld or absent, or the operator names what the denied call was.
- **D13 Two clarifications of WS-001 from receipt 006, written after the
  receipt into the workstream document, which is outside the judged
  subject: a Salesman injects nothing, and a component that needs
  `ElementRef` or `DOCUMENT` is a wrapper (the taxonomy table now agrees
  with R1 and the lint); and an action's own success and failure, the
  trinity of rule 8, are that action's outcomes and not mappings under rule
  16, so the hygiene check does not count them.** Source: receipt 006's
  known issues on WO-006 criterion 2 and WO-007 criterion 2 (§9.2).
  Rejected: a lint selector that admits platform tokens under
  `templates/` (two injection rules for one role). Reopen: a Salesman that
  needs a platform token appears and a wrapper misnames it.

Immaterial lenses for the document-only writes (purpose, record, workstream,
orders, register, profile, ledger): the same as the previous passes'; no
code, configuration, activation, tag, publication or merge.

## 7. Core's answers of 2026-10-20, read again for the UI pass

Item 1 (the qualification row): its fields are now WO-006's steps 15 and
16 and its evidence obligation (`host-qualification.md`). Item 2 (the node
spelling): in WO-006, WO-007 and WO-008. Item 3 (the release-close helper
form): observed at WO-012's close, three runs of the printed form, the
first a dry run, the retry a re-check (§4). Item 6 (the sign-off
declaration): WO-012 closed with it. Items 4, 5, 7 and 8 were decided by
the previous pass. The UI pass needed no kit change, as core's 2026-10-20
answer said.

## 8. The register

Sixteen pending rows read at revision `56565a99…`. Dispositions applied in
one batch after `followups --sync` minted the rows of §10:

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-854bc432690eb6fd | C1 of 2026-10-20 (the UI planning pass before WO-006) | settled: D1 to D3 set the base, header, edge, publish spelling and vendor, and the feature |
| FUP-6d2755b3ac7c8ab9 | WO-005-D006 (the vendor reconciled, Aria evaluated) | settled: D2; the evaluation is WO-006's step 2 |
| FUP-a4dd921172ce3900 | WO-005-D022 (helper type aliases, the duplicate-name check) | allocated to WO-006 (step 6) |
| FUP-c3840fd4fef3f7bc | WO-005-D021 (the import-order rule) | allocated to WO-006 (step 6) |
| FUP-cb62c2b6f12d44ae | WO-005-D020 (the inline-template rule) | allocated to WO-006 (step 6) |
| FUP-0dab0b63b20fae7d | WO-005-D008 (`prefer-readonly` effective) | allocated to WO-006 (step 6) |
| FUP-83a2838dd2a2a199 | WO-005-D009 (the R and RA bundle) | left `deferred`: no order edits `libs/shared/utils` here; WO-006's bundle reading at step 2 is the next measurement |
| FUP-1ce1fb75025a93f8 | WO-005-D011 (the structural checks' forms) | left `deferred`: WO-006 adds a check and edits none of the three |
| FUP-98c85b750cb36bd4 | C2 of 2026-10-19 (the literal host-rules fallback) | left `deferred`: WO-006's draft publish is the observation |
| FUP-2479f6d32b2396a8 | WO-004-D013 (a trust entry at registration) | left `deferred`: the same observation |
| FUP-2232a29f1061494f | WO-012-D008 (core's header parser) | left `deferred` |
| FUP-223cde718a523e67 | WO-004-D010 (fork pull-request titles) | left `deferred` |
| FUP-4c3c0351adc4c2cc | C5 of 2026-10-19 (Preflight tokens) | left `deferred` |
| FUP-4cbacbbeca2cefab | C1 of 2026-10-21 (the Entropy Reducer on WS-001's repositories) | left `deferred` |
| FUP-a36dae4a6766b9ef | WO-001-D014 (the prompt hook's phrase) | left `deferred` |
| FUP-d771ffe939902128 | C2 of 2026-10-21 (the document gate's wall-clock) | left `deferred`: this pass's gate times are in §14 |

## 9. Orders amended and the sequence

WO-012, closed, leaves the sequence. WO-006 is rewritten (D1 to D3): its
title, base, header, edge, cost, cites, objective, observed gap, design,
steps, preflight, criteria, known issues, non-goals and assumptions name the
house component library over Aria and the CDK and the actor board; its
steps carry the Aria evaluation, the fixture capture and scrub, the schema
pin, the four lint follow-ups, the node-spelled draft publish and the
host-qualification record. WO-007 is re-targeted to the board (D4) and
WO-008 gains its header, the node spelling and the board's path enum. The
sequence reads WO-006, WO-007, WO-008, serial, unchanged in order. WS-001
carries the member rows, the dependency plan's base and edge, house rules
6 and 14, the Wrapper definition, R3, §The console and the delivery states.
The profile's upstream references replace PrimeNG with the behavior
libraries and the platform's contract.

### 9.1 Receipt 004's and 005's known issues naming these orders, disposed

Receipt 004's known issue on WO-006 (a pass that changes only its
`Repository:` line still pays a refutation) is met by changing the whole
order in one pass; its known issue on the vendor (activation without an
operator-confirmed vendor) is met by D2. Receipt 001's WO-006 issues on
unquoted `--include` patterns under zsh are carried: every grep in WO-006's
criteria quotes its pattern. Receipt 005 named no issue on these orders.

### 9.2 Known issues from receipt 006, by order

The refutation (§14) returned `aligned-with-findings` with five known
issues on WO-006, eight on WO-007 and no hold. WO-006 is frozen at the
judged subject; each of its issues is a carry-in its executor meets inside
the order's authority and records in `docs/evidence/WO-006/decisions.md`.
WO-007's base is provisional, and the pass that sets it after WO-006 merges
amends the order and pays its refutation (its own issue (h)), so its issues
are that pass's amendments, listed here so nothing is re-derived.

WO-006:

- **(a) The scrub checks paths only (criterion 5).** Carry-in: at capture
  (step 4, from the launchpad root) the executor runs
  `node scripts/terms.mjs check <fixture>` on both fixtures and records the
  result by file and line, the capture's available and unavailable source
  list, and a read for hostnames, remote URLs and account identifiers; a
  match stops the fixture until it is scrubbed.
- **(b) The Salesman injection rule and the spec filter (criterion 2).**
  The rule is settled (D13). Carry-in: Salesman specs use
  `TestBed.createComponent` and `setInput` and call no `inject(`; the
  executor records criterion 2's grep as written and, beside it, the same
  grep with `--exclude='*.spec.ts'`; a spec that must reach an injector uses
  `fixture.debugElement.injector.get` and the decision says so.
- **(c) The inline-template rule against Prettier (criterion 1).**
  Carry-in: before writing the rule the executor runs `npx prettier --check`
  on a component in each form (WO-005-D020's probe showed Prettier keeps
  the two newlines when they are written), the rule requires only the form
  Prettier preserves, the fixture's control is a formatted file, and if the
  two disagree on any file the rule becomes a check without autofix and
  the decision says why.
- **(d) The bundle reading (criterion 5, D002).** Carry-in: D002 records
  the behavior libraries' bytes from the production build's stats after
  step 9, as WO-005-D009 read Ramda's, separating `@angular/aria` and
  `@angular/cdk` from the fixture, which is loaded from its own chunk or
  excluded from the measure; step 2 records the evaluation's other readings
  and names the deferral.
- **(e) The fixture's date.** Carry-in: the fixture is named for its
  capture date (`launchpad-board-<YYYY-MM-DD>.json`) and the decision and
  the generator log record it; the Design's name is the planner's example.

WO-007, amendments for the pass that sets its base:

- **(a) Rule 16 and the trinity:** settled in WS-001 (D13); the amendment
  restates criterion 2's fixture set (an own-tier dispatch other than an
  action's outcomes) and step 8's expected count.
- **(b) The hygiene check's scope:** resolve tiers from the `eventGroup`
  source prefix criterion 1's spec asserts, and inspect `withCommand`
  arguments and returned events as well as `dispatch(` calls.
- **(c) Criterion 5's per-path grep:** drop it; the `setupWorker` and
  `mockServiceWorker` clause carries the proof, and the handler's knobs and
  fixtures are excluded by import.
- **(d) Criterion 4:** the `setupWorker` count is at least 1 (the import and
  the call); step 9 names the option as the installed declaration spells it
  (`onUnhandledRequest` in MSW 3.x).
- **(e) The shell's error surface:** `app.ts` injects `ErrorStore`, passes
  `latest` down to the layout as an input and maps `dismiss` up, or the
  shell gains a `containers/` directory; the amendment names one.
- **(f) Degradation without a host:** record that only mocked builds render
  the board until the platform's host exists, with the production build
  showing the unavailable state naming the missing host (H2), or keep the
  recorded board as a stated fallback; the amendment decides.
- **(g) The flag:** the Design names one flag with a product purpose (the
  sources footer is a candidate) and the element it toggles.
- **(h) The second refutation's cost:** the base-setting pass counts it in
  WO-007's Cost line; the kit route that resolves a base at activation stays
  the upstream candidate (the 2026-10-18 pass's C7 (b)).
- **(i) Deliverables:** "the board store, API and handlers".

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The live view over `runtime-status-v1`: actors, live episodes,
  presence, holds, budget and every open order's phase; the operator's
  check-in on running sessions through the UI alone.** Reopen when a
  resident writes the status file for this launchpad, or core serves it to
  a browser host; then a `WS-001` member reads it as WO-007 reads the
  board.
- **C2 The command surface over `console-commands-v1`: the resume phrases,
  `away` and `back`, intent declaration and the audit read from the
  console.** Reopen when core serves the contract to a browser host (the
  loopback is bound to the local user and refuses non-local origins by
  design; §11 asks for the bridge) and WO-008's session model exists.
- **C3 The pattern workshop, the genesis: drop a book-derived support on an
  actor, see the compiled diff and the effect before confirming; saved
  builds; the RPG and emoji skins over the plain one.** Reopen when core's
  contract carries equip preview, the compiled diff and saved-build
  selection (its roadmap's pattern workshop rung) and C2 exists.
- **C4 The arrival screen: what changed since the last visit, what is in
  progress, what needs a decision, what can continue under existing
  authority.** Reopen when C1 exists and the audit projection is served to
  a browser host.
- **C5 Counterfactual and QA views: compare configurations, event paths and
  costs; the tester's mechanisms and acceptance matrices beyond the
  board's rows.** Reopen when core publishes those records as view models.
- **C6 The readable work view: future orders only, in sequence, with
  purpose and dependencies; releases and what each contained; costs per
  actor.** Reopen when core reads an export's control segments into the
  board's Work panel (§11) or publishes a work view model; the board's
  `usage` and `releases` sections already serve part of it.
- **C7 The console framework evidence to core.** Reopen when WO-006's
  evidence records the bundle bytes, type cost, maintenance and
  interoperability of the Aria route; then the next requests-to-core prompt
  carries it for core's deferred framework decision.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged: CI on the fork, required
approvals, retitling the two published `DotLn` Releases, a lane pair of
small self orders (the main-rules pass's C2 to C5), the workstream pass's
C1 to C10 (typed translation keys, the WoW tooling app, the example API and
a real identity provider, the DotLn console feature now cut as D3 and C1 to
C6, production environment, one word that runs the queue, kit gaps, an
issue-filing helper, orders spanning repositories, a second feature by
convention), the Entropy Reducer on WS-001's repositories and the document
gate's wall-clock (the 2026-10-21 pass's C1 and C2).

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning session
(D11). Each item names the record it rests on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its UI planning pass of 2026-10-21 (docs/planning/ui-planning-2026-10-21.md §4, §6 and §11), which set WO-006's base and cut the DotLn console's first screen into it. Read each against the record it names; file, decline or defer each with its reopening condition.

1. The fork's console plan, for the console framework decision core deferred (04-interfaces §Later console hosts; ledger 2026-09-06): WO-006 renders the actor board (uifa-board-v1) read-only from a recorded, scrubbed board of the fork's own launchpad, through a house component library whose behavior comes from @angular/aria 22.2.3 and @angular/cdk behind wrappers (no PrimeNG, no Material); WO-007 loads the board over HTTP answered by MSW; the live view, the command surface, the pattern workshop, the arrival screen, counterfactual and QA views and a readable work view are recorded as later members in WS-001 §The console, each with the core contract it needs. WO-006's evidence will carry the bundle, type, maintenance and interoperability readings of the Aria route for your decision.

2. A browser-reachable read of the board and the status: console v1 is the Angular shell (04-interfaces §Later console hosts), yet console board is outside the parity contract and the loopback refuses non-local origins by design, so a browser host cannot obtain the board or runtime-status-v1 from the platform today (04-interfaces §Console parity contract v1; WO-114 and WO-115 non-goals). The fork asks for a named order: a loopback read of the board and the status file for a local browser origin, or the recorded route a browser host should use. Until then the fork's WO-007 mocks GET /board and the live view (the fork's D17 row, FUP-280abd447f789958) waits.

3. board --json carries absolute local paths in its sources (six in the fork's launchpad, naming the home directory); a fixture committed to a public target must not. The fork scrubs them in WO-006 (tools/scripts/scrub-board-fixture.mjs). Ask: repository-relative source refs, or a flag that emits them.

4. The starter export ships packages/console/dist only; uifa-board-v1.schema.json and runtime-status-v1.schema.json are not in it, so an instance or a consumer must reach into core to pin the contract. The fork pins core's main at a54f8d65 and records the SHA-256 in WO-006. Ask: ship the two schemas in the export (dist or docs) so instances and consumers pin a kit file.

5. The console in an exported instance: npm run console runs npm run build --silent first and fails on the missing tsconfig.json; node packages/console/dist/src/cli.js board --json runs. The board's Work panel reports control:canonical-segments unavailable and resume:status--json unavailable (the orders section empty with eight closed orders), because the instance records control in per-order segments and has no docs/control/resume.jsonl. Ask: an export-aware console script, and a control source that reads an instance's segments.

6. A release close that started before bootstrap: on 2026-10-21 the fork's operator dispatched resume: release close on WO-012 in a session opened before node scripts/bootstrap.mjs had run on the fast-forwarded main. The SessionStart advisory named bootstrap; the UserPromptSubmit advisory said "Release-close preparation withheld: runtime preparation failed at npm run build --silent: ENOENT tsconfig.json", a build an export cannot run. After bootstrap the helper ran a dry run, the publishing run (tag, Release, worktree and branch removed, release-close.json with the attempts archived) and an idempotent retry; the journal holds 125 snapshot-missing rows for that session. For receipt 051's withheld share: one withheld prompt, then a complete close; the advisory could name bootstrap in both places.

7. Stale statements the fork's research read found in your product pages: 03-architecture's version line still says v0.11.0 and "console planned"; 04-interfaces' status line; the console README header says component 0.4.0 while package.json says 0.4.3; product 13 cites WO-037 and WO-040, since cut into WO-091 and WO-096; "UIFA v0" emits uifa-board-v1 while "console v1" and "UIFA v1 shell" both name the Angular shell; runtime-status-v1 grew a field without a version bump (console README).

8. Naming, for the record: the fork's records now follow the platform's names (an agentic platform; the console; the actor board; UIFA roles) and read "agent orchestration" as one facet of the UI, per the operator's words of 2026-09-05 and 2026-10-21; the fork's D17 row in your map may read the same way.

9. Confirmations by id: your 2026-10-20 items 1 (the qualification fields are WO-006's steps 15 and 16), 2 (the node spelling is in WO-006 to WO-008), 3 (observed at WO-012's close: three runs of the printed form) and 6 (WO-012 closed with the declaration).

10. The document gate's wall-clock on this host at v0.88.0 (the fork's register row on the v0.86.0 scheduler, its second observation): npm run test:docs in the primary checkout on the planning branch, 12 passed and 2 failed (the two plan checks waiting on the receipt), 1,520.76 s of wall-clock with every task's own duration under 6 s and 14 fresh tasks; WO-012's step 4 recorded 15.35 s for the same gate on main on 2026-10-21, and the fork's previous pass recorded 304.86 s in a fresh worktree. The row's condition (a median above 30 s) has fired; say whether the lane rule serializes the gate's fixture tasks or waits on a holder on a 16-CPU host, and what the fork should measure next. The second run of this pass is recorded in its §14.
```

## 12. Write-backs

- `docs/work-orders/WO-006-component-taxonomy-shell-home.md`: rewritten
  (D1 to D3).
- `docs/work-orders/WO-007-events-stores-data-access.md` and
  `WO-008-authentication-and-permissions.md`: the header, the node
  spelling, the board (D1, D4).
- `docs/planning/sequence.md`: WO-012 leaves.
- `docs/workstreams/WS-001-dotln-angular.md`: the member rows, the
  dependency plan, house rules 6 and 14, the Wrapper definition, R3, §The
  console, the delivery states, the workstream block's edge on WO-012.
- `docs/repositories/dotln-angular.md`: the upstream references (D2, D3).
- `docs/operator/README.md`: the pace, the bootstrap note, research before
  asking, naming (D10).
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path, the
foundation where a feature is added by convention, with the first feature
being the product's own first screen: WO-006 activatable against a text
whose vendor the operator's condition admits (D1, D2); the console's first
screen the actor board the platform defined and the operator confirmed,
rendered from the one view model this launchpad holds as data (D3); the
road after it recorded against the contracts core owns, so no fork order
grows a second state machine (D5, D6); and core receiving what only a
consumer can observe (D11). What the pass refuses to do: choose a vendor the
operator's condition excludes, keep a placeholder feature, file members
whose data sources do not exist, rewrite the purpose sentence on a
vocabulary reading, or re-run a complete close. What stays manual by the
kit's design: the merge of this pass, the worktree start, the resume
phrases and the paste to core. Lenses that changed the plan: seeking the
wrong goal (the tile grid replaced by the board); rule beating (WO-006's
criteria test the import boundary of the behavior libraries, the fixture's
scrub and schema validation, and the unavailable state, not a vendor's
name); shifting the burden (the lint follow-ups land in the order that
edits the rules, not in a later cleanup); process activity is not progress
(the facets without a contract are rows with reopening conditions, not
orders); and the operator's own trap, a plan that has nothing to do with
what they asked for (the research fan-out replaced guessing, and today's
directions are recorded where the kit records them).

Cost: eleven research workers (§4) and the refuter (§14); the board probe
261 ms; `npm run meta -- --plan-cost` records the table after the subject
commit; the handoff reading of process cost is in the pull request.
Document ceilings: no product document changed in this pass
(`docs/product/purpose.md` keeps its 1,939-byte ceiling; the kit's product
documents are kit files and carry no instance ceiling).

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.

Results at the subject commit `32c833d` (cost table) over `b3c8121` (the
subject): `npm run meta` no budget breach; `followups --sync` minted seven
rows (§10's C1 to C7) and `--apply` took thirteen dispositions in one batch
(register revision `400e3b68…`); `work-orders index --check` PASS (both
pages current); `lineage index` regenerated and current; `docs-check` PASS
(1 product document; the three pre-existing advisories on filed records;
three advisories on this document's own paragraphs repaired by paraphrase
before the commit); `publication:check` reporting no editions declared;
`plan check` waiting on the receipt. The document gate before the receipt:
12 passed, 2 failed (the two plan checks), 1,520.76 s of wall-clock with 14
fresh tasks whose own durations stayed under 6 s each (§11 item 10; the
register's wall-clock row fired on this measurement and is carried to core;
the next pass re-disposes it with core's answer).

Refutation: one fresh `dotln-worker` (`claude-opus-5-5` by its definition
and the host's system prompt; reasoning effort unknown, nothing reports it)
on the canonical prompt from `npm run plan -- refute` at base `32c833d`,
default pass scope (WO-006 and WO-007, plus the sequence; WO-008 carried by
hash), dispatched at 05:17:22Z. The worker returned its judgment and
statement in its final message, as briefed; the parent saved them as
ignored local files and filed the receipt. Receipt
[`2026-10-21-planning-24597b606f20e33d-006`](refutations/2026-10-21-planning-24597b606f20e33d-006.md),
verdict `aligned-with-findings`, 0 holds, 13 known issues (§9.2),
dispatch-to-file 930,024 ms (15.5 minutes; the worker's own run 728,784 ms,
174,740 tokens, 16 tool uses). The worker's statement names what it read:
the whole prompt and nothing else under the control lane; WO-006, WO-007
and WS-001 in full and WO-008's header lines; the compiled console's
collector and builds projection; read-only Git and shell commands only; no
planning document, receipt, intake, operator record, ledger or decision
record; no kit, npm, network, model or agent command; no write. The
judged, committed and workspace subjects agree (`sha256:2486099d…`).
After the receipt, the known-issues record and D13, the document gate at
v0.88.0 in the primary checkout: 14 passed, 0 failed, 1,509.74 s of
wall-clock with 14 fresh tasks, each task's own duration again under 6 s;
the handoff run is in the pull request.

Process cost at handoff (`node scripts/harness.mjs usage <session>`, source
`claude-transcript-message-usage`, scope `dispatch`, observed
2026-10-21T06:00:30Z): 20,347,242 total tokens (1,118 input, 19,481,406
cached input, 642,838 cache-write, 221,880 output; reasoning tokens and
cost unknown, the counters unavailable); 12 of 20 subagent admissions used,
exact-observed, none unresolved. The fan-out matched the plan stated in §1
after the operator's split of the intake: eleven research workers and one
refuter, no descendants. The outcome matched the aim as read: WO-006 is
activatable, the vendor is settled from the operator's direction and
today's facts, the console's first screen is cut into WO-006 and the road
after it is recorded.
