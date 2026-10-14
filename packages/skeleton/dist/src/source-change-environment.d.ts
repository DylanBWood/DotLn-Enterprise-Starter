import type { SourceChangeProfile } from "./execution-environment.js";
/** Host preflight, not an OS security boundary. The host owns these paths. */
export declare function validateSourceChangeEnvironment(profile: SourceChangeProfile, cwd: string, commitMessagePath: string): void;
/** Refuse unsupported native variants by their actual discovery row. */
export declare function sourceChangeProfile(input: {
    readonly worktree: string;
    readonly worktreeParent: string;
    readonly launchpadCheckout: string;
    readonly commitMessagePath: string;
}, requested?: {
    readonly claudeTools?: "exact-allowlist" | "tools-only";
    readonly codexApproval?: "never" | "on-request";
    readonly codexHooks?: boolean;
}): SourceChangeProfile;
