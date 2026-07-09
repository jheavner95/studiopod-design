export type MigrationEffort = "Low" | "Medium" | "High";

export interface DuplicationGroup {
  id: string;
  group: string;
  fileCount: number;
  lineCount: number | null;
  effort: MigrationEffort;
  findings: string[];
}

/** Every count here was grep/wc -l verified against the live repository, including re-running each family's own documented findingCommand to check for drift. */
export const DUPLICATION_GROUPS: DuplicationGroup[] = [
  {
    id: "layout",
    group: "Layout",
    fileCount: 54,
    lineCount: null,
    effort: "High",
    findings: [
      "flex flex-col gap-N (the Stack pattern): 242 raw occurrences across 54 files today — up from 161 when foundation-layout's own promotion-candidates.ts was written. Real, confirmed growth, not a grep artifact.",
      "The CrossLinks row (flex flex-wrap gap-4): 14 files today, up from 10 recorded — 4 new pages (foundation-forms, foundation-metadata, foundation-components, foundation-table, workspace-framework) adopted the same hand-rolled pattern since the original count.",
      "Bordered-card wrapper (rounded-lg border border-border-subtle bg-surface p-4 sm:p-6, the exact shape Surface/Panel now express): roughly 11 genuine files once documentation self-references are excluded from the raw grep.",
      "dl/dt/dd Accessibility block: RESOLVED in DS-2.1.7.1 — all 9 real files (7 workspace pages plus foundation-layout and foundation-components) now render <DescriptionList /> directly. Zero hand-rolled dl/dt/dd blocks remain anywhere in application-components/.",
    ],
  },
  {
    id: "tables",
    group: "Tables",
    fileCount: 5,
    lineCount: 345,
    effort: "Medium",
    findings: [
      "5 hand-rolled table-shaped implementations remain, 345 combined lines: CoverageMatrix (56), ScorecardTable (70), CertificationMatrix (89), InventoryTable (82), MaturityTable (48).",
      "2 of the 5 (InventoryTable, MaturityTable) are actually div/grid layouts, not native <table> markup — the promotion-candidates.ts header comment's stated discovery method (\"grepping for <table\") doesn't literally find them; they were added by manual judgment, which the audit confirms is still architecturally correct even though the stated method doesn't reproduce it. Both share the identical responsive strategy: a hidden sm:grid header and rows that stack into labeled cards below sm: — not a coincidence, one was very likely copied from the other.",
      "RESOLVED in DS-2.1.7.2: the 3 near-byte-identical ResponsiveRulesTable.tsx copies (workspace-toolbar, primary-workspace, workspace-layout — 126 combined lines) are gone, replaced by one generic src/components/table/ResponsiveRulesTable.tsx. Re-verified all 3 were still identical via diff immediately before migrating — zero drift from the original finding. This is Foundation Table's first production adoption.",
      "ATTEMPTED and REVERTED in DS-2.1.7.3: MaturityTable looked like the simplest remaining candidate (plain text and Badge cells only), but it isn't a native <table> — it's a CSS grid that deliberately stacks each of its 40 rows into a labeled card below the sm: breakpoint. Migrating it onto Table produced a measured regression (640px natural table width against a 333px mobile viewport, hiding two of three columns behind a horizontal scroll the original never needed), so the migration was reverted rather than shipped. Not every remaining candidate is safely migratable with Table's current capabilities — this is real evidence of that, not an assumption.",
      "ATTEMPTED and REVERTED in DS-2.1.7.4: InventoryTable was explicitly expected to be a genuine tabular presentation, unlike MaturityTable — direct code review found the opposite: byte-for-byte the same div/grid + stack-below-sm: pattern, just 5 columns instead of 3, with genuinely long Purpose (prose) and Source (file path plus note) content. Migrating it onto Table failed the same way, worse: 774px natural width against a 333px viewport, clipping the Status badge and hiding Source and Priority entirely. Two independent tables have now failed for the identical, confirmed reason — Table has no responsive row-collapse capability.",
    ],
  },
  {
    id: "metadata",
    group: "Metadata",
    fileCount: 14,
    lineCount: null,
    effort: "Medium",
    findings: [
      "Accessibility dl/dt/dd blocks: RESOLVED in DS-2.1.7.1 — all 9 files, including foundation-layout/page.tsx and foundation-components/page.tsx themselves, now import DescriptionList from @/components/metadata directly. This is the Foundation Metadata System's first production adoption (Adoption In Progress, not Certified — DescriptionList is 1 of 16 Metadata components, and the rest of the family remains unadopted).",
      "Ad hoc Identity regions: 3 workspace _data/regions.ts files hand-build an icon + name + type + status block with no shared component.",
      "Near-duplicate platform example cards: 4 components (19–40 lines each) across inspector-workspace, status-workspace, primary-workspace, and workspace-framework, each reimplementing the same title-plus-labeled-fields shape with slightly different field names.",
      "Ad hoc reuseLinks relationship lists: 7 workspace _data/regions.ts files define the same label/href array shape RelationshipList now generalizes.",
    ],
  },
  {
    id: "forms",
    group: "Forms",
    fileCount: 6,
    lineCount: 708,
    effort: "Low",
    findings: [
      "5 near-duplicate ControlDock.tsx files (platforms, capabilities, workflows, motion, production playgrounds), 74–81 lines each, 377 combined — each wires ToggleSwitch controls to a local setToggle(key, checked) pattern that SwitchField now expresses directly.",
      "1 design-system FormControlsSection.tsx (331 lines) — the original MS-1/MS-2 showcase of TextInput, Select, ToggleSwitch, and Checkbox together, predating the Form System by several milestones.",
      "Both are outside application-components/ entirely, in playground and design-system showcase code — a distinct duplication surface from the workspace-page findings above.",
    ],
  },
  {
    id: "inspector",
    group: "Inspector",
    fileCount: 1,
    lineCount: null,
    effort: "Medium",
    findings: [
      "inspector-workspace/page.tsx hand-rolls 1 Panel/Surface wrapper — its dl/dt/dd Accessibility block was resolved in DS-2.1.7.1 and now renders DescriptionList directly, same as the other 8 migrated files.",
      "inspector-workspace/_data/regions.ts and inspector-workspace/_components/PlatformExampleCard.tsx both appear independently in the Metadata promotion-candidates findings above (identity-regions, relationship-links, platform-cards) — Inspector is a genuine subset of the Metadata duplication, not a separate defect.",
      "Real editing UI for Inspector is additionally blocked on Tabs and Tooltip (still Needed in the catalog) — Description List and Combobox, the other two originally-cited blockers, are now Exists.",
    ],
  },
  {
    id: "workspace",
    group: "Workspace",
    fileCount: 22,
    lineCount: null,
    effort: "High",
    findings: [
      "Whole-tree scan (application-components/, foundation-* pages excluded): 19 files with the Panel/Surface bordered-card pattern, 3 files with hand-rolled <table> markup — 22 files total, spanning 8 of 9 workspace pages plus 5 shared _components (CoverageMatrix, DependencyMap, MaturityTable, architecture/page.tsx, InventoryTable). The 7 workspace-page dl/dt/dd blocks resolved in DS-2.1.7.1 and the 3 ResponsiveRulesTable copies resolved in DS-2.1.7.2 are both zero now.",
      "Every workspace page still composes Foundation Layout only at the page-shell level (PageShell/SectionShell/CardGrid) — none import Panel or Surface from that module. 7 pages now import DescriptionList from @/components/metadata (DS-2.1.7.1), and 3 now import ResponsiveRulesTable from @/components/table (DS-2.1.7.2) — the first real cracks in the \"page-shell only\" pattern this audit originally found, though still zero adoption of Panel, Surface, or Forms.",
      "workspace-framework is the one clean outlier: page-shell composition only, zero hand-rolled Panel/dl/table hits.",
      "workspace-certification carries the heaviest remaining table duplication: 3 Panel wrappers plus 2 full hand-rolled <table> implementations (CertificationMatrix, ScorecardTable), and no dl/dt/dd usage at all.",
    ],
  },
];

export const DUPLICATION_METHODOLOGY_NOTE =
  "Two of the four families' own findingCommand greps (description-list and surface/panel, both in foundation-layout/_data/promotion-candidates.ts) are self-referentially inflated: they match the _data/promotion-candidates.ts files that quote the search string as a literal, and the illustrative demo markup on the foundation docs pages themselves. The real, non-artifact counts (used throughout this section) exclude those self-matches. inline and stack, by contrast, are genuinely, confirmably drifted upward — real new duplication has been added since those pages were written.";
