/**
 * Self-contained on purpose: the compiler embeds this function in each hook,
 * ahead of all runtime imports. Only Node builtins and session-local temporary
 * state participate. Do not introduce a dependency on repository health here.
 *
 * WO-158: while an override is open the session keeps the operator's own
 * prompts as its authority, and leaving it returns `overrideExit` so the
 * session hook can append OperatorOverrideRecorded naming those words, or
 * print the exact command when it cannot. Neither is a condition of the exit.
 *
 * @param {{ session_id?: string, prompt?: string, cwd?: string }} input
 * @param {string} event
 * @returns {Promise<null | { systemMessage: string, hookSpecificOutput?: { hookEventName: string, additionalContext: string }, overrideExit?: { enteredAt: string, exitedAt: string, words: string[], advisory: string } }>}
 */
export declare function operatorControl(input: {
    session_id?: string;
    prompt?: string;
    cwd?: string;
}, event: string): Promise<null | {
    systemMessage: string;
    hookSpecificOutput?: {
        hookEventName: string;
        additionalContext: string;
    };
    overrideExit?: {
        enteredAt: string;
        exitedAt: string;
        words: string[];
        advisory: string;
    };
}>;
