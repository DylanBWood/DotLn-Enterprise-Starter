import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";

const rulesFrom = (path) => {
  const document = JSON.parse(readFileSync(path, "utf8"));
  const rules = Array.isArray(document) ? document : document.rules;
  if (
    !Array.isArray(rules) ||
    rules.some((rule) => !rule || typeof rule.type !== "string") ||
    new Set(rules.map((rule) => rule.type)).size !== rules.length
  )
    throw new Error("Expected rules with unique types");
  return rules;
};

let match = false;
try {
  if (process.argv.length !== 4) throw new Error("Expected two JSON paths");
  const expected = rulesFrom(process.argv[2]);
  const actual = rulesFrom(process.argv[3]);
  match =
    expected.length === actual.length &&
    expected.every((rule) => {
      const found = actual.find((candidate) => candidate.type === rule.type);
      return (
        found !== undefined &&
        Object.entries(rule.parameters ?? {}).every(([key, value]) =>
          isDeepStrictEqual(value, found.parameters?.[key]),
        )
      );
    });
} catch (error) {
  console.error(error.message);
}
console.log(match ? "match" : "differ");
process.exitCode = match ? 0 : 1;
