# WO-011 — Take starter v0.85.0 into this instance's configuration: declare DotLn-Angular's disposable build output for the kit's release close, keep core-named tags off this fork, run the v0.85.0 gates on the merged records, and record how the first draft publish observes the kit's admission (version assigned at activation)

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** patch. Configuration and records of this
instance change; no kit file changes.
**Cost:** adds one `disposable` list to `dotln.config.json` (about 200
bytes), one Git remote setting in the main clone (`remote.upstream.tagOpt`),
a `## Release close` section in `docs/repositories/dotln-angular.md`, a
delivery-state row in WS-001 and this order's evidence. Removes nothing
tracked; the setting stops `git fetch upstream` from fetching the starter's
core-named tags. Wall-clock: about 30 to 60 minutes of executor work plus the
fixed cycle (activation, verification, final review, release close); unknown
until run. Context bytes: the 2026-10-19 planning document §4 and §6, the
README §Taking upstream updates, core's v0.85.0 release notes §Read before
upgrading, `scripts/lib/config.mjs` §classes, this order, about 60 KB.
Commands added: none. Tokens: unknown until run. Steps: 9. Re-mints: none;
no registered evidence source, feedback source or machinery suite source is
edited, so `npm test` is the product gate.
**Nomination provenance:** the 2026-10-19 latest-upstream planning pass
([planning document](../planning/latest-upstream-2026-10-19.md) §4, §6 D2,
D4, D5, D6 and D8), on the operator's dispatch of 2026-10-19 captured
verbatim in ignored intake
(`docs/intake/notes/planning-latest-upstream-2026-10-19.md`, SHA-256
`01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`):
"planning: get latest upstream", and candidate C1 of the 2026-10-18
main-rules pass (the upgrade order, filed when the starter carries core
WO-221). Planner-synthesized. Opaque identifier, not a priority. Clean-room
screen: the kit's documented contracts, core's public release notes and the
operator's own repositories.
**Depends on:** nothing typed. The update pull request #8 (starter v0.85.0)
merged into `main` is the precondition of step 1; it is a pull request, not
an order, so no typed edge names it. Sequenced after WO-010 and before
WO-005, which carries a typed hard edge on this order (planning document §6
D2 and D9).

<!-- dotln-dependencies:start -->
[]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** the planning document §4 (the v0.85.0
preview, the merge, the gates and the tag observation) and §6 D2, D4, D5,
D6 and D8; README.md §Taking upstream updates and §What runs here at
v0.85.0; core's v0.85.0 release notes §Read before upgrading (WO-221: the
close judges the base checkout's ignored files; forks keep core's tags off
their origin; no live host qualified); `scripts/lib/config.mjs`
(`validateClasses`, `validateDisposablePaths`, `validateRepositoryRelease`);
`scripts/release.mjs` (`remoteTags`, `ancestralLocalTags`,
`publishTargetRelease`); `docs/repositories/dotln-angular.md`;
`docs/workstreams/WS-001-dotln-angular.md`; 07-execution-guide.md §Preflight
before the full gate and §Discipline.

**Objective:** after this order merges, `dotln.config.json` declares the
`angular-nx-monorepo` class's disposable output, so a target order's release
close under starter v0.85.0 deletes DotLn-Angular's regenerable files in the
target worktree and the clone's base checkout and refuses no undeclared
ignored file the workspace is known to produce; the main clone's `upstream`
remote fetches no tags, and neither the clone nor `origin` holds a
core-named tag; the kit's two gates pass at v0.85.0 on this instance's
records, with any stale generated artifact repaired by `npm run sync`; and
the repository profile and WS-001 state what the close does, that
DotLn-Angular declares no target release until the kit can name one
`DotLn Angular`, and that WO-005's draft publish is the first live
observation of the kit's admission.

