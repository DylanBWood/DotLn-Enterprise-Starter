import { foldVerificationOpening, foldVerificationEvaluation, foldVerificationRepair, } from "./verification-fold.js";
import { reviewCompletedEvent, createReviewContext, } from "./review.js";
import { REPAIR_HOST, repairEventTypes, repairEqual, repairContract, repairCommand, repairVerificationProgram, repairRoundProgram, deriveRepairOrder, } from "./repair.js";
import { decodeSourceObservation, decodeFocusedTest, } from "./source-change-state.js";
import { foldResidentEvent, residentEventTypes, } from "./resident-state.js";
import { sourceChangeDecision, sourceChangeEventTypes, } from "./source-change-state.js";
import { Cadence, Program, authorize, commandId, decideProgram, decodeContinuation, evaluateCadence, guardQueuedPulse, } from "@dotln/kernel";
import { applyFeedbackCorrection, assertCompiledFeedback, compileFeedbackAudit, SEMANTIC_CORRECTIONS, assertVerificationTask, compileVerificationTask, copySubject, SEIRI_MINUTE, SEIRI_PULSE_SCHEDULE, SEIRI_QUEUED_PULSE, compileLoadout, canonicalStringify, seiriEnvironment, seiriLoadout, } from "@dotln/compiler";
import { artifactIdentityDrift, artifactIdentityInputs, artifactRefusalPayload, compileArtifact, isArtifactIdentityV1, isArtifactRefusalType, } from "./artifact-identity.js";
import { beaconAge, decodeSignalSize, decodeLegacySignalSize, } from "@dotln/beacons/control-codebook.mjs";
import { perceptionGate, refusePerception, validatePerception, } from "./beacon-perception.js";
import { parseEvidenceResult, createBaselineWitness, validateBaselineContext, validateBaselineWitness, } from "./verification-protocol.js";
export const MINUTE = SEIRI_MINUTE;
export const WORKSTREAM = "ws_repo_garden";
export const EPISODE = "ep_seiri_1";
export const ACTOR = "repo-gardener";
export const PULSE_SCHEDULE = SEIRI_PULSE_SCHEDULE;
export const QUEUED_PULSE = SEIRI_QUEUED_PULSE;
export const walkingStateFromRuntime = (state) => {
    const { repair, sourceChange, resident, feedback, verification, workerEpisodeId, workerLeaseExpired, ...walking } = state;
    return walking;
};
export const workerStateFromRuntime = (state) => ({
    workerEpisodeId: state.workerEpisodeId,
    workerLeaseExpired: state.workerLeaseExpired,
});
export const selectWalkingSlice = (state) => state.walking;
export const selectWorkerSlice = (state) => state.worker;
export const selectVerificationSlice = (state) => state.verification;
export const selectFeedbackSlice = (state) => state.feedback;
export const selectSourceChangeSlice = (state) => state.sourceChange;
export const selectResidentSlice = (state) => state.resident;
export const kernelStateFromRuntime = (state) => ({
    rngState: state.rngState,
    policy: state.policy,
});
/** Kernel predicates retain the full public context, including worker lease facts. */
export const selectPredicateState = (walking, worker) => ({ ...walking, ...worker });
export const artifactIdentityFromRuntime = (state) => isArtifactIdentityV1(state.artifactIdentity) ? state.artifactIdentity : null;
export const hasFeedbackState = (state) => state.feedback !== undefined;
export function skeletonStateFromRuntime(state) {
    return {
        version: 1,
        walking: walkingStateFromRuntime(state),
        worker: workerStateFromRuntime(state),
        verification: state.verification === undefined
            ? undefined
            : state.verification,
        feedback: state.feedback === undefined
            ? undefined
            : feedbackStateFromRuntime(state),
        repair: state.repair,
        sourceChange: state.sourceChange ?? {},
        resident: state.resident,
    };
}
/** Only the selected slice is written back; untouched bytes/optional keys survive. */
function runtimeDecision(decision, write) {
    return { ...decision, state: write(decision.state) };
}
// Names repeat across modes in the existing event schema. Ownership is a
// function of (active mode, event type), never competing broadcast reducers.
export const sliceEventTypes = {
    walking: [
        "ArtifactIdentityEnforcementStarted",
        "LoadoutEquipped",
        "ArtifactIdentityInvalid",
        "ArtifactIdentityUnavailable",
        "ArtifactCompilationRefused",
        "ArtifactIdentityDrift",
        "UnknownScheduleRefused",
        "BeaconSweepRequested",
        "BeaconObserved",
        "InspectionTaskCreated",
        "OperatorPresenceChanged",
        "CadencePulse",
        "WorkOrderEmitted",
        "CommandRedispatchRequested",
        "CommandPersisted",
        "CommandRedispatched",
        "WorkerResultObserved",
        "CommandResult",
        "DeletionAttempted",
        "CommandRefused",
        "EpisodeTerminated",
        "VerificationRequested",
        "VerificationCompleted",
        "QueuedPulseNoOp",
        "SchedulesCancelled",
    ],
    worker: ["WorkerAttemptStarted", "WorkerLeaseExpired"],
    verification: [
        "VerificationOpened",
        "BaselineWitnessed",
        "ReviewCompleted",
        "VerificationDispatchRequested",
        "CommandPersisted",
        "WorkerAttemptStarted",
        "WorkerHeartbeat",
        "WorkerLeaseExpired",
        "CommandResult",
        "VerificationContinuation",
        "VerificationSubjectSubmitted",
    ],
    feedback: [
        "FeedbackAuditOpened",
        "FeedbackAuditRequested",
        "FeedbackAuditExecutionRequested",
        "CommandPersisted",
        "CommandResult",
        ...SEMANTIC_CORRECTIONS,
    ],
    repair: repairEventTypes,
    sourceChange: sourceChangeEventTypes,
    resident: residentEventTypes,
};
export function selectEventSlice(state, event) {
    if (event.type === "RepairOpened" ||
        (state.repair && state.repair.workstreamId === event.workstreamId))
        return "repair";
    if (sourceChangeEventTypes.some((type) => type === event.type) ||
        (selectSourceChangeSlice(state).workstreamId !== undefined &&
            selectSourceChangeSlice(state).workstreamId === event.workstreamId))
        return "sourceChange";
    if (selectResidentSlice(state) !== undefined ||
        residentEventTypes.some((type) => type === event.type))
        return "resident";
    if (event.type === "FeedbackAuditOpened" ||
        selectFeedbackSlice(state) !== undefined)
        return "feedback";
    if (selectVerificationSlice(state) !== undefined)
        return "verification";
    if (sliceEventTypes.worker.some((type) => type === event.type))
        return "worker";
    return "walking";
}
export const loadout = seiriLoadout;
/** The skeleton owns the layout of its replayable environment state; replay and
 * the live folds read the same kernel-facing slice, so they cannot drift. */
export function projectRuntimeEnvironment(state) {
    return kernelStateFromRuntime(state);
}
const statePresence = (state) => state !== null && !Array.isArray(state) && typeof state === "object"
    ? state["presence"]
    : undefined;
export const seiriPredicates = {
    "operator.away": { 1: ({ state }) => statePresence(state) === "away" },
    "operator.returned": {
        1: ({ state }) => statePresence(state) === "returned",
    },
    "operator.return-event": {
        1: ({ state, event }) => statePresence(state) === "returned" &&
            event?.type === "OperatorPresenceChanged" &&
            event.payload !== null &&
            !Array.isArray(event.payload) &&
            typeof event.payload === "object" &&
            event.payload["presence"] ===
                "returned",
    },
};
export function compileLoadoutProgram(equipped, baseCommit = "fixture-base") {
    const result = compileLoadout(equipped, seiriEnvironment(baseCommit));
    if (!result.ok)
        throw new Error(result.diagnostics.map((entry) => entry.message).join("\n"));
    return result.program;
}
export function compileWorkOrder(equipped, baseCommit = "fixture-base") {
    return compileLoadoutProgram(equipped, baseCommit).workOrder;
}
export const initialState = () => ({
    presence: "returned",
    rngState: 17,
    policy: { maintenance: "absent-only" },
    loadout: null,
    artifactIdentity: null,
    compilationEnvironment: null,
    equippedEventId: null,
    identityEnforcementEventId: null,
    artifactIdentityBlocked: false,
    workOrder: null,
    candidates: [],
    verified: false,
    verificationCompleted: false,
    pulseSeen: false,
    inspectionCompleted: false,
    deletionRefused: false,
    queuedPulseNoOp: false,
    authority: null,
    revocationEvents: [],
    program: null,
    commandResult: null,
    pendingCommand: null,
    authorizationEvidence: [],
    deletionPaths: [],
    refusalReason: null,
    persistedEffect: null,
    noOpEvidence: [],
    cancelledScheduleIds: [],
    activeScheduleIds: [],
    redispatchedCommandIds: [],
    beaconObservations: [],
    beaconSweep: null,
    workerEpisodeId: null,
    workerLeaseExpired: false,
});
const asObject = (value) => value !== null && !Array.isArray(value) && typeof value === "object"
    ? value
    : undefined;
