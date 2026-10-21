# WO-006 visual review

The executor inspected all 33 PNG baselines as images on 2026-10-21, then
inspected the corrected captures again. The files live in the target at
`apps/dotln-e2e/src/visual-baselines/darwin/`. The Playwright source is
`apps/dotln-e2e/src/board.visual.spec.ts` and `components.visual.spec.ts`.
This is the executor's visual inspection; the two diff reviewers did not
claim to inspect images.

## Inspected coverage

| Captures | Count | Inspection |
| --- | ---: | --- |
| Five board panels at 1280 × 900 and 390 × 844 | 10 | Heading hierarchy, tab wrapping, readable unavailable explanations, mobile reflow, visible status text, viewport edges |
| Complete actor row at desktop and mobile widths | 2 | Label/value alignment, long-value wrapping, evidence links, status and explanation grouping |
| Buttons (default, disabled and three loading variants), three badges, card, skeleton, empty state, unavailable, page header, key/value list and tabs | 15 | Typography, spacing, state distinction, focus ring, loading treatment, absence of idle animation |
| Open menu and dialog | 2 | Positioning, backdrop, disabled choices, focused item, close action spacing |
| Projected shell, unavailable board and unsupported-version page | 3 | Landmarks' visual hierarchy, framing, empty/error-state readability |
| Open source/evidence area | 1 | Source labels, explanation wrapping, disclosure spacing and readable provenance |

The plain skin uses a light warm surface, dark text, a restrained green accent
and a blue focus ring. Labels remain subordinate to their values, while status
is always textual. The board stays fluid without a fixed page-width cap.
The narrow captures retain readable lists instead of compressing values into
columns. Emoji remain native glyphs with text equivalents.

## Findings and corrections

- The first disabled-button capture looked too similar to an enabled button.
  Its inactive non-busy state now has a muted surface and border.
- Disabled menu and tab choices did not dim because Angular Aria expresses
  disability with `aria-disabled`. Their styles now select that attribute;
  the menu uses hard-disabled items so keyboard navigation skips them. The
  browser test checks selection, skip, dismissal and restored trigger focus.
- The dialog's close action crowded the projected content. A separate action
  region adds spacing and right alignment. The corrected image was inspected,
  and real-browser focus trapping, restoration and axe checks passed.
- Global links differed between the app and catalog. The application now uses
  the same accent treatment, inspected in the shell and source disclosure.
- An element screenshot of a long source disclosure included a misleading
  fixed skip-link artifact. The persistent test now scrolls the source heading
  into view and captures the viewport, with an explicit unfocused skip-link
  assertion. The final capture has an unclipped heading and no artifact.

The final deliberate baseline refresh finished at 2026-10-21T13:27:02Z.
The comparison run without updates finished at 13:29:09Z with all 33 tests
passing. The complete preflight and review gate subsequently compare the same
tracked baselines; their results are in the implementation evidence.

## Limits

The reviewed environment is macOS with the lockfile's Playwright/Chromium,
local Inter font assets, reduced motion and waits for font readiness. A
separate macOS CI job is configured; remote CI has not run in this executor
phase. No Linux pixel-baseline claim is made. The behavioral and axe suite is
cross-platform. The 0.1% pixel tolerance detects visual regressions; these
image inspections establish the initial baseline's visual acceptability.
