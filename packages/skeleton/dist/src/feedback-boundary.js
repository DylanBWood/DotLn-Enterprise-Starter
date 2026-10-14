import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { observedExecFileSync as execFileSync } from "./gate-deadlines.mjs";
import { evaluateFeedback, } from "@dotln/compiler";
import { feedbackSourcesComments } from "./feedback-source-comments.js";
export class FeedbackRefused extends Error {
    verdict;
    constructor(verdict) {
        super(verdict.violations
            .map((item) => `${item.unitId}: ${item.reason}`)
            .join("; "));
        this.verdict = verdict;
    }
}
/** Only host-derived facts enter here. A model cannot call this with self-authored evidence. */
export function feedbackBoundary(program, facts, effect) {
    const comments = facts.kind === "suppression-diff"
        ? feedbackSourcesComments(facts.files.flatMap((file) => [
            { path: file.path, source: file.before },
            { path: file.path, source: file.after },
        ]))
        : [];
    const request = facts.kind === "suppression-diff"
        ? {
            kind: facts.kind,
            files: facts.files.map((file, index) => ({
                path: file.path,
                beforeComments: comments[index * 2],
                afterComments: comments[index * 2 + 1],
            })),
        }
        : facts;
    const verdict = evaluateFeedback(program, request);
    if (!verdict.allowed)
        throw new FeedbackRefused(verdict);
    return effect();
}
export const feedbackContentHash = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
export function feedbackReadOutput(path, evidenceRef) {
    const contents = readFileSync(path);
    return {
        contents,
        receipt: {
            path: realpathSync(path),
            hash: feedbackContentHash(contents),
            evidenceRef,
        },
    };
}
/** Caller owns a reservation lock spanning this observation and writable dispatch. */
export function feedbackWriterFacts(cwd, actorId, writers) {
    const physical = realpathSync(cwd);
    const git = (...args) => execFileSync("git", args, {
        cwd: physical,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
    }).trim();
    const gitRoot = realpathSync(git("rev-parse", "--show-toplevel"));
    return {
        kind: "writer-isolation",
        actorId,
        cwd: physical,
        gitRoot,
        worktree: gitRoot,
        branch: git("rev-parse", "--abbrev-ref", "HEAD"),
        writable: true,
        writers: writers.map((writer) => ({
            actorId: writer.actorId,
            worktree: realpathSync(writer.worktree),
        })),
    };
}
