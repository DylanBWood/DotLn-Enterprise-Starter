# WO-006 implementation evidence

Dispatch: `resume: next`, 2026-10-21. Target: the registered `dotln-angular`
worktree at base `5102783f5cf575a6b487e75ed9bb0c064d6dbd9c`.
The target was clean at entry. Both target release-header counts were 1;
the launchpad helper carries the node-spelled verified-phase `--draft` route.
The operator expanded this order to include Storybook and persistent visual
checks; WO-006-D007 and the canonical amendment receipts bind that scope.

The implementation supplies the four libraries, seven component roles,
wrapper-owned Aria/CDK behavior, lazy recorded actor board, role lint and its
negative/control fixtures, schema validation, documentation, local component
catalog and screenshot regression suite. The recorded board remains read-only.

The root session is Codex CLI 0.163.0, model `gpt-6-astra`, effort `max`,
source `codex-session-readback`. Entry process-cost counters were unavailable
(`session-counters-unavailable`, dispatch scope, observed 2026-10-21T12:20:44Z).
The handoff records the available final counter source and cutoff; cost is not
inferred. Verification, draft publication, final review and release close
remain their separate dispatches.

## Preflight

The complete target preflight ran after the review fixes, before either full
target gate, from 2026-10-21T13:40:24.357Z to 13:41:51.508Z. It exited 0.
Commands ran through the bounded wrapper with
`NX_DAEMON=false NX_ISOLATE_PLUGINS=false`, one probe at a time.
Peak attributed footprint was 1,617,776,096 bytes against 3,221,225,472 bytes.
Nx reused matching successful task results where its cache applied.

| Command | Observed result |
| --- | --- |
| `npm audit` | Zero vulnerabilities |
| `npm ls @angular/aria @angular/cdk` | Both 22.2.3; compatible tree, exit 0 |
| `npx nx show projects` | Lists `ui`, `models`, `dotln-shell`, `board` and the existing projects |
| `npx nx format:check` | Pass |
| `npx nx run-many -t lint test build` | Pass; 65 unit tests, production build and all lint/tooling tasks |
| `npx nx run-many -t test build` | Pass; eight matching cached tasks, adjacent dependency-repair evidence |
| `npm run lint:fixtures` | Every named negative rejected and its control accepted; import autofix, duplicate shared types and component-order controls pass |
| `npm run lint:components` | Zero findings |
| `npm run check:fixtures` | Both fixtures pass the pinned schema and scrub checks |
| `npm run i18n:check` | No missing keys |
| `npx nx e2e dotln-e2e` | Pass; 36 browser tests covering five panels, local links, keyboard, responsive layout, axe and 22 catalog smoke states |
| `npx nx build-storybook ui` | Pass |
| `npx nx e2e-visual dotln-e2e` | Pass; 33 screenshot comparisons, no update flag |

Separate focused verification after review corrections passed 15 UI tests,
11 board tests, 22 tooling tests, all thirteen foundation compiler
configurations and the e2e TypeScript configuration. The CLI diagnostic test
uses a canonical temporary path so its copied executable runs under macOS's
`/var` symlink. The source-data checks retain their negative/control coverage.

The final production build reports 458.65 kB initial output, 120.80 kB
estimated transfer, and a 208.02 kB lazy board chunk, 28.47 kB estimated
transfer. These are whole-route figures including the recorded fixture;
no isolated Aria byte cost is claimed. Storybook is separate development output.

The launchpad document preflight and the complete plain/review target gate
rows are recorded with their timestamps in the handoff after they pass.
The target gates bind every non-ignored target byte and check for mutation.

## Review and visual evidence

- [Decisions](decisions.md): Aria evaluation, schema/capture provenance,
  lint design, app grouping, dependency repair, scope expansion and reviews.
- [Independent review](self-review.md): six distinct findings, all fixed;
  both corrected-diff readbacks pass.
- [Visual inspection](visual-review.md): all 33 images viewed, corrections
  to disabled states, dialog spacing, link consistency and source capture.
- [Host qualification](host-qualification.md): publication has not occurred
  in this executor phase; later roles record their actual observations.

The local pixel baseline is macOS. A macOS CI job is configured, but no remote
CI run or Linux pixel baseline is claimed. The board uses the 2026-10-21
recorded fixture until WO-007. App-scoped core/features/UI grouping remains
a documented evaluation before a second app or foundation migration,
`FUP-ba9813e8b2705de8`; the operator supplied it as a suggestion for judgment.
The prior structural-inspector hardening item `FUP-1ce1fb75025a93f8` was
explicitly re-evaluated and retained as deferred in WO-006-D011. Current
workspace checks do not claim to settle that broader source-form coverage.

## Source readings

- The order and its cited WS-001 taxonomy, console contract and house rules;
  the target profile, operator record, and both target reference roots.
- Target foundation implementation and tests, including the existing lint
  fixture runner, translation inspector and test-kit inspector.
- The target's filed WO-005 decisions D008, D020, D021 and D022.
- Angular Aria's official Tabs and Menu guides, with installed 22.2.3
  declarations binding API details. Context7's `/angular/components` Tabs
  results returned Material examples; those were not Aria API evidence.
- The platform console README and `uifa-board-v1` schema at
  `a54f8d6520ed54d05e5209455c67541562716404`.
- Current Context7/official documentation and installed declarations for
  ESLint configuration, import sorting, Storybook, Transloco, Prettier,
  npm overrides and Playwright screenshots, at the implementation's versions.

The first generator-help probe returned help but the wrapper found two surviving
plugin workers. `nx daemon --stop` exited 0; subsequent probes kept plugins
in process. The initial two-worker browser/dev-server run exceeded the probe
memory budget. Static production servers, one browser worker and bounded unit
parallelism pass within it without disabling assertions. The private diagnostic
is ignored and excluded from packets as WO-006-D009 records.

## Completed gate readback

The complete launchpad document preflight passed all 14 checks in serial mode
before either target gate. The plain target gate then passed install, lint,
test and format in 23,700 ms; review passed those commands plus build, e2e and
visual in 39,586 ms. Both retained non-ignored target bytes and HEAD, and their outputs
were read back at 2026-10-21 14:12:55 UTC. The
[handoff](handoff.md) maps this evidence to all nine criteria and records the
reviews, scope limits and usage source. The final document gate follows the
last handoff edit and is consumed by the completion event.
