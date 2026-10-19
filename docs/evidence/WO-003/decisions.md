# WO-003 decisions

Structured decisions of the WO-003 executor session (register DotLn-Angular),
dispatched by the operator's `resume: next` on 2026-10-18 (dispatch recorded
at 2026-10-18T01:59:29.043Z) on branch `wo-003` at `2b515fa`. Each JSON block
is the record `npm run meta` indexes. Durable product facts stay in the cited
product documents; this file records the choices this order made and why.
"The repository README" below is the launchpad's root `README.md`; "this
directory's README.md" is the evidence record beside this file.

## WO-003-D001 Accept the Design's far expiry for the registered authority profile

The Design names `expiresAt: 4102444800000` and a fallback to the kit fixture's
`1000000` "if activation refuses on expiry". The kernel fails an envelope when
`context.now >= envelope.expiresAt` (`packages/kernel/dist/src/core.js`, line
263), and the host passes its clock to the kernel as `now`:
`packages/skeleton/dist/src/source-change-host.js` sets
`this.now = options.now ?? Date.now` (line 46) and passes `now: this.now()`
into each authorization (lines 289 and 301); line 655 also bounds every
command grant by the envelope's remaining time. Target publication authorizes
against the registered profile itself with `Date.now()`
(`scripts/lib/target-publish.mjs`, line 782, and its
`authorizeRegisteredPublication` call), so there the profile's own expiry is
what the wall clock meets. The Design's value is 2100-01-01T00:00:00Z; the
fixture's value is 1970-01-01T00:16:40Z, valid only under the fixture's
abstract clock. At compile time the registration narrows rather than widens:
`applyRegisteredRepositoryProfile` takes the minimum of the active base
envelope's expiry and the profile's, and `registeredProfileMismatches` reports
a mismatch only when the compiled floor expires later than the profile
(`scripts/lib/authority-grants.mjs`), so the far date defers to whatever base
the loadout carries.

```json
{
  "id": "WO-003-D001",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 Design: authority profile expiresAt; execution plan step 1)",
  "decision": "Keep expiresAt 4102444800000 (2100-01-01T00:00:00Z) in repositories.dotln-angular.authorityProfile. The loader accepted it; the kernel and the publication path compare expiry with the wall clock, so a registered envelope must expire after today; at compile the registration takes the minimum of the base envelope's expiry and this one, so the far date never extends the base.",
  "evidence": [
    "node -e import('./scripts/lib/config.mjs') criterion 1 command printed: main .. angular-nx-monorepo docs/dotln docs/repositories/dotln-angular.md install,lint,test,format install,lint,test,format,build,e2e",
    "packages/kernel/dist/src/core.js line 263: fails: () => context.now >= envelope.expiresAt; packages/skeleton/dist/src/source-change-host.js line 46: this.now = options.now ?? Date.now, lines 289 and 301 pass now: this.now() into the authorization, line 655 bounds each command grant by the envelope's remaining time; scripts/lib/target-publish.mjs line 782 defaults now = Date.now() and calls authorizeRegisteredPublication(repository, readAuthorityGrantRegistry(main), now, workOrderId) against the registered profile",
    "node -e new Date(4102444800000).toISOString() printed 2100-01-01T00:00:00.000Z; new Date(1000000) printed 1970-01-01T00:16:40.000Z",
    "scripts/lib/authority-grants.mjs: applyRegisteredRepositoryProfile sets expiresAt to Math.min(base, profile); registeredProfileMismatches flags only floor.expiresAt > profile.expiresAt"
  ],
  "rejected": [
    "The fixture's 1000000: already expired on any wall-clock host; the kit's fixtures run under an abstract clock (scripts/fixtures/vertical/fixture.mjs, at = 100).",
    "Omitting the field: validateAuthorityProfile requires a non-negative safe integer."
  ],
  "reopenWhen": "WO-004's activation or a target publication refuses the registered envelope on expiry, or the kit bounds a registered profile's expiry against the wall clock or the base envelope."
}
```

## WO-003-D002 Every gate command runs under `env NX_DAEMON=false`; the Design's timeouts stand

The target gate hands each declared argv to the bounded runner
(`scripts/lib/target-gate.mjs`, line 138), which executes it as a command
array, so `env` is argv[0] and resolves through `PATH`. The Design lists
`install` (`npm ci`) among the commands that run with `NX_DAEMON=false` through
`env`, and the planning document's decision D11 (§6) wants no daemon left in a
worktree by a gate; wrapping `npm ci` too keeps all six argv uniform and covers
any install script that invokes Nx, and WO-004 observes whether it matters.
Timeouts follow the Design: ten minutes for install, lint and format; fifteen
for test and build; twenty for e2e. WO-004 runs these first; a wrong argv
surfaces there, as the order's known issue says.

