import { type MissionSource, type MissionCheckPin, type MissionCheckSubject, type MissionClause, type MissionDecision, type MissionExclusion, type MissionObservation, type MissionThesis } from "./mission-check-protocol.js";
import { WorkerFailure } from "./worker-protocol.js";
export type { MissionSource };
/** A contract's clauses as its caller read them with the repository's
 * work-order reader: the text each field introduces (`null` when the field
 * is absent or empty) and each acceptance criterion with the number written
 * before it. */
export interface MissionContractDocument {
    readonly objective: string | null;
    readonly criteria: readonly {
        readonly number: number;
        readonly text: string;
    }[];
    readonly nonGoals: string | null;
    readonly evidenceGate: string | null;
}
/** The vision document's structure as its caller read it with the
 * repository's Markdown reader: each section's heading depth and title with
 * the text under it, and the text of each item of the list naming what DotLn
 * is not. */
export interface MissionVision {
    readonly sections: readonly {
        readonly depth: number;
        readonly title: string;
        readonly body: string;
    }[];
    readonly exclusions: readonly string[];
}
/** Reads the three documents a mission check judges into their structure.
 * This package reads no Markdown: it reads each document's bytes inside the
 * worktree's bounds and hands the text to the reader its script-side caller
 * supplies. `decisions` returns the text of each fenced JSON block, in
 * order. */
export interface MissionDocumentReader {
    readonly contract: (markdown: string) => MissionContractDocument;
    readonly decisions: (markdown: string) => readonly string[];
    readonly vision: (markdown: string) => MissionVision;
}
/** What a dispatch-time observation reads from the documents, already
 * structured: the contract and story as they read now, the decision
 * history's JSON blocks, and why that history was not carried when it was
 * not. */
export interface MissionDocuments {
    readonly contract: MissionContractDocument;
    readonly story: MissionContractDocument | null;
    readonly decisions: readonly string[];
    readonly omittedDecisions: string | null;
}
/** The documents as the resident read them before starting the episode, or
 * the refusal that read met. It crosses to the episode's process as data. */
export type MissionDocumentsResult = {
    readonly documents: MissionDocuments;
} | {
    readonly failure: {
        readonly code: WorkerFailure["code"];
        readonly detail: string | null;
    };
};
/** Bounded projection of the documented work-order shape. Prose that is not
 * one of these clauses never becomes a contract clause. */
export declare function missionClauses(contract: MissionContractDocument, declaredSurfaces: readonly string[]): readonly MissionClause[];
/** Structured decision receipts, newest last, bounded to the declared
 * window: each JSON block that parses to an object with a string `id` and
 * `decision`. */
export declare function missionDecisions(blocks: readonly string[], limit: number): readonly MissionDecision[];
/** The declared theses, each the text under the vision's level-two or
 * level-three heading of that title; a heading the vision does not carry is
 * skipped. */
export declare function missionTheses(vision: MissionVision, headings: readonly (readonly [string, string])[]): readonly MissionThesis[];
/** What DotLn is not, one exclusion per item of the vision's list. */
export declare function missionExclusions(vision: MissionVision): readonly MissionExclusion[];
/** Pinned when the actor is declared: what the episode is told the work is. */
export declare function missionPinFromSource(source: MissionSource, workOrderId: string, reader: MissionDocumentReader): MissionCheckPin;
/** The documents a dispatch-time observation judges, read now inside the
 * worktree's bounds and structured by the caller's reader. A zero decision
 * window declares that no decision is required, so none is read. */
export declare function observeMissionDocuments(source: MissionSource, reader: MissionDocumentReader): MissionDocuments;
/** The documents for the episode's process: read and structured by the
 * resident, which holds the reader, or the refusal that met them. A resident
 * started without a reader cannot judge a mission and says so. */
export declare function settleMissionDocuments(source: MissionSource, reader: MissionDocumentReader | undefined): MissionDocumentsResult;
/** The documents a resident sent with the episode, or the refusal it met,
 * raised here as the failure the episode records. */
export declare function missionDocumentsOf(result: unknown): MissionDocuments;
/** Observed at dispatch: the contract as it reads now, the current diff and
 * the last N decisions. Nothing here is a model claim. */
export declare function observeMission(source: MissionSource, pin: MissionCheckPin, documents: MissionDocuments): MissionObservation;
export declare const observeMissionSubject: (source: MissionSource, pin: MissionCheckPin, documents: MissionDocuments) => MissionCheckSubject;
