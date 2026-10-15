// Parses one completion attestation per harness with the same function the
// lifecycle commands use, without recording anything, and reports whether it
// printed the discovery advisory. The last case is an unobserved version and
// must print it. Run from the repository root inside a Claude Code session
// (the Claude case attests the session's own effort readback):
//
//   node scripts/harness.mjs bounded -- node docs/evidence/WO-001/check-attestation.mjs
import { parseActor } from "../../../scripts/resume.mjs";

const cases = [
  [
    "claude-code",
    "2.1.299",
    "claude-opus-5-5",
    "xhigh",
    "claude-session-readback",
  ],
  ["codex-cli", "0.162.1", "gpt-6.1-sol", "max", "operator-attested"],
  ["copilot-cli", "1.0.94", "claude-sonnet-5.5", "xhigh", "operator-attested"],
  ["codex-cli", "9.9.9", "gpt-6.1-sol", "max", "operator-attested"],
];
for (const [harness, version, model, effort, source] of cases) {
  const warnings = [];
  const warn = console.warn;
  console.warn = (message) => warnings.push(String(message));
  let error = null;
  try {
    parseActor("implementation-ready", [
      "--harness",
      harness,
      "--harness-version",
      version,
      "--model",
      model,
      "--effort",
      effort,
      "--source",
      source,
    ]);
  } catch (caught) {
    error = caught.message;
  } finally {
    console.warn = warn;
  }
  console.log(
    JSON.stringify({
      harness,
      version,
      effort,
      advisory: warnings.length ? warnings : "none",
      error,
    }),
  );
}
