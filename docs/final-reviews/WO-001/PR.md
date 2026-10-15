# WO-001

This change records what this launchpad's machine and its three AI coding harnesses actually support, so that later mechanism choices in the instance rest on observed evidence rather than assumption. Every finding carries one of eight epistemic labels, every unknown states why it could not be observed, and every command behind a finding is listed. It is the instance's first release, `v0.1.0`, and adds records under `docs/` only.

## What a reviewer gets

- A human record, [environment.md](../../discovery/environment.md): toolchain, Git worktree behavior, sandbox confinement and the kernel lock; for Claude Code, Codex CLI and Copilot CLI the non-interactive mode, output formats, model and effort selectors, persisted effort, effort readback, settings sources, hooks, instruction files and startup context; one print-mode smoke per harness; the harness smoke; the local-terms registration; and the four audit questions, each answered generically or left as a labeled unknown.
- A machine record, [environment.json](../../discovery/environment.json), in the `effortReadbackProbe` shape the lifecycle's attestation parser reads, so an attestation of an observed harness version and effort prints no discovery advisory while an unobserved version still does.
- The order's evidence scripts and [decisions](../../evidence/WO-001/decisions.md) D001 to D015, the executor [handoff](../../evidence/WO-001/handoff.md), the independent verification [VER-001](../../verifications/WO-001/VER-001.md) (pass) with its probe record, and the final review [FINAL-001](FINAL-001.md) (pass) with the [release notes](RELEASE-NOTES.md) for `v0.1.0`.

## Validation

- `npm run test:docs`: 19 passed, 0 failed (14.9 s). `npm test -- --review`: 16 passed, 0 failed (448 s), recorded at this branch's code identity and cited in the gate block below. `git diff --check`: clean. `node scripts/harness.mjs check`: 34 generated surfaces, local-terms list present. `npm run release -- check-surfaces --local`: every rule passed.
- The reviewer reproduced the verifier's records, local-terms and Git and lock behavior probes under the bounded wrapper. The installed-version probe now differs because Claude Code moved from 2.1.299 to 2.1.300 after the record was taken, and the follow-up probe no longer applies because the v0.82.0 starter dropped the test file it inspected; both are recorded in the final review as drift against a dated record, not as defects of it.

## Limits and follow-ups

- The record is a dated snapshot of 2026-10-14. The live harness smoke, in-repository settings, hooks and instruction loading for Codex and Copilot, delegated metering outside Claude Code, crash and compaction losses and managed-settings override remain untested or unknown, each with its reason.
- Base: the v0.82.0 starter update already merged on `main` is not part of this change. That update settled four kit follow-ups the executor had boarded (D004 to D007), and the review boards three kit gaps met on the way (D013 to D015): the integration's regenerate step cannot complete in a launchpad, a resume phrase that leads a longer prompt records no dispatch, and the reader profile command fails without a profile file.
- No operator action is required beyond merging. After the merge, `resume: release close` in `main` publishes `v0.1.0`.

<!-- dotln-process-meter:start -->

Observation cutoff: 2026-10-15T14:18:50.721Z; source: canonical control events and the recorded gate, usage and harness observations collected by npm run meta.

| Work | Phase ms / attempts | Gate ms | Read files / bytes | Observed tokens / USD | Declared prompt tokens | Corrections | Directions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-001 | 2,773,910 / 2 |  |  /  |  /  | 768 |  | 4 |

| Dispatch | Wall ms (Δ) | Context bytes (Δ) | Commands (Δ) | Tokens (Δ) | Steps (Δ) | USD (Δ) / declared prompt tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-001/executor | 1,920,191 |  |  |  |  |  / 768 |
| WO-001/verifier | 853,719 |  |  |  |  |  /  |

50 unavailable observations omitted as blank cells or rows; unavailable is not zero; unset ceilings are not approvals of a future limit.

<!-- dotln-process-meter:end -->
