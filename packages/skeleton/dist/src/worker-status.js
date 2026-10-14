import { pendingCommands, replayOutbox } from "@dotln/kernel";
import { projectAcceptanceEvidenceMatrices, } from "./verification.js";
/** No clock, filesystem, transport, mutation or synthesized lifecycle state. */
export function projectWorkerStatus(events, derivedOrders = []) {
    const episodes = new Map();
    for (const event of events) {
        const payload = event.payload;
        const id = payload?.workerEpisodeId;
        if (!id || !payload)
            continue;
        if (event.type === "WorkerAttemptStarted") {
            episodes.set(id, {
                episodeId: id,
                commandId: payload.commandId,
                model: payload.model,
                effort: payload.effort,
                transport: payload.transport,
                mode: payload.mode,
                phase: "starting",
                startedAt: event.occurredAt,
                lastHeartbeatAt: event.occurredAt,
                leaseExpiresAt: payload.leaseExpiresAt,
            });
            continue;
        }
        const prior = episodes.get(id);
        if (!prior)
            continue;
        switch (event.type) {
            case "CommandReceipt":
                episodes.set(id, { ...prior, phase: "running" });
                break;
            case "WorkerHeartbeat":
                if (prior.phase === "running")
                    episodes.set(id, {
                        ...prior,
                        lastHeartbeatAt: event.occurredAt,
                        leaseExpiresAt: payload.leaseExpiresAt,
                    });
                break;
            case "WorkerInterrupted":
                if (prior.phase !== "lease-expired")
                    episodes.set(id, { ...prior, phase: "interrupted" });
                break;
            case "WorkerLeaseExpired":
                episodes.set(id, { ...prior, phase: "lease-expired" });
                break;
            case "WorkerCompleted":
                episodes.set(id, { ...prior, phase: "completed" });
                break;
            case "WorkerResultQuarantined":
                episodes.set(id, { ...prior, phase: "quarantined" });
                break;
        }
    }
    return {
        ...(derivedOrders.length ? { derivedOrders } : {}),
        acceptanceEvidenceMatrices: projectAcceptanceEvidenceMatrices(events),
        episodes: [...episodes.values()],
        runningEpisodes: [...episodes.values()]
            .filter((episode) => ["starting", "running"].includes(episode.phase))
            .map((episode) => episode.episodeId),
        pendingCommands: pendingCommands(replayOutbox(events)).map((command) => command.commandId),
        recentEvents: events
            .slice(-8)
            .map(({ eventId, type, occurredAt }) => ({ eventId, type, occurredAt })),
    };
}
export function renderWorkerStatus(status) {
    return [
        `running=${status.runningEpisodes.length} pending=${status.pendingCommands.length}`,
        ...status.episodes.map((episode) => `${episode.episodeId} ${episode.phase} ${episode.transport} model=${episode.model} effort=${episode.effort} heartbeat=${episode.lastHeartbeatAt} lease=${episode.leaseExpiresAt} mode=${episode.mode}`),
        `pending commands: ${status.pendingCommands.join(", ") || "none"}`,
        ...status.acceptanceEvidenceMatrices.flatMap((matrix) => [
            `acceptance ${matrix.workstreamId} phase=${matrix.phase} revision=${matrix.subjectRevision ?? "unknown"}`,
            ...matrix.rows.map((row) => `  ${row.criterion.criterionId} ${row.criterion.claimType} ${row.status} source=${row.criterion.evidenceSource} evidence=${row.evaluations.at(-1)?.evidenceRefs.join(",") || "none"}`),
        ]),
        ...(status.derivedOrders ?? []).map((order) => `${order.workOrderId} ${order.phase} ${order.workOrderPath} provenance=${JSON.stringify(order.provenance)}`),
        "recent events:",
        ...status.recentEvents.map((event) => `  ${event.eventId} ${event.type} ${event.occurredAt}`),
    ].join("\n");
}