**Observed gap (dated 2026-10-19, main at `b758abf`, update pull request #8
open):** `dotln.config.json` declares no `disposable` key (v0.83.0's
validator knows none; at v0.85.0 `validateClasses` admits `disposable`
beside `checks` and `supports`, and the close refuses an undeclared ignored
base file such as an installed `node_modules` with the registration remedy,
core WO-221 D005 and D030). The starter update's `git fetch upstream`
followed the starter's new core-named tag `v0.85.0` into the main clone;
with it reachable from `HEAD`, `npm run release -- check-surfaces --local`
printed `FAIL release-block: observed v0.2.0; expected one strict version at
or above v0.85.0`, and `release prepare --local` reads every local tag
(planning document §4); the tag was deleted by hand and
`remote.upstream.tagOpt` is unset, so the next `git fetch upstream` fetches
it again. On the update branch at v0.85.0, `npm test` (7 passed) and
`npm run test:docs` (14 passed, three advisories on filed reports) pass. The
profile said "until then no target order activates" until this pass. Core
has qualified no live host for the admission (v0.85.0 notes, WO-221 D008
and D034), and the operator's interim trust entries of 2026-10-18 are
outside the repository.

**Design:**

- `classes.angular-nx-monorepo.disposable` in `dotln.config.json`:
  `["node_modules", ".nx", "dist", ".angular", "coverage", "test-output", "playwright-report", "test-results", "tmp", "out-tsc", "__screenshots__"]`,
  each a root the merged `.gitignore` of DotLn-Angular at `651d76ff` lists
  (2026-10-18 planning document §4), relative, without a trailing slash and
  without climbing, as `validateDisposablePaths` requires; `.env` and
  `.env.*` are the operator's local files, not build output, and stay
  undeclared. On the class, not the registration, because every repository
  of the class shares the output shape; `loadConfig` composes both into one
  sorted set on the registration. Declared narrowly: core's notes warn that
  a declared root is deleted at every close, never moved to scratch, and
  that the refusal names nested material by its top-level directory, so no
  source directory is declared.
- No `release` key on the registration, and `release.close` kept in
  `deniedEffects` (planning document §6 D4): the kit titles a declared
  target Release `<registration id> <tag>` (`ensureRelease(clone, forge, tag, \`${state.repositoryId} ${tag}\`, …)`
  in `scripts/release.mjs`) and the operator wants `DotLn Angular`; the
  option waits, boarded, on a target display name in the kit. No target
  order carries a `Target release classification` header.
- The tag guard in the main clone: delete a local `v0.85.0` if present
  (`git tag -d v0.85.0`), then `git config remote.upstream.tagOpt --no-tags`,
  so the README's `git fetch upstream` line fetches no tag; a named starter
  release is still previewable with `git fetch --no-tags upstream tag vX.Y.Z`
  followed by `git tag -d vX.Y.Z` after the preview. The setting lives in
  the repository's shared `.git/config`, so every worktree of the clone
  obeys it. Rejected: a pre-push hook (the fetch is the hazard, not a push;
  the kit's fork routes push no tag but an order's own); leaving it to each
  session's memory (the failure was observed within the hour of the fetch).
- The gates at v0.85.0 on this instance's merged records: `npm test` as one
  complete run and `npm run test:docs`, plus `node scripts/harness.mjs check`
  and `node scripts/launchpad.mjs verify`; `npm run sync` repairs a stale
  generated artifact the `generated` structural check reports, and its
  diff is committed and recorded. A failure this order cannot repair within
  its authority is recorded `blocked` with the output and boarded.
- The admission: the v0.85.0 hook admits the target's publication commands
  for the dispatched order from `main`'s committed registration and the
  operator grant (`repo.push` and `pr.open` are in
  `packages/skeleton/loadouts/grants.json`), at `verified` for the draft
  forms and at `closed` for the publish. Only a target order at `verified`
  can exercise it, so this order runs no live episode; it writes back that
  WO-005's draft publish is the first observation and what that session
  records (planning document §6 D6).
