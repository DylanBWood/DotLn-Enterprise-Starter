import { observedExecFileSync as execFileSync } from "./gate-deadlines.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, } from "node:fs";
import { canonicalStringify, compileFeedbackAudit, } from "@dotln/compiler";
import { appendEvent, decodeLog, replay, } from "@dotln/kernel";
import { WorkerStore } from "./worker-store.js";
import { feedbackStateFromRuntime, hasFeedbackState, initialState, projectRuntimeEnvironment, seiriReactor, } from "./reactor.js";
import { personalFeedback } from "./loadouts/feedback.js";
import { feedbackSourceFile, readFeedbackSource, runFeedbackRegressions, } from "./feedback-audit.js";
import { feedbackContentHash } from "./feedback-boundary.js";
import { evidenceSourceContent } from "./evidence-editions.mjs";
import { preflightVerificationRecovery, VerificationDriver, VerificationHost, } from "./verification-host.js";
import { projectAcceptanceEvidenceMatrices } from "./verification.js";
import { isAbsolute, join, posix } from "node:path";
/** The judged report's place in the verifier subject (WO-011). */
export const FEEDBACK_REPORT_SUBJECT_PATH = "docs/evidence/WO-011/feedback.json";
class FeedbackDriver {
    store;
    state;
    log;
    decisions;
    constructor(store) {
        this.store = store;
        this.log = store.read();
        const restored = replay(initialState(), decodeLog(this.log), seiriReactor, {}, projectRuntimeEnvironment);
        this.state = restored.state;
        this.decisions = [...restored.decisions];
    }
    feed(draft) {
        const appended = appendEvent(this.log, draft);
        const decision = seiriReactor(this.state, appended.event, {
            now: appended.event.occurredAt,
            rngState: 17,
            predicates: {},
        });
        this.store.append(appended.event);
        this.log = appended.log;
        this.state = decision.state;
        this.decisions.push(decision);
        return decision;
    }
}
/** Actual repository audit, deterministic executor, separate blinded verifier episode. */
export async function runFeedbackSelfhost(options) {
    const now = options.now ?? Date.now;
    const source = readFeedbackSource(options.root);
    const program = personalFeedback();
    const baseCommit = execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: options.root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
    }).trim();
    const baselinePaths = new Set(execFileSync("git", [
        "ls-tree",
        "-r",
        "--name-only",
        "-z",
        baseCommit,
        "--",
        ...source.files.map((file) => file.path),
    ], {
        cwd: options.root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
    }).split("\0"));
    const baselineFiles = source.files
        .filter((file) => baselinePaths.has(file.path))
        .map((file) => ({
        path: file.path,
        contents: execFileSync("git", ["show", `${baseCommit}:${file.path}`], {
            cwd: options.root,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            timeout: 5000,
        }),
    }));
    if (baselineFiles.length === 0)
        throw new Error("feedback baseline source unavailable");
    const workOrder = compileFeedbackAudit(program, "DotLn-working-source", baseCommit, source.subject);
    const auditStore = new WorkerStore(join(options.directory, "audit"));
    auditStore.acquire();
    let report, auditLog;
    try {
        const driver = new FeedbackDriver(auditStore);
        const record = (type, payload) => driver.feed({
            schemaVersion: 1,
            type,
            actorId: "feedback-host",
            workstreamId: "ws_feedback_audit",
            occurredAt: now(),
            episodeId: "ep_feedback_executor",
            payload: payload,
        });
        if (!hasFeedbackState(driver.state))
            record("FeedbackAuditOpened", {
                program,
                workOrder,
                subject: source.subject,
                authority: {
                    authorityEnvelopeId: "feedback-audit-grant",
                    allowedEffects: ["feedback.audit"],
                    deniedEffects: ["repo.write", "repo.delete", "publish"],
                    resourceLimits: { audits: 1 },
                    requiredEvidence: ["feedback-policy", "pinned-source"],
                    expiresAt: now() + 60 * 60_000,
                    revocationEventTypes: [],
                },
            });
        let state = feedbackStateFromRuntime(driver.state);
        if (state.subject !== source.subject ||
            !same(state.workOrder, workOrder) ||
            !same(state.program, program))
            throw new Error("feedback selfhost recovery source or policy drift");
        if (!state.pending)
            record("FeedbackAuditRequested", {});
        state = feedbackStateFromRuntime(driver.state);
        if (!state.pending)
            throw new Error("feedback audit dispatch refused");
        if (!state.persisted)
            record("CommandPersisted", { command: state.pending });
        if (state.result === null) {
            const ready = record("FeedbackAuditExecutionRequested", {});
            if (ready.trace.branchPath.at(-1) !== "feedback-execution-ready")
                throw new Error("feedback execution refused");
            report = runFeedbackRegressions(options.root, program);
            record("CommandResult", {
                commandId: state.pending.commandId,
                subject: source.subject,
                policyHash: program.policyHash,
                report,
            });
            options.afterAuditSaved?.();
        }
        else
            report = state.result;
        auditLog = driver.log;
        const replayed = replay(initialState(), decodeLog(driver.log), seiriReactor, {}, projectRuntimeEnvironment);
        if (!same(replayed.state, driver.state) ||
            !same(replayed.decisions, driver.decisions))
            throw new Error("feedback audit replay mismatch");
    }
    finally {
        auditStore.release();
    }
    if (readFeedbackSource(options.root).subject !== source.subject)
        throw new Error("feedback source drift before verification");
    const files = [
        ...source.files,
        {
            path: FEEDBACK_REPORT_SUBJECT_PATH,
            contents: JSON.stringify(report, null, 2) + "\n",
        },
    ];
    const revision = feedbackContentHash(canonicalStringify(files));
    const criteria = [
        {
            criterionId: "AC-causal-fixtures",
            description: "All ten feedback regression episodes pass with mechanisms present and fail by assertion with only their mechanism removed.",
            claimType: "behavior",
            evidenceSource: "synthetic-fixture",
            codeSurfaces: files.map((file) => file.path),
            requiredChecks: ["present-removed-pairs"],
        },
        {
            criterionId: "AC-context",
            description: "The matched instruction projection reduces UTF-8 bytes relative to the WO-004 baseline plus the ten prose equivalents; it makes no effective-session token claim.",
            claimType: "state",
            evidenceSource: "synthetic-fixture",
            codeSurfaces: files.map((file) => file.path),
            requiredChecks: ["instruction-byte-accounting"],
        },
    ];
    const subject = {
        repo: workOrder.repo,
        baseCommit,
        revision,
        diff: "Host audit adds its command results to the pinned working-source snapshot. No source mutation is part of this work order.",
        files,
        evidence: criteria.map((criterion, index) => ({
            evidenceId: `${revision}:${criterion.criterionId}`,
            criterionId: criterion.criterionId,
            checkId: criterion.requiredChecks[0],
            claimType: criterion.claimType,
            source: criterion.evidenceSource,
            subjectRevision: revision,
            codeSurfaces: criterion.codeSurfaces,
            automatedTest: index === 0
                ? "WO-011 isolated present/removal regression pairs"
                : "feedbackContextAccounting",
            observed: index === 0
                ? `${report.fixtures.length} present passes; ${report.fixtures.length} removed assertion failures`
                : `${report.context.savedBytes} fewer UTF-8 bytes`,
            expected: index === 0
                ? "10 present passes; 10 removed assertion failures"
                : "positive reduction with matched baseline",
            outcome: (index === 0
                ? report.fixtures.length === 10
                : report.context.savedBytes > 0)
                ? "pass"
                : "fail",
            reproductionSteps: [
                "npm run evidence:feedback -- --write",
                "Inspect the present/removal captures and instruction accounting in feedback.json.",
            ],
        })),
    };
    const verifierStore = new WorkerStore(join(options.directory, "verifier"));
    verifierStore.acquire(() => preflightVerificationRecovery(verifierStore, "ws_feedback_audit_verification", () => join(verifierStore.directory, "mount"), options.model, options.effort, program));
    try {
        const driver = new VerificationDriver(verifierStore, "ws_feedback_audit_verification");
        const selection = {
            transport: options.transport.name,
            harnessVersion: options.transport.harnessVersion,
            model: options.model,
            effort: options.effort,
        };
        const configured = decodeLog(driver.log).find((event) => event.type === "VerificationHostConfigured");
        if (configured && !same(configured.payload, selection))
            throw new Error("feedback verifier selection drift");
        if (!configured)
            driver.record("VerificationHostConfigured", now(), selection);
        if (driver.state.next === "unopened")
            driver.record("VerificationOpened", now(), {
                baseline: {
                    ...subject,
                    revision: baseCommit,
                    files: baselineFiles,
                    diff: "",
                    evidence: subject.evidence.map((item) => ({
                        ...item,
                        evidenceId: `${baseCommit}:${item.criterionId}`,
                        subjectRevision: baseCommit,
                        codeSurfaces: baselineFiles.map((file) => file.path),
                        automatedTest: null,
                        observed: "No feedback audit was executed against the base revision.",
                        outcome: "unavailable",
                    })),
                },
                subject,
                criteria,
                implementerEpisodeId: "ep_feedback_executor",
                maxRepairs: 0,
                authority: {
                    authorityEnvelopeId: "feedback-verification-grant",
                    allowedEffects: ["verification.evaluate"],
                    deniedEffects: [
                        "repo.write",
                        "repo.delete",
                        "repair.propose",
                        "publish",
                    ],
                    resourceLimits: { episodes: 1 },
                    requiredEvidence: ["pinned-subject", "baseline-witness"],
                    expiresAt: now() + 60 * 60_000,
                    revocationEventTypes: ["VerificationRevoked"],
                },
            });
        if (!same(driver.state.subject, subject))
            throw new Error("feedback verifier subject drift");
        if (driver.state.next === "verify") {
            driver.persistNext(now());
            const host = new VerificationHost({
                driver,
                transport: options.transport,
                now,
                feedback: program,
            });
            const mount = join(verifierStore.directory, "mount");
            if (!existsSync(mount))
                mkdirSync(mount, { mode: 0o700 });
            if (lstatSync(mount).isSymbolicLink() || realpathSync(mount) !== mount)
                throw new Error("feedback verifier mount alias");
            if (!existsSync(join(mount, ".git")))
                execFileSync("git", ["init", "--quiet"], { cwd: mount, stdio: "pipe" });
            const mountRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
                cwd: mount,
                encoding: "utf8",
                stdio: ["ignore", "pipe", "pipe"],
            }).trim();
            const dirty = execFileSync("git", [
                "status",
                "--porcelain",
                "--untracked-files=all",
                "--ignored=matching",
            ], { cwd: mount, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
            if (realpathSync(mountRoot) !== mount || dirty)
                throw new Error("feedback verifier mount contains extra context");
            // No model filesystem tools: the capsule is the complete explicit read projection.
            const envelope = await host
                .run(mount, options.model, options.effort)
                .finally(() => removeMountScaffolding(mount));
            if (envelope.status !== "completed")
                throw new Error("feedback verifier incomplete");
        }
        const matrix = projectAcceptanceEvidenceMatrices(decodeLog(driver.log))[0];
        return {
            report,
            workOrder,
            auditLog,
            verificationLog: driver.log,
            matrix,
            complete: matrix.phase === "complete",
        };
    }
    finally {
        verifierStore.release();
    }
}
const same = (a, b) => canonicalStringify(a) === canonicalStringify(b);
/** The mount is an empty repository created only as the verifier's working
 * root. Removing it after the run keeps the feedback lane free of scaffolding
 * that a worktree closeout would otherwise have to classify (WO-044). Anything
 * beyond `.git` or any commit is not scaffolding and stays. */
