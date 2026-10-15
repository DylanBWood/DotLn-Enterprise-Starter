// Independent WO-001 verification. Each mode runs separately under harness
// bounded. Private configuration values and local terms are never printed.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseActor } from "../../../scripts/resume.mjs";
import { probeHarness } from "../../../scripts/discover.mjs";
import { checkLocalTerms } from "../../../scripts/lib/terms.mjs";
import { withHostLock } from "../../../scripts/lib/host-resources.mjs";
import { coveringGateCheck } from "../../../scripts/lib/gate-reuse.mjs";
import { gateCodeIdentity } from "../../../scripts/lib/gate-evidence.mjs";

const root = realpathSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "../../.."),
);
assert.equal(realpathSync(process.cwd()), root, "run at the selected Git root");
const document = JSON.parse(
  readFileSync(join(root, "docs/discovery/environment.json"), "utf8"),
);
const human = readFileSync(join(root, document.humanRecord), "utf8");
const harnesses = document.effortReadbackProbe.harnesses;
const emit = (value) => console.log(JSON.stringify(value));
const run = (command, args, cwd = root) => {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    timeout: 10000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.status, 0, `${command} ${args[0]} must succeed`);
  return result.stdout;
};

switch (process.argv[2]) {
  case "records": {
    const labels = new Set(document.labels);
    assert.equal(labels.size, 8);
    let classifications = 0;
    const checkLabels = (value, path = "environment") => {
      if (!value || typeof value !== "object") return;
      if (Object.hasOwn(value, "classification")) {
        classifications += 1;
        assert.ok(labels.has(value.classification), `${path}: declared label`);
        if (
          ["untested", "not found", "ambiguous", "blocked"].includes(
            value.classification,
          )
        )
          assert.ok(
            value.reason || value.note,
            `${path}: unknown has a reason`,
          );
      }
      for (const [key, child] of Object.entries(value))
        checkLabels(child, `${path}.${key}`);
    };
    checkLabels(document);
    assert.equal(Object.keys(document.checklist).length, 8);
    for (const name of ["claude-code", "codex-cli", "copilot-cli"]) {
      const record = harnesses[name];
      assert.ok(
        record.versions.some((row) => row.classification === "observed"),
      );
      for (const facet of [
        "printMode",
        "modelSelector",
        "sessionEffortSelector",
        "persistedEffortSelector",
        "settingsSources",
        "hooks",
        "instructionFiles",
      ])
        assert.ok(record[facet]?.classification, `${name}.${facet}: labeled`);
      assert.ok(Array.isArray(record.sessionEffortSelector.values));
      assert.equal(typeof record.persistedEffortSelector.value, "string");
      assert.ok(record.selectedSessionReadback || record.effortReadbackNote);
      assert.ok(document.startupContext[name].length);
    }
    assert.equal(Object.keys(document.auditQuestions).length, 4);
    const audit = human
      .split("## 5. Audit questions")[1]
      .split("## Classification")[0];
    assert.equal((audit.match(/^\*\*[^\n]+\.\*\*$/gm) ?? []).length, 4);
    assert.ok(!/https?:\/\/|[\w-]+\.(?:com|net|org|internal)\b/i.test(audit));
    emit({
      mode: "records",
      classifications,
      checklistGroups: 8,
      auditQuestions: 4,
    });

    const attest = (harness, version, effort, variant = "normal") => {
      const args = [
        "--harness",
        harness,
        "--harness-version",
        version,
        "--model",
        "public-verification-fixture",
        "--effort",
        effort,
        "--source",
        "operator-attested",
      ];
      if (variant === "duplicate") args.push("--effort", effort);
      if (variant === "missing") args.splice(8, 2);
      const warnings = [];
      const savedWarn = console.warn;
      console.warn = (message) => warnings.push(String(message));
      let accepted = true;
      try {
        // An empty fixture environment tests discovery, not another session's
        // Claude readback. No live environment variable is set or changed.
        parseActor("verification-result", args, "", {});
      } catch {
        accepted = false;
      } finally {
        console.warn = savedWarn;
      }
      return {
        harness,
        version,
        effort,
        variant,
        accepted,
        advisories: warnings.length,
      };
    };
    for (const [harness, version, effort] of [
      ["claude-code", "2.1.299", "xhigh"],
      ["codex-cli", "0.162.1", "max"],
      ["copilot-cli", "1.0.94", "xhigh"],
    ]) {
      const result = attest(harness, version, effort);
      assert.ok(result.accepted && result.advisories === 0);
      emit(result);
    }
    for (const [version, effort] of [
      ["9.9.9", "max"],
      ["0.162.1", "unobserved-effort"],
    ]) {
      const result = attest("codex-cli", version, effort);
      assert.ok(result.accepted && result.advisories === 1);
      emit(result);
    }
    for (const variant of ["duplicate", "missing"]) {
      const result = attest("codex-cli", "0.162.1", "max", variant);
      assert.ok(!result.accepted);
      emit(result);
    }
    break;
  }
  case "installed": {
    const versions = {
      node: run("node", ["--version"]).trim(),
      npm: run("npm", ["--version"]).trim(),
      git: run("git", ["--version"])
        .trim()
        .replace(/^git version /, ""),
    };
    for (const [name, value] of Object.entries(versions))
      assert.equal(value, document.toolchain[name].value);
    emit({ mode: "installed", toolchain: versions });
    for (const name of Object.keys(harnesses)) {
      const row = probeHarness(name);
      assert.ok(
        harnesses[name].versions.some((version) => version.value === row.value),
      );
      emit({ harness: name, version: row.value, probe: row.probe });
    }
    const claude = run("claude", ["--help"]);
    const codex = run("codex", ["exec", "--help"]);
    const copilot = run("copilot", ["--help"]);
    assert.ok(/--output-format/.test(claude) && /stream-json/.test(claude));
    assert.ok(/--json/.test(codex) && /--output-schema/.test(codex));
    assert.ok(
      /--reasoning-effort/.test(copilot) && /--output-format/.test(copilot),
    );
    for (const effort of harnesses["copilot-cli"].sessionEffortSelector.values)
      assert.ok(new RegExp(`\\b${effort}\\b`).test(copilot));
    emit({ installedHelpFormatsMatch: true, copilotEffortValuesMatch: true });
    break;
  }
  case "terms-controls": {
    const scratch = mkdtempSync(join(tmpdir(), "dotln-ver001-terms-"));
    try {
      const path = join(scratch, "docs/control/local/terms.txt");
      mkdirSync(dirname(path), { recursive: true });
      assert.equal(checkLocalTerms(scratch, []).status, "unavailable");
      writeFileSync(path, "\n");
      assert.throws(() => checkLocalTerms(scratch, []), /empty or malformed/);
      writeFileSync(path, "publicverificationfixture\n");
      assert.equal(
        checkLocalTerms(scratch, [
          { name: "fixture.md", text: "ordinary prose" },
        ]).status,
        "present",
      );
      let refusal;
      try {
        checkLocalTerms(scratch, [
          {
            name: "fixture.md",
            text: "ordinary prose\nPUBLIC-verification-fixture",
          },
        ]);
      } catch (error) {
        refusal = error.message;
      }
      assert.match(refusal, /"file":"fixture.md","line":2,"count":1/);
      assert.ok(!refusal.includes("publicverificationfixture"));
      emit({
        mode: "terms-controls",
        missing: "unavailable",
        empty: "refused",
        clean: "present",
        match: "refused by file and line; term omitted",
      });
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
    break;
  }
  case "behavior": {
    const scratch = mkdtempSync(join(tmpdir(), "dotln-ver001-behavior-"));
    try {
      const repo = join(scratch, "repo");
      const template = join(scratch, "empty-template");
      const linked = join(scratch, "linked");
      mkdirSync(repo);
      mkdirSync(template);
      run("git", ["init", "-b", "main", `--template=${template}`], repo);
      run(
        "git",
        [
          "-c",
          "user.name=Verification",
          "-c",
          "user.email=verification@example.invalid",
          "-c",
          "commit.gpgSign=false",
          "-c",
          `core.hooksPath=${template}`,
          "commit",
          "--allow-empty",
          "-m",
          "public verification fixture",
        ],
        repo,
      );
      run("git", ["worktree", "add", "-b", "verification-probe", linked], repo);
      assert.ok(statSync(join(linked, ".git")).isFile());
      const collision = spawnSync(
        "git",
        ["worktree", "add", join(scratch, "collision"), "main"],
        { cwd: repo, encoding: "utf8" },
      );
      assert.notEqual(collision.status, 0);
      assert.match(collision.stderr, /already used by worktree/);
      run("git", ["worktree", "remove", linked], repo);
      run("git", ["worktree", "prune"], repo);
      assert.equal(
        (
          run("git", ["worktree", "list", "--porcelain"], repo).match(
            /^worktree /gm,
          ) ?? []
        ).length,
        1,
      );
      const lockRoot = join(scratch, "locks");
      mkdirSync(lockRoot, { mode: 0o700 });
      const acquisitions = [];
      for (let attempt = 1; attempt <= 2; attempt += 1)
        acquisitions.push(
          await withHostLock(lockRoot, "verification", async () => "acquired"),
        );
      await assert.rejects(
        withHostLock(lockRoot, "verification", async () => {
          throw new Error("public callback fixture");
        }),
        /public callback fixture/,
      );
      acquisitions.push(
        await withHostLock(
          lockRoot,
          "verification",
          async () => "acquired-after-callback-error",
        ),
      );
      const unsafeRoot = join(scratch, "non-private-locks");
      mkdirSync(unsafeRoot);
      chmodSync(unsafeRoot, 0o755);
      await assert.rejects(
        withHostLock(unsafeRoot, "verification", async () => null),
        /Host coordination root must be a private owned directory/,
      );
      emit({
        mode: "behavior",
        linkedGitFile: true,
        duplicateMain: "refused",
        remainingWorktrees: 1,
        acquisitions,
        nonPrivateRoot: "refused",
      });
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
    break;
  }
  case "followups": {
    const imports = readFileSync(
      join(root, "scripts/test-host-guard.test.mjs"),
      "utf8",
    );
    assert.ok(imports.includes("corpus/harness/bounded-findings.mjs"));
    assert.ok(!existsSync(join(root, "corpus/harness/bounded-findings.mjs")));
    const inventory = run("node", [
      "docs/evidence/WO-001/execution-guide-links.mjs",
    ]);
    assert.equal(
      inventory,
      readFileSync(
        join(root, "docs/evidence/WO-001/execution-guide-links.txt"),
        "utf8",
      ),
    );
    assert.ok(
      inventory.includes(
        "Distinct targets 57; missing 51; missing and unlisted 46.",
      ),
    );
    assert.equal(run("git", ["branch", "--show-current"]).trim(), "main");
    const release = readFileSync(
      join(root, "scripts/lib/release-preparation.mjs"),
      "utf8",
    );
    assert.ok(
      release.includes("release prepare requires the selected wo-NNN worktree"),
    );
    emit({
      mode: "followups",
      unshippedFixture: true,
      linkInventoryMatches: true,
      relativeTargets: 57,
      missing: 51,
      missingUnlisted: 46,
      seededOrderBranch: "main",
      branchRefusalPresent: true,
    });
    break;
  }
  case "gate": {
    const codeIdentity = gateCodeIdentity(root);
    const coverage = await coveringGateCheck(
      root,
      "npm test",
      [],
      codeIdentity,
    );
    const row = coverage.row;
    emit({
      mode: "gate",
      codeIdentity,
      coveringPass: Boolean(row),
      recordedAt: row?.recordedAt,
      durationMs: row?.durationMs,
      suiteCount: row?.requiredSuites?.length,
      identityUnchanged: row?.identityUnchanged,
    });
    break;
  }
  default:
    throw new Error(
      "select records, installed, terms-controls, behavior, followups or gate",
    );
}
