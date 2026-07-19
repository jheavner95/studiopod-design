# 23 — Row identity and pointer coordination

`TableRow` accepts three optional props beyond its click contract:

```ts
id?: string
onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>
onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>
```

All three forward to the underlying `tr` unchanged.

## Why the row, and not its cells

A table row is frequently a proxy for something rendered elsewhere — a shape in
a canvas, a layer in a preview, a marker on a map. Hovering the row should
highlight its counterpart, and that requires pointer events at the row boundary.

Putting the handlers on cells instead looks equivalent and is not. `mouseleave`
fires whenever the pointer exits the element it is bound to, so cell-level
handlers fire a leave on *every internal boundary crossing* — the hovered target
would clear and re-arm each time the pointer moved from one column to the next,
flickering whatever the hover drives. Binding at the row makes internal
traversal invisible, which is the behaviour these interactions need.

`interactive`'s hover styling is independent of these handlers; setting one does
not imply the other.

## Why `id`

An expand toggle that discloses a detail row needs `aria-controls` pointing at
that row. Without an `id` on the row itself, consumers have to wrap the detail
content in an extra `div` purely to hold the identifier. `id` removes that
workaround. The design system does not generate or namespace the value —
uniqueness belongs to the caller.

## What the design system does not do

It does not own hover state. There is no `hovered` prop, no internal
`useState`, and no styling reaction to these handlers. The row delivers events;
what they mean is the caller's business. That keeps the component from
acquiring opinions about preview coordination, prefetching, or any of the other
things row hover legitimately drives.

## Testing note

React synthesises `onMouseEnter`/`onMouseLeave` from `mouseover`/`mouseout`
plus `relatedTarget`. A test that calls `fireEvent.mouseLeave(cell)` supplies no
`relatedTarget`, which React reads as the pointer leaving to the document — so
the row's leave handler fires and the test appears to prove the opposite of the
truth. Model traversal with the pair instead:

```tsx
fireEvent.mouseOut(firstCell,   { relatedTarget: secondCell });
fireEvent.mouseOver(secondCell, { relatedTarget: firstCell });
// the row's onMouseLeave must NOT have fired
```

That distinction is why the row-stability test in `TableRow.test.tsx` is written
the way it is.
