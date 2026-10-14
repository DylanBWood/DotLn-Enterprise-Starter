import { type AuthorityGrant, type LoadoutGraph, type PrecedenceLayer, type SupportFacet } from "../src/index.js";
export declare const authorityGrant: AuthorityGrant;
export declare const authoritySupport: (id: string, layer?: PrecedenceLayer, value?: "allow" | "deny", effect?: string) => SupportFacet;
export declare const authorityFixture: (supports?: readonly SupportFacet[], grants?: readonly AuthorityGrant[]) => LoadoutGraph;
