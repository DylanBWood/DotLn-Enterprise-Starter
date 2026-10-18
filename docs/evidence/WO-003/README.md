# WO-003 evidence

Commands and outputs of the WO-003 executor session: register `dotln-angular`
in this launchpad. Dispatched by the operator's `resume: next` on 2026-10-18
(recorded 2026-10-18T01:59:29.043Z) on branch `wo-003` at `2b515fa`. Executor
identity, model and effort: [handoff.md](handoff.md), which also holds the
criterion judgments; [decisions.md](decisions.md) holds the structured
decisions. Paths are repository-relative; `$HOME` stands for the operator's
home directory.

## Deliverables and every other changed path

- `dotln.config.json` (new): `version` 1, the class `angular-nx-monorepo`
  (empty checks and supports) and the repository `dotln-angular` with its
  base branch, worktree parent, profile path, documentation root, authority
  profile and gate.
- `packages/skeleton/loadouts/grants.json`: `[]` becomes the one operator
  grant `operator.dotln-angular.publication`.
- `docs/control/outward-vocabulary.json` (new): eleven conventional `types`,
  six launchpad-internal `terms`.
- `docs/evidence/WO-003/`: this README, `decisions.md` and `handoff.md`
  (new), and `meta.json` (written by release preparation).
- `docs/final-reviews/WO-003/PR.md` (new): the process-meter block written by
  release preparation.
- `docs/work-orders/WO-003-register-dotln-angular.md` heading and
  `README.md` release block: release preparation set `(v0.2.0)` and the
  block's version line (WO-003-D007).
- `docs/control/orders/WO-003.jsonl` (new) and `docs/control/current.md`:
  activation records written by the dispatch.
- `docs/planning/followups.json`: four follow-ups minted by
  `npm run plan -- followups --sync`.
- `docs/work-orders/README.md` and `docs/lineage/decisions-index.md`:
  regenerated projections (`docs/work-orders/HISTORY.md` checked current,
  unchanged).
- Ignored, outside the diff: `docs/control/local/terms.txt` (this worktree's
  copy of the operator's list, WO-003-D003),
  `docs/control/local/repository-clones.json` (written by the step-4 direct
  check, WO-003-D004) and `docs/control/local/adjacent-work.jsonl` (the
  queue).

## Step 1: the registration

`npm run resume -- status --json` exited 0 (`workOrder` WO-003, `phase`
active, `legalNextActions` next and implementation-ready).

```
$ node -e "import('./scripts/lib/config.mjs').then(m => console.log(Object.keys(m.loadConfig(process.cwd()).repositories)))"
[ 'dotln-angular' ]
```

Criterion 1's command:

```
$ node -e "import('./scripts/lib/config.mjs').then(m => { const r = m.loadConfig(process.cwd()).repositories['dotln-angular']; console.log(r.baseBranch, r.worktreeParent, r.repositoryClass, r.documentationRoot, r.profile, r.gate.plain.join(','), r.gate.review.join(',')) })"
main .. angular-nx-monorepo docs/dotln docs/repositories/dotln-angular.md install,lint,test,format install,lint,test,format,build,e2e
```

The accepted `expiresAt` is `4102444800000` (2100-01-01T00:00:00Z;
WO-003-D001). The profile's `authorityEnvelopeId` is `target-orders`
(WO-003-D010). Gate timeouts: 600000 ms for install, lint and format,
900000 ms for test and build, 1200000 ms for e2e; every argv begins
`env NX_DAEMON=false` (WO-003-D002).

## Step 2: the operator grant

```
$ node -e "import('./scripts/lib/authority-grants.mjs').then(m => console.log(JSON.stringify(m.readAuthorityGrantRegistry(process.cwd()).map(g => [g.grantId, g.repo, g.grantedBy]))))"
[["operator.dotln-angular.publication","dotln-angular","operator"]]
```

Criterion 2's command:

```
$ node -e "import('./scripts/lib/authority-grants.mjs').then(m => console.log(JSON.stringify(m.readAuthorityGrantRegistry(process.cwd()).map(g => [g.grantedBy, g.repo, [...g.effects].sort().join(',')]))))"
[["operator","dotln-angular","pr.open,pr.thread.resolve,repo.push"]]
```

The registry reader also merges the optional ignored
`docs/control/local/authority-grants.json`, so "exactly one grant" depends on
its absence:

```
$ test -e docs/control/local/authority-grants.json || echo absent
absent
```

The grant's authority is the operator's direction of 2026-10-17, captured in
the original checkout's ignored intake; `shasum -a 256` over that capture
printed `4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`,
the value the order and the planning document record, and the grant's
`reason` names it (WO-003-D009).

## Step 3: the outward vocabulary and the lint

The lint reports `pass` only with the ignored local-terms list present, so the
worktree's list was registered first (WO-003-D003; `harness check` printed
`local-terms list: unavailable` before and `present` after). The three
commands, with their exit codes:

