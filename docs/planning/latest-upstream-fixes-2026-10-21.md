# The latest upstream with core's fixes: starter v0.88.0, the update route and WO-012 amended, 2026-10-21

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch on 2026-10-21 at 01:48Z (the
evening of 2026-10-20 for them) saying that the upstream had been updated
with fixes, leaving the choice between refreshing the open update pull
request and closing it for a new one to the pass, and asking for the fork
to be updated in any case. The message is captured verbatim in ignored
intake (`docs/intake/notes/planning-latest-upstream-fixes-2026-10-21.md`,
SHA-256 `9b1e3fe9d122ddc83053b6a8b03ac46f2cb97f90eabd15e3404d3f6b2db913a4`),
a sibling record, never a source to copy from. This document is planner
synthesis of that capture, this instance's records (the 2026-10-20 planning
document and its refutation receipt 004 above all), core's v0.88.0 release
notes and its fork-answers pass of 2026-10-20
(`docs/planning/fork-answers-and-entropy-targets-2026-10-20.md` on DotLn
`main`, read through the GitHub API), the kit's scripts at v0.85.0 and at
the incoming v0.88.0 (`git show upstream/main:…` and the diff from
`d79bec7` to `bf3cc24`), the preview, the merge and the gates run on the
update branch, the operator's two settings files read by pattern count only,
and this repository's pull requests read through the GitHub API. The
clean-room screen found the kit's documented contracts, core's public
records and the operator's own repositories; no employer material,
credential, private hostname or identifier. The operator's commit identity
is named in no committed file of this pass.

Entry was clean `main` at `60a1a76` (the 2026-10-20 planning pass merged as
#15 at 20:42Z), WO-001, WO-003, WO-004, WO-009, WO-010, WO-011 and WO-005
closed, no active order, `v0.3.2` the latest tag on `origin`, and draft
update pull request #14 open and conflicting with `main`. The update was
taken first, from the primary checkout on `main` with the update branch in
a secondary worktree under the ignored `.runtime/` directory (§4), and
`plan start` then created `planning/2026-10-21-latest-upstream-fixes`; only
the parent writes either checkout. Fan-out plan: one background
`dotln-worker`, the planning refuter (§14), against the cap of 20
(admissions observed at entry: 0 of 20, exact); no research worker, because
this session read every fact of §4 itself; no descendants.

Process cost at entry (`node scripts/harness.mjs usage <session>`, source
`claude-transcript-message-usage`, scope `dispatch`, observed
2026-10-21T01:48:24Z): 91,453 total tokens (4 input, 70,576 cached input,
19,606 cache-write, 1,267 output; reasoning tokens and cost unknown, the
counters unavailable).

Aim, as read: the fork updated to the starter release that carries the
repair the 2026-10-20 pass asked core for, and the pull-request question
decided with its reason recorded. Traps named before the material choices:
refreshing #14 because the previous pass planned to (its branch conflicts
with `main` since #15 and its name and title bind v0.87.0; D1 weighs both
routes); opening the update's pull request before its gates were observed
(the gates ran first, §4); patching a kit file (no longer needed; the repair
came from core); taking core's day-old answers as current (each is read
against v0.88.0, §7); widening the update into activation (nothing
activates); reading the operator's settings beyond three pattern counts
(D4). The NoOp at entry: the fork stays at v0.85.0 behind a draft that
cannot merge, WO-012 cannot activate, DotLn-Angular's releases stay
undeclared, and receipt 004's known issues stay unrepaired.

## 2. Entry observations

`plan failures` at 01:50Z: 0 items since the last receipt
(2026-10-20T20:28:44Z); 0 failed verifications, 0 failed final reviews, 0
repairs, 0 repeated gate runs; recent tracks 7 (delivery 2, machinery 4,
evidence 0, unknown 1); phase medians over the full control record
implementation 1,829,038 ms, verification 832,602 ms, final review
2,510,792 ms, repair 508,951 ms. The local counters `plan start` prints were
printed once at entry and are not retained here. Reader scores: unavailable
(no profile declared), none due. No inherited document-gate failure on
`main` at v0.85.0 (#15's handoff run, 14 passed). The status projection:
WO-005 closed with VER-001 and FINAL-001 passing; the current session reads
Claude Code at effort `max` through `CLAUDE_EFFORT` (selected, not
effective).

## 3. Reopening observations

`plan conditions` at 01:51Z (3.8 s; load 5.7 on 16 CPUs): 1 hold, 10
unknown, 50 decision conditions and 38 register rows not evaluated; the same
observations the previous three passes recorded (`gate-task:target-worktree`
at 444.259 s against a one-sample median of 38.649 s, no new sample; ten
rows naming core-only condition sources, the roadmap file absent). Starter
v0.86.0, inside #16, replaces that suite with four file lanes once the
update merges (the 2026-10-20 pass's D10).

Conditions that fired and are consumed here: the 2026-10-20 pass's D1 (a
starter release carries the repair: v0.88.0 does, §4) is consumed by D1;
its D12 (the first gate on `main`'s records at the new kit is WO-012's) is
read against the update branch's green gate (§4) and kept; its D5 and the
register rows FUP-c60b54b317ec79f7 and FUP-2479f6d32b2396a8 (the operator
removes the interim entries) fired, as D4 records; receipt 004's §9.1 note
that the pass readying the update amends WO-012 for its known issues is
consumed by D2; core's Appendix A item 4 (merge the release into the same
branch) is answered the other way by D1 with its reason. The remaining
deferred rows keep their conditions (§8).

