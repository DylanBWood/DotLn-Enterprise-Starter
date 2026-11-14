export type Syntax = typeof import("typescript/unstable/ast");
export type SyntaxNode = import("typescript/unstable/ast").Node;
export type SyntaxFile = import("typescript/unstable/ast").SourceFile;
export type SourceToken = {
    kind: number;
    text: string;
    value: string;
    start: number;
    end: number;
    comment?: true;
};
export type SourceComment = {
    start: number;
    end: number;
    line: number;
    block: boolean;
    body: string;
};
export type SourceLiteral = {
    kind: "regex" | "string" | "template";
    start: number;
    end: number;
    line: number;
    text: string;
};
export type SourceTree = {
    path: string;
    file: SyntaxFile;
    errors: number[];
    line: (offset: number) => number;
};
/** The TypeScript version whose scanner rules these readers were judged on. */
export declare const SOURCE_READER_TYPESCRIPT = "7.0.2";
/** TypeScript's syntax module (its `SyntaxKind` and scanner), loaded on first
 * use. A version other than the pinned one refuses: the rules below that tell
 * a regular expression from a division were judged on that scanner.
 * @returns {Syntax} */
export declare function sourceSyntax(): Syntax;
/** The line, counted from 1, that holds each offset of `text`.
 * @param {string} text
 * @returns {(offset: number) => number} */
export declare function lineReader(text: string): (offset: number) => number;
/**
 * The tokens of a source in order: `{kind, text, value, start, end}`, with
 * `comment` set on a comment, which is yielded only when `comments` is asked
 * for. A `/` after a value is division, otherwise a regular expression; a `}`
 * closing `${` resumes its template; both are decided from the code tokens
 * before them, never from a comment. A position at which the scanner does not
 * advance (a `#` before a blank, which it reads as an empty private name) is
 * stepped over.
 * @param {string} text
 * @param {{comments?: boolean}} [options]
 * @returns {Generator<SourceToken>}
 */
export declare function sourceTokens(text: string, { comments }?: {
    comments?: boolean;
}): Generator<SourceToken>;
/** A source's comments: offsets, line, whether a block comment, and the body
 * between its delimiters.
 * @param {string} text
 * @returns {SourceComment[]} */
export declare function sourceComments(text: string): SourceComment[];
/** A source's literal tokens: a regular expression (its text as written,
 * slashes and flags included), a string, or a template's literal piece (its
 * text as the program builds it, escapes read).
 * @param {string} text
 * @returns {SourceLiteral[]} */
export declare function sourceLiterals(text: string): SourceLiteral[];
/** The module specifiers a source loads at run time. Skipped: `import type`,
 * `export type`, a type reference `import("x").T` (in code; JSDoc types are
 * comments), and computed specifiers, which name no file. With `dynamic`
 * false, only what the module loads when it is itself loaded: its import
 * declarations and re-exports, and no `import("x")` call, which runs only
 * where its code does.
 * @param {string} text
 * @param {{dynamic?: boolean}} [options]
 * @returns {string[]} */
export declare function sourceImports(text: string, { dynamic }?: {
    dynamic?: boolean;
}): string[];
/** The dialect a path is parsed in, or null for a path that is not source.
 * The rule reads the path's suffix alone: whatever stands before it, a name
 * of any shape or none, changes nothing. A caller that selects the sources
 * to read asks this, so that it selects exactly what `sourceTrees` parses.
 * @param {string} path */
export declare const sourceDialect: (path: string) => ".js" | ".jsx" | ".ts" | ".tsx" | null;
/** Every node under `node`, itself first, in source order. JSDoc is comment
 * text and is not walked.
 * @param {SyntaxNode} node
 * @returns {Generator<SyntaxNode>} */
export declare function sourceNodes(node: SyntaxNode): Generator<SyntaxNode>;
export declare const sourceTreeStarts: () => number;
/**
 * Syntax trees for a batch of sources, from one start of the compiler's API:
 * for each input `{path, source}`, `{path, file, errors, line}` with the
 * parsed file (every node carries its parent), the line of each syntax error
 * the parser reported and a reader from offsets to lines; null for a path
 * that is not JavaScript or TypeScript. The sources are given to the compiler
 * as text in a virtual file system: it never reads the working tree.
 * @param {readonly {readonly path: string, readonly source: string}[]} inputs
 * @returns {(SourceTree | null)[]}
 */
export declare function sourceTrees(inputs: readonly {
    readonly path: string;
    readonly source: string;
}[]): (SourceTree | null)[];
/**
 * The literal tokens and comments of one parsed file, read with the grammar:
 * the tree tells a literal from code, so the scanner reads only the code
 * between literals, where a comment can stand. The feedback audit reads its
 * boundary's comments this way, as it did before this module existed, since
 * code misread as a comment would hide a behavior change from it.
 * @param {SyntaxFile} file
 * @returns {{literals: (SourceLiteral & {node: SyntaxNode})[], comments: SourceComment[]}}
 */
export declare function treeTokens(file: SyntaxFile): {
    literals: (SourceLiteral & {
        node: SyntaxNode;
    })[];
    comments: SourceComment[];
};
