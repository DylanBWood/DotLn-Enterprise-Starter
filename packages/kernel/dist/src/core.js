import { Cadence, Program, } from "./types.js";
export function predicate(ref, state, env, event) {
    const fn = env.predicates[ref.registryId]?.[ref.version];
    if (!fn)
        throw new Error(`Unknown predicate ${ref.registryId}@${ref.version}`);
    return fn({ state, ...(event === undefined ? {} : { event }), env }, ref.params ?? {});
}
const defineCadenceKinds = (kinds) => kinds;
export const CADENCE_KINDS = defineCadenceKinds([
    "Once",
    "After",
    "Every",
    "Burst",
    "Calendar",
    "Window",
    "While",
    "Until",
    "Gate",
    "Sequence",
    "Merge",
    "Race",
    "Repeat",
    "Backoff",
]);
export const EVALUABLE_CADENCE_KINDS = [
    "Once",
    "After",
    "Every",
    "Gate",
    "Until",
    "Backoff",
];
function draw(state) {
    const next = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return [next / 0x100000000, next];
}
export function evaluateCadence(cadence, state, env, event) {
    switch (cadence.kind) {
        case "Once":
            return {
                dueAt: cadence.at,
                rngState: env.rngState,
                trace: `Once:${cadence.at}`,
            };
        case "After":
            return {
                dueAt: env.now + cadence.delayMs,
                rngState: env.rngState,
                trace: `After:${cadence.delayMs}`,
            };
        case "Every": {
            if (!Number.isFinite(cadence.intervalMs) || cadence.intervalMs <= 0)
                throw new Error("Every intervalMs must be positive");
            const start = cadence.startAt ?? 0;
            const due = env.now < start
                ? start
                : start +
                    (Math.floor((env.now - start) / cadence.intervalMs) + 1) *
                        cadence.intervalMs;
            return {
                dueAt: due,
                rngState: env.rngState,
                trace: `Every:${cadence.intervalMs}`,
            };
        }
        case "Gate":
            return predicate(cadence.conditionRef, state, env, event)
                ? evaluateCadence(cadence.cadence, state, env, event)
                : { dueAt: null, rngState: env.rngState, trace: "Gate:closed" };
        case "Until":
            return predicate(cadence.conditionRef, state, env, event)
                ? { dueAt: null, rngState: env.rngState, trace: "Until:cancelled" }
                : evaluateCadence(cadence.cadence, state, env, event);
        case "Backoff": {
            const [unit, next] = draw(env.rngState);
            const base = cadence.initialMs * cadence.factor ** cadence.attempt;
            const delay = Math.min(cadence.maxMs, Math.max(0, Math.round(base * (1 + (unit * 2 - 1) * cadence.jitter))));
            return {
                dueAt: env.now + delay,
                rngState: next,
                trace: `Backoff:${cadence.attempt}:${delay}`,
            };
        }
        default:
            throw new Error(`Cadence ${cadence.kind} evaluation is deferred`);
    }
}
const defineExecutableKinds = (kinds) => kinds;
export const EVALUABLE_PROGRAM_KINDS = defineExecutableKinds([
    "Done",
    "Emit",
    "Invoke",
    "Await",
    "Guard",
    "Sequence",
]);
export function stepProgram(program, state, env, event) {
    switch (program.kind) {
        case "Done":
            return { residual: program, emitted: [], intents: [], waits: [] };
        case "Emit":
            return {
                residual: program.next,
                emitted: [program.event],
                intents: [],
                waits: [],
            };
        case "Invoke": {
            const payload = event?.payload;
            const result = payload?.result;
            const matches = event?.type === "CommandResult" &&
                payload?.commandId === program.commandId &&
                typeof result === "string";
            if (!matches)
                return {
                    residual: program,
                    emitted: [],
                    intents: event === undefined ? [program.command] : [],
                    waits: [],
                };
            const continuation = Object.hasOwn(program.continuationByResult, result)
                ? program.continuationByResult[result]
                : undefined;
            if (!continuation)
                throw new Error(`No Invoke continuation for result ${result}`);
            return { residual: continuation, emitted: [], intents: [], waits: [] };
        }
        case "Await": {
            const payload = event !== undefined &&
                event.payload !== null &&
                !Array.isArray(event.payload) &&
                typeof event.payload === "object"
                ? event.payload
                : undefined;
            const matches = event !== undefined &&
                event.type === program.pattern.type &&
                (program.pattern.correlationId === undefined ||
                    event.correlationId === program.pattern.correlationId) &&
                (program.pattern.commandId === undefined ||
                    payload?.commandId === program.pattern.commandId);
            return matches
                ? { residual: program.next, emitted: [], intents: [], waits: [] }
                : { residual: program, emitted: [], intents: [], waits: [program] };
        }
        case "Guard":
            return stepProgram(predicate(program.conditionRef, state, env, event)
                ? program.whenTrue
                : program.whenFalse, state, env, event);
        case "Sequence": {
            const [head, ...tail] = program.programs;
            if (!head)
                return {
                    residual: Program.Done(),
                    emitted: [],
                    intents: [],
                    waits: [],
                };
            const result = stepProgram(head, state, env, event);
            const remaining = result.residual.kind === "Done" ? tail : [result.residual, ...tail];
            return {
                ...result,
                residual: remaining.length === 0 ? Program.Done() : Program.Sequence(remaining),
            };
        }
        default:
            throw new Error(`Invalid executable program kind: ${String(program.kind)}`);
    }
}
export function decideProgram(program, state, env, event) {
    const step = stepProgram(program, state, env, event);
    return {
        state,
        intents: step.intents,
        continuation: step.residual,
        schedules: [],
        trace: {
            reactorId: "program",
            reactorVersion: "1",
            branchPath: [program.kind, step.residual.kind],
            envInputs: event === undefined ? [] : ["event"],
            cadenceEvaluations: step.waits.map((wait) => `await:${wait.pattern.type}`),
        },
        emitted: step.emitted,
        waits: step.waits,
    };
}
export const serializeContinuation = (program) => JSON.stringify(program);
export function stableHash(value) {
    let h = 0xcbf29ce484222325n;
    for (const byte of new TextEncoder().encode(value))
        h = ((h ^ BigInt(byte)) * 0x100000001b3n) & 0xffffffffffffffffn;
    return h.toString(16).padStart(16, "0");
}
export function commandId(workstreamId, episodeId, decisionIndex, intentIndex) {
    return `cmd_${stableHash(`${episodeId ? `ep:${episodeId}` : `ws:${workstreamId}`}:${decisionIndex}:${intentIndex}`)}`;
}
const effectMatches = (pattern, effect) => pattern.endsWith("*")
    ? effect.startsWith(pattern.slice(0, -1))
    : pattern === effect;
