# Changelog

All notable changes to `@studiopod/design` are documented here. Releases up to and including 0.12.0 were published as `@studiopod/design-system`; see 0.13.0 below. Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versioning discipline is documented in `VERSIONING.md`.

## 0.15.0 — DH-3: framework independence

**The package no longer requires Next.js, and no longer makes every export a client reference.** Both were consumer-facing defects; the second was recorded as N1 in DH-2's certification.

Migration is intentionally near-zero: every new prop is optional with a plain-HTML default, so **existing call sites compile and work unchanged**. The documentation application — 636 imports across five entry points — typechecked with zero errors after the change.

### Removed

- **`next` is no longer a peer dependency.** Peers are now `react` and `react-dom` only. Consumers no longer install Next.js to use Design. Enforced by a new `framework-check`: no framework specifier may appear in source, in the emitted output, or in the manifest.

### Changed

- **Only genuinely interactive modules are client modules now.** The package emits one module per source file instead of a bundle, so each carries its own `"use client"` directive. **392 of 538 modules (73%) are server-safe** — previously all of them were client references, because a single directive at the top of `index.js` marks every export in the package. A Server Component can now render `Button`, `Card`, `Stack`, the layout and workflow families, `cn` and the token constants without opening a client boundary. See ADR 0014.
- **`Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList`** render a plain `<a>` by default instead of `next/link`. Pass `linkComponent` for client-side routing.
- **`AssetThumbnail`** renders a plain `<img>` by default instead of `next/image`. Pass `imageComponent` (pre-bound to fill mode) for optimisation.
- **`Breadcrumbs`** no longer calls `useRouter()`. Its overflow menu's keyboard navigation defaults to `window.location.assign`; pass `onNavigate` to keep it a client-side transition.
- **DOM contract — `Button` with both `href` and `loading`.** It previously rendered `onClick={e => e.preventDefault()}`; it now renders `tabIndex={-1}` and no handler. Same behaviour — the base class already carries `aria-disabled:pointer-events-none` for the pointer path, and `tabIndex={-1}` closes the keyboard path — but an event handler would have made the whole component client-only for a guard the stylesheet already provides. **Only affects consumers asserting on that attribute in tests.**

### Added

- `linkComponent` on `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList` — optional, defaults to `"a"`.
- `imageComponent` on `AssetThumbnail` — optional, defaults to `"img"`.
- `onNavigate` on `Breadcrumbs` — optional, defaults to `window.location.assign`.
- Types `LinkComponent`, `LinkComponentProps`, `ImageComponent`, `ImageComponentProps` on the root entry, for typing your own bindings. Root baseline 616 → **620 exports; nothing removed or renamed.**

### Consumer action

None required. To keep client-side routing where you had it, pass `linkComponent`; see `docs/consuming/README.md` § 2.

## 0.14.0 — UX-2 accessibility corrections (CR-1, CR-2, CR-3)

Three defects, all found by **rendering the consuming application and reading computed CSS out of the DOM** — none was visible to source inspection, and none was caught by the 1,001 tests that existed before this release. No API changed: no export added, removed or renamed; all four API baselines unchanged (616 root, 249 illustrations, 44 marketing, 5 tokens).

### Fixed

- **CR-1 — the ink ramp sat below WCAG AA.** `--color-ink-tertiary` `#64748b` → **`#8593a8`**; `--color-ink-disabled` `#475569` → **`#64748b`**. Measured against `panel`, tertiary was 3.73:1 and disabled 2.34:1; against `surface-active` — the most-used surface in StudioPOD — 3.04:1 and 1.91:1. Tertiary now clears **AA (4.5:1) on all six semantic surfaces**; disabled clears **3:1** everywhere (WCAG exempts disabled text, but exempt is not the same as invisible). Values are owned by `@studiopod/foundation`, corrected in **0.3.0**, and reach this package through the existing token bridge — `theme.css` was regenerated, not hand-edited.

- **CR-2 — `.focus-ring` flattened its element's corners on keyboard focus.** The `:focus-visible` rule declared `border-radius: inherit`, which sets the *element's* radius and resolves against its *parent* — so any rounded control whose parent had no radius went square for exactly as long as it held focus. Reproduced on a 32×32 `IconButton`: `border-radius` computed **12px unfocused, 0px focused**. The declaration is removed and nothing replaces it; browsers already follow the element's own radius when drawing an outline. Affected every component using `.focus-ring`, which is the package's whole interactive surface.

- **CR-3 — `Button` failed AA against its own label, in two variants.**
  - `primary` was `accent-500` rest / `accent-400` hover / `accent-600` active: **3.68:1 at rest and 2.54:1 on hover** — the most-clicked surface in both products failed AA, and hovering it made it worse. Now `accent-600` / `accent-700` / `accent-700`: **5.17:1 rest, 6.70:1 hover and active**. Contrast now rises on interaction instead of collapsing. Hover and active share `accent-700` because the scale defines no `accent-800`; press feedback rides the existing colour transition.
  - `destructive` was `text-white` on `bg-error`: **3.03:1 rest, 3.60:1 hover, 3.29:1 active**. The label is now `text-canvas`: **6.37 / 5.36 / 5.87:1**. The fill did not move — `--color-error` is a contrast-adjusted derivative Foundation explicitly forbids "fixing", and changing it would repaint every error tint in both products to repair one button. Dark-on-warm is the conventional accessible treatment for coral fills.

