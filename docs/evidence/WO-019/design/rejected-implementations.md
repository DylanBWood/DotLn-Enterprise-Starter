# Rejected implementation approaches

This is a reconstruction guide for the alternatives judged during WO-019, not
an executable archive. The operator authorized high-level implementation evidence
on 2026-10-26 and amended criterion 6 through D014. The screenshots preserve the
actual rendered candidates; [rounds.json](rounds.json) records their labels and
preferences. Historical images retain the state at capture time, including the
font-order mistake corrected in D012.

All paths below are relative to `libs/features/tools/src/lib/` in the target.
The rejected branches, inputs and stories were removed during execution after
the operator's decisions. New comparisons inherit the selected design.

| Round | Judged alternative no longer implemented | How it was built |
| --- | --- | --- |
| 01 | Contents above the reading | `layouts/catalog-layout` switched a `strip` class through an input. A two-column grid put the shelf at left, contents above the reading at right; tablet rules stacked the contents across both columns. `composites/contents-list` accepted `horizontal`, with wrapping flex lists for chapters and sections. The chosen side layout uses the three-column desktop grid and its responsive stack. |
| 02 | Unshown typography trial | A preliminary serif/sans story pair was superseded; it has no operator preference. Preserve its images as an unshown experiment, not a rejected operator choice. |
| 03 | Continuous essay | `composites/arrive-study` selected an `essay` template branch. All four explanation components appeared under headings and used unconditional defer triggers. The selected version uses native disclosures and expansion-triggered loading. |
| 04 | One explanation open at a time | Each native `details` received the same `name` attribute, letting the browser close its peers. The selected version omits that attribute. The operator reconfirmed several open together after the folder-order audit. |
| 05 | Either visual alone | An `illustration` input showed only the movement sketch or only the velocity chart. The operator wanted both ways of understanding the concept. Both visuals remain supported through the selected view switch. |
| 06 | Both visuals simultaneously | The `combined` branch rendered both SVGs, with a CSS maximum height of 15rem on each. The selected version renders the active Movement or Velocity view over shared time state. |
| 07 | Time controls above the visual | A shared `ng-template` was inserted before or after the SVG through `NgTemplateOutlet`. The selected controls now appear directly after the figure caption. |
| 08 | Labels drawn directly on the movement sketch | The SVG conditionally rendered labels for the slowing zone, target, character and both velocities, using positions derived from the character's x coordinate. Additional label selectors changed colour and narrow-screen font size. The selected separate legend remains. |
| 09 | Collapsed headings without previews | Each summary conditionally omitted its explanatory preview span. The selected summary always includes its short preview. |
| 10 | Related links near the definition | `composites/concept-reading` inserted one relations template at alternate outlets. The selected links now render once, as the last article content after application details and the scene note. The earlier interpretation that placed them only after the study was also corrected. |
| 11 | Confounded font-and-density comparison | The compact treatment changed font family, title/body sizes and line height together. The operator rejected the test itself; no preference was inferred. Its screenshots are retained as a discarded comparison. |
| 12 | Sans-serif reading treatment | `containers/catalog-page` applied `.sans-type`, changing `--dotln-font-reading` to the UI font. The selected treatment uses the established serif reading font on concept titles, definitions and work titles. This never implied changing all body or parameter text. The corrected archive order is A sans-serif, B serif. |
| 13 | Roomier definition lines | A class changed the definition's line-height custom property between 1.8 and 1.5. The selected definition uses 1.5 directly. |
| 14 | Source note initially visible | An input bound the native disclosure's `open` property. The selected source note starts collapsed and remains available to expand. |
| 15 | Starting values in one paragraph | An input toggled whether parameter spans flowed inline or became block rows. The selected parameter rows always use block layout. |
| 16 | Semibold parameter names | A conditional class applied weight 650 to parameter names. The selected regular text uses the existing inherited weight. |
| 17 | Worked calculation fixed at the first step | The facade retained both a fixed first-step view and a current-step view. An input selected which to pass to the deferred explanation. The selected implementation retains only the current-step view, computed while that explanation is open, using the same arithmetic as the diagram. |
| 18 | Prioritize the selected source book in search | `searchReadings` temporarily accepted the stored book slug and used a book-match comparison between title-match strength and alphabetical order. The facade passed its persisted book selection. The selected implementation removes that parameter and sorts globally by match strength, then title. The alternative inferred no activity and used no time or history-count window. |
| 20 | Group all implementations under shared algorithm steps | `composites/study-explanation` used three static sections, each containing the corresponding fact from both implementations. A sequential template revision now groups those six paragraphs in two implementation sections. There was no grouping input or alternate runtime path. The operator rejected the general premise that implementations must share the same steps; future implementation explanations retain their own structure. |
| 21 | One chart per run for the late-braking comparison | `composites/study-explanation` iterated the same two trace models into separate SVGs with identical scales. The selected template draws both traces on one SVG; the separate headings and duplicated axes are removed. The model and explanation are shared, with no A/B state or story. |
| 22 | Either code arrangement alone | Sequential template revisions of `composites/study-explanation` rendered either the complete `arrivePseudocode` block before four prose-only explanations (A) or each `arrivePseudocodeParts` fragment above its explanation with no complete block (B). There was no runtime input, route or story. The operator wanted both, with the interleaved code hidden at first: the selected template renders the complete block, then each explanation with its fragment in a closed native `details`. |

Round 19 retained both the data-flow drawing and event timeline. The operator
directed a shared-space view switch, as with Movement and Velocity. Both
rendering branches are therefore selected functionality, not rejected paths;
neither has a separate A/B route, story or comparison input.

The short-lived proposal to keep the rejected strip as Storybook-only CSS was
removed when the operator amended the criterion. No separate runnable copy is
required. The remaining `Reading`, `Search`, `Untyped`, `ModelKnowledge`,
`LayoutSide` and `Study` stories demonstrate supported content states and the
selected design.
