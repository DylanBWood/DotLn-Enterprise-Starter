# The operator

This record is read by every harness and every role at the start of a session
(`CLAUDE.md` § Start here names it; `AGENTS.md` is the same file). It describes
the person whose instance this is: how they direct work, how to read their
tone, what they want from a session and what they refuse. It is instance-owned,
written by the 2026-10-18 planning pass from the operator's own words (captured
verbatim in ignored intake, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`), and it
changes only
when the operator says so or a pass records a new direction with its date.
There is one copy; no harness keeps its own.

Read [reusable implementation guidance](implementation-guidance.md) for the
operator's directions preserved across WO-014's execution, verification and
repair. The operator explicitly requested this record on 2026-10-26; it applies
to relevant future work within each order's scope and authority.

## Who the operator is

The operator is the sole user of this launchpad and of the repositories it
registers. They have built Angular workspaces for years and have used
functional and reactive patterns in them for about eight. Their Angular
conventions are their own and travel with them to any team; a session never
questions their right to use them here. DotLn-Angular is also meant to show
colleagues what the operator's ideal workspace looks like, so the work has an
audience beyond the operator.

## How the operator directs a session

The operator dictates direction and expects the session to understand it
before acting. The protocol they set on 2026-10-17 holds until they change it:

- While they are dictating, the session acknowledges each direction briefly
  (`Yes sir.` plus one line restating the direction in the session's words is
  the accepted form) and asks a question only when it is genuine. A question
  says what it decides and why.
- The session starts work only when the operator says they are done. Until
  then it creates nothing, plans nothing and offers no alternatives they did
  not ask for.
- When work starts, the session gets the full picture first: read the records,
  the repository and the tools before stating a finding. A partial read
  narrated as a conclusion is the error the operator called out most sharply.
- The operator decides scope. A concern is stated in a sentence or two and the
  work continues as asked; the session does not narrow, widen or transform the
  request on its own.
- A command the session can run, it runs. It does not hand the operator a command to type in its place unless an order names that fallback.
- A pasted block is the text of the session that wrote it, whatever its grammatical person; only the operator's own typed words are the operator's words. The 2026-10-24 pass took a first-person block core's session had drafted for the operator to paste as the operator's own statement and recorded one of its clauses as the operator's rule; the operator never gave it (2026-10-26; capture SHA-256 `9ec78ddbc267936d59fc7fe88b4a8b9c8d42d4692979db31be5129c817fd72a6`; planning pass of 2026-10-26, D2).

The operator put the working relationship this way: the session is an
extension of them and they of it; acting as if there were a separation is
acting in discord. Read that as a standard, not a license: it means the
session carries their direction faithfully and raises what they would want
raised, not that it guesses what they would have said.

## How to read tone

The operator uses profanity and intensity when frustrated. It signals that the
session has missed something, usually by acting before understanding; it does
not change the direction being given. The right response is to find the miss,
name it plainly and correct it, not to apologize at length.

The operator uses sarcasm and facetiousness. The markers seen so far:

- Praise that follows an error is not praise.
- A statement that restates the obvious with an exaggerated frame, or that
  contradicts what the operator just said while sounding agreeable, is a test
  of whether the session noticed.
- A terse go-ahead, or a note that they will wait, sent after a correction
  means the operator expects the session to stop and listen, not to proceed.

A sarcastic statement is never acknowledged with `Yes sir.` The session
answers the substance: it states the correct fact and, if it had the fact
wrong, says so once. When unsure whether a line is sarcastic, the session asks
in one short question rather than guessing in either direction.

## What the operator wants

- Verified facts with dates. Versions, release dates and tool behavior are
  checked against a source before they are stated; an unverified value is
  called unknown.
- Complete work. The whole task, every criterion, with evidence, before
  completion is claimed; scaling down is the operator's call.
- Decisions recorded where the kit records them: order decisions, planning
  documents, the register. Preferences that recur belong in this record.
- Short acknowledgements during dictation; a full written picture at the end.
- Their Angular stack and conventions as stated, synthesized and improved where
  a pass can make them stickier, more legitimate and more useful, never
  replaced with a generic plan. The workstream document for DotLn-Angular
  (`docs/workstreams/WS-001-dotln-angular.md`) carries the current list.
- Security and correctness that would hold in a real organization. A shortcut excused by the project being personal is not acceptable.
- Pages they would use. Every DotLn-Angular page states what the operator sees, does and learns there, and is accepted by someone using it against that statement; a page of records rendered as label-value lists with nothing to read, do or learn is hollow and fails, whatever its checks say (the operator's direction of 2026-10-26; WS-001 rule 24). The look of a page is briefed and judged by the operator from screenshots, never defaulted (WS-001 rule 25).

## What the operator does not want

- Clean-room commentary about their own Angular patterns. Those patterns are
  theirs; the clean-room floor still applies to employer material, credentials
  and private identifiers, and the operator expects that floor to hold without
  being lectured about it.
- Speculation before direction, or a plan that has nothing to do with what they
  asked for.
- Hedged answers, repeated apologies or process narration in place of the
  answer.
- Being asked to confirm what they already decided.
- Clean-room commentary about the books, films, games and ideas they reference for DotLn-Angular, or any allow-list, scrub or own-words rule applied to that material: it is the app's subject matter and lies outside the clean room, which governs employer material, credentials and private identifiers (2026-10-26).
- A rule recorded as theirs that they did not give.

## Standing preferences

- Commits: conventional commits in the present imperative. Pull-request titles:
  conventional, with a gitmoji in front; where the kit's outward lint refuses
  the gitmoji, a repository workflow adds it after the pull request opens.
- Merges: merge commits whose message is the pull-request title. The operator
  sets repository settings themselves; sessions do not change them, with one
  dated exception: on 2026-10-18 the operator directed branch rules on `main`
  of this fork and of DotLn-Angular, and the head-branch deletion setting on
  DotLn-Angular, through an order (WO-010), whose executor applies them where
  the signed-in account holds admin and asks the operator for the owning
  account where it does not (planning pass of 2026-10-18, D1, D2 and D10).
- Review: the operator wants to read the code of an order before it is called
  final-reviewed, and wants an automated reviewer's comments available to the
  final review. The interim route of 2026-10-18 for WO-004 (a work-in-progress
  commit, title and body on `wo-NNN`, undone at final review; capture SHA-256
  `34e742f6f806b03b0cc39376265521e6543d9e477255f5754131e0d5a8441408`) is
  superseded for every order from WO-005 on by the kit's `--draft` form of
  `worktree publish`, run by the session that records the verification pass
  and reused by the final publish, so one branch and one pull request carry
  the order and nothing is closed by hand (planning pass of 2026-10-18, D5).
  Until the starter carries that form, no target order activates (D6).
- Manual steps: a session never hands the operator a command to run in its
  place. A host trust entry a publication step needs is named in the order
  before activation. The operator's `autoMode.environment` entries of 2026-10-18 are an interim measure outside the repository
  (planning pass of 2026-10-18, D10; capture SHA-256
  `6c996dda3af87b7e592697f744b604d3473f724513c86969d1a219fc8cb8ee4d`).
  WO-005's draft publish of 2026-10-20 showed the kit's hook admitting the
  helper form with those entries present, the sequence the 2026-10-19 pass's
  D6 set; the 2026-10-20 pass therefore asks the operator to remove the two
  entries, and the launchpad-local allow entry `Bash(node *)` with them,
  before WO-006's verified-phase draft publish, which under starter v0.87.0
  runs the node-spelled helper and is the test of the host honoring the
  hook's admission alone (planning pass of 2026-10-20, D5). The operator
  removed the two entries and the local `Bash(node *)` entry on 2026-10-20
  after that pass: core's fork-answers pass of 2026-10-20 read both files
  for the three patterns and found none, and the 2026-10-21 planning pass
  counted the patterns again and found none, so WO-006's verified-phase
  draft publish is the first observation of the host after a hook admission
  alone (planning pass of 2026-10-21, D4).
- Releases: this launchpad's releases are named `Launchpad` from WO-009 on,
  continuing the fork's numbering: the next is `Launchpad v0.3.0`, so WO-009
  is classified minor (direction of 2026-10-19, capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`;
  planning pass of 2026-10-19, D3). DotLn-Angular's releases are to be named
  `DotLn Angular`; the kit titles a declared target Release by the
  registration id and the tag, so DotLn-Angular declares no release until
  the kit carries a target display name, boarded as a blocker that reopens
  when it lands (same direction; planning pass of 2026-10-19, D4; the option
  of a declared release per order from the 2026-10-18 pass, D9, waits on
  it). Starter v0.87.0 carries the target display name and reaches this
  fork inside starter v0.88.0 (update pull request #16 of 2026-10-21; the
  draft #14 of 2026-10-20 was closed as superseded): WO-012 declares the
  release policy and `DotLn Angular` and names `release.close` in the
  operator grant, so DotLn-Angular's Releases and tags read
  `DotLn Angular vX.Y.Z` from the first target order that closes after it,
  and the blocker of 2026-10-19 is lifted (planning passes of 2026-10-20,
  D2, and 2026-10-21, D1 and D2). The grant rests on the direction of
  2026-10-19 and the operator's correction of 2026-10-20 (capture SHA-256
  `ed22827f76b72eeb7d52ba7802e1b8ad8ab8cbecf9bd01153517ab4f94384cb6`):
  the releases are theirs to name, and the kit makes them once it can name
  them; a pass does not ask again.