- Write-backs: `docs/repositories/dotln-angular.md` gains a
  `## Release close` section (the eleven roots as `loadConfig` reads them
  back, the no-release policy with its blocker, the first-observation note);
  `docs/workstreams/WS-001-dotln-angular.md` §Delivery states gains this
  order's row.

Rejected: declaring the paths on the registration instead of the class (the
same bytes with a narrower reach, and the class is where the gate and the
supports are declared); declaring `release: { "policy": "declared" }` now
and retitling Releases by hand later (the kit never edits a published
Release, and the operator's direction of 2026-10-19 boards the name as a
blocker instead); a live target episode inside this order (only a target
order at `verified` can run the draft form).

**Deliverables:** the `disposable` declaration; the `--no-tags` remote
setting and the tag readbacks; the recorded gate outputs at v0.85.0 and any
`npm run sync` repair; the profile's `## Release close` section; WS-001's
delivery-state row; `docs/evidence/WO-011/` with the decisions and README;
the regenerated indexes.

**Execution plan:**

1. Guard and activate, from the clean main checkout after the operator has
   merged pull request #8 and the checkout has been fast-forwarded and
   bootstrapped (README §Taking upstream updates):
   `grep -c 'v0.85.0' UPSTREAM.md` must print at least 1 and
   `grep -c -- '--draft' scripts/worktree.mjs` at least 1; if either prints
   0, stop and report that the update must merge first. Then
   `npm run worktree -- start WO-011 docs/work-orders/WO-011-starter-v0.85.0-registration.md`.
   Check: `npm run resume -- status --json` shows WO-011 active.
2. `dotln.config.json` (existing, `classes.angular-nx-monorepo`): add the
   `disposable` array of the Design beside `checks` and `supports`; change
   nothing else. Check:
   `node -e "import('./scripts/lib/config.mjs').then(m => { const c = m.loadConfig(process.cwd()); console.log(JSON.stringify(c.repositories['dotln-angular'].disposable)); console.log(c.repositories['dotln-angular'].release ? 'declared' : 'no-release'); })"`
   prints `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]`
   and then `no-release`.
3. The tag guard, in the main clone (the configuration is shared, so the
   commands run from the order worktree): `git tag --list v0.85.0`; if it
   prints the tag, `git tag -d v0.85.0`; then
   `git config remote.upstream.tagOpt --no-tags`. Check:
   `git config --get remote.upstream.tagOpt` prints `--no-tags`,
   `git tag --list v0.85.0` prints nothing and
   `git ls-remote --tags origin refs/tags/v0.85.0` prints nothing; record
   all three outputs.
4. The gates at v0.85.0: `npm test` (one complete run, started directly),
   `npm run test:docs`, `node scripts/harness.mjs check`,
   `node scripts/launchpad.mjs verify`. If the `generated` check reports a
   stale artifact, `npm run sync`, record its output and commit the diff.
   Check: each command exits 0; the outputs are recorded verbatim.
5. `docs/repositories/dotln-angular.md` (existing): add `## Release close`
   after `## Branch and pull-request policy` with the step 2 readback, the
   no-release policy and its blocker, and the first-observation note.
   Check: `grep -c '^## Release close' docs/repositories/dotln-angular.md`
   prints 1 and `grep -c '__screenshots__' docs/repositories/dotln-angular.md`
   is at least 1.
6. `docs/workstreams/WS-001-dotln-angular.md` (existing, §Delivery states):
   add the WO-011 row, state `proposed`, naming this order's evidence path.
   Check: `grep -c 'WO-011' docs/workstreams/WS-001-dotln-angular.md` is at
   least 4.
