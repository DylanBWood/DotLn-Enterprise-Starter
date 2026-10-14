import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { editionStream, storeFromLog } from "../src/collect.js";
import { available } from "../src/values.js";
export const root = fileURLToPath(new URL("../../../../", import.meta.url));
export const fixtureRoot = join(root, "packages/console/fixtures");
export const readFixtureManifest = () => JSON.parse(readFileSync(join(fixtureRoot, "manifest.json"), "utf8"));
export function loadFixture(name, manifest = readFixtureManifest()) {
    const fixture = manifest.cases[name];
    assert.ok(fixture, `unknown fixture ${name}`);
    const read = (key) => {
        const source = manifest.inputs[key];
        assert.ok(source, `input ${key} is not recorded`);
        assert.ok(!source.path.startsWith("/") && !source.path.split("/").includes(".."), "fixture inputs are repository-relative");
        const bytes = readFileSync(join(root, source.path));
        assert.equal(createHash("sha256").update(bytes).digest("hex"), source.sha256, `recorded fixture input changed: ${source.path}`);
        const text = bytes.toString("utf8");
        return {
            ref: source.ref,
            value: source.format === "json" ? JSON.parse(text) : text,
        };
    };
    const entries = [];
    for (const [key, value] of Object.entries(fixture)) {
        if (key === "stores") {
            entries.push([
                key,
                fixture.stores.map((store) => {
                    const input = read(store.input);
                    assert.equal(typeof input.value, "string");
                    // A schema 2 edition's pinned bytes carry references (WO-154).
                    const path = manifest.inputs[store.input].path;
                    return storeFromLog(store.id, store.label, available(input.ref, editionStream(root, input.value, [
                        join(dirname(path), "feedback.json"),
                    ])));
                }),
            ]);
        }
        else if (key === "controlLog") {
            entries.push([
                key,
                available("control:canonical-segments", fixture.controlLog.map((input) => {
                    const source = read(input);
                    assert.equal(typeof source.value, "string");
                    return {
                        ref: source.ref,
                        value: source.value
                            .trimEnd()
                            .split("\n")
                            .map((line) => JSON.parse(line)),
                    };
                })),
            ]);
        }
        else if (key === "refutations") {
            entries.push([
                key,
                available("docs/planning/refutations/", fixture.refutations.map(read)),
            ]);
        }
        else {
            assert.equal(typeof value, "string");
            const source = read(value);
            entries.push([key, available(source.ref, source.value)]);
        }
    }
    return Object.fromEntries(entries);
}
export function combinedFixture() {
    const demo = loadFixture("wo009"), audit = loadFixture("selfhost");
    return {
        ...demo,
        ...audit,
        ...loadFixture("control"),
        ...loadFixture("refutations"),
        stores: [...demo.stores, ...audit.stores],
    };
}