## 4. Observations, dated 2026-10-21

| Item | Observed | Source |
| --- | --- | --- |
| Upstream | the starter's `main` at `bf3cc24` ("Refresh starter to v0.88.0", core `a54f8d6520ed54d05e5209455c67541562716404`, core Release published 2026-10-21T01:46:20Z, the starter's own Release at 01:46:58Z), three refresh commits past this fork's base `4ed0168`: `166644e` v0.86.0 (core WO-222, the gate scheduler), `d79bec7` v0.87.0 (core WO-218) and `bf3cc24` v0.88.0 (core WO-223, one order taking the five observations of this fork's §12 items 2 to 7 of 2026-10-20 as one outcome: the document gate reads a moved decisions record through its binding, the moved-record readers look in the running checkout, the primary checkout and a worktree on `main`, `worktree start` names the sign-off declaration, the release-close advisory prints its expected spellings and the mismatch class, the kit README spells the node helper, the commit lint names its limit); core's planning receipt 051 keeps one limit: the target publish and the pre-review commit lint still need a worktree on `main` | `git fetch upstream`, `gh release list` and `gh release view v0.88.0` on `DylanBWood/DotLn` and the starter; the diff `d79bec7..bf3cc24` |
| Tags | this session's first fetch was an explicit `git fetch upstream --tags`, which overrode `remote.upstream.tagOpt --no-tags` and brought the starter's annotated v0.85.0, v0.86.0, v0.87.0 and v0.88.0 into the clone; the four were deleted locally before #16 opened and none reached `origin` (`git ls-remote --tags origin 'v0.8*'` lists nothing); the fork's own v0.1.0 to v0.3.2 are untouched; the update route itself fetched no tag | `git tag --list`, `git ls-remote`, the deletion |
| #14 | draft, opened 2026-10-20T20:10Z from `d109e22`; `git merge-tree main origin/chore/starter-update-v0.87.0` conflicts in `docs/lineage/decisions-index.md` (#15 regenerated the index at v0.85.0 without the moved WO-005 rows; #14's branch regenerated it at v0.87.0 with them) | `gh pr view 14`, `git merge-tree` |
| The preview | the incoming launchpad's `preview --from upstream/main`, run from a detached worktree under `.runtime/` and the bounded wrapper (178 ms): kit files 116 replaced, 13 added, 0 removed, 0 refused, 848 unchanged; incoming `a54f8d65…` (v0.88.0), starter revision `bf3cc24…`; build snapshot `fnv1a64:cdb959b4933e4d77` to `fnv1a64:881e2843f7728c46`; no instance actions declared; receipt none | the preview output |
| The merge | `chore/starter-update-v0.88.0` from `main` at `60a1a76` in a secondary worktree (`.runtime/starter-update-v0.88.0`); `git merge upstream/main` conflicted only in `CLAUDE.md`, the hunk #14 had resolved (the starter keeps the five `Read[role]` lines in the generated block; this fork keeps `Read[all roles]` in the floor), and Git's recorded resolution from #14 was reused: against `upstream/main` the only difference is the fork's operator-record line; against `main` the five role lines moved from the floor into the generated block. `README.md` auto-merged (the fork's release claim kept); instance-owned `docs/control/budgets.json` took the starter's v0.86.0 rewrite (`taskShare` and `hostLanes` removed) because this fork had not modified it since the export; `docs/product/07-execution-guide.md` replaced as a carried kit document. One merge commit `d816178` | the merge; `git diff` against both parents |
| Regeneration | `npm ci` (10 packages); `node scripts/harness.mjs emit` reproduced the 34 generated surfaces with no drift; `node scripts/lineage.mjs index` current; `npm run sync` regenerated the `meta` artifact: `docs/work-orders/HISTORY.md` (one line: the time-indexed-history note reads `historicalWorkOrders`) and `docs/lineage/decisions-index.md` (40 rows added: the moved decisions of WO-004 and WO-005 through their `dotln-angular@<commit>:docs/dotln/…` bindings); commits `31a2e9e` and `8afddb2` | the commands on the branch |
| The gates on the update branch | run from the secondary worktree with the primary checkout on `main`: `node scripts/harness.mjs check` 34 surfaces; `node scripts/launchpad.mjs verify` 977 files verified at `a54f8d65…`; `npm test` 7 passed, 0 failed, 49.56 s (the six structural checks and `kit-verify`; 30 s of it a host-lane wait on a holder named `resume`); `npm run test:docs` 14 passed, 0 failed, 304.86 s (`docs-check` PASS in 1.09 s with the three pre-existing advisories on filed records; `entropy`, `reader-profiles`, `plan` and `plan-refutation-current`, skipped at v0.87.0, ran and passed; the `host` task waited 141 s on lanes held by the gate's fixture tasks and a `resume` task); `npm test -- --list` and `--list --review` both print the seven suites | the runs at 01:59Z to 02:06Z |
| The repair in the field | the v0.87.0 failure (`docs/evidence/WO-004/decisions.md: document is not a readable regular file (ENOENT)`) is gone: `operatorWordFindings` in `scripts/docs-check.mjs` reads a moved row from `row.recordSource`, the text `readDecisions` already verified against the binding; `readTargetRecord` found the ignored clone mapping in the primary checkout (`primaryWorktree`, the owner of the common Git directory, whatever its branch), so a secondary worktree runs the gates and `npm run sync` without a worktree on `main`, the arrangement core built for this fork's §12 item 5 | the two readers at `upstream/main`; the runs |
| The document gate's wall-clock | 304.86 s at v0.88.0 in the fresh worktree against 13 to 15 s at v0.85.0 on this instance (#15's handoff): the task durations the gate prints are small (`docs-check` 1.09 s, `license-surfaces` 1.39 s, `plan` 0.50 s, the rest under 0.4 s); the time went to lane waits while fixture tasks (`lineage-fixtures`, `docs-check-fixtures`, `launchpad-docs`, `console-docs`, `skeleton-docs`, `kernel-docs`, `comment-labels-fixtures`, `resident-bind`, `local-runner-double`, `artifact-corpus`, `reader-fixtures`, `resume`) held the 8 derived lanes; whether a first run in a fresh checkout builds runtime output the next run reuses is unknown here (one run) | the `WAIT host lanes` and `PASS` lines of the run |
| The grant at v0.88.0 | `prepareTargetRelease` (`scripts/release.mjs`) calls `authorizeRegisteredEffects(repository, registry, now, workOrderId, ["release.close"])`, which finds a grant with `grantedBy: "operator"`, the repository id in `repo` and the effect in both `effects` and `operations`, and otherwise refuses naming the repository and the effect; the committed grant `operator.dotln-angular.publication` names `repo.push`, `pr.open` and `pr.thread.resolve` and records the 2026-10-17 direction that tagging stays with the operator | `scripts/lib/target-publish.mjs`, `scripts/release.mjs` at `upstream/main`; `packages/skeleton/loadouts/grants.json` |
| The settings | the operator's user settings hold an `autoMode` key and no entry naming this launchpad or DotLn-Angular; the launchpad-local `.claude/settings.local.json` holds 11 allow entries and no `Bash(node *)`; counted by pattern, nothing read or printed; core's fork-answers pass read the same two files for the three patterns on 2026-10-20 and found none | `grep -c` on the two files; core's §4 item 1 |
| Core's answers | core's fork-answers pass of 2026-10-20 merged to DotLn `main` (52,794 bytes; §4 decides this fork's eight items, Appendix A is the paste-ready answer), filed WO-223 (position 1, released as v0.88.0 at 01:46Z) and WO-224 (the Entropy Reducer on a registered target or a workstream's repositories, after WO-080) | `gh api` on `DylanBWood/DotLn` |
| #16 and #14 | `chore/starter-update-v0.88.0` pushed; pull request #16 (`:arrow_up: Take starter v0.88.0`) opened ready at 02:06:19Z, mergeable; #14 closed at 02:08:00Z with a note naming #16, its branch left on `origin` | `gh pr create`, `gh pr close`, `gh pr view` |
| The register at entry | 38 rows: 22 settled, 14 deferred, 1 allocated, 1 declined; 14 pending; revision `68ad2755…` | `plan start`, `plan followups` |
| The host | 16 logical CPUs, load 5.7 at entry; the v0.86.0 scheduler derives 8 lanes | `plan conditions`; the `npm test` run |

