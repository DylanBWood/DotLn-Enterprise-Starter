# WO-012

DotLn-Angular's target orders can now close with named releases. On the `dotln-angular` registration in `dotln.config.json`, this change declares a release policy with the display name `DotLn Angular` and moves `release.close` into the allowed effects, and the operator grant now names that effect too. The kit's release close therefore tags DotLn-Angular and publishes a Release titled `DotLn Angular` and its tag, the first being `DotLn Angular v0.1.0`, as the operator directed on 2026-10-19. The same close now keeps the base checkout's output under `baseDisposablePolicy: "judge-only"`, so the operator's DotLn-Angular checkout keeps its dependencies and caches. `contributions.operatorAuthor` declares the public commit identity that the publish helper's sign-off rule exempts; this pull request's own publication needed it. No kit file or launchpad code changes in this order. It is the patch release `v0.3.3`, the first Launchpad release under starter v0.88.0.

## What a reviewer gets

- The configuration in [`dotln.config.json`](../../../dotln.config.json) has five key-path changes and no others: `release` and `baseDisposablePolicy` are added on the registration, `release.close` moves from `deniedEffects` to the end of `allowedEffects`, and the top-level `contributions` object adds `operatorAuthor`. The eleven disposable roots the class declares are unchanged.
- The grant in [`grants.json`](../../../packages/skeleton/loadouts/grants.json): `operator.dotln-angular.publication` appends `release.close` to its `effects` and `operations` and keeps its id, version, origin and repository. Its reason now rests on the direction of 2026-10-19 beside that of 2026-10-17, drops the old tagging reservation, and keeps merging, repository settings and package publication with the operator. Both edits are needed: with either one alone the kit refuses the close.
- [DotLn-Angular's profile](../../repositories/dotln-angular.md#release-close) rewrites §Release close for the declared policy. It covers the title and first tag, the grant, the judge-only base checkout and its collision refusal, and the classification header every DotLn-Angular order now needs, with a two-count check to run before an order starts. It also covers the sign-off exemption, the non-tag starter preview, and the node-spelled helper WO-006's draft publish must use. Its branch-policy paragraph now routes target tags and Releases through the close instead of forbidding them. [WS-001](../../workstreams/WS-001-dotln-angular.md#delivery-states)'s WO-012 row links the evidence.
- The order's heading changed once, as the operator approved before the change, so that release preparation reads the fork's version rather than the starter's: the starter revision is spelled `0.88.0` and `v0.3.3` is appended ([D004](../../evidence/WO-012/decisions.md#wo-012-d004)). The planning log binds the amended bytes, and `npm run plan -- check` accepts them.
- Records: the [evidence README](../../evidence/WO-012/README.md) with the recorded command outputs, [decisions](../../evidence/WO-012/decisions.md) D001 to D009, the executor [handoff](../../evidence/WO-012/handoff.md), the verification [VER-001](../../verifications/WO-012/VER-001.md) (pass, no finding), the final review [FINAL-001](FINAL-001.md) (pass, no finding) and the [release notes](RELEASE-NOTES.md) for `v0.3.3`.

## Validation

- All six criteria are met. The reviewer reproduced them on 2026-10-21 from 03:29Z, after integrating `main`, which moved nothing. The configuration readback printed the Design's six lines, the last equal to the latest non-merge author on `main`, and the grant readback printed `1 1 operator true true 4 4`. A key-path comparison with `main` lists exactly the five intended changes. Kit verification printed `kit: 977 files verified at a54f8d6520ed54d05e5209455c67541562716404`, and the harness check passed with 34 generated surfaces. The work-order index is current and its history's Historical section reads `None.`. The profile and WS-001 counts hold, including the removal of both interim sentences. The tree to be committed changes `dotln.config.json`, the grant, the release claim in `README.md` and files under `docs/` only.
- Beyond the criteria: through the kit's `authorizeRegisteredEffects`, the candidate authorizes `release.close` and the three publication effects and still refuses `package.publish` and `pr.merge`, while `main`'s registration or `main`'s grant alone refuses `release.close`. In a throwaway clone of these bytes, the sign-off rule passed both commits of the planned series as the operator's, failed an outside author without a trailer, and passed that author once signed off. The publish helper runs the same rule over this branch before it pushes and stops at any failing commit. The verifier also ran the kit's own judge-only and collision fixtures (2 passed) and compared the profile's before-start check with the kit's parser on ten fixtures; the check is never looser than the parser.
- Gates at the reviewed revision. `npm test -- --review`: 7 passed, 0 failed (the six structural checks and `kit-verify`), recorded at this branch's code identity, which the gate block below cites; integrating `main` and formatting left that identity unchanged. `npm run test:docs` passed after the last document edit. `npm run release -- check-surfaces --local`: 48 rules passed, 0 failed. `npm run format` changed nothing, and `git diff --check` is clean.

## Limits and follow-ups

- No target close or publication ran. WO-006's close will be the first to show a `DotLn Angular` release, the kept base output and the collision rule. Its draft publish will be the first to show how a host handles the node-spelled admission now that the operator's interim trust entries are gone.
- Every DotLn-Angular order now needs exactly one classification header, or its close refuses, and nothing checks earlier than the close. WO-006 to WO-008 have none yet; the UI planning pass adds them (`FUP-854bc432690eb6fd`).
- The kit's parser admits a valid header beside a malformed duplicate. The profile's check refuses that case, and the kit repair is boarded for core as `FUP-2232a29f1061494f`.
- `dotln.config.json` and the executor's command record name the operator's public commit identity, the one every session commit of this repository already carries.
- Base: this branch starts at `main`'s current head, so the pull request carries only WO-012's own commits. After the merge, `resume: release close` in `main` publishes `Launchpad v0.3.3`.

<!-- dotln-process-meter:start -->

Observation cutoff: 2026-10-21T03:29:21.040Z; source: canonical control events and the recorded gate, usage and harness observations collected by npm run meta.

| Work | Phase ms / attempts | Gate ms | Read files / bytes | Observed tokens / USD | Declared prompt tokens | Corrections | Directions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-004 | 4,813,621 / 3 |  |  /  |  /  |  |  | 4 |
| WO-009 | 2,974,823 (Δ -1,838,798) / 3 | 254,874 | 6 / 62,276 | 11,284,973 /  | 768 | 0 | 0 (Δ -4) |
| WO-010 | 3,807,069 (Δ 832,246) / 3 | 12,139 (Δ -242,735) | 6 (Δ 0) / 82,100 (Δ 19,824) | 18,548,547 (Δ 7,263,574) /  | 768 (Δ 0) | 2 (Δ 2) | 0 (Δ 0) |
| WO-011 | 3,938,939 (Δ 131,870) / 3 | 11,557 (Δ -582) | 6 (Δ 0) / 90,108 (Δ 8,008) | 33,939,917 (Δ 15,391,370) /  | 768 (Δ 0) | 1 (Δ -1) | 1 (Δ 1) |
| WO-005 | 9,037,343 (Δ 5,098,404) / 3 |  |  /  |  /  |  |  | 5 (Δ 4) |
| WO-012 | 1,864,437 (Δ -7,172,906) / 2 | 13,824 | 4 / 33,661 | 30,754,728 /  | 768 | 1 | 1 (Δ -4) |

| Dispatch | Wall ms (Δ) | Context bytes (Δ) | Commands (Δ) | Tokens (Δ) | Steps (Δ) | USD (Δ) / declared prompt tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-012/executor | 917,099 (Δ -3,415,298) |  |  | 10,357,801 | 84 |  / 768 |
| WO-012/verifier | 947,338 (Δ -778,668) | 20,478 | 98 | 20,305,137 | 112 |  /  |
| WO-012/reviewer | 11,644 (Δ -2,967,296) |  | 34 | 91,790 | 36 |  /  |

70 unavailable observations omitted as blank cells or rows; unavailable is not zero; unset ceilings are not approvals of a future limit.

<!-- dotln-process-meter:end -->
