export interface TablePromotionCandidate {
  id: string;
  file: string;
  lineCount: number;
  description: string;
  migrationEffort: "Low" | "Medium" | "High";
  migrationNote: string;
}

/**
 * Every hand-rolled <table> implementation in this codebase today,
 * found by grepping for <table across application-components/ — five
 * files, ~345 lines total, down from the original eight (~471 lines).
 * The three ResponsiveRulesTable copies below have been migrated — see
 * TABLE_RESOLVED_MIGRATIONS. The remaining five have not; this page
 * only documents and builds the replacement system for them, per the
 * work package's own instruction not to refactor existing pages yet.
 */
export const TABLE_PROMOTION_CANDIDATES: TablePromotionCandidate[] = [
  {
    id: "coverage-matrix",
    file: "src/app/application-components/_components/CoverageMatrix.tsx",
    lineCount: 56,
    description: "The platform coverage matrix — sticky first column, Badge cells for Used/Partial/Planned.",
    migrationEffort: "Medium",
    migrationNote: "Maps directly onto Table + TableHeader (sticky) + TableStatusCell for each state cell — the closest 1:1 fit of any candidate here.",
  },
  {
    id: "scorecard-table",
    file: "src/app/application-components/workspace-certification/_components/ScorecardTable.tsx",
    lineCount: 70,
    description: "The DS-1.9 certification scorecard — Link-wrapped row headers, Badge weight cells, computed contribution percentages.",
    migrationEffort: "Medium",
    migrationNote: "The Link-in-<th> pattern needs a small TableHead adjustment (or just children as-is, since TableHead accepts any ReactNode); otherwise a direct swap.",
  },
  {
    id: "certification-matrix",
    file: "src/app/application-components/workspace-certification/_components/CertificationMatrix.tsx",
    lineCount: 89,
    description: "The platform certification matrix — multiple Badge tones per row, boolean and percentage cells side by side.",
    migrationEffort: "Medium",
    migrationNote: "More cell-type variety than Coverage Matrix (boolean Badge, percentage text, phase Badge) but no structural surprises — TableCell and TableStatusCell cover all of it.",
  },
  {
    id: "inventory-table",
    file: "src/app/application-components/inventory/_components/InventoryTable.tsx",
    lineCount: 82,
    description: "The DS-0.2 inventory's own table — component, purpose, status, source, and priority columns per row, 41 rows. Not a native <table> — the same div/grid pattern as MaturityTable, deliberately stacking each row into a labeled card below sm:.",
    migrationEffort: "Medium",
    migrationNote: "ATTEMPTED and reverted in DS-2.1.7.4: this was expected to be \"the oldest table... every other hand-rolled table's styling was likely copied from,\" but migrating it onto Table hit the identical wall MaturityTable did (DS-2.1.7.3) — worse, in fact: 774px natural table width against a 333px mobile viewport, clipping the Status badge and hiding Source and Priority entirely. Two independent tables have now failed the same way for the same reason. Blocked on the same Table gap as MaturityTable (see Future Extensions), not migratable as-is.",
  },
  {
    id: "maturity-table",
    file: "src/app/application-components/_components/MaturityTable.tsx",
    lineCount: 48,
    description: "Maturity level per inventory item, grouped by family — 40 rows, and not a native <table> at all (a CSS grid that deliberately stacks each row into a labeled card below sm:).",
    migrationEffort: "Medium",
    migrationNote: "ATTEMPTED and reverted in DS-2.1.7.3: this looked like the simplest candidate (plain text and Badge cells, no sorting/selection/actions), but migrating it onto Table produced a real regression — the table's natural width (640px) exceeds a mobile viewport (333px available), forcing horizontal scroll where the original never needed one, hiding the Family and Maturity columns off-screen by default. Not migratable as-is; blocked on Table gaining a responsive row-collapse capability (see Future Extensions).",
  },
];

export function totalPromotionLines(): number {
  return TABLE_PROMOTION_CANDIDATES.reduce((sum, candidate) => sum + candidate.lineCount, 0);
}

export interface ResolvedTableMigration {
  id: string;
  title: string;
  filesRemoved: number;
  linesRemoved: number;
  linesAdded: number;
  resolvedIn: string;
  note: string;
}

/**
 * Real migrations completed against this repository — not projected, not planned.
 * Kept separate from TABLE_PROMOTION_CANDIDATES above (which tracks current,
 * unresolved duplication) so the audit trail survives even after a candidate
 * is fully migrated.
 */
export const TABLE_RESOLVED_MIGRATIONS: ResolvedTableMigration[] = [
  {
    id: "responsive-rules-table",
    title: "ResponsiveRulesTable consolidation",
    filesRemoved: 3,
    linesRemoved: 126,
    linesAdded: 67,
    resolvedIn: "DS-2.1.7.2",
    note: "The three near-byte-identical ResponsiveRulesTable.tsx copies (workspace-toolbar, primary-workspace, workspace-layout — 42 lines each) are gone, replaced by one generic src/components/table/ResponsiveRulesTable.tsx composed from Table, TableHeader, TableHead, TableBody, TableRow, and TableCell. Re-verified all three were still substantially identical via diff immediately before migrating — zero drift from the original finding. Required one real Foundation Table API extension: TableHead gained an optional sticky prop for a pinned left column (the header's own sticky prop only pins the top row). Zero visual regression at desktop, tablet, and mobile — sticky-column behavior verified by scrolling the table and confirming the row-header cell's bounding rect doesn't move. This is Foundation Table's first production adoption.",
  },
];
