# WO-013 implementation and repair evidence

Dispatch: `resume: next`, 2026-10-24. The actual target implementation starting
point is `2ab4f28501628cf95dd0102c42440fd7de9f8055`, WO-007's merged commit.
The historical activation still names its ancestor
`bc9133e932a00d33c15bc5289d683b8078f51ee4`. The recovery, operator correction,
generator choice and menu comparison are recorded in [decisions](decisions.md).

The target supplies Scene and Machinery lazy feature routes with arriving
containers and test kits. The shell menu composes Scene, Machinery and empty
Tools groups; its group template accepts projected headings and list items.
The app owns router links. The actor board remains at `/board`, including the
root redirect. The two reference documents define sub-apps separately from
menu groups, the addition convention and the sandbox boundary.

## Repair of FINAL-002, 2026-10-25

The second repair integrated `main` at
`04c45cfae32d337b367496f79f708d0913f1cb7f`, bringing starter v0.99.0 and
core's v0.97.1 correction to the pre-review commit lint. The target remains
clean at draft commit `99a30befa150e5d77a64259013e62b9d0372270e`, tree
`dc997234bc57801c1909a76fa45f5524f3e3dfab`.

The [executable probe](repair-commit-lint.mjs) invokes the same reviewed-subject
reader and lint as the result transition, without recording that transition.
It proves a passing one-commit range over the fetched merge base while the
old 17-commit range contains the two merged subjects that caused the refusal.
[Lint evidence](repair-review-lint.json) records that observation, all seven
passing imported result-transition regressions, and the four unchanged filed
report hashes. The regression controls include an absent fetched ref and
invalid new commits beyond the report's example. [D016 and D017](decisions.md#wo-013-d016)
record the integration, conflict resolutions, rule and follow-up dispositions.
[Gate evidence](repair-review-gates.json) records the fresh complete launchpad
review and the validated target-gate reuse. The [current handoff](handoff.md)
records the final checks and criterion judgments.
The target gate is reused only after its reader confirms the unchanged tree
and declared commands. Independent verification and publication follow in
their separate dispatches.

## Repair of FINAL-001, 2026-10-24

The repair integrated main at `a7a076247cd817cec0b3f57c5d1fc9f44668da0c`,
bringing starter v0.96.1 and its fetched-merge-base publication fix. The
[publication reproduction](repair-publication.json) now describes 83 changed
files and no earlier-order records, with outward lint and the body profile
passing. Six imported publication regression cases also pass, including the
records-commit and same-tree retry cases beyond the original failure.

The only target edit since the verified draft is the generator-log rearrangement;
[the preservation check](repair-generator-log.json) proves every line remains.
[Repair gate results](repair-gates.json) record the complete launchpad review,
all seven target review commands and the additional integration checks. The
[current handoff](handoff.md) judges the repaired target tree. D010 and D011 in
[decisions](decisions.md) record the scope, alternatives and follow-up disposition.
The earlier observations below remain historical evidence.

## Original entry and implementation observations

- `git fetch origin` succeeded; local target `main` and `origin/main` both
  resolved to the actual starting point above. The target was clean before
  `git merge --ff-only` advanced it, exit 0. No source was discarded.
- `npm run plan -- check` on launchpad `main` passed: eight receipts and eight
  passes, with existing publication-path advisories. Main's commit was
  `36b2ae5df06dc023156f8c2328621440ce744ef1`.
- The order carries one recognized `Target release classification: minor`
  declaration. The starter exposes the `--draft` target publication route and
  canonical status reports the WO-007 dependency met.
- Target `npm ci` passed with zero reported vulnerabilities. Generator commands,
  initial refusals, successful fallback commands and the secondary-entry-point
  results are in `docs/dev-reference/workspace/generator-log.md` in the target.
- `npm run release -- prepare --local` returned the target-order no-op: no
  launchpad release assigned and no files changed.
- The first workspace preflight passed 29 of 30 tasks. `tools:lint` found one
  untranslated accessibility label in the new layout test host. The label now
  uses the translation pipe. The rerun passed all 30 tasks for 16 projects.

The two independent worker reports and their finding disposition are in
[self-review](self-review.md). [Host observations](host-qualification.md) distinguish
executed local work from later publication qualification.

## Original implementation validation

[Command results](command-results.json) preserve the preflight attempts and
measured outcomes. The additional preflight ran `npx nx format:check`,
`npm run lint:fixtures`, `npm run lint:components`, `npm run lint:hygiene`,
`npm run check:fixtures`, `npm run i18n:check`, `npm run typecheck:e2e` and
`npx nx show projects`, all exit 0. Both new projects appear and their generated
testing aliases are present, as [structural checks](structure.json) confirm.

The first browser run passed 56 of 57 tests: the new keyboard test sent Tab before
the asynchronous app bootstrap had rendered the menu. Waiting for its three links
before the first key press fixed the test setup. The complete rerun passed all
57 browser tests, including 13 new sub-app checks and the four added story entries.

The plain target gate passed install, lint, test and format in 34.616 seconds.
The first review gate passed all seven commands in 78.724 seconds. A final
read-through cleaned the app's inline link markup to the house multiline form;
the fresh review gate then passed all seven commands at the final target bytes
in 89.153 seconds. [Target gate metadata](target-gates.json) records their
outcomes, timestamps and tree identities. Every command preserves target bytes
and HEAD; every per-command row reports zero new base-checkout files. Nx reused
valid cached tasks where applicable; the browser and visual suites ran.

The original implementation target tree is `df45f1b303bdf5ec312f9d2e2789a34537ab842c`. Its review
row is `target-gate:5540cb1a-b9c9-4578-9f85-f8a1dc667a45`, recorded at
2026-10-24T17:03:55.012Z. That complete review row also covers the plain gate's
four required commands at the current tree.

Before the first target gate, the launchpad `npm run test:docs` passed all
14 tasks in 16.028 seconds, recorded at 2026-10-24T16:58:24.592Z. The final
handoff requires a fresh document row after these evidence edits; the
`implementation-ready` transition consumes it without running another gate.

## Visual inspection

The executor inspected all six new arriving-page baselines at 360, 768 and
1440 pixels and all twelve changed existing board baselines. The grouped menu,
active-link indication, page headings, empty-state text and return links are
legible, with no clipping. The existing board panels remain readable. The
mobile actor-row and scrolled-source captures retain their dimensions and
content; both were inspected against their previous images as well. Unrelated
component snapshots remain unchanged. After the deliberate baseline refresh,
all 39 visual comparisons passed without update flags, and the review gate
confirmed the same baselines again.

## Original implementation completion boundary

No dependency, lockfile, account setting or publication changed. No target
commit was created. The historical base remains an ancestor of the actual
starting commit; the first decision explains that recovery. All seven criteria
are judged in [the handoff](handoff.md). The next independent role is verifier.

The adjacent-work queue is empty. No scratch repository was found under either
worktree outside dependency, build and runtime cache directories. No local
environment file was generated by this work. The test runners own and close
their servers; no separate monitor was started.
