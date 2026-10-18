# Plan refutation — 2026-10-18-planning-14fefa7dc1ee9d3b-002

Subject: `sha256:96209e0b7a8c8a97888b3574406de626081bbb477cf4eed91f44452b2da34a6c` at committed revision `903b3951f79fb11b62dc8a24ad787fc2c4a59240`.

Pass: `planning-14fefa7dc1ee9d3b` (planning). Verdict: **aligned-with-findings**.

Review source: direct harness session. Harness version, model and effort: unknown; settings verification: unverified. No CLI launch or transport acceptance is claimed.

Judgment frozen: 2026-10-18T17:11:09.281Z. Frozen result hash: `sha256:a193882724aa54588c24edec5ba60bc8b690e62f14b7a97e439581bd07b81071`. Local-terms list: **present**.

Judgment basis: canonical subject and plan-goal-review-v1 protocol. Independence is session-attested; context isolation was not enforced and model tools were available. Session statement: Independent plan refutation (Entropy Reducer, Contra-Auguste mask, architecture-and-semantics lens) of the six-order pass on planning/2026-10-18-main-rules-and-platform-items at 903b395, judged from the compiled prompt refute-prompt.json: all of its fields, including the empty standard (vision, roles and capability table unavailable), goalReview with its five cost-table trap observations, the six orders' objectives, Cost lines, criteria and non-goals, the sequence, no deferrals, and the cost table. Kit claims were checked read-only against dotln.config.json, docs/repositories/dotln-angular.md, docs/workstreams/WS-001-dotln-angular.md, scripts/lib/config.mjs (release section), scripts/lib/release-preparation.mjs, excerpts and greps of scripts/release.mjs, scripts/target-gate.mjs and scripts/lib/target-gate.mjs, scripts/worktree.mjs (publish usage and finish), scripts/lib/git.mjs, scripts/lib/target-worktree-close.mjs, scripts/lib/starter-refresh.mjs, scripts/lib/github-repository.mjs, scripts/lib/siblings.mjs, scripts/work-orders.mjs, scripts/harness.mjs, the README release block and update-pull-request section, the head of UPSTREAM.md, package.json script names and .claude/settings.json, plus git remote -v, git log --merges -5 and git status. One probe ran under node scripts/harness.mjs bounded: it read loadConfig's release.displayName (DotLn), validReleaseDisplayName('Launchpad') (true) and the six declared target-gate commands, and left the tree clean. Not read: anything under docs/planning beyond what the prompt compiled, docs/planning/refutations, docs/lineage/idea-ledger.md, docs/control/local, docs/intake, docs/evidence, the other planner files in the scratch directory, and the DotLn-Angular repository. There was no network, no model tool, no descendant and no repository or git write; the only writes are plan-result.json and this statement in the scratch directory, plus a schema validator in the session's own scratchpad. Result: plan aligned-with-findings. All six orders (WO-009, WO-010, WO-005, WO-006, WO-007, WO-008) are aligned-with-findings, with 18 known-issue findings and 0 holds, because no trap observation shows worsening and no vision passage was supplied. The main findings: WO-009 pays a full cycle for about 50 bytes. WO-010's named readback cannot prove the absence of bypass actors, its comparison script is tested only against itself, and its required checks context is not proved against a real run. WO-005 to WO-008 add house checks outside the declared gate. The starter --draft gate is missing from the sequence. Provisional bases force three re-planning refutations. WO-008's storage scan misses opaque tokens and it commits a development signing key. The host system prompt names the model claude-opus-5-5; the host reported no effort readback.

This verdict evaluates a planning horizon; it does not verify implementation or confer operator decision authority.

Scope: pass; dispatch-to-file 801687 ms. Judged 6 orders and the sequence; carried 0 unchanged verdicts by order and receipt hash.

## Validated result