```json
{
  "id": "WO-003-D002",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 Design: gate commands; execution plan step 1)",
  "decision": "Declare six gate commands, each argv beginning env NX_DAEMON=false, with the profile's commands (npm ci; npx nx run-many -t lint|test|build|e2e; npx nx format:check), timeouts 600000 ms for install, lint and format, 900000 ms for test and build, 1200000 ms for e2e; plain selects install, lint, test, format and review adds build and e2e.",
  "evidence": [
    "docs/repositories/dotln-angular.md Commands table names the six commands and their plain/review roles",
    "scripts/lib/config.mjs validateTargetGate accepted the declaration; criterion 1 printed the two selections",
    "scripts/lib/target-gate.mjs line 138 runs boundedCommand(['--', ...command.argv]) with the declared timeoutMs",
    "the order's Design lists install (npm ci) among the commands run with NX_DAEMON=false through env; docs/planning/angular-workstream-2026-10-18.md §6, decision D11, runs gates under env NX_DAEMON=false so no daemon survives in a worktree"
  ],
  "rejected": [
    "Leaving npm ci bare: the Design lists install among the wrapped commands, and one rule for every command costs nothing.",
    "An absolute /usr/bin/env: PATH resolution suffices and the bare name is portable across the operator's hosts."
  ],
  "reopenWhen": "WO-004's first target gate run shows a command's argv or timeout wrong on the operator's machine, Nx changes how the daemon is disabled, or WO-004 finds that nx format:check checks only files changed against the base branch and the profile adopts --all."
}
```

## WO-003-D003 Register this worktree's ignored local-terms list from the original checkout's list

The outward lint returns `pass` only when the ignored local-terms list is
present; without it every artifact reports `unavailable` (exit 2), and
`node scripts/harness.mjs check` printed `local-terms list: unavailable` at
this session's entry. The repository README names the step: § First steps,
step 4, registers the list once, and step 7 says a session in an order
worktree "registers its own ignored local-terms list, a copy of the main
checkout's list or the terms the operator states". This instance has the
precedent: WO-001-D011 registered the `wo-001` worktree's list from the
original checkout's list without displaying its contents, and FINAL-001
verified the two lists equal. The list was copied byte for byte with `cp -p`,
compared with `cmp -s`, left at mode 600, and no byte, hash or term of it was
printed, recorded or committed.

```json
{
  "id": "WO-003-D003",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 execution plan step 3 and acceptance criterion 3; the repository README § First steps, steps 4 and 7; Adjacent Repair)",
  "decision": "Register docs/control/local/terms.txt in this worktree as a byte-for-byte copy of the original checkout's ignored list, mode 600, without displaying, hashing to output or committing any of it, so the outward lint, harness check, the adjacent queue and the follow-up register observe the list as present here.",
  "evidence": [
    "node scripts/harness.mjs check at entry: harness check: 34 generated surfaces; local-terms list: unavailable; after registration: local-terms list: present",
    "cmp -s original worktree-copy: identical; stat mode 600; git check-ignore -v: .gitignore:15 /docs/control/local/",
    "npm run terms -- check dotln.config.json packages/skeleton/loadouts/grants.json docs/control/outward-vocabulary.json: local-terms list: present, exit 0",
    "the repository README § First steps step 7: a session in an order worktree registers its own ignored local-terms list, a copy of the main checkout's list or the terms the operator states",
    "docs/evidence/WO-001/decisions.md WO-001-D011 and docs/final-reviews/WO-001/FINAL-001.md: the wo-001 worktree's list was registered the same way and verified equal"
  ],
  "rejected": [
    "Leave the list absent and record criterion 3 unmet: the repository README names this as the session's step and the precedent exists.",
    "Ask the operator to restate the terms: they stated them once; a second dictation risks drift and adds a round the operator did not ask for.",
    "A symlink to the original checkout's file: checkLocalTerms requires a contained regular file."
  ],
  "reopenWhen": "The operator rules that an order worktree may not carry a copy of the list, or the kit's worktree start registers the ignored list itself.",
  "followup": "Upstream kit: worktree start should carry or register the ignored local-terms list into the new order worktree, so the outward lint, harness check and the adjacent queue observe it present there without a hand step."
}
```

## WO-003-D004 The clone record cannot be written from this worktree before the merge; criterion 4 is unmet

`npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"`
refused with `error: unknown repository id "dotln-angular"` (exit 1) and wrote
nothing. The clone action records into the main-branch worktree's launchpad
(`scripts/worktree.mjs` resolves `mainWorktree(toolRoot)`, `scripts/lib/git.mjs`
line 196, and calls `recordRepositoryClone(mainPath, …)`), and the recorder
validates the id against that launchpad's configuration
(`scripts/lib/target-worktrees.mjs`, line 248). `main` carries no
`dotln.config.json` (`git ls-tree --name-only main -- dotln.config.json`
prints nothing) until this order merges and the main checkout is
fast-forwarded to the merge, so the step the order places before the merge
can only run after it. The remedy is one command from the main checkout once
`main` holds the merge (release close fast-forwards it) and before
`npm run worktree -- start WO-004 …`, which otherwise refuses with
`repository dotln-angular: no local clone recorded`
(`scripts/lib/target-worktrees.mjs`, lines 266 and 267) before any activation.
A direct check against this worktree's own configuration proved the
registration and the clone path acceptable to the recorder:
`recordRepositoryClone(<this worktree>, "dotln-angular", "$HOME/Projects/DotLn-Angular")`
wrote the ignored record here and `recordedRepositoryClone` resolved the same
path. The clone is a Git top level on `main` at
`bc9133e932a00d33c15bc5289d683b8078f51ee4` with origin
`DylanBWood/DotLn-Angular`. That record is inert: the target start reads the
main checkout's lane.

