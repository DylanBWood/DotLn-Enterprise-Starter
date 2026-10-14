import type { Command, WorkOrder } from "@dotln/kernel";
import { type WorkerEffort } from "./worker-protocol.js";
/** Read-only judgment of running work: does the session still sit inside the
 * contract it was given, and on the vision's theses? The capsule is pinned and
 * hashed like a verification capsule; the implementer's narrative never enters. */
export declare const MISSION_CHECK_LIMITS: {
    readonly timeoutMs: 600000;
    readonly maxBudgetUsd: "2.00";
};
/** The declared-surface clause every pin carries, so an out-of-surface edit
 * always has a contract clause to name. */
export declare const MISSION_SURFACE_CLAUSE = "contract:surfaces";
export type MissionClauseKind = "objective" | "criterion" | "constraint" | "non-goal" | "surface";
export interface MissionClause {
    readonly id: string;
    readonly kind: MissionClauseKind;
    readonly text: string;
}
export interface MissionContract {
    readonly workOrderId: string;
    readonly clauses: readonly MissionClause[];
    readonly declaredSurfaces: readonly string[];
}
export interface MissionStoryContract {
    readonly storyId: string;
    readonly clauses: readonly MissionClause[];
}
export interface MissionDiff {
    readonly baseCommit: string;
    readonly revision: string;
    /** Every tracked or ordinary untracked path Git can compare with the base.
     * Ignored changes since the pin are named separately without their paths or
     * bytes. Together the two lists are complete at the declared bounds. */
    readonly changedPaths: readonly string[];
    readonly text: string;
    /** Changed paths whose text did not fit the capsule. Named rather than
     * dropped, and a pass cannot be certified while any path is listed here. */
    readonly omittedPaths: readonly string[];
    /** Ignored entries added, removed or metadata-changed since the pin. Their
     * evidence ids are path hashes: ignored names and bytes never cross the
     * model boundary. Any entry prevents a pass; an outside-surface entry is a
     * host-derived drift. */
    readonly ignoredEntries: readonly MissionIgnoredEntry[];
}
export interface MissionIgnoredEntry {
    readonly evidence: string;
    readonly outsideDeclaredSurfaces: boolean;
}
export interface MissionIgnoredBaselineEntry extends MissionIgnoredEntry {
    /** A hash of bounded filesystem metadata, never file contents. */
    readonly fingerprint: string;
}
export interface MissionDecision {
    readonly id: string;
    readonly text: string;
}
export interface MissionThesis {
    readonly id: string;
    readonly title: string;
    readonly text: string;
}
export interface MissionExclusion {
    readonly id: string;
    readonly text: string;
}
/** What the episode was told the work is, pinned when the actor is declared. */
export interface MissionCheckPin {
    readonly schemaVersion: "mission-check-v1";
    readonly contract: MissionContract;
    readonly storyContract: MissionStoryContract | null;
    readonly theses: readonly MissionThesis[];
    readonly exclusions: readonly MissionExclusion[];
    /** Host-only salt for ignored-entry evidence ids; omitted from the prompt. */
    readonly ignoredSalt: string;
    /** Host-only baseline used to detect ignored changes after declaration. The
     * prompt projection intentionally omits it. */
    readonly ignoredBaseline: readonly MissionIgnoredBaselineEntry[];
}
/** What the work actually looks like at dispatch, read by the host. */
export interface MissionObservation {
    readonly contract: MissionContract;
    readonly diff: MissionDiff;
    readonly decisions: readonly MissionDecision[];
    /** Why the declared decision window could not be carried whole, or `null`
     * when `decisions` is that whole window; an optional history that does not
     * exist yet is a whole, empty window. Named rather than dropped, exactly as
     * `omittedPaths` is: a history that exists and was not shown to the judge
     * cannot be certified as on-mission. */
    readonly omittedDecisions: string | null;
}
export interface MissionCheckSubject extends MissionCheckPin {
    readonly observation: MissionObservation;
    readonly hash: string;
}
export type MissionVerdict = "on-mission" | "drift" | "unknown";
export type MissionFindingKind = "contract-clause" | "thesis" | "exclusion";
export interface MissionCheckFinding {
    readonly kind: MissionFindingKind;
    /** A clause, thesis or exclusion id supplied in the capsule. */
    readonly reference: string;
    /** A changed path, decision id or the observed contract hash. */
    readonly evidence: string;
    readonly reason: string;
}
export interface MissionCheckObserved {
    readonly schemaVersion: "mission-check-v1";
    readonly verdict: MissionVerdict;
    readonly findings: readonly MissionCheckFinding[];
}
/** Where a dispatch-time observation reads its bytes. A declaration, not a
 * capability: the host that runs it owns the read. */
