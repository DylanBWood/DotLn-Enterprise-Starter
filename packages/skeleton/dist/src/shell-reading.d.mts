export type ReadWord = {
    /**
     * The word as the command wrote it.
     */
    raw: string;
    /**
     * Where the word starts in the text read. A word of
     * a script handed to a shell or to eval spans the command that carried the
     * script, and a word of a heredoc's substitution spans that substitution.
     */
    start: number;
    /**
     * Where the word ends in the text read.
     */
    end: number;
    /**
     * What stood outside quotes, U+0000 where quoted or
     * substituted text stood.
     */
    bare: string;
    /**
     * The word without its quotes. Text the shell takes
     * as written is held in the private use area (see `writtenText`), so a `$`
     * here is one the shell expands and U+0000 stands where it substitutes a
     * command or arithmetic.
     */
    text: string;
    position: "assignment" | "control" | "head" | "argument" | "redirect" | "pattern";
    command: number;
    scope: string;
    /**
     * Inside backquotes that stand in double quotes
     * or an unquoted heredoc.
     */
    ticked: boolean;
    /**
     * Inside a substitution of a heredoc whose
     * delimiter is not quoted.
     */
    heredoc: boolean;
};
export type ReadHeredoc = {
    start: number;
    end: number;
    delimiter: string;
    /**
     * A quoted delimiter: the shell expands nothing
     * in the body.
     */
    quoted: boolean;
    /**
     * `<<-`: the shell strips the body's leading tabs.
     */
    strip: boolean;
    closed: boolean;
    command: number;
};
export type ShellReading = {
    words: ReadWord[];
    /**
     * The command outside single quotes.
     */
    plain: string;
    background: boolean;
    commands: number;
    unmatchedQuotes: readonly string[];
    incomplete: boolean;
    syntax: readonly string[];
    syntaxFaults: readonly string[];
    arithmetic: readonly string[];
    /**
     * Each comment of the text read, from its `#` to the end of its line; a
     * script handed to a shell or to eval contributes none.
     */
    comments: readonly {
        readonly start: number;
        readonly end: number;
    }[];
    /**
     * Each here-document of the text
     * read, in order; a script handed to a shell or to eval contributes none.
     */
    heredocs: readonly ReadHeredoc[];
};
export type CaseFrame = {
    stage: "header" | "pattern" | "body";
    scope: number | undefined;
};
export type HeldFrame = {
    start: number;
    bare: string;
    text: string;
    first: boolean;
    quote: string;
    parens: number;
    redirect: boolean;
    wrapper: string;
    wrapperValue: boolean;
    scope: number;
    at: number;
    ticking: boolean;
    close: string;
};
export type ReadCommand = {
    /**
     * The `NAME=value` words before its first
     * word.
     */
    assignments: string[];
    /**
     * Its words as the text wrote them, a wrapper
     * program such as env among them.
     */
    words: string[];
    /**
     * For each of its words, whether the shell
     * expands a parameter in it or substitutes a command or arithmetic.
     */
    expanded: boolean[];
    /**
     * Where its program's word starts in the text read.
     */
    start: number;
    /**
     * The here-documents it reads, in order.
     */
    heredocs: ReadHeredoc[];
};
/**
 * One word of a reading.
 * @typedef {object} ReadWord
 * @property {string} raw The word as the command wrote it.
 * @property {number} start Where the word starts in the text read. A word of
 * a script handed to a shell or to eval spans the command that carried the
 * script, and a word of a heredoc's substitution spans that substitution.
 * @property {number} end Where the word ends in the text read.
 * @property {string} bare What stood outside quotes, U+0000 where quoted or
 * substituted text stood.
 * @property {string} text The word without its quotes. Text the shell takes
 * as written is held in the private use area (see `writtenText`), so a `$`
 * here is one the shell expands and U+0000 stands where it substitutes a
 * command or arithmetic.
 * @property {"assignment" | "control" | "head" | "argument" | "redirect" | "pattern"} position
 * @property {number} command
 * @property {string} scope
 * @property {boolean} ticked Inside backquotes that stand in double quotes
 * or an unquoted heredoc.
 * @property {boolean} heredoc Inside a substitution of a heredoc whose
 * delimiter is not quoted.
 */
/**
 * A here-document: its body's offsets in the text read, without the line
 * that ends it, and the command whose input it is.
 * @typedef {object} ReadHeredoc
 * @property {number} start
 * @property {number} end
 * @property {string} delimiter
 * @property {boolean} quoted A quoted delimiter: the shell expands nothing
 * in the body.
 * @property {boolean} strip `<<-`: the shell strips the body's leading tabs.
 * @property {boolean} closed
 * @property {number} command
 */
/**
 * What the reader found in a shell text.
 * @typedef {object} ShellReading
 * @property {ReadWord[]} words
 * @property {string} plain The command outside single quotes.
 * @property {boolean} background
 * @property {number} commands
 * @property {readonly string[]} unmatchedQuotes
 * @property {boolean} incomplete
 * @property {readonly string[]} syntax
 * @property {readonly string[]} syntaxFaults
 * @property {readonly string[]} arithmetic
 * @property {readonly { readonly start: number, readonly end: number }[]} comments
 * Each comment of the text read, from its `#` to the end of its line; a
 * script handed to a shell or to eval contributes none.
 * @property {readonly ReadHeredoc[]} heredocs Each here-document of the text
 * read, in order; a script handed to a shell or to eval contributes none.
 */
