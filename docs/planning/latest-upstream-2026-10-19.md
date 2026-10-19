# The latest upstream: starter v0.85.0 and the upgrade order, 2026-10-19

## 1. Subject, authority and provenance

The operator opened a `planning:` dispatch for the latest upstream on
2026-10-19 and, while
the pass ran, gave three directions: future releases of this launchpad are
`Launchpad v0.3.0` onward, continuing the numbering with only the prefix
changed; DotLn-Angular keeps `DotLn Angular` as the name of its releases,
and a capability the kit lacks is boarded, to reopen once it lands; and the
pass ends with a prompt for the primary DotLn planning
session. Every message is captured verbatim in ignored intake
(`docs/intake/notes/planning-latest-upstream-2026-10-19.md`, SHA-256
`01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`), a
sibling record, never a source to copy from. This document is planner
synthesis of that capture, this instance's records, the kit's scripts at
v0.83.0 and at the incoming v0.85.0 (`git show upstream/main:…`), core's
public release notes for v0.84.0 and v0.85.0, the incoming launchpad's own
preview of this instance, the merge and the gates run on the update branch,
and this repository's pull requests read through the GitHub API. The
clean-room screen found the kit's documented contracts, core's public
records and the operator's own repositories; no employer material,
credential, private hostname or identifier.

