export interface MigrationStep {
  order: number;
  id: string;
  title: string;
  scope: string;
  effort: "Low" | "Medium" | "High";
  reasoning: string;
  status: "Completed" | "Not started";
}

/**
 * The recommended sequence — not a priority ranking by importance, a sequencing by risk and
 * dependency. Each step's reasoning explains why it sits where it does relative to its neighbors.
 */
export const MIGRATION_PLAN: MigrationStep[] = [
  {
    order: 1,
    id: "responsive-rules-table",
    title: "ResponsiveRulesTable → Table",
    scope: "3 near-byte-identical files (workspace-toolbar, primary-workspace, workspace-layout), 126 combined lines",
    effort: "Low",
    reasoning:
      "The purest possible first move: zero design judgment required, collapses 3 files into 1, and proves the Table system end-to-end on real (if simple) content before anything harder attempts it. If this migration surfaces a problem with Table itself, it's cheap to discover here and expensive everywhere else. Completed in DS-2.1.7.2: it did surface a real gap (no sticky-left-column support), which TableHead now closes with an optional sticky prop rather than a local workaround. Zero visual regression at any breakpoint; sticky-column behavior verified by measuring the row-header cell's position before and after scrolling.",
    status: "Completed",
  },
  {
    order: 2,
    id: "description-lists",
    title: "Description Lists → DescriptionList",
    scope: "9 files, including foundation-layout/page.tsx and foundation-components/page.tsx — the two pages that introduce and catalog the component but don't use it themselves",
    effort: "Low",
    reasoning:
      "The target component already exists, is proven, and is a mechanical 1:1 swap — sequenced second to keep momentum with another low-risk win. Fixing the two foundation docs pages first is close to a prerequisite: a page can't credibly recommend a pattern it doesn't follow. Completed in DS-2.1.7.1: all 9 files migrated, re-verified against the live repository before touching any code, zero visual regressions at desktop/tablet/mobile.",
    status: "Completed",
  },
  {
    order: 3,
    id: "accessibility-blocks",
    title: "Accessibility blocks",
    scope: "The same 7 workspace pages' Accessibility sections, once the dl/dt/dd markup itself is swapped",
    effort: "Low",
    reasoning:
      "The natural completion of step 2 rather than a separate effort — verifying the surrounding section (heading, spacing, any content beyond the list itself) is fully consistent with DescriptionList's own responsive behavior, not just the markup inside it. Batched with step 2 in practice; listed separately because the check is distinct from the swap. Completed alongside step 2 in DS-2.1.7.1 — DescriptionList's default rendering matched every hand-rolled instance byte-for-byte except two label-width outliers (workspace-layout, foundation-components), which DescriptionList was extended with an optional labelWidth prop to preserve exactly.",
    status: "Completed",
  },
  {
    order: 4,
    id: "identity-blocks",
    title: "Identity blocks → IdentityBlock",
    scope: "3 workspace _data/regions.ts files (workspace-header, inspector-workspace, workspace-framework) plus their anatomy-explorer renderers",
    effort: "Medium",
    reasoning:
      "Requires real integration work — routing each *AnatomyExplorer.tsx's region-card renderer through IdentityBlock, with per-workspace selection state — rather than a pure markup swap. Sequenced fourth so the more expensive effort gets spent only after the free wins are already banked and the pattern is warmed up.",
    status: "Not started",
  },
  {
    order: 5,
    id: "control-dock",
    title: "ControlDock → SwitchField",
    scope: "5 files across platforms/capabilities/workflows/motion/production playgrounds, 377 combined lines",
    effort: "Low",
    reasoning:
      "Low effort, but a different part of the codebase entirely (playground control panels, not application-components docs). Sequenced after the application-components cluster closes out, so each contiguous unit of work — one directory, one kind of change — finishes before the next starts, instead of interleaving unrelated directories.",
    status: "Not started",
  },
  {
    order: 6,
    id: "form-controls-section",
    title: "FormControlsSection → Field gallery equivalents",
    scope: "1 file, 331 lines, in the design-system showcase",
    effort: "Medium",
    reasoning:
      "Medium effort because it's a display gallery, not a real editing form — migrating it means demonstrating the same controls via the new *Field wrappers, not a like-for-like swap. Follows ControlDock as the second half of \"Foundation Forms adoption in the design-system showcase itself.\"",
    status: "Not started",
  },
  {
    order: 7,
    id: "card-wrappers",
    title: "Card wrappers → Panel / Surface",
    scope: "19 files across 8 workspace pages and 5 shared _components (CoverageMatrix, DependencyMap, MaturityTable, architecture/page.tsx, InventoryTable)",
    effort: "High",
    reasoning:
      "The highest-volume, most architecturally consequential migration in this plan — it touches nearly every workspace page. Sequenced last deliberately: every smaller migration above will have already validated Layout, Table, Metadata, and Forms against real content, so by the time this step starts, confidence in the underlying components is at its highest and the most expensive mistake to make is being made with the most information available.",
    status: "Not started",
  },
];
