# WO-003 executor handoff

Executor: Claude Code 2.1.302, model `claude-fable-5-1`, effort `max`. The
effort is the value `CLAUDE_EFFORT` carried in this session, which the kit
records as the `claude-session-readback` source: the session's selected
effort, not an observed effective effort, because Claude Code exposes no
effective-effort readback. Dispatched by the operator's `resume: next` on
2026-10-18 (recorded 2026-10-18T01:59:29.043Z) on branch `wo-003` at
`2b515fa`. The order recommends executor effort `xhigh`; the operator selected
`max` for this session. Commands and outputs are in [README.md](README.md);
decisions in [decisions.md](decisions.md).

Repair executor: Claude Code 2.1.302, model `claude-opus-5-5`, effort `xhigh`
from `CLAUDE_EFFORT` (`claude-session-readback`: the selected effort, not an
observed effective one). Dispatched by the operator's `resume: fix` on
2026-10-18 against [VER-001](../../verifications/WO-003/VER-001.md) finding F1,
in the same worktree. The criterion lines below are judged at the repaired
bytes.

## Criteria

**Criterion 1:** met. `dotln.config.json` exists at the repository root; the criterion's command printed exactly `main .. angular-nx-monorepo docs/dotln docs/repositories/dotln-angular.md install,lint,test,format install,lint,test,format,build,e2e`, and `npm run resume -- status --json` exited 0 (README § Step 1).

**Criterion 2:** met. The criterion's command printed exactly `[["operator","dotln-angular","pr.open,pr.thread.resolve,repo.push"]]`, one grant; `test -e docs/control/local/authority-grants.json || echo absent` printed `absent`, so no ignored host-policy grant joined the count; the grant's authority is the operator's captured direction (WO-003-D009; README § Step 2).

**Criterion 3:** met. `docs/control/outward-vocabulary.json` exists; the three step-3 commands printed `pass` (exit 0), `refused` with the single finding `subject.shape` (exit 1) and `pass` (exit 0), recorded verbatim in README § Step 3; the worktree's ignored local-terms list, which the lint needs to report `pass`, was registered first (WO-003-D003).

**Criterion 4:** unmet, waived by 4. The operator's waiver was recorded from the capture with SHA-256 `d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03`. VER-001 reproduced the refusal. `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"` refused with `error: unknown repository id "dotln-angular"` (exit 1): the command records into the main-branch worktree and validates the id against main's configuration, which carries no registration until this order merges and the main checkout holds the merge; nothing was written and `git status --short` was unchanged. The post-merge command from the main checkout is follow-up `FUP-1eec5d4255b0162c`; the recorder's acceptance of this registration and clone path was proved against this worktree's own configuration (WO-003-D004; README § Step 4).

**Criterion 5:** met. `test -f docs/repositories/dotln-angular.md && echo ok` printed `ok`, the registration's `profile` names that path (criterion 1's output), and `npm run work-orders -- index --check` exited 0 with both pages current, WO-003 shown active (target v0.2.0) and WO-004 shown with `Repository: dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4` (README § Steps 6 and 7).

**Criterion 6:** unmet, waived by 5. The operator's waiver was recorded from the same capture. At the repaired bytes `npm test` passed (exitCode 0, 644 ms, recorded 2026-10-18T04:03:33.207Z) and `npm run test:docs` passed (17 passed, 0 failed, exitCode 0, 5664 ms, recorded 2026-10-18T04:03:23.191Z), both at code identity `cecf3d631e7e6aff515368e6b2ec1f9f5c68420edd6ae6ea372eabcb56492463` (README § Repair). But the criterion's Preflight clause does not hold: of the four named suites, `configuration-root` and `target-worktree` passed, `outward-lint` is not carried in this kit (WO-003-D005, `FUP-46062529c4c46ac3`), and `authority-grants` fails its kit assertion that this checkout's committed grant registry is empty, the negation of this order's grant (WO-003-D008, `FUP-29f02563e4477b69`); four of its five subtests pass (README § Preflight).

self-review: found 32; fixed 31; recorded 1. Criteria adversary (`dotln-worker`): 13 found, 12 fixed, 1 recorded: the effort line's source label, kept because the kit names the `CLAUDE_EFFORT` value the `claude-session-readback` source and reworded above to say what it is. Design improver (`dotln-worker`): 19 found, 19 fixed, among them the envelope id (WO-003-D010), the grant's reason wording, the corrected code citations in WO-003-D001 and D002, the rewritten WO-003-D005 and D008, the evidence tables turned into lists, and the deliverables list made to match the diff. The adversary's planning carry-in finding became WO-003-D009.

## Gates

