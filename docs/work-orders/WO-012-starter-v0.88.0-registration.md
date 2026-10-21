# WO-012 — Register starter 0.88.0: name DotLn-Angular's releases `DotLn Angular`, keep the base checkout's output at close, declare the operator's commit identity, grant the kit its release close and verify the instance (v0.3.3)

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** patch. Configuration, the operator grant and
records of this instance change; no kit file changes.
**Cost:** adds to `dotln.config.json` one `release` object and one
`baseDisposablePolicy` key on the `dotln-angular` registration and one
top-level `contributions` object (about 300 bytes), moves `release.close`
from the registration's denied effects to its allowed effects, adds
`release.close` to the effects and operations of the existing operator grant
in `packages/skeleton/loadouts/grants.json` and rewrites that grant's reason
(about 200 bytes), rewrites the profile's `## Release close` section, adds
WS-001's delivery-state row and this order's evidence. Removes nothing
tracked beyond the moved effect and the grant reason's superseded sentence.
Wall-clock: about 30 to 60 minutes of executor work plus the fixed cycle
(activation, verification, final review, release close); unknown until run.
Context bytes: the 2026-10-21 planning document §4 and §6, the 2026-10-20
planning document §4, §6, §7 and §9.1, core's v0.87.0 release notes §Read
before upgrading (WO-218) and v0.88.0's (WO-223), `scripts/lib/config.mjs`
(`validateRepositoryRelease`, `validateRepositories`, `validateContributions`,
`validateHistoricalWorkOrders`), `scripts/lib/contributions.mjs`,
`scripts/lib/target-publish.mjs` (`authorizeRegisteredEffects`),
`scripts/release.mjs` (`prepareTargetRelease`), `scripts/worktree.mjs` §start
and §publish, `scripts/lib/target-worktree-close.mjs`, this order, about
100 KB. Commands added: none. Tokens: unknown until run. Steps: 10.
Re-mints: none; no registered evidence source, feedback source or machinery
suite source is edited, so `npm test` is the product gate.
**Nomination provenance:** the 2026-10-20 planning pass
([planning document](../planning/latest-upstream-and-core-answers-2026-10-20.md)
§4, §6 D2 to D6 and §7), on the operator's dispatch of 2026-10-20 captured
verbatim in ignored intake
(`docs/intake/notes/planning-latest-upstream-and-core-answers-2026-10-20.md`,
SHA-256 `08208fab730f8c1311ff8fc53c635d0e7092499f6fc61b647e72c1a1d00d09c3`),
paraphrased: take the latest upstream and decide core's answers to this
fork's requests; the fired reopening condition of the 2026-10-19 pass's D4
(register row FUP-ad0cc3154f21f397: the kit's registration admits a target
display name); and core's fork-requests pass of 2026-10-19 (its §5 items 1
and 5, Appendix A), whose rows landed in core's WO-218 and reached the
starter as v0.87.0 on 2026-10-20. Amended by the 2026-10-21 planning pass
([planning document](../planning/latest-upstream-fixes-2026-10-21.md) §6
D2), on the operator's dispatch of 2026-10-21 captured verbatim in ignored
intake (`docs/intake/notes/planning-latest-upstream-fixes-2026-10-21.md`,
SHA-256 `9b1e3fe9d122ddc83053b6a8b03ac46f2cb97f90eabd15e3404d3f6b2db913a4`),
paraphrased: the upstream carries fixes and the fork is to be updated,
through the open update pull request or a new one. The amendment targets
starter v0.88.0 (update pull request #16) and repairs the known issues of
refutation receipt 004 that needed this order's text changed: the
`release.close` grant, criterion 3's pattern, criterion 4's counts and the
judge-only collision rule, the grant under the operator's direction of
2026-10-19 (capture SHA-256
`01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`) and
their correction of 2026-10-20 (capture SHA-256
`ed22827f76b72eeb7d52ba7802e1b8ad8ab8cbecf9bd01153517ab4f94384cb6`).
Planner-synthesized. Opaque identifier, not a priority. Clean-room screen:
the kit's documented contracts, core's public release notes and the
operator's own repositories.
**Depends on:** nothing typed. The update pull request #16
(starter v0.88.0, opened ready on 2026-10-21 with a green document gate on
its branch) merged into `main` is the precondition of step 1; it is a pull
request, not an order, so no typed edge names it. Sequenced before WO-006,
whose base-setting pass adds a typed hard edge on this order (the 2026-10-20
planning document §6 D7): a target close reads the release policy, the base
policy and the grant from this repository's `main`.

<!-- dotln-dependencies:start -->
[]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** the 2026-10-21 planning document §4 (the
v0.88.0 preview, the merge, the gates green on the update branch, the grant
and the settings observations) and §6 D1 and D2; the 2026-10-20 planning
document §4 (the configuration probe and the WO-005 observations), §6 D2 to
D6 and §9.1 (receipt 004's known issues); README.md §Taking upstream updates
at v0.88.0; core's v0.87.0 release notes §Read before upgrading (WO-218:
target releases and drafts, the judge-only base checkout, instance identity
in `dotln.config.json`, registered-target publication admits only the node
helper, local release baselines exclude starter tags) and v0.88.0's (WO-223:
the document gate reads moved records, the moved-record readers' three
places, the `worktree start` advisory, the release-close advisory's expected
spellings, the commit lint's limit); `scripts/lib/config.mjs`
(`validateRepositoryRelease`, the `baseDisposablePolicy` branch of
`validateRepositories`, `validateContributions`,
`validateHistoricalWorkOrders`); `scripts/release.mjs`
(`publishTargetRelease`, the title; `prepareTargetRelease`, the grant);
`scripts/lib/target-publish.mjs` (`authorizeRegisteredEffects`);
`packages/skeleton/loadouts/grants.json`;
`scripts/lib/target-worktree-close.mjs` (`baseDisposablePolicy`, the
judge-only collision refusal);
`scripts/lib/contributions.mjs` (`contributionSignoffRules`) and
`scripts/worktree.mjs` §start (the advisory) and §publish (where the rule
runs); `docs/repositories/dotln-angular.md`;
`docs/workstreams/WS-001-dotln-angular.md`; 07-execution-guide.md §Preflight
before the full gate and §Discipline.

**Objective:** after this order merges, `dotln.config.json` declares for
`dotln-angular` a target release policy with the display name
`DotLn Angular`, so a target order that carries a
`Target release classification` header closes with an annotated tag and a
GitHub Release titled `DotLn Angular <tag>` (the first is
`DotLn Angular v0.1.0`), `release.close` is in the registration's allowed
effects, and the operator grant `operator.dotln-angular.publication` names
`release.close` in its effects and operations, so the kit's release close
is authorized for `dotln-angular` (the operator's direction of 2026-10-19:
the releases are named `DotLn Angular`, and the kit makes them once it can
name them); the clone's base checkout keeps its output at every target close
under `baseDisposablePolicy: "judge-only"` while the close still judges it
and refuses undeclared ignored material; `contributions.operatorAuthor`
names the author identity of this repository's session commits, so the kit's
publish helper passes its sign-off rule for the operator's own commits; no
historical order is declared, because WO-001 is a closed order under
control; the kit's two gates pass at v0.88.0 on this instance's records, with
any stale generated artifact repaired by `npm run sync`; and the repository
profile and WS-001 state the policy, the grant, the node-spelled publish
helper the next target order's draft must use, and what the close keeps.

**Observed gap (dated 2026-10-21, main at `60a1a76`, update pull request
#16 open and ready):** `dotln.config.json` declares no `release` key
under the registration, keeps `release.close` in `deniedEffects`, declares no
`baseDisposablePolicy` and no `contributions`; the committed grant names
`repo.push`, `pr.open` and `pr.thread.resolve` only, and its reason records
the direction of 2026-10-17 that tagging stays with the operator, which the
direction of 2026-10-19 superseded. At v0.87.0 and v0.88.0
`validateRepositoryRelease` admits `displayName` with the launchpad's
validator and 64-character limit (the 2026-10-20 planning pass validated the
exact bytes of the Design with `validateConfig` in a scratch copy: admitted,
and a 65-character name refused); `prepareTargetRelease` calls
`authorizeRegisteredEffects` with `release.close`, which refuses a target
release close without an operator grant for the repository naming that
effect (refutation receipt 004, criterion 5's known issue); the close reads
`baseDisposablePolicy` and defaults it to `delete`; and `worktree publish`
runs `contributionSignoffRules` over `origin/main..HEAD` before any push and
fails each commit whose author is not the declared `operatorAuthor` and
carries no matching `Signed-off-by` trailer. No commit on `main` carries
such a trailer and every session commit is authored as the operator, so this
order's own final publish would fail without the declaration; at v0.88.0
`worktree start` also prints one advisory naming the declaration while it is
absent. Without the display name, DotLn-Angular's first target Release would
be titled `dotln-angular v0.1.0`; under the default policy, WO-005's close
on 2026-10-20 deleted `.nx` (119 files), `dist` (10) and `node_modules`
(37,877) in the target worktree and found nothing to delete in the base
checkout, which held no ignored file. The profile's `## Release close`
section still describes the registration as WO-011 left it.

**Design:**

- `repositories.dotln-angular.release` in `dotln.config.json`:
  `{ "policy": "declared", "displayName": "DotLn Angular" }`. The kit titles
  the target's GitHub Release and the annotated tag's first line
  `<displayName> <tag>`, the order's title and objective follow, and the
  first tag is `v0.1.0` because the target's origin holds none; the dry run
  previews the title. Rejected: renaming the registration to get the title
  (the id names the configuration, the grant, the control records and the
  evidence paths); the default title (the operator's direction of 2026-10-19
  names `DotLn Angular`).
- `authorityProfile.allowedEffects` gains `release.close` and
  `deniedEffects` becomes `["package.publish"]`: the kit tags a target only
  with `release.close` in the registered authority profile. No other effect
  changes.
- The operator grant `operator.dotln-angular.publication` in
  `packages/skeleton/loadouts/grants.json` (an instance seed, outside the
  kit) gains `release.close` at the end of both its `effects` and its
  `operations`, and its `reason` is rewritten to rest on the direction of
  2026-10-19 (capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`): the
  releases of DotLn-Angular are named `DotLn Angular` and the kit makes
  them at a target order's close; pushing an order's branch, opening its
  pull request and resolving its threads stay admitted; merging, repository
  settings and package publication stay with the operator. The `grantId`,
  `version`, `grantedBy` and `repo` fields stay as they are; if
  `authorizeRegisteredEffects` refuses the edited grant, the executor
  records the refusal text and the field it named before changing anything
  else. Rejected: a second grant object (one grant per repository keeps the
  record and the kit's reading in one place); leaving the grant and
  declaring the policy in the order that first releases (the refuter's
  alternative: the direction of 2026-10-19 already settles that the kit
  names and makes the releases, the operator's correction of 2026-10-20
  said so, and splitting the declaration buys a second cycle; the
  2026-10-21 planning document §6 D2).
- `baseDisposablePolicy: "judge-only"` on the registration: the close keeps
  the base checkout's output after the same judgment (undeclared ignored
  material still refuses with the registration remedy), while the target
  worktree's declared output is still deleted; the preview and the receipt
  name the policy. The key adds one refusal the default policy does not
  have: retained output in the base checkout that collides with a path the
  fetched base tracks refuses the close
  (`judge-only output collides with fetched tracked paths`; the base merge
  runs with `--no-overwrite-ignore`), where `delete` would have removed the
  output first; the remedy is to move the output or remove the key. The
  executor records the rule in the profile's section. Rejected: the default
  `delete` (the recurring reinstall WO-011 accepted only until the option
  existed; the clone is where the operator works, their request of
  2026-10-19 item 5); undeclaring the disposable roots (the target
  worktree's output must still go).
- `contributions.operatorAuthor`: the exact `Name <email>` that
  `git log --no-merges -1 --format='%an <%ae>' main` prints, the public
  author identity every session commit of this public repository already
  carries; the kit never reads it from Git configuration. Rejected:
  `git commit --signoff` on every session commit (every role's commit would
  need the trailer and one missing trailer blocks a publish; the kit's own
  repository declares the exemption instead); leaving it undeclared (this
  order's final publish fails the rule, and every launchpad `worktree start`
  prints the advisory).
- `historicalWorkOrders`: not declared. WO-001 closed under control, no typed
  dependency names a historical id, and the generated history page's
  `## Historical` section reads `None.`. Rejected: declaring `WO-001` (it
  would refuse the real dependency WO-003 records on it).
- The gates at v0.88.0 on this instance's merged records: `npm test` as one
  complete run and `npm run test:docs`, plus `node scripts/harness.mjs check`
  and `node scripts/launchpad.mjs verify`; `npm run sync` repairs a stale
  generated artifact the `generated` structural check reports, and its diff
  is committed and recorded. The document gate was green on the update
  branch on 2026-10-21 (14 passed; `docs-check` reads the moved records of
  WO-004 and WO-005 through their bindings). A failure this order cannot
  repair within its authority is recorded `blocked` with the output and
  boarded.
- The admission at v0.88.0: raw `git`, `gh` and `npm` forms receive no
  registered-target admission; the hook admits only
  `node scripts/worktree.mjs publish WO-NNN --target-worktree …` spelled
  through `node` and run from the launchpad root, at the phases that make
  the draft and closed forms legal. This order runs no live episode; it
  writes back that WO-006's draft publish uses that spelling, which the UI
  planning pass writes into WO-006 (the 2026-10-20 planning document §6 D7).
- Write-backs: `docs/repositories/dotln-angular.md` §Release close is
  rewritten for the declared policy (the display name, the first tag, the
  grant, the judge-only base checkout with the composed disposable list as
  `loadConfig` reads it back and the collision rule, the node-spelled helper,
  the operator-identity exemption, the tag guard as WO-011 left it), and
  its two interim sentences (`continues to deny` and `Until WO-012 merges`)
  are removed; `docs/workstreams/WS-001-dotln-angular.md` §Delivery states
  gains this order's row beside the member row the planning passes wrote.

Rejected as a whole: folding the declarations into the update pull request
(the kit bytes are taken by the README's route on the operator's word; the
configuration and the grant are an order's change with a verification);
folding them into WO-006 (a target order's branch lives in DotLn-Angular, and
the launchpad's configuration and grant are read from this repository's
`main` at the target's close).

**Deliverables:** the three configuration changes and the moved effect; the
grant edit; the readbacks; the recorded gate outputs at v0.88.0 and any
`npm run sync` repair; the profile's rewritten `## Release close` section;
WS-001's row; `docs/evidence/WO-012/` with the decisions and README; the
regenerated indexes.

**Execution plan:**

1. Guard and activate, from the clean main checkout after the operator has
   merged the update pull request and the checkout has been fast-forwarded
   and bootstrapped (README §Taking upstream updates):
   `grep -c 'baseDisposablePolicy' scripts/lib/config.mjs` must print at
   least 1, `grep -c 'displayName' scripts/lib/config.mjs` at least 2 and
   `grep -c 'primaryWorktree' scripts/lib/target-record-reader.mjs` at least
   1 (the v0.88.0 moved-record reader); if any prints less, stop and report
   that the update must merge first. Then `npm run test:docs` on `main` must
   pass; if it fails, stop and report the failing task and its output. Then
   `npm run worktree -- start WO-012 docs/work-orders/WO-012-starter-v0.88.0-registration.md`,
   which prints one advisory naming the sign-off declaration while
   `contributions.operatorAuthor` is undeclared; record it as the expected
   single advisory. Check: `npm run resume -- status --json` shows WO-012
   active.
2. `dotln.config.json` (existing, `repositories.dotln-angular` and the root
   object): add the `release` object and `baseDisposablePolicy` of the
   Design beside `disposable` and `profile`; move `release.close` from
   `deniedEffects` to the end of `allowedEffects`; add the top-level
   `contributions` object with `operatorAuthor` set to the string
   `git log --no-merges -1 --format='%an <%ae>' main` prints; change nothing
   else. Check:
   `node -e "import('./scripts/lib/config.mjs').then(m => { const c = m.loadConfig(process.cwd()); const r = c.repositories['dotln-angular']; console.log(JSON.stringify(r.release)); console.log(r.baseDisposablePolicy); console.log(r.authorityProfile.allowedEffects.includes('release.close'), JSON.stringify(r.authorityProfile.deniedEffects)); console.log(JSON.stringify(r.disposable)); console.log(JSON.stringify(c.historicalWorkOrders)); console.log(c.contributions.operatorAuthor); })"`
   prints `{"policy":"declared","displayName":"DotLn Angular"}`, then
   `judge-only`, then `true ["package.publish"]`, then
   `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]`,
   then `[]`, then the same line `git log --no-merges -1 --format='%an <%ae>' main`
   prints.
3. `packages/skeleton/loadouts/grants.json` (existing, the one grant): append
   `release.close` to `effects` and to `operations`; rewrite `reason` as the
   Design states, keeping the capture digest of the 2026-10-17 direction and
   adding the 2026-10-19 one; change nothing else. Check:
   `node -e "const g = require('./packages/skeleton/loadouts/grants.json'); const x = g.filter(e => e.repo === 'dotln-angular'); console.log(g.length, x.length, x[0].grantedBy, x[0].effects.includes('release.close'), x[0].operations.includes('release.close'), x[0].effects.length, x[0].operations.length)"`
   prints `1 1 operator true true 4 4`.
4. The gates at v0.88.0: `npm test` (one complete run, started directly),
   `npm run test:docs`, `node scripts/harness.mjs check`,
   `node scripts/launchpad.mjs verify`. If the `generated` check reports a
   stale artifact, `npm run sync`, record its output and commit the diff.
   Check: each command exits 0; the outputs are recorded verbatim with the
   wall-clock each gate prints (the 2026-10-21 planning pass observed
   304.86 s for the document gate in a fresh secondary worktree, its §4).
5. `docs/repositories/dotln-angular.md` (existing, `## Release close`):
   rewrite the section for the declared policy as the Design lists it,
   keeping the tag-guard paragraph WO-011 wrote, and remove the two interim
   sentences. Check:
   `grep -c '^## Release close' docs/repositories/dotln-angular.md` prints 1,
   `grep -c 'DotLn Angular' docs/repositories/dotln-angular.md` is at least
   2, `grep -c 'judge-only' docs/repositories/dotln-angular.md` is at least
   1, `grep -c 'node scripts/worktree.mjs publish' docs/repositories/dotln-angular.md`
   is at least 1, `grep -c 'collides' docs/repositories/dotln-angular.md` is
   at least 1, and `grep -c 'continues to deny' docs/repositories/dotln-angular.md`
   and `grep -c 'Until WO-012 merges' docs/repositories/dotln-angular.md`
   both print 0.
6. `docs/workstreams/WS-001-dotln-angular.md` (existing, §Delivery states):
   add this order's delivery-state row, state `proposed`, naming this
   order's evidence path, after WO-005's; add `WO-012` to the members of the
   `dotln-workstream` block with `repositoryId` `self` if absent. Check:
   `grep -c 'WO-012' docs/workstreams/WS-001-dotln-angular.md` is at least
   4 and `grep -c 'docs/evidence/WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 1.
7. `docs/evidence/WO-012/decisions.md` and `README.md` (new): the decisions
   (each declared key and why; the moved effect; the grant and the direction
   it rests on; the identity read from the log; the start advisory observed;
   any `npm run sync` repair; the gate wall-clocks; what WO-006's draft
   session must run and record) and every command output above verbatim.
   Check: `npm run meta` exits 0 and `docs/lineage/decisions-index.md` lists
   the decisions.
8. Regenerate projections: `npm run sync`. Check:
   `npm run work-orders -- index --check` exits 0,
   `grep -c 'historical (time-indexed)' docs/work-orders/README.md` prints 0
   and `awk '/^## Historical$/ { getline; getline; print; exit }' docs/work-orders/HISTORY.md`
   prints `None.`.
9. The release-close readback for this order's own close:
   `npm run release -- close WO-012 --dry-run` is the reviewer's step at
   final review, as the role text names it; the executor records nothing for
   it. Check: none at handoff.
10. Preflight, then handoff per 07-execution-guide.md §Discipline at the kit
    revision in force: run the Preflight line, `npm run test:docs`, then
    `npm run resume -- implementation-ready` with the attestation flags, the
    evidence README naming each criterion's command and output.

**Preflight:** `npm test` as one complete run started directly (starter
v0.88.0's executor rule; `npm test -- --list` and `--list --review` both
print the six structural checks and `kit-verify`, and its `kit-verify` row
is the `--only kit-verify` suite the handoff may consume), then
`npm run test:docs`.

**Acceptance criteria (all required)**

1. The step 2 readback prints exactly
   `{"policy":"declared","displayName":"DotLn Angular"}`, then `judge-only`,
   then `true ["package.publish"]`, then
   `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]`,
   then `[]`, then a line equal to the output of
   `git log --no-merges -1 --format='%an <%ae>' main`; the step 3 readback
   prints exactly `1 1 operator true true 4 4`; and a key-by-key
   comparison of `dotln.config.json` with `main` lists exactly these
   changes: `repositories.dotln-angular.release` added,
   `repositories.dotln-angular.baseDisposablePolicy` added,
   `contributions.operatorAuthor` added, `release.close` present in
   `repositories.dotln-angular.authorityProfile.allowedEffects` and absent
   from its `deniedEffects`, and no other key or value changed.
2. `node scripts/launchpad.mjs verify` prints
   `kit: <files> files verified at <commit>` where `<files>` and
   `<commit>` are the two values
   `node -e "const m = require('./KIT-MANIFEST.json'); console.log(m.files.length, m.commit)"`
   prints (977 and `a54f8d6520ed54d05e5209455c67541562716404` at starter
   v0.88.0; a later starter release taken before this order activates
   changes both and this criterion still reads them), and
   `node scripts/harness.mjs check` exits 0 printing a line that begins
   `harness check:`.
3. `npm run work-orders -- index --check` exits 0,
   `grep -c 'historical (time-indexed)' docs/work-orders/README.md` prints 0
   and `awk '/^## Historical$/ { getline; getline; print; exit }' docs/work-orders/HISTORY.md`
   prints `None.`.
4. `grep -c '^## Release close' docs/repositories/dotln-angular.md` prints
   1, `grep -c 'DotLn Angular' docs/repositories/dotln-angular.md` is at
   least 2, `grep -c 'judge-only' docs/repositories/dotln-angular.md` is at
   least 1,
   `grep -c 'node scripts/worktree.mjs publish' docs/repositories/dotln-angular.md`
   is at least 1, `grep -c 'collides' docs/repositories/dotln-angular.md` is
   at least 1, `grep -c 'continues to deny' docs/repositories/dotln-angular.md`
   prints 0, `grep -c 'Until WO-012 merges' docs/repositories/dotln-angular.md`
   prints 0, `grep -c 'WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 4 and
   `grep -c 'docs/evidence/WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 1.
5. `git diff --name-only main...HEAD` lists `dotln.config.json`,
   `packages/skeleton/loadouts/grants.json`, the generated release-version
   claim in `README.md`, this order and files under `docs/` only.
6. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the readbacks and the gate outputs in
`docs/evidence/WO-012/README.md`; `npm run resume -- status --json` after
`implementation-ready` shows the attestation recorded.

**Known issues and carry-ins:** the document gate at v0.88.0 passed on this
instance's records on the update branch on 2026-10-21 (14 passed, 304.86 s
in a fresh secondary worktree, most of it host-lane waits; `docs-check`
1.09 s); step 1 re-runs it on `main` and stops on any failure. Once the
release policy is declared, every `dotln-angular` order needs exactly one
`Target release classification` header or its close refuses
(`exactly one is needed`), and nothing checks earlier than the close; the UI
planning pass adds the header to WO-006, WO-007 and WO-008, and WS-001's
dependency plan carries the precondition (the 2026-10-21 planning pass, D2).
The kit's publish helper runs the sign-off rule at this order's final publish
over `origin/main..HEAD`; the reviewer records its
`PASS contribution-signoff` lines in FINAL-001, and a `FAIL` line names the
commit whose author is not the declared identity (a GitHub merge commit
never appears in that range). The release-close session runs the printed
helper command byte-exact and records the hook's journal row for it: the
three closes this instance has run (WO-001 on 2026-10-15, WO-011 and WO-005
on 2026-10-20) were each journaled as
`Release-close admission withheld: byte-exact helper spelling missing; host permissions decide.`
and carried by host permissions (the 2026-10-20 planning document §4); at
v0.88.0 a withheld advisory also prints the expected `--publish` and
`--dry-run` spellings and the mismatch class, which that session records
for core (the 2026-10-21 planning document §11). `judge-only` adds the
collision refusal the Design names; the base checkout held no ignored file
at WO-005's close, so the rule has not fired. The host's handling of the
hook's admission without the operator's interim trust entries, removed on
2026-10-20, stays unobserved until WO-006's draft publish under the node
spelling; this order makes no host-qualification claim. The Preflight-token
check (FUP-4c3c0351adc4c2cc) waits on core's WO-219; this order's tokens
were read against `npm test -- --list` at v0.88.0 by the 2026-10-21 planning
pass. The three `docs-check` advisories on filed reports (WO-003-D003, WO-001
FINAL-001, WO-003 VER-002) are left as filed.

**Non-goals:** a `Target release classification` header on WO-006 to WO-008
or WO-006's base (the UI planning pass, the 2026-10-20 planning document §6
D7); `hostRules`; a second grant object; editing a kit file; running a live
target episode or any publication to DotLn-Angular; changing the operator's
host settings; retitling published Releases; declaring
`historicalWorkOrders`.

**Operator-review assumptions:** the operator accepts `DotLn Angular` as the
display name of DotLn-Angular's Releases and tags from WO-006 on, with
`v0.1.0` as the first tag, and the grant that lets the kit make them rests
on their direction of 2026-10-19 and their correction of 2026-10-20, so no
new word is asked; accepts that target closes keep the base checkout's
output under `judge-only` while still refusing undeclared ignored material
there and a collision with a fetched tracked path; accepts that
`dotln.config.json` names their public commit author identity, the one every
session commit already carries (the sign-off route is the recorded
alternative); merges the update pull request #16 and the planning pull
request before dispatching this order.