## 5. The operator's direction, synthesized

**The fork updated.** The outcome asked for is the fork at the starter
release that carries the fixes; the mechanics are the pass's to choose, and
the operator said so in the dispatch. The pass takes v0.88.0 in the shape
the previous three passes recorded, the kit bytes through the README's
update pull request, and this time the pull request is ready, because the
gate that kept #14 a draft is green (D1).

**The pull-request question.** Either route was admitted. The pass chose a
fresh pull request from today's `main` and closed #14, for reasons D1
records, and the operator record carries the delegation as a standing
preference so the next update needs no question (D5).

**What follows.** WO-012 is amended rather than refiled (D2), core's
answers are read at v0.88.0 (D3), the register rows that fired are disposed
(D4), and the pass ends with the prompt for the next DotLn platform planning
pass the operator record asks for (D6).

## 6. Decisions and NoOp records

Each decision names its source, the rejected alternative and the evidence
that reopens it.

- **D1 Starter v0.88.0 is taken through a fresh update pull request, #16,
  from today's `main`, opened ready; #14 is closed as superseded and its
  branch left on `origin`.** The operator left the choice to the pass. The
  fresh branch was chosen because #14's branch conflicts with `main` in the
  regenerated decisions index since #15 (clearing it would take a merge of
  `main` into the branch and a regeneration before the second starter
  merge), because its name and title bind v0.87.0, and because one merge of
  the starter revision from the current `main` is the shape #3 and #8 took
  and leaves `main`'s history with one update merge whose second parent
  carries the three refresh commits. The preview, the merge, the
  regeneration and the four gates ran before the push (§4); the document
  gate is green, so the pull request is not a draft. Source: the dispatch;
  the 2026-10-20 pass's D1 and its reopening condition (a starter release
  carries the repair), met by v0.88.0; README §Taking upstream updates.
  Rejected: stacking v0.88.0 on #14's branch (core's Appendix A item 4
  assumed it; two merges and a retitle for the same bytes, with the conflict
  to clear first); merging v0.87.0 alone first (nothing is gained once
  v0.88.0 exists); deleting #14's branch (a remote deletion the operator can
  make in one click; nothing on it is lost, #16 carries the same refresh
  commits). NoOp: the fork stays at v0.85.0 behind a draft that cannot
  merge. Reopen: #16 is closed unmerged; the operator prefers the
  single-thread history (then #14 is reopened and takes `main` and v0.88.0
  in turn); a later starter release arrives before #16 merges (then this
  branch takes it, as #14 was meant to).
