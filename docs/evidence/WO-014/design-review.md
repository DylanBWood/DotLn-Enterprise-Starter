Two findings:

- **P2 — Selection updates details outside the viewport.** `catalog-page.scss:54,74` keeps the details panel at the top of a 50-row list, including placing it above the list on narrow screens. `tools.facade.ts:52` only changes selection. Selecting a lower row therefore updates an offscreen panel without scrolling or moving focus. Bring selected details into view, using focused details, inline expansion, or an appropriate responsive panel.

- **P2 — Validation failures discard actionable diagnostics.** `tools/scripts/catalog/check-catalog.mjs:266` catches every failure and prints the same generic message; the schema check at line 49 also discards Ajv’s error locations. A single invalid row among thousands cannot be located from the command output. Report a sanitized batch, JSON pointer and failure category while continuing to withhold rejected values and private paths.

Read only the two supplied packet files. No repository writes, external sources, acceptance verdict, or test design.
