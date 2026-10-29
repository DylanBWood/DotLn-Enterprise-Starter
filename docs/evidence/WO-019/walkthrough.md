# Executor walkthrough — 2026-10-28

The executor completed this session against the served optimized production build
at 2026-10-28T21:58:40Z, at 360, 768 and 1440 pixels, after the closeout repairs
and round 22's selected design. Each width used a new browser context and the
real catalog loader. This is executor evidence; the independent verifier must
repeat the session and supply their own reading in the VER report. The captures
replace the 2026-10-26 session's. They were taken before the follow-up refactors
of 22:02–22:13Z, which change no rendered output; the browser and visual suites
of the final Preflight and the review gate ran on the final tree.

The session produced 33 full-page captures, one per step and width, plus nine
reading-region captures for close inspection. Every step completed without a
page error or horizontal document overflow. The executor inspected the Arrive
tablet study and the narrow search results in addition to the executable
assertions. Search results name each work by title. Step 08's full-page captures
are taken after scrolling to the Arrive result, so the fixed "Skip to main
content" link, which sits above the visible viewport until it has focus, appears
where that viewport began; it is not visible on the page itself.

| Step | Action and observation | 360 | 768 | 1440 |
| --- | --- | --- | --- | --- |
| 01 | Open Tools; the catalog entry names the works and leads to the reading surface. | [Image](walkthrough/01-tools-360.png) | [Image](walkthrough/01-tools-768.png) | [Image](walkthrough/01-tools-1440.png) |
| 02 | Open Catalog; the shelf shows six works and the page reports 3,463 concepts. | [Image](walkthrough/02-shelf-360.png) | [Image](walkthrough/02-shelf-768.png) | [Image](walkthrough/02-shelf-1440.png) |
| 03 | Choose AI for Games; its chapter contents appear. | [Image](walkthrough/03-work-360.png) | [Image](walkthrough/03-work-768.png) | [Image](walkthrough/03-work-1440.png) |
| 04 | Open Chapter 3 Movement and section 3.7 Coordinated Movement. | [Image](walkthrough/04-contents-360.png) | [Image](walkthrough/04-contents-768.png) | [Image](walkthrough/04-contents-1440.png) |
| 05 | Open Two-level formation steering; focus moves to the reading, whose full definition, relations, hook, face sentence and starting values are present. | [Image](walkthrough/05-two-level-360.png) | [Image](walkthrough/05-two-level-768.png) | [Image](walkthrough/05-two-level-1440.png) |
| 06 | Follow Slot; its own title and complete definition replace the prior reading. | [Image](walkthrough/06-slot-360.png) | [Image](walkthrough/06-slot-768.png) | [Image](walkthrough/06-slot-1440.png) |
| 07 | Return to Two-level formation steering with the previous-reading control. | [Image](walkthrough/07-return-360.png) | [Image](walkthrough/07-return-768.png) | [Image](walkthrough/07-return-1440.png) |
| 08 | Enter the two-character query `ar`, the Objective's two keystrokes; scroll the first result page to Arrive. Global ranking places it below the initial viewport. | [Image](walkthrough/08-search-360.png) | [Image](walkthrough/08-search-768.png) | [Image](walkthrough/08-search-1440.png) |
| 09 | Open Arrive with one result click; read its definition and the soldier-scene note. The page accurately says that the scene is coming next. | [Image](walkthrough/09-arrive-360.png) | [Image](walkthrough/09-arrive-768.png) | [Image](walkthrough/09-arrive-1440.png) |
| 10 | Open the ordinary and RxJS explanations together, switch to Velocity, and jump to At rest. Distance, actual speed and desired speed all read zero. The ordinary pseudocode shows complete, with each step's lines closed. | [Image](walkthrough/10-study-360.png) | [Image](walkthrough/10-study-768.png) | [Image](walkthrough/10-study-1440.png) |
| 11 | Reload; Arrive is restored and Arrive, Two-level formation steering and Slot remain in recent readings. | [Image](walkthrough/11-reload-360.png) | [Image](walkthrough/11-reload-768.png) | [Image](walkthrough/11-reload-1440.png) |

The browser suite separately searches `arrive` and presses Enter while another
concept is open; the Objective's two-keystroke path and the Enter path are both
exercised.

## What the page taught the executor

Two-level formation steering moves an invisible anchor as if it were one
character. Each member steers to a slot defined relative to that anchor. The
anchor is held back according to the members' actual positions so it never runs
away from them. The page connects that mechanism to the anchor to member mean
distance, slot error and assignment cost. The whole definition was visible
without leaving the page; the browser test checks the complete source string.

A Slot is a position and orientation offset within the pattern that one
character is assigned to pursue with arrive and face. The page marks this
definition as the mapping worker's reading, not text checked against the
source, and its links connect it back to Two-level formation steering and on to
Slot assignment.

Arrive is seek with a desired speed that falls linearly inside a slow radius; it
derives the acceleration needed to reach that velocity within a time-to-target
and stops inside a target radius. The study makes the difference between actual
and desired velocity visible: actual velocity catches up with a request, then
falls toward zero while braking. The ordinary and reactive examples expose the
same stepping rule from two angles. The explanation sections were absent before
expansion, and two remained open together in this session.

Close-up readback: [formation, desktop](walkthrough/05-two-level-reading-1440.png),
[Slot, mobile](walkthrough/06-slot-reading-360.png),
[Arrive, tablet](walkthrough/10-study-reading-768.png).
