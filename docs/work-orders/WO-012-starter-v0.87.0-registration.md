# WO-012 — Register starter v0.87.0: name DotLn-Angular's releases `DotLn Angular`, keep the base checkout's output at close, declare the operator's commit identity and verify the instance

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** patch. Configuration and records of this
instance change; no kit file changes.
**Cost:** adds to `dotln.config.json` one `release` object and one
`baseDisposablePolicy` key on the `dotln-angular` registration and one
top-level `contributions` object (about 300 bytes), moves `release.close`
from the registration's denied effects to its allowed effects, rewrites the
profile's `## Release close` section, adds WS-001's member and delivery-state
rows and this order's evidence. Removes nothing tracked beyond the moved
effect. Wall-clock: about 30 to 60 minutes of executor work plus the fixed
cycle (activation, verification, final review, release close); unknown until
run. Context bytes: the 2026-10-20 planning document §4, §6 and §7, core's
v0.87.0 release notes §Read before upgrading (WO-218), `scripts/lib/config.mjs`
(`validateRepositoryRelease`, `validateRepositories`, `validateContributions`,
`validateHistoricalWorkOrders`), `scripts/lib/contributions.mjs`,
`scripts/worktree.mjs` §publish, `scripts/lib/target-worktree-close.mjs`,
this order, about 80 KB. Commands added: none. Tokens: unknown until run.
Steps: 9. Re-mints: none; no registered evidence source, feedback source or
machinery suite source is edited, so `npm test` is the product gate.
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
starter as v0.87.0 on 2026-10-20. Planner-synthesized. Opaque identifier,
not a priority. Clean-room screen: the kit's documented contracts, core's
public release notes and the operator's own repositories.
**Depends on:** nothing typed. The update pull request #14
(starter v0.87.0, opened as a draft) merged into `main` with a green
document gate is the precondition of step 1; it is a pull request, not an
order, so no typed edge names it. At v0.87.0 the document gate fails on
`docs-check` for an instance whose target records moved (planning document
§4 and §6 D1), so the update merges once a starter release carries core's
repair, taken on the same branch, or the operator directs otherwise. Sequenced before
WO-006, whose base-setting pass adds a typed hard edge on this order
(planning document §6 D7): a target close reads the release policy and the
base policy from this repository's `main`.

<!-- dotln-dependencies:start -->
[]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** the planning document §4 (the v0.87.0
preview, the merge, the gates, the configuration probe and the WO-005
observations) and §6 D2 to D6; README.md §Taking upstream updates at
v0.87.0; core's v0.87.0 release notes §Read before upgrading (WO-218: target
releases and drafts, the judge-only base checkout, instance identity in
`dotln.config.json`, registered-target publication admits only the node
helper, local release baselines exclude starter tags);
`scripts/lib/config.mjs` (`validateRepositoryRelease`, the
`baseDisposablePolicy` branch of `validateRepositories`,
`validateContributions`, `validateHistoricalWorkOrders`);
`scripts/release.mjs` (`publishTargetRelease`, the title);
`scripts/lib/target-worktree-close.mjs` (`baseDisposablePolicy`);
`scripts/lib/contributions.mjs` (`contributionSignoffRules`) and
`scripts/worktree.mjs` §publish (where the rule runs);
`docs/repositories/dotln-angular.md`;
`docs/workstreams/WS-001-dotln-angular.md`; 07-execution-guide.md §Preflight
before the full gate and §Discipline.

**Objective:** after this order merges, `dotln.config.json` declares for
`dotln-angular` a target release policy with the display name
`DotLn Angular`, so a target order that carries a
`Target release classification` header closes with an annotated tag and a
GitHub Release titled `DotLn Angular <tag>` (the first is
`DotLn Angular v0.1.0`), and `release.close` is in the registration's allowed
effects; the clone's base checkout keeps its output at every target close
under `baseDisposablePolicy: "judge-only"` while the close still judges it
and refuses undeclared ignored material; `contributions.operatorAuthor`
names the author identity of this repository's session commits, so the kit's
publish helper passes its sign-off rule for the operator's own commits; no
historical order is declared, because WO-001 is a closed order under
control; the kit's two gates pass at v0.87.0 on this instance's records, with
any stale generated artifact repaired by `npm run sync`; and the repository
profile and WS-001 state the policy, the node-spelled publish helper the next
target order's draft must use, and what the close keeps.

