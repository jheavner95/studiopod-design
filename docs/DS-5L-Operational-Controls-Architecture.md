# DS-5L — Operational Controls Architecture Review

**Verdict:** ✅ **CERTIFIED WITH DEFERRED ITEMS.**

The DS-6.5 gap is real, but **"compact forms" is not quite the right framing, and a new Operational Controls family is the wrong fix.** The Design System already has the correct two-tier architecture — a bare control tier (`Select`, `Checkbox`, `ToggleSwitch`, `TextInput`) beneath a field-wrapper tier (`SelectField`, `CheckboxField`, …). The defect is that **the base tier is not actually bare**: it renders the stacked wrapper, optional label, and `w-full` that belong to the field tier, and it has no size scale — while `Button`, `Badge`, and `Dialog` all already have one. Fixing the base tier resolves DS-6.5 without a parallel component family.

One implementation work package — **DS-5M** — must ship before DS-6.5 resumes. No code was written; the application was not touched.

---

## Phase 1 — Is "compact forms" the right problem?

**Partly. The density gap is real, but it is a symptom.** Categorising the app's 70 control usages plus its adjacent controls:

| Category | App controls | Uses | Labelled? | Validation? | Layout |
|---|---|---|---|---|---|
| **Form Fields** | `Input`, `Textarea`, `Select`(form), `SearchInput` | **21** | visible label | yes (`error`) | stacked, full-width |
| **Toolbar / Filter Controls** | `StudioSelect`, `StudioCombobox`, `StudioSwitch` | **47** | `aria-label` only | none | inline, auto-width, compact |
| **Table Controls** | `StudioCheckbox` (row/select-all) | 2 | `aria-label` | none | inline, in a cell |
| **Icon Controls** | `IconButton`, `ToolbarButton` | 11 | `aria-label` | none | inline |
| **Filter Tokens** | `FilterChip`, `FilterChipGroup` | 62 | — | none | wrapping cluster |
| **Raw/native** | `<input>` 160, `<select>` 41, `<textarea>` 33, `type="number"` 23 | 257 | mixed | mixed | inline |

**Density evidence (quantitative):** `h-7` (28 px) appears **172×**, `h-8` (32 px) **113×**, `h-10` (40 px — the DS form-control height) only **38×**. StudioPOD is a dense operational tool; the DS form family's single ~40 px size is a genuine mismatch, not a preference.

**Canonical taxonomy — two tiers, not six families:**

1. **Control** — the interactive element itself (a `<select>`, a checkbox, a switch, a text input). Identical mechanics, keyboard behaviour, and AT semantics regardless of where it sits.
2. **Field** — a control *plus* the labelling, description, validation messaging, and stacked layout that a form requires.

"Toolbar", "Filter", "Table", and "Inspector" controls are **not distinct interaction patterns** — they are all *tier 1 controls used without a tier 2 field wrapper*, at a denser size. A filter-bar `<select>` and a form `<select>` are the same widget with the same keyboard and screen-reader contract. Treating them as separate families would fork one concept into two implementations — exactly what DS-5B rejected for tone ("same concept, different rendered recipe").

## Phase 2 — Operational Controls philosophy

**An operational control is a tier-1 control used bare:** it acts immediately on view state (filter, sort, toggle, select-row), is labelled by `aria-label` or an adjacent element rather than a visible `<label>`, carries no validation, and sits inline in a row someone else lays out.

**A form field** is a tier-1 control wrapped in tier 2: visible label, optional description, validation messaging, required indicator, stacked block layout, and participation in a submit/dirty flow.

| Concern | Owner |
|---|---|
| Control mechanics, keyboard, focus, disabled, ARIA role/state | **Tier 1 control (DS)** |
| Size / density | **Tier 1 control (DS)** — via a `size` prop |
| Visible label, description, error message, required indicator | **Tier 2 field wrapper (DS)** |
| Validation *logic* and error *content* | **Application** |
| Accessible name when unlabelled (`aria-label`) | **Application** (passed to tier 1) |
| Row/bar layout, grouping, alignment, overflow | **Application** (using DS `Inline`/`Cluster`) |

