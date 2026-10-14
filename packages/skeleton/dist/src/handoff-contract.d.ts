/** Human decisions are durable inputs, never model completions. */
export interface HandoffQuestion {
    workOrderId: string;
    question: string;
    options: {
        id: string;
        label: string;
    }[];
    evidenceRefs: string[];
}
export interface HandoffPacket extends HandoffQuestion {
    episodeId: string;
}
export declare function assertHandoffQuestion(value: unknown): asserts value is HandoffQuestion;
export declare function assertHandoffPacket(value: unknown): asserts value is HandoffPacket;
