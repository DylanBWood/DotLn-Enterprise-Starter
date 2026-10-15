// Reports whether a host sandbox confines this process, using the same probe
// the test runner applies before suites that must run outside a sandbox: one
// exclusive file create in the directory the harness's sandbox protects, then
// its removal. Prints one JSON line with repository paths shortened to <repo>
// and counts any probe file left behind.
//
//   node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-confinement.mjs
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { detectHostConfinement } from "../../../scripts/lib/host-confinement.mjs";

const repo = fileURLToPath(new URL("../../..", import.meta.url)).replace(
  /\/$/,
  "",
);
const result = detectHostConfinement(repo);
const left = readdirSync(`${repo}/.claude/hooks`).filter((name) =>
  name.startsWith(".dotln-confinement-probe-"),
).length;
console.log(
  JSON.stringify({
    CLAUDECODE: process.env.CLAUDECODE ? "set" : "unset",
    CODEX_SANDBOX: process.env.CODEX_SANDBOX ? "set" : "unset",
    ...result,
    probeFilesLeft: left,
  }).replaceAll(repo, "<repo>"),
);
