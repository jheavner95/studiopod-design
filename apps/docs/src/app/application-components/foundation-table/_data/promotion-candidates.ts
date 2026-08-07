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
 * found by grepping for <table across application-components/ — down
 * to zero: the three ResponsiveRulesTable copies, ScorecardTable,
 * CertificationMatrix, and CoverageMatrix have all been migrated — see
 * TABLE_RESOLVED_MIGRATIONS. The two candidates remaining below
 * (InventoryTable, MaturityTable, 130 lines combined) were never native
 * <table> markup in the first place — both are CSS-grid layouts that
 * this grep never matched, added to this list by manual judgment, and
 * both are blocked on a real Table capability gap (see Future
 * Extensions), not simply unattempted.
 */
export const TABLE_PROMOTION_CANDIDATES: TablePromotionCandidate[] = [
  {
    id: "inventory-table",
    file: "src/app/application-components/inventory/_components/InventoryTable.tsx",
    lineCount: 82,
    description: "The component inventory's own table — component, purpose, status, source, and priority columns per row, 41 rows. Not a native <table> — the same div/grid pattern as MaturityTable, deliberately stacking each row into a labeled card below sm:.",
    migrationEffort: "Medium",
    migrationNote: "Attempted and reverted in an earlier migration pass: this was expected to be \"the oldest table... every other hand-rolled table's styling was likely copied from,\" but migrating it onto Table hit the identical wall MaturityTable did — worse, in fact: 774px natural table width against a 333px mobile viewport, clipping the Status badge and hiding Source and Priority entirely. Two independent tables have now failed the same way for the same reason. Blocked on the same Table gap as MaturityTable (see Reference), not migratable as-is.",
  },
  {
    id: "maturity-table",
    file: "src/app/application-components/_components/MaturityTable.tsx",
    lineCount: 48,
    description: "Maturity level per inventory item, grouped by family — 40 rows, and not a native <table> at all (a CSS grid that deliberately stacks each row into a labeled card below sm:).",
    migrationEffort: "Medium",
    migrationNote: "Attempted and reverted in an earlier migration pass: this looked like the simplest option (plain text and Badge cells, no sorting/selection/actions), but migrating it onto Table produced a real regression — the table's natural width (640px) exceeds a mobile viewport (333px available), forcing horizontal scroll where the original never needed one, hiding the Family and Maturity columns off-screen by default. Not migratable as-is; blocked on Table gaining a responsive row-collapse capability (see Reference).",
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
    resolvedIn: "Completed first, establishing the pattern",
    note: "The three near-byte-identical ResponsiveRulesTable.tsx copies (workspace-toolbar, primary-workspace, workspace-layout — 42 lines each) are gone, replaced by one generic src/components/table/ResponsiveRulesTable.tsx composed from Table, TableHeader, TableHead, TableBody, TableRow, and TableCell. Re-verified all three were still substantially identical via diff immediately before migrating — zero drift from the original finding. Required one real Foundation Table API extension: TableHead gained an optional sticky prop for a pinned left column (the header's own sticky prop only pins the top row). Zero visual regression at desktop, tablet, and mobile — sticky-column behavior verified by scrolling the table and confirming the row-header cell's bounding rect doesn't move. This is Foundation Table's first production adoption.",
  },
  {
    id: "scorecard-table",
    title: "ScorecardTable migration",
    filesRemoved: 0,
    linesRemoved: 62,
    linesAdded: 40,
    resolvedIn: "Completed second, reusing the same sticky-column approach",
    note: "First verified this was a genuine architectural match before touching code: a native <table>, horizontal-scroll-only, sticky-left Category column — the same proven-safe shape as ResponsiveRulesTable, not the div/grid pattern that sank MaturityTable and InventoryTable. Migrated onto Table, TableHeader (sticky={false} — only the Category column needs sticky-left, not the header row itself), TableHead (reusing the sticky prop introduced for the ResponsiveRulesTable migration), TableBody, TableRow, TableCell, and TableStatusCell. 70 lines down to 48. Required zero new Foundation Table API surface — the sticky-left capability added for ResponsiveRulesTable covered this migration completely, the first evidence that API extension is reusable, general infrastructure rather than a one-off fix. Zero visual regression at desktop, tablet, and mobile; sticky-column behavior reconfirmed by scroll measurement. An initial DOM collision sweep flagged 7 false-positive overlaps against the global nav bar — traced to the sweep running right after a scrollIntoView call, which coincidentally left the table header sitting at the top of the viewport; re-run at a clean scroll position (both desktop and tablet) confirmed zero real overlaps.",
  },
  {
    id: "certification-matrix",
    title: "CertificationMatrix migration",
    filesRemoved: 0,
    linesRemoved: 65,
    linesAdded: 44,
    resolvedIn: "Completed third, again requiring no new Table API",
    note: "An early review confirmed the same genuine native-<table>, horizontal-scroll, sticky-left-column architecture as ResponsiveRulesTable and ScorecardTable, so migration proceeded. Migrated onto Table, TableHeader (sticky={false}), TableHead (sticky, reused from the ResponsiveRulesTable migration), TableBody, TableRow, TableCell, and TableStatusCell — the boolean-badge cells (Architecture defined, Workspace certified) and the phase-badge cell mapped directly onto TableStatusCell, replacing a local BoolBadge helper with a plain tone function. 89 lines down to 68. Required zero new Foundation Table API surface, the second migration in a row to need none. Zero visual regression at desktop, tablet, and mobile; sticky-column behavior reconfirmed by scroll measurement; an initial DOM collision sweep repeated the same scroll-position false positive seen during the ScorecardTable migration (this time against the page's own section heading) and cleared at a reset scroll position.",
  },
  {
    id: "coverage-matrix",
    title: "CoverageMatrix migration",
    filesRemoved: 0,
    linesRemoved: 43,
    linesAdded: 28,
    resolvedIn: "Completed fourth, closing out the migration effort",
    note: "An early review confirmed the same genuine architecture as the two prior successful migrations, so it proceeded. The simplest of the three real-table migrations — every data cell is a status Badge across a dynamically-generated PLATFORMS column set — mapped directly onto Table, TableHeader (sticky={false}), TableHead (sticky, reused from the ResponsiveRulesTable migration), TableBody, TableRow, and TableStatusCell alone; no TableCell needed at all. 56 lines down to 41. Required zero new Foundation Table API surface, the third migration in a row to need none — conclusive evidence the sticky-column extension introduced for ResponsiveRulesTable generalizes across this whole class of matrix-shaped table. Zero visual regression at desktop, tablet, and mobile; sticky-column behavior reconfirmed by scroll measurement; a DOM collision sweep was clean at a stable scroll position on the first attempt. This completes the migration effort: every genuine native-<table> case in the codebase has now been migrated. The two tables that still don't fit this pattern (InventoryTable, MaturityTable) are not native tables and remain blocked on a real, twice-confirmed Table capability gap, not unattempted.",
  },
];