const isClocklessKernelEnv = (value) => {
    if (value === null || Array.isArray(value) || typeof value !== "object")
        return false;
    const candidate = value;
    return (typeof candidate.rngState === "number" &&
        Number.isFinite(candidate.rngState) &&
        candidate.predicates !== null &&
        !Array.isArray(candidate.predicates) &&
        typeof candidate.predicates === "object");
};
export function authorize(intent, envelope, context) {
    const revocationConditions = envelope.revocationConditions ?? [];
    const predicateEnvInput = isClocklessKernelEnv(context.predicateEnv)
        ? context.predicateEnv
        : undefined;
    let revocationEvaluation;
    const evaluateRevocationConditions = () => {
        if (revocationEvaluation !== undefined)
            return revocationEvaluation;
        if (revocationConditions.length === 0)
            return (revocationEvaluation = {
                cannotEvaluate: false,
                matched: false,
            });
        if (context.state === undefined || predicateEnvInput === undefined)
            return (revocationEvaluation = {
                cannotEvaluate: true,
                matched: false,
            });
        try {
            const predicateEnv = {
                ...predicateEnvInput,
                now: context.now,
            };
            if (revocationConditions.some((ref) => predicateEnv.predicates[ref.registryId]?.[ref.version] ===
                undefined))
                return (revocationEvaluation = {
                    cannotEvaluate: true,
                    matched: false,
                });
            let matched = false;
            for (const condition of revocationConditions)
                for (const event of context.revokedBy)
                    matched =
                        predicate(condition, context.state, predicateEnv, event) || matched;
            return (revocationEvaluation = { cannotEvaluate: false, matched });
        }
        catch {
            return (revocationEvaluation = {
                cannotEvaluate: true,
                matched: false,
            });
        }
    };
    const ownsResource = intent.resource === undefined ||
        Object.hasOwn(envelope.resourceLimits, intent.resource);
    const rules = [
        {
            name: "effect is not a string",
            fails: () => typeof intent.effect !== "string",
        },
        {
            name: "authority expired",
            fails: () => context.now >= envelope.expiresAt,
        },
        {
            name: "cannot evaluate revocation",
            fails: () => evaluateRevocationConditions().cannotEvaluate,
        },
        {
            name: "authority revoked",
            fails: () => envelope.revocationEventTypes.some((type) => context.revokedBy.some((event) => event.type === type)) || evaluateRevocationConditions().matched,
        },
        {
            name: "effect denied",
            fails: () => envelope.deniedEffects.some((pattern) => effectMatches(pattern, intent.effect)),
        },
        {
            name: "effect not allowed",
            fails: () => !envelope.allowedEffects.some((pattern) => effectMatches(pattern, intent.effect)),
        },
        {
            name: "required evidence missing",
            fails: () => envelope.requiredEvidence.some((evidence) => !context.evidence.includes(evidence)),
        },
        {
            name: "resource limit exceeded",
            fails: () => intent.resource !== undefined &&
                (!ownsResource || envelope.resourceLimits[intent.resource] <= 0),
        },
    ];
    const reason = rules.find((rule) => rule.fails())?.name;
    if (reason === undefined) {
        const resourceLimits = intent.resource === undefined
            ? envelope.resourceLimits
            : {
                ...envelope.resourceLimits,
                [intent.resource]: envelope.resourceLimits[intent.resource] - 1,
            };
        return {
            authorized: true,
            command: {
                commandId: commandId(context.workstreamId, context.episodeId, context.decisionIndex, context.intentIndex),
                ...(context.episodeId === undefined
                    ? {}
                    : { episodeId: context.episodeId }),
                workstreamId: context.workstreamId,
                intent,
            },
            authority: { ...envelope, resourceLimits },
            trace: {
                reactorId: "authority-guard",
                reactorVersion: "1",
                branchPath: ["authorized", intent.effect],
                envInputs: [
                    `now:${context.now}`,
                    `authorityEnvelope:${envelope.authorityEnvelopeId}`,
                    "evidence",
                    "revocations",
                    ...(revocationConditions.length === 0
                        ? []
                        : [
                            "state",
                            `rngState:${predicateEnvInput.rngState}`,
                            "predicates",
                            ...(predicateEnvInput.policy === undefined ? [] : ["policy"]),
                        ]),
                    ...(intent.resource === undefined
                        ? []
                        : [`resource:${intent.resource}`]),
                ],
                cadenceEvaluations: [],
            },
        };
    }
    return {
        authorized: false,
        refusal: {
            schemaVersion: 1,
            type: "CommandRefused",
            occurredAt: context.now,
            actorId: context.actorId,
            workstreamId: context.workstreamId,
            ...(context.episodeId === undefined
                ? {}
                : { episodeId: context.episodeId }),
            payload: {
                intentIndex: context.intentIndex,
                reason,
                authorityEnvelopeId: envelope.authorityEnvelopeId,
            },
        },
        trace: {
            reactorId: "authority-guard",
            reactorVersion: "1",
            branchPath: ["refused", reason],
            envInputs: [
                "now",
                "authorityEnvelope",
                "evidence",
                "revocations",
                ...(revocationConditions.length > 0 &&
                    revocationEvaluation !== undefined
                    ? [
                        ...(context.state === undefined ? [] : ["state"]),
                        ...(predicateEnvInput === undefined
                            ? []
                            : [
                                `rngState:${predicateEnvInput.rngState}`,
                                "predicates",
                                ...(predicateEnvInput.policy === undefined
                                    ? []
                                    : ["policy"]),
                            ]),
                    ]
                    : []),
            ],
            cadenceEvaluations: [],
        },
    };
}
function stateField(state, key) {
    return state !== null && !Array.isArray(state) && typeof state === "object"
        ? state[key]
        : undefined;
}
/** Legacy state-layout contract for callers that omit a replay projector. */
export function defaultEnvironmentProjection(state) {
    const rngState = stateField(state, "rngState");
    const policy = stateField(state, "policy");
    return {
        rngState: typeof rngState === "number" ? rngState : 0,
        ...(policy === undefined ? {} : { policy }),
    };
}
export function replay(initial, events, reactor, predicates, projectEnvironment) {
    let state = initial;
    const decisions = [];
    for (const event of events) {
        const projected = projectEnvironment === undefined
            ? defaultEnvironmentProjection(state)
            : projectEnvironment(state, event);
        const { rngState, policy } = projected;
        if (projectEnvironment !== undefined && !Number.isFinite(rngState))
            throw new Error("Replay environment projector must return a finite rngState");
        const env = {
            now: event.occurredAt,
            rngState,
            predicates,
            ...(policy === undefined ? {} : { policy }),
        };
        const decision = reactor(state, event, env);
        decisions.push(decision);
        state = decision.state;
    }
    return { state, decisions };
}
export const emptyOutbox = () => ({ entries: {} });
export function persistCommand(state, command) {
    return Object.hasOwn(state.entries, command.commandId)
        ? state
        : {
            entries: {
                ...state.entries,
                [command.commandId]: { command, status: "pending" },
            },
        };
}
export const pendingCommands = (state) => Object.values(state.entries)
    .filter((entry) => entry.status === "pending")
    .map((entry) => entry.command);
