export interface GridPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all seven named domains
 * (Publishing Queue, Commerce Orders, Inventory, Products, Assets,
 * Diagnostics, Metrics) against src/app, reading every hit rather than
 * pattern-matching on filenames alone — every one came back clean. This is
 * the second Foundation/Operational package in a row (after DS-2.4) to find
 * nothing real to migrate, recorded honestly rather than manufacturing
 * findings to match earlier packages' pattern.
 */
export const GRID_PROMOTION_CANDIDATES: GridPromotionCandidate[] = [];

export const GRID_CLEAN_FINDINGS: string[] = [
  "Publishing Queue: every hit is copy/documentation (Foundation Table's and Foundation Layout's own prose, a bare QueueTableDemo inside Foundation Table's own gallery). The DS-0.2 inventory lists \"Queue Table\" as status: \"Needed\" — aspirational, nothing built.",
  "Commerce Orders: only diagram labels (CommerceDiagram/PublishingDiagram, read-only marketing flow diagrams) and two SearchInput demo placeholders (\"Search orders\"/\"Filter orders\") — no orders grid exists anywhere.",
  "Inventory: InventoryTable.tsx (82 lines) is real, but is a static hand-rolled div-grid of DS-0.2 inventory metadata rows (component/purpose/status/source/priority) — documentation UI with zero search/filter/selection/pagination, unrelated to a business \"inventory\" domain, and already tracked (not migratable — see Foundation Table's own certification note on its confirmed responsive gap).",
  "Products: only marketing copy and a form-control placeholder (\"Search products\") — no table or grid anywhere.",
  "Assets: asset-workspace/page.tsx is explicit documentation (\"this doesn't touch the production application\") — an anatomy explorer and card demos, no table.",
  "Diagnostics: the only \"Diagnostics\" UI in the codebase is the Motion Playground's developer-overlay toggle list (Bounds/Origins/Timing/Frames) — an unrelated concept, not an operational grid.",
  "Metrics: every \"Metrics\" surface is a stat-card rollup (MetricsComposition → StatCard/CardGrid) or a bare Foundation Table demo inside Foundation Table's own gallery (MetricsTableDemo) — no toolbar/filter/selection anywhere.",
  "DS-0.2 inventory and the Foundation Component Catalog both mention \"Queue Table\"/\"Library Table\" only as forward-looking reuseTargets text on other components — neither names a component that actually exists.",
];
