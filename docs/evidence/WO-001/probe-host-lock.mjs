// Acquires and releases the launchpad's kernel advisory lock twice in a row
// under one name. The second acquisition succeeds only if the first released.
// The directory argument must be a private (mode 0700) directory owned by the
// caller; the lock compiles its native helper there on first use.
//
//   mkdir -m 700 <dir>
//   node scripts/harness.mjs bounded -- node docs/evidence/WO-001/probe-host-lock.mjs <dir>
import { withHostLock } from "../../../scripts/lib/host-resources.mjs";

const directory = process.argv[2];
if (!directory)
  throw new Error("usage: probe-host-lock.mjs <private-directory>");
const attempts = [];
for (const attempt of [1, 2]) {
  const started = Date.now();
  const result = await withHostLock(directory, "probe", async () => "acquired");
  attempts.push({ attempt, result, ms: Date.now() - started });
}
console.log(JSON.stringify(attempts));
