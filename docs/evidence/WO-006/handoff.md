# WO-006 implementation handoff

The approved component taxonomy, shell, recorded actor board and the operator's
Storybook/visual-review expansion are implemented in the registered target
worktree. The implementation is ready for the independent verifier after the
final document gate is consumed by `implementation-ready`.

Target: `dotln-angular`, base/HEAD
`5102783f5cf575a6b487e75ed9bb0c064d6dbd9c`. The changes remain uncommitted in
this executor phase. The scope expansion is bound by WO-006-D007 and the latest
canonical amendment of 2026-10-21T14:09:56.407Z.

**Criterion 1:** met — the structural search finds six Aria/CDK import files, all under wrappers or the house provider; `npm run lint:fixtures` rejects every required role/convention negative and accepts its control, including nested project configuration and import autofix.

**Criterion 2:** met — the specified presentational directories contain no `inject(` or `constructor(` matches; all 24 non-spec component files declare OnPush. The bounded structural check and project lint pass.

**Criterion 3:** met — `npm run lint:components` reports zero workspace findings; the negative component-order fixture is rejected by the persistent fixture runner, with its control passing.

**Criterion 4:** met — all six feature directories have implementation files; the board entry point exports only `boardRoutes`, the app lazy-loads it, no feature implementation imports its own barrel, and the old Home path is absent. Structural inspection, lint, production build and browser checks pass.

**Criterion 5:** met — `npm run check:fixtures` validates both versioned fixtures against the exact schema pin in WO-006-D003 and the generator log; all three fixture/schema JSON files have zero absolute-path pattern matches. The 11 board tests include all-section unavailable rendering, retained unavailable rows and a version-only unsupported payload.

**Criterion 6:** met — `npx nx e2e dotln-e2e` passes all 36 browser tests. These include the five requested WCAG tags with zero serious/critical violations on every panel, skip-to-main and arrow/Home/End navigation, five tabs with Actors initially selected, and label/value/status assertions on recorded cells.

**Criterion 7:** met — the target's component-taxonomy, component-rules and console documents name all seven kinds and example paths, R1–R7/H1–H5/G1–G6, the fixture, schema commit/digest and data path. The launchpad profile has the corresponding architecture and upstream write-back.

**Criterion 8:** met — both complete target gates pass at the unchanged target identity: plain runs install/lint/test/format, and review adds build/e2e/visual. Every command passes without non-ignored target-byte or HEAD mutation. All target preflight commands and the 14-check launchpad document preflight passed before the first target gate. The final document check is rerun after this handoff edit and must pass before the completion event.

**Criterion 9:** met — `npx nx build-storybook ui` passes; stories cover every shared UI component and shell/board states. All 33 persistent desktop/mobile/component screenshot assertions pass without updates. The executor viewed all baseline images, corrected the visual findings and re-inspected the changed captures; see [visual review](visual-review.md).

## Executable evidence

[Implementation evidence](README.md#preflight) records the complete target
preflight of 13:40:24.357Z–13:41:51.508Z: 65 unit tests, 22 tooling tests,
36 browser tests, 33 visual comparisons, lint, type checks, schema checks,
production build and Storybook. The final structural/format probe passed at
13:43:38.186Z. `npm audit` reports zero vulnerabilities; the adjacent dependency
repair is completed in queue revision 5.

The launchpad document preflight (`npm run test:docs -- --serial`) passed all
14 checks in 16.30 seconds, observed complete at 14:11:13 UTC, before either
target gate. The following target gate outputs were read back at 14:12:55 UTC:

| Gate | Passing commands | Duration |
| --- | --- | ---: |
| `node scripts/target-gate.mjs WO-006` | install, lint, test, format | 23,700 ms |
| `node scripts/target-gate.mjs WO-006 --review` | install, lint, test, format, build, e2e, visual | 39,586 ms |

The runner's supported serial mode changes concurrency, not the selected
checks. The first document attempt waited 1,153 seconds for all host lanes and
was stopped through the canonical stop command before any check executed;
no pass was supplied. The serial checks exposed two empty dispatch descriptions
and their decision-binding consequence. Both records were corrected and the
amendment re-bound through the helper; the full document selection then passed.
WO-006-D012 records the observed scheduling tradeoff. No target gate failed.

## Review and limits

self-review: found 6; fixed 6; recorded 0

The criteria worker found 3 and the design worker 4, with one duplicate;
both corrected-diff readbacks resolve every finding and report no new concern.
[The review record](self-review.md) contains their findings and corrections.
Both workers were fresh, read-only Codex `gpt-6.1-sol` workers at `max`, given
only the order and diff. They ran no executable or visual checks. The root
performed those checks and direct image review.

The goal alignment matched the approved outcome: a house-owned, accessible
component layer and recorded board with reusable examples and persistent visual
coverage. The app-grouping suggestion was evaluated and recorded as
`FUP-ba9813e8b2705de8` before a second app or foundation migration. The older
inspector-hardening item `FUP-1ce1fb75025a93f8` was explicitly re-evaluated and
remains deferred under WO-006-D011; current checks do not claim complete
coverage of its listed source forms.

The board is a recorded fixture until WO-007. Pixel baselines were reviewed on
macOS; the configured macOS CI job and remote CI have not run in this executor
phase, and no Linux pixel baseline is claimed. Selector prefixes remain
provisional under the order. [Host qualification](host-qualification.md)
records publication as unobserved here, for the later authorized phases.

`release prepare --local` reports that this target order records no launchpad
release. The target impact is classified minor. No scratch repositories were
created manually; a final metadata-only scan found zero nested repositories
outside private, dependency and generated-build roots in both worktrees.
Playwright's servers and the bounded probes completed; no task-owned monitor is
left running. No branch commit, push or publication was performed.

## Attestation and usage

Executor: Codex CLI 0.163.0; model `gpt-6-astra`; effort `max`;
source `codex-session-readback`. The canonical status readback confirms these
values and the active WO-006. Completion supplies all five actor flags.

The final usage observation is available from
`node scripts/harness.mjs usage 01a15e67-a66b-7983-b1d5-7d6d674e31a2`,
source `codex-transcript-counter`, scope `dispatch`, cutoff
2026-10-21T14:12:55.215Z. Numeric totals stay in the ignored usage receipt and
operator response; cost is unavailable, not zero. The root explicitly spawned
two workers and no descendants. The harness observed zero automated admissions
and reports an unknown uncounted remainder; the explicit count of two is
applied against the cap of twenty, not treated as a fresh budget.

The next operator dispatch is `resume: verify` in this worktree. This executor
does not dispatch the next role.
