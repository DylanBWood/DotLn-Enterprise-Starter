# Main rules, the release name and the platform's routed items, 2026-10-18

## 1. Subject, authority and provenance

The operator opened `planning:` on 2026-10-18 with three items: branch
protection on `main` for this fork and for DotLn-Angular, releases named
`Launchpad` instead of `DotLn`, and the latest upstream. They then asked for a
pause, pasted the platform pass's seven routed observations from WO-004 with
an operator's note, the eight questions they had put to that platform pass,
and the product purpose of DotLn-Angular. Every message is captured verbatim
in ignored intake (`docs/intake/notes/planning-main-rules-2026-10-18.md`,
SHA-256 `222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`;
a later message of the same dispatch, the agent-orchestration direction, is
captured beside it in `planning-main-rules-2026-10-18-addendum.md`, SHA-256
`b9e38a5ded14d08a7d235886bf014bb5fc1919e4cf2bff0a7efe34dd573bf3ca`), sibling
records, never sources to copy from. This document is planner
synthesis of that capture, this instance's records, the kit's scripts, both
repositories' state read through the GitHub API, the incoming starter
revision's own preview, and the GitHub documentation on rulesets (§4). The
clean-room screen found the operator's own public repositories and accounts
and the kit's documented contracts; no employer material, credential, private
hostname or identifier.

Entry was clean `main` at `773d867` (WO-004's review merged), WO-001, WO-003
and WO-004 closed, no active order, `v0.2.0` the latest tag. The pass runs on
`planning/2026-10-18-main-rules-and-platform-items`, created by `plan start`,
the second pass of this UTC date. Only the parent writes this checkout.
Fan-out plan: one background `dotln-worker`, the planning refuter (§13),
against the cap of 20; no research worker, because this session read the
facts in §4 itself; no descendants.

Aim, as read: protect `main` in both repositories, name the releases, settle
the platform's seven routed items as this instance's own decisions, set
WO-005's base now that WO-004 has merged, and record where the upstream update
sits, since the operator will take it in the next pass before any order
activates. Traps named before the material choices: treating "set up branch
protections" as something a planning pass does itself (it files an order and
touches nothing on GitHub); reading the operator's standing preference that sessions do not change
repository settings as overriding today's explicit direction, or the
reverse (D1 and the operator record carry the dated exception); writing a
step the fork's signed-in account cannot perform without saying so (D2);
bundling or splitting orders by the cycle's cost instead of by subsystem
(D13); taking the starter update inside a document-only pass (D4); and
letting the operator's eight questions widen this pass into platform work (§5
routes each to its home). The NoOp at entry: both `main` branches stay open
to direct pushes, the next Release is minted as `DotLn v0.3.0`, WO-005 cannot
activate because its base line names an empty repository, and the platform's
seven items wait on memory.

## 2. Entry observations

