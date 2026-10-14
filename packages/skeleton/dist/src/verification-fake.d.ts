import type { VerificationTask } from "@dotln/compiler";
import { type EvidenceWorkerResult, type EvidenceWorkerRequest, type TransportRequest, type TransportResultFor } from "./verification-protocol.js";
import type { TransportDispatch, WorkOrderTransport } from "./worker-transport.js";
/** Deterministic test double. All inputs and witnesses remain labeled synthetic. */
export declare function fixtureVerificationResult(capsule: VerificationTask, episodeId: string, resultId: string): EvidenceWorkerResult;
export declare class FakeVerificationTransport implements WorkOrderTransport<EvidenceWorkerRequest> {
    readonly name: "fake";
    readonly harnessVersion = "not-applicable";
    dispatch<R extends TransportRequest>(request: R, now: () => number): TransportDispatch<TransportResultFor<R>>;
}
