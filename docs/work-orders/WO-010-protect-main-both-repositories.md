# WO-010 — Protect `main` in both repositories: one active ruleset on the default branch of `dylanwoodconsulting/DotLn-Enterprise-Starter` and of `DylanBWood/DotLn-Angular` (a pull request required, merge commits only, the CI check where one exists, no force pushes, no deletions), head branches deleted on merge in DotLn-Angular, each setting read back through GitHub's own endpoint (v0.3.1)

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh; verifier xhigh; reviewer xhigh.
**Track:** machinery
**Release classification:** patch. Evidence-only: a change to two GitHub
repositories' settings, recorded with its readback; no code in this
launchpad changes.
**Cost:** adds two ruleset files, two readback files and one comparison
script under `docs/evidence/WO-010/` (about 5 KB), a paragraph in
`docs/repositories/dotln-angular.md`, and this order's evidence. Removes
nothing. Wall-clock: about 30 to 60 minutes of executor work plus the fixed
cycle; unknown until run. Context bytes: planning document §4 and §6, the
repository profile, the operator record, this order, about 30 KB. Commands
added: none. Tokens: unknown until run. Steps: 9. Re-mints: none; no
registered evidence source, feedback source or machinery suite source is
edited, so `npm test` without `--review` is the product gate.
**Nomination provenance:** the 2026-10-18 main-rules planning pass
([planning document](../planning/main-rules-and-platform-items-2026-10-18.md)
§4, §5 and §6 D1, D2 and D10), on the operator's dispatch of 2026-10-18
captured verbatim in ignored intake
(`docs/intake/notes/planning-main-rules-2026-10-18.md`, SHA-256
`222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`),
paraphrased: protect `main` in this fork and in DotLn-Angular; and the
platform pass's routed item 6 (the head-branch setting), in the same
capture. Planner-synthesized. Opaque
identifier, not a priority. Clean-room screen: the operator's own public
repositories and accounts; GitHub's public documentation. Amended by the
2026-10-19 latest-upstream planning pass
([planning document](../planning/latest-upstream-2026-10-19.md) §6 D7): the
Preflight line names the suites starter v0.85.0 lists (`harness` is no
longer one).
**Depends on:** nothing typed. Sequenced after WO-009 (planning document §6
D13); no edge.

<!-- dotln-dependencies:start -->
[]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** the planning document §4 (the observed
repository state and the GitHub rules contract, read 2026-10-18) and §6 D1,
D2, D10; `docs/repositories/dotln-angular.md` §Branch and pull-request
policy; `docs/operator/README.md` §Standing preferences; the GitHub REST
reference "Repository rules" (create a repository ruleset; get rules for a
branch) and "Available rules for rulesets"; 07-execution-guide.md §Preflight
before the full gate and §Discipline.

**Objective:** after this order merges, each repository's `main` accepts
changes only through a pull request merged as a merge commit, refuses force
pushes and deletion, requires DotLn-Angular's `checks` run to pass, and
DotLn-Angular deletes a pull request's head branch on merge; both rulesets
are active with no bypass actor, so the rules bind the operator's own
account; each setting is proved by GitHub's readback recorded in this order's
evidence, and the repository profile states the policy in force.

**Observed gap (dated 2026-10-18, main at `773d867`):** neither `main` is
protected: `GET /repos/{owner}/{repo}/branches/main/protection` answers
`Branch not protected` (404) on DotLn-Angular and `Not Found` (404) on the
fork for the signed-in account; `GET …/rulesets` is `[]` and
`GET …/rules/branches/main` is `[]` on both; `delete_branch_on_merge` is
`false` on both. The signed-in `gh` account `DylanBWood` holds admin on
`DylanBWood/DotLn-Angular` and push only on
`dylanwoodconsulting/DotLn-Enterprise-Starter`, whose owner
`dylanwoodconsulting` holds admin. DotLn-Angular's CI reports one check run on
`main`, `checks`, from the `github-actions` app (id 15368); the fork has no
workflow. The local commits are unsigned. Both repositories allow merge,
squash and rebase today, with merge-commit title `PR_TITLE`. No kit route
pushes to either `main`: records, planning and update branches arrive by pull
request, release close pushes a tag, the target close moves only the local
clone's base (planning document §4).

**Design:**

- One ruleset per repository, named `main`, `target` `branch`,
  `enforcement` `active`, `bypass_actors` `[]`, `conditions.ref_name.include`
  `["~DEFAULT_BRANCH"]`, with these rules:
  - `deletion` and `non_fast_forward` (no parameters);
  - `pull_request` with `required_approving_review_count` 0,
    `dismiss_stale_reviews_on_push` false, `require_code_owner_review` false,
    `require_last_push_approval` false, `required_review_thread_resolution`
    false, `allowed_merge_methods` `["merge"]`;
  - on DotLn-Angular only, `required_status_checks` with
    `strict_required_status_checks_policy` false, `do_not_enforce_on_create`
    false and `required_status_checks` `[{ "context": "checks", "integration_id": 15368 }]`.
  The two files are committed as `docs/evidence/WO-010/ruleset-dotln-angular.json`
  and `docs/evidence/WO-010/ruleset-fork.json`, exactly as above, so the
  reviewed bytes are what was applied.
