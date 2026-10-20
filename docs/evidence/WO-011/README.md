# WO-011 starter registration evidence

Dispatch: `resume: next`, 2026-10-20. The class now declares the eleven
authorized disposable roots. The existing configuration keys and values
are preserved; the target release policy remains absent and `release.close`
remains denied. The shared clone setting `remote.upstream.tagOpt` reads
`--no-tags`. No `v0.85.0` tag was present locally or on this fork's origin.

[decisions.md](decisions.md) records the choices and reopening conditions.
The [repository profile](../../repositories/dotln-angular.md#release-close)
records the cleanup, tag-preview and live-observation policies; the
[workstream row](../../workstreams/WS-001-dotln-angular.md#delivery-states)
retains state `proposed` and now links this evidence.

## Declared roots and matching boundary

| Roots | Why they are disposable |
| --- | --- |
| `node_modules` | Installed dependencies, recreated by `npm ci`. |
| `.nx`, `.angular` | Build and task caches. |
| `dist`, `out-tsc` | Compiled application and TypeScript output. |
| `coverage` | Generated coverage reports. |
| `test-output`, `playwright-report`, `test-results` | Generated test and browser-run results. |
| `tmp` | Workspace temporary build output. |
| `__screenshots__` | Ignored screenshot output designated by the order. |

The target's `.gitignore` at `651d76ff` names these paths. This declaration
does not make an ignored basename disposable everywhere: the shipped
`underDisposable` function matches the checkout-relative root and its
descendants. The readback probe executes that function from the shipped
source and distinguishes covered root output from nested output and local
environment files.

Additional inputs for the planning pass's §8.2 carry-ins were
`scripts/lib/target-worktree-close.mjs`, its existing target-worktree
fixtures, the merged target's `.gitignore`, `apps/dotln/project.json`,
`apps/dotln-e2e/playwright.config.mts` and `tsconfig.base.json`, plus the
versioned [Nx 23.3.0 preset source](https://github.com/nrwl/nx/blob/23.3.0/packages/playwright/src/utils/preset.ts)
and [solution-detection source](https://github.com/nrwl/nx/blob/23.3.0/packages/js/src/utils/typescript/ts-solution-setup.ts).
The base has no root `tsconfig.json` and disables declarations. From those
sources, this is a non-solution workspace: its configured build and
Playwright result, HTML and CI blob paths lie below root `dist`, which is
covered. This is source evidence, not a new target gate or live close.
Future nested output needs its precise path assessed before a declaration
changes. Local dependency-source reads were unavailable because the base
checkout has no installed dependencies; the versioned primary sources
above supplied the needed behavior.

The base checkout loses declared dependencies and caches at each close,
so its next use pays another install and cache rebuild. Neither `.env` nor
the generated local environment source is declared. WO-005's target
sessions remove their generated files after the checks that create them;
the base checkout's local material stays operator-owned.

## Publication boundary

The core [v0.85.0 upgrade notes](https://github.com/DylanBWood/DotLn/releases/tag/v0.85.0#read-before-upgrading)
were retrieved with an explicitly repository-qualified release query.
They identify base-output deletion, the tag hazard and unqualified live
host admission. The instance's D4 and D6 planning decisions remain in
force: no target Release until the kit supports `DotLn Angular`, WO-005
records the hook decision, prompt behavior and interim trust entries at
its draft publish, and WO-006 later tests host admission after the operator
removes those entries. This order performs no publication or host-setting
change. The Git setting affects this clone only; an explicitly requested
preview tag still needs deletion after its preview.

## Validation

The configuration readback, tag queries, profile/workstream counts, direct
harness check and kit verification passed. The kit verification reported
964 files at the order's required core revision. A semantic comparison
against `main` proved the new `disposable` key is the only configuration
change. No nested scratch repository was inventoried.

The operator approved the three-part order-text correction recorded in
[WO-011-D004](decisions.md#wo-011-d004), and `plan amend-order` bound it to
the judged planning pass. Release preparation then assigned `v0.3.2`, the
next patch above local `v0.3.1`, to the order heading and the generated
README claim. No component source or version changes.

The [two independent worker reviews](self-review.md) returned zero findings.
The complete `npm test -- --review` run passed all seven fresh tasks in
11.56 seconds, with unchanged code identity and no unrun suite.
[gate-summary.json](gate-summary.json) records the row and task results.
The document run captured in the command evidence passed all fourteen tasks
in 787.20 seconds, including 773.35 seconds waiting for host capacity before
formatting. Its only advisories were the three historical filed-report
advisories named by the order. Attaching that verbatim output changes the
document tree, so one final document run after the attachment supplies the
row consumed by implementation-ready; that final row remains in the
canonical gate receipt and control event.
The literal `main...HEAD` diff remains empty before final review's branch
commit; the working-tree comparison and untracked inventory establish this
executor candidate's scope.

## Command observations

[command-output.json](command-output.json) preserves the exact command,
exit status and output for each recorded observation: separate stdout and
stderr, or the combined stream where the command redirected both. Empty
output is an empty string. JSON encoding keeps the outputs byte-preserving without
introducing trailing whitespace into this repository. `rg -c` performs the
order's literal count checks.
