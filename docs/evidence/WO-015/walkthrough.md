# Executor walkthrough — 2026-10-30

The executor performed the Objective's session against the served production build at
2026-10-30T17:34:33Z to 17:37:11Z, at 1440, 768 and 360 pixels, on the final source tree: the build
was made after the last code change and before the two target gates. Each width used a new browser
context with motion on, the mode the operator plays in. A script drove the page with a real mouse,
so the marquees, clicks and right order of steps are the ones a person makes, and every step
completed with no page error and no horizontal overflow. This is executor evidence; the independent
verifier repeats the session and supplies their own reading in the VER report.

The session produced 24 full-page captures, one per step and width. The readings below are from
1440; 768 and 360 read the same but for heading variance at step 05, which is read while units are
still turning, and the first divergence frame, which depends on when the step was made.

| Step | Action and observation                                                                                                                                                                                                                       | 1440                                     | 768                                     | 360                                     |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------- | --------------------------------------- |
| 01   | Open the root. It lands on `/scene` with twenty units idling and twenty rows in the text layer.                                                                                                                                              | [Image](walkthrough/01-root-1440.png)    | [Image](walkthrough/01-root-768.png)    | [Image](walkthrough/01-root-360.png)    |
| 02   | Drag a marquee round the twelve western units. Twelve are selected, and the instruments now read those twelve.                                                                                                                               | [Image](walkthrough/02-marquee-1440.png) | [Image](walkthrough/02-marquee-768.png) | [Image](walkthrough/02-marquee-360.png) |
| 03   | Choose Flocking, read its definition in the inspector, and apply. The run starts by itself and the twelve pull together and travel.                                                                                                          | [Image](walkthrough/03-flock-1440.png)   | [Image](walkthrough/03-flock-768.png)   | [Image](walkthrough/03-flock-360.png)   |
| 04   | Click open ground to set the objective, choose Arrive and apply. The group goes there, slows and stops, and the run pauses itself 10.75 s after Apply.                                                                                       | [Image](walkthrough/04-arrive-1440.png)  | [Image](walkthrough/04-arrive-768.png)  | [Image](walkthrough/04-arrive-360.png)  |
| 05   | Escape, marquee the eight eastern units, choose the two-level tool's wedge and apply. They march to the objective and sort into slots; the count beside Apply reads 1 of 8 after 0.6 s and 8 of 8 when the run pauses itself after 32 s.     | [Image](walkthrough/05-wedge-1440.png)   | [Image](walkthrough/05-wedge-768.png)   | [Image](walkthrough/05-wedge-360.png)   |
| 06   | Press Compare. The run rewinds to the wedge and replays with the earlier branch as a ghost, two series per metric and the first divergence marked at frame 898. Keep the trial; the log reads one trial kept.                                | [Image](walkthrough/06-compare-1440.png) | [Image](walkthrough/06-compare-768.png) | [Image](walkthrough/06-compare-360.png) |
| 07   | Save, reload, and find the composition: Flocking · Arrive · Two-level formation steering, four steps and one trial. The only storage key is `dotln-angular.scene`.                                                                           | [Image](walkthrough/07-saved-1440.png)   | [Image](walkthrough/07-saved-768.png)   | [Image](walkthrough/07-saved-360.png)   |
| 08   | Open the catalog, find Flocking, and follow its "Run it in the soldier scene" link. It arrives at `/scene?tool=aifg-a:145` with Flocking chosen.                                                                                             | [Image](walkthrough/08-link-1440.png)    | [Image](walkthrough/08-link-768.png)    | [Image](walkthrough/08-link-360.png)    |

## What the metrics did

The figures read the selected units, or every unit when nothing is selected.

| At                  | Cohesion radius | Collisions | Heading variance | Time to objective |
| ------------------- | --------------- | ---------- | ---------------- | ----------------- |
| Idle, all twenty    | 55.0            | 0          | 0.84             | unknown           |
| Twelve selected     | 37.8            | 0          | 0.71             | unknown           |
| 4 s after Flocking  | 15.2            | 0          | 0.70             | unknown           |
| Arrive, stopped     | 2.8             | 0          | 0.14             | 6.1 s             |
| Eight selected      | 32.2            | 0          | 0.80             | 6.1 s             |
| Wedge, stopped      | 8.1             | 0          | 0.72             | 23.9 s            |

Flock took the twelve's radius from 37.8 to 15.2 in four seconds and Arrive to 2.8, with collisions
at zero throughout. The wedge took the eight's from 32.2 to 8.1, again with no collision at rest.
Time to objective stayed unknown until a group had arrived, then read 6.1 s for the twelve and
23.9 s for the wedge, restarted because new units had begun heading for the objective.

Compare's summaries read cohesion radius 32.2 to 8.1, collisions 0 to 0, heading variance 0.80 to
0.00 and stalled units 0 to 0. Its time to objective reads 6.1 to unknown, which is true and worth
knowing: the comparison covers the ten seconds after the split, and the wedge took 23.9 s to arrive.

## What this does not cover

The session plays the Objective's path. It does not exercise the reduced-motion path, which the
browser suite covers, nor the tools off that path, which the unit suites and the review's fuzzes
cover. The operator's own play of an earlier build on 2026-10-30 is recorded in D014.
