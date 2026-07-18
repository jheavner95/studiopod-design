# 20 — The loading family, and feedback density

*Written for DS-5P, which closed the two gaps DS-6.7 stopped on.*

## Four ways to say "wait", and how to choose

The system has four loading affordances. They are not interchangeable, and picking the wrong one is usually an accessibility bug rather than a cosmetic one.

| Use | When | Semantics |
|---|---|---|
| **`Spinner`** | A busy glyph **inside a layout you own** — a status row, a toolbar, a table overlay, a card, a menu, an inline label. | `aria-hidden` by default. Only `role="status"` when you pass `label`. |
| **`LoadingState`** | A **whole region** is pending and has no shape worth previewing. | Owns its own `role="status"` and a visible label. |
| **`Skeleton`** | Content is streaming into a **known shape**. | Decorative; the surrounding region carries the semantics. |
| **`ProgressBar` / `ProgressRing`** | You can express **real progress**. | `role="progressbar"`. |
| **`Button loading`** | An **action** is pending. | Button owns it; don't hand-place a spinner inside a button. |

**`ProgressRing` is not a spinner.** It spins when `indeterminate`, which makes it tempting, but it renders `role="progressbar"` with `aria-valuemin`/`aria-valuemax` and always claims an accessible name. A busy indicator is not a progress control. Using it as one both misstates the semantic and double-announces when it sits inside a caller's live region.

## Why `Spinner` is `aria-hidden` by default

This is the whole design of the component, and it is the opposite of what a naïve "accessible by default" instinct suggests.

The dominant real-world shape is a glyph beside visible text, inside a container the caller has *already* marked as a live region:

```tsx
<div role="status" aria-live="polite">
  <Spinner size="sm" />
  Saving to your library…
</div>
```

If `Spinner` announced itself here, you would get a live region nested inside another live region and the same event announced twice. So the default is silence, and `role="status"` appears **only** when you pass `label` — the signal that this spinner is the sole indication that anything is happening.

`LoadingState` follows the same rule from the other side: it owns the region's `role="status"`, so the `Spinner` it composes stays silent.

## The bare tier / composed tier split

DS-5P completes for the loading family what DS-5L/DS-5M established for forms:

- **bare tier** — `Spinner`: the primitive alone, intrinsically sized, no wrapper, no semantics it shouldn't own.
- **composed tier** — `LoadingState`: the primitive plus label, centering, and the region role.

`LoadingState` **composes** `Spinner`; it does not keep a second copy of `Loader2 + animate-spin`. That is the same correction DS-5M made when `ComboboxField` came to compose `Combobox`. Before DS-5P the DS shipped only the composed tier, which is exactly why the application could not migrate: 99 inline spinner sites had nowhere to land.

Its three sizes stay *region* dimensions (16/24/32px) passed through `className` rather than `Spinner`'s glyph scale — tailwind-merge resolves the size class, so composition changed no pixels.

## Density: one vocabulary, several maps

`Spinner` sizes on `GlyphSize` (`xs`/`sm`/`md`/`lg`) and `EmptyState`/`TableEmptyState` on `ControlSize` (`sm`/`md`), both from `src/lib/control-size.ts`. **No component declares its own size names.** `IconButtonSize` is now an alias of `GlyphSize`, not a second declaration of the same four strings.

The *maps* still differ per component, and that is deliberate: an icon button's glyph is sized relative to its button footprint, while a bare spinner is sized absolutely because it is dropped into a caller's row. Shared vocabulary, component-specific pixels — the same split `CONTROL_TAB_CLASSES` and `CONTROL_SEGMENT_CLASSES` already use.

### `EmptyState` sizes

- **`md`** (default) — the primary, page-level empty state. 44px icon badge, `py-10`, `Heading level={4}`.
- **`sm`** — the operational density: **inspectors, table regions, library panels, console cards**. 28px icon badge, `py-8`, and the heading's *type* shrinks to `text-body-sm` while staying a real `<h4>`. The dense variant never trades semantics for size.

`TableEmptyState` takes the same `size`, but scales padding only (`py-12` → `py-6`): its type is already dense at both steps, because a table body is an operational surface by definition.
