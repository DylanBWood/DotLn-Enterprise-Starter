import { type MissionSource, type MissionCheckPin, type MissionCheckSubject, type MissionClause, type MissionDecision, type MissionExclusion, type MissionObservation, type MissionThesis } from "./mission-check-protocol.js";
export type { MissionSource };
/** Bounded projection of the documented work-order shape. Prose that is not
 * one of these clauses never becomes a contract clause. */
export declare function missionClauses(markdown: string, declaredSurfaces: readonly string[]): readonly MissionClause[];
/** Structured decision receipts, newest last, bounded to the declared window. */
export declare function missionDecisions(markdown: string, limit: number): readonly MissionDecision[];
export declare function missionTheses(markdown: string, headings: readonly (readonly [string, string])[]): readonly MissionThesis[];
export declare function missionExclusions(markdown: string): readonly MissionExclusion[];
/** Pinned when the actor is declared: what the episode is told the work is. */
export declare function missionPinFromSource(source: MissionSource, workOrderId: string): MissionCheckPin;
/** Observed at dispatch: the contract as it reads now, the current diff and
 * the last N decisions. Nothing here is a model claim. */
export declare function observeMission(source: MissionSource, pin: MissionCheckPin): MissionObservation;
export declare const observeMissionSubject: (source: MissionSource, pin: MissionCheckPin) => MissionCheckSubject;
