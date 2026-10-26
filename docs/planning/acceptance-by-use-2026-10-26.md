# Acceptance by use, the clean room's scope and the catalog as something to read: the operator's judgment of the app, the misattributed rule struck, rules 24 and 25, WO-019 filed, WO-015 and WO-018 rewritten, 2026-10-26

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-26 at 12:40Z on the
state of the DotLn-Angular app after WO-014's merge: they could not see how
the app as built leads to what they want, every page is the same page, a
grid of records with a few fields, the look is poor, and the words they
reached for were hollow and useless. Over the next quarter hour they
corrected the session three times while it read the record: the rule it had
called theirs (ids, short titles and generic terms only for mined data) was
never theirs; the acceptance of every order in this workstream must change
permanently from checks on the record to use of the page; and the books,
films and ideas they reference for this app have nothing to do with the
clean room. They asked for the whole picture in clear terms, their goal as
the session reads it, the fix and the road, and said go at 12:58Z. The messages are captured verbatim in ignored intake (`docs/intake/notes/planning-2026-10-26.md`, SHA-256 `9ec78ddbc267936d59fc7fe88b4a8b9c8d42d4692979db31be5129c817fd72a6`), a sibling record and never a source to copy from; two later messages, sent while the pass filed its first receipt (an aside on the standard the app is held to, and an observation on the refutation receipts' trap paragraphs, taken up in §4 and §11), are in the addendum capture `planning-2026-10-26-addendum.md`, SHA-256 `c5127d9f728739f75ed5884987002c02abd3b9ca9734833fdd37d64dd3e93884`.

This document is planner synthesis of that capture; this instance's records
(the ten previous planning documents and their receipts, WS-001, the
operator record, the profile, the register, the control segments, the
orders, WO-014's decisions, verification, final review and planning
handoff); the target repository at `1c3a4ff2` (its code, its catalog data,
its visual baselines, its documents); the 2026-10-24 capture of the
operator's messages, read to settle the rule's authorship; core's planning
document of 2026-10-24 and its §10 table of the operator's decisions; and
the operator's research run of 2026-10-22 at the files the orders name, read
at their recorded digests (design B, the UI vision, the forward document,
the critic's notes, the maps README and `toys.jsonl`). The clean-room screen
found the operator's own repositories and research and the platform's
public records; the only private material read is the operator's own
captures, paraphrased.

Authority: a document-only planning pass on
`planning/2026-10-26-acceptance-by-use` from clean `main` at `a1d01c4`
(after #31). No upstream update was asked for and none was due: `upstream/main`
is at `dd1924b`, the v0.99.0 refresh the fork took in #28, and core's latest
release is v0.99.0 (D1). The pass files one order, rewrites two, amends
three, writes three house rules, corrects the operator record, activates
nothing, publishes nothing in the target and never merges. Its refutation is
the pass's independent verification (§14).

Fan-out plan, stated before the first spawn: one refuter, no research workers, no descendants; the 20-admission cap leaves 19. The dispatch line named no Fable worker, so the refuter is the default `dotln-worker`. The same worker was resumed once to repair its statement's formatting (an absolute path the receipt helper refuses), which rerolled nothing.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `a1d01c4` (#31, WO-014's records), clean; starter v0.99.0; `upstream/main` at `dd1924b`, unchanged since #28; core's latest release v0.99.0 (2026-10-25T20:37Z) | `git status`, `git fetch upstream`, `gh release list` |
| WO-014 | `closed` in canonical status (VER-002 pass, FINAL-001 pass on 2026-10-26); merged in DotLn-Angular as #7 at `1c3a4ff2` with its records as #31 here; closed by the operator as `DotLn Angular v0.4.0` (tag at `1c3a4ff2`, Release published 2026-10-26T12:34:52Z, six minutes before the dispatch). The pass first wrote the close as pending: it read the local clone's tags without fetching (latest `v0.2.0`) and took the status projection's legal action `release-close` as meaning not yet run, which it never means, because the kit writes no target close into an order's segment (WO-007's, closed as v0.2.0 on 2026-10-24, ends at `TargetRecordsCommitted` too); corrected when the operator said so, see §4 | `npm run resume -- status --json`; `git -C ../DotLn-Angular fetch --tags`; `gh release view v0.4.0 --repo DylanBWood/DotLn-Angular` |
| DotLn-Angular | `main` at `1c3a4ff2` (#7); Releases `v0.1.0` to `v0.4.0`, the last two WO-013's (2026-10-25T22:42Z) and WO-014's (2026-10-26T12:34Z); the registered clone clean, its tags fetched only after the operator's correction | `gh release list --repo DylanBWood/DotLn-Angular`, `git -C ../DotLn-Angular fetch --tags`, `git status` |
| The failure feed | three items since the last pass: WO-014's VER-001 failed judgment (criterion 7, the initial bundle), the execution amendment WO-014-D006 (criterion 3 admitted a recorded shortfall) and WO-013's repair answering FINAL-002; routed in D13 | `npm run plan -- failures` |
| Conditions | 0 holding, 0 unknown; 192 decision conditions and 103 register rows not evaluated; host load about 4 on 16 CPUs, lanes capacity 8, no holder | `npm run plan -- conditions` |
| Register | 103 rows at revision `4189e2fe…`, 33 pending; WO-014's seven planning rows (D010, D015, D019, D020, D023, D024, D027), WO-013's two (D005, D007) and the two candidates of 2026-10-25 read in §3 and §8 | `npm run plan -- followups --export` |
| Open issues and pull requests | none on this repository | `gh issue list`, `gh pr list` |
| The capture of 2026-10-24 | nine entries: the operator's own typed lines are the dispatch, three holds, the merge note and the withdrawal; entries 5, 8 and 9 are pasted blocks; the clause "ids, short titles and generic terms" appears in all three pasted blocks and in none of the operator's typed lines; entry 9 ends with core's answers addressed to the fork session, and core's planning document carries entry 9 word for word at its line 604, committed as the plain prompt for the instance; core's §10 table of the operator's 27 decisions carries no such rule | `docs/intake/notes/planning-2026-10-24.md`; core `docs/planning/intake-mining-run-routing-2026-10-24.md` |

## 3. Reopening observations

Fired conditions, each re-disposed in §8: `FUP-c5936c588840e1da`
(WO-014-D010, deferred to the next planning pass that considers the
handoff: this is that pass, D12); `FUP-ea16db0faba5126e` (WO-014-D019, the
next planning pass maps the reusable guidance to a supported mechanism or
requests one: D12 and §11); `FUP-ceaf0a88a6cf39da` (WO-014-D015, the next
pass weighs the receipt's untyped-share and title-overlap conditions: moot
under D3, settled in D12); `FUP-5e0a2f662a416a4c` (WO-014-D023, the next
order that edits the bundle check: WO-019 step 9, D6); `FUP-d03ddc0e7d6681a8`
(WO-014-D024, the WS-001 item on `tools:lint`: fixed in rule 13, D12);
`FUP-e6309e0d159b3f8a` (WO-014-D027, planning makes the draft publish
observable: §11 and the orders' known issues, D12); `FUP-40112dbc26c91d9e`
(WO-013-D007, allocated to WO-014, whose not-found route shipped: settled);
`FUP-c789b3662529a11c` (WO-013-D005, the `run-many` form in any order filed
or amended: applied in WO-019 and the rewritten WO-015 and WO-018, settled).
Receipt 010's thirty-one known issues, which the 2026-10-25 pass left for
the pass that next amends the orders, are disposed in §9.1 (D11). No other
deferred row's lifecycle condition fired; `FUP-cc72e6b187cbb0ab` (D020, the
cold-load shift) and the carried candidates stay with their conditions.

## 4. Observations, dated 2026-10-26

| Item | Observed | Source |
| --- | --- | --- |
| The app's four routes | `/board`: the recorded fixture's Actors panel renders unavailable cards; 13 of the fixture's 21 sources are unavailable. `/scene` and `/machinery`: arriving pages naming the order that lands them. `/tools/catalog`: fifty titles per page with id, work slug, kind and transform status, a side panel reading "select a tool to inspect its five faces", and the faces as machine identifiers | the committed visual baselines (`catalog-1440.png`, `board-desktop-actors.png`, `scene-1440.png`), the templates, the fixture |
| The catalog's data | 3,463 rows: 121 typed, 1,914 untyped, 1,428 background; of the typed, 90 are `channel.policy`; the kinds the scene engine interprets have 8 typed tools; no row carries `definition`, `related`, `dotlnHooks`, `chapter` or `section` (0 of 3,463 carry any text field beyond the title); 2,035 rows carry faces, 1,283 an analog | a fold over `libs/shared/catalog/src/data/*.json` |
| The first scene's tools | of the fifteen ids WO-015 named: typed, `aifg-a:144` weighted blending, `145` flocking, `149` priority steering, `177` two-level formation steering, `174` fixed formations; untyped, `112` arrive, `131` separation, `118` velocity matching, `125` wander, `104` random binomial, `186` slot assignment; background, `178`, `179`, `184`, `187`; `objective.set` typed nowhere | the same fold |
| What the allow-list refused | `check-catalog.mjs` runs `assertScrubbed` over every catalog string and the schema refuses `definition`, `related`, `dotlnHooks`, `verified`, `section` and `chapter`; `catalog-rules.md` says to commit only ids, short titles and generic terms; design B §2.1, the shape WO-014 built from, carried the row's own-words definition verbatim | the target's check, rules and design B |
| Where the rule came from | the clause entered through the prompt core's session drafted for the operator (entry 5 of the 2026-10-24 capture, withdrawn by the operator as wrong), stayed in the corrected prompt (entry 8) and in the first-person block (entry 9), which the 2026-10-24 pass read as the operator's own statement (its D2: "the clean-room rule for the orders is the operator's"); WS-001 rule 23, the operator record, WO-014's allow-list and five orders then cited it as the operator's; core's record of the operator's actual decisions has no such rule | §2's last row; the 2026-10-24 planning document §6 D2 and D6 |
| How the orders were judged | WO-014's objective names one user-facing outcome (the operator browses and filters the catalog) and its nine criteria are greps, exit codes and counts; WO-013's six likewise; receipts 008 to 010 judged clean-room exposure, enum closure and checkable form and never whether the page would be used; the verifier's and reviewer's role texts judge criteria as written | the orders; the receipts; the skills |
| The design history | the 2026-10-21 UI pass settled the vendor (none; Angular Aria and the CDK behind wrappers) and recorded that visuals verify and foundations come first; no pass since has decided what the app looks like; the house kit at `1c3a4ff2` is fifteen components (three fragments, five templates, four wrappers, three composites) over one accent colour and Inter; G6 preferred label-value lists over dense tables, and every page took that form | `ui-planning-2026-10-21.md`; `libs/shared/ui`; WS-001 G6 |
| The operator's own research on the first screen | the run's critic calls The Twenty the operator's baby example word for word and recommends it as the first or a parallel screen; the run's forward document put it in slice 5 because its ranking rewards audit instruments; design B §3 T1 describes the scene the operator wants in one paragraph | `critic-notes.md` §5; `dotln-angular-forward.md` §2; design B |
| The "three tools per work" rail rule | present in the two drafted prompts (entries 5 and 8), absent from the operator's own statement (entry 9), which says a tool rail from the catalog; WO-015 carried it as a floor | the 2026-10-24 capture; WO-015 before this pass |
| Receipt 010 | thirty-one known issues over six orders and no hold, left for the pass that next amends them | `docs/planning/refutations/` receipt 010 |
| The kit's screen on criteria | product 07 refuses a criterion that requires a deterministic reading of natural language or free-form Markdown (the sentence-count case); it admits method criteria whose artifacts and labels are checkable and whose judgment is the verifier's | product 07 §An order carries an Execution plan; §Experiments |
| The pass's own miss | the pass told the operator at its handoff that WO-014's release close was their next dispatch; the operator had run it at 12:34Z, before the dispatch. The pass had read the local target clone's tags without a fetch and the launchpad's status projection, whose `release-close` legal action does not record whether a close ran. The rule the operator record already carries (a fact is checked against its source before it is stated) was not applied to the one fact that only the target's Releases answer. Corrected in WS-001, the operator record, the profile, this document and the pull request before the merge; nothing in the judged orders depended on it (WO-019's base is the merge commit the tag points at) | `gh release view v0.4.0`; the operator's correction of 14:08Z (addendum capture entry 10) |
| The receipts' trap paragraphs | the operator, reading receipt 011, found the same sentence on WO-013's policy resistance they had read in receipts 008, 009 and 010: WO-013's text was unchanged, so the kit carried its judgment by hash and printed it again in each receipt (one occurrence in each of the four); beyond that, the schema requires per order a `systemTraps` paragraph of at least one character and the work order asks how all eight traps apply, so every order's paragraph runs 1,200 to 1,800 characters and opens the same way, which the operator read as the instrument for detecting rule beating producing it (a form filled to length) | `grep -c` over the four receipts; receipt 011's JSON; the addendum capture |

## 5. The operator's direction, synthesized

**The app is hollow and the operator wants to know how it gets to what they
want.** Every page shipped is the same page: records with a few fields in a
grid or a list, nothing to read, do or learn, and no look. The sessions
specified plumbing and judged it by greps; the first toy is still ahead.

**The rule was never theirs.** The clause that gutted the catalog came from
a prompt another session drafted; the fork's pass attributed it to the
operator because the block was first person. The books, films, games and
ideas the operator references for this app are its subject matter and have
nothing to do with the clean room, which governs employer material,
credentials and private identifiers.

**Acceptance by use, permanently.** For every order in this workstream the
verifier, the refuter and the reviewer judge the page by using it against
the session the order states; greps and exit codes support that and never
replace it.

**Their goal, as the pass reads it and the operator accepted on 2026-10-26:**
an instrument where the ideas they collect become things they can pick up,
drop on a scene or an agent, watch and judge, before anything is promoted
to the platform: the twenty soldiers with a toolbox drawn from everything
they read; their agents as little workers in role slots with an idea
dropped on one and the use case visibly changing; a model of themselves as
RxJS that runs, judged by results; and the workspace colleagues see as the
operator's way of building Angular. The test of every page is whether they
would open it, play, and come back.

**Go.** The written picture of the fix and the road was accepted as
written: the scene first with the look briefed inside its order, the
catalog's content restored in one order before it, WO-008 left in place,
the root route moving to the scene when it exists.

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 The subject is the state of the app and no upstream update is taken:
  the dispatch named none, `upstream/main` is the v0.99.0 refresh the fork
  carries, and core's latest release is v0.99.0.** Source: the dispatch;
  `git fetch upstream`; `gh release list`. Rejected: an update first on the
  standing direction (that direction applies when the operator asks for the
  latest upstream; nothing is behind). NoOp cost: none. Reopen: core ships
  a release before this pass merges; the operator then asks for it.
- **D2 The "ids, short titles and generic terms" rule is struck from WS-001
  rule 23, the operator record and the four open orders that cited it, and
  its provenance is recorded: it was a clause of the prompt core's session
  drafted for the operator to paste (entry 5 of the 2026-10-24 capture,
  withdrawn by the operator as wrong; entry 8, its corrected version; entry
  9, the first-person block the 2026-10-24 pass took as the operator's own
  statement, which core's planning document carries word for word as the
  plain prompt for the instance), and it appears in none of the operator's
  own typed words and in none of core's 27 recorded decisions of the
  operator; the operator record gains the rule that a pasted block is the
  text of the session that wrote it, whatever its grammatical person.**
  Source: the operator's correction of 2026-10-26 (capture entry 2); the
  2026-10-24 capture read in full; core's planning document §10 and line
  604. Rejected: keeping the clause as the fork's own choice (nobody chose
  it; it was inherited as a direction); asking the operator to confirm what
  they said (the capture answers it). NoOp cost: a catalog of titles, the
  scene's inspector with nothing to read, and WO-018's toys reduced to ids.
  Reopen: the operator says the clause was theirs after all.
- **D3 The clean room governs employer material, credentials, private
  identifiers and the operator's own raw message text; the books, films,
  games and ideas the operator references for DotLn-Angular, the run's maps
  of them and the designs cut from them lie outside it. Every mechanism the
  passes applied to that material goes: WO-014's allow-list and the scrub
  over catalog strings (removed by WO-019), WO-018's overlap check and
  own-words rule and its reading of the nineteen toys as ids and short
  titles (removed by the rewrite), and the "nothing from intake" clauses in
  WO-015 to WO-018. What stays: the quarantine files closed, because they
  were quarantined for employer material; the reducer's scrub over the
  platform's control records, because an account name or hostname there is
  the floor; each order naming its design file by digest, because the run
  may change; and, as an ordinary publishing question and not a clean-room
  one, whether a verbatim passage of a work still in copyright is committed,
  decided by the order that wants one.** Source: the operator's correction
  of 2026-10-26 (capture entry 4); CLAUDE.md §Clean Room; the operator
  record's existing entry that clean-room commentary about their own
  patterns is unwanted. Rejected: framing a definition as permitted under
  the floor (the operator's correction was that the floor does not apply,
  not that the definition passes it); dropping the quarantine rule with the
  rest (that rule is the floor itself). NoOp cost: as D2. Reopen: the
  operator names material of theirs that the clean room should cover.
- **D4 WS-001 rule 24, acceptance by use: every member order's Objective
  describes the operator's session on the page; at least one criterion is
  judged by the verifier performing that session in the served build, with
  a dated walkthrough and screenshots at the three widths filed in the
  report and the criterion met only when every step completed and the
  report says in the verifier's words what was read or watched; the
  refuter asks of every judged order whether the operator would use the
  page and whether it is the previous page with different fields; the final
  reviewer performs the session before passing; greps, exit codes and counts
  support and never substitute; a page of records as label-value lists with
  nothing to read, do or learn fails; every planning pass states in one
  table what the operator sees after each sequenced order. The criterion's
  shape is a method criterion under product 07's screen: its artifacts (the
  walkthrough section, the screenshots by count and path) are checkable and
  its judgment is the verifier's, as every criterion's is.** Source: the
  operator's direction of 2026-10-26 (capture entry 3: changed for this
  workstream permanently); the verifier's and reviewer's role texts (judge
  each criterion with your own probes); product 07's screen on criteria
  that need a reading of natural language. Rejected: a criterion phrased as
  "the page is useful" (unjudgeable as written); a kit change (the role text
  is core's; the fork binds its roles through the order, the workstream and
  the operator record, and asks core in §11 for an instance-owned duty).
  NoOp cost: the next four orders judged the way the last nine were. Reopen:
  a verifier records a use criterion met with no walkthrough, or core ships
  an instance-owned role duty that carries the rule itself.
