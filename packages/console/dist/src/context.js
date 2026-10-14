import { unavailable } from "./values.js";
/** Per-call bookkeeping only. Nothing survives projectBoard or mutates its inputs. */
export class ProjectionContext {
    evidence = new Map();
    sources = new Map();
    ref(source, record) {
        const key = JSON.stringify([source, record]);
        let entry = this.evidence.get(key);
        if (!entry) {
            entry = { id: `evidence-${this.evidence.size + 1}`, source, record };
            this.evidence.set(key, entry);
        }
        return [entry.id];
    }
    note(source) {
        this.sources.set(source.ref, {
            ref: source.ref,
            status: source.status,
            explanation: source.status === "available" ? null : source.reason,
        });
        return source;
    }
    section(id, title, source, defaultRef, project) {
        const selected = this.note(source ?? unavailable(defaultRef));
        if (selected.status === "unavailable")
            return {
                id,
                title,
                status: "unavailable",
                explanation: selected.reason,
                rows: [],
            };
        try {
            const rows = project(selected.value, selected.ref);
            return {
                id,
                title,
                status: "available",
                explanation: rows.length === 0 ? "The source records no entries" : null,
                rows,
            };
        }
        catch {
            const reason = `Unsupported or invalid ${title.toLowerCase()} source`;
            this.note(unavailable(selected.ref, reason));
            return {
                id,
                title,
                status: "unavailable",
                explanation: reason,
                rows: [],
            };
        }
    }
}
