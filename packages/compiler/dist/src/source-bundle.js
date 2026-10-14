import { canonicalStringify, compareText, fnv1a64 } from "./normalize.js";
/*
 * SourceBundle v1 (WO-060): the immutable input of the `SourceAdapter` port
 * (product 03 §Ports), one tracked-work artifact's sections, discussion, image
 * references and revisions, positively decoded.
 *
 * A span `{ sectionId | entryId, start, end }` is a half-open range of UTF-8
 * byte offsets into that section's or entry's `text`, on code point
 * boundaries. An author is a role label, never an identity. An image is a
 * reference by content hash; the bundle never carries image bytes.
 *
 * The screen is a declared filter, not a detector of every secret: it refuses
 * the shapes in SOURCE_SECRET_SHAPES and each SOURCE_URL_FORMS reference whose
 * host is not on the allowlist supplied at decode time, and any other string
 * passes, such as an unprefixed 40-hex token, a JWT without the Bearer word or
 * a password in the userinfo of a URL whose host is allowed.
 */
export const SOURCE_BUNDLE_HASH_DOMAIN = "dotln:source-bundle:v1";
export const SOURCE_ROLES = ["reporter", "reviewer", "automation"];
const freeze = (value) => {
    if (value !== null && typeof value === "object") {
        for (const child of Object.values(value))
            freeze(child);
        Object.freeze(value);
    }
    return value;
};
const GITHUB_FORMATS = "GitHub Docs, About authentication to GitHub, §GitHub's token formats";
const GITHUB_2021 = "GitHub Blog, Behind GitHub's new authentication token formats (2021-04-05): base62, 30 random characters and a 6-character checksum";
const githubToken = (shapeId, prefix, kind) => ({
    shapeId,
    description: `A GitHub ${kind}: ${prefix} and at least 36 base62 characters.`,
    pattern: `${prefix}[A-Za-z0-9]{36,}`,
    flags: "u",
    reference: `${GITHUB_FORMATS}; ${GITHUB_2021}`,
});
/** The screen's declared secret shapes. A match refuses with its location. */
export const SOURCE_SECRET_SHAPES = freeze([
    {
        shapeId: "private-key-block",
        description: "A PEM or OpenPGP armor header whose label ends in PRIVATE KEY, in any case, such as -----BEGIN RSA PRIVATE KEY----- or -----BEGIN PGP PRIVATE KEY BLOCK-----.",
        pattern: String.raw `-----BEGIN (?:[!-,.-~]+[ -])*PRIVATE KEY(?: BLOCK)?-----`,
        flags: "iu",
        reference: "RFC 7468 §2 and §3 (encapsulation boundary and label); RFC 4880 §6.2 (armor header line)",
    },
    {
        shapeId: "bearer-credential",
        description: "The word Bearer, in any case, then spaces or tabs and a token of at least twenty b64token characters before any = padding.",
        pattern: String.raw `\bbearer[ \t]+[A-Za-z0-9._~+/-]{20,}=*`,
        flags: "iu",
        reference: "RFC 6750 §2.1 (b64token and the Bearer credentials); RFC 9110 §11.1 (the scheme name is case-insensitive)",
    },
    githubToken("github-personal-access-token", "ghp_", "personal access token (classic)"),
    {
        shapeId: "github-fine-grained-personal-access-token",
        description: "A GitHub fine-grained personal access token: github_pat_ and at least one token character. GitHub documents no length for this type.",
        pattern: "github_pat_[A-Za-z0-9_]+",
        flags: "u",
        reference: GITHUB_FORMATS,
    },
    githubToken("github-oauth-access-token", "gho_", "OAuth access token"),
    githubToken("github-user-to-server-token", "ghu_", "user-to-server token (a user access token for a GitHub App)"),
    {
        shapeId: "github-server-to-server-token",
        description: "A GitHub server-to-server token (an installation access token for a GitHub App), in the current and the stateless ghs_APPID_JWT format.",
        pattern: String.raw `ghs_[A-Za-z0-9\.\-_]{36,}`,
        flags: "u",
        reference: `${GITHUB_FORMATS}; GitHub Changelog, GitHub App installation tokens: Per-request override header (2026-05-15, regex updated 2026-05-26), the recommended regex`,
    },
    githubToken("github-refresh-token", "ghr_", "refresh token (for a GitHub App)"),
]);
/** The reference forms the screen reads as a URL; other text is text. */
export const SOURCE_URL_FORMS = freeze([
    {
        formId: "scheme-authority",
        description: "A scheme (letters, digits, +, - and . from its first letter), then :// and a non-empty authority. Further / or \\ after :// are skipped. The authority ends at / \\ ? # < > ^ | whitespace or a control character, less trailing . , ; : ! ' \" ` * _ ~ ) ] }; its host follows the last @ and precedes a :port.",
        reference: "RFC 3986 §3 and §3.2; WHATWG URL Standard, special authority ignore slashes state",
    },
    {
        formId: "www-autolink",
        description: "www. in any case, then a letter, digit, _ or -, at the start of a string or after whitespace, *, _, ~ or (, and outside an authority already read. Its host is read as an authority from the first w.",
        reference: "GitHub Flavored Markdown Spec §6.9, Autolinks (extension): extended www autolink",
    },
]);
const shapeMatchers = SOURCE_SECRET_SHAPES.map((shape) => ({
    shape,
    expression: new RegExp(shape.pattern, `${shape.flags}g`),
}));
// ------------------------------------------------------------ positive decoder
class Malformed extends Error {
    path;
    reason;
    constructor(path, reason) {
        super(`source bundle: ${path}: ${reason}`);
        this.path = path;
        this.reason = reason;
    }
}
const refuse = (path, reason) => {
    throw new Malformed(path, reason);
};
const fieldPath = (path, key) => /^[A-Za-z][A-Za-z0-9]{0,31}$/u.test(key) ? `${path}.${key}` : `${path}[*]`;
const record = (value, path, required, optional = []) => {
    if (value === null || typeof value !== "object" || Array.isArray(value))
        return refuse(path, "expected an object");
    for (const key of Object.keys(value))
        if (!required.includes(key) && !optional.includes(key))
            refuse(fieldPath(path, key), "unexpected field");
    for (const key of required)
        if (!Object.hasOwn(value, key))
            refuse(`${path}.${key}`, "missing field");
    return value;
};
const list = (value, path) => Array.isArray(value) ? value : refuse(path, "expected an array");
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u;
const SOURCE_KIND = /^(?=.{1,64}$)[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/u;
const IMAGE_HASH = /^sha256:[0-9a-f]{64}$/u;
const TIMESTAMP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?Z$/u;
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
const identifier = (value, path) => typeof value === "string" && IDENTIFIER.test(value)
    ? value
    : refuse(path, "expected an identifier of 1 to 128 letters, digits, ., _, : or -");
/** Multi-line text: tab, line feed and carriage return are its only controls. */
const text = (value, path) => {
    if (typeof value !== "string")
        return refuse(path, "expected a string");
    if (LONE_SURROGATE.test(value))
        refuse(path, "expected well-formed Unicode");
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value))
        refuse(path, "control character");
    return value;
};
/** One non-blank line without control characters. */
const line = (value, path) => {
    const content = text(value, path);
    if (content.includes("\t"))
        refuse(path, "control character");
    if (/[\n\r\u2028\u2029]/u.test(content))
        refuse(path, "expected one line");
    if (!content.trim())
        refuse(path, "expected a non-blank line");
    return content;
};
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** A comparable key for a valid UTC timestamp. */
const timestamp = (value, path) => {
    const parts = typeof value === "string" ? TIMESTAMP.exec(value) : null;
    if (!parts)
        return refuse(path, "expected a UTC timestamp");
    const [year, month, day, hour, minute, second] = parts
        .slice(1, 7)
        .map(Number);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = month === 2 && leap ? 29 : (DAYS[month - 1] ?? 0);
    if (day < 1 || day > days || hour > 23 || minute > 59 || second > 59)
        refuse(path, "expected a UTC timestamp");
    return `${parts.slice(1, 7).join("")}${(parts[7] ?? "").padEnd(9, "0")}`;
};
const encoder = new TextEncoder();
const boundary = (bytes, offset) => offset === bytes.length || ((bytes[offset] ?? 0) & 0xc0) !== 0x80;
const span = (value, path, targets, own) => {
    const fields = record(value, path, ["start", "end"], ["sectionId", "entryId"]);
    const keys = ["sectionId", "entryId"].filter((key) => Object.hasOwn(fields, key));
    if (keys.length !== 1)
        return refuse(path, "expected exactly one of sectionId or entryId");
    const key = keys[0];
    const id = identifier(fields[key], `${path}.${key}`);
    if (own && (key !== own.target.key || id !== own.id))
        return refuse(`${path}.${key}`, "expected its own id");
    const target = own ? own.target : targets.get(id);
    if (target?.key !== key)
        return refuse(`${path}.${key}`, `no ${key === "sectionId" ? "section" : "entry"} has this id`);
    const offset = (field) => {
        const content = fields[field];
        if (typeof content !== "number" ||
            !Number.isSafeInteger(content) ||
            content < 0)
            return refuse(`${path}.${field}`, "expected a non-negative integer");
        if (content > target.bytes.length)
            return refuse(`${path}.${field}`, "beyond the end of the text");
        if (!boundary(target.bytes, content))
            return refuse(`${path}.${field}`, "inside a UTF-8 character");
        return content;
    };
    const start = offset("start");
    const end = offset("end");
    if (end < start)
        refuse(`${path}.end`, "before start");
    return key === "sectionId"
        ? { sectionId: id, start, end }
        : { entryId: id, start, end };
};
/** A section's or entry's own span covers exactly its whole text. */
const ownSpan = (value, path, id, target) => {
    const decoded = span(value, path, new Map(), { id, target });
    if (decoded.start !== 0)
        refuse(`${path}.start`, "expected the whole text");
    if (decoded.end !== target.bytes.length)
        refuse(`${path}.end`, "expected the whole text");
    return decoded;
};
const spanKey = (value) => "sectionId" in value
    ? ["section", value.sectionId, value.start, value.end]
    : ["entry", value.entryId, value.start, value.end];
