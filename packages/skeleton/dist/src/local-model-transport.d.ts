import { type TransportRequest, type TransportResultFor } from "./verification-protocol.js";
import type { TransportDispatch, WorkOrderTransport } from "./worker-transport.js";
export declare const LOCAL_MODEL_TRANSPORT: "local-model-http";
/** The availability row WO-110 dated. The label is a readiness grade, not a
 * liveness check: WO-110 observed the endpoint serve a complete, validated
 * inspection envelope on 2026-09-20, and readiness still fails because no
 * attributable non-local-egress boundary exists and WO-137 graded the runner
 * `inconclusive`. Working inference is not the readiness contract. No `ready`
 * row exists, so the catalog reports unavailable and the resident records a
 * NoOp; the transport is exercised against doubles regardless. */
export declare const LOCAL_MODEL_ROW: {
    readonly row: "L-U1";
    readonly label: "unavailable";
    readonly observedAt: "2026-09-20";
    readonly reason: "local-model endpoint unavailable: readiness is ungranted while no attributable non-local-egress boundary exists and WO-137 grades the runner inconclusive, even though WO-110 observed a live validated envelope on 2026-09-20; the operator starts the endpoint explicitly";
};
/** The native v0 path WO-137 exercised for its schema, tool and determinism rows. */
export declare const LOCAL_MODEL_COMPLETIONS_PATH = "/api/v0/chat/completions";
/** Matches the bounded capture WO-137's probe client used. */
export declare const LOCAL_MODEL_RESPONSE_LIMIT = 262144;
export declare const LOCAL_MODEL_MAX_TOKENS = 1024;
/** Observed on LM Studio 0.4.24+1 (WO-137): without `reasoning_effort: "none"`
 * a bounded token cap was spent entirely on reasoning and the answer content
 * came back empty. Temperature, top-p, seed and stop reproduce that row's fixed
 * decoding. The DotLn effort selector stays a launch claim: no other wire value
 * for reasoning effort has been observed on this runner, so none is invented. */
export declare const LOCAL_MODEL_WIRE: {
    readonly temperature: 0;
    readonly top_p: 1;
    readonly seed: 424242;
    readonly reasoning_effort: "none";
    readonly stream: false;
};
/** An explicit IPv4 loopback origin: never a DNS name, credential or route.
 * Loopback binding controls inbound connections only; it is not an egress
 * boundary, and WO-137 recorded that limit. */
export declare function localModelOrigin(value: string): string;
export declare function localModelRequestBody(request: TransportRequest, maxTokens?: number): string;
/** Validate at the host boundary: an endpoint's own schema claim is not
 * validation, exactly as for the two CLI adapters. */
export declare function decodeLocalModelResult<R extends TransportRequest>(text: string, request: R): TransportResultFor<R>;
export interface LocalModelTransportOptions {
    /** Observed runner version when the host has one; never inferred. */
    readonly version?: string;
    readonly maxTokens?: number;
    readonly timeoutMs?: number;
}
/** The third `WorkOrderTransport`. It launches no child process: the episode is
 * one bounded HTTP request, so an abort ends it with the dispatching host and
 * no disposable supervisor is required. */
export declare class LocalModelWorkOrderTransport implements WorkOrderTransport {
    readonly name: "local-model-http";
    readonly harnessVersion: string;
    readonly origin: string;
    private readonly url;
    private readonly maxTokens;
    private readonly timeoutMs;
    constructor(endpoint: string, options?: LocalModelTransportOptions);
    dispatch<R extends TransportRequest>(request: R, now: () => number): TransportDispatch<TransportResultFor<R>>;
}