```json
{
  "id": "WO-003-D004",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 execution plan step 4; acceptance criterion 4)",
  "decision": "Record criterion 4 unmet: the clone command records into the main-branch worktree and validates the repository id against main's configuration, which lacks the registration until this order merges; it refused with unknown repository id and wrote nothing. The remedy is the same command run from the main checkout once main holds this order's merge and before WO-004's worktree start, which otherwise refuses with no local clone recorded. The recorder's acceptance of this registration and clone path was proved against this worktree's configuration.",
  "evidence": [
    "npm run worktree -- clone dotln-angular \"$HOME/Projects/DotLn-Angular\" from this worktree: error: unknown repository id \"dotln-angular\"; exit 1; git status --short unchanged; the main checkout's docs/control/local/repository-clones.json absent before and after",
    "scripts/worktree.mjs clone action: recordRepositoryClone(mainWorktree(toolRoot), id, path); scripts/lib/git.mjs line 196 selects the worktree on refs/heads/main; scripts/lib/target-worktrees.mjs line 248 checks loadConfig(launchpad).repositories, lines 266 and 267 refuse a start with no local clone recorded",
    "git worktree list: the original checkout on main and this worktree on wo-003, both at 2b515fa; git ls-tree --name-only main -- dotln.config.json prints nothing",
    "node -e import('./scripts/lib/target-worktrees.mjs') then recordRepositoryClone(process.cwd(), 'dotln-angular', process.env.HOME + '/Projects/DotLn-Angular') and console.log(recordedRepositoryClone(process.cwd(), 'dotln-angular') === process.env.HOME + '/Projects/DotLn-Angular'): printed true, exit 0; the record landed under this worktree's ignored docs/control/local/",
    "git -C $HOME/Projects/DotLn-Angular: top level, branch main tracking origin/main, one commit bc9133e932a00d33c15bc5289d683b8078f51ee4, origin DylanBWood/DotLn-Angular"
  ],
  "rejected": [
    "Place a dotln.config.json in the main checkout so the command passes: a write into another writer's worktree, and an untracked configuration that publication refuses.",
    "Edit the order's step 4 to say after the merge: order text changes need the operator's scope expansion and amend-order.",
    "Report the direct check as the criterion's output: the criterion names the command's own output, which was a refusal."
  ],
  "reopenWhen": "The operator waives criterion 4, or runs the clone command from the main checkout after the merge and its output is recorded; or the kit lets worktree clone validate an order worktree's own configuration.",
  "followup": "After WO-003 merges and the main checkout holds the merge (release close fast-forwards main; otherwise git merge --ff-only origin/main there), and before npm run worktree -- start WO-004, run from the main checkout: npm run worktree -- clone dotln-angular \"$HOME/Projects/DotLn-Angular\" (expected output: Recorded local clone for dotln-angular.) and record the output in WO-004's evidence; upstream, worktree clone could validate against the order worktree's configuration or defer the id check to worktree start."
}
```

## WO-003-D005 The Preflight's outward-lint suite is not carried in this kit

The order's Preflight names `npm test -- --only outward-lint`. The runner
declares that suite core-only (`scripts/test-runner.mjs`,
`kit: "core-only: core outward-vocabulary control data"`), so a kit root
refuses the selection by name, and criterion 6's Preflight clause is not
satisfied by this suite. The three step-3 commands, which criterion 3 names,
show this instance's vocabulary validating (`validateOutwardVocabulary` runs on
every CLI call) and the `pr-title` and `branch` shapes working with this
instance's data; they do not replace the suite's rule coverage, whose tests
also exercise runtime identifier forms, rendered Markdown and HTML escapes,
code spans, local-terms redaction and exit codes.

```json
{
  "id": "WO-003-D005",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 Preflight line; acceptance criterion 6)",
  "decision": "Record the runner's refusal of --only outward-lint as a core-only suite; criterion 6's Preflight clause is therefore not satisfied by this suite. The three outward-lint CLI checks of step 3, which criterion 3 names, show the vocabulary validating and the pr-title and branch shapes working with this instance's data; run the other three Preflight suites as named.",
  "evidence": [
    "scripts/test-runner.mjs declares nodeTests(\"outward-lint\", ...) with kit: core-only: core outward-vocabulary control data, and a kit root throws Suite <name> is not carried in this kit for a core-only --only selection",
    "node scripts/harness.mjs bounded -- npm test -- --only outward-lint: Suite outward-lint is not carried in this kit (core-only: core outward-vocabulary control data); exit 1",
    "step 3 outputs: pr-title pass (exit 0); gitmoji-prefixed pr-title refused with subject.shape (exit 1); branch pass (exit 0), each with localTerms pass"
  ],
  "rejected": [
    "Edit the runner's declaration to carry the suite here: a kit file; its test reads core's vocabulary and expects core's terms.",
    "Count the uncarried suite as passed because its subject is core's control data: it never ran, so the Preflight clause cannot claim it."
  ],
  "reopenWhen": "The kit carries an instance-vocabulary variant of the suite, or a planning pass rewrites the Preflight line.",
  "followup": "Planning: this instance's orders name only suites the kit carries in their Preflight lines; replace npm test -- --only outward-lint in WO-003's Preflight with the three outward-lint CLI checks of its step 3 (amend-order or the next pass)."
}
```

## WO-003-D006

