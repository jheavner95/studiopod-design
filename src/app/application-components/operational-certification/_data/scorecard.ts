export type DimensionVerdict = "Pass" | "Partial" | "Fail";

export const VERIFICATION_DIMENSIONS = [
  "API consistency",
  "Composition",
  "Foundation reuse",
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
 * The full 9-system × 11-dimension matrix, transcribed directly from nine
 * independent DS-2.5.10 audit passes (one per system). Every verdict traces
 * to a specific piece of code evidence in that system's own audit report —
 * see the per-system key-gaps list in systems.ts for what each Partial/Fail
 * actually means.
 */
export const SCORECARD: SystemScorecardRow[] = [
  {
    system: "Data Grid",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Partial", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Inspector Panel",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Partial" },
  },
  {
    system: "Property Panel",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Asset Browser",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Filter & Search",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Partial", Documentation: "Pass", Naming: "Partial", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
  },
  {
    system: "Bulk Actions",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Partial", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Partial" },
  },
  {
    system: "Status & Health",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Partial", Documentation: "Partial", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Partial" },
  },
  {
    system: "Queue & Job",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Pass", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Partial", "Adoption readiness": "Fail" },
  },
  {
    system: "Dashboard Widgets",
    verdicts: { "API consistency": "Pass", Composition: "Pass", "Foundation reuse": "Pass", Accessibility: "Partial", "Responsive behavior": "Pass", Documentation: "Pass", Naming: "Pass", Dependencies: "Pass", "State handling": "Pass", "Interaction patterns": "Pass", "Adoption readiness": "Fail" },
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
 * Every "Fail" verdict in the matrix — 6 of 6 — is an Adoption readiness
 * cell; the ten quality dimensions (everything except Adoption readiness)
 * have zero Fails anywhere. Computed here, not hand-counted, so this stays
 * correct if the matrix above changes.
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
