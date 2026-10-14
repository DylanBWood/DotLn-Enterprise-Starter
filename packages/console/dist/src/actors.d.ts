import type { BoardSection, BoardSources, StoreSource } from "./types.js";
import { ProjectionContext } from "./context.js";
export declare function projectStore(ctx: ProjectionContext, store: StoreSource): {
    actors: BoardSection;
    builds: BoardSection;
    matrices: BoardSection;
    receipts: BoardSection;
};
export declare function projectControlActors(ctx: ProjectionContext, sources: BoardSources): BoardSection;
