export type DimensionVerdict = "Pass" | "Partial" | "Fail";

export const VERIFICATION_DIMENSIONS = [
  "API consistency",
  "Foundation composition",
  "Operational composition",
  "Workflow composition",
  "Platform boundary compliance",
  "Accessibility",
  "Responsive behavior",
  "Documentation",
  "Naming",
  "Dependencies",
  "State handling",
  "Interaction patterns",
  "Adoption readiness",
] as const;

export type VerificationDimension = (typeof VERIFICATION_DIMENSIONS)[number];

export interface SystemScorecardRow {
  system: string;
  verdicts: Record<VerificationDimension, DimensionVerdict>;
}

/**
 * The full 8-platform × 13-dimension matrix, transcribed directly from
 * eight independent DS-4.10 audit passes (one per platform, Platform
 * Architecture excluded since it is documentation, not a component
 * library — see the Layering Review instead). Thirteen dimensions rather
 * than DS-3.9's twelve: this tier composes from THREE lower tiers
 * (Foundation, Operational, Workflow) plus a Platform-specific boundary
 * check, so the work order splits "Composition" into four dimensions
 * instead of one. Every cell reflects the POST-CORRECTION state — where an
 * audit found a real documentation defect, this certification fixed it in
 * the same pass (see Promotion Review's own Resolved bucket for what
 * changed), so a defect that was found and fixed scores Pass here, not a
 * standing Partial.
 */
export const SCORECARD: SystemScorecardRow[] = [
  {
    system: "Production Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Product Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Publishing Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Commerce Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Intelligence Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Operations Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Admin Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Integrations Platform",
    verdicts: { "API consistency": "Pass", "Foundation composition": "Pass", "Operational composition": "Pass", "Workflow composition": "Pass", "Platform boundary compliance": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
];

export interface DimensionTally {
  dimension: VerificationDimension;
  pass: number;
  partial: number;
  fail: number;
}

export function tallyDimension(dimension: VerificationDimension): DimensionTally {
  const counts = { pass: 0, partial: 0, fail: 0 };
  for (const row of SCORECARD) {
    const verdict = row.verdicts[dimension];
    if (verdict === "Pass") counts.pass += 1;
    else if (verdict === "Partial") counts.partial += 1;
    else counts.fail += 1;
  }
  return { dimension, ...counts };
}

export const DIMENSION_TALLIES: DimensionTally[] = VERIFICATION_DIMENSIONS.map(tallyDimension);

/**
 * Every "Fail" verdict in the matrix — 8 of 8 — is an Adoption readiness
 * cell; the twelve quality dimensions (everything except Adoption
 * readiness) have zero Fails anywhere, and only one Partial across the
 * whole matrix (Production Platform's own disclosed-but-unrenamed
 * ProductionPipeline naming collision). Computed here, not hand-counted,
 * so this stays correct if the matrix above changes.
 */
export const QUALITY_DIMENSIONS = VERIFICATION_DIMENSIONS.filter((d) => d !== "Adoption readiness");

export function computeQualityTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    for (const dimension of QUALITY_DIMENSIONS) {
      const verdict = row.verdicts[dimension];
      if (verdict === "Pass") pass += 1;
      else if (verdict === "Partial") partial += 1;
      else fail += 1;
    }
  }
  return { pass, partial, fail, total: pass + partial + fail };
}

export function computeAdoptionTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    const verdict = row.verdicts["Adoption readiness"];
    if (verdict === "Pass") pass += 1;
    else if (verdict === "Partial") partial += 1;
    else fail += 1;
  }
  return { pass, partial, fail, total: pass + partial + fail };
}
