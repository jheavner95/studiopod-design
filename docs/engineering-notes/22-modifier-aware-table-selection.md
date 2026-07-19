# 22 — Modifier-aware table selection

`TableSelectionCell.onChange` passes two arguments:

```ts
onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
```

The first is the next checked state. The second is the native change event.

## Why the event is exposed

A checkbox's boolean result is enough for a flat "toggle this row" model and
nothing else. Real selection surfaces routinely need more: plain-click replaces
the selection while shift-click extends it, or a click selects a range back to
an anchor row. Those models are all decided by modifier keys, and the modifier
keys live on the event.

Before this change the component consumed the event internally and surfaced
only `event.target.checked`, so a consumer physically could not tell a
shift-click from a plain click. Any selection model beyond flat toggling was
unreachable without reimplementing the cell.

`TableRow` already made the same allowance for its click handler — it documents
that it passes the native event *"so callers can read modifier keys
(`event.shiftKey`) for range selection."* Selection cells needed the same
affordance; this note records why they now have it.

## What the design system does and does not decide

It guarantees the event reaches the caller. It takes **no** position on the
selection model — plain-vs-shift additive selection, range selection and
select-to-anchor are all equally supported and equally the caller's choice.
There is deliberately no `selectionMode` prop and no `shiftKey`-specific prop:
a mode enum would force the design system to enumerate models it cannot
predict, and a `shiftKey` prop would privilege one modifier over `metaKey`,
`ctrlKey` and `altKey` for no reason.

```tsx
<TableSelectionCell
  checked={selected.has(row.id)}
  label={`Select ${row.name}`}
  onChange={(checked, event) => {
    const additive = (event.nativeEvent as MouseEvent).shiftKey;
    setSelected((prev) => nextSelection(prev, row.id, checked, additive));
  }}
/>
```

## Backward compatibility

The argument is additive and positional, so a one-argument callback stays
valid — TypeScript permits a function of fewer parameters wherever more are
supplied. Every call site that existed when this shipped ignores the second
argument and needed no edit.

If you only need the checked state, keep the one-argument form. Reach for the
event when the interaction genuinely depends on how the user clicked.
