import { type Event } from "@dotln/kernel";
import { type ArtifactIdentityProjection } from "./artifact-audit.js";
export declare const AUDIT_RECORD_SCHEMA_VERSION: 1;
export declare const AUDIT_PROJECTION_SCHEMA_VERSION: 1;
export type AuditActionClass = "work-order-dispatch" | "authority-decision" | "external-effect" | "result" | "verification" | "recovery" | "no-op";
export interface ConsequentialActionClass {
    readonly actionClass: AuditActionClass;
    readonly sourceEventTypes: readonly string[];
    readonly requiredReferences: readonly string[];
    readonly operatorQuestion: string;
    readonly verifierQuestion: string;
}
export declare const consequentialActionClasses: readonly ConsequentialActionClass[];
type NonEmptyStrings = readonly [string, ...string[]];
interface AuditRecordBase<C extends AuditActionClass, O extends string> {
    readonly schemaVersion: typeof AUDIT_RECORD_SCHEMA_VERSION;
    readonly recordId: `audit:${string}:${C}`;
    readonly actionClass: C;
    readonly action: string;
    readonly outcome: O;
    readonly occurredAt: number;
    readonly actorId: string;
    readonly workstreamId: string;
    readonly episodeId?: string;
    readonly eventIds: NonEmptyStrings;
    readonly correlationId?: string;
    readonly causationId?: string;
}
export interface WorkOrderDispatchAuditRecord extends AuditRecordBase<"work-order-dispatch", "emitted"> {
    readonly workOrderRef: string;
}
export type AuthorityDecisionAuditRecord = (AuditRecordBase<"authority-decision", "allowed"> & {
    readonly decision: "allowed";
    readonly commandId: string;
    readonly decisionEvidence: "authority-trace-and-command-persisted" | "authorized-command-persisted";
}) | (AuditRecordBase<"authority-decision", "denied"> & {
    readonly decision: "denied";
    readonly reason: string;
    readonly authorityEnvelopeRef: string;
    readonly association: "explicit-event-link" | "derived-same-episode-time-adjacency" | "refusal-event-only";
});
export interface ExternalEffectAuditRecord extends AuditRecordBase<"external-effect", "requested" | "observed" | "unknown"> {
    readonly effectState: "requested" | "observed-result" | "unknown";
    readonly commandId?: string;
}
export type ResultAuditRecord = (AuditRecordBase<"result", "returned"> & {
    readonly resultState: "command-returned";
    readonly commandId: string;
}) | (AuditRecordBase<"result", "terminated"> & {
    readonly resultState: "episode-terminated";
});
export interface VerificationAuditRecord extends AuditRecordBase<"verification", "passed" | "failed" | "unknown"> {
    readonly verdict: "passed" | "failed" | "unknown";
    readonly subjectRef?: string;
    readonly association: "explicit-event-link" | "derived-single-request-in-scope" | "completion-event-only";
}
export interface RecoveryAuditRecord extends AuditRecordBase<"recovery", "redispatched"> {
    readonly commandId: string;
    readonly originalCommandEventId: string;
    readonly recoveryState: "redispatched";
}
export interface NoOpAuditRecord extends AuditRecordBase<"no-op", "no-op"> {
    readonly reason: string;
    readonly evidenceEventIds: NonEmptyStrings;
}
export type AuditRecord = WorkOrderDispatchAuditRecord | AuthorityDecisionAuditRecord | ExternalEffectAuditRecord | ResultAuditRecord | VerificationAuditRecord | RecoveryAuditRecord | NoOpAuditRecord;
export declare function deriveAuditRecords(events: readonly Event[]): readonly AuditRecord[];
export interface L0ReceiptEntry {
    readonly recordId: string;
    readonly action: string;
    readonly actionClass: AuditActionClass;
    readonly outcome: string;
    readonly scope: {
        readonly workstreamId: string;
        readonly episodeId?: string;
        readonly workOrderRef?: string;
        readonly commandId?: string;
    };
    readonly time: number;
    readonly actor: string;
    readonly evidenceLinks: readonly string[];
    readonly timelineLink: string;
    readonly authority?: {
        readonly decision: "allowed" | "denied";
        readonly authorityEnvelopeRef?: string;
        readonly reason?: string;
    };
}
export interface L0ReceiptProjection {
    readonly schemaVersion: typeof AUDIT_PROJECTION_SCHEMA_VERSION;
    readonly projection: "l0-receipt";
    readonly fidelity: "L0";
    readonly projectionRef: string;
    readonly governance: {
        readonly audience: readonly ["operator"];
        readonly purpose: "everyday-confirmation";
        readonly intendedAccess: "not-defined";
        readonly enforcement: "deferred";
        readonly persistenceClass: "projections";
        readonly retentionClass: "not-defined";
    };
    readonly omissions: readonly string[];
    readonly deeperProjection: {
        readonly projection: "causal-timeline";
        readonly projectionRef: string;
        readonly availability: "exists";
        readonly intendedAccess: "not-defined";
        readonly enforcement: "deferred";
    };
    readonly receipts: readonly L0ReceiptEntry[];
    readonly artifactIdentity: ArtifactIdentityProjection;
}
export declare function projectL0Receipt(records: readonly AuditRecord[], scopeOverride?: string, events?: readonly Event[]): L0ReceiptProjection;
export interface CausalTimelineProjection {
    readonly schemaVersion: typeof AUDIT_PROJECTION_SCHEMA_VERSION;
    readonly projection: "causal-timeline";
    readonly fidelity: "L1";
    readonly projectionRef: string;
    readonly governance: {
        readonly audience: readonly ["operator", "verifier"];
        readonly purpose: "causal-review";
        readonly intendedAccess: "not-defined";
        readonly enforcement: "deferred";
        readonly persistenceClass: "projections";
        readonly retentionClass: "not-defined";
    };
    readonly orderPolicy: readonly string[];
    readonly correlationGroups: readonly {
        readonly correlationId: string;
        readonly recordIds: NonEmptyStrings;
    }[];
    readonly omissions: readonly string[];
    readonly deeperProjection: {
        readonly projection: "governed-raw-json";
        readonly projectionRef: string;
        readonly availability: "exists";
        readonly intendedAccess: "restricted";
        readonly enforcement: "deferred";
    };
    readonly entries: readonly (AuditRecord & {
        readonly timelineOrdinal: number;
        readonly appendOrdinal: number;
        readonly rawEventLinks: readonly string[];
    })[];
}
export declare function projectCausalTimeline(records: readonly AuditRecord[], events: readonly Event[], scopeOverride?: string): CausalTimelineProjection;
export interface GovernedRawProjection {
    readonly schemaVersion: typeof AUDIT_PROJECTION_SCHEMA_VERSION;
    readonly projection: "governed-raw-json";
    readonly fidelity: "L4";
    readonly projectionRef: string;
    readonly governance: {
        readonly audience: readonly ["verifier"];
        readonly intendedAccess: "restricted";
        readonly enforcement: "deferred";
        readonly purpose: "bounded-audit-reconstruction";
        readonly sourcePersistenceClass: "canonical";
        readonly projectionPersistenceClass: "projections";
        readonly retentionClass: "not-defined";
    };
    readonly completeness: {
        readonly eventFieldOmissions: readonly [];
        readonly unavailable: readonly string[];
    };
    readonly events: readonly Event[];
    readonly artifactIdentity: ArtifactIdentityProjection;
}
export declare function projectGovernedRaw(events: readonly Event[], scopeOverride?: string): GovernedRawProjection;
export interface AuditProjections {
    readonly receipt: L0ReceiptProjection;
    readonly timeline: CausalTimelineProjection;
    readonly governedRaw: GovernedRawProjection;
}
export declare function projectAuditEvents(events: readonly Event[]): AuditProjections;
export declare function projectAuditLog(log: string): AuditProjections;
export declare const renderAuditProjections: (events: readonly Event[]) => string;
export {};