```json
{
  "schemaVersion": "plan-goal-review-v1",
  "orders": [
    {
      "workOrderId": "WO-009",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "Unblocks no critical-path gate and names no blocked outcome. The supplied goal standard names the route as registration, one witnessed scaffold, then the foundation (shared libraries, component taxonomy, events and stores, client-side auth); goalReview.criticalPath is unavailable. A release name is none of these. NoOp in the records: the cost-table row for WO-009 has metrics null and no trap observation concerns release naming, so the recorded NoOp cost is none. The observable NoOp is the kit default: a bounded probe of loadConfig(...).release.displayName at 903b395 printed `DotLn`, and scripts/release.mjs (releaseDisplayName, the title line near 1702) reads the name from the configuration at the release commit, so the next tag and Release would be titled `DotLn v0.2.x`. Placement first costs the critical path little while the target gate in docs/repositories/dotln-angular.md holds (no target order activates until the starter revision carrying core WO-221's `worktree publish --draft`, which this v0.83.0 scripts/worktree.mjs does not offer); if that gate lifts first, WO-009 delays WO-005 by one full cycle.",
      "systemTraps": "Seeking the wrong goal and tragedy of the commons (material): about 50 bytes of configuration plus a regenerated README line pay the whole fixed cycle (activation, verification, final review, release close). Recorded machineryShare is 0.649 (WO-001), 0.343 (WO-003) and 0.690 (WO-004). With an estimated 15 to 30 minutes of executor work against a fixed cycle, this order's share is likely at or above the top of that range; unknown until run. Rule beating (low): criteria 1 and 2 read the configuration and the README block, not the published title, but the kit derives the title from the same configuration at the release commit, so evidence and behavior share one source. Policy resistance (none): validReleaseDisplayName accepts `Launchpad` (probe printed true) within the 64-character bound, and release prepare rewrites the block from configuration. Drift to low performance, escalation, success to the successful and shifting the burden are immaterial: no command, guard or operator step is added, the kit key already exists, and the recorded operator directions fall 4, 3, 1.",
      "removalBalance": "No. The Cost line adds one `release` section (about 50 bytes) and evidence, changes one word and the version in the README claim, and says 'Removes nothing.' The process addition (one full order cycle and one release) is larger than the product addition. A removal the Cost line could name is one fixed cycle, by folding this change into WO-010, which is also a self order that closes a release.",
      "failureBehavior": "Mostly degrades. Without the section the kit default `DotLn` applies (config.mjs validateRelease; release.mjs releaseDisplayName returns `DotLn` for a revision without the file), so removing the section restores the old behavior and earlier tags keep their names. release prepare admits an earlier spelling or name in the block and regenerates it rather than refusing. An invalid value refuses: validateRelease throws while loading, and every command that loads dotln.config.json refuses with it, so the whole control plane fails closed rather than falling back to `DotLn`. `Launchpad` is valid (probe), and criterion 1 catches a refusal before merge, so that path is guarded.",
      "findings": [
        {
          "criterionId": "criterion:4",
          "kind": "known-issue",
          "reason": "A full fixed cycle and a release are spent on a change of about 50 bytes. The recorded machineryShare series is already 0.65 to 0.69 for orders with hours of work. Folding the name into WO-010, the other self order in this pass, would pay one cycle instead of two without changing either outcome.",
          "evidence": null,
          "reopenWhen": "WO-009's cost-table row records machineryShare above 0.690 (WO-004's value), or elapsed wall-clock over two hours for a diff under 1 KB outside docs/."
        }
      ]
    },
    {
      "workOrderId": "WO-010",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "Not a step on the named dependency route. It puts the instance's stated purpose ('every change arrives as a pull request the operator reads before it merges') under the forge's enforcement instead of convention alone, and it runs before WO-005, so every foundation member merges under the rules. Its own gates are admin permission on the fork (criterion 4's blocked route) and DotLn-Angular's CI reporting a `checks` context. NoOp in the records: the row's metrics are null and no observation records a direct, force-pushed or non-merge-commit change to either main. git log --merges shows #3 to #6 as merge commits carrying PR titles, and the profile says sessions never push to main, so the recorded NoOp cost is zero incidents; the risk is that the convention fails without anyone seeing it. Kit compatibility was checked. The close and publish paths push only (a) branches (worktree.mjs publish), (b) tags (release.mjs publishTag; tag rules are a non-goal), (c) PR branches and (d) starter-refresh commits to declared export siblings' main (lib/starter-refresh.mjs); this instance declares no siblings. worktree finish and target close delete only local branches (git.mjs removeMergedBranch, target-worktree-close.mjs). The README starter update already arrives as a PR merged with a merge commit. Neither the PR requirement nor delete-on-merge breaks any observed kit path.",
      "systemTraps": "Rule beating (material): the named readback, rules/branches/main, returns the active rules and their parameters but not the ruleset's bypass_actors, which live on the ruleset object (rulesets/{id}). The objective's 'no bypass actor, so the rules bind the operator's own account' is therefore not proved by the evidence the order names. Criterion 1 only shows that compare-rules.mjs agrees with itself, so a script that printed `match` for any input would pass criteria 1, 2 and 4's comparison. The required `checks` context is compared with the file, not with a real check run's name. Policy resistance (material): if CI does not report a check named exactly `checks`, every DotLn-Angular merge is blocked with no bypass, and the WO-005 to WO-008 chain stalls at its first PR until an admin edits the ruleset outside any order. Shifting the burden to the intervenor: criterion 4's blocked route hands the fork step to the operator to complete or waive; the records show CriterionWaived 2 in WO-003 and 1 in WO-004, so a planned waiver route continues an observed pattern. Seeking the wrong goal (low): the rules in force are the outcome itself. Tragedy of the commons, drift to low performance, escalation and success to the successful are immaterial: about 30 KB of context, no new kit commands, enforcement raises the standard, and rulesets are the forge's current mechanism.",
      "removalBalance": "No. It adds two ruleset files, two readbacks, one comparison script (about 5 KB), a profile paragraph and evidence, and says 'Removes nothing.' What it actually removes goes unrecorded: the profile's convention that a session never pushes to main becomes enforced, so role text could later drop that duty. The Cost line does not claim it.",
      "failureBehavior": "Mixed. If the fork's ruleset cannot be created (no admin), criterion 4's blocked route leaves that repository as it was, with the condition recorded: a degradation. A misconfigured ruleset refuses instead: a `checks` context CI never reports, or a wrong merge-method list, blocks every merge on that main with no bypass, and recovery is an admin settings edit outside any order. The rulesets can be reversed (disabled or deleted), so the refusal is recoverable. No criterion shows that a real pull request can still merge under the new rules.",
      "findings": [
        {
          "criterionId": "criterion:2",
          "kind": "known-issue",
          "reason": "The rules/branches/main readback does not carry bypass_actors, so the claim that the rules bind the operator's own account with no bypass is asserted, not proved, by the named evidence. Reading the ruleset object would close the gap.",
          "evidence": null,
          "reopenWhen": "After WO-010 merges, reading either repository's ruleset by id shows a non-empty bypass_actors list or a current_user_can_bypass value other than `never`."
        },
        {
          "criterionId": "criterion:1",
          "kind": "known-issue",
          "reason": "The comparison script's only proof is comparing a file with itself, so a script that always prints `match` passes. Merge-method and enforcement checks rely on that script alone.",
          "evidence": null,
          "reopenWhen": "compare-rules.mjs prints `match` for a copy of ruleset-fork.json whose pull_request allowed_merge_methods or enforcement differs from the original."
        },
        {
          "criterionId": "criterion:2",
          "kind": "known-issue",
          "reason": "The required `checks` context is proved against the declared file, not against the name DotLn-Angular's CI actually reports. A mismatch would block every merge with no bypass.",
          "evidence": null,
          "reopenWhen": "The first DotLn-Angular pull request after WO-010 shows the required `checks` status as expected or pending with no run reporting under that name, or the head commit's check-runs list has no run named `checks`."
        },
        {
          "criterionId": "criterion:4",
          "kind": "known-issue",
          "reason": "The fork step has a pre-planned operator completion or waiver route, which continues the waivers recorded in WO-003 and WO-004 instead of removing operator rescue.",
          "evidence": null,
          "reopenWhen": "WO-010 closes with criterion 4 waived, and the fork's rules/branches/main readback still returns no rules at the next planning pass."
        }
      ]
    },
    {
      "workOrderId": "WO-005",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "On the named route: shared libraries are the first foundation step after the witnessed scaffold (WO-004 merged, #6), and WS-001 records the hard edge WO-005 to WO-006. Its base is set (WS-001), but docs/repositories/dotln-angular.md and WS-001 house rule 20 say no target order activates until the starter revision carrying core WO-221's `worktree publish --draft`. The usage in this v0.83.0 scripts/worktree.mjs has no `--draft`, and the compiled sequence does not list that gate. NoOp in the records: the row's metrics are null. NoOp leaves the workstream at the scaffold and stalls the critical path; no number is recorded.",
      "systemTraps": "Rule beating (material): the objective requires 'every injectable introduced has a test kit ... and a spec that uses it', but check:kits (criterion 5) proves only that TestBed specs under libs/shared spread some provide*TestKit call. An injectable with no kit, tested without TestBed or not tested, passes. Drift to low performance (material): the five new target commands are not in the registration's declared gate. dotln.config.json declares only install, lint, test, format, build and e2e, and lib/target-gate.mjs runs only those (probe confirmed), so later members' gates pass without them unless CI runs them; the compiled order does not say, and the profile lists CI running lint:fixtures, test:tooling, typecheck:e2e and boards. Policy resistance: token naming is guarded twice, by a lint rule failing on its fixture and by check:tokens on bad-token.ts (criterion 2); two guards for one rule can disagree on multi-line or nested-generic declarations. Escalation: five commands here, lint:components in WO-006, and lint:hygiene and msw:init in WO-007, so each member adds house checks and fixtures. Tragedy of the commons (low): about 80 KB of context and 4 to 6 hours on top of 28,262 cold-start bytes; tokens unknown. Success to the successful, shifting the burden and seeking the wrong goal are immaterial: Ramda, Ramda Adjunct and Transloco are the operator's house rules 7 and 9, rule 10's open choice is applied and recorded, and the work is the product outcome. Clean room: ported upstream specs keep their copyright lines and the MIT and BSD-3-Clause texts; nothing suspect appears in the compiled text, and provenance stays the operator's judgment.",
      "removalBalance": "No. It removes the placeholder's inline strings (moved to en.json) and adds three libraries, about 45 files, five dependencies, three check scripts, lint rules and five target commands. The product additions are the deliverable. The process additions have no offsetting removal, and dropping one of the two token-name guards is a removal the Cost line could have named.",
      "failureBehavior": "Declared degradations exist: the testing entry points fall back to `-testing` libraries (criterion 1), and Vitest wiring falls back to the AnalogJS plugin (house rule 5). The check scripts fail closed: a false positive in check:templates, check:tokens or check:kits blocks the order, and after WO-010 any CI-gated merge if they are wired into `checks`. No exception route is named for them, unlike rule 16's counted exceptions. Criterion 3 requires both the production and `local` builds to pass after priming. Whether the declared gate's default build in a fresh target worktree, without an ignored primed file, degrades to production or refuses is not visible in the compiled order.",
      "findings": [
        {
          "criterionId": "criterion:5",
          "kind": "known-issue",
          "reason": "check:kits tests a property of specs (a TestBed spec spreads a kit), not the objective's property of injectables (each has a kit and a spec that uses it).",
          "evidence": null,
          "reopenWhen": "An @Injectable class or InjectionToken under libs/shared has no provide*TestKit export in its library's testing entry point while `npm run check:kits` exits 0."
        },
        {
          "criterionId": "criterion:8",
          "kind": "known-issue",
          "reason": "The order's new commands run once as verification criteria but are not in the registration's declared gate, so later members' gates can pass while they fail.",
          "evidence": null,
          "reopenWhen": "At a later member's reviewed commit, `node scripts/target-gate.mjs WO-NNN --review` passes (and, after WO-010, the `checks` run passes) while any of check:tokens, check:templates, check:kits or i18n:check exits nonzero."
        },
        {
          "criterionId": "criterion:2",
          "kind": "known-issue",
          "reason": "The token-name rule is enforced by both a lint rule and a separate script, two guards that can drift apart.",
          "evidence": null,
          "reopenWhen": "The token-name lint rule and check:tokens give different results on any file in the workspace or in tools/lint-fixtures."
        },
        {
          "criterionId": "criterion:8",
          "kind": "known-issue",
          "reason": "The profile's starter gate (core WO-221's `--draft` publish form) blocks every target order, but the compiled sequence omits it, so the critical path's real next gate is outside the plan.",
          "evidence": null,
          "reopenWhen": "`npm run resume -- next` selects WO-005 while UPSTREAM.md still names v0.83.0 and the `worktree publish` usage still lacks `--draft`."
        }
      ]
    },
    {
      "workOrderId": "WO-006",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "On the named route: the component taxonomy is the second foundation step (WS-001 hard edges WO-005 to WO-006 to WO-007). Its gates are WO-005's merge, a planning pass that replaces the provisional base (WS-001: 'provisional; set when WO-005 merges', and the next planning pass sets the line and refutes the changed order), the starter `--draft` gate, and the operator's vendor confirmation (title: 'operator-confirmed vendor'; house rule 6 names PrimeNG (MIT); the profile defers the vendor and license check to this order). NoOp in the records: the row's metrics are null. NoOp leaves features without enforced roles.",
      "systemTraps": "Escalation and tragedy of the commons (material, process): each provisional base (WO-006, WO-007, WO-008) needs its own planning pass and refutation after the predecessor merges, three more passes whose material change is one Repository line. The supplied platform standard says the refutation pass must be made worth its cost before a later pass pays it again, and the records already show two planning captures on 2026-10-18. Policy resistance: R1 ('lint refuses inject( under fragments/, templates/, composites/ and layouts/') and WS-001's taxonomy table ('Salesmen may inject platform tokens only (ElementRef, DOCUMENT)') disagree for fragments and templates. Criterion 2 follows R1 strictly (no inject or constructor at all), so a template that needs ElementRef or DOCUMENT for focus handling, which criterion 5's keyboard path may require, must move or carry an exception. Drift to low performance: lint:components joins the target's checks outside the declared gate, as in WO-005. Rule beating (low): criterion 1's vendor grep reads the package name from decisions.md, and R2 and R4 stay review-only by WS-001's own declaration. Shifting the burden: vendor confirmation is an operator decision at activation. Success to the successful: the vendor is a house rule, and the wrappers keep alternatives open. Seeking the wrong goal (none): the work is the product. Context is about 120 KB and 6 to 8 hours.",
      "removalBalance": "No. It removes the WO-004 placeholder page and adds three libraries, about 60 files, the vendor dependency, @axe-core/playwright, location lint overrides and the taxonomy documents. The additions are the deliverable; no process removal is named.",
      "failureBehavior": "The vendor sits behind wrappers, so a vendor failure stays inside wrappers/ and can be swapped, which is a degradation route by design. The static-signal facade is the declared stand-in until WO-007. Location lint fails closed (R5): a misplaced file is a failure, not a warning, which is intended. If no vendor is confirmed at activation, no fallback is stated (for example house fragments without a vendor), and the order stalls on the operator.",
      "findings": [
        {
          "criterionId": "criterion:7",
          "kind": "known-issue",
          "reason": "Provisional bases force a planning pass and a refutation after each predecessor merges, three times in this chain, to change one line. WS-001 records a kit route that resolves the base at activation as an upstream candidate.",
          "evidence": null,
          "reopenWhen": "The planning pass after WO-005 merges changes only WO-006's Repository line and still pays a refutation of WO-006."
        },
        {
          "criterionId": "criterion:2",
          "kind": "known-issue",
          "reason": "R1's lint (no inject in fragments or templates) contradicts WS-001's own table (Salesmen may inject platform tokens). Criterion 2 enforces the stricter reading, which can push accessibility-driven ElementRef or DOCUMENT use into the wrong role.",
          "evidence": null,
          "reopenWhen": "A component under fragments/ or templates/ needs ElementRef or DOCUMENT and is moved to wrappers/, or carries a lint or grep exception, to pass criterion 2."
        },
        {
          "criterionId": "criterion:1",
          "kind": "known-issue",
          "reason": "The vendor is an operator confirmation at activation, with no stated fallback if it is absent or its license check fails.",
          "evidence": null,
          "reopenWhen": "At WO-006's activation, docs/evidence/WO-006/decisions.md has no operator-confirmed vendor and the order waits on the operator."
        }
      ]
    },
    {
      "workOrderId": "WO-007",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "On the named route: events and stores are the third foundation step (WS-001 hard edge WO-007 to WO-008; WO-008 adds authHttpEvents and sessionEvents to `events` and uses the stores). It also removes WO-006's declared stand-in, HomeFacade's static data. Its gates are WO-006's merge, the base-reset planning pass and the starter `--draft` gate. NoOp in the records: the row's metrics are null. NoOp leaves the stand-in facade and no data path.",
      "systemTraps": "Policy resistance (material): msw is pinned to 3.x (`~3.0.3`, or the current 3.x) and criterion 4 requires `npm ls msw` to report 3.x, but no 2.x fallback is named. This session had no network, so whether 3.x is published was not verified. Drift to low performance: rule 16 hygiene exceptions are counted and printed, never refused, and no ceiling is recorded, so the count can only rise. Escalation: lint:hygiene and msw:init join the target's checks outside the declared gate, as in WO-005. Rule beating (low, well handled): criterion 4 proves the unhandled-request option by behavior, and criterion 5 proves the mocks and every handler path are absent from the production bundle. Tragedy of the commons: about 150 KB of context and 6 to 8 hours, the second-largest in the pass; tokens unknown. Success to the successful: ngrx-toolkit or a house withCallState stays open. Shifting the burden: none. Seeking the wrong goal: none.",
      "removalBalance": "No, though it names a real removal: HomeFacade's static data, WO-006's stand-in. It adds four libraries, the MSW worker and handlers, interceptors, a hygiene script, about 70 files, three dependencies and two target commands.",
      "failureBehavior": "Degrades in development: the browser worker starts only when environment.mocks is true (criterion 4), so with mocks off, requests go through WO-005's proxy to /api, the prior behavior. In tests it deliberately refuses unhandled requests (criterion 4). If the toolkit's withCallState fails, the house implementation takes over (Cost line). The MSW 3.x pin is the one element with no degradation route.",
      "findings": [
        {
          "criterionId": "criterion:4",
          "kind": "known-issue",
          "reason": "The MSW major-version pin has no fallback. If 3.x is unavailable, or its worker API differs from the cited guides, criterion 4 cannot pass and the order refuses instead of degrading to the current 2.x line.",
          "evidence": null,
          "reopenWhen": "At WO-007's activation, the msw versions published on the registry include no 3.x release, or 3.x's setupWorker or onUnhandledRequest API differs from the guide the order cites."
        },
        {
          "criterionId": "criterion:2",
          "kind": "known-issue",
          "reason": "Hygiene exceptions are counted but never bounded, so the count can only drift upward.",
          "evidence": null,
          "reopenWhen": "The exception count that `npm run lint:hygiene` prints rises in WO-008 or a later member without a recorded decision."
        },
        {
          "criterionId": "criterion:8",
          "kind": "known-issue",
          "reason": "lint:hygiene runs as a verification criterion but is not in the registration's declared gate.",
          "evidence": null,
          "reopenWhen": "A later member's `node scripts/target-gate.mjs WO-NNN --review` passes while `npm run lint:hygiene` exits nonzero on the same commit."
        }
      ]
    },
    {
      "workOrderId": "WO-008",
      "verdict": "aligned-with-findings",
      "criticalPathAndNoOp": "The final foundation step ('a legitimate client-side authentication and permission model'). WS-001 is delivered when WO-004 to WO-008 merge, and this order unblocks the unfiled DotLn console feature the goal standard names as the product purpose. Its gates are WO-007's merge, the base-reset planning pass and the starter `--draft` gate. NoOp in the records: the row's metrics are null. NoOp leaves WS-001 undelivered.",
      "systemTraps": "Rule beating (material): criterion 1's storage scan asserts that no stored value matches the JWT shape, so an opaque refresh or access token written to storage by the client library passes, and 'holds tokens only in memory' goes unproved for non-JWT tokens. The mock knows every token it issues and could assert that none appears in storage. The objective's 'swapping the mocked provider for a real one changes configuration and nothing in the Angular code' is documented (criterion 6) but no criterion exercises a second provider configuration. Policy resistance and secrets: the Cost line commits a development signing key to a public repository. A development key is not a credential to any real system, but it matches the private-key patterns forge secret scanning looks for: it can raise an alert and, where push protection covers the pattern, refuse the publish. Generating the key pair when the mock starts (jose) avoids committing it. Criterion 5 keeps the kid out of the production bundle but not out of the repository. Tragedy of the commons: the largest order (about 160 KB, 8 to 12 hours, 15 steps; tokens unknown), and the record shows 1 of the last 3 orders failed first verification (WO-003), so size raises re-verification exposure. Escalation, drift, success to the successful, shifting the burden and seeking the wrong goal are immaterial: no new commands, a stricter failure matrix, the client library is chosen at activation, no operator step is added, and the work is the product.",
      "removalBalance": "No. It says 'Removes nothing' and adds libs/shared/auth with its kit, the mocked provider's handlers and key, two event groups, guards, a permission directive, two routes, about 60 files and two dependencies.",
      "failureBehavior": "Fails toward safety by design: refresh failure and invalid tokens sign the user out, and a denied route redirects to /denied (criteria 3 and 4). Session loss on reload, from memory-only tokens, leads to a new sign-in through the provider rather than an error. The mock is excluded from production (criterion 5), and an unreachable real provider leads to /login. One failure refuses rather than degrades: committed private-key material can be refused by forge secret scanning when the branch is published.",
      "findings": [
        {
          "criterionId": "criterion:1",
          "kind": "known-issue",
          "reason": "The JWT-shape storage assertion misses opaque tokens, so a stored non-JWT refresh token passes. Comparing storage values with the tokens the mock issued would prove the memory-only rule.",
          "evidence": null,
          "reopenWhen": "The mocked provider or the chosen client library issues or stores a non-JWT token, or a storage value after sign-in equals a token the mock issued, while criterion 1's assertion passes."
        },
        {
          "criterionId": "criterion:6",
          "kind": "known-issue",
          "reason": "The provider-swap property is stated in documentation but never exercised, so its evidence can pass without the behavior.",
          "evidence": null,
          "reopenWhen": "The first real identity provider configuration, in the later example-API member, requires a change to any file under libs/ or apps/ other than environment files."
        },
        {
          "criterionId": "criterion:5",
          "kind": "known-issue",
          "reason": "A committed development signing key puts private-key material in a public repository, where secret scanning can flag it or refuse the push. Generating the key when the mock starts removes the material.",
          "evidence": null,
          "reopenWhen": "After WO-008, a tracked DotLn-Angular file contains a PEM private-key block or a JWK with a private `d` member, or a secret-scanning alert or push refusal is raised on WO-008's branch."
        }
      ]
    }
  ],
  "planVerdict": "aligned-with-findings",
  "holdReasons": []
}
```

## Addressed holds

```json
[]
```

## Dispositions carried from earlier receipts

```json
[]
```

Only evidence-backed misalignment holds. Criterion-text-bound dispositions in the planning control log settle findings without another judgment; known issues name reopening observations. This receipt and all historical receipts remain immutable.

Receipt hash: `sha256:b92926789f72320ff88c00157e41ebc27196273319316537c78eb6a9fad6004f`.
