import { reviewWorkOrder } from "./review.js";
import { appendEvent, decodeLog, replay, } from "@dotln/kernel";
import { assertVerificationTask, canonicalStringify, } from "@dotln/compiler";
import { assertWorktreeSnapshot } from "./verification-worktree.js";
import { HEARTBEAT_MS, LEASE_MS, WorkerFailure, } from "./worker-protocol.js";
import { FEEDBACK_VERIFIER_LIMITS, invalidResultDetail, parseEvidenceResult, validateTransportRequest, } from "./verification-protocol.js";
import { initialVerificationRuntime, verificationAuthorization, verificationDraft, verificationStateFromRuntime, } from "./verification.js";
import { projectRuntimeEnvironment, seiriReactor, kernelStateFromRuntime, } from "./reactor.js";
/** Run inside WorkerStore.acquire's read-only preflight, including historical
 * commands whose completion removed them from the driver's pending state. */
export function preflightVerificationRecovery(store, workstreamId, cwd, model, effort, feedback) {
    new VerificationDriver(store, workstreamId);
    for (const event of decodeLog(store.read())) {
        if (event.type !== "CommandPersisted")
            continue;
        const command = event.payload.command;
        const capsule = command.intent.payload.capsule;
        assertVerificationTask(capsule);
        const path = cwd(command.commandId);
        const request = {
            ...(command.intent.payload
                .baseline
                ? {
                    baseline: command.intent.payload.baseline,
                }
                : {}),
            ...(command.intent.payload
                .review
                ? {
                    review: command.intent.payload.review,
                }
                : {}),
            ...(feedback ? { feedback } : {}),
            kind: "evidence-worker",
            command,
            capsule,
            workOrder: command.intent.payload.review
                ? reviewWorkOrder(capsule)
                : capsule.workOrder,
            episodeId: "recovery_preflight",
            model,
            effort,
            cwd: path,
            profile: {
                profileId: capsule.subject.snapshot?.profile ?? "verification-snapshot-v1",
                mounts: [{ path, access: "read" }],
            },
        };
        validateTransportRequest(request);
        assertWorktreeSnapshot(capsule, path);
        store.loadResult(request);
    }
}
export class VerificationDriver {
    store;
    workstreamId;
    onEvent;
    #log;
    #runtime;
    #decisions;
    constructor(store, workstreamId, onEvent) {
        this.store = store;
        this.workstreamId = workstreamId;
        this.onEvent = onEvent;
        this.#log = store.read();
        const restored = replay(initialVerificationRuntime(workstreamId), decodeLog(this.#log), seiriReactor, {}, projectRuntimeEnvironment);
        this.#runtime = restored.state;
        this.#decisions = [...restored.decisions];
    }
    get state() {
        return verificationStateFromRuntime(this.#runtime);
    }
    get decisions() {
        return this.#decisions;
    }
    get log() {
        return this.#log;
    }
    feed(draft) {
        const appended = appendEvent(this.#log, draft);
        const decision = seiriReactor(this.#runtime, appended.event, {
            now: appended.event.occurredAt,
            ...kernelStateFromRuntime(this.#runtime),
            predicates: {},
        });
        // Contract/refusal checks run before committing an invalid canonical event.
        this.store.append(appended.event);
        this.#log = appended.log;
        this.#runtime = decision.state;
        this.#decisions.push(decision);
        this.onEvent?.(appended.event, this.state);
        return appended.event;
    }
    record(type, at, payload, correlationId) {
        return this.feed(verificationDraft(this.workstreamId, type, at, payload, correlationId));
    }
    drainContinuation(at) {
        while (this.state.continuation.kind === "Emit")
            this.feed({ ...this.state.continuation.event, occurredAt: at });
    }
    persistNext(at) {
        this.drainContinuation(at);
        if (["baseline-witnessed", "reviewed"].includes(this.state.next))
            return;
        if (!this.state.pending)
            this.record("VerificationDispatchRequested", at, {});
        if (!this.state.pending.persisted) {
            const grant = verificationAuthorization(this.state, at);
            if (!grant.authorized) {
                this.feed(grant.refusal);
                throw new WorkerFailure("profile-refused");
            }
            if (canonicalStringify(grant.command) !==
                canonicalStringify(this.state.pending.command))
                throw new WorkerFailure("profile-refused");
            this.record("CommandPersisted", at, {
                command: grant.command,
                authority: grant.authority,
                trace: grant.trace,
            }, grant.command.commandId);
        }
    }
    admitResult(draft) {
        const candidate = appendEvent(this.#log, draft).event;
        if (verificationStateFromRuntime(seiriReactor(this.#runtime, candidate, {
            now: candidate.occurredAt,
            ...kernelStateFromRuntime(this.#runtime),
            predicates: {},
        }).state).lastResultEventId !== candidate.eventId)
            return null;
        return this.feed(draft);
    }
}
/** Narrow counterpart of WorkerHost for pinned verification/repair capsules. */
export class VerificationHost {
    options;
    constructor(options) {
        this.options = options;
    }
    preflight(cwd, model, effort) {
        const { driver } = this.options;
        const pending = driver.state.pending;
        if (!pending)
            throw new WorkerFailure("profile-refused");
        const request = {
            ...(pending.baseline ? { baseline: pending.baseline } : {}),
            ...(pending.review ? { review: pending.review } : {}),
            ...(this.options.feedback ? { feedback: this.options.feedback } : {}),
            kind: "evidence-worker",
            command: pending.command,
            capsule: pending.capsule,
            workOrder: pending.review
                ? reviewWorkOrder(pending.capsule)
                : pending.capsule.workOrder,
            episodeId: `${pending.command.episodeId}_attempt_${pending.attempts.length + 1}`,
            cwd,
            model,
            effort,
            profile: {
                profileId: pending.capsule.subject.snapshot?.profile ??
                    "verification-snapshot-v1",
                mounts: [{ path: cwd, access: "read" }],
            },
        };
        validateTransportRequest(request);
        assertWorktreeSnapshot(request.capsule, cwd);
        return { request, cached: driver.store.loadResult(request) };
    }
    expire() {
        const { driver, now } = this.options;
        const pending = driver.state.pending;
        if (pending?.activeEpisode &&
            !pending.leaseExpired &&
            now() >= pending.leaseExpiresAt)
            driver.record("WorkerLeaseExpired", now(), {
                commandId: pending.command.commandId,
                workerEpisodeId: pending.activeEpisode,
                leaseExpiresAt: pending.leaseExpiresAt,
            }, pending.command.commandId);
    }
    async run(cwd, model, effort) {
        const { driver, transport, now } = this.options;
        const pending = driver.state.pending;
        if (!pending &&
            ["baseline-witnessed", "reviewed"].includes(driver.state.next)) {
            const events = decodeLog(driver.log);
            const accepted = events.find((event) => event.eventId === driver.state.lastResultEventId);
            const payload = accepted?.payload;
            const command = events.find((event) => event.type === "CommandPersisted" &&
                event.payload.command
                    .commandId === payload?.commandId);
            const persisted = command?.payload
                ?.command;
            const input = persisted?.intent.payload;
            if (!input || (!input.review && input.baseline?.kind !== "baseline"))
                throw new WorkerFailure("profile-refused");
            assertWorktreeSnapshot(input.capsule, cwd);
            const result = parseEvidenceResult(payload.value, {
                command: persisted,
                capsule: input.capsule,
                ...(input.baseline ? { baseline: input.baseline } : {}),
                ...(input.review ? { review: input.review } : {}),
                workOrder: input.capsule.workOrder,
                episodeId: payload.value.envelope.episodeId,
            });
            driver.drainContinuation(now());
            return result.envelope;
        }
        if (!pending?.persisted ||
            !verificationAuthorization(driver.state, now()).authorized)
            throw new WorkerFailure("profile-refused");
        const { request, cached } = this.preflight(cwd, model, effort);
        const episodeId = request.episodeId;
        this.expire();
        if (!cached &&
            driver.state.pending.activeEpisode &&
            !driver.state.pending.leaseExpired)
            throw new WorkerFailure("profile-refused", "prior episode still leased");
        driver.record("WorkerAttemptStarted", now(), {
            commandId: pending.command.commandId,
            workerEpisodeId: episodeId,
            role: pending.capsule.role,
            ...(pending.review
                ? { episodeKind: "review" }
                : pending.baseline?.kind === "baseline"
                    ? { episodeKind: "baseline" }
                    : {}),
            mode: cached ? "cached-result-query" : "fresh-transport",
            inputHash: pending.capsule.inputHash,
            model,
            effort,
            transport: transport.name,
            harnessVersion: transport.harnessVersion,
            selectionSource: "host-launch",
            effectiveModel: "unknown",
            effectiveEffort: "unknown",
            ...(request.feedback
                ? {
                    feedbackPolicyHash: request.feedback.policyHash,
                    limits: FEEDBACK_VERIFIER_LIMITS,
                }
                : {}),
            heartbeatMs: HEARTBEAT_MS,
            leaseMs: LEASE_MS,
            leaseExpiresAt: now() + LEASE_MS,
            profileId: request.profile.profileId,
        }, pending.command.commandId);
        let result;
        // WO-159: a Codex episode ends with its isolation record.
        let codexIsolation;
        if (cached) {
            result = cached;
            driver.record("WorkerResultRecovered", now(), {
                commandId: pending.command.commandId,
                workerEpisodeId: episodeId,
                producingEpisodeId: result.envelope.episodeId,
            }, pending.command.commandId);
        }
        else {
            let timer;
            let dispatch;
            let heartbeatError;
            try {
                dispatch = transport.dispatch(request, now);
                const receipt = await dispatch.receipt;
                if (receipt.commandId !== pending.command.commandId)
                    throw new WorkerFailure("invalid-result", "receipt-command");
                driver.record("CommandReceipt", now(), { ...receipt, workerEpisodeId: episodeId }, pending.command.commandId);
                timer = setInterval(() => {
                    try {
                        this.expire();
                        if (driver.state.pending.leaseExpired) {
                            dispatch.kill();
                            return;
                        }
                        if (dispatch.alive())
                            driver.record("WorkerHeartbeat", now(), {
                                commandId: pending.command.commandId,
                                workerEpisodeId: episodeId,
                                evidence: "host-observed-child-process",
                                leaseExpiresAt: now() + LEASE_MS,
                            }, pending.command.commandId);
                    }
                    catch (error) {
                        heartbeatError = error;
                        dispatch.kill();
                    }
                }, HEARTBEAT_MS);
                this.options.onRunning?.(dispatch);
                const completed = await dispatch.completed;
                codexIsolation = await dispatch.isolation;
                result = parseEvidenceResult(completed, request);
                assertWorktreeSnapshot(request.capsule, cwd);
                if (heartbeatError)
                    throw heartbeatError;
            }
            catch (error) {
                dispatch?.kill();
                codexIsolation ??= await dispatch?.isolation?.catch(() => undefined);
                const code = error instanceof WorkerFailure ? error.code : "transport-failed";
                // Only an invalid-result refusal carries a detail, and only from the
                // closed vocabulary; other codes' details may hold diagnostics.
                const detail = code === "invalid-result"
                    ? invalidResultDetail(error instanceof WorkerFailure ? error.detail : undefined)
                    : undefined;
                driver.record("WorkerInterrupted", now(), {
                    commandId: pending.command.commandId,
                    workerEpisodeId: episodeId,
                    reason: code,
                    ...(detail ? { detail } : {}),
                    ...(codexIsolation ? { codexIsolation } : {}),
                }, pending.command.commandId);
                throw new WorkerFailure(code, detail);
            }
            finally {
                if (timer)
                    clearInterval(timer);
            }
            if (result.envelope.status === "completed") {
                driver.store.saveResult(request, result);
                this.options.afterResultSaved?.();
            }
        }
        assertWorktreeSnapshot(request.capsule, cwd);
        if (result.envelope.status !== "completed") {
            driver.record("WorkerInterrupted", now(), {
                commandId: pending.command.commandId,
                workerEpisodeId: episodeId,
                reason: "worker-incomplete",
                result,
                ...(codexIsolation ? { codexIsolation } : {}),
            }, pending.command.commandId);
            return result.envelope;
        }
        this.expire();
        const at = now();
        const payload = {
            commandId: pending.command.commandId,
            workerEpisodeId: episodeId,
            verificationResultVersion: 1,
            result: "completed",
            value: result,
        };
        const observation = driver.record("VerificationWorkerResultObserved", at, payload, pending.command.commandId);
        const accepted = driver.admitResult({
            ...verificationDraft(driver.workstreamId, "CommandResult", at, payload, pending.command.commandId),
            causationId: observation.eventId,
        });
        if (!accepted) {
            driver.record("WorkerResultQuarantined", at, {
                commandId: pending.command.commandId,
                workerEpisodeId: episodeId,
                resultEventId: observation.eventId,
                ...(codexIsolation ? { codexIsolation } : {}),
            }, pending.command.commandId);
            throw new WorkerFailure("profile-refused");
        }
        driver.record("WorkerCompleted", at, {
            commandId: pending.command.commandId,
            workerEpisodeId: episodeId,
            envelope: result.envelope,
            resultEventId: accepted.eventId,
            ...(codexIsolation ? { codexIsolation } : {}),
        }, pending.command.commandId);
        driver.drainContinuation(at);
        return result.envelope;
    }
}
