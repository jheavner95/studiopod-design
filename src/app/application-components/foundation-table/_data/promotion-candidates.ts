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
 * found by grepping for <table across application-components/ — eight
 * files, ~471 lines total. None have been migrated yet; this page only
 * documents and builds the replacement system, per the work package's
 * own instruction not to refactor existing pages yet.
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
    description: "The DS-0.2 inventory's own table — status, priority, and source columns per component.",
    migrationEffort: "Medium",
    migrationNote: "The oldest table in the codebase and the one every other hand-rolled table's styling was likely copied from — migrating it first would be the most symbolically complete step.",
  },
  {
    id: "maturity-table",
    file: "src/app/application-components/_components/MaturityTable.tsx",
    lineCount: 48,
    description: "Maturity level per inventory item, grouped by family.",
    migrationEffort: "Low",
    migrationNote: "The simplest candidate — plain text and Badge cells only, no sorting, selection, or actions.",
  },
  {
    id: "responsive-rules-table-toolbar",
    file: "src/app/application-components/workspace-toolbar/_components/ResponsiveRulesTable.tsx",
    lineCount: 42,
    description: "One of three near-identical ResponsiveRulesTable implementations (see below) — breakpoint-by-breakpoint layout rules.",
    migrationEffort: "Low",
    migrationNote: "All three copies should migrate together, or better, collapse into one shared component built on Table — the clearest case of literal duplication this audit found.",
  },
  {
    id: "responsive-rules-table-primary",
    file: "src/app/application-components/primary-workspace/_components/ResponsiveRulesTable.tsx",
    lineCount: 42,
    description: "A second, line-for-line-identical-length copy of the same ResponsiveRulesTable component.",
    migrationEffort: "Low",
    migrationNote: "See workspace-toolbar's copy — these three files are the strongest single argument for the foundation table system existing at all.",
  },
  {
    id: "responsive-rules-table-layout",
    file: "src/app/application-components/workspace-layout/_components/ResponsiveRulesTable.tsx",
    lineCount: 42,
    description: "A third, line-for-line-identical-length copy of the same ResponsiveRulesTable component.",
    migrationEffort: "Low",
    migrationNote: "Same finding a third time — three separate files, 126 combined lines, for what should be one shared component.",
  },
];

export function totalPromotionLines(): number {
  return TABLE_PROMOTION_CANDIDATES.reduce((sum, candidate) => sum + candidate.lineCount, 0);
}
