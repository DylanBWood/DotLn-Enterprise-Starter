# WO-010 evidence

Dispatch: `resume: next`, 2026-10-20 UTC. Release target: `Launchpad v0.3.1`.

The fork already had its active default-branch ruleset. The session retains
it and applies the authorized ruleset and head-branch deletion setting to
DotLn-Angular. The two input files contain the order's expected policy;
only `ruleset-dotln-angular.json` is submitted by this executor.

## Command evidence

The following outputs are captured directly from the named commands.
Readback JSON files preserve the branch endpoint's response; formatting may
change whitespace only. Ruleset detail queries separately establish the
name, target, enforcement, branch conditions and visible bypass list.

### 2026-10-20T04:02:51.948790+00:00

```sh
gh api user --jq .login
```

```text
DylanBWood
```

Exit: 0.

### 2026-10-20T04:02:52.337497+00:00

```sh
gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter --jq '{default_branch,permissions,delete_branch_on_merge}'
```

```text
{"default_branch":"main","delete_branch_on_merge":false,"permissions":{"admin":false,"maintain":false,"pull":true,"push":true,"triage":true}}
```

Exit: 0.

### 2026-10-20T04:02:52.648236+00:00

```sh
gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter/rulesets --jq '[.[] | {id,name,target,enforcement,source_type}]'
```

```text
[{"enforcement":"active","id":25354095,"name":"main","source_type":"Repository","target":"branch"}]
```

Exit: 0.

### 2026-10-20T04:02:52.993904+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular --jq '{default_branch,permissions,delete_branch_on_merge}'
```

```text
{"default_branch":"main","delete_branch_on_merge":false,"permissions":{"admin":true,"maintain":true,"pull":true,"push":true,"triage":true}}
```

Exit: 0.

### 2026-10-20T04:02:53.264107+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular/rulesets --jq '[.[] | {id,name,target,enforcement,source_type}]'
```

```text
[]
```

Exit: 0.

### 2026-10-20T04:02:53.577852+00:00

```sh
gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter/rules/branches/main
```

```text
[{"type":"deletion","ruleset_source_type":"Repository","ruleset_source":"dylanwoodconsulting/DotLn-Enterprise-Starter","ruleset_id":25354095},{"type":"non_fast_forward","ruleset_source_type":"Repository","ruleset_source":"dylanwoodconsulting/DotLn-Enterprise-Starter","ruleset_id":25354095},{"type":"pull_request","parameters":{"required_approving_review_count":0,"dismiss_stale_reviews_on_push":false,"required_reviewers":[],"require_code_owner_review":false,"require_last_push_approval":false,"required_review_thread_resolution":false,"require_extra_approval_for_unattributed_changes":true,"allowed_merge_methods":["merge"]},"ruleset_source_type":"Repository","ruleset_source":"dylanwoodconsulting/DotLn-Enterprise-Starter","ruleset_id":25354095}]
```

Exit: 0.

### 2026-10-20T04:02:53.875535+00:00

```sh
gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter/rulesets/25354095 --jq '{id,name,target,enforcement,bypass_actors_present: has("bypass_actors"),bypass_actors,conditions}'
```

```text
{"bypass_actors":null,"bypass_actors_present":false,"conditions":{"ref_name":{"exclude":[],"include":["~DEFAULT_BRANCH"]}},"enforcement":"active","id":25354095,"name":"main","target":"branch"}
```

Exit: 0.

### 2026-10-20T04:02:54.303668+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular/commits/main/check-runs --jq '[.check_runs[] | {name,app: {slug: .app.slug,id: .app.id},conclusion}]'
```

```text
[{"app":{"id":15368,"slug":"github-actions"},"conclusion":"success","name":"checks"}]
```

Exit: 0.

### 2026-10-20T04:02:54.647515+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular --jq .permissions.admin
```

```text
true
```

Exit: 0.

### 2026-10-20T04:02:54.924514+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular/rulesets --jq '[.[] | select(.name=="main") | .id]'
```

```text
[]
```

Exit: 0.

### 2026-10-20T04:02:55.761833+00:00

```sh
gh api -X POST repos/DylanBWood/DotLn-Angular/rulesets --input docs/evidence/WO-010/ruleset-dotln-angular.json --jq '{id,name,enforcement}'
```

```text
{"enforcement":"active","id":25452385,"name":"main"}
```

Exit: 0.

### 2026-10-20T04:02:56.383765+00:00

```sh
gh api -X PATCH repos/DylanBWood/DotLn-Angular -F delete_branch_on_merge=true --jq .delete_branch_on_merge
```

```text
true
```

Exit: 0.

### 2026-10-20T04:02:56.707375+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular/rules/branches/main
```

```text
[{"type":"deletion","ruleset_source_type":"Repository","ruleset_source":"DylanBWood/DotLn-Angular","ruleset_id":25452385},{"type":"non_fast_forward","ruleset_source_type":"Repository","ruleset_source":"DylanBWood/DotLn-Angular","ruleset_id":25452385},{"type":"pull_request","parameters":{"required_approving_review_count":0,"dismiss_stale_reviews_on_push":false,"required_reviewers":[],"require_code_owner_review":false,"require_last_push_approval":false,"required_review_thread_resolution":false,"require_extra_approval_for_unattributed_changes":true,"allowed_merge_methods":["merge"]},"ruleset_source_type":"Repository","ruleset_source":"DylanBWood/DotLn-Angular","ruleset_id":25452385},{"type":"required_status_checks","parameters":{"strict_required_status_checks_policy":false,"do_not_enforce_on_create":false,"required_status_checks":[{"context":"checks","integration_id":15368}]},"ruleset_source_type":"Repository","ruleset_source":"DylanBWood/DotLn-Angular","ruleset_id":25452385}]
```