- **D5 WS-001 rule 25, the look is briefed and judged: every order that
  lands a page carries a design brief under a workstream design direction,
  builds two candidate layouts as stories, puts both screenshots in its pull
  request and records the operator's pick; G6 is revised so a label-value
  list is never a page's default form and a record is shown in the form its
  reading needs; the 2026-10-21 reading that visuals verify is withdrawn;
  the direction briefed: the subject is the page, one role palette and one
  work palette across every sub-app, instruments for figures, prose and
  lists of names for relations and mechanisms, motion only on transition.**
  Source: the operator's judgment of the look on 2026-10-26 (capture entry
  1) and their acceptance of the written picture (entry 7); WS-001 G2 and
  G4; the workstream's existing pairwise comparison. Rejected: a design
  order before the scene (the operator accepted the scene first with the
  brief inside it); a vendor theme (rule 6 and the 2026-10-21 D2 stand).
  NoOp cost: the scene lands in the catalog's look. Reopen: the operator
  picks neither candidate twice running, which is the signal for a design
  pass of its own (§10 C1).
- **D6 WO-019 is filed at WO-014's merge commit: the catalog as something to
  read, every tool carrying the run's definition, place, relations, hooks
  and verification note through a join against the maps at their digests,
  the `v1` schema, the check reduced to schema and counts, the reading
  surface (shelf, contents, reading pane, faces as a sentence, search,
  history), the steering, formation and objective tools the scene's rail
  floor needs typed by decision, the bundle check extended for WO-014-D023,
  and the use criterion first.** Source: D2 to D5; the operator's judgment
  of the catalog page; design B §2.1; the maps README; the fold of §4.
  Rejected: fresh one-sentence definitions by a worker (the run's exist and
  are better); folding the content into WO-015 (the scene order is already
  the largest member, and the catalog is its own page the operator reads);
  typing every untyped row (the scene interprets five kinds). NoOp cost: the
  scene reading a catalog that cannot tell it what flocking is. Reopen: the
  join finds a changed map digest, or the operator wants a fresh definition
  where the run's reads badly.
