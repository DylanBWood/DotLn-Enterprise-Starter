import { observedExecFileSync as execFileSync } from "./gate-deadlines.mjs";
import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync, } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalStringify, seiriEnvironment } from "@dotln/compiler";
import { decodeLog } from "@dotln/kernel";
import { expectedInspectCommandId, walkingStateFromRuntime, loadout, MINUTE, WORKSTREAM, EPISODE, } from "./reactor.js";
import { LiveReactorDriver, finishScenario, projectScenario, replayScenario, restoreScenarioOpening, startScenario, } from "./scenario.js";
import { WorkerHost } from "./worker-host.js";
import { WorkerStore } from "./worker-store.js";
import { WorkerWorktrees } from "./worker-worktree.js";
import { createBeaconWriter } from "./beacon-fs.js";
const git = (cwd, ...args) => execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 15_000,
}).trim();
/** A clean, synthetic repository keeps the example independent of operator files. */
export function createWorkerFixture(repository, fixture) {
    mkdirSync(repository, { recursive: false, mode: 0o700 });
    git(repository, "init", "--quiet");
    if (realpathSync(git(repository, "rev-parse", "--show-toplevel")) !==
        realpathSync(repository))
        throw new Error("fixture Git root differs from cwd");
    writeFileSync(join(repository, "inventory.json"), JSON.stringify(fixture) + "\n");
    git(repository, "add", "--", "inventory.json");
    git(repository, "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "commit", "--quiet", "-m", "Bounded inspection fixture");
    return git(repository, "rev-parse", "HEAD");
}
export async function runWorkerDemo(options) {
    const now = options.now ?? Date.now;
    const store = new WorkerStore(options.directory);
    store.acquire(() => {
        const recovered = new LiveReactorDriver();
        const events = decodeLog(store.read());
        const configured = events.find((event) => event.type === "WorkerHostConfigured");
        if (configured &&
            canonicalStringify(configured.payload) !==
                canonicalStringify({
                    model: options.model,
                    effort: options.effort,
                    transport: options.transport.name,
                }))
            throw new Error("persisted worker selection differs; no silent model substitution");
        recovered.restore(store.read());
        // Reconstruct the original inspection request at each persist boundary;
        // later completed state need not retain a pending command.
        for (let index = 0; index < events.length; index++) {
            if (events[index].type !== "CommandPersisted")
                continue;
            recovered.restore(events
                .slice(0, index + 1)
                .map((event) => JSON.stringify(event) + "\n")
                .join(""));
            new WorkerHost({
                store,
                driver: recovered,
                transport: options.transport,
                now,
            }).preflight(join(store.directory, "worktrees", expectedInspectCommandId), options.fixture, options.model, options.effort);
        }
    });
    let driver;
    try {
        const writer = options.beacons
            ? createBeaconWriter(join(store.directory, "beacons"), fileURLToPath(new URL("../../../../", import.meta.url)))
            : undefined;
        driver = new LiveReactorDriver(writer?.project, store.append);
        driver.restore(store.read());
        const events = decodeLog(driver.log);
        const selection = {
            model: options.model,
            effort: options.effort,
            transport: options.transport.name,
        };
        const configured = events.find((event) => event.type === "WorkerHostConfigured");
        if (configured &&
            canonicalStringify(configured.payload) !== canonicalStringify(selection))
            throw new Error("persisted worker selection differs; no silent model substitution");
        const repository = join(store.directory, "repository");
        if (events.length === 0) {
            createWorkerFixture(repository, options.fixture);
            driver.feed({
                schemaVersion: 1,
                type: "WorkerHostConfigured",
                occurredAt: now() - 20 * MINUTE,
                actorId: "worker-host",
                workstreamId: WORKSTREAM,
                episodeId: EPISODE,
                payload: selection,
            });
        }
        else if (!configured)
            throw new Error("store lacks its pinned worker selection");
        let completed = [...events]
            .reverse()
            .find((event) => event.type === "WorkerCompleted");
        const resultEvent = events.find((event) => event.type === "CommandResult" &&
            event.payload
                .workerResultVersion === 1);
        if (!completed &&
            resultEvent &&
            walkingStateFromRuntime(driver.state).inspectionCompleted) {
            const payload = resultEvent.payload;
            // A crash after the durable result must not leave a completed command
            // projected as a running episode, or cause another model invocation.
            completed = driver.feed({
                schemaVersion: 1,
                type: "WorkerCompleted",
                occurredAt: now(),
                actorId: "worker-host",
                workstreamId: WORKSTREAM,
                episodeId: EPISODE,
                correlationId: payload.commandId,
                causationId: resultEvent.eventId,
                payload: {
                    workerEpisodeId: payload.workerEpisodeId,
                    commandId: payload.commandId,
                    envelope: payload.envelope,
                    resultEventId: resultEvent.eventId,
                },
            }).event;
        }
        const worktrees = new WorkerWorktrees(repository, join(store.directory, "worktrees"));
        const baseCommit = git(repository, "rev-parse", "HEAD");
        const workerPath = join(worktrees.directory, expectedInspectCommandId);
        if (completed &&
            walkingStateFromRuntime(driver.state).verificationCompleted &&
            !existsSync(workerPath)) {
            return {
                envelope: completed.payload
                    .envelope,
                scenario: replayScenario(driver.log),
            };
        }
        const worktree = worktrees.create(expectedInspectCommandId, baseCommit);
        const inventoryPath = join(worktree.path, "inventory.json");
        if (lstatSync(inventoryPath).isSymbolicLink() ||
            !lstatSync(inventoryPath).isFile() ||
            realpathSync(inventoryPath) !== resolve(inventoryPath))
            throw new Error("inventory is outside its declared mount");
        const fixture = JSON.parse(readFileSync(inventoryPath, "utf8"));
        if (canonicalStringify(fixture) !== canonicalStringify(options.fixture))
            throw new Error("fixture input drift");
        let opening;
        if (!events.some((event) => event.type === "CommandPersisted")) {
            const startAt = now() - 20 * MINUTE;
            const graph = {
                ...loadout,
                activeMechanics: loadout.activeMechanics.map((active) => ({
                    ...active,
                    authorityEnvelope: {
                        ...active.authorityEnvelope,
                        expiresAt: startAt + 40 * MINUTE,
                    },
                })),
            };
            opening = startScenario(driver, graph, { ...seiriEnvironment(baseCommit), repo: inventoryPath }, startAt);
        }
        else
            opening = restoreScenarioOpening(driver);
        const host = new WorkerHost({
            store,
            driver,
            transport: options.transport,
            now,
            ...(writer ? { onClaim: writer.claim } : {}),
            ...(options.onRunning ? { onRunning: options.onRunning } : {}),
            ...(options.afterResultSaved
                ? { afterResultSaved: options.afterResultSaved }
                : {}),
        });
        let envelope;
        let resultStep;
        if (resultEvent &&
            walkingStateFromRuntime(driver.state).inspectionCompleted) {
            envelope = resultEvent.payload.envelope;
            const index = decodeLog(driver.log).findIndex((event) => event.eventId === resultEvent.eventId);
            resultStep = { event: resultEvent, decision: driver.decisions[index] };
        }
        else
            ({ envelope, resultStep } = await host.run(worktree.path, fixture, options.model, options.effort));
        if (resultStep === null)
            return {
                envelope,
                scenario: projectScenario(driver.log, driver.state, driver.decisions),
            };
        finishScenario(driver, fixture, opening, resultStep, now);
        worktrees.cleanup(worktree);
        driver.feed({
            schemaVersion: 1,
            type: "WorkerWorktreeRemoved",
            occurredAt: now(),
            actorId: "worker-host",
            workstreamId: WORKSTREAM,
            episodeId: EPISODE,
            correlationId: opening.command.commandId,
            payload: {
                commandId: opening.command.commandId,
                baseCommit,
                clean: true,
            },
        });
        return {
            envelope,
            scenario: projectScenario(driver.log, driver.state, driver.decisions),
        };
    }
    finally {
        store.release();
    }
}