**Rule of use:** if a control needs a visible label or a validation message → use the `*Field` wrapper. Otherwise → use the bare control with `aria-label`.

## Phase 3 — Control families

| Control | Tier-1 bare needed? | Verdict |
|---|---|---|
| Select | ✅ 32 uses | **Operational + Form** (one component, both tiers) |
| Combobox | ✅ 8 uses | **Operational + Form** |
| Switch / Toggle | ✅ 7 uses | **Operational + Form** |
| Checkbox | ✅ 2 uses (table select) | **Operational + Form** |
| Search | ✅ | `SearchInput` is already bare-ish; needs `size` |
| Text / Numeric input | ✅ 23 numeric, inline editors | **Operational + Form** |
| Segmented Control | already bare in DS | **Operational only** (no field tier needed) |
| Icon Toggle / IconButton | ✅ 11 uses | **New DS component** — the DS has **no `IconButton`** |
| Button Groups | low demand | **Defer** — `Inline` + `Button` covers it; no demonstrated need |
| Slider, RadioGroup, DatePicker, FileUpload | form-only in this app | **Form only** — leave as-is |

**Nothing moves out of the form family.** Every one of these stays a single component that can render bare (tier 1) or wrapped (tier 2).

## Phase 4 — Layout architecture

**Recommendation: the DS should NOT ship `Toolbar` / `ToolbarGroup` / `ControlGroup` / `Spacer`.** The evidence is unusually direct:

- **The application already built exactly that family and does not use it.** `components/ui/Toolbar.tsx` (168 LOC) exports `Toolbar`, `PageToolbar`, `CanvasToolbar`, `ToolbarGroup`, `ToolbarDivider`, `ToolbarSpacer` — and measures **0 usages** of `Toolbar`/`ToolbarGroup`/`ToolbarSpacer`. Instead the app hand-writes **1,252** `flex items-center gap-*` rows.
- The DS already ships the layout primitives (`Inline` with gap/align/justify/wrap, `Cluster`) **and** the domain toolbars where structure genuinely repeats (`DataGridToolbar`, `TableToolbar`, `WorkspaceToolbar`, `FilterBar`, `DataGridFilters`, `FilterPopover`, `FilterGroup`, `ClearFilters`, `SortControl`, `ActiveFilterList`).

A generic toolbar container is **speculative API that the demonstrated need contradicts**. Ownership: **layout stays with the application** (composing DS `Inline`/`Cluster`); the DS owns only the *domain* toolbars it already ships. Density and spacing standards are expressed through the control `size` scale and `Inline`'s `gap`, not through a container. Overflow/responsive wrapping is already `Inline`'s `wrap`.

## Phase 5 — Component philosophy (shared primitive)

The tier-1 controls should share one **contract**, not one implementation wrapper:

| Aspect | Decision |
|---|---|
| **Default size** | `md` (current ~40 px) — no breaking change for existing DS consumers |
| **Size scale** | **`sm` \| `md`**, where `sm` aligns to `Button`'s existing `sm` (**`h-8`**). Not a new scale — the DS's own. |
| **Width** | Bare tier is **auto/intrinsic**; `w-full` belongs to the field tier (or opt-in via `className`) |
| **Wrapper** | Bare tier renders **only the control** (plus a chevron/box affordance) — **no `flex flex-col` wrapper, no label slot** |
| **Icon support** | `TextInput` already has `leadingIcon`/`trailingAction`; add leading-icon support to `Select`/`Combobox` (the app's `StudioCombobox` uses `icon`) |
| **Keyboard / focus / disabled** | Unchanged — native semantics, already correct |
| **Loading / clear / empty state** | `SearchInput` already has `loading` + clear; keep there, don't generalise |
| **Accessibility** | See Phase 6 |

**Shared primitive?** No shared *component* — a shared **size token map** and a shared **`OperationalSize` type** (`"sm" | "md"`), consistent with how `STATUS_TONE_PILL_CLASSES` centralises tone. Forcing a common wrapper component would recreate the very wrapper that causes the gap.

**Critically: a size scale is already canonical DS vocabulary** — `Button` (`sm` h-8 / `md` h-10 / `lg` h-12), `Badge` (`sm`/`md`), `Dialog` (`sm`/`md`/`full`). **The form family is the sole outlier**, and `TextInput`/`Checkbox` even `Omit<…,"size">`. Adding `size` here *removes an inconsistency* rather than introducing a concept.

## Phase 6 — Accessibility ownership

| Concern | Owner | Rule |
|---|---|---|
| `aria-label` | **Application → tier 1** | Bare controls must accept and forward it; **required** when no visible label |
| `aria-labelledby` | Application (or tier 2) | Tier 2 wires label→control automatically via `htmlFor` |
| `aria-invalid` / `aria-describedby` | **DS** | Tier 1 sets `aria-invalid` from `status`; tier 2 owns the described-by wiring to `FieldError` |
| Role/state (checked, expanded, disabled) | **DS** | Native elements — already correct; do not reimplement |
| Focus order | **Application** (DOM order in its own rows) | DS must not introduce focus traps or roving tabindex in bare controls |
| **Toolbar semantics (`role="toolbar"`)** | **Neither — deliberately omitted** | `role="toolbar"` implies roving-tabindex arrow-key navigation (ARIA APG). The app's filter bars are plain tab-stop rows; asserting the role without the behaviour would be *worse* than no role. `SegmentedControl` already implements the real roving pattern where it's warranted. |
| Group semantics | Application | Use `fieldset`/`aria-label` on the row when a group is genuinely one entity |

**DS responsibility:** never let a bare control ship without an accessible-name path — DS-5M should make `aria-label` (or `aria-labelledby`) contractually explicit in the bare-control types and documented as required.

## Phase 7 — Migration matrix

| App component | Uses | DS target | Class |
|---|---|---|---|
| `StudioSelect` | 32 | `Select` **bare + `size="sm"`** | **DS gap → resolved by DS-5M** (then Rename + Composition: `<option>` children → `options[]`) |
| `StudioCombobox` | 8 | `Combobox` bare + `size` + `leadingIcon` | **DS gap → DS-5M**; `align` → **Remove** (popover placement is DS-owned) |
| `StudioSwitch` | 7 | `ToggleSwitch` bare + `size` | **DS gap → DS-5M**; `onCheckedChange` → `onChange` **Rename**; `size` sm/md/lg → **sm/md** |
| `StudioCheckbox` | 2 | `Checkbox` bare + `size="sm"` | **DS gap → DS-5M**; `onChange(checked)` → native **Rename** |
| `SearchInput` | 2 | `SearchInput` + `size` | **Rename** (+ small gap: `size`) |
| `Input` / `Textarea` / `Select`(form) | 19 | `InputField` / `TextareaField` / `SelectField` | **Direct** (already compatible — DS-6.5 proved it) |
| `IconButton` / `ToolbarButton` | 11 | — | **New DS Component** (`IconButton`) |
| `Toolbar` family (app) | **0** | — | **Remove** (dead code; delete during DS-6.5) |
| `FilterChip` / `FilterChipGroup` | 62 | `FilterChip` / `Cluster` | **Deferred** — separate WP (not a form control) |
| Raw `<input>`/`<select>`/`<textarea>` | 257 | — | **Out of scope** — markup, not components; own WP |
| Numeric inputs (23) | — | `TextInput type="number"` + `size` | **Composition** |
| Button groups | — | `Inline` + `Button` | **Composition** — no new API |

## Phase 8 — Recommendation

**Recommendation: A — the existing Form family gains a true bare tier plus a compact size.** Not B (new Operational Controls family), not C (hybrid).

**Justification:**
1. **The DS already has the right architecture — it is just not honoured.** `Select` vs `SelectField` is exactly the control/field split this review concludes is correct. The bug is that `Select`, `Checkbox`, and `ToggleSwitch` each render a `flex flex-col` wrapper, an optional label, and `w-full` — duplicating tier 2's job. Making the base tier genuinely bare is a **correction**, not an expansion.
2. **A parallel family would duplicate one concept.** An `OperationalSelect` beside `Select` is two implementations of one native `<select>` with identical keyboard/AT contracts — the duplication DS-5B and DS-6 governance exist to prevent.
3. **A size scale is established DS vocabulary** (Button/Badge/Dialog). The form family is the outlier; aligning `sm` to Button's `h-8` needs no new tokens.
4. **The layout half of the problem is already solved and must not be re-solved.** The app's own unused 168-LOC Toolbar family, against 1,252 hand-written flex rows, is direct evidence that a toolbar container is unwanted. `Inline`/`Cluster` + the existing domain toolbars suffice.
5. **It is small and demonstrated.** Four bare-tier corrections, one `size` prop, one `leadingIcon`, one new `IconButton` — every item traceable to a measured app usage. No speculative API.

---

## Deliverables (summary)

- **Philosophy** — §2: tier-1 control vs tier-2 field; DS owns mechanics/density/labelling-chrome, app owns validation content, accessible names, and row layout.
- **Taxonomy** — §1: two tiers, not six families; "toolbar/filter/table/inspector control" = bare tier-1 at `sm`.
- **Inventory** — §3 + §7: 70 form-control usages + 11 icon buttons + 62 chips + 257 raw natives.
- **Layout architecture** — §4: **no** `Toolbar`/`ToolbarGroup`/`Spacer`; keep `Inline`/`Cluster` + domain toolbars; layout stays with the app.
- **Accessibility ownership** — §6, including the deliberate rejection of `role="toolbar"`.
- **Migration matrix** — §7.
- **Recommendation** — §8: Option A.

## Certification

**VERDICT: CERTIFIED WITH DEFERRED ITEMS.**

"Compact forms" was the presenting symptom; the architecture is a **control/field two-tier split that the Design System already models but does not honour in its base tier**. Operational controls are not a separate family — they are the same controls rendered bare, at a denser size, inside a row the application lays out. That conclusion is grounded in measurement, not preference: the app's density is `h-7`/`h-8` (285 occurrences) against `h-10` (38); a `size` scale already exists on `Button`, `Badge`, and `Dialog` but on no form control; and the application's own toolbar-container abstraction sits at **zero usages** against 1,252 hand-written flex rows, which is decisive evidence against building one in the DS.

**Deferred implementation — follow-up work package `DS-5M` (blocks DS-6.5):**
1. **Make the base tier bare.** `Select`, `Checkbox`, `ToggleSwitch` (and confirm `TextInput`) render only the control when no `label` is passed — no `flex flex-col` wrapper, no forced `w-full`. Backward compatible: passing `label` keeps today's stacked rendering.
2. **Add `size?: "sm" | "md"`** to `Select`, `TextInput`, `Textarea`, `Checkbox`, `ToggleSwitch`, `SearchInput`, `Combobox`; `sm` aligns to `Button`'s `h-8`. Default `md`. Centralise in a shared size-class map (the `src/lib/tone.ts` pattern).
3. **Add `leadingIcon`** to `Select`/`Combobox`; make `aria-label` contractually explicit for bare usage.
4. **Add `IconButton`** (icon-only button, `aria-label` required, `sm`/`md`).
5. Tests + docs/showcase; release **minor (`0.4.0`)**; bump the consumer.

DS-6.5 resumes **only** after DS-5M ships and the consumer is bumped.

**No implementation. No code changes. Stopping after DS-5L.**