/**
 * A `case` being read: which part of it the reader is in, and its scope.
 * @typedef {object} CaseFrame
 * @property {"header" | "pattern" | "body"} stage
 * @property {number | undefined} scope
 */
/**
 * The reader's state at the point a substitution opened, kept until it
 * closes.
 * @typedef {object} HeldFrame
 * @property {number} start
 * @property {string} bare
 * @property {string} text
 * @property {boolean} first
 * @property {string} quote
 * @property {number} parens
 * @property {boolean} redirect
 * @property {string} wrapper
 * @property {boolean} wrapperValue
 * @property {number} scope
 * @property {number} at
 * @property {boolean} ticking
 * @property {string} close
 */
/**
 * One command a shell text would run, by the words the text wrote.
 * @typedef {object} ReadCommand
 * @property {string[]} assignments The `NAME=value` words before its first
 * word.
 * @property {string[]} words Its words as the text wrote them, a wrapper
 * program such as env among them.
 * @property {boolean[]} expanded For each of its words, whether the shell
 * expands a parameter in it or substitutes a command or arithmetic.
 * @property {number} start Where its program's word starts in the text read.
 * @property {ReadHeredoc[]} heredocs The here-documents it reads, in order.
 */
/** The classifier could not establish a command's effect; generated hooks
 * advise the host. The word reader below throws it for a form it does not
 * split. */
export declare class HarnessCommandRefused extends Error {
}
/** Two of the shell forms the classifier leaves to the host's permissions on
 * nearly every compound call: control syntax and a dynamic substitution. */
export declare const SHELL_CONTROL_SYNTAX = "Shell control syntax requires an explicit effect adapter";
export declare const DYNAMIC_SHELL_SUBSTITUTION = "Dynamic shell substitution requires an explicit effect adapter";
export type ShellWord = {
    value: string;
    dynamic: boolean;
    quoted: boolean;
    /**
     * An unquoted, unescaped `*?[]{}~` the shell
     * may expand, or zsh's `=` expansion.
     */
    expands?: boolean;
    /**
     * An unquoted, unescaped `<` or `>` the
     * shell reads as an operator.
     */
    redirects?: boolean;
};
export type ShellInvocation = {
    words: ShellWord[];
    pipeline: readonly ShellInvocation[];
    stdin: string[];
};
/**
 * One word of a command as the classifier judges it.
 * @typedef {object} ShellWord
 * @property {string} value
 * @property {boolean} dynamic
 * @property {boolean} quoted
 * @property {boolean} [expands] An unquoted, unescaped `*?[]{}~` the shell
 * may expand, or zsh's `=` expansion.
 * @property {boolean} [redirects] An unquoted, unescaped `<` or `>` the
 * shell reads as an operator.
 */
/**
 * One command of a line, with the pipeline it stands in and what its
 * here-documents feed it.
 * @typedef {object} ShellInvocation
 * @property {ShellWord[]} words
 * @property {readonly ShellInvocation[]} pipeline
 * @property {string[]} stdin
 */
/** The programs that read a script as shell text. */
export declare const shellPrograms: Set<string>;
/** A command's words as the refusing classifier takes them: split as the
 * shell splits them, each keeping whether the shell expands it, with every
 * form the classifier cannot judge refused here, as it is met. Expansion
 * provenance is kept until effect operands and message bytes have been
 * classified; single-quoted and escaped dollars remain literal data. One
 * refusal turns on which program a command runs behind its wrappers, which
 * is the classifier's judgment: `programOf` is its answer for a command's
 * words.
 * @param {string} source
 * @param {(words: ShellWord[]) => ShellWord[]} programOf
 * @returns {ShellInvocation[]} */
export declare function shellWords(source: string, programOf: (words: ShellWord[]) => ShellWord[]): ShellInvocation[];
export declare const READ_LIMIT = 32768;
/** Thrown for a text nested deeper than the reader follows. */
export declare class ShellReadingLimit extends Error {
}
/** @param {string} text */
declare const asWritten: (text: string) => string;
/** A read word's text as the shell passes it, held characters restored. */
export declare const writtenText: typeof asWritten;
/** The command's words as the shell splits them, read without refusing any
 * form: control syntax, substitutions and heredocs are read, and a script
 * handed to a shell or to eval is read as a command of its own. Text past
 * `limit` is not read.
 * @param {string} full
 * @param {number} [depth]
 * @param {number} [limit]
 * @returns {ShellReading} */
export declare function readShellCommand(full: string, depth?: number, limit?: number): ShellReading;
/** The non-refusing reading of a shell text, or null for one nested deeper
 * than the reader follows. A hook reads one command up to the advisory's
 * length bound; `whole` reads a script of any length, as a script's reader
 * outside the hooks does.
 * @param {string} source
 * @param {{ readonly whole?: boolean }} [options]
 * @returns {ShellReading | null} */
export declare function readShellText(source: string, { whole }?: {
    readonly whole?: boolean;
}): ShellReading | null;
/** Every command of a reading, by the words the text wrote: control syntax,
 * a substitution and a script handed to a shell or to eval are read, so a
 * program inside one is found, while quoted text stays its command's
 * argument. Text the shell substitutes stands as U+0000.
 * @param {ShellReading} reading
 * @returns {ReadCommand[]} */
export declare function readCommands(reading: ShellReading): ReadCommand[];
export {};