export interface MissionSource {
    /** Absolute worktree the work is happening in. */
    readonly root: string;
    /** Repository-relative contract file. */
    readonly contractPath: string;
    /** Repository-relative decisions file, when one exists yet. */
    readonly decisionsPath?: string;
    /** Repository-relative story-contract file, when the work has one. */
    readonly storyPath?: string;
    readonly baseCommit: string;
    readonly declaredSurfaces: readonly string[];
    readonly decisionLimit: number;
    readonly visionPath: string;
    readonly thesisHeadings: readonly (readonly [string, string])[];
}
export declare function assertMissionSource(value: unknown): asserts value is MissionSource;
export interface MissionCheckRequest {
    readonly kind: "mission-check";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly subject: MissionCheckSubject;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly cwd: string;
    readonly profile: {
        readonly profileId: "mission-check-v1";
        readonly modelTools: readonly [];
    };
}
export declare const isMissionCheckRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: Command;
}) => request is MissionCheckRequest;
/** The capsule's explicit bounds. Nothing is silently dropped at these edges:
 * an observation that cannot represent the work refuses, and one that had to
 * leave a path's text out names the path and cannot then be passed. `diffChars`
 * is sized from a real worktree — WO-099's own carried a 379,845-character
 * tracked diff over 56 paths, which fits, beside 19 untracked paths holding
 * 1.97 MB of generated evidence logs, which does not. Ordinary source work is
 * therefore judged in full, and a working set that genuinely cannot be shown to
 * the judge is held as `unknown` rather than passed. */
export declare const MISSION_CAPSULE_BOUNDS: {
    readonly clauses: 200;
    readonly paths: 400;
    readonly diffChars: 600000;
    readonly clauseChars: 4000;
    readonly decisionChars: 8000;
    readonly thesisChars: 20000;
    readonly decisions: 50;
    /** What the judge may add beyond the findings the host derives itself. The
     * host's own findings are bounded by the paths and clauses above, never by
     * this, so a normalized result always passes the same validation again. */
    readonly modelFindings: 100;
};
/** Repository-relative, never absolute, traversing or control-bearing. */
export declare const missionPath: (value: unknown) => value is string;
export declare function assertMissionCheckSubject(value: unknown): asserts value is MissionCheckSubject;
/** Covers every judged byte except the hash itself. It is not authentication. */
export declare const missionSubjectHash: (subject: MissionCheckSubject) => string;
export declare function missionSubject(pin: MissionCheckPin, observation: MissionObservation): MissionCheckSubject;
export declare const missionPin: (subject: MissionCheckSubject) => MissionCheckPin;
/** A dispatch-time observation may complete a pinned capsule; it may never
 * rewrite what the episode was told the work is. */
export declare function assertMissionSubjectExtends(pinned: MissionCheckSubject, observed: unknown): asserts observed is MissionCheckSubject;
/** The observed contract's own hash, usable as a finding's evidence reference. */
export declare const missionContractEvidence: (subject: MissionCheckSubject) => string;
export declare function structuralMissionFindings(subject: MissionCheckSubject): readonly MissionCheckFinding[];
export declare function missionEvidenceIds(subject: MissionCheckSubject): readonly string[];
export declare function missionReferenceIds(subject: MissionCheckSubject, kind: MissionFindingKind): readonly string[];
/** The host decides the verdict from supported findings. An unsupported
 * finding is not silently dropped: it refuses the result, which the resident
 * records as `unknown` and holds. */
export declare function validateMissionCheckResult(value: unknown, subject: MissionCheckSubject): MissionCheckObserved;
export declare const missionUnknown: () => MissionCheckObserved;
export declare function missionCheckResultSchema(subject: MissionCheckSubject): object;
export declare function validateMissionCheckRequest(request: MissionCheckRequest): void;
export declare const missionCheckPrompt: (request: MissionCheckRequest) => string;
