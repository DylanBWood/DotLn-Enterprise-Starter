# Selected design after removing rejected paths

This is a verification snapshot, not another A/B round. It carries the selected
preferences through round 17. The operator-authorized D014 amendment removes the
rejected code during execution and preserves its history in the comparison
records instead.

[Desktop](selected.png) focuses on the timeline and worked calculation.
Full-page and mobile captures are in `captures/`; [checks.json](checks.json)
records the two successful browser probes. Both widths preserved the selected
serif reading treatment, 1.5 definition line height, collapsed source note,
related links at the full article’s end, short section previews, switchable
views, controls below the legend, multiple open explanations, the calculation
following time, keyboard return to the diagram and zero horizontal overflow or
browser errors. The mobile calculation and both earlier candidate captures
were visually read back.

All 81 application/Storybook browser tests also passed after the cleanup, as did
Tools lint and unit tests, component checks, translations and browser type
checking. These are executor checks, not independent verification or final
acceptance.