- **D7 WO-015 is rewritten: the rail carries only tools the engine runs,
  grouped by what they do, each with its definition in the inspector; the
  "three tools per work" rail rule and the clarify fixture go, because the
  former came from the drafted prompt and the latter answered a question
  the toy answers by running; the use criterion is first; a design brief
  makes the field the page with two candidate chromes; the root route moves
  to the scene; the dependency moves to WO-019; the engine, the seam, the
  clock, determinism and the trials stand as filed.** Source: D2 to D6; the
  critic's verdict on The Twenty; the operator's picture of the scene (the
  2026-10-24 capture entry 9 and design B T1). Rejected: a new order
  instead of a rewrite (the engine design is sound and refuted twice; the
  text is what changed); keeping the untyped tools in the rail as a
  special case (a rail where most entries refuse is the hollow page again).
  NoOp cost: the first toy shipping with a rail that mostly refuses and a
  chrome that looks like the catalog list. Reopen: this pass's refutation
  holds on the rewrite, or WO-019 leaves a rail-floor tool untyped.
- **D8 WO-018 is rewritten: the run's nineteen toys enter the shelf in full
  from `toys.jsonl` with their purpose, question, evidence, graduation path
  and tools; the six new toys are designed in full; The Art of War's map
  rows carry the mapper's definition and the public text's maxim where the
  maxim is the concept, and the overlap check goes; the shelf and the toy
  page are reading surfaces under the catalog's brief; the use criterion is
  first; the dependency on WO-019 is added.** Source: D2, D3 and D5; the
  2026-10-24 capture entry 9 (the operator's sixth order); `toys.jsonl` at
  its digest. Rejected: toys as ids and titles (the reading that produced
  it rested on the struck rule); prose design documents (the record is what
  the shelf shows). NoOp cost: a shelf of nineteen titles. Reopen: the
  operator picks a toy and names a different shelf.
- **D9 WO-016, WO-017 and WO-008 are amended: each gains the use criterion
  and the walkthrough step; WO-016 and WO-017 gain a design brief; the
  "nothing from intake" clauses go; receipt 010's items are written into
  the text they narrow (WO-016: the sink's `Origin` and `Host` check, its
  directory in DotLn-Angular's own ignored tree, the counts the executor
  records, the rule per idea kind, the stored-value spec, the observed
  `actor` labels, the row count by spec, the public sources; WO-017: the
  fold canonical and the derivation its check, `twin:read` with the mock's
  claim and the `denied` user on `/denied`, the `new Function` and `eval`
  grep with the module-export spec, the unknown-variant spec; WO-008: the
  at-rest probe over IndexedDB, Cache Storage and cookies, the reload row).**
  Source: D3 to D5; receipt 010. Rejected: leaving the briefs to the pass
  before each activates (the pass that said it would is this one, and a
  brief costs a paragraph). NoOp cost: three orders judged by greps and
  landing in the default look. Reopen: this pass's refutation holds on an
  amendment.
- **D10 The sequence is WO-013, WO-014, WO-019, WO-015, WO-016, WO-008,
  WO-017, WO-018, serial; WO-019's base is WO-014's merge commit
  `1c3a4ff2…`; the other open orders stay provisional and publish right
  under v0.96.1; the root route moves to the scene in WO-015; WO-008 stays
  where the 2026-10-24 pass put it.** Source: the operator's acceptance of
  the road (capture entry 7); WS-001's dependency plan; the 2026-10-24
  pass's D11. Rejected: WO-008 before the scene (the operator accepted the
  road as written); a lane pair of WO-019 and WO-016 (they share
  `app.routes.ts`, the menu and the translation file). NoOp cost: none; a
  sequence is a reading. Reopen: the operator moves an entry by a word.
