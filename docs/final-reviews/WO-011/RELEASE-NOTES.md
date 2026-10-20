## Release overview

This release readies this launchpad for DotLn-Angular's target orders under starter v0.85.0. The `angular-nx-monorepo` class now declares DotLn-Angular's eleven regenerable output roots as disposable, so a target order's release close deletes that output instead of refusing to close; WO-005, the next DotLn-Angular order, depends on it. This clone's `upstream` remote also stops fetching the starter's tags, which keeps a core-named tag such as `v0.85.0` from failing the release-version check again. It is for the operator and the sessions that run and close DotLn-Angular's orders. `Launchpad v0.3.2` is a patch release: configuration and records change, and no launchpad code or kit file does.

## Read before upgrading

Data-loss risk: every DotLn-Angular release close now permanently deletes the ignored files under `node_modules`, `.nx`, `dist`, `.angular`, `coverage`, `test-output`, `playwright-report`, `test-results`, `tmp`, `out-tsc` and `__screenshots__`, both in the target worktree and in the DotLn-Angular clone's base checkout. Nothing is moved to scratch. The base checkout therefore needs `npm ci` and rebuilds its caches before its next use, and personal files belong outside these roots. A root is matched at the top of each checkout only: `test-output/` is covered, a `test-output/` directory inside `apps/` is not. `.env`, `.env.*` and `apps/dotln/src/environments/environment.local.ts` stay undeclared, so an ignored file like them refuses a close until it is removed, and the base refusal may name only its top-level directory, such as `apps/`. Never declare `apps/` or `libs/` to clear that refusal, because the next close would delete every ignored file under them. Git setting: this clone's `remote.upstream.tagOpt` is `--no-tags`. It lives in the clone's own configuration, so a new clone needs it again before its first upstream fetch, and a preview of a named starter release still creates that tag, which is deleted after the preview. Core's tags stay off this fork's `origin`. Authority is unchanged: DotLn-Angular still denies `release.close`, so a target close creates no tag or GitHub Release. There is no breaking contract, schema change or launchpad code change. Required operator action after the merge: `resume: release close` in `main`.

## Substantive changes

- DotLn-Angular release close: `dotln.config.json` adds `classes.angular-nx-monorepo.disposable` with the eleven roots above and changes no other key or value. `loadConfig` composes them into the `dotln-angular` registration as one sorted list. The registration keeps no `release` key until the kit can title a target Release `DotLn Angular`.
- Upstream tag guard: this clone's `upstream` remote fetches no tags. Its readbacks, and the absence of `v0.85.0` from the clone and from `origin`, are recorded in the order's evidence.
- Records: DotLn-Angular's profile gains a Release close section covering what a close deletes, the root-anchored match, the base checkout's reinstall, the tag guard and its preview cleanup, and WO-005's draft publish as the first live observation of the kit's publication admission. WS-001's delivery-state row links the evidence. WO-011's heading and the wording of criteria 1 and 5 changed as the operator approved before the change.

## Progressive polish

None.

## Evidence and compatibility

- Source: the `wo-011` branch over `main` at `9dbe9f2`; release close produces the tag and manifest from the final-review record.
- Records: WO-011 (`docs/work-orders/WO-011-starter-v0.85.0-registration.md`); evidence and decisions WO-011-D001 to D009 under `docs/evidence/WO-011/`; verification VER-001 (pass, with one follow-up finding) and final review FINAL-001 (pass, with one follow-up finding) beside these notes.
- Compatibility: starter v0.85.0, whose kit verifies as 964 files at core `f577979ed04e98cccb3a29a9535ba6172d09a8c9`. Component versions are unchanged from `v0.3.1`, because no component source changed.
- Gates at the reviewed revision. `npm test -- --review`: 7 passed, 0 failed (the six structural checks and `kit-verify`), recorded at the branch's code identity, which integrating `main` left unchanged. `npm run test:docs` passed after the last document edit. `node scripts/harness.mjs check`: 34 generated surfaces. `npm run release -- check-surfaces --local`: 48 rules passed, 0 failed.
- Known limitations: no host's handling of the kit's publication admission is qualified; WO-005's draft publish is the first live observation, with the operator's interim trust entries still in place. The README's named-release preview does not yet include the tag deletion that the profile describes. Two planning follow-ups remain: WS-001's delivery state and the home of the first-admission statement (`FUP-53f596d1a9e029f1`), and two planning records that still assign work to the upgrade order, which is WO-011 (`FUP-3875e6d408c74d3d`).