export function removeMountScaffolding(mount) {
    try {
        if (readdirSync(mount).join() !== ".git")
            return;
        if (!lstatSync(join(mount, ".git")).isDirectory())
            return;
        const git = (...args) => execFileSync("git", ["--git-dir", join(mount, ".git"), "--work-tree", mount, ...args], {
            cwd: mount,
            stdio: "pipe",
            encoding: "utf8",
            timeout: 5000,
        }).trim();
        if (git("for-each-ref", "--format=%(refname)") ||
            git("ls-files", "--stage"))
            return;
        if (!/^refs\/heads\/.+/.test(git("symbolic-ref", "--quiet", "HEAD")))
            return;
        const objects = git("count-objects", "-v");
        if (!["count", "in-pack", "packs", "garbage"].every((key) => new RegExp(`^${key}: 0$`, "m").test(objects)) ||
            /^alternate:/m.test(objects))
            return;
        rmSync(mount, { recursive: true, force: true });
    }
    catch {
        // A mount that cannot be inspected is left for the closeout classifier.
    }
}
// ------------------------------------------- editions by reference (WO-154)
/** Schema 2 feedback editions commit the verifier stream by reference and
 * record a behavioral identity and a pins record (WO-154 D001). */
export const FEEDBACK_EDITION_SCHEMA = 2;
const DERIVED = ".feedback-source/";
const RELEASE = "<component release>";
export function gitObjectFormat(root) {
    const format = execFileSync("git", ["rev-parse", "--show-object-format"], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
    }).trim();
    if (format !== "sha1" && format !== "sha256")
        throw new Error(`unsupported Git object format: ${format}`);
    return format;
}
/** `git hash-object` over bytes; a string is hashed as its UTF-8 encoding. */
export function gitBlobHash(bytes, format = "sha1") {
    const body = typeof bytes === "string" ? Buffer.from(bytes, "utf8") : bytes;
    return createHash(format)
        .update(`blob ${body.length}\0`)
        .update(body)
        .digest("hex");
}
const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isBody = (value) => record(value) &&
    Object.keys(value).join() === "path,contents" &&
    typeof value.path === "string" &&
    typeof value.contents === "string";