- **CR-3 was not only a Button defect.** Fixing Button alone would have been the wrong shape of fix: the same light-ink-on-fill pairing existed in **10 other components**, and one of them — `SegmentedControl` — was measured at **3.68:1 in the live application** during UX-2 verification. `Pagination`, `Stepper` and eight `workflow` components carried it too. All 35 occurrences are corrected under one rule:

  | fill | ink | ratio |
  |---|---|---|
  | `bg-accent-600` | `text-white` | 5.17:1 |
  | `bg-accent-500` | **never** with white (3.68:1) — use accent-600 | — |
  | `bg-success` | `text-canvas` | 8.47:1 *(white was 2.28:1)* |
  | `bg-warning` | `text-canvas` | 8.99:1 *(white was 2.15:1)* |
  | `bg-error` | `text-canvas` | 6.37:1 *(white was 3.03:1)* |

### Added

- **`src/styles/contrast.test.ts`** — 12 assertions pinning all three fixes against their actual source of truth (the stylesheet text and the cva variant strings), including full-ramp AA checks against every semantic surface, ink-step distinctness, and per-variant Button contrast. These are the tests whose absence let all three defects ship.

  The last of them is package-wide rather than per-component: it walks every `.tsx` under `src/components`, finds any single class string pairing a `bg-<fill>` with a `text-<ink>`, and fails if that pairing is below AA. Verified to actually catch the defect by reverting `SegmentedControl` to `bg-accent-500 text-white` and confirming the test reports `3.68:1`. A per-component assertion would have missed the 10 components CR-3 was never written about.

### Why this is a breaking minor, not a patch

`VERSIONING.md` classifies accessibility corrections and "visual corrections within an existing semantic contract" as **PATCH**, and read narrowly all three qualify — no token was semantically reassigned and no API moved. It is being released as a **breaking minor** anyway, for two reasons. First, `@studiopod/foundation` classified the same value change as breaking under its own policy ("a brand-level value change with visual consequences everywhere"), and the two packages should not disagree about what the same change is. Second, `studiopod-web` is a live consumer that will get repainted body text, field labels and primary buttons without having asked for it; a patch release implies it can upgrade without looking, and it cannot. Consumers should expect visible change and re-verify their own screens.

### Consumer impact

Every surface using `ink-tertiary`/`ink-disabled` text, every `.focus-ring` element, and every `Button` in `primary` or `destructive` will render differently. This is intended — it is the correction. `ink-primary` and `ink-secondary` are unchanged; the `secondary`, `outline` and `ghost` Button variants are unchanged.

## 0.13.0

### Changed

- **BREAKING (distribution only) — the package is renamed from `@studiopod/design-system` to `@studiopod/design`** (DS-7.3a).
  - **Nothing inside the package changed.** Every one of the 15 emitted `dist/` files is byte-identical to 0.12.0, verified by SHA-256 comparison across the rename. The export map, `main`/`types`, `files` allowlist, `sideEffects`, `type`, dependencies, peer dependencies, and `publishConfig.registry` are unchanged. All four API baselines are unchanged: 616 root exports, 249 illustrations, 44 marketing, 5 tokens. `styles.css` is unchanged. No component API, prop type, behaviour, or visual output was touched.
  - **Why it is still breaking**: `npm install @studiopod/design-system` no longer resolves a new version, and every import specifier in a consumer changes. Per `VERSIONING.md`'s adopted pre-1.0 policy — *every consumer-visible breaking change is treated with major-version discipline even before 1.0.0, bumping the minor digit and documented as a breaking change* — this is a breaking minor: `0.12.0` → `0.13.0`.
  - **Consumer migration is NOT part of this release.** `studiopod-app` (`^0.12.0`) and `studiopod-web` (`^0.1.1`) still depend on the old name and are unchanged. Their cutover is DS-7.4. Nothing they do today breaks, because nothing has been published.
  - **Rolling back to 0.12.0 or earlier** uses the old package name — those versions exist only under `@studiopod/design-system`. See `docs/DISTRIBUTION.md` § Rollback.
  - Release tags keep the `design-system-v` prefix; the prefix identifies this repository's release series, not the npm package. The tag message and GitHub release title carry the new name.

### Added

- **`identity-check`** (`scripts/check-package-identity.mjs`) — a new gate in the package's `verify` chain. Asserts the declared name and registry, that no built file or live source still references the old name, and that every export subpath **actually resolves** under the new name from a real packed tarball via Node's own export-map resolution (using `import.meta.resolve`, which resolves without executing, so the `next`/`react` peers are never needed).

### Not changed

- Design tokens still live in this package. `@studiopod/foundation` is **not** a dependency yet — that migration is deferred and will be verified independently.

## 0.12.0

### Added

