import type { AuthorityEnvelope } from "@dotln/compiler";
export declare const TARGET_PUBLICATION_EFFECTS: readonly ["repo.push", "pr.open"];
export declare function targetPublicationRefusal(profile: AuthorityEnvelope, workstreamId: string, now: number): string | null;
