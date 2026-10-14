import { canonicalStringify, compileBeaconSenses, } from "@dotln/compiler";
import { decodeSignalSize, decodeGroupBeaconSize, } from "@dotln/beacons/control-codebook.mjs";
export function compilePerception(declaration, authority, audience) {
    return compileBeaconSenses(declaration.senses, {
        environmentId: declaration.profileId,
        version: 1,
        capabilities: declaration.capabilities,
        repo: "host-beacon-projection",
        baseCommit: "not-applicable",
    }, authority, audience);
}
export function perceptionGate(declaration, authority, audience) {
    try {
        const compiled = compilePerception(declaration, authority, audience);
        if (!compiled.ok)
            return compiled.diagnostics.map((item) => item.message).join(" ");
        if (!compiled.program.phenotype.linkedSupportFacetIds.includes("beacon-sight"))
            return "Beacon Sight is not equipped; equip beacon-sight on the perception slot";
        if (declaration.profileId !== "beacon-perception-v1")
            return "Beacon Sight has no host environment mount/path grant";
        return null;
    }
    catch {
        return "invalid Beacon perception declaration";
    }
}
export function refusePerception(event, authority, reason) {
    return {
        authorized: false,
        refusal: {
            schemaVersion: 1,
            type: "CommandRefused",
            occurredAt: event.occurredAt,
            actorId: event.actorId,
            workstreamId: event.workstreamId,
            ...(event.episodeId ? { episodeId: event.episodeId } : {}),
            payload: {
                intentIndex: 0,
                reason,
                authorityEnvelopeId: authority.authorityEnvelopeId,
            },
        },
        trace: {
            reactorId: "beacon-permission-guard",
            reactorVersion: "1",
            branchPath: ["refused", reason],
            envInputs: [
                `authorityEnvelope:${authority.authorityEnvelopeId}`,
                "event.payload.perception",
            ],
            cadenceEvaluations: [],
        },
    };
}
/** Whitelist the edge result. Fine Spectrum is the only path to a sub-second
 * timestamp; raw stat objects and extra adapter fields never reach the log.
 */
export function projectSenseObservation(observation, fine) {
    return {
        address: observation.address,
        size: observation.size,
        mtimeMs: observation.mtimeMs === null
            ? null
            : fine
                ? observation.mtimeMs
                : Math.floor(observation.mtimeMs / 1000) * 1000,
        ...(fine && observation.mtimeNs != null
            ? { mtimeNs: observation.mtimeNs }
            : {}),
        decoded: observation.decoded,
        ...(observation.provenanceCheck
            ? { provenanceCheck: observation.provenanceCheck }
            : {}),
        fineSpectrum: fine ? "sensed" : "not-sensed",
    };
}
const addressesFor = (declaration, family) => declaration.mounts
    .filter((mount) => mount.family === family)
    .flatMap((mount) => mount.addresses.map((address) => `${mount.mountId}:${address}`))
    .sort();
/** Replay rechecks arithmetic and disclosure. The keyed outcome is a recorded
 * host observation; pure replay never asks for a secret or a filesystem read.
 */
export function validatePerception(read, declaration, keyEpoch) {
    const fine = declaration.senses.includes("fine-spectrum");
    const composition = declaration.senses.includes("composition");
    if (canonicalStringify(read.observations.map((item) => item.address).sort()) !==
        canonicalStringify(addressesFor(declaration, "individual")) ||
        (composition ? !Array.isArray(read.groups) : read.groups !== "not-sensed"))
        throw new Error("BeaconObserved differs from the mounted sense set");
    if (keyEpoch !== null &&
        (!Number.isInteger(keyEpoch) || keyEpoch < 0 || keyEpoch > 255))
        throw new Error("invalid host key epoch observation");
    const validate = (observation, group) => {
        const fields = [
            "address",
            "size",
            "mtimeMs",
            "mtimeNs",
            "decoded",
            "fineSpectrum",
            "provenanceCheck",
        ];
        if (Object.keys(observation).some((key) => !fields.includes(key)) ||
            observation.fineSpectrum !== (fine ? "sensed" : "not-sensed") ||
            (!fine &&
                (observation.mtimeNs !== undefined ||
                    (observation.mtimeMs !== null && observation.mtimeMs % 1000 !== 0))))
            throw new Error("BeaconObserved contains unsensed fields");
        if (observation.size === null
            ? observation.mtimeMs !== null || observation.mtimeNs !== undefined
            : typeof observation.size !== "string" ||
                !/^(0|[1-9][0-9]*)$/u.test(observation.size) ||
                !Number.isSafeInteger(observation.mtimeMs) ||
                (observation.mtimeNs !== undefined &&
                    (typeof observation.mtimeNs !== "string" ||
                        !/^(0|-?[1-9][0-9]*)$/u.test(observation.mtimeNs) ||
                        BigInt(observation.mtimeNs) / 1000000n !==
                            BigInt(observation.mtimeMs))))
            throw new Error("BeaconObserved contains invalid metadata values");
        const decoded = observation.size === null
            ? { status: "absent" }
            : group
                ? decodeGroupBeaconSize(BigInt(observation.size))
                : decodeSignalSize(BigInt(observation.size));
        if (canonicalStringify(decoded) !== canonicalStringify(observation.decoded))
            throw new Error("BeaconObserved decoded fields differ from captured metadata");
        if (group) {
            if (observation.provenanceCheck !== undefined)
                throw new Error("group beacons have no v3 provenance residue");
            return;
        }
        const individual = observation;
        const state = individual.decoded.status === "decoded"
            ? individual.decoded.state
            : undefined;
        const check = individual.provenanceCheck;
        const expected = !state
            ? "not-applicable"
            : state.codebookVersion !== 3
                ? "unauthenticated-legacy"
                : keyEpoch === null || state.keyEpoch !== keyEpoch
                    ? "unverifiable-provenance"
                    : null;
        if (expected
            ? check !== expected
            : check !== "residue-matched" && check !== "forged-provenance")
            throw new Error("BeaconObserved has an inconsistent residue-check outcome");
    };
    read.observations.forEach((item) => validate(item, false));
    if (Array.isArray(read.groups)) {
        if (canonicalStringify(read.groups.map((item) => item.address).sort()) !== canonicalStringify(addressesFor(declaration, "phase-group")))
            throw new Error("BeaconObserved groups differ from the mounted set");
        read.groups.forEach((item) => validate(item, true));
    }
}
/** Exactly one physical context line per equipped channel, for at most twelve
 * individual beacons and one group. No model-token estimate is claimed.
 */
export function renderBeaconPerception(read) {
    const fine = read.observations[0]?.fineSpectrum === "sensed";
    const rows = [
        JSON.stringify({
            beacons: read.observations.map(({ address, decoded, provenanceCheck, mtimeMs }) => ({
                address,
                decoded,
                provenanceCheck,
                mtimeSeconds: mtimeMs === null ? null : Math.floor(mtimeMs / 1000),
            })),
            fineSpectrum: fine ? "sensed" : "not-sensed",
            composition: read.groups === "not-sensed" ? "not-sensed" : "sensed",
        }),
    ];
    if (fine)
        rows.push(JSON.stringify({
            fineSpectrum: read.observations.map(({ address, mtimeMs, mtimeNs }) => ({
                address,
                mtimeNs: mtimeNs ??
                    (mtimeMs === null ? null : String(BigInt(mtimeMs) * 1000000n)),
            })),
        }));
    if (read.groups !== "not-sensed")
        rows.push(JSON.stringify({ composition: read.groups }));
    return rows.join("\n");
}