const compareSpans = (left, right) => {
    const [a, b] = [spanKey(left), spanKey(right)];
    return (compareText(a[0], b[0]) ||
        compareText(a[1], b[1]) ||
        a[2] - b[2] ||
        a[3] - b[3]);
};
/** Set-like collections in canonical order; everything else keeps its order. */
const canonicalOrder = (bundle) => ({
    ...bundle,
    images: [...bundle.images].sort((a, b) => compareText(a.id, b.id)),
    revisions: bundle.revisions.map((revision) => ({
        ...revision,
        changedSpans: [...revision.changedSpans].sort(compareSpans),
    })),
});
function decodeStructure(value) {
    const root = record(value, "$", [
        "bundleId",
        "sourceKind",
        "revisionId",
        "sections",
        "discussion",
        "images",
        "revisions",
    ]);
    const bundleId = identifier(root["bundleId"], "$.bundleId");
    const sourceKind = root["sourceKind"];
    if (typeof sourceKind !== "string" || !SOURCE_KIND.test(sourceKind))
        refuse("$.sourceKind", "expected a lowercase kebab-case label of at most 64 characters");
    const revisionId = identifier(root["revisionId"], "$.revisionId");
    const targets = new Map();
    const itemIds = new Set();
    const newItemId = (content, path) => {
        const id = identifier(content, path);
        if (itemIds.has(id))
            refuse(path, "duplicate id");
        itemIds.add(id);
        return id;
    };
    const sections = list(root["sections"], "$.sections").map((entry, index) => {
        const path = `$.sections[${index}]`;
        const fields = record(entry, path, ["id", "text", "span"], ["heading"]);
        const id = newItemId(fields["id"], `${path}.id`);
        const heading = fields["heading"] === undefined
            ? undefined
            : line(fields["heading"], `${path}.heading`);
        const body = text(fields["text"], `${path}.text`);
        const target = { key: "sectionId", bytes: encoder.encode(body) };
        const own = ownSpan(fields["span"], `${path}.span`, id, target);
        targets.set(id, target);
        return heading === undefined
            ? { id, text: body, span: own }
            : { id, heading, text: body, span: own };
    });
    let previous = "";
    const discussion = list(root["discussion"], "$.discussion").map((entry, index) => {
        const path = `$.discussion[${index}]`;
        const fields = record(entry, path, [
            "id",
            "author",
            "text",
            "span",
            "createdAt",
        ]);
        const id = newItemId(fields["id"], `${path}.id`);
        const author = fields["author"];
        if (!SOURCE_ROLES.includes(author))
            refuse(`${path}.author`, "expected a role label: reporter, reviewer or automation");
        const body = text(fields["text"], `${path}.text`);
        const target = { key: "entryId", bytes: encoder.encode(body) };
        const own = ownSpan(fields["span"], `${path}.span`, id, target);
        const createdAt = fields["createdAt"];
        const order = timestamp(createdAt, `${path}.createdAt`);
        if (order < previous)
            refuse(`${path}.createdAt`, "before the previous entry");
        previous = order;
        targets.set(id, target);
        return {
            id,
            author: author,
            text: body,
            span: own,
            createdAt,
        };
    });
    const images = list(root["images"], "$.images").map((entry, index) => {
        const path = `$.images[${index}]`;
        const fields = record(entry, path, ["id", "hash", "referencedBy"], ["altText"]);
        const id = newItemId(fields["id"], `${path}.id`);
        const hash = fields["hash"];
        if (typeof hash !== "string" || !IMAGE_HASH.test(hash))
            refuse(`${path}.hash`, "expected sha256: and 64 lowercase hex digits");
        const altText = fields["altText"] === undefined
            ? undefined
            : line(fields["altText"], `${path}.altText`);
        const referencedBy = span(fields["referencedBy"], `${path}.referencedBy`, targets);
        if (referencedBy.start === referencedBy.end)
            refuse(`${path}.referencedBy.end`, "expected a non-empty span");
        return altText === undefined
            ? { id, hash: hash, referencedBy }
            : { id, hash: hash, altText, referencedBy };
    });
    const revisionIds = new Set();
    const revisions = list(root["revisions"], "$.revisions").map((entry, index) => {
        const path = `$.revisions[${index}]`;
        const fields = record(entry, path, ["revisionId", "changedSpans"]);
        const id = identifier(fields["revisionId"], `${path}.revisionId`);
        if (revisionIds.has(id))
            refuse(`${path}.revisionId`, "duplicate revision id");
        revisionIds.add(id);
        const seen = new Set();
        const changedSpans = list(fields["changedSpans"], `${path}.changedSpans`).map((content, spanIndex) => {
            const spanPath = `${path}.changedSpans[${spanIndex}]`;
            const decoded = span(content, spanPath, targets);
            const key = JSON.stringify(spanKey(decoded));
            if (seen.has(key))
                refuse(spanPath, "duplicate span");
            seen.add(key);
            return decoded;
        });
        return { revisionId: id, changedSpans };
    });
    // Input order, so a finding's path names the field the caller sent.
    return {
        bundleId,
        sourceKind: sourceKind,
        revisionId,
        sections,
        discussion,
        images,
        revisions,
    };
}
// ---------------------------------------------------------------------- screen
const HOSTNAME = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$/u;
const lowerAscii = (value) => value.replace(/[A-Z]/gu, (letter) => letter.toLowerCase());
/** Validates the caller's allowlist; a caller error throws. */
const allowlist = (hosts) => {
    if (!Array.isArray(hosts))
        throw new Error("source bundle screen: allowedHosts must be an array");
    return new Set(hosts.map((host, index) => {
        const name = typeof host === "string" ? lowerAscii(host) : "";
        if (!HOSTNAME.test(name))
            throw new Error(`source bundle screen: allowedHosts[${index}] is not a multi-label DNS host name with a non-numeric top-level label`);
        return name;
    }));
};
const AUTHORITY_END = /[/\\?#<>^|\s\u0000-\u001f\u007f]/u;
const TRAILING = new Set([
    ".",
    ",",
    ";",
    ":",
    "!",
    "'",
    '"',
    "`",
    "*",
    "_",
    "~",
    ")",
    "]",
    "}",
]);
/** The authority from `from`, less trailing punctuation, and its host. */
const readAuthority = (value, from) => {
    let end = from;
    while (end < value.length && !AUTHORITY_END.test(value[end]))
        end++;
    while (end > from && TRAILING.has(value[end - 1]))
        end--;
    const authority = value.slice(from, end);
    const hostPort = authority.slice(authority.lastIndexOf("@") + 1);
    const port = /:\d*$/u.exec(hostPort);
    return {
        end,
        host: lowerAscii(port ? hostPort.slice(0, port.index) : hostPort),
    };
};
const urlMatches = (value, allowed) => {
    const found = [];
    const read = [];
    for (let at = value.indexOf("://"); at !== -1; at = value.indexOf("://", at + 3)) {
        let start = at;
        while (start > 0 && /[A-Za-z0-9+.-]/u.test(value[start - 1]))
            start--;
        while (start < at && !/[A-Za-z]/u.test(value[start]))
            start++;
        if (start === at)
            continue;
        let from = at + 3;
        while (value[from] === "/" || value[from] === "\\")
            from++;
        const authority = readAuthority(value, from);
        if (authority.end === from)
            continue;
        read.push([from, authority.end]);
        if (!allowed.has(authority.host))
            found.push({
                kind: "url-form",
                id: "scheme-authority",
                start,
                end: authority.end,
            });
    }
    // Both lists ascend, so one pointer finds an enclosing scheme authority.
    let covered = 0;
    let next = 0;
    for (const match of value.matchAll(/www\./giu)) {
        const start = match.index;
        if (start > 0 && !/[\s*_~(]/u.test(value[start - 1]))
            continue;
        if (!/[A-Za-z0-9_-]/u.test(value[start + 4] ?? ""))
            continue;
        while (next < read.length && read[next][1] <= start)
            next++;
        if (start < covered || (next < read.length && read[next][0] <= start))
            continue;
        const authority = readAuthority(value, start);
        covered = authority.end;
        if (!allowed.has(authority.host))
            found.push({
                kind: "url-form",
                id: "www-autolink",
                start,
                end: authority.end,
            });
    }
    return found;
};
/** UTF-8 byte offset of every UTF-16 index of a well-formed string. */
const byteOffsets = (value) => {
    const offsets = new Uint32Array(value.length + 1);
    let bytes = 0;
    for (let index = 0; index < value.length; index++) {
        offsets[index] = bytes;
        const unit = value.charCodeAt(index);
        bytes +=
            unit < 0x80
                ? 1
                : unit < 0x800
                    ? 2
                    : unit >= 0xd800 && unit < 0xdc00
                        ? 4
                        : unit >= 0xdc00 && unit < 0xe000
                            ? 0
                            : 3;
    }
    offsets[value.length] = bytes;
    return offsets;
};
const screenString = (value, path, allowed, owner) => {
    const matches = urlMatches(value, allowed);
    for (const { shape, expression } of shapeMatchers)
        for (const match of value.matchAll(expression))
            matches.push({
                kind: "secret-shape",
                id: shape.shapeId,
                start: match.index,
                end: match.index + match[0].length,
            });
    if (!matches.length)
        return [];
    const offsets = byteOffsets(value);
    return matches
        .map((match) => {
        const start = offsets[match.start];
        const end = offsets[match.end];
        const location = { kind: match.kind, id: match.id, path, start, end };
        return owner === undefined
            ? location
            : {
                ...location,
                span: owner.key === "sectionId"
                    ? { sectionId: owner.id, start, end }
                    : { entryId: owner.id, start, end },
            };
    })
        .sort((a, b) => a.start - b.start ||
        a.end - b.end ||
        compareText(a.kind, b.kind) ||
        compareText(a.id, b.id));
};
/** Screens every string of a decoded bundle, in field order. */
export function screenSourceBundle(bundle, allowedHosts) {
    const allowed = allowlist(allowedHosts);
    const at = (value, path, owner) => (value === undefined ? [] : screenString(value, path, allowed, owner));
    return freeze([
        ...at(bundle.bundleId, "$.bundleId"),
        ...at(bundle.sourceKind, "$.sourceKind"),
        ...at(bundle.revisionId, "$.revisionId"),
        ...bundle.sections.flatMap((section, index) => [
            ...at(section.id, `$.sections[${index}].id`),
            ...at(section.heading, `$.sections[${index}].heading`),
            ...at(section.text, `$.sections[${index}].text`, {
                key: "sectionId",
                id: section.id,
            }),
        ]),
        ...bundle.discussion.flatMap((entry, index) => [
            ...at(entry.id, `$.discussion[${index}].id`),
            ...at(entry.text, `$.discussion[${index}].text`, {
                key: "entryId",
                id: entry.id,
            }),
            ...at(entry.createdAt, `$.discussion[${index}].createdAt`),
        ]),
        ...bundle.images.flatMap((image, index) => [
            ...at(image.id, `$.images[${index}].id`),
            ...at(image.hash, `$.images[${index}].hash`),
            ...at(image.altText, `$.images[${index}].altText`),
        ]),
        ...bundle.revisions.flatMap((revision, index) => at(revision.revisionId, `$.revisions[${index}].revisionId`)),
    ]);
}
// ------------------------------------------------------------------ public API
/** Equality receipt over the canonical bundle, not a cryptographic identity. */
export const sourceBundleHash = (bundle) => `fnv1a64:${fnv1a64(canonicalStringify({
    domain: SOURCE_BUNDLE_HASH_DOMAIN,
    bundle: canonicalOrder(bundle),
}))}`;
/**
 * Decodes an untrusted value (parsed JSON) into a frozen SourceBundle, then
 * screens it. A malformed value refuses with the first failing path; a bundle
 * holding a declared shape or a declared URL form whose host is not allowed
 * refuses with every finding, its path indexing the value as supplied. An
 * accepted bundle is in canonical order. An invalid allowlist is a caller
 * error and throws.
 */
export function decodeSourceBundle(value, options) {
    const allowedHosts = options?.allowedHosts;
    allowlist(allowedHosts);
    let structure;
    try {
        structure = decodeStructure(value);
    }
    catch (error) {
        if (error instanceof Malformed)
            return freeze({
                ok: false,
                refusal: "malformed",
                path: error.path,
                reason: error.reason,
            });
        throw error;
    }
    const findings = screenSourceBundle(structure, allowedHosts);
    if (findings.length)
        return freeze({ ok: false, refusal: "screened", findings });
    const bundle = canonicalOrder(structure);
    return freeze({
        ok: true,
        bundle: freeze(bundle),
        hash: sourceBundleHash(bundle),
    });
}
/** The text a span addresses in a decoded bundle; an unresolvable span throws. */
export function resolveSourceSpan(bundle, value) {
    const owner = "sectionId" in value
        ? bundle.sections.find((section) => section.id === value.sectionId)
        : bundle.discussion.find((entry) => entry.id === value.entryId);
    if (!owner)
        throw new Error("source span: no section or entry has its id");
    const bytes = encoder.encode(owner.text);
    if (!Number.isSafeInteger(value.start) ||
        !Number.isSafeInteger(value.end) ||
        value.start < 0 ||
        value.end < value.start ||
        value.end > bytes.length ||
        !boundary(bytes, value.start) ||
        !boundary(bytes, value.end))
        throw new Error("source span: outside its text or inside a UTF-8 character");
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(value.start, value.end));
}
