# WO-015 chrome comparisons

The order runs the page's chrome as the operator's eye doctor test: a pair of rendered candidates,
one independent variable per pair, the operator's preference making the next pair, until they say
the process is done. One round ran. The operator ended the process with it, so no second pair was
built, and the decisions file records the pick in [D015](../decisions.md).

## Round 1: where the inspector lives

The one variable is the inspector's place on a wide screen. Everything else on the page is the same.

| Candidate              | Caption                                                                                                                                                                                  | 1440                                                 | 360                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| A, right column (kept) | The tool rail and the inspector share one right column, so the field keeps its full height. The inspector is narrower, and a formation's slot table can sit below the fold.              | [A at 1440](round-01/A-column-1440.png)              | [A at 360](round-01/A-column-360.png)              |
| B, drawer (rejected)   | The inspector is a drawer over the field's lower edge beside a narrower rail. It gets more width, with its text and controls side by side, and covers up to 42% of the deck's height.    | [B at 1440](round-01/B-drawer-1440.png)              | [B at 360](round-01/B-drawer-360.png)              |

Both screenshots at each width show the same moment: twenty units selected, the two-level formation
tool applied, frame 53, with one unit in its slot. Below 960 pixels the page is a single column and
the two candidates are the same, which is why the two 360 images match byte for byte.

**Pick:** A. The operator chose it on the day, after playing with the app. The implementation of B
left the code when the round was decided; [the record of it](rejected-implementations.md) keeps what
it was.
