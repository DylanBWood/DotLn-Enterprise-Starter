import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Replay against the validated checkpoint directory; output contains no source paths.
const [directory, output] = process.argv.slice(2);
if (!directory || !output)
  throw new Error("Supply checkpoint and output directories.");
mkdirSync(output, { recursive: true });
const checkpoints = readdirSync(directory)
  .filter((name) => /^tools-.*\.json$/.test(name))
  .sort()
  .map((name) => JSON.parse(readFileSync(join(directory, name), "utf8")));
if (checkpoints.length !== 8)
  throw new Error("Eight checkpoints are required.");
const hash = (text) => createHash("sha256").update(text).digest("hex");
const rank = (tools, seed) =>
  [...tools].sort((a, b) =>
    hash(`${seed}:${a.id}`).localeCompare(hash(`${seed}:${b.id}`)),
  );
for (const label of ["checker-a", "checker-b"]) {
  const seed = `catalog-${label}-v0`;
  const pools = checkpoints.map(({ batch, tools }) => ({
    batch,
    tools: tools.filter((tool) => tool.status === "typed"),
  }));
  if (pools.some(({ tools }) => !tools.length))
    throw new Error(
      "A checkpoint has no typed rows; report it before sampling.",
    );
  // Include the first up to three per batch: both small works are fully reviewed.
  const mandatory = pools.flatMap(({ tools }) =>
    [...tools].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 3),
  );
  const selected = new Map(mandatory.map((tool) => [tool.id, tool]));
  const queues = pools.map(({ tools }) =>
    rank(
      tools.filter(({ id }) => !selected.has(id)),
      seed,
    ),
  );
  while (selected.size < 40) {
    let added = false;
    for (const queue of queues) {
      const next = queue.shift();
      if (next && selected.size < 40) {
        selected.set(next.id, next);
        added = true;
      }
    }
    if (!added) throw new Error("Fewer than forty typed rows.");
  }
  const tools = [...selected.values()].sort((a, b) => a.id.localeCompare(b.id));
  const sample = {
    label,
    seed,
    protocol:
      "First up to three typed ids per batch, then seeded SHA-256 ranking filled round-robin across batches.",
    checkpointDigests: Object.fromEntries(
      checkpoints.map((checkpoint) => [
        checkpoint.batch,
        hash(readFileSync(join(directory, `tools-${checkpoint.batch}.json`))),
      ]),
    ),
    counts: Object.fromEntries(
      pools.map(({ batch }) => [
        batch,
        tools.filter((tool) => tool.classifiedBy === `classifier-${batch}`)
          .length,
      ]),
    ),
    tools,
  };
  writeFileSync(
    join(output, `${label}-sample.json`),
    `${JSON.stringify(sample, null, 2)}\n`,
  );
  console.log(
    `${label}: ${tools.length} typed rows across ${Object.keys(sample.counts).length} checkpoints.`,
  );
}