- **D2 WO-012 is amended for v0.88.0 and for receipt 004's known issues,
  and refuted again.** The order's file is renamed for its target
  (`WO-012-starter-v0.88.0-registration.md`), its guard reads v0.88.0's
  moved-record reader beside v0.87.0's grammar, its gates and tokens are
  read at v0.88.0, and the pull request it waits on is #16. Of receipt
  004's five known issues: (a) the operator grant naming `release.close`
  for `dotln-angular` is scoped into the order (a new step 3 and criterion
  5), resting on the operator's direction of 2026-10-19 (capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`) and
  their correction of 2026-10-20 (capture SHA-256
  `ed22827f76b72eeb7d52ba7802e1b8ad8ab8cbecf9bd01153517ab4f94384cb6`): the
  releases are theirs to name and the kit makes them once it can name them,
  so the grant follows from the direction and no new word is asked; (b) the
  header that becomes mandatory once the policy is declared is written into
  WS-001's dependency plan as a precondition on every member, with the UI
  pass adding it to WO-006 to WO-008; (c) criterion 3 reads the history
  page's `## Historical` section (`None.`) and the card status text
  `historical (time-indexed)` instead of the word the generator always
  prints; (d) criterion 4 also requires the two interim sentences of the
  profile (`continues to deny`, `Until WO-012 merges`) to be gone and the
  collision rule to be stated; (e) the judge-only collision refusal is
  recorded in the Design and the executor writes it into the profile. The
  `worktree start` advisory v0.88.0 prints while `contributions.operatorAuthor`
  is undeclared is named in step 1 as the expected single advisory. The
  judged orders WO-006 to WO-008 are unchanged (D7). Source: receipt 004
  §9.1 of the 2026-10-20 document; core's v0.88.0 notes (WO-223 D006 for
  the advisory); `scripts/lib/target-publish.mjs`
  (`authorizeRegisteredEffects`). Rejected: a second grant object (one grant
  per repository keeps the record readable); declaring only the identity now
  and the policy, grant and header in the order that first releases (the
  refuter's alternative; the direction already settles it and the split buys
  a second cycle); withdrawing WO-012 and filing a new order (the id, the
  sequence row and the records that name it would all change for the same
  work). NoOp: WO-012 activates against a frozen text whose release
  objective cannot complete without the grant, and whose criterion 3 cannot
  pass. Reopen: the refutation of this pass holds on the amended text; the
  operator declines the grant edit (then the policy is declared in the order
  that first releases, by amendment).
- **D3 Core's nine answers of 2026-10-20 are read at v0.88.0 as §7 records:
  five landed in v0.88.0 and are settled by this pass's reads, one (the
  qualification row) waits on WO-006's draft, one (the update route) is
  answered by D1, one (the Entropy Reducer on a target) becomes a register
  candidate, and the resuming-work paragraph is moot.** Source: core's
  Appendix A; the kit at `upstream/main`; the runs of §4. Rejected:
  dropping WO-006's planned hard edge on WO-012 to run WO-006 under v0.85.0
  (core's reading of 2026-10-20, written before v0.88.0 existed; the edge
  stands because WO-012 now has a release it can run under). Reopen: per
  item in §7.
- **D4 The operator's removal of the interim trust entries is observed by
  pattern count and recorded; the two register rows that waited on it
  settle, and WO-006's verified-phase draft publish under the node spelling
  is the first observation of the host after a hook admission alone.** The
  floor keeps the settings' contents out of every committed and printed
  surface, so the observation is three counts: no `autoMode` entry naming
  this launchpad or DotLn-Angular, no launchpad-local `Bash(node *)`, 11
  local allow entries remaining. Source: the counts (§4); core's §4 item 1,
  which read the same files on 2026-10-20. Rejected: reading the files
  (outside the floor and the question's need); asking the operator whether
  they removed them (the record answers). Reopen: an entry naming either
  repository reappears before WO-006's draft (then FUP-c60b54b317ec79f7
  reopens and the test moves to WO-007).
