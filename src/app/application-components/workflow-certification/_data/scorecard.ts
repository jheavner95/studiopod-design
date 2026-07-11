export type DimensionVerdict = "Pass" | "Partial" | "Fail";

export const VERIFICATION_DIMENSIONS = [
  "API consistency",
  "Composition",
  "Foundation reuse",
  "Operational reuse",
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
 * The full 8-system × 12-dimension matrix, transcribed directly from eight
 * independent DS-3.9 audit passes (one per system). Every verdict traces to
 * a specific piece of code evidence in that system's own audit report — see
 * the per-system key-gaps list in systems.ts for what each Partial means.
 * Twelve dimensions rather than DS-2.5.10's eleven: this tier sits above
 * BOTH Foundation and Operational (Foundation → Operational → Workflow →
 * Platform), so Foundation reuse and Operational reuse are scored as two
 * separate dimensions rather than one.
 */
export const SCORECARD: SystemScorecardRow[] = [
  {
    system: "Workflow Framework",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Workflow Stepper",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Workflow Timeline",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Approval & Review",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Pipeline Components",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "State Machine",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Dependency & Relationship Views",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Workflow Visualization",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", "Operational reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Partial", "Adoption readiness": "Fail" },
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
 * cell; the eleven quality dimensions (everything except Adoption
 * readiness) have zero Fails anywhere, only five Partials across the whole
 * matrix. Computed here, not hand-counted, so this stays correct if the
 * matrix above changes.
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