const isReference = (value) => record(value) &&
    typeof value.path === "string" &&
    typeof value.blobHash === "string" &&
    /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/u.test(value.blobHash) &&
    Number.isSafeInteger(value.bytes) &&
    !("contents" in value);
/** Every non-empty `files` array in an event whose entries all pass `test`. */
function filesArrays(value, test, found = []) {
    if (Array.isArray(value))
        for (const item of value)
            filesArrays(item, test, found);
    else if (record(value))
        for (const [key, child] of Object.entries(value))
            if (key === "files" &&
                Array.isArray(child) &&
                child.length > 0 &&
                child.every(test))
                found.push(child);
            else
                filesArrays(child, test, found);
    return found;
}
/** Replace every `{path, contents}` files entry of a stream with its
 * reference; a line without one keeps its bytes. */
export function projectEditionLog(log, reference) {
    return log
        .split("\n")
        .map((line) => {
        if (!line)
            return line;
        const event = JSON.parse(line);
        const arrays = filesArrays(event, isBody);
        if (!arrays.length)
            return line;
        for (const files of arrays)
            files.forEach((file, i) => (files[i] = reference(file)));
        return JSON.stringify(event);
    })
        .join("\n");
}
export class EditionReferenceError extends Error {
    paths;
    constructor(paths) {
        super(`unresolvable edition reference: ${paths.join(", ")}`);
        this.paths = paths;
    }
}
/** Rebuild a stream committed by reference; every reference resolves or the
 * error names each unresolvable path. */
