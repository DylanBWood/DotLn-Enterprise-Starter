import { BEHAVIOR_TAGS, COMPONENT_DEFINITION_HASH_SCHEME, canonicalStringify, compileLoadout, normalizeAuthorityGrants, } from "@dotln/compiler";
export const ARTIFACT_REFUSAL_TYPES = [
    "ArtifactIdentityUnavailable",
    "ArtifactIdentityInvalid",
    "ArtifactIdentityDrift",
    "ArtifactCompilationRefused",
    "UnknownScheduleRefused",
];
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
    ? value
    : undefined;
const exactKeys = (value, keys) => canonicalStringify(Object.keys(value).sort()) ===
    canonicalStringify([...keys].sort());
const finite = (value) => typeof value === "number" && Number.isFinite(value);
const text = (value) => typeof value === "string" && value.trim().length > 0;
const hash = (value) => typeof value === "string" && /^fnv1a64:[0-9a-f]{16}$/u.test(value);
// The host-owned grant registry is optional; when present it must normalize
// exactly as the compiler admitted it (WO-064 D006).
const grantRegistry = (value) => {
    try {
        normalizeAuthorityGrants(value);
        return true;
    }
    catch {
        return false;
    }
};
export const isCompilationEnvironment = (value) => {
    const candidate = object(value);
    if (candidate === undefined)
        return false;
    const { authorityGrantRegistry, ...required } = candidate;
    return (exactKeys(required, [
        "environmentId",
        "version",
        "capabilities",
        "repo",
        "baseCommit",
    ]) &&
        text(candidate.environmentId) &&
        finite(candidate.version) &&
        Array.isArray(candidate.capabilities) &&
        candidate.capabilities.every(text) &&
        text(candidate.repo) &&
        text(candidate.baseCommit) &&
        (authorityGrantRegistry === undefined ||
            grantRegistry(authorityGrantRegistry)));
};
export const isArtifactIdentityV1 = (value) => {
    const candidate = object(value);
    if (candidate === undefined ||
        !exactKeys(candidate, [
            "schemaVersion",
            "compilerContractVersion",
            "compilerPackageVersion",
            "semanticHash",
            "compilationEnvironment",
            "authorityExpiresAt",
            "componentDefinitions",
        ]) ||
        candidate.schemaVersion !== 1 ||
        !text(candidate.compilerContractVersion) ||
        !text(candidate.compilerPackageVersion) ||
        !hash(candidate.semanticHash) ||
        !isCompilationEnvironment(candidate.compilationEnvironment) ||
        !finite(candidate.authorityExpiresAt) ||
        !Array.isArray(candidate.componentDefinitions))
        return false;
    const keys = new Set();
    return candidate.componentDefinitions.every((value) => {
        const entry = object(value);
        if (entry === undefined ||
            !exactKeys(entry, [
                "componentKind",
                "componentId",
                "version",
                "hashScheme",
                "definitionHash",
            ]) ||
            typeof entry.componentKind !== "string" ||
            !["active-mechanic", "support-facet", "ambient-effect"].includes(entry.componentKind) ||
            !text(entry.componentId) ||
            !finite(entry.version) ||
            entry.hashScheme !== COMPONENT_DEFINITION_HASH_SCHEME ||
            !hash(entry.definitionHash))
            return false;
        const key = canonicalStringify([
            entry.componentKind,
            entry.componentId,
            entry.version,
        ]);
        if (keys.has(key))
            return false;
        keys.add(key);
        return true;
    });
};
/** The one runtime compile boundary; malformed recorded input is diagnostic data. */
export const compileArtifact = (graph, environment) => {
    try {
        if (!isCompilationEnvironment(environment))
            throw new Error("invalid compilation environment");
        return compileLoadout(graph, environment);
    }
    catch (error) {
        return {
            ok: false,
            diagnostics: [
                {
                    code: "INVALID GRAPH",
                    message: error instanceof Error ? error.message : "compilation failed",
                    missingCapabilities: [],
                    corrections: [],
                },
            ],
        };
    }
};
export const artifactIdentityDrift = (pinned, observed) => {
    const fields = [
        ["compiler-contract-version", "compilerContractVersion"],
        ["compiler-package-version", "compilerPackageVersion"],
        ["semantic-hash", "semanticHash"],
        ["component-definitions", "componentDefinitions"],
        ["compilation-environment", "compilationEnvironment"],
        ["authority-expiry", "authorityExpiresAt"],
    ];
    return fields
        .filter(([, key]) => canonicalStringify(pinned[key]) !== canonicalStringify(observed[key]))
        .map(([field]) => field);
};
/** Successful factories can mint only the v2 payload, never caller-owned pins. */
export const createLoadoutEquippedPayload = (graph, environment) => {
    const compiled = compileArtifact(graph, environment);
    return compiled.ok
        ? {
            ok: true,
            payload: {
                payloadVersion: 2,
                graph: JSON.parse(canonicalStringify(graph)),
                artifactIdentity: compiled.artifactIdentity,
            },
        }
        : compiled;
};
export const artifactIdentityInputs = (identity, equippedEventId) => [
    `artifactIdentity.semanticHash:${identity.semanticHash}`,
    `artifactIdentity.compilerContractVersion:${identity.compilerContractVersion}`,
    `artifactIdentity.compilerPackageVersion:${identity.compilerPackageVersion}`,
    `artifactIdentity.equippedEventId:${equippedEventId}`,
];
export const isArtifactRefusalType = (type) => ARTIFACT_REFUSAL_TYPES.includes(type);
export const artifactRefusalPayload = (reason, sourceEventId, equippedEventId, pinnedIdentity = null, observedIdentity = null, diagnostics = [], drift = []) => ({
    payloadVersion: 1,
    reason,
    sourceEventId,
    equippedEventId,
    pinnedIdentity,
    observedIdentity,
    diagnostics,
    drift,
});
const isCorrection = (value) => {
    const correction = object(value);
    if (correction === undefined)
        return false;
    switch (correction.kind) {
        case "provide-capability":
            return (exactKeys(correction, ["kind", "capability"]) &&
                text(correction.capability));
        case "unequip-support":
            return (exactKeys(correction, ["kind", "supportFacetId", "linkGroupId"]) &&
                text(correction.supportFacetId) &&
                text(correction.linkGroupId));
        case "link-compatible-active":
            return (exactKeys(correction, ["kind", "supportFacetId", "supportedTags"]) &&
                text(correction.supportFacetId) &&
                Array.isArray(correction.supportedTags) &&
                correction.supportedTags.every((tag) => typeof tag === "string" &&
                    BEHAVIOR_TAGS.includes(tag)));
        case "declare-explicit-pipeline":
            return (exactKeys(correction, ["kind", "linkGroupId", "supportFacetIds"]) &&
                text(correction.linkGroupId) &&
                Array.isArray(correction.supportFacetIds) &&
                correction.supportFacetIds.every(text));
        default:
            return false;
    }
};
const isDiagnostic = (value) => {
    const diagnostic = object(value);
    if (diagnostic === undefined)
        return false;
    const optional = ["activeMechanicId", "supportFacetId", "linkGroupId"];
    return (exactKeys(diagnostic, [
        "code",
        "message",
        "missingCapabilities",
        "corrections",
        ...optional.filter((key) => Object.hasOwn(diagnostic, key)),
    ]) &&
        optional.every((key) => !Object.hasOwn(diagnostic, key) || text(diagnostic[key])) &&
        typeof diagnostic.code === "string" &&
        [
            "ACTIVE INACTIVE",
            "SUPPORT INACTIVE",
            "INVALID GRAPH",
            "DECLARED SUPPORT CONFLICT",
            "HARD SUPPORT CONFLICT",
            "AMBIGUOUS SUPPORT CONFLICT",
            "NON-COMMUTING SUPPORTS",
            "SEMANTICS UNSUPPORTED",
        ].includes(diagnostic.code) &&
        text(diagnostic.message) &&
        Array.isArray(diagnostic.missingCapabilities) &&
        diagnostic.missingCapabilities.every(text) &&
        Array.isArray(diagnostic.corrections) &&
        diagnostic.corrections.every(isCorrection));
};
export const isArtifactRefusalPayload = (value) => {
    const payload = object(value);
    return (payload !== undefined &&
        exactKeys(payload, [
            "payloadVersion",
            "reason",
            "sourceEventId",
            "equippedEventId",
            "pinnedIdentity",
            "observedIdentity",
            "diagnostics",
            "drift",
        ]) &&
        payload.payloadVersion === 1 &&
        text(payload.reason) &&
        (payload.sourceEventId === null || text(payload.sourceEventId)) &&
        (payload.equippedEventId === null || text(payload.equippedEventId)) &&
        (payload.pinnedIdentity === null ||
            isArtifactIdentityV1(payload.pinnedIdentity)) &&
        (payload.observedIdentity === null ||
            isArtifactIdentityV1(payload.observedIdentity)) &&
        Array.isArray(payload.diagnostics) &&
        payload.diagnostics.every(isDiagnostic) &&
        Array.isArray(payload.drift) &&
        payload.drift.every((field) => typeof field === "string" &&
            [
                "compiler-contract-version",
                "compiler-package-version",
                "semantic-hash",
                "component-definitions",
                "compilation-environment",
                "authority-expiry",
            ].includes(field)));
};
