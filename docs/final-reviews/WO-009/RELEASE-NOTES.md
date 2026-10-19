## Release overview

This release names the launchpad's releases `Launchpad`. From this tag on, the annotated tag message, the release notes' first line and the GitHub Release title begin with `Launchpad` instead of the kit default `DotLn`, so the fork's Releases are distinguishable from core's at a glance. It is for the operator and the sessions that work here: one configuration value in `dotln.config.json`, and the README release claim that the kit's own release preparation regenerates from it. It is the instance's third release, `v0.3.0`, a minor release: the operator chose to continue the fork's numbering with only the name changed.

## Read before upgrading

No breaking contract, schema change, data migration or authority change. `dotln.config.json` gains one top-level key, `release.displayName`, which the kit's loader validates and which affects only releases published after this commit: `DotLn v0.1.0` and `DotLn v0.2.0` keep their titles, because the kit never edits a published Release and each release carries the name configured at its release commit. Required operator action after the merge: `resume: release close` in `main`, whose Release is the first titled `Launchpad`. Known limitation: the title `Launchpad v0.3.0` is established by the kit's composition path and is observed only when release close records it in `release-close.json`.

## Substantive changes

- Release identity: `dotln.config.json` declares `"release": { "displayName": "Launchpad" }` beside the existing `classes` and `repositories` keys; the loader accepts the name (nine characters, trimmed, single-line, no backtick or version token) and defaults the other release keys unchanged.
- README release claim: the one generated line between the release markers now reads ``This source prepares Launchpad `v0.3.0`.``, written by `npm run release -- prepare --local`, which assigned `v0.3.0` as the next minor above the local baseline `v0.2.0`; the order heading carries the same version.
- Records: the order's evidence with every command output, decisions D001 to D005, the executor handoff, verification VER-001 and this final review under the order's directories.

## Progressive polish

None.

## Evidence and compatibility

- Source: the `wo-009` branch over `main` at `c085769`; release close produces the tag and manifest from the final-review record.
- Records: WO-009 (`docs/work-orders/WO-009-release-display-name.md`), evidence and decisions WO-009-D001 to D005 under `docs/evidence/WO-009/`, verification VER-001 (pass; one follow-up finding fixed in evidence) and final review FINAL-001 (pass, no finding) beside these notes.
- Gates at the reviewed revision: `npm test -- --review` 7 passed, 0 failed (the six structural checks and `kit-verify`, 964 kit files verified), recorded at the branch's code identity, which the integration of `main` left unchanged; `npm run test:docs` passed after the last document edit; `git diff --check` clean; `node scripts/harness.mjs check` 34 generated surfaces; `npm run release -- check-surfaces --local` 48 rules passed, 0 failed. Component versions: unchanged from `v0.2.0` (no component source changed).
- Known limitations: the published Release title is observed at release close, not here; the two earlier Releases keep `DotLn` in their titles; DotLn-Angular's release name is outside this order (boarded for the kit in the 2026-10-19 planning pass).
