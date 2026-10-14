import { existsSync, lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EditionReferenceError, editionBodies, liveAuditCandidates, resolveEditionLog, } from "./feedback-selfhost.js";
function readRegularFile(path) {
    if (!lstatSync(path).isFile())
        throw new Error("expected regular file");
    return readFileSync(path, "utf8");
}
/** A feedback edition's self-host stream by value: the edition's own file
 * (schema 1), or the live audit its edition record names, which a carried
 * edition keeps in another directory, rebuilt from Git (schema 2, WO-154).
 * Anything that replays the verifier stream through the verification
 * contract needs the bodies back first. */
export function feedbackEditionLog(root, directory, role) {
    const record = join(root, directory, "edition.json");
    if (!existsSync(record)) {
        const ref = `${directory}/${role === "audit" ? "selfhost-audit.jsonl" : "selfhost-verification.jsonl"}`;
        return { ref, value: readRegularFile(join(root, ref)) };
    }
    const { liveAudit } = JSON.parse(readRegularFile(record));
    const reference = role === "audit" ? liveAudit.audit : liveAudit.verification;
    const bodies = editionBodies(root, liveAuditCandidates(root, liveAudit));
    const [text] = bodies.resolve([reference]);
    if (text === undefined)
        throw new EditionReferenceError([reference.path]);
    return {
        ref: reference.path,
        value: resolveEditionLog(text, bodies.resolve),
    };
}
