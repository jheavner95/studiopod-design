# 16. Layout Primitive Consistency (DS-5C)

DS-5A resolved spacing (padding/gap) drift and DS-5B resolved tone drift, both scoped to specific value vocabularies. DS-5C's job was different in kind: not another value audit, but a full-family consistency pass across all 17 structural layout primitives (Workspace, SplitView, Stack, Inline, Grid, CardGrid, ContentColumns, Surface, Panel, GlassPanel, SurfacePanel, Separator, ScrollArea, DescriptionList, SectionShell, Container, Cluster) — API shape, composition philosophy, documentation, examples, implementation, and testing, checked against each other as one family rather than in isolation.

## Part 1 — Family audit and classification

A full read of all 17 components' source (plus PageShell/GlobalNav/Footer, to confirm no undiscovered 18th primitive exists) against a uniform lens — purpose, props/defaults, composition model, naming, responsive behavior, accessibility, ref forwarding, implementation style, export pattern, test coverage, documentation coverage — surfaced the following. Every finding is classified 1 (intentional) / 2 (historical drift) / 3 (duplicate implementation) / 4 (documentation inconsistency) / 5 (future work).

**Naming — axis/size/scale props:**

| Component | Axis prop | Values | Notes |
|---|---|---|---|
| SplitView / Separator | `orientation` | horizontal / vertical | Binary axis |
| ScrollArea | `direction` | vertical / horizontal / **both** | Three-value axis — `both` has no binary equivalent |

**Classification 1 (intentional).** `direction` and `orientation` look like a naming inconsistency at a glance, but they aren't naming the same concept: `orientation` is a strict binary (a divider or split either runs one way or the other), while `direction` has a third state (`both`) that a binary `orientation` union cannot represent without a lie. Renaming `direction` to `orientation` would also be a breaking change to an already-public export (`ScrollDirection`), for a purely cosmetic gain against a real semantic difference. Left as-is; documented here rather than silently accepted so the next reader doesn't second-guess it.

**Gap defaults:**

| Component | Default gap | Notes |
|---|---|---|
| Stack / Grid / CardGrid / ContentColumns | `md` | |
| Inline | `md` | |
| **Cluster** | **`sm`** | The one outlier |

**Classification 1 (intentional).** Cluster's own purpose (tags, chips, badge collections — small discrete tokens) is tighter by design than Inline's general-purpose toolbar/metadata-row job, which Cluster is built directly on top of. A tighter default gap for a narrower, tighter-content use case is the same reasoning DS-5A already applied to Stack vs. Inline's own gap registers. Not changed.

**API surface — exported `XProps` interface:**

Before this phase: `WorkspaceProps`, `SplitViewProps`/`SplitPaneProps`/`SplitDividerProps` were exported; the other 15 components' prop interfaces were declared but never exported — despite every one of them being a public package component. This is the one finding in Part 1 that met the bar for a real, low-risk fix (see Part 2).

**Composition / dependency graph** (Part 3): traced and confirmed clean, one-directional, no cycles —

- `Panel` renders `Surface` directly (`elevation="panel"`) rather than re-declaring border/background/radius.
- `Cluster` renders `Inline` directly (`align="center" wrap`) rather than re-implementing flex-wrap logic.
- `SectionShell` renders `Container` directly for its width bound.
- `CardGrid` imports `Grid`'s own exported `gapMap` rather than redeclaring an identical one (already established in DS-4).
- `GlassPanel` / `SurfacePanel` and `Surface` / `Panel` are two separate families by design (DS-5A) — the former for spotlight/marketing moments, the latter for ordinary application UI — not layered on each other.
- No primitive imports `Workspace` or `SplitView` and vice versa; both compose within the family from the layout primitives (`Stack`, `Inline`, etc.), never the reverse.

**Documentation gaps** (Classification 4): `CardGrid`, `ContentColumns`, `Container`, `SectionShell` had zero dedicated documentation on the `foundation-layout` docs page despite three of them (`CardGrid` 78 usage sites, `SectionShell` 82, `Container` composed on every one of those 82) being among the most pervasively adopted primitives in the entire design system. Fixed — see Part 4.

**Test coverage gaps** (Classification 5, now closed): `Separator`, `ScrollArea`, `DescriptionList`, `SectionShell`, `Container`, `Cluster` had zero test files. Fixed — see Part 7. Every one of the 17 primitives now has a co-located test file.

**Cross-reference drift** (Classification 2 — historical, with a documented precedent): `foundation-layout`'s docs page hand-rolled its own `relatedComponents` array via `[getEntry(id)!, ...]` instead of reading `entry.related` through the shared `getRelated`/`getRelatedLinks` helpers — the exact anti-pattern `src/lib/design-system-navigation.ts`'s own doc comment on `getRelatedLinks` already warns about, citing a prior incident (`docs/engineering-notes/11-documentation-infrastructure.md §1`). As a direct consequence, `foundation-layout`, `foundation-workspace`, and `foundation-splitview` — three sibling pages in the same left-nav "Layout" group — had an inconsistent, non-reciprocal related-links graph (Workspace/SplitView linked to each other but not to Layout; Layout linked to neither). Fixed — see Part 4.

