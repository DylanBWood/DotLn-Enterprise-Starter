import type { BoardView } from "./types.js";
export declare const TERMINAL_WIDTH = 80;
/** Deterministic terminal columns for the board's text/CJK glyphs; no ANSI output. */
export declare function displayWidth(text: string): number;
export declare function renderTerminal(board: BoardView, width?: number): string;
export declare function renderHtml(board: BoardView): string;
