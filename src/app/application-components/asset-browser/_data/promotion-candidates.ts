export interface BrowserPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all eight named domains
 * (Production, Publishing, Commerce, Products, Styles, Blueprints,
 * Overlays, Recipes) against src/app — every one came back clean. The
 * agent also specifically checked this repo's own four MS-2.x "Library
 * Playground" pages (Workflow/Platform/Production/Capability), the
 * strongest suspected candidates going in, and confirmed none of them
 * contain hand-rolled search/filter/card-grid browsing code — they are
 * diagram/illustration galleries with a shared playback control dock, not
 * asset browsers. A hypothesis proven wrong by real grep, not fabricated
 * to match the pattern of prior packages' findings.
 */
export const BROWSER_PROMOTION_CANDIDATES: BrowserPromotionCandidate[] = [];

export const BROWSER_CLEAN_FINDINGS: string[] = [
  "Workflow/Platform/Production/Capability \"Library Playground\" pages: all four render a static gallery of diagram cards from `exampleX.map()` — no search input, no filter chips, no pagination, confirmed by reading every _sections file (5-7 files each) and grepping for search|filter|<input|onchange across all of them.",
  "Production, Publishing, Commerce: every hit is either the diagram-gallery pages above or a static provider-badge grid in capabilities/_sections/PublishingAndCommerceSection.tsx (44 lines, no search/filter).",
  "Products, Styles: every hit is marketing copy, documentation prose, or an unrelated demo page — nothing product-catalog or style-library shaped.",
  "Blueprints: the only real component is workspace-certification/_components/BlueprintDiagram.tsx — a single certification-process diagram, not a collection of browsable blueprints.",
  "Recipes: a single hit, a prose mention in foundation-forms/page.tsx describing a future \"Style/Recipe editor\" — not an implemented browser.",
  "Overlays: every hit is the Foundation Overlay System's own docs page or unrelated dev-tool grid-overlay components — nothing about browsing asset overlays.",
  "DS-0.2 inventory (inventory.ts) already tracks this gap honestly under its own \"Library & Asset Management\" section: Library Grid (Partial, via generic CardGrid), Library Table (Needed), Asset Card (Partial, via a production-specific ArtifactCard), Filter Bar (Exists at src/components/ui/FilterBar.tsx but confirmed used in exactly one demo page, never wired into a real browsing screen), Result Summary Bar (Needed) — all consistent with this package filling genuinely open gaps, not migrating hidden duplicates.",
];
