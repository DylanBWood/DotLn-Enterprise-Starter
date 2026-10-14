import { canonicalStringify, fnv1a64, normalizeAuthorityGrants, } from "./normalize.js";
const diagnostic = (code, message) => ({
    code,
    message: `${code}: ${message}`,
    missingCapabilities: [],
    corrections: [],
});
/** The registry hash names normalized host input, never text in the graph. */
export const authorityGrantRegistryHash = (registry) => `fnv1a64:${fnv1a64(canonicalStringify({
    domain: "dotln:authority-grant-registry:v1",
    grants: normalizeAuthorityGrants(registry),
}))}`;
const admissionKey = ({ reason: _reason, ...grant }) => canonicalStringify(grant);
export function authorityDiagnostics(graph, environment) {
    const diagnostics = [];
    for (const link of graph.links) {
        const active = graph.activeMechanics.find((entry) => entry.activeMechanicId === link.activeMechanicId);
        const support = graph.supportFacets.find((entry) => entry.supportFacetId === link.supportFacetId);
        if (!active || !support)
            continue; // Ordinary link validation names these.
        const check = (id, effect, allowed, denied, baseList) => {
            if (allowed.includes(effect) && !denied.includes(effect))
                return;
            diagnostics.push({
                ...diagnostic("AUTHORITY WIDENING", `support "${support.supportFacetId}" ${id} allows "${effect}" outside active "${active.activeMechanicId}" base ${baseList} (absent or base-denied).`),
                supportFacetId: support.supportFacetId,
                activeMechanicId: active.activeMechanicId,
                linkGroupId: link.linkGroupId,
                corrections: [
                    {
                        kind: "unequip-support",
                        supportFacetId: support.supportFacetId,
                        linkGroupId: link.linkGroupId,
                    },
                    { kind: "declare-authority-grant", effect },
                ],
            });
        };
        for (const claim of support.claims) {
            if (!claim.target.startsWith("authority.") || claim.value !== "allow")
                continue;
            const effect = claim.target.slice("authority.".length);
            check(`claim "${claim.claimId}"`, effect, active.authorityEnvelope.allowedEffects, active.authorityEnvelope.deniedEffects, "authorityEnvelope.allowedEffects");
            check(`claim "${claim.claimId}"`, effect, active.workOrder.allowedOperations, active.workOrder.prohibitedOperations, "workOrder.allowedOperations");
        }
        for (const emission of support.emissions) {
            if (emission.kind !== "permission-guard")
                continue;
            for (const effect of emission.allowedEffects)
                check(`emission "${emission.emissionId}"`, effect, active.authorityEnvelope.allowedEffects, active.authorityEnvelope.deniedEffects, "authorityEnvelope.allowedEffects");
            for (const effect of emission.allowedOperations)
                check(`emission "${emission.emissionId}"`, effect, active.workOrder.allowedOperations, active.workOrder.prohibitedOperations, "workOrder.allowedOperations");
        }
    }
    let registry;
    try {
        registry = normalizeAuthorityGrants(environment.authorityGrantRegistry ?? []);
    }
    catch (error) {
        return [
            ...diagnostics,
            diagnostic("AUTHORITY GRANT UNADMITTED", `invalid host registry: ${error instanceof Error ? error.message : "invalid grant"}`),
        ];
    }
    for (const grant of graph.authorityGrants ?? []) {
        if (grant.repo !== environment.repo)
            diagnostics.push(diagnostic("INVALID GRAPH", `authorityGrants grantId "${grant.grantId}" repo must equal the compilation environment repo.`));
        const registered = registry.find((entry) => entry.grantId === grant.grantId);
        if (!registered || admissionKey(registered) !== admissionKey(grant))
            diagnostics.push(diagnostic("AUTHORITY GRANT UNADMITTED", `grant "${grant.grantId}" has no matching host registry entry for grantId, version, grantedBy, effects, operations and repo.`));
    }
    return diagnostics;
}
/** Claims have already resolved. Only admitted grants can extend these lists. */
export function applyAuthorityGrants(allowed, denied, grants, field) {
    const additions = grants.flatMap((grant) => grant[field] ?? []);
    return {
        allowed: [...new Set([...allowed, ...additions])],
        denied: denied.filter((effect) => !additions.includes(effect)),
    };
}
/** Prefix-denial exceptions cannot be represented by the unchanged kernel. */
export function grantEnvelopeDiagnostics(program) {
    const diagnostics = [];
    for (const grant of program.grants ?? []) {
        for (const [field, denied] of [
            ["effects", program.authorityEnvelope.deniedEffects],
            ["operations", program.workOrder.prohibitedOperations],
        ]) {
            for (const effect of grant[field] ?? []) {
                const wildcard = denied.find((pattern) => pattern.endsWith("*") && effect.startsWith(pattern.slice(0, -1)));
                if (wildcard)
                    diagnostics.push(diagnostic("SEMANTICS UNSUPPORTED", `authorityGrants grant "${grant.grantId}" ${field} "${effect}" cannot override wildcard denial "${wildcard}" without widening other authority.`));
            }
        }
    }
    return diagnostics;
}
export function projectAuthorityInspection(program) {
    return {
        grants: program.authorityEnvelope.allowedEffects.map((effect) => {
            const provenance = (program.grants ?? [])
                .filter((grant) => grant.effects.includes(effect))
                .map((grant) => `${grant.grantId}; ${grant.grantedBy}`);
            return provenance.length
                ? `${effect} (grant ${provenance.join(" | ")})`
                : effect;
        }),
        restrictions: [...program.authorityEnvelope.deniedEffects],
    };
}
const inspectionEffectPattern = (effect) => {
    // Match the complete literal id, including any punctuation inside it.
    const literal = effect.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    // Dots/colons extend ids internally; only trailing ones end a sentence/token.
    const boundary = String.raw `(?:(?![.:])[\s\p{P}\x60<>])`;
    return new RegExp(String.raw `(?:^|${boundary})${literal}[.:]*(?=$|${boundary})`, "u");
};
export function inspectionAuthorityDiagnostics(program) {
    const diagnostics = [];
    for (const [field, opposite] of [
        ["grants", program.authorityEnvelope.deniedEffects],
        ["restrictions", program.authorityEnvelope.allowedEffects],
    ]) {
        for (const note of program.inspection[field]) {
            for (const effect of opposite)
                if (inspectionEffectPattern(effect).test(note))
                    diagnostics.push(diagnostic("INSPECTION CONTRADICTION", `inspection.${field} note "${note}" names "${effect}" in the effective envelope's ${field === "grants" ? "deniedEffects" : "allowedEffects"}.`));
        }
    }
    return diagnostics;
}
