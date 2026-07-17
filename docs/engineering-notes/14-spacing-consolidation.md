# 14. Component Spacing Consolidation (DS-5A)

DS-4's token audit flagged, but deliberately did not resolve, a real drift finding: five independent `paddingMap`s and five independent `gapMap`s across the design system's structural layout primitives, all keyed `sm`/`md`/`lg` (or a superset), disagreeing on what those labels mean in pixels. DS-5A's job was to resolve it — determine, per divergence, whether it's real drift or a deliberate distinction, and consolidate only the former.

## Part 1 — Comparison matrix

**Padding family** (Card, Surface, Panel, GlassPanel, SurfacePanel):

| Component | none | sm | md | lg | Public type? |
|---|---|---|---|---|---|
| Card | — (added this phase) | p-4 | p-6 | p-8 | No (`CardPadding`, internal only) |
| Surface | p-0 | p-4 | p-6 | p-8 | **Yes** — `SurfacePadding` |
| Panel | p-0 | p-4 | p-6 | p-8 | No (reused `SurfacePadding` already) |
| GlassPanel | — | p-4 | p-8 | p-12 | No (`PanelPadding`, internal only) |
| SurfacePanel | — | p-4 | p-8 | p-12 | No (`PanelPadding`, internal only) |

**Gap family** (Stack, Inline, Grid+CardGrid, ContentColumns):

| Component | none | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| Stack | gap-0 | gap-1.5 | gap-3 | gap-6 | gap-8 | gap-12 |
| Inline | gap-0 | gap-1.5 | gap-2 | gap-4 | gap-6 | gap-8 |
| Grid / CardGrid | — | — | gap-4 | gap-6 | gap-8 | — |
| ContentColumns | — | — | gap-8 | gap-12 | gap-16 | — |

## Part 1 — Classification

1. **Card ⟷ Surface ⟷ Panel padding — Classification 3 (duplicate implementation).** Byte-identical values under identical labels. Panel already imported `SurfacePadding`'s *type* from Surface but redeclared its own `bodyPaddingMap`; Card had no relationship to Surface at all despite matching it exactly. Consolidated (Part 3/4).

2. **GlassPanel ⟷ SurfacePanel padding — Classification 3 relative to each other (duplicate), Classification 1 relative to the Card/Surface/Panel family (intentional semantic distinction).** Settled with usage-site evidence, not guesswork: `Card` appears in ~125 files across ordinary application UI; `GlassPanel`/`SurfacePanel` together appear in exactly 8 files, nearly all marketing/hero/spotlight pages (`src/app/page.tsx` — the homepage, `/compositions`, `/workflows`, `/platform-architecture`, `/docs/application-composition`, `/core-components`'s gallery). Two families with two real, distinct usage contexts, not one scale that drifted. GlassPanel/SurfacePanel's own copies of each other consolidated; the family-level difference retained and documented in both files' own doc comments.

3. **Stack ⟷ Inline gap — Classification 1 (intentional semantic distinction).** Every shared level, Inline is tighter than Stack (e.g. `md`: gap-4 vs. gap-6). The direction is consistent and semantically defensible — horizontal row items (badges, buttons, toolbar controls) read as more related at a given visual distance than stacked vertical blocks, so the same named level warranting less space in Inline than in Stack is coherent, not arbitrary. No written prior rationale existed for this before DS-5A; this note is that rationale now, and both components' own doc comments point back to it. **Not merged** — forcing one 6-level scale across both would erase a distinction that reads correctly today.

4. **Grid/CardGrid gap — Classification 3 relative to each other (already deduplicated in DS-4), Classification 1 relative to Stack/Inline.** Grid's `md`/`lg` happen to equal Stack's exactly (gap-6/gap-8) — coincidence, not a hidden shared dependency: Grid has no `xs`/`xl`/`none` levels at all, so the two scales don't actually line up as vocabularies, only at two isolated points. Extracting a "shared" gap map across Grid and Stack would mean forcing Stack's 6-level shape onto Grid's 3-level one for a two-point coincidence — not a genuine consolidation opportunity. Left separate, documented.

5. **ContentColumns gap — Classification 1 (intentional semantic distinction).** An order of magnitude looser than every item-level gap in the system (gap-8/12/16 vs. gap-0 through gap-12 elsewhere) — because it's the one component in scope governing page-level column separation (two major content blocks), not item-level spacing inside one. Left separate, documented.

No Classification 2 (historical drift with no defensible rationale), 4 (public compatibility constraint blocking a fix), or 5 (documentation inconsistency beyond what Part 6 already corrected — see below) findings survived the audit. Every real divergence resolved to either "duplicate, fix it" or "intentional, name it."

## Part 2/3 — Spacing contract and shared infrastructure

Two padding vocabularies, not one universal system — `src/lib/spacing.ts` (new, DS-5A) is their canonical owner:

- `SurfacePadding` (`"none" | "sm" | "md" | "lg"`) + `STRUCTURAL_PADDING_MAP` — the structural family (Card, Surface, Panel). `SurfacePadding` is kept as the name (not renamed to something more "canonical-sounding") because it's already a public, frozen export at `@studiopod/design-system`'s root — Surface.tsx re-exports it at the same path via `export type { SurfacePadding } from "@/lib/spacing"`, so no consumer-visible path changes.
- `SpotlightPadding` (`"sm" | "md" | "lg"`, deliberately no `"none"`) + `SPOTLIGHT_PADDING_MAP` — the spotlight family (GlassPanel, SurfacePanel). Neither of these types/maps were previously public (both components' own padding types were unexported), so this consolidation carries zero public API risk.

Gap vocabularies were **not** given equivalent shared infrastructure — Part 1's classification found no genuine duplication left to consolidate there (Grid/CardGrid's was already fixed in DS-4; everything else is Classification 1). Building a shared gap resolver anyway, just because several maps share the shape `Record<string, string>`, is exactly the "universal abstraction" the brief warns against creating without cause.

## Part 4 — What changed, what didn't

**Changed:** `Card`'s padding prop widened from `"sm"|"md"|"lg"` to the full `SurfacePadding` union (adds `"none"`) — purely additive, every existing call site keeps compiling and rendering identically. `Panel` and `Surface` now import the shared map instead of each declaring/redeclaring their own. `GlassPanel`/`SurfacePanel` now import a shared map instead of two separate identical copies.

**Not changed:** every component's rendered output for every value it already accepted. No visual regression by construction — the map *values* moved, not the values *themselves*. Stack/Inline/Grid/ContentColumns/CardGrid's gap behavior is completely untouched; they received doc-comment updates only, explaining why their divergence is retained.

**Compatibility:** no breaking changes. The one internal-type rename (`CardPadding`/`PanelPadding` → shared `SurfacePadding`/`SpotlightPadding`) is invisible to consumers — neither old name was ever part of the public export surface (confirmed against `packages/design-system/api-baseline/index.json` before making any change).