- **D5 The operator record changes, dated 2026-10-21.** The Manual steps
  preference carries the removal and what WO-006's draft now observes (D4);
  the Releases preference carries v0.88.0, #16, the grant and the standing
  that the grant follows from the 2026-10-19 direction; the pace carries
  #15 merged, #16 and the closing of #14, and the next steps; a new
  Upstream updates preference records that the operator asks for the
  outcome and leaves the pull-request mechanics to the pass. Source: the
  capture; D1, D2, D4. Reopen: the operator changes any of them.
- **D6 Requests to core are written as the operator's prompt (§11): the
  repair confirmed in the field, the gates' wall-clock under the v0.86.0
  scheduler, the two advisories WO-012 will observe, the `--tags` fetch
  pitfall, the settings removal, WO-012's amendment, the WO-224 candidate
  and the confirmations by id.** Source: the operator record's standing
  preference; the 2026-10-20 pass's D9. Reopen: core's WO-193 channel
  lands.
- **D7 WO-006 to WO-008 are not amended here; the UI planning pass the
  operator asked for in WO-005-D006 stays the next pass.** Nothing about
  v0.88.0 changes their text; their bases, headers, the typed edge on
  WO-012, the node-spelled draft publish and the vendor are that pass's
  (the 2026-10-20 pass's D7 and its register row FUP-854bc432690eb6fd).
  Source: as cited. Rejected: setting WO-006's base now (a refutation of an
  order the UI pass rewrites). NoOp cost: none before WO-012 merges, which
  precedes WO-006 regardless. Reopen: the operator opens the UI pass (the
  next one), or directs WO-006 to proceed with its filed vendor.
- **D8 The fired timing condition and the ten unknown rows stay NoOps; the
  document gate's wall-clock at v0.88.0 is boarded as a candidate with a
  measure, not a hold.** The `target-worktree` hold rests on the same stale
  sample; v0.86.0's file lanes replace the task once #16 merges; the
  304.86 s document gate is one run in a fresh worktree whose lane waits
  dominate (§4), and a single run in that arrangement is not the median the
  register's document-gate condition names. Source: §3, §4. Reopen: a
  `target-worktree:file:*` row above one and a half times its own thirty-day
  median once three samples exist; `plan conditions --slow` on `main` after
  #16 merges shows the document-gate median above 30 s, or WO-012's step 4
  records a document gate above 60 s on `main` (§10 C2).
- **D9 The four starter tags this session fetched were deleted locally and
  the pitfall is recorded.** An explicit `--tags` fetch overrides the
  clone's `tagOpt`; the profile's guidance (keep starter tags off this fork
  and off `origin`) held because the deletion preceded the push and no tag
  was pushed. Source: §4. Rejected: keeping the tags (the local release
  checks at v0.85.0 on `main` would count them until the update merges).
  Reopen: a starter tag appears on `origin` or in the local list.

Immaterial lenses for the document-only writes: no shared compute beyond
the one refuter, no proxy goal, no process that provokes process; every
criterion in WO-012 names a command and its expected output.

## 7. Core's answers of 2026-10-20, read at v0.88.0

Each item of core's Appendix A is read against the record it names and
against the kit the starter carries today.

| Item | Core's answer (2026-10-20) | Read today | Decision |
| --- | --- | --- | --- |
| 1. The Claude Code qualification row | written into core's WO-221 record from this fork's §11; the three settings removals verified absent; WO-006's draft under the node spelling is the first observation after a hook admission alone; record what core listed plus the classifier's question, the command, who answered and the journal row's kind | the removals observed again by count (§4); no lifecycle command has run since | D4; WO-006's draft session records the listed fields (the UI pass writes them into WO-006's steps, with the node spelling, §10 of the 2026-10-20 document) |
| 2. The spelling | the node spelling is the only admitted form since v0.87.0; the kit README's sentence is WO-223's | landed: the README at v0.88.0 names the node session form and the withheld npm form (§4) | settled by the read; WO-012's Design keeps the admission paragraph |
| 3. The release-close helper | the byte-exact form is what `resume -- release-close` prints; WO-223 makes the advisory print the expected spelling and the mismatch class | landed: `releaseCloseAdmission` prints the `--publish` and `--dry-run` spellings and the class on the withheld branch (v0.88.0 notes, D007) | settled by the read; WO-012's close records the advisory text if withheld again (its known issues) |
| 4. docs-check on moved records | confirmed; WO-223 step 2; D1 stands: merge the release into #14's branch, re-run the gates, mark ready | landed and confirmed in the field (§4: `docs-check` PASS over the moved records, the four skipped checks ran); the route differs | D1: a fresh pull request, #14 closed, with the reason recorded; the observation goes to core (§11 item 1) |
| 5. The secondary worktree | both halves: the reader's three places and the README's arrangement | landed and confirmed in the field: the secondary worktree ran the gates and `npm run sync` with the mapping found in the primary checkout (§4) | settled by the read |
| 6. The sign-off declaration | a `worktree start` advisory and the FAIL line naming the key; WO-012's declaration is the right route | landed (`scripts/worktree.mjs` prints the advisory after `worktree add`; the FAIL line names the declaration route); WO-012 will see exactly one advisory at its own start | WO-012 step 1 records it (D2) |
| 7. The 72-character limit | WO-223 makes both refusals print the length and the limit; the reviewer text will not name it | landed (`outwardFindingText`: `subject.length: N of 72 characters`) | settled by the read; WO-006's reviewer sees the number if refused |
| 8. Confirmations | acknowledged by id; FUP-4c3c0351adc4c2cc waits on core's FUP-2304d46e6feb711b in WO-219 | WO-219 is open (core's sequence after WO-223: WO-217, WO-219, …) | the row stays deferred (§8) |
| 9. The Entropy Reducer on a workstream's repositories | filed as core's WO-224 after WO-080 and WO-219; WS-001 the first subject | not in v0.88.0 | a register candidate that reopens when a starter release carries it (§10 C1) |
| Resuming work | nothing in core blocked the fork at v0.85.0; WO-006 could run under v0.85.0 if the hard edge on WO-012 were dropped; WO-012 needs the release carrying WO-223 | moot: that release is v0.88.0, taken today | the edge stands (D3) |

