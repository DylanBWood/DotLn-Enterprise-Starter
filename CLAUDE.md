# Launchpad

Every session reads this contract; `AGENTS.md` symlinks here. The instance owns
the hand-written floor: edit it here; kit updates change it only through
explicitly opted-in instance actions.

Export writes the kit block below; `node scripts/harness.mjs emit` writes the
harness block.

## Clean Room — locked floor

Work here belongs to the owner of this repository. Never import code,
configuration, identifiers, internal services, credentials or secrets that the
owner has no right to publish in it. Stop and flag suspect material; derive
decisions from this repository's own recorded sources. No support or generated
configuration may weaken this floor.

`docs/intake/` is ignored, single-copy raw material. Synthesize and rewrite it;
exact wording is copied only from an operator-authored draft explicitly marked
ready to file, with that provenance recorded on the committed surface.

## Secrets

Never expose, copy, commit or print credentials, tokens, private hostnames,
account identifiers or the contents of `docs/control/local/`. Environment
variable names may be recorded; their values never. The private local-terms
list at `docs/control/local/terms.txt` is reported by file and line on a match
and its terms are never printed.

## Start here

Whole `resume:` phrases select skills through canonical status
(`npm run resume -- status --json`). `@skills`: `.claude/skills` in Claude,
`.agents/skills` in Codex.

Expand skill read/review selectors from order/report paths. Read cited sections;
name new inputs. A session that cannot load skills runs the
`npm run resume -- <action>` commands itself.

Documents are standing, record or generated.

Always admit `analysis:` (pause for diagnosis or direction) and
`operator override:` (suspend gates for authorized recovery), despite repo or
harness failures. Preserve work; invent no dispatch or pass. Exit: either prefix
plus `off`. Codex: `node scripts/operator-control.mjs analysis|override|off|status`.
Host permissions apply.

Verify in a session-launched browser: structured state, then DOM and
accessibility tree via the Playwright MCP snapshot, then network/event data,
then a screenshot read as an image; or use project browser tests. Desktop
control and the operator's own browser sessions require
`features.desktop-control` in `dotln.config.json` (off by default) and the
operator's explicit request in this session.

<!-- dotln-kit:start -->
Kit provenance (commit, tag, remote): UPSTREAM.md. Kit files and their hashes: KIT-MANIFEST.json. How to start: README.md.
Document roots: dotln.config.json, default docs/; see dotln.config.example.json.
The export carries the compiled runtime in packages/<name>/dist/ (KIT-MANIFEST.json hashes) and its emitted Contributor harness bundle. node scripts/harness.mjs check verifies every generated surface and pinned runtime snapshot. Hooks import .runtime/harness/ (ignored). Fresh clones run node scripts/bootstrap.mjs once: npm ci, then emit installs the snapshot. Until then, hooks report snapshot-missing once per session; host permissions decide.
<!-- dotln-kit:end -->

<!-- dotln-harness:start -->
Read[executor]: `@skills/dotln-executor/SKILL.md` — next, fix, status, times.
Read[verifier]: `@skills/dotln-verifier/SKILL.md` — verify.
Read[reviewer]: `@skills/dotln-reviewer/SKILL.md` — final review.
Read[release-close]: `@skills/dotln-release-close/SKILL.md` — release close.
Read[planner]: `@skills/dotln-planner/SKILL.md` — planning or ideation.
Capabilities and residue: .claude/harness-manifest.json; planning: refute[ full] selects dotln-refuter; drive: WO-NNN selects dotln-router.
DotLn has 8 refusals (WO-135, WO-139, WO-144, WO-234, WO-251, WO-250): it reserves one writer per worktree on any branch, including main; refuses writes to gate inputs or the success record during a live gate, admitting only the active order's own evidence, verification and final-review directories at the default document roots during a product gate; on planning/ branches refuses repository writes outside docs/ and root Markdown; refuses observable subagent admissions beyond docs/control/budgets.json subagentCap (default 20; null disables); refuses known outside-project write destinations without a containing root granted by the active role or equipped support; refuses a complete gate, bounded probe or worker launch past the dispatch bound, naming analysis: and the operator's accept-overrun route; refuses desktop control and the operator's own browser sessions unless dotln.config.json elects features.desktop-control; an election still requires the operator's explicit request in the session, and browser verification uses the Playwright MCP in a browser the session launches or the project's browser tests; refuses a review worker's test-runner gate. Product tasks fail on observed reads of the admitted record paths; document and mixed review gates retain the full refusal. Literal redirects are judged on any program; expansions such as $PWD and a program's own effects remain unobserved under host permissions; grant failures admit with one advisory and preserve the other refusals, except an unresolvable order-worktree root, which withholds that grant alone. Descendants count at their first attributable tool call; unresolved direct/child overlap is a reported minimum, and unobserved agents remain unknown. Inspect the writer with node scripts/harness.mjs writer --show; stop this session's gate with node scripts/harness.mjs evidence --stop; use operator override: for authorized recovery. Claude hooks enforce these 8 refusals at observed boundaries; under Codex a lifecycle dispatch reserves the writer and refuses a foreign holder, the gate, bounded wrapper and lifecycle enforce dispatch bounds in process; the other duties and grants are role text because Codex tool calls are unhooked. Copilot reuses the Claude registration: scripted denials hold with allow-all; missing tool-call and child identity leave subagent accounting advisory; WO-146 evidence records interactive qualification. Other tool and completion judgments are advisory and host permissions decide. The separate Codex compaction adapter restores an owned unfinished task and permits one continuation after premature stopping; it never dispatches a role or changes writer ownership.
claude-code-2.1.263: clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
codex-cli-0.153.4: concurrent-work-requires-worktrees, no-attribution, no-lint-type-disables-as-fixes, no-partial-completion, read-your-own-output, verify-app-before-done: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty. contributor.permissions: Pre-effect envelope checks unavailable in this harness; host permission settings decide. clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
copilot-cli-1.0.86: clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
<!-- dotln-harness:end -->
