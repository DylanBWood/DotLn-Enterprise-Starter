# Launchpad

This file is the operating contract every session in this repository reads;
`AGENTS.md` is a symlink to it. The hand-written floor below is instance-owned:
edit it here; an upstream kit update changes it only through explicitly
opted-in instance actions. The marked blocks
at the end are generated: the kit block by the export (its provenance) and the
harness block by `node scripts/harness.mjs emit`, which `harness check`
verifies.

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

Whole `resume:` phrases select their skill through canonical status
(`npm run resume -- status --json` is the record). `@skills`: `.claude/skills`
in Claude, `.agents/skills` in Codex. `AGENTS.md` symlinks here.

Read[all roles]: `docs/operator/README.md` — who the operator is, how they
direct, how to read their tone; one record binding every harness and role.

Expand skill read/review selectors from order/report paths. Read cited sections;
name new inputs. A session that cannot load skills runs the
`npm run resume -- <action>` commands itself.

Always admit `analysis:` (pause for diagnosis or direction) and
`operator override:` (suspend gates for authorized recovery), despite repo or
harness failures. Preserve work; invent no dispatch or pass. Exit: either prefix
plus `off`. Codex: `node scripts/operator-control.mjs analysis|override|off|status`.
Host permissions apply.

<!-- dotln-kit:start -->
Kit provenance (commit, tag, remote): UPSTREAM.md. Kit files and their hashes: KIT-MANIFEST.json. How to start: README.md.
The control plane finds its documents through dotln.config.json at this root; its absence means the default layout under docs/ (dotln.config.example.json shows it).
This export carries the compiled runtime under packages/<name>/dist/ (hashed in KIT-MANIFEST.json) and the Contributor harness bundle its own emit wrote from it; node scripts/harness.mjs check verifies the pinned runtime snapshot and every generated surface. The hooks import an ignored snapshot under .runtime/harness/: a fresh clone runs node scripts/bootstrap.mjs once (npm ci, then the emit that installs it); until then each hook reports snapshot-missing once per session and host permissions alone decide.
<!-- dotln-kit:end -->

<!-- dotln-harness:start -->
Read[executor]: `@skills/dotln-executor/SKILL.md` — next, fix, status, times.
Read[verifier]: `@skills/dotln-verifier/SKILL.md` — verify.
Read[reviewer]: `@skills/dotln-reviewer/SKILL.md` — final review.
Read[release-close]: `@skills/dotln-release-close/SKILL.md` — release close.
Read[planner]: `@skills/dotln-planner/SKILL.md` — planning or ideation.
Capabilities and residue: .claude/harness-manifest.json; planning: refute[ full] selects dotln-refuter.
DotLn has five refusals (WO-135, WO-139, WO-144): it reserves one writer per worktree on any branch, including main; refuses writes to gate inputs or the success record during a live gate, admitting only the active order's own evidence, verification and final-review directories at the default document roots during a product gate; on planning/ branches refuses repository writes outside docs/ and root Markdown; refuses observable subagent admissions beyond docs/control/budgets.json subagentCap (default 20; null disables); and refuses known outside-project write destinations without a containing root granted by the active role or equipped support. Product tasks fail on observed reads of the admitted record paths; document and mixed review gates retain the full refusal. Literal redirects are judged on any program; expansions such as $PWD and a program's own effects remain unobserved under host permissions; grant failures admit with one advisory and preserve the other refusals. Descendants count at their first attributable tool call; unresolved direct/child overlap is a reported minimum, and unobserved agents remain unknown. Inspect the writer with node scripts/harness.mjs writer --show; stop this session's gate with node scripts/harness.mjs evidence --stop; use operator override: for authorized recovery. Claude hooks enforce these five refusals at observed boundaries; under Codex a lifecycle dispatch reserves the writer and refuses a foreign holder, and the other duties and grants are role text because Codex tool calls are unhooked. Copilot reuses the Claude registration: scripted denials hold with allow-all; missing tool-call and child identity leave subagent accounting advisory; WO-146 evidence records interactive qualification. Other tool and completion judgments are advisory and host permissions decide. The separate Codex compaction adapter restores an owned unfinished task and permits one continuation after premature stopping; it never dispatches a role or changes writer ownership.
claude-code-2.1.263: clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
codex-cli-0.153.4: concurrent-work-requires-worktrees: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: no-attribution: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: no-lint-type-disables-as-fixes: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: no-partial-completion: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: read-your-own-output: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: verify-app-before-done: No project hook fired in the bounded Codex probe; the role skill carries the remaining duty.
codex-cli-0.153.4: contributor.permissions: Pre-effect envelope checks unavailable in this harness; host permission settings decide.
codex-cli-0.153.4: clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
copilot-cli-1.0.86: clean-room: Source provenance needs operator judgment; the hand-written Clean Room floor stays locked.
<!-- dotln-harness:end -->
