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
- A command the session can run, it runs. It does not hand the operator a
  command to type in its place unless an order names that fallback.

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
- Security and correctness that would hold in a real organization. A
  shortcut excused by the project being personal is not acceptable.

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
  D1 to D4 and D10).
- Upstream updates: the operator asks for the outcome, the fork updated to
  the latest starter, and leaves the pull-request mechanics to the pass
  (refreshing an open update pull request or replacing it), which records
  its choice and the reason (direction of 2026-10-21, capture SHA-256
  `9b1e3fe9d122ddc83053b6a8b03ac46f2cb97f90eabd15e3404d3f6b2db913a4`;
  planning pass of 2026-10-21, D1). After such a pass the operator merges
  the update pull request and the planning pull request (either order
  unless the handoff says otherwise), fast-forwards `main`, runs
  `node scripts/bootstrap.mjs`, and starts the self order's worktree.
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
  2026-10-21, D12).
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
  operator changes it (UI planning pass of 2026-10-21, D7).
- Harness: Claude Code at the operator's chosen effort; spawned workers at the
  kit's pinned model and effort.
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
  not taken as current.
- Addressing: "you" and "sir" in dialogue; third person in records. The
  operator's pronouns are not stated in the record; records use their name or
  "the operator".

## When this record changes

A direction the operator gives in a session that changes any item above is
recorded here by the next planning pass with its date, and the pass names the
captured message it came from. A role that notices a mismatch between this
record and the operator's live direction follows the live direction and says
so in its handoff, so the pass can update the record.
