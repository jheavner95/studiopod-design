export type DimensionVerdict = "Pass" | "Partial" | "Fail";

export const VERIFICATION_DIMENSIONS = ["Accessible naming", "Keyboard operability", "Focus management", "Live region coverage", "Touch target size", "Documentation accuracy"] as const;

export type VerificationDimension = (typeof VERIFICATION_DIMENSIONS)[number];

export interface TierScorecardRow {
  tier: string;
  verdicts: Record<VerificationDimension, DimensionVerdict>;
}

/**
 * The two-tier x six-dimension matrix behind this certification's decision.
 * Six dimensions rather than a generic composition-layer matrix (the
 * Workflow/Platform tiers' own twelve/thirteen) because this certification's
 * subject is accessibility and interaction quality specifically, not
 * Foundation/Operational/Workflow composition (already certified
 * separately at each of those tiers' own capstones). Every cell reflects
 * the POST-CORRECTION state: where a Resolved finding closed a gap, that
 * dimension scores Pass, not a standing Partial. Live region coverage and
 * Touch target size are the two dimensions carrying real, disclosed,
 * unresolved gaps — see findings.ts's own Deferred bucket for exactly why
 * each cell below isn't a clean Pass.
 */
export const SCORECARD: TierScorecardRow[] = [
  {
    tier: "Foundation",
    verdicts: {
      "Accessible naming": "Pass",
      "Keyboard operability": "Partial",
      "Focus management": "Pass",
      "Live region coverage": "Pass",
      "Touch target size": "Pass",
      "Documentation accuracy": "Pass",
    },
  },
  {
    tier: "Operational",
    verdicts: {
      "Accessible naming": "Pass",
      "Keyboard operability": "Partial",
      "Focus management": "Pass",
      "Live region coverage": "Fail",
      "Touch target size": "Partial",
      "Documentation accuracy": "Pass",
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

/**
 * Live region coverage is the one dimension carrying an outright Fail
 * (Operational tier) — every real-time-updating Operational component this
 * audit found (Queue/Job status, Dashboard Widgets) still lacks a wired
 * useAnnounce() call, even though the shared primitive now exists (see
 * pre-session-fixes.ts). Reported separately here, the same way Platform
 * tier's own scorecard separated out Adoption readiness, since it's the
 * single dimension driving the overall Certified (not Enterprise Certified)
 * decision.
 */
export const OTHER_DIMENSIONS = VERIFICATION_DIMENSIONS.filter((d) => d !== "Live region coverage");

export function computeQualityTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    for (const dimension of OTHER_DIMENSIONS) {
      const verdict = row.verdicts[dimension];
      if (verdict === "Pass") pass += 1;
      else if (verdict === "Partial") partial += 1;
      else fail += 1;
    }
  }
  return { pass, partial, fail, total: pass + partial + fail };
}

export function computeLiveRegionTotals() {
  let pass = 0;
  let partial = 0;
  let fail = 0;
  for (const row of SCORECARD) {
    const verdict = row.verdicts["Live region coverage"];
    if (verdict === "Pass") pass += 1;
    else if (verdict === "Partial") partial += 1;
    else fail += 1;
  }
  return { pass, partial, fail, total: pass + partial + fail };
}
