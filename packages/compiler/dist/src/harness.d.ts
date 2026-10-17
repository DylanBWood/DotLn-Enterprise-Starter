import { type CompiledFeedback, type FeedbackHandler } from "./feedback.js";
import type { AuthorityEnvelope, AuthorityGrant, CompiledProgram } from "./types.js";
/** Pure output policy; the host supplies its atomic marker operation.
 * Observation failures show the message; they never alter a permission decision.
 */
export declare function showHarnessAdvisory(sessionId: string | undefined, event: string, cause: string, claimMarker: (key: string) => boolean): boolean;
/** A dispatch may lead a longer message, separated from its direction by a
 * newline or semicolon. Quoted phrases and word continuations are prose. */
export declare function harnessPromptIntent(prompt: string | undefined): string;
export type HarnessEvent = "PreToolUse" | "PostToolUse" | "Stop" | "UserPromptSubmit";
export interface HarnessObservation {
    readonly available: boolean;
    readonly evidence: string;
    readonly reason?: string;
}
export interface HarnessProfile {
    readonly kind?: "contributor-v1" | "target-worker-v1";
    readonly profileId: string;
    readonly harness: "claude-code" | "codex-cli" | "copilot-cli";
    readonly observedVersion: string;
    readonly tools?: Readonly<Record<string, "read" | "write" | "shell" | "spawn" | "stop" | "interaction">>;
    readonly events: Readonly<Record<HarnessEvent, HarnessObservation>>;
    /** Separately witnessed native compaction hooks; never enables Claude hooks. */
    readonly codexContinuation?: HarnessObservation & {
        readonly observedVersion: string;
    };
    readonly skills: HarnessObservation & {
        readonly root: string;
    };
    readonly settings: HarnessObservation & {
        readonly path: string;
        readonly deny: boolean;
        readonly allow: boolean;
    };
    readonly instruction: HarnessObservation & {
        readonly path: string;
    };
    readonly refusal: "claude-command-json-v1" | "unavailable";
    readonly runtime: {
        readonly skeletonVersion: string;
        readonly boundaryContract: "feedback-v1";
        readonly snapshot?: string;
        /** Emit-time launchpad path; never serialized into a manifest or config. */
        readonly importRoot?: string;
        readonly targetId?: string;
        readonly files?: readonly {
            readonly path: string;
            readonly hash: string;
        }[];
    };
}
/** Harness target authority; deliberately outside the loadout-v1/kernel IR. */
export type OutsideWriteGrant = {
    readonly source: string;
} & ({
    readonly kind: "system-temp" | "session-scratch" | "host-scratchpad" | "main-intake";
} | {
    readonly kind: "operator-root";
    readonly root: string;
});
export interface RoleOutsideWriteGrants {
    readonly role: string;
    readonly grants: readonly (OutsideWriteGrant & {
        readonly originId: string;
        readonly authorityGrantId: string;
    })[];
}
export interface HarnessRole {
    readonly facetId: string;
    readonly name: string;
    readonly description: string;
    readonly intents: readonly string[];
    readonly procedure: readonly string[];
    readonly feedbackHandlers: readonly FeedbackHandler[];
    readonly outsideWriteGrants?: readonly OutsideWriteGrant[];
}
export type HarnessFacet = {
    readonly facetId: string;
    readonly kind: "permission-guard";
    readonly matchers: readonly {
        readonly effect: string;
        readonly deny: string;
    }[];
} | {
    readonly facetId: string;
    readonly kind: "prompt-fragment";
    readonly text: string;
} | ({
    readonly facetId: string;
    readonly kind: "role-procedure";
    readonly text: string;
    readonly outsideWriteGrants?: readonly OutsideWriteGrant[];
} & ({
    readonly roleName: string;
    readonly roleNames?: never;
} | {
    readonly roleNames: readonly string[];
    readonly roleName?: never;
}));
/** Separate target input. It never extends or changes the loadout-v1 preimage. */
export interface HarnessProgram {
    readonly contractVersion: "harness-v1";
    readonly loadout: CompiledProgram;
    readonly roles: readonly HarnessRole[];
    readonly facets: readonly HarnessFacet[];
    readonly correctionToken: string | null;
    readonly worker?: {
        readonly name: string;
        readonly model: string;
        readonly effort: "low" | "medium" | "high" | "xhigh" | "max";
    };
}
export interface HarnessOrigin {
    readonly ids: readonly string[];
    readonly loadoutId: string;
    readonly semanticHash: string;
}
export interface HarnessFile {
    readonly path: string;
    readonly contents: string;
    readonly origin: HarnessOrigin;
    readonly rung: number;
}
export interface HarnessResidue {
    readonly originId: string;
    readonly reason: string;
    readonly missingCapabilities: readonly string[];
    readonly text?: string;
}
export interface HarnessBundle {
    readonly contractVersion: "harness-v1";
    readonly files: readonly HarnessFile[];
    readonly manifest: {
        readonly contractVersion: "harness-v1";
        readonly compilerPackageVersion: string;
        readonly feedbackPolicyHash: string;
        readonly grants: readonly AuthorityGrant[];
        readonly outsideWriteGrants?: readonly RoleOutsideWriteGrants[];
        readonly authorityGrantRegistryHash: string | null;
        readonly profile: HarnessProfile;
        readonly loadout: {
            readonly id: string;
            readonly semanticHash: string;
            readonly targetHash: string;
        };
        readonly files: readonly {
            readonly path: string;
            readonly hash: string;
            readonly origin: HarnessOrigin;
            readonly rung: number;
        }[];
        readonly origin: HarnessOrigin;
    };
    readonly residue: {
        readonly items: readonly HarnessResidue[];
        readonly bytes: number;
        readonly fragment: string;
    };
}
export declare function assertOutsideWriteGrants(value: unknown): asserts value is readonly OutsideWriteGrant[];
/** Exact effects keep the existing envelope's GRANTS projection authoritative. */
export declare const outsideWriteEffect: (grant: OutsideWriteGrant) => string;
export declare const HARNESS_START = "<!-- dotln-harness:start -->";
export declare const HARNESS_END = "<!-- dotln-harness:end -->";
export declare function assertHarnessProfile(profile: HarnessProfile): void;
/** Pure, deterministic target lowering. Hook predicates stay in feedbackBoundary. */
export declare function lowerToHarness(program: HarnessProgram, feedback: CompiledFeedback, envelope: AuthorityEnvelope, profile: HarnessProfile): HarnessBundle;
export declare function verifyHarnessBundle(bundle: HarnessBundle): boolean;
/** The shared instruction symlink contains all profile-qualified residue. */
export declare function mergeHarnessFragments(bundles: readonly HarnessBundle[]): string;
