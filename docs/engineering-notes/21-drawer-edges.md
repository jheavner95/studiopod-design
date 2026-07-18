# 21 — Drawer edges

*Written for DS-5Q, which added `left` to `DrawerEdge`.*

## The three edges mean different things

| Edge | Convention | Typical content |
|---|---|---|
| **`left`** | navigation | a library, a device list, a nav panel |
| **`right`** (default) | inspection | detail for the thing you selected |
| **`bottom`** | mobile sheet | a touch-first panel on a small viewport |

The edge is not decoration. In LTR, a panel docked left reads as *where you go*, and one docked right reads as *what you are looking at*. Two panels on the same screen can hold both meanings at once — which is precisely the case that justified adding `left`.

## Why `left` was added, and why that took evidence

The DS shipped `right | bottom` deliberately, and for a while that was enough. The application then produced a screen with a **left-docked device library and a right-docked settings panel simultaneously**. Neither existing edge could express it:

- `right` would have put the library on top of the inspector's meaning and its position.
- `bottom` would have converted a persistent library into a mobile sheet — changing the interaction model to work around an API limit.

The alternative the application team correctly refused was a `className` position override, which re-implements Drawer positioning outside the DS.

**One usage is normally thin evidence** (DS-5L: design around demonstrated need). What made this different is that the single usage is *paired* — a left and a right drawer on the same screen — so it demonstrates the axis, not just one more variant.

## Implementation

`left` mirrors `right` on the x axis and nothing else:

```ts
edgePanelClass.left   = "inset-y-0 left-0 h-full w-full max-w-md"   // mirror of right
edgeOffscreen.left    = { x: "-100%" }                              // mirror of { x: "100%" }
edgeBorderClass.left  = "border-r"                                  // mirror of border-l
```

**The border faces the content.** A left drawer borders on its *right* edge, a right drawer on its *left*. That's why the border moved into its own `edgeBorderClass` map rather than staying a `edge === "right" ? … : …` ternary — with three edges, a two-way ternary silently mislabels one of them.

Everything else — focus trap, Escape, backdrop dismiss, body lock, portal, the shared `DialogContext` and therefore all the `Dialog*` composition parts — is edge-independent and untouched. `left` adds **no** reduced-motion branch of its own: motion is disabled globally by `tokens.css`, and `left` only changes the sign of an offset.
