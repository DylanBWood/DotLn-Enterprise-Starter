import { canonicalStringify, normalizeLoadoutGraph } from "./normalize.js";
const rowKindOrder = {
    loadout: 0,
    identity: 1,
    role: 2,
    container: 3,
    "active-mechanic": 4,
    "support-facet": 5,
    link: 6,
    "link-group": 7,
    "explicit-pipeline": 8,
    "ambient-effect": 9,
    "resource-model": 10,
    "polar-axis": 11,
    "authority-grant": 12,
    "presence-policy": 13,
};
const compareRows = (left, right) => rowKindOrder[left.kind] - rowKindOrder[right.kind] ||
    (left.key < right.key ? -1 : left.key > right.key ? 1 : 0);
const one = (rows, kind) => {
    const matches = rows.filter((row) => row.kind === kind);
    if (matches.length !== 1)
        throw new Error(`function-table view requires exactly one ${kind} row; observed ${matches.length}`);
    return matches[0];
};
const many = (rows, kind) => rows.filter((row) => row.kind === kind);
export const defineLoadout = (definition) => ({
    view: "code-dsl",
    schemaVersion: 1,
    definition,
});
export const functionTableFromLoadout = (source) => {
    const graph = normalizeLoadoutGraph(source);
    const rows = [
        {
            kind: "loadout",
            key: graph.loadoutId,
            value: { schemaVersion: 1, loadoutId: graph.loadoutId },
        },
        {
            kind: "identity",
            key: graph.identity.identityId,
            value: graph.identity,
        },
        { kind: "role", key: graph.role.roleId, value: graph.role },
        ...graph.containers.map((value) => ({
            kind: "container",
            key: value.containerId,
            value,
        })),
        ...graph.activeMechanics.map((value) => ({
            kind: "active-mechanic",
            key: value.activeMechanicId,
            value,
        })),
        ...graph.supportFacets.map((value) => ({
            kind: "support-facet",
            key: value.supportFacetId,
            value,
        })),
        ...graph.links.map((value) => ({
            kind: "link",
            key: value.linkId,
            value,
        })),
        ...graph.linkGroups.map((value) => ({
            kind: "link-group",
            key: value.linkGroupId,
            value,
        })),
        ...graph.explicitPipelines.map((value) => ({
            kind: "explicit-pipeline",
            key: value.pipelineId,
            value,
        })),
        ...graph.ambientEffects.map((value) => ({
            kind: "ambient-effect",
            key: value.ambientEffectId,
            value,
        })),
        {
            kind: "resource-model",
            key: graph.resourceModel.resourceModelId,
            value: graph.resourceModel,
        },
        ...graph.polarAxes.map((value) => ({
            kind: "polar-axis",
            key: value.polarAxisId,
            value,
        })),
        ...(graph.authorityGrants ?? []).map((value) => ({
            kind: "authority-grant",
            key: value.grantId,
            value,
        })),
        ...(graph.presence ?? []).map((value) => ({
            kind: "presence-policy",
            key: value.policyId,
            value,
        })),
    ];
    return {
        view: "function-table",
        schemaVersion: 1,
        rows: rows.sort(compareRows),
    };
};
export const loadoutFromFunctionTable = (source) => {
    const loadout = one(source.rows, "loadout").value;
    return normalizeLoadoutGraph({
        schemaVersion: loadout.schemaVersion,
        loadoutId: loadout.loadoutId,
        identity: one(source.rows, "identity").value,
        role: one(source.rows, "role").value,
        containers: many(source.rows, "container").map((row) => row.value),
        activeMechanics: many(source.rows, "active-mechanic").map((row) => row.value),
        supportFacets: many(source.rows, "support-facet").map((row) => row.value),
        links: many(source.rows, "link").map((row) => row.value),
        linkGroups: many(source.rows, "link-group").map((row) => row.value),
        explicitPipelines: many(source.rows, "explicit-pipeline").map((row) => row.value),
        ambientEffects: many(source.rows, "ambient-effect").map((row) => row.value),
        resourceModel: one(source.rows, "resource-model").value,
        polarAxes: many(source.rows, "polar-axis").map((row) => row.value),
        authorityGrants: many(source.rows, "authority-grant").map((row) => row.value),
        ...(many(source.rows, "presence-policy").length
            ? {
                presence: many(source.rows, "presence-policy").map((row) => row.value),
            }
            : {}),
    });
};
export const statechartJsonFromLoadout = (source) => {
    const graph = normalizeLoadoutGraph(source);
    return {
        view: "statechart-json",
        schemaVersion: 1,
        id: graph.loadoutId,
        initial: "equipped",
        context: {
            identity: graph.identity,
            role: graph.role,
            resourceModel: graph.resourceModel,
            ambientEffects: graph.ambientEffects,
            polarAxes: graph.polarAxes,
            authorityGrants: graph.authorityGrants ?? [],
            ...(graph.presence?.length ? { presence: graph.presence } : {}),
        },
        states: {
            equipped: {
                containers: graph.containers,
                activeMechanics: graph.activeMechanics,
                supportFacets: graph.supportFacets,
                links: graph.links,
                linkGroups: graph.linkGroups,
                explicitPipelines: graph.explicitPipelines,
            },
        },
    };
};
export const loadoutFromStatechartJson = (source) => normalizeLoadoutGraph({
    schemaVersion: source.schemaVersion,
    loadoutId: source.id,
    identity: source.context.identity,
    role: source.context.role,
    containers: source.states.equipped.containers,
    activeMechanics: source.states.equipped.activeMechanics,
    supportFacets: source.states.equipped.supportFacets,
    links: source.states.equipped.links,
    linkGroups: source.states.equipped.linkGroups,
    explicitPipelines: source.states.equipped.explicitPipelines,
    ambientEffects: source.context.ambientEffects,
    resourceModel: source.context.resourceModel,
    polarAxes: source.context.polarAxes,
    authorityGrants: source.context.authorityGrants ?? [],
    ...(source.context.presence === undefined
        ? {}
        : { presence: source.context.presence }),
});
export const loadoutFromEditableView = (source) => {
    switch (source.view) {
        case "code-dsl":
            return normalizeLoadoutGraph(source.definition);
        case "function-table":
            return loadoutFromFunctionTable(source);
        case "statechart-json":
            return loadoutFromStatechartJson(source);
    }
};
export const normalizeCodeDslView = (source) => defineLoadout(normalizeLoadoutGraph(source.definition));
export const normalizeFunctionTableView = (source) => functionTableFromLoadout(loadoutFromFunctionTable(source));
export const normalizeStatechartJsonView = (source) => statechartJsonFromLoadout(loadoutFromStatechartJson(source));
const parsedObject = (encoded) => {
    const parsed = JSON.parse(encoded);
    if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object")
        throw new Error("editable view must decode to an object");
    return parsed;
};
export const encodeCodeDsl = (source) => canonicalStringify(normalizeCodeDslView(source));
export const decodeCodeDsl = (encoded) => {
    const parsed = parsedObject(encoded);
    if (parsed["view"] !== "code-dsl" || parsed["schemaVersion"] !== 1)
        throw new Error("expected code-dsl view schema version 1");
    return normalizeCodeDslView(parsed);
};
export const encodeFunctionTable = (source) => canonicalStringify(normalizeFunctionTableView(source));
export const decodeFunctionTable = (encoded) => {
    const parsed = parsedObject(encoded);
    if (parsed["view"] !== "function-table" || parsed["schemaVersion"] !== 1)
        throw new Error("expected function-table view schema version 1");
    return normalizeFunctionTableView(parsed);
};
export const encodeStatechartJson = (source) => canonicalStringify(normalizeStatechartJsonView(source));
export const decodeStatechartJson = (encoded) => {
    const parsed = parsedObject(encoded);
    if (parsed["view"] !== "statechart-json" || parsed["schemaVersion"] !== 1)
        throw new Error("expected statechart-json view schema version 1");
    return normalizeStatechartJsonView(parsed);
};