export function resolveEditionLog(log, resolve) {
    const lines = log.split("\n").map((line) => {
        if (!line)
            return { line, arrays: [] };
        const event = JSON.parse(line);
        return { line, event, arrays: filesArrays(event, isReference) };
    });
    const references = lines.flatMap(({ arrays }) => arrays.flat());
    if (!references.length)
        return log;
    const bodies = resolve(references);
    const missing = [
        ...new Set(references
            .filter((_, i) => bodies[i] === undefined)
            .map((reference) => reference.path)),
    ];
    if (missing.length)
        throw new EditionReferenceError(missing);
    let next = 0;
    return lines
        .map(({ line, event, arrays }) => {
        if (!arrays.length)
            return line;
        for (const files of arrays)
            files.forEach((file, i) => (files[i] = {
                path: file.path,
                contents: bodies[next++],
            }));
        return JSON.stringify(event);
    })
        .join("\n");
}
/** One `git cat-file --batch` for every identity the tree cannot supply. */
function catFileBatch(root, hashes) {
    const output = execFileSync("git", ["cat-file", "--batch"], {
        cwd: root,
        input: hashes.join("\n") + "\n",
        stdio: ["pipe", "pipe", "pipe"],
        maxBuffer: 1 << 30,
        timeout: 30_000,
    });
    const found = new Map();
    let offset = 0;
    for (const requested of hashes) {
        const end = output.indexOf(10, offset);
        if (end < 0)
            break;
        const [name, type, size] = output
            .subarray(offset, end)
            .toString("utf8")
            .split(" ");
        offset = end + 1;
        if (size === undefined)
            continue; // `<name> missing`
        const length = Number(size);
        if (type === "blob" && name === requested)
            found.set(requested, Buffer.from(output.subarray(offset, offset + length)));
        offset += length + 1;
    }
    return found;
}
/** References and their resolution in one repository. A body resolves from a
 * working-tree file at its path, or at one of `candidates`, whose hash
 * matches (the not-yet-committed case), else from any Git object with that
 * identity (the committed case); content identity, not reachability, is what
 * binds it. */
