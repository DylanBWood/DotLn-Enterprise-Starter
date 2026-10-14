import type { VerificationState } from "./verification.js";
export type { MatrixEvaluation, AcceptanceEvidenceRow, FindingRecord, VerificationPending, VerificationState, } from "./verification.js";
import { type RepairState } from "./repair.js";
import { type ResidentState } from "./resident-state.js";
import { type SourceChangeSlice } from "./source-change-state.js";
export type { SourceChangeSlice } from "./source-change-state.js";
import { authorize, type AuthorityEnvelope, type AuthorizationResult, type Command, type Event, type JsonValue, type KernelEnv, type PredicateRegistry, type Reactor, type WorkOrder } from "@dotln/kernel";
import { type CompiledFeedback, type CorrectionState, type ArtifactIdentityV1, type CompiledProgram, type LoadoutGraph } from "@dotln/compiler";
import type { JudgedBeacon } from "./control-beacon.js";
export declare const MINUTE = 60000;
export declare const WORKSTREAM = "ws_repo_garden";
export declare const EPISODE = "ep_seiri_1";
export declare const ACTOR = "repo-gardener";
export declare const PULSE_SCHEDULE = "schedule_seiri_20m";
export declare const QUEUED_PULSE = "schedule_seiri_already_queued";
export type Candidate = Readonly<{
    path: string;
    classification: string;
    evidence: readonly string[];
}>;
export type Loadout = LoadoutGraph;
type RuntimePolicy = Readonly<{
    maintenance: string;
}>;
export type RuntimeState = Readonly<{
    repair?: JsonValue;
    resident?: JsonValue;
    sourceChange?: SourceChangeSlice;
    feedback?: JsonValue;
    verification?: JsonValue;
    presence: "away" | "returned";
    rngState: number;
    policy: RuntimePolicy;
    loadout: JsonValue;
    artifactIdentity: JsonValue;
    compilationEnvironment: JsonValue;
    equippedEventId: string | null;
    identityEnforcementEventId: string | null;
    artifactIdentityBlocked: boolean;
    workOrder: JsonValue;
    candidates: readonly Candidate[];
    verified: boolean;
    verificationCompleted: boolean;
    pulseSeen: boolean;
    inspectionCompleted: boolean;
    deletionRefused: boolean;
    queuedPulseNoOp: boolean;
    authority: JsonValue;
    revocationEvents: readonly JsonValue[];
    program: JsonValue;
    commandResult: JsonValue;
    pendingCommand: JsonValue;
    authorizationEvidence: readonly string[];
    deletionPaths: readonly string[];
    refusalReason: JsonValue;
    persistedEffect: JsonValue;
    noOpEvidence: readonly string[];
    cancelledScheduleIds: readonly string[];
    activeScheduleIds: readonly string[];
    redispatchedCommandIds: readonly string[];
    beaconObservations: readonly JudgedBeacon[];
    beaconSweep: JsonValue;
    workerEpisodeId: string | null;
    workerLeaseExpired: boolean;
}>;
/** Public Decisions retain RuntimeState; this version belongs only to the fold. */
export type WalkingSkeletonSlice = Omit<RuntimeState, "repair" | "sourceChange" | "resident" | "feedback" | "verification" | "workerEpisodeId" | "workerLeaseExpired">;
export type WorkerEpisodeSlice = Readonly<{
    workerEpisodeId: string | null;
    workerLeaseExpired: boolean;
}>;
export type SkeletonState = Readonly<{
    version: 1;
    walking: WalkingSkeletonSlice;
    worker: WorkerEpisodeSlice;
    verification: VerificationState | undefined;
    feedback: FeedbackRuntimeState | undefined;
    repair: RepairState | undefined;
    sourceChange: SourceChangeSlice;
    resident: ResidentState | undefined;
}>;
export declare const walkingStateFromRuntime: (state: RuntimeState) => WalkingSkeletonSlice;
export declare const workerStateFromRuntime: (state: RuntimeState) => WorkerEpisodeSlice;
export declare const selectWalkingSlice: (state: SkeletonState) => WalkingSkeletonSlice;
export declare const selectWorkerSlice: (state: SkeletonState) => WorkerEpisodeSlice;
export declare const selectVerificationSlice: (state: SkeletonState) => VerificationState | undefined;
export declare const selectFeedbackSlice: (state: SkeletonState) => FeedbackRuntimeState | undefined;
export declare const selectSourceChangeSlice: (state: SkeletonState) => SourceChangeSlice;
export declare const selectResidentSlice: (state: SkeletonState) => ResidentState | undefined;
export declare const kernelStateFromRuntime: (state: RuntimeState) => {
    rngState: number;
    policy: Readonly<{
        maintenance: string;
    }>;
};
/** Kernel predicates retain the full public context, including worker lease facts. */
export declare const selectPredicateState: (walking: WalkingSkeletonSlice, worker: WorkerEpisodeSlice) => RuntimeState;
export declare const artifactIdentityFromRuntime: (state: RuntimeState) => ArtifactIdentityV1 | null;
export declare const hasFeedbackState: (state: RuntimeState) => boolean;
export declare function skeletonStateFromRuntime(state: RuntimeState): SkeletonState;
export declare const sliceEventTypes: {
    readonly walking: readonly ["ArtifactIdentityEnforcementStarted", "LoadoutEquipped", "ArtifactIdentityInvalid", "ArtifactIdentityUnavailable", "ArtifactCompilationRefused", "ArtifactIdentityDrift", "UnknownScheduleRefused", "BeaconSweepRequested", "BeaconObserved", "InspectionTaskCreated", "OperatorPresenceChanged", "CadencePulse", "WorkOrderEmitted", "CommandRedispatchRequested", "CommandPersisted", "CommandRedispatched", "WorkerResultObserved", "CommandResult", "DeletionAttempted", "CommandRefused", "EpisodeTerminated", "VerificationRequested", "VerificationCompleted", "QueuedPulseNoOp", "SchedulesCancelled"];
    readonly worker: readonly ["WorkerAttemptStarted", "WorkerLeaseExpired"];
    readonly verification: readonly ["VerificationOpened", "BaselineWitnessed", "ReviewCompleted", "VerificationDispatchRequested", "CommandPersisted", "WorkerAttemptStarted", "WorkerHeartbeat", "WorkerLeaseExpired", "CommandResult", "VerificationContinuation", "VerificationSubjectSubmitted"];
    readonly feedback: readonly ["FeedbackAuditOpened", "FeedbackAuditRequested", "FeedbackAuditExecutionRequested", "CommandPersisted", "CommandResult", "OperatorCorrectionReceived", "OperatorReportsRegression", "OperatorRejectsUnsupportedAssumption", "OperatorReportsRepeatedFailure"];
    readonly repair: readonly ["RepairOpened", "RepairTick", "RepairCommandPersisted", "RepairCommandResult", "RepairDerived", "RepairCompleted", "RepairExhausted", "NeedsHuman"];
    readonly sourceChange: readonly ["SourceChangeRequested", "SourceChangeObserved", "SourceChangeRefused"];
    readonly resident: readonly ["IntentAdmitted", "IntentHeld", "IntentStepStarted", "IntentStepSettled", "ResidentConfigured", "ClockSampled", "ScriptEpisodeDispatched", "ScriptEpisodeObserved", "ScriptEpisodeLost", "ScriptEpisodeRefused", "ActorUnavailable", "OperatorPresenceObserved", "HandoffRequested", "HandoffAnswered", "CliWorkerObserved", "MissionDriftObserved", "MissionHoldCleared", "PortfolioOrderActivated", "PortfolioOrderObserved"];
};
export type FoldedSlice = keyof typeof sliceEventTypes;
export declare function selectEventSlice(state: SkeletonState, event: Event): FoldedSlice;
export declare const loadout: Loadout;
/** The skeleton owns the layout of its replayable environment state; replay and
 * the live folds read the same kernel-facing slice, so they cannot drift. */