`npm test` and `npm run test:docs` rows: README § Gates (both exit 0 at code
identity `cecf3d631e7e6aff515368e6b2ec1f9f5c68420edd6ae6ea372eabcb56492463`).

## Decisions and follow-ups

[decisions.md](decisions.md) holds WO-003-D001 through WO-003-D013.
WO-003-D006 was appended by `release prepare`, D011 after implementation-ready,
D012 by the verifier and D013 by the repair. Four items were deferred through
the adjacent queue (revision 8, nothing queued): the post-merge clone record
(`FUP-1eec5d4255b0162c`, D004), the Preflight line naming an uncarried suite
(`FUP-46062529c4c46ac3`, D005), the kit's `worktree start` leaving the
local-terms list unregistered (`FUP-ccb3367ad84787cc`, D003) and the kit
suite's empty-registry assertion (`FUP-29f02563e4477b69`, D008).

Goal alignment at handoff: the lenses named before the material choices (the
wall-clock trap for the expiry, the daemon trap for the gate argv, the secrets
floor for the local-terms copy, the merge-sequencing trap for the clone record)
each changed a record, not a declared surface; the outcome matched the Design
for every declared surface, and the two unmet criteria name the kit's
sequencing and the kit's core-state test, not a defect in the registration.

Operator steering during the order: two questions (what follow-up
`FUP-1eec5d4255b0162c` asks of the operator; the plan for the upstream kit
gaps) and one direction (one consolidated to-do list at handoff), answered in
chat; none changed the scope or the queue. After the completion event the
operator answered the to-do list's items 2 to 5 in one message, captured
verbatim at `docs/intake/notes/wo-003-operator-direction-2026-10-18.md`
(ignored intake, SHA-256
`d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03`) and
recorded as WO-003-D011; the to-do list below reflects it.

## Repair of VER-001 F1

The finding's class is a structured decision whose `dispatch` fails the
document gate's rule. The repaired records hold that rule: each dispatch starts
with one of the seven control prefixes, then a colon and a non-empty one-line
paraphrase of at most 240 code points after trimming. Only WO-003-D011's
`dispatch` changed. It carries VER-001's proposed wording with the capture
digest inline. VER-001's exact value passed the rule but added a new
operator-word advisory on D011, because the old dispatch was the only place
the advisory found the digest (WO-003-D013). Checks:

- A sweep of every decision record under the launchpad with the gate's own
  reader, baseline and rule went from 27 records with 1 failing to 28 with
  0 failing.
- Cases the report did not quote all held: the first record's paraphrase fits
  behind a valid prefix (234 code points, so the prefix alone failed); a
  capitalized prefix, a leading space, `verify:` and a whitespace-only
  paraphrase are refused; 240 astral code points pass and 241 are refused;
  trailing spaces are trimmed before the count.
- The capture digest re-verified.
- Both waivers are untouched.
- `FUP-ca963c9be2a290c8` is settled, with a same-day corrected reason.
- Gates passed at unchanged code identity.

No worker was spawned. The fan-out plan was zero of the 20-agent
`subagentCap`, and the harness counts 0. The self-review line above belongs
to implementation-ready, and the repair procedure names no worker review.

Goal alignment at the repair: the trap that changed the work was taking
VER-001's proposed value as final. The fresh gate showed the advisory it
introduced, so the dispatch keeps the digest. The NoOp would leave the document
gate failing. The outcome matches the finding's repair rule (dispatch metadata
only, capture and waivers retained, no kit edit or new waiver) and closes its
class across every decision record. No operator steering arrived during the
repair beyond the `resume: fix` dispatch.

Repair session usage, from `node scripts/harness.mjs usage 54806e35-3025-4342-8b22-7c64953e2d17`:

- Entry, 2026-10-18T03:57:34Z: 41,232 total tokens.
- Before this handoff, 2026-10-18T04:04:00Z: 4,644,002 total tokens. That is
  input 84; cached input 4,502,658; cache write 112,241; output 29,019.
  Reasoning tokens and cost are unavailable.
- Both readings: source `claude-transcript-message-usage`, scope `dispatch`.
- Subagents: 0 of 20, exact-observed.

## Usage

`node scripts/harness.mjs usage 2c36f462-2d38-4089-a805-df02c895e65d` at
2026-10-18T03:32:07Z: 13,410,291 total tokens at dispatch scope (source
`claude-transcript-message-usage`; input 1,328; cached input 12,891,239; cache
write 369,200; output 148,524; reasoning tokens and cost unavailable);
subagents 2 of cap 20, exact-observed, 18 remaining. The host reported 150,234
tokens for the design improver and 203,411 for the criteria adversary. The
entry reading at 2026-10-18T02:33:44Z was 146,097 total tokens, same source
and scope.