Entry was clean `main` at `b758abf` (the 2026-10-18 pass merged as #7),
WO-001, WO-003 and WO-004 closed, no active order, `v0.2.0` the latest tag
on `origin`. The pass runs on `planning/2026-10-19-latest-upstream`, created
by `plan start`; only the parent writes this checkout. Fan-out plan: one
background `dotln-worker`, the planning refuter (§13), against the cap of 20
(20 remaining at entry); no research worker, because this session read the
facts of §4 itself; no descendants.

Aim, as read: take the latest upstream in the shape the previous pass
recorded (D4 and C1 of 2026-10-18): the kit bytes through the README's
update pull request, then one self order for the configuration starter
v0.85.0 enables; record the release numbering and name directions; board
what the kit cannot do yet; write the prompt for core. Traps named before
the material choices: taking the kit bytes on the planning branch (its hooks
refuse writes outside `docs/`, and the dispatch phrase authorizes the
planning pull request alone; the update went on its own branch by the
README's route, D1); reading a request for the latest upstream as authority to merge
anything (the pass pushes and opens, the operator merges); letting the
update widen into activation (nothing activates); declaring DotLn-Angular's
release policy to use the new feature although the title would be wrong
(the operator's words board it instead, D4); keeping `--only harness` in the
self orders by inertia although v0.85.0 lists no such suite (D7); and
treating the core-named tag the fetch brought in as harmless (§4 records the
failure it causes, D8). The NoOp at entry: the fork stays at v0.83.0, WO-005
cannot activate, the next Release would be `Launchpad v0.2.1`, and a clone
that fetched `v0.85.0` fails its document gate after the next merge.

## 2. Entry observations

`plan start` and `plan failures` since the last receipt
(2026-10-18T17:11:09Z): 0 items; 0 failed verifications, 0 failed final
reviews, 0 repairs, 0 orders made ready, 0 corrections, 0 amendments, 0
off-ramps; final-review escapes 1 of 3 reviews, unchanged; 0 local release
closes; 0 local host denials; 4 interventions (3 unclassified); 0 long
phases; 0 repeated gate runs; recent tracks 1 delivery, 1 machinery, 1
unknown. Reader scores: unavailable (no profile declared), none due. No
inherited document-gate failure. Process cost at entry: 89,237 tokens
(source `claude-transcript-message-usage`, scope `dispatch`, cutoff
2026-10-19T14:41:04Z), cost unknown (counter unavailable).

## 3. Reopening observations

`plan conditions` at 14:42Z (2.8 s): 1 hold, 10 unknown, 29 decision
conditions and 18 register rows not evaluated; the same two observations
the previous two passes recorded (`gate-task:target-worktree` at 444.259 s
against a one-sample median of 38.649 s, no new sample; ten rows naming
core-only condition sources). D12 keeps both NoOps.

Three recorded conditions fired and are consumed here: the previous pass's
C1, to file the upgrade order once the starter's `main` carries WO-221
(v0.85.0 carries it, §4), becomes WO-011 (D2); its D12, to reopen when an
order's Preflight names a suite `--list` does not show (`harness` is not in
v0.85.0's list, §4), is repaired in WO-009, WO-010 and WO-011 (D7); its D4,
to reopen when the operator says to take the update now, is this dispatch
(D1). Of the
three deferred register rows, none fired: FUP-2479f6d32b2396a8 waits on the
qualification of the kit's admission, which WO-011 cannot run and WO-005's
draft publish will (D6, §7); FUP-223cde718a523e67 and FUP-a36dae4a6766b9ef
keep their conditions.

## 4. Observations, dated 2026-10-19

| Item | Observed | Source |
| --- | --- | --- |
| Upstream | the starter's `main` at `4ed0168` ("Refresh starter to v0.85.0", core `f577979ed04e98cccb3a29a9535ba6172d09a8c9`, core Release published 2026-10-19T13:12Z; the starter's own Release `v0.85.0` at 13:12Z), two refresh commits past this fork's base `b84e035` (`6cea5a2` v0.84.0 and `4ed0168` v0.85.0); this fork at v0.83.0 with 25 commits of its own. v0.84.0 is core's WO-216 (the structural phase, `npm run sync`, handoffs on the Preflight field); v0.85.0 is core's WO-221 (trust from the registration, the opt-in `--draft` form of `worktree publish` reused by the final publish, declared disposable output deleted at close, a declared target release, and release tags on the starter) | `git fetch upstream`, `gh release view` on `DylanBWood/DotLn` and the starter |
| The preview | the incoming launchpad's `preview --from upstream/main`, run from a detached worktree under `.runtime/` and the bounded wrapper: 80 kit files replaced, 36 added, 0 removed, 0 refused, 848 unchanged; build snapshot `fnv1a64:31e603768322b5eb` to `fnv1a64:cdb959b4933e4d77`; no instance actions declared; receipt none (a starter merge writes no core sibling receipt). The added files are the structural-check sources (`scripts/structural-checks.mjs`, `scripts/sync.mjs`, `scripts/lib/generated-artifacts.mjs`, the `*.fixture-inputs.json` declarations) and two role baselines; the replaced files are the hooks, four skills, the manifest, `UPSTREAM.md`, the two carried documents and the kit scripts | the preview output |
| The merge | `git merge-tree` predicted no conflict; `README.md` was the only file changed on both sides since the last update and merged by itself; one merge commit `54163db` ("Merge starter v0.85.0") on `chore/starter-update-v0.85.0`; no instance file changed (`dotln.config.json`, `CLAUDE.md`, the orders, the control records and the WO-001 seed keep their bytes; `docs/PLAYBOOK.md` and `docs/product/07-execution-guide.md` take the starter's text as carried kit documents); `npm ci`, `node scripts/harness.mjs emit` (34 surfaces) and `node scripts/lineage.mjs index` reproduced the committed bytes, so the merge commit is the whole change | the commands on the branch |
| The gates on the update branch | `node scripts/harness.mjs check`: 34 generated surfaces; `node scripts/launchpad.mjs verify`: 964 files verified at `f577979…`; `npm run test:docs`: 14 passed, 0 failed, 13.2 s (three advisories on filed reports: WO-003-D003, WO-001 FINAL-001 and WO-003 VER-002 carry operator-attributed words without a capture digest); `npm test`: 7 passed, 0 failed, 11.6 s (the six structural checks, then `kit-verify`) | the runs at 14:49Z and 14:50Z |
| The update pull request | #8, `:arrow_up: Take starter v0.85.0`, head `chore/starter-update-v0.85.0`, base `main`, opened 2026-10-19T14:56Z with the preview, the merge, the regeneration, the checks and the tag note in its body; the operator merges it with a merge commit, as #3 (v0.83.0) and #1 (v0.82.0) were merged | `gh pr create`, `gh pr list` |
| The core-named tag | the fetch brought the starter's new annotated tag `v0.85.0` (object `40421a1` on `4ed0168`) into this clone; a plain `git fetch upstream` follows it too, because it points into the fetched history. With it reachable from `HEAD`, `npm run release -- check-surfaces --local` printed `FAIL release-block: observed v0.2.0; expected one strict version at or above v0.85.0 (target order records no release; latest local tag v0.85.0)`; with it deleted, `PASS release-block: observed v0.2.0; expected one strict version at or above v0.2.0`. `npm run test:docs` runs that check as a preflight, `check-surfaces --local` reads `ancestralLocalTags` (`for-each-ref --merged=HEAD`), and `release prepare --local` reads `localTags`, every local tag. The tag is deleted from this clone and is not pushed; `remote.upstream.tagOpt` is unset. Core's v0.85.0 notes: "Forks: keep core's tags off your origin" | `scripts/release.mjs` (v0.85.0) `remoteTags`, `ancestralLocalTags`, the `prepare` and `check-surfaces` commands; the two runs |
| The target Release title | a declared target release (`repositories.<id>.release.policy: "declared"` plus the order's `**Target release classification:** patch | minor | major` header) tags the merged base with the next `v*` above the target's remote tags (`v0.1.0` when none) and creates the Release through `ensureRelease(clone, forge, tag, \`${state.repositoryId} ${tag}\`, body)`: the title is the registration id and the tag (`dotln-angular v0.1.0`); the tag message and the body carry the order's title and objective; `validateRepositoryRelease` admits only `policy` | `scripts/release.mjs` `publishTargetRelease`; `scripts/lib/config.mjs` |
| The suites at v0.85.0 | `npm test -- --list` (run in a detached worktree of the update branch in session scratch): `format`, `configuration-root`, `registrations`, `declarations`, `generated`, `host`, `kit-verify`; `harness` is absent. `readPreflightSuites` reads the `--only <suite>` tokens of the `**Preflight:**` field; a criterion naming `npm test` consumes a passing complete row or the structural and declared Preflight rows at the code identity; a target order's briefing skips the Preflight suites; the executor's role text starts one complete run | `scripts/test-runner.mjs --list`; `scripts/lib/handoff-ledger.mjs` `readPreflightSuites`, `requireGateClaims`; `scripts/resume.mjs` `preflightBriefing` |
| The configuration grammar at v0.85.0 | a class admits `checks`, `supports` and `disposable`; a registration admits `disposable`, `release` (`policy: "declared"` only) and `hostRules` (`"literal"` only); `validateDisposablePaths` requires relative, normalized, non-climbing entries and composes the class's and the registration's into one sorted set on the registration | `scripts/lib/config.mjs` `validateClasses`, `validateDisposablePaths`, `validateRepositoryRelease`, `validateHostRules` |
| Core's read-before-upgrading for WO-221 | no live host has been qualified (the Claude Code auto-mode, Codex and Copilot rows are `blocked`; whether a host's classifier honors the hook's `allow` is unobserved; the literal fallback stays off); release close now judges the base checkout's ignored files against the fetched tree's rules, deletes under declared roots (never to scratch), refuses an undeclared ignored file naming its top-level directory, and reads up to 16 MiB of untracked paths; the admission trusts the launchpad's recorded state; completion consumes recorded rows and runs no gate; the repair follow-ups are boarded | core's v0.85.0 Release notes (WO-221 D005, D008, D017, D020, D030, D034, D039, D045) |
| This repository's operator grant | `operator.dotln-angular.publication` names `repo.push`, `pr.open` and `pr.thread.resolve`, the effects the v0.85.0 admission requires on `main`'s committed grants | `packages/skeleton/loadouts/grants.json` |
| The status projection | unchanged since the previous pass: it names the WO-004 report paths `target-records` moved into the target | `npm run resume -- status --json` |

## 5. The operator's direction, synthesized

**The latest upstream.** The starter moved twice since this fork's base,
and the second move is the one the previous pass was waiting for: v0.85.0
carries core WO-221, so the condition it set for the upgrade order (C1)
holds. The pass takes the update in the shape that pass recorded: the kit
bytes through the README's update pull request (#8, D1), then one self
order, WO-011, for what the instance's configuration must declare before a
target order can close under v0.85.0 (D2). Nothing activates.

**Launchpad releases continue the numbering.** The fork's latest Release is
`DotLn v0.2.0`; the next is `Launchpad v0.3.0`, the same numbering with the
prefix changed. The kit assigns a version only through an order's
classification, so WO-009 becomes a minor release (D3).

**`DotLn Angular` for DotLn-Angular's releases, or a boarded blocker.** The
kit titles a declared target Release by the registration id and the tag
(§4), so the name is not available; by the operator's second direction the
option is boarded, to reopen once the kit carries a target display name,
and DotLn-Angular declares no release until then (D4).

**A prompt for the primary DotLn planning session.** §10 is written as that
prompt, and the handoff repeats it; the preference is recorded in the
operator record (D10, D11).

## 6. Decisions and NoOp records

Each decision names its source, the rejected alternative and the evidence
that reopens it.

- **D1 The kit bytes are taken now, through update pull request #8 on the
  README's route, outside the planning branch.** From clean `main`, the
  incoming launchpad's preview, one merge of the starter revision on
  `chore/starter-update-v0.85.0`, `npm ci`, the re-emit and the lineage
  index (both reproduced the committed bytes), the kit's two gates, the
  push and the pull request; the operator merges with a merge commit, and
  the first session on `main` afterwards fast-forwards it, deletes a local
  `v0.85.0` tag if present, and runs `node scripts/bootstrap.mjs`. Source:
  the dispatch; the previous pass's D4 (the route #3 followed for v0.83.0);
  README §Taking upstream updates. Rejected: taking the bytes on the
  planning branch (its hooks refuse writes outside `docs/`, and the
  dispatch phrase authorizes this branch's push and pull request; the
  README's route runs on the operator's word, which this dispatch is);
  waiting for the planning pull request to merge first (the two branches
  are disjoint, and the update's checks passed). NoOp: the fork stays at
  v0.83.0 and WO-005 cannot activate. Reopen: #8 is closed unmerged, or a
  later preview lists a refused kit path.
- **D2 One self order, WO-011, follows the update and precedes WO-005 by a
  typed hard edge.** It declares the class's disposable output (D5), sets
  the tag guard (D8), runs the kit's gates at v0.85.0 on this instance's
  merged records with `npm run sync` as the repair, writes the profile's
  `## Release close` section and WS-001's row, and declares no release
  policy (D4). WO-005's release close under v0.85.0 deletes declared output
  and refuses an undeclared ignored base file, so the declaration must be
  on `main` before WO-005 closes; the edge makes that a checked fact rather
  than a sentence. Source: C1 of 2026-10-18; core's v0.85.0 notes (WO-221
  D005, D030). Rejected: folding the declaration into WO-005 (a target
  order's branch lives in DotLn-Angular; the launchpad's configuration is
  read from this repository's `main`); folding it into WO-010 (GitHub rules
  and the registration are unrelated subsystems, the previous pass's D13).
  Reopen: v0.85.0's close contract changes before WO-011 activates.
- **D3 The next Release is `Launchpad v0.3.0`; WO-009 is classified
  minor.** The operator's direction of 2026-10-19 (capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`), paraphrased: the
  fork's releases keep their numbering and change only the prefix, so the
  next one is `Launchpad v0.3.0`. The
  kit assigns `v0.3.0` as the next minor above `v0.2.0` at WO-009's
  activation; WO-009's objective, design, step 3 and provenance say so, and
  WO-010 and WO-011 follow as patches above it. Rejected: patch (the
  previous pass's choice, `v0.2.1`; the operator named `v0.3.0`); renaming
  or retagging the two published Releases (the kit never edits a published
  Release; the previous pass's C4). NoOp: `Launchpad v0.2.1`. Reopen: the
  operator names another version, or release preparation observes a
  baseline other than `v0.2.0` at activation (then the version is the next
  minor above what it observes and the executor records it).
- **D4 DotLn-Angular's releases stay undeclared until the kit can title a
  target Release `DotLn Angular`; the option is boarded as a blocker.** The
  operator's direction of 2026-10-19 (capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`), paraphrased:
  DotLn-Angular keeps the name DotLn Angular for its releases, and a
  capability the kit does not have yet is boarded as a blocker that reopens
  once it exists. The kit
  titles a declared target Release
  `<registration id> <tag>` (§4), which would publish `dotln-angular
  v0.1.0`; so `release` stays absent from the registration, `release.close`
  stays in `deniedEffects`, no target order carries a `Target release
  classification` header, and the previous pass's D9 keeps its disposable
  half (WO-011) while its release half waits on the boarded row (§9 C1).
  Rejected: declaring the policy now and retitling by hand later (the kit
  never edits a published Release, and the operator already carries two
  `DotLn` titles they did not want); renaming the registration to
  `DotLn Angular` to get the title (the id names the configuration, the
  grant, the control records and the evidence paths, and a space in it is
  outside the id grammar). NoOp: target orders close as no-release, the
  kit's default. Reopen: the kit's registration admits a target display
  name, or the Release title reads from a configured name (then a self
  order declares the policy and moves the effect, and the base-setting pass
  adds the headers).
- **D5 The disposable roots are the eleven ignored build roots of the merged
  DotLn-Angular, declared on the class; `.env` and `.env.*` are excluded.**
  `node_modules`, `.nx`, `dist`, `.angular`, `coverage`, `test-output`,
  `playwright-report`, `test-results`, `tmp`, `out-tsc` and
  `__screenshots__`, each in the merged `.gitignore` at `651d76ff` (the
  previous pass's §4), relative and non-climbing as the grammar requires;
  on the class because every repository of the class shares the shape. The
  operator's local files stay undeclared, so a primed `.env` or, after
  WO-005, `apps/dotln/src/environments/environment.local.ts` in the base
  checkout refuses a close until removed (the refusal names the top-level
  directory; declaring `apps/` would delete every ignored file under it).
  Source: the previous pass's D9; core's notes (declare narrowly). Reopen:
  a close refuses an undeclared path (then the next pass declares it or the
  operator removes it).
- **D6 The live qualification of the kit's admission is WO-005's draft
  publish; WO-011 proves the configuration and the gates, not the host.**
  Core has qualified no host (§4). Only a target order at `verified` can run
  the draft form, so WO-005's step 15 records the hook's decision from the
  session journal, whether the host prompted, and which of the operator's
  interim trust entries of 2026-10-18 were present; whether those entries
  are present is the operator's choice before that step (removed, the
  episode shows whether the host honors the hook's admission; present, only
  the hook's own decision is observed), and the pass after WO-005 decides
  their removal (§9 C4) or the kit's literal host-rules fallback, `hostRules`
  set to `literal` (§9 C2). Source: core's WO-221 D008 and D034; the
  previous pass's D10.
  Rejected: a rehearsal inside WO-011 (no target order is at `verified`,
  and a hand-built hook payload is not an observation); an order that
  removes the entries (they are the operator's host settings, outside every
  write root). Reopen: the episode is observed.
- **D7 Preflight lines under the landed grammar: self orders name one
  complete `npm test` run; target orders stand as filed.** v0.85.0 lists
  `kit-verify` and the six structural checks and no `harness` suite, so the
  previous pass's D12 reopening fired; WO-009, WO-010 and WO-011 name
  `npm test` as one complete run started directly (the executor's rule at
  v0.85.0), whose `kit-verify` row is the `--only kit-verify` suite the
  handoff may consume, then `npm run test:docs`. A target order's field
  names no `--only` suite, the launchpad handoff rests on the structural and
  document rows, and the target gate is the product gate, so WO-005 to
  WO-008 keep their lines; the previous pass's "adjust to the landed
  grammar" resolves to no change, recorded in WO-005. Source: §4; v0.85.0's
  executor role text and D018. Rejected: `--only kit-verify` alone under
  the bounded wrapper (the v0.84.0 reading; v0.85.0 starts the complete run
  and gives it the six-hour bound). Reopen: `npm test -- --list` changes
  again.
- **D8 The core-named tag stays off this fork: deleted locally, never
  pushed, and WO-011 sets `remote.upstream.tagOpt --no-tags` in the main
  clone.** The observed failure (§4) would hit every document gate on
  `main` after #8 merges in any clone holding the tag, and `release prepare
  --local` would assign WO-009 a version above v0.85.0. WO-009 carries the
  check as a carry-in for its activation; WO-011 makes the setting and
  reads it back; §10 asks core to change the fetch route or the baseline.
  Source: the two `check-surfaces --local` runs; core's note. Rejected:
  changing the baseline rule in this fork (a kit-file edit is the true-fork
  path); a pre-push hook (the fetch is the hazard). Reopen: core changes
  the fetch route or the local baseline rule.
- **D9 The sequence is WO-009, WO-010, WO-011, then WO-005 to WO-008, all
  serial.** WO-009 first so the next Release carries the name and the
  number (D3, the previous pass's D13); WO-011 third so its own Release
  follows the name and WO-005's close finds the declaration; the target
  chain unchanged. Rejected: WO-011 first (its Release would mint a third
  `DotLn` title); a lane pair (two self orders collide on the next version
  and the second pays a retiming). Reopen: the operator says one order or
  will run two at once.
- **D10 The operator record changes, dated.** The release numbering and
  the two names (D3, D4); the pace (the update taken on 2026-10-19 as #8
  and WO-011, then `resume: next` on WO-009); the standing preference for a
  paste-ready prompt to the primary DotLn planning session at the end of a
  pass. Source: the three captured directions. Reopen: the operator changes
  any of them.
- **D11 Requests to core are dated notes written as the operator's prompt
  (§10).** Until core's WO-193 channel lands, the operator carries them;
  the prompt names the record each rests on. Source: the third direction;
  the previous pass's D11. Reopen: the channel lands.
- **D12 The fired condition and the ten unknown rows stay NoOps.** The
  `target-worktree` hold rests on the same two samples (no gate has run on
  a target since), and the unknown rows cannot be evaluated here. Reopen:
  as the previous passes set.
- **D13 WO-006 to WO-008 are not amended now.** Their base-setting passes
  carry the v0.85.0 items: the typed edge reaches them through WO-005, no
  `Target release classification` header by D4, and their Preflight lines
  stand by D7. NoOp cost: none; the orders cannot activate before WO-005
  merges. Reopen: WO-005 merges.
- **D14 This pass's checks ran at v0.83.0, the kit on its branch; the first
  v0.85.0 gate on `main`'s records is WO-011's.** The document gate at
  v0.85.0 passed on the update branch with this pass's inputs absent (§4).
  Reopen: `plan check` or `npm run test:docs` fails on `main` under v0.85.0
  after both pull requests merge (then the session on `main` repairs it
  within authority and records the cause, or the operator opens a
  correction).
- **D15 No direct quote of the operator stays in either repository's
  committed tree.** The operator's correction of 2026-10-19 (captured
  verbatim in ignored intake,
  `docs/intake/notes/planning-latest-upstream-2026-10-19-corrections.md`,
  SHA-256 `0fd81261c26234c213cd436d36ac2f19c6f0633287090a5c6426b988d44ded2a`), paraphrased: their
  words are not to be committed, in this fork or in DotLn-Angular. The
  clean-room floor already says intake wording is synthesized, never copied
  unless a draft is marked ready to file; this pass had copied their words
  into D3, D4, WO-009 and WO-011, and earlier passes into WO-004, WO-008,
  WO-009, WO-010, WO-003's decision and handoff records, both earlier
  planning documents, the ledger's dispatch headings, the operator record's
  markers and standard, and the workstream's germ phrases. Every site is
  paraphrased now, each keeping its capture digest; a sweep of this fork's
  tracked documents (seven-word runs against the intake captures, the
  document check's attribution rule, and the short phrases of each capture)
  finds no other. In DotLn-Angular the only site is the target's copy of
  WO-004's provenance, which WO-005's step 12 paraphrases, the first in-kit
  route into the target. The update pull request's body, outward and not
  committed, is rewritten too. Residual: one register history entry (§7).
  Rejected: pushing a docs-only branch to DotLn-Angular from this session
  (outside the planning dispatch's authorization and the kit's target-order
  route); rewriting the register's committed history (the register refuses
  it). Reopen: a later pass's sweep finds a quote, or the operator marks a
  draft ready to file verbatim.

Immaterial lenses for the document-only writes: no shared compute beyond
the one refuter, no proxy goal, no process that provokes process; every
criterion in WO-011 names a command and its expected output.

## 7. The register and the conditions consumed

The register held 18 rows at entry (15 settled, 3 deferred). The sync
after §9 was written minted five candidate rows; the pass defers each with
its reopening condition in one `--apply` batch, re-defers
FUP-2479f6d32b2396a8 with the observation point D6 names, and leaves the
other two deferred rows as they stand (their conditions have not fired,
§3). No row is allocated to an order: WO-011's content comes from the
previous pass's C1, and the boarded rows are the operator's blockers, not
work.

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-ad0cc3154f21f397 | §9 C1 (`DotLn Angular` as the target's release name) | `deferred`, the operator's blocker: reopen when the kit's registration admits a target display name or the Release title reads from a configured name |
| FUP-98c85b750cb36bd4 | §9 C2 (the `hostRules: "literal"` fallback) | `deferred`: reopen when WO-005's draft publish records that the host did not honor the hook's admission |
| FUP-4b545ffb6f9dd6e9 | §9 C3 (the Angular cache setting in the gate argv) | `deferred`: reopen when WO-005's step 5 records that the setting belongs to the registration's gate argv |
| FUP-c60b54b317ec79f7 | §9 C4 (removing the interim trust entries) | `deferred`: reopen when WO-005's draft publish records the admission honored with the entries absent, or the operator removes them |
| FUP-4c3c0351adc4c2cc | §9 C5 (a check for Preflight tokens absent from `--list`) | `deferred`: a request to core (§10 item 3); reopen if a later kit revision drops or renames a suite an open order names |
| FUP-2479f6d32b2396a8 | WO-004-D013 (a trust entry at registration) | re-`deferred`: the kit side (core WO-221) landed with starter v0.85.0; the qualification moves from "the upgrade order" to WO-005's draft publish (D6); reopen when that episode is recorded, or when a publication step again needs a manual command |
| FUP-223cde718a523e67 | WO-004-D010 (fork pull-request titles) | left `deferred`; its condition has not occurred |
| FUP-a36dae4a6766b9ef | WO-001-D014 (a phrase leading a longer message) | left `deferred`; its condition (a kit change to the prompt hook) has not occurred at v0.85.0 as far as this pass read |

One register entry keeps a quoted operator message this pass could not
rewrite: the first source revision of FUP-890bb31b940f69c3 summarizes
WO-001-D004's dispatch as it read before its 2026-10-18 repair, and the
register refuses an edit to committed history (`committed source or
disposition history was removed or rewritten`). It is the one residual site
of D15, left for the operator's override or core's redaction route (§10
item 6).

## 8. Orders cut, amended and the sequence

One order filed, five amended (two of them only to paraphrase the
operator's words, D15), one serial sequence.

| Order | Repository | Outcome | Hard edge |
| --- | --- | --- | --- |
| [WO-011](../work-orders/WO-011-starter-v0.85.0-registration.md) | self | the class's disposable declaration; the `--no-tags` guard and its readbacks; the v0.85.0 gates on `main`'s records; the profile's `## Release close` section and WS-001's row; no release policy | none typed (update #8 merged is step 1's guard) |
| [WO-009](../work-orders/WO-009-release-display-name.md) | self | as filed, classified minor so the next Release is `Launchpad v0.3.0`; the Preflight line under the landed grammar; the local-tag carry-in; provenance paraphrased (D15) | none |
| [WO-010](../work-orders/WO-010-protect-main-both-repositories.md) | self | as filed; the Preflight line under the landed grammar; its Release the next patch above `v0.3.0`; provenance paraphrased (D15) | none |
| [WO-005](../work-orders/WO-005-foundation-libraries.md) | dotln-angular @ `651d76ff` | as filed, with the typed edge on WO-011, the route guard at v0.85.0, the draft publish recorded as the first observation of the admission, no release header, the Preflight line confirmed, receipt 002's three findings applied (§8.1), and the target's WO-004 copy paraphrased in step 12 (D15) | WO-004 merged (met); WO-011 merged |
| [WO-008](../work-orders/WO-008-authentication-and-permissions.md) | dotln-angular (provisional base) | provenance paraphrased (D15); nothing else changes | WO-007 merged |
| [WO-004](../work-orders/WO-004-scaffold-dotln-angular-workspace.md) | dotln-angular (closed) | provenance paraphrased (D15); nothing else changes; the target's copy follows through WO-005 | closed |

WO-011 carries `Model:`, three-role `Effort:`, `Track:`, `Cost:` with
additions and removals, provenance naming the capture, a dated observed
gap, a Design with rejected alternatives, a numbered execution plan whose
steps name a file and a check, a `Preflight:` line, criteria whose last
names the gate and `npm run test:docs`, known issues, non-goals and
operator-review assumptions. The screens of product 07: WO-011 says no kit
file changes and no cited design assigns it code; no criterion reads
natural language (each names a command and its exact output); its live-run
surfaces exist and were run today (the main clone's tags and configuration,
`origin`'s tags, the kit commands at v0.85.0 on the update branch).

### 8.1 Receipt 002's findings, applied or carried

Receipt 002 (2026-10-18) left eighteen known issues on the orders' rows.
This pass changes WO-005, so it applies the three it assigned to "the pass
that follows, with the upgrade order": `check:kits` also lists every
`@Injectable` class and `InjectionToken` under `libs/shared` without a
`provide<Name>TestKit` export in its library's `testing` entry point, with
a fixture (criterion 5); the three check commands join the declared gate
through a root `tools` project whose `lint` target runs them, so
`npx nx run-many -t lint` executes them in every later member's gate
without a registration change (step 11, criterion 2); the lint rule is the
one guard for token names and `check:tokens` its cross-check. The sequence
finding (the starter `--draft` gate outside the sequence) is met by WO-011
and the typed edge. WO-009's cost finding stays the previous pass's D13
NoOp with its trigger; WO-010's executor carry-ins stand; WO-006 to WO-008's
items wait for their base-setting passes (D13).

### 8.2 Known issues from receipt 003, by order

The refutation (§13) returned `aligned-with-findings` with ten known issues
and no hold. The orders are frozen at the judged subject, so each issue sits
on its order's row here until a pass amends the order; an issue an executor
can meet inside the frozen order's authority is a carry-in for the executor's
decisions and evidence, and one that needs the order's text changed names the
execution-amendment route of product 07 (the operator's scope expansion
recorded in the order's decisions, then `plan amend-order`).

- **WO-009.** (a) A core-named tag that returns before WO-011's guard lands
  (any `git fetch upstream` until then) would make `release prepare --local`
  assign a version above it while every check still passed; carry-in: step
  3's check names `v0.3.0`, so any other assignment is a stop, the tag is
  deleted and the step rerun, recorded in the decisions. (b) A full cycle for
  about 50 bytes, ahead of the critical path: the previous pass's D13 NoOp
  stands with its trigger; the operator may fold the key into WO-010 by
  amendment before activation.
- **WO-011.** (a) WO-005's criterion 3 leaves `.env` and the ignored
  `apps/dotln/src/environments/environment.local.ts` in the target worktree,
  and neither is declared disposable, so the v0.85.0 close would refuse them
  (the kit refuses an undeclared ignored file in the target worktree as in the
  base checkout); carry-in for WO-005's executor, verifier and release-close
  session: remove the two generated files from the target worktree after the
  checks that create them and record the removal, the base checkout staying
  the operator's (D5); the next pass that amends WO-005 writes the removal
  into its step 4 and criterion 3. (b) The tag guard's gaps: the README's own
  named-tag preview (`git fetch upstream tag vX.Y.Z`) still creates a tag,
  which WO-011's design pairs with `git tag -d` after the preview; the
  setting lives in one clone's Git configuration and reaches no pull request,
  so its readback in the evidence and the profile's `## Release close`
  section are its record; criterion 2 names only `v0.85.0`, and the `tagOpt`
  readback is what keeps later tags out. Carry-in: the executor writes the
  named-tag rule into the profile section. (c) Criterion 4's WS-001 check
  (`grep -c 'WO-011'` at least 4) already passes at `ff1d524`; carry-in: the
  executor records `grep -c 'docs/evidence/WO-011' docs/workstreams/WS-001-dotln-angular.md`
  at least 1 beside it, which only the delivery-state row satisfies. (d) The
  worker reads the disposable match as root-only, so a nested ignored
  directory (`__screenshots__` beside a spec, `test-output` under a project)
  would still refuse a close; carry-in: the executor reads
  `scripts/lib/target-worktree-close.mjs` at v0.85.0 and records how nested
  paths are matched; if nested roots must be declared, criterion 1's exact
  list changes through the amendment route at activation. (e) The Cost line
  omits a recurring cost: every target close deletes `node_modules`, `.nx`,
  `.angular` and `tmp` in the DotLn-Angular base checkout too; the
  operator's choice, recorded in the evidence and the profile: keep the base
  clone uninstalled (the state the 2026-10-18 pass observed) and nothing is
  deleted, or accept a reinstall per close. (f) Criterion 1 says the diff
  removes nothing, but the class is declared on one line, so adding the key
  rewrites that line and a line diff shows a removal; carry-in: the executor
  adds the key so that `git diff` shows the `checks` and `supports` entries
  unchanged and records that no key is removed, and if the line diff still
  reads as a removal the clause is reworded to "removes no key" through the
  amendment route.
- **WO-005.** (a) Five commands join the target outside the registered gate
  and the worker could not see their CI wiring; §8.1's `tools` lint target
  joins the three checks to the declared `lint`, and criterion 2 reads that
  target back; carry-in: the evidence records `ci.yml` naming the three.
  (b) WO-009 and WO-010 run ahead of WO-005 without an edge to it and cost
  the critical path two cycles: D9's reading of the evidence (the name must
  precede the next Release and WO-010 precedes WO-005 by the previous pass's
  D13), reopened when the operator says to run two at once.

The sequence has no field of its own in the result schema; the worker folded
its judgment into each order's critical-path text.

## Candidates not filed, with their reopening conditions (section 9)

- **C1 `DotLn Angular` as the name of DotLn-Angular's releases.** Blocked on
  the kit: a declared target Release is titled by the registration id and
  the tag (§4). Reopen when the kit's registration admits a target display
  name, or the title reads from a configured name; then a self order
  declares `release: { "policy": "declared" }` and moves `release.close` to
  the allowed effects, and the base-setting pass adds `Target release
  classification` to the open target orders (D4).
- **C2 The `hostRules: "literal"` fallback for `dotln-angular`.** Reopen
  when WO-005's draft publish records that the host did not honor the
  hook's admission (a prompt or a denial in its decisions); then a self
  order turns the fallback on and the later members run under it (D6).
- **C3 The Angular cache setting in the registration's gate argv.** Reopen
  when WO-005's step 5 records that the setting belongs to the gate argv
  rather than the target; then a self order edits the registration (the
  previous pass's D8; WO-011 precedes WO-005).
- **C4 Removing the operator's interim trust entries of 2026-10-18.** Reopen
  when WO-005's draft publish records the hook's admission honored with the
  entries absent, or the operator removes them; then the operator record
  says so and FUP-2479f6d32b2396a8 settles (D6).
- **C5 A planning check for Preflight tokens absent from
  `npm test -- --list`.** Reopen if a later kit revision drops or renames a
  suite an open order names, as v0.85.0 did with `harness`; a request to
  core until then (§10).

## Carried candidates of earlier passes

The previous passes' conditions stand unchanged: CI on the fork, required
approvals, retitling the two published Releases, a lane pair of small self
orders (the main-rules pass's C2 to C5), and the workstream pass's C1 to C10
(typed translation keys, the WoW tooling app, the example API and a real
identity provider, the DotLn console feature, production environment and
preview deployment, one word that runs the queue, the upstream-issues
helper, orders spanning repositories, a second feature by convention). The
upgrade order (the main-rules pass's C1) is filed as WO-011.

## 10. Requests to core: the prompt for the primary DotLn planning session

The operator pastes the block below into the primary DotLn planning session
(D11). Each item names the record it rests on; nothing waits on memory.

```text
planning: requests from the DotLn-Enterprise-Starter fork (dylanwoodconsulting) at starter v0.85.0, recorded in its planning pass of 2026-10-19 (docs/planning/latest-upstream-2026-10-19.md §10). Read each against the code it names; file, decline or defer each with its reopening condition.

1. A display name for a declared target release. scripts/release.mjs publishTargetRelease titles the target's GitHub Release `${state.repositoryId} ${tag}` and writes the order's title into the tag message; a fork whose registration id is `dotln-angular` would publish "dotln-angular v0.1.0". The operator wants "DotLn Angular v0.1.0": admit `repositories.<id>.release.displayName` (the same shape and limits as the launchpad's `release.displayName`) and use it in the Release title and the tag message. Until it lands the fork declares no target release (its D4), boarded as a blocker.

2. The starter's core-named tag breaks a fork's local baseline. The v0.85.0 starter refresh tags the refresh commit with core's release name; README §Taking upstream updates says `git fetch upstream`, which follows that tag into the fork's clone. Once the update merges, the tag is reachable from HEAD, `npm run release -- check-surfaces --local` fails (`FAIL release-block: observed v0.2.0; expected one strict version at or above v0.85.0`), `npm run test:docs` fails with it, and `release prepare --local` (which reads every local tag) would assign the next order a version above v0.85.0. The fork deleted the tag by hand and will set `remote.upstream.tagOpt --no-tags`. Options for the kit: the README route fetches with `--no-tags` and says to set the remote option; or the local baseline ignores tags whose names the kit manifest names as the source release; or the starter tags under a distinct namespace.

3. Preflight tokens against `npm test -- --list`. v0.85.0 lists no `harness` suite (it moved into the `generated` structural check), so an exported instance's orders written under v0.84.0's rule (`npm test -- --only harness`) name a suite the runner refuses. A planning or document check that flags a Preflight `--only` token absent from `--list` would catch this at the pass instead of at activation.

4. The live qualification of the registered-target admission. The fork's WO-005 will run the first `worktree publish --draft` under Claude Code auto mode and record the hook's decision from the session journal, whether the host prompted, and which operator trust entries were present. Say what else the fork should record for criterion 4's rows, and whether the hook's decision is written somewhere a session can read without a host prompt.

5. A redaction route for the follow-up register's history. The register keeps every source revision's summary and refuses an edit to committed history (`committed source or disposition history was removed or rewritten`), so a summary that copied an operator's message before its decision was repaired cannot be paraphrased by a later pass. Either a route that rewrites one historical summary under an operator's recorded direction, keeping the revision chain honest, or summaries that never copy a decision's dispatch text, would let an instance honor a no-quotes rule.

6. Carried from the fork's 2026-10-18 passes, not re-verified against v0.85.0: `plan conditions` evaluates core-only condition sources in an exported instance (ten `unknown` rows); `npm run resume -- status --json` and `docs/control/current.md` name report paths `target-records` moved into the target; a `repo.settings` effect for registrations; `historicalDependencyIds` hard-codes core's WO-001 and WO-002; a target order's base fixed at planning time costs one pass per chain member; the outward lint refuses a leading gitmoji; `followups --apply` refuses the host scratchpad; `plan start` dates branches in UTC; the console view model and the WO-193 request channel for the operator's agent-orchestration UI.
```

## 11. Write-backs

- `docs/operator/README.md`: the dated directions of D10.
- `docs/repositories/dotln-angular.md`: the policy paragraph at v0.85.0,
  WO-011, the typed edge and the release name (D2, D4).
- `docs/workstreams/WS-001-dotln-angular.md`: WO-011 as a member with its
  edge to WO-005, the dependency plan's sentence and the delivery-state row
  (D2).
- `docs/work-orders/WO-011-starter-v0.85.0-registration.md` (new); WO-009,
  WO-010 and WO-005 amended (§8).
- `docs/planning/sequence.md`: WO-011 after WO-010 (D9).
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage
  index regenerated.
- `docs/planning/followups.json`: the five new rows synced and deferred
  (§7, §9).
- The quote sweep of D15: WO-004, WO-008, WO-003's decisions and handoff,
  both earlier planning documents, the ledger's three dispatch headings, the
  operator record's markers and standard, WS-001's germ phrases and
  taxonomy questions; pull request #8's body (outward).
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/decisions-index.md`,
  `docs/planning/cost-table.json`: regenerated.
- Outside the planning branch, by D1: `chore/starter-update-v0.85.0` and
  pull request #8.

## 12. Goal alignment, cost and document ceilings

The outcome these decisions serve is the purpose's critical path: the gate
every target order waited on (a starter carrying core WO-221) is lifted by
#8, WO-011 lands the one declaration the v0.85.0 close needs, and the
foundation chain activates after three self orders that each pay one cycle.
What the pass removes from the operator's hands: no hand-retitled Release
and no mis-named target Release (D3, D4); no tag cleanup after each update
once WO-011 sets the remote option (D8); one update instead of two (D1). What
stays manual by the kit's design: the two merges, the resume phrases, and
the one choice only the operator can make, the interim trust entries before
WO-005's draft publish (D6). Lenses that changed the plan: rule beating
(WO-011's criteria read exact outputs back; the tag guard is read from
`git config`, not promised); shifting the burden (D8 fixes the fetch rather
than each session's memory); success to the successful (D4 declines a
feature that would publish the wrong name); process activity is not
progress (D13 leaves WO-006 to WO-008 alone until their bases exist).

Cost: `npm run meta -- --plan-cost` records the table after the subject
commit; this session spent no worker before the refuter; process cost at
entry was 89,237 tokens (source `claude-transcript-message-usage`, scope
`dispatch`, cutoff 2026-10-19T14:41:04Z); at the receipt it read 17,470,377
tokens (same source and scope, cutoff 2026-10-19T15:51:54Z), the quote
sweep and its scans included; the handoff reading is in the pull request. Document ceilings: no product document changed in this pass
(`docs/product/purpose.md` keeps its 1,939-byte ceiling); the kit's product
documents are kit files and carry no instance ceiling.

## 13. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index --check`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run meta`, `npm run plan -- check`,
`npm run test:docs`.

Results at the subject commit `ff1d524` (cost table) over `6d21541` (the
quote sweep) and `291456c`: `work-orders index --check` PASS,
`lineage index` regenerated and current, `docs-check` PASS (1 product
document, 2 declared historical link occurrences, 0 failures; three
pre-existing advisories on filed records, WO-003-D003, WO-001 FINAL-001 and
WO-003 VER-002, none a quote of the operator after D15),
`publication:check` reporting no editions declared, `npm run meta` no budget breach, and `plan check`
waiting on the receipt. The document gate at v0.83.0 before the subject
commit: 15 passed, 2 failed (the two plan checks, which read committed order
files). A detached worktree in session scratch at `origin/main` (`98b3934`,
the merged #8) with this branch merged onto it and bootstrapped at v0.85.0:
`npm run test:docs` 12 passed, 2 failed (`planning pass
planning-e0dd1f8a7a5b84af needs a receipt`), 535 s, so the merged result is
green under v0.85.0 once the receipt below is in.

Refutation: one fresh `dotln-worker` (`claude-opus-5-5` by its definition and
the host's system prompt; no effort readback) on the canonical prompt from
`npm run plan -- refute` at base `ff1d524`, default pass scope (WO-009,
WO-011 and WO-005, plus the sequence; WO-010 and WO-006 to WO-008 carried by
hash), dispatched at 15:41:48Z. Receipt
[`2026-10-19-planning-e0dd1f8a7a5b84af-003`](refutations/2026-10-19-planning-e0dd1f8a7a5b84af-003.md),
verdict `aligned-with-findings`, 0 holds, 10 known issues (§8.2), 4 carried
judgments, dispatch-to-file 964,002 ms (16.1 minutes; the worker's own
wall-clock 826 s, 185,431 tokens, 43 tool uses). The worker's statement names
what it read: the whole prompt; the kit at v0.85.0 through
`git show origin/main:…` (the configuration, release, worktree,
handoff-ledger and target-close scripts and the contributor loadout's role
text), `dotln.config.json`, the grants, the profile, WS-001, README and
UPSTREAM; no bounded probe, no network, no descendant, no repository or Git
write; not the planner narrative, receipts, ledger, intake, evidence or
control lane. The judged, committed and workspace subjects agree
(`sha256:f47be676…`). `npm run test:docs` after the receipt is recorded in
the pull request.
