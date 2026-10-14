import type { BeaconPerceptionProfile } from "./execution-environment.js";
import type { SenseId } from "@dotln/compiler";
import type { BeaconProvenance } from "@dotln/beacons/beacon-provenance.mjs";
import type { PerceptionRead } from "./beacon-perception.js";
/** No readdir, readFile, readlink or xattr API. The host mount record supplies
 * the complete finite address set even in a search-only directory.
 */
export declare function readMountedBeacons(profile: BeaconPerceptionProfile, senses: readonly SenseId[], key?: BeaconProvenance): PerceptionRead;