**No findings** in Classification 3 (duplicate implementation) survived the audit — the one apparent duplicate (`src/components/metadata/DescriptionList.tsx`) turned out to be a deliberate single-source re-export, already documented in its own file header, not two independent implementations.

## Part 2 — API consistency

**Changed:** every one of the 15 previously-unexported prop interfaces (`StackProps`, `InlineProps`, `GridProps`, `CardGridProps`, `ContentColumnsProps`, `SurfaceProps`, `PanelProps`, `GlassPanelProps`, `SurfacePanelProps`, `SeparatorProps`, `ScrollAreaProps`, `DescriptionListProps`, `SectionShellProps`, `ContainerProps`, `ClusterProps`) is now exported at its existing public import path, matching the precedent `WorkspaceProps`/`SplitViewProps` already set. Purely additive — 21 new named exports total (15 `XProps` interfaces plus 6 local scale types described below), confirmed via `packages/design-system/scripts/check-api.mjs` showing exactly these 21 as new, nothing removed or renamed from the existing public surface.

Three components had local scale types that were never exported at all — `CardGrid`'s `GridColumns`, `ContentColumns`' `ColumnRatio`/`ColumnGap`/`ColumnAlign`, `SectionShell`'s `SectionBackground`/`SectionSpacing`. Since none of these had ever shipped publicly, they were free to both export *and* rename to the component-name-prefixed convention every other exported scale type in the family already follows (`StackGap`, `InlineAlign`, `GridStrategy`, `SeparatorOrientation`, etc.) at zero compatibility cost: `CardGridColumns`, `ContentColumnsRatio`/`ContentColumnsGap`/`ContentColumnsAlign`, `SectionShellBackground`/`SectionShellSpacing`.

**Not changed:** `ScrollArea`'s `direction` prop and exported `ScrollDirection` type (see Part 1 — different value shape than `orientation`, and already public); `Cluster`'s `gap="sm"` default (see Part 1 — deliberate, not drift). No prop was renamed, removed, or had its default changed. `node packages/design-system/scripts/check-api.mjs` run before and after confirms the diff is exactly the 21 additive exports, nothing else.

## Part 3 — Composition philosophy

Documented in Part 1's audit above, not restated here. Summary: ownership is layered (`Surface` → `Panel`; `Inline` → `Cluster`; `Container` → `SectionShell`; `Grid`'s gap map → `CardGrid`), every dependency runs one direction, and no primitive in this family imports `Workspace` or `SplitView`. No changes were made — the existing dependency graph was already coherent; this phase's job was confirming and writing it down, not restructuring it.

## Part 4 — Documentation consistency

- Added `foundation-layout` gallery entries (purpose/examples/topics/usage/responsive notes/common mistakes, matching the existing 9 entries' depth) and Foundation Catalog entries for `CardGrid`, `ContentColumns`, `Container`, `SectionShell`. `ContentColumns`' entry is written honestly, not padded: DS-5C's own usage-site grep found zero real adoption of `ContentColumns` anywhere in this docs site outside its own test file — its documentation says so directly, rather than inventing examples that don't exist.
- Fixed the `foundation-layout` page's hand-rolled `relatedComponents` array (see Part 1) — it now calls `getRelatedLinks(entry)` like its `foundation-workspace`/`foundation-splitview` siblings already did. Added reciprocal `related:` entries to all three pages' `NAV_REGISTRY` records in `src/lib/design-system-navigation.ts` so `foundation-layout` ↔ `foundation-workspace` ↔ `foundation-splitview` now cross-link consistently. Live-verified in the browser: `foundation-layout`'s Related Components now leads with Workspace and SplitView; `foundation-workspace`'s now includes Layout.
- Fixed three hardcoded `"nine primitives"` references in `foundation-layout/page.tsx` and one in `_data/future-extensions.ts` — the gallery grew from 9 to 13 entries this phase, and the count is now read live from `LAYOUT_PRIMITIVES.length` in the page (not re-hardcoded a second time) so it can't drift out of sync with the actual gallery again.
- `PrimitiveGallery.tsx`'s `LiveDemo` switch statement gained four new cases (`card-grid`, `content-columns`, `container`, `section-shell`) so all 13 gallery entries render a live, working example — not just the original 9. Verified in the browser (screenshots below); no console errors on any of the four.

Not changed: `foundation-workspace`/`foundation-splitview`'s own section structure (Do/Don't, Certification, Anatomy) was *not* forced onto `foundation-layout`, and vice versa. These are different documentation shapes for a real reason — Workspace/SplitView are each a single, individually-certified primitive with its own dedicated page, where a Do/Don't and Certification section make sense; `foundation-layout` documents a 13-member family on one page, where "When to use" (choosing among 13) and "Spacing" (the shared vocabulary) are the family-page's own equivalent concerns. Forcing structural parity across genuinely different page types would be exactly the kind of cosmetic normalization the phase's own brief warns against ("Do not normalize simply for cosmetic reasons").

