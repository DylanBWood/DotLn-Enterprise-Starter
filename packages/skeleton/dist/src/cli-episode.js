// The supervising process owns the detached CLI group. Resident death closes
// IPC and kills that group; the next resident records the unobserved episode lost.
import { startCliEpisode } from "./cli-actor.js";
import { assertCliActorSpec } from "./cli-actor-contract.js";
import { assertMissionSource, isMissionCheckRequest, } from "./mission-check-protocol.js";
let active;
for (const [signal, code] of [
    ["SIGINT", 130],
    ["SIGTERM", 143],
    ["SIGHUP", 129],
])
    process.on(signal, () => {
        active?.kill();
        process.exit(code);
    });
process.on("disconnect", () => {
    if (active)
        active.kill();
    else
        process.exit(1);
});
process.on("message", (message) => {
    if (message.kill) {
        active?.kill();
        return;
    }
    if (active)
        return;
    assertCliActorSpec(message.spec);
    if (isMissionCheckRequest(message.spec.request))
        assertMissionSource(message.missionSource);
    active = startCliEpisode(message.spec, message.context, undefined, undefined, message.missionSource);
    void active.completed.then((result) => {
        if (process.connected)
            process.send(result, () => {
                process.disconnect?.();
                process.exit(0);
            });
        else
            process.exit(0);
    });
});
