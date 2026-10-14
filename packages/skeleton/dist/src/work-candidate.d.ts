export declare const WORK_CANDIDATE_KINDS: readonly ["failing-lint", "failing-test", "misplaced-file", "stale-generated", "repeated-repair"];
export interface WorkCandidate {
    candidateId: string;
    kind: (typeof WORK_CANDIDATE_KINDS)[number];
    paths: string[];
    evidence: string[];
    proposedHome?: string;
    /** Observed scope only; this is not a repair-effort estimate. */
    size: {
        files: number;
    };
}
export interface DiscoveryEvidence {
    evidenceId: string;
    source: string;
    facts: Record<string, string | number | string[]>;
}
export interface DiscoveryReport {
    schemaVersion: 1;
    candidates: WorkCandidate[];
    evidence: DiscoveryEvidence[];
}
export declare function discoveryPath(value: unknown): asserts value is string;
export declare function decodeDiscoveryReport(value: unknown): DiscoveryReport;
/** SHA-256 of the canonical wire bytes, kept pure for deterministic log replay. */
export declare function discoveryOutputSha256(report: DiscoveryReport): string;
