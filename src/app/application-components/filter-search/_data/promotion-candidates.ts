export interface SearchPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all eight named domains
 * (Production, Publishing, Commerce, Products, Assets, Recipes, Blueprints,
 * Libraries) plus every one of the four MS-2.x "Library Playground" pages —
 * every one came back clean. The only real hits were Production's own
 * QualityGatesSection (a page-specific All/Failed/Warning toggle, not a
 * generic search/filter component) and Asset Browser's own AssetSearch/
 * AssetFilters, which are already-documented re-exports of Data Grid's
 * DataGridSearch/DataGridFilters rather than independent implementations.
 */
export const SEARCH_PROMOTION_CANDIDATES: SearchPromotionCandidate[] = [];

export const SEARCH_CLEAN_FINDINGS: string[] = [
  "Production: QualityGatesSection.tsx has a local All/Failed/Warning toggle — page-specific business logic with its own useState, not a hand-rolled search/filter chrome component.",
  "Publishing, Commerce: PublishingAndCommerceSection.tsx and the Publishing/CommerceDiagram components are a static provider-badge grid and a node-selection diagram — no search/filter code.",
  "Products: no dedicated route or component exists yet anywhere in the codebase — only prose mentions as a future reuse target.",
  "Recipes: a single prose mention in foundation-forms/page.tsx describing a future \"Style/Recipe editor\" — not an implemented browser.",
  "Blueprints: BlueprintDiagram.tsx's only .filter() call selects certification-tier nodes for diagram layout, not a UI filter control.",
  "Libraries (Workflow/Platform/Production/Capability Playground pages): all four remain pure exampleX.map() diagram galleries sharing ControlDock.tsx as a playback toolbar — zero search/filter/sort UI, reconfirming the same finding from Asset Browser's own audit.",
  "grep -rn 'role=\"searchbox\"|SearchInput|onFilterChange' across src/ turns up exactly two pre-existing implementations — src/components/ui/SearchInput.tsx and src/components/ui/FilterBar.tsx — plus their direct, already-documented consumers (DataGridSearch, DataGridFilters, AssetSearch, AssetFilters). Nothing else exists to duplicate.",
  "DS-0.2 inventory's own \"Result Summary Bar\" entry (status: Needed, purpose: '\"Showing X of Y\" count plus a sort control, above a filtered list') is now stale — operational/ResultSummary.tsx and SortControl.tsx fill exactly that gap. Its \"Combobox\" entry (status: Needed, 'confirmed native-only, no typeahead behavior') is the same gap SearchSuggestions/SearchField's typeahead composition addresses for free-text search specifically, distinct from ComboboxField's fixed-value-selection scope.",
];
