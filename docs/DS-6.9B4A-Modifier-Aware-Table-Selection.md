# DS-6.9B4A — Modifier-Aware Table Selection Contract

**Verdict: CERTIFIED**

`TableSelectionCell` now passes the native change event to its callback, closing
the contract gap reported by DS-6.9B4. The change is additive, backward
compatible, and behaviour- and pixel-identical.

**Not released.** Publishing requires explicit owner authorization.

---

## API change

```diff
- onChange: (checked: boolean) => void;
+ onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
```

```diff
- onChange={(event) => onChange(event.target.checked)}
+ onChange={(event) => onChange(event.target.checked, event)}
```

`checked` remains the first argument. The event is appended, so it is additive
and positional — TypeScript accepts a function declared with fewer parameters
wherever more are supplied, which is what keeps every existing callback valid.

Explicitly **not** done, per the brief: no `onClick` replacement, no `shiftKey`
prop, no `selectionMode` prop, no `Checkbox` change, no propagation change.

The two rejections are worth recording as design decisions rather than
omissions: a `selectionMode` enum would force the design system to enumerate
selection models it cannot predict, and a `shiftKey` prop would privilege one
modifier over `metaKey`/`ctrlKey`/`altKey` for no principled reason. Exposing
the event does neither.

## Behaviour preservation

Unchanged: `checked`, `indeterminate`, `disabled`, `label` → `aria-label`,
`th`/`td` rendering, density padding, the cell's `onClick` propagation stop,
focus behaviour and native checkbox semantics. **No CSS, no tokens, no visual
change** — `css-check` confirms all 8 canonical markers intact and in order.

## Tests

`TableSelectionCell.test.tsx`: **11 passing** (was 6).

Runtime verification, not type assertions:

| Test | Proves |
|---|---|
| first argument is the checked value | `checked` contract intact |
| second argument is the native event | `event.target` is the input; `event.nativeEvent instanceof Event` |
| **modifier keys reach the caller** | dispatches a shift-click and a plain click, asserts the callback observed `shiftKey: true` then `false` |
| one-argument callbacks still work | a `(checked: boolean) => void` callback receives `[true]` |
| indeterminate still reported | `input.indeterminate === true` |
| propagation still stopped | parent `<tr onClick>` not called (pre-existing, still passing) |

Two honest notes on the test work:

1. The existing `expect(onChange).toHaveBeenCalledWith(true)` assertion had to
   change — the call now carries two arguments. It asserts
   `onChange.mock.calls[0][0]` instead. That is a required update, not a
   loosened test.
2. A test I wrote — *"does not fire onChange while disabled"* — **failed, and
   the test was wrong, not the component.** `fireEvent` dispatches
   programmatically and does not model the browser's gating of disabled
   controls, so the assertion was testing the test library. It now asserts the
   disabled state on the input, with a comment explaining why an event-based
   assertion is not meaningful here.

## Compatibility audit

Every `TableSelectionCell` consumer, checked and **left unmodified**:

| Location | Call sites | Reads 2nd arg? |
|---|---|---|
| `src/components/operational/DataGrid.tsx` | 1 | no |
| `src/components/operational/QueueRow.tsx` | 1 | no |
| `src/app/.../foundation-table/_components/SelectionDemo.tsx` | 2 | no |
| `src/app/.../foundation-table/_components/VariantGallery.tsx` | 1 | no |
| `studiopod-app` — `assets/overlays`, `admin/overlay-library`, `BatchImportWizard` | 4 | no |
| `studiopod-web` | **0** | n/a |

All continue to typecheck and operate unchanged, which is the point of the
additive positional form.

## Gates

| Gate | Result |
|---|---|
| `typecheck` | clean |
| `test` | **703 passing / 89 files** |
| `lint` | clean |
| `package:api-check` | **609 index exports match baseline** — public surface unchanged |
| `package:css-check` | 8 canonical markers present and ordered |
| `package:use-client-check` | all 3 entries begin with `"use client"` |
| `package:exports-check` | 9 entry targets resolve |
| Working tree | clean |

One caveat recorded rather than glossed: `api-check` compares **export names
only**, so a widened type signature is invisible to it. That is exactly why the
widening is covered by typecheck and by runtime tests instead — the same
limitation noted in DS-5P.

## Documentation

- **Prop JSDoc** — the authoritative public contract. States that the first
  argument is the next checked state and the second is the native change event,
  that the event exists to support modifier-aware selection models, and that
  one-argument callbacks remain valid. Implementation-neutral: it names
  plain-vs-shift, range and select-to-anchor as equally supported and prescribes
  none.
- **`docs/engineering-notes/22-modifier-aware-table-selection.md`** — records
  why the event is exposed, why `selectionMode`/`shiftKey` props were rejected,
  the `TableRow` precedent, and the backward-compatibility reasoning.

The `SelectionDemo` showcase was deliberately left alone — it already models a
range selection and changing it would prescribe a model in the docs, which the
brief forbids.

## Final audit

| Check | Result |
|---|---|
| Native event exposed | ✅ |
| `checked` remains first argument | ✅ |
| One-argument callbacks valid | ✅ (typecheck + runtime test) |
| `shiftKey` runtime-accessible | ✅ (shift-click vs plain click compared) |
| Propagation behaviour preserved | ✅ |
| `disabled` / `indeterminate` preserved | ✅ |
| All DS gates pass | ✅ |
| Application consumers untouched | ✅ |
| No public export removed | ✅ |
| No CSS / visual change | ✅ |

**CERTIFIED.** DS-6.9B4A is complete and **not released** — the version bump and
publish need owner authorization. Once released and the application dependency
is bumped, DS-6.9B4 (`SvgImportPanel`) becomes unblocked.

Stopping here; `SvgImportPanel` migration not resumed in this package.
