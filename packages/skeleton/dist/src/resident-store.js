import { closeSync, constants, fstatSync, readdirSync, fsyncSync, openSync, writeFileSync, existsSync, lstatSync, statSync, readFileSync, renameSync, unlinkSync, } from "node:fs";
import { randomUUID } from "node:crypto";
import { isAbsolute, join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { decodeLog, replay, } from "@dotln/kernel";
import { initialState, projectRuntimeEnvironment, seiriReactor, } from "./reactor.js";
import { WorkerStore } from "./worker-store.js";
import { WORK_ORDER_SOURCE_REASONS, } from "./runtime-status-contract.js";
import { projectRuntimeStatus } from "./runtime-status.js";
import { classifyPresenceSignal, decodePresenceObservation, } from "./presence-signals.js";
export function replayResident(log, predicates = {}) {
    return replay(initialState(), decodeLog(log), seiriReactor, predicates, projectRuntimeEnvironment);
}
export class ResidentTransaction {
    store;
    predicates;
    publish;
    events;
    state;
    published = false;
    constructor(store, predicates, publish) {
        this.store = store;
        this.predicates = predicates;
        this.publish = publish;
        const log = store.read();
        this.events = [...decodeLog(log)];
        if (this.events.some((event) => event.workstreamId !== "resident"))
            throw new Error("resident requires a dedicated launchpad store");
        this.state = replayResident(log, predicates).state;
    }
    get resident() {
        return this.state.resident;
    }
    append(type, payload, occurredAt = this.resident?.at ?? 0, actorId) {
        const event = {
            schemaVersion: 1,
            eventId: `evt_${this.events.length + 1}`,
            type,
            occurredAt,
            actorId: actorId ??
                (["OperatorPresenceChanged", "HandoffAnswered"].includes(type)
                    ? "operator"
                    : "resident-host"),
            workstreamId: "resident",
            payload: payload,
        };
        // Validate the complete new fold before making the event durable.
        const decision = seiriReactor(this.state, event, {
            ...projectRuntimeEnvironment(this.state),
            now: event.occurredAt,
            predicates: this.predicates,
        });
        const fd = openSync(this.store.logPath, "a", 0o600);
        try {
            writeFileSync(fd, JSON.stringify(event) + "\n");
            fsyncSync(fd);
        }
        finally {
            closeSync(fd);
        }
        this.events.push(event);
        this.state = decision.state;
        this.publish(this);
        this.published = true;
    }
    sample(at) {
        this.append("ClockSampled", { at }, at);
    }
}
/** Lifetime ownership and short append ownership reuse the inspected worker lock.
 * Presence only takes the latter, so it remains usable during a running episode. */
export class ResidentStore {
    predicates;
    cardSource;
    indexError;
    store;
    appendStore;
    observedBytes = 0;
    /** The newest reading the owner's card source has given. */
    newest;
    constructor(directory, predicates = {}, 
    /** The work-order cards, as the index command prints them with `--json`,
     * which the script-side launcher hands the resident: this package reads
     * no page and no Markdown. A helper over the same store has none and
     * reads the copy the owner keeps beside its binding. */
    cardSource, indexError) {
        this.predicates = predicates;
        this.cardSource = cardSource;
        this.indexError = indexError;
        this.store = new WorkerStore(directory);
        this.appendStore = new WorkerStore(join(directory, ".resident-append"));
    }
    get sourcePath() {
        return join(this.store.directory, ".runtime-status-source.json");
    }
    /** The owner's copy of the cards its launcher last gave it, inside the
     * store: what a helper reads through the binding. */
    get cardsPath() {
        return join(this.store.directory, ".runtime-status-cards.json");
    }
    readRegular(path) {
        // O_NONBLOCK closes the stat/open FIFO race; inspect the opened object.
        const fd = openSync(path, constants.O_RDONLY | constants.O_NONBLOCK);
        try {
            if (!fstatSync(fd).isFile())
                throw new Error("not-regular");
            return readFileSync(fd, "utf8");
        }
        finally {
            closeSync(fd);
        }
    }
    /** The cards, read and nothing written, so a transaction can read them
     * before it takes its lock: what the owner's launcher source gives, or a
     * helper's copy through the owner's binding. */
    readIndex() {
        if (this.cardSource) {
            try {
                return { text: this.cardSource(), fromSource: true };
            }
            catch {
                return { text: null, reason: "index-unreadable", fromSource: true };
            }
        }
        let source;
        try {
            source = JSON.parse(this.readRegular(this.sourcePath));
            if (source?.version !== 1)
                throw new Error("invalid binding");
            if (WORK_ORDER_SOURCE_REASONS.includes(source.reason))
                return { text: null, reason: source.reason };
            if (typeof source.indexPath !== "string" || !isAbsolute(source.indexPath))
                throw new Error("invalid binding");
        }
        catch {
            return { text: null, reason: "binding-unavailable" };
        }
        try {
            return { text: this.readRegular(source.indexPath) };
        }
        catch (error) {
            return {
                text: null,
                reason: error instanceof Error && error.message === "not-regular"
                    ? "index-not-regular"
                    : "index-unreadable",
            };
        }
    }
    sweepStatusTemporaries() {
        try {
            for (const entry of readdirSync(this.store.directory)) {
                if (!/^\.runtime-status-.+\.tmp$/u.test(entry))
                    continue;
                try {
                    unlinkSync(join(this.store.directory, entry));
                }
                catch {
                    /* best effort */
                }
            }
        }
        catch {
            /* A disposable projection cannot stop resident work. */
        }
    }
    /** Only the lifetime owner selects the source. Helpers, including installed
     * harness snapshots, read this private binding instead of their own checkout.
     * It holds the cards' availability with their place: the reason the owner
     * has none, at launch or at its last read, or where its copy is. */
    bindIndex(reason = this.indexError) {
        if (this.cardSource === undefined && this.indexError === undefined)
            return;
        const bytes = JSON.stringify(reason
            ? { version: 1, reason }
            : { version: 1, indexPath: resolve(this.cardsPath) }) + "\n";
        try {
            try {
                if (this.readRegular(this.sourcePath) === bytes)
                    return;
            }
            catch {
                /* replace bad binding */
            }
            this.replaceProjection(this.sourcePath, bytes);
        }
        catch {
            // Projection configuration cannot abort authoritative resident work.
        }
    }
    /** Inside the lock, what the owner's source gave is kept where a helper
     * reads it: a copy of the cards beside the binding, and the binding. */
    keepCards(index) {
        if (!index.fromSource)
            return;
        if (index.text === null) {
            // The binding carries the failure: a helper over this store reads
            // the cards through it, and would otherwise publish the copy kept
            // from the last good read as available.
            this.bindIndex("index-unreadable");
            return;
        }
        let copied = false;
        try {
            let held = null;
            try {
                held = this.readRegular(this.cardsPath);
            }
            catch {
                /* no copy yet */
            }
            if (held !== index.text)
                this.replaceProjection(this.cardsPath, index.text);
            copied = true;
        }
        catch {
            // A helper's copy is a convenience; the owner's own reading stands.
        }
        // The copy first, then the binding that names it: a helper never
        // follows the binding to cards older than the failure it replaced.
        // A copy that could not be written is bound as that failure, since
        // the file the binding would name holds an earlier read or nothing.
        this.bindIndex(copied ? undefined : "index-unreadable");
    }
    /** Readers see the old complete file or the new complete file. The log is
     * authoritative; an interrupted projection write is rebuilt next
     * transaction. `index` is the cards' reading the transaction took before
     * its lock. */
    publish(tx, index) {
        try {
            this.keepCards(index);
            const view = projectRuntimeStatus(tx.resident, tx.events, index.text, this.predicates);
            if (view.workOrders.status === "unavailable")
                view.workOrders.reason = index.reason ?? "index-invalid";
            this.replaceProjection(join(this.store.directory, "runtime-status-v1.json"), JSON.stringify(view, null, 2) + "\n");
        }
        catch {
            // The durable append already succeeded. A later event or tick rebuilds
            // the disposable file; a UI failure must never prevent actor dispatch.
        }
    }
    replaceProjection(target, bytes) {
        const temporary = join(this.store.directory, `.runtime-status-${randomUUID()}.tmp`);
        const fd = openSync(temporary, "wx", 0o600);
        try {
            try {
                writeFileSync(fd, bytes);
            }
            finally {
                closeSync(fd);
            }
            renameSync(temporary, target);
        }
        finally {
            if (existsSync(temporary))
                unlinkSync(temporary);
        }
    }
    /** `observe: false` leaves the host's change baseline alone, so another
     * in-process writer (the console's receipts) cannot hide a concurrent
     * append such as a served presence change from a running tick.
     *
     * An owner whose launcher hands it a card source reads the work-order cards
     * before the append lock is taken: that source runs the index command
     * whenever a file the cards derive from has changed, for seconds, and a
     * helper waiting for the lock (a presence command, a hook's heartbeat)
     * gives up after two. Nothing the transaction appends changes the cards,
     * and every status it publishes holds the newest reading this owner has
     * taken, so a slower transaction never writes an older one back. A helper
     * reads the owner's copy through the binding inside the lock, as before:
     * a cheap read, and the order that keeps it from cards older than a
     * failure the owner has bound. */
    async transaction(operation, { observe = true } = {}) {
        if (existsSync(this.store.directory) &&
            lstatSync(this.store.directory).isSymbolicLink())
            throw new Error("resident store may not be a symlink");
        // The source is read synchronously, so the reading taken here is later
        // than any this owner took before it: it is the newest.
        if (this.cardSource)
            this.newest = this.readIndex();
        const publishWith = (tx) => this.publish(tx, this.cardSource ? this.newest : this.readIndex());
        let inspected;
        for (let attempt = 0;; attempt++) {
            try {
                this.appendStore.acquire(() => {
                    // The append lock protects the resident log, not just its auxiliary
                    // store. Validate that actual state before reclaiming either owner.
                    inspected = new ResidentTransaction(this.store, this.predicates, publishWith);
                });
                break;
            }
            catch (error) {
                if (attempt >= 200 ||
                    !(error instanceof Error) ||
                    !/already has a live host|recovery is busy/u.test(error.message))
                    throw error;
                await delay(10);
            }
        }
        try {
            const result = operation(inspected, publishWith);
            if (!inspected.published)
                publishWith(inspected);
            if (observe)
                this.observedBytes = existsSync(this.store.logPath)
                    ? statSync(this.store.logPath).size
                    : 0;
            return result;
        }
        finally {
            this.appendStore.release();
        }
    }
    async acquire() {
        await this.transaction((_tx, publishWith) => {
            this.store.acquire(() => {
                // Positive replay inspection occurs before dead-owner reclaim.
                new ResidentTransaction(this.store, this.predicates, publishWith);
            });
            this.sweepStatusTemporaries();
            this.bindIndex();
        });
    }
    release() {
        this.store.release();
    }
    read() {
        return this.store.read();
    }
    changed() {
        return ((existsSync(this.store.logPath)
            ? statSync(this.store.logPath).size
            : 0) !== this.observedBytes);
    }
}
export async function recordPresence(directory, presence, now = Date.now) {
    if (!["away", "returned"].includes(presence))
        throw new Error("invalid resident presence");
    await recordPresenceObservation(directory, { kind: presence === "away" ? "away" : "back" }, undefined, now);
}
export async function answerHandoff(directory, input, now = Date.now) {
    if (process.env["DOTLN_RESIDENT_EPISODE_ID"])
        throw new Error("resident actors cannot answer a human handoff");
    const store = new ResidentStore(directory);
    await store.transaction((tx) => {
        tx.append("HandoffAnswered", { ...input, origin: "human" }, Math.max(now(), tx.resident?.at ?? 0));
    });
}
/** A human answer or a fresh passing judgment over a repair. A resident actor
 * cannot clear the hold its own drift raised. */
export async function clearMissionHold(directory, input, now = Date.now) {
    if (process.env["DOTLN_RESIDENT_EPISODE_ID"])
        throw new Error("resident actors cannot clear a mission hold");
    const store = new ResidentStore(directory);
    await store.transaction((tx) => {
        tx.append("MissionHoldCleared", input, Math.max(now(), tx.resident?.at ?? 0), input.origin === "human" ? "operator" : "resident-host");
    });
}
export async function recordPresenceObservation(directory, signal, stamp, now = Date.now) {
    const observation = decodePresenceObservation({
        signal,
        origin: classifyPresenceSignal(signal, stamp),
        at: now(),
        ...(stamp ? { stamp } : {}),
    });
    const store = new ResidentStore(directory);
    await store.transaction((tx) => {
        const sampledAt = observation.at;
        // Live commands retain their explicit intent when the wall clock moves back.
        observation.at = Math.max(sampledAt, tx.resident?.at ?? 0);
        // Observe human return before evaluating a deadline at the same time.
        tx.append("OperatorPresenceObserved", observation, observation.at);
        tx.sample(sampledAt);
    });
}
