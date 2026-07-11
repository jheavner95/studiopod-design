export type FinalVerdict = "Pass" | "Partial" | "Fail";

export interface FinalScorecardRow {
  dimension: string;
  verdict: FinalVerdict;
  evidence: string;
}

/**
 * Eleven dimensions — the union of every quality axis tracked anywhere
 * across the nine prior certifications, synthesized into one final table
 * rather than eleven separate per-tier scorecards. Four (Layering,
 * API consistency, Naming, Duplication) are Enterprise Architecture
 * Audit's own four; Accessibility is Accessibility Certification's;
 * Business Feature Composition is Application Composition Certification's;
 * Adoption/Production Readiness, Technical Debt Currency, and Foundation/
 * Operational/Workflow Compliance are readiness dimensions every tier
 * capstone has separately scored; Documentation Experience & Currency and
 * Enterprise Architecture Integrity are new to this page — the former
 * because no prior page owned it, the latter because "sound end to end,
 * confirmed twice" is a claim only the terminal page can make.
 */
export const FINAL_SCORECARD: FinalScorecardRow[] = [
  {
    dimension: "Layering & dependency discipline",
    verdict: "Pass",
    evidence:
      "Zero reverse dependencies, zero cycles, zero unjustified layer skips across 2,892 resolved import edges in 1,164 files — confirmed by two independent full-repo parses (Enterprise Architecture Audit, then this page).",
  },
  {
    dimension: "API consistency",
    verdict: "Partial",
    evidence:
      "Foundation's aria-describedby gap, previously reported resolved, is reopened at its true 10-of-10 severity. CellAlign's duplicate declaration and Table's missing findingCommand field remain open — see the Technical Debt Register.",
  },
  {
    dimension: "Naming integrity",
    verdict: "Partial",
    evidence:
      "The ProductionPipeline and WorkflowStep / PipelineStage collisions, first disclosed at Workflow Certification, remain open and unchanged. Every other tier's naming audit is clean.",
  },
  {
    dimension: "Duplication control",
    verdict: "Partial",
    evidence:
      "The value-transition announcement pattern Enterprise Architecture Audit found hand-copied across four components is still rolled out to only four of the six components that share it.",
  },
  {
    dimension: "Accessibility & interaction quality",
    verdict: "Partial",
    evidence:
      "Both of Enterprise Architecture Audit's Still-open accessibility items (TableRow keyboard activation; Popover aria-label on FilterPopover/DataGridColumnPicker) are now confirmed Resolved. Touch-target sizing for four icon affordances, the reopened aria-describedby gap, and a false accessibility-principle claim on two Workspace pages remain open.",
  },
  {
    dimension: "Business feature composition",
    verdict: "Pass",
    evidence:
      "All thirteen Composition Framework parts Pass against current source — verified at Application Composition Certification, re-verified at Enterprise Architecture Audit, unchanged here.",
  },
  {
    dimension: "Adoption & production readiness",
    verdict: "Fail",
    evidence:
      "Zero production Business Features exist anywhere in the codebase. Production Workspace remains the only real Business Feature — mock data, local state, zero API/repository layer — the same structural fact three prior certifications and this one all independently confirm.",
  },
  {
    dimension: "Documentation experience & currency",
    verdict: "Pass",
    evidence:
      "Certified for the first time by this page's own audit (Documentation Summary): every NAV_REGISTRY href resolves to a real page, the certification-sibling related[] graph is fully symmetric across all eight prior capstones, and the five DS-6.1 page archetypes are applied consistently.",
  },
  {
    dimension: "Technical debt currency",
    verdict: "Partial",
    evidence:
      "21 items now tracked in the consolidated register below: 5 Resolved, 3 Substantially resolved, 9 Still open, 4 Unconfirmed. A shrinking, honestly-measured backlog, not a clean one.",
  },
  {
    dimension: "Foundation / Operational / Workflow compliance",
    verdict: "Pass",
    evidence:
      "All eight Platform libraries and both cross-cutting audits confirm zero unauthorized reimplementation of Foundation, Operational, or Workflow primitives anywhere in the codebase.",
  },
  {
    dimension: "Enterprise architecture integrity",
    verdict: "Pass",
    evidence:
      "Structurally sound end to end, confirmed by two independent full-repo parses run months apart (Enterprise Architecture Audit and this page) — zero violations found either time.",
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
