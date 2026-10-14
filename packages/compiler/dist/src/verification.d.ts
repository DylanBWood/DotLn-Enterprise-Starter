import type { WorkOrder } from "./types.js";
export declare const CLAIM_TYPES: readonly ["state", "behavior", "visual", "network"];
export type ClaimType = (typeof CLAIM_TYPES)[number];
export type EvidenceSource = "synthetic-fixture" | "live";
export type VerificationWitness = {
    readonly kind: "screenshot";
    readonly contentHash: string;
    readonly criterionId: string;
} | {
    readonly kind: "dom-snapshot" | "accessibility-snapshot";
    readonly contentHash: string;
} | {
    readonly kind: "network-trace";
    readonly contentHash: string;
    readonly request: {
        readonly method: string;
        readonly url: string;
        readonly bodyHash: string | null;
    };
    readonly response: {
        readonly status: number;
        readonly bodyHash: string | null;
    };
} | {
    readonly kind: "console-capture";
    readonly contentHash: string;
    readonly entries: readonly {
        readonly level: "debug" | "log" | "info" | "warn" | "error";
        readonly message: string;
    }[];
};
export interface AcceptanceCriterion {
    readonly criterionId: string;
    readonly description: string;
    readonly claimType: ClaimType;
    readonly evidenceSource: EvidenceSource;
    /** Includes dependencies whose substantive change requires another check. */
    readonly codeSurfaces: readonly string[];
    readonly requiredChecks: readonly string[];
}
export interface VerificationEvidence {
    readonly witness?: VerificationWitness;
    readonly hostTest?: {
        readonly kind: "host-run-test";
        readonly origin: "host";
        readonly snapshotHash: string;
        readonly command: string;
        readonly exitCode: number | null;
        readonly signal: string | null;
        readonly stdout: string;
        readonly stderr: string;
    };
    readonly evidenceId: string;
    readonly criterionId: string;
    readonly checkId: string;
    readonly claimType: ClaimType;
    readonly source: EvidenceSource;
    readonly subjectRevision: string;
    readonly codeSurfaces: readonly string[];
    readonly automatedTest: string | null;
    readonly observed: string;
    readonly expected: string;
    readonly outcome: "pass" | "fail" | "unavailable";
    readonly reproductionSteps: readonly string[];
}
interface FindingFields {
    readonly findingId: string;
    readonly criterionId: string;
    readonly observed: string;
    readonly expected: string;
    readonly reproductionSteps: readonly string[];
    readonly evidenceRefs: readonly string[];
    readonly likelySurface: readonly string[];
}
export interface ReviewFinding extends FindingFields {
    readonly class: "review";
    readonly severity: "blocking" | "should" | "nit";
}
export type VerificationFinding = (FindingFields & {
    readonly class?: never;
    readonly severity: "blocking" | "major" | "minor";
}) | ReviewFinding;
export interface Evaluation {
    readonly criterionId: string;
    readonly claimType: ClaimType;
    readonly verdict: "pass" | "fail" | "unverified";
    readonly evidenceRefs: readonly string[];
    /** Reserved, explicitly empty until their comparison consumers arrive. */
    readonly exemplarRefs: readonly string[];
    readonly dissentRefs: readonly string[];
}
export interface RepositoryFile {
    readonly path: string;
    readonly contents: string;
    readonly mode?: "100644" | "100755";
}
/** Contract facts selected by the caller, never a worker result or transcript. */
export type WorktreeVerificationContract = Pick<WorkOrder, "workOrderId" | "objective" | "acceptanceCriteria" | "constraints" | "nonGoals" | "requiredEvidence">;
export interface NamedVerificationTest {
    readonly criterionId: string;
    readonly checkId: string;
    readonly command: string;
}
export interface WorktreeSnapshot {
    readonly profile: "worktree-snapshot";
    readonly observedCommit: string;
    readonly snapshotHash: string;
    readonly contract: WorktreeVerificationContract;
    readonly tests: readonly NamedVerificationTest[];
}
export interface VerificationSubject {
    readonly snapshot?: WorktreeSnapshot;
    readonly repo: string;
    readonly baseCommit: string;
    readonly revision: string;
    readonly diff: string;
    /** Explicit host-read repository projection; no transcript or result prose. */
    readonly files: readonly RepositoryFile[];
    readonly evidence: readonly VerificationEvidence[];
}
export interface VerificationTask {
    readonly contractVersion: "verification-v1";
    readonly compilerPackageVersion: string;
    readonly inputHash: string;
    readonly role: "verifier" | "repairer";
    readonly workOrder: WorkOrder;
    readonly criteria: readonly AcceptanceCriterion[];
    readonly subject: VerificationSubject;
    readonly finding: VerificationFinding | null;
}
export declare const verificationLine: (value: unknown) => value is string;
export declare const repositoryPath: (value: unknown) => value is string;
export declare const verificationTestCommand: (value: unknown) => value is string;
/** Equality seal, not authentication. Evidence is bound separately by inputHash. */
export declare function verificationSnapshotHash(subject: Pick<VerificationSubject, "baseCommit" | "revision" | "diff" | "files">, snapshot: Omit<WorktreeSnapshot, "snapshotHash">): string;
export declare function copyCriterion(value: AcceptanceCriterion): AcceptanceCriterion;
export declare function copyFinding(value: VerificationFinding): VerificationFinding;
export declare function copySubject(value: VerificationSubject): VerificationSubject;
/** Positive construction is the blinding boundary, including nested values. */
export declare function compileVerificationTask(workOrderId: string, criteriaInput: readonly AcceptanceCriterion[], subjectInput: VerificationSubject, findingInput?: VerificationFinding | null): VerificationTask;
/** A compiler release label, as a recorded program or capsule names it. */
export declare const isCompilerRelease: (value: unknown) => value is string;
/** A recorded capsule keeps the compiler release it names; everything else
 * must be this compiler's lowering, so a stream recorded before a
 * release-only bump still replays and any other drift fails (WO-154). */
export declare function assertVerificationTask(task: VerificationTask): void;
/** Semantic repair policy: exact source bytes, including dependency surfaces. */
export declare function changedVerificationSurfaces(before: VerificationSubject, after: VerificationSubject): readonly string[];
export declare function affectedVerificationCriteria(criteria: readonly AcceptanceCriterion[], changed: readonly string[]): readonly string[];
export {};
