# Studying a concept

DotLn-Angular's catalog should help a reader build an understanding of an idea,
return to it, and connect it to other ideas. A restored definition is a useful
starting point. It is not the intended depth of the finished product.

The operator supplied this direction during WO-019 on 2026-10-26. The
[ideation receipt](../evidence/WO-019/ideation.md) records its provenance and
bounded implementation slice. This is an instance product direction; it does
not change the upstream kit or silently schedule the whole vision into WO-019.

## Several ways into the same idea

A concept should eventually support complementary explanations, chosen for the
idea rather than filled as a universal checklist:

- An intuitive explanation and a concrete situation in which the idea helps.
- A visual model that shows the important relationship. When change over time
  is the point, let the reader inspect that change through an animation or
  controlled steps, with a readable explanation alongside it.
- Ordinary pseudocode exposing the mechanism, assumptions and edge cases.
- An RxJS interpretation where streams clarify the mechanism. Identify what is
  illustrative pseudocode and what is an executable, tested implementation.
- Implementations in public projects and treatments in other references, with
  links, attribution and enough explanation to understand their relationship.
- Limits, failure cases and nearby concepts that answer when to use a different
  approach. Related concepts should extend the reading, not merely decorate it.

These representations should explain the same example where practical. A reader
ought to be able to point to an element in the drawing, recognize it in the
algorithm and see what changes when an input changes. Definitions from the
mining run retain their provenance. Newly authored explanations and examples are
distinguished from those definitions; a useful analogy is not a claim that the
source implements it that way. Missing material remains missing rather than
being replaced by fabricated references or empty sections.

## Visual candidates

Mermaid is a candidate for relationships, decisions and flows. Manim is a
candidate for authored mathematical or temporal explanations. Custom drawings
and browser-native diagrams are candidates when they express the particular
concept more directly or permit useful interaction. Choose the medium from the
explanation it needs to carry. No renderer, asset pipeline or dependency is
selected for the whole catalog by this ideation.

Any shipped visual needs a text equivalent, legible narrow-screen treatment and
deliberate motion controls. An animation should reveal a mechanism, not consume
attention while leaving the reader unable to inspect it. Examples can later
connect to the soldier scene, but the reading surface remains useful before the
scene exists.

## Learning the interface through comparisons

Design comparisons run in pairs. Each preference informs the next pair; only
the operator ends the process. Ranking can assist but never supplies that
stopping decision. For WO-019 the operator ended them after round 22
(WO-019-D025), with contents beside the reading.

WO-019 demonstrates the direction with one authored Arrive study: a custom
step-through drawing, a concrete example, ordinary and RxJS pseudocode, limits
and checked public references. It supplements the existing catalog content; it
does not claim equivalent enrichment for all 3,463 concepts. The example uses
the existing browser stack without a new runtime dependency. Its visual is a
teaching example, not the WO-015 scene engine. Broader coverage and a production
media-authoring pipeline remain candidates for subsequent planning.

Revisit this slice if the comparison shows that it fails to connect the views
of the concept, if reference checks contradict the example, or if the operator
changes the intended depth. Acceptance still requires using the page; ending
the comparisons is not acceptance.