```
$ printf 'feat(core): add the environment token\n' | node scripts/outward-lint.mjs pr-title
{"kind":"pr-title","status":"pass","checks":{"format":{"status":"pass"},"launchpad":{"status":"pass"},"runtime":{"status":"pass"},"localTerms":{"status":"pass"}},"findings":[]}
exit 0

$ printf ':sparkles: feat(core): add the environment token\n' | node scripts/outward-lint.mjs pr-title
{"kind":"pr-title","status":"refused","checks":{"format":{"status":"refused"},"launchpad":{"status":"pass"},"runtime":{"status":"pass"},"localTerms":{"status":"pass"}},"findings":[{"rule":"subject.shape","span":{"start":0,"end":48,"line":1,"column":1,"precision":"exact"}}]}
exit 1

$ printf 'feat/environment-token' | node scripts/outward-lint.mjs branch
{"kind":"branch","status":"pass","checks":{"format":{"status":"pass"},"launchpad":{"status":"pass"},"runtime":{"status":"pass"},"localTerms":{"status":"pass"}},"findings":[]}
exit 0
```

The second output is the evidence for house rule 20 of
[WS-001](../../workstreams/WS-001-dotln-angular.md): a gitmoji in front of
the conventional subject is refused with `subject.shape`, so the target
repository's workflow, which WO-004 adds, prepends it after the pull request
opens.

## Step 4: the local clone record

```
$ npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"
error: unknown repository id "dotln-angular"
exit 1
```

`git status --short` after it showed the same entries as before and nothing
was written to either launchpad's clone map. The command records into the
main-branch worktree's launchpad and validates the id against that
launchpad's configuration; `git ls-tree --name-only main -- dotln.config.json`
prints nothing, and will until this order merges and the main checkout holds
the merge. Criterion 4 is therefore unmet, with the post-merge command
recorded as the follow-up (WO-003-D004).

The direct check that the recorder accepts this registration and clone path,
run against this worktree's own configuration (it writes only this worktree's
ignored clone map and prints the same value on every run):

```
$ node -e "import('./scripts/lib/target-worktrees.mjs').then(m => { m.recordRepositoryClone(process.cwd(), 'dotln-angular', process.env.HOME + '/Projects/DotLn-Angular'); console.log(m.recordedRepositoryClone(process.cwd(), 'dotln-angular') === process.env.HOME + '/Projects/DotLn-Angular') })"
true
exit 0
```

`git check-ignore -v docs/control/local/repository-clones.json` printed
`.gitignore:15:/docs/control/local/`; `git status --short` was unchanged.
The clone itself: `git -C "$HOME/Projects/DotLn-Angular" status --short --branch`
printed `## main...origin/main` (one untracked `.DS_Store`), `log --oneline -3`
printed the single commit `bc9133e Initial commit`, and `remote -v` named
`https://github.com/DylanBWood/DotLn-Angular.git`.

## Step 5: the profile document

```
$ test -f docs/repositories/dotln-angular.md && echo ok
ok
```

The registration's `profile` names it (criterion 1's output); its content is
unchanged (an order non-goal).

## Steps 6 and 7: records and projections