- Application: `gh api -X POST repos/<owner>/<repo>/rulesets --input <file>`.
  A rerun first lists `gh api repos/<owner>/<repo>/rulesets --jq '.[] | select(.name=="main") | .id'`
  and, when an id exists, updates it with `-X PUT repos/<owner>/<repo>/rulesets/<id>`
  instead of creating a second ruleset.
- Readback: `gh api repos/<owner>/<repo>/rules/branches/main > docs/evidence/WO-010/readback-<name>.json`,
  readable by any account with read access, compared by
  `docs/evidence/WO-010/compare-rules.mjs` (committed, about 20 lines): for
  every expected rule a readback rule of the same `type` exists and each
  expected parameter equals the readback's, and the readback has no rule type
  the expected file lacks; it prints `match` or `differ` and exits 0 or 1.
- The fork needs an account holding admin (planning document §6 D2). The
  order reads `gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter --jq .permissions.admin`
  first; on `false` the executor says so and asks the operator to sign the
  owning account into `gh` in the same session (`gh auth login`, then
  `gh auth switch --user dylanwoodconsulting`), applies the file, records the
  response and switches back; if the operator prefers the UI, the file's
  rules are the checklist and the readback is the same. The fallback at
  handoff, if neither has happened, is criterion 4's recorded `blocked`.
- The head-branch setting:
  `gh api -X PATCH repos/DylanBWood/DotLn-Angular -F delete_branch_on_merge=true --jq .delete_branch_on_merge`.
  The operator may turn it on in the UI first; the step reads it back either
  way.
- Not included, each recorded in the planning document with its reopening:
  required approvals, conversation resolution, required signatures, linear
  history, a status check on the fork, `update` and `creation` rules, the
  fork's head-branch setting, tag rulesets, and any change to the merge
  settings themselves.
- What the rules leave untouched: `wo-NNN`, `<type>/<slug>`, `planning/` and
  `chore/starter-update-*` branches (pushed and force-pushed with lease as
  today), tags and Releases (release close), the local fast-forwards of the
  kit's closes. The operator can disable a ruleset in the UI for an
  authorized recovery; the rules do not stop that.

