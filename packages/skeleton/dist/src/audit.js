import { decodeLog } from "@dotln/kernel";
import { projectArtifactIdentities, withoutArtifactIdentityInputs, } from "./artifact-audit.js";
export const AUDIT_RECORD_SCHEMA_VERSION = 1;
export const AUDIT_PROJECTION_SCHEMA_VERSION = 1;
export const consequentialActionClasses = [
    {
        actionClass: "work-order-dispatch",
        sourceEventTypes: ["WorkOrderEmitted"],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "workOrderRef",
        ],
        operatorQuestion: "What bounded work was emitted for this episode?",
        verifierQuestion: "Which canonical event and WorkOrder reference prove emission without claiming a transport receipt?",
    },
    {
        actionClass: "authority-decision",
        sourceEventTypes: [
            "DecisionRecorded",
            "CommandPersisted",
            "CommandRefused",
        ],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "commandId when allowed",
            "authorization trace when recorded",
            "authorityEnvelopeRef and reason when denied",
        ],
        operatorQuestion: "Was the requested action allowed or denied, and why?",
        verifierQuestion: "Does the decision retain its canonical command or refusal evidence without inventing either?",
    },
    {
        actionClass: "external-effect",
        sourceEventTypes: [
            "CommandResult",
            "DeletionAttempted",
            "SchedulesCancelled",
        ],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "commandId when one exists",
        ],
        operatorQuestion: "What outside action was requested or observed?",
        verifierQuestion: "Which retained events distinguish a requested effect from an observed result?",
    },
    {
        actionClass: "result",
        sourceEventTypes: ["CommandResult", "EpisodeTerminated"],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "commandId for command results",
        ],
        operatorQuestion: "What outcome did the episode or command return?",
        verifierQuestion: "Does the result point to the originating command and canonical result event?",
    },
    {
        actionClass: "verification",
        sourceEventTypes: ["VerificationRequested", "VerificationCompleted"],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "subjectRef when known",
        ],
        operatorQuestion: "Was the result accepted by the recorded verification step?",
        verifierQuestion: "Which request and completion events support the verdict, and what attribution is actually recorded?",
    },
    {
        actionClass: "recovery",
        sourceEventTypes: ["CommandPersisted", "CommandRedispatched"],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "commandId",
            "originalCommandEventId",
        ],
        operatorQuestion: "Which interrupted command resumed?",
        verifierQuestion: "Did recovery preserve the original canonical command identity?",
    },
    {
        actionClass: "no-op",
        sourceEventTypes: ["QueuedPulseNoOp"],
        requiredReferences: [
            "eventIds",
            "workstreamId",
            "episodeId when present",
            "evidenceEventIds",
        ],
        operatorQuestion: "Why did the system deliberately do nothing?",
        verifierQuestion: "Does the decline point to the event evidence that made further work inapplicable?",
    },
];
const asObject = (value) => value !== undefined &&
    value !== null &&
    !Array.isArray(value) &&
    typeof value === "object"
    ? value
    : undefined;
const isNonBlankString = (value) => typeof value === "string" && value.trim().length > 0;
const isJsonValue = (value, ancestors = new Set()) => {
    if (value === null || typeof value === "string" || typeof value === "boolean")
        return true;
    if (typeof value === "number")
        return Number.isFinite(value);
    if (typeof value !== "object")
        return false;
    if (ancestors.has(value))
        return false;
    if (!Array.isArray(value) &&
        Object.getPrototypeOf(value) !== Object.prototype &&
        Object.getPrototypeOf(value) !== null)
        return false;
    ancestors.add(value);
    const valid = Array.isArray(value)
        ? value.every((item) => isJsonValue(item, ancestors))
        : Object.values(value).every((item) => isJsonValue(item, ancestors));
    ancestors.delete(value);
    return valid;
};
const stringField = (value, field) => {
    const candidate = asObject(value)?.[field];
    return isNonBlankString(candidate) ? candidate : undefined;
};
const booleanField = (value, field) => {
    const candidate = asObject(value)?.[field];
    return typeof candidate === "boolean" ? candidate : undefined;
};
const stringArrayField = (value, field) => {
    const candidate = asObject(value)?.[field];
    return Array.isArray(candidate) && candidate.every(isNonBlankString)
        ? candidate
        : undefined;
};
const persistedCommandRef = (event) => {
    if (event.type !== "CommandPersisted")
        return undefined;
    const command = asObject(asObject(event.payload)?.["command"]);
    const intent = asObject(command?.["intent"]);
    const commandId = command?.["commandId"];
    const effect = intent?.["effect"];
    const resource = intent?.["resource"];
    return isNonBlankString(commandId) &&
        isNonBlankString(effect) &&
        (resource === undefined || typeof resource === "string")
        ? {
            commandId,
            effect,
            ...(resource === undefined ? {} : { resource }),
        }
        : undefined;
};
const commandIdFromPayload = (event) => stringField(event.payload, "commandId") ??
    persistedCommandRef(event)?.commandId;
