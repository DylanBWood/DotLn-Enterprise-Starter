# WO-014 repair evidence

The repair addresses VER-001's avoidable initial-bundle cost and the operator's
explicit additions recorded in D016. It preserves all nine criteria, the closed
tool contract, catalog data and declared build budgets. No commit or publication
is part of this repair.

## Dependency placement and measured alternatives

The invariant is that code only used by a lazy route stays outside the initial
static graph, while everything needed to open its filters arrives with that
route. `@dotln-angular/ui/menu` exposes the menu and the controlled filter
composite. Its standalone menu imports the overlay providers; the eager UI
provider retains shared accessibility behavior without globally importing the
overlay module.

[Bundle comparison](bundle-comparison.json) retains matched production builds
and per-package input attribution. The base is the actual merged predecessor
`83184879358a30a60596aea983d587ed5681ea9d`, extracted into scratch without creating
a repository and built with the same installed toolchain/dependencies.

| Arm | Initial raw bytes | Interpretation |
| --- | ---: | --- |
| Merged base | 495404 | No Tools feature yet; no menu-with-Tools invariant applies. |
| Failed candidate | 530371 | Menu code enters the initial graph. |
| Package metadata experiment | 530411 | Does not remove the leak; experiment reverted. |
| Menu secondary entry only | 504648 | Menu implementation is lazy but the global overlay provider still costs startup bytes. |
| Secondary entry plus scoped overlay providers | 452497 | Removes the route-only dependency cost without another menu request. |
| Curated utility exports | 376903 | Removes unused wildcard namespace exports while retaining the previous placement. |
| Final repair | 376913 | Includes the final composition and keyboard/pointer correction. |

The curated-export comparison saves **75,594 initial bytes** with menu placement
held constant. The combined repair saves 153,458 bytes against the failed
candidate and 118,491 against the merged base. Angular reports 376.91 kB raw /
102.65 kB estimated transfer in the repaired build. Estimated transfer is not
the sampler server's measured gzip response. Input attribution precedes final
optimization, so its values do not sum to output bytes.

The new build check follows transitive static JS/CSS edges, refuses menu,
catalog code or data in the initial graph, and requires menu code in the Tools
closure. Its tests include a data leak and a second dynamic menu boundary not
quoted by the verifier. The browser regression starts on Board, follows the
actual Catalog link, confirms menu code arrives there, and checks filter
opening/selection needs no further script. All eight catalog chunks keep their
recorded bytes and hashes; [final chunk verification](repair-catalog-chunks.json) compares them with [catalog-chunks.json](catalog-chunks.json).

## Useful composition and type contracts

The repeated label/menu/value block is a controlled shared filter composite.
Its two stories and runtime test cover its inputs and selection output. It
stays in the lazy menu entry point. Work choices come from the complete loaded
catalog, so a later work needs no duplicate feature list; a regression adds a
later work and verifies filtering does not shrink the available choices. Three
unrelated translation values retain their literal characters.

`firstThree` composes curried work and status selectors through `R.pipe`.
Selectors publish an explicit readonly-array contract rather than exposing an
internal overload type from the utility adapter. The compiler caught that
declaration issue after runtime tests passed, and the contract was corrected.
The combined interactive filter remains one pass; isolated option mapping and
filtering stay native where there is no composition benefit.

`RA.isNonEmptyString` validates selected values, as the operator clarified in
D021. Its result must be `true` because unknown input can be a curried
placeholder; membership is checked separately. Regression cases cover empty,
whitespace, boxed, numeric, object and placeholder inputs. The production utility
surface is limited to `R.filter/map/pipe` and `RA.isNonEmptyString`; test-only
placeholders do not widen it. Runtime key checks and compiler assertions cover
the public surface as well as the existing upstream-derived behavior specs.

## Performance evidence and limits

The read-only research worker reviewed Google's requested Core Web Vitals page
and adjacent primary sources, including current soft-navigation guidance. The
target's `docs/dev-reference/architecture/performance.md` records those sources,
their date and a practical calibration process. The inherited byte/style
thresholds are engineering guardrails, not Google requirements. Ordinary
attribution, optimization and justified budget maintenance remain with the
implementing session; genuine scope/product decisions still belong to the
operator.

The sampler serves the production build and local board fixture on loopback
with precompressed gzip, records cold Board → Catalog, direct Catalog and warm
reuse, and retains five samples per desktop/constrained profile. Its output
records environment, build/fixture hashes, every action, resource timings,
diagnostic LCP/CLS/Event Timing and long-work observations. Its Event Timing
maximum is not INP, and completion durations include automation/observation
overhead. Timings are nonblocking until repeatability is calibrated. Scripted
behavior and loading assertions block. A local pass cannot establish real-visit
p75 Core Web Vitals.

The sampler exposed cold-load layout shifts in shared translation and board
loading geometry. D020 and `FUP-cc72e6b187cbb0ab` retain the source rectangles,
proposed comparison, visual/error-state coverage and reopening condition. The
initial pilot's constrained CLS was approximately 0.158 for direct Catalog and
0.618 for Board, above the local 0.1 diagnostic goal; warm Catalog was zero.
These observations are disclosed, not converted into an all-performance pass.