export function editionBodies(root, candidates = []) {
    const format = gitObjectFormat(root);
    const hash = (bytes) => gitBlobHash(bytes, format);
    const readTree = (path) => {
        if (isAbsolute(path) || posix.normalize(path) !== path)
            return undefined;
        if (path === ".." || path.startsWith("../"))
            return undefined;
        try {
            const absolute = join(root, path);
            return lstatSync(absolute).isFile() ? readFileSync(absolute) : undefined;
        }
        catch {
            return undefined;
        }
    };
    const reference = (file) => {
        const identity = {
            path: file.path,
            blobHash: hash(file.contents),
            bytes: Buffer.byteLength(file.contents, "utf8"),
        };
        if (!file.path.startsWith(DERIVED))
            return identity;
        const sourcePath = file.path.slice(DERIVED.length);
        const raw = readTree(sourcePath);
        const derived = raw && feedbackSourceFile(sourcePath, raw.toString("utf8"));
        if (derived?.path !== file.path || derived.contents !== file.contents)
            throw new Error(`feedback edition cannot derive ${file.path} from the working tree's ${sourcePath}`);
        return {
            ...identity,
            derivedFrom: {
                path: sourcePath,
                blobHash: hash(raw),
                bytes: raw.length,
                projection: JSON.parse(file.contents)
                    .projection,
            },
        };
    };
    const resolve = (references) => {
        const found = new Map();
        const offer = (bytes, expected) => {
            if (!bytes)
                return;
            const identity = hash(bytes);
            if (expected === undefined || identity === expected)
                found.set(identity, bytes);
        };
        const sources = references.map((reference) => reference.derivedFrom ?? reference);
        for (const source of sources)
            if (!found.has(source.blobHash))
                offer(readTree(source.path), source.blobHash);
        for (const candidate of candidates)
            offer(readTree(candidate));
        const missing = [
            ...new Set(sources.map((source) => source.blobHash)),
        ].filter((identity) => !found.has(identity));
        if (missing.length)
            for (const [identity, bytes] of catFileBatch(root, missing))
                offer(bytes, identity);
        return references.map((reference) => {
            const source = reference.derivedFrom ?? reference;
            const bytes = found.get(source.blobHash);
            if (!bytes || bytes.length !== source.bytes)
                return undefined;
            try {
                const contents = reference.derivedFrom
                    ? feedbackSourceFile(reference.derivedFrom.path, bytes.toString("utf8")).contents
                    : bytes.toString("utf8");
                return hash(contents) === reference.blobHash &&
                    Buffer.byteLength(contents, "utf8") === reference.bytes
                    ? contents
                    : undefined;
            }
            catch {
                return undefined;
            }
        });
    };
    return { format, reference, resolve };
}
/** A judged file with its component release labels normalized: what the live
 * verifier judged, apart from the pins (WO-154 D001). */
export function judgedBehavior(file) {
    if (!file.path.startsWith(DERIVED))
        return evidenceSourceContent(file.path, file.contents);
    const projection = JSON.parse(file.contents);
    return canonicalStringify({
        ...projection,
        value: JSON.parse(evidenceSourceContent(projection.sourcePath, JSON.stringify(projection.value))),
    });
}
/** The behavioral identity (every judged file, labels normalized) and the
 * pins record (the raw bytes of each judged file that carries a label) of
 * one judged source set; together they determine the subject. */