- Release preparation (the executor's release-preparation step),
  `npm run release -- prepare --local`:
  `Assigned WO-003: v0.2.0, the next minor above the observed release baseline v0.1.0.`
  `Recorded WO-003-D006 in docs/evidence/WO-003/decisions.md.` Files changed:
  the order's heading, `README.md`'s release block, `decisions.md`,
  `docs/evidence/WO-003/meta.json` (meter snapshot) and
  `docs/final-reviews/WO-003/PR.md` (process-meter block). Tag observation:
  local snapshot only (WO-003-D007).
- Follow-ups: `npm run plan -- followups --sync` minted
  `FUP-ccb3367ad84787cc` (WO-003-D003), `FUP-1eec5d4255b0162c` (D004),
  `FUP-46062529c4c46ac3` (D005) and, after the Preflight,
  `FUP-29f02563e4477b69` (D008); `npm run adjacent -- apply` queued one item
  per follow-up (`adjacent-0001` to `adjacent-0004`) and deferred each onto
  it; `npm run adjacent -- list` then showed nothing left queued (revision
  8). The sync ran again after self-review changed the decisions' text.
- `npm run meta`: exit 0; `Process health: no observed budget breach; WO-003
  tokens 146,097; first verification failed in 0 of the 1 closed orders
  counted (fewer than eight); 0 reopen candidates; unset limits remain unset.`
  `docs/lineage/decisions-index.md` lists every WO-003 decision.
- `npm run work-orders -- index` then `npm run work-orders -- index --check`:
  `PASS docs/work-orders/README.md is current`, `PASS docs/work-orders/HISTORY.md is current`,
  exit 0; WO-003 is shown active with target v0.2.0 and WO-004 with
  `Repository: dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4`
  (criterion 5).
- No nested repositories: `find . -name .git` outside `.git`, `node_modules`
  and intake found none; `git ls-files --stage` lists no submodule entry.
- `npm run format`: changed nothing (code only; JSON and Markdown are
  formatter-ignored).

## Other checks at the final identity

- `node scripts/harness.mjs check`: `harness check: 34 generated surfaces;
  local-terms list: present`, exit 0, after the grants change (the generated
  surfaces do not depend on the registry).
- `npm run terms -- check dotln.config.json packages/skeleton/loadouts/grants.json docs/control/outward-vocabulary.json`:
  `local-terms list: present`, exit 0.
- `node scripts/test-runner.mjs --list` and `--review --list` select only
  `kit-verify` and `harness` in this instance, so neither `npm test` form runs
  the authority-grants or outward-lint suite (WO-003-D005, WO-003-D008).
  `--document --list` selects seventeen suites: `kit-verify`, `format`,
  `release-surfaces`, `license-surfaces`, `publication`, `docs-check`,
  `index`, `siblings`, `lineage`, `harness`, `harness-context`,
  `plan-refutation-current`, `meta`, `registrations`, `plan`,
  `reader-profiles`, `entropy`.

## Preflight

Each suite ran alone under
`node scripts/harness.mjs bounded -- npm test -- --only <suite>`, before the
document and product gates:

- `configuration-root`: PASS, 5.58 s, exit 0 (`kit-verify` 0.15 s;
  `suite:configuration-root: 2 passed; 0 failed; 6.02 s`).
- `authority-grants`: FAIL, 0.17 s, exit 1; four of five subtests pass; the
  fifth asserts the committed `packages/skeleton/loadouts/grants.json` is `[]`
  ("this order adds no personal authority") and found this order's grant
  (WO-003-D008).
- `outward-lint`: refused before any test ran, exit 1:
  `Suite outward-lint is not carried in this kit (core-only: core outward-vocabulary control data)`
  (WO-003-D005).
- `target-worktree`: PASS, 448.34 s, exit 0 (`kit-verify` 0.11 s;
  `suite:target-worktree: 2 passed; 0 failed; 448.88 s`).

Full suite outputs were not retained in the repository; the rows above quote
them. The two suites that could not pass in this kit are deferred upstream
through WO-003-D005 and WO-003-D008.

## Gates

Both rows stand at code identity
`cecf3d631e7e6aff515368e6b2ec1f9f5c68420edd6ae6ea372eabcb56492463` (tree
`9062a1179eb1f076c1c4a733a67c56664d3dd9a7`) in the runner's gate index. Every
code edit (the configuration, the grant registry, the vocabulary) preceded
these runs; only this README and `handoff.md` changed after them, which keeps
the identity.

- `npm run test:docs`: `npm run test:docs: 17 passed; 0 failed; 248.74 s; 17 fresh tasks`,
  exit 0; row `npm run test:docs`, exitCode 0, durationMs 248738, recordedAt
  2026-10-18T03:31:39.281Z. An earlier run, before self-review, passed the
  same seventeen suites in 5.40 s.
- `npm test`: `npm test: 2 passed; 0 failed; 0.64 s; 2 fresh tasks`
  (`kit-verify` 0.12 s, `harness` 0.23 s), exit 0; row `npm test`, exitCode
  0, durationMs 635, recordedAt 2026-10-18T03:31:52.080Z.
- `git diff --check`: clean before and after the gates; `git status --short`
  showed the same twelve entries before and after.
- The completion command (`npm run resume -- implementation-ready …`) runs
  `npm run test:docs` once more inline and records its result in the control
  segment `docs/control/orders/WO-003.jsonl`.

## Repair: VER-001 finding F1

The operator dispatched `resume: fix` on 2026-10-18. The briefing was recorded
by the session hook, phase `repairing`, with legal next action
`repair-complete`. The repair ran in the same `wo-003` worktree, read
[VER-001](../../verifications/WO-003/VER-001.md) and this order, and changed
only these paths:

- `decisions.md`: WO-003-D011's `dispatch` (no other D011 byte changed) and the
  new WO-003-D013. WO-003-D012 is the verifier's record, unchanged.
- `docs/planning/followups.json`: two `settled` dispositions on
  `FUP-ca963c9be2a290c8`, the D012 follow-up. The second corrects the first
  disposition's reason on the same day.
- `docs/lineage/decisions-index.md` and `docs/work-orders/README.md`:
  regenerated by `npm run meta` and `npm run work-orders -- index`.

**The rule the repaired records hold** (`validDispatch`,
`scripts/docs-check.mjs`): each structured decision's `dispatch` starts with
one of `planning`, `ideation`, `resume`, `scope expand`, `conversation only`,
`analysis` or `operator override`, then a colon and a non-empty paraphrase of
at most 240 code points on one line, after trimming. The rule and its suite are
kit-manifest files and stay unedited.

**The class sweep and cases the report did not quote.** One probe imports the
gate's own `readDecisions`, the `doc-baseline.json` dispatch fingerprints and
`validDispatch`, and judges every decision record under this launchpad. It ran
under `node scripts/harness.mjs bounded -- node <session scratch>/dispatch-sweep.mjs "$PWD"`:

```
before the repair:
sweep: 27 decision records; 0 baselined; 1 failing
  failing: docs/evidence/WO-003/decisions.md#WO-003-D011 (254 chars)
after the repair, with WO-003-D013 added:
sweep: 28 decision records; 0 baselined; 0 failing
D011 dispatch: 163 chars; valid true
first D011 dispatch: 254 chars; valid false
ok: the first record's paraphrase behind an accepted prefix fits, so the prefix alone failed: valid true; paraphrase 234
ok: prefix is case-sensitive: valid false; paraphrase 27
ok: leading space before the prefix: valid false; paraphrase 27
ok: role verb is not a control prefix: valid false; paraphrase 21
ok: whitespace-only paraphrase: valid false; paraphrase 0
ok: 240 astral code points count as 240: valid true; paraphrase 240
ok: 241 astral code points refuse: valid false; paraphrase 241
ok: trailing whitespace is trimmed before the count: valid true; paraphrase 240
exit 0
```

The first case settles what VER-001 left open: the 234-code-point paraphrase
fits, so the prefix alone failed. My probe first expected that case to exceed
240 and printed `WRONG`. The expectation was wrong, not the rule, and the case
now asserts the observed result.

**An advisory the proposed value would have introduced.** With VER-001's exact
value, `npm run test:docs` passed (`17 passed; 0 failed; 5.87 s`), but
docs-check printed a new advisory:
`ADVISORY docs/evidence/WO-003/decisions.md#WO-003-D011: operator-attributed words need a capture digest (SHA-256 or --capture-hash), or a paraphrase`.
That check reads a capture citation only in the form `SHA-256 <digest>`. D011's
first dispatch was the only place it found the digest, because D011's prose
puts the digest in backquotes and its evidence writes `shasum -a 256 printed`.
D011's dispatch therefore carries VER-001's
wording with the digest inline (WO-003-D013). Afterwards `operatorWordFindings`
over WO-003 listed only WO-003-D003, which predates the repair and quotes the
repository README's sentence ending "the terms the operator states", not words
of the operator. The FINAL-001 advisory belongs to a filed WO-001 report.

**The capture.** `shasum -a 256 docs/intake/notes/wo-003-operator-direction-2026-10-18.md`
printed `d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03`,
the digest D011 and both waivers (control ordinals 4 and 5) cite. Neither
waiver was touched.

**Gates at the repaired bytes.** Code identity is still
`cecf3d631e7e6aff515368e6b2ec1f9f5c68420edd6ae6ea372eabcb56492463`. The repair
changed no code, and the tree hash is now
`b40c974fe93a22623de2dab927a6308cf164294e`.

- `npm run format`: exit 0. The lines shown read `(unchanged)`, and
  `git status --short` listed the same thirteen entries before and after.
  `git diff --check`: clean.
- `npm run work-orders -- index --check`: `PASS docs/work-orders/README.md is current`,
  `PASS docs/work-orders/HISTORY.md is current`.
- `npm run test:docs`: `npm run test:docs: 17 passed; 0 failed; 5.66 s; 17 fresh tasks`,
  exit 0. Row: exitCode 0, durationMs 5664, recordedAt
  2026-10-18T04:03:23.191Z. Only the WO-003-D003 and FINAL-001 advisories
  remain, both from before the repair.
- `npm test`: `npm test: 2 passed; 0 failed; 0.64 s; 2 fresh tasks`
  (`kit-verify` 0.13 s, `928 files verified at 7b8206f4b97d290473e4e619271521f496ce56aa`;
  `harness` 0.22 s), exit 0. Row: exitCode 0, durationMs 644, recordedAt
  2026-10-18T04:03:33.207Z.
- `npm run adjacent -- list`: revision 8, nothing running, nothing next;
  `adjacent-0001` to `adjacent-0004` stay deferred onto their `FUP-`
  identifiers.