- **D11 Receipt 010's thirty-one known issues are disposed into the texts
  or declined with their reason (§9.1); none stays on the receipt for a
  later pass.** Source: the 2026-10-25 pass's §9.1 (the next pass amends
  them for these). Rejected: carrying them a second time. Reopen: as each
  item's reopening observation on the receipt.
- **D12 WO-014's planning handoff and its register rows are disposed:
  D010's cross-area mapping pass is declined as its own pass, because the
  catalog's content (hooks, analogs and relations readable on the page) is
  the representation the handoff asked for and the operator's play is the
  exploration; D015's untyped-share and title-overlap conditions are moot
  under D3 and the target screening request is withdrawn; D019's
  fork-interaction mechanism is answered by the workstream's house rules as
  the fork-owned carrier of role duties (rules 24 and 25 bind through the
  order text, the workstream and the operator record, which survive kit
  updates because they are instance-owned) and by the request to core in
  §11 for an instance-owned role duty; D020's cold-load shift stays
  deferred to the order that next touches the shell and the board (§10 C1);
  D023's bundle-check scope goes into WO-019 step 9; D024's workstream item
  is fixed in rule 13; D027's draft observability is a request to core in
  §11 and a reminder in each order's known issues; WO-013-D005 and D007 are
  settled by WO-014's shipped route and the `run-many` form in every order
  this pass writes.** Source: the handoff; the register rows; the
  implementation guidance. Rejected: a bounded inspection of the kit's
  overlay mechanism in this pass (WO-014's repair inspected the installed
  declaration and found identity, narrowing and grants; the question is
  core's to answer, and the fork's duty is carried either way). NoOp cost:
  none beyond the rows' own. Reopen: core answers §11 item 2.
- **D13 The failure feed is routed: WO-014's VER-001 fail (criterion 7, an
  avoidable initial-bundle growth) was repaired and VER-002 passed at
  376.91 kB, no criterion changes; D006's amendment was the operator's
  explicit authorization during execution and stands in the closed order;
  WO-013's repair answered FINAL-002's kit-lint refusal, fixed by v0.97.1,
  and WO-013 merged.** Source: the feed; WO-014-D011 to D022; WO-013-D015
  to D019. Rejected: an order for any of them. Reopen: a later target
  verification fails on the initial bundle.
- **D14 The register: the eight fired rows of §3 re-disposed (five settled,
  two moot and settled, D020 deferred again); the candidates of §10
  deferred with their conditions; the other rows left as they are.**
  Source: §3 and §8. Reopen: as each row says.
- **D15 Requests to core are written as the operator's paste (§11): the
  drafted prompt's authorship and the request to annotate core's record;
  the instance-owned role duty for acceptance by use; the draft publish's
  observability at `verification-result pass`; and the confirmations.**
  Source: the operator's standing preference for a paste-ready prompt; D2,
  D4, D12. Rejected: a GitHub issue on the platform (the paste stays the
  route until WO-193). Reopen: WO-193 lands.
