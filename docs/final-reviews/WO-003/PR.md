# WO-003

This change registers `dotln-angular` in this launchpad so that WO-004, the first target order for DotLn-Angular, can activate, run the repository's declared gate in its own worktree and publish a pull request the operator merges. It adds the instance's first `dotln.config.json`, the operator's publication grant and the outward vocabulary the publication lint reads. It is the instance's second release, `v0.2.0`, a minor release: new declared surfaces, not a fix.

## What a reviewer gets

- [`dotln.config.json`](../../../dotln.config.json): schema version 1; the empty class `angular-nx-monorepo`; the repository `dotln-angular` with base branch `main`, worktree parent `..`, the profile document [`docs/repositories/dotln-angular.md`](../../repositories/dotln-angular.md), documentation root `docs/dotln`, an authority profile that allows reading, writing, local Git, shell, push, pull-request opening and thread resolution, denies package publication and release close, limits writers to one and expires in 2100, and a gate of six commands run under `env NX_DAEMON=false` (install, lint, test and format in the plain selection; build and e2e added for review) with timeouts of ten, fifteen and twenty minutes.
- [`packages/skeleton/loadouts/grants.json`](../../../packages/skeleton/loadouts/grants.json): one operator grant admitting `repo.push`, `pr.open` and `pr.thread.resolve` for `dotln-angular`, whose reason names the operator's captured direction of 2026-10-17 by its SHA-256 and says that merging, tagging, repository settings and package publication stay with the operator.
- [`docs/control/outward-vocabulary.json`](../../control/outward-vocabulary.json): the eleven conventional types and the six internal terms the target's pull requests must not carry; `DotLn` is not a term because it names the target's product.
- The order's [evidence](../../evidence/WO-003/README.md) with every command output, [decisions](../../evidence/WO-003/decisions.md) D001 to D014 and the executor [handoff](../../evidence/WO-003/handoff.md); the verification sequence [VER-001](../../verifications/WO-003/VER-001.md) (fail: one document-validation regression in a decision's metadata, repaired without touching the registration) and [VER-002](../../verifications/WO-003/VER-002.md) (pass); the final review [FINAL-001](FINAL-001.md) (pass, no finding) and the [release notes](RELEASE-NOTES.md) for `v0.2.0`.

## Validation

- Criteria 1, 2, 3 and 5 are met: the loader prints the exact registration summary, the registry projects exactly one operator grant, the three outward-lint checks return `pass`, `refused` with `subject.shape` (a gitmoji in front of the conventional subject, which the target's title workflow answers after the pull request opens) and `pass`, the profile is a contained regular file, and the work-order index check passes with WO-004 carrying its repository pair.
- Criteria 4 and 6 are unmet and waived by the operator from a captured direction (control ordinals 4 and 5): the local clone record cannot be written before this merge, because `worktree clone` validates the repository id against `main`'s configuration; and two of the order's four Preflight suites cannot pass in this kit (`outward-lint` is core-only; `authority-grants` asserts an empty committed registry, the negation of this grant). Both are boarded as follow-ups.
- Gates at the reviewed revision: `npm run test:docs` 17 passed, 0 failed; `npm test -- --review` 2 passed, 0 failed (0.55 s), recorded at this branch's code identity and cited in the gate block below; `git diff --check` clean; `node scripts/harness.mjs check` 34 generated surfaces, local-terms list present; `npm run release -- check-surfaces --local` every rule passed; `npm run publication:check` no editions declared.
- The reviewer reproduced the criteria and the authority boundaries in one bounded probe of thirty assertions: the registration summary, the grant projection, publication authorization accepting the real grant and refusing an empty registry, a host-policy origin, another repository, missing operations, an expired profile and an explicit push denial, five malformed configurations refused by name, and six lint cases including the multi-word term `resume phrase`.

## Limits and follow-ups

- The gate commands are declared, not yet run; WO-004 runs them first, and a wrong argv or timeout surfaces there, as the order's known issue says.
- After the merge, release close runs `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"` from the main checkout once it holds the merge (follow-up `FUP-1eec5d4255b0162c`); WO-004's `worktree start` reports `no local clone recorded` if that step is missed and is the fallback.
- Three kit gaps are boarded for upstream in `docs/planning/followups.json`: the empty-registry assertion in the authority-grants suite, the clone command's validation against `main` before the merge, and the local-terms list a new order worktree lacks; the Preflight line naming a core-only suite is a planning follow-up. Integrating `main` (same commit, nothing merged) settled two WO-001 kit follow-ups that the v0.83.0 starter already resolved.
- Base: this branch starts at `main`'s current head, so the pull request carries only WO-003's own commits. No operator action is required beyond merging with a merge commit. After the merge, `resume: release close` in `main` publishes `v0.2.0`.

<!-- dotln-process-meter:start -->

Observation cutoff: 2026-10-18T04:30:20.839Z; source: canonical control events and the recorded gate, usage and harness observations collected by npm run meta.

| Work | Phase ms / attempts | Gate ms | Read files / bytes | Observed tokens / USD | Declared prompt tokens | Corrections | Directions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-001 | 5,470,464 / 3 |  |  /  |  /  |  |  | 4 |
| WO-003 | 6,904,594 (Δ 1,434,130) / 4 | 1,279 | 8 / 159,118 | 31,977,790 /  | 768 | 2 | 3 (Δ -1) |

| Dispatch | Wall ms (Δ) | Context bytes (Δ) | Commands (Δ) | Tokens (Δ) | Steps (Δ) | USD (Δ) / declared prompt tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-003/executor | 6,239,791 (Δ 4,319,600) | 338,803 | 345 | 25,186,585 | 412 |  / 768 |
| WO-003/verifier | 664,803 (Δ -188,916) |  |  | 6,594,400 | 62 |  /  |
| WO-003/reviewer | 17,276 (Δ -2,679,278) |  | 69 | 196,805 | 70 |  /  |

54 unavailable observations omitted as blank cells or rows; unavailable is not zero; unset ceilings are not approvals of a future limit.

<!-- dotln-process-meter:end -->