`plan start` and `plan failures` since the last receipt (2026-10-18T01:02Z):
6 items; 1 failed verification (WO-003 VER-001: criteria 4 and 6 unmet and
waived, one decision's `dispatch` field repaired, VER-002 passed), 0 failed
final reviews, 1 repair, 2 orders made ready, 3 off-ramps (all
`CriterionWaived`: WO-003 criteria 4 and 6, WO-004 criterion 6), 0
corrections, 0 amendments; final-review escapes 1 of 3 reviews (WO-004
FINAL-001: the title helper's stale-gitmoji case, repaired in that review);
5 local release closes; 0 local host denials; 11 interventions (7
unclassified); 1 long phase; 3 repeated gate runs; recent tracks: 1 delivery,
1 machinery, 1 unknown (WO-001). Reader scores: unavailable, no profile
declared, none due. Phase medians over the three closed orders:
implementation 1,920 s, verification 812 s, final review 2,586 s.

One inherited document-gate failure was met and repaired within authority:
`docs/evidence/WO-004/README.md` and `handoff.md` link `decisions.md`, which
`target-records` moved into DotLn-Angular's `docs/dotln/evidence/WO-004/`
(`TargetRecordsCommitted`, 2026-10-18), so `docs-check` reported two missing
files on `main` as merged. The pass declares both links as historical link
exceptions in `docs/control/doc-baseline.json` (the gate's own mechanism for
moved records) rather than editing the executor's evidence; the kit side,
the projection naming moved paths, is a request to core (§10).

The three waivers share one cause, and it is routed here: a criterion whose
evidence can exist only after the verification pass or after the merge
(WO-003's clone record and a Preflight suite this kit does not carry;
WO-004's draft pull request and its workflow run). D5 and D7 remove the
pattern from every open order; D12 keeps every self order's Preflight line to
the two suites this kit runs (`kit-verify`, `harness`), the rule v0.84.0's
WO-216 D028 states for exported instances.

## 3. Reopening observations

`plan conditions` at 15:49Z (2.8 s): 1 hold, 10 unknown, 29 decision
conditions and 18 register rows not evaluated. Both observations are the ones
the previous pass recorded: the hold is `gate-task:target-worktree`, latest
444.259 s against a one-sample thirty-day median of 38.649 s (threshold
57.97 s), with no new sample since; the ten unknown rows each name a core
condition source absent in this instance. D15 keeps both NoOps and §10
carries the second to core as a request.

## 4. Observations, dated 2026-10-18

| Item | Observed | Source |
| --- | --- | --- |
| This repository | `dylanwoodconsulting/DotLn-Enterprise-Starter`, public, a fork of `DylanBWood/DotLn-Enterprise-Starter`, owner type User; collaborators `dylanwoodconsulting` (admin) and `DylanBWood` (push, no admin); the signed-in `gh` account is `DylanBWood`; all six pull requests were authored and merged by `DylanBWood`; merge, squash and rebase allowed; merge-commit title `PR_TITLE`, message `BLANK`; `delete_branch_on_merge` false | `gh repo view`, `gh api …/collaborators`, `gh pr list`, `gh auth status` |
| Its `main` | not protected (`branches/main/protection` answers 404 for the push-only account; the branch object reports `protected: false`); no rulesets; `rules/branches/main` is `[]` | `gh api` |
| Its releases | `DotLn v0.1.0` (2026-10-15) and `DotLn v0.2.0` (2026-10-18); the local tags agree; `npm run release -- notes v0.2.0` begins `DotLn v0.2.0` | `gh release list`, `npm run release -- list` |
| DotLn-Angular | `DylanBWood/DotLn-Angular`, public, owned by `DylanBWood` with admin; `main` at `651d76ff68e9b3a38fe770226deb634bca28b54c` (`:sparkles: feat: scaffold the Nx and Angular workspace (#2)`); remote branches: `main` only, the draft's `wo-004` and `feat/scaffold-workspace` are already gone; not protected, no rulesets; merge settings as the fork's; the check run on `main` is `checks` by the `github-actions` app (id 15368); workflows `ci.yml` (job `checks`) and `pr-title.yml` (job `title`) | `gh api`, `git ls-remote` |
| Commit signing | the local commits `b4bbe1d` and `6a28a1e` carry no signature; `gpg.format` is `ssh`, `commit.gpgsign` unset | `git cat-file`, `git config` |
| The release name | `scripts/lib/config.mjs` validates `release.displayName` (default `DotLn`; at most 64 characters; single line; no backticks or version tokens); `releaseClaimLine` writes `This source prepares <name> \`vX.Y.Z\`.`; `releaseEdition` titles the notes `<name> <version>` and `releaseTitle` takes that first line as the GitHub Release title; `dotln.config.json` declares no `release` section. The mechanism is in this kit at v0.83.0, documented in the README §Releases in this instance | the scripts, the README |
| Upstream | the starter's `main` at `6cea5a2` ("Refresh starter to v0.84.0", core `32f9653f1d1de9ec007924916f0ffb5dbd6a5546`, published 2026-10-18T15:37Z); this fork is at v0.83.0 with 20 commits of its own. The incoming launchpad's preview of this instance: 69 kit files replaced, 35 added, 0 removed, 0 refused, 859 unchanged; build snapshot `fnv1a64:31e603768322b5eb` to `fnv1a64:ff67e2081f371fb8`; no instance actions declared. v0.84.0 is core's WO-216: the structural phase, `npm run sync`, handoffs on the Preflight suites, and three kit items WO-003 met here (the grant assertion, the clone id, the local-terms carry) | `git fetch upstream`, `launchpad.mjs preview --from upstream/main`, the core Release notes |
| Core WO-221 | filed, not landed: trust from the registration, an opt-in `--draft` form of `worktree publish` the final publish reuses, declared disposable output at close, a declared target release, release tags on the starter | the routed items (capture) |
| GitHub rulesets | "Anyone with read access to a repository can view its active rulesets"; rulesets layer and the most restrictive rule applies; enforcement `active` or `disabled` (`evaluate` is Enterprise-only); `GET /repos/{owner}/{repo}/rules/branches/{branch}` returns the active rules; `POST /repos/{owner}/{repo}/rulesets` takes `name`, `target`, `enforcement`, `bypass_actors`, `conditions.ref_name` (`~DEFAULT_BRANCH` admitted) and `rules`; the `pull_request` rule carries `required_approving_review_count`, `dismiss_stale_reviews_on_push`, `require_code_owner_review`, `require_last_push_approval`, `required_review_thread_resolution` and `allowed_merge_methods` (`merge`, `squash`, `rebase`); `required_status_checks` carries `required_status_checks[].context`, `integration_id` and `strict_required_status_checks_policy`; `non_fast_forward`, `deletion`, `required_linear_history` and `required_signatures` take no parameters; force-push blocking binds administrators unless they bypass. The three pages read state no plan or permission requirement; the empirical readback above (the list and rules endpoints answering for both public repositories; the classic protection endpoint answering 404 for the non-admin account) is what the order relies on | docs.github.com: about rulesets, the REST reference for repository rules, available rules for rulesets; read 2026-10-18 |
| The kit's routes that touch `main` or tags | records, planning and update branches reach `main` only through pull requests; release close pushes an annotated tag and creates the Release; the target close fast-forwards the local clone's base; nothing pushes to either `main` | 07 §Workflow closeout and releases; README §Taking upstream updates |
| The Angular cache | core's release-close session read `@angular/build` `src/utils/normalize-cache.js` resolving a relative cache path to the main checkout under a Git worktree; not reproduced here, the main clone holds no `node_modules` | the routed items |
| DotLn-Angular's ignore list at `651d76f` | `dist`, `tmp`, `out-tsc`, `node_modules`, `/coverage`, `.nx/`, `.angular`, `__screenshots__/`, `test-output/`, `playwright-report/`, `test-results/`, `.env` and `.env.*`; `nx.json` `cacheDirectory` is `.nx/cache`; the Playwright configuration takes `nxE2EPreset`'s output locations; `tsconfig.base.json` has empty `paths`; the app depends on Angular `~22.2.3` and Nx 23.3.0 | the files |
| The status projection | `npm run resume -- status --json` names `docs/verifications/WO-004/VER-001.md` and `docs/final-reviews/WO-004/FINAL-001.md`, which `target-records` moved into the target under `docs/dotln/`; neither path exists here | the command, `ls` |

## 5. The operator's direction, synthesized

**The three items.** Branch protection on `main` of both repositories, with
the standing preference "security and correctness that would hold in a real
organization" as the standard (D1, D2; WO-010). Releases named `Launchpad`,
version numbering unchanged (D3; WO-009); the update the operator remembered
is the kit's `release.displayName`, which v0.83.0 already carries, so no
update is needed for it. The latest upstream: the operator's note moves it to
the next pass, after the platform's pending pull requests merge, before any
order activates (D4).

**The seven routed items**, each settled as this instance's decision: the
draft at verified through the kit's `--draft` form (item 1, D5); WO-005 waits
for the upgrade (item 2, D6); draft evidence becomes a final-review
obligation (item 3, D7); the Angular cache pinned per worktree (item 4, D8);
the registration edits specified for the upgrade order (item 5, D9); host
trust recorded as interim and the head-branch setting (item 6, D10);
requests to core kept as dated notes (item 7, D11 and §10).

**The eight questions** the operator put to the platform, where this pass
answers them: which decisions are the kit's, core's or this fork's and how
each is changed (question 1, D16); what runs in the fork's session and what
goes back to the platform (question 2: the seven items are the fork's, §10
lists what goes back); whether fork fixes break the update (question 3, D16:
zero refused files today; instance files are preserved; a kit-file edit forks
that file); the global Claude settings (question 4, D10); the draft
superseded by a second pull request (question 5, D5: one branch, one pull
request, reused); the branch left on DotLn-Angular (question 6: both branches
are already gone, §4; the head-branch setting lands in WO-010, D10); the
option of a release for the sibling repository (question 7, D9: yes,
declared per order); the babysitting (question 8, §12 counts what each
decision removes).

**The product purpose of DotLn-Angular**, in the operator's words of today:
a UI over DotLn's features, for playing with them and changing them more
intuitively, so that the Angular app improves the platform, the platform the
starter, the starter this fork, and the fork the Angular app in turn (D17;
the purpose block and WS-001's outcome).

**Living in the UI.** The operator wants, in time, to work from the UI rather
than from terminals and harnesses: an agent-orchestration view that shows
status and lets them check in on running sessions, through the UI alone.
Recorded as the console's direction (D17; WS-001's later member, the DotLn
console feature), not as an order: the status and check-in surfaces it needs
are platform work (core's console view model and the request channel of
WO-193), and the Angular foundation WO-005 to WO-008 deliver is its
precondition. §10 carries the platform half as a dated note.

## 6. Decisions and NoOp records

Each decision names its source, the rejected alternative and the evidence
that reopens it.

- **D1 One active ruleset on `main` of each repository, through WO-010.**
  Rules: a pull request is required with no approval count (the operator is
  the only reviewer and an author cannot approve their own pull request);
  the merge method is restricted to `merge` (the operator's merge-commit
  preference, enforced instead of assumed); on DotLn-Angular the `checks`
  run of the `github-actions` app (id 15368) must pass, without requiring
  the branch to be up to date (orders run one at a time and the final review
  integrates `main` anyway); force pushes and deletion are refused; no
  bypass actor, so the rules bind the operator's own account too, which is
  what the operator's standard of holding in a real organization means;
  enforcement `active`.
  Rulesets rather than classic protection because the active rules are
  readable by anyone with read access (the verifier needs no admin), they
  layer, and administrators are subject unless listed as bypass actors.
  Not included, each a NoOp with its reopening: required approvals (reopen
  when a second account with write access reviews on both repositories);
  conversation resolution (reopen when the final review resolves threads
  through the `pr.thread.resolve` effect the grant already allows, which
  WO-004-D015 declined to do); required signatures (the local commits are
  unsigned; reopen when signing is configured in the sessions); linear
  history (it would refuse the merge commits the operator wants); a status
  check on the fork (it has no workflow; reopen when the fork gets CI, §9
  C2); `update` and `creation` rules (they would refuse the operator's own
  merges). Source: the dispatch's first item; §4. Reopen: any of the
  conditions above, or a kit route that pushes to `main` directly.
- **D2 The fork's ruleset is applied by an account holding admin, and the
  order names the fallback.** The signed-in `gh` account holds push only on
  the fork; the owner `dylanwoodconsulting` holds admin (§4). WO-010 reads
  the permission first, applies with `gh api` where admin is held
  (DotLn-Angular), and for the fork asks the operator to sign the owning
  account into `gh` in the executor's session, or applies the same JSON from
  the UI; the verifier reads the active rules back with read access either
  way. Rejected: granting `DylanBWood` admin on the fork (a repository
  setting that is the operator's and would widen a session account's
  authority for one step); filing the fork's half as a separate order (the
  same subsystem and the same JSON). Reopen: the operator grants admin or
  the kit admits a settings effect.
- **D3 This launchpad's releases are named `Launchpad`, through WO-009.** The
  order declares `release: { "displayName": "Launchpad" }` in
  `dotln.config.json` and runs `npm run release -- prepare --local`, which
  assigns the next patch above `v0.2.0` and rewrites the README claim to
  `This source prepares Launchpad \`v0.2.1\`.`; the release notes' first
  line and the GitHub Release title at close read `Launchpad v0.2.1`. The
  two published Releases keep their titles: the kit never edits a published
  Release, and retitling them is a GitHub UI action of the operator's,
  outside any order. Rejected: `DotLn-Enterprise-Starter`, the name fresh
  exports use (the operator asked for `Launchpad`); waiting for the starter
  update (the mechanism is in v0.83.0, §4); minor instead of patch (one
  configuration value, no kit behavior changes). Reopen: the operator
  chooses another name, or the Release title at close does not read as the
  notes' first line.
- **D4 The starter update waits for the platform's pending pull requests and
  is taken in the next pass, as two steps.** The operator's note is the
  source. First the README's own route for the kit bytes: from clean
  `main`, preview with the incoming revision's launchpad, merge it on
  `chore/starter-update-<version>`, `node scripts/harness.mjs emit` and
  `node scripts/lineage.mjs index`, one update pull request the operator
  merges with a merge commit, then `node scripts/bootstrap.mjs` on `main`
  (the route PR #3 followed for v0.83.0). Second, one self order, the
  upgrade order, for the instance edits WO-221 enables and the qualification
  of its routes (D9, D10; §9 C1 holds its content). Not filed now: the
  starter revision that carries WO-221 does not exist, and an order cannot
  name it. The v0.84.0 preview is recorded in §4 so the next pass knows the
  shape: zero refused files, so no local kit edit stands in the way. Cost of
  waiting against taking v0.84.0 now: one update instead of two, the draft
  route arrives with it, and WO-009 and WO-010 are written to v0.84.0's
  handoff rules already; the price is that nothing activates until the
  platform's pull requests merge. Rejected: taking v0.84.0 inside this pass
  (a planning branch refuses writes outside `docs/`, and the dispatch phrase
  authorizes only this branch's push and pull request). Reopen: the operator
  says to take v0.84.0 now (the README route runs on their word in a session
  on `main`), or the platform's pull requests are delayed past the point
  where WO-009 and WO-010 should not wait (they do not need the update).
- **D5 The draft at verified is the kit's `--draft` form, superseding the
  previous pass's D8 and the operator's interim rule of 2026-10-18.** For
  every open target order (WO-005 to WO-008): after the session that
  records `verification-result pass` has done so, that session runs
  `npm run worktree -- publish WO-NNN --target-worktree --draft --branch <type>/<slug> --title "<title>" --body-file <reviewed path>`,
  which commits from the tree without moving `HEAD`, pushes the branch and
  opens the draft; the final review reads the draft's threads into
  `docs/evidence/WO-NNN/preview-pr.json`, routes each, and publishes with
  the same command without `--draft`, which force-pushes with lease against
  the recorded draft head and reuses the branch and the pull request. Struck
  from the orders: the work-in-progress commit on `wo-NNN`, the force-push by
  hand and the manual close of the draft by the operator (routed item 1,
  capture SHA-256 `222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`).
  The form is available from the
  starter revision that carries core WO-221, so each order's first step
  refuses to activate until `scripts/worktree.mjs` carries `--draft`. Source:
  routed item 1; the operator's question 5. Rejected: keeping the hand route
  as a fallback inside the orders (two routes in one order is the babysitting
  the operator named); naming the executor as the actor (the kit's form runs
  after the verification pass, in the session that records it, and carries
  the kit's own admission). Reopen: WO-221 lands with a different command
  shape or actor (the update pass amends the four orders), or core ships a
  default route.
- **D6 WO-005 waits for the upgrade; the operator chose it.** Cost of running
  now: the hand route (a work-in-progress commit and push by the executor
  under the operator's interim user-settings entries, a second pull request
  at final review, a manual close), which WO-004 showed costs the operator a
  draft opened by hand, a close by hand and two merges, plus the risk that
  the hand-made draft and the kit's final publish diverge; cost of waiting:
  WO-005's four to six hours of work wait on core's WO-221 merge, a starter
  refresh, the update pull request and the upgrade order's cycle, which is
  calendar days rather than hours. The operator's note that they will wait for a few platform pull requests
  before doing more work orders (capture SHA-256
  `222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`) is
  the choice; the sequence
  keeps WO-005 behind WO-009 and WO-010, which need no update. Source:
  routed item 2; the capture. Reopen: the operator says run now; the pass
  that hears it amends WO-005 back to the hand route and refutes it.
- **D7 Draft evidence is a final-review obligation, never a criterion.**
  WO-005 to WO-008 carry no criterion on the draft (checked: each order's
  seven criteria name commands in the target and the gate); their last step
  and Known issues now state the obligation: the final review reads
  `docs/evidence/WO-NNN/preview-pr.json` (threads and workflow runs) and
  routes each item; the verifier judges nothing about the draft. WO-004's
  criterion 6 is closed history and is not rewritten. Source: routed item 3;
  the three waivers of §2. Reopen: an order whose outcome is the pull
  request itself (none foreseen).
- **D8 The Angular build cache is pinned inside each target worktree; WO-005
  gains the step.** In the worktree, the executor reads
  `node_modules/@angular/build/src/utils/normalize-cache.js`, determines
  which setting keeps the cache under the worktree (an absolute
  `cli.cache.path` per worktree, an environment variable, or none needed),
  applies it so the gate runs isolated, and records the finding in the
  repository profile and the generator log. If the setting belongs to the
  registration's gate argv rather than the target, the step boards it for
  the upgrade order (§9 C1). Source: routed item 4. Reopen: the redirect does
  not reproduce in the worktree (then the step records that and changes
  nothing).
- **D9 The registration edits are specified now and land with the upgrade
  order; DotLn-Angular gets the option of declared releases.**
  `classes.angular-nx-monorepo.disposable` lists `node_modules/`, `.nx/`,
  `dist/`, `.angular/`, `coverage/`, `test-output/`, `playwright-report/`,
  `test-results/`, `tmp/`, `out-tsc/` and `__screenshots__/`, each present in
  the merged `.gitignore` (§4); `.env` and `.env.*` are ignored but are the
  operator's local files, not build output, and stay undeclared.
  `repositories.dotln-angular.release` becomes `{ "policy": "declared" }` and
  `release.close` moves from `deniedEffects` to `allowedEffects`, because the
  operator wants the option of a release for the sibling repository
  (question 7); after that, each target order declares
  `Target release classification` (the update pass adds the line to WO-005 to
  WO-008 in the kit's landed grammar; `none` stays a valid declaration). None
  of this is written now: this kit's configuration validator refuses unknown
  keys (`requireKnownKeys` in `scripts/lib/config.mjs`). Source: routed item
  5. Reopen: WO-221 lands with different key names or semantics.
- **D10 Host trust is interim and recorded here; the head-branch setting
  lands in WO-010.** The operator's `autoMode.environment` entries of
  2026-10-18 (trusting DotLn-Angular and this launchpad for pushes from the
  order worktrees) are the interim measure, outside the repository, to be
  removed after the upgrade order's qualification shows the kit's admission
  carries the push; the operator record carries the standing preference that
  no order hands the operator a command and that a trust entry a publication
  step needs is named before activation. "Automatically delete head branches"
  on DotLn-Angular: core labelled it an operator setting; it is one API call
  the executor can make with the admin the signed-in account holds, so
  WO-010 makes it, reading the value back, and the operator may click it
  first (the step is idempotent). The fork's equivalent is not included (not
  asked; needs the owning account) and is a NoOp with the same reopening as
  D2. Source: routed item 6; questions 4 and 6. Reopen: the qualification
  shows the admission carries the push (then the entries go), or a
  publication step again needs a manual command.
- **D11 Requests to core are dated notes in this document (§10).** Until
  core's WO-193 lands the request channel, the operator carries them into a
  core planning pass. Source: routed item 7. Reopen: the channel lands (then
  §10 is filed through it).
- **D12 Self orders in this instance name only the suites this kit runs.**
  `npm test -- --list` prints `kit-verify` and `harness`; WO-009 and WO-010
  spell each as `npm test -- --only <suite>` under the bounded wrapper, the
  grammar v0.84.0 reads, then `npm run test:docs`. The target orders keep
  their target-command Preflight lines; the update pass adjusts them to the
  landed grammar. Source: WO-003-D005 and v0.84.0's WO-216 D028. Reopen: an
  order's Preflight names a suite `--list` does not show.
- **D13 Two orders, serial, WO-009 before WO-010, both before WO-005.** Not
  one order: the release configuration of this instance and the rules of two
  GitHub repositories are unrelated subsystems, and product 07 does not
  bundle those to save runs. Not a lane pair: two self orders claiming the
  next version collide and the second pays a retiming, and WO-009's name must
  reach `main` before the next Release so no third `DotLn` Release is
  minted, which fixes the order. Cost: two fixed cycles (by WO-004's phases
  about 25 minutes of implementation, 14 of verification and 42 of final
  review each) for about an hour of executor work in total; the operator may
  direct one order by amendment. Reopen: the operator says one order, or
  will run both at once.
- **D14 The operator record changes, dated.** The repository-settings
  exception for WO-010; the draft rule (the interim work-in-progress rule
  recorded and superseded by D5); host trust as interim and the no-manual-
  command preference; the release name; and the operator's pace (platform
  pull requests first, then the update, then orders). Source: the capture.
  Reopen: the operator changes any of them.
- **D15 The fired condition stays a NoOp.** The `target-worktree` hold rests
  on the same two samples the previous pass judged (38.649 s and 444.259 s;
  no gate has run since), the task is kit machinery, and nothing changes now.
  The ten unknown rows cannot be evaluated here. Reopen: as the previous pass
  set, a second fresh full gate recording the task above twice the
  then-median with at least three samples; and for the unknown rows, a kit
  update shipping instance-scoped condition sources (§10).
- **D16 Three layers, and where each is changed.** The kit (every
  manifest-listed file, verified by `kit-verify`) is the base functionality
  together with core's decisions baked into it: role text, hooks, the
  compiled runtime, the carried guide. This instance's decisions are its
  instance files: `dotln.config.json` (registrations, classes, the release
  name), `build/overlay.json` when present (equip or unequip supports,
  narrow authority, grants, identity), `packages/skeleton/loadouts/grants.json`
  (operator grants), the orders, the operator record, the repository
  profiles, the workstream and this document. The draft at verified is a kit
  command used by an instance decision, not a change to the verifier's role
  text; a support or skill change goes through the overlay and a re-emit.
  Editing a kit file is the true-fork path the README names: every later
  update refuses that file until it is restored, while instance files are
  preserved; the v0.84.0 preview shows zero refused files, so updates and
  targeted fork changes coexist as long as fork changes stay in instance
  files or go upstream (§10). Source: questions 1 and 3; the README §Taking
  upstream updates. Reopen: a fork change that needs a kit file (then it is a
  request to core first, a forked file only on the operator's word).
- **D17 The product purpose of DotLn-Angular is recorded in the purpose
  block and WS-001.** In the operator's words of today: a UI over DotLn's
  features, for playing with them and changing them more intuitively, so
  that the Angular app improves the platform, the platform the starter, the
  starter this fork and the fork the Angular app in turn; and, from the
  operator's later words of the same day (addendum capture SHA-256
  `b9e38a5ded14d08a7d235886bf014bb5fc1919e4cf2bff0a7efe34dd573bf3ca`), the
  console's direction: an agent-orchestration view the operator can live in,
  showing status and taking check-ins on running sessions through the UI
  alone. The purpose block gains both sentences and its ceiling is reset
  (§12); WS-001's later member for the console carries the direction.
  Rejected: filing the console order now (its foundation and its platform
  surfaces do not exist). Reopen: the operator restates the purpose, or
  WO-008 merges and core publishes the view model and the channel (then the
  next pass files the console order).

Immaterial lenses for the document-only writes: no shared compute beyond the
one refuter, no proxy goal, no process that provokes process; every criterion
in the two new orders names a command and its expected output.

## 7. The register and the failures consumed

The register held 18 rows at entry (11 settled, 1 deferred, 6 untriaged;
revision `511559dc…`). The pass disposed the six untriaged rows in one
`--apply` batch and left the deferred row as it stands:

| Row | Source | Disposition |
| --- | --- | --- |
| FUP-223cde718a523e67 | WO-004-D010 (fork pull-request titles) | `deferred`: no pull request from a fork exists and the operator is the sole contributor; reopen when one is opened against DotLn-Angular or the title workflow is edited |
| FUP-2479f6d32b2396a8 | WO-004-D013 (a trust entry at registration) | `deferred`: the kit side is core WO-221's trust from the registration; this pass records the interim entries and the preference (D10); reopen at the upgrade order's qualification or when a publication step again needs a manual command |
| FUP-29f02563e4477b69 | WO-003-D008 (the grant assertion) | `settled`: core v0.84.0 (WO-216 D028) requires an exported instance's committed grants to be operator- or registered-repository-granted; the next pass's update carries it; reopen if `npm test -- --only authority-grants` fails on this registry after the update |
| FUP-46062529c4c46ac3 | WO-003-D005 (Preflight names carried suites) | `settled`: v0.84.0 states the rule and D12 applies it; WO-003 is closed and its line is history; reopen if an order's Preflight names a suite `--list` does not show |
| FUP-c374aed5d23c980b | WO-004-D012 (the work-in-progress draft rule) | `settled`: recorded in the operator record and superseded by D5 in WO-005 to WO-008; reopen if WO-221 lands with a different shape |
| FUP-ccb3367ad84787cc | WO-003-D003 (the local-terms carry) | `settled`: v0.84.0 carries the main checkout's local-terms list at `worktree start` or prints the registration step; reopen if the first start after the update prints the step |
| FUP-a36dae4a6766b9ef | WO-001-D014 (a phrase leading a longer message) | left `deferred` as the previous pass recorded; its reopening condition (a kit change to the prompt hook) has not occurred |

The failures of §2 are consumed by D5, D7 and D12; no row was allocated to an
order, because none is this fork's to fix in code.

## 8. Orders cut, amended and the sequence

Two orders filed, four amended, one serial group; WO-003 and WO-004 retired
from the sequence as closed.

| Order | Repository | Outcome | Hard edge |
| --- | --- | --- | --- |
| [WO-009](../work-orders/WO-009-release-display-name.md) | self | `release.displayName` `Launchpad`; the README claim refreshed; the next tag and Release named `Launchpad v0.2.1` | none |
| [WO-010](../work-orders/WO-010-protect-main-both-repositories.md) | self | one active ruleset on `main` of each repository, applied and read back; head branches deleted on merge in DotLn-Angular | none |
| [WO-005](../work-orders/WO-005-foundation-libraries.md) | dotln-angular @ `651d76ff` | as filed, with the base set, the cache step, the `--draft` route, the final-review obligation and the repairs of §8.1 | WO-004 merged (met) |
| [WO-006](../work-orders/WO-006-component-taxonomy-shell-home.md) | dotln-angular (provisional base) | as filed, with the `--draft` route, the obligation and the repairs of §8.1 | WO-005 merged |
| [WO-007](../work-orders/WO-007-events-stores-data-access.md) | dotln-angular (provisional base) | as filed, likewise | WO-006 merged |
| [WO-008](../work-orders/WO-008-authentication-and-permissions.md) | dotln-angular (provisional base) | as filed, likewise | WO-007 merged |

The two new orders carry `Model:`, three-role `Effort:`, `Track:`, `Cost:`
with additions and removals, provenance naming the capture, a dated observed
gap, a Design with rejected alternatives, a numbered execution plan whose
steps name a file and a check, a `Preflight:` line in the `--only` grammar,
criteria whose last names the gate and `npm run test:docs`, known issues,
non-goals and operator-review assumptions. The screens of product 07: WO-010
says no code ships and no cited design assigns it code; no criterion reads
natural language (WO-010's fork criterion admits a recorded `blocked` with
the permission readback, the escape WO-004's criterion 6 used, because the
step may belong to the owning account). Live-run surfaces at WO-010's base:
the GitHub REST endpoints named in §4, all observed answering today.

### 8.1 Repairs applied to the open target orders

Receipt 001's known issues for WO-005 to WO-008 were left for the passes that
set each base. This pass changes all four orders for D5 and D7, so it applies
the repairs that need no new information and records what remains:

- **WO-005** (base set to `651d76ff…`): every `--include` pattern quoted;
  the literal-text check replaced by `tools/scripts/check-template-literals.mjs`,
  which parses inline and file templates with Angular's compiler and lists
  text nodes outside a `t` pipe interpolation; the token check replaced by
  `tools/scripts/check-token-names.mjs`, which reads `new InjectionToken`
  declarations across lines and nested generics; the test-kit check replaced
  by `tools/scripts/check-spec-kits.mjs`, which requires each spec's
  `providers` to spread a `provide*TestKit(` call; a criterion for the proxy
  configuration wired to `serve`; the ported specs carry the upstream
  copyright line and `THIRD-PARTY-NOTICES.md` holds the MIT and BSD-3-Clause
  texts; the cache step (D8).
- **WO-006**: `wcag21a` and `wcag21aa` added to the axe tags; the `--include`
  patterns of criteria 1 and 2 quoted; the vendor fallback stated (the order
  waits until the operator names the vendor; the pass that sets its base
  records it).
- **WO-007**: `msw` pinned to 3.x; the listen option checked by behavior (a
  spec issues an unmatched request and asserts the failure) rather than by
  the option's name; a criterion that the production bundle contains no
  `setupWorker` and no mocked endpoint path; the `?ff=` override is
  development-only through `EnvironmentConfig.featureFlagOverrides`; the
  `--include` patterns of criteria 1 and 3 quoted.
- **WO-008**: an e2e assertion after sign-in that Web Storage holds no token
  (the client library's stores included); the authorize navigation is driven
  by an app route in development, since MSW does not intercept top-level
  navigations; the `mock-idp` string check replaced by a bundle check for the
  development signing key's identifiers and the mocked endpoint paths; the
  documents state that the server enforces authorization and client checks
  shape presentation only; the `--include` pattern of criterion 1 quoted.
- **Remaining for the base-setting passes**: each order's `Repository:` line
  (WO-006 to WO-008), its `Target release classification` line once the kit
  carries it (D9), and its Preflight line in the landed grammar (D12).

## 9. Candidates not filed, with their reopening conditions

- **C1 The upgrade order.** One self order filed by the next pass when the
  starter carries core WO-221: it follows the update pull request (D4);
  writes the registration edits of D9; qualifies the `--draft` route and the
  kit's trust admission on one live target order step, after which the
  operator's interim trust entries are removed (D10); carries the cache
  finding of D8 into the gate argv if the target cannot hold it; adds
  `Target release classification` to WO-005 to WO-008 and adjusts their
  Preflight lines (D12); and re-refutes the horizon. File when the starter's
  `main` carries WO-221, or earlier on the operator's word for v0.84.0 alone.
- **C2 CI on the fork.** A workflow running `npm run test:docs` on pull
  requests to this launchpad, which would give WO-010's fork ruleset a status
  check to require. File when the operator asks, or when a records pull
  request merges with a failing document gate.
- **C3 Required approvals.** `required_approving_review_count` 1 on both
  repositories once a second reviewing account exists (D1).
- **C4 Retitling the two published Releases.** `DotLn v0.1.0` and
  `DotLn v0.2.0` keep their titles; a GitHub UI edit by the operator, never
  an order (the kit refuses to edit a published Release).
- **C5 A lane pair of small self orders.** Pairing WO-009 and WO-010 when
  the operator will run both at once and accepts the retiming (D13).
- **C6 Carried from the previous pass**: C1 typed translation keys, C2 the
  WoW tooling app, C3 the example API and a real identity provider, C4 the
  DotLn console feature (now framed by D17: the UI over DotLn's features and
  the agent-orchestration view the operator wants to live in),
  C5 production environment and preview deployment, C6 one word that runs the
  queue, C8 a dotln helper that files issues upstream (superseded by core's
  WO-193 channel when it lands), C9 orders spanning repositories, C10 a
  second feature added by convention; each with its recorded condition.

## 10. Requests to core, dated notes

Kit-level needs found in this instance, carried by the operator into a core
planning pass until WO-193 lands the channel (D11). Each is dated and names
the record it rests on; nothing here waits on memory.

- 2026-10-18: `plan conditions` evaluates core's condition sources in an
  exported instance: ten rows read `unknown (core condition sources absent)`
  and one hold (`gate-task:target-worktree`) judges a kit suite's timing
  against a one-sample median. Instance-scoped sources, or a kit flag that
  excludes core-only rows, would make the table decidable here (§3, D15).
- 2026-10-18: after `target-records` moves a target order's reports into the
  target, `npm run resume -- status --json` and `docs/control/current.md`
  still name the launchpad paths (`docs/verifications/WO-004/VER-001.md`,
  `docs/final-reviews/WO-004/FINAL-001.md`), which no longer exist (§4).
- 2026-10-18: a release-close summary told the operator that deleting the
  draft's remote branch was outside the role (question 6). With WO-221's
  reused draft branch and the head-branch setting (D10) the case disappears;
  until then the close could name the exact deletion as a step the next
  order's session performs under the grant instead of handing it over.
- 2026-10-18: the operator's agent-orchestration UI (status and check-ins
  on running sessions through the UI alone, addendum capture above) needs
  the platform to publish session and order status and to accept a
  direction through a channel the console can call; core's console view
  model and WO-193's request channel are the nearest surfaces, and this
  instance will file the console order against them once they exist (§9
  C6).
- 2026-10-18: a repository setting (branch rules, head-branch deletion) has
  no kit effect; WO-010 applies it with `gh api` under host permissions and
  records the readback as evidence (D1, D10). A `repo.settings` effect in the
  authority profile would let the registration declare it.
- Carried from the 2026-10-18 angular-workstream pass, C7, still open at
  v0.84.0: (a) `historicalDependencyIds` hard-codes core's `WO-001` and
  `WO-002`; (b) a target order's base is fixed at planning time while
  `worktree start` creates the worktree there, so a chain of target orders
  needs one pass per member; (d) the outward lint's title shape refuses a
  leading gitmoji; (e) `followups --apply` refuses the host scratchpad the
  role grants for other writes (met again today: the batch passed through
  the ignored control lane); (f) `plan start` dates the branch in UTC.
  Addressed upstream and settled or deferred in §7: (c) the draft at verified
  (WO-221), WO-004-D013's trust entry (WO-221), and WO-003's three items
  (WO-216).

## 11. Write-backs

- `docs/product/purpose.md`: the product purpose of DotLn-Angular (D17);
  ceiling reset in `docs/control/doc-ceilings.json` (§12).
- `docs/operator/README.md`: the dated directions of D14.
- `docs/workstreams/WS-001-dotln-angular.md`: the outcome's purpose
  sentence (D17), WO-005's base in the member table, house rule 20's draft
  route (D5).
- `docs/repositories/dotln-angular.md`: the branch and pull-request policy
  (D1, D5, D10), labelled as the state after WO-010 merges.
- `docs/work-orders/WO-009-release-display-name.md` and
  `WO-010-protect-main-both-repositories.md` (new); WO-005 to WO-008
  amended (§8, §8.1).
- `docs/planning/sequence.md`: WO-003 and WO-004 retired; WO-009 and WO-010
  filed ahead of WO-005.
- `docs/lineage/idea-ledger.md`: the registration heading; the lineage index
  regenerated.
- `docs/planning/followups.json`: the six dispositions (§7).
- `docs/control/doc-baseline.json`: the two historical link exceptions for
  WO-004's moved decisions (§2).
- `docs/work-orders/README.md` and `HISTORY.md`, `docs/lineage/decisions-index.md`,
  `docs/planning/cost-table.json`: regenerated.

## 12. Goal alignment, cost and document ceilings

The outcome these orders serve is the purpose's critical path with its
guard rails in place: every change reaches `main` as a pull request the
operator reads (WO-010 makes that a rule of the repositories instead of a
habit), the launchpad's releases carry its own name (WO-009), and the
foundation chain can activate (WO-005's base is set) once the platform's
routes land. What each decision removes from the operator's hands, against
question 8: one pull request per order instead of a draft plus a second
(D5); no manual close of a draft (D5); no manual deletion of a head branch
(D10); no manual command for trust once the kit's admission carries the push
(D10); no manual release on the sibling repository when an order declares
one (D9); no retitling of Releases minted after WO-009 (D3). What stays
manual by the kit's design: the resume phrases per phase and the merges,
which the previous pass's C6 records with its reopening. Lenses that changed
the plan: shifting the burden (D5 and D10 remove recurring rescues rather
than documenting them); rule beating (WO-010's criteria read the rules back
from GitHub's own endpoint; WO-009's read the configuration and the generated
claim, not a prose statement); success to the successful (D1 declines
required approvals rather than pretending one account can review itself);
process activity is not progress (D13 keeps two cycles because the
subsystems differ, and names the operator's option to merge them).

Cost: `npm run meta -- --plan-cost` records the table after the subject
commit; this session spent no worker before the refuter; process cost at
entry was 89,908 tokens (source `claude-transcript-message-usage`, scope
`dispatch`, cutoff 2026-10-18T15:48:31Z) and the handoff reading is in the
pull request. Document ceilings: `docs/product/purpose.md` measured 1,762
non-exempt bytes after D17's two sentences (1,365 before); ceiling 1,939
(plus one tenth) in `docs/control/doc-ceilings.json`, citing this document;
the kit's product documents are kit files and carry no instance ceiling.

## 13. Validation and independent judgment

Checks run on the committed subject before the refutation, with results
recorded here when they ran: `npm run work-orders -- index` and `--check`,
`node scripts/lineage.mjs index --check`, `node scripts/docs-check.mjs`,
`npm run publication:check`, `npm run meta`, `npm run plan -- check`,
`npm run test:docs`.

Refutation: one fresh `dotln-worker` (`claude-opus-5-5` by its definition;
the host's effort readback is recorded if it reports one) on the canonical
prompt from `npm run plan -- refute`, default pass scope: the orders this
pass created or changed (WO-005 to WO-010) and the sequence. The receipt's
identifier, verdict, holds, known issues and dispatch-to-file wall-clock are
recorded below once filed.
