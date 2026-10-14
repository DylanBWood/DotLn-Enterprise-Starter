import { parseWorkerResult, validateRequest, } from "./worker-protocol.js";
import { LOCAL_MODEL_ROW, LOCAL_MODEL_TRANSPORT, localModelOrigin, } from "./local-model-transport.js";
export function assertLocalModelActorSpec(value) {
    const v = value;
    if (!v ||
        typeof v !== "object" ||
        Array.isArray(v) ||
        Object.keys(v).some((k) => !["endpoint", "request"].includes(k)) ||
        typeof v.endpoint !== "string" ||
        !v.request)
        throw new Error("invalid local-model actor declaration");
    // The inspection profile only; a writer request never reaches this kind.
    localModelOrigin(v.endpoint);
    validateRequest(v.request);
}
export function localModelActorRequest(spec, episodeId) {
    return { ...spec.request, episodeId };
}
export function assertLocalModelObservation(value, spec, episodeId) {
    const v = value;
    const launch = v?.launch;
    if (!v ||
        !launch ||
        Object.keys(v).some((k) => !["launch", "result", "failure"].includes(k)) ||
        Object.keys(launch).some((k) => ![
            "transport",
            "row",
            "endpoint",
            "profileId",
            "model",
            "effort",
            "harnessVersion",
            "origin",
            "episodeId",
        ].includes(k)) ||
        launch.transport !== LOCAL_MODEL_TRANSPORT ||
        launch.row !== LOCAL_MODEL_ROW.row ||
        launch.endpoint !== localModelOrigin(spec.endpoint) ||
        launch.profileId !== spec.request.profile.profileId ||
        launch.model !== spec.request.model ||
        launch.effort !== spec.request.effort ||
        launch.origin !== "actor" ||
        launch.episodeId !== episodeId ||
        typeof launch.harnessVersion !== "string" ||
        !launch.harnessVersion ||
        (v.result === undefined) === (v.failure === undefined))
        throw new Error("invalid local-model actor observation");
    if (v.failure !== undefined &&
        ![
            "model-unavailable",
            "transport-failed",
            "interrupted",
            "invalid-result",
            "deadline-exceeded",
            "output-limit",
            "profile-refused",
        ].includes(v.failure))
        throw new Error("invalid local-model failure code");
    if (v.result !== undefined)
        parseWorkerResult(v.result, localModelActorRequest(spec, episodeId));
}
