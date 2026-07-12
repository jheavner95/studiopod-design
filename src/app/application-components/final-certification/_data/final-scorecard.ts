export type FinalVerdict = "Pass" | "Partial" | "Fail";

export interface FinalScorecardRow {
  dimension: string;
  verdict: FinalVerdict;
  evidence: string;
}

/**
 * Eleven dimensions — the union of every quality axis tracked anywhere
 * across the nine certifications, synthesized into one final table rather
 * than eleven separate per-tier scorecards.
 */
export const FINAL_SCORECARD: FinalScorecardRow[] = [
  {
    dimension: "Layering & dependency discipline",
    verdict: "Pass",
    evidence: "Zero reverse dependencies, zero cycles, zero unjustified layer skips across 2,892 resolved import edges in 1,164 files.",
  },
  {
    dimension: "API consistency",
    verdict: "Partial",
    evidence: "Foundation's aria-describedby gap applies to 10 of 10 field types. CellAlign's duplicate declaration and Table's missing findingCommand field remain open.",
  },
  {
    dimension: "Naming integrity",
    verdict: "Partial",
    evidence: "The ProductionPipeline and WorkflowStep / PipelineStage collisions remain open and unchanged. Every other tier's naming audit is clean.",
  },
  {
    dimension: "Duplication control",
    verdict: "Partial",
    evidence: "The value-transition announcement pattern is hand-copied across four components and is still rolled out to only four of the six components that share it.",
  },
  {
    dimension: "Accessibility & interaction quality",
    verdict: "Partial",
    evidence:
      "Both Still-open accessibility items (TableRow keyboard activation; Popover aria-label on FilterPopover/DataGridColumnPicker) are now Resolved. Touch-target sizing for four icon affordances, the aria-describedby gap, and an accessibility-principle claim on two Workspace pages remain open.",
  },
  {
    dimension: "Business feature composition",
    verdict: "Pass",
    evidence: "All thirteen Composition Framework parts Pass against current source.",
  },
  {
    dimension: "Adoption & production readiness",
    verdict: "Fail",
    evidence:
      "Zero production Business Features exist anywhere in the codebase. Production Workspace remains the only real Business Feature — mock data, local state, zero API/repository layer.",
  },
  {
    dimension: "Documentation experience & currency",
    verdict: "Pass",
    evidence:
      "Every NAV_REGISTRY href resolves to a real page, the certification-sibling related[] graph is fully symmetric across all nine certifications, and the five page archetypes are applied consistently.",
  },
  {
    dimension: "Technical debt currency",
    verdict: "Partial",
    evidence: "A number of known, non-structural limitations remain tracked across the system — a shrinking, honestly-measured backlog, not a clean one.",
  },
  {
    dimension: "Foundation / Operational / Workflow compliance",
    verdict: "Pass",
    evidence: "All eight Platform libraries and both cross-cutting audits confirm zero unauthorized reimplementation of Foundation, Operational, or Workflow primitives anywhere in the codebase.",
  },
  {
    dimension: "Enterprise architecture integrity",
    verdict: "Pass",
    evidence: "Structurally sound end to end — zero violations found anywhere in the codebase.",
  },
];

export interface FinalScorecardTally {
  pass: number;
  partial: number;
  fail: number;
  total: number;
}

export function tallyFinalScorecard(): FinalScorecardTally {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of FINAL_SCORECARD) {
    if (row.verdict === "Pass") pass += 1;
    else if (row.verdict === "Partial") partial += 1;
    else fail += 1;
  }
  return { pass, partial, fail, total: FINAL_SCORECARD.length };
}
