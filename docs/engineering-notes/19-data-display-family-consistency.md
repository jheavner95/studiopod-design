# 19. Data Display Component Consistency (DS-5F)

DS-5C/5D/5E consolidated the layout, feedback, and navigation families respectively. DS-5F closes the loop on the last major component-family consistency phase before application migration: every component whose primary job is presenting data — the Table family (14 components: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableHead`, `TableSelectionCell`, `TableStatusCell`, `TableActionCell`, `TableEmptyState`, `TableLoadingState`, `TableToolbar`, `ResponsiveRulesTable`), the Metadata family (16 components: `MetadataGroup`, `MetadataRow`, `MetadataField`, `MetadataValue`, `MetadataLabel`, `DescriptionList` (re-export), `IdentityBlock`, `PropertyGroup`, `PropertySection`, `RelationshipList`, `StatusSummary`, `HealthSummary`, `StatGroup`, `TagCollection`, `EmptyMetadata`, `LoadingMetadata`), plus `StatCard` (`ui/`). 31 real data-display primitives audited (`SectionHeader`, the 32nd item the work order named, turned out to be a family-boundary misclassification — see Part 1).

## Part 1 — Family audit and classification

**Several task-listed items don't exist as separate components.** No standalone `DataTable` exists — that's `DataGrid` in the operational layer, confirmed (via its own imports) to compose the Table family directly rather than reimplementing it; a different, higher layer, out of scope. No `Avatar`/`AvatarGroup` exists anywhere in the codebase. `Timeline` only exists under `workflow/` (explicitly excluded per this phase's own "workflow visualization" exclusion). No generic bare `List` wrapper exists — `RelationshipList` (a specific list-of-linked-objects shape) is the closest match. `EmptyRow`/`LoadingRow` are `TableEmptyState`/`TableLoadingState` (both literally render `<tr>`). `KeyValueList`/`DefinitionList` are `DescriptionList`. `PropertyList` is `PropertyGroup`. `TagList` is `TagCollection`. `Stat`/`Metric` are `StatCard` (singleton) and `StatGroup` (its collection wrapper).

**`SectionHeader` is not a data-display component.** It's a generic eyebrow+heading+description page-section title utility, used on 48+ docs pages across every family (navigation, forms, overlays, feedback — not just data display) with zero data-presentation responsibility of its own. Included in the work order's scope list but excluded from this phase's actual consolidation work as a family-boundary misclassification, consistent with how prior phases excluded components that turned out to belong elsewhere (e.g. DS-5E's `SegmentedControl`).

**Comparison matrix** (condensed — full per-component prop/ARIA/markup detail is in the audit transcript this note was synthesized from):

| Component | Semantics | Cardinality | Tests (before) |
|---|---|---|---|
| Table family (14) | Real `<table>`/`<thead>`/`<tbody>`/`<tfoot>`/`<tr>`/`<td>`/`<th scope>` throughout — **zero fake tables found** | Collection (dataset) | ❌ all 14 |
| DescriptionList | Real `<dl>`/`<dt>`/`<dd>` | Collection (list of pairs) | ✅ (tested under `layout/`, DS-5C) |
| MetadataRow / MetadataField | **Was**: plain div/span, no list semantics. **Now**: real `<dl>`/`<dt>`/`<dd>` (DS-5F fix) | Singleton (one pair) | ❌ → ✅ |
| MetadataValue / MetadataLabel | Plain `<span>` — correct, these are the leaf primitives `<dt>`/`<dd>` wrap | Singleton (one field) | ❌ → ✅ |
| RelationshipList / TagCollection / StatusSummary | Plain div/span, no `<ul>`/`<li>`/`role="list"` | Collection (unlabeled as a list) | ❌ all 3 |
| IdentityBlock | Plain spans, no heading element for `name` | Singleton (one record's identity) | ❌ |
| StatCard | Plain spans, no `<dl>` tying value to label | Singleton (one metric) | ❌ → ✅ |
| StatGroup / HealthSummary | Grid of tiles | Collection | ❌ → ✅ |

**Classification of every inconsistency found:**

1. **`MetadataRow`/`MetadataField` running as a parallel, semantically unequal label/value system alongside `DescriptionList`'s real `<dl>` — Classification 3 (duplicate implementation), fixed.** The audit's own words: "the single most important finding of the audit." Both components' own doc comments already described themselves as "the same row shape DescriptionList uses... the standalone version" — a deliberate *visual* parity that had drifted into *semantic* inequality no one had corrected. See Part 4.
2. **`RelationshipList`, `TagCollection`, `StatusSummary` render collections with no list semantics (`role="list"` or real `<ul>/<li>`) — Classification 5 (future work), documented, not fixed.** Real but lower-severity than the `<dl>` gap (each renders visually-clear discrete items even without list semantics, unlike a label/value pair where the *association*, not just the grouping, was the missing piece); fixing three components' underlying element structure in one phase, on top of the `<dl>` fix, would exceed this phase's "implement only clear, family-local improvements" discipline.
3. **`Table` vs. `ResponsiveRulesTable` — Classification 1 (intentional), not a duplicate.** `ResponsiveRulesTable`'s entire implementation is composition of `Table`/`TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell` — zero new markup, 100% inherited accessibility. This is the *reference pattern* for how a specialized table variant should be built, held up explicitly rather than treated as a consolidation target.
4. **`StatCard`/`StatGroup` vs. `HealthSummary`/`StatusSummary` — four components summarizing "a record's numbers/state," two unrelated implementations — Classification 1 (intentional), not consolidated.** `StatGroup` is a pure passthrough grid over `StatCard` (confirmed: zero markup of its own). `HealthSummary` and `StatusSummary` both express state-rollups but via genuinely different types (`HealthState`'s 4-value enum with a colored-dot tile vs. generic `StatusTone` rendered as plain `Badge`s) and different visual weight (a bordered detail tile vs. an inline pill row) — real, defensible differences in specificity, not drift. Considered merging and rejected, matching DS-5A's precedent for `GlassPanel`/`SurfacePanel` vs. `Card`.
5. **`density` (Table-family-only) never extended to the Metadata family — Classification 5 (future work), not implemented.** No component in `metadata/` accepts or reads a density concept despite presenting the same conceptual "rows of fields" shape Table's own rows do. Real but speculative — defining what "compact metadata" even means is a bigger design decision than this phase's "normalize only genuine inconsistencies" charter covers.
6. **`TagCollection` hardcodes every tag to `tone="neutral"` despite wrapping `Badge`, which supports arbitrary tones — Classification 5 (future work), not implemented.** Closing it means widening `tags: string[]` to accept per-tag tone objects, a real API shape change bigger than this phase's conservative mandate.
7. **`TableFooter` had zero live demo on the docs site, and `EmptyMetadata`/`LoadingMetadata` had zero documentation anywhere at all — Classification 4 (documentation inconsistency), fixed.** See Part 5.
8. **All 31 real data-display components had zero test coverage** — Classification 5 (future work), now closed for 22 of them. See Part 6.

**No other Classification 3 (duplicate implementation) survived the audit** — `IdentityBlock` vs. `MetadataGroup`/`PropertyGroup`/`PropertySection` was checked and confirmed non-overlapping (fixed identity header vs. open-ended field containers).

## Part 2 — Display philosophy

**Tabular vs. descriptive**: the Table family presents *rows of same-shaped records* — a dataset where every item has the same columns, compared against each other. The Metadata family presents *one record's own fields* — a fixed, usually-heterogeneous set of facts about a single object. These are genuinely different jobs; `foundation-table`'s own "When NOT to use tables" guidance already states this correctly: "A single record's own detail (use Description List)... a small fixed set of options (use List or Cluster)."

**Structured vs. freeform**: `Table`, `DescriptionList`, and (as of this phase) `MetadataRow`/`MetadataField` are structured — real semantic HTML carrying the label-value or row-column relationship in the DOM itself. `IdentityBlock`, `RelationshipList`, `TagCollection`, `StatusSummary` are freeform — visually clear, but the relationship between elements is conveyed by proximity/styling, not markup.

**Summary vs. detailed**: `StatCard`/`StatGroup`/`HealthSummary`/`StatusSummary` are summary-tier — a compressed, at-a-glance view of a metric or state, deliberately without room for elaboration. `PropertyGroup`/`PropertySection`/`DescriptionList`/full Table rows are detailed-tier — the actual field values themselves, not a rollup of them.

**Identity vs. metadata**: `IdentityBlock` owns "what am I looking at right now" — one fixed shape (icon, name, type, one status badge), intentionally narrow, always first in any metadata layout per `foundation-metadata`'s own documented "Identity first" rule. Everything else in the Metadata family owns "what else is true about it" — open-ended field sets with no fixed shape.

**Collection vs. singleton**: this axis runs through nearly every pair in the family and is the cleanest way to understand several components that look similar: `StatCard` (singleton) → `StatGroup` (its collection wrapper, pure passthrough); `MetadataField`/`MetadataRow` (singleton, now real `<dl>`) → `DescriptionList` (the real multi-item list, `items` array); a single `Badge` → `StatusSummary`/`TagCollection` (their collection wrappers). The pattern is consistent: singleton components take direct `label`/`value`/`name` props, collection components take an `items`/`metrics`/`tags` array and render N of the singleton shape.

**Ownership boundaries**: Table family owns *datasets*. Metadata family owns *one record*. `StatCard` (ui/) is the one true numeric-metric atom, reused by `StatGroup` and, outside this family, by the operational layer's `MetricCard`. No component in this family reaches into another family's territory — the one boundary worth naming explicitly: metadata presents, forms edit — nothing in the Metadata family accepts an `onChange` or owns editable state, a rule `foundation-metadata`'s own "When to use" section already states as its first guidance.

## Part 3 — API consistency

Reviewed `title`, `label`, `value`, `icon`, `badge`, `status`, `tone`, `size`, `density`, `alignment`, `responsive`, `loading`, `empty`, `children`, `className` across all 31 components (full matrix in the audit transcript). **No API changes were made.** Every gap found resolved to either a genuine, defensible design difference or a real-but-speculative future-work item bigger than this phase's conservative mandate (density on Metadata, per-tag tone on TagCollection — see Part 1 findings #5/#6). `loading`/`empty` states are handled consistently as sibling components across both families (`TableLoadingState`/`TableEmptyState`, `LoadingMetadata`/`EmptyMetadata`) rather than boolean props on the data-bearing components themselves — confirmed as a real, consistent, intentional pattern, not drift. `className`/`children`-or-typed-data-prop are the two most consistent props across the entire family, present on virtually every component.

## Part 4 — Accessibility

The Table family was already in excellent shape going in — real semantic HTML throughout, `aria-sort` correctly wired on `TableHead` (only present when `sortable`, correct native `ascending`/`descending`/`none` values, a real `<button>` for keyboard operability rather than a clickable `<th>`), `aria-selected` on `TableRow`, real `scope="col"|"row"` everywhere. No fake tables found anywhere in the audit.

**The one real gap, and the one improvement implemented**: `MetadataRow` and `MetadataField` rendered as plain `<div>`/`<span>` structures with **no label-value association at all** — despite both existing specifically to visually mirror `DescriptionList`'s own real `<dl>` row. Fixed: both now render as real `<dl>`/`<dt>`/`<dd>`, using Tailwind's `contents` utility (`display: contents`) on the `<dt>`/`<dd>` wrappers so they add zero layout footprint — the `MetadataLabel`/`MetadataValue` spans inside remain the actual flex items, byte-identical to the pre-fix DOM in every visual respect. Live-verified in the browser: the rendered markup shows the exact same classes on the inner spans as before, now correctly wrapped in semantic `<dt>`/`<dd>` inside a real `<dl>`.

Also found, documented, not fixed (each a real gap, individually smaller than the `<dl>` fix, and implementing all of them in one phase would exceed the "implement only clear, family-local improvements" discipline): `RelationshipList`/`TagCollection`/`StatusSummary` render collections with no `role="list"`/real `<ul>`/`<li>`; `IdentityBlock`'s `name` renders as a plain `<span>`, not a heading element; `TableHead`'s `aria-sort` change has no accompanying live-region announcement of the sort event itself (the attribute-change mechanism is correct but secondary to a robust announcement).

## Part 5 — Documentation

- Added a `TableFooter` demo to `foundation-table`'s `StatesDemo.tsx` — the one Table-family component with zero live demo despite being fully documented in prose/catalog. Shows a real totals row alongside every table state.
- Added `EmptyMetadata` and `LoadingMetadata` demos to `foundation-metadata`'s `ComponentGallery.tsx` and `_data/components.ts` — **the two components in the entire 31-component audit with zero documentation-site footprint at all** (no page, no gallery, no data file, no catalog entry), now closed.
- Updated `MetadataRow`'s own `_data/components.ts` accessibility description, which had become stale the moment the `<dl>` fix landed (it previously stated "Not a semantic list on its own" — now inaccurate).
- Fixed a stale hardcoded count ("Ten components") in `foundation-metadata/page.tsx`, now read live from `METADATA_COMPONENTS.length` so it can't drift out of sync again, matching the precedent DS-5C set for `foundation-layout`.
- **No other stale documentation found.** Both families' existing "When to use" guidance, cell-type reference tables, responsive/composition sections, and Do/Don't content were reviewed against current source and found accurate.
- Live-verified in the browser: both docs pages load with no console errors; the `TableFooter` demo and both new Metadata demos render correctly; the `<dl>`/`<dt>`/`<dd>` fix confirmed via direct DOM inspection to produce byte-identical classes on the inner label/value spans.

## Part 6 — Testing

Added test files for 22 of the 31 real data-display components: the full Table family minus the four pure structural wrappers (`TableHeader`, `TableBody`, `TableToolbar` — trivial rendering with no real logic; `ResponsiveRulesTable` — a pure composition of already-tested Table primitives, per Part 1 finding #3), plus `MetadataRow`, `MetadataField`, `MetadataValue`, `IdentityBlock`, `PropertyGroup`, `RelationshipList`, `StatusSummary`, `HealthSummary`, `StatGroup`, `TagCollection`, `EmptyMetadata`, `LoadingMetadata`, and `StatCard`. Not tested: `MetadataGroup`, `MetadataLabel`, `PropertySection`, `DescriptionList` (already tested under `layout/`, DS-5C) — each a thin structural wrapper with no logic of its own beyond what its children already cover.

Every file follows the established `rendering`/`state coverage`/`accessibility` convention; `TableRow`, `TableHead`, and `TableSelectionCell` additionally required an `interaction` block for their real keyboard/click logic (Enter/Space row activation, sort button clicks, checkbox change + click-propagation-stopping). `MetadataRow`/`MetadataField`'s tests directly verify the `<dl>`/`<dt>`/`<dd>` fix. 111 new tests. Full suite: **554 tests across 83 files, all passing** (up from 443/61 before this phase). Not inflated — `TableActionCell`, `EmptyMetadata`, `StatCard`, and other genuinely thin components get proportionately small (3–4 test) files rather than padded counts.

## Part 7 — Certification review

`CERTIFICATION_REGISTRY` (`src/lib/certification.ts`) is **unchanged** — still exactly Button (`Certified`), Workspace (`Production Ready`), SplitView (`Production Ready`). No data-display component was added or certified.

**Recommendations only, not acted on**: `Table`, `TableRow`, `TableCell`, `TableHead` are the strongest candidates — real semantic HTML, correct `aria-sort` wiring, full keyboard interaction coverage, now-complete tests, and the family's most heavily-reused primitives (composed by `ResponsiveRulesTable` and the operational layer's `DataGrid` alike). `MetadataRow`/`MetadataField` are meaningfully stronger candidates than before this phase — the `<dl>` fix closed their one real accessibility gap. `DescriptionList` (already tested, real `<dl>` semantics, DS-5C-clean) remains a strong candidate. `StatCard` and `TableStatusCell` are reasonable next-tier candidates. `RelationshipList`/`TagCollection`/`StatusSummary` should **not** be near-term candidates — their list-semantics gap (Part 4) should close first.

## Part 8 — Validation

- `npx tsc --noEmit` — clean.
- `npx eslint` — clean.
- `npx vitest run` — 554/554 passing across 83 files.
- `npm run verify:full` — all 7 steps pass; API baseline unchanged (the `<dl>`/`<dt>`/`<dd>` fix is an internal markup change, not an export-surface change).
- `npm run certification:report` — unchanged (Button/Workspace/SplitView, same levels).
- `npm run token:report` — unchanged (same pre-existing, pre-DS-5F findings only).
- `npm run package:build` + package verify — clean.
- Live browser verification: both `foundation-table` and `foundation-metadata` docs pages load with no console errors; the `<dl>`/`<dt>`/`<dd>` fix confirmed via direct DOM inspection to preserve every original class on the inner label/value spans; the new `TableFooter`, `EmptyMetadata`, and `LoadingMetadata` demos all render correctly.

## What this phase deliberately did not do

Per its own closing constraints: no component was visually redesigned, no application page was migrated, the package was not published, and no additional component was certified. `Button`, `Workspace`, and `SplitView` were not touched. `RelationshipList`/`TagCollection`/`StatusSummary`'s missing list semantics, Metadata's missing `density` concept, and `TagCollection`'s hardcoded tone were all found and documented but deliberately left unfixed, to keep this phase's accessibility work to the one clear, well-scoped `<dl>`/`<dt>`/`<dd>` fix.

## This was the last of the DS-5 component-family consistency phases

DS-5A (spacing) → DS-5B (tone) → DS-5C (layout) → DS-5D (feedback) → DS-5E (navigation) → DS-5F (data display) close out every major component family audited under this numbering. The foundations — tokens, spacing, tone, structural primitives, feedback, navigation, and now data display — are each internally coherent, documented, and tested. What they do *not* yet have: any real (non-playground) application-page adoption anywhere in this codebase — every phase in this series has been explicitly forbidden from migrating application pages, by design, so this is not an oversight to flag but the expected state of a design-system-first build-out. That adoption question is the natural next phase.
