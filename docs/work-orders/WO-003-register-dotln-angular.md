# WO-003 — Register DotLn-Angular in this launchpad: the configuration, class, authority profile and gate, the operator's publication grant, the outward vocabulary and the local clone record, so the first target order can activate (version assigned at activation)

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** minor. The instance's first configuration: a
repository registration, an operator grant and an outward vocabulary are new
declared surfaces, not a fix.
**Cost:** adds one root `dotln.config.json` (about 2 KB), one operator grant in
`packages/skeleton/loadouts/grants.json` (about 0.4 KB), one
`docs/control/outward-vocabulary.json` (about 0.3 KB), one ignored clone record
and this order's evidence. Removes nothing: the launchpad has no registration
today. Wall-clock: about 1 to 2 hours of executor work plus the fixed cycle
(activation, verification, final review, release close); unknown until run.
Context bytes: the executor reads 07-execution-guide.md §Where the control
plane finds its documents, the profile convention and this order, about 40 KB.
Commands added: none. Tokens: unknown until run. Steps: 9. Re-mints: none; no
registered evidence source or feedback source is edited; no machinery suite
source is edited, so `npm test` without `--review` is the product gate.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5 and §8),
on the operator's direction of 2026-10-17, captured verbatim in ignored intake
(`docs/intake/notes/planning-angular-workstream-2026-10-18.md`, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`): this fork
houses many workstreams, DotLn-Angular is the first, and its orders run as
target orders of this launchpad. Planner-synthesized. Opaque identifier, not a
priority. Clean-room screen: the operator's own public repositories and the
kit's documented configuration contract only.
**Depends on:** WO-001 closed (historical reference: the environment record
this order's commands run under; no hard edge).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-001",
    "relation": "historical-evidence",
    "reason": "the environment truth this instance recorded; read, not a gate"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** 07-execution-guide.md §Where the control
plane finds its documents (the configuration contract and the `Repository:`
line), §Workflow closeout and releases (Target publish: the grant and the
outward lint), §Preflight before the full gate; `docs/repositories/README.md`
and `docs/repositories/dotln-angular.md` (the profile this registration
names); `docs/workstreams/WS-001-dotln-angular.md` (the house rules the gate
commands serve); `scripts/lib/config.mjs` (`validateRepositories`,
`validateAuthorityProfile`, the gate validator); `scripts/lib/outward-lint.mjs`
(the `pr-title` and `branch` shapes); `scripts/lib/authority-grants.mjs`
(`readAuthorityGrantRegistry`).

**Objective:** After this order merges, `main` carries everything a target
order for DotLn-Angular needs to activate, run its gate and publish: a valid
`dotln.config.json` registering `dotln-angular` with its class, authority
profile, profile document, documentation root and gate; an operator grant that
admits `repo.push`, `pr.open` and `pr.thread.resolve` for that repository; an
outward vocabulary the publication lint reads; and, on the operator's machine,
the ignored clone record `worktree start` resolves.

**Observed gap (dated 2026-10-18, main at `5a28719`):** the launchpad has no
`dotln.config.json` (the default layout applies), `packages/skeleton/loadouts/grants.json`
is `[]`, `docs/control/outward-vocabulary.json` is absent (so
`checkOutwardArtifact` throws "outward vocabulary must be a contained regular
file" before any publication), and `docs/control/local/repository-clones.json`
does not exist. `npm run worktree -- start WO-004 <order>` would refuse with
"unknown repository id" today. The target repository
`DylanBWood/DotLn-Angular` is public, has one commit
(`bc9133e932a00d33c15bc5289d683b8078f51ee4`, "Initial commit", no files), and
merges with a merge commit whose message is the pull-request title (observed
through the GitHub API on 2026-10-18; operator-set).

**Design:** one registration, written as the kit documents it, with these
choices (each recorded in the planning document §6 with its NoOp):

- `worktreeParent` is `..`: target worktrees land beside the clone as
  `<home>/Projects/DotLn-Angular-wo00N`, mirroring `DotLn-Instance-wo00N`.
- The class `angular-nx-monorepo` is an empty declaration (`checks: []`,
  `supports: []`); the gate carries the checks.
- The authority profile allows `repo.read`, `repo.write`, `repo.delete`,
  `git.local`, `shell.run`, `repo.push`, `pr.open` and `pr.thread.resolve`;
  denies `package.publish` and `release.close`; `resourceLimits` is
  `{ "writers": 1 }`; `requiredEvidence` is empty; `expiresAt` is
  `4102444800000` (the kit's fixtures use an abstract value and no wall-clock
  check was found; if activation refuses on expiry, use the fixture's
  `1000000` and record it); `revocationEventTypes` is `["AuthorityRevoked"]`.
- `documentationRoot` is `docs/dotln`, so DotLn's records stay apart from the
  target's `docs/dev-reference` and `docs/ai-reference`.
- Gate commands run with `NX_DAEMON=false` through `env`, so a gate never
  leaves a daemon behind in a worktree: `install` (`npm ci`), `lint`, `test`,
  `format` (plain and review) and `build`, `e2e` (review only). Timeouts: 10
  minutes for install, lint, format; 15 for test and build; 20 for e2e. WO-004
  is the first order that runs them; this order only declares them.
- The grant is the operator's (`grantedBy: "operator"`), recorded on the
  operator's captured direction that target orders publish pull requests the
  operator merges.
- The vocabulary's `types` are the eleven conventional types; its `terms`
  are the launchpad-internal words that must not reach the target's pull
  requests: `launchpad`, `gem`, `gems`, `mask`, `masks`, `resume phrase`.
  `DotLn` is not a term: it names the target's product.

Rejected: registering with `worktreeParent` inside the launchpad (axis:
overlap refusals in `targetStartPlan`); a non-empty class (axis: nothing to
share yet); granting `repo.push` to `main` (axis: the operator merges).

**Deliverables:** `dotln.config.json`; the grant; the vocabulary; the ignored
clone record; `docs/evidence/WO-003/` with the decisions, the README and the
recorded command outputs; the regenerated index and decision index.

**Execution plan:**

1. `dotln.config.json` (new, repository root): write the registration exactly
   as the Design states, `version: 1`, with `classes.angular-nx-monorepo`,
   `repositories.dotln-angular` (`baseBranch: "main"`, `worktreeParent: ".."`,
   `repositoryClass`, `profile: "docs/repositories/dotln-angular.md"`,
   `documentationRoot: "docs/dotln"`, `authorityProfile`, `gate`). Check:
   `npm run resume -- status --json` exits 0, and
   `node -e "import('./scripts/lib/config.mjs').then(m => console.log(Object.keys(m.loadConfig(process.cwd()).repositories)))"`
   prints `[ 'dotln-angular' ]`.
2. `packages/skeleton/loadouts/grants.json` (existing, `[]`): add the one
   operator grant (`grantId: "operator.dotln-angular.publication"`,
   `version: 1`, `grantedBy: "operator"`, `effects` and `operations` both
   `["repo.push", "pr.open", "pr.thread.resolve"]`, `repo: "dotln-angular"`,
   `reason` naming the operator's 2026-10-17 direction). Check:
   `node -e "import('./scripts/lib/authority-grants.mjs').then(m => console.log(JSON.stringify(m.readAuthorityGrantRegistry(process.cwd()).map(g => [g.grantId, g.repo, g.grantedBy]))))"`
   prints the one grant.
3. `docs/control/outward-vocabulary.json` (new): `types` and `terms` as the
   Design states. Check: `printf 'feat(core): add the environment token\n' | node scripts/outward-lint.mjs pr-title`
   reports `pass`; `printf ':sparkles: feat(core): add the environment token\n' | node scripts/outward-lint.mjs pr-title`
   reports `refused` with `subject.shape`; `printf 'feat/environment-token' | node scripts/outward-lint.mjs branch`
   reports `pass`. Record all three outputs in the evidence README (they are
   the evidence for house rule 20's gitmoji workflow).
4. `docs/control/local/repository-clones.json` (ignored; created by the
   command): run `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"`
   from the repository root. Check: the command prints
   `Recorded local clone for dotln-angular.` and `git status --short` shows no
   tracked change from it.
5. `docs/repositories/dotln-angular.md` (existing, written by the planning
   pass): confirm the registration's `profile` path names it and that it is a
   contained regular file; change nothing else (WO-004 refreshes its
   `Checked` line). Check: `test -f docs/repositories/dotln-angular.md && echo ok`.
6. `docs/evidence/WO-003/decisions.md` and `README.md` (new): record the
   decisions (the `expiresAt` value actually accepted, the gate timeouts, any
   refusal met and its remedy) and every command output above. Check:
   `npm run meta` exits 0 and `docs/lineage/decisions-index.md` lists the
   decisions.
7. Regenerate projections: `npm run work-orders -- index` and `npm run meta`.
   Check: `npm run work-orders -- index --check` exits 0.
8. Preflight, then the gate: run the Preflight line below, fix what fails,
   then `npm test` once and `npm run test:docs`.
9. Handoff per 07-execution-guide.md §Discipline: `npm run resume -- implementation-ready`
   with the attestation flags, the evidence README naming each criterion's
   command and output.

**Preflight:** `npm test -- --only configuration-root`, `npm test -- --only authority-grants`,
`npm test -- --only outward-lint`, `npm test -- --only target-worktree`, each
under `node scripts/harness.mjs bounded -- <command>`, then `npm run test:docs`.

**Acceptance criteria (all required)**

1. `dotln.config.json` exists at the repository root and
   `node -e "import('./scripts/lib/config.mjs').then(m => { const r = m.loadConfig(process.cwd()).repositories['dotln-angular']; console.log(r.baseBranch, r.worktreeParent, r.repositoryClass, r.documentationRoot, r.profile, r.gate.plain.join(','), r.gate.review.join(',')) })"`
   prints `main .. angular-nx-monorepo docs/dotln docs/repositories/dotln-angular.md install,lint,test,format install,lint,test,format,build,e2e`,
   and `npm run resume -- status --json` exits 0.
2. `node -e "import('./scripts/lib/authority-grants.mjs').then(m => console.log(JSON.stringify(m.readAuthorityGrantRegistry(process.cwd()).map(g => [g.grantedBy, g.repo, [...g.effects].sort().join(',')]))))"`
   prints exactly one grant, `["operator","dotln-angular","pr.open,pr.thread.resolve,repo.push"]`.
3. `docs/control/outward-vocabulary.json` exists; the three outward-lint
   commands of step 3 print `pass`, `refused` (naming `subject.shape`) and
   `pass` respectively, and the evidence README records the outputs.
4. The evidence README records the output of
   `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"`
   as `Recorded local clone for dotln-angular.`, and `git status --short`
   after it shows no tracked change (the record is ignored).
5. `docs/repositories/dotln-angular.md` is the regular file the
   registration's `profile` names, and `npm run work-orders -- index --check`
   exits 0 with WO-003 shown as the active or closed order and WO-004 shown
   with its `Repository:` pair.
6. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the commands and outputs in `docs/evidence/WO-003/README.md`;
`npm run resume -- status --json` after `implementation-ready` shows the
attestation recorded.

**Known issues and carry-ins:** the kit's `target-gate` runs commands in the
worktree and judges mutations of non-ignored bytes; the declared commands are
unexercised until WO-004 scaffolds the workspace, so a wrong `argv` surfaces
there, not here. `DotLn-WoW-Forever`'s merge settings differ from the other two
repositories (merge-commit title `MERGE_MESSAGE`, message `PR_TITLE`, observed
2026-10-18); it is not registered by this order and the operator owns the
setting.

**Non-goals:** registering `DotLn-WoW-Forever` (its functionality starts
inside the monorepo); any write in the target repository; running the gate
commands; changing `release.displayName` or the README release claim; editing
kit files or the repository profile's content.

**Operator-review assumptions:** the operator accepts the grant as theirs by
merging this order's pull request; the operator's machine holds the clone at
`$HOME/Projects/DotLn-Angular` (observed 2026-10-18) and the executor runs
step 4 there.
