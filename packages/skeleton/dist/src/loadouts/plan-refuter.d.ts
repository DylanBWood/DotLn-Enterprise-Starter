import { type LoadoutGraph } from "@dotln/compiler";
import { Cadence } from "@dotln/kernel";
export declare const PLAN_REFUTER_QUESTIONS: readonly ["For each order, which critical-path gate does it unblock and what is the NoOp cost in the records?", "How do all eight system traps apply to the order's own process cost?", "Does the Cost line name a removal larger than the addition?", "Does failure of the mechanism degrade to the old behavior rather than refusing?"];
export declare const PLAN_REFUTER_ALLOWED: readonly ["repo.read*", "report.emit"];
export declare const PLAN_REFUTER_DENIED: readonly ["repo.write*", "git.mutate*", "remote.*", "settings.*", "decision.*", "decision.edit"];
export declare function planRefuterLoadout(expiresAt: number): LoadoutGraph;
export declare function compilePlanRefuter(revision: string, dispatchedAt: number): {
    ok: true;
    program: import("@dotln/compiler").CompiledProgram;
    semanticHash: string;
    artifactIdentity: import("@dotln/compiler").ArtifactIdentityV1;
    diagnostics: readonly [];
    cadence: Cadence.Once;
    mask: {
        readonly mask: "Whiteface";
        readonly assignment: "planning judgment and rule keeping";
        readonly guardedFailureMode: "over-centralization";
        readonly guard: "Treat authority as a boundary, never as proof that a judgment is correct.";
    } | {
        readonly mask: "Contra-Auguste";
        readonly assignment: "blinded self-refutation";
        readonly guardedFailureMode: "destructive contrarianism";
        readonly guard: "Remove a finding that does not survive its independent reproduction instead of defending it.";
    } | {
        readonly mask: "Watcher";
        readonly assignment: "whole-episode observation";
        readonly guardedFailureMode: "unattributed inference";
        readonly guard: "Label what was measured and what was established only by inspection.";
    } | {
        readonly mask: "Lazzi";
        readonly assignment: "bounded read-only lens checklist";
        readonly guardedFailureMode: "lens budget creep";
        readonly guard: "Work the fixed lens checklist serially, respecting every word budget and no-fix boundary.";
    };
    lens: "architecture-and-semantics" | "maintainability-and-friction" | "runtime-and-authority" | "verification-and-evidence";
};