## Part 5/6 — Example and implementation consistency

Confirmed, not changed:

- **No `cva()` usage anywhere in the family** — every component reads a `Record<Scale, string>` map via `cn()`, consistent with the pattern DS-5A/5B both confirmed and relied on.
- **No `forwardRef` anywhere** — grepping for the literal string surfaces exactly one hit, in `Workspace.tsx`'s own doc comment explaining *why* the family doesn't use it (React 18/19 compatibility — a plain `ref` prop only works on 19). Confirmed system-wide and deliberate, not an inconsistency.
- **`@/lib/spacing` (DS-5A) imports are exactly `Surface`/`Panel`/`GlassPanel`/`SurfacePanel`** — the four components DS-5A scoped it to, no more, no less. No drift since that phase.
- **Server/client boundary**: `Workspace` and every other primitive in this family carry no `"use client"` directive except `SplitView` (real pointer/keyboard interactivity) — confirmed still exactly this split, unchanged by this phase.
- **Example teaching value**: `PrimitiveGallery`'s interactive gallery (13 entries after Part 4) and `CompositionExamples`'s five composed shapes were reviewed for whether they demonstrate real architectural decisions rather than trivial rendering — found already consistent in depth and style across entries; no changes made beyond the four new live demos Part 4 added.

## Part 7 — Testing consistency

Added `Separator.test.tsx`, `ScrollArea.test.tsx`, `DescriptionList.test.tsx`, `SectionShell.test.tsx`, `Container.test.tsx`, `Cluster.test.tsx` — the 6 of 17 primitives with zero test coverage, per Part 1's audit. Every new file matches the established `rendering` / `state coverage` / `accessibility` `describe()` block convention (`checkTestCoverage()` in `src/lib/certification-checks.ts`); none add an `interaction` block, consistent with the established, confirmed-intentional pattern for non-interactive primitives. 37 new tests, all passing; full suite (263 tests across 33 files, up from 227/27) passes clean. Every one of the 17 primitives now has a co-located test file — this was the single largest concrete gap the phase found and closed.

Not inflated: no test was added asserting behavior a component doesn't actually have (e.g. no interaction tests for primitives with no interactive surface), matching the explicit "do not inflate test counts" instruction.

## Part 9 — Certification review

`CERTIFICATION_REGISTRY` (`src/lib/certification.ts`) is unchanged — still exactly Button (`Certified`), Workspace (`Production Ready`), SplitView (`Production Ready`). Neither Workspace.tsx nor SplitView.tsx source was touched by this phase, so their existing checklist status and `lastReviewed` dates remain accurate as recorded.

**Candidacy, documented but not acted on** (per explicit instruction: "Do not certify them"): every one of the 17 primitives now has an exported `Props` type and test coverage (Parts 2 and 7), closing two of the certification checklist's structural gaps across the whole family for the first time. The strongest candidates for a future certification pass, by usage-site evidence: `Surface`, `Panel`, `Stack`, `Inline`, `Grid`, `CardGrid`, `SectionShell` — all now have full test coverage, exported prop types, doc-comment rationale for every non-obvious decision, and (except Surface/Panel, which are used indirectly through nearly everything) high direct usage-site counts. `ContentColumns` specifically should **not** be considered a near-term candidate despite now having tests and an exported API — the certification framework's own "Certified" bar requires adoption in "at least one real (non-playground) screen," and Part 1's audit found zero real usage sites for it anywhere in this codebase today.

## Part 10 — Validation

- `npx tsc --noEmit` — clean.
- `npx vitest run` — 263 tests / 33 files passing (up from 227/27 before this phase).
- `npm run package:build` — clean; `node packages/design-system/scripts/check-api.mjs` confirmed the exact expected 21-export diff before writing the new baseline with `--write`.
- Live browser verification: `foundation-layout` page's 13-entry interactive gallery (all four new entries — Card Grid, Content Columns, Container, Section Shell — click-tested with no console errors); `foundation-layout` and `foundation-workspace`'s Related Components sections confirmed to now cross-link correctly.

## What this phase deliberately did not do

Per the phase's own closing constraints: no application pages were migrated to any of these primitives, no component was visually redesigned, the package was not published, and no Feedback-family component work was started. No primitive's certification level was changed or increased.
