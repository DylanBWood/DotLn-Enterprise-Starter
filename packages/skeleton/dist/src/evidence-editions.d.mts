export type EvidenceKind = "authority" | "artifact-identity" | "verification" | "feedback";
export type EvidenceEdition = {
    workOrder: string;
    revision: string | null;
};
/** @typedef {"authority" | "artifact-identity" | "verification" | "feedback"} EvidenceKind */
/** @typedef {{workOrder: string, revision: string | null}} EvidenceEdition */
/** Select recorded evidence, independently of whichever order is active.
 * Historical comparisons keep their explicit pins. Changing this manifest
 * selects a replacement; it never regenerates or blesses that replacement.
 * @param {string} root
 * @param {EvidenceKind} kind
 * @param {EvidenceEdition} [override]
 */
export declare function currentEvidence(root: string, kind: EvidenceKind, override?: EvidenceEdition): {
    workOrder: string;
    revision: string | null;
    label: string;
    directory: string;
};
/** Preserve explicit historical CLI selection without per-caller defaults.
 * @param {string} root
 * @param {EvidenceKind} kind
 * @param {string[]} args
 */
export declare function evidenceArgs(root: string, kind: EvidenceKind, args: string[]): {
    args: (string | undefined)[];
    selection: {
        workOrder: string;
        revision: string | null;
        label: string;
        directory: string;
    };
};
/** Compare behavior source, retaining package identity and dependency shape.
 * Component release labels are not the behavior recorded by an evidence edition.
 * @param {string} path
 * @param {string} contents
 */
export declare function evidenceSourceContent(path: string, contents: string): string;
/** An edition remains the historical observation committed with its sources.
 * Compare those source bytes directly; never issue a new key or rewrite a log.
 * The caller still executes its current behavioral assertions. The comparison
 * only admits version-derived differences in immutable snapshot output.
 * @param {string} root
 * @param {string[]} evidenceFiles
 * @param {readonly string[]} sources
 */
export declare function sameEvidenceSourceContent(root: string, evidenceFiles: string[], sources: readonly string[]): boolean;
/** Evidence is append-only, including the synthetic editions.
 * @param {string | URL} path
 * @param {string} contents
 */
export declare function writeEvidenceFile(path: string | URL, contents: string): void;
/** A new revision may pin the unchanged transcript's canonical blob. Historical
 * full records remain readable; references resolve by identity, never by a
 * mutable pathname alone, and never form a reference chain.
 * @param {string} root
 * @param {string} directory */
export declare function readAuthorityEvidence(root: string, directory: string): {
    contents: string;
    recordPath: string;
    reference: any;
};
/** Keep only a reference when the selected predecessor has identical bytes;
 * an absent or damaged predecessor cannot supply a reference.
 * @param {string} root
 * @param {string} directory
 * @param {string} contents
 * @param {string} [previousDirectory] */
export declare function writeAuthorityEvidence(root: string, directory: string, contents: string, previousDirectory?: string): string;
