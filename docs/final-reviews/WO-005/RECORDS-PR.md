# WO-005 records

This branch files the instance records of WO-005, the foundation libraries of DotLn-Angular, reviewed and published to `DylanBWood/DotLn-Angular` as the pull request `feat: add the core, utils and i18n foundation libraries`. No code of this instance changes; the branch carries the control segment, the evidence, the write-backs the order names and the first live observation of the kit's publication admission.

## What a reviewer gets

- The order's [evidence](../../evidence/WO-005/README.md) with the preflight, gate and lifecycle record; the executor [handoff](../../evidence/WO-005/handoff.md) and [self-review](../../evidence/WO-005/self-review.md); the draft body the verifier published; and the draft pull request's captured state and routing in [preview-pr.json](../../evidence/WO-005/preview-pr.json), which also records that no automated reviewer ran on it.
- [Decisions](../../evidence/WO-005/decisions.md) D001 to D024: the executor's design choices and worker dispositions, the verifier's seven follow-ups, the draft-publish observation (the hook admitted the helper form, no host prompt, both interim trust entries present), the integration record, the three final-review repairs, the operator's three conventions boarded as follow-ups, and the register dispositions.
- Verification VER-001 (pass, seven follow-ups) and final review FINAL-001 (pass, three follow-ups repaired in the target, four boarded, three new-scope conventions boarded) are filed under `docs/dotln/` in the target branch by the records commit; the publication bodies [PR.md](PR.md), [RELEASE-NOTES.md](RELEASE-NOTES.md) and this file stay beside the report path here.
- The refreshed [repository profile](../../repositories/dotln-angular.md): the `Checked` line names the reviewed commit and the added dependencies, the commands section names the six added commands and the cache finding with its whole cost, and the branch policy and release-close sections stand as WO-011 left them.
- The control segment `docs/control/orders/WO-005.jsonl`, the current-state projection, the work-order index and history, the decisions index and the follow-up register with its dispositions (three rows settled by the repairs, one deferred again to WO-006's draft publish, three new rows for the operator's conventions).

## Validation

- The target's declared review gate passed at the reviewed commit with no tracked-byte mutation; the final review reran the uncached `tools:lint` target and the format check after its fix, and the verification's uncached runs cover the rest.
- All eight criteria are met; no waiver, correction or override was recorded.
- Gates in this worktree at the reviewed records: `npm run test:docs` passed, as FINAL-001 records; the executor's complete `npm test -- --review` row stands at the unchanged code identity; `git diff --check` clean; `node scripts/harness.mjs check`, `npm run release -- check-surfaces --local` and `npm run publication:check` passed after the no-op integration.

## Limits and follow-ups

- Seven follow-ups stay open: the readonly rule's scope, the production bundle's Ramda footprint (planning route), the structural checks' unjudged forms, house rule 15's missing edge, and the operator's three conventions (inline-template layout, three import sections, helper types once per library).
- The interim trust entries were present at the draft publish, so the host's handling of the hook's admission without them is unobserved; the next planning pass rules on the entries and WO-006's draft tests the result.
- After the merge, `resume: release close` in `main` closes the target worktree with the no-release outcome. Base: this branch starts at `main`'s current head, so the pull request carries only WO-005's own records.
