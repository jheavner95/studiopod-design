# DS-5P — Feedback Foundation Completion

**Verdict:** ✅ **CERTIFIED.** Both gaps DS-6.7 stopped on are closed. `Spinner` exists as the bare tier, `LoadingState` composes it, `EmptyState` and `TableEmptyState` take the shared `ControlSize` scale, and **`@studiopod/design-system@0.7.0` is published with the registry resolving `latest = 0.7.0`**. The application was not modified and DS-6.7 was not resumed.

**Gate:** typecheck clean · lint clean · **686 tests / 0 fail** (+28) · api-baseline 605 → **609** (exactly the 4 intended exports) · `package:verify` 9/9 · showcase build exit 0 · live-measured.

---

## 1. Components added

**`Spinner`** (`src/components/feedback/Spinner.tsx`) — the bare tier of the loading family.

```tsx
<Spinner />                      // aria-hidden, 16px, for a layout you own
<Spinner size="sm" />            // 14px beside caption text
<Spinner label="Loading results" /> // standalone: role="status" + name
```

| Size | `xs` | `sm` | `md` (default) | `lg` |
|---|---|---|---|---|
| Rendered | 12px | 14px | 16px | 24px |

**The accessibility contract is the point of the component.** It is `aria-hidden` by default and becomes `role="status"` **only** when given a `label`. The dominant real usage is a glyph beside visible text inside a container the caller has *already* marked `role="status"`/`aria-live`:

```tsx
<div role="status" aria-live="polite">
  <Spinner size="sm" /> Saving to your library…
</div>
```

Announcing there would nest a live region inside another and say the same thing twice. A `label` is the signal that the spinner is the sole indication anything is happening. This is exactly the rule the application's own `Spinner` encoded in AM-6.6 — it now has a home in the DS.

## 2. Components modified

| Component | Change |
|---|---|
| **`LoadingState`** | Now **composes `Spinner`** instead of owning a second `Loader2 + animate-spin`. Its three steps stay *region* dimensions (16/24/32px) passed through `className` — tailwind-merge resolves the size class, so **rendering is unchanged** and all 658 pre-existing tests still pass. |
| **`EmptyState`** | `size?: "sm" \| "md"`. `md` (default) unchanged: 44px badge, `py-10`, `Heading level={4}`. `sm`: **28px badge**, `py-8`, compact type. |
| **`TableEmptyState`** | Same `size` vocabulary, **padding only** (`py-12` → `py-6`) — its type is already dense at both steps, because a table body is an operational surface by definition. |
| **`IconButton`** | `IconButtonSize` is now an **alias of `GlyphSize`**, not a second declaration of the same four names. Zero behaviour change. |
| **`src/lib/control-size.ts`** | Gains `GlyphSize`, `CONTROL_SPINNER_CLASSES`, `CONTROL_EMPTY_STATE_CLASSES`. |

**No new size vocabulary was introduced.** `Spinner` sizes on `GlyphSize` (the four names `IconButton` already used); `EmptyState`/`TableEmptyState` on `ControlSize`. The per-component *maps* still differ deliberately — an icon button's glyph is sized relative to its button footprint, a bare spinner absolutely — the same split `CONTROL_TAB_CLASSES` vs `CONTROL_SEGMENT_CLASSES` already uses.

## 3. Accessibility

- `Spinner` silent by default; `role="status"` + accessible name only when standalone. **No nested live regions** — asserted directly by a test that renders it inside a caller's `role="status"` and counts live regions.
- `EmptyState` `sm` keeps a **real `<h4>`**, shrinking only the type. Density never costs semantics.
- `EmptyState` tone semantics (`role="alert"` for error) are independent of `size` — tested.
- Reduced motion: `Spinner` adds **no per-component branch**. The package's global `prefers-reduced-motion` rule in `tokens.css` (`*`, `!important`, `animation-duration: 0.01ms`) covers it — the same baseline `Skeleton`'s pulse relies on. I verified that rule ships in `dist/styles.css`.
- axe clean for `Spinner` inline and standalone, and for `EmptyState` at both sizes.

## 4. Shared consistency (Phase 4)

Feedback now matches the architecture of every other family:

| Family | Bare tier | Composed tier |
|---|---|---|
| Forms (DS-5M) | `Select`, `Combobox`, … | `SelectField`, `ComboboxField`, … |
| **Feedback (DS-5P)** | **`Spinner`** | **`LoadingState`** |

…and the size vocabulary is now shared by Buttons, Badges, Dialogs, Forms, IconButton, Navigation, and Feedback. **No component declares its own size names.**

## 5. Tests (+28 → 686)

New `Spinner.test.tsx` (17): default-hidden, labelled `role="status"`, **no nested live region**, axe inline + standalone, all four sizes against the shared map, `className` override resolution, `animate-spin` + `shrink-0`, and three composition tests proving `LoadingState` renders **exactly one** spinner and keeps its own region role.

