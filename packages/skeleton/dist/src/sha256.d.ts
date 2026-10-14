/** Pure SHA-256 over UTF-8 text. Extracted unchanged from the discovery wire
 * digest (WO-119) so the mission-check capsule can hash itself in the same
 * dependency-free way the resident folds already replay. */
export declare function sha256Text(value: string): string;
