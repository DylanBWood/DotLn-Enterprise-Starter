/** A feedback edition's self-host stream by value: the edition's own file
 * (schema 1), or the live audit its edition record names, which a carried
 * edition keeps in another directory, rebuilt from Git (schema 2, WO-154).
 * Anything that replays the verifier stream through the verification
 * contract needs the bodies back first. */
export declare function feedbackEditionLog(root: string, directory: string, role: "audit" | "verifier"): {
    readonly ref: string;
    readonly value: string;
};