7. `docs/evidence/WO-011/decisions.md` and `README.md` (new): the decisions
   (the declared roots and why each; the tag guard; any `npm run sync`
   repair; what WO-005's draft session must record) and every command
   output above verbatim. Check: `npm run meta` exits 0 and
   `docs/lineage/decisions-index.md` lists the decisions.
8. Regenerate projections: `npm run sync` (which refreshes the work-order
   index and the metadata at v0.85.0). Check:
   `npm run work-orders -- index --check` exits 0.
9. Preflight, then handoff per 07-execution-guide.md §Discipline at the kit
   revision in force: run the Preflight line, `npm run test:docs`, then
   `npm run resume -- implementation-ready` with the attestation flags, the
   evidence README naming each criterion's command and output.

**Preflight:** `npm test` as one complete run started directly (starter
v0.85.0's executor rule; its `kit-verify` row is the `--only kit-verify`
suite the handoff may consume, the one suite `npm test -- --list` shows
beside the six structural checks every selection runs), then
`npm run test:docs`.

**Acceptance criteria (all required)**

1. The step 2 readback prints exactly
   `[".angular",".nx","__screenshots__","coverage","dist","node_modules","out-tsc","playwright-report","test-output","test-results","tmp"]`
   and then `no-release`, and `git diff main...HEAD -- dotln.config.json`
   adds the one `disposable` key and removes nothing.
2. `git config --get remote.upstream.tagOpt` prints `--no-tags`,
   `git tag --list v0.85.0` prints nothing, and
   `git ls-remote --tags origin refs/tags/v0.85.0` prints nothing.
3. `node scripts/launchpad.mjs verify` prints
   `kit: 964 files verified at f577979ed04e98cccb3a29a9535ba6172d09a8c9`,
   and `node scripts/harness.mjs check` exits 0 printing a line that begins
   `harness check:`.
4. `grep -c '^## Release close' docs/repositories/dotln-angular.md` prints
   1, `grep -c '__screenshots__' docs/repositories/dotln-angular.md` is at
   least 1, and `grep -c 'WO-011' docs/workstreams/WS-001-dotln-angular.md`
   is at least 4.
5. `git diff --name-only main...HEAD` lists `dotln.config.json`, this order
   and files under `docs/` only.
6. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the readbacks and the gate outputs in
`docs/evidence/WO-011/README.md`; `npm run resume -- status --json` after
`implementation-ready` shows the attestation recorded.

**Known issues and carry-ins:** the kit's admission is observed only by a
target order's draft publish at `verified`, so this order proves the
configuration and the gates, not the host's behavior (WO-005 step 15
records that); the operator's interim trust entries are outside the
repository and are the operator's choice before that step (planning
document §6 D6). `release.close` stays denied and DotLn-Angular declares no
release until the kit carries a target display name (D4; boarded as a
blocker). An ignored file outside the declared roots in the DotLn-Angular
base checkout, such as a primed `.env` or, after WO-005,
`apps/dotln/src/environments/environment.local.ts`, refuses a target close
until it is removed, and the refusal names its top-level directory; the
operator removes it, because declaring `apps/` would delete every ignored
file under it. An Angular cache setting that WO-005 finds to belong in the
registration's gate argv is boarded for a later self order, since this order
precedes WO-005. The three `docs-check` advisories on filed reports
(WO-003-D003, WO-001 FINAL-001, WO-003 VER-002) are left as filed. The
`hostRules: "literal"` fallback stays off. The tag name in criterion 2 is
the one tag the update fetched; later updates' tags are kept out by the
setting criterion 2 reads back.

**Non-goals:** a target release policy or a `Target release classification`
header on any order; `hostRules`; editing a kit file; running a live target
episode or any publication to DotLn-Angular; changing the operator's host
settings; retitling published Releases; the Angular cache setting itself.

**Operator-review assumptions:** the operator accepts that every target
close deletes ignored files under the eleven declared roots in the target
worktree and in their DotLn-Angular clone's base checkout, without moving
them to scratch, and that `.env` and `.env.*` stay undeclared; accepts the
`--no-tags` setting on the `upstream` remote of the main clone; merges pull
request #8 and the planning pull request before dispatching this order; and
decides about the interim trust entries before WO-005's verified-phase draft
publish.
