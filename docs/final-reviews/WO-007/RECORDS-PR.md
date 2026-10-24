# WO-007 records

This branch files the instance records of WO-007, the events, stores and data access of DotLn-Angular, reviewed and published to `DylanBWood/DotLn-Angular` as the pull request `feat: add events, signal stores, data access and MSW`. No code of this instance changes; the branch carries the control segment, the evidence, the profile write-back the order names, the draft publish's host observations and the final review's records.

## What a reviewer gets

- The order's [evidence](../../evidence/WO-007/README.md) with the implementation and repair record; the executor [handoff](../../evidence/WO-007/handoff.md) and [self-review](../../evidence/WO-007/self-review.md); the draft body the verifier wrote; the draft pull request's captured state and the operator's two routed notes in [preview-pr.json](../../evidence/WO-007/preview-pr.json), which also records that no automated reviewer ran on it; and the [host qualification](../../evidence/WO-007/host-qualification.md) of the draft publish (admitted by the hook, allowed by the host without a prompt) and of the final publish.
- [Decisions](../../evidence/WO-007/decisions.md) D001 to D020: the executor's design choices and worker dispositions, the verifier's blocking regression and three follow-ups, the repair's five decisions and the operator's spacing direction, the integration record, the operator's two notes routed, the six verification observations boarded, and the register dispositions.
- Verification VER-001 (fail, one regression since repaired), VER-002 (pass, no finding) and final review FINAL-001 (pass, nothing fixed, the notes and observations boarded) are filed under `docs/dotln/` in the target branch by the records commit; the publication bodies [PR.md](PR.md), [RELEASE-NOTES.md](RELEASE-NOTES.md) and this file stay beside the report path here.
- The refreshed [repository profile](../../repositories/dotln-angular.md): the `Checked` line names the reviewed commit and the added dependencies, the startup, data-path and architecture sections name the stores, the event group, the interceptors, the persisted-state feature and the handler path, and the upstream references name the NgRx and toolkit versions.
- The control segment `docs/control/orders/WO-007.jsonl`, the current-state projection, the work-order index and history, the decisions index and the follow-up register with its dispositions (three draft-publish rows deferred with the observation, two new rows deferred).

## Validation

- The target's declared review gate (install, lint, test, format, build, e2e, visual) passed at the reviewed commit's tree with no tracked-byte mutation, recorded by the repair session and re-verified uncached by VER-002; the final review changed no target byte and adopted the draft commit as the reviewed commit.
- All nine criteria are met; no waiver, correction or override was recorded.
- Gates in this worktree at the reviewed records: `npm run test:docs` passed, as FINAL-001 records; a target order acquires no launchpad complete gate, and the records branch changes no launchpad code byte; `git diff --check` clean; `node scripts/harness.mjs check`, `npm run release -- check-surfaces --local`, `npm run publication:check` and `npm run plan -- check` passed after the no-op integration.

## Limits and follow-ups

- Deferred in the register: the three draft-publish rows (the literal host-rules fallback and the registration trust entry), whose condition did not occur because the hook's admission carried the publish and the host allowed it; the `withCommand` strategy option from the operator's note; and the six verification observations (the navigation store's single route, the persisted default written at creation, the two dismissal paths, devtools decided at runtime, the toast without a story or axe check, the unused error-handler kit), each for the first order that touches its surface.
- After both merges, the operator fast-forwards `main`, runs the bootstrap and dispatches `resume: release close` in `main`, which closes the target worktree with the no-release outcome and the target's own release under WO-012's policy, rendering the reviewed notes. Base: this branch starts at `main`'s current head, so the pull request carries only WO-007's own records.
