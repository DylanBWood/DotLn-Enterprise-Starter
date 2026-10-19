# WO-009 — Name this launchpad's releases `Launchpad`: declare `release.displayName` in `dotln.config.json` and refresh the README release claim, so the next tag and GitHub Release carry the instance's own name (version assigned at activation)

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** minor. One configuration value of this instance
changes and no kit behavior changes; minor rather than patch because the
operator wants the next Release numbered `v0.3.0`, continuing the fork's
numbering from `v0.2.0` with only the prefix changed (direction of
2026-10-19).
**Cost:** adds one `release` section to `dotln.config.json` (about 50 bytes)
and this order's evidence; changes one word and the assigned version in the
README release claim. Removes nothing. Wall-clock: about 15 to 30 minutes of
executor work plus the fixed cycle (activation, verification, final review,
release close); unknown until run. Context bytes: the README §Releases in
this instance, `scripts/lib/config.mjs` §release, this order, about 20 KB.
Commands added: none. Tokens: unknown until run. Steps: 7. Re-mints: none; no
registered evidence source, feedback source or machinery suite source is
edited, so `npm test` without `--review` is the product gate.
**Nomination provenance:** the 2026-10-18 main-rules planning pass
([planning document](../planning/main-rules-and-platform-items-2026-10-18.md)
§5 and §6 D3), on the operator's dispatch of 2026-10-18 captured verbatim in
ignored intake (`docs/intake/notes/planning-main-rules-2026-10-18.md`,
SHA-256 `222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`),
paraphrased: name the releases Launchpad instead of DotLn and keep the
version numbering. Planner-synthesized. Opaque identifier, not a priority.
Clean-room screen:
the kit's documented configuration contract and the operator's own
repository. Amended by the 2026-10-19 latest-upstream planning pass
([planning document](../planning/latest-upstream-2026-10-19.md) §6 D3 and
D7), on the operator's direction of 2026-10-19 captured verbatim in ignored
intake (`docs/intake/notes/planning-latest-upstream-2026-10-19.md`, SHA-256
`01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`), paraphrased: the
releases keep the fork's numbering and change only the prefix, so the next
is `Launchpad v0.3.0`; the classification becomes minor and the Preflight
line names the suites starter v0.85.0 lists.
**Depends on:** nothing typed. WO-009 precedes WO-010 in the sequence only so
that the next Release carries the name (planning document §6 D13).

<!-- dotln-dependencies:start -->
[]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** README.md §Releases in this instance;
`scripts/lib/config.mjs` (`validateRelease`, `RELEASE_DISPLAY_NAME_LIMIT`,
`validReleaseDisplayName`); `scripts/lib/release-preparation.mjs`
(`releaseClaimLine`); `scripts/release.mjs` (`releaseDisplayName`,
`releaseEdition`, `releaseTitle`); 07-execution-guide.md §Workflow closeout
and releases and §Preflight before the full gate; `docs/operator/README.md`
§Standing preferences.

**Objective:** after this order merges and closes, `dotln.config.json`
declares `release.displayName` `Launchpad`, the README release claim reads
`This source prepares Launchpad \`v0.3.0\`.` (the next minor above the
latest tag at activation; `v0.3.0` above `v0.2.0`), and the tag and
GitHub Release this order's close publishes are titled `Launchpad v0.3.0`;
every later release carries the name until the operator changes it.

**Observed gap (dated 2026-10-18, main at `773d867`):** `dotln.config.json`
declares no `release` section, so `scripts/lib/config.mjs` defaults
`release.displayName` to `DotLn`; the README release block reads
`This source prepares DotLn \`v0.2.0\`.`; the two published Releases on
`dylanwoodconsulting/DotLn-Enterprise-Starter` are titled `DotLn v0.1.0`
(2026-10-15) and `DotLn v0.2.0` (2026-10-18), and
`npm run release -- notes v0.2.0` begins `DotLn v0.2.0`. The kit's
`releaseEdition` titles the notes `<displayName> <version>` from the
configuration at the release commit, and `releaseTitle` takes that first line
as the Release title, so the configured name reaches the tag annotation and
the Release without any other change (planning document §4).

**Design:** one declaration, `"release": { "displayName": "Launchpad" }`,
added to the root `dotln.config.json` (schema `version` 1), followed by the
kit's own release preparation, which assigns the next minor above the latest
local tag and rewrites the one generated line between the README's release
markers. The name is 9 characters, single-line, without backticks or version
tokens, so `validateRelease` accepts it. The two published Releases keep their
titles: the kit never edits a published Release, and retitling them is a
GitHub action of the operator's outside any order. Rejected:
`DotLn-Enterprise-Starter`, the name fresh exports use (the operator asked
for `Launchpad`); waiting for the starter update (the mechanism is in this
kit at v0.83.0); editing the README claim by hand (release preparation
writes it, and the surface check compares it with the assigned target);
patch, the 2026-10-18 pass's choice (the operator named `v0.3.0` on
2026-10-19, and the kit assigns a version only through the classification).

