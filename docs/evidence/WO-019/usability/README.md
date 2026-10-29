# Reading-session usability observations

The local production-app probe used 1,000-pixel-high viewports at widths 360,
768 and 1440. It typed `ar`, observed Arrive's result location, opened Arrive,
reloaded and observed the restored heading's location. It did not treat DOM
visibility as proof that content was inside the viewport.

Before round 18, Arrive was result 14 and outside the initial viewport at all
three widths. Round 18 now compares current-work prioritization with the prior
ordering; its own captures and tests qualify those candidates separately.

After reload, the selected Arrive content and history were restored. The heading
was inside the viewport at 768 and 1440, but at 360 it began at y=1,080, below the
1,000-pixel viewport. The current implementation restores content state without
an explicit initial focus/scroll action. Whether to resume at that reading or
at the catalog overview is a remaining usability decision, not a cosmetic one.
No initial-scroll behavior has been changed in response to this observation.

[observations.json](observations.json) preserves measurements; the search and
reload screenshots preserve what was visible. This probe supplements the
executor walkthrough and does not replace independent verification.
