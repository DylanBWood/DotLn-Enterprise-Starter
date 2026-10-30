# WO-015 rejected chrome implementations

## Round 1, candidate B: the inspector as a drawer

Removed when the operator picked candidate A ([comparison](comparisons.md), D015). This is what it
was, so it can be rebuilt if a later order wants it. The screenshots are under `round-01/`.

**Choosing it.** `/scene?chrome=drawer` selected the candidate. `SceneFacade` read the query and
published `chrome` on the view model, typed `SceneChrome` (`'column' | 'drawer'`), and `scene-page`
passed it to `scene-layout`, whose `chrome` input set `data-chrome` on the host. The stories file
carried `ChromeColumn` and `ChromeDrawer`, each navigating to its own query.

**The layout.** Under `:host([data-chrome='drawer'])` the deck had a narrower rail, and the inspector
shared the field's grid area, aligned to its lower edge above it:

```scss
.deck {
  grid-template-columns: minmax(0, 1fr) minmax(13rem, 15rem);
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-areas:
    'field rail'
    'instruments rail';
}
.inspector {
  grid-area: field;
  align-self: end;
  z-index: 1;
  max-block-size: 42%;
}
```

The inspector's own container query put its reading and its controls side by side above 44rem. That
query stays, because it serves any wide inspector and costs nothing in the column. Below 60rem the
drawer's height limit was lifted and the candidate matched the single-column page.

**What it traded.** The inspector read better at that width, but while a tool was chosen it hid the
lower part of the field, and the design brief says the field is the page.