**Observed gap (dated 2026-10-20, main at `d109e22`, update pull request
#14 open):** `dotln.config.json` declares no `release` key
under the registration, keeps `release.close` in `deniedEffects`, declares no
`baseDisposablePolicy` and no `contributions`. At v0.87.0
`validateRepositoryRelease` admits `displayName` with the launchpad's
validator and 64-character limit (the planning pass validated the exact
bytes of the Design with `validateConfig` in a scratch copy: admitted, and a
65-character name refused); the close reads `baseDisposablePolicy` and
defaults it to `delete`; and `worktree publish` runs
`contributionSignoffRules` over `origin/main..HEAD` before any push and fails
each commit whose author is not the declared `operatorAuthor` and carries no
matching `Signed-off-by` trailer. No commit on `main` carries such a trailer
and every session commit is authored as the operator, so this order's own
final publish would fail without the declaration. Without the display name,
DotLn-Angular's first target Release would be titled `dotln-angular v0.1.0`;
under the default policy, WO-005's close on 2026-10-20 deleted `.nx` (119
files), `dist` (10) and `node_modules` (37,877) in the target worktree and
found nothing to delete in the base checkout, which held no ignored file. The
profile and WS-001 still say the kit cannot name a target release.

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
- `baseDisposablePolicy: "judge-only"` on the registration: the close keeps
  the base checkout's output after the same judgment (undeclared ignored
  material still refuses with the registration remedy, and a collision with
  a fetched tracked path refuses), while the target worktree's declared
  output is still deleted; the preview and the receipt name the policy.
  Rejected: the default `delete` (the recurring reinstall WO-011 accepted
  only until the option existed; the clone is where the operator works);
  undeclaring the disposable roots (the target worktree's output must still
  go).
