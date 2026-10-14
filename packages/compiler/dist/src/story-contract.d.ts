import { type SourceBundle, type SourceSpan } from "./source-bundle.js";
import { type AcceptanceCriterion } from "./verification.js";
/** StoryContract v1 (WO-061) consumes an already decoded SourceBundle.
 * No model, clock, IO or ambient policy is consulted. Classification rules
 * decide only the declared markup; every other semantic choice is supplied
 * and remains inferred, or open. IDs are equality receipts, not authentication.
 * Criteria are drafts: WO-124 supplies actual surfaces and checks.
 */
export declare const STORY_CONTRACT_VERSION = "story-contract-v1";
export declare const STORY_STATEMENT_CLASSES: readonly ["requirement", "non-requirement", "struck", "example", "question", "answer", "visual annotation", "current-behavior observation", "inference", "assumption", "contradiction", "open decision"];
export type StoryStatementClass = (typeof STORY_STATEMENT_CLASSES)[number];
/** Specific strike/image spans precede section/question backgrounds. The
 * question pattern declares only a discussion entry ending in '?'. Its follows
 * fact uses the first later entry by another role as its source and the
 * question as its target. An image
 * declared by the bundle is an annotation even without Markdown syntax.
 * [image:<id>] explicitly refers to that bundle image from a requirement.
 */
export declare const STORY_RULE_PATTERNS: Readonly<{
    struck: Readonly<{
        pattern: string;
        flags: "gu";
    }>;
    image: Readonly<{
        pattern: string;
        flags: "gu";
    }>;
    outOfScope: Readonly<{
        pattern: string;
        flags: "iu";
    }>;
    question: Readonly<{
        pattern: string;
        flags: "u";
    }>;
    visualReference: Readonly<{
        pattern: string;
        flags: "gu";
    }>;
}>;
type Rule = "struck" | "image" | "outOfScope" | "question";
export interface StoryClassInference {
    readonly span: SourceSpan;
    readonly class: StoryStatementClass;
    readonly rationale: string;
}
export interface StoryRelationInference {
    readonly span: SourceSpan;
    readonly relation: "answers" | "supersedes";
    readonly target: SourceSpan;
    readonly evidence: readonly SourceSpan[];
    readonly rationale: string;
}
export type StoryInference = StoryClassInference | StoryRelationInference;
export interface StoryStatement {
    readonly statementId: string;
    readonly span: SourceSpan;
    readonly text: string;
    readonly class: StoryStatementClass;
    readonly origin: "rule" | "inferred";
    readonly rule?: Rule;
    readonly rationale?: string;
    readonly status: "active" | "superseded";
}
export interface StoryCriterionDraft extends Pick<AcceptanceCriterion, "criterionId" | "description" | "claimType" | "evidenceSource"> {
    readonly statementId: string;
    readonly span: SourceSpan;
    readonly status: "active" | "superseded";
}
export interface StoryRelation {
    readonly relationId: string;
    readonly span: SourceSpan;
    readonly relation: "follows" | "answers" | "supersedes";
    readonly target: SourceSpan;
    readonly origin: "rule" | "inferred";
    readonly evidence: readonly SourceSpan[];
    readonly rationale?: string;
    readonly status: "active" | "invalidated";
}
export interface StoryOpenDecision {
    readonly decisionId: string;
    readonly statementId: string;
    readonly span: SourceSpan;
    readonly reason: "unclassified" | "unanswered" | "criterion-description";
}
export interface StorySourceUnit {
    readonly span: SourceSpan;
    readonly fingerprint: string;
}
export interface StoryContract {
    readonly contractVersion: typeof STORY_CONTRACT_VERSION;
    readonly contractId: string;
    readonly bundleId: string;
    readonly bundleHash: string;
    readonly revisionId: string;
    readonly statements: readonly StoryStatement[];
    readonly criteria: readonly StoryCriterionDraft[];
    readonly relations: readonly StoryRelation[];
    readonly openDecisions: readonly StoryOpenDecision[];
    /** Whole-unit equality receipts, independent of document/thread position. */
    readonly sourceUnits: readonly StorySourceUnit[];
    /** The supplied choices, copied and canonically ordered, never promoted. */
    readonly inferences: readonly StoryInference[];
}
export interface StoryContractRevision {
    readonly contract: StoryContract;
    /** IDs from the previous contract; an invalidated ID may reappear with a
     * changed status or claim type. */
    readonly invalidated: {
        readonly statements: readonly string[];
        readonly criteria: readonly string[];
        readonly relations: readonly string[];
        readonly openDecisions: readonly string[];
    };
}
export declare function compileStoryContract(bundle: SourceBundle, inferences?: readonly StoryInference[]): StoryContract;
/** Retain choices only when all their whole-unit dependencies are unchanged.
 * New choices (especially a new decision's supersedes edge) must be supplied;
 * text position never creates them. The previous contract is never mutated.
 */
