import { type CompiledFeedback } from "@dotln/compiler";
import { type FeedbackAuditReport } from "./feedback-audit.js";
import type { WorkOrderTransport } from "./worker-transport.js";
import type { EvidenceWorkerRequest } from "./verification-protocol.js";
import type { WorkerEffort } from "./worker-protocol.js";
/** The judged report's place in the verifier subject (WO-011). */
export declare const FEEDBACK_REPORT_SUBJECT_PATH = "docs/evidence/WO-011/feedback.json";
export interface FeedbackSelfhostOptions {
    readonly root: string;
    readonly directory: string;
    readonly transport: WorkOrderTransport<EvidenceWorkerRequest>;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly now?: () => number;
    readonly afterAuditSaved?: () => void;
}
/** Actual repository audit, deterministic executor, separate blinded verifier episode. */
export declare function runFeedbackSelfhost(options: FeedbackSelfhostOptions): Promise<{
    report: {
        contractVersion: string;
        policyHash: string;
        subject: string;
        fixtures: {
            unitId: string;
            present: {
                command: string;
                mechanism: string;
                exitCode: number | null;
                passed: number;
                failed: number;
                captured: string[];
            };
            removed: {
                command: string;
                mechanism: string;
                exitCode: number | null;
                passed: number;
                failed: number;
                captured: string[];
            };
        }[];
        context: {
            method: string;
            baselineRef: string;
            commonBaseline: {
                files: number;
                lines: number;
                bytes: number;
            };
            proseEquivalent: {
                files: number;
                lines: number;
                bytes: number;
            };
            compiledResidue: {
                files: number;
                lines: number;
                bytes: number;
            };
            beforeBytes: number;
            afterBytes: number;
            savedBytes: number;
            limits: string;
        };
        maturityMethod: string;
        maturity: {
            unitId: string;
            version: number;
            currentMechanism: "application-evidence" | "attribution" | "cleanup-scope" | "complete-scope" | "decision-lineage" | "evidence-judgment" | "output-review" | "semantic-correction" | "suppression-diff" | "writer-isolation";
            nextMaturityCondition: string;
            awakened: false;
            fixture: {
                eligibleEpisodes: number;
                activations: number;
                incidentsPrevented: number;
                falseActivations: number;
                overrides: number;
            };
            live: {
                eligibleEpisodes: number;
                activations: number;
                incidentsPrevented: number;
                falseActivations: number;
                overrides: number;
            };
        }[];
    };
    workOrder: import("@dotln/compiler").WorkOrder;
    auditLog: string;
    verificationLog: string;
    matrix: import("./verification.js").AcceptanceEvidenceMatrix;
    complete: boolean;
}>;
/** The mount is an empty repository created only as the verifier's working
 * root. Removing it after the run keeps the feedback lane free of scaffolding
 * that a worktree closeout would otherwise have to classify (WO-044). Anything
 * beyond `.git` or any commit is not scaffolding and stays. */
export declare function removeMountScaffolding(mount: string): void;
/** Schema 2 feedback editions commit the verifier stream by reference and
 * record a behavioral identity and a pins record (WO-154 D001). */
export declare const FEEDBACK_EDITION_SCHEMA = 2;
interface FileBody {
    readonly path: string;
    readonly contents: string;
}
/** A recorded body by identity: the Git blob identity (`git hash-object`
 * semantics) of the UTF-8 bytes read, and their length. A synthesized package
 * projection exists in no tree, so it names the repository blob it derives
 * from and is rebuilt with `feedbackSourceFile`. */
export interface FileReference {
    readonly path: string;
    readonly blobHash: string;
    readonly bytes: number;
    readonly derivedFrom?: {
        readonly path: string;
        readonly blobHash: string;
        readonly bytes: number;
        readonly projection: string;
    };
}
type ObjectFormat = "sha1" | "sha256";
export declare function gitObjectFormat(root: string): ObjectFormat;
/** `git hash-object` over bytes; a string is hashed as its UTF-8 encoding. */
export declare function gitBlobHash(bytes: string | Uint8Array, format?: ObjectFormat): string;
/** Replace every `{path, contents}` files entry of a stream with its
 * reference; a line without one keeps its bytes. */
export declare function projectEditionLog(log: string, reference: (file: FileBody) => FileReference): string;
export declare class EditionReferenceError extends Error {
    readonly paths: readonly string[];
    constructor(paths: readonly string[]);
}
/** Rebuild a stream committed by reference; every reference resolves or the
 * error names each unresolvable path. */