export function replayOutbox(events, options) {
    let state = emptyOutbox();
    const traces = [];
    const orphanResults = new Map();
    for (const event of events) {
        if (event.type === "CommandPersisted") {
            const payload = event.payload !== null &&
                !Array.isArray(event.payload) &&
                typeof event.payload === "object"
                ? event.payload
                : undefined;
            const command = payload !== undefined &&
                payload["command"] !== null &&
                !Array.isArray(payload["command"]) &&
                typeof payload["command"] === "object"
                ? payload["command"]
                : undefined;
            if (command !== undefined &&
                typeof command.commandId === "string" &&
                command.commandId !== "") {
                state = persistCommand(state, command);
                const orphaned = orphanResults.get(command.commandId);
                if (orphaned !== undefined) {
                    orphaned.forEach(({ event: result, traceIndex }, index) => {
                        const applied = applyCommandResult(state, result);
                        state = applied.state;
                        traces[traceIndex] =
                            index === 0
                                ? {
                                    ...applied.trace,
                                    branchPath: ["result", "preceded-persist"],
                                }
                                : applied.trace;
                    });
                    orphanResults.delete(command.commandId);
                }
            }
        }
        else if (event.type === "CommandResult") {
            const applied = applyCommandResult(state, event);
            state = applied.state;
            const traceIndex = traces.push(applied.trace) - 1;
            const resultCommandId = commandIdFromResult(event);
            if (resultCommandId !== undefined &&
                applied.trace.branchPath[1] === "unknown") {
                const orphaned = orphanResults.get(resultCommandId) ?? [];
                orphaned.push({ event, traceIndex });
                orphanResults.set(resultCommandId, orphaned);
            }
        }
    }
    return options === undefined ? state : { state, traces };
}
function commandIdFromResult(result) {
    const commandId = result.payload !== null &&
        !Array.isArray(result.payload) &&
        typeof result.payload === "object"
        ? result.payload["commandId"]
        : undefined;
    return typeof commandId === "string" ? commandId : undefined;
}
export function applyCommandResult(state, result) {
    if (result.type !== "CommandResult")
        return {
            state,
            trace: {
                reactorId: "outbox",
                reactorVersion: "1",
                branchPath: ["result", "ignored-event-type"],
                envInputs: ["eventType"],
                cadenceEvaluations: [],
            },
        };
    const command = commandIdFromResult(result);
    if (typeof command !== "string" || !Object.hasOwn(state.entries, command))
        return {
            state,
            trace: {
                reactorId: "outbox",
                reactorVersion: "1",
                branchPath: ["result", "unknown"],
                envInputs: ["commandId"],
                cadenceEvaluations: [],
            },
        };
    const current = state.entries[command];
    if (current.status === "completed")
        return {
            state,
            trace: {
                reactorId: "outbox",
                reactorVersion: "1",
                branchPath: ["result", "dedup"],
                envInputs: ["commandId"],
                cadenceEvaluations: [],
            },
        };
    return {
        state: {
            entries: {
                ...state.entries,
                [command]: {
                    ...current,
                    status: "completed",
                    resultEventId: result.eventId,
                },
            },
        },
        trace: {
            reactorId: "outbox",
            reactorVersion: "1",
            branchPath: ["result", "accepted"],
            envInputs: ["commandId"],
            cadenceEvaluations: [],
        },
    };
}
export function guardQueuedPulse(state, pulse, env, presenceRef, futureScheduleIds) {
    const away = predicate(presenceRef, state, env, pulse);
    const cancelledScheduleIds = away ? [] : futureScheduleIds;
    return {
        state,
        intents: away
            ? []
            : [
                {
                    kind: "NoOp",
                    reason: "operator returned",
                    evidence: [pulse.eventId],
                    reevaluation: Cadence.Once(pulse.occurredAt),
                    usefulWhen: presenceRef,
                },
            ],
        schedules: [],
        cancelledScheduleIds,
        trace: {
            reactorId: "presence-guard",
            reactorVersion: "1",
            branchPath: ["queued-pulse", away ? "active" : "noop"],
            envInputs: ["operatorPresence"],
            cadenceEvaluations: cancelledScheduleIds.map((id) => `cancel:${id}`),
        },
    };
}