export function feedbackEditionIdentities(files) {
    const rows = files.map((file) => ({ file, behavior: judgedBehavior(file) }));
    return {
        behavior: feedbackContentHash(canonicalStringify(rows.map(({ file, behavior }) => [
            file.path,
            feedbackContentHash(behavior),
        ]))),
        pins: feedbackContentHash(canonicalStringify(rows
            .filter(({ file, behavior }) => behavior !== file.contents)
            .map(({ file }) => [file.path, feedbackContentHash(file.contents)]))),
    };
}
/** Judged paths that differ between two source sets: by any byte, or with
 * `labels` only where the difference is more than a component release label. */
export function judgedDrift(recorded, current, labels) {
    const before = new Map(recorded.map((file) => [file.path, file]));
    const after = new Map(current.map((file) => [file.path, file]));
    return [...new Set([...before.keys(), ...after.keys()])]
        .filter((path) => {
        const a = before.get(path), b = after.get(path);
        if (!a || !b)
            return true;
        if (a.contents === b.contents)
            return false;
        if (!labels)
            return true;
        try {
            return judgedBehavior(a) !== judgedBehavior(b);
        }
        catch {
            return true;
        }
    })
        .sort();
}
/** A compiled program apart from its compiler release label; `policyHash`
 * embeds that label, so it is derived here rather than compared. */
export const feedbackPolicyBehavior = (program) => canonicalStringify({
    ...program,
    compilerPackageVersion: RELEASE,
    policyHash: RELEASE,
});
const json = (value) => JSON.stringify(value, null, 2) + "\n";
/** The recorded live audit judged what `current` holds: exactly, or with
 * `labels` apart from component release labels. Both schemas share it; the
 * per-file comparison is the guard D010 relies on, independent of any
 * recorded identity. */
export function validateSelfhostEdition(options) {
    const labels = options.labels ?? false;
    const audit = feedbackStateFromRuntime(replay(initialState(), decodeLog(options.auditLog), seiriReactor, {}, projectRuntimeEnvironment).state);
    if (labels) {
        assert.equal(audit.subject, JSON.parse(options.reportText).subject, "selfhost audit is not this report's");
        assert.equal(feedbackPolicyBehavior(audit.program), feedbackPolicyBehavior(options.program), "selfhost policy is stale");
    }
    else {
        assert.equal(audit.subject, options.current.subject, "selfhost audit source is stale");
        assert.equal(audit.program.policyHash, options.program.policyHash, "selfhost policy is stale");
    }
    assert.equal(json(audit.result), options.reportText);
    const events = decodeLog(options.verifierLog);
    const selection = events.find((event) => event.type === "VerificationHostConfigured")?.payload;
    assert.ok(["claude-cli-print", "codex-cli-exec"].includes(String(selection?.transport)), "recorded selfhost requires a live CLI verifier");
    const matrix = projectAcceptanceEvidenceMatrices(events)[0];
    assert.equal(matrix?.phase, "complete");
    assert.ok(matrix.rows.every((row) => row.status === "verified"));
    const opening = events.find((event) => event.type === "VerificationOpened")
        ?.payload;
    const reportPath = options.reportPath ?? FEEDBACK_REPORT_SUBJECT_PATH;
    assert.equal(opening?.subject.files.find((file) => file.path === reportPath)?.contents, json(audit.result), "verifier did not judge this audit");
    const judged = new Map(opening.subject.files.map((file) => [file.path, file.contents]));
    const stale = options.current.files
        .filter((file) => {
        const contents = judged.get(file.path);
        return (contents === undefined ||
            (contents !== file.contents &&
                (!labels ||
                    judgedDrift([{ path: file.path, contents }], [file], true).length >
                        0)));
    })
        .map((file) => file.path);
    assert.deepEqual(stale, [], `verifier source is stale: ${stale.join(", ")}`);
    assert.notEqual(matrix.rows[0].evaluations.at(-1).episodeId, "ep_feedback_executor");
    return matrix;
}
/** The live audit's own files a resolver reads by hash: its report and its
 * pins snapshot (WO-154 D007), the bytes behind every judged file that
 * carries a component release label, found in the working tree. */