const stringField = (value, key) => {
    const candidate = asObject(value)?.[key];
    return typeof candidate === "string" ? candidate : undefined;
};
const stringArrayField = (value, key) => {
    const candidate = asObject(value)?.[key];
    return Array.isArray(candidate) &&
        candidate.every((item) => typeof item === "string")
        ? candidate
        : [];
};
const candidatesField = (value) => {
    const candidates = asObject(value)?.["candidates"];
    return Array.isArray(candidates)
        ? candidates
        : [];
};
const eventFromState = (value, name) => {
    if (value === null)
        throw new Error(`runtime state lacks ${name}`);
    return value;
};
const workOrderFromValue = (value) => {
    if (value === null)
        throw new Error("runtime state lacks WorkOrder");
    return value;
};
const cadenceFromCompiled = (compiled) => {
    const value = compiled.cadences[0];
    if (value === undefined)
        throw new Error("compiled loadout lacks cadence");
    return value;
};
const authorityFromState = (state) => state.authority;
const revocationsFromState = (state) => state.revocationEvents;
const persistedContinuation = (value, location) => {
    const decoded = decodeContinuation(value);
    if (!decoded.ok)
        throw new Error(`${location}: ${decoded.message}`);
    return decoded.value;
};
const programFromState = (state) => persistedContinuation(state.program, "runtime program");
const requiredContinuation = (decision) => {
    return decision.continuation;
};
export const workOrderFromState = (state) => workOrderFromValue(state.workOrder);
export const commandFromState = (state) => {
    if (state.pendingCommand === null)
        throw new Error("runtime state lacks pending command");
    return state.pendingCommand;
};
const inspectIntent = (workOrder) => ({
    kind: "Act",
    effect: "repo.inspect",
    resource: "inspections",
    payload: { workOrder: workOrder },
});
const verificationProgram = (workOrder, at, verificationSubject) => {
    const inspect = inspectIntent(workOrder);
    const id = commandId(WORKSTREAM, EPISODE, 1, 0);
    return Program.Invoke(id, inspect, {
        [verificationSubject]: Program.Emit(draft("VerificationRequested", at + 2, { commandId: id }), Program.Done()),
    });
};
const draft = (type, occurredAt, payload, correlationId, causationId) => ({
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
const linkedDraft = (event, correlationId, causationId) => ({
    schemaVersion: event.schemaVersion,
    type: event.type,
    occurredAt: event.occurredAt,
    actorId: event.actorId,
    workstreamId: event.workstreamId,
    ...(event.episodeId === undefined ? {} : { episodeId: event.episodeId }),
    ...(correlationId === undefined ? {} : { correlationId }),
    causationId,
    payload: event.payload,
});
const observed = (state, event, branch = "observed") => ({
    state,
    intents: [],
    schedules: [],
    trace: {
        reactorId: "seiri-reactor",
        reactorVersion: "1",
        branchPath: [event.type, branch],
        envInputs: ["event"],
        cadenceEvaluations: [],
    },
});
const workerNoOp = (state, event, reason) => ({
    ...observed(state, event, reason),
    intents: [
        {
            kind: "NoOp",
            reason,
            evidence: [event.eventId],
            reevaluation: Cadence.Once(event.occurredAt),
            usefulWhen: { registryId: "operator.away", version: 1 },
        },
    ],
    trace: {
        reactorId: "worker-result-guard",
        reactorVersion: "1",
        branchPath: [event.type, "quarantine", reason],
        envInputs: [
            `now:${event.occurredAt}`,
            `authorityEnvelope:${stringField(state.authority, "authorityEnvelopeId") ?? "unavailable"}`,
        ],
        cadenceEvaluations: [],
    },
});
const workerResultGuard = (state, worker, event, env) => {
    if (asObject(event.payload)?.["workerResultVersion"] !== 1)
        return workerNoOp(state, event, "invalid worker receipt");
    if (stringField(event.payload, "commandId") !==
        stringField(state.pendingCommand, "commandId"))
        return workerNoOp(state, event, "unknown command");
    if (state.commandResult !== null)
        return observed(state, event, "dedup");
    if (env.now >= authorityFromState(state).expiresAt)
        return workerNoOp(state, event, "authority expired");
    if (stringField(event.payload, "workerEpisodeId") !== worker.workerEpisodeId ||
        worker.workerLeaseExpired)
        return workerNoOp(state, event, "stale worker lease");
    if (state.presence !== "away")
        return workerNoOp(state, event, "operator returned");
    return undefined;
};
const pinnedIdentity = (state) => isArtifactIdentityV1(state.artifactIdentity) ? state.artifactIdentity : null;
const withIdentityTrace = (decision, identity, equippedEventId) => identity === null || equippedEventId === null
    ? decision
    : {
        ...decision,
        trace: {
            ...decision.trace,
            envInputs: [
                ...new Set([
                    ...decision.trace.envInputs,
                    ...artifactIdentityInputs(identity, equippedEventId),
                ]),
            ],
        },
    };
const artifactRefused = (state, event, type, reason, options = {}) => {
    const pin = options.pinned ?? pinnedIdentity(state);
    return {
        state: type === "UnknownScheduleRefused"
            ? state
            : {
                ...state,
                artifactIdentityBlocked: true,
                authority: null,
                pendingCommand: null,
                program: null,
                activeScheduleIds: [],
            },
        intents: [],
        schedules: [],
        continuation: Program.Emit({
            schemaVersion: 1,
            type,
            occurredAt: event.occurredAt,
            actorId: event.actorId,
            workstreamId: event.workstreamId,
            ...(event.episodeId === undefined
                ? {}
                : { episodeId: event.episodeId }),
            ...(event.correlationId === undefined
                ? {}
                : { correlationId: event.correlationId }),
            causationId: event.eventId,
            payload: artifactRefusalPayload(reason, event.eventId, state.equippedEventId, pin, options.observed ?? null, options.diagnostics ?? [], options.drift ?? []),
        }, Program.Done()),
        trace: {
            reactorId: "artifact-identity",
            reactorVersion: "1",
            branchPath: [event.type, "refused", type, reason],
            envInputs: [
                "event",
                "equipped-artifact",
                "logged-enforcement-boundary",
                ...(pin === null || state.equippedEventId === null
                    ? []
                    : artifactIdentityInputs(pin, state.equippedEventId)),
            ],
            cadenceEvaluations: [],
        },
    };
};
const equipDecision = (state, event) => {
    const payload = asObject(event.payload);
    const legacy = payload === undefined || !Object.hasOwn(payload, "payloadVersion");
    if (legacy &&
        (state.identityEnforcementEventId !== null || state.artifactIdentityBlocked))
        return artifactRefused(state, event, "ArtifactIdentityUnavailable", "legacy equip after enforcement boundary");
    if (!legacy &&
        (payload?.["payloadVersion"] !== 2 ||
            Object.keys(payload).sort().join(",") !==
                "artifactIdentity,graph,payloadVersion" ||
            !isArtifactIdentityV1(payload["artifactIdentity"])))
        return artifactRefused(state, event, "ArtifactIdentityInvalid", "invalid v2 equip payload");
    const pin = legacy
        ? null
        : payload["artifactIdentity"];
    const graph = legacy ? event.payload : payload["graph"];
    const environment = pin === null ? seiriEnvironment() : pin.compilationEnvironment;
    const compiled = compileArtifact(graph, environment);
    if (!compiled.ok)
        return artifactRefused(state, event, "ArtifactCompilationRefused", "compile diagnostics", {
            pinned: pin,
            diagnostics: compiled.diagnostics,
        });
    const drift = pin === null ? [] : artifactIdentityDrift(pin, compiled.artifactIdentity);
    if (drift.length > 0)
        return artifactRefused(state, event, "ArtifactIdentityDrift", "equipped artifact differs from compilation", {
            pinned: pin,
            observed: compiled.artifactIdentity,
            drift,
        });
    return withIdentityTrace(observed({
        ...state,
        loadout: graph,
        artifactIdentity: pin,
        compilationEnvironment: environment,
        equippedEventId: event.eventId,
        artifactIdentityBlocked: false,
        authority: compiled.program.authorityEnvelope,
        ...(legacy
            ? {}
            : {
                workOrder: null,
                pendingCommand: null,
                program: null,
                activeScheduleIds: [],
            }),
    }, event, "equipped"), pin, event.eventId);
};
/** Every compiled consumer, including stored authority/continuations, enters here. */
const withEquippedArtifact = (state, event, consume) => {
    const pin = pinnedIdentity(state);
    if (state.artifactIdentity !== null && pin === null)
        return artifactRefused(state, event, "ArtifactIdentityInvalid", "invalid stored artifact identity");
    if (pin !== null && state.equippedEventId === null)
        return artifactRefused(state, event, "ArtifactIdentityInvalid", "pinned artifact has no equip event reference");
    if (state.loadout === null ||
        state.artifactIdentityBlocked ||
        (state.identityEnforcementEventId !== null && pin === null))
        return artifactRefused(state, event, "ArtifactIdentityUnavailable", state.loadout === null
            ? "no valid equip"
            : "explicit v2 re-equip required");
    const compiled = compileArtifact(state.loadout, state.compilationEnvironment);
    if (!compiled.ok)
        return artifactRefused(state, event, "ArtifactCompilationRefused", "compile diagnostics", {
            diagnostics: compiled.diagnostics,
        });
    const drift = pin === null ? [] : artifactIdentityDrift(pin, compiled.artifactIdentity);
    if (drift.length > 0)
        return artifactRefused(state, event, "ArtifactIdentityDrift", "pinned artifact differs from compilation", {
            observed: compiled.artifactIdentity,
            drift,
        });
    return withIdentityTrace(consume(compiled.program), pin, state.equippedEventId);
};
const predicateEnv = (env) => ({
    rngState: env.rngState,
    predicates: env.predicates,
    ...(env.policy === undefined ? {} : { policy: env.policy }),
});
const presenceDecision = (state, worker, event, env, compiled) => {
    const presence = stringField(event.payload, "presence");
    if (presence !== "away" && presence !== "returned")
        return observed(state, event, "invalid-presence");
    const nextState = {
        ...state,
        presence,
        revocationEvents: [
            ...state.revocationEvents,
            event,
        ],
    };
    if (presence === "away") {
        const compiledCadence = cadenceFromCompiled(compiled);
        const cadence = compiledCadence.cadence;
        const evaluated = evaluateCadence(cadence, selectPredicateState(nextState, worker), env, event);
        if (evaluated.dueAt === null)
            throw new Error("away cadence did not produce a pulse");
        const schedules = [
            {
                scheduleId: compiledCadence.scheduleId,
                cadence,
                eventToEmit: draft("CadencePulse", evaluated.dueAt, {
                    scheduleId: compiledCadence.scheduleId,
                }, undefined, event.eventId),
                cancelOn: compiledCadence.cancelOn,
            },
            {
                scheduleId: compiledCadence.queuedScheduleId,
                cadence: Cadence.Once(evaluated.dueAt + compiledCadence.queuedDelayMs),
                eventToEmit: draft("CadencePulse", evaluated.dueAt + compiledCadence.queuedDelayMs, {
                    scheduleId: compiledCadence.queuedScheduleId,
                }, undefined, event.eventId),
                cancelOn: compiledCadence.cancelOn,
            },
        ];
        return {
            state: {
                ...nextState,
                rngState: evaluated.rngState,
                activeScheduleIds: schedules.map((schedule) => schedule.scheduleId),
            },
            intents: [],
            schedules,
            trace: {
                reactorId: "seiri-cadence",
                reactorVersion: "1",
                branchPath: ["away", "scheduled"],
                envInputs: ["operatorPresence", "virtualTime"],
                cadenceEvaluations: [evaluated.trace],
            },
        };
    }
    const workOrder = workOrderFromState(nextState);
    const revoked = authorize(inspectIntent(workOrder), authorityFromState(state), {
        now: env.now,
        actorId: ACTOR,
        workstreamId: WORKSTREAM,
        episodeId: EPISODE,
        decisionIndex: 3,
        intentIndex: 0,
        evidence: [],
        revokedBy: revocationsFromState(nextState),
        state: selectPredicateState(nextState, worker),
        predicateEnv: predicateEnv(env),
    });
    if (revoked.authorized ||
        revoked.refusal.payload.reason !== "authority revoked")
        throw new Error("operator return did not revoke inspect authority");
    return {
        state: nextState,
        intents: [],
        schedules: [],
        trace: revoked.trace,
    };
};
const pulseDecision = (state, worker, event, env, compiled) => {
    const scheduleId = stringField(event.payload, "scheduleId");
    const compiledCadence = cadenceFromCompiled(compiled);
    if (scheduleId === compiledCadence.scheduleId) {
        const workOrder = compiled.workOrder;
        return {
            ...observed({
                ...state,
                pulseSeen: true,
                workOrder: workOrder,
            }, event, "work-order-ready"),
            continuation: Program.Emit(draft("WorkOrderEmitted", event.occurredAt, { workOrder: workOrder }, event.eventId, event.eventId), Program.Done()),
        };
    }
    if (scheduleId !== compiledCadence.queuedScheduleId) {
        if (state.identityEnforcementEventId === null &&
            state.artifactIdentity === null)
            return observed(state, event, "unknown-schedule");
        return artifactRefused(state, event, "UnknownScheduleRefused", `unknown schedule: ${scheduleId ?? "unavailable"}`);
    }
    const activationCondition = compiled.statechartGuards[0]?.activationCondition;
    if (activationCondition === undefined)
        throw new Error("compiled loadout lacks an activation guard");
    const guarded = guardQueuedPulse(selectPredicateState(state, worker), event, env, activationCondition, [compiledCadence.scheduleId, compiledCadence.queuedScheduleId]);
    return {
        state: {
            ...state,
            cancelledScheduleIds: guarded.cancelledScheduleIds,
        },
        intents: guarded.intents,
        schedules: guarded.schedules,
        trace: guarded.trace,
    };
};
const workOrderDecision = (state, worker, event, env, compiled) => {
    const workOrder = workOrderFromValue(asObject(event.payload)?.["workOrder"] ?? null);
    const verification = compiled.verificationPlan.find((episode) => episode.required);
    if (verification === undefined)
        throw new Error("compiled loadout lacks a required verification episode");
    const program = verificationProgram(workOrder, event.occurredAt, verification.subject);
    const programDecision = decideProgram(program, selectPredicateState(state, worker), env);
    const continuation = requiredContinuation(programDecision);
    const inspect = programDecision.intents[0];
    if (inspect?.kind !== "Act")
        throw new Error("verification program did not produce an inspect intent");
    const granted = authorize(inspect, authorityFromState(state), {
        now: env.now,
        actorId: ACTOR,
        workstreamId: WORKSTREAM,
        episodeId: EPISODE,
        decisionIndex: 1,
        intentIndex: 0,
        evidence: [],
        revokedBy: revocationsFromState(state),
        state: selectPredicateState(state, worker),
        predicateEnv: predicateEnv(env),
    });
    if (!granted.authorized)
        throw new Error(`inspection authorization failed: ${granted.refusal.payload.reason}`);
    return {
        state: {
            ...state,
            workOrder: workOrder,
            authority: granted.authority,
            pendingCommand: granted.command,
            program: continuation,
        },
        intents: programDecision.intents,
        continuation,
        schedules: programDecision.schedules,
        trace: granted.trace,
    };
};
const deletionDecision = (state, worker, event, env) => {
    const effect = stringField(event.payload, "effect") ?? "";
    const paths = stringArrayField(event.payload, "paths");
    const evidence = state.candidates.flatMap((candidate) => candidate.evidence);
    const deletion = { kind: "Act", effect, payload: { paths } };
    const refused = authorize(deletion, authorityFromState(state), {
        now: env.now,
        actorId: ACTOR,
        workstreamId: WORKSTREAM,
        episodeId: EPISODE,
        decisionIndex: 2,
        intentIndex: 0,
        evidence,
        revokedBy: revocationsFromState(state),
        state: selectPredicateState(state, worker),
        predicateEnv: predicateEnv(env),
    });
    if (refused.authorized)
        throw new Error("deletion unexpectedly authorized");
    return {
        state: {
            ...state,
            authorizationEvidence: evidence,
            deletionPaths: paths,
            refusalReason: refused.refusal.payload.reason,
        },
        intents: [],
        continuation: Program.Emit(linkedDraft(refused.refusal, expectedInspectCommandId, event.eventId), Program.Done()),
        schedules: [],
        trace: refused.trace,
    };
};
const episodeDecision = (state, worker, event, env) => {
    const result = eventFromState(state.commandResult, "CommandResult");
    const continued = decideProgram(programFromState(state), selectPredicateState(state, worker), { ...env, now: result.occurredAt }, result);
    const continuation = requiredContinuation(continued);
    if (continuation.kind !== "Emit")
        throw new Error("verification continuation did not emit a request");
    const linkedContinuation = Program.Emit(linkedDraft(continuation.event, expectedInspectCommandId, event.eventId), continuation.next);
    return {
        state: {
            ...state,
            program: linkedContinuation,
        },
        intents: continued.intents,
        continuation: linkedContinuation,
        schedules: continued.schedules,
        trace: continued.trace,
    };
};
const beaconSweepDecision = (state, worker, event, env) => {
    const request = event.payload;
    if (request.intent?.kind !== "Observe" ||
        request.intent.subject !== "control-beacons" ||
        !["public", "verifier"].includes(request.audience) ||
        !Number.isSafeInteger(request.staleAfterMs) ||
        request.staleAfterMs < 0 ||
        !Number.isSafeInteger(request.decisionIndex) ||
        request.decisionIndex < 0)
        throw new Error("invalid Beacon sweep request");
    const effect = {
        kind: "Act",
        effect: `observe.beacons.${request.audience}`,
        resource: "beaconSweeps",
        payload: { subject: request.intent.subject, audience: request.audience },
    };
    // Observation values are deliberately absent from this authority context.
    let authorization = authorize(effect, request.authority, {
        now: env.now,
        actorId: event.actorId,
        workstreamId: event.workstreamId,
        ...(event.episodeId ? { episodeId: event.episodeId } : {}),
        decisionIndex: request.decisionIndex,
        intentIndex: 0,
        evidence: request.evidence,
        revokedBy: request.revokedBy,
        state: { presence: state.presence, policy: state.policy },
        predicateEnv: predicateEnv(env),
    });
    if (authorization.authorized && request.perceptionVersion !== undefined) {
        const reason = request.perceptionVersion !== 1 || !request.perception
            ? "invalid Beacon perception version"
            : (request.perceptionError ??
                perceptionGate(request.perception, request.authority, request.audience));
        if (reason)
            authorization = refusePerception(event, request.authority, reason);
    }
    return {
        state: {
            ...state,
            beaconSweep: {
                requestEventId: event.eventId,
                staleAfterMs: request.staleAfterMs,
                authorization: authorization,
                ...(request.perceptionVersion === undefined
                    ? {}
                    : { perception: request.perception }),
            },
        },
        intents: authorization.authorized ? [request.intent] : [],
        schedules: [],
        trace: authorization.trace,
    };
};
const beaconObservedDecision = (state, worker, event, env) => {
    const payload = event.payload;
    const sweep = state.beaconSweep;
    if (!sweep?.authorization.authorized ||
        payload.commandId !== sweep.authorization.command?.commandId ||
        payload.sweptAt !== event.occurredAt ||
        payload.sweptAt !== env.now ||
        !Array.isArray(payload.observations))
        throw new Error("BeaconObserved lacks its authorized sweep or event time");
    if (sweep.perception) {
        if (payload.perceptionVersion !== 1 ||
            payload.groups === undefined ||
            payload.keyEpoch === undefined)
            throw new Error("BeaconObserved lacks its sense projection version");
        validatePerception({ observations: payload.observations, groups: payload.groups }, sweep.perception, payload.keyEpoch);
    }
    const cadenceEvaluations = [];
    const observations = payload.observations.map((observation) => {
        // Persist decoded perception, but bind it to the captured size on replay.
        const decoded = observation.size === null
            ? { status: "absent" }
            : (sweep.perception ? decodeSignalSize : decodeLegacySignalSize)(BigInt(observation.size));
        if (canonicalStringify(decoded) !== canonicalStringify(observation.decoded))
            throw new Error("BeaconObserved decoded fields differ from captured metadata");
        let age = beaconAge(observation, env.now, sweep.staleAfterMs);
        if (age === "fresh" || age === "stale") {
            // The kernel clock is integer milliseconds: round the captured origin up
            // so a sub-ms remainder cannot fire the After cadence prematurely.
            const origin = observation.mtimeNs == null
                ? observation.mtimeMs
                : Number((BigInt(observation.mtimeNs) + 999999n) / 1000000n);
            const evaluated = evaluateCadence(Cadence.After(sweep.staleAfterMs), selectPredicateState(state, worker), { ...env, now: origin }, event);
            cadenceEvaluations.push(evaluated.trace);
            age =
                evaluated.dueAt !== null && env.now >= evaluated.dueAt
                    ? "stale"
                    : "fresh";
        }
        return { ...observation, age };
    });
    return {
        state: {
            ...state,
            beaconObservations: observations,
            ...(sweep.perception
                ? { beaconGroups: payload.groups }
                : {}),
        },
        intents: [],
        schedules: [],
        trace: {
            reactorId: "beacon-observer",
            reactorVersion: "1",
            branchPath: ["BeaconObserved", ...observations.map(({ age }) => age)],
            envInputs: ["event.payload.observations", "event.occurredAt"],
            cadenceEvaluations,
        },
    };
};
const foldWalkingEvent = (state, worker, event, env, compiled) => {
    switch (event.type) {
        case "BeaconSweepRequested":
            return beaconSweepDecision(state, worker, event, env);
        case "BeaconObserved":
            return beaconObservedDecision(state, worker, event, env);
        case "InspectionTaskCreated":
            return observed(state, event, "task-opened");
        case "OperatorPresenceChanged":
            return presenceDecision(state, worker, event, env, compiled);
        case "CadencePulse":
            return pulseDecision(state, worker, event, env, compiled);
        case "WorkOrderEmitted":
            return workOrderDecision(state, worker, event, env, compiled);
        case "CommandRedispatchRequested":
            if (stringField(event.payload, "commandId") === undefined ||
                stringField(event.payload, "commandId") !==
                    stringField(state.pendingCommand, "commandId"))
                return artifactRefused(state, event, "ArtifactIdentityInvalid", "recovery request does not name the stored command");
            if (asObject(event.payload)?.["workerDispatchVersion"] === 1 &&
                (env.now >= authorityFromState(state).expiresAt ||
                    state.presence !== "away"))
                return workerNoOp(state, event, env.now >= authorityFromState(state).expiresAt
                    ? "authority expired"
                    : "operator returned");
            return observed(state, event, "redispatch-ready");
        case "CommandPersisted": {
            const command = asObject(event.payload)?.["command"] ?? null;
            const effect = command === null
                ? undefined
                : stringField(asObject(command)?.["intent"] ?? null, "effect");
            if (effect?.startsWith("observe.beacons."))
                return observed(state, event, "beacon-sweep-durable");
            return observed({
                ...state,
                pendingCommand: command,
                persistedEffect: effect ?? null,
            }, event, "command-durable");
        }
        case "CommandRedispatched": {
            const commandId = stringField(event.payload, "commandId");
            return observed({
                ...state,
                redispatchedCommandIds: commandId === undefined
                    ? state.redispatchedCommandIds
                    : [...state.redispatchedCommandIds, commandId],
            }, event, "command-redispatched");
        }
        case "WorkerResultObserved":
            return (workerResultGuard(state, worker, event, env) ??
                observed(state, event, "worker-result-admissible"));
        case "CommandResult": {
            if (event.workstreamId === "ws_beacon_control")
                return observed(state, event, "beacon-sweep-returned");
            if (asObject(event.payload)?.["workerResultVersion"] === 1) {
                const refusal = workerResultGuard(state, worker, event, env);
                if (refusal)
                    return refusal;
            }
            const candidates = candidatesField(event.payload);
            const deletion = {
                kind: "Act",
                effect: "repo.delete",
                payload: { paths: candidates.map((candidate) => candidate.path) },
            };
            return {
                state: {
                    ...state,
                    candidates,
                    commandResult: event,
                    inspectionCompleted: true,
                    deletionPaths: candidates.map((candidate) => candidate.path),
                },
                intents: [deletion],
                schedules: [],
                trace: {
                    reactorId: "seiri-reactor",
                    reactorVersion: "1",
                    branchPath: ["CommandResult", "deletion-proposed"],
                    envInputs: ["event.payload.candidates"],
                    cadenceEvaluations: [],
                },
            };
        }
        case "DeletionAttempted":
            return deletionDecision(state, worker, event, env);
        case "CommandRefused":
            if (event.workstreamId === "ws_beacon_control")
                return observed(state, event, "beacon-sweep-refused");
            return {
                ...observed({
                    ...state,
                    deletionRefused: true,
                    refusalReason: stringField(event.payload, "reason") ?? null,
                }, event, "episode-terminating"),
                continuation: Program.Emit(draft("EpisodeTerminated", event.occurredAt + 1, {
                    continuation: "verification",
                }, expectedInspectCommandId, event.eventId), Program.Done()),
            };
        case "EpisodeTerminated":
            return episodeDecision(state, worker, event, env);
        case "VerificationRequested":
            return {
                ...observed(state, event, "verification-dispatched"),
                intents: [{ kind: "Observe", subject: "candidates" }],
            };
        case "VerificationCompleted":
            return observed({
                ...state,
                verified: asObject(event.payload)?.["accepted"] === true,
                verificationCompleted: true,
            }, event, "verification-folded");
        case "QueuedPulseNoOp":
            return observed({
                ...state,
                queuedPulseNoOp: true,
                noOpEvidence: stringArrayField(event.payload, "evidence"),
            }, event, "no-op-folded");
        case "SchedulesCancelled":
            return observed({
                ...state,
                cancelledScheduleIds: stringArrayField(event.payload, "scheduleIds"),
                activeScheduleIds: stringArrayField(event.payload, "activeScheduleIds"),
            }, event, "cancellation-folded");
        default:
            return observed(state, event);
    }
};
const walkingDecision = (state, worker, event, env) => {
    if (event.type === "ArtifactIdentityEnforcementStarted") {
        if (canonicalStringify(event.payload) !== '{"payloadVersion":1}')
            return artifactRefused(state, event, "ArtifactIdentityInvalid", "invalid enforcement boundary");
        if (state.identityEnforcementEventId !== null)
            return observed(state, event, "already-enforced");
        return observed({
            ...state,
            identityEnforcementEventId: event.eventId,
            ...(pinnedIdentity(state) === null
                ? { authority: null, pendingCommand: null, program: null }
                : {}),
        }, event, "enforcement-started");
    }
    if (event.type === "LoadoutEquipped")
        return equipDecision(state, event);
    if (isArtifactRefusalType(event.type))
        return observed(event.type === "UnknownScheduleRefused"
            ? state
            : {
                ...state,
                artifactIdentityBlocked: true,
                authority: null,
                pendingCommand: null,
                program: null,
                activeScheduleIds: [],
            }, event, "refusal-recorded");
    // Beacon authority is supplied by its explicit host request, not this loadout.
    const beaconResult = event.workstreamId === "ws_beacon_control" &&
        (event.type === "CommandResult" || event.type === "CommandRefused");
    const consumesProgram = !beaconResult &&
        [
            "OperatorPresenceChanged",
            "CadencePulse",
            "WorkOrderEmitted",
            "CommandResult",
            "WorkerResultObserved",
            "DeletionAttempted",
            "CommandRefused",
            "EpisodeTerminated",
            "VerificationRequested",
            "CommandRedispatchRequested",
        ].includes(event.type);
    return consumesProgram
        ? withEquippedArtifact(state, event, (compiled) => foldWalkingEvent(state, worker, event, env, compiled))
        : foldWalkingEvent(state, worker, event, env);
};
function foldWorkerEvent(state, event) {
    switch (event.type) {
        case "WorkerAttemptStarted":
            return observed({
                ...state,
                workerEpisodeId: stringField(event.payload, "workerEpisodeId") ?? null,
                workerLeaseExpired: false,
            }, event);
        case "WorkerLeaseExpired":
            return stringField(event.payload, "workerEpisodeId") ===
                state.workerEpisodeId
                ? observed({ ...state, workerLeaseExpired: true }, event)
                : observed(state, event, "stale-lease");
        default:
            return observed(state, event);
    }
}
export const seiriReactor = (runtime, event, env) => {
    const state = skeletonStateFromRuntime(runtime);
    const walking = selectWalkingSlice(state);
    // Retain the old validation order even in a feedback/verification workstream.
    if (walking.program !== null)
        programFromState(walking);
    switch (selectEventSlice(state, event)) {
        case "repair":
            return runtimeDecision(repairDecision(state.repair, event), (repair) => ({
                ...runtime,
                repair: json(repair),
            }));
        case "sourceChange":
            return runtimeDecision(sourceChangeDecision(selectSourceChangeSlice(state), event), (sourceChange) => ({ ...runtime, sourceChange }));
        case "resident":
            return runtimeDecision(observed(foldResidentEvent(selectResidentSlice(state), event, env.predicates), event), (resident) => ({ ...runtime, resident: json(resident) }));
        case "feedback":
            return runtimeDecision(feedbackDecision(selectFeedbackSlice(state), event), (feedback) => ({ ...runtime, feedback: json(feedback) }));
        case "verification":
            return runtimeDecision(verificationDecision(selectVerificationSlice(state), event), (verification) => ({ ...runtime, verification: json(verification) }));
        case "worker":
            return runtimeDecision(foldWorkerEvent(selectWorkerSlice(state), event), (worker) => ({ ...runtime, ...worker }));
        case "walking":
            return runtimeDecision(walkingDecision(walking, selectWorkerSlice(state), event, env), (next) => ({ ...runtime, ...next }));
    }
};
export const expectedInspectCommandId = commandId(WORKSTREAM, EPISODE, 1, 0);
// Independent-verification workstreams use the same typed reactor boundary.
export const VERIFICATION_HOST = "verification-host";
export const initialVerificationState = (workstreamId) => ({
    workstreamId,
    criteria: [],
    baseline: null,
    subject: null,
    rows: [],
    evidence: [],
    findings: [],
    repairPlans: [],
    implementerEpisodes: [],
    episodeIds: [],
    authority: null,
    revocations: [],
    pending: null,
    continuation: Program.Done(),
    next: "unopened",
    proposal: null,
    dispatchCount: 0,
    repairCount: 0,
    maxRepairs: 3,
    lastResultEventId: null,
    refusedResults: [],
    staleness: [],
});
const json = (value) => value;
const env = (now) => ({ now, rngState: 17, predicates: {} });
const same = (a, b) => canonicalStringify(a) === canonicalStringify(b);
const requireState = (value, detail) => {
    if (!value)
        throw new Error(`verification state: ${detail}`);
};
// EventEnvelope is deliberately open. Each branch checks the fields it consumes;
// model results cross the stricter, closed schema in parseEvidenceResult.
export function verificationAuthorization(state, at) {
    const pending = state.pending;
    if (!pending || !state.authority)
        throw new Error("verification lacks a pending authorized command");
    return authorize(pending.command.intent, state.authority, {
        now: at,
        actorId: VERIFICATION_HOST,
        workstreamId: state.workstreamId,
        episodeId: pending.command.episodeId,
        decisionIndex: pending.ordinal,
        intentIndex: 0,
        evidence: ["pinned-subject", "baseline-witness"],
        revokedBy: state.revocations,
    });
}
/** The one-shot planning host shares the skeleton's authority decider owner. */
export function planRefutationAuthorization(authority, subjectHash, episodeId, phase, at) {
    return authorize(phase === "read"
        ? {
            kind: "Act",
            effect: "repo.read.plan-subject",
            payload: { subjectHash },
        }
        : { kind: "Act", effect: "report.emit", payload: {} }, authority, {
        now: at,
        actorId: "entropy-reducer",
        workstreamId: "ws_plan_refuter",
        episodeId,
        decisionIndex: 0,
        intentIndex: phase === "read" ? 0 : 1,
        evidence: [],
        revokedBy: [],
    });
}
/** The mission check reads a pinned capsule and returns one judgment. The same
 * grant is re-checked at completion, so an expired episode cannot report. */
export function missionCheckAuthorization(authority, subjectHash, episodeId, at) {
    return authorize({ kind: "Act", effect: "repo.read", payload: { subjectHash } }, authority, {
        now: at,
        actorId: "mission-check",
        workstreamId: "ws_mission_check",
        episodeId,
        decisionIndex: 0,
        intentIndex: 0,
        evidence: [],
        revokedBy: [],
    });
}
/** The Entropy Reducer's dispatch host asks for the census read first and the
 * report emission after the return, so an episode whose window closed during
 * the review cannot file. The refuter asks for the scratch probe instead: it
 * runs reproductions rather than a census. */
export function entropyReviewAuthorization(authority, subjectHash, episodeId, phase, at) {
    return authorize(phase === "census"
        ? {
            kind: "Act",
            effect: "repo.read.census",
            payload: { subjectHash },
        }
        : phase === "probe"
            ? {
                kind: "Act",
                effect: "probe.run:scratch.review",
                resource: "probes",
                payload: { subjectHash },
            }
            : { kind: "Act", effect: "report.emit", payload: {} }, authority, {
        now: at,
        actorId: "entropy-reducer",
        workstreamId: "ws_entropy_reducer",
        episodeId,
        decisionIndex: 0,
        intentIndex: phase === "report" ? 1 : 0,
        evidence: [],
        revokedBy: [],
    });
}
/** Source-change hosts keep kernel decisions in the pure reactor boundary. */
export function sourceChangeAuthorization(...args) {
    return authorize(...args);
}
/** Harness adapters share the skeleton's authority decider owner. */
export function harnessAuthorization(authority, effect, at) {
    return authorize({ kind: "Act", effect, payload: {} }, authority, {
        now: at,
        actorId: "contributor-hook",
        workstreamId: "contributor-session",
        decisionIndex: 0,
        intentIndex: 0,
        evidence: ["resolved-worktree"],
        revokedBy: [],
    });
}
function verificationContinuation(command) {
    return Program.Invoke(command.commandId, command.intent, {
        completed: Program.Emit({
            schemaVersion: 1,
            type: "VerificationContinuation",
            actorId: VERIFICATION_HOST,
            workstreamId: command.workstreamId,
            occurredAt: 0,
            correlationId: command.commandId,
            payload: { commandId: command.commandId },
        }, Program.Done()),
    });
}
/** The pending command the host persisted: the dispatched one, or one whose
 * capsule differs only in the compiler release it names (a stream recorded
 * before a release-only compiler bump, WO-154), adopted with that capsule;
 * null for any other difference. */
function persistedCompilation(command, pending) {
    if (same(command, pending.command))
        return pending;
    const capsule = command?.intent
        ?.payload?.capsule;
    const release = (task) => ({
        ...task,
        compilerPackageVersion: null,
        inputHash: null,
    });
    if (!capsule ||
        capsule.compilerPackageVersion === pending.capsule.compilerPackageVersion ||
        !same(release(capsule), release(pending.capsule)) ||
        !same(command, {
            ...pending.command,
            intent: {
                ...pending.command.intent,
                payload: json({
                    capsule,
                    ...(pending.baseline ? { baseline: pending.baseline } : {}),
                    ...(pending.review ? { review: pending.review } : {}),
                    ...(pending.command.intent.payload
                        .reviewNotice
                        ? { reviewNotice: true }
                        : {}),
                }),
            },
        }))
        return null;
    try {
        assertVerificationTask(capsule);
    }
    catch {
        return null;
    }
    return { ...pending, capsule, command: command };
}
function dispatch(state) {
    requireState(!state.pending &&
        state.subject &&
        state.continuation.kind === "Done" &&
        ["verify", "repair", "review"].includes(state.next), "dispatch phase");
    const ordinal = state.dispatchCount + 1;
    const finding = state.next === "repair"
        ? (state.findings.find((record) => record.status === "open" && record.finding.severity === "blocking")?.finding ?? null)
        : null;
    requireState(state.next !== "repair" || finding, "repair finding");
    const criteria = finding
        ? state.criteria.filter((criterion) => criterion.criterionId === finding.criterionId)
        : state.rows
            .filter((row) => state.next === "review" || row.status !== "verified")
            .map((row) => row.criterion);
    const capsule = compileVerificationTask(`verification_${ordinal}`, criteria, state.subject, finding);
    const baseline = capsule.role === "verifier" && state.next !== "review"
        ? state.baselineContext
        : undefined;
    if (baseline)
        validateBaselineContext(baseline, capsule);
    const review = state.next === "review" ? createReviewContext(state, capsule) : undefined;
    const episodeKind = review
        ? "review"
        : baseline?.kind === "baseline"
            ? "baseline"
            : capsule.role;
    const episodeId = `${state.episodeNamespace ? `${state.episodeNamespace}_` : ""}ep_${episodeKind}_${ordinal}`;
    const command = {
        commandId: commandId(state.workstreamId, episodeId, ordinal, 0),
        episodeId,
        workstreamId: state.workstreamId,
        intent: {
            kind: "Act",
            effect: capsule.workOrder.allowedOperations[0],
            resource: "episodes",
            payload: json({
                capsule,
                ...(baseline ? { baseline } : {}),
                ...(review ? { review } : {}),
                ...(state.reviewNotice &&
                    capsule.role === "verifier" &&
                    !review &&
                    baseline?.kind !== "baseline"
                    ? { reviewNotice: state.reviewNotice }
                    : {}),
            }),
        },
    };
    const continuation = verificationContinuation(command);
    // The kernel emits the dispatch intent. The host persists it before invoking a transport.
    const decision = decideProgram(continuation, json(state), env(0));
    requireState(decision.intents.length === 1, "kernel dispatch intent");
    return {
        ...state,
        dispatchCount: ordinal,
        continuation,
        pending: {
            ...(review ? { review } : {}),
            ...(baseline ? { baseline } : {}),
            capsule,
            command,
            ordinal,
            persisted: false,
            attempts: [],
            activeEpisode: null,
            leaseExpiresAt: 0,
            leaseExpired: false,
        },
    };
}
/** Pure event-loop fold. Worker prose and implementer events have no acceptance path. */
function foldVerificationEvent(state, event) {
    if (event.workstreamId !== state.workstreamId)
        return state;
    if (state.authority?.revocationEventTypes.includes(event.type))
        return { ...state, revocations: [...state.revocations, event] };
    if (event.actorId !== VERIFICATION_HOST)
        return state;
    const value = event.payload;
    switch (event.type) {
        case "VerificationOpened":
            return foldVerificationOpening(state, event, value);
        case "ReviewCompleted": {
            requireState(state.next === "reviewed" &&
                !state.reviewCompleted &&
                event.causationId === state.lastResultEventId &&
                state.continuation.kind === "Emit" &&
                same(event.payload, state.continuation.event.payload), "review result provenance");
            const step = decideProgram(state.continuation, json(state), env(event.occurredAt));
            return {
                ...state,
                reviewCompleted: event.payload,
                continuation: step.continuation,
            };
        }
        case "BaselineWitnessed": {
            const witness = event.payload;
            requireState(state.next === "baseline-witnessed" &&
                !state.baselineWitness &&
                state.baselineContext?.kind === "baseline" &&
                event.causationId === state.lastResultEventId &&
                state.continuation.kind === "Emit" &&
                same(event.payload, state.continuation.event.payload), "baseline result provenance");
            validateBaselineWitness(witness);
            requireState(state.episodeIds.includes(witness.episodeId), "baseline witnessed episode");
            const step = decideProgram(state.continuation, json(state), env(event.occurredAt));
            return {
                ...state,
                baselineWitness: JSON.parse(JSON.stringify(witness)),
                continuation: step.continuation,
            };
        }
        case "VerificationDispatchRequested":
            return dispatch(state);
        case "CommandPersisted": {
            const pending = state.pending;
            if (!pending || value.command?.commandId !== pending.command.commandId)
                return state;
            const persisted = persistedCompilation(value.command, pending);
            requireState(persisted, "persisted compilation drift");
            const next = {
                ...state,
                ...(persisted === pending
                    ? {}
                    : { continuation: verificationContinuation(persisted.command) }),
                pending: { ...persisted, persisted: true },
            };
            requireState(verificationAuthorization(next, event.occurredAt).authorized, "persist without authority");
            return next;
        }
        case "WorkerAttemptStarted": {
            const pending = state.pending;
            if (!pending ||
                !pending.persisted ||
                value.commandId !== pending.command.commandId)
                return state;
            requireState(!state.episodeIds.includes(value.workerEpisodeId) &&
                typeof value.workerEpisodeId === "string" &&
                value.role === pending.capsule.role &&
                value.inputHash === pending.capsule.inputHash &&
                typeof value.leaseExpiresAt === "number" &&
                value.leaseExpiresAt > event.occurredAt, "fresh physical episode");
            requireState(pending.activeEpisode === null ||
                pending.leaseExpired ||
                event.occurredAt >= pending.leaseExpiresAt ||
                value.mode === "cached-result-query", "prior episode still leased");
            return {
                ...state,
                episodeIds: [...state.episodeIds, value.workerEpisodeId],
                pending: {
                    ...pending,
                    attempts: [...pending.attempts, value.workerEpisodeId],
                    activeEpisode: value.workerEpisodeId,
                    leaseExpiresAt: value.leaseExpiresAt,
                    leaseExpired: false,
                },
            };
        }
        case "WorkerHeartbeat": {
            const pending = state.pending;
            if (!pending ||
                value.workerEpisodeId !== pending.activeEpisode ||
                pending.leaseExpired ||
                event.occurredAt >= pending.leaseExpiresAt)
                return state;
            return {
                ...state,
                pending: { ...pending, leaseExpiresAt: value.leaseExpiresAt },
            };
        }
        case "WorkerLeaseExpired": {
            const pending = state.pending;
            if (!pending ||
                value.workerEpisodeId !== pending.activeEpisode ||
                event.occurredAt < pending.leaseExpiresAt)
                return state;
            return { ...state, pending: { ...pending, leaseExpired: true } };
        }
        case "CommandResult": {
            const pending = state.pending;
            if (!pending ||
                !pending.persisted ||
                value.commandId !== pending.command.commandId ||
                value.verificationResultVersion !== 1)
                return state;
            let result;
            try {
                requireState(value.workerEpisodeId === pending.activeEpisode &&
                    !pending.leaseExpired &&
                    event.occurredAt < pending.leaseExpiresAt &&
                    pending.attempts.includes(value.value?.envelope?.episodeId) &&
                    !state.implementerEpisodes.includes(value.value?.envelope?.episodeId), "result episode or lease");
                requireState(verificationAuthorization(state, event.occurredAt).authorized, "result authority");
                assertVerificationTask(pending.capsule);
                requireState(pending.capsule.subject.revision === state.subject?.revision, "result subject drift");
                result = parseEvidenceResult(value.value, {
                    command: pending.command,
                    workOrder: pending.capsule.workOrder,
                    capsule: pending.capsule,
                    episodeId: value.value.envelope.episodeId,
                    ...(pending.baseline ? { baseline: pending.baseline } : {}),
                    ...(pending.review ? { review: pending.review } : {}),
                });
                requireState(result.envelope.status === "completed" &&
                    value.result === "completed", "incomplete result");
            }
            catch {
                return {
                    ...state,
                    refusedResults: [...state.refusedResults, event.eventId],
                };
            }
            const step = decideProgram(state.continuation, json(state), env(event.occurredAt), event);
            requireState(step.continuation?.kind === "Emit", "result continuation");
            const common = {
                ...state,
                pending: null,
                lastResultEventId: event.eventId,
                continuation: step.continuation,
            };
            if (result.kind === "baseline") {
                if (result.envelope.requiresHuman)
                    return { ...common, next: "attention" };
                requireState(pending.baseline?.kind === "baseline", "baseline result context");
                const story = pending.baseline.kind === "baseline"
                    ? pending.baseline.story
                    : undefined;
                return {
                    ...common,
                    next: "baseline-witnessed",
                    continuation: Program.Emit({
                        schemaVersion: 1,
                        type: "BaselineWitnessed",
                        actorId: VERIFICATION_HOST,
                        workstreamId: state.workstreamId,
                        occurredAt: 0,
                        correlationId: pending.command.commandId,
                        causationId: event.eventId,
                        payload: json(createBaselineWitness(story, pending.capsule, result.envelope.episodeId)),
                    }, common.continuation),
                };
            }
            if (result.kind === "review") {
                requireState(pending.review, "review result context");
                return {
                    ...common,
                    next: "reviewed",
                    continuation: Program.Emit(reviewCompletedEvent(pending.capsule, pending.review, result, event, pending.command.commandId), common.continuation),
                };
            }
            if (result.kind === "repair")
                return {
                    ...common,
                    next: result.envelope.requiresHuman ? "attention" : "apply-repair",
                    proposal: result,
                };
            return foldVerificationEvaluation(state, event, pending, result, common);
        }
        case "VerificationContinuation": {
            requireState(state.continuation.kind === "Emit" &&
                event.correlationId === state.continuation.event.correlationId &&
                same(event.payload, state.continuation.event.payload), "continuation identity");
            const step = decideProgram(state.continuation, json(state), env(event.occurredAt));
            requireState(step.emitted.length === 1, "kernel continuation emission");
            return { ...state, continuation: step.continuation };
        }
        case "VerificationSubjectSubmitted":
            return foldVerificationRepair(state, event, value);
        default:
            return state;
    }
}
export const initialVerificationRuntime = (workstreamId) => ({
    ...initialState(),
    verification: json(initialVerificationState(workstreamId)),
});
export const verificationStateFromRuntime = (state) => {
    if (state.verification === undefined)
        throw new Error("runtime lacks a verification workstream");
    const verification = state.verification;
    return {
        ...verification,
        continuation: persistedContinuation(verification?.continuation, "verification continuation"),
    };
};
function verificationDecision(state, event) {
    const before = {
        ...state,
        continuation: persistedContinuation(state?.continuation, "verification continuation"),
    };
    const next = foldVerificationEvent(before, event);
    return {
        state: next,
        intents: before.pending === null && next.pending !== null
            ? [next.pending.command.intent]
            : [],
        continuation: next.continuation,
        schedules: [],
        trace: {
            reactorId: "independent-verification",
            reactorVersion: "1",
            branchPath: [
                event.type,
                next.next,
                next.refusedResults.length > before.refusedResults.length
                    ? "refused-result"
                    : "folded",
            ],
            envInputs: [
                "event.actorId",
                "event.workstreamId",
                "event.payload",
                "event.occurredAt",
            ],
            cadenceEvaluations: [],
        },
    };
}
export function feedbackStateFromRuntime(state) {
    if (state.feedback === undefined)
        throw new Error("feedback workstream not opened");
    return state.feedback;
}
/** Feedback shares the single kernel decider. All I/O remains in its host. */
function feedbackDecision(state, event) {
    if (event.type === "FeedbackAuditOpened") {
        if (state !== undefined ||
            event.actorId !== "feedback-host" ||
            !event.workstreamId)
            throw new Error("feedback opening refused");
        const value = event.payload;
        assertCompiledFeedback(value.program);
        if (!same(value.workOrder, compileFeedbackAudit(value.program, value.workOrder.repo, value.workOrder.baseCommit, value.subject)))
            throw new Error("feedback work order drift");
        const next = {
            ...value,
            workstreamId: event.workstreamId,
            pending: null,
            persisted: false,
            result: null,
            policy: {
                allowedEffects: value.authority.allowedEffects,
                destructiveEffects: ["repo.write", "repo.delete", "publish"],
                scopeExpansionAllowed: false,
                preserveEvidence: true,
                diagnosisRequired: false,
                corrections: [],
            },
        };
        return observed(next, event, "feedback-opened");
    }
    if (state === undefined)
        throw new Error("feedback workstream not opened");
    const before = state;
    if (event.workstreamId !== before.workstreamId)
        return observed(state, event, "feedback-outside-workstream");
    assertCompiledFeedback(before.program);
    if (event.actorId === "operator" &&
        SEMANTIC_CORRECTIONS.some((type) => type === event.type)) {
        const policy = applyFeedbackCorrection(before.program, before.policy, event);
        const decision = observed({ ...before, policy }, event, "feedback-correction");
        return policy === before.policy
            ? decision
            : {
                ...decision,
                continuation: Program.Emit({
                    schemaVersion: 1,
                    type: "FeedbackDiagnosisRequested",
                    actorId: "feedback-host",
                    occurredAt: event.occurredAt,
                    workstreamId: event.workstreamId,
                    causationId: event.eventId,
                    payload: {
                        correctionEventId: event.eventId,
                        policyHash: before.program.policyHash,
                    },
                }, Program.Done()),
            };
    }
    if (event.actorId !== "feedback-host")
        return observed(state, event, "feedback-untrusted-event");
    if (event.type === "FeedbackAuditExecutionRequested") {
        if (!before.pending ||
            !before.persisted ||
            before.result ||
            before.policy.diagnosisRequired ||
            !before.policy.allowedEffects.includes("feedback.audit"))
            return observed(state, event, "feedback-execution-refused");
        const grant = authorize(before.pending.intent, before.authority, {
            now: event.occurredAt,
            actorId: "feedback-host",
            workstreamId: event.workstreamId,
            episodeId: "ep_feedback_executor",
            decisionIndex: 1,
            intentIndex: 0,
            evidence: ["feedback-policy", "pinned-source"],
            revokedBy: [],
        });
        return observed(state, event, grant.authorized && same(grant.command, before.pending)
            ? "feedback-execution-ready"
            : "feedback-execution-refused");
    }
    if (event.type === "FeedbackAuditRequested") {
        if (before.pending ||
            before.result ||
            before.policy.diagnosisRequired ||
            !before.policy.allowedEffects.includes("feedback.audit"))
            return observed(state, event, "feedback-audit-refused");
        const intent = {
            kind: "Act",
            effect: "feedback.audit",
            resource: "audits",
            payload: json({
                workOrder: before.workOrder,
                policyHash: before.program.policyHash,
                subject: before.subject,
            }),
        };
        const grant = authorize(intent, before.authority, {
            now: event.occurredAt,
            actorId: "feedback-host",
            workstreamId: event.workstreamId,
            episodeId: "ep_feedback_executor",
            decisionIndex: 1,
            intentIndex: 0,
            evidence: ["feedback-policy", "pinned-source"],
            revokedBy: [],
        });
        if (!grant.authorized)
            return {
                ...observed(state, event, "feedback-authority-refused"),
                continuation: Program.Emit(grant.refusal, Program.Done()),
            };
        const program = Program.Invoke(grant.command.commandId, intent, {
            completed: Program.Done(),
        });
        const dispatched = decideProgram(program, {}, env(event.occurredAt));
        return {
            ...observed({ ...before, pending: grant.command }, event, "feedback-audit-dispatched"),
            intents: dispatched.intents,
            continuation: program,
        };
    }
    if (event.type === "CommandPersisted") {
        const command = event.payload.command;
        if (!before.pending || before.result || !same(command, before.pending))
            throw new Error("feedback command persistence mismatch");
        return observed({ ...before, persisted: true }, event, "feedback-command-persisted");
    }
    if (event.type === "CommandResult") {
        const result = event.payload;
        if (!before.persisted ||
            !before.pending ||
            before.result ||
            result.commandId !== before.pending.commandId ||
            result.subject !== before.subject ||
            result.policyHash !== before.program.policyHash ||
            result.report === undefined)
            throw new Error("feedback result mismatch");
        return {
            ...observed({ ...before, result: result.report }, event, "feedback-audit-executed"),
            continuation: Program.Done(),
        };
    }
    return observed(state, event, "feedback-observed");
}
/** Repair orchestration uses the same kernel executable subset and owner. */
function repairDecision(previous, event) {
    if (event.actorId !== REPAIR_HOST)
        throw new Error("repair event requires host actor");
    const p = event.payload;
    const check = (condition, detail) => {
        if (!condition)
            throw new Error(`repair state: ${detail}`);
    };
    let state;
    if (event.type === "RepairOpened") {
        check(!previous, "already opened");
        const original = p.original;
        const contract = repairContract(original.workOrder);
        const limit = original.roundLimit ?? 2;
        check(Number.isSafeInteger(limit) && limit >= 0, "round limit");
        check(original.surfaces.length && original.tests.length, "original scope");
        const subject = copySubject(p.subject);
        const baseline = copySubject(p.baseline);
        compileVerificationTask("repair_preflight", original.criteria, subject);
        check(subject.snapshot &&
            repairEqual(subject.snapshot.contract, contract) &&
            repairEqual(subject.snapshot.tests, original.tests) &&
            subject.baseCommit === original.workOrder.baseCommit, "original contract, tests or base mismatch");
        check(baseline.revision === original.workOrder.baseCommit &&
            baseline.baseCommit === subject.baseCommit &&
            baseline.repo === subject.repo, "baseline mismatch");
        state = {
            workstreamId: event.workstreamId,
            original,
            grants: p.grants,
            baseline,
            subject,
            currentCommit: subject.revision,
            round: 0,
            continuation: Program.Done(),
            pending: null,
            emission: null,
            order: null,
            finding: null,
            verified: false,
            status: "running",
            reason: null,
        };
        const decoded = decodeContinuation(p.continuation);
        if (p.reviewItem !== undefined) {
            check(original.roundLimit === 1, "review repair requires one round per item");
            const derived = deriveRepairOrder(p.reviewItem.finding, {
                ...original,
                subject,
                round: 0,
                reviewItem: p.reviewItem.witness,
            });
            check(derived.kind === "derived", "review repair derivation refused");
            if (derived.kind !== "derived")
                throw new Error("review repair derivation refused");
            state = {
                ...state,
                order: derived.order,
                round: derived.order.round,
                finding: derived.order.finding,
            };
        }
        const openingProgram = p.reviewItem === undefined
            ? repairVerificationProgram(state)
            : repairRoundProgram(state);
        check(decoded.ok &&
            repairEqual(decoded.ok ? decoded.value : null, openingProgram), "opening continuation mismatch");
        state = { ...state, continuation: openingProgram };
    }
    else {
        check(previous && previous.workstreamId === event.workstreamId, "workstream mismatch");
        state = previous;
        check(state.status === "running", "terminal workstream");
        const step = (input) => {
            const decision = decideProgram(state.continuation, json(state), {
                now: event.occurredAt,
                rngState: 0,
                predicates: {
                    "repair.verified": { 1: () => state.verified },
                    "repair.remaining": {
                        1: () => state.round < (state.original.roundLimit ?? 2),
                    },
                },
            }, input);
            state = {
                ...state,
                continuation: decision.continuation,
                emission: decision.emitted[0]
                    ? {
                        ...decision.emitted[0],
                        payload: { round: state.round, finding: json(state.finding) },
                    }
                    : null,
            };
            if (state.emission?.type === "RepairDerived") {
                const derivation = deriveRepairOrder(state.finding, { ...state.original, subject: state.subject, round: state.round }, state.grants);
                const continuation = derivation.kind === "derived"
                    ? repairRoundProgram({
                        ...state,
                        order: derivation.order,
                        round: derivation.order.round,
                    })
                    : Program.Done();
                state = {
                    ...state,
                    emission: {
                        ...state.emission,
                        payload: {
                            ...state.emission.payload,
                            derivation: json(derivation),
                            continuation: json(continuation),
                        },
                    },
                };
            }
            return decision;
        };
        if (event.type === "RepairTick") {
            check(!state.pending && !state.emission, "tick with pending effect");
            const decision = step();
            // Intents are offered to the host; only CommandPersisted admits ownership.
            return { ...decision, state };
        }
        else if (event.type === "RepairCommandPersisted") {
            check(!state.pending && !state.emission, "duplicate pending command");
            const decision = step();
            const command = p.command;
            check(decision.intents.length === 1 &&
                repairEqual(decision.intents[0], command.intent), "command not selected by program");
            const kind = command.intent.payload
                .kind;
            check(repairEqual(command, repairCommand(state, kind)), "command identity");
            state = { ...state, pending: command };
        }
        else if (event.type === "RepairCommandResult") {
            check(state.pending && p.commandId === state.pending.commandId, "result without pending command");
            if (state.pending.intent.effect === "repo.write") {
                check(p.result === "accepted" && state.order, "repair ownership result");
            }
            else {
                check(p.result === "completed", "verification result kind");
                const capsule = p.capsule;
                assertVerificationTask(capsule);
                check(capsule.role === "verifier" &&
                    capsule.subject.revision === state.currentCommit &&
                    capsule.subject.baseCommit ===
                        state.original.workOrder.baseCommit &&
                    capsule.subject.repo === state.subject.repo &&
                    repairEqual(capsule.criteria, state.original.criteria) &&
                    repairEqual(capsule.subject.snapshot?.contract, repairContract(state.original.workOrder)) &&
                    repairEqual(capsule.subject.snapshot?.tests, state.original.tests), "re-verification changed original contract");
                const result = parseEvidenceResult(p.value, {
                    command: p.verifierCommand,
                    workOrder: capsule.workOrder,
                    capsule,
                    episodeId: p.value?.envelope?.episodeId,
                });
                check(result.kind === "verification" &&
                    result.envelope.status === "completed", "unusable verification");
                if (result.kind !== "verification")
                    throw new Error("repair requires verification");
                const verified = !result.envelope.requiresHuman &&
                    result.evaluations.length === state.original.criteria.length &&
                    result.evaluations.every((e) => e.verdict === "pass");
                const finding = result.findings.find((f) => f.severity === "blocking") ?? null;
                state = { ...state, subject: capsule.subject, verified, finding };
                if (!verified && (!finding || result.envelope.requiresHuman)) {
                    state = {
                        ...state,
                        pending: null,
                        continuation: Program.Done(),
                        emission: {
                            schemaVersion: 1,
                            type: "NeedsHuman",
                            actorId: REPAIR_HOST,
                            workstreamId: state.workstreamId,
                            occurredAt: 0,
                            payload: {
                                reason: "verification needs human attention",
                                offending: finding?.findingId ?? "unverified",
                            },
                        },
                    };
                    return observed(state, event);
                }
            }
            step({ ...event, type: "CommandResult" });
            state = { ...state, pending: null };
        }
        else if (event.type === "SourceChangeObserved") {
            check(state.order && !state.pending, "source observation without repair");
            const observation = decodeSourceObservation(p.observation);
            check(Array.isArray(p.tests) &&
                repairEqual(p.tests.map((test) => decodeFocusedTest(test).command), state.order.tests.map((test) => test.command)), "repair reproduction commands mismatch");
            const command = repairCommand(state, "write");
            check(event.correlationId === command.commandId &&
                observation.workOrderId === state.order.workOrder.workOrderId &&
                observation.commit !== state.order.executionBaseCommit, "source observation identity");
            const before = state.continuation;
            step(event);
            check(!repairEqual(before, state.continuation), "source observation not awaited");
            state = { ...state, currentCommit: observation.commit };
        }
        else if (event.type === "NeedsHuman") {
            if (state.emission)
                check(state.emission.type === event.type &&
                    repairEqual(state.emission.payload, event.payload), "human disposition mismatch");
            check(typeof p.reason === "string" && typeof p.offending === "string", "human disposition fields");
            state = {
                ...state,
                status: "needs-human",
                reason: `${p.reason}: ${p.offending}`,
                continuation: Program.Done(),
                pending: null,
                emission: null,
            };
        }
        else {
            check(state.emission?.type === event.type &&
                repairEqual(state.emission.payload, event.payload), "program emission mismatch");
            state = { ...state, emission: null };
            if (event.type === "RepairDerived") {
                const derived = deriveRepairOrder(state.finding, { ...state.original, subject: state.subject, round: state.round }, state.grants);
                check(repairEqual(derived, p.derivation), "derived order drift");
                if (derived.kind === "NeedsHuman") {
                    state = {
                        ...state,
                        continuation: Program.Done(),
                        emission: {
                            schemaVersion: 1,
                            type: "NeedsHuman",
                            actorId: REPAIR_HOST,
                            workstreamId: state.workstreamId,
                            occurredAt: 0,
                            payload: { reason: derived.reason, offending: derived.offending },
                        },
                    };
                }
                else {
                    state = {
                        ...state,
                        order: derived.order,
                        round: derived.order.round,
                        verified: false,
                    };
                    const decoded = decodeContinuation(p.continuation);
                    check(decoded.ok &&
                        repairEqual(decoded.ok ? decoded.value : null, repairRoundProgram(state)), "derived continuation drift");
                    state = {
                        ...state,
                        continuation: decoded.ok ? decoded.value : Program.Done(),
                    };
                }
            }
            else if (event.type === "RepairCompleted" ||
                event.type === "RepairExhausted") {
                check(event.type !== "RepairExhausted" || state.finding, "exhaustion lacks last finding");
                state = {
                    ...state,
                    status: event.type === "RepairCompleted" ? "complete" : "exhausted",
                    continuation: Program.Done(),
                };
            }
            else
                throw new Error(`unknown repair event ${event.type}`);
        }
    }
    return observed(state, event);
}