`EmptyState.test.tsx` (+8): default md, sm at 28px, no scale mixing, heading stays a real heading, description/action at sm, tone independent of size, axe at both. `TableEmptyState.test.tsx` (+3): md `py-12`, sm `py-6`, colSpan preserved.

## 6. Documentation

New engineering note **`20-loading-family-and-feedback-density.md`**: the four-way choice (`Spinner` / `LoadingState` / `Skeleton` / `ProgressBar`+`ProgressRing`, plus `Button loading`), **why `ProgressRing` is not a spinner** (`role="progressbar"` is a progress semantic, not a busy one), why `Spinner` is `aria-hidden` by default, the bare/composed split, and the `EmptyState` density guidance (`sm` for inspectors, tables, cards, library regions; `md` for primary page states).

Showcase: a new **Spinner** card (all four sizes, the inline `role="status"` row, the `Button loading` contrast, and the four-way "when to use" guidance) and an **EmptyState** `md` vs `sm` comparison.

## 7. Verification

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ clean |
| `npm run lint` | ✅ clean |
| `npx vitest run` | ✅ **686 / 0 fail**, 89 files |
| `check-api.mjs` | ✅ **605 → 609**; flagged exactly `GlyphSize`, `Spinner`, `SpinnerProps`, `SpinnerSize`, then regenerated |
| `npm run package:verify` | ✅ 9/9 entries resolve |
| `npm run build` (showcase) | ✅ exit 0 |
| **Live — Spinner sizes** | ✅ computed **12 / 14 / 16 / 24px**, all `aria-hidden`, all `shrink-0` |
| **Live — EmptyState** | ✅ `md` badge **44px** `py-10` h4@19.3px · `sm` badge **28px** `py-8` **h4**@14px |
| **Live — LoadingState** | ✅ renders exactly one spinner, one `role="status"` |

**Two things worth recording, because both were nearly mis-reported.**

1. **The API check initially passed against a stale `dist/`.** It reads built output, so before rebuilding it reported "unchanged" even though four exports had been added. Rebuilding surfaced the real diff. More seriously, the rebuild proved the package entry (`packages/design-system/src/index.ts`) uses an **explicit named export list** for `@/components/feedback`, not `export *` — so `Spinner` would have shipped **missing from the public API** had I trusted the first green check. Fixed by adding it to that list.
2. **My first live spinner measurement read 14/17/19/28px**, not the 12/14/16/24 the classes imply. The classes were correct; `getBoundingClientRect()` on a *rotating* element returns the axis-aligned box of the rotated square, which is up to 1.41× wider. Confirmed via `getComputedStyle`.

## 8. Release

`gh workflow run … release_type=minor` → **`@studiopod/design-system@0.7.0`** published to GitHub Packages. Verified: `npm view version` → **0.7.0**; `dist-tags` → **`{ latest: '0.7.0' }`**. Release commit `8b79082`.

## 9. Readiness for DS-6.7

Both blockers are cleared:

| DS-6.7 blocker | Status |
|---|---|
| No bare `Spinner` | ✅ shipped, with the app's AM-6.6 accessibility rule built in |
| `EmptyState` has no `size` | ✅ `sm`/`md`, `sm` badge at exactly 28px |

DS-6.7 can now proceed as **Direct + Composition** with no wrappers: delete the app's `Spinner.tsx` and `EmptyState.tsx` (incl. the dead `secondaryAction` and its private `ActionButton`/`BTN_VARIANT` duplicating `Button`), collapse the **7 `ErrorBanner` + 8 `SectionSkeleton`** copies into DS `Alert`/`Skeleton`, re-point `EmptyLibraryState`/`ConsoleEmptyState`/`InspectorEmptyState` at DS `EmptyState size="sm"`, and sweep the 30 inline `role="alert"` blocks. The app's 65 `size="sm"` empty states and its inline spinner sites both have a DS home now.

One note for that WP: the app's `Spinner` has five steps (`xs`–`xl`); the DS has four. The app only ever uses `sm` and `xl`, so the mapping is `sm → sm` and `xl → lg` (both 24px), with no site left unserved.

## Certification

**VERDICT: CERTIFIED.**

`Spinner` exists as a true bare tier, with the accessibility contract that made it necessary — silent inside a caller's live region, announced only when standalone. `LoadingState` composes it rather than duplicating it, and does so without changing a pixel. `EmptyState` and `TableEmptyState` join the shared `ControlSize` scale with `sm` landing the empty-state badge at exactly 28px, verified by live measurement, while keeping a real heading element. No new size vocabulary was invented; `IconButtonSize` was collapsed into the shared `GlyphSize` rather than left as a second copy. 686 tests pass, the public API grew by exactly the four intended exports, and 0.7.0 resolves as `latest` on the registry.

**Stopping after DS-5P. The application was not modified. DS-6.7 was not resumed.**