export function liveAuditCandidates(root, live) {
    const pins = posix.join(live.edition, "pins");
    const directory = join(root, pins);
    const names = existsSync(directory) ? readdirSync(directory).sort() : [];
    return [live.report.path, ...names.map((name) => posix.join(pins, name))];
}
export const FEEDBACK_REFERENCE_SEMANTICS = "git hash-object over the UTF-8 bytes read; rebuilt from a hash-matching working-tree file or any Git object with that identity";
export const FEEDBACK_BEHAVIOR_METHOD = "feedback-behavior-v1: every file the live verifier judged, report excluded, with component release labels normalized (evidenceSourceContent); the regenerated report is compared by value apart from subject and policyHash";
export class StaleFeedbackEdition extends Error {
}
/** Judge a schema 2 edition against the current tree: every reference
 * rebuilds its recorded bytes, the recorded identities bind the judged
 * files, the judged behavior is unchanged, the regenerated report differs at
 * most in its identity fields (D010's comparison), and the live audit judged
 * the current files apart from component release labels. */
export function checkFeedbackEdition(options) {
    const { edition, report } = options;
    const stale = (message) => new StaleFeedbackEdition(`feedback evidence is stale: ${message}`);
    if (edition.schemaVersion !== FEEDBACK_EDITION_SCHEMA ||
        edition.kind !== "feedback-evidence-edition")
        throw new Error("unsupported feedback edition record");
    const live = edition.liveAudit;
    const bodies = editionBodies(options.root, liveAuditCandidates(options.root, live));
    let reportText, auditLog, verifierLog;
    try {
        const logs = [live.report, live.audit, live.verification];
        const resolved = bodies.resolve(logs);
        const missing = logs.filter((_, i) => resolved[i] === undefined);
        if (missing.length)
            throw new EditionReferenceError(missing.map((ref) => ref.path));
        [reportText, auditLog] = resolved;
        verifierLog = resolveEditionLog(resolved[2], bodies.resolve);
    }
    catch (error) {
        if (error instanceof EditionReferenceError)
            throw stale(error.message);
        throw error;
    }
    const opening = decodeLog(verifierLog).find((event) => event.type === "VerificationOpened")?.payload;
    assert.ok(opening, "edition verifier stream has no opening");
    assert.equal(feedbackContentHash(canonicalStringify(opening.subject.files)), opening.subject.revision, "edition references do not rebuild the judged subject");
    const reportPath = options.reportPath ?? FEEDBACK_REPORT_SUBJECT_PATH;
    const judged = opening.subject.files.filter((file) => file.path !== reportPath);
    const recorded = feedbackEditionIdentities(judged);
    assert.equal(recorded.behavior, edition.behavior.identity, "edition behavior identity does not bind its live audit");
    assert.equal(recorded.pins, live.pins, "edition pins record does not bind its live audit");
    const now = feedbackEditionIdentities(options.current.files);
    if (now.behavior !== edition.behavior.identity)
        throw stale(`judged behavior changed since ${live.edition} (${judgedDrift(judged, options.current.files, true).join(", ")}); a behavioral change needs a fresh live self-host episode`);
    const identityFree = (text) => ({
        ...JSON.parse(text),
        subject: report.subject,
        policyHash: report.policyHash,
    });
    if (canonicalStringify(identityFree(reportText)) !== canonicalStringify(report))
        throw stale("feedback behavior changed");
    const own = JSON.parse(options.reportText);
    assert.equal(edition.subject, own.subject, "edition subject is not its report's");
    if (now.pins === edition.pins.identity
        ? canonicalStringify(own) !== canonicalStringify(report)
        : canonicalStringify(identityFree(options.reportText)) !==
            canonicalStringify(report))
        throw stale("the edition's feedback.json does not match the regenerated report");
    const matrix = validateSelfhostEdition({
        auditLog,
        verifierLog,
        reportText,
        current: options.current,
        program: options.program,
        reportPath,
        labels: now.pins !== live.pins,
    });
    return {
        matrix,
        live,
        identities: now,
        pinsMoved: now.pins !== edition.pins.identity,
    };
}
