# WO-010

`main` in this launchpad and in DotLn-Angular now has an active GitHub ruleset. A change reaches `main` only through a pull request merged as a merge commit, and force pushes and branch deletion are refused. On DotLn-Angular, the `checks` CI run must also pass before a merge. Neither ruleset has a bypass actor, so the rules bind the operator's own account too: the standard the operator set for both repositories, now enforced by GitHub rather than by convention. DotLn-Angular also deletes a pull request's head branch when it merges. Each setting was read back through GitHub's own endpoints, and the readbacks are committed. No launchpad code or kit file changes; this is the patch release `v0.3.1`.

## What a reviewer gets

- The declared policy, the exact bytes submitted to GitHub: [`ruleset-dotln-angular.json`](../../evidence/WO-010/ruleset-dotln-angular.json) has four rules: `deletion`, `non_fast_forward`, `pull_request` (zero required approvals, `allowed_merge_methods: ["merge"]`) and `required_status_checks` (`checks` from GitHub Actions, app 15368, without requiring an up-to-date branch). [`ruleset-fork.json`](../../evidence/WO-010/ruleset-fork.json) has the same rules minus the status check, because this repository has no CI. Both target `~DEFAULT_BRANCH` with `enforcement: active` and `bypass_actors: []`.
- The live branch-rule readbacks, byte-identical to GitHub's responses: [`readback-dotln-angular.json`](../../evidence/WO-010/readback-dotln-angular.json) (ruleset `25452385`) and [`readback-fork.json`](../../evidence/WO-010/readback-fork.json) (ruleset `25354095`). [`compare-rules.mjs`](../../evidence/WO-010/compare-rules.mjs) prints `match` only when every expected rule type appears exactly once with equal expected parameters and the readback has no other rule type.
- [DotLn-Angular's profile](../../repositories/dotln-angular.md), §Branch and pull-request policy, now states the rules in force and the head-branch setting and cites the readback. This replaces the sentence that anticipated this order.
- How each ruleset got there. This order created DotLn-Angular's as `DylanBWood`, who holds admin there, and turned on head-branch deletion with one API call. The fork's ruleset was already in place: the operator applied it on 2026-10-18 through the owning account's web login, a route the order allows. Its readback matches the declared file, so the order kept it without a write. The [evidence README](../../evidence/WO-010/README.md) keeps API readbacks, the operator's screenshot and the operator's statement apart.
- Records: [decisions](../../evidence/WO-010/decisions.md) D001 to D007, the executor [handoff](../../evidence/WO-010/handoff.md), the verification [VER-001](../../verifications/WO-010/VER-001.md) (pass, with one follow-up finding fixed in evidence as D006), the final review [FINAL-001](FINAL-001.md) (pass, no finding) and the [release notes](RELEASE-NOTES.md) for `v0.3.1`.

## Validation

- All six criteria are met. The reviewer reproduced them live on 2026-10-20 from 11:58Z. The two policy files parse and list exactly the declared rule types, and the comparator agrees with itself. Both `rules/branches/main` responses are byte-identical to the committed readbacks and compare `match`, whether read with a token or without one. DotLn-Angular's `delete_branch_on_merge` is `true`. The profile names the readback and the four rule types, and `npm run work-orders -- index --check` passes. `npm test -- --review` and `npm run test:docs` pass at the final identity.
- Beyond the criteria: both rulesets are `active`, target only the default branch, and report `current_user_can_bypass: never`. GraphQL counts zero bypass actors on both, including the fork, whose REST detail hides the list from a push-only account. Each repository has exactly one ruleset across branch, tag and push targets, and no classic branch protection. The `wo-010`, `<type>/<slug>`, `planning/` and `chore/starter-update-*` branch names carry no rules. The merge settings and the fork's head-branch setting are unchanged, as the order's non-goals require. Pull requests #8, #9 and #10 merged into the fork's `main` under its ruleset, each as a two-parent merge commit.
- The verifier attacked the comparator with 26 variations, all of which print `differ`, and found its one blind spot (F1): it compares rules only, so a copy of a policy file with `enforcement` changed still prints `match`. This is by design, because the branch endpoint returns rules from active rulesets only. D006 records that whether a ruleset is active rests on the ruleset readbacks, never on the comparator alone.
- Gates at the reviewed revision. `npm test -- --review`: 7 passed, 0 failed (the six structural checks and `kit-verify`), recorded at this branch's code identity, which the gate block below cites. Integrating `main` left that identity unchanged, because both were the same commit and nothing merged. `npm run test:docs` passed after the last document edit. `npm run release -- check-surfaces --local`: 48 rules passed, 0 failed. `node scripts/harness.mjs check`: 34 generated surfaces. `npm run format:check` and `git diff --check` are clean.

## Limits and follow-ups

- The rules bind the operator too. An authorized recovery that must push to either `main` first has to disable that repository's ruleset in GitHub's settings. Every DotLn-Angular pull request now waits for its `checks` run. CI runs that job on every pull request, but no pull request has been opened there since the ruleset was created, so the next one is the first live test of the requirement; D006 names it as a reopening condition.
- GitHub adds two pull-request parameters to both readbacks that the files do not set: `required_reviewers: []` and `require_extra_approval_for_unattributed_changes: true`. GitHub's rules page documents a matching option, on by default, that requires an extra approval on Copilot pull requests not attributed to a person, and says it has no effect when zero approvals are required, as here. The REST reference does not yet list the parameter, so the link between the two is inferred from the name and the default.
- GitHub's permission model hides the fork's bypass list from the CLI account. The empty list rests on the GraphQL count, `current_user_can_bypass: never` and the operator's screenshot, which agree. That the owning account created the fork's ruleset is the operator's statement: the ruleset history endpoint is closed to a push-only account.
- Not included, as the order's non-goals: required approvals, conversation resolution, signed commits, linear history, CI on the fork, the fork's head-branch setting, tag rules and any change to the merge settings. The pending follow-up row `FUP-4c3c0351adc4c2cc` matched this order only by its id and stays pending.
- Base: this branch starts at `main`'s current head, so the pull request carries only WO-010's own commits. No operator action is needed beyond merging with a merge commit, which the fork's ruleset now requires. After the merge, `resume: release close` in `main` publishes `v0.3.1`.

<!-- dotln-process-meter:start -->

Observation cutoff: 2026-10-20T11:55:45.734Z; source: canonical control events and the recorded gate, usage and harness observations collected by npm run meta.

| Work | Phase ms / attempts | Gate ms | Read files / bytes | Observed tokens / USD | Declared prompt tokens | Corrections | Directions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-001 | 5,470,464 / 3 |  |  /  |  /  |  |  | 4 |
| WO-003 | 9,490,738 (Δ 4,020,274) / 5 | 1,279 | 8 / 159,118 | 31,977,790 /  | 768 | 2 | 3 (Δ -1) |
| WO-004 | 4,813,621 (Δ -4,677,117) / 3 |  |  /  |  /  |  |  | 1 (Δ -2) |
| WO-009 | 2,974,823 (Δ -1,838,798) / 3 | 254,874 | 6 / 62,276 | 11,284,973 /  | 768 | 0 | 0 (Δ -1) |
| WO-010 | 2,686,172 (Δ -288,651) / 2 | 12,139 (Δ -242,735) | 6 (Δ 0) / 82,100 (Δ 19,824) | 18,548,547 (Δ 7,263,574) /  | 768 (Δ 0) | 2 (Δ 2) | 0 (Δ 0) |

| Dispatch | Wall ms (Δ) | Context bytes (Δ) | Commands (Δ) | Tokens (Δ) | Steps (Δ) | USD (Δ) / declared prompt tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| WO-010/executor | 669,649 (Δ -178,918) |  |  | 6,762,095 (Δ 2,352,486) | 55 (Δ 16) |  / 768 |
| WO-010/verifier | 2,016,523 (Δ 1,534,565) | 21,655 (Δ 14,313) | 59 (Δ 0) | 11,696,048 (Δ 5,017,626) | 74 (Δ 11) |  /  |
| WO-010/reviewer | 12,954 (Δ -1,631,344) |  | 37 (Δ -27) | 90,404 (Δ -106,538) | 38 (Δ -27) |  /  |

60 unavailable observations omitted as blank cells or rows; unavailable is not zero; unset ceilings are not approvals of a future limit.

<!-- dotln-process-meter:end -->