```json
{
  "id": "WO-003-D006",
  "date": "2026-10-18",
  "dispatch": "resume: next; release prepare",
  "decision": "Assign application target v0.2.0, the next minor above the observed release baseline v0.1.0, to the heading and the README version claim.",
  "evidence": [
    "release baseline v0.1.0 (local tags)",
    "minor classification declared in docs/work-orders/WO-003-register-dotln-angular.md"
  ],
  "rejected": [
    {
      "option": "An activation-completion paragraph in the roadmap",
      "reason": "The tag is the record and the roadmap's release history is generated from tags (WO-086); this decision keeps the base and the classification."
    }
  ],
  "reopenWhen": "The observed baseline or the classification changes before publication; a later collision is recorded as its own decision."
}
```

## WO-003-D007 Keep release preparation's version-line rewrite; the non-goal forbids a display-name declaration and hand edits

The order's non-goals include "changing `release.displayName` or the README
release claim". `npm run release -- prepare --local` is the executor
procedure's fixed step for a versioned order (07-execution-guide.md §Workflow
closeout and releases and §Discipline), and the document gate's
`check-surfaces --local` compares the README block with the assigned target,
so the block had to carry `v0.2.0` once the order's heading did. The
preparation changed the heading's placeholder to `(v0.2.0)`, rewrote the
block's one generated line from `v0.1.0` to `v0.2.0`, appended WO-003-D006,
and wrote the meter snapshot `docs/evidence/WO-003/meta.json` and the
process-meter block in `docs/final-reviews/WO-003/PR.md`.
`release.displayName` stays undeclared, so the claim keeps the default name
`DotLn`, and no word of the claim was edited by hand. The operator has not
seen this reading; the handoff's operator notes name it for confirmation or
amendment.

```json
{
  "id": "WO-003-D007",
  "date": "2026-10-18",
  "dispatch": "resume: next (executor procedure step 4, release preparation; WO-003 non-goals)",
  "decision": "Run npm run release -- prepare --local as the procedure requires and read the non-goal as forbidding a declared release.displayName and hand edits to the claim's words: the preparation's generated version line is the kit's own write, the display name stays the default DotLn, and the files it created or changed are part of this order's diff.",
  "evidence": [
    "npm run release -- prepare --local: Assigned WO-003: v0.2.0, the next minor above the observed release baseline v0.1.0; Recorded WO-003-D006; files changed: the order, README.md, decisions.md, docs/evidence/WO-003/meta.json, docs/final-reviews/WO-003/PR.md; tag observation local snapshot only",
    "README.md release block after: This source prepares DotLn `v0.2.0`.",
    "dotln.config.json declares no release section; scripts/lib/config.mjs validateRelease defaults displayName to DotLn",
    "scripts/test-runner.mjs runs release check-surfaces --local as a document preflight, which compares the block with the assigned target"
  ],
  "rejected": [
    "Skip the preparation to leave the claim at v0.1.0: the procedure names the step, and the document gate's surface check would fail against the unassigned heading.",
    "Declare release.displayName in dotln.config.json: the non-goal forbids it, and the default DotLn is the name the README claim already carries."
  ],
  "reopenWhen": "The operator reads the non-goal as forbidding the version rewrite as well, or release close assigns a different target."
}
```

## WO-003-D008 The authority-grants Preflight suite asserts this checkout's committed registry is empty

`scripts/test-authority-grants.mjs` ends its test "WO-042 AC5/6 Contributor
projection and grant bundle carry the enforced envelope and registry
provenance" by asserting that `packages/skeleton/loadouts/grants.json` in the
checkout under test parses to `[]`, with the message "this order adds no
personal authority" (the file's `root` is the checkout, line 41). The
assertion guards the upstream kit's own registry, which ships empty. The
repository README (§ First steps, step 4) directs an instance executor to
commit an operator grant into that registry, so in a registering instance the
assertion fails by design; four of the five subtests pass. The test file is
hashed in `KIT-MANIFEST.json` (the grant registry is not) and the `kit-verify`
task runs first in every gate, so editing the test would fail every gate. In
this instance the plain and review gates select only `kit-verify` and
`harness` (`node scripts/test-runner.mjs --list` and `--review --list`), so
`npm test` is unaffected; the Preflight clause of criterion 6 is not satisfied
by this suite.