export declare function resolveEditionLog(log: string, resolve: (references: readonly FileReference[]) => (string | undefined)[]): string;
/** References and their resolution in one repository. A body resolves from a
 * working-tree file at its path, or at one of `candidates`, whose hash
 * matches (the not-yet-committed case), else from any Git object with that
 * identity (the committed case); content identity, not reachability, is what
 * binds it. */
export declare function editionBodies(root: string, candidates?: readonly string[]): {
    format: ObjectFormat;
    reference: (file: FileBody) => FileReference;
    resolve: (references: readonly FileReference[]) => (string | undefined)[];
};
/** A judged file with its component release labels normalized: what the live
 * verifier judged, apart from the pins (WO-154 D001). */
export declare function judgedBehavior(file: FileBody): string;
/** The behavioral identity (every judged file, labels normalized) and the
 * pins record (the raw bytes of each judged file that carries a label) of
 * one judged source set; together they determine the subject. */
export declare function feedbackEditionIdentities(files: readonly FileBody[]): {
    behavior: string;
    pins: string;
};
/** Judged paths that differ between two source sets: by any byte, or with
 * `labels` only where the difference is more than a component release label. */
export declare function judgedDrift(recorded: readonly FileBody[], current: readonly FileBody[], labels: boolean): string[];
/** A compiled program apart from its compiler release label; `policyHash`
 * embeds that label, so it is derived here rather than compared. */
export declare const feedbackPolicyBehavior: (program: unknown) => string;
interface JudgedSource {
    readonly files: readonly FileBody[];
    readonly subject: string;
}
/** The recorded live audit judged what `current` holds: exactly, or with
 * `labels` apart from component release labels. Both schemas share it; the
 * per-file comparison is the guard D010 relies on, independent of any
 * recorded identity. */
export declare function validateSelfhostEdition(options: {
    readonly auditLog: string;
    readonly verifierLog: string;
    readonly reportText: string;
    readonly current: JudgedSource;
    readonly program: CompiledFeedback;
    readonly reportPath?: string;
    readonly labels?: boolean;
}): import("./verification.js").AcceptanceEvidenceMatrix;
/** The live audit a schema 2 edition names, by reference. `edition` is the
 * directory holding the logs; a carried edition names the edition it was
 * carried from as well. */
export interface LiveAuditReference {
    readonly edition: string;
    readonly carried: boolean;
    readonly pins: string;
    readonly report: FileReference;
    readonly audit: FileReference;
    readonly verification: FileReference;
    readonly carriedFrom?: FileReference;
}
/** The live audit's own files a resolver reads by hash: its report and its
 * pins snapshot (WO-154 D007), the bytes behind every judged file that
 * carries a component release label, found in the working tree. */
export declare function liveAuditCandidates(root: string, live: LiveAuditReference): string[];
export interface FeedbackEditionRecord {
    readonly schemaVersion: typeof FEEDBACK_EDITION_SCHEMA;
    readonly kind: "feedback-evidence-edition";
    readonly references: {
        readonly objectFormat: string;
        readonly semantics: string;
    };
    readonly subject: string;
    readonly behavior: {
        readonly identity: string;
        readonly method: string;
        readonly files: number;
    };
    readonly pins: {
        readonly identity: string;
        readonly components: Readonly<Record<string, string>>;
    };
    readonly liveAudit: LiveAuditReference;
}
export declare const FEEDBACK_REFERENCE_SEMANTICS = "git hash-object over the UTF-8 bytes read; rebuilt from a hash-matching working-tree file or any Git object with that identity";
export declare const FEEDBACK_BEHAVIOR_METHOD = "feedback-behavior-v1: every file the live verifier judged, report excluded, with component release labels normalized (evidenceSourceContent); the regenerated report is compared by value apart from subject and policyHash";
export declare class StaleFeedbackEdition extends Error {
}
/** Judge a schema 2 edition against the current tree: every reference
 * rebuilds its recorded bytes, the recorded identities bind the judged
 * files, the judged behavior is unchanged, the regenerated report differs at
 * most in its identity fields (D010's comparison), and the live audit judged
 * the current files apart from component release labels. */
export declare function checkFeedbackEdition(options: {
    readonly root: string;
    readonly edition: FeedbackEditionRecord;
    readonly reportText: string;
    readonly current: JudgedSource;
    readonly report: FeedbackAuditReport;
    readonly program: CompiledFeedback;
    readonly reportPath?: string;
}): {
    matrix: import("./verification.js").AcceptanceEvidenceMatrix;
    live: LiveAuditReference;
    identities: {
        behavior: string;
        pins: string;
    };
    pinsMoved: boolean;
};
export {};