- **D16 No research worker is spawned; one fresh default `dotln-worker` refuter judges the pass's subject (WO-019, the rewritten WO-015 and WO-018, the amended WO-016, WO-017 and WO-008, and the sequence), because the dispatch line named no Fable worker.** Source: the kit's
  worker pins; the dispatch line; the operator's research run read directly
  at the files the orders name (the 2026-10-24 pass's D17 stands). Rejected:
  `dotln-worker-fable` (not named); research workers over the run (the
  named files were read whole). Reopen: the operator names Fable.
- **D17 The operator record changes, dated 2026-10-26: the pasted-block rule
  (how the operator directs); pages they would use and the look judged
  (what they want); clean-room commentary about the works they reference
  and a rule recorded as theirs that they did not give (what they do not
  want); the mined-data preference corrected; the pace.** Source: the
  capture; D2 to D5. Reopen: the operator changes any of them.
- **D18 Document ceilings are unchanged: `docs/product/purpose.md` is not
  edited (its product paragraph still describes the app the operator
  wants), and the kit's product documents carry no instance ceiling.**
  Source: the purpose block; `doc-ceilings.json`. Reopen: a pass edits the
  purpose.
- **D19 WO-014 was closed by the operator as `DotLn Angular v0.4.0` at 12:34:52Z, before this pass was dispatched, and WO-013 as `DotLn Angular v0.3.0` the evening before; the workstream, the profile and the operator record record both closes, and the pass's first reading (the close pending) is corrected in the same pass with its cause named: a target order's close is read from the target's tags and Releases after a fetch, never from the launchpad's status projection, which carries no target close.** Source: `gh release view v0.4.0` and `v0.3.0`; the segments of WO-007, WO-013 and WO-014 on `main`; the operator's correction of 14:08Z. Rejected: leaving the correction to the next pass (the handoff had told the operator to run a close that had already run). NoOp cost: none. Reopen: the kit starts recording a target close in the order's segment, at which point the status becomes a valid source.
- **D20 Receipt 011's twenty-six known issues are carried to the pass before each order activates, with this pass's answer to each written in §9.2, because the kit admits one judgment per pass and binds a text change only to a hold's disposition, and receipt 011 holds nothing.** The pass first amended the six orders to answer the findings and asked for a second judgment; the plan check refused the changed bytes (no text-bound disposition exists for a known issue) and the refute command refused a second judgment without changed observed evidence, so the orders were restored to their judged bytes and the answers moved here. The items that matter before WO-019 is verified are its executor's to meet within authority (the hygiene grep, the degrade path, the two layout components, the chunk sizes recorded, the operator's ruling recorded); the two walkthrough criteria that name the wrong build (WO-008, WO-017) are three and five orders away. Source: receipt 011; product 07 (one judgment per planning pass; criterion repairs use their text-bound disposition); the kit's refusals observed in this session. Rejected: a second judgment (refused by the kit, and its rule is sound: a judgment is paid once per pass); an override (no hold exists to override). NoOp cost: none beyond the next pass's amendment, which it pays anyway. Reopen: WO-019's verifier judges criterion 6's substring count unmet while one layout remains, which is the case this pass tried to prevent.

Immaterial lenses for the document-only writes (orders, workstream,
profile, operator record, register, ledger): the same as the previous
passes'; no code, configuration beyond the instance's own `docs/control/`,
activation, tag, publication in the target, or merge.

## 7. Core's answers

None were carried: the dispatch brought no paste, and nothing in core's
record directs this pass. Core's planning document of 2026-10-24 was read
only to settle the rule's authorship (§2, D2).

## 8. The register

One hundred and three rows read at revision `4189e2fe…`. `followups --sync`
mints the rows of §10 and `--apply` takes the dispositions below in one
batch from a contained ignored request file; the revisions are in §14.

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-c5936c588840e1da | WO-014-D010 (the cross-area mapping pass and the authoring trace) | settled: the catalog's content on the page is the representation; the trace is the operator's play; no pass of its own (D12) |
| FUP-ceaf0a88a6cf39da | WO-014-D015 (the receipt's untyped-share and title-overlap conditions; target file screening) | settled: moot under D3; the screening request is withdrawn (D12) |
| FUP-ea16db0faba5126e | WO-014-D019 (the fork-interaction mechanism) | settled: the workstream's house rules carry the duties; the kit question is §11 item 2 (D12) |
| FUP-cc72e6b187cbb0ab | WO-014-D020 (the cold-load layout shift) | deferred again: to the order that next touches the shell and the board (§10 C1) |
| FUP-5e0a2f662a416a4c | WO-014-D023 (the bundle check's scope) | settled: WO-019 step 9 and criterion 7 (D6) |
| FUP-d03ddc0e7d6681a8 | WO-014-D024 (the WS-001 `tools:lint` naming) | settled: rule 13 names the `workspace-tools` project (D12) |
| FUP-e6309e0d159b3f8a | WO-014-D027 (the draft publish's observability) | settled for the fork: §11 item 3 and every order's known issues name the verifier's session as the one that runs it (D12) |
| FUP-40112dbc26c91d9e | WO-013-D007 (the not-found route) | settled: shipped in WO-014 (#7) |
| FUP-c789b3662529a11c | WO-013-D005 (the `run-many` form) | settled: applied in every order this pass writes |
| the candidates of §10 | this pass | deferred with their conditions |
| the other rows | the carried candidates and the earlier decisions | left as they are with their conditions unchanged |

## 9. Orders filed, rewritten and amended, and the sequence

One order filed (WO-019, D6); two rewritten (WO-015, D7; WO-018, D8); three
amended (WO-016, WO-017, WO-008, D9); WO-013 and WO-014 closed and
unchanged. The sequence reads WO-013, WO-014, WO-019, WO-015, WO-016,
WO-008, WO-017, WO-018, serial (D10); WO-019's base set to `1c3a4ff2…`.

What the operator sees after each order lands (rule 24's table):

| Order | What lands | What the operator can do afterwards |
| --- | --- | --- |
| WO-019 | the run's definitions, relations and hooks on every tool; the reading surface; the scene's tools typed | open a work, read a concept, follow it, search, see where it runs |
| WO-015 | the root route on a dark field: twenty units, the rail of tools the engine runs with their definitions, flock, arrive, formation, the instruments, trials, saved compositions, the first look | play, for the first time |
| WO-016 | the agents of a recorded order in their slots, the idea shelf, a drop that redraws the use case | drop an idea on an agent and watch |
| WO-008 | sign-in and permissions through the mocked provider; nothing playable | required by the operator's standing rule on security |
| WO-017 | the patience lane, three variants, flips, the results beside the recorded order | play with a model of themselves |
| WO-018 | The Art of War in the catalog with its maxims; twenty-five toys read in full; the shelf | pick the next toy to build |

### 9.1 Receipt 010's known issues, disposed

- **WO-014** (closed; its successors carry the answers): (a) the overlap
  check, moot under D3; (b) the read observation beside each worker's
  statement, moot, no fan-out in WO-019; (c) the status semantics, kept as
  typed, untyped and background with `kind` placing scene elements and
  metrics (WO-019 design); (d) the data-access seam, WO-019 keeps
  `CatalogToken` and the loader unchanged while the join writes data only
  (WO-019 known issues); (e) the summary's pinned maps, the `v1` summary's
  `maps` list, which WO-018's map joins; (f) a token ceiling for the
  fan-out, moot in WO-019 and recorded per worker in WO-018.
- **WO-015**: (a) the rail distinguishes nothing because it offers only
  tools the engine runs; (b) the clarify affordance is replaced by a kept
  note. Both in the rewrite.
- **WO-016**: (a) the `Origin` and `Host` check; (b) DotLn-Angular's own
  ignored tree named; (c) the counts the executor records with no starter
  figure; (d) the rule per idea kind in `machinery.md`; (e) the stored-value
  spec; (f) the observed `actor` labels; (g) the row count by a spec; (h)
  the public sources named. All eight in the amendment.
- **WO-008**: (a) the sequence is the operator's (D10); (b) the at-rest probe
  over IndexedDB, Cache Storage and cookies; (c) the reload row; (d) the
  text is amended for the use criterion and these two items, which is the
  weighing the finding asked for; (e) the provider swap stays a known issue.
- **WO-017**: (a) the fold canonical, the derivation its check; (b)
  `twin:read`, the mock's claim and the Cost line; (c) WO-008's reload row;
  (d) the `new Function` and `eval` grep with the module-export spec; (e)
  already in the text; (f) the unknown-variant and parse-failure spec. All
  in the amendment.
- **WO-018**: (a) the overlap window, moot with the check removed; (b) the
  toy-source tools carry definitions; (c) "store" named in the known
  issues and the `v1` summary admits an in-repo map; (d) the horizon's
  added commands recorded against the orders' rows. All in the rewrite.

### 9.2 Known issues from this pass's receipt, by order

The refutation (receipt 011, §14) returned `aligned-with-findings` on every
order and for the plan with twenty-six known issues and no hold. The kit
admits one judgment per pass and binds only hold dispositions to text
changes, so the six judged orders stay at their judged bytes and the pass
before each order activates amends them for these and pays its refutation
then (D20); an executor who activates an order before that amendment meets
each inside the order's authority and records it in the decisions file. The
answers this pass gives are listed here so nothing is re-derived; the
receipt's reopening observations are on the receipt.

- **WO-014** (closed; its text is bound). (a) Criterion 2's invariant is the
  opposite of WO-019's: by design, a closed order's criteria describe its
  own tree and WO-019 supersedes the layout on the operator's direction;
  WO-019's known issues say so at its next amendment. (b) Criterion 5's
  quarantine claim is self-attested: WO-014 has run, its evidence README is
  its record, and WO-018 carries the launchpad's read observation beside
  each statement. (c) Criterion 6's not-found link points home to `/board`
  while WO-015 moves the root to `/scene`: WO-015's next amendment
  re-points the link in its step 11 and its e2e, and its executor does so
  within authority if it activates first.
- **WO-019** (the next order; its executor meets these within authority and
  records them). (a) Criterion 8 asks whether the run's definitions are the
  owner's to publish: the operator ruled on 2026-10-26 that the works they
  reference, the run's maps of them and the designs cut from them lie
  outside the clean room (capture SHA-256 `9ec78ddb…`; WS-001 rule 23);
  the executor records that ruling in the decisions file at activation, and
  the next amendment names it in the known issues. (b) Criterion 2 removes
  the scrub and keeps no rule against a path on this machine in the data:
  the join carries the row's fields and never a path, and the executor adds
  one hygiene grep (`/Users/`, `/home/`, a drive letter) to the check as
  bounded cleanup; the next amendment writes it into criterion 2. (c)
  Criterion 3's seam with WO-015 is `TransformKind` plus `ParamSpec`: a
  behaviour is a tool whose kind and parameters select the term (a
  `steer.blend` tool with one weighted term is seek, arrive, separation,
  velocity matching or wander; a `formation.twoLevel` tool's pattern
  parameter is wedge, line or column), WO-015's `tool-mapper` reads nothing
  else, and the reading pane and the rail read the same `sceneTools` list;
  the next amendment states it in the typing bullet. (d) Criterion 6 tests
  the layout pick by a substring count: the executor builds the two
  candidates as two layout components under `layouts/` so that one directory
  remains, and the next amendment replaces the count with a directory count,
  the convention WO-015 then shares. (e) Criterion 1 proves the screenshots
  by file count: the walkthrough names each screenshot by step and width,
  and the next amendment ties the count to the names. (f) Criterion 5 has no
  degrade path for the persisted history: the store ignores a value that
  fails to parse and prunes an id the regenerated data lacks, and a spec
  asserts it; the next amendment writes the spec into criterion 2. (g)
  Criterion 7 holds the budgets while the data grows: the executor records
  each catalog chunk's size beside WO-014's figure in the evidence README and
  raises no budget; the next amendment says so.
- **WO-015.** (a) Criterion 5's two sources of truth: one list, `sceneTools`,
  and `/scene?tool=<id>` for a refused or unknown id arrives with no tool
  chosen and a notice naming why; the next amendment adds both to the design
  and the e2e. (b) Criterion 7's chrome pick: two layout components and a
  directory count, as WO-019.
- **WO-016.** (a) Criterion 5's sink would accept the launchpad's ignored
  intake: it refuses a directory outside the Git root of the checkout it
  runs from. (b) Criterion 3's self-referential count: the verifier recounts
  the ids in each role's Origin stamp independently and records the recount
  beside the spec's. (c) Criterion 2's role mismatch: a row whose actor ran
  as planner, refuter or release-close is an `unknown`-slot beat naming the
  role, never dropped. (d) Criterion 1's actor field: the reducer's scrub
  also fails a run of 32 or more hexadecimal characters and a UUID shape.
- **WO-008.** (a) Criterion 8's walkthrough names the production build while
  criterion 5 keeps the mock out of it: the walkthrough runs on the served
  `mocked` configuration build (WO-007's configuration for e2e and play),
  the production grep stays, and the next amendment says so in criterion 8
  and step 10; the same fix for WO-017's criterion 10. (b) Criterion 5's
  path grep would fail on endpoint paths the client library legitimately
  contains: the mock's modules carry one marker string (`dotln-mock-idp`)
  and the grep targets it and the key identifier. (c) Criterion 7's
  escalation (eleven receipts on unrun text): recorded; no further text
  change to WO-008 without a new observation, which the next amendment's
  two clauses above are.
- **WO-017.** (a) Criterion 7's twin behind the only permission on a build
  with no provider: WO-008's provider question, carried there; the
  walkthrough runs on the `mocked` configuration (criterion 10). (b)
  Criterion 4's `twin:check` on a shallow checkout: it names the fetch and
  the gate's clone is full, carried. (c) Criterion 8's `grep -c "results"`:
  the next amendment names the two phrases that matter, "judged by results"
  and "never by agreement".
- **WO-018.** (a) Criterion 5's unknown fan-out cost: the executor stops the
  fan-out with a decision if the per-worker totals, summed with its own, pass
  WO-014's recorded order total. (b) Criterion 4's provenance of the run's
  toy designs: the operator's ruling, recorded at activation as WO-019 does.
  (c) Criterion 6 has no bundle criterion: the next amendment adds the
  production build within the declared budgets and the chunk sizes beside
  WO-019's. (d) Criterion 3's three meanings of "store": the committed data
  the app ships, the mining store that stays candidate C1, and the feature
  stores; the next amendment names them in the known issues.

The planning document itself is not a judged order, so the two observations
the operator sent while the receipt was filed are recorded in §4 and §11.

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The shell's and the board's look under the design direction, with
  WO-014-D020's cold-load shift repaired in the same order: the shell's
  header, menu and footer under the type scale and palettes, and the board
  either over a recorded fixture whose sources are available or rebuilt as
  a reading surface of a recorded order.** Not filed: the operator accepted
  the scene first and the look briefed inside the toy orders; the shell is
  touched by every sub-app order through its menu item and takes the
  direction then. Reopen when WO-015 merges and the operator says the shell
  or the board is next, or when the operator picks neither candidate in two
  consecutive pull requests.
- **C2 A self order carrying an instance-owned verifier, refuter and
  reviewer duty for acceptance by use, if core declines to carry one in the
  kit.** Not filed: the duty binds today through the order text, the
  workstream and the operator record; whether the kit's role text can carry
  it is §11 item 2. Reopen when core answers, or when a verifier records a
  use criterion met with no walkthrough.
- **C3 A fork document or lint check that refuses a definition list or the
  key-value list composite in a feature's templates, so rule 24's last
  sentence is mechanical.** Not filed: WO-019, WO-015 and WO-018 each carry
  the grep as a criterion; a shared check is worth its own order when a
  third feature ships one. Reopen when a page ships a label-value list past
  a use criterion, or when three orders carry the same grep.
- **C4 The catalog's worker's-reading rows checked against the books, where
  the operator owns the book.** Not filed: the reading surface marks them
  and the operator reads them; checking is a research pass the operator
  runs, not an order. Reopen when the operator finds a definition wrong
  enough to matter and asks.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged except where §8 says
otherwise: the 2026-10-25 pass's C1 and C2 (the merge-ordering restatement,
the two-project check form); the second 2026-10-24 pass's C2 (the lane
pair) and C4 (the twin's fourth result); the first 2026-10-24 pass's C1 to
C6 and C8 (the mining store and the app's API, the Babylon.js painter,
manim, the graduation route, the remaining toys, the twin's later lanes, the
board under `/machinery`, which the root route's move to the scene makes
less pressing and does not decide); CI on the fork, required approvals,
retitling the two published `DotLn` Releases, a lane pair of small self
orders, the workstream pass's C1 to C10, the house library's granularity
pass; and the Entropy Reducer on WS-001's repositories, waiting on the
operator's dispatch.

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning
session; the fork's next pass reads the answer. Each item names the record
it rests on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its planning pass of 2026-10-26 on starter v0.99.0 (docs/planning/acceptance-by-use-2026-10-26.md §2, §4, §6 and §11). Read each against the record it names; file, decline or defer each with its reopening condition.

1. A drafted prompt carried a rule the operator never gave. Your planning document of 2026-10-24 (docs/planning/intake-mining-run-routing-2026-10-24.md) carries at its line 604 the plain prompt your session drafted for the instance, whose last paragraph reads "Nothing from intake goes into committed files beyond ids, short titles and generic terms"; your §10 table of the operator's 27 decisions carries no such rule, and the operator's own typed messages that day carry none. The fork's 2026-10-24 pass took the first-person block as the operator's statement and recorded the clause as the operator's rule in its workstream, its operator record and five orders, and built an allow-list on it that stripped every definition from a 3,463-row catalog; the operator struck it on 2026-10-26. Asks: annotate line 604 and §10 so a reader knows the clause was the session's; and record in product 07 (§Operator-opened planning pass, the dispatch items) that a block a session drafts for the operator to paste carries that session's authority and not the operator's, whatever its grammatical person, so an instance pass reads it as context and the operator's own typed words as direction. Blocks nothing.

2. Acceptance by use as a role duty. On 2026-10-26 the operator directed, for the DotLn-Angular workstream permanently, that every order be accepted by someone using the page against the session the order states, with the verifier filing a dated walkthrough and screenshots, the refuter asking whether the operator would use the page and whether it is the previous page with different fields, and the final reviewer performing the session before passing. The fork wrote it as WS-001 rule 24 and binds its roles through the order text, the workstream and the operator record, because the kit's role text is yours. This is WO-014-D019's question in concrete form: is there a supported, instance-owned way to add a duty to the verifier, refuter and reviewer role text that survives regeneration and upgrade (the installed Contributor overlay exposes identity, narrowing and grants; product 08's implementation overlay describes publication)? If not, the fork asks for a core update that adds a documented extension contract for instance-owned role duties, keeps core defaults distinct from the fork's, detects an incompatible update, and tests that the duty survives a starter update; the duty text above is the first instance. A convenience with a working route today (the order text), so the fork continues.

3. The verified-phase draft publish is unobservable at verification-result pass. WO-014's verifier recorded pass and published nothing; the operator had no draft to read before dispatching final review and no CI run existed for the branch before it (WO-014-D027, FINAL-001 F1). Ask: at verification-result pass on a target order, print the draft publish command the verifier's session is to run, or refuse the event until a draft head is recorded, whichever your design prefers; the fork's orders name the verifier's session as the one that runs it meanwhile. A convenience.

4. The refutation receipts read as a form filled to length. The operator, reading the fork's receipt 011, met the same sentence on WO-013's policy resistance for the fourth time (receipts 008 to 011; WO-013 was carried by hash each time and its judgment printed again), and saw that every order's systemTraps paragraph runs 1,200 to 1,800 characters and opens with the same trap, because plan-goal-review-v1 requires a non-empty paragraph per order and the refuter's work order asks how all eight traps apply. Their reading: the instrument for detecting rule beating is producing it. Asks: (a) render a carried order as a reference to the receipt that judged it rather than reprinting its paragraphs; (b) make the trap judgment structured, per trap an observed, not-observed or not-applicable value with a reason only when observed, so a refuter writes substance where there is some and nothing where there is none; (c) the same for criticalPathAndNoOp, removalBalance and failureBehavior where the answer is unchanged from the previous receipt on the same text. The fork keeps paying the refutation as the kit defines it meanwhile. A convenience with a real cost in reading time.

5. Confirmations and acknowledgements: WO-014 merged as DotLn-Angular #7 on 2026-10-26 and its records as the fork's #31; its release close is the operator's next dispatch. The fork took no update this pass (upstream unchanged since v0.99.0). The 2026-10-25 block's items stand; WO-013's fix, verification and final review ran under v0.97.1 and v0.99.0 and the one-commit lint range was observed. Nothing else is asked of core for the DotLn-Angular work: the fork filed WO-019 (the catalog as something to read), rewrote WO-015 and WO-018 and amended WO-016, WO-017 and WO-008 from the operator's direction and its own receipt 010.
```

## 12. Write-backs

- `docs/work-orders/WO-019-catalog-as-content.md`: filed (D6).
- `docs/work-orders/WO-015-soldier-scene.md`,
  `WO-018-art-of-war-map-and-toys.md`: rewritten (D7, D8).
- `docs/work-orders/WO-016-machinery-view.md`,
  `WO-017-digital-twin-patience-lane.md`,
  `WO-008-authentication-and-permissions.md`: amended (D9).
- `docs/planning/sequence.md`: WO-019 before WO-015 (D10).
- `docs/workstreams/WS-001-dotln-angular.md`: the outcome and delivery
  state, the member table, the dependency plan, rule 13, rules 23 to 25, G6,
  §Design direction, §The app and its sub-apps, the road table, the delivery
  states, the member graph (D2 to D10).
- `docs/repositories/dotln-angular.md`: WO-014's merge and the pass (D19).
- `docs/operator/README.md`: the dated entries of D17.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's second outcome, the
operator's sandbox, judged by the operator on 2026-10-26 as hollow: the
rule that emptied the catalog struck at its source rather than patched
(D2, D3); acceptance redefined around use for every order from here on
(D4); the look briefed and judged instead of defaulted (D5); the catalog
given its content in the one order that precedes the first toy (D6); the
first toy rewritten so what the operator asked for is what lands (D7); and
the road stated in the operator's terms, what they see after each order
(§9). What the pass refuses to do: run the standard pass over the register
and cut another plumbing order (the trap the operator named); redesign the
app before any toy exists (the operator accepted the scene first); tell the
operator they are right and change nothing; frame their reference material
as permitted under the clean room instead of outside it (D3); phrase a use
criterion the kit's screen refuses (D4); or touch the two closed orders'
judged text. What stays manual by the kit's design: the merge of this pass,
WO-014's release close, the resume phrases, the paste to core. Traps named before the material choices, and the one that caught the pass anyway: acting before understanding (the whole record, the code, the baselines, the capture and the run's designs were read before the first finding; and yet the pass stated WO-014's close as pending from an unfetched clone and a projection that cannot show it, the fact the operator caught at the handoff, D19); attributing a pasted block to the operator (the capture
was read line by line and the authorship traced to core's commit);
sweeping generalization of the clean-room correction (the quarantine files
and the control-record scrub stay, because they are the floor) and
over-literal reading of it (every mechanism built on the struck rule goes,
not only the one field); rule beating (a use criterion whose only artifact
is a file count would be the old failure in new clothes, so the criterion
requires the verifier's statement of what was read or watched); and
oscillation on the look (a brief inside each order with the operator's
pick, not a vendor theme and not a redesign order). The outcome matched the
aim as read at entry and as the operator accepted it in the written
picture: the corrections recorded at their source, the next four orders
specified as experiences and judged by use, and a road the operator can see.

Cost: no research workers; one refuter, resumed once for a formatting repair (§14 records its worker time, tokens and tool uses and the dispatch-to-file wall-clock); the reads of the
target's data and baselines, the capture and the run's design files under a
minute of task time each; `plan start`, `failures` and `conditions` under
two seconds; `npm run meta -- --plan-cost` records the table after the
subject revision. Document ceilings: no product document is edited by this
pass, so `docs/control/doc-ceilings.json` is unchanged (D18).

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.
The results, the commits, the refutation and the session cost are recorded
below as they ran.

Results on the subject before its commit: `npm run meta` no budget breach
(WO-014 tokens 117,733,609; first verification failed in 2 of the last 8
closed orders; 0 reopen candidates; unset limits unset); `followups --sync`
minted the four rows of §10 (C1 `FUP-dfb896b07eb669e5`, C2
`FUP-6855f3bdf797428a`, C3 `FUP-c8ff21340f2adc0a`, C4
`FUP-357da592f1bc545d`; revision `2f1818d4…`); `--apply` took the thirteen
dispositions of §8 in one batch from the contained ignored request file
`docs/intake/followups-apply-2026-10-26.json` (eight settled, five deferred;
revision `6c359482…`); `work-orders index` regenerated both pages with the
WO-019 card and the member graph (`--check` PASS on both); `lineage index`
regenerated; `docs-check` PASS (1 product document at 2,095 non-exempt bytes
under the 2,305 ceiling; 39 declared historical link occurrences; the one
pre-existing advisory on WO-003-D003); `publication:check` reporting no
editions declared; `npm run test:docs` on the uncommitted subject 12 passed
and the two plan tasks failed only because WO-019 was not yet committed;
`plan check` after the subject commit needing a receipt for the new dated
heading. The subject parser wants the field spelled `**Objective:**`
exactly, so the three orders that had carried the label "Objective (the
operator's session)" were respelled before the commit, the session's wording
moved after the colon.

Commits: the subject `60def4c` (fifteen files: WO-019, the five amended or
rewritten orders, the sequence, WS-001, the profile, the operator record, the
ledger and its index, the register, the index page and this document), the
cost table `f6a8d3b`, the receipt `ab5f6b9` (the helper's commit), then the
commit that carries §9.2, §4's last row, §11 item 4 and this section, and a
cost-table refresh.

Refutation: one fresh `dotln-worker` (the default type; the dispatch line
named no Fable worker), spawned in the background with only the canonical
prompt the helper printed (`npm run plan -- refute`, pass scope, 108,490
bytes: the identity, mask and lens, the work order, the compiled subject,
the output instructions, the result schema and the worker instructions) and
the instruction to return the frozen JSON and a one-line statement. It read
that one file and nothing else, judged WO-014, WO-019, WO-015, WO-016,
WO-008, WO-017 and WO-018 (WO-013 carried by hash), and returned
`aligned-with-findings` on every order and for the plan, with twenty-six
known issues (§9.2) and no hold: the subject supplied no vision passage id,
the critical path was undeclared, and no cost-table trap showed worsening.
Worker time 682 s, 151,654 worker tokens, 13 tool uses on the judgment. The
receipt helper refused the first filing because the statement named the
prompt file by its absolute path; the same worker was resumed once to replace
the path with a placeholder (16 s, about 1,600 more tokens, 2 tool uses),
the judgment untouched, and the second filing succeeded. Receipt
`2026-10-26-planning-99f4ffe8f2227691-011` (`docs/planning/refutations/`),
worker type `dotln-worker`, scope `pass`, 1,014,316 ms from the dispatch
marker (13:30:13Z) to the file (16.9 minutes, the repair included), judged
subject `sha256:4ed6059a…` equal to the committed and workspace subjects;
the gate after it: 11 receipts, 11 passes, no advisory. Dispositions: none
needed (no hold). The pass then amended the six orders to answer the
findings and asked for a second judgment; `plan check` refused the changed
bytes ("changed Cost declaration has no text-bound disposition", then
"existing work-order bytes changed") and `plan refute` refused a second
judgment ("one judgment per pass; dispositions settle repairs, and another
judgment requires changed observed evidence"); the six orders were restored
byte for byte to the receipt's commit, the answers moved to §9.2, and D20
records the decision.

Session cost at the handoff (`node scripts/harness.mjs usage`, source
`claude-transcript-message-usage`, scope `dispatch`) is recorded in the
pull request's body and the handoff; one subagent of the cap of 20, 19
remaining. The dispatch-to-branch wall-clock: the operator's dispatch at
12:40Z, their go-ahead at 12:58Z, the branch at 13:02Z, the subject commit
at about 13:25Z, the receipt at 13:46Z.

`npm run test:docs` after the receipt, on the tree that carries this
section, is reported in the pull request together with the final
`plan check`.