```json
{
  "id": "WO-003-D008",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 Preflight line; acceptance criterion 6)",
  "decision": "Defer the kit assertion upstream: record the suite's result (five subtests, four pass; the fifth asserts the committed grant registry is empty, which this order's grant contradicts as the repository README directs), leave the kit file unedited, keep the grant, and record criterion 6 unmet because two of the four Preflight suites cannot pass in this kit (outward-lint not carried, WO-003-D005; authority-grants' empty-registry assertion, here).",
  "evidence": [
    "node scripts/harness.mjs bounded -- npm test -- --only authority-grants: FAIL authority-grants 0.17 s; exit 1; TAP: tests 5, pass 4, fail 1; not ok 4 with AssertionError 'this order adds no personal authority', expected [] and actual the one grant operator.dotln-angular.publication",
    "scripts/test-authority-grants.mjs line 41: const root = fileURLToPath(new URL('../', import.meta.url)); the final assertion of test 4 reads join(root, COMMITTED_AUTHORITY_GRANTS)",
    "KIT-MANIFEST.json lists scripts/test-authority-grants.mjs and not packages/skeleton/loadouts/grants.json; kit-verify: 928 files verified at 7b8206f4b97d290473e4e619271521f496ce56aa",
    "the repository README § First steps step 4: an instance order's executor commits the operator grant naming the registered repository in packages/skeleton/loadouts/grants.json",
    "node scripts/test-runner.mjs --list and --review --list in this instance select kit-verify and harness only"
  ],
  "rejected": [
    "Edit the test to admit an instance registry: a kit-manifest file; kit-verify would then fail every gate here.",
    "Empty the registry so the suite passes: it defeats the order's objective and criterion 2.",
    "Judge criterion 6 met with a caveat: the suite's FAIL row would contradict the claim."
  ],
  "reopenWhen": "The upstream kit scopes the assertion to core or marks the suite core-only, or the operator waives criterion 6 for this order.",
  "followup": "Upstream kit: scope the WO-042 AC5/6 empty-registry assertion in scripts/test-authority-grants.mjs to core, or mark the suite core-only for launchpads, because the repository README § First steps step 4 directs an instance executor to commit an operator grant into packages/skeleton/loadouts/grants.json."
}
```

## WO-003-D009 The grant's authority is the operator's captured direction, and no local grant file was present

