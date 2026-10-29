# WO-019 host qualification

Observed 2026-10-26 during executor work. The registered launchpad and target
worktrees were resolved before Git operations. The launchpad lifecycle owns the
single writer; the two review workers remained read-only and spawned no workers.

Local execution used Codex CLI 0.164.0 with the session readback identifying
`gpt-6-astra` at `max` effort. Host filesystem access was unrestricted and the
approval policy was `never`; no host permission prompt or automatic-approval
rejection occurred. Probes used the launchpad's bounded wrapper, one probe at a
time, and transient browser servers closed in cleanup handlers.

Executed local surfaces include the optimized production app, optimized mocked
app, static Storybook, Vitest, Playwright, tooling/fixture checks, compilation,
formatting, bundle inspection and current framework documentation lookup.
The complete browser suite passed 82 checks at 19:36Z after the numerical
worked example, rejected-path cleanup, reselection fix and round-19 preview.
It passed all 83 checks at 20:12Z with the accepted reactive-view switch and
round-20 reference comparison. That run preceded the explanatory wording
correction prompted by the operator's questions about both comparison subjects.
Earlier preview input default repairs are historical; those comparison inputs
have now been removed. The production walkthrough completed all
eleven steps at 360, 768 and 1440 pixels at 19:38Z; its record and screenshots
are maintained separately as the design converges. The optimized-build sampler
completed all 30 journeys at 19:41Z with no functional assertion failures;
its cold-load timing and layout-shift limitations are recorded in the evidence
README.

The accepted Data flow/Event timeline switch passed its keyboard regression at
19:54Z and all six view/width checks at 19:56Z. The latter used an explicit browser
context for axe and found no serious/critical findings, errors or overflow.
Round 20's two reference groupings passed at 360, 768 and 1440 px, retaining the
switch and prior reading choices. Identical fact and shared-text hashes confirm
that only grouping changes. These are local preflight observations, not target
gate results; the prior production walkthrough and performance samples predate
these changes. The context correction then passed both three-width comparisons
and all 17 catalog browser checks at 20:17Z.

`npm run release -- prepare --local` reported that WO-019 is a target order,
records no launchpad release and changed no files. Target release classification
remains minor; reviewed release notes belong to the final reviewer.

No commit, push, pull request, account setting, deployment, package publication,
tag or Release operation was attempted by this executor. This local episode
does not qualify those publication operations. Registered plain/review target
gate qualification and the final document gate remain pending at this point.

The first document gate found two metadata omissions, corrected in D010. Its
retry queued behind another checkout's live harness-fixture leases. The executor
stopped only its own queued gate with the canonical evidence stop command at
17:35Z to apply the operator's placement correction. The stop reported no passing
check; no foreign process or lease was changed. A fresh document gate is owed.

The next document-gate attempt queued at 19:01Z behind live fixture leases from
other checkouts. The executor again stopped only its own queued gate at 19:05Z,
with no passing tasks, to continue independent work. The catalog's three visual
baselines were then regenerated and visually inspected; all 42 visual checks
passed at 19:08Z. A later focused browser regression verified same-concept
reselection and reset on concept change at 19:16Z. These observations do not
replace the pending document and target gates.

The 19:27Z document-gate retry completed: all 14 suites passed, with 0.2 seconds
waiting for host lanes and no failed or unrun suites. This is the passing
document preflight before the first target gate. Subsequent comparison evidence
and handoff edits still require a current final document gate.

## 2026-10-28: Claude Code

Two Claude Code sessions resumed the order with `resume: next` in the launchpad
worktree. This session runs Claude Code 2.1.312 with model claude-opus-5-5 and
selected effort `max` (the `CLAUDE_EFFORT` readback); the morning session's
version is not recorded here. The registered launchpad and target
worktrees were resolved before Git operations, and the session held the
worktree's single writer reservation.

The morning session ran on the v0.100.0 kit. Its first edit into
`DotLn-Angular-wo019` was refused at 13:12:32Z by the outside-project write
refusal: the executor's three grants (system-temp, session-scratch,
host-scratchpad) resolve no registered target. That session recorded nothing
of the operator's round-22 answer before the refusal (D024). After main took
starter v0.101.0, this session integrated main (D023), reinstalled and re-emitted
the harness, and its first target edit was journaled `granted` with kind
`target-worktree`. Later edits through the edit tools were admitted; writes made
by programs run from the shell (formatting, the join, test runners) are not
observed by the hook and fall to host permissions. No host permission refusal
was observed in this session.

Probes ran one at a time under the launchpad's bounded wrapper; transient
browser and file servers closed in cleanup handlers. Executed local surfaces:
the optimized production app and static Storybook, Vitest, Playwright browser
and visual suites, tooling tests, the catalog join against the read-only
research run, formatting, the bundle check and the performance sampler. The
headless Chromium (156.0.8078.4) resolves the monospace token to Courier for
all code and chart text; earlier comparison captures from the 2026-10-26 host
show SF Mono. Text, positions and the visual baselines are unaffected.

