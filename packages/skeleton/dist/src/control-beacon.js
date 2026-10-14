export function renderBeaconGlyphs(observations) {
    return observations
        .map(({ address, age }) => {
        const glyph = age === "stale"
            ? "◌ blurred/stale"
            : age === "absent"
                ? "○ absent"
                : age === "clock-skew"
                    ? "⚑ flagged/clock-skew"
                    : age === "malformed"
                        ? "⚑ flagged/malformed"
                        : age === "unknown-codebook"
                            ? "⚑ flagged/unknown-codebook"
                            : "✦ fresh";
        return `${glyph} ${address}`;
    })
        .join("  ");
}