- **`useEditSession`** (DS-7.2) — the canonical **buffered edit session**: a headless hook holding a draft against a baseline, deriving dirtiness, and running the save lifecycle. Orchestration only — it renders nothing, persists nothing, and knows nothing about any domain.
  - **Added to close a measured vocabulary gap, not to add a feature.** The DS-7.1 audit of three application orchestration owners found each had invented a *different* name for the same state machine — `saveStatus: idle|saved|warning|error`, `actionBusy`+`actionError`, and `saveStatus: idle|saving|success|error`. This hook replaces those three with one contract. Editing *presentation* was already owned (`InspectorProperty`'s edit slot, the Foundation Forms fields, `InspectorValidation`, `UnsavedChangesBanner`), so **no presentation primitive was added.**
  - Canonical status: `loading | pristine | dirty | saving | saved | savedWithWarnings | error`. `editing` and `disabled` are deliberately **not** states — editing is inline and continuous (this system has no edit-mode toggle), and `disabled` is derived (`isSaving || isReadOnly || loading`). `readOnly` and "no selection" remain orthogonal modes.
  - Five actions, no more: `update`, `save`, `discard`, `reset`, `dismissError`.
  - Derived selectors `isDirty`, `isSaving`, `canSave`, `isReadOnly`, `hasError` — all computed from a single stored phase plus the draft/baseline comparison, so **no fact is stored twice** (notably there is no second in-flight boolean beside `status === "saving"`).
  - **No-op guard**: saving a draft equal to its baseline clears any transient status and performs no commit at all.
  - **Pessimistic baseline advancement**: the baseline advances only to what was actually committed, so edits made during a save stay dirty. A commit resolving after the session was re-seeded is discarded rather than applied to the new session.
  - Success (`saved`/`savedWithWarnings`) auto-clears after `successResetMs` (default **3000**, resolving the reference owners' 3000-vs-4000 split); failure **never** auto-clears.
  - Configurable equality via `isEqual`, defaulting to a structural deep comparison — replacing one owner's `JSON.stringify` equality without its key-ordering and `undefined` hazards. The chosen strategy drives `isDirty`, `canSave` and the no-op guard together, so they cannot disagree.
  - `original` is optional; supplying it is what makes `reset` meaningful (`reset` is a documented no-op without it). Only one of the three reference owners kept a second baseline, so it is optional by evidence.
  - Types: `EditSessionStatus`, `EditSessionCommitResult`, `EditSessionActions`, `EditSessionResult`, `UseEditSessionOptions`.
  - **Explicitly not implemented**, with documented extension seams instead: persistence/networking, optimistic concurrency and conflict resolution, retry policy, keyboard/focus handling, autosave, undo/redo, any provider/context, any imperative controller, and any Inspector UI. See `docs/DS-7.2-Edit-Session-Hook.md` §7.
  - Purely additive: root exports **610 → 616**. No existing export changed.

## 0.11.0

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.11.0` (2026-07-20), release commit `7405892`, work commit `eb7058c`, `docs/DS-6.9C6E-A-InspectorHeader-Metadata-Contract.md`, and the published tarball. Written after the fact, not at release time.

### Added

- **`InspectorHeader` gains `metadata?: ReactNode`** (DS-6.9C6E-A) — a slot for supporting identity detail (ids, timestamps, counts) that belongs to the header but not to the name/type/status line.
  - **Rendered as a subordinate second row**, deliberately outside the identity/status flex row. That is what lets it wrap and keep its full content on a narrow inspector instead of truncating, and stops it competing for width with the status badges.
  - `false`, `null`, `undefined` and `""` render **no row and no wrapper** — an absent metadata value costs nothing in the DOM.
  - Purely additive: `metadata` is optional, and a header without it renders exactly as it did in 0.10.0. Root exports unchanged at **610**.

## 0.10.0

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.10.0` (2026-07-20), release commit `e508547`, work commit `fd0ff03`, `docs/DS-6.9C6A-InspectorHeader-Multi-Status-Contract.md`, and the published tarball.

### Added

- **`InspectorHeaderStatus`** (DS-6.9C6A) — the status entry shape (`label`, optional `tone`), exported for the first time so callers can type a status list. This is the **only** new export between 0.8.0 and 0.12.0: root exports **609 → 610**.
- **`InspectorHeader`'s `status` prop accepts an array** — the type widens from `{ label; tone? }` to `InspectorHeaderStatus | InspectorHeaderStatus[]`, for inspectors that must show more than one concurrent status.
  - **A single object still takes the original path**: it is handed to `IdentityBlock` exactly as before, so existing callers get byte-identical markup.
  - An array renders a badge row in the header instead, because `IdentityBlock` owns exactly one badge slot and widening a Foundation Metadata component for an Inspector-only need would have been the wrong place to absorb it.
  - Widening an accepted input union is additive, so every existing `status` usage is unchanged.

## 0.9.0

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.9.0` (2026-07-20), release commit `e2cff44`, work commits `6e51d72`, `4a50cdc`, `07e2f8e`, `fbdf216`, the DS-6.9C2/C3A/C3B/C3C reports, and the published tarball.

### Added

- **`InspectorPanel` gains `isEmpty?: boolean`** (DS-6.9C3B) — the explicit switch for the empty state, set from the caller's own selection state.
  - Omitting it falls back to `Boolean(emptyState)`, which is precisely how the component behaved before `isEmpty` existed, so no existing caller changes behaviour.
- **`emptyState` accepts an element, not only a string** — pass a full `EmptyState` and you own the title, description and action. A string still works and still becomes the description under the fixed "Nothing selected" title.
- Body precedence is now documented explicitly: `loading` → empty → `children`.

### Changed

- **The Inspector and Property families graduated to Stable** (DS-6.9C3C), following the readiness and stability audit in DS-6.9C2.
- **Inspector-family test coverage went from 0 to 145 tests** (DS-6.9C3A) across `InspectorPanel`, `InspectorSection`, `InspectorTabs`, the Property family, and `WorkspaceInspector`'s props.
- `InspectorHeader`'s `onCollapse` documentation was corrected: it is **the dismiss affordance**, not a collapse-to-rail control. The prop name is historical; there is no separate `onClose`, and no other component in the family owns dismissal. Documentation only — no behavioural change.

### Notes

- No export was added or removed: root exports stayed at **609**. The minor bump reflects the new `isEmpty`/`emptyState` capability and the Stable graduation, not a change to the export surface.

## 0.8.3

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.8.3` (2026-07-19), release commit `bcea95a`, work commit `e689d07`, `docs/DS-6.9B4B-DS-Hover-Aware-TableRow.md`, `docs/DS-6.9B4B-R-Release-0.8.3.md`, `docs/engineering-notes/23-row-identity-and-pointer-coordination.md`, and the published tarball.

### Added

- **`TableRow` gains `id?: string`** (DS-6.9B4B-DS) — a stable DOM identifier, so another control can point at the row (an expand toggle's `aria-controls` naming the detail row it discloses). The design system neither generates nor namespaces the value; uniqueness is the caller's.
- **`TableRow` gains `onMouseEnter?` / `onMouseLeave?`** — row-level pointer handlers forwarded to the `tr` unchanged, for coordination *outside* the row: highlighting a matching shape in a canvas, prefetching a detail panel, driving a companion visualisation.
  - **Row-level, not cell-level, is the point.** Because they sit on the `tr`, moving the pointer between cells does not fire `onMouseLeave`, so the hovered row stays stable while the pointer travels across it.
  - The design system does not own or store hover state — it only delivers the events. `interactive`'s own hover styling is independent of these handlers.
- All three props are optional and additive; root exports unchanged at **609**.

## 0.8.2

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.8.2` (2026-07-19), release commit `dc0102a`, and a byte-for-byte comparison of the published 0.8.1 and 0.8.2 tarballs.

### Notes

- **No functional change. This release is byte-identical to 0.8.1.** Every file under `dist/` — JavaScript, type declarations and `styles.css` — matches 0.8.1 exactly, verified by comparing the two published tarballs.
- The only commit between the two tags is `d5ee3b8`, the DS-6.9B4A-R release report for 0.8.1 — documentation, with no `src/` change.
- **Why a version was spent on it:** the release workflow of this period could only bump-and-publish. It had no mode that ran the pipeline over an already-committed version, so running it after a documentation-only commit necessarily produced a new version number carrying identical content. That limitation was removed in DS-7.3a-R1, which added an explicit `committed` mode.
- Consumers on 0.8.1 gained nothing by upgrading to 0.8.2, and lost nothing either.

## 0.8.1

> **Reconstructed in DS-7.4c.** Evidence: tag `design-system-v0.8.1` (2026-07-19), release commit `79d618e`, work commit `16cb78f`, `docs/DS-6.9B4A-Modifier-Aware-Table-Selection.md`, `docs/DS-6.9B4A-R-Release-0.8.1.md`, `docs/engineering-notes/22-modifier-aware-table-selection.md`, and the published tarball.

### Added

- **`TableSelectionCell`'s `onChange` receives the native change event** (DS-6.9B4A) — the signature widens from `(checked: boolean)` to `(checked: boolean, event: ChangeEvent<HTMLInputElement>)`.
  - The second argument exists so a caller can read modifier keys off the event — `event.nativeEvent` carries `shiftKey`, `metaKey` and friends — and drive a modifier-aware selection model, the same way `TableRow` already passes its click event.
  - **The design system takes no position on which model that is.** Plain-vs-shift additive selection, range selection and select-through-to-anchor are all left to the caller.
  - **Additive, not breaking.** A callback that only needs the checked state keeps its one-argument signature and remains assignable; the extra argument is simply ignored.
- Root exports unchanged at **609** — this is a prop contract change, not a new export.

## 0.8.0

### Added

- **`DrawerEdge` gains `"left"`** (DS-5Q) — the edge vocabulary is now `left | right | bottom`. `right` remains the default and the inspector/detail convention, `bottom` is the mobile sheet, and `left` is the navigation convention (a library or nav panel docked to the reading edge in LTR).
  - **Added on demonstrated, *paired* need.** One usage is normally thin evidence (DS-5L), but the consuming application renders a left-docked device library **and** a right-docked settings panel on the same screen. Neither existing edge could express that: `right` collides with the inspector's meaning and position, and `bottom` converts a persistent library into a mobile sheet — changing the interaction model to work around an API limit. The alternative, a `className` position override in the application, would re-implement Drawer positioning outside this system.
  - `left` mirrors `right` on the x axis and nothing else: `left-0` instead of `right-0`, `x: "-100%"` instead of `x: "100%"`, and `border-r` instead of `border-l` (**the border faces the content**, so a left drawer borders on its right).
  - Focus trap, Escape, backdrop dismiss, body lock, portal and the shared `DialogContext` are edge-independent and untouched. `left` adds **no** reduced-motion branch — motion is disabled globally and `left` only changes the sign of an offset.

### Changed

- The panel border moved from a two-way ternary (`edge === "right" ? "border-l" : "border-t"`) into an `edgeBorderClass` map. With three edges a two-way ternary silently mislabels one of them.
- **`right` remains the default, so every existing `Drawer` consumer is unchanged.** Widening an accepted input union is additive, not breaking.

## 0.7.0

### Added

- **`Spinner`** (DS-5P) — the **bare tier** of the loading family: a busy indicator and nothing else, for embedding inside a layout the application owns (status rows, toolbars, table overlays, cards, menus, inline labels). Sizes `xs`/`sm`/`md`/`lg` (12/14/16/24px) on the shared glyph scale.
  - **`aria-hidden` by default, `role="status"` only when given a `label`.** This is the design, not an oversight: the dominant real usage is a glyph beside visible text inside a container the caller has *already* marked `role="status"`/`aria-live`, and announcing there would nest one live region inside another and double-announce. A label is the signal that the spinner is the sole indication anything is happening.
- **`size?: "sm" | "md"` on `EmptyState`** (DS-5P) — `md` (default) is the primary page-level state and renders exactly as before (44px badge, `py-10`); `sm` is the operational density for inspectors, table regions, library panels and console cards (**28px badge**, `py-8`, compact type). The title stays a real `<h4>` at both steps — `sm` shrinks the type only, so density never costs semantics.
- **`size?: "sm" | "md"` on `TableEmptyState`** — same vocabulary, scaling cell padding only (`py-12` → `py-6`); its type is already dense at both steps because a table body is an operational surface.
- **`GlyphSize`** type exported — the four-step scale (`xs`/`sm`/`md`/`lg`) for glyph-shaped things.

### Changed

- **`LoadingState` now composes `Spinner`** instead of owning a second copy of the same `Loader2 + animate-spin`. The same correction DS-5M made when `ComboboxField` came to compose `Combobox`. Its three sizes stay *region* dimensions (16/24/32px) passed through `className`, so **the rendering is unchanged**.
- **`IconButtonSize` is now an alias of `GlyphSize`**, not a second declaration of the same four names. No behaviour change — the per-component pixel maps stay with their components, since an icon button's glyph is sized relative to its button footprint while a bare spinner is sized absolutely.
- **Every default is unchanged, so this release is purely additive for existing consumers.**

## 0.6.0

### Added

- **`size?: "sm" | "md"` on `Tabs`** (DS-5O) — set **once on `Tabs`** and delivered to every `Tab` through context, so a tab bar is never sized item by item. `sm` renders a **28px** tab, the operational density workspace headers and inspector panes use; `md` is the default and preserves the previous `px-3 py-2 text-body-sm` rendering exactly (measured live at 40px, unchanged). A `Tab`'s count badge tracks the same density.
- **`size?: "sm" | "md"` on `SegmentedControl`** (DS-5O) — `sm` renders the **whole pill at 28px**; `md` is the default and unchanged (40px). The active fill is a background on the segment itself, so it follows the size automatically — there is no separately-positioned indicator to keep in sync.

### Changed

- **Navigation now reads its sizing from the shared `src/lib/control-size.ts` scale** (DS-5O) instead of hardcoding padding, joining `Button`, `Badge`, `Dialog`, `IconButton` and the form family on one `ControlSize` vocabulary. **No new size names were introduced.** With this, no component family in the system sits outside the scale.
  - `sm` on `SegmentedControl` also tightens the pill **track** to `p-px`: the track's padding and 1px border sit *outside* the segment, so sizing the segment alone left the control at 30px. Caught by live measurement rather than class assertions, and now pinned by a test.
- **Both defaults are `md`, so every existing consumer renders identically.** The change is purely additive.

## 0.5.0

### Added

- **`IconButton` gains a `pressed?: boolean`** (DS-5N) — the ARIA toggle-button pattern for an icon button that is currently on (a pinned filter, an active canvas tool). Renders `aria-pressed` plus a selected treatment, without overriding the variant the consumer chose. Left `undefined` for a plain action button, so `aria-pressed` is absent rather than `"false"`.
- **`IconButton` glyph sizing per footprint** — a 24px button no longer carries a 20px icon.

### Changed

- **`IconButton`'s size scale is now four steps: `xs` 24 · `sm` 28 · **`md` 32 (default)** · `lg` 40** (DS-5N), replacing the two-step `sm` 32 / `md` 40 introduced in 0.4.0. `md` is `Button`'s own `sm` and the control tier's `sm` (h-8), so an icon button sits flush beside either in a toolbar row; `lg` is `Button`'s `md` (h-10). `xs`/`sm` sit below that floor because dense table hover-actions and inspector rows demonstrably need them (DS-5L's "design around demonstrated need").
  - **This renames the two existing steps** (old `sm`=32 → new `md`; old `md`=40 → new `lg`) and changes the default from 40px to 32px. Done deliberately now: `IconButton` shipped in 0.4.0 and **has no consumers yet**, so the realignment is free at this moment and would be breaking at any later one. No other component is affected.

## 0.4.0

### Added

- **A bare control tier across the form family** (DS-5M, per the DS-5L architecture review). `TextInput`, `Textarea`, `Select`, `Checkbox`, `ToggleSwitch`, `SearchInput`, and the new `Combobox` now render **only the control** when given no `label` and no `helperText` — no stacked `flex flex-col` wrapper, no forced `w-full`, intrinsically sized — so they drop straight into toolbars, filter bars, and table rows. Passing `label`/`helperText` renders the stacked field exactly as before, so **every existing consumer is unchanged**. Bare usage takes its accessible name from `aria-label`/`aria-labelledby`.
- **`size?: "sm" | "md"`** on all seven controls, from a new shared scale in `src/lib/control-size.ts`. **`sm` lands on `h-8` — the exact height `Button`'s own `sm` renders** — so a control and a button in the same row align without hand-tuning. `md` is the default and preserves the previous padding-driven sizing byte for byte. *Documented exception:* `Textarea`'s `sm` sizes padding and text only — a textarea takes its height from `rows`, so pinning one would be wrong.
- **`Combobox`** — the bare typeahead control tier, extracted from `ComboboxField` (ARIA combobox pattern, Arrow/Enter/Escape, `role="listbox"` popup). `ComboboxField` now composes it instead of owning a second copy of the keyboard and listbox logic.
- **`leadingIcon`** on `Select` and `Combobox` — the filter-bar affordance operational rows rely on (`TextInput` already had one).
- **`IconButton`** — an icon-only button **built on `Button`** rather than beside it, so variants, focus ring, disabled, and loading can never drift. `aria-label` is **required** by the type. Square at `sm` (size-8) and `md` (size-10); `ghost` is the default variant.
- **`aria-label` / `aria-labelledby`** are now explicit props on `ToggleSwitch` and `SearchInput`, which previously had no accessible-name path when rendered without a visible label.
- **`ControlSize`** type exported.

### Changed

- Nothing removed or renamed; `md` remains every control's default. The one behavioural difference is that a control given neither `label` nor `helperText` no longer emits a wrapper `<div>` — the change that makes the operational tier possible.

## 0.3.0

### Added

- **Dialog composition family** (DS-5K) — `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose`. `Dialog` (and `Drawer`) become composed rather than configured: structure is assembled from these parts instead of passed as `title`/`footer` props. **`DialogTitle` and `DialogDescription` auto-register** their generated ids so the surface sets `aria-labelledby`/`aria-describedby` with **zero consumer id-plumbing** — via a shared internal `DialogContext` that both `Dialog` and `Drawer` provide (one implementation; the same parts compose inside a `Drawer`). `DialogClose` renders the canonical ✕ (`aria-label="Close"`) and closes via context. Backward compatible: a bare `<Dialog>{children}</Dialog>` still works, and `labelledBy`/`describedBy` remain as explicit override escape-hatches.
- **`ConfirmDialog`** (DS-5K) — the canonical confirmation convenience, built on `Dialog size="sm"` + the composition parts + the DS `Button`. Props: `open`, `onOpenChange`, `onConfirm`, `title`, `description?`, `confirmLabel?`, `cancelLabel?`, `tone?: "default" | "destructive"`, `loading?`. `role="alertdialog"`; Escape cancels; focus defaults to the safe action (Cancel renders first); `loading` disables both actions and blocks dismissal. **No `warning` tone** — a confirm action is `default` or `destructive` (aligns with the DS-5G Button decision). No application logic — the consumer owns copy and intent. Resolves the DS-6.4 gap.

### Changed

- **`Dialog`/`Drawer`: `dismissible` now also gates Escape** (previously it gated only backdrop click). A non-dismissible surface (`dismissible={false}`, e.g. blocking progress or a confirm mid-submit) is now inescapable by keyboard as well — the correct semantics for a blocking dialog. Default `dismissible={true}` so Escape still closes by default. `Dialog` also gains an optional `role?: "dialog" | "alertdialog"` (default `"dialog"`), and `Drawer` gains `describedBy` for parity. All additive/backward-compatible.

## 0.2.2

### Added

- **`Badge` gains an optional `dot` prop** (DS-5I) — renders a static, decorative indicator dot inside the pill, before the label, inheriting the badge's own `tone` (no second tone to pass). Purely additive: `dot` defaults to `false`, so every existing `<Badge>` renders identically, and the export surface is unchanged (a prop addition, not a new export). The dot is `aria-hidden` — the label text always carries the meaning. It is a static in-pill indicator, **not** a `PulseStatus` (the standalone/animated "live" status dot) and **not** a `StatusIndicator` (the dot-plus-label status row); those remain the primitives for those cases (DS-5B Classification 2 — same five-tone concept, different rendered recipe). Backed by a new internal `STATUS_TONE_DOT_CLASSES` map in `src/lib/tone.ts` alongside `STATUS_TONE_PILL_CLASSES`. No new tones: `StatusTone` stays `neutral`/`accent`/`success`/`warning`/`error`; presentation aliases (`info`/`blue` → `accent`) and lifecycle states (`draft`/`archived` → resolved to a canonical tone) are the consumer's mapping, not Badge tones (DS-5H). See `docs/DS-5H-Badge-Semantic-Architecture.md`.

## 0.2.1

### Added

- **`Button` gains a `destructive` variant** (DS-5G) — for irreversible actions (delete/discard/remove). Solid weight, composed from the existing `--color-error` token (the same token `MenuItem`/`BulkActionButton` already use for their `destructive` prop) — no new token, no application colour. Purely additive: the four existing variants render identically, and the export surface is unchanged (a variant-union widening, not a new export). Deliberately **no `success` variant**: the DS-6 migration evidence (corrected) showed **zero** success-toned buttons in the app, and `success` is a status/feedback tone in this system, not an action colour — confirm/approve actions use `primary`.
- **`Workspace` family** — `Workspace`, `WorkspaceHeader`, `WorkspaceToolbar`, `WorkspaceBody`, `WorkspaceNavigation`, `WorkspaceContent`, `WorkspaceInspector`, `WorkspaceFooter`, plus `workspaceDensityPadding`/`workspaceDensityHeaderHeight` and their prop types. The full-bleed application-shell primitive: header/toolbar/navigation/content/inspector/status regions, server-component-safe (no `"use client"` in the family), density via a `data-density` attribute and Tailwind group-variants rather than React context.
- **`SplitView` family** — `SplitView`, `SplitPane`, `SplitDivider`, plus their prop types. Divides a region (typically `WorkspaceContent`) into independently resizable, scrollable panes — pointer, touch, and keyboard resizing (WAI-ARIA Window Splitter pattern), controlled/uncontrolled sizing, consumer-controlled and interactive collapse. Requires a client boundary (the family's actual interactivity, unlike `Workspace`).
- **`--container-shell`** token (`theme.css` / shipped `styles.css`) — the outer site-shell width bound, distinct from the existing `--container-{narrow,content,wide}` content-width tokens.
- **`Card`'s `padding` prop now accepts `"none"`**, matching `Surface`/`Panel`'s existing `none`/`sm`/`md`/`lg` scale (DS-5A). Purely additive — every existing `sm`/`md`/`lg` usage renders identically; this does not appear in the API baseline diff since it's a prop-value widening, not an export-surface change.
- **`StatusTone`** (`neutral`/`accent`/`success`/`warning`/`error`) — the canonical semantic tone `Badge`'s own `tone` prop accepts, now exported for the first time (DS-5B). Previously nothing existed to import, which is why eight internal files each redeclared the identical unexported union independently; this is that root cause fixed, not a new capability — `Badge`'s own accepted values are unchanged. `import { type StatusTone } from "@studiopod/design-system"`.
- **Every structural layout primitive's own `Props` type, now exported** (DS-5C): `StackProps`, `InlineProps`, `GridProps`, `CardGridProps`, `ContentColumnsProps`, `SurfaceProps`, `PanelProps`, `GlassPanelProps`, `SurfacePanelProps`, `SeparatorProps`, `ScrollAreaProps`, `DescriptionListProps`, `SectionShellProps`, `ContainerProps`, `ClusterProps` — matching the pattern `WorkspaceProps`/`SplitViewProps` already established. Purely additive; no existing prop, default, or behavior changed. Also newly exported: `CardGridColumns`, `ContentColumnsRatio`/`ContentColumnsGap`/`ContentColumnsAlign`, `SectionShellBackground`/`SectionShellSpacing` — local scale types that were never public before this release, so exporting them at the same time as giving them the family's established `ComponentNamePrefix` naming convention carries no compatibility cost. See `docs/engineering-notes/16-layout-primitive-consistency.md`.
- **`NavigationRail`'s `activeId` prop** (DS-5E) — a plain (non-scrollSpy) rail previously had no way to mark any item as current at all. Optional; omitting it renders identically to before. **`TopNavigationItemDef`'s `icon`/`badge` fields and `NavigationRailItemDef`'s `badge` field** (DS-5E) — both composites already rendered through `NavigationItem`, which already supported both; the item-def types just didn't pipe them through. All purely additive. See `docs/engineering-notes/18-navigation-family-consistency.md`.

### Fixed

- **`StatusIndicator` had no accessibility wiring at all** — a status transition (e.g. idle -> active -> error) was rendered purely visually (color/pulse change + text swap) with nothing for assistive tech to pick up, unlike every other component in the feedback family (DS-5D's family audit). Fixed by adding `role="status"`/`role="alert"` to its root, mirroring the same `feedbackRole()` convention `Alert`/`Banner`/`Notification`/`EmptyState`-family/`FieldError`/`ValidationSummary` already use. No prop or visual change — every existing `<StatusIndicator status="..." />` call renders identically, just with a role attribute it didn't have before. See `docs/engineering-notes/17-feedback-family-consistency.md`.
- **`MetadataRow`/`MetadataField` had no label-value semantics at all** — a plain div/span structure with zero programmatic association between a label and its value, despite both existing specifically to visually mirror `DescriptionList`'s own real `<dl>` row (DS-5F's family audit called this "the single most important finding" of the phase). Fixed by rendering both as real `<dl>`/`<dt>`/`<dd>`, using `display: contents` on the `<dt>`/`<dd>` wrappers so they add zero layout footprint — every existing usage renders with byte-identical classes on the inner label/value elements, just now correctly wrapped in semantic markup. See `docs/engineering-notes/19-data-display-family-consistency.md`.

### Changed

- **Internal only, no consumer-visible effect:** `Card`, `Surface`, `Panel`, `GlassPanel`, and `SurfacePanel` now read their padding classes from one of two shared maps (`src/lib/spacing.ts`, DS-5A) instead of five independent, partially-duplicated local ones. `Card`/`Surface`/`Panel` share `SurfacePadding` (already public, unchanged path); `GlassPanel`/`SurfacePanel` share a new internal-only `SpotlightPadding`. Every value every component already rendered for renders identically — see `docs/engineering-notes/14-spacing-consolidation.md` for the full audit and why the two padding families were kept separate rather than merged into one.
- **Internal only, no consumer-visible effect:** `FilterChip`, `SavedFilter`, `ProgressRing`, and `PipelineStep` now read their tone/color classes from a shared constant (`src/lib/tone.ts`'s `STATUS_TONE_PILL_CLASSES`, or a sibling file's own exported map) instead of an independently hand-typed copy (DS-5B). Every value every component already rendered renders identically — confirmed by a full production build and a direct grep of the compiled CSS bundle for the affected classes, not assumed. See `docs/engineering-notes/15-tone-consolidation.md`.

### Removed

- **`--color-ink-inverse`** token — confirmed unused anywhere in this package or the documentation site, and never documented on the public tokens page or `API.md`. Removed directly rather than through `VERSIONING.md`'s standard one-release deprecation window: that window exists to protect a real, documented consumer-facing contract, and this value was never surfaced as one — it shipped in `styles.css` (technically installable via `var(--color-ink-inverse)` in a consumer's own CSS) but was never named on the public tokens page or in any prior CHANGELOG entry as something to depend on. If a real consumer *is* relying on it despite that, this is the breaking change to react to — flagged here explicitly rather than buried in a routine "Removed" line.

## 0.2.0 — tagged, never published

> **Documented in DS-7.4c.** Evidence: tag `design-system-v0.2.0` → `d949e1c`, the registry (which returns 404 for this version), and `docs/DS-5G-Release-Recovery-Revised.md`. This heading exists so the jump from `0.1.1` to `0.2.1` is not read as a missing entry.

- **The release was tagged but the publish failed**, on an invalid/expired `DS_NPM_TOKEN` (`E401`). The tag was pushed before `npm publish` ran, which is why a tag exists for a version the registry never received.
- **The version was deliberately abandoned** rather than re-cut: the tag already pointed at content without the DS-5G `destructive` variant, and touching tags required owner approval. The tag was left in place.
- `0.2.1` shipped everything `0.2.0` carried (Workspace, SplitView, DS-5A–F) **plus** DS-5G, so the registry steps cleanly from `0.1.1` to `0.2.1` and the `0.2.0` number is simply spent. No consumer ever saw it.
- The tag-before-publish ordering that stranded this tag was corrected in DS-7.3a-R1, which moved tagging after a verified publish.

## 0.1.1 — first published release

Version-only bump from the `0.1.0` content below — published through the real GitHub Packages release pipeline once the interlocks documented under "Removed (RM-5.5)" and "Added (RM-4)" were cleared (see `DISTRIBUTION.md` §7). No functional changes from `0.1.0`.

## 0.1.0 — unreleased (not published)

### Fixed (second RM-6 corrective patch — discovered during Web integration, before adoption)

- **`dist/index.js`, `dist/marketing.js`, and `dist/illustrations.js` never emitted a `"use client"` directive**, even though ~160 source files across the package declare one (every context-using hook/provider, `Toast`, `Tabs`, all overlay/navigation/operational/table/motion/form components, etc.). This broke the moment a real Next.js App Router consumer's Server Component transitively imported anything from these entries: Next bundled the entry into the server module graph, where `react`'s `react-server` export condition doesn't provide `createContext`/hooks, and the build failed at page-data-collection time. Root cause: `tsup.config.ts`'s `treeshake: true` makes esbuild actively drop any module-level directive prologue during bundling (esbuild logs "Module level directives cause errors when bundled" and removes it) — even one placed as the literal first line of the entry's own source file. This was never caught by RM-4/RM-5/RM-5.5/the first RM-6 corrective patch's verification because all of it used `react-dom/server`'s `renderToStaticMarkup` in a plain Node/`tsx` script, which never exercises Next's actual React Server Components compiler or client/server module boundary at all.
- Fixed with `scripts/inject-use-client.mjs`, run via `tsup.config.ts`'s `onSuccess` hook — prepends `"use client";` as plain text to `dist/index.js`, `dist/marketing.js`, and `dist/illustrations.js` after esbuild's own transform finishes, sidestepping the tree-shake/directive conflict entirely. `dist/tokens.js` is deliberately excluded (pure constants, no React import — a spurious directive would force it into the client bundle graph for every consumer that only wants plain values). No public exports, prop shapes, token values, or package version changed.
- Added `scripts/check-use-client.mjs` (`npm run package:use-client-check`) — an automated regression check asserting `dist/index.js`/`marketing.js`/`illustrations.js` each begin with the directive.
- See the corrective-patch commit message for the exact re-packed tarball shasum (not recorded here, for the same reason as the CSS fix below: this file ships inside the tarball it would be documenting).

### Fixed (first RM-6 corrective patch — discovered during Web integration, before adoption)

- **`dist/styles.css` was silently missing its entire `@theme` block** (all color/radius/shadow/spacing/easing custom properties from `theme.css`) in the tarball certified at the end of RM-5.5 (shasum `d15dfacebf111214fcb262a18333dde17b318193`). Root cause: `tsup`'s bundled PostCSS integration (via `postcss-load-config`) walks up the directory tree from its `cwd` looking for a PostCSS config, found the documentation app's root `postcss.config.mjs` (which configures `@tailwindcss/postcss`), and silently ran this package's `styles.css` entry through Tailwind's compiler in total isolation — with no content files to scan for utility usage, Tailwind pruned the entire `@theme` block as "unused." This package was never meant to run Tailwind's own compiler (see `README.md`'s CSS section); it ships plain concatenated token CSS for the consumer's own Tailwind build to process.
- Fixed by adding a package-local, empty `postcss.config.mjs` in `packages/design-system/` — `postcss-load-config` finds the nearer config first and never reaches the root one. No canonical token values, ordering, or public exports changed; verified via byte-level diff against the five source CSS files (only difference: esbuild's own CSS printer inserts a formatting space after `radial-gradient(`, present whenever this content is bundled through esbuild at all).
- Added `scripts/check-css.mjs` (`npm run package:css-check`) — an automated regression check asserting `@theme` and representative tokens from all five canonical source files are present, and in the correct order, in `dist/styles.css`. Not caught earlier because RM-4/RM-5/RM-5.5's CSS verification checked import ordering and generic selector markers, never the literal `@theme` keyword or a representative custom property.
- Version stays at `0.1.0` (not bumped) per the same pre-adoption exception RM-5.5 used: this fix landed before any real consumer (RM-6's `studiopod-web` integration) actually adopted the package. See the corrective-patch commit message for the exact re-packed tarball shasum (not recorded here, since this file itself ships inside the tarball and editing it changes the hash it would be documenting).

### Added (RM-4)

- Initial package scaffold: `.` (root), `/tokens`, `/marketing`, `/illustrations`, `/styles.css` entry points, compiling directly from canonical `studiopod-design` source via tsup/esbuild.

### Removed (RM-5.5 — public API freeze)

Both removals happened before any real consumer adopted the package (RM-6 had not started), so the version was **not** bumped, per the versioning policy's explicit pre-adoption exception. Both remain bundled internally where still needed — only the public export was removed.

- Removed the `@/motion` low-level engine's ~30 symbols from the root entry (`Fade`, `Slide`, `Scale`, `Collapse`, `Expand`, `Crossfade`, `Stagger`, `Pulse`, `Highlight`, `Activate`, `Progress`, `ConnectorFlow`, `QueueFlow`, `PublishFlow`, `MotionDebugOverlay`, `ControlDockShell`, `DOCK_CLEARANCE_CLASS`, and the `resolveDuration`/`resolveDelay`/`resolveDistance`/`resolveScaleDelta`/`resolveEase`/`transition`/`stagger`/`sequence`/`repeat`/`flow`/`pulse` utilities and their token types) — reclassified as internal transitive dependencies. See `API.md` for the full rationale.
- Removed `IllustrationDevProvider`, `useIllustrationDev`, `useIllustrationDevControls`, `IllustrationDevState` from the `/illustrations` entry — documentation-playground debug tooling, not consumer API. See `API.md`.

### Changed (RM-5.5)

- `@/components/motion`'s `StaggerGroup`/`StaggerItem` no longer need an `Engine*`-prefixed sibling export — removing `@/motion`'s public export eliminated the naming collision that prefix existed to resolve.

### Governance added (RM-5.5)

- `API.md` — frozen public API contract, per-family classification, marketing/illustrations/tokens/CSS/dependency contracts, portability caveats.
- `VERSIONING.md` — semantic versioning policy, pre-1.0 discipline, deprecation procedure.
- `api-baseline/*.json` + `scripts/check-api.mjs` (`npm run package:api-check`) — automated export-surface drift detection.
