export type DimensionVerdict = "Pass" | "Partial" | "Fail";

export const VERIFICATION_DIMENSIONS = ["Layering discipline", "API consistency", "Naming integrity", "Duplication control"] as const;

export type VerificationDimension = (typeof VERIFICATION_DIMENSIONS)[number];

export interface TierScorecardRow {
  tier: string;
  verdicts: Record<VerificationDimension, DimensionVerdict>;
}

/**
 * Five tiers by four dimensions — Business Features rather than
 * Application, since Application (the page.tsx/gallery layer) is a
 * consumption surface, not a component library, the same reason Platform
 * Certification excluded Platform Architecture from its own scorecard.
 * Application-tier's own layering behavior (zero direct Platform imports
 * outside Gallery components and the one Business Feature) is checked
 * instead in the Layering & Dependency Graph section above. Every cell
 * reflects current source, independently re-verified during this audit —
 * not copied from any prior tier certification's own scorecard.
 */
export const SCORECARD: TierScorecardRow[] = [
  {
    tier: "Foundation",
    verdicts: {
      "Layering discipline": "Pass",
      "API consistency": "Partial",
      "Naming integrity": "Partial",
      "Duplication control": "Partial",
    },
  },
  {
    tier: "Operational",
    verdicts: {
      "Layering discipline": "Pass",
      "API consistency": "Pass",
      "Naming integrity": "Pass",
      "Duplication control": "Partial",
    },
  },
  {
    tier: "Workflow",
    verdicts: {
      "Layering discipline": "Pass",
      "API consistency": "Pass",
      "Naming integrity": "Partial",
      "Duplication control": "Partial",
    },
  },
  {
    tier: "Platform",
    verdicts: {
      "Layering discipline": "Pass",
      "API consistency": "Pass",
      "Naming integrity": "Partial",
      "Duplication control": "Pass",
    },
  },
  {
    tier: "Business Features",
    verdicts: {
      "Layering discipline": "Pass",
      "API consistency": "Pass",
      "Naming integrity": "Pass",
      "Duplication control": "Pass",
    },
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

export function computeQualityTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    for (const dimension of VERIFICATION_DIMENSIONS) {
      const verdict = row.verdicts[dimension];
      if (verdict === "Pass") pass += 1;
      else if (verdict === "Partial") partial += 1;
      else fail += 1;
    }
  }
  return { pass, partial, fail, total: pass + partial + fail };
}

/**
 * Layering discipline alone — the one dimension with a clean sweep, called
 * out separately since it's the closest thing this audit has to Platform
 * Certification's own "twelve dimensions, held back by exactly one" shape,
 * except here it's the dimension with zero exceptions, not the one causing
 * them.
 */
export function computeLayeringTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    const verdict = row.verdicts["Layering discipline"];
    if (verdict === "Pass") pass += 1;
    else if (verdict === "Partial") partial += 1;
    else fail += 1;
  }
  return { pass, partial, fail, total: pass + partial + fail };
}
