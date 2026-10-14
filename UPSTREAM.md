# Upstream

This launchpad was exported from DotLn core by `launchpad export`. The kit is the
manifest-listed set: its verbatim files are Git blobs at the commit below;
`package.json`, `package-lock.json` and this file are generated from them; the
compiled runtime and tests under `packages/<name>/dist/{src,test}/` were built at export time from
the work tree after its package sources, project files and build script were
verified equal to the commit; and the harness bundle was emitted inside this
export from that runtime and verified against the bundle core's compiled
packages predicted. No other kit text was read from a work tree.
An update can retain locally modified files at their prior manifest hashes;
its dated output lists those exceptions to this source commit.

- **Commit:** `3b5e29e4d36956b680ac1339aeeca887947e7987`
- **Tag:** `v0.81.0`
- **Remote:** `github.com/DylanBWood/DotLn`
- **Manifest:** `KIT-MANIFEST.json` (schema 1; 915 files with SHA-256)
- **License files carried:** `LICENSE`, `LICENSE-docs`, `NOTICE`

## Kit files

- `scripts/**`: 273 files, byte-identical to the commit except the excluded core-report qualification fixture
- `packages/beacons/**`: 9 files, byte-identical to the commit
- `packages/kernel/package.json`, `packages/kernel/dist/{src,test}/**`: 37 files, the compiled `@dotln/kernel` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/compiler/package.json`, `packages/compiler/dist/{src,test}/**`: 75 files, the compiled `@dotln/compiler` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/skeleton/package.json`, `packages/skeleton/dist/{src,test}/**`: 345 files, the compiled `@dotln/skeleton` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/console/package.json`, `packages/console/dist/{src,test}/**`: 47 files, the compiled `@dotln/console` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- test fixtures: 65 files, byte-identical fixture data and executable doubles from the commit
- `.claude/**`, `.agents/**`, `.codex/**`: 33 files, the Contributor harness bundle, emitted inside the export by its own `node scripts/harness.mjs emit` and verified by `node scripts/harness.mjs check`
- `.prettierignore`
- `.prettierrc.json`
- `LICENSE`
- `LICENSE-docs`
- `NOTICE`
- `corpus/fixtures/ids/command-id-vectors.jsonl`
- `corpus/fixtures/ids/stable-hash-vectors.jsonl`
- `corpus/harness/id-corpus-lib.mjs`
- `corpus/harness/wo101-id-corpus.test.mjs`
- `corpus/harness/wo101-support.mjs`
- `corpus/manifests/WO-101.json`
- `corpus/mutation/enumerate.mjs`
- `corpus/mutation/mutate.mjs`
- `corpus/mutation/wo108-selftest.test.mjs`
- `docs/PLAYBOOK.md`
- `docs/product/07-execution-guide.md`
- `docs/product/08-publication-compiler.md`
- `docs/publication/implementation-overlay-template.md`
- `packages/compiler/src/attribution.mjs`
- `packages/compiler/src/codex-continuation.mjs`
- `packages/compiler/src/operator-control.mjs`
- `packages/skeleton/src/correction-observation.mjs`
- `packages/skeleton/src/evidence-editions.mjs`
- `packages/skeleton/src/gate-deadlines.mjs`
- `packages/skeleton/src/gate-evidence.mjs`
- `packages/skeleton/src/usage-observation.mjs`
- `packages/skeleton/src/writer-teardown.mjs`
- `package.json`
- `package-lock.json`
- `dotln.config.example.json`
- `UPSTREAM.md`

## Instance seeds

Written once by the export, owned by this instance and never manifest-listed.
`CLAUDE.md` carries the generated harness block after its hand-written floor; the
block is checked by `node scripts/harness.mjs check` through the listed
`.claude/harness-manifest.json`, not by this manifest:

- `README.md`
- `.gitignore`
- `CLAUDE.md`
- `AI-HARNESS-SECURITY.md`
- `docs/workstreams/README.md`
- `docs/repositories/README.md`
- `docs/work-orders/WO-001-environment-truth.md`
- `docs/README.md`
- `docs/control/README.md`
- `docs/evidence/README.md`
- `docs/verifications/README.md`
- `docs/final-reviews/README.md`
- `docs/planning/README.md`
- `docs/publication/README.md`
- `docs/product/README.md`
- `docs/discovery/README.md`
- `docs/decisions/README.md`
- `docs/releases/README.md`
- `docs/observations/README.md`
- `docs/planning/sequence.md`
- `docs/intake/.gitkeep`
- `docs/planning/followups.json`
- `docs/control/doc-ceilings.json`
- `docs/control/doc-baseline.json`
- `docs/control/budgets.json`
- `docs/lineage/idea-ledger.md`
- `packages/skeleton/loadouts/grants.json`
- `AGENTS.md`

## Upstream pointers

Core documents the kit does not carry, at the commit above:

- `DylanBWood/DotLn@3b5e29e4d369 docs/product/00-vision.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/01-principles.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/02-domain-model.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/03-architecture.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/04-interfaces.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/05-pattern-library.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/06-roadmap.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/09-audit-resilience-privacy.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/10-ir-compatibility.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/11-proteino.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/11-protino.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/12-workstream-application.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/product/13-uifa-roles.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@3b5e29e4d369 docs/publication/base-outline.md` — the base outline an implementation overlay narrows
- `DylanBWood/DotLn@3b5e29e4d369 docs/publication/audience-status-index.md` — the audience and status index of the product documents
- `DylanBWood/DotLn@3b5e29e4d369 docs/LEGAL.md` — the license posture, the pinned license hashes and the remaining distribution gates
- `DylanBWood/DotLn@3b5e29e4d369 CONTRIBUTING.md` — outbound licenses, the sign-off rule and the clean-room boundary
- `DylanBWood/DotLn@3b5e29e4d369 docs/AI-HARNESS-SECURITY.md` — the operator record the sanitized harness-security template is derived from
- `DylanBWood/DotLn@3b5e29e4d369 docs/decisions/0006-platform-mechanisms-instance-doctrine.md` — the platform and instance boundary this kit makes physical
- `DylanBWood/DotLn@3b5e29e4d369 docs/decisions/0007-presence-is-a-policy-input.md` — presence as a policy input with no universal direction