## 8. The register

The register held 38 rows at entry (22 settled, 14 deferred, 1 allocated,
1 declined; 14 pending; revision `68ad2755…`). This pass's sync minted the
two candidate rows of §10 (40 rows, 2 untriaged, revision `2061ec28…`) and
applied the dispositions below as one `--apply` batch from the ignored
control lane (`docs/control/local/apply-latest-upstream-fixes-2026-10-21.json`),
leaving the register at revision `0cea4ef1…` with 40 rows: 23 settled, 15
deferred, 1 allocated, 1 declined.

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-c60b54b317ec79f7 | C4 of 2026-10-19 (removing the interim entries) | `settled`: the operator removed the two entries and the local `Bash(node *)` entry on 2026-10-20; observed by pattern count on 2026-10-21 and by core on 2026-10-20 (D4); reopen if an entry naming either repository reappears before WO-006's draft |
| FUP-2479f6d32b2396a8 | WO-004-D013 (a trust entry at registration) | re-`deferred`: the entries are gone, so WO-006's verified-phase draft publish under the node spelling is the observation this row waits on; reopen when that draft records the host's behavior (a prompt, a denial or an admission carried by the hook alone) |
| FUP-98c85b750cb36bd4 | C2 of 2026-10-19 (the `hostRules: "literal"` fallback) | left `deferred`, its condition unchanged (WO-006's draft records a prompt or a denial with the entries absent) |
| FUP-4c3c0351adc4c2cc | C5 of 2026-10-19 (Preflight tokens) | left `deferred`: core's WO-219 is open; reopen when a starter release carries it or core declines |
| FUP-854bc432690eb6fd | C1 of 2026-10-20 (the UI planning pass before WO-006) | left `deferred`, its condition unchanged: the next pass is that pass (D7) |
| FUP-6d2755b3ac7c8ab9, FUP-cb62c2b6f12d44ae, FUP-c3840fd4fef3f7bc, FUP-a4dd921172ce3900, FUP-0dab0b63b20fae7d, FUP-1ce1fb75025a93f8, FUP-83a2838dd2a2a199, FUP-223cde718a523e67, FUP-a36dae4a6766b9ef | WO-005, WO-004 and WO-001 rows deferred by the 2026-10-20 pass | left `deferred`; their conditions have not occurred (no UI pass, no lint-rules order, no fork pull request against DotLn-Angular, no change to the prompt hook's phrase matching in v0.88.0's notes) |
| FUP-4cbacbbeca2cefab, FUP-d771ffe939902128 | §10 C1 and C2 of this document | `deferred` with the conditions §10 states (a starter release carrying core's WO-224; the document-gate median above 30 s on `main` after #16 merges, or WO-012's step 4 recording a gate above 60 s) |

## 9. Orders amended and the sequence

One order amended, none filed, one serial sequence unchanged in order:
WO-012, WO-006, WO-007, WO-008. The sequence entry for WO-012 names
v0.88.0 and the grant.

| Order | Repository | Outcome | Hard edge |
| --- | --- | --- | --- |
| [WO-012](../work-orders/WO-012-starter-v0.88.0-registration.md) | self | the declared target release policy and `DotLn Angular`; `release.close` allowed and granted; the judge-only base checkout with its collision rule; the operator's commit identity for the sign-off rule; no historical order; the v0.88.0 gates on `main`'s records; the profile's `## Release close` rewritten and WS-001's row | none typed; update pull request #16 merged is step 1's guard; WO-006 gains its typed edge on WO-012 in the UI pass |

WO-012 keeps its `Model:`, three-role `Effort:`, `Track:`, `Cost:` with
additions and removals, provenance naming both captures, a dated observed
gap, a Design with rejected alternatives, a numbered execution plan of ten
steps each naming a file and a check, a `Preflight:` line, criteria whose
last names the gate and `npm run test:docs`, known issues, non-goals and
operator-review assumptions. The screens of product 07: WO-012 says no kit
file changes and no cited design assigns it code; no criterion reads natural
language (each names a command and its exact output; criterion 2 reads the
manifest rather than a literal); its live-run surfaces exist and were read
today (the grant check at its source, the kit commands at v0.88.0 on the
update branch, the advisory at its source).

### 9.1 Receipt 004's known issues, disposed

- **(a) The operator grant for `release.close`:** repaired in WO-012 (step
  3, criteria 1 and 5), under the operator's direction of 2026-10-19 and
  their correction of 2026-10-20 (D2).
- **(b) The header becomes mandatory:** WS-001's dependency plan now states
  that no `dotln-angular` member activates without exactly one
  `Target release classification` header once WO-012 declares the policy;
  the UI pass adds the header to WO-006, WO-007 and WO-008 (D2, D7).
- **(c) Criterion 3 cannot pass as written:** repaired (the history page's
  `## Historical` section reads `None.` and no card carries
  `historical (time-indexed)`).
- **(d) Criterion 4 already passes:** repaired (the two interim sentences
  must be gone and the collision rule present).
- **(e) `judge-only` adds a refusal:** recorded in the Design and the known
  issues as the executor's carry-in; the key stays, on the operator's
  request of 2026-10-19 item 5.

## Candidates not filed, with their reopening conditions (section 10)

- **C1 The Entropy Reducer on WS-001's repositories.** Core's WO-224
  (`npm run entropy -- review --repository <id> [<commit>]` and
  `--workstream WS-NNN`) freezes a registered clone at a recorded commit
  with the pinned reviewer, the blinded refutation, immutable receipts in
  the launchpad and dispositions into its register, one episode per member
  repository, about USD 5 to 10 and 15 minutes each. Reopen when a starter
  release carries WO-224: the operator opens `planning: entropy reducer`
  for WS-001's repositories, DotLn-Angular at its then `main`.
- **C2 The document gate's wall-clock under the v0.86.0 scheduler.** One
  run of `npm run test:docs` at v0.88.0 took 304.86 s in a fresh secondary
  worktree, against 13 to 15 s at v0.85.0 on this instance, the time spent
  in lane waits while fixture tasks held the 8 derived lanes (§4). Reopen
  when `npm run plan -- conditions --slow` on `main` after #16 merges
  reports the document-gate median above 30 s, or WO-012's step 4 records
  a document gate above 60 s on `main`: then a self order or a request to
  core asks whether the lane rule serializes the document gate's fixture
  tasks on this host.

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged: the UI planning pass
before WO-006 (the 2026-10-20 pass's C1, register row FUP-854bc432690eb6fd),
CI on the fork, required approvals, retitling the two published `DotLn`
Releases, a lane pair of small self orders (the main-rules pass's C2 to C5),
and the workstream pass's C1 to C10.

## 11. Requests to core: the prompt for the next DotLn platform planning pass

The operator pastes the block below into the primary DotLn planning session
(D6). Each item names the record it rests on.

```text
planning: observations from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) taking starter v0.88.0 as update pull request #16 on 2026-10-21, recorded in its planning pass of 2026-10-21 (docs/planning/latest-upstream-fixes-2026-10-21.md §4, §7 and §11), answering core's fork-answers pass of 2026-10-20 (Appendix A). Read each against the record it names; file, decline or defer each with its reopening condition.

1. WO-223 in the field. The fork took v0.88.0 in one merge from its main rather than into the #14 branch (which conflicted with main in the regenerated decisions index since #15; #14 closed, #16 opened ready). On the update branch, from a secondary worktree with the primary checkout on main, the document gate passed 14 of 14: docs-check read the moved decisions of WO-004 and WO-005 through their bindings (1.09 s) and entropy, reader-profiles, plan and plan-refutation-current ran; npm run sync regenerated the decisions index with the 40 moved rows and the history page's historicalWorkOrders note; readTargetRecord found the clone mapping in the primary checkout and no three-place refusal was seen. Confirmation for WO-223's D003 and D004 from an instance with moved records.

2. The gates' wall-clock under the v0.86.0 scheduler, first run in a fresh worktree on 16 CPUs and 48 GiB (8 derived lanes): npm test 7 passed in 49.56 s, 30 s of it a lane wait on a holder named resume; npm run test:docs 14 passed in 304.86 s, the host task waiting 141 s on lanes held by the gate's fixture tasks (lineage-fixtures, docs-check-fixtures, launchpad-docs, console-docs, skeleton-docs, kernel-docs, comment-labels-fixtures, resident-bind, local-runner-double, artifact-corpus, reader-fixtures, resume), while every task's own duration the gate prints is under 1.4 s. At v0.85.0 the same document gate ran in 13 to 15 s on this instance. Say whether a first run in a fresh checkout builds runtime output later runs reuse, or whether the lane rule serializes the document gate's fixture tasks; the fork's WO-012 records its runs on main after #16 merges (its step 4) and the fork's register carries the measure (its C2) with that reopening condition.

3. The two advisories WO-012 will observe: one worktree start advisory at its activation (contributions.operatorAuthor is undeclared until that order declares it), and the v0.88.0 release-close advisory with the expected spellings and the mismatch class if its close is withheld again as the instance's three closes were. Both go to core's next pass, for planning receipt 051's limit on the withheld share.

4. An explicit --tags fetch overrides remote.upstream.tagOpt --no-tags: the fork's session ran git fetch upstream --tags at entry and received the starter's annotated v0.85.0 to v0.88.0, deleted the four locally before any push, and none reached origin. The README's update route uses a plain fetch; one sentence naming the --tags override as the way starter tags arrive would close the gap. Low priority.

5. The operator's settings: the two interim autoMode.environment entries and the launchpad-local Bash(node *) entry are absent, counted by pattern on 2026-10-21 (core's read of 2026-10-20 agrees); the fork's register rows settle on it; WO-006's verified-phase draft publish under the node spelling is the first observation of the host after a hook admission alone, and the fork's UI planning pass writes into WO-006 the fields core's 2026-10-19 and 2026-10-20 answers list (the classifier's question, the command, who answered, the journal row's kind and text).

6. WO-012 amended, nothing asked of core: the release.close operator grant scoped in (receipt 004's criterion-5 known issue, under the operator's direction of 2026-10-19), criterion 3 narrowed to the history page's Historical section and the card status text, criterion 4 checking the removal of the profile's interim sentences and the presence of the judge-only collision rule, WS-001's dependency plan carrying the header precondition on every dotln-angular member.

7. The Entropy Reducer on a workstream's repositories (core's WO-224): acknowledged; the fork's register carries a candidate that reopens when a starter release carries it, with WS-001's DotLn-Angular as the first subject.

8. Confirmations by id: Appendix A items 2, 3, 5, 6 and 7 landed in v0.88.0 as described and are read as settled by the fork's reads of the kit at a54f8d65 (the README's node spelling, the release-close advisory text, the three-place reader, the start advisory and FAIL line, subject.length with the limit); item 8 acknowledged; item 4's route changed as item 1 says; the fork's FUP-4c3c0351adc4c2cc still waits on core's WO-219.
```

## 12. Write-backs

- `docs/operator/README.md`: the dated directions of D5.
- `docs/repositories/dotln-angular.md`: the policy paragraph and the opening
  of `## Release close` naming v0.88.0, #16 and the grant (D1, D2); the
  section's interim sentences stay for WO-012's executor to remove
  (criterion 4).
- `docs/workstreams/WS-001-dotln-angular.md`: WO-012's member row (#16, the
  grant) and the dependency plan's header precondition (D2).
- `docs/work-orders/WO-012-starter-v0.88.0-registration.md` (renamed from
  the v0.87.0 file and amended, D2).
- `docs/planning/sequence.md`: WO-012's entry names v0.88.0 and the grant.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the dispositions of §8 and the candidates
  of §10.
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/README.md`,
  `docs/planning/cost-table.json`: regenerated.
- Outside the planning branch, by D1: `chore/starter-update-v0.88.0`, pull
  request #16, and the closing of #14.

## 13. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path with the
operator out of the loop where the kit can carry the step: the fork at the
release that repairs its document gate, through one pull request the
operator merges with one click (D1); WO-012 able to activate against a text
whose release objective can complete, because the grant the kit requires is
in its scope (D2); the next target order's draft publish as the real test of
the host after a hook admission alone, because the interim entries are gone
(D4); and core's next pass receiving what only an instance in the field can
observe (D6). What the pass refuses to do: stack a second starter merge on a
conflicting branch (D1), patch the kit, decide WO-006's vendor in a pass
opened for the upstream (D7), or ask the operator again for a grant their
direction already settles (D2). What stays manual by the kit's design: the
two merges, the resume phrases, the deletion of #14's branch and the paste
to core. Lenses that changed the plan: rule beating (WO-012's criterion 3
and 4 now evidence what they claim; its step 1 reads the gate on `main`
before activation); shifting the burden (the grant declared once in the
order that declares the policy, not discovered at the first release close);
seeking the wrong goal (D1 chose the clean merge over the planned route when
the planned route stopped serving the outcome); process activity is not
progress (core's landed items are confirmed by reads, not re-asked).

Cost: `npm run meta -- --plan-cost` records the table after the subject
commit; this session spent no worker before the refuter; the update's four
gates cost 49.56 s and 304.86 s of wall-clock on the branch (§4); the
handoff reading of process cost is in the pull request. Document ceilings:
no product document changed in this pass (`docs/product/purpose.md` keeps
its 1,939-byte ceiling); the kit's product documents are kit files and
carry no instance ceiling.

## 14. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run meta`, `npm run plan -- followups
--sync` and `--apply`, `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run plan -- check`, `npm run test:docs`.
