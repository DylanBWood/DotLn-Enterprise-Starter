import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
/** The election read by the lifecycle's own reader, so a value it refuses
 * (`"on"`, `"true"`, `1`) throws the message the lifecycle prints and is never
 * read as off. An absent configuration elects nothing and loads no reader. A
 * root that carries no lifecycle feature reader (a synthetic launchpad) has
 * no lifecycle message to agree with and keeps the direct read the hook made
 * before (WO-258-D031). */
export function planFirstElected(root) {
    const configPath = join(root, "dotln.config.json");
    if (!existsSync(configPath))
        return false;
    const reader = join(root, "scripts/lib/features.mjs");
    if (!existsSync(reader)) {
        const feature = JSON.parse(readFileSync(configPath, "utf8")).features?.["plan-first"];
        return (feature === true ||
            (typeof feature === "object" && feature !== null && Boolean(feature.on)));
    }
    const { readFeatures } = createRequire(import.meta.url)(reader);
    return readFeatures(root)["plan-first"] === true;
}
/** The runtime and the lifecycle use the same freshness judgment. Off keeps
 * old consumers independent of the new helper, including historical fixtures. */
export function planFirstBoundary(root, order) {
    if (!planFirstElected(root))
        return { refusal: null };
    if (!order)
        throw new Error("plan-first requires the dispatched order");
    const api = createRequire(import.meta.url)(join(root, "scripts/lib/plan-first.mjs"));
    const state = api.selectedPlanState(root, order);
    if (!state)
        throw new Error("plan-first selected order is unavailable");
    if (state.phase !== "active")
        return { refusal: null };
    const refusal = api.planFirstRefusal(root, state);
    const context = api.planFirstContext(root, state);
    let candidate;
    try {
        candidate = api.readPlanCandidate(root, state).path;
    }
    catch {
        // A missing or invalid draft grants no outside write, but must not
        // prevent explaining and repairing it in the conversation or records.
    }
    return {
        refusal,
        ...context,
        ...(candidate ? { candidate } : {}),
    };
}
