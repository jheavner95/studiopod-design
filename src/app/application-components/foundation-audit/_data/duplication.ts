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
      "flex flex-col gap-N (the Stack pattern): 242 raw occurrences across 54 files today — up from 161 when foundation-layout's own duplication-tracking data was written. Real, confirmed growth, not a grep artifact.",
      "The CrossLinks row (flex flex-wrap gap-4): 14 files today, up from 10 recorded — 4 new pages (foundation-forms, foundation-metadata, foundation-components, foundation-table, workspace-framework) adopted the same hand-rolled pattern since the original count.",
      "Bordered-card wrapper (rounded-lg border border-border-subtle bg-surface p-4 sm:p-6, the exact shape Surface/Panel now express): roughly 11 genuine files once documentation self-references are excluded from the raw grep.",
      "dl/dt/dd Accessibility block: RESOLVED — all 9 real files (7 workspace pages plus foundation-layout and foundation-components) now render <DescriptionList /> directly. Zero hand-rolled dl/dt/dd blocks remain anywhere in application-components/.",
    ],
  },
  {
    id: "tables",
    group: "Tables",
    fileCount: 2,
    lineCount: 130,
    effort: "Medium",
    findings: [
      "2 hand-rolled table-shaped implementations remain, 130 combined lines: InventoryTable (82), MaturityTable (48). Both are div/grid layouts, not native <table> markup, and both share the identical responsive strategy: a hidden sm:grid header and rows that stack into labeled cards below sm:.",
      "The 3 near-identical ResponsiveRulesTable.tsx copies (workspace-toolbar, primary-workspace, workspace-layout — 126 combined lines) have been consolidated into one generic src/components/table/ResponsiveRulesTable.tsx — Foundation Table's first production adoption.",
      "MaturityTable isn't a native <table> — it's a CSS grid that deliberately stacks each of its 40 rows into a labeled card below the sm: breakpoint. Table's current responsive model has no equivalent row-collapse behavior, so a native-table version would need a horizontal scroll the div/grid version avoids.",
      "InventoryTable shares the same div/grid + stack-below-sm: pattern as MaturityTable, with 5 columns and genuinely long Purpose (prose) and Source (file path plus note) content. Table has no responsive row-collapse capability, so a native-table version would clip columns on narrow viewports the same way.",
      "ScorecardTable is now a 48-line composition of Table, TableHeader, TableHead, TableBody, TableRow, TableCell, and TableStatusCell — a genuine native <table> shape, unlike MaturityTable/InventoryTable's div/grid pattern.",
      "CertificationMatrix is now a 68-line composition of the same six primitives as ScorecardTable, plus TableStatusCell for its three badge columns (two boolean, one phase).",
      "CoverageMatrix is now a 41-line composition of Table, TableHeader, TableHead, TableBody, TableRow, and TableStatusCell, since every data cell is a status Badge. Every genuine native <table> candidate in the codebase now uses Foundation Table; the two remaining div/grid implementations (InventoryTable, MaturityTable) are blocked on the responsive row-collapse gap described above.",
    ],
  },
  {
    id: "metadata",
    group: "Metadata",
    fileCount: 14,
    lineCount: null,
    effort: "Medium",
    findings: [
      "Accessibility dl/dt/dd blocks: RESOLVED — all 9 files, including foundation-layout/page.tsx and foundation-components/page.tsx themselves, now import DescriptionList from @/components/metadata directly. This is the Foundation Metadata System's first production adoption (Adoption In Progress, not Certified — DescriptionList is 1 of 16 Metadata components, and the rest of the family remains unadopted).",
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
      "1 design-system FormControlsSection.tsx (331 lines) — an earlier showcase of TextInput, Select, ToggleSwitch, and Checkbox together, predating the Form System.",
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
      "inspector-workspace/page.tsx hand-rolls 1 Panel/Surface wrapper — its dl/dt/dd Accessibility block was resolved and now renders DescriptionList directly, same as the other 8 migrated files.",
      "inspector-workspace/_data/regions.ts and inspector-workspace/_components/PlatformExampleCard.tsx both appear independently in the Metadata duplication findings above (identity-regions, relationship-links, platform-cards) — Inspector is a genuine subset of the Metadata duplication, not a separate defect.",
      "Real editing UI for Inspector is additionally blocked on Tabs and Tooltip (Needed in the catalog) — Description List and Combobox, the other two blockers, are now Exists.",
    ],
  },
  {
    id: "workspace",
    group: "Workspace",
    fileCount: 19,
    lineCount: null,
    effort: "High",
    findings: [
      "Whole-tree scan (application-components/, foundation-* pages excluded): 19 files with the Panel/Surface bordered-card pattern, 0 files with hand-rolled <table> markup — 19 files total, spanning 8 of 9 workspace pages plus shared _components (MaturityTable, InventoryTable, both div/grid rather than <table>). The 7 workspace-page dl/dt/dd blocks, the 3 ResponsiveRulesTable copies, and ScorecardTable's, CertificationMatrix's, and CoverageMatrix's raw <table> markup have all since been resolved — no hand-rolled <table> markup remains anywhere in application-components/.",
      "Every workspace page still composes Foundation Layout only at the page-shell level (PageShell/SectionShell/CardGrid) — none import Panel or Surface from that module. 7 pages now import DescriptionList from @/components/metadata, and 5 now import Table primitives from @/components/table — the first real cracks in the \"page-shell only\" pattern this audit originally found, though still zero adoption of Panel, Surface, or Forms.",
      "workspace-framework is the one clean outlier: page-shell composition only, zero hand-rolled Panel/dl/table hits.",
      "workspace-certification carries the heaviest remaining Panel duplication (3 wrappers) but has zero remaining hand-rolled <table> markup — ScorecardTable and CertificationMatrix both import Table primitives from @/components/table — and no dl/dt/dd usage at all.",
    ],
  },
];

export const DUPLICATION_METHODOLOGY_NOTE =
  "Two of the four families' own findingCommand greps (description-list and surface/panel, both in foundation-layout's own duplication-tracking data) are self-referentially inflated: they match the data files that quote the search string as a literal, and the illustrative demo markup on the foundation docs pages themselves. The real, non-artifact counts (used throughout this section) exclude those self-matches. inline and stack, by contrast, are genuinely, confirmably drifted upward — real new duplication has been added since those pages were written.";
