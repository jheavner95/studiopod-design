# DS-6.9B4B-DS — Hover-Aware TableRow Contract

**Verdict: CERTIFIED**

`TableRow` now accepts `id`, `onMouseEnter` and `onMouseLeave`, closing the
second contract gap reported by DS-6.9B4B. All three are optional, forwarded
unchanged, and behaviour- and pixel-identical for every existing consumer.

**Not published.** Release is a separate authorized package.

---

## API change

```diff
 interface TableRowProps {
   children: ReactNode;
   className?: string;
+  id?: string;
   selected?: boolean;
   interactive?: boolean;
   onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
+  onMouseEnter?: MouseEventHandler<HTMLTableRowElement>;
+  onMouseLeave?: MouseEventHandler<HTMLTableRowElement>;
 }
```

```diff
 <tr
+  id={id}
   onClick={onClick}
   onKeyDown={onClick ? handleKeyDown : undefined}
+  onMouseEnter={onMouseEnter}
+  onMouseLeave={onMouseLeave}
   tabIndex={onClick ? 0 : undefined}
   aria-selected={selected || undefined}
```

Explicitly **not** done, per the brief: no hover state management, no `hovered`
prop, no preview- or expansion-specific props, no generic HTML prop spreading,
and no change to `interactive`, `selected`, keyboard handling, styles or tokens.

## Behaviour preservation

Unchanged and covered by the existing plus new tests: `className` merging,
`selected` styling and `aria-selected`, `interactive` `tabIndex`, Enter and
Space activation, focus-visible styling, `onClick` forwarding, and the default
inert row (no `id`, no `tabIndex`, no `aria-selected` when nothing is passed).

**No CSS diff** — `git diff -- '*.css'` is empty; `css-check` confirms all 8
canonical markers present and ordered.

## Tests

`TableRow.test.tsx`: **13 passing** (was 7). Suite-wide **709** (was 703).

| Test | Proves |
|---|---|
| `id` forwarded | attribute present **and** `getElementById` resolves to the row — the way `aria-controls` actually resolves |
| `id` omitted by default | no stray attribute |
| enter/leave receive the row event | `currentTarget` is the `tr`, captured inside each handler |
| **hovered row stays stable across cells** | crossing an internal cell boundary fires **no** leave; exiting the row fires exactly one |
| click + keyboard + selected alongside new props | `aria-selected`, `tabIndex`, and 3 `onClick` invocations (click, Enter, Space) |
| default inert row | no `id`, `tabIndex` or `aria-selected` |

### Two tests I got wrong, and fixed rather than kept

1. **`currentTarget` read from `mock.calls` was `null`.** React nulls the field
   once dispatch completes, so a post-hoc assertion is meaningless. It is now
   captured inside the handler.

2. **The cell-traversal test initially proved the opposite of the truth.**
   `fireEvent.mouseLeave(cell)` supplies no `relatedTarget`, and React — which
   synthesises enter/leave from `mouseover`/`mouseout` plus `relatedTarget` —
   reads that as the pointer leaving to the document. So the row's leave fired
   and the test "failed" against correct behaviour. Modelling the traversal
   properly fixes it:

   ```tsx
   fireEvent.mouseOut(first,   { relatedTarget: second });
   fireEvent.mouseOver(second, { relatedTarget: first });
   // no leave — then mouseOut to document.body fires exactly one
   ```

   This is the second time in this programme a first-draft test asserted
   something the harness could not model (the other being the disabled-checkbox
   test in DS-6.9B4A). Recorded in engineering note 23 so the next person
   writing pointer tests does not repeat it.

## Compatibility audit

`TableRow` consumers inspected across all three repositories:

| Repo | Consumers | Any passing `id` / `onMouseEnter` / `onMouseLeave`? |
|---|---|---|
| Design System | 13 files — incl. `DataGrid`, `QueueRow`, `Queue`, `Menu`, `MenuItem`, `ResponsiveRulesTable`, `SelectionDemo`, `StatesDemo`, `VariantGallery`, `CellTypesTable`, `CoverageMatrix` | **no** |
| `studiopod-app` | 26 files — incl. `assets/overlays`, `admin/overlay-library`, `BatchImportWizard`, 18 console pages | **no** |
| `studiopod-web` | **0** | n/a |

The only usage anywhere is the new test. Purely additive; **no consumer was
modified**.

## Documentation

- **Prop JSDoc** — `id` described as a stable DOM identifier whose uniqueness
  belongs to the caller; the pointer handlers described as row-level
  coordination for things rendered elsewhere, with the explicit note that the
  design system does not own the hover state and that the row boundary is why
  internal cell traversal does not fire a leave. Implementation-neutral, and
  `SvgImportPanel` is not mentioned.
- **`docs/engineering-notes/23-row-identity-and-pointer-coordination.md`** —
  records the motivating gap, why cells are the wrong binding site, why `id`
  removes the wrapper-div workaround, what the DS deliberately does not own, and
  the `relatedTarget` testing pitfall.

## Gates

| Gate | Result |
|---|---|
| `typecheck` (app + tests) | ✅ |
| `test` | ✅ **709 passing / 89 files** |
| `lint` | ✅ |
| Next.js build | ✅ |
| `package:api-check` | ✅ **609 index exports match baseline** |
| `package:css-check` | ✅ 8 markers ordered |
| `package:use-client-check` | ✅ |
| `package:exports-check` | ✅ 9 targets |
| Working tree | ✅ clean |

As in DS-6.9B4A, `api-check` compares export **names** only, so a widened prop
interface is invisible to it — which is why the change is covered by typecheck
and runtime tests instead.

## Final audit

| Requirement | Result |
|---|---|
| `TableRow` accepts and forwards `id` | ✅ |
| Accepts row mouse-enter / mouse-leave | ✅ |
| Handlers receive native React row events | ✅ (`currentTarget` verified in-handler) |
| Cell traversal does not fire row leave | ✅ (modelled with `relatedTarget`) |
| Click and keyboard contracts preserved | ✅ |
| `selected` behaviour preserved | ✅ |
| All DS gates pass | ✅ |
| Application repositories untouched | ✅ |
| No export removed, no CSS change | ✅ |

**CERTIFIED.** Commit `5bbcfe6`. Not published, and `SvgImportPanel` migration
not resumed — both are separate packages.
