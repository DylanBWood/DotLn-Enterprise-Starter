import { replay, } from "@dotln/kernel";
import { VERIFICATION_HOST, initialVerificationRuntime, projectRuntimeEnvironment, seiriReactor, verificationStateFromRuntime, } from "./reactor.js";
import { baselineWitnessRows, } from "./verification-protocol.js";
export { VERIFICATION_HOST, initialVerificationRuntime, initialVerificationState, verificationAuthorization, verificationStateFromRuntime, } from "./reactor.js";
export function replayVerification(events, workstreamId) {
    return verificationStateFromRuntime(replay(initialVerificationRuntime(workstreamId), events, seiriReactor, {}, projectRuntimeEnvironment).state);
}
export function projectAcceptanceEvidenceMatrices(events) {
    const streams = [
        ...new Set(events
            .filter((event) => event.type === "VerificationOpened" &&
            event.actorId === VERIFICATION_HOST)
            .map((event) => event.workstreamId)),
    ];
    return streams.map((id) => {
        const state = replayVerification(events, id);
        return {
            ...(state.baselineWitness
                ? {
                    baselineWitness: state.baselineWitness,
                    baselineEvidence: baselineWitnessRows(state.baselineWitness),
                }
                : {}),
            ...(state.baselineFindings
                ? { baselineFindings: state.baselineFindings }
                : {}),
            ...(state.reviewCompleted ? { review: state.reviewCompleted } : {}),
            workstreamId: id,
            subjectRevision: state.subject?.revision ?? null,
            phase: state.next,
            baseline: state.baseline,
            rows: state.rows,
            evidence: state.evidence,
            findings: state.findings,
            staleness: state.staleness,
        };
    });
}
export function verificationDraft(workstreamId, type, occurredAt, payload, correlationId) {
    return {
        schemaVersion: 1,
        type,
        occurredAt,
        actorId: VERIFICATION_HOST,
        workstreamId,
        ...(correlationId ? { correlationId } : {}),
        payload: payload,
    };
}