Three fresh read-only `dotln-worker` reviewers (claude-opus-5-5) ran with
nonoverlapping briefs and were reused for one focused follow-up each; the
session count is 3 of the 20 cap. No commit, push, pull request, deployment,
package publication, tag or Release operation was attempted.

The registered target gates passed at the final target tree, plain 4/4 and
review 7/7, ending 2026-10-28T22:44:09Z; this supersedes the 2026-10-26 note that
gate qualification was pending. The launchpad's complete run was started at
22:28:21Z and stopped at 22:30:54Z without a pass, because nothing in this
target order consumes it (D031).

## 2026-10-28: final review (Claude Code)

The final review ran under Claude Code 2.1.312 with model claude-fable-5-1,
which the operator set as the session model immediately before the dispatch,
at selected effort `max` (the `CLAUDE_EFFORT` readback); the dispatch line
named no worker type. The registered launchpad and target worktrees were
resolved before Git operations, the session held the worktree's single writer
reservation, and no worker was spawned (0 of the cap of 20).

Probes ran one at a time under the launchpad's bounded wrapper against the
verified target tree: the catalog check, the report, the 41 tooling tests and
the production bundle check, all passing. The integrate helper ran once with
the ignored intake archived to the DotLn session scratch first; it was a no-op
at the same base, applied and dropped its named stash, and its three other
affected checks ran green. The reviewed target change was committed on
`wo-019` with the operator's public identity as author and committer. The
pull request's state, checks, reviews and review threads were read through
`gh`. No push, pull request change, deployment, package publication, tag or
Release operation was attempted before the result transition; the publish
calls that follow it are recorded below.

## Final publish (FINAL-001 session, 2026-10-29)

- Host: Claude Code 2.1.312; model `claude-fable-5-1`, effort `max` from
  `CLAUDE_EFFORT`. The publish ran after `final-review-result pass` recorded
  FINAL-001 at the reviewed commit `261982f2…` (2026-10-28T23:47Z), after
  `target-records` added the records commit `b8e5b0ce…` in the target, and
  after this worktree's records were committed (`92101e43`), so the launchpad
  checkout was clean.
- Helper command line as run, from the launchpad root, with the launchpad root
  in `DOTLN_LAUNCHPAD`, after a directory change to the launchpad root and
  with its output piped through `tail`:
  `node scripts/worktree.mjs publish WO-019 --target-worktree --branch feat/catalog-reading --title "feat: make the catalog something to read" --body-file docs/final-reviews/WO-019/PR.md`
- Journal: at 2026-10-29T00:06:47Z the hook recorded a
  `registeredTargetAdmission` row of kind `near-miss`, syntax `prefix`, with
  the advisory that the shell syntax hid the helper from the registered-target
  admission, which was therefore not judged; host permissions decided. The
  session journal holds no `PermissionDenied` row. The records publish below
  was run in the plain form, with no directory change, prefix or pipe, so the
  hook could judge it.
- Host decision: allowed. No permission prompt surfaced in this session.
- Helper output: "Pushed feat/catalog-reading at
  b8e5b0ce0af479bff18a32071c9ee035fe9f4a22 over draft
  062e8007794eb8adce0b98427d7f7b81e9675794 and marked pull request #8 on
  github.com/DylanBWood/DotLn-Angular ready."
- Local readback: target `HEAD` is `b8e5b0ce…`, the records commit, whose
  parent is the reviewed commit `261982f2…` over the base `1c3a4ff2…`; 0
  porcelain lines; branch `wo-019`. `git ls-remote --heads origin` reads
  `feat/catalog-reading` at `b8e5b0ce…` and `main` at `1c3a4ff2…`, so the
  target's `main` did not advance before the push.
- Remote readback: `gh pr view 8` reads number 8, `isDraft` false, state
  `OPEN`, mergeable, head `feat/catalog-reading` at `b8e5b0ce…`, base
  `main`, title ":sparkles: feat: make the catalog something to read" (the
  title workflow re-added the gitmoji after the helper set the reviewed title,
  as it did for the draft), created 2026-10-28T23:04:37Z, updated
  2026-10-29T00:07:08Z, zero comments and zero reviews. `gh run list` for the
  branch reads the "Pull request title" run 40791903136 (success) and the CI
  run 40791903738 (in progress at 00:07Z) at the new head, beside the draft's
  runs 40784730435 and 40784730430 (both success) at `062e8007…`.
- Interventions: none. No `--confirm-terms` was needed, and no host denial
  occurred.
- Outcome against the record: the final publish composed the change from the
  merge base, pushed the two commits over the draft and marked the pull request
  ready, as D036 planned; the operator reads the code there before merging.
- No private journal contents are copied here: only the row's time, kind and
  advisory class, the helper output and the public pull request readbacks.
