import { seiriEnvironment } from "@dotln/compiler";
import { appendEvent, decodeLog, replay, } from "@dotln/kernel";
import { artifactRefusalPayload, createLoadoutEquippedPayload, isArtifactRefusalType, } from "./artifact-identity.js";
import { ACTOR, EPISODE, WORKSTREAM, initialState, seiriPredicates, projectRuntimeEnvironment, seiriReactor, walkingStateFromRuntime, artifactIdentityFromRuntime, } from "./reactor.js";
export class LiveReactorDriver {
    onEvents;
    persistEvent;
    #log = "";
    #state = initialState();
    #decisions = [];
    constructor(onEvents, persistEvent) {
        this.onEvents = onEvents;
        this.persistEvent = persistEvent;
    }
    feed(draft) {
        if (draft.type === "BeaconSweepRequested" &&
            draft.payload
                ?.perceptionVersion !== 1)
            throw new Error("new BeaconSweepRequested requires perceptionVersion: 1; use observeBeaconSweep");
        if (draft.type === "ArtifactIdentityEnforcementStarted")
            throw new Error("the enforcement boundary is host-owned; use ensureIdentityEnforcement");
        if (draft.type === "LoadoutEquipped" &&
            (draft.payload === null ||
                typeof draft.payload !== "object" ||
                Array.isArray(draft.payload) ||
                draft.payload["payloadVersion"] !== 2))
            throw new Error("new LoadoutEquipped input requires payloadVersion: 2; use equip");
        this.ensureIdentityEnforcement(draft.occurredAt);
        const step = this.append(draft);
        const decision = step.decision;
        const consuming = decision.trace.envInputs.some((input) => input.startsWith("artifactIdentity.semanticHash:"));
        if (consuming ||
            decision.trace.reactorId === "artifact-identity" ||
            isArtifactRefusalType(step.event.type))
            this.append({
                schemaVersion: 1,
                type: "DecisionRecorded",
                occurredAt: step.event.occurredAt,
                actorId: step.event.actorId,
                workstreamId: step.event.workstreamId,
                ...(step.event.episodeId === undefined
                    ? {}
                    : { episodeId: step.event.episodeId }),
                ...(step.event.correlationId === undefined
                    ? {}
                    : { correlationId: step.event.correlationId }),
                causationId: step.event.eventId,
                payload: { trace: decision.trace },
            });
        if (decision.continuation?.kind === "Emit" &&
            isArtifactRefusalType(decision.continuation.event.type))
            this.append(decision.continuation.event);
        return step;
    }
    /** Exactly once per canonical log, before accepting any new external input. */
    ensureIdentityEnforcement(at) {
        if (walkingStateFromRuntime(this.#state).identityEnforcementEventId !== null)
            return;
        this.append(scenarioDraft("ArtifactIdentityEnforcementStarted", at, {
            payloadVersion: 1,
        }));
    }
    equip(graph, environment = seiriEnvironment(), at = 0) {
        const result = createLoadoutEquippedPayload(graph, environment);
        return result.ok
            ? this.feed(scenarioDraft("LoadoutEquipped", at, result.payload))
            : this.feed(scenarioDraft("ArtifactCompilationRefused", at, artifactRefusalPayload("equip compilation failed", null, walkingStateFromRuntime(this.#state).equippedEventId, artifactIdentityFromRuntime(this.#state), null, result.diagnostics)));
    }
    append(draft) {
        const appended = appendEvent(this.#log, draft);
        this.persistEvent?.(appended.event);
        this.#log = appended.log;
        const stepped = replay(this.#state, [appended.event], seiriReactor, seiriPredicates, projectRuntimeEnvironment);
        const decision = stepped.decisions[0];
        if (decision === undefined)
            throw new Error(`reactor did not decide ${appended.event.type}`);
        this.#state = stepped.state;
        this.#decisions.push(decision);
        this.onEvents?.(decodeLog(this.#log));
        return { event: appended.event, decision };
    }
    restore(log) {
        this.#log = log;
        const restored = replay(initialState(), decodeLog(log), seiriReactor, seiriPredicates, projectRuntimeEnvironment);
        this.#state = restored.state;
        this.#decisions = [...restored.decisions];
        this.onEvents?.(decodeLog(this.#log));
    }
    get log() {
        return this.#log;
    }
    get state() {
        return this.#state;
    }
    get decisions() {
        return this.#decisions;
    }
}
export const scenarioDraft = (type, occurredAt, payload, correlationId, causationId) => ({
    schemaVersion: 1,
    type,
    occurredAt,
    actorId: ACTOR,
    workstreamId: WORKSTREAM,
    episodeId: EPISODE,
    ...(correlationId === undefined ? {} : { correlationId }),
    ...(causationId === undefined ? {} : { causationId }),
    payload,
});
