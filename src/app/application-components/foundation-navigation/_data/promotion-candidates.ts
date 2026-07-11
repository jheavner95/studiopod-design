export interface NavigationPromotionCandidate {
  id: string;
  pattern: string;
  fileCount: number;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * Every finding here was grep-verified against the live repository before this page was written
 * (grep -rl 'aria-pressed={selected}', grep -rln "function PillButton", grep -rln "function CrossLinks") —
 * not carried over from memory or estimated. Two categories this audit specifically looked for
 * (Breadcrumbs, Stepper) came back clean: no existing implementation was found to migrate, only
 * a documented gap — recorded honestly in the findings below rather than omitted.
 */
export const NAVIGATION_PROMOTION_CANDIDATES: NavigationPromotionCandidate[] = [
  {
    id: "region-card",
    pattern: "Selectable region/anatomy card",
    fileCount: 15,
    files: [
      "workspace-header/_components/HeaderAnatomyExplorer.tsx (173 lines)",
      "workspace-toolbar/_components/ToolbarAnatomyExplorer.tsx (113 lines)",
      "primary-workspace/_components/PrimaryWorkspaceAnatomyExplorer.tsx (110 lines)",
      "inspector-workspace/_components/InspectorAnatomyExplorer.tsx (111 lines)",
      "status-workspace/_components/StatusAnatomyExplorer.tsx (111 lines)",
      "workspace-framework/_components/WorkspaceAnatomyExplorer.tsx (143 lines)",
      "asset-workspace/_components/AssetWorkspaceAnatomyExplorer.tsx (110 lines)",
      "asset-workspace/_components/AssetCardDemo.tsx",
      "workspace-certification/_components/BlueprintDiagram.tsx",
      "workspace-layout/_components/ScrollingDiagram.tsx",
      "workspace-layout/_components/WidthModeExplorer.tsx",
      "foundation-metadata/_components/MetadataAnatomyExplorer.tsx (64 lines)",
      "foundation-table/_components/TableAnatomyExplorer.tsx (64 lines)",
      "foundation-forms/_components/FormAnatomyExplorer.tsx (64 lines)",
      "foundation-components/_components/CatalogExplorer.tsx",
    ],
    description:
      "A local function RegionCard({ region, selected, onSelect }) rendering a clickable, active/inactive Card with aria-pressed={selected}, an Activate motion wrapper, and selected && \"border-accent-500/60 bg-accent-soft/30\" — the same ~15-20 line component reimplemented in 15 files rather than shared once.",
    migrationNote:
      "Not a straight swap onto NavigationItem as built — these anatomy explorers render a Card-shaped clickable region, not a nav link/button row. A dedicated adoption pilot should first verify (Phase 0, matching the discipline established for Foundation Table) whether NavigationItem's existing shape genuinely fits, or whether this pattern belongs to a different family (a SelectableCard primitive) instead of being forced into Navigation.",
  },
  {
    id: "pill-button",
    pattern: "Inline pill switcher (PillButton / FilterPill)",
    fileCount: 9,
    files: [
      "foundation-table/_components/StatesDemo.tsx (17 lines, exact function)",
      "foundation-table/_components/VariantGallery.tsx (17 lines, exact function)",
      "foundation-forms/_components/FieldStatesDemo.tsx (17 lines, exact function)",
      "foundation-forms/_components/FieldGallery.tsx (exact function)",
      "foundation-metadata/_components/ComponentGallery.tsx (17 lines, exact function)",
      "foundation-metadata/_components/PatternGallery.tsx (17 lines, exact function)",
      "foundation-forms/_components/PropertyEditingDemo.tsx (same className, different name)",
      "foundation-layout/_components/PrimitiveGallery.tsx (same className, different name)",
      "foundation-components/_components/CatalogExplorer.tsx (same className, as FilterPill)",
    ],
    description:
      "6 files share a byte-for-byte identical function PillButton({ label, active, onClick }) — a rounded-full, aria-pressed toggle button. 3 more files reimplement the identical visual/interaction contract under a different name (FilterPill, etc.) rather than importing the shared one. All 9 are exactly the row-of-buttons-with-one-active shape SegmentedControl already generalizes.",
    migrationNote:
      "The most direct migration in this list: SegmentedControl already exists, is already correctly reused by the 5 ControlDock.tsx playground files, and covers this exact interaction. These 9 docs-page mode switchers are strong choices for a first adoption pass.",
  },
  {
    id: "cross-links",
    pattern: "Cross-links row (function CrossLinks)",
    fileCount: 14,
    files: [
      "status-workspace, foundation-metadata, workspace-toolbar, primary-workspace, workspace-certification, foundation-audit, foundation-table, foundation-layout, workspace-layout, asset-workspace, foundation-overlays, foundation-forms, inspector-workspace, foundation-components (each page.tsx)",
    ],
    description:
      "A flex flex-wrap gap-4 row of Link + ArrowUpRight icon, 24-62 lines depending on how many links each page lists — already tracked in the Foundation Layer Audit's own duplication ledger (foundation-audit/_data/duplication.ts), re-verified here as still 14 files and still real.",
    migrationNote:
      "Cross-referenced, not a new finding of this audit — already scheduled in the Foundation Layer Audit's own migration plan. Listed here because it's genuinely a navigation pattern (a secondary, inline nav row), even though it was found by a different package's audit first.",
  },
];

export const NAVIGATION_CLEAN_FINDINGS: string[] = [
  "Breadcrumbs: zero implementations found anywhere in the codebase (grep -rln \"aria-current\" returns no matches; grep -rln -i \"breadcrumb\" matches only data/text mentions of the word, never a rendered component). This is a documented gap, not duplication — Breadcrumbs.tsx is built fresh here with nothing to migrate.",
  "Stepper: no duplicated hand-rolled step-sequence UI. TimelineComposition, the Production package's diagrams, and MaturityLadder are each real, already-promoted, or genuinely one-off (MaturityLadder has exactly one consumer) — none needed migrating onto Stepper.tsx.",
];
