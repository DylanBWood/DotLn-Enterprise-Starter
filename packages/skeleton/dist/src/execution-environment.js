import { BEACON_METADATA_CAPABILITY, GROUP_METADATA_CAPABILITY, } from "@dotln/compiler";
const safeId = (text) => /^[a-z][a-z0-9-]{0,31}$/u.test(text);
/** Derive compilation capabilities only from the host's mount authority record.
 * No filesystem access here: the permission guard must run before the first stat.
 */
export function declareBeaconPerception(senses, profile, audience) {
    if (!profile)
        return {
            version: 1,
            profileId: "unmounted",
            senses,
            capabilities: [],
            mounts: [],
        };
    if (profile.profileId !== "beacon-perception-v1" ||
        profile.audience !== audience ||
        profile.writableSurfaces.length ||
        profile.modelTools.length ||
        profile.narrativeSurfaces.length ||
        profile.mounts.length > 13 ||
        new Set(profile.mounts.map((mount) => mount.mountId)).size !==
            profile.mounts.length ||
        profile.mounts.some((mount) => !safeId(mount.mountId) ||
            mount.access !== "beacon-metadata" ||
            !["individual", "phase-group"].includes(mount.family) ||
            typeof mount.path !== "string" ||
            !mount.path.startsWith("/") ||
            mount.path.includes("\0") ||
            !mount.addresses.length ||
            new Set(mount.addresses).size !== mount.addresses.length ||
            mount.addresses.some((address) => !/^[a-f0-9]{64}\.beacon$/u.test(address))))
        throw new Error("beacon environment profile refused");
    const individualCount = profile.mounts
        .filter((mount) => mount.family === "individual")
        .reduce((sum, mount) => sum + mount.addresses.length, 0);
    const groupCount = profile.mounts
        .filter((mount) => mount.family === "phase-group")
        .reduce((sum, mount) => sum + mount.addresses.length, 0);
    if (individualCount > 12 || groupCount > 1)
        throw new Error("beacon environment exceeds the bounded set");
    return {
        version: 1,
        profileId: profile.profileId,
        senses,
        capabilities: [
            ...(individualCount ? [BEACON_METADATA_CAPABILITY] : []),
            ...(groupCount ? [GROUP_METADATA_CAPABILITY] : []),
        ],
        mounts: profile.mounts.map(({ mountId, access, family, addresses }) => ({
            mountId,
            access,
            family,
            addresses: [...addresses],
        })),
    };
}
