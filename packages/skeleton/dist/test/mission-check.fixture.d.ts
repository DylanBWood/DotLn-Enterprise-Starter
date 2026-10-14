import { type MissionCheckObserved, type MissionSource } from "../src/mission-check-protocol.js";
import type { ProcessRunner } from "../src/worker-transport.js";
export declare const MISSION_SURFACE = "fixture.mission";
export declare function missionFixture(options?: {
    outsideSurface?: boolean;
    transport?: "codex-cli-exec" | "claude-cli-print";
    model?: string;
    effort?: string;
    /** The shape the Contributor build actually declares: the check is the
     * only phase, so the cadence keeps judging while a hold stands. */
    missionOnly?: boolean;
    /** The decisions file at the baseline commit, when a test needs one other
     * than the fixture's single decision. */
    history?: string;
    /** Ignore rules and the build and runtime trees they already exclude,
     * written and committed before the capsule is pinned. This is the shape of
     * a real worktree the episode supervises: the baseline exists before the
     * actor is declared, so an ordinary rebuild only moves entries the pin
     * already carries (WO-099). */
    ignored?: {
        rules: readonly string[];
        baseline: Readonly<Record<string, string>>;
    };
}): {
    root: string;
    work: string;
    git: (...args: string[]) => string;
    source: MissionSource;
    pin: import("../src/mission-check-protocol.js").MissionCheckPin;
    subject: import("../src/mission-check-protocol.js").MissionCheckSubject;
    request: import("../src/mission-check-protocol.js").MissionCheckRequest;
    contractPath: string;
    configuration: import("../src/resident-state.js").ResidentConfiguration;
    directory: string;
    editContract: () => void;
    restoreContract: () => void;
    /** A mid-episode edit that moves the clause ids themselves rather than one
     * clause's text: the second acceptance criterion is renumbered, so the
     * observed contract drops `contract:criterion:2` and adds
     * `contract:criterion:3` while the pin still carries the old id. */
    renumberContract: () => void;
    /** Undo an `outsideSurface` edit: the work returns inside its contract. */
    restoreVision: () => void;
    dispose: () => void;
};
/** A process double that returns the given judgment on the Codex wire format. */
export declare const missionRunner: (judgment: (subject: {
    hash: string;
}) => MissionCheckObserved) => ProcessRunner;
export declare const unavailableRunner: ProcessRunner;
