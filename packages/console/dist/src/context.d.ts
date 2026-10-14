import type { BoardRow, BoardSection, EvidenceRecord, Source, SourceState } from "./types.js";
/** Per-call bookkeeping only. Nothing survives projectBoard or mutates its inputs. */
export declare class ProjectionContext {
    readonly evidence: Map<string, EvidenceRecord>;
    readonly sources: Map<string, SourceState>;
    ref(source: string, record: string): readonly string[];
    note<T>(source: Source<T>): Source<T>;
    section<T>(id: string, title: string, source: Source<T> | undefined, defaultRef: string, project: (value: T, ref: string) => readonly BoardRow[]): BoardSection;
}