The planning document assigns this order's executor a carry-in (§8.1): cite
the dispatch capture as the operator's authority for the grant's three
effects, and record for criterion 2 that no ignored
`docs/control/local/authority-grants.json` was present. The grant
`operator.dotln-angular.publication` admits `repo.push`, `pr.open` and
`pr.thread.resolve` for `dotln-angular` with `grantedBy: "operator"`. Its
authority is the operator's direction of 2026-10-17, captured verbatim in the
original checkout's ignored intake at
`docs/intake/notes/planning-angular-workstream-2026-10-18.md`, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`, which
`shasum -a 256` reproduced in this session; the planning pass synthesized it
as "target orders publish pull requests the operator reads and merges"
(planning document §5, §6 decisions D8 and D9, §8.1), and the operator record
(`docs/operator/README.md`, Standing preferences) carries the same words.
`readAuthorityGrantRegistry` merges the optional ignored
`docs/control/local/authority-grants.json` (host-policy grants) into the
registry, so criterion 2's "exactly one grant" depends on that file's absence.

```json
{
  "id": "WO-003-D009",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 execution plan step 2; acceptance criterion 2; planning document §8.1 carry-in for WO-003)",
  "decision": "Commit the one operator grant on the authority of the operator's direction of 2026-10-17 as captured in the intake file with SHA-256 4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa: repo.push, pr.open and pr.thread.resolve for dotln-angular, grantedBy operator, with the reason text naming that capture; record that no ignored docs/control/local/authority-grants.json was present when criterion 2's command printed exactly one grant.",
  "evidence": [
    "shasum -a 256 over the original checkout's docs/intake/notes/planning-angular-workstream-2026-10-18.md printed 4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa, the value the order's Nomination provenance and the planning document record",
    "docs/planning/angular-workstream-2026-10-18.md §8.1: the WO-003 carry-in names the capture as the operator authority for the grant's three effects and the absence check for criterion 2",
    "test -e docs/control/local/authority-grants.json || echo absent: absent; ls docs/control/local/ lists no such file",
    "scripts/lib/authority-grants.mjs readAuthorityGrantRegistry: the committed registry admits grantedBy operator and registered-repository; the optional ignored local file admits host-policy; criterion 2's command printed [[\"operator\",\"dotln-angular\",\"pr.open,pr.thread.resolve,repo.push\"]]"
  ],
  "rejected": [
    "A host-policy grant in the ignored local file instead: the committed registry refuses that origin, and session publication reads the grant from main's committed bytes, so the operator's grant must travel with the registration.",
    "No operator grant, relying on the registered-repository profile grant alone: target publication requires an admitted grant whose grantedBy is operator for repo.push and pr.open."
  ],
  "reopenWhen": "The operator withdraws or changes the direction, or a host-policy grant for dotln-angular appears in the ignored local registry and criterion 2's count changes."
}
```

## WO-003-D010 Name the registered envelope `target-orders`

The validator requires `authorityEnvelopeId` and the Design names no value.
The host composes the compiled envelope id as
`<base id>+registered:<repository id>:<profile id>`
(`scripts/lib/authority-grants.mjs`, `applyRegisteredRepositoryProfile`), so a
profile id that repeats the repository id would read
`…+registered:dotln-angular:dotln-angular.…`; `target-orders` names what the
envelope governs, the target orders of this repository. Nothing refers to the
id yet. The first spelling, `dotln-angular.target-orders`, was replaced during
self-review on the design reviewer's finding.

```json
{
  "id": "WO-003-D010",
  "date": "2026-10-18",
  "dispatch": "resume: next (WO-003 execution plan step 1; self-review finding of the design reviewer)",
  "decision": "Set repositories.dotln-angular.authorityProfile.authorityEnvelopeId to target-orders, so the composed envelope id reads <base>+registered:dotln-angular:target-orders without repeating the repository id.",
  "evidence": [
    "scripts/lib/config.mjs validateAuthorityProfile: authorityEnvelopeId must be a non-empty string; the Design names no value",
    "scripts/lib/authority-grants.mjs applyRegisteredRepositoryProfile composes `${active.authorityEnvelope.authorityEnvelopeId}+registered:${repository.id}:${profile.authorityEnvelopeId}`",
    "criterion 1's command does not read the id; it printed the same line before and after the change"
  ],
  "rejected": [
    "dotln-angular.target-orders, the first spelling: repeats the repository id inside the composed id."
  ],
  "reopenWhen": "A kit surface starts reading the profile's envelope id by name, or the operator prefers another spelling."
}
```

## WO-003-D011 Record the operator's directions after implementation-ready

The operator answered the handoff's to-do list in chat after the completion
event. The message is captured verbatim in this worktree's ignored intake at
`docs/intake/notes/wo-003-operator-direction-2026-10-18.md`, SHA-256
`d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03`. It gives
four directions. Criteria 4 and 6 are waived (the operator's first direction); the
executor role text forbids the order's own executor recording a waiver, and the
verify dispatch prints the `waive` command for the session that does, so the
verify session records both from this capture. The reading in WO-003-D007 is
not the operator's to rule (their second direction declines it and points
to another agent's judgment); the criteria adversary of self-review already judged
that reading defensible, and the verifier judges it with everything else, so
the request for the operator's confirmation is withdrawn. The clone record is
to be made by the release-close session from the main checkout once `main`
holds the merge (their third direction); follow-up
`FUP-1eec5d4255b0162c` is aimed at that session, and the WO-004 start session
is the fallback when `worktree start` reports no local clone recorded. The
upstream prompt is handed to the operator now, in chat and in `handoff.md`; it
is not final-review material ("fine give me the handoff").

```json
{
  "id": "WO-003-D011",
  "date": "2026-10-18",
  "dispatch": "resume: next; record the operator directions received after implementation-ready (capture SHA-256 d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03)",
  "decision": "Record the operator's four directions and route each: criteria 4 and 6 are waived, to be recorded by the verify session from the capture with npm run resume -- waive, never by this executor; WO-003-D007 stands as read, judged by the criteria adversary as defensible and by the verifier next, with the request for the operator's confirmation withdrawn; the clone record is made by the release-close session from the main checkout once main holds the merge, the WO-004 start session being the fallback; the upstream prompt is handed to the operator now.",
  "evidence": [
    "docs/intake/notes/wo-003-operator-direction-2026-10-18.md: the operator's words of about 2026-10-18T03:37Z, items 2 to 5 of the handoff's to-do list; shasum -a 256 printed d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03",
    "scripts/resume.mjs line 1146: the dispatch briefing prints npm run resume -- waive <criterion> --reason <text> --capture <path> --capture-hash sha256:<digest> <actor flags> --work-order WO-003 for the session that records a waiver from the operator's capture; the executor skill: a waiver is never recorded by the order's own executor",
    "the criteria adversary's self-review report: D007's reading is defensible because release prepare is the kit's procedure, scripts/test-runner.mjs runs check-surfaces --local as a document preflight, and scripts/lib/config.mjs defaults displayName to DotLn",
    "npm run resume -- status --json after implementation-ready: unmetCriteria 4 and 6 at ordinal 2; legalNextActions verify"
  ],
  "rejected": [
    "Record the waivers in this session: the executor role forbids the order's own executor recording a waiver; the verify dispatch prints the command and records it from the capture.",
    "Reopen WO-003-D007 or ask the operator again: the operator declined to rule and an independent agent judged the reading defensible; the verifier judges it.",
    "Run the clone command from this session at release-close time: release close is a separate dispatch in the main checkout, and this session's writer is released at its stop."
  ],
  "reopenWhen": "The operator changes any of these directions, the verify session cannot read the capture at its recorded path and hash, or the release-close session cannot record the clone."
}
```

## WO-003-D012 Board the post-handoff decision dispatch failure for repair

The independent verifier recorded the captured waivers for criteria 4 and 6
as control ordinals 4 and 5. A fresh document gate then found a separate
failure in D011: its `dispatch` starts with an unsupported prefix and is 254
characters long. D011 is absent from the implementation-ready checkpoint;
the earlier passing gate therefore does not establish this later record's
validity. The verifier preserves the subject and records the narrow repair
in VER-001. The waivers remain in force.

```json
{
  "id": "WO-003-D012",
  "date": "2026-10-18",
  "dispatch": "resume: verify; record the post-handoff document-validation regression",
  "decision": "Record VER-001 finding F1 for D011's invalid dispatch field. Preserve the executor's subject and both recorded waivers; the repair changes only the dispatch metadata to the accepted prefix and length while retaining the capture, digest, decisions and evidence.",
  "evidence": [
    "npm run test:docs: 11 passed; 6 failed; 6.82 s. docs-check names only docs/evidence/WO-003/decisions.md#WO-003-D011 as a failure; five dependent suites cannot run.",
    "scripts/docs-check.mjs validDispatch returns false for D011's 254-character dispatch, which starts with conversation during rather than an accepted control prefix; the replacement proposed in VER-001 returns true in memory.",
    "git show refs/dotln/checkpoint/WO-003/2:docs/evidence/WO-003/decisions.md ends with D010 and has no D011, establishing that the invalid record was added after implementation-ready.",
    "docs/control/orders/WO-003.jsonl records CriterionWaived for criterion 4 at ordinal 4 and criterion 6 at ordinal 5, bound to the operator capture and its verified SHA-256."
  ],
  "rejected": [
    "Claim that the executor's older passing document gate covers the later D011 bytes: the fresh gate disproves it.",
    "Edit the subject decision to make the verifier's own verdict pass: the verifier role preserves the subject and reports the repair rule.",
    "Remove the capture or change either waiver: neither is necessary to repair the metadata."
  ],
  "reopenWhen": "A repair changes D011's dispatch to a valid one-line control-prefixed paraphrase and npm run test:docs passes over the resulting records.",
  "followup": "WO-003 repair (VER-001 F1): shorten only D011's dispatch to a resume-prefixed paraphrase accepted by validDispatch, retain the capture path and SHA-256 in its existing evidence, regenerate the decisions index and follow-up projection, and rerun the document gate before re-verification."
}
```

## WO-003-D013 Repair D011's dispatch and hold every decision to the dispatch rule

The operator's `resume: fix` dispatched this repair of VER-001's finding F1.
The document gate requires each structured decision's `dispatch` to start with
one of seven control prefixes (`planning`, `ideation`, `resume`,
`scope expand`, `conversation only`, `analysis`, `operator override`), then a
colon and a non-empty paraphrase of at most 240 code points on one line, after
trimming (`validDispatch` in `scripts/docs-check.mjs`). D011's first value
started with `conversation during`, so it failed. The paraphrase after a valid
prefix would have been 234 code points, so the prefix was the whole cause and
the length was not. The repair changes only D011's `dispatch`. It keeps
VER-001's proposed wording but puts the capture digest inline in place of
"capture and SHA-256 in evidence". The digest has to be there because the
gate's operator-word advisory reads a capture citation only in the form
`SHA-256 <digest>`. D011's prose wraps its digest in backquotes and its
evidence writes `shasum -a 256 printed`, so the first value's digest was the
only citation the advisory recognised. With VER-001's exact value, D011 passed
the dispatch rule but showed a new advisory, `operator-attributed words need a
capture digest`; with the digest inline, the advisory is gone. The capture path
and digest also stay in D011's prose and first evidence line. A sweep of every
decision record under this launchpad, using the gate's own reader, baseline and
rule, found one failure before the repair and none after. It also confirmed
boundary cases the report did not quote.

```json
{
  "id": "WO-003-D013",
  "date": "2026-10-18",
  "dispatch": "resume: fix; repair the invalid dispatch on WO-003-D011 and sweep every decision record against the dispatch rule",
  "decision": "Replace only WO-003-D011's dispatch with VER-001's proposed wording, which names resume: next, the dispatch of the session where the directions arrived, carrying the capture digest inline as SHA-256 so the operator-word advisory still finds a capture citation; the capture path and digest also stay in D011's prose and evidence. The rule the repaired records hold: each dispatch starts with one of the seven control prefixes, then a colon and a non-empty one-line paraphrase of at most 240 code points after trimming.",
  "evidence": [
    "docs-check sweep probe (readDecisions, doc-baseline.json dispatch fingerprints, validDispatch) under node scripts/harness.mjs bounded before the repair: 27 decision records; 0 baselined; 1 failing, docs/evidence/WO-003/decisions.md#WO-003-D011 (254 chars); after, with this record added: 28; 0 baselined; 0 failing; D011 dispatch 163 chars, valid true",
    "npm run test:docs with VER-001's exact value: 17 passed; 0 failed; 5.87 s, with a new docs-check ADVISORY on WO-003-D011, operator-attributed words need a capture digest; operatorWordFindings over WO-003 after the digest went inline lists only WO-003-D003, whose quoted words are the repository README's and whose advisory predates this repair",
    "the same probe: D011's first value behind conversation only: has a 234-code-point paraphrase and passes, so the conversation during prefix alone failed; Resume: (capitalized), a leading space and verify: refuse; a whitespace-only paraphrase refuses; 240 astral code points pass and 241 refuse; trailing spaces after 240 characters are trimmed and pass",
    "shasum -a 256 docs/intake/notes/wo-003-operator-direction-2026-10-18.md printed d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03, the digest D011 and both waivers cite",
    "KIT-MANIFEST.json lists scripts/docs-check.mjs and scripts/test-docs-check.mjs, so the rule and its suite stay unedited"
  ],
  "rejected": [
    "VER-001's exact value, (capture and SHA-256 in evidence): it passes the dispatch rule, but it drops the only capture citation the operator-word advisory recognises in D011 and adds a new advisory.",
    "Rewrite D011's prose or evidence so the advisory finds the digest there: VER-001's repair rule changes only the dispatch.",
    "Prefix the first value with conversation only: and keep the capture path in the dispatch: it would pass, but the directions came as a reply in the resume: next session, not as a conversation-only control, and D011's evidence already carries the path and digest.",
    "Add D011's fingerprint to doc-baseline.json dispatches: that exemption is for historical records and would hide a new record's defect instead of repairing it.",
    "Edit validDispatch or its tests: both are kit-manifest files and the rule is correct."
  ],
  "reopenWhen": "The kit changes the dispatch rule, or a later decision in this order fails it."
}
```

## WO-003-D014 Complete the integration record: main and wo-003 were the same commit, and two WO-001 follow-ups are settled by the v0.83.0 starter

<!-- integration refs/dotln/checkpoint/WO-003/12 -->

```json
{
  "id": "WO-003-D014",
  "date": "2026-10-18",
  "dispatch": "resume: final review; worktree integrate WO-003",
  "decision": "Integration record completed by the reviewer: main and wo-003 were the same commit 2b515fa981f0b889a22843133c68914f86ed2cea, so the merge changed nothing; the checkpoint, both bases and the named stash are retained and the seventeen working-tree entries were restored intact. Carried-forward claims judged against the integrated base: WO-003-D001 to D013 stand unchanged, because no byte of main moved under them. The v0.83.0 starter already on main satisfied the conditions of WO-001-D013 and WO-001-D015 (the regenerate step verifies the carried kit instead of building, and the reader profile command prints the balanced default), so their rows FUP-4f19a91d71d95bc9 and FUP-2a5dc809710f399e are disposed as settled in docs/planning/followups.json; the four WO-003 rows stay as filed because none of their conditions (the merge, a kit change, a planning pass) has occurred. No component-version collision: release preparation keeps v0.2.0 above the local tag v0.1.0 and the surface check passes every rule. Changed evidence inputs are recorded here, never by editing verified records.",
  "evidence": [
    "refs/dotln/checkpoint/WO-003/12",
    "base 2b515fa981f0b889a22843133c68914f86ed2cea",
    "upstream 2b515fa981f0b889a22843133c68914f86ed2cea",
    "release preparation: WO-003 target v0.2.0 remains current. Files changed: docs/evidence/WO-003/meta.json, docs/final-reviews/WO-003/PR.md. Meter snapshot: docs/evidence/WO-003/meta.json, 4147 bytes. Tag observation: local snapshot only.",
    "npm run worktree -- integrate WO-003 --intake-backup <archive in the session scratch, 2 files>: Retained stash WO-003 integrate 2026-10-18 (c42cb20b7ceb20458670615ccd63965ac2bb427f); Regenerated: runtime, harness bundle and manifest, current control projection, release preparation, integration decision stub, decisions index, follow-up register and meta, work-order index; Authored conflicts: none; Integration mechanics complete; exit 0; git status --porcelain --untracked-files=all listed the same 17 entries before and after",
    "scripts/lib/worktree-integration.mjs at v0.83.0, lines 385 to 389: a root with KIT-MANIFEST.json and no package sources regenerates the runtime with node scripts/launchpad.mjs verify, and the publication-locks step is selected only where an edition page is declared; git show 2ed8447:scripts/lib/worktree-integration.mjs line 377 ran npm run build --silent unconditionally, the ENOENT WO-001-D013 met",
    "npm run reader -- profile prTitle, prBody, commitSubject, releaseNotes and releasePage each print the balanced guidance with the line Profile source: balanced default; no reader profile declared; git show 2ed8447:scripts/lib/reader-profiles.mjs carries no such line (WO-001-D015 recorded ENOENT there)",
    "npm run plan -- followups --apply: FUP-4f19a91d71d95bc9 settled; FUP-2a5dc809710f399e settled; the WO-003 rows FUP-ccb3367ad84787cc, FUP-1eec5d4255b0162c, FUP-46062529c4c46ac3 and FUP-29f02563e4477b69 are left as filed",
    "npm run release -- check-surfaces --local: PASS release-block v0.2.0 (latest local tag v0.1.0), five component-version rows, six workspace-pin rows, github-body-profile and every license surface; docs/LEGAL.md pins unavailable because this instance declares no such file",
    "npm run publication:check: no editions declared; node scripts/harness.mjs check: 34 generated surfaces; local-terms list: present"
  ],
  "rejected": [
    {
      "option": "Rewrite reviewed commits or discard the integration stash",
      "reason": "Both histories and recovery material must remain available."
    },
    {
      "option": "Dispose the four WO-003 rows at this review",
      "reason": "Their conditions have not occurred; the review only matched them by text, and the merge they wait for is the operator action after this review."
    }
  ],
  "reopenWhen": "An authored resolution changes behavior, contracts, authority or acceptance; return that finding through repair and fresh independent verification. Also reopen when a kit update reverts the regenerate step or the reader-profile default, which reopens the two settled rows."
}
```

Integration date: 2026-10-18. Original base: `2b515fa981f0b889a22843133c68914f86ed2cea`.
Fetched main: `2b515fa981f0b889a22843133c68914f86ed2cea`. Checkpoint: `refs/dotln/checkpoint/WO-003/12`.
Named stash retained: `c42cb20b7ceb20458670615ccd63965ac2bb427f` (WO-003 integrate 2026-10-18).
Resolved projections: none.
Release preparation: WO-003 target v0.2.0 remains current. Files changed: docs/evidence/WO-003/meta.json, docs/final-reviews/WO-003/PR.md. Meter snapshot: docs/evidence/WO-003/meta.json, 4147 bytes. Tag observation: local snapshot only.
Carried-forward claims: judged by the reviewer as the decision states; WO-003-D001 to D013 stand, WO-001-D013 and WO-001-D015 are settled by the starter already on main, and no acceptance judgment is recorded here (the final review records it).
Authored conflicts observed: none.
Affected checks: `npm run publication:check`, `node scripts/harness.mjs check` and `npm run release -- check-surfaces --local` passed after the integration; `npm test -- --review` runs at the review product-gate step and its row is cited in FINAL-001.
