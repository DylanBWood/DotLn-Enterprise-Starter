import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readControl } from "../../../scripts/lib/control-store.mjs";
import { mainWorktree, runGit } from "../../../scripts/lib/git.mjs";
import {
  reviewedTargetSubject,
  targetWorktreeForOrder,
} from "../../../scripts/lib/target-worktrees.mjs";
import {
  lintReviewedTargetCommits,
  targetCommits,
} from "../../../scripts/lib/target-commit-lint.mjs";
import { checkOutwardArtifact } from "../../../scripts/outward-lint.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const order = "WO-013";
const segment = new URL("../../control/orders/WO-013.jsonl", import.meta.url);
const before = readFileSync(segment);
const state = readControl(root).orders.get(order).state;
const entry = targetWorktreeForOrder(root, order);
const subject = reviewedTargetSubject(root, state);
const git = (...args) =>
  runGit(entry.target, ["--no-replace-objects", ...args]);
const baseTip = git("rev-parse", "refs/remotes/origin/main");
const describedBase = git("merge-base", subject.commit, baseTip);
const tree = git("rev-parse", `${subject.commit}^{tree}`);
const activationCommits = targetCommits(
  entry.target,
  subject.baseCommit,
  subject.commit,
);
const describedCommits = targetCommits(
  entry.target,
  describedBase,
  subject.commit,
);
const oldRangeRefusals = activationCommits.flatMap(({ sha, message }) => {
  const result = checkOutwardArtifact(mainWorktree(root), {
    kind: "commit",
    text: message,
    target: true,
  });
  return result.checks.format.status === "pass"
    ? []
    : [{ commit: sha, subjectLength: message.split("\n")[0].length }];
});

assert.equal(subject.baseCommit, "bc9133e932a00d33c15bc5289d683b8078f51ee4");
assert.equal(baseTip, "2ab4f28501628cf95dd0102c42440fd7de9f8055");
assert.equal(describedBase, baseTip);
assert.equal(subject.commit, "99a30befa150e5d77a64259013e62b9d0372270e");
assert.equal(tree, "dc997234bc57801c1909a76fa45f5524f3e3dfab");
assert.equal(activationCommits.length, 17);
assert.equal(describedCommits.length, 1);
assert.equal(describedCommits[0].message.split("\n")[0].length, 61);
assert.deepEqual(
  oldRangeRefusals.map(({ subjectLength }) => subjectLength).sort(),
  [78, 90],
);
assert.equal(git("status", "--porcelain=v1", "--untracked-files=all"), "");
assert.doesNotThrow(() => lintReviewedTargetCommits(root, state, subject));
assert.deepEqual(readFileSync(segment), before);
assert.equal(git("status", "--porcelain=v1", "--untracked-files=all"), "");

console.log(
  JSON.stringify(
    {
      recordedAt: new Date().toISOString(),
      command:
        "node scripts/harness.mjs bounded -- node docs/evidence/WO-013/repair-commit-lint.mjs",
      activationBase: subject.baseCommit,
      fetchedBaseTip: baseTip,
      describedBase,
      subjectCommit: subject.commit,
      targetTree: tree,
      activationRangeCommits: activationCommits.length,
      describedRangeCommits: describedCommits.length,
      subjectLength: 61,
      oldRangeRefusals,
      updatedLint: "pass",
      controlSegmentUnchanged: true,
      controlSegmentSha256: createHash("sha256").update(before).digest("hex"),
      targetCleanBeforeAndAfter: true,
      limit:
        "Calls the same lint as final-review-result pass without recording a lifecycle result or publishing.",
    },
    null,
    2,
  ),
);
