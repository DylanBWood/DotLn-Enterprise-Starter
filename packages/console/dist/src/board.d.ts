import type { BoardSources, BoardView, RoleAnswer } from "./types.js";
export declare const ROLE_ANSWERS: readonly RoleAnswer[];
/** Pure projection: no clock, filesystem, subprocess, network, or lifecycle fold. */
export declare function projectBoard(sources: BoardSources): BoardView;
