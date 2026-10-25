# The standard pass on starter v0.99.0: the update first, core's answer to the fork's two questions, WO-013's second refusal and its route, and the receipt-009 amendments, 2026-10-25

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-25 at 20:39Z naming a
standard pass with the latest upstream and carrying core's answer summary to
this fork's requests of the second 2026-10-24 pass (§11 there), written in a
core planning session the operator opened right after they stopped on
WO-013's second refusal. The operator's own line says three or so core orders
shipped after that summary was written and leaves it to the pass to read the
context or ignore it; the pass read it. The dispatch is captured verbatim in
ignored intake (`docs/intake/notes/planning-2026-10-25.md`, SHA-256
`9506b972e4a6947ad2d0b3085300467d3aa46114b047b5356249e0180c82cd48`), a
sibling record and never a source to copy from. The operator's one later act
in the session, the merge of update #28 a minute after it opened, is the
go-ahead the standing direction expects (the operator merges, the session
finishes).

This document is planner synthesis of that capture; this instance's records
(the nine previous planning documents and their receipts, WS-001, the
operator record, the profile, the register, the control segments, the
orders); core's release notes for v0.97.0, v0.97.1, v0.98.0 and v0.99.0 and
the kit at `939af628`; WO-013's live records read from its worktree
(`../DotLn-Instance-wo013`: `docs/control/orders/WO-013.jsonl`, decisions
D010 to D015, FINAL-002, the register rows its verification and final review
minted there, all uncommitted and the order's to commit); the target
repository and WO-013's target worktree at `99a30bef`; and the kit's own
sources where a decision needed them (`scripts/lib/target-base.mjs` and
`scripts/lib/target-commit-lint.mjs` for the review lint's range,
`scripts/lib/work-order-workstream.mjs` for the `self` reading). The
clean-room screen found public packages, the platform's public releases and
the operator's own repositories; the only private material read is the
operator's own capture, paraphrased.

Authority: a document-only planning pass on
`planning/2026-10-25-standard-pass-v0-99-0` from clean `main` at `660f11e`
(after #28). The update ran before the branch opened, on the standing
direction of 2026-10-23 and 2026-10-24 that the update goes first so that
core's fixes reach the pass: a detached preview worktree under `.runtime/`,
one merge on `chore/starter-update-v0.99.0`, one index regeneration, the
gates, pull request #28, the operator's merge and
`node scripts/launchpad.mjs update --finish` on `main` (D1). The pass amends
six orders, activates nothing, publishes nothing in the target, edits no
active order's text and never merges. Its refutation is the pass's
independent verification (§14).

Fan-out plan, stated before the first spawn: one refuter, no research
workers, no descendants; the 20-admission cap leaves 19. The dispatch line
named no Fable worker, so the refuter is the default `dotln-worker`.

## 2. Entry observations

| Subject | Observation | Source |
| --- | --- | --- |
| Launchpad | `main` at `a7a0762` at the dispatch, clean (#27 merged); after #28, `main` at `660f11e` (starter v0.99.0, core `939af628…`), bootstrapped by `update --finish` (35 generated surfaces, the local-terms list present) | `git status`, the finish output |
| WO-007 | `closed` on `main`; canonical status still selects it there, because WO-013's control segment is uncommitted in its worktree | `npm run resume -- status --json` |
| WO-013 | in its worktree (`wo-013` at `a7a0762`, equal to the `main` of the dispatch), uncommitted: twelve events; after FINAL-001's fail (17:40Z), the fix of 22:33Z to 22:55Z integrated starter v0.96.1 and moved the generator-log entry (D010, D011); VER-002 `pass` at 23:09Z on target tree `dc997234…`, whose session's draft publish opened DotLn-Angular #6 (`99a30bef…`, parent `2ab4f285…`, 83 files, a 61-character subject, CI green); FINAL-002 `fail` at 23:49Z: every criterion met, no new defect, and `final-review-result pass` refused by the kit's pre-review commit lint, which ranged 17 commits from the activation base and met two merged subjects of 78 and 90 characters (D015); phase `needs-fix`, legal next action `fix`; the target branch head is the draft commit with a clean status | the worktree's `WO-013.jsonl`, `current.md`, FINAL-002, D010 to D015; `gh pr view 6` |
| Upstream | four refresh commits past the v0.96.1 base: v0.97.0 (core WO-224, the Entropy Reducer over a registered target or a workstream's repositories, 2026-10-24T23:46Z), v0.97.1 (WO-231, the review lint from the described base, 03:37Z), v0.98.0 (WO-232, a release does not break the instance: the two fork questions answered in code, 16:49Z), v0.99.0 (WO-204, source-writer containment, 20:37Z, two minutes before the dispatch); `upstream/main` at `dd1924b`; the preview reported 73 replaced, 2 added, 0 removed, 0 refused, 925 unchanged, no instance actions, build `fnv1a64:89c252a87a21a514` to `fnv1a64:757a6a5b29ee87d9` | `git fetch --no-tags upstream`, `gh release view` on `DylanBWood/DotLn`, the bounded preview from a detached worktree |
| The update | one merge commit `218192d` (78 files, 5,076 insertions, 785 deletions, no conflict); `npm ci`; `harness emit` 35 surfaces with no drift; lineage index current; `npm run sync` every artifact current with no action; no repair needed; the index regenerated from the branch (`1c80bd6`) read the three `self` members `current; stale: no` with base and target at `main` (`a7a0762…`) although the branch's HEAD was past `main`, the reading #26's branch could not give (D1) | the commands on the branch |
| The gates on the update branch | `harness check` 35 surfaces; `launchpad verify` 1,000 files at `939af628`; `npm test` 7 passed in 13.35 s; `npm run test:docs` 14 passed in 15.87 s with 0.1 s of lane wait; `plan check` 9 receipts, 9 passes, no advisory; `work-orders index --check` current before and after the regeneration | the gate summaries |
| Pull request #28 | `:arrow_up: Take starter v0.99.0`, opened ready at 20:47:07Z, merged by the operator at 20:48:17Z (`660f11e`); `update --finish` fetched, checked the fast-forward, advanced `main` and ran bootstrap (one preparation step) | `gh pr create`, `gh pr view`, the finish output |
| WO-231 against the real worktree | read-only in `../DotLn-Angular-wo013`: `refs/remotes/origin/main` resolves to `2ab4f285…`; the merge base of the branch head `99a30bef…` and that ref is `2ab4f285…`; the activation base `bc9133e9…` is its ancestor; `git rev-list --count 2ab4f285..HEAD` prints 1 and `bc9133e9..HEAD` prints 17; the one commit's subject is 61 characters. The described range the v0.97.1 lint reads is therefore the one commit FINAL-002 said would pass | the Git reads |
| `plan start` | window since receipt 009: the failure feed on `main` shows no new verdict (WO-013's two verdicts since receipt 009 are in its uncommitted segment), 0 local gate failures, 0 host denials, 0 release closes, 1 intervention and 1 shell diagnostic, both unassigned (this session's own zsh word before the branch opened), 0 long phases, 0 repeated gate runs; record: 8 recent closes, 4 delivery and 4 machinery tracks; conditions 0 holding, 0 unknown, 145 decision conditions and 83 register rows not evaluated | `npm run plan -- start standard-pass-v0-99-0`, `npm run plan -- failures`, `npm run plan -- conditions` |
| Register | 25 pending rows at revision `c73358dd…`, all deferred; C1 and C3 of the second 2026-10-24 pass fire on core's answer and v0.98.0 (§3, §8); the Entropy Reducer row of 2026-10-21 fires on v0.97.0 (§3, D6); WO-013's five rows (D005 to D009) exist only in its worktree's register (D15) | `npm run plan -- followups --export`, the worktree's `followups.json` |
| DotLn-Angular | `main` at `2ab4f285` (#5), two Releases (`v0.1.0`, `v0.2.0`); draft #6 open on `feat/sub-app-menu` at `99a30bef…` (created 2026-10-24T23:09:34Z, mergeable, CI and title runs green); the registered clone clean at `2ab4f285` | `gh pr list`, `gh release list`, `git -C ../DotLn-Angular status` |
| The kit's board schema | `packages/console/uifa-board-v1.schema.json` at v0.99.0 has SHA-256 `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`, unchanged | `shasum -a 256` |
| Component versions | kernel 0.8.0, skeleton 0.69.0 (from 0.68.0, WO-204), console 0.5.0, compiler 0.31.0, beacons 0.1.1; no dependency added; the executor skill's prose changed in v0.99.0 (the two review workers' distinct briefs), carried by the re-emitted `.claude/` and `.agents/` skills | the package manifests, `git diff` on the skills |
| Local tags | eight starter tags (`v0.85.0` to `v0.92.0`, message `Starter vX.Y.Z`) were present in this repository from earlier passes' fetch slips and absent from `origin`; `remote.upstream.tagOpt` is `--no-tags`; this pass deleted the eight local tags (§13) | `git tag -l`, `git ls-remote --tags origin`, `git config` |
| The host | 16 logical CPUs, load 14.2 at the conditions read; lanes capacity 8, no holder | the conditions output |

## 3. Reopening observations

Fired conditions, each re-disposed in §8: FUP-d1dadda4ed57029c (C1 of the
second 2026-10-24 pass, the workstream field against the plan gate: core
answered yes to both questions and shipped WO-232 in v0.98.0, so the row
settles with the withdrawals standing as the record, D2);
FUP-d541e70c6f87eaa6 (C3 of that pass, the `diverged` marks: WO-232 reads
`main` for `self` members, confirmed in the field on #28's branch, D2);
FUP-4cbacbbeca2cefab (C1 of 2026-10-21, the Entropy Reducer on WS-001's
repositories: v0.97.0 carries WO-224, so the condition occurred and the row
is re-deferred on the operator's dispatch, D6). WO-013-D015's own reopening
condition (the starter update leaves the pre-review lint ranging from the
activation base) did not occur: v0.97.1 moves it, read against the real
worktree in §2. WO-013-D005 and D007, boarded for the next planning pass and
for the first order that changes `app.routes.ts`, are taken in D4 and D5.
No other deferred row's lifecycle condition fired.

## 4. Observations, dated 2026-10-25

| Item | Observed | Source |
| --- | --- | --- |
| v0.97.0 (core WO-224) | `npm run entropy -- review --repository <id> [<commit>]` and `--workstream WS-NNN` freeze a registered clone at a recorded commit the way the launchpad is frozen, run the pinned reviewer, the blinded refutation and the immutable receipts in the launchpad, and dispose into its register with rows a pass allocates to the workstream's orders; a workstream is a resumable sequence, one distinct repository at a time, `self` included; a clone never fetched or whose remote is not named `origin` refuses with Git's bare message (D017), a target tracking a top-level `docs` file cannot be dispatched (D018); the first live target review is the operator's dispatch at about USD 5 to 9.50 and roughly 1,000 s per member repository; no role text changed | core's release notes, Read before upgrading |
| v0.97.1 (core WO-231) | `final-review-result pass` on a target order lints the commits from the merge base of the subject and the clone's `refs/remotes/origin/<baseBranch>` when the activation base is its ancestor, names the range, the described base, the activation base and the offending commit in every refusal, keeps the activation-base range when the ref is absent and says so, fetches nothing (a stale ref is the operator's to refresh), and records nothing differently; the trigger was this fork's WO-013 (`subject.length: 90 of 72 characters` on a merged commit, 17 linted where the pull request carries one); known issues: a stale, unrelated or non-commit ref is not named in the refusal (FUP-e4fa2bbf7c3968ec) and a ref moved onto the subject empties the range (FUP-378c5638bf515e52); the new helper `scripts/lib/target-base.mjs` is shared by the review lint and the publish; no role text changed | the same |
| v0.98.0 (core WO-232) | a `self` member's base and integration target read the launchpad's `refs/heads/main`, so a refresh from a planning or update branch records `current`; a closed member without the `**Workstream:**` field is admitted from the workstream document with one advisory, an open member without it still refuses; an execution amendment stays bound when one exact leading field line is added later to an order whose filed source lacked it, in both title representations, and bindings made with the field present also stay matched; a field-only grouping change on a judged order still records its authorization through `amend-order`; no amendment is withdrawn or rewritten by an update, and withdrawals an instance made stand as its record; core's fresh gate runs the core-only `instance-history` suite over a committed fixture instance carrying this fork's four record shapes; the rule is written where releases are: a new or tightened kit check must admit the records the previous release admitted or the release is held; no role text changed | the same; product 07 at v0.99.0 |
| v0.99.0 (core WO-204) | the source writer commits into a private object store on a detached worktree and the host imports after admission; command grants are revoked by two independent removals; a writer's request ends its step as a typed hold the vertical records as `NeedsHuman`; the Codex and Claude writers requalified live; skeleton 0.69.0; the executor role text changes: its two review workers before `implementation-ready` get distinct briefs (the criteria adversary seeks counterexamples, failed criteria and missing regression tests; the design improver seeks simpler structure, lower coupling, sound error handling and six-month maintainability; an issue found in the other lane is transferred, never reviewed twice); surfaces this fork does not run beyond the role text | the same; `.claude/skills/dotln-executor/SKILL.md` after #28 |
| Product 07 at v0.99.0 | `planning: entropy reducer <id>` with a trailing registered repository id or workstream id selects `subject` and `review` with that selector, each member dispatched one at a time with its receipt filed separately and all survivors disposed in the pass, cost paid once per repository; a 2026-10-25 screen for orders that change which commit a lifecycle step computes from (name every reader of that field across `scripts/` and `packages/`); a Read before upgrading never asks an instance to edit a closed record by hand | the kit document after #28 |
| WO-013's second refusal | `scripts/resume.mjs` at v0.96.1 called `lintReviewedTargetCommits` with the reviewed subject's `baseCommit`, the activation base, before any event; `git rev-list --count bc9133e9..HEAD` printed 17 and `2ab4f285..HEAD` printed 1; the subjects over 72 characters in the wider range were a documentation commit merged in DotLn-Angular #3 (90 characters) and the #4 merge commit (78), both on the target's `main`; FINAL-002 declined to edit the kit, raise the limit, rewrite merged history or propose override, and sent the order to fix under the operator's route (a) of D009; its three publication bodies stay as drafts beside the report for the next review | WO-013's FINAL-002 and D015 |
| WO-013's worktree register | VER-001 and the two reviews minted five rows there (`FUP-c789b3662529a11c` D005, `FUP-40112dbc26c91d9e` D007, `FUP-032068baddbe1e4e` D008, `FUP-6f60d461e1ef101b` D009, `FUP-bc6508078fd59255` D006) and FINAL-002 disposed them (D014, D015): D005 and D007 deferred to the next planning pass and to the order that next changes `app.routes.ts`, D008 and D009 deferred again on the new blocker; none of the five exists in `main`'s register, which `followups --export` on this branch confirms (25 rows, none of WO-013's) | the worktree's `followups.json`, the export |

## 5. The operator's direction, synthesized

**The update first, again.** The outcome asked for is the fork at the latest
starter with the pass on top of it; the standing direction (2026-10-23 and
2026-10-24, D1 each) puts the update before the planning branch, and the
operator merged #28 within a minute (D1).

**Core's answer, read against the records, not the paste.** The operator
relayed core's summary and said three or so core orders shipped after it was
written: the fork should understand the context or ignore it. The pass
understood it: the summary's "v0.97.0 and the WO-231 release in one update"
became four releases in one update, the answer block it points to (§13 of
core's planning document) was not pasted and is not needed, because the
release notes of v0.98.0 are the answer in code, and the two questions are
answered yes and yes (§7, D2).

**WO-013, where the operator stopped.** The operator stopped on the second
refusal, which the fork's records diagnosed and core fixed in v0.97.1 the
same night; with the kit on `main`, the operator's next dispatch is the fix
in WO-013's worktree (D3). The pass edits nothing in the active order and
nothing in its worktree.

**The pass that drains receipt 009.** The second 2026-10-24 pass froze five
orders at its judged subject and listed receipt 009's seventeen known issues
for the pass that follows WO-013's merge. WO-013 has not merged, but this
pass pays a refutation anyway, so it writes the seventeen into the orders
now rather than carrying them a third time (D4), and takes WO-013's two
boarded order-text observations with them (D4, D5).

## 6. Decisions and NoOp records

Each decision names its source, the alternative it rejects, the NoOp cost
where the decision is to act, and the observation that reopens it.

- **D1 Starter v0.99.0 is taken through update pull request #28, opened
  ready from `main` before the planning branch, merged by the operator and
  finished on `main` by the session; the branch carries the merge and one
  regeneration of the work-order index from the branch, no repair.** Source:
  the dispatch; README §Taking upstream updates; the four releases' Read
  before upgrading, none of which asks this fork to edit a record. Rejected:
  opening the planning branch first (the pass would have run on the v0.96.1
  kit and the fix WO-013 waits on would still be outside `main`); leaving
  the index regeneration to the planning branch (regenerating from the
  update branch is the field test of WO-232's `self` reading, and the
  committed page now reads `main`'s head as the base, which is the fact).
  NoOp cost: WO-013 waiting in `needs-fix` with no route open. Reopen: #28
  is reverted.
- **D2 Core's answer summary is read against v0.98.0 and v0.99.0: fork item
  1 is answered yes to both questions by WO-232 (the amendment binding
  admits the leading field added later; the workstream check admits a closed
  member without it), the two withdrawals of #26 stand as this fork's record
  and nothing is rebound, because a closed order has left the judged
  horizon by design; fork item 2 is confirmed and fixed by WO-232 (the index
  reads `main` for `self` members), observed in the field on #28's branch;
  items 3 to 6 are recorded; candidates C1 and C3 of the second 2026-10-24
  pass settle.** Source: the paste; core's v0.98.0 notes; the regenerated
  index on the update branch. Rejected: undoing the withdrawals (core says
  they stand and the gate offers no rebinding of a closed order); asking
  core for the §13 block the summary points to (the release carries the
  answer). Reopen: a later update refuses WO-011 or WO-012 again on the
  field, or the index reads a `self` member `diverged` from any branch.
- **D3 WO-013's route after its second refusal: the kit's review lint at
  v0.96.1 ranged from the activation base, which FINAL-002 diagnosed and
  core moved to the described merge base in v0.97.1 (WO-231); that kit is
  on `main` since #28, so the operator's next dispatch is `resume: fix` in
  `../DotLn-Instance-wo013`, which integrates `main` with the worktree
  helper, runs its printed affected checks, changes no target byte, and
  confirms against the updated kit that `final-review-result pass` lints
  only `2ab4f285..HEAD` (one commit of 61 characters, the read-only reading
  of §2); then `resume: verify` republishes draft #6 at the same tree and
  `resume: final review` records pass and publishes with the three bodies
  revised from FINAL-002's drafts. This pass changes nothing in WO-013's
  text, base, events or worktree; whether the operator merges this pass
  before or after the fix makes no difference to it, because the fix needs
  the kit, not the amendments.** Source: WO-013-D015's `followup` and
  `reopenWhen`; core's v0.97.1 notes; the Git reads of §2; the operator
  record (a fix that waits on a kit release waits for the update to reach
  `main` first). Rejected: an execution amendment or a base change (no
  scope changes, and the activation base stays the base of every record by
  core's design); route (b) of D008 (core delivered, so the operator's
  chosen route (a) stands). Reopen: the fix's `final-review-result pass` is
  refused again, or DotLn-Angular's `main` advances past `2ab4f285` before
  the fix integrates (D015's own condition; a stale tracking ref then lints
  more commits, and the fix fetches the base branch in the target clone
  before the review).
- **D4 WO-015, WO-016, WO-008, WO-017 and WO-018 are amended for receipt
  009's seventeen known issues, each written into the text it narrows, with
  WO-013-D005's rule that a multi-project check is written as
  `npx nx run-many -t <target> -p <a> <b>` applied where an order carried the
  `npx nx test <a> <b>` form.** Per order: WO-015's canvas search covers
  `createElement`, `OffscreenCanvas` and `getContext` outside the wrapper
  (criterion 2), the first-scene list has a floor of flock, arrive, wedge,
  line and column (steps 8 and 12, criterion 4), a refused step leaves the
  frame hash and the clock unchanged (step 3, criterion 1), and a stored
  value that fails to parse yields the idle field (the store, criterion 5);
  WO-016's `actor` is one composite the schema declares and the reducer's
  scrub screens each of its values against a personal account name or
  hostname (the types, the reducer, criterion 1), the repairer slot reads the
  executor's entry and the card says why, with the e2e counting four role
  slots and the operator figure (the fixtures, step 13, criteria 3 and 7),
  and the sink refuses a directory that is not Git-ignored while a drop
  with the sink down is applied and persisted before the post (the sink,
  step 11, criteria 5 and 6); WO-008's app-side storage grep runs over the
  files the order changes (criterion 1), the sub-app routes stay public and
  the order's own `/account` page is the gated surface the matrix drives,
  so no earlier e2e spec gains a sign-in and WO-018's shelf stays public
  (the observed gap, the design, the routes, step 9, criterion 4), a
  production build with `auth` at `null` keeps the public sub-apps and shows
  the unavailable state at `/login` with `jose` in `devDependencies` (the
  Cost line, step 2, criterion 5), the Cost line names the refutations
  paid, and step 7 uses the `run-many` form; WO-017 defines readiness as the
  hand-back's completion row and says a zero-patience variant dominates by
  construction while the fourth result stays the operator's (the fold, step
  6, criteria 2 and 8), `twin:check` names the commit and the fetch on an
  absent base (step 4, criterion 4), variants are lazy chunks under the
  budget (the model, criterion 8), and the twin replays on the replay
  library's clock so no third tick contract exists (the feature, step 6,
  criterion 8); WO-018's map check runs inside `check:fixtures` so the gate
  carries it (the design, step 2, criterion 1), an id and a short title are
  not prose from the run and the decisions file says so (the records,
  criterion 3), each toy-source tool names its public source in a `source`
  string (the fan-out, criterion 3), and the fan-out record puts the
  launchpad's own read observation beside each worker's self-attested
  statement (step 7, criterion 4). Source: receipt 009's known issues and
  their reopening observations; WO-013-D005 (the `npx nx test a b` form runs
  only the first project); the execution guide's screens (a scope decision
  is written into every criterion it narrows; no criterion requires a
  reading of natural language). Rejected: leaving the seventeen on the
  receipt for the pass after WO-013's merge (this pass pays a refutation
  either way, and an executor who activates WO-014 next would meet WO-008's
  gating decision only through WO-017's text); scoring the twin's agreement
  with the operator's beats to answer WO-017 (a) (the operator's rule
  forbids it; readiness is defined and the dominance is stated instead);
  gating the existing sub-apps in WO-008 to give the matrix a route (the
  operator's sandbox is served by open sub-apps, and a gated page of the
  order's own is enough for the matrix). NoOp cost: five orders activating
  with the defects the refuter named, and WO-008 retrofitting a session onto
  three e2e specs. Reopen: this pass's refutation holds on an amendment, or
  an executor records that an amended clause cannot be met as written.
- **D5 WO-014 is amended with the not-found route WO-013-D007 boards for the
  first order that changes `app.routes.ts` (a wildcard route last in the
  file rendering a translated not-found page with a link to `/board`, a
  routes spec and an e2e case) and with the `run-many` form in step 3.**
  Source: WO-013-D007 (an unknown path fails the initial navigation, leaves
  the main region empty and shows the generic error notice; `main`'s routes
  have no wildcard either); WO-013-D005. Rejected: a separate self or
  target order for the route (one route and one page belong to the order
  that opens the file); leaving it to WO-014's executor by decision (a
  criterion is judged as written, and the e2e case is the proof). NoOp
  cost: `/tools/x` staying an empty main region after the Tools group
  exists. Reopen: WO-014's executor finds the wildcard route conflicts with
  a lazy child's own not-found handling.
- **D6 The Entropy Reducer on WS-001's repositories is not run by this pass:
  v0.97.0 carries WO-224 and v0.99.0's product 07 names the dispatch form
  (`planning: entropy reducer WS-001`), so the row's condition occurred, but
  the review is a paid live episode whose authorization is the operator's
  own phrase, about USD 5 to 9.50 and roughly 1,000 s per distinct
  repository (two for WS-001: `self` and `dotln-angular`); the row is
  re-deferred on the operator's dispatch, and the pass recommends it after
  WO-013 merges so the target's subject carries the sub-app shell.** Source:
  core's v0.97.0 notes (the first live target review is the operator's
  dispatch; nothing runs on a cadence); product 07 at v0.99.0; the register
  row's own words (the operator opens the pass). Rejected: running the two
  episodes inside this standard pass (a standard pass's subject is the
  register, and the phrase is the operator's to spend); declining the row
  (the operator asked for it on 2026-10-20). Reopen: the operator's
  `planning: entropy reducer WS-001` dispatch (§11 asks core to confirm the
  phrase's form first, so the first paid episode is not spent on a
  mis-dispatch).
- **D7 The sequence is WO-013, WO-014, WO-015, WO-016, WO-008, WO-017,
  WO-018, serial; no base is set, because no open order's predecessor has
  merged since the last pass.** Source: the second 2026-10-24 pass's D6 and
  D7 (unchanged reasons). Rejected: a lane pair (candidate C2 of that pass
  stands with its condition). Reopen: the operator says they will run two
  worktrees at once, or WO-013 merges and the next pass chooses to set
  WO-014's base.
- **D8 WS-001 stays `active`; its member table and delivery states record
  WO-013's second cycle (the fix, VER-002, draft #6, FINAL-002's refusal and
  the v0.97.1 route) and the amendments of D4 and D5; its dependency plan
  records that v0.97.1 reviews from the same merge base v0.96.1 publishes
  from.** Source: the facts of §2 and D3 to D5. Rejected: a `delivered`
  state for anything (nothing merged). Reopen: WO-013's merge.
- **D9 The repository profile records WO-013's fix, VER-002, draft #6,
  FINAL-002's refusal and the fix route under v0.97.1; the operator record
  gains the dated bullets of this pass (the pace, the fourth `update
  --finish`, the blocker-to-core pattern that served WO-013 twice).**
  Source: the facts of §2 and D1 to D3. Rejected: rewriting the profile's
  `Checked:` line (WO-007's reviewed commit is still the last verified tree
  on `main`). Reopen: WO-013's close.
- **D10 The register: C1 and C3 of the second 2026-10-24 pass settled by
  WO-232 (D2); the Entropy Reducer row re-deferred on the operator's
  dispatch (D6); the other twenty-two rows left with their conditions; the
  two new candidates of §10 deferred with theirs.** Source: the rows' own
  reopening conditions. Rejected: disposing WO-013's five rows here (they
  live in its worktree until its records merge, D15). Reopen: as each row
  says.
- **D11 Requests to core are written as the operator's paste (§11): the
  field confirmations at v0.99.0 (WO-232's `self` reading and WO-231's
  range both observed), WO-013's second refusal as WO-231's field case with
  what the fork will report after the fix, one observation on worktree-minted
  register rows, one question on the `planning: entropy reducer WS-001`
  phrase before the first paid episode, and acknowledgements.** Source: the
  operator's standing preference for a paste-ready prompt; D2, D3, D6, D15.
  Rejected: a GitHub issue on the platform (the paste stays the route until
  WO-193). Reopen: WO-193 lands.
- **D12 No research worker is spawned; one refuter judges the pass's
  subject (the six amended orders and the sequence), as the default
  `dotln-worker`, because the dispatch line named no Fable worker.** Source:
  the kit's worker pins; the dispatch line. Rejected: `dotln-worker-fable`
  (not named). Reopen: the operator names Fable on a dispatch line.
- **D13 The failure feed is routed: `main`'s feed shows no new verdict,
  because WO-013's VER-002 pass and FINAL-002 fail are in its uncommitted
  segment; read live, FINAL-002's fail is a kit defect of the class D008
  met, fixed in v0.97.1 and taken by #28; no order is filed and no
  criterion is changed for it; the one intervention and the one shell
  diagnostic in the window are this session's own zsh word before the
  branch opened.** Source: the feed; D015; the session journal. Rejected: a
  self order for the lint (core's). Reopen: a later target final review is
  refused on a commit outside the described range.
- **D14 Document ceilings are unchanged: no product document is edited by
  this pass, and the kit's product documents carry no instance ceiling.**
  Source: `docs/control/doc-ceilings.json`; the execution guide. Reopen: a
  pass edits `docs/product/purpose.md`.
- **D15 The register rows an order mints in its worktree are read live and
  acted on, never disposed from `main`: WO-013's D005 and D007 rows are
  taken into the amended orders (D4, D5), its D008 and D009 rows are the fix
  dispatch's to settle on the republished draft and the final publish, and
  all five reach `main`'s register with the order's records; the pass
  records the shape as an observation for core (§11).** Source: the
  worktree's register and D014, D015; the export on this branch. Rejected:
  copying the rows into `main`'s register by hand (the collector mints ids,
  and a copied row would collide at merge). Reopen: core says a pass on
  `main` should see pending rows of active worktrees.

## 7. Core's answer of 2026-10-25, read against v0.99.0

The paste carried three bullets. **Fork item 1**: yes to both questions;
WO-232 admits the leading `**Workstream:**` field in the amendment binding
and admits a closed member without the field with an advisory; the
withdrawals stand as the fork's record; re-binding was never available,
because closed orders leave the judged horizon by design. Read against
v0.98.0's notes, which say the same in code and add that a field-only
grouping change on a judged order still records its authorization through
`amend-order`: recorded, C1 settled (D2). **Fork item 2**: confirmed and
reproduced in core (a cost-table refresh after a first commit regenerated
the index and marked a core order `diverged`; core restored the committed
page); the repair is the index reading `main` for `self` members, allocated
to WO-232. Read against v0.98.0 and the field: the three `self` members read
`current` from #28's branch with base and target at `main`, so the reading
the second 2026-10-24 pass had to restore by hand after its cost-table
refresh needs no restoring now; C3 settled (D2). **Items 3 to 6** recorded;
"the fork takes v0.97.0 and the WO-231 release in one update" became four
releases in one update (D1); the paste-ready answer block core wrote (§13 of
its planning document) was not relayed and is not needed, because the
releases are the answer. Nothing in the paste directs this fork's
DotLn-Angular work, and nothing in it is taken as current over the records.

## 8. The register

Twenty-five pending rows read at revision `c73358dd…`. `followups --sync`
minted the two rows of §10 and `--apply` took the five dispositions below
in one batch from a contained ignored request file; the revisions are in
§14.

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-d1dadda4ed57029c | C1 of the second 2026-10-24 pass (the workstream field against the plan gate) | settled: core's answer (yes to both) and WO-232 in v0.98.0; the two withdrawals of #26 stand as the record and no rebinding exists for a closed order (D2) |
| FUP-d541e70c6f87eaa6 | C3 of the second 2026-10-24 pass (the `self` members' `diverged` marks) | settled: WO-232 reads `main` for `self` members; the index regenerated from #28's branch read all three `current` with base and target at `main` (D2) |
| FUP-4cbacbbeca2cefab | C1 of 2026-10-21 (the Entropy Reducer on WS-001's repositories) | deferred again: v0.97.0 carries WO-224 and v0.99.0 names the phrase; the episodes are the operator's to dispatch and pay, recommended after WO-013 merges (D6) |
| the two new rows of §10 | this pass | deferred with their conditions |
| the other twenty-two | the deferred candidates of 2026-10-21, 2026-10-23 and the two 2026-10-24 passes, WO-004-D010, D013; WO-005-D009, D011; WO-006-D014, D015; WO-007-D018, D019; WO-012-D008; the house library pass | left as they are with their conditions unchanged; WO-007-D019 keeps WO-013's final-review reading (item (e) left, the others not occurred) in its own worktree's record |

## 9. Orders amended, the sequence and the known issues carried

Six orders amended (D4, D5); WO-013 unchanged (D3); the sequence reads
WO-013, WO-014, WO-015, WO-016, WO-008, WO-017, WO-018, serial (D7); no base
set. Receipt 009's seventeen known issues are disposed into the five orders'
text (§6 D4 lists where); WO-013-D005's two observations are disposed (the
`run-many` form in WO-008 and WO-014; the dependency restatement a NoOp,
§10 C1) and WO-013-D007's route is in WO-014 (D5).

### 9.1 Known issues from this pass's receipt, by order

The refutation (§14) returned `aligned-with-findings` on every order and for
the plan, with thirty-one known issues and no hold; WO-013 is carried by
hash. The six judged orders are frozen at the judged subject, so the next
pass amends them for these and pays its refutation then; they are listed
here so nothing is re-derived, and an executor who activates an order before
that amendment meets each inside the order's authority and records it in the
decisions file. The receipt's reopening observations are on the receipt.
Where this pass's own records already answer a finding, the answer is named.

- **WO-014.** (a) The allow-list guards by field name only; an overlap
  check of every string in the data against the run's definitions (a shared
  run of eight consecutive words, WO-018's form) would catch a near-verbatim
  face or title that the field check admits. (b) Criterion 5 rests on each
  worker's own statement; WO-018 criterion 4 now puts the launchpad's read
  observation beside each statement and WO-014, the larger fan-out, lacks it.
  (c) The objective classifies rows four ways and the status enum has three
  values; where a scene element and a metric are recorded is unasserted, and
  the untyped share is unbounded. (d) No criterion asserts the data-access
  seam that lets candidate C1 replace the bundled source without edits in a
  feature (the design names `CatalogLoader` as the seam; a criterion does
  not). (e) The summary pinned at 3,463 rows and eleven maps meets WO-018's
  seventh work with no rule for an in-repo map. (f) The fan-out's token spend
  has no ceiling or stop rule declared before the spend.
- **WO-015.** (a) The rail lists three tools per work while the engine
  interprets only the first scene's kinds, so most per-work entries equip
  only to be refused, and no criterion requires a visible distinction
  between a tool the engine runs and one it refuses. (b) The clarify
  affordance has no defined effect (the design says a typed note answered
  from `clarifications.json` or exported as JSON; no criterion says so).
- **WO-016.** (a) The sink's loopback check does not cover a page on another
  origin open in the operator's browser posting to `127.0.0.1`; an `Origin`
  or `Host` check is the missing guard. (b) "The repository's ignored intake"
  names no repository, and a sink pointed at the launchpad's intake would be
  a file-system channel into planning input that bypasses the issue route
  (this pass's amendment requires a Git-ignored directory; the next names
  DotLn-Angular's own tree). (c) Criterion 3's counts are asserted against
  counts the executor set, and the v0.96.1 baseline in the parenthetical can
  mislead a verifier reading a later starter. (d) No rule maps each idea
  kind to its effect on the beats, so the e2e passes with the beats
  unchanged (the caption rule says only `addWait` moves them; the finding
  asks for the rule per kind in `machinery.md`). (e) No spec covers a stored
  value under `dotln-angular.machinery` that fails to parse. (f) Whether
  `actor` carries harness, model and effort in the committed fixtures, and
  whether a model label is a pin or an observed value, is unstated (the
  amended types say the composite carries them; the fixture's values are the
  executor's to record). (g) `grep -c '"recordedAt"'` counts lines, not rows.
  (h) The copies' provenance is the operator's own systems rather than
  public mining, and whether the sources are public is unstated (the
  platform's control segments and role files are public repositories; the
  order should say so).
- **WO-008.** (a) The foundation item sits behind three outcome orders and
  WO-014's fan-out lies on its route; the sequence is the operator's (D7).
  (b) The at-rest probe reads only `localStorage` and `sessionStorage`, not
  IndexedDB, Cache Storage or cookies. (c) The matrix has no row for a page
  reload, which WO-017's e2e needs after its sign-in. (d) Ten receipts name
  this order before its activation; this pass's amendments changed four of
  its criteria, and the next pass weighs leaving its text alone. (e) The
  provider swap is claimed in the objective and documented, never
  exercised; a later member with a real provider pays for it (already in the
  known issues).
- **WO-017.** (a) The derivation and WO-016's fold compute the same WO-221
  figures twice with no canonical one named. (b) The Cost line names no
  change to `routePermissions` or the mocked provider's users and no
  criterion names the permission that guards `/twin` (this pass's WO-008
  amendment makes `/twin` the first gated sub-app; the next WO-017 amendment
  names `twin:read` and the Cost entries). (c) The reload after sign-in rests
  on an unspecified re-authentication path (WO-008 (c)). (d) The
  `JSON.parse` grep does not prove "no interpreted model": a walked rule
  table or `new Function` passes it. (e) `twin:check` failing on an absent
  base blocks a shallow checkout on history (this pass's amendment names the
  commit and the fetch; the gate's clone is full). (f) No spec covers a
  stored value that fails to parse or names an unknown variant.
- **WO-018.** (a) The overlap check's window is unstated (this pass's
  amendment says eight consecutive words; the criterion should). (b) The
  toy-source tools rest on short fields and the `source` string alone,
  because no text exists to check against (recorded in the amended known
  issues). (c) "Store" means committed data here and the deferred mining
  store in candidate C1, and the summary's admission of an in-repo map is
  unstated (WO-014 (e)). (d) The horizon adds commands and checks with no
  removal beyond the two arriving pages, unmeasured until the orders' rows
  carry metrics.

## Candidates not filed, with their reopening conditions (section 10)

- **C1 Restating WO-013's dependency on WO-007 as merge ordering rather than
  a functional need (WO-013-D005, item 2; receipt 008's known issue, whose
  reopening condition occurred when the subject imported nothing from the
  state, data-access or events libraries).** Not done: the order is active
  in `needs-fix` and a planning pass never edits an active order's judged
  text without operator direction; when it closes it leaves the horizon, so
  the restatement would never be judged. Reopen when WO-013 is withdrawn
  under D008's route (b) and a successor is filed; then the successor's
  `Depends on` says merge ordering.
- **C2 A fork document check over order texts for the `npx nx test <a> <b>`
  form, which Nx reads as one project and one argument (WO-013-D005, item
  1), refusing it in favour of `npx nx run-many -t <target> -p <a> <b>`.**
  Not filed: this pass rewrote the two occurrences (WO-008 step 7, WO-014
  step 3) and the other orders carry single-project forms; a check is worth
  its own order only when the form recurs. Reopen when a third order is
  filed or amended with the two-project form, or a verification fails a
  criterion on it.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged except where §8 says
otherwise: the second 2026-10-24 pass's C2 (the lane pair of WO-014 and
WO-016) and C4 (the twin's fourth result); the first 2026-10-24 pass's C1 to
C6 and C8 (the mining store and the app's API, the Babylon.js painter,
manim, the graduation route, the remaining toys, the twin's later lanes, the
board under `/machinery`); CI on the fork, required approvals, retitling the
two published `DotLn` Releases, a lane pair of small self orders, the
workstream pass's C1 to C10, the house library's granularity pass; and the
Entropy Reducer on WS-001's repositories, now waiting on the operator's
dispatch alone (D6).

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning
session; the fork's next pass reads the answer. Each item names the record
it rests on.

```text
planning: observations and requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) recorded in its planning pass of 2026-10-25 on starter v0.99.0 (docs/planning/standard-pass-v0-99-0-2026-10-25.md §2, §4, §6 and §11), answering your summary of 2026-10-25 (WO-232 for both fork questions; v0.97.0 and WO-231 in one update). Read each against the record it names; file, decline or defer each with its reopening condition.

1. Confirmations in the field at v0.99.0 (four releases in one update, #28): the preview took 73 replaced, 2 added, 0 removed, 0 refused, 925 unchanged kit files with no conflict, no re-emit drift and no repair (build fnv1a64:89c252a87a21a514 to fnv1a64:757a6a5b29ee87d9); npm test 7 passed; npm run test:docs 14 passed; harness check 35; launchpad verify 1000 files at 939af628; npm run plan -- check 9 receipts, 9 passes, no advisory; update --finish advanced main and bootstrapped (fourth use). WO-232 confirmed: npm run work-orders -- index run on the update branch (HEAD two commits past main) recorded the three self members (WO-003, WO-011, WO-012) integration current, stale no, with base and target at main's head; the committed page carries that reading. The board schema's digest is still 7d20e785… at v0.99.0. The executor skill's distinct briefs (WO-204) arrived through the re-emitted .claude/ and .agents/ skills with no drift. No ask.

2. WO-013, your WO-231's field case: on 2026-10-24 at 23:49Z the fork's FINAL-002 was refused by lintReviewedTargetCommits ranging from the activation base (17 commits, two merged subjects of 78 and 90 characters on the target's main, the order's own commit 61 characters), as WO-231's notes describe; the review recorded fail with the diagnosis (WO-013-D015) and sent the order to fix under the route the operator chose for this class. Read-only against the real target worktree at v0.99.0: refs/remotes/origin/main resolves to 2ab4f285, the merge base of the branch head 99a30bef and that ref is 2ab4f285, the activation base is its ancestor, so the described range is one commit. The fix dispatch that follows is the first field use of WO-231's review lint and the second of WO-230's publish; the fork reports in its next block whether final-review-result pass linted that one commit and whether the publish's lint agreed, and whether the stale-ref case (FUP-e4fa2bbf7c3968ec) was met. No ask.

3. Observation, no ask beyond the answer: the register rows an order's verification and reviews mint in its worktree (WO-013's five rows for D005 to D009, minted by followups --sync there and disposed by its final review) do not exist in main's register until the order's records merge, so a planning pass on main reads them live from the worktree and acts on them (this pass took D005 and D007 into WO-008 and WO-014) without disposing them. Is that the design, the records pull request carrying them, or should a pass on main see pending rows of active worktrees?

4. Question before the first paid episode: v0.99.0's product 07 says planning: entropy reducer WS-001 selects subject --workstream WS-001 and review --workstream WS-001. Does the prompt hook's dispatch reader (WO-226) pass the trailing id to the planner role as the selector, and does the role text, which WO-224's notes say names entropy subject without a token, need the operator to restate the selector in the message? The fork intends to dispatch it after WO-013 merges (two distinct repositories, self and dotln-angular, about USD 5 to 9.50 and 1,000 s each by your REVIEW-002 observation) and wants the phrase right the first time. WO-224's known issue (a clone never fetched, or a remote not named origin) does not apply: the fork's clone has origin and a fetched main.

5. Acknowledgements: the withdrawals of #26 stand as the record and nothing is rebound (your item 1); the 2026-10-25 screen on orders that move a base, the release rule that a new or tightened check admits what the previous release admitted, and the instance-history suite are read and welcome; WO-204's surfaces are not run here. The fork's local repository held eight starter tags (v0.85.0 to v0.92.0) from earlier passes' fetch slips, local only; this pass deleted them and remote.upstream.tagOpt --no-tags is set. Nothing is asked of core for the DotLn-Angular work; the fork amended WO-008 and WO-014 to WO-018 from its own receipt 009 and WO-013's boarded rows and left WO-013's text to its fix.
```

## 12. Write-backs

- `docs/work-orders/WO-014-toolbox-catalog-pipeline.md`,
  `WO-015-soldier-scene.md`, `WO-016-machinery-view.md`,
  `WO-017-digital-twin-patience-lane.md`,
  `WO-018-art-of-war-map-and-toys.md`,
  `WO-008-authentication-and-permissions.md`: amended (D4, D5).
- `docs/planning/sequence.md`: unchanged (D7).
- `docs/workstreams/WS-001-dotln-angular.md`: WO-013's member row and
  delivery state, the dependency plan's v0.97.1 sentence, the six amended
  members' rows (D8).
- `docs/repositories/dotln-angular.md`: WO-013's second cycle and the fix
  route (D9).
- `docs/operator/README.md`: the dated bullets of D9.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.
- On the update branch, merged as #28: the kit at v0.99.0, the re-emitted
  harness bundle and skills, the index regenerated from the branch (D1).

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path, the
foundation where a feature is added by convention: WO-013 unblocked a second
time by the kit the fork now carries, with the route stated for the operator
in the order's own words (D1, D3); the six orders behind it corrected where
the refuter found the defects, before any of them pays a failed verification
(D4, D5); and core's answers taken as code rather than as prose (D2). What
the pass refuses to do: edit an active order's judged text (D3, C1), score
the twin's agreement with the operator's beats (D4), gate the operator's
sandbox to give a matrix a route (D4), spend the operator's live-review
budget on its own authority (D6), or copy worktree-minted rows into `main`'s
register (D15). What stays manual by the kit's design: the merge of this
pass, the fix dispatch in WO-013's worktree, the resume phrases, the paste
to core, the Entropy Reducer dispatch. Traps named before the material
choices: anchoring on the paste (it named two releases and the field held
four; the release notes were read instead); acting on a summary as if it
were the answer block (the release is the answer); rule beating (an
amendment that only satisfied the refuter would be worthless to the
executor, so each names the criterion it narrows and the observation that
reopens it); the fixes-that-fail trap (gating every route to make WO-008's
denial case run would have cost three e2e retrofits; a gated page of the
order's own costs none); and acting before understanding (WO-013's worktree
was read in full before the route was written, and the lint's new range was
read against the real worktree rather than asserted from the notes). The
outcome matched the aim as read at entry: the update first and merged, the
pass on the new kit, core's answer read, the orders amended, WO-013's route
stated for the operator.

Cost: no research workers; one refuter (§14 records its worker time, tokens
and tool uses and the dispatch-to-file wall-clock); the preview 0.2 s; the
update's gates about 29 s of task time; the plan-start, failures and
conditions reads under 2 s; the read-only Git reads in WO-013's target
worktree under a second; `npm run meta -- --plan-cost` recorded the table
after the subject revision. The update's wall-clock from the dispatch at
20:39Z to the finished `main` at about 20:50Z was eleven minutes, one of
them the operator's merge; the planning branch opened at 20:51Z. One
cleanup is recorded: the eight local starter tags (`v0.85.0` to `v0.92.0`,
absent from `origin`) left by earlier passes' fetch slips were deleted with
`git tag -d`; nothing was pushed. Document ceilings: no product document is
edited by this pass, so `docs/control/doc-ceilings.json` is unchanged.

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.
The results, the commits, the refutation and the session cost are recorded
below after each ran.

Results on the subject before its commit: `npm run meta` no budget breach
(WO-007 tokens 96,929,115; first verification failed in 1 of the last 8
closed orders; 0 reopen candidates; unset limits unset); `followups --sync`
minted the two rows of §10 (C1 `FUP-2138dd6781c01e55`, C2
`FUP-dd50fa3363fd7d0a`; revision `f90b1093…`); `--apply` took the five
dispositions of §8 in one batch from the contained ignored request file
`docs/intake/followups-apply-2026-10-25.json` (two settled, three deferred;
revision `b24f250f…`); 27 rows pending afterwards, none untriaged or needing
review; `work-orders index` regenerated the README page with the amended
cards and the three `self` members `current` from this branch (`--check`
PASS on both pages); `lineage index` regenerated and current; `docs-check`
PASS (1 product document at 2,095 non-exempt bytes under the 2,305 ceiling;
14 declared historical link occurrences; 1 declared home-path line; one
pre-existing advisory on a filed record); `publication:check` reporting no
editions declared; `plan check` failing before the receipt only because the
new dated heading needs one (`planning pass planning-8cf1b240128e3b80 needs
a receipt`). The document gate before the receipt was not run, so the
refuter's reads met no live gate; `npm run test:docs` after the receipt is
recorded below.

Commits: the subject `3a395af` (fourteen files: the six orders, WS-001, the
profile, the operator record, the ledger and its index, the register, the
index page and this document), the cost table `f644b7e` (the index was not
touched by that refresh, the reading WO-232 promised), the receipt
`90f2cf4`, then the known-issues commit that carries this section.

Refutation: one fresh `dotln-worker` (the default type; the dispatch line
named no Fable worker), spawned in the background with only the canonical
prompt the helper printed (`npm run plan -- refute`, pass scope, 87,511
bytes: the identity, mask and lens, the work order, the compiled subject,
the output instructions, the result schema and the worker instructions), its
schema and the instruction to return the frozen JSON and a one-line
statement. It read that one file and nothing else, judged WO-014, WO-015,
WO-016, WO-008, WO-017 and WO-018 (WO-013 carried by hash), and returned
`aligned-with-findings` on every order and for the plan, with thirty-one
known issues (§9.1) and no hold: the five trap series show no worsening, no
supplied observation shows a failure, and the subject supplies no vision
passage id. Worker time 603 s, 130,785 worker tokens, 17 tool uses. The
receipt helper refused the first filing because the pair lay in the session
scratch outside the repository (`must be contained regular files`); the two
files were copied unchanged into ignored intake
(`docs/intake/refutation-2026-10-25/`, the result's SHA-256 `393ef885…`
before and after) and the second filing succeeded. Receipt
`2026-10-25-planning-8cf1b240128e3b80-010` (`docs/planning/refutations/`),
worker type `dotln-worker`, scope `pass`, 674,370 ms from dispatch
(21:04:43Z) to file (11.2 minutes, the refiling included), judged subject
`sha256:08d6b81e…` equal to the committed and workspace subjects; the gate
after it: 10 receipts, 10 passes, no advisory. Dispositions: none needed (no
hold); the thirty-one known issues are on the receipt and in §9.1 for the
next pass.

Session cost at the handoff (`node scripts/harness.mjs usage`, source
`claude-transcript-message-usage`, scope `dispatch`): 10,382,974 total
tokens (9,880,158 cached input, 387,117 cache-write input, 1,098 input,
114,601 output; reasoning output and USD cost unavailable) over 91 steps and
87 commands at 21:16Z, before the document suite and the pull request; one
subagent of the cap of 20, 19 remaining. The update's wall-clock from the
dispatch at 20:39Z to the finished `main` at about 20:50Z was eleven
minutes, one of them the operator's merge; the planning branch opened at
20:51Z.

`npm run test:docs` after the receipt, on the tree that carries this
section: 14 passed, 0 failed, 15.86 s of wall-clock, 14 fresh tasks, 0.1 s
of lane wait behind checkout unknown; `plan` and `plan-refutation-current`
PASS on receipt 010. The run at the final commit is reported in the pull
request.
