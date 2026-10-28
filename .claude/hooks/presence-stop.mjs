// Origin: {"ids":[],"loadoutId":"contributor","semanticHash":"fnv1a64:275ba05519d0f5c5"}
try {
const { text } = await import("node:stream/consumers");
const input = JSON.parse(await text(process.stdin));
const { recordHarnessHeartbeat } = await import("../../.runtime/harness/40a6325cb7d115f3/packages/skeleton/dist/src/presence-heartbeat.js");
await recordHarnessHeartbeat("Stop", input);
} catch { process.stderr.write("DotLn advisory: presence heartbeat unavailable\n"); }
process.stdout.write("{}");
