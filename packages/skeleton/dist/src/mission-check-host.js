import { createWorkerCapture, removeTemporaryPath as rmSync, } from "./temporary-roots.js";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { missionCheckAuthorization } from "./reactor.js";
import { compileMissionCheck } from "./loadouts/mission-check.js";
import { MISSION_CHECK_LIMITS, validateMissionCheckResult, } from "./mission-check-protocol.js";
import { WorkerFailure, normalizeWorkerEffort } from "./worker-protocol.js";
export const missionEpisodeId = (subject) => `ep_mission_${subject.hash.slice(7, 23)}`;
/** An empty scratch working directory: the capsule is the only input, and no
 * project startup file may add context the judge was not given. */
export function missionCheckScratch() {
    const cwd = createWorkerCapture(join(tmpdir(), "dotln-mission-check-"));
    execFileSync("git", ["-c", "init.templateDir=", "init", "--quiet", cwd], {
        stdio: "pipe",
    });
    return cwd;
}
export function buildMissionCheckRequest(options) {
    const { subject, model, cwd, at } = options;
    const selection = normalizeWorkerEffort(options.effort);
    const episodeId = options.episodeId ?? missionEpisodeId(subject);
    const compiled = compileMissionCheck(subject.hash, at);
    const grant = missionCheckAuthorization(compiled.program.authorityEnvelope, subject.hash, episodeId, at);
    if (!grant.authorized)
        throw new WorkerFailure("profile-refused");
    return {
        kind: "mission-check",
        command: grant.command,
        workOrder: compiled.program.workOrder,
        subject,
        episodeId,
        model,
        ...selection,
        cwd,
        profile: { profileId: "mission-check-v1", modelTools: [] },
    };
}
/** One read-only episode over a pinned capsule. An unavailable verifier is an
 * honest `unknown`, never a pass: the resident holds on both. */
export async function runMissionCheck(subject, transport, model, effort, now = Date.now, episodeId, cwd) {
    const dispatchedAt = now();
    const scratch = cwd ?? missionCheckScratch();
    const selection = normalizeWorkerEffort(effort);
    let dispatch;
    try {
        const request = buildMissionCheckRequest({
            subject,
            model,
            effort,
            cwd: scratch,
            ...(episodeId === undefined ? {} : { episodeId }),
            at: dispatchedAt,
        });
        dispatch = transport.dispatch(request, now);
        const receipt = await dispatch.receipt;
        if (receipt.commandId !== request.command.commandId ||
            receipt.transport !== transport.name)
            throw new WorkerFailure("invalid-result", "mission-check receipt");
        const judgment = validateMissionCheckResult(await dispatch.completed, subject);
        const completedAt = now();
        if (!missionCheckAuthorization(compileMissionCheck(subject.hash, dispatchedAt).program
            .authorityEnvelope, subject.hash, request.episodeId, completedAt).authorized)
            throw new WorkerFailure("profile-refused");
        return {
            judgment,
            subjectHash: subject.hash,
            episodeId: request.episodeId,
            transport: transport.name,
            harnessVersion: transport.harnessVersion,
            model,
            ...selection,
            dispatchedAt: new Date(dispatchedAt).toISOString(),
            completedAt: new Date(completedAt).toISOString(),
        };
    }
    catch (error) {
        dispatch?.kill();
        return {
            // The structural drift the capsule proves survives an unavailable
            // verifier; only the model's judgment is missing, which is `unknown`.
            judgment: validateMissionCheckResult({ schemaVersion: "mission-check-v1", verdict: "unknown", findings: [] }, subject),
            subjectHash: subject.hash,
            episodeId: episodeId ?? missionEpisodeId(subject),
            transport: transport.name,
            harnessVersion: transport.harnessVersion,
            model,
            ...selection,
            dispatchedAt: new Date(dispatchedAt).toISOString(),
            completedAt: new Date(now()).toISOString(),
            failure: error instanceof WorkerFailure
                ? (error.detail ?? error.code)
                : "mission-check transport failed",
        };
    }
    finally {
        if (!cwd)
            rmSync(scratch, { recursive: true, force: true });
    }
}
export const MISSION_CHECK_TIMEOUT_MS = MISSION_CHECK_LIMITS.timeoutMs;