export declare function revise(contract: StoryContract, newBundle: SourceBundle, inferences?: readonly StoryInference[]): StoryContractRevision;
/** WO-124's typed input, independent of the future role-loaded profile document.
 * Directories are repository-relative; '.' explicitly covers the snapshot root.
 * Commands are selected verbatim, never interpreted or executed here.
 */
export interface RepoSurfaceProfile {
    readonly architecture: readonly {
        readonly noun: string;
        readonly directories: readonly string[];
    }[];
    readonly commands: readonly {
        readonly command: string;
        readonly directories: readonly string[];
    }[];
}
export interface SnapshotIndexEntry {
    readonly path: string;
    /** UTF-8 byte length, not character count. */
    readonly size: number;
    /** Lowercase SHA-256 of the file's bytes; an equality receipt. */
    readonly hash: string;
}
export type SnapshotIndex = readonly SnapshotIndexEntry[];
export interface SurfaceInference {
    readonly statementId: string;
    readonly path: string;
    readonly rationale: string;
}
export type SurfaceOrigin = {
    readonly origin: "rule";
    readonly rule: "named-path" | "architecture";
    readonly statementId: string;
    readonly reference: string;
} | {
    readonly origin: "inferred";
    readonly statementId: string;
    readonly rationale: string;
};
export interface DerivedSurface {
    readonly path: string;
    /** Retain every distinct proof, including inferred/rule overlap. */
    readonly origins: readonly SurfaceOrigin[];
}
export interface SurfaceCandidate {
    readonly path: string | null;
    readonly statementId: string;
    readonly reason: "not-in-snapshot" | "unmapped-requirement";
    readonly provenance: SurfaceOrigin | null;
}
export interface DerivedSurfaceTest {
    readonly command: string;
    readonly origin: "rule";
    readonly surfaces: readonly string[];
}
export interface SurfaceDerivationOptions {
    readonly threshold?: number;
    /** Supplied model choices; fixtures use a labeled double. */
    readonly inferences?: readonly SurfaceInference[];
}
interface SurfaceDerivationBody {
    readonly surfaces: readonly DerivedSurface[];
    readonly tests: readonly DerivedSurfaceTest[];
    readonly candidates: readonly SurfaceCandidate[];
    readonly confidence: number;
    readonly threshold: number;
    readonly uncoveredStatementIds: readonly string[];
}
export type SurfaceDerivation = SurfaceDerivationBody & ({
    readonly kind: "DerivedSurfaces";
} | {
    readonly kind: "NeedsHuman";
    readonly reason: string;
});
/** These are declared syntax, not a general language/path parser. Quote root
 * filenames with backticks. Bare paths contain a slash; final prose punctuation
 * is removed. Nouns match literal text, case-insensitively; Unicode letters,
 * numbers, underscores and hyphens are boundary characters that prevent a
 * match inside a larger token. Directory references expand only to indexed files.
 */
export declare const SURFACE_RULE_PATTERNS: Readonly<{
    quotedPath: Readonly<{
        pattern: string;
        flags: "gu";
    }>;
    barePath: Readonly<{
        pattern: string;
        flags: "gu";
    }>;
    noun: Readonly<{
        match: "case-insensitive-literal";
        boundary: string;
        flags: "iu";
    }>;
}>;
export declare const SURFACE_SNAPSHOT_BOUND = "snapshot unavailable: requires 1 to 100 regular UTF-8 files, at most 100,000 bytes each; symlinks, submodules and binary files are unsupported";
export declare function decodeRepoSurfaceProfile(value: unknown): RepoSurfaceProfile;
export declare function decodeSnapshotIndex(value: unknown): SnapshotIndex;
/** Pure proposal, not an authority grant. Confidence is rule coverage,
 * not a probability that a model's scope is correct. Missing explicit paths stay
 * candidates even when another rule covers that same requirement. A caller's
 * lower threshold deliberately admits uncovered requirements, never those paths.
 */
export declare function deriveSurfaces(contract: StoryContract, profile: RepoSurfaceProfile, snapshotIndex: SnapshotIndex | null, options?: SurfaceDerivationOptions): SurfaceDerivation;
export {};
