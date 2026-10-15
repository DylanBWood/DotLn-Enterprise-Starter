# Environment truth (WO-001)

Bounded inspection of this launchpad's machine and AI coding harnesses on
2026-10-14 by the WO-001 executor session in Claude Code. Machine-readable
record: [`environment.json`](environment.json). It carries the effort probe
`scripts/resume.mjs` reads, plus a `checklist` and `auditQuestions` summary
with the same labels as this page; its `provenance` key says which rows
`npm run discover` wrote and which were recorded by hand.

**Labels.** Every finding carries one of the order's eight labels: observed,
documented locally, documented officially, untested, blocked, not found,
ambiguous, operator-attested. A flag or value read from a harness's installed
`--help` output is labeled observed, as `npm run discover` labels it; a value
taken from a repository document or script is documented locally.

**What is not copied.** Paths under the operator's home directory are written
`~` and the repository root `<repo>`. Environment variables are named, never
valued, except `CLAUDE_EFFORT`, whose non-secret effort level is the readback
this order must record ([WO-001-D009](../evidence/WO-001/decisions.md#wo-001-d009-record-the-effort-level-readback-value)).
From user settings only model, effort and sandbox switches are copied.

**How probes ran.** Each probe ran from the repository root under
`node scripts/harness.mjs bounded -- <command>`, one process at a time; the
wrapper refuses outside the Git root. The one permitted smoke per harness ran
from a scratch directory outside the repository
([WO-001-D003](../evidence/WO-001/decisions.md#wo-001-d003-run-each-harness-smoke-from-scratch-not-the-live-smoke)),
so this launchpad's hooks and its one-writer reservation stayed out of it.
Every command is listed in [Commands](#commands).

## Operator note: local Claude Code settings

**operator-attested.** The operator had to create `.claude/settings.local.json`
for this instance. The user-level Claude Code settings enable the sandbox for
every project; this ignored project-local file turns it off here. The operator
reports that sandbox and lock-acquisition checks had failed before the change
and asked for them to be retried.

**observed.** The file is ignored by Git (`.gitignore` line 18). Its top-level
keys are `permissions.allow` (14 rules, not copied) and `sandbox`
(`enabled: false`, `autoAllowBashIfSandboxed: false`). User settings carry
`sandbox.enabled: true`.

| Time (UTC)           | Event                                                         | Label             |
| -------------------- | ------------------------------------------------------------- | ----------------- |
| before 09:00:08      | sandbox and lock checks refused under the user-level sandbox  | operator-attested |
| 09:00:08             | `.claude/settings.local.json` written (file modification time) | observed          |
| 09:00:47             | WO-001 `resume: next` dispatched in this session              | observed          |
| 09:02:33             | first confinement probe in this session: not in force         | observed          |
| 09:17:57             | recorded confinement probe: not in force, no file left        | observed          |
| 09:17:58             | recorded lock probe: acquired and released twice              | observed          |

No earlier sandbox or lock-acquisition run appears in this instance's local
harness records (searched by pattern count, contents not copied), so the
pre-change refusal stays operator-attested.

## 1. Toolchain

| Item          | Label    | Value                                                |
| ------------- | -------- | ---------------------------------------------------- |
| Node          | observed | v26.9.0 (package engines require >=26 <27)           |
| npm           | observed | 11.19.1                                              |
| Git           | observed | 2.55.0                                               |
| OS            | observed | macOS 27.0.1 (build 26A434), Darwin 27.0.0 arm64     |
| Shell         | observed | login shell `/bin/zsh` (zsh 5.9); `/bin/bash` 3.2.57 |
| Git worktrees | observed | this repository: one worktree, branch `main`         |
| Host sandbox  | observed | not in force for this session                        |
| Host lock     | observed | kernel advisory lock acquired and released           |
| Harnesses     | observed | `claude`, `codex`, `copilot` and `gh` on PATH        |

**Worktree behavior (observed).** In a throwaway repository under session
scratch, `git worktree add` created a linked worktree whose `.git` is a file;
checking out `main` in a second worktree was refused with `fatal: 'main' is
already used by worktree at ...`; `git worktree remove` then
`git worktree prune` left one worktree. The scratch repository was deleted.
Scratch paths under `/var/folders` resolve physically to `/private/var/folders`.

**Sandbox confinement (observed).** The probe is the one the test runner uses
before suites that must run outside a sandbox: one exclusive file create in
`.claude/hooks`, the directory the Claude Code sandbox protects according to
`scripts/lib/host-confinement.mjs`, then its removal. It wrote and deleted one
file in `.claude/hooks`, outside the order's write paths
([WO-001-D010](../evidence/WO-001/decisions.md#wo-001-d010-account-for-writes-outside-the-orders-paths));
`node scripts/harness.mjs check` passed again afterwards.

```
node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-confinement.mjs
{"CLAUDECODE":"set","CODEX_SANDBOX":"unset","marker":"claude-code","probe":{"path":"<repo>/.claude/hooks","denied":false,"code":"written"},"inForce":false,"probeFilesLeft":0}
```

**Lock acquisition (observed).** The repository's kernel-lock test cannot run
in this export:

```
node scripts/harness.mjs bounded -- node --test --test-name-pattern="WO-185 kernel locks" scripts/test-host-guard.test.mjs
code: 'ERR_MODULE_NOT_FOUND', url: 'file:///<repo>/corpus/harness/bounded-findings.mjs'
ℹ tests 1  ℹ pass 0  ℹ fail 1
```

The file belongs to the core-only `runner-fixtures` suite
(`scripts/test-runner.mjs` line 999), which this launchpad's `npm test` does
not select; the export ships the test without its fixture. The failure is a
packaging gap, not a sandbox refusal
([WO-001-D004](../evidence/WO-001/decisions.md#wo-001-d004-shipped-host-guard-test-imports-an-unshipped-fixture)).
The shipped lock was exercised directly instead:

```
mkdir -m 700 <scratch dir>
node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-host-lock.mjs <scratch dir>
[{"attempt":1,"result":"acquired","ms":126},{"attempt":2,"result":"acquired","ms":3}]
```

The first attempt includes compiling the native helper, which the lock writes
into the given scratch directory (`host-lock-<digest>`). An earlier try against
a directory created without `-m 700` was refused with `Host coordination root
must be a private owned directory`, the lock's own ownership guard.

## 2. AI coding harnesses

Versions came from `npm run discover -- harness <name>`. The Claude Code
version was read through `CLAUDE_CODE_EXECPATH`; the `claude` on PATH is the
same file (same real path, same `2.1.299`). The kit's generated harness block
in `CLAUDE.md` names the versions its own probes used (claude-code 2.1.263,
codex-cli 0.153.4, copilot-cli 1.0.86); the installed versions are newer, so
the kit's per-version notes below are documented locally for those older
versions only.

| Facet                | Claude Code 2.1.299                                     | Codex CLI 0.162.1                                                                              | Copilot CLI 1.0.94                                                         |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Non-interactive mode | observed: `-p/--print`                                  | observed: `codex exec`                                                                         | observed: `-p/--prompt`                                                    |
| Output formats       | observed: `text`, `json`, `stream-json`                 | observed: text, JSONL (`--json`), `--output-schema <file>`                                     | observed: `text`, `json` (JSONL)                                           |
| Model selection      | observed: `--model`; user setting `opus`                | observed: `-m/--model`; user config `gpt-6.1-sol`                                              | observed: `--model`; nothing persisted                                     |
| Session effort       | observed: `--effort` low, medium, high, xhigh, max      | documented locally: `-c model_reasoning_effort="<level>"` with low, medium, high, xhigh, max   | observed: `--reasoning-effort` none, minimal, low, medium, high, xhigh, max |
| Persisted effort     | observed: `xhigh` for each configured model             | observed: `max`                                                                                | observed: `xhigh`                                                          |
| Effort readback      | observed: `CLAUDE_EFFORT` `xhigh` (selected)            | not found: `exec` events carry no effort field                                                 | observed: usage event `reasoning_effort` `xhigh` (selected)                |
| Settings sources     | observed: user, project and local all apply             | untested: smoke ran outside the repository (D003); project config is one comment line          | untested: smoke ran outside the repository (D003)                          |
| Hooks                | observed: 7 project hook events registered; they fire here | untested on 0.162.1 (D003); kit's 0.153.4 probe saw none fire (documented locally)          | untested on 1.0.94 (D003); kit's 1.0.86 notes: reuses the Claude registration (documented locally) |
| Instruction files    | observed: `~/.claude/CLAUDE.md` and `CLAUDE.md` in this session's context | untested: `AGENTS.md` symlinks to `CLAUDE.md` (observed); loading untested (D003) | not found: no `.github/copilot-instructions.md` or `~/.copilot/copilot-instructions.md`; whether it reads `AGENTS.md` or `CLAUDE.md` is untested (D003) |

Codex's help shows `-c/--config` but lists no effort values; the five values
are those `scripts/probe-codex-effort.mjs` passes, so they document what DotLn
sends, not a set Codex was seen to accept. `npm run discover` reports
`effortSelectorPresent: false` for Copilot and Codex because it matches only
`--effort`; both selectors above were recorded by hand
([WO-001-D005](../evidence/WO-001/decisions.md#wo-001-d005-discover-misses-codex-and-copilot-effort-selectors)).
`gpt-6.1-sol` is the Codex model the kit's own execution guide pins for
workers.

**Smoke, one per harness (observed).** Each ran once from session scratch:

| Harness | Command                                                                                              | Result                                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Claude  | `claude -p "Reply with exactly the word OK." --output-format json`                                   | one `result` object, `subtype: success`, `result: OK`, one turn, model `claude-opus-5-5`, 2.9 s                               |
| Codex   | `codex exec --json --skip-git-repo-check --ephemeral -s read-only "Reply with exactly the word OK."` | JSONL `thread.started`, `turn.started`, `item.completed` (agent message `OK`), `turn.completed` with usage; no model; 6.0 s   |
| Copilot | `copilot -p "Reply with exactly the word OK." --output-format json --no-color`                       | 19 JSONL events ending in `result`; reply `OK`; model `claude-sonnet-5.5`; 4.5 s                                             |

Codex printed one non-JSON stderr line, `Reading additional input from
stdin...`, with stdin closed. `--max-turns` is not in Claude Code 2.1.299's
help.

**Startup context (metadata only).** Bytes are `wc -c` (observed). The last
column says whether and how a fresh session loads the file into model context.

| Harness | File                                  | Bytes         | Loaded at startup                                                                    |
| ------- | ------------------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| Claude  | `~/.claude/CLAUDE.md`                 | 660           | observed: present in this session's context                                         |
| Claude  | `CLAUDE.md`                           | 6,871         | observed: present in this session's context                                         |
| Claude  | `.claude/skills/*/SKILL.md` (6)       | 10,163–21,239 | observed: names and descriptions listed in this session; a body loads on invocation |
| Claude  | `.claude/agents/dotln-worker.md`      | 816           | observed: the agent type is listed in this session; its file loads on spawn         |
| Codex   | `AGENTS.md` (symlink to `CLAUDE.md`)  | 6,871         | untested (D003)                                                                      |
| Codex   | `~/.codex/AGENTS.md`                  | 3,252         | untested (D003)                                                                      |
| Codex   | `.agents/skills/*/SKILL.md` (6)       | 10,163–21,239 | untested (D003)                                                                      |
| Copilot | Copilot instruction files             | none          | not found (names above)                                                              |

Configuration loaded without entering model context: `.claude/settings.json`
(3,538 bytes; 7 hook events; `autoMemoryEnabled: false`, so no automatic
memory file is loaded) and `.codex/hooks.json` (1,189 bytes).

Token counts (observed): the Claude smoke's first turn in an empty directory
used 2 input plus 25,835 cache-write tokens, the harness baseline plus the user
instruction file. The Codex smoke used 17,676 input tokens (13,184 cached).
Copilot's usage event reported 28 tools costing 12,416 tool tokens. This
session's first readback, 88,930 total tokens at dispatch scope, is ambiguous
as a startup figure because it already includes the executor skill body and
the first tool calls.

## 3. Harness smoke

**observed.** Run bounded at 09:04:38Z, and again unbounded after the probe
writes:

```
node scripts/harness.mjs bounded -- node scripts/harness.mjs check
bounded-start {"budgetBytes":12884901888,"physicalBytes":51539607552}
PROGRESS [bounded-probe] started
harness check: 34 generated surfaces; local-terms list: present
bounded-result {"name":"bounded-probe","durationMs":164,...,"exitCode":0,"executed":true}

node scripts/harness.mjs check
harness check: 34 generated surfaces; local-terms list: present
exit 0
```

The bounded-result line is shortened to its name, duration and exit fields.
The live smoke (`DOTLN_LIVE_HARNESS=1 node scripts/harness-live-smoke.mjs
executor 001`) is untested: the order leaves it to the instance, and this
inspection used the one permitted print-mode smoke per harness instead (D003).

## 4. Local-terms registration

**observed.** `docs/control/local/terms.txt` already existed, created before
this dispatch, with 9 terms, ignored by Git; it was not changed and its terms
are not printed.

```
npm run terms -- check CLAUDE.md README.md docs/product/07-execution-guide.md
local-terms list: present
exit 0
```

No match was reported, so no text needed fixing before filing. The same check
over every file this order adds or changes also printed
`local-terms list: present` with exit 0.

## 5. Audit questions

**Gateway and provider behavior.**

- Configured intermediary: not found. No proxy, base-URL, endpoint or gateway
  environment variable is set in the shell every smoke inherited (names
  checked; only the host's own `CLAUDE_*` session names exist), and neither
  the Codex nor the Copilot user configuration has a provider, base-URL,
  endpoint or proxy key (key names checked).
- Copilot's service layer: observed. Copilot's events carry the layer's own
  request identifiers, a per-request metering unit and a 28-tool catalog it
  attaches, and with no persisted model it ran a model from another provider's
  family. Whether that layer alone decides the models offered is ambiguous
  from one run.
- Models: observed. Claude Code's JSON result names the model and reports
  usage per model; Codex's events report usage but no model.
- Request limits: untested; the order excludes probing and none was
  encountered.
- Logging: observed. Claude Code keeps a local transcript that feeds this
  launchpad's usage readback; Codex persists sessions unless `--ephemeral`
  and Copilot writes logs to a default log directory (both from installed
  help).
- Provider-side retention: not found; it is not observable from the client
  and no local document records it.

**Metering between foreground and delegated execution.**

- Separate accounting: observed. The DotLn usage readback reports the
  foreground session's tokens at dispatch scope and counts subagents
  separately (`count`, `cap` 20, `remaining`, `countKind: exact-observed`,
  `uncountedRemainder: unknown`). Claude Code's print-mode result has a
  separate `subagent_stats` field beside `usage` and `modelUsage`. Copilot's
  usage event marks each request's initiator (`user` in the smoke). Codex
  reports per-turn usage including reasoning tokens.
- Delegated runs in Claude Code: observed at handoff. This order's two
  self-review agents were counted by the readback (`count` 2, `remaining` 18)
  and the host reported each one's tokens separately in its task
  notifications (75,574 and 81,801). Whether those tokens are inside the
  readback's foreground `totalTokens` is untested; the readback shows no
  per-agent split. Codex and Copilot delegated metering is untested; no
  delegated run was made in either.

**Interruption recovery.**

- Resume: observed from installed help. Claude Code restores a conversation
  with `--continue` or `--resume <session-id>`; Codex offers `codex resume`
  (`--last` or by id) and `codex fork`, and an `--ephemeral` run keeps nothing
  to resume; Copilot offers `-r/--resume` and `--continue`.
- Compaction: documented locally. Claude Code summarizes earlier context into
  the next window; the repository's separate Codex compaction adapter restores
  an owned unfinished task (`CLAUDE.md`).
- Launchpad state: observed. The lifecycle event log under
  `docs/control/orders/`, the checkpoint ref `refs/dotln/checkpoint/WO-001/1`
  (`npm run resume -- status --json`) and the writer reservation live in files
  and Git refs that outlive any harness process.
- What is lost (running processes, background tasks, shell state, an
  in-flight tool call) and crash recovery: untested; no interruption or crash
  was induced in a bounded inspection.

**Managed-settings precedence.**

- Claude Code, local over user: ambiguous. The user settings enable the
  sandbox, the project-local settings disable it, and the confinement probe
  found it not in force, which matches local winning. No refusal under the
  user layer alone was recorded in this instance to contrast with; that
  earlier refusal is operator-attested.
- Managed layer: not found for Claude Code
  (`/Library/Application Support/ClaudeCode/managed-settings.json`) or Codex
  (`/etc/codex`). Whether a managed layer would override both is untested;
  creating one would mutate configuration, which the order excludes. No
  managed location for Copilot is documented locally, so it was not checked
  (untested).
- Copilot: a persisted effort applied when no flag was given (`xhigh` in its
  usage event, observed); its user-versus-project precedence is untested.

## Classification summary

| Checklist item                           | Label                                                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1. Toolchain and worktrees               | observed                                                                                           |
| 2. Versions, modes and output formats    | observed                                                                                           |
| 2. Model and effort selection            | observed; Codex effort values documented locally; Codex readback not found                         |
| 2. Settings sources, hooks, instructions | observed for Claude Code; untested for Codex and Copilot (D003)                                     |
| 2. Startup context                       | observed for Claude Code; untested for Codex; not found for Copilot; this session's figure ambiguous |
| 3. Harness smoke                         | observed; live smoke untested (D003)                                                               |
| 4. Local-terms registration              | observed                                                                                           |
| 5. Gateway and provider behavior         | observed; layer decides models ambiguous; request limits untested; retention not found             |
| 5. Metering                              | observed (Claude Code delegated runs counted separately); foreground inclusion and Codex, Copilot untested |
| 5. Interruption recovery                 | observed (help); compaction documented locally; losses and crash untested                          |
| 5. Managed-settings precedence           | local over user ambiguous; managed layer not found; managed override untested                      |

## Commands

Every command behind this record, in the order run. Output that could carry
private values was reduced inside the command to key names, counts or the
named switches.

```
pwd; git rev-parse --show-toplevel; git status --short
npm run resume --silent -- status --json
node scripts/harness.mjs usage <session>; echo ${CLAUDE_EFFORT}
ls -la .claude/; stat -f '%N mtime=%Sm size=%z' .claude/settings.local.json .claude/settings.json
git check-ignore -v .claude/settings.local.json
node -e '<top-level key shapes of .claude/settings.json and .claude/settings.local.json>'
node -e '<count of permissions.allow; sandbox.enabled; sandbox.autoAllowBashIfSandboxed>'
TZ=UTC stat -f '%Sm' -t '%Y-%m-%dT%H:%M:%SZ' .claude/settings.local.json
grep -c -- '<pattern>' <prior session journal>      # lock, sandbox, test-runner patterns; counts only
node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-confinement.mjs
ls -a .claude/hooks | grep -c dotln-confinement-probe
node scripts/harness.mjs bounded -- node --test --test-name-pattern="WO-185 kernel locks" scripts/test-host-guard.test.mjs
mkdir -m 700 <scratch dir>; node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-host-lock.mjs <scratch dir>
node --version; npm --version; git --version; sw_vers; uname -srm
echo $SHELL; zsh --version; bash --version
git worktree list --porcelain; git config --get extensions.worktreeConfig; git config --get core.hooksPath
command -v claude codex copilot gh
git init; git worktree add -b probe ../repo-wt; git worktree add ../repo-wt2 main; git worktree remove ../repo-wt; git worktree prune   # scratch repository
claude --version; codex --version; copilot --version; "$CLAUDE_CODE_EXECPATH" --version
claude --help; codex --help; codex exec --help; copilot --help   # filtered with grep for the flags above
node -e '<model, effort and sandbox keys only from ~/.claude/settings.json and ~/.copilot/settings.json>'
grep -E '^\s*(model|model_reasoning_effort|profile)\s*=' ~/.codex/config.toml
grep -E -o '<provider|base_url|endpoint|proxy key names>' ~/.codex/config.toml ~/.copilot/config.json
ls '/Library/Application Support/ClaudeCode/' /etc/codex ~/.claude/managed-settings.json
env | cut -d= -f1 | grep -E -i 'proxy|base_url|_endpoint|api_base|gateway|ANTHROPIC|OPENAI|COPILOT|CLAUDE|CODEX|GH_|GITHUB'
wc -c ~/.claude/CLAUDE.md CLAUDE.md .claude/skills/*/SKILL.md .claude/agents/*.md AGENTS.md ~/.codex/AGENTS.md .agents/skills/*/SKILL.md .codex/hooks.json .codex/config.toml
ls .github/copilot-instructions.md ~/.copilot/copilot-instructions.md
node scripts/harness.mjs bounded -- node scripts/harness.mjs check; node scripts/harness.mjs check
npm run terms -- check CLAUDE.md README.md docs/product/07-execution-guide.md
npm run terms -- check <every file this order adds or changes>
node scripts/harness.mjs bounded -- sh -c 'cd <scratch> && exec claude -p "Reply with exactly the word OK." --output-format json'
node scripts/harness.mjs bounded -- sh -c 'cd <scratch> && exec codex exec --json --skip-git-repo-check --ephemeral -s read-only "Reply with exactly the word OK." </dev/null'
node scripts/harness.mjs bounded -- sh -c 'cd <scratch> && exec copilot -p "Reply with exactly the word OK." --output-format json --no-color </dev/null'
node scripts/harness.mjs bounded -- npm run discover -- harness claude-code   # then codex-cli, copilot-cli
node scripts/harness.mjs bounded -- node docs/evidence/WO-001/check-attestation.mjs
node docs/evidence/WO-001/execution-guide-links.mjs > docs/evidence/WO-001/execution-guide-links.txt
```

The attestation check parses one completion attestation per harness with the
lifecycle's own parser, without recording anything:

```
{"harness":"claude-code","version":"2.1.299","effort":"xhigh","advisory":"none","error":null}
{"harness":"codex-cli","version":"0.162.1","effort":"max","advisory":"none","error":null}
{"harness":"copilot-cli","version":"1.0.94","effort":"xhigh","advisory":"none","error":null}
{"harness":"codex-cli","version":"9.9.9","effort":"max","advisory":["Advisory: attestation recorded as supplied; codex-cli 9.9.9 effort max has no matching discovery observation."],"error":null}
```

The last row is a control: an unobserved version prints the advisory.
`scripts/resume.mjs` accepts a session or persisted selector labeled observed
or documented locally, which is why the Codex row prints none.