Exit: 0.

### 2026-10-20T04:02:56.994058+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular/rulesets/25452385 --jq '{id,name,target,enforcement,bypass_actors_present: has("bypass_actors"),bypass_actors,conditions}'
```

```text
{"bypass_actors":[],"bypass_actors_present":true,"conditions":{"ref_name":{"exclude":[],"include":["~DEFAULT_BRANCH"]}},"enforcement":"active","id":25452385,"name":"main","target":"branch"}
```

Exit: 0.

### 2026-10-20T04:02:57.339487+00:00

```sh
gh api repos/DylanBWood/DotLn-Angular --jq .delete_branch_on_merge
```

```text
true
```

Exit: 0.

## Comparison evidence

The declared rule-type listing, three acceptance comparisons, and eight
controlled comparator cases ran from a session-scratch script under
`node scripts/harness.mjs bounded -- node`. Each negative case changes a
copy of the Angular readback in the system temporary directory; the copies
were removed. The three acceptance comparisons invoke
`node docs/evidence/WO-010/compare-rules.mjs` with the fork input twice, then
each input/readback pair.

```text
ruleset-dotln-angular deletion,non_fast_forward,pull_request,required_status_checks
ruleset-fork deletion,non_fast_forward,pull_request
fork self-comparison: match; exit 0
dotln-angular live readback: match; exit 0
fork live readback: match; exit 0
reordered rules: match; exit 0
changed merge method: differ; exit 1
changed check integration: differ; exit 1
missing rule: differ; exit 1
extra rule: differ; exit 1
duplicate rule: differ; exit 1
missing required parameter: differ; exit 1
malformed JSON: differ; exit 1
```

## Policy and provenance

| Repository | Ruleset | Executor action | Bypass evidence |
| --- | --- | --- | --- |
| DotLn-Angular | `25452385`, `main`, active | Created as `DylanBWood`; enabled automatic head-branch deletion | Ruleset endpoint returns `bypass_actors: []` |
| Fork | `25354095`, `main`, active | Retained settings applied by the operator through the owner web login | Operator-supplied settings screenshot shows an empty bypass list |

The fork's ruleset targets only the default branch, with no exclusions.
Its branch-rule readback matches every declared rule and parameter. The
current CLI account's admin permission is false, so the detail endpoint
omits `bypass_actors`; the projected null above is **not** an empty-list
readback. On 2026-10-20 the operator supplied the settings screenshot in
this session, showing the fork's active `main` ruleset, default-branch
selection and empty bypass list. The executor inspected it. The original is
retained only in ignored intake as `docs/intake/wo010-fork-bypass.png`,
SHA-256 `9f3bf3d26b368affc4c29c7e848b919c2ea483632d67db4efbb75d35049ba10a`.
This is UI evidence for the bypass list, not an API observation. No account
switch or fork write was needed. The operator identified `dylanwoodconsulting`
as the web account used to apply the fork ruleset, avoiding additional CLI
admin rights or an organization arrangement. This is operator attestation,
not an API actor-history observation; the clarification is retained in
ignored `docs/intake/notes/wo010-fork-settings-origin.md`, SHA-256
`2fe98b3bd405c9e99b541c2b7d81189c521c10a7d558304eea1afb9b2bcb7411`.
The operator subsequently accepted leaving
the fork's automatic head-branch deletion setting off, as the order directs.

The comparator accepts a ruleset object or the branch endpoint's rule array.
It checks unique rule types, the exact rule-type set and deep equality of
each expected parameter. It does not judge ruleset metadata or bypass
actors; the separate evidence above does. GitHub adds `required_reviewers:
[]` and `require_extra_approval_for_unattributed_changes: true` to both
pull-request readbacks. These extra parameters are retained in the evidence
and are outside the order's declared parameter comparison. GitHub documents
that the extra-approval option has no effect when the
configured approval count is zero. [Additional approval for unattributed
Copilot pull requests](https://docs.github.com/en/enterprise-cloud%40latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets#additional-approval-for-unattributed-copilot-pull-requests).

Sources checked on 2026-10-20: [GitHub repository rules REST
reference](https://docs.github.com/en/rest/repos/rules), [available
rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
and [repository settings REST
reference](https://docs.github.com/en/rest/repos/repos#update-a-repository).
Context7 resolved `/websites/github_en_rest` and supplied the ruleset and
head-branch deletion documentation. The ruleset reference expressly limits
bypass-list visibility to a user with write access to the ruleset.

No push probe was run against either `main`. The order chooses endpoint
readback as its evidence and rejects a probe that might land a commit.

Probe correction: an initial bounded invocation supplied JavaScript on
stdin and returned no case output, so it supplied no test evidence. The
successful comparison run used a script file in session scratch and printed
every case shown above.

## Local checks

`npm test -- --list` lists the six structural checks and `kit-verify`.
The current executor rule uses one complete background `npm test -- --review`
run; separate focused preflight executions are not duplicated. The final
handoff records that run and the document check consumed by completion.

The pre-gate local checks passed: `npm run publication:check` reported no
editions declared, and `npm run work-orders -- index --check` reported both
indexes current. The worktree material inventory returned `[]` (no nested
repositories). [Self-review](self-review.md) records both worker reports and
the one evidence-method limitation.

The complete background run finished successfully, observed with
`node scripts/harness.mjs evidence --wait --timeout 1200`:

```sh
npm test -- --review
```

```text
npm test: 7 passed; 0 failed; 12.14 s; 7 fresh tasks
```

Exit: 0. [gate-summary.json](gate-summary.json) retains the review selection,
identity, measurement cutoff and complete coverage. The final document row
is consumed and referenced by the implementation-ready control event;
[handoff.md](handoff.md) carries all six criterion judgments.
