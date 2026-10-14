import { LiveReactorDriver, scenarioDraft as draft, } from "./live-reactor-driver.js";
export { LiveReactorDriver } from "./live-reactor-driver.js";
import { renderBeaconGlyphs } from "./control-beacon.js";
import { seiriEnvironment } from "@dotln/compiler";
import { isArtifactRefusalType } from "./artifact-identity.js";
import { decodeLog, pendingCommands, replay, replayOutbox, } from "@dotln/kernel";
import { EPISODE, WORKSTREAM, commandFromState, initialState, loadout, seiriPredicates, projectRuntimeEnvironment, seiriReactor, workOrderFromState, walkingStateFromRuntime, } from "./reactor.js";
export { MINUTE, compileLoadoutProgram, compileWorkOrder, expectedInspectCommandId, loadout, } from "./reactor.js";
export class FakeExecutor {
    fixture;
    emitClaim;
    #seen = new Map();
    dispatches = [];
    effects = 0;
    constructor(fixture, emitClaim) {
        this.fixture = fixture;
        this.emitClaim = emitClaim;
    }
    dispatch(command, claimedAt = 0) {
        this.dispatches.push(command.commandId);
        const prior = this.#seen.get(command.commandId);
        if (prior)
            return prior;
        this.emitClaim?.({
            recordType: "beacon-claim",
            codebookVersion: 1,
            provenance: "self-reported",
            actor: "fake-executor",
            scope: { workstreamId: WORKSTREAM, episodeId: EPISODE },
            claimedAt,
            actionClass: "verification",
            outcome: "passed",
            refusalCount: 0,
        });
        this.effects += 1;
        const candidates = this.fixture.files
            .filter((file) => file.referencedBy.length === 0 &&
            file.classification === "generated-stale")
            .map((file) => ({
            path: file.path,
            classification: file.classification,
            evidence: [
                `inventory:${file.path}`,
                `classification:${file.classification}`,
                "references:none",
            ],
        }));
        this.#seen.set(command.commandId, candidates);
        return candidates;
    }
}
class FakeVerifier {
    fixture;
    constructor(fixture) {
        this.fixture = fixture;
    }
    dispatch(intent, candidates) {
        if (intent.subject !== "candidates")
            throw new Error(`fake verifier cannot observe ${intent.subject}`);
        return (candidates.length > 0 &&
            candidates.every((candidate) => {
                const source = this.fixture.files.find((file) => file.path === candidate.path);
                return (source?.referencedBy.length === 0 &&
                    candidate.evidence.length >= 3 &&
                    candidate.evidence.some((value) => value === "references:none"));
            }));
    }
}
class FakeScheduler {
    #active = new Set();
    schedule(...ids) {
        for (const id of ids)
            this.#active.add(id);
    }
    cancel(ids) {
        for (const id of ids)
            this.#active.delete(id);
    }
    get activeScheduleIds() {
        return [...this.#active];
    }
}
const continuationEvent = (decision, purpose) => {
    if (decision.continuation?.kind !== "Emit")
        throw new Error(`${purpose} did not emit an event`);
    return decision.continuation.event;
};
const scheduledEvent = (decision, scheduleId) => {
    const schedule = decision.schedules.find((candidate) => candidate.scheduleId === scheduleId);
    if (schedule === undefined)
        throw new Error(`reactor did not declare schedule ${scheduleId}`);
    return schedule.eventToEmit;
};
const actIntent = (decision, effect) => {
    const intent = decision.intents.find((candidate) => candidate.kind === "Act" && candidate.effect === effect);
    if (intent === undefined)
        throw new Error(`reactor did not request ${effect}`);
    return intent;
};
const observeIntent = (decision, subject) => {
    const intent = decision.intents.find((candidate) => candidate.kind === "Observe" && candidate.subject === subject);
    if (intent === undefined)
        throw new Error(`reactor did not request observation of ${subject}`);
    return intent;
};
const noOpIntent = (decision) => {
    const intent = decision.intents.find((candidate) => candidate.kind === "NoOp");
    if (intent === undefined)
        throw new Error("reactor did not declare a NoOp");
    return intent;
};
const project = (events) => events.map((event, index) => `${String(index + 1).padStart(2, "0")} ${event.type} — ${event.eventId}`);
export function renderGlyphScene(runtime) {
    const state = walkingStateFromRuntime(runtime);
    const returned = state.presence === "returned";
    return [
        "🐛 Repo Gardener",
        returned ? "◌ dormant" : "🌙 active",
        state.pulseSeen ? "⏱️ pulsing" : "○ waiting",
        state.inspectionCompleted ? "🔎 inspecting" : "○ unknown",
        state.deletionRefused ? "🛡️ inverted/refused" : "○ unguarded",
        state.verificationCompleted && state.verified
            ? "✅ verified"
            : "○ unverified",
        returned ? "☀️ phase:returned" : "○ away",
        state.queuedPulseNoOp ? "💤 faded/cancelled" : "○ scheduled",
        ...(state.beaconObservations.length
            ? [renderBeaconGlyphs(state.beaconObservations)]
            : []),
    ].join("  ");
}
export const projectScenario = (log, runtime, decisions) => {
    const state = walkingStateFromRuntime(runtime);
    const events = decodeLog(log);
    return {
        log,
        decisions,
        timeline: project(events),
        glyphScene: renderGlyphScene(runtime),
        workOrder: state.workOrder === null ? null : workOrderFromState(state),
        candidates: state.candidates,
        verified: state.verified,
        cancelledScheduleIds: state.cancelledScheduleIds,
        activeScheduleIds: state.activeScheduleIds,
    };
};
export function replayScenario(log) {
    const replayed = replay(initialState(), decodeLog(log), seiriReactor, seiriPredicates, projectRuntimeEnvironment);
    return projectScenario(log, replayed.state, replayed.decisions);
}
export function startScenario(driver, equipped = loadout, environment = seiriEnvironment(), startAt = 0) {
    driver.feed(draft("InspectionTaskCreated", startAt, {
        bounded: true,
        fixture: "repo-tree.json",
    }));
    driver.equip(equipped, environment, startAt);
    const away = driver.feed(draft("OperatorPresenceChanged", startAt, { presence: "away" }));
    const primaryScheduleId = away.decision.schedules[0]?.scheduleId;
    const queuedScheduleId = away.decision.schedules[1]?.scheduleId;
    if (primaryScheduleId === undefined || queuedScheduleId === undefined)
        throw new Error("reactor did not emit the compiled Seiri schedules");
    const pulse = driver.feed(scheduledEvent(away.decision, primaryScheduleId));
    const emittedWorkOrder = driver.feed(continuationEvent(pulse.decision, "cadence pulse"));
    const granted = emittedWorkOrder.decision;
    const command = commandFromState(granted.state);
    const persisted = driver.feed(draft("CommandPersisted", pulse.event.occurredAt + 1, { command: command }, pulse.event.eventId, emittedWorkOrder.event.eventId));
    return { away, pulse, persisted, command, queuedScheduleId };
}
export function restoreScenarioOpening(driver) {
    const events = decodeLog(driver.log);
    const step = (type) => {
        const index = events.findIndex((event) => event.type === type);
        if (index < 0)
            throw new Error(`incomplete scenario opening: ${type}`);
        return { event: events[index], decision: driver.decisions[index] };
    };
    const away = step("OperatorPresenceChanged");
    const queuedScheduleId = away.decision.schedules[1]?.scheduleId;
    if (!queuedScheduleId)
        throw new Error("missing queued scenario schedule");
    return {
        away,
        pulse: step("CadencePulse"),
        persisted: step("CommandPersisted"),
        command: commandFromState(step("CommandPersisted").decision.state),
        queuedScheduleId,
    };
}
export function runScenario(fixture, options = {}) {
    const driver = new LiveReactorDriver(options.onEvents);
    const executor = new FakeExecutor(fixture, options.onExecutorClaim);
    const opening = startScenario(driver, options.equippedLoadout ?? loadout);
    const { command, pulse, persisted } = opening;
    let recoveredCommands = [];
    let resultCause = persisted.event;
    if (options.crashAfterPersist) {
        driver.restore(options.recoveryLogTransform?.(driver.log) ?? driver.log);
        recoveredCommands = pendingCommands(replayOutbox(decodeLog(driver.log)));
        if (recoveredCommands.length === 0)
            return {
                ...projectScenario(driver.log, driver.state, driver.decisions),
                adapterEffects: executor.effects,
                adapterDispatches: executor.dispatches,
                recoveredCommands,
            };
        for (const pending of recoveredCommands) {
            const persistedSource = decodeLog(driver.log).find((source) => {
                const payload = source.payload;
                return (source.type === "CommandPersisted" &&
                    payload?.command?.commandId === pending.commandId);
            });
            if (persistedSource === undefined)
                throw new Error("pending command lacks its canonical persist event");
            const recovery = driver.feed(draft("CommandRedispatchRequested", persisted.event.occurredAt, { commandId: pending.commandId }, pending.commandId, persistedSource.eventId));
            if (recovery.decision.continuation?.kind === "Emit" &&
                isArtifactRefusalType(recovery.decision.continuation.event.type))
                return {
                    ...projectScenario(driver.log, driver.state, driver.decisions),
                    adapterEffects: executor.effects,
                    adapterDispatches: executor.dispatches,
                    recoveredCommands,
                };
            executor.dispatch(pending, persisted.event.occurredAt);
            const redispatched = driver.feed(draft("CommandRedispatched", pulse.event.occurredAt + 1, { commandId: pending.commandId }, pending.commandId, recovery.event.eventId));
            resultCause = redispatched.event;
        }
    }
    const candidates = executor.dispatch(command, persisted.event.occurredAt);
    const commandResult = driver.feed(draft("CommandResult", pulse.event.occurredAt + 2, {
        commandId: command.commandId,
        result: "candidates",
        candidates: candidates,
    }, command.commandId, resultCause.eventId));
    return {
        ...finishScenario(driver, fixture, opening, commandResult, undefined, options.verifier),
        adapterEffects: executor.effects,
        adapterDispatches: executor.dispatches,
        recoveredCommands,
    };
}
/** The same fake verifier, refusal and scheduler finish both demo transports. */
export function finishScenario(driver, fixture, opening, commandResult, now, verifier = new FakeVerifier(fixture)) {
    const { away, pulse, command, queuedScheduleId } = opening;
    const candidates = walkingStateFromRuntime(commandResult.decision.state).candidates;
    const scheduler = new FakeScheduler();
    scheduler.schedule(...away.decision.schedules.map((schedule) => schedule.scheduleId));
    const at = (offset) => now?.() ?? pulse.event.occurredAt + offset;
    // A restarted host may have persisted part of this suffix. Reuse its exact
    // event and Decision, including original causes, rather than replaying effects.
    const feedOnce = (event) => {
        const events = decodeLog(driver.log);
        const index = events.findIndex((source) => source.type === event.type && source.causationId === event.causationId);
        return index < 0
            ? driver.feed(event)
            : { event: events[index], decision: driver.decisions[index] };
    };
    const deletion = actIntent(commandResult.decision, "repo.delete");
    const deletionAttempted = feedOnce(draft("DeletionAttempted", at(3), {
        effect: deletion.effect,
        paths: deletion.payload.paths,
    }, command.commandId, commandResult.event.eventId));
    const refused = feedOnce(continuationEvent(deletionAttempted.decision, "deletion guard"));
    const terminated = feedOnce(continuationEvent(refused.decision, "structural refusal"));
    const verificationRequested = feedOnce(continuationEvent(terminated.decision, "episode continuation"));
    const accepted = verifier.dispatch(observeIntent(verificationRequested.decision, "candidates"), candidates, driver, at(5));
    feedOnce(draft("VerificationCompleted", at(5), { accepted, candidateCount: candidates.length }, command.commandId, verificationRequested.event.eventId));
    // The initial away event shares this type and has no cause; match the return
    // payload separately to preserve the historical default event bytes.
    if (walkingStateFromRuntime(driver.state).presence !== "returned")
        driver.feed(draft("OperatorPresenceChanged", at(6), {
            presence: "returned",
        }));
    const queuedDraft = scheduledEvent(away.decision, queuedScheduleId);
    const priorQueued = decodeLog(driver.log).findIndex((event) => event.type === "CadencePulse" &&
        event.payload.scheduleId ===
            queuedScheduleId);
    const queued = priorQueued < 0
        ? driver.feed(queuedDraft)
        : {
            event: decodeLog(driver.log)[priorQueued],
            decision: driver.decisions[priorQueued],
        };
    const noOp = noOpIntent(queued.decision);
    feedOnce(draft("QueuedPulseNoOp", queued.event.occurredAt, { reason: noOp.reason, evidence: noOp.evidence }, queued.event.eventId, queued.event.eventId));
    scheduler.cancel(walkingStateFromRuntime(queued.decision.state).cancelledScheduleIds);
    feedOnce(draft("SchedulesCancelled", queued.event.occurredAt, {
        scheduleIds: walkingStateFromRuntime(queued.decision.state)
            .cancelledScheduleIds,
        activeScheduleIds: scheduler.activeScheduleIds,
    }, queued.event.eventId, queued.event.eventId));
    return projectScenario(driver.log, driver.state, driver.decisions);
}