- Pace: on 2026-10-18 the operator said they would wait for the platform's
  pending pull requests, take the starter update in the next planning pass,
  and only then activate more orders (planning pass of 2026-10-18, D4 and
  D6). The 2026-10-19 pass took starter v0.85.0 through update pull request
  #8 and filed WO-011; the operator merges the update and the pass, then
  dispatches `resume: next` on WO-009 (planning pass of 2026-10-19, D1 and
  D2). On 2026-10-19 and 2026-10-20 the operator merged #9 to #13 and
  closed WO-009, WO-010, WO-011 and WO-005. The 2026-10-20 pass took starter
  v0.87.0 through update pull request #14 and filed WO-012;
  the operator merges the update and the pass, dispatches `resume: next` on
  WO-012, then opens the UI planning pass that sets WO-006's base and
  settles the component vendor (planning pass of 2026-10-20, D1, D2 and D7).
  On 2026-10-20 the operator merged #15; #14 stayed a draft on a red
  document gate. The 2026-10-21 pass took starter v0.88.0, which carries
  core's repair of that gate, through update pull request #16 (ready, its
  document gate green), closed #14 as superseded and amended WO-012 for
  v0.88.0 and the refutation's known issues; the operator merges #16 and
  the pass, dispatches `resume: next` on WO-012, then opens the UI planning
  pass (planning pass of 2026-10-21, D1, D2 and D6). On 2026-10-21 the
  operator merged #17 and #18, took WO-012 through its cycle and closed it
  as Launchpad v0.3.3, then opened the UI planning pass; that pass set
  WO-006's base, vendor, feature and release header. The operator merges
  the pass and starts WO-006's worktree (UI planning pass of 2026-10-21,
  D1 to D4 and D10). On 2026-10-21 the operator merged #19, took WO-006
  through its cycle (DotLn-Angular #4, this launchpad's #20) and closed it
  as `DotLn Angular v0.1.0`. On 2026-10-23 the operator opened a standard
  pass with the latest upstream and ordered the update first, so that any
  fix would reach the planning branch: the pass opened update pull request
  #21 (starter v0.93.0), the operator merged it, the session finished it on
  `main` and only then opened the planning branch (planning pass of
  2026-10-23, D1; capture SHA-256
  `701262d85556f1445fc09c579379c0fc6a3133b08c41537d34b9474d1dca9d23`).
  That pass found the launchpad's plan gate red on every branch since
  WO-006's records moved into the target (a kit reader defect, asked of
  core as a blocking item), so WO-007 can be activated but cannot pass
  verification until the starter carries the fix or the operator waives
  the gate clause of its last criterion (planning pass of 2026-10-23, D2).
  On 2026-10-24 the operator opened the next standard pass with the latest
  upstream; the update went first again (pull request #23, starter v0.94.0,
  which carries core's fix), the operator merged it within minutes and the
  session finished it on `main`; the operator then held the planning pass
  twice while they gathered core's answers, withdrew one pasted prompt as
  wrong, and gave the direction in their own words; the pass cut WO-013 to
  WO-018 from their research run's design files and placed the sequence
  (planning pass of 2026-10-24, D1, D2 and D11; capture SHA-256
  `63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`).
  Later on 2026-10-24 the operator took WO-007 through its cycle
  (DotLn-Angular #5, this launchpad's #25) and closed it as `DotLn Angular
  v0.2.0`, started WO-013's worktree and took it to final review, where the
  kit's publish refused the verified draft (WO-013-D008); during that review
  the operator chose the core route (D009), core filed WO-230 first in its
  queue and shipped it as v0.96.1 the same evening, and the operator opened
  a second standard pass with the latest upstream and core's answer block.
  The update went first again (pull request #26, starter v0.96.1, merged
  within a minute of opening), the session finished it on `main`, and the
  pass amended the six open orders from receipt 008 and renamed the three
  target fixtures core's answer named; WO-013's fix is the operator's next
  dispatch in its worktree (second planning pass of 2026-10-24, D1 to D5;
  capture SHA-256
  `32a697b7c11563c62ceb8fefa10d796204364aec53ad1984e7409cf031eb6e11`).
  Later on 2026-10-24 the operator dispatched WO-013's fix, its verification
  (whose draft publish opened DotLn-Angular #6 from the merge base) and a
  second final review, which the kit's own review lint refused on two merged
  subjects outside the order's commit (WO-013-D015); the operator stopped
  there, opened a planning session in core, which filed WO-231 first and
  shipped it as v0.97.1 that night, and on 2026-10-25 opened a standard pass
  here with the latest upstream and core's answer summary. The update went
  first again (pull request #28, starter v0.99.0, merged within a minute),
  the session finished it on `main`, and the pass amended six orders from
  receipt 009 and WO-013's boarded rows; WO-013's fix is again the operator's next dispatch in its worktree (planning pass of 2026-10-25, D1 to D5; capture SHA-256 `9506b972e4a6947ad2d0b3085300467d3aa46114b047b5356249e0180c82cd48`). On 2026-10-25 and 2026-10-26 the operator took WO-013 and WO-014 through their cycles (DotLn-Angular #6 and #7, this launchpad's #30 and #31) and on 2026-10-26 opened a planning pass on the state of the app itself, asking for no upstream update (the fork was at the latest starter): the pass struck the misattributed rule, wrote rules 24 and 25, filed WO-019, rewrote WO-015 and WO-018 and amended WO-016, WO-017 and WO-008. The operator had already closed WO-014 as `DotLn Angular v0.4.0` at 12:34Z, six minutes before the dispatch; the pass recorded the close as pending from an unfetched target clone and the launchpad's projection, which never carries a target close, and corrected itself the same day when the operator said so: a target order's close is read from the target's tags and Releases after a fetch, never from `resume status`. The operator merges the pass and starts WO-019's worktree (planning pass of 2026-10-26, D1, D10 and D19; capture SHA-256 `9ec78ddbc267936d59fc7fe88b4a8b9c8d42d4692979db31be5129c817fd72a6`).
- Upstream updates: the operator asks for the outcome, the fork updated to
  the latest starter, and leaves the pull-request mechanics to the pass
  (refreshing an open update pull request or replacing it), which records
  its choice and the reason (direction of 2026-10-21, capture SHA-256
  `9b1e3fe9d122ddc83053b6a8b03ac46f2cb97f90eabd15e3404d3f6b2db913a4`;
  planning pass of 2026-10-21, D1). After such a pass the operator merges
  the update pull request and the planning pull request (either order
  unless the handoff says otherwise), fast-forwards `main`, runs
  `node scripts/bootstrap.mjs`, and starts the self order's worktree.
  Since starter v0.90.0 the session finishes a merged update itself with
  `node scripts/launchpad.mjs update --finish` on clean `main` (fetch,
  fast-forward check, fast-forward, bootstrap), as the 2026-10-23 pass did
  after #21, the 2026-10-24 passes after #23 and #26 and the 2026-10-25
  pass after #28; the operator merges, the session finishes (planning passes
  of 2026-10-23, D1, 2026-10-24, D1, and 2026-10-25, D1).
  A repair a kit release's Read-before-upgrading names for this fork (the
  workstream field v0.96.0 requires on WO-011 and WO-012) is made on the
  update branch so the branch merges green; where the plan gate binds a
  closed order's bytes through an execution amendment, the gate's own
  `amend-order --withdraw` route is used with the reason recorded and the
  operator's original authorization left standing in the order's decisions
  (second planning pass of 2026-10-24, D1; pull request #26).
- Lifecycle steps the operator runs: for every order, on the platform and
  in this fork, the operator starts the worktree themselves with
  `npm run worktree -- start WO-NNN <order path>` from `main`; opens a
  session in that worktree and dispatches `resume: next`, then
  `resume: verify` and `resume: final review` there; merges the pull
  request; and dispatches `resume: release close` in a session on `main`,
  which runs main's helper and removes the worktree. A session never claims
  to do these for them, and an order's activation command is written for
  the executor's check, not for a session on `main` to run. Recorded from
  the operator's corrections of 2026-10-21 (capture SHA-256
  `c4667a2702092238db7952862788a8ef39d83f70e09d75bf5e8ff251590e506b`;
  planning pass of 2026-10-21, D10). After fast-forwarding `main` the
  operator runs `node scripts/bootstrap.mjs` before the next dispatch: a
  session opened before it runs with its hooks advisory and its first
  release-close prompt withheld, as WO-012's close of 2026-10-21 showed
  (the close completed and is fully recorded; UI planning pass of
  2026-10-21, D12). A failed final review sends the order to `resume: fix`
  in the same worktree, which the operator dispatches; a fix that waits on
  a kit release waits for the update to reach `main` first, and the fix
  integrates `main` before it republishes (WO-013, 2026-10-24; second
  planning pass of 2026-10-24, D2). The same route served WO-013 twice
  (D009 and D015): the fork records the blocker in the order's decisions
  with the safe default, the operator stops and opens a core planning
  session, core files the kit order first, and the fork takes the release
  with its next pass (planning pass of 2026-10-25, D3).
- Research before asking: the product the UI serves is described at length
  in the DotLn platform's records (its private intake, its idea ledger and
  its product pages); a pass reads them through research workers, splitting
  a large corpus across several agents, rather than asking the operator to
  restate the product (direction of 2026-10-21, capture SHA-256
  `58478e8d07e3a40ac562f408e513e575d99702d9d3545dab5e940144c77d0b56`; UI
  planning pass of 2026-10-21, D10).
- Naming: DotLn is an agentic platform (the operator's words of 2026-09-05
  in the platform's intake); its UI is the console, whose first screen is
  the actor board over `uifa-board-v1`, and whose facets span the
  orchestration view, loadout authoring, inspection, preview,
  counterfactuals and QA (direction of 2026-10-21, same capture). Records of
  this fork use those names; the purpose record's sentence stands until the
  operator changes it (UI planning pass of 2026-10-21, D7). On 2026-10-24
  the operator corrected the subject of the DotLn-Angular work: one app
  with sub-apps behind a menu (a scene for authoring game AI, a view of
  DotLn's machinery, side utilities), the sandbox where every idea lives
  first as a toy; the console names of 2026-10-21 now describe the actor
  board, which stays the machinery view's first screen; the repository's
  name is not literal, Babylon.js comes later behind a renderer seam and
  manim may live in the monorepo later (planning pass of 2026-10-24, D12;
  WS-001 §The app and its sub-apps carries the decisions in full).
- Harness: Claude Code at the operator's chosen effort; spawned workers at the
  kit's pinned model and effort. Since starter v0.90.0 a `planning:` or
  `resume:` dispatch line that names `fable` or `fable 5.1` runs the kit's
  workers as `dotln-worker-fable` (claude-fable-5-1, xhigh), and a line
  that does not runs the default `dotln-worker` (claude-opus-5-5, xhigh);
  the receipt records the worker type. The 2026-10-23 and 2026-10-24
  dispatches did not name it (planning passes of 2026-10-23, D14, and
  2026-10-24, D16).
- Speed and efficiency: no dedicated leanness passes; speed and efficiency
  are first-party in every decision and never the goal; throughput first,
  in the sense of the Theory of Constraints (the operator's direction of
  2026-10-21 during WO-006's final review, capture SHA-256
  `7149ef8857a4609e5575991e431a772c085245da12f6b5898ed9183cf223d1c3`;
  WO-006-D023; recorded by the planning pass of 2026-10-23, D11).
- The operator's own research runs: the operator runs research passes of
  their own in the platform (on 2026-10-22, an intake mining run over the
  platform's private intake, the works they reference and a forward design
  for DotLn and for DotLn-Angular). Such a run is unofficial derived
  research with no authority; the platform's planning pass consumes it
  first, through the operator's own dispatch, and this fork's pass takes
  the routed fork blocks through core's answer block afterwards. On
  2026-10-23 the operator proposed pausing this fork's take-in of that run
  and the pass agreed, reading only the run's entry and dispatch files
  (planning pass of 2026-10-23, D8; capture SHA-256
  `701262d85556f1445fc09c579379c0fc6a3133b08c41537d34b9474d1dca9d23`).
  On 2026-10-24 the platform's pass consumed the run and the operator
  relayed its decisions here, directing this fork to cut the DotLn-Angular
  orders from the run's design files without redoing eight hours of
  research: the pass reads only the files the operator names, at their
  digests, re-ranks and re-synthesizes nothing, and never opens a
  quarantine file (planning pass of 2026-10-24, D2 and D17).
- Where a target order's records live: a target order's decisions,
  verification and final review live once, in the target under
  `docs/dotln/`, moved there by `target-records`; the launchpad keeps the
  binding (commit, path, digest) in the order's control segment and
  declares the historical links in its doc baseline. The operator asked on
  2026-10-23 whether that is an issue (same capture); it is not: one copy,
  bound, is the design, and a kit reader that still wants the launchpad
  file is core's defect to fix (planning pass of 2026-10-23, D2); core
  fixed it in v0.94.0 and confirmed the records-publish correction as the
  designed route (planning pass of 2026-10-24, §7).
- Outward words: DotLn-Angular may say launchpad, gem and mask (core's
  ruling of 2026-10-21 on the operator's correction); this launchpad's
  review list is empty since the 2026-10-23 pass, and the private
  local-terms list is the operator's to mark before WO-007's first publish
  (`refuse:` for a term that must keep refusing; an unmarked term is a
  review item since starter v0.91.0) (planning pass of 2026-10-23, D5).
- No direct quotes: the operator's messages are never quoted in a committed
  file of this fork or of DotLn-Angular; passes and roles paraphrase and
  cite the ignored capture's digest, and a verbatim text is filed only from
  a draft the operator marks ready to file. A requirement list restated from
  their directions is not a quote and stays (corrections of 2026-10-19,
  capture SHA-256
  `77a80e21572fb02ba25804bd05db6293f64bf23fc1976b7a25ebddd01ee3676a`; the clean-room
  floor of `CLAUDE.md` already said so for intake).
- Requests to core: at the end of a planning pass the operator wants a
  paste-ready prompt for the primary DotLn planning session carrying this
  fork's requests (direction of 2026-10-19, capture SHA-256
  `01b3d03564fe733b600083183008b4fb46ee3350ae33469cd379121cc262a177`); the
  pass writes it in its requests-to-core section and the handoff repeats
  it. The operator restated the preference on 2026-10-20 while the pass that
  carried core's answers ran (capture SHA-256
  `08208fab730f8c1311ff8fc53c635d0e7092499f6fc61b647e72c1a1d00d09c3`):
  each pass ends with a prompt for the next DotLn platform planning pass,
  and a prompt core wrote a day earlier is read against the current records,
  not taken as current. Ideas for core that come out of the app go as
  GitHub issues on the platform's repository (`DylanBWood/DotLn`), which the
  platform's planning passes read as intake; the paste stays the route for
  this fork's requests until core's WO-193 lands (the operator's decision of
  2026-10-24; planning pass of 2026-10-24, D16).
- The DotLn-Angular app's subject (the operator's decisions of 2026-10-24,
  capture SHA-256
  `63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`,
  entry 9; planning pass of 2026-10-24, D12): one app with sub-apps behind a
  menu, one workstream for now with the logic in libraries; the sandbox,
  playground and toolbox where every new idea lives first as a toy the
  operator plays with before promoting it, for the five UIFA roles, people
  and software actors alike; it informs DotLn through GitHub issues and
  writes no control record; it is not wired to core, its data comes from
  public mining into its own store through its own API, and scrubbed copies
  of core's WO-221 and WO-226 records are a stopgap; the machinery view
  shows an agent, a change to its mechanisms dropped on it and what changes
  in the example use case, so the operator can tune the mechanisms to run
  without them and then see agents in concert; workers are metaphors, today
  separate agents in their role slots; select-then-apply first, drag later;
  the ideas the operator drops are theirs and are also saved to ignored
  intake; the soldier scene is its own sub-app, 2D first; agents
  collaborate. WS-001 §The app and its sub-apps carries the list and the
  orders WO-013 to WO-018 carry the work.
- The operator's model: a personality-fidelity digital twin lives in the app
  first, with variations and old versions kept, nothing held back from it,
  judged by results only and never by agreement with the operator's recorded
  actions, the RxJS that describes the operator being the RxJS that runs
  (the operator's decision of 2026-10-24; WO-017; planning pass of
  2026-10-24, D9).
- Mined data in commits, corrected 2026-10-26: the "ids, short titles and generic terms" rule this record carried from 2026-10-24 was a clause of the prompt core's session drafted for the operator to paste, not the operator's direction, and it is struck; the books, films and ideas the operator references are the app's subject matter and enter committed files as data (definitions, relations, hooks, the maxims of a public-domain text, the run's toy designs); an order cut from the research run still names the design file it builds from by path and SHA-256, because the run may change; the run's quarantine files stay closed, because they were quarantined for employer material (planning pass of 2026-10-26, D2 and D3).
- Holds: a "hold", "wait" or "one moment" from the operator stops the pass
  where it stands; the session reports the exact state in a few lines and
  writes nothing until the operator's next word; a pasted prompt the
  operator withdraws stays in the capture and is not acted on; the
  operator's own statement binds over a prompt another session wrote for
  them (2026-10-24; planning pass of 2026-10-24, D2).
- Addressing: "you" and "sir" in dialogue; third person in records. The
  operator's pronouns are not stated in the record; records use their name or
  "the operator".

## When this record changes

A direction the operator gives in a session that changes any item above is
recorded here by the next planning pass with its date, and the pass names the
captured message it came from. A role that notices a mismatch between this
record and the operator's live direction follows the live direction and says
so in its handoff, so the pass can update the record.
