# DS-5O — Navigation Size Architecture & Release

**Verdict:** ✅ **CERTIFIED.** `Tabs` and `SegmentedControl` now carry the shared `ControlSize` scale. **No new size vocabulary was introduced** — both read `src/lib/control-size.ts`, the scale DS-5M established. Released as **`@studiopod/design-system@0.6.0`**. The application was not modified and DS-6.6 was not begun.

**Gate:** typecheck clean · **658 tests / 0 fail** (88 files) · api-baseline unchanged · `package:verify` 9/9 entries · showcase build exit 0 · **live-measured: Tabs 40/28px, SegmentedControl 40/28px**.

---

## 1. What DS-6.6 blocked on

The navigation family was the **last** family outside the size scale. 4 of the app's 6 navigation call sites render at 28px in dense workspace and library headers — one of them (`LibraryHeader`) shared by 44 pages — and neither DS component exposed a size. `SegmentedControl`'s height was entirely unreachable from a consumer (`className` lands on the track; the height comes from each segment's padding).

## 2. Architecture — reuse, not a parallel scale

| Decision | Why |
|---|---|
| Reuse `ControlSize` (`"sm" \| "md"`) | Already canonical on `Button`, `Badge`, `Dialog`, `IconButton` and all seven form controls. A third navigation-only vocabulary would be the exact duplication this program forbids. |
| Sizing maps live in `src/lib/control-size.ts` | The dependency-graph floor (the `tone.ts`/`spacing.ts` precedent). Components consume the scale; they do not each own one. |
| `Tabs` provides `size` **through context** | A tab bar is one control, not N. Per-`Tab` sizing would let a bar render mixed densities — a defect the API shouldn't be able to express. |
| `md` is the default everywhere | Every existing consumer renders byte-identically. Purely additive. |

New maps: `CONTROL_TAB_CLASSES`, `CONTROL_TAB_COUNT_CLASSES`, `CONTROL_SEGMENT_CLASSES`, `CONTROL_SEGMENT_TRACK_CLASSES`. All statically-written class strings, so Tailwind's scanner emits them (engineering note 15).

## 3. Measured result

| | md (default) | sm | app's current | 
|---|---|---|---|
| `Tabs` / `Tab` | **40px** (unchanged) | **28px** | `h-7` = 28px ✅ |
| `SegmentedControl` (outer) | **40px** (unchanged) | **28px** | `h-7` = 28px ✅ |

All four figures are `getBoundingClientRect()` readings from the built showcase, not computed estimates.

**The one thing arithmetic got wrong, and live measurement caught:** `sm` on `SegmentedControl` first shipped as `h-6` on the segment alone and rendered at **30px**, not 28. The pill track's `p-0.5` and its 1px border sit *outside* the segment, so segment height alone cannot land the outer control on the scale. `sm` now also tightens the track to `p-px` (24 + 2 + 2 = 28). A class-level test would have happily passed the broken version — this is the same lesson DS-5N's non-square `IconButton` taught, so the fix is pinned by a test asserting *both* the segment and the track.

## 4. Tests (+32)

New `SegmentedControl.test.tsx` (20) — the component had **no test file at all** before this WP — plus 12 added to `Tabs.test.tsx`. Covered: default = md, sm at both levels, context propagation (a `Tab` never receives `size`), count-badge density, no scale mixing, the track/segment contract, active fill, arrow keys, Home/End, disabled skipping, roving tabindex, and axe at both sizes.

Size assertions read the `control-size` maps rather than literal class strings, so retuning the scale cannot leave a test asserting a stale value.

## 5. Files

**Modified (5):** `src/lib/control-size.ts` (4 maps) · `src/components/navigation/Tabs.tsx` · `src/components/ui/SegmentedControl.tsx` · `Tabs.test.tsx` · showcase `NavigationGallery.tsx` (a `Tabs — size` demo and an `sm` segmented control).
**New (1):** `src/components/ui/SegmentedControl.test.tsx`.

## 6. Verification

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ clean |
| `npx vitest run` | ✅ **658 / 0 fail**, 88 files |
| `check-api.mjs` | ✅ **baseline unchanged** — 605 index exports match; the new maps are internal, and `ControlSize` was already exported in 0.4.0 |
| `npm run package:verify` | ✅ 9/9 entry targets resolve; CSS + `"use client"` checks pass |
| `npm run build` (showcase) | ✅ exit 0 |
| Live — heights | ✅ 40/28 and 40/28 |
| Live — keyboard at `sm` | ✅ real click + ArrowRight moved focus and selection on a 28px tab bar |
| Light theme | **N/A** — the DS still ships a single (dark) theme (carried forward from DS-5M) |

## 7. Certification

**VERDICT: CERTIFIED.**

`Tabs`/`Tab` and `SegmentedControl` take `size?: "sm" | "md"` from the existing `ControlSize` vocabulary, with `Tabs` providing it through context so a bar is sized once. `md` is the default and both components render exactly as they did before, so 0.6.0 is additive for every current consumer. The scale was reused, not duplicated: no new size names, and no component owns its own sizing logic. Live measurement both proved the intended densities and caught a real 2px defect that class-level tests could not have.

**DS-6.6 is unblocked.** Its scope is unchanged from the audit: 6 call sites, delete `ui/Tabs.tsx` (171 LOC) plus the dead `Pagination` export, wrap 3 consumers in `TabPanel`. Note for that WP: the app's `node:test` stub (`lib/testing/ds-stub.tsx`) will need `Tabs`/`TabsList`/`Tab`/`TabPanel`/`SegmentedControl` entries.

**Stopping after DS-5O. The application was not modified. DS-6.6 was not begun.**