Rejected: classic branch protection (its readback needs admin, which the
verifier lacks on the fork; it does not layer); granting the session account
admin on the fork (the operator's setting, and wider than one step); a live
push probe against `main` (a refused push proves nothing a readback does
not, and an admitted one would land a commit).

**Deliverables:** the two ruleset files, the two readbacks and the
comparison script under `docs/evidence/WO-010/`; the active rulesets and the
head-branch setting on GitHub; the profile's policy paragraph; the evidence
README and decisions; the regenerated indexes.

**Execution plan:**

1. Activate: `npm run worktree -- start WO-010 docs/work-orders/WO-010-protect-main-both-repositories.md`
   from the clean main checkout. Check: `npm run resume -- status --json`
   shows WO-010 active.
2. `docs/evidence/WO-010/ruleset-dotln-angular.json` and
   `docs/evidence/WO-010/ruleset-fork.json` (new): the two documents exactly
   as the Design states; `docs/evidence/WO-010/compare-rules.mjs` (new): the
   comparison described in the Design. Check:
   `node -e "for (const f of ['ruleset-dotln-angular','ruleset-fork']) console.log(f, JSON.parse(require('fs').readFileSync('docs/evidence/WO-010/'+f+'.json','utf8')).rules.map(r => r.type).sort().join(','))"`
   prints `ruleset-dotln-angular deletion,non_fast_forward,pull_request,required_status_checks`
   and `ruleset-fork deletion,non_fast_forward,pull_request`.
3. DotLn-Angular's ruleset: `gh api repos/DylanBWood/DotLn-Angular --jq .permissions.admin`
   prints `true`; then
   `gh api -X POST repos/DylanBWood/DotLn-Angular/rulesets --input docs/evidence/WO-010/ruleset-dotln-angular.json --jq '{id, name, enforcement}'`
   (or the `PUT` rerun form). Check: the output shows `"enforcement": "active"`;
   record the id in the evidence README.
4. DotLn-Angular's head-branch setting:
   `gh api -X PATCH repos/DylanBWood/DotLn-Angular -F delete_branch_on_merge=true --jq .delete_branch_on_merge`.
   Check: prints `true`.
5. The fork's ruleset: `gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter --jq .permissions.admin`;
   on `true`, apply `docs/evidence/WO-010/ruleset-fork.json` as in step 3;
   on `false`, follow the Design's owning-account route in this session and
   record which account applied it. Check: the create or update response
   shows `"enforcement": "active"`, or the evidence README records `blocked`
   with the permission readback and the route offered.
6. Readbacks: `gh api repos/DylanBWood/DotLn-Angular/rules/branches/main > docs/evidence/WO-010/readback-dotln-angular.json`
   and `gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter/rules/branches/main > docs/evidence/WO-010/readback-fork.json`;
   then `node docs/evidence/WO-010/compare-rules.mjs docs/evidence/WO-010/ruleset-dotln-angular.json docs/evidence/WO-010/readback-dotln-angular.json`
   and the fork pair. Check: each prints `match` (the fork's prints `differ`
   only in the `blocked` case of step 5, recorded as such).
7. `docs/repositories/dotln-angular.md` (existing, §Branch and pull-request
   policy): replace the sentence labelled "after WO-010 merges" with the
   rules in force and the head-branch setting, citing the readback file.
   Check: `grep -c "readback-dotln-angular.json" docs/repositories/dotln-angular.md`
   is at least 1.
8. `docs/evidence/WO-010/decisions.md` and `README.md` (new): the decisions
   (the account that applied the fork's ruleset, any refusal met and its
   remedy, the ruleset ids) and every command output above verbatim;
   regenerate projections with `npm run work-orders -- index` and
   `npm run meta` (`npm run sync` where the kit carries it). Check:
   `npm run work-orders -- index --check` exits 0.
9. Preflight, then handoff per 07-execution-guide.md §Discipline at the kit
   revision in force: run the Preflight line, `npm run test:docs`, then
   `npm run resume -- implementation-ready` with the attestation flags.

**Preflight:** `npm test` as one complete run started directly (starter
v0.85.0's executor rule; its `kit-verify` row is the `--only kit-verify`
suite the handoff may consume, the one suite `npm test -- --list` shows
beside the six structural checks every selection runs; `harness` is no
longer a suite), then `npm run test:docs`.

**Acceptance criteria (all required)**

1. `docs/evidence/WO-010/ruleset-dotln-angular.json` and `ruleset-fork.json`
   parse, and the rule-type listing of step 2 prints exactly the two lines
   it names; `node docs/evidence/WO-010/compare-rules.mjs docs/evidence/WO-010/ruleset-fork.json docs/evidence/WO-010/ruleset-fork.json`
   prints `match` (the script agrees with itself).
2. `gh api repos/DylanBWood/DotLn-Angular/rules/branches/main` saved to the
   readback file and compared with `ruleset-dotln-angular.json` by the
   script prints `match`, and the readback names the rule types `deletion`,
   `non_fast_forward`, `pull_request` and `required_status_checks` with the
   `checks` context.
3. `gh api repos/DylanBWood/DotLn-Angular --jq .delete_branch_on_merge`
   prints `true`.
4. `gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter/rules/branches/main`
   saved to the readback file and compared with `ruleset-fork.json` prints
   `match`; or the evidence README records `blocked` with the output of
   `gh api repos/dylanwoodconsulting/DotLn-Enterprise-Starter --jq .permissions.admin`
   (`false`) and the owning-account route offered, in which case the
   operator completes the step or waives this criterion.
5. `docs/repositories/dotln-angular.md` §Branch and pull-request policy
   names the readback file and the four rule types in force, and
   `npm run work-orders -- index --check` exits 0.
6. `npm test` and `npm run test:docs` pass at the final identity, and the
   Preflight suites passed before the full run.

**Evidence gate:** the readback files, the comparison outputs and the
commands and outputs in `docs/evidence/WO-010/README.md`;
`npm run resume -- status --json` after `implementation-ready` shows the
attestation recorded.

**Known issues and carry-ins:** the fork's ruleset may need the owning
account (planning document §6 D2); the rules bind the operator too, so an
authorized recovery that must push to `main` first disables the ruleset in
the UI; the `checks` requirement blocks a DotLn-Angular pull request until
its CI run completes, which the final review waits for before merging; the
`pr-title` workflow is not required (a title the workflow cannot decorate
is a review item, not a merge blocker); this order edits no kit file and
changes nothing in this launchpad's code, so its release is a patch with
evidence only, the next patch above WO-009's `v0.3.0`.

**Non-goals:** required approving reviews; conversation resolution; signed
commits; linear history; CI on the fork; the fork's head-branch setting; tag
rules; organization-level rulesets; any change to the merge-commit title or
message settings; deleting branches.

**Operator-review assumptions:** the operator accepts that the rules bind
their own account (no bypass actor) and that `main` of both repositories
accepts merge commits only; the operator accepts the head-branch setting on
DotLn-Angular; for the fork's step the operator either signs the owning
account into `gh` in the executor's session when asked or applies the
committed file themselves, and otherwise settles criterion 4 as the order
states.