## Operator to-do list

Updated after the operator's direction of 2026-10-18 (WO-003-D011).

1. **Read and merge this order's pull request** when final review publishes
   it, with a merge commit as you do.
2. **Criteria 4 and 6: waived by the operator** ("yea i wave 4 and 6"). The
   verify session records both from the capture, since the order's own
   executor may not:
   `npm run resume -- waive 4 --reason "operator waived criterion 4: the clone record is a post-merge step the release-close session performs" --capture docs/intake/notes/wo-003-operator-direction-2026-10-18.md --capture-hash sha256:d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03 <its actor flags> --work-order WO-003`
   and
   `npm run resume -- waive 6 --reason "operator waived criterion 6: outward-lint is not carried in this kit and authority-grants asserts an empty committed registry" --capture docs/intake/notes/wo-003-operator-direction-2026-10-18.md --capture-hash sha256:d94d69aa509942510e13e8670b17734b37546007fe2fe28a08ec67d7d51eef03 <its actor flags> --work-order WO-003`,
   with the actor flags of the session that runs them. The verify dispatch
   briefing prints this shape. Nothing for the operator.
3. **WO-003-D007 stands.** The operator declined to rule ("below my pay
   grade… ask another agent"); the criteria adversary judged the reading
   defensible and the verifier judges it with the rest. Nothing for the
   operator.
4. **Clone record at release close** (operator direction): the release-close
   session runs, from the main checkout once it holds the merge,
   `npm run worktree -- clone dotln-angular "$HOME/Projects/DotLn-Angular"`
   (expected output `Recorded local clone for dotln-angular.`). If that
   session's briefing does not surface `FUP-1eec5d4255b0162c`, tell it to
   record the DotLn-Angular clone; the WO-004 start session is the fallback
   when `worktree start` reports `no local clone recorded`.
5. **Upstream prompt handed over** in chat on 2026-10-18 and kept below; paste
   it into a session in the core DotLn checkout when convenient.
   `npm run plan -- followups --export <file>` exports the register rows for
   that session to read.
6. **Nothing for the local-terms copy** in this worktree: it is ignored and
   leaves with the worktree at release close (WO-003-D003).

## Upstream prompt

Paste into a session in the core DotLn checkout (`github.com/DylanBWood/DotLn`):

> Three kit gaps met by a launchpad exported at `v0.83.0` (commit
> `7b8206f4b97d290473e4e619271521f496ce56aa`) while executing its first
> repository registration order, the order that writes `dotln.config.json`,
> an operator grant in `packages/skeleton/loadouts/grants.json` and
> `docs/control/outward-vocabulary.json` as the exported README § First steps,
> step 4, directs.
>
> 1. `scripts/test-authority-grants.mjs`, test "WO-042 AC5/6 Contributor
>    projection and grant bundle carry the enforced envelope and registry
>    provenance", ends with
>    `assert.deepEqual(JSON.parse(readFileSync(join(root, COMMITTED_AUTHORITY_GRANTS), "utf8")), [], "this order adds no personal authority")`,
>    where `root` is the checkout under test. In an instance that commits the
>    operator grant the README directs, the suite fails (five subtests, four
>    pass), so an order's Preflight line `npm test -- --only authority-grants`
>    cannot pass there. Intended fix: scope that assertion to core, or mark
>    the suite core-only for launchpads.
> 2. `npm run worktree -- clone <id> <absolute-path>` records into the
>    main-branch worktree (`mainWorktree` in `scripts/lib/git.mjs`) and
>    validates the id against that launchpad's configuration
>    (`recordRepositoryClone` in `scripts/lib/target-worktrees.mjs`). A
>    registration order runs in a `wo-NNN` worktree whose configuration `main`
>    lacks until the merge, so the step that records the clone refuses with
>    `unknown repository id` before the merge. Intended fix: validate against
>    the current worktree's configuration or defer the id check to
>    `worktree start`, or document the clone record as a post-merge step in
>    the registration recipe (README § First steps; 07 §Where the control
>    plane finds its documents).
> 3. `worktree start` leaves the new order worktree without the ignored
>    local-terms list (`docs/control/local/terms.txt`): the outward lint then
>    reports every artifact `unavailable`, `harness check` reports
>    `local-terms list: unavailable`, and sessions copy the main checkout's
>    list by hand (README § First steps, step 7, describes that copy).
>    Intended fix: have `worktree start` register the list into the new
>    worktree from the main checkout's list, or print the registration step.
>
> One note for the exported recipes rather than core's code: the registration
> order's Preflight named `npm test -- --only outward-lint`, which the runner
> declares core-only and a kit root refuses by name; exported order templates
> should not name it.
