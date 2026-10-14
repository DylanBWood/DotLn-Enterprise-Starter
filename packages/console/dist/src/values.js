import { fnv1a64 } from "@dotln/compiler";
export const object = (value) => {
    if (value === null || typeof value !== "object" || Array.isArray(value))
        throw new Error("expected an object");
    return value;
};
export const array = (value) => {
    if (!Array.isArray(value))
        throw new Error("expected an array");
    return value;
};
export const string = (value) => {
    if (typeof value !== "string")
        throw new Error("expected text");
    return value;
};
export const strings = (value) => array(value).map(string);
export const number = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value))
        throw new Error("expected a finite number");
    return value;
};
export const optionalObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
export const optionalString = (value) => typeof value === "string" && value.length > 0 ? value : undefined;
export const at = (value, ...keys) => keys.reduce((part, key) => optionalObject(part)[key], value);
export const available = (ref, value) => ({
    ref,
    status: "available",
    value,
});
export const unavailable = (ref, reason = "Source not supplied") => ({ ref, status: "unavailable", reason });
export const known = (key, label, value, evidence, explanation = null) => ({ key, label, status: "known", value, explanation, evidence });
export const unknown = (key, label, evidence, explanation = "Not recorded by this source") => ({
    key,
    label,
    status: "unknown",
    value: null,
    explanation,
    evidence,
});
export const fact = (key, label, value, evidence, explanation = null) => {
    if (value === undefined || value === null || value === "unknown")
        return unknown(key, label, evidence, explanation ?? "Not recorded by this source");
    if (typeof value === "string" ||
        typeof value === "boolean" ||
        (typeof value === "number" && Number.isFinite(value)))
        return known(key, label, value, evidence, explanation);
    if (Array.isArray(value) &&
        value.every((item) => typeof item === "string" ||
            typeof item === "boolean" ||
            (typeof item === "number" && Number.isFinite(item))))
        return known(key, label, [...value], evidence, explanation);
    throw new Error("unsupported cell value");
};
/** Compact navigation keys only; projectBoard refuses duplicate targets. */
export const id = (family, key) => `${family}-${fnv1a64(key)}`;
