# WO-004 records

This branch files the instance records of WO-004, the first target order of this instance: the scaffold of the DotLn-Angular workspace, reviewed and published to `DylanBWood/DotLn-Angular` as the pull request `feat: scaffold the Nx and Angular workspace`. No code of this instance changes; the branch carries the control segment, the evidence and the write-backs the order names.

## What a reviewer gets

- The order's [evidence](../../evidence/WO-004/README.md) with the version observation, the local checks, both declared gate rows and the interim draft record; the executor [handoff](../../evidence/WO-004/handoff.md) and [self-review](../../evidence/WO-004/self-review.md); and the draft pull request's captured threads and their routing in [preview-pr.json](../../evidence/WO-004/preview-pr.json).
- Decisions D001 to D016, verification VER-001 (pass, four follow-ups) and final review FINAL-001 (pass, one finding repaired in the target) are filed under `docs/dotln/` in the target branch by the records commit; the publication bodies [PR.md](PR.md), [RELEASE-NOTES.md](RELEASE-NOTES.md) and this file stay beside the report path here.
- The refreshed [repository profile](../../repositories/dotln-angular.md): the `Checked` line names the reviewed commit and the observed versions, the commands table and startup are confirmed against the scaffold, and the two upstream references name an existing tag and a path present at it.
- The control segment `docs/control/orders/WO-004.jsonl`, the current-state projection, the work-order index and history, the decisions index and the follow-up register with four rows settled (the profile references, the formatter exclusion for `docs/dotln/`, the interim-route actor question answered by the operator, and the clone record WO-003 waited for).

## Validation

- The target's declared review gate passed at the reviewed commit `3e1c3d18` with no tracked-byte mutation; the final review reran lint and test without the Nx cache, the tooling tests, the fixture check, the e2e type check and the format checks at the same tree.
- Criteria 1 to 5 and 7 are met; criterion 6 is unmet, waived by the operator at verification (its draft was ordered after the pass) and then observed on draft #1 with a completed title-workflow run and the `:sparkles:` title.
- Gates in this worktree at the reviewed records: `npm run test:docs` and `npm test -- --review` passed, as FINAL-001 records; `git diff --check` clean; `node scripts/harness.mjs check` passed; `npm run release -- check-surfaces --local` passed every rule; `npm run publication:check` reports no editions declared.

## Limits and follow-ups

- Three follow-ups stay open: the title workflow on fork pull requests (D010), recording the work-in-progress draft rule in the operator record and the orders' interim route (D012), and a ready trusted-repo entry so no order needs a manual command (D013).
- After the merge, `resume: release close` in `main` closes the target worktree with the no-release outcome; the clone's `main` checkout carries an untracked `.angular/` directory that the merged `.gitignore` covers.
- Base: this branch starts at `main`'s current head, so the pull request carries only WO-004's own records commit. No operator action is required beyond merging with a merge commit.
