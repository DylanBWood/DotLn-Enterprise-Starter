/** Classification could not establish an effect; generated hooks advise the host. */
export declare class HarnessCommandRefused extends Error {
}
/** Effect inventory for the tools exposed by the observed harness profiles.
 * Unknown names are never presumed to be reads. Opaque shell/delegation routes
 * are delegated to host permissions when their effects cannot be classified.
 */
export declare const harnessToolEffects: {
    readonly Read: "read";
    readonly StructuredOutput: "read";
    readonly Glob: "read";
    readonly Grep: "read";
    readonly WebFetch: "read";
    readonly WebSearch: "read";
    readonly ListMcpResourcesTool: "read";
    readonly ReadMcpResourceTool: "read";
    readonly ToolSearch: "read";
    readonly Edit: "write";
    readonly Write: "write";
    readonly NotebookEdit: "write";
    readonly Bash: "shell";
    readonly Monitor: "shell";
    readonly TaskOutput: "read";
    readonly KillShell: "stop";
    readonly TaskStop: "stop";
    readonly Agent: "spawn";
    readonly Task: "spawn";
    readonly Workflow: "spawn";
    readonly Skill: "interaction";
    readonly TodoWrite: "interaction";
    readonly AskUserQuestion: "interaction";
    readonly EnterPlanMode: "interaction";
    readonly ExitPlanMode: "interaction";
    readonly exec_command: "shell";
    readonly write_stdin: "shell";
    readonly apply_patch: "write";
    readonly "functions.exec": "shell";
    readonly "collaboration.spawn_agent": "spawn";
};
/** Public token view for diagnostics; classification uses the provenance above. */
export declare function shellInvocations(source: string): string[][];
/** Normalize executable operands for admission without requiring an effect
 * adapter for every operand. Effect classification keeps its own full checks. */
export declare function executableShellInvocations(source: string): string[][];
/** WO-172: what the shell itself said about a command as written. zsh begins
 * such a line with its own name, the name of a builtin that refused and a
 * line number. The same text inside other output is not this command's
 * diagnostic, so a class counts only when the command's own words bear it
 * out, and the guidance holds only what the command itself wrote. */
export type ShellDiagnosticKind = "unmatched-pattern" | "bad-pattern" | "equals-word" | "program-not-found" | "unsplit-word" | "reserved-parameter" | "bad-substitution" | "bad-subscript" | "bad-math" | "bash-parameter" | "builtin-option" | "unmatched-quote" | "parse-error" | "missing-file" | "not-permitted" | "other";
export interface ShellDiagnostic {
    readonly kind: ShellDiagnosticKind;
    /** What the command wrote that the line is about, bounded and without
     * control or format characters; never text that only the output holds. */
    readonly written: string;
    /** How the command wrote it, where the class's guidance turns on it. */
    readonly form: string;
    /** The word with its pattern quoted, where the command's text gives one. */
    readonly remedy?: string;
}
export declare function shellDiagnostics(command: string, output: string): readonly ShellDiagnostic[];
/** The guidance for what was found, each sentence once and whole, as context
 * for the agent; `earlier` names a command that ran before the call the
 * guidance arrives with. */
export declare function shellGuidance(diagnostics: readonly ShellDiagnostic[], earlier?: boolean): string | null;
interface ShellWriteTarget {
    path: string;
    followFinalSymlink: boolean;
    redirect?: true;
}
/** Freeform patch paths are literal, including both ends of a move. */
export declare function patchWriteTargets(source: string): readonly ShellWriteTarget[] | null;
/** Bounded destination adapter for gate admission. null means the destinations
 * are opaque, never an empty write set. Keep expansion/quotation provenance;
 * arbitrary scripts and interpreters need their own reviewed path adapter.
 */
export declare function shellWriteTargets(source: string): readonly ShellWriteTarget[] | null;
/** WO-144: the shell, not the program, opens a redirect, so a literal redirect
 * is a known destination on any program. This accessor names only those; the
 * program's own effects stay opaque, and shellWriteTargets keeps its contract
 * that null means opaque for the live-gate refusal that depends on it. A
 * relative destination is named only while no earlier program outside the
 * bounded vocabulary (cd, a function, a script) could have moved the shell.
 */
export declare function shellRedirectTargets(source: string): readonly ShellWriteTarget[] | null;
export declare function shellWritePaths(source: string): readonly string[] | null;
/** The fixed read-only list a live gate admits (WO-158 criterion 6). Adding a
 * program is a later order, not a session decision. */
export declare const LIVE_GATE_READ_LIST = "cat, head, tail, wc, ls, grep, sed -n with a print-only script, git --no-pager diff|log|show|status|stash list, node scripts/harness.mjs writer --show|evidence --wait [--timeout seconds] and npm run resume --silent -- status";
/** Every stage of every pipeline and list must be on the list, with no
 * heredoc, expansion or environment prefix: a listed reader piped into an
 * unlisted writer is refused (receipt 028, criterion 6). Descriptor
 * duplication such as 2>&1 opens no file and passes. WO-168 admits four
 * argument forms that change no gate input: a quoted word that contains `<`
 * or `>`; a revision suffix (`~`, `^`, `@{…}`) in an operand of a listed Git
 * read; an input redirect from a literal path; and an output redirect whose
 * literal operand is exactly /dev/null. `<>`, `&>`, every other redirect and
 * an operator in a partly quoted word stay off the list; the destination
 * adapter judges what it can name.
 * null means not admitted; `git` says whether a Git read needs the host's
 * configured-program check, and `helper` whether a repository script runs,
 * which is reviewed only at the root. */
export declare function liveGateReads(source: string): {
    readonly git: boolean;
    readonly helper: boolean;
} | null;
/** All real commit invocations owe literal message bytes. Quoted examples and
 * search patterns never enter this path; a missing message is a named refusal.
 */
export declare function commitMessageInputs(source: string): {
    messages: string[];
    files: string[];
}[];
export declare function invocationEffects(source: string): string[];
export {};