The final [30-sample record](performance-samples.json), completed at
2026-10-26T02:00:50.700Z, retains every observation and source rectangle.
All scripted assertions passed. Each cell below is median (minimum–maximum);
times are milliseconds. Warm journeys have no fresh document LCP or initial-ready
measurement. The constrained profile uses 4× CPU slowdown, 1.6 Mbps down,
750 kbps up and 150 ms latency; the browser is Chromium 156.0.8078.4.

| Profile / journey | LCP candidate | Initial ready | CLS | Event maximum | Longest action |
| --- | ---: | ---: | ---: | ---: | ---: |
| desktop / board-to-catalog | 84 (84–96) | 106 (106–131) | 0.947 (0.158–0.947) | 48 (24–56) | 147 (113–182) |
| desktop / direct-catalog | 80 (68–104) | 134 (123–226) | 0.158 (0.158–0.158) | 24 (24–24) | 115 (111–121) |
| desktop / warm-catalog | — | — | 0.000 (0.000–0.000) | 24 (24–24) | 83 (83–101) |
| constrained / board-to-catalog | 2056 (2044–2064) | 2140 (2121–2171) | 0.618 (0.618–0.618) | 88 (56–96) | 2012 (1996–2030) |
| constrained / direct-catalog | 1768 (1764–1772) | 3139 (3129–3157) | 0.158 (0.158–0.158) | 64 (64–72) | 160 (148–172) |
| constrained / warm-catalog | — | — | 0.000 (0.000–0.000) | 48 (48–56) | 123 (116–133) |

The cold Board desktop CLS range is particularly variable; it needs the
recorded loading-layout comparison, not a conclusion from the LCP candidate.
Cold direct Catalog becomes useful later than its initial LCP candidate under
constraint because it still loads the route and catalog. These measurements do
not support a claim that every user journey meets a performance target.

## Reusable operator direction

[Operator guidance](../../operator/implementation-guidance.md) is linked from
the mandatory operator record. It covers this repair plus earlier execution
and verification: semantic honesty, bounded revisits, resource allocation,
cross-area modeling and diagnoses, useful composition, curated typed helpers,
automatic bounded comparisons, evidence-led budgets and artifact ownership.
The order-specific cap and criterion amendment are distinguished from reusable
defaults.

The [planning handoff](planning-handoff.md) includes a paste-ready platform
request if no supported local interaction mechanism exists. The bounded kit
inspection found identity, authority narrowing and grants in the Contributor
overlay interface; product 08's publication overlay is a separate feature.
`FUP-ea16db0faba5126e` retains the extension-contract investigation. This repair
adds no core integration or message to another service.

## Keyboard and pointer interaction

The expanded constrained sampler exposed a concrete menu defect. When arrow
navigation scrolled the long transform list, another item moved under a
stationary pointer. Angular Aria's mouseover handler immediately moved active
selection and DOM focus there. One failed sample expected `squad.form` while
both active and hovered items were `formation.fixed`. Programmatic item focus
also proved unsuitable as a substitute for Aria's navigation state.

The same research worker independently read the installed implementation and
confirmed the mechanism and absence of a public hover-focus switch. The bounded
wrapper repair observes keyboard input before Aria handles it, suppresses only
stationary-pointer mouseover in the owned menu during keyboard navigation, and
allows deliberate pointer movement and pointerdown to resume pointer input.
Coordinate comparison also lets a displaced pointer's first hover through when
mouseover precedes pointermove. The [failed trace](keyboard-failure.json) also
exposed fractional PointerEvent coordinates versus integer compatibility
MouseEvent coordinates; comparison normalizes both to integer CSS pixels.
Clicks, native scrolling, focus events and
Aria's selection/navigation handlers remain intact. Destruction removes all
listeners. [Angular Menu API](https://angular.dev/api/aria/menu/Menu) and
[pointer boundary events](https://www.w3.org/TR/pointerevents3/#boundary-events-caused-by-layout-changes)
support the source diagnosis.

The browser regression keeps a pointer inside the long menu at 4× CPU slowdown,
uses End, Home and repeated arrows, asserts focus and selected filter values,
then checks pointer hover/click and Escape. A separate touch case selects a value
by tap. The sampler continues using actual keys with its pointer left in place;
moving it away would conceal the defect.

## Verification record

The final repair preflight and gate receipts are recorded separately from the
original failed candidate's evidence. The handoff names the current passing
target tree and launchpad rows. Early failed invocations are not counted as
passing evidence: an incorrectly forwarded npm argument was corrected, the
compiler declaration leak was fixed, and the sampler's keyboard sequence was
strengthened to use actual navigation keys rather than programmatic item focus.

The [repair preflight](repair-preflight.json) passed all fifteen target commands,
including 76 uncached browser cases and all 30 production journey samples.
The shared menu, composite and utility changes passed the full compiler check.
Formal target and launchpad gate receipts are linked from the final handoff.

[Repair target gates](repair-target-gates.json) pass at the same target tree in
plain and review modes, including browser and normal visual comparison, with
no target-byte or HEAD mutation. The [complete launchpad review](repair-launchpad-gate.json)
passes seven fresh tasks. The final handoff distinguishes these current rows
from the initial candidate's historical evidence. A malformed D021 dispatch
label was corrected after the first document preflight refused it; the next
fourteen-task document preflight passed before the target gates began.
