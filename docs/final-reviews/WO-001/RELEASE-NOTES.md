## Release overview

The first release of this launchpad records what its machine and its three AI coding harnesses actually support, with an epistemic label on every finding, so that later mechanism choices in the instance rest on observation instead of assumption. It is for the operator and the sessions that work here: a human page, `docs/discovery/environment.md`, with every command recorded, and a machine record, `docs/discovery/environment.json`, that the lifecycle's attestation checks read.

## Read before upgrading

Nothing to migrate: the release adds records under `docs/` only and changes no code, configuration, authority or schema. The v0.82.0 starter update already merged on `main` is the base of this release, not part of it. The record is a dated snapshot of 2026-10-14 (Claude Code 2.1.299, Codex CLI 0.162.1, Copilot CLI 1.0.94); a lifecycle attestation of a later patch on the same version line records without advisory, and a rerun of `npm run discover` in a later order replaces the hand-recorded selector rows. The private local-terms list stays ignored by Git and is registered per worktree; its terms are never printed. No operator action is required.

## Substantive changes

- Environment truth: toolchain versions, Git worktree behavior, host sandbox confinement and the kernel advisory lock are recorded as observed, with the commands that produced them.
- AI coding harnesses: for Claude Code, Codex CLI and Copilot CLI, the record names the non-interactive mode, output formats, model and effort selectors, persisted effort, effort readback, settings sources, hooks, instruction files and startup context, each labeled; one print-mode smoke per harness returned OK from a scratch directory outside the repository.
- Attestation checks: `environment.json` carries the `effortReadbackProbe` shape that `scripts/resume.mjs` reads, so an attestation of an observed harness version and effort prints no discovery advisory while an unobserved version still does.
- Audit answers: gateway and provider behavior, metering of foreground versus delegated runs, interruption recovery and managed-settings precedence each carry an answer or a labeled unknown, and none names a host, gateway, vendor policy or internal service.
- Harness smoke and local terms: `node scripts/harness.mjs check` (34 generated surfaces) and the local-terms check are recorded as observed with their printed status.

## Progressive polish

None.

## Evidence and compatibility

- Source: the `wo-001` branch over `main` at `2ed8447` (starter v0.82.0, core commit `7b66f8b303a316ff4560b4827d6dc728cd7f504a`); release close produces the tag and manifest from the final-review record.
- Records: WO-001 (`docs/work-orders/WO-001-environment-truth.md`), evidence and decisions WO-001-D001 to D015 under `docs/evidence/WO-001/`, verification VER-001 (pass) with its probe record, and final review FINAL-001 (pass) beside these notes.
- Gates at the reviewed revision: `npm run test:docs` 19 passed, 0 failed; `npm test -- --review` 16 passed, 0 failed (448 s); `git diff --check` clean; `node scripts/harness.mjs check` passed; `npm run release -- check-surfaces --local` passed every rule. The five workspace packages keep their versions, since no previous release exists.
- Known limitations: the live harness smoke, Codex and Copilot in-repository settings, hooks and instruction loading, delegated metering outside Claude Code, crash and compaction losses and managed-settings override remain untested or unknown, each with its reason in the record. Four kit defects the executor met were settled by the v0.82.0 starter; three kit gaps met during review are boarded as follow-ups in `docs/planning/followups.json`.
