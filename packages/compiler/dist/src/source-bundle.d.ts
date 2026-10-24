export declare const SOURCE_BUNDLE_HASH_DOMAIN = "dotln:source-bundle:v1";
export declare const SOURCE_ROLES: readonly ["reporter", "reviewer", "automation"];
export type SourceRole = (typeof SOURCE_ROLES)[number];
export type SourceSpan = {
    readonly sectionId: string;
    readonly start: number;
    readonly end: number;
} | {
    readonly entryId: string;
    readonly start: number;
    readonly end: number;
};
export interface SourceSection {
    readonly id: string;
    readonly heading?: string;
    readonly text: string;
    /** The whole section: its own id, from 0 to its text's byte length. */
    readonly span: SourceSpan;
}
export interface SourceDiscussionEntry {
    readonly id: string;
    readonly author: SourceRole;
    readonly text: string;
    /** The whole entry: its own id, from 0 to its text's byte length. */
    readonly span: SourceSpan;
    /** UTC, `YYYY-MM-DDTHH:MM:SS[.fraction]Z`; never before the previous entry. */
    readonly createdAt: string;
}
export interface SourceImage {
    readonly id: string;
    /** `sha256:` and 64 lowercase hex digits of the image bytes. */
    readonly hash: string;
    readonly altText?: string;
    readonly referencedBy: SourceSpan;
}
export interface SourceRevision {
    readonly revisionId: string;
    readonly changedSpans: readonly SourceSpan[];
}
export interface SourceBundle {
    readonly bundleId: string;
    readonly sourceKind: string;
    readonly revisionId: string;
    /** Document order. */
    readonly sections: readonly SourceSection[];
    /** Thread order. */
    readonly discussion: readonly SourceDiscussionEntry[];
    /** Sorted by id when decoded; order carries no meaning. */
    readonly images: readonly SourceImage[];
    /** History order. */
    readonly revisions: readonly SourceRevision[];
}
export interface SourceSecretShape {
    readonly shapeId: string;
    readonly description: string;
    /** A RegExp source, matched with `flags` and "g". */
    readonly pattern: string;
    readonly flags: string;
    readonly reference: string;
}
export interface SourceUrlForm {
    readonly formId: "scheme-authority" | "www-autolink";
    readonly description: string;
    readonly reference: string;
}
export interface SourceBundleFinding {
    readonly kind: "secret-shape" | "url-form" | "url-credential";
    /** The matched shape's `shapeId` or form's `formId`; never the text. */
    readonly id: string;
    /** The string holding the match in the value screened, e.g. `$.sections[0].text`. */
    readonly path: string;
    /** UTF-8 byte offsets of the match within that string. */
    readonly start: number;
    readonly end: number;
    /** Present when the string is a section's or entry's `text`. */
    readonly span?: SourceSpan;
}
export interface SourceBundleDecodeOptions {
    /** Hosts a declared URL form may name; empty refuses every URL form. */
    readonly allowedHosts: readonly string[];
}
export type SourceBundleDecodeResult = {
    readonly ok: true;
    readonly bundle: SourceBundle;
    readonly hash: string;
} | {
    readonly ok: false;
    readonly refusal: "malformed";
    /** Never carries input text beyond a field name of up to 32 letters or digits. */
    readonly path: string;
    readonly reason: string;
} | {
    readonly ok: false;
    readonly refusal: "screened";
    readonly findings: readonly SourceBundleFinding[];
};
/** The screen's declared secret shapes. A match refuses with its location. */
export declare const SOURCE_SECRET_SHAPES: readonly SourceSecretShape[];
/** The reference forms the screen reads as a URL; other text is text. */
export declare const SOURCE_URL_FORMS: readonly SourceUrlForm[];
/** Credential shapes read by the URL authority parser, independently of hosts. */
export declare const SOURCE_URL_CREDENTIAL_SHAPES: readonly [{
    readonly shapeId: "url-userinfo-password";
    readonly description: "Non-empty data after the first colon and before the last @ of a declared URL authority.";
    readonly reference: "RFC 3986 §3.2.1 (userinfo)";
}];
/** Screens every string of a decoded bundle, in field order. */
export declare function screenSourceBundle(bundle: SourceBundle, allowedHosts: readonly string[]): readonly SourceBundleFinding[];
/** Equality receipt over the canonical bundle, not a cryptographic identity. */
export declare const sourceBundleHash: (bundle: SourceBundle) => string;
/**
 * Decodes an untrusted value (parsed JSON) into a frozen SourceBundle, then
 * screens it. A malformed value refuses with the first failing path; a bundle
 * holding a declared shape or a declared URL form whose host is not allowed
 * refuses with every finding, its path indexing the value as supplied. An
 * accepted bundle is in canonical order. An invalid allowlist is a caller
 * error and throws.
 */
export declare function decodeSourceBundle(value: unknown, options: SourceBundleDecodeOptions): SourceBundleDecodeResult;
/** The text a span addresses in a decoded bundle; an unresolvable span throws. */
export declare function resolveSourceSpan(bundle: SourceBundle, value: SourceSpan): string;