**Deliverables:** the `release` section in `dotln.config.json`; the
refreshed README claim and this order's heading version;
`docs/evidence/WO-009/` with the decisions, the README and the recorded
command outputs; the regenerated index and decision index.

**Execution plan:**

1. Activate: `npm run worktree -- start WO-009 docs/work-orders/WO-009-release-display-name.md`
   from the clean main checkout. Check: `npm run resume -- status --json`
   shows WO-009 active.
2. `dotln.config.json` (existing, repository root): add
   `"release": { "displayName": "Launchpad" }` as a top-level key beside
   `classes` and `repositories`; change nothing else. Check:
   `node -e "import('./scripts/lib/config.mjs').then(m => console.log(m.loadConfig(process.cwd()).release.displayName))"`
   prints `Launchpad`, and `npm run resume -- status --json` exits 0.
3. `README.md` (existing, the release block) and this order's heading:
   run `npm run release -- prepare --local`. Check: the command prints
   `Assigned WO-009: v0.3.0, the next minor above the observed release baseline v0.2.0.`
   (or the next minor above a newer local tag; no core-named tag such as
   `v0.85.0` may exist locally, see Known issues), the block's one line reads
   `This source prepares Launchpad \`<that version>\`.`, and the heading ends
   with `(<that version>)`.
4. `npm run release -- check-surfaces --local`. Check: the output contains
   `PASS release-block` and no `FAIL` row.
5. `docs/evidence/WO-009/decisions.md` and `README.md` (new): record the
   assigned version, the outputs of steps 2 to 4 verbatim, and the
   observation that the two published Releases keep their titles. Check:
   `npm run meta` exits 0 and `docs/lineage/decisions-index.md` lists the
   decisions.
6. Regenerate projections: `npm run work-orders -- index` and `npm run meta`
   (`npm run sync` where the kit carries it). Check:
   `npm run work-orders -- index --check` exits 0.
7. Preflight, then handoff per 07-execution-guide.md §Discipline at the kit
   revision in force: run the Preflight line, `npm run test:docs`, then
   `npm run resume -- implementation-ready` with the attestation flags, the
   evidence README naming each criterion's command and output.

**Preflight:** `npm test` as one complete run started directly (starter
v0.85.0's executor rule; its `kit-verify` row is the `--only kit-verify`
suite the handoff may consume, the one suite `npm test -- --list` shows
beside the six structural checks every selection runs; `harness` is no
longer a suite), then `npm run test:docs`.

**Acceptance criteria (all required)**

1. `node -e "import('./scripts/lib/config.mjs').then(m => console.log(m.loadConfig(process.cwd()).release.displayName))"`
   prints `Launchpad`, and `npm run resume -- status --json` exits 0.
2. The README release block holds exactly one non-empty line between its
   markers, `This source prepares Launchpad \`<version>\`.`, where
   `<version>` is the version this order's heading carries, and
   `npm run release -- check-surfaces --local` prints `PASS release-block`
   with no `FAIL` row.
3. `git diff --name-only main...HEAD` lists `dotln.config.json`, `README.md`,
   this order and files under `docs/` only; `git diff main...HEAD -- dotln.config.json`
   adds the one `release` section and removes nothing.
4. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the commands and outputs in `docs/evidence/WO-009/README.md`;
`npm run resume -- status --json` after `implementation-ready` shows the
attestation recorded.

**Known issues and carry-ins:** the Release title is observed only at
release close, which records it in `release-close.json`; the verifier judges
the configuration, the claim and the notes' composition, not the published
title. The two Releases published before this order keep `DotLn` in their
titles (planning document §9 C4). If the kit revision in force at activation
carries `npm run sync` (v0.84.0 and later), step 6 runs it instead of the two
commands. The main clone must hold no core-named tag when step 3 runs:
`release prepare --local` reads every local tag, and the starter update of
2026-10-19 fetched `v0.85.0` before it was deleted (2026-10-19 planning
document §4 and §6 D8); if `git tag --list v0.85.0` prints the tag, delete
it and record the deletion. WO-010 and WO-011 follow this order, so their
Releases are the next patches above `v0.3.0`.

**Non-goals:** retitling published Releases; changing the version numbering
or classification scheme; the starter update; any other key of
`dotln.config.json`; the release name of DotLn-Angular (planning document §6
D9).

**Operator-review assumptions:** the operator accepts `Launchpad` as the
exact name (the dispatch's word) and the next patch version for this order;
the operator merges the pull request with a merge commit and dispatches
`resume: release close`, whose Release is the first titled `Launchpad`.