export declare function projectRuntimeEnvironment(state: RuntimeState): Omit<KernelEnv, "now" | "predicates">;
export declare const seiriPredicates: PredicateRegistry;
export declare function compileLoadoutProgram(equipped: Loadout, baseCommit?: string): CompiledProgram;
export declare function compileWorkOrder(equipped: Loadout, baseCommit?: string): WorkOrder;
export declare const initialState: () => RuntimeState;
export declare const workOrderFromState: (state: WalkingSkeletonSlice) => WorkOrder;
export declare const commandFromState: (state: WalkingSkeletonSlice) => Command;
export declare const seiriReactor: Reactor<RuntimeState>;
export declare const expectedInspectCommandId: string;
export declare const VERIFICATION_HOST = "verification-host";
export declare const initialVerificationState: (workstreamId: string) => VerificationState;
export declare function verificationAuthorization(state: VerificationState, at: number): AuthorizationResult;
/** The one-shot planning host shares the skeleton's authority decider owner. */
export declare function planRefutationAuthorization(authority: AuthorityEnvelope, subjectHash: string, episodeId: string, phase: "read" | "report", at: number): AuthorizationResult;
/** The mission check reads a pinned capsule and returns one judgment. The same
 * grant is re-checked at completion, so an expired episode cannot report. */
export declare function missionCheckAuthorization(authority: AuthorityEnvelope, subjectHash: string, episodeId: string, at: number): AuthorizationResult;
/** The Entropy Reducer's dispatch host asks for the census read first and the
 * report emission after the return, so an episode whose window closed during
 * the review cannot file. The refuter asks for the scratch probe instead: it
 * runs reproductions rather than a census. */
export declare function entropyReviewAuthorization(authority: AuthorityEnvelope, subjectHash: string, episodeId: string, phase: "census" | "probe" | "report", at: number): AuthorizationResult;
/** Source-change hosts keep kernel decisions in the pure reactor boundary. */
export declare function sourceChangeAuthorization(...args: Parameters<typeof authorize>): ReturnType<typeof authorize>;
/** Harness adapters share the skeleton's authority decider owner. */
export declare function harnessAuthorization(authority: AuthorityEnvelope, effect: string, at: number): AuthorizationResult;
export declare const initialVerificationRuntime: (workstreamId: string) => RuntimeState;
export declare const verificationStateFromRuntime: (state: RuntimeState) => VerificationState;
export interface FeedbackRuntimeState {
    readonly workstreamId: string;
    readonly program: CompiledFeedback;
    readonly workOrder: WorkOrder;
    readonly subject: string;
    readonly authority: AuthorityEnvelope;
    readonly policy: CorrectionState;
    readonly pending: Command | null;
    readonly persisted: boolean;
    readonly result: JsonValue | null;
}
export declare function feedbackStateFromRuntime(state: RuntimeState): FeedbackRuntimeState;
