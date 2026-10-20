# WO-011

DotLn-Angular's release close can now finish under starter v0.85.0. The `angular-nx-monorepo` class in `dotln.config.json` declares the workspace's eleven regenerable output roots (`node_modules`, `.nx`, `dist`, `.angular`, `coverage`, `test-output`, `playwright-report`, `test-results`, `tmp`, `out-tsc` and `__screenshots__`) as disposable. A target order's close under v0.85.0 deletes the ignored files under those roots, in the target worktree and in the clone's base checkout; without the declaration it refuses, because an installed `node_modules` in the base checkout is already undeclared ignored material. WO-005, the next DotLn-Angular order, waits on this merge through its typed dependency. This clone's `upstream` remote also stops fetching the starter's tags, so a core-named tag such as `v0.85.0` no longer comes back with an ordinary fetch and fails the release-version check. That setting is local to the clone, so this pull request carries only its record. No launchpad code or kit file changes; this is the patch release `v0.3.2`.

## What a reviewer gets

- The declaration: [`dotln.config.json`](../../../dotln.config.json) adds one key, `classes.angular-nx-monorepo.disposable`, and keeps every existing key and value; the line diff rewrites the class's one-line object across several lines. `loadConfig` composes the list into the registration, sorted. `.env`, `.env.*` and WO-005's generated `apps/dotln/src/environments/environment.local.ts` stay undeclared, because they are the operator's local files, not build output. The registration still has no `release` key and still denies `release.close`, so a target close creates no tag or GitHub Release until the kit can title one `DotLn Angular`.
- [DotLn-Angular's profile](../../repositories/dotln-angular.md#release-close) gains §Release close. It says what a close deletes and where, that the match is anchored at each checkout's root rather than at any directory of that name, that `apps/` and `libs/` must never be declared, and that the base checkout needs a reinstall after each close. It records the tag guard with its named-tag preview cleanup, and WO-005's verified-phase draft publish as the first live observation of the kit's publication admission. [WS-001](../../workstreams/WS-001-dotln-angular.md#delivery-states)'s WO-011 delivery-state row now links the evidence.
- The order's text changed in three places the operator approved before the change was made ([D004](../../evidence/WO-011/decisions.md#wo-011-d004)): a heading that release preparation can version, criterion 1 reworded to require that no existing key or value is removed, because adding a key to a one-line object rewrites that line, and criterion 5 admitting the generated release claim in `README.md`. The planning log binds the amended bytes, and `npm run plan -- check` accepts them.
- Records: the [evidence README](../../evidence/WO-011/README.md) with every recorded command's output in `command-output.json`, [decisions](../../evidence/WO-011/decisions.md) D001 to D009, the executor [handoff](../../evidence/WO-011/handoff.md), the verification [VER-001](../../verifications/WO-011/VER-001.md) (pass, one follow-up finding), the final review [FINAL-001](FINAL-001.md) (pass, one follow-up finding) and the [release notes](RELEASE-NOTES.md) for `v0.3.2`.

## Validation

- All six criteria are met. The reviewer reproduced them on 2026-10-20 from 13:27Z, after integrating `main`. The configuration readback printed the exact sorted list and then `no-release`, and a key-by-key comparison with `main` lists one added path and nothing removed or changed. `remote.upstream.tagOpt` reads `--no-tags` from the clone's shared configuration, neither the clone nor `origin` holds `v0.85.0`, and every local tag is also on `origin`. Kit verification printed `kit: 964 files verified at f577979ed04e98cccb3a29a9535ba6172d09a8c9`, and the harness check passed with 34 generated surfaces. The profile has one §Release close heading, which names `__screenshots__`, and WS-001 has four `WO-011` lines, one of them the evidence link that `main` lacks. The tree to be committed changes `dotln.config.json`, the release claim in `README.md` and files under `docs/`, and nothing else.
- Beyond the criteria: the verifier ran the kit's shipped matcher against 22 paths, read the close and release code, tested the tag setting and the named-tag fetch in a scratch repository, and traced the workspace's configured output (build, specs and the Nx Playwright preset) to paths under root `dist`. The reviewer checked the profile's statements against the same code and against core's v0.85.0 upgrade notes.
- Gates at the reviewed revision. `npm test -- --review`: 7 passed, 0 failed (the six structural checks and `kit-verify`), recorded at this branch's code identity, which the gate block below cites; integrating `main` left that identity unchanged. `npm run test:docs` passed after the last document edit. `npm run release -- check-surfaces --local`: 48 rules passed, 0 failed. `npm run format` changed nothing, and `git diff --check` is clean.

## Limits and follow-ups

- Each target close permanently deletes the ignored files under the eleven roots in DotLn-Angular's base checkout as well as in the target worktree, so that checkout needs `npm ci` and rebuilds its caches before its next use. Any other ignored file, such as a primed `.env`, refuses the close until it is removed, and the base refusal can name only its top-level directory, such as `apps/`.
- The tag setting lives in this clone's Git configuration, so a new clone needs it again before its first upstream fetch. A preview of a named starter release still creates that tag, and the profile says to delete it afterwards. The README's own preview steps do not say so yet, because criterion 5 limits this order's README change to the generated release claim.
- No host's handling of the kit's publication admission is qualified yet. WO-005's draft publish is the first live observation, and the operator's interim trust entries stay in place for it, as planning decision D6 sets.
- Follow-ups, none blocking. `FUP-53f596d1a9e029f1` (VER-001) asks the next planning pass that edits WS-001 to set WO-011's delivery state after the merge and to settle where the first-admission statement lives. `FUP-3875e6d408c74d3d` (this review) asks the next pass that edits the operator record or amends WO-005 to stop assigning two duties to the upgrade order, which is WO-011: the trust entries' removal and the registration-side cache setting, which D6 and `FUP-4b545ffb6f9dd6e9` moved elsewhere. `FUP-4b545ffb6f9dd6e9` itself stays deferred until WO-005's step 5.
- Base: this branch starts at `main`'s current head, so the pull request carries only WO-011's own commits. After the merge, `resume: release close` in `main` publishes `Launchpad v0.3.2`.

<!-- dotln-process-meter:start -->

Observation cutoff: 2026-10-20T13:26:45.793Z; source: canonical control events and the recorded gate, usage and harness observations collected by npm run meta.

| Work | Phase ms / attempts | Gate ms | Read files / bytes | Observed tokens / USD | Declared prompt tokens | Corrections | Directions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-001 | 5,470,464 / 3 |  |  /  |  /  |  |  | 4 |
| WO-003 | 9,490,738 (Δ 4,020,274) / 5 | 1,279 | 8 / 159,118 | 31,977,790 /  | 768 | 2 | 3 (Δ -1) |
| WO-004 | 4,813,621 (Δ -4,677,117) / 3 |  |  /  |  /  |  |  | 1 (Δ -2) |
| WO-009 | 2,974,823 (Δ -1,838,798) / 3 | 254,874 | 6 / 62,276 | 11,284,973 /  | 768 | 0 | 0 (Δ -1) |
| WO-010 | 3,807,069 (Δ 832,246) / 3 | 12,139 (Δ -242,735) | 6 (Δ 0) / 82,100 (Δ 19,824) | 18,548,547 (Δ 7,263,574) /  | 768 (Δ 0) | 2 (Δ 2) | 0 (Δ 0) |
| WO-011 | 2,844,822 (Δ -962,247) / 2 | 11,557 (Δ -582) | 6 (Δ 0) / 90,108 (Δ 8,008) | 33,939,917 (Δ 15,391,370) /  | 768 (Δ 0) | 1 (Δ -1) | 1 (Δ 1) |

| Dispatch | Wall ms (Δ) | Context bytes (Δ) | Commands (Δ) | Tokens (Δ) | Steps (Δ) | USD (Δ) / declared prompt tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-011/executor | 1,829,038 (Δ 1,159,389) |  |  | 17,408,807 (Δ 10,646,712) | 116 (Δ 61) |  / 768 |
| WO-011/verifier | 1,015,784 (Δ -1,000,739) | 77,097 (Δ 55,442) | 97 (Δ 38) | 16,441,079 (Δ 4,745,031) | 107 (Δ 33) |  /  |
| WO-011/reviewer | 10,329 (Δ -1,110,568) | 67,873 | 15 (Δ -22) | 90,031 (Δ -373) | 23 (Δ -15) |  /  |

61 unavailable observations omitted as blank cells or rows; unavailable is not zero; unset ceilings are not approvals of a future limit.

<!-- dotln-process-meter:end -->
