# Upstream

This launchpad was exported from DotLn core by `launchpad export`. The kit is the
manifest-listed set: its verbatim files are Git blobs at the commit below;
`package.json`, `package-lock.json` and this file are generated from them; the
compiled runtime and tests under `packages/<name>/dist/{src,test}/` were built at export time from
the work tree after its package sources, project files and build script were
verified equal to the commit; and the harness bundle was emitted inside this
export from that runtime and verified against the bundle core's compiled
packages predicted. No other kit text was read from a work tree.
Carried operating documents rebase their harness-security links to the instance's
root `AI-HARNESS-SECURITY.md`; core-only section fragments are omitted there.
An update can retain locally modified files at their prior manifest hashes;
its dated output lists those exceptions to this source commit.

- **Commit:** `4090d70dc908dbc69e0cd3601a982d40aecb4b6c`
- **Tag:** `v0.103.1`
- **Remote:** `github.com/DylanBWood/DotLn`
- **Manifest:** `KIT-MANIFEST.json` (schema 1; 1042 files with SHA-256)
- **License files carried:** `LICENSE`, `LICENSE-docs`, `NOTICE`

## Kit files

- `packages/console/*.schema.json`: 2 files, the versioned actor-board and runtime-status contracts, byte-identical to the commit
- `scripts/**`: 348 files, byte-identical to the commit except excluded core qualification and runner-fixtures tests
- `packages/beacons/**`: 9 files, byte-identical to the commit
- `packages/kernel/package.json`, `packages/kernel/dist/{src,test}/**`: 37 files, the compiled `@dotln/kernel` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/compiler/package.json`, `packages/compiler/dist/{src,test}/**`: 75 files, the compiled `@dotln/compiler` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/skeleton/package.json`, `packages/skeleton/dist/{src,test}/**`: 363 files, the compiled `@dotln/skeleton` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- `packages/console/package.json`, `packages/console/dist/{src,test}/**`: 49 files, the compiled `@dotln/console` runtime and tests: `package.json` byte-identical to the commit, `dist/{src,test}/` built from the commit's sources at export time
- test fixtures: 87 files, byte-identical fixture data and executable doubles from the commit
- `.claude/**`, `.agents/**`, `.codex/**`: 34 files, the Contributor harness bundle, emitted inside the export by its own `node scripts/harness.mjs emit` and verified by `node scripts/harness.mjs check`
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
- `docs/releases/tag-manifest.template.json`
- `packages/compiler/src/attribution.mjs`
- `packages/compiler/src/codex-continuation.mjs`
- `packages/compiler/src/operator-control.mjs`
- `packages/skeleton/src/correction-observation.mjs`
- `packages/skeleton/src/dispatch-journal.mjs`
- `packages/skeleton/src/duration.mjs`
- `packages/skeleton/src/evidence-editions.mjs`
- `packages/skeleton/src/gate-deadlines.mjs`
- `packages/skeleton/src/gate-evidence.mjs`
- `packages/skeleton/src/runtime-inputs.mjs`
- `packages/skeleton/src/temporary-root-records.mjs`
- `packages/skeleton/src/test-selection.mjs`
- `packages/skeleton/src/usage-observation.mjs`
- `packages/skeleton/src/writer-teardown.mjs`
- `packages/skeleton/test/control-beacon-cli.fixture-inputs.json`
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
- `dotln.config.json`
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
- `docs/lineage/README.md`
- `packages/skeleton/loadouts/grants.json`
- `AGENTS.md`

## Upstream pointers

Core documents the kit does not carry, at the commit above:

- `DylanBWood/DotLn@4090d70dc908 docs/product/00-vision.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/product/01-principles.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/02-domain-model.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/product/03-architecture.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/product/04-interfaces.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/05-pattern-library.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/product/06-roadmap.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/09-audit-resilience-privacy.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/10-ir-compatibility.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/11-proteino.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/11-protino.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/12-workstream-application.md` — a product document the kit points to and does not carry
- `DylanBWood/DotLn@4090d70dc908 docs/product/13-uifa-roles.md` — referenced by `docs/PLAYBOOK.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/publication/base-outline.md` — referenced by `docs/publication/implementation-overlay-template.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/publication/audience-status-index.md` — the audience and status index of the product documents
- `DylanBWood/DotLn@4090d70dc908 docs/LEGAL.md` — the license posture, the pinned license hashes and the remaining distribution gates
- `DylanBWood/DotLn@4090d70dc908 CONTRIBUTING.md` — outbound licenses, the sign-off rule and the clean-room boundary
- `DylanBWood/DotLn@4090d70dc908 docs/AI-HARNESS-SECURITY.md` — the operator record the sanitized harness-security template is derived from
- `DylanBWood/DotLn@4090d70dc908 docs/decisions/0006-platform-mechanisms-instance-doctrine.md` — the platform and instance boundary this kit makes physical
- `DylanBWood/DotLn@4090d70dc908 docs/decisions/0007-presence-is-a-policy-input.md` — presence as a policy input with no universal direction
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-146/qualification.md` — referenced by `docs/PLAYBOOK.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/instance/entropy-reducer/README.md` — referenced by `docs/PLAYBOOK.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/decisions/0003-personal-ai-harness-security.md` — referenced by `docs/PLAYBOOK.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/refutations/README.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/README.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/HISTORY.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/work-order-map.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/concurrent-work-orders-plan.md` — referenced by `docs/PLAYBOOK.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-039/harness-context.json` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-155/skill-loading.json` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-090/README.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/critical-path-2026-09-08.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/vision-into-use-2026-09-17.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-043/ideation-commands-and-usage.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-130/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-198-a-worktree-gate-names-what-moved.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-041/ideation.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/r1-replan-2026-09-16.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-079-worktree-sync.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-157-closeout-followups.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/off-ramps-5s-entropy-2026-09-25.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-131/ideation.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-158-lifecycle-off-ramps.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-157/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-219/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-158/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-202/commands-final.json` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/entropy-review-002-2026-09-22.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/entropy-review-006-2026-10-10.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/entropy-review-007-2026-10-20.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/onesie-twosie-followup-drain-2026-09-27.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/document-contract-and-release-close-2026-10-28.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/followups.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/outstanding-cleanup-2026-09-19.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-136-authority-enforcement-boundary.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-137-local-runner-readiness.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-138-local-model-role-qualification.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-239/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-064/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-189/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-187-verification-attacks-and-reviews.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-187/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-235/decisions.md` — referenced by `docs/product/08-publication-compiler.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-063/implementation.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-126/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-132/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-044/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-054/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-142/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-132-machinery-stand-down.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/machinery-stand-down-2026-09-15.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-133/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-054/codex-continuation.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-140/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-126/build-comparison.json` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-127/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-115/scheduling-comparison.json` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-229/decisions.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-222/README.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/architecture/gate-execution.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/evidence/WO-216/README.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/planning/standard-pass-2026-10-19.md` — referenced by `docs/product/07-execution-guide.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/publication/examples/README.md` — referenced by `docs/product/08-publication-compiler.md`; not carried in this instance
- `DylanBWood/DotLn@4090d70dc908 docs/work-orders/WO-126-process-debt.md` — referenced by `docs/product/08-publication-compiler.md`; not carried in this instance