- `contributions.operatorAuthor`: the exact `Name <email>` that
  `git log --no-merges -1 --format='%an <%ae>' main` prints, the public
  author identity every session commit of this public repository already
  carries; the kit never reads it from Git configuration. Rejected:
  `git commit --signoff` on every session commit (every role's commit would
  need the trailer and one missing trailer blocks a publish; the kit's own
  repository declares the exemption instead); leaving it undeclared (this
  order's final publish fails the rule).
- `historicalWorkOrders`: not declared. WO-001 closed under control, no typed
  dependency names a historical id, and the generated index shows no
  historical row. Rejected: declaring `WO-001` (it would refuse the real
  dependency WO-003 records on it).
- The gates at v0.87.0 on this instance's merged records: `npm test` as one
  complete run and `npm run test:docs`, plus `node scripts/harness.mjs check`
  and `node scripts/launchpad.mjs verify`; `npm run sync` repairs a stale
  generated artifact the `generated` structural check reports, and its diff
  is committed and recorded. A failure this order cannot repair within its
  authority is recorded `blocked` with the output and boarded.
- The admission at v0.87.0: raw `git`, `gh` and `npm` forms receive no
  registered-target admission; the hook admits only
  `node scripts/worktree.mjs publish WO-NNN --target-worktree …` spelled
  through `node` and run from the launchpad root, at the phases that make
  the draft and closed forms legal. This order runs no live episode; it
  writes back that WO-006's draft publish uses that spelling, which the UI
  planning pass writes into WO-006 (planning document §6 D7).
- Write-backs: `docs/repositories/dotln-angular.md` §Release close is
  rewritten for the declared policy (the display name, the first tag, the
  judge-only base checkout with the composed disposable list as `loadConfig`
  reads it back, the node-spelled helper, the operator-identity exemption,
  the tag guard as WO-011 left it); `docs/workstreams/WS-001-dotln-angular.md`
  §Member orders and §Delivery states gain this order's rows.

Rejected as a whole: folding the declarations into the update pull request
(the kit bytes are taken by the README's route on the operator's word; the
configuration is an order's change with a verification); folding them into
WO-006 (a target order's branch lives in DotLn-Angular, and the launchpad's
configuration is read from this repository's `main` at the target's close).

**Deliverables:** the three configuration changes and the moved effect; the
readbacks; the recorded gate outputs at v0.87.0 and any `npm run sync`
repair; the profile's rewritten `## Release close` section; WS-001's rows;
`docs/evidence/WO-012/` with the decisions and README; the regenerated
indexes.

**Execution plan:**

1. Guard and activate, from the clean main checkout after the operator has
   merged the update pull request and the checkout has been fast-forwarded
   and bootstrapped (README §Taking upstream updates):
   `grep -c 'baseDisposablePolicy' scripts/lib/config.mjs` must print at
   least 1 and `grep -c 'displayName' scripts/lib/config.mjs` at least 2;
   if either prints less, stop and report that the update must merge first.
   Then `npm run test:docs` on `main` must pass; if its `docs-check` task
   fails naming a moved decisions file as not a readable regular file, stop
   and report that the starter release carrying core's `docs-check` repair
   must be taken first (planning document §6 D1). Then
   `npm run worktree -- start WO-012 docs/work-orders/WO-012-starter-v0.87.0-registration.md`.
   Check: `npm run resume -- status --json` shows WO-012 active.
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
3. The gates at v0.87.0: `npm test` (one complete run, started directly),
   `npm run test:docs`, `node scripts/harness.mjs check`,
   `node scripts/launchpad.mjs verify`. If the `generated` check reports a
   stale artifact, `npm run sync`, record its output and commit the diff.
   Check: each command exits 0; the outputs are recorded verbatim.
4. `docs/repositories/dotln-angular.md` (existing, `## Release close`):
   rewrite the section for the declared policy as the Design lists it,
   keeping the tag-guard paragraph WO-011 wrote. Check:
   `grep -c '^## Release close' docs/repositories/dotln-angular.md` prints 1,
   `grep -c 'DotLn Angular' docs/repositories/dotln-angular.md` is at least
   2, `grep -c 'judge-only' docs/repositories/dotln-angular.md` is at least
   1 and `grep -c 'node scripts/worktree.mjs publish' docs/repositories/dotln-angular.md`
   is at least 1.
5. `docs/workstreams/WS-001-dotln-angular.md` (existing, §Member orders and
   §Delivery states): add this order's member row after WO-005's and its
   delivery-state row, state `proposed`, naming this order's evidence path;
   add `WO-012` to the members of the `dotln-workstream` block with
   `repositoryId` `self`. Check:
   `grep -c 'WO-012' docs/workstreams/WS-001-dotln-angular.md` is at least
   3 and `grep -c 'docs/evidence/WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 1.
6. `docs/evidence/WO-012/decisions.md` and `README.md` (new): the decisions
   (each declared key and why; the moved effect; the identity read from the
   log; any `npm run sync` repair; what WO-006's draft session must run and
   record) and every command output above verbatim. Check: `npm run meta`
   exits 0 and `docs/lineage/decisions-index.md` lists the decisions.
7. Regenerate projections: `npm run sync`. Check:
   `npm run work-orders -- index --check` exits 0 and
   `grep -c -i 'historical' docs/work-orders/README.md` prints 0.
8. The release-close readback for this order's own close:
   `npm run release -- close WO-012 --dry-run` is the reviewer's step at
   final review, as the role text names it; the executor records nothing for
   it. Check: none at handoff.
9. Preflight, then handoff per 07-execution-guide.md §Discipline at the kit
   revision in force: run the Preflight line, `npm run test:docs`, then
   `npm run resume -- implementation-ready` with the attestation flags, the
   evidence README naming each criterion's command and output.

**Preflight:** `npm test` as one complete run started directly (starter
v0.87.0's executor rule; `npm test -- --list` and `--list --review` both
print the six structural checks and `kit-verify`, and its `kit-verify` row
is the `--only kit-verify` suite the handoff may consume), then
`npm run test:docs`.

**Acceptance criteria (all required)**

1. The step 2 readback prints exactly
   `{"policy":"declared","displayName":"DotLn Angular"}`, then `judge-only`,
   then `true ["package.publish"]`, then
   `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]`,
   then `[]`, then a line equal to the output of
   `git log --no-merges -1 --format='%an <%ae>' main`; and a key-by-key
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
   prints (977 and `e4c46109d19c98b37c6cd4c4f0923b8282f09c18` at starter
   v0.87.0; a later starter release taken on the update branch changes both
   and this criterion still reads them), and `node scripts/harness.mjs check`
   exits 0 printing a line that begins `harness check:`.
3. `npm run work-orders -- index --check` exits 0 and
   `grep -c -i 'historical' docs/work-orders/README.md` prints 0.
4. `grep -c '^## Release close' docs/repositories/dotln-angular.md` prints
   1, `grep -c 'DotLn Angular' docs/repositories/dotln-angular.md` is at
   least 2, `grep -c 'judge-only' docs/repositories/dotln-angular.md` is at
   least 1,
   `grep -c 'node scripts/worktree.mjs publish' docs/repositories/dotln-angular.md`
   is at least 1, `grep -c 'WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 3 and
   `grep -c 'docs/evidence/WO-012' docs/workstreams/WS-001-dotln-angular.md`
   is at least 1.
5. `git diff --name-only main...HEAD` lists `dotln.config.json`, the
   generated release-version claim in `README.md`, this order and files
   under `docs/` only.
6. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the readbacks and the gate outputs in
`docs/evidence/WO-012/README.md`; `npm run resume -- status --json` after
`implementation-ready` shows the attestation recorded.

**Known issues and carry-ins:** at starter v0.87.0 the document gate fails
on this instance's records before this order changes anything:
`readDecisions` now returns the decisions of WO-004 and WO-005, which
`target-records` moved into DotLn-Angular, with their launchpad path, and
`docs-check` opens that path (`scripts/docs-check.mjs`, the decisions
loop) instead of reading the moved record through its binding, so the task
fails with `docs/evidence/WO-004/decisions.md: document is not a readable regular file (ENOENT)`
(observed on the update branch on 2026-10-20; `npm test` passed 7 of 7
there). Step 1 refuses to activate this order until the gate is green on
`main`; the planning pass asks core for the repair. The kit's publish helper runs the sign-off
rule at this order's final publish over `origin/main..HEAD`; the reviewer
records its `PASS contribution-signoff` lines in FINAL-001, and a `FAIL`
line names the commit whose author is not the declared identity (a GitHub
merge commit never appears in that range). The release-close session runs
the printed helper command byte-exact and records the hook's journal row for
it: the three closes this instance has run (WO-001 on 2026-10-15, WO-011 and
WO-005 on 2026-10-20) were each journaled as
`Release-close admission withheld: byte-exact helper spelling missing; host permissions decide.`
and carried by host permissions (planning document §4). Under v0.87.0 the
`meta` artifact refuses in a worktree when no worktree of the clone has
`main` checked out (`no main-branch control-plane worktree found`, observed
on the update branch); the order worktree runs beside the main checkout on
`main`, so this is not expected here, and the executor records it if met.
The host's handling of the hook's admission without the operator's interim
trust entries stays unobserved until WO-006's draft publish under the node
spelling; this order makes no host-qualification claim. The Preflight-token
check (FUP-4c3c0351adc4c2cc) waits on core's WO-219; this order's tokens
were read against `npm test -- --list` at v0.87.0 by the planning pass. The
three `docs-check` advisories on filed reports (WO-003-D003, WO-001
FINAL-001, WO-003 VER-002) are left as filed.

**Non-goals:** a `Target release classification` header on WO-006 to WO-008
or WO-006's base (the UI planning pass, planning document §6 D7);
`hostRules`; editing a kit file; running a live target episode or any
publication to DotLn-Angular; changing the operator's host settings;
retitling published Releases; declaring `historicalWorkOrders`.

**Operator-review assumptions:** the operator accepts `DotLn Angular` as the
display name of DotLn-Angular's Releases and tags from WO-006 on, with
`v0.1.0` as the first tag; accepts that target closes keep the base
checkout's output under `judge-only` while still refusing undeclared
ignored material there; accepts that `dotln.config.json` names their public
commit author identity, the one every session commit already carries (the
sign-off route is the recorded alternative); merges the update pull request
and the planning pull request before dispatching this order; and decides
about the interim trust entries and the launchpad-local `Bash(node *)`
allow entry before WO-006's verified-phase draft publish (planning document
§6 D5).