const commandScopeKey = (event, commandId) => JSON.stringify([event.workstreamId, event.episodeId ?? null, commandId]);
const workOrderRef = (event) => stringField(asObject(event.payload)?.["workOrder"], "workOrderId");
const withEnvelopeLinks = (event) => ({
    ...(event.episodeId === undefined ? {} : { episodeId: event.episodeId }),
    ...(event.correlationId === undefined
        ? {}
        : { correlationId: event.correlationId }),
    ...(event.causationId === undefined
        ? {}
        : { causationId: event.causationId }),
});
const baseRecord = (primary, actionClass, action, outcome, eventIds = [primary.eventId]) => ({
    schemaVersion: AUDIT_RECORD_SCHEMA_VERSION,
    recordId: `audit:${primary.eventId}:${actionClass}`,
    actionClass,
    action,
    outcome,
    occurredAt: primary.occurredAt,
    actorId: primary.actorId,
    workstreamId: primary.workstreamId,
    ...withEnvelopeLinks(primary),
    eventIds,
});
const sameEpisodeAndTime = (left, right) => left.workstreamId === right.workstreamId &&
    left.episodeId !== undefined &&
    left.episodeId === right.episodeId &&
    left.occurredAt === right.occurredAt;
const semanticAuthorityInputsAreComplete = (inputs) => {
    if (inputs.length === 0)
        return true;
    const rngState = inputs[1]?.slice("rngState:".length);
    return (inputs.length >= 3 &&
        inputs.length <= 4 &&
        inputs[0] === "state" &&
        inputs[1]?.startsWith("rngState:") === true &&
        rngState !== undefined &&
        rngState.trim() !== "" &&
        Number.isFinite(Number(rngState)) &&
        String(Number(rngState)) === rngState &&
        inputs[2] === "predicates" &&
        (inputs.length === 3 || inputs[3] === "policy"));
};
const isAuthorizedDecisionTrace = (candidate, persisted, command) => {
    if (candidate === undefined ||
        candidate.type !== "DecisionRecorded" ||
        candidate.workstreamId !== persisted.workstreamId ||
        candidate.episodeId !== persisted.episodeId)
        return false;
    const trace = asObject(asObject(candidate.payload)?.["trace"]);
    const branchPath = stringArrayField(trace, "branchPath");
    const envInputs = stringArrayField(trace, "envInputs");
    const cadenceEvaluations = asObject(trace)?.["cadenceEvaluations"];
    const authorityInput = envInputs?.[1];
    if (envInputs === undefined ||
        envInputs[0] !== `now:${candidate.occurredAt}` ||
        authorityInput?.startsWith("authorityEnvelope:") !== true ||
        authorityInput.slice("authorityEnvelope:".length).trim() === "" ||
        envInputs[2] !== "evidence" ||
        envInputs[3] !== "revocations")
        return false;
    const unpinned = withoutArtifactIdentityInputs(envInputs);
    if (unpinned === undefined)
        return false;
    const suffix = [...unpinned.slice(4)];
    if (command.resource === undefined) {
        if (suffix.some((input) => input.startsWith("resource:")))
            return false;
    }
    else if (suffix.pop() !== `resource:${command.resource}`) {
        return false;
    }
    return (stringField(trace, "reactorId") === "authority-guard" &&
        stringField(trace, "reactorVersion") === "1" &&
        branchPath?.length === 2 &&
        branchPath[0] === "authorized" &&
        branchPath[1] === command.effect &&
        semanticAuthorityInputsAreComplete(suffix) &&
        Array.isArray(cadenceEvaluations) &&
        cadenceEvaluations.length === 0);
};
const isRefusedDecisionTrace = (candidate, refused, reason) => {
    if (candidate === undefined ||
        candidate.type !== "DecisionRecorded" ||
        !sameEpisodeAndTime(candidate, refused))
        return false;
    const trace = asObject(asObject(candidate.payload)?.["trace"]);
    const branchPath = stringArrayField(trace, "branchPath");
    const envInputs = stringArrayField(trace, "envInputs");
    const cadenceEvaluations = asObject(trace)?.["cadenceEvaluations"];
    const unpinned = envInputs === undefined
        ? undefined
        : withoutArtifactIdentityInputs(envInputs);
    return (stringField(trace, "reactorId") === "authority-guard" &&
        stringField(trace, "reactorVersion") === "1" &&
        branchPath?.length === 2 &&
        branchPath[0] === "refused" &&
        branchPath[1] === reason &&
        envInputs !== undefined &&
        envInputs[0] === "now" &&
        envInputs[1] === "authorityEnvelope" &&
        envInputs[2] === "evidence" &&
        envInputs[3] === "revocations" &&
        unpinned !== undefined &&
        semanticAuthorityInputsAreComplete(unpinned.slice(4)) &&
        Array.isArray(cadenceEvaluations) &&
        cadenceEvaluations.length === 0);
};
const invalidAuditSource = (event, detail) => {
    throw new Error(`invalid audit source ${event.eventId} ${event.type}: ${detail}`);
};
const validateCanonicalEvents = (events) => {
    const eventIds = new Set();
    for (const [index, event] of events.entries()) {
        const ordinal = index + 1;
        if (event === null || typeof event !== "object" || Array.isArray(event))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: envelope must be an object`);
        if (event.schemaVersion !== 1)
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: unsupported schemaVersion`);
        if (!isNonBlankString(event.eventId))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: eventId must be non-blank`);
        if (eventIds.has(event.eventId))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: duplicate eventId ${event.eventId}`);
        eventIds.add(event.eventId);
        if (!isNonBlankString(event.type))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: type must be non-blank`);
        if (!Number.isFinite(event.occurredAt))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: occurredAt must be finite`);
        if (!isNonBlankString(event.actorId))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: actorId must be non-blank`);
        if (!isNonBlankString(event.workstreamId))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: workstreamId must be non-blank`);
        for (const [field, value] of [
            ["episodeId", event.episodeId],
            ["correlationId", event.correlationId],
            ["causationId", event.causationId],
        ])
            if (value !== undefined && !isNonBlankString(value))
                throw new Error(`invalid audit log event at append ordinal ${ordinal}: ${field} must be non-blank when present`);
        if (event.causationId === event.eventId)
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: event cannot cause itself`);
        if (!Object.hasOwn(event, "payload") || !isJsonValue(event.payload))
            throw new Error(`invalid audit log event at append ordinal ${ordinal}: payload must be present JSON data`);
    }
};
const nonEmptyReferences = (values, event, detail) => {
    const first = values[0] ?? invalidAuditSource(event, detail);
    return [first, ...values.slice(1)];
};
const eventIds = (events) => {
    const first = events[0];
    if (first === undefined)
        throw new Error("audit record needs a source event");
    return [first.eventId, ...events.slice(1).map((event) => event.eventId)];
};
export function deriveAuditRecords(events) {
    validateCanonicalEvents(events);
    const records = [];
    const canonicalEventIds = new Set(events.map((event) => event.eventId));
    const persistedByScopeAndCommand = new Map();
    for (const [index, event] of events.entries()) {
        const persisted = persistedCommandRef(event);
        if (persisted !== undefined) {
            const key = commandScopeKey(event, persisted.commandId);
            if (!persistedByScopeAndCommand.has(key))
                persistedByScopeAndCommand.set(key, {
                    event,
                    effect: persisted.effect,
                });
        }
        if (event.type === "WorkOrderEmitted") {
            const reference = workOrderRef(event) ??
                invalidAuditSource(event, "missing workOrder.workOrderId");
            records.push({
                ...baseRecord(event, "work-order-dispatch", "work-order.emit", "emitted"),
                workOrderRef: reference,
            });
            continue;
        }
        if (event.type === "CommandPersisted") {
            const command = persisted ??
                invalidAuditSource(event, "missing commandId or intent.effect");
            const authorityTrace = isAuthorizedDecisionTrace(events[index - 1], event, command)
                ? events[index - 1]
                : undefined;
            records.push({
                ...baseRecord(event, "authority-decision", command.effect, "allowed", authorityTrace === undefined
                    ? [event.eventId]
                    : eventIds([authorityTrace, event])),
                decision: "allowed",
                commandId: command.commandId,
                decisionEvidence: authorityTrace === undefined
                    ? "authorized-command-persisted"
                    : "authority-trace-and-command-persisted",
            });
            continue;
        }
        if (event.type === "CommandResult") {
            const commandId = commandIdFromPayload(event) ??
                invalidAuditSource(event, "missing commandId");
            const source = persistedByScopeAndCommand.get(commandScopeKey(event, commandId));
            if (source !== undefined)
                records.push({
                    ...baseRecord(event, "external-effect", source.effect, "observed", eventIds([source.event, event])),
                    effectState: "observed-result",
                    commandId,
                });
            records.push({
                ...baseRecord(event, "result", "command.result", "returned"),
                resultState: "command-returned",
                commandId,
            });
            continue;
        }
        if (event.type === "DeletionAttempted") {
            const effect = stringField(event.payload, "effect") ??
                invalidAuditSource(event, "missing requested effect");
            records.push({
                ...baseRecord(event, "external-effect", effect, "requested"),
                effectState: "requested",
            });
            continue;
        }
        if (event.type === "CommandRefused") {
            const reason = stringField(event.payload, "reason") ??
                invalidAuditSource(event, "missing refusal reason");
            const authorityEnvelopeRef = stringField(event.payload, "authorityEnvelopeId") ??
                invalidAuditSource(event, "missing refusal authority reference");
            const prior = events[index - 1];
            const linkedAttempt = event.causationId === undefined
                ? undefined
                : events
                    .slice(0, index)
                    .find((candidate) => candidate.eventId === event.causationId &&
                    candidate.type === "DeletionAttempted" &&
                    sameEpisodeAndTime(candidate, event));
            const linkedTrace = linkedAttempt === undefined
                ? undefined
                : events.find((candidate) => candidate.causationId === linkedAttempt.eventId &&
                    isRefusedDecisionTrace(candidate, event, reason));
            const trace = linkedTrace ?? events[index + 1];
            const attempt = linkedAttempt ??
                (prior !== undefined &&
                    prior.type === "DeletionAttempted" &&
                    sameEpisodeAndTime(prior, event)
                    ? prior
                    : undefined);
            const authorityTrace = isRefusedDecisionTrace(trace, event, reason)
                ? trace
                : undefined;
            const sources = [
                ...(attempt === undefined ? [] : [attempt]),
                event,
                ...(authorityTrace === undefined ? [] : [authorityTrace]),
            ];
            records.push({
                ...baseRecord(event, "authority-decision", attempt === undefined
                    ? "command.refused"
                    : (stringField(attempt.payload, "effect") ?? "unknown-effect"), "denied", eventIds(sources)),
                decision: "denied",
                reason,
                authorityEnvelopeRef,
                association: attempt === undefined
                    ? "refusal-event-only"
                    : linkedAttempt === undefined
                        ? "derived-same-episode-time-adjacency"
                        : "explicit-event-link",
            });
            continue;
        }
        if (event.type === "EpisodeTerminated") {
            records.push({
                ...baseRecord(event, "result", "episode.terminate", "terminated"),
                resultState: "episode-terminated",
            });
            continue;
        }
        if (event.type === "VerificationCompleted") {
            const requests = events
                .slice(0, index)
                .filter((candidate) => candidate.type === "VerificationRequested" &&
                candidate.workstreamId === event.workstreamId &&
                candidate.episodeId === event.episodeId);
            const explicitRequestRefs = [
                event.causationId,
                event.correlationId,
            ].filter((reference) => reference !== undefined);
            const explicitlyLinked = explicitRequestRefs
                .map((reference) => requests.find((candidate) => candidate.eventId === reference))
                .find((candidate) => candidate !== undefined);
            const request = explicitRequestRefs.length === 0
                ? requests.length === 1
                    ? requests[0]
                    : undefined
                : explicitlyLinked;
            const accepted = booleanField(event.payload, "accepted");
            const verdict = accepted === true
                ? "passed"
                : accepted === false
                    ? "failed"
                    : "unknown";
            const subjectRef = request === undefined ? undefined : commandIdFromPayload(request);
            records.push({
                ...baseRecord(event, "verification", "verification.complete", verdict, request === undefined ? [event.eventId] : eventIds([request, event])),
                verdict,
                association: explicitlyLinked !== undefined
                    ? "explicit-event-link"
                    : request !== undefined
                        ? "derived-single-request-in-scope"
                        : "completion-event-only",
                ...(subjectRef === undefined ? {} : { subjectRef }),
            });
            continue;
        }
        if (event.type === "CommandRedispatched") {
            const commandId = commandIdFromPayload(event) ??
                invalidAuditSource(event, "missing recovery commandId");
            const original = persistedByScopeAndCommand.get(commandScopeKey(event, commandId)) ??
                invalidAuditSource(event, "missing original persisted command");
            records.push({
                ...baseRecord(event, "recovery", "command.redispatch", "redispatched", eventIds([original.event, event])),
                commandId,
                originalCommandEventId: original.event.eventId,
                recoveryState: "redispatched",
            });
            continue;
        }
        if (event.type === "QueuedPulseNoOp") {
            const reason = stringField(event.payload, "reason") ??
                invalidAuditSource(event, "missing NoOp reason");
            const proposedEvidence = stringArrayField(event.payload, "evidence") ??
                invalidAuditSource(event, "missing or malformed NoOp evidence");
            const evidenceEventIds = proposedEvidence.filter((eventId) => canonicalEventIds.has(eventId));
            if (evidenceEventIds.length === 0 ||
                evidenceEventIds.length !== proposedEvidence.length)
                invalidAuditSource(event, "missing or non-canonical NoOp evidence");
            const evidenceReferences = nonEmptyReferences(evidenceEventIds, event, "missing NoOp evidence");
            records.push({
                ...baseRecord(event, "no-op", "cadence.no-op", "no-op"),
                reason,
                evidenceEventIds: evidenceReferences,
            });
            continue;
        }
        if (event.type === "SchedulesCancelled") {
            records.push({
                ...baseRecord(event, "external-effect", "schedule.cancel", "observed"),
                effectState: "observed-result",
            });
        }
    }
    return records;
}
const projectionScope = (records, events = []) => {
    const scoped = events.length === 0 ? records : events;
    if (scoped.length === 0)
        return "log:empty";
    const workstreamIds = [...new Set(scoped.map((item) => item.workstreamId))];
    const sharedEpisode = scoped[0]?.episodeId;
    if (workstreamIds.length === 1 &&
        sharedEpisode !== undefined &&
        scoped.every((item) => item.episodeId === sharedEpisode))
        return `ep:${sharedEpisode}`;
    if (workstreamIds.length === 1)
        return `ws:${workstreamIds[0]}`;
    return "log:mixed";
};
const projectionRef = (scope, projection) => `audit-projection:${scope}:${projection}`;
const evidenceLink = (eventId) => `event:${eventId}`;
const authoritySummary = (record) => {
    if (record.actionClass !== "authority-decision")
        return undefined;
    return record.decision === "allowed"
        ? { decision: "allowed" }
        : {
            decision: "denied",
            authorityEnvelopeRef: record.authorityEnvelopeRef,
            reason: record.reason,
        };
};
export function projectL0Receipt(records, scopeOverride, events = []) {
    const scope = scopeOverride ?? projectionScope(records);
    const timelineRef = projectionRef(scope, "causal-timeline");
    return {
        schemaVersion: AUDIT_PROJECTION_SCHEMA_VERSION,
        projection: "l0-receipt",
        fidelity: "L0",
        projectionRef: projectionRef(scope, "l0-receipt"),
        artifactIdentity: projectArtifactIdentities(events),
        governance: {
            audience: ["operator"],
            purpose: "everyday-confirmation",
            intendedAccess: "not-defined",
            enforcement: "deferred",
            persistenceClass: "projections",
            retentionClass: "not-defined",
        },
        omissions: [
            "event payloads and decision-trace internals",
            "correlation and causation detail",
            "class-specific timeline detail including association labels, evidence reasons, and verification subjects",
            "non-consequential context events",
            "policy, runtime fingerprints, cryptographic integrity/authenticity, redaction, and recorded-at data not collected by the fixture",
            "verifier independence not established by the recorded actor identity",
        ],
        deeperProjection: {
            projection: "causal-timeline",
            projectionRef: timelineRef,
            availability: "exists",
            intendedAccess: "not-defined",
            enforcement: "deferred",
        },
        receipts: records.map((record) => {
            const commandId = "commandId" in record && typeof record.commandId === "string"
                ? record.commandId
                : undefined;
            const reference = record.actionClass === "work-order-dispatch"
                ? record.workOrderRef
                : undefined;
            const authority = authoritySummary(record);
            return {
                recordId: record.recordId,
                action: record.action,
                actionClass: record.actionClass,
                outcome: record.outcome,
                scope: {
                    workstreamId: record.workstreamId,
                    ...(record.episodeId === undefined
                        ? {}
                        : { episodeId: record.episodeId }),
                    ...(reference === undefined ? {} : { workOrderRef: reference }),
                    ...(commandId === undefined ? {} : { commandId }),
                },
                time: record.occurredAt,
                actor: record.actorId,
                evidenceLinks: record.eventIds.map(evidenceLink),
                timelineLink: `${timelineRef}#${record.recordId}`,
                ...(authority === undefined ? {} : { authority }),
            };
        }),
    };
}
const causalOrder = (records, events) => {
    const eventOrdinals = new Map(events.map((event, index) => [event.eventId, index + 1]));
    const ordered = records.map((record, index) => ({
        record,
        appendOrdinal: Math.max(...record.eventIds.map((eventId) => eventOrdinals.get(eventId) ?? Number.MAX_SAFE_INTEGER)) || index + 1,
    }));
    const recordIdsByPrimaryEventId = new Map();
    const recordByCommandId = new Map();
    for (const item of ordered) {
        const primaryEvent = events.find((event) => item.record.recordId ===
            `audit:${event.eventId}:${item.record.actionClass}`);
        if (primaryEvent === undefined)
            throw new Error(`invalid audit record ${item.record.recordId}: primary event is absent`);
        const sourceRecords = recordIdsByPrimaryEventId.get(primaryEvent.eventId) ?? [];
        sourceRecords.push(item.record.recordId);
        recordIdsByPrimaryEventId.set(primaryEvent.eventId, sourceRecords);
        if ("commandId" in item.record &&
            typeof item.record.commandId === "string" &&
            !recordByCommandId.has(item.record.commandId))
            recordByCommandId.set(item.record.commandId, item.record.recordId);
    }
    const dependencies = new Map(ordered.map((item) => [item.record.recordId, new Set()]));
    for (const item of ordered) {
        const reference = item.record.causationId;
        if (reference !== undefined) {
            const eventDependencies = recordIdsByPrimaryEventId.get(reference);
            const resolvedDependencies = eventDependencies ??
                (recordByCommandId.has(reference)
                    ? [recordByCommandId.get(reference)]
                    : []);
            for (const dependency of resolvedDependencies)
                if (dependency !== item.record.recordId)
                    dependencies.get(item.record.recordId)?.add(dependency);
        }
    }
    const remaining = new Map(ordered.map((item) => [item.record.recordId, item]));
    const result = [];
    while (remaining.size > 0) {
        const ready = [...remaining.values()]
            .filter((item) => [...(dependencies.get(item.record.recordId) ?? [])].every((dependency) => !remaining.has(dependency)))
            .sort((left, right) => left.appendOrdinal - right.appendOrdinal ||
            (left.record.recordId < right.record.recordId
                ? -1
                : left.record.recordId > right.record.recordId
                    ? 1
                    : 0));
        const next = ready[0];
        if (next === undefined)
            throw new Error(`invalid audit causation cycle: ${[...remaining.keys()]
                .sort()
                .join(", ")}`);
        result.push(next);
        remaining.delete(next.record.recordId);
    }
    return result;
};
export function projectCausalTimeline(records, events, scopeOverride) {
    validateCanonicalEvents(events);
    const scope = scopeOverride ?? projectionScope(records, events);
    const ordered = causalOrder(records, events);
    const appendStable = [...ordered].sort((left, right) => left.appendOrdinal - right.appendOrdinal ||
        (left.record.recordId < right.record.recordId
            ? -1
            : left.record.recordId > right.record.recordId
                ? 1
                : 0));
    const grouped = new Map();
    for (const { record } of appendStable) {
        if (record.correlationId === undefined)
            continue;
        const members = grouped.get(record.correlationId) ?? [];
        members.push(record.recordId);
        grouped.set(record.correlationId, members);
    }
    const correlationGroups = [...grouped].map(([correlationId, recordIds]) => ({
        correlationId,
        recordIds: [recordIds[0], ...recordIds.slice(1)],
    }));
    return {
        schemaVersion: AUDIT_PROJECTION_SCHEMA_VERSION,
        projection: "causal-timeline",
        fidelity: "L1",
        projectionRef: projectionRef(scope, "causal-timeline"),
        governance: {
            audience: ["operator", "verifier"],
            purpose: "causal-review",
            intendedAccess: "not-defined",
            enforcement: "deferred",
            persistenceClass: "projections",
            retentionClass: "not-defined",
        },
        orderPolicy: [
            "explicit causation references order every record derived from the source event before dependents",
            "correlation references form explicit append-stable groups and never assert causation",
            "canonical append ordinal is the stable fallback and tie-break",
            "occurredAt is displayed data, never the sole ordering key",
        ],
        correlationGroups,
        omissions: [
            "raw event payload bodies",
            "context events without a consequential AuditRecord",
            "links absent from source events are not invented",
            "an unlinked deletion-attempt/refusal association uses same-episode, same-time adjacency, not canonical causation; explicit source links are labeled separately",
            "a verification request association without an explicit event link is labeled as a single-request-in-scope derivation",
            "policy, runtime, integrity, redaction, and recorded-at data not collected by the fixture",
        ],
        deeperProjection: {
            projection: "governed-raw-json",
            projectionRef: projectionRef(scope, "governed-raw-json"),
            availability: "exists",
            intendedAccess: "restricted",
            enforcement: "deferred",
        },
        entries: ordered.map(({ record, appendOrdinal }, index) => ({
            ...record,
            timelineOrdinal: index + 1,
            appendOrdinal,
            rawEventLinks: record.eventIds.map(evidenceLink),
        })),
    };
}
export function projectGovernedRaw(events, scopeOverride) {
    validateCanonicalEvents(events);
    const scope = scopeOverride ?? projectionScope([], events);
    return {
        schemaVersion: AUDIT_PROJECTION_SCHEMA_VERSION,
        projection: "governed-raw-json",
        fidelity: "L4",
        projectionRef: projectionRef(scope, "governed-raw-json"),
        artifactIdentity: projectArtifactIdentities(events),
        governance: {
            audience: ["verifier"],
            intendedAccess: "restricted",
            enforcement: "deferred",
            purpose: "bounded-audit-reconstruction",
            sourcePersistenceClass: "canonical",
            projectionPersistenceClass: "projections",
            retentionClass: "not-defined",
        },
        completeness: {
            eventFieldOmissions: [],
            unavailable: [
                "separately controlled artifacts are not present in this fixture",
                "recorded-at time, policy versions, runtime fingerprints, cryptographic integrity hashes, authenticity, and redaction state were never collected",
            ],
        },
        events: [...events],
    };
}
export function projectAuditEvents(events) {
    const records = deriveAuditRecords(events);
    const scope = projectionScope(records, events);
    return {
        receipt: projectL0Receipt(records, scope, events),
        timeline: projectCausalTimeline(records, events, scope),
        governedRaw: projectGovernedRaw(events, scope),
    };
}
export function projectAuditLog(log) {
    return projectAuditEvents(decodeLog(log));
}
export const renderAuditProjections = (events) => {
    const projections = projectAuditEvents(events);
    return [
        "L0 RECEIPT",
        JSON.stringify(projections.receipt, null, 2),
        "CAUSAL TIMELINE",
        JSON.stringify(projections.timeline, null, 2),
        "GOVERNED RAW JSON",
        JSON.stringify(projections.governedRaw, null, 2),
    ].join("\n");
};
