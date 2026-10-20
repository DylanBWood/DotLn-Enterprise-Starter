## Release overview

This release puts `main` of this launchpad and of DotLn-Angular under rules GitHub enforces. Each repository's `main` now accepts a change only through a pull request merged as a merge commit, and it refuses force pushes and deletion. DotLn-Angular's `main` also requires its `checks` CI run to pass, and DotLn-Angular deletes a pull request's head branch when it merges. Neither ruleset has a bypass actor, so the rules bind the operator's own account, as they would in a real organization. It is for the operator and every session that publishes to either repository: the workflow stays the same, but GitHub now enforces it instead of convention. `Launchpad v0.3.1` is a patch release: the change is to the two repositories' settings, recorded with GitHub's readback, and no launchpad code changes.

## Read before upgrading

Authority change: the rules bind every account, including the operator's. A recovery that must push to `main` directly first disables that repository's `main` ruleset in GitHub's settings; the rules do not prevent that. Squash and rebase merges are refused on both `main` branches, and merge commits are the only accepted method. A DotLn-Angular pull request cannot merge until its `checks` run passes. Other branches (order branches, published change branches, `planning/` and `chore/starter-update-*`), tags and Releases are unaffected. There is no breaking contract, schema change, data migration or launchpad code change. Required operator action after the merge: `resume: release close` in `main`.

## Substantive changes

- DotLn-Angular repository rules: the active ruleset `main` (id 25452385) on the default branch requires a pull request with no approving review and allows only merge commits. It requires `checks` from GitHub Actions (app 15368) without requiring the branch to be up to date, refuses force pushes and deletion, and lists no bypass actor. Head branches are deleted on merge.
- This launchpad's repository rules: the operator applied the active ruleset `main` (id 25354095) on 2026-10-18. It carries the same rules without the status check, because this repository has no CI, and lists no bypass actor. This release records and verifies it.
- Records: the declared policy files, the branch-rule readbacks and their comparison script under `docs/evidence/WO-010/`, and DotLn-Angular's profile stating the rules in force.

## Progressive polish

None.

## Evidence and compatibility

- Source: the `wo-010` branch over `main` at `5037ba8`; release close produces the tag and manifest from the final-review record.
- Records: WO-010 (`docs/work-orders/WO-010-protect-main-both-repositories.md`); evidence and decisions WO-010-D001 to D007 under `docs/evidence/WO-010/`; verification VER-001 (pass, with one follow-up finding fixed in evidence) and final review FINAL-001 (pass, no finding) beside these notes.
- Readback: on 2026-10-20, `GET /repos/{owner}/{repo}/rules/branches/main` returned exactly the committed readbacks for both repositories, and any account with read access can repeat it. The ruleset detail and GraphQL readbacks show both rulesets active with zero bypass actors.
- Gates at the reviewed revision. `npm test -- --review`: 7 passed, 0 failed (the six structural checks and `kit-verify`), recorded at the branch's code identity, which integrating `main` left unchanged. `npm run test:docs` passed after the last document edit. `node scripts/harness.mjs check`: 34 generated surfaces. `npm run release -- check-surfaces --local`: 48 rules passed, 0 failed. Component versions are unchanged from `v0.3.0`, because no component source changed.
- Known limitations: GitHub hides the fork's bypass list from a push-only account, so its emptiness rests on the GraphQL count and the operator's screenshot. GitHub adds `require_extra_approval_for_unattributed_changes: true` to both pull-request rules; its documentation says the matching option has no effect when zero approvals are required. DotLn-Angular's next pull request is the first live test of the `checks` requirement.
