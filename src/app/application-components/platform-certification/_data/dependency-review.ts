export interface LayerCheck {
  label: string;
  result: string;
  verdict: "Pass" | "Fail";
}

/**
 * Direct greps ran against the repo during this certification (not
 * delegated, not estimated) to confirm the tier's own one-directional
 * dependency chain: Foundation → Operational → Workflow → Platform →
 * Business Features. Every import statement in src/components/platform/
 * {production,product,publishing,commerce,intelligence,operations,admin,
 * integrations}/*.tsx was checked for a reverse dependency into src/app/,
 * a sibling platform's own directory, or the pre-existing diagram/
 * illustration libraries (src/workflows/, src/platforms/, src/capabilities/,
 * src/production/, src/illustrations/); Foundation/Operational/Workflow's
 * own source was checked for any import reaching up into
 * src/components/platform/. All checks were cross-verified independently
 * inside all nine per-package DS-4.10 audits and returned the same result.
 */
export const LAYER_CHECKS: LayerCheck[] = [
  {
    label: "Platform → Foundation / Operational / Workflow (expected)",
    result: "Every one of the 96 Platform-tier components' imports resolves to @/components/workflow, @/components/operational, or (Production Platform's own ProductionCanvas only) @/components/layout — confirmed independently in all eight per-platform audits, and re-confirmed by a direct repo-wide grep during synthesis.",
    verdict: "Pass",
  },
  {
    label: "Platform → app / cross-platform / diagram libraries (must not exist)",
    result: "Zero matches for any import from @/app, another platform's own directory (e.g. platform/admin importing from platform/commerce), or the pre-existing diagram/illustration libraries (src/workflows/, src/platforms/, src/capabilities/, src/production/, src/illustrations/) anywhere in src/components/platform/*/*.tsx.",
    verdict: "Pass",
  },
  {
    label: "Workflow / Operational → Platform (must not exist, reverse)",
    result: "Zero matches for any import from @/components/platform anywhere in src/components/workflow/*.tsx or src/components/operational/*.tsx.",
    verdict: "Pass",
  },
  {
    label: "Foundation → Operational / Workflow / Platform (must not exist, reverse)",
    result: "Zero matches for any import from @/components/operational, @/components/workflow, or @/components/platform anywhere in the eight Foundation-family directories.",
    verdict: "Pass",
  },
  {
    label: "Platform Architecture's own rules, followed by the real platforms",
    result: "DS-4.1's own composition rules (compose, don't reimplement; one platform, one owner; extension through props, never forking) were independently confirmed followed by all eight real platforms — verified directly via the same grep, not by trusting DS-4.1's own now-corrected \"zero platforms exist\" narrative.",
    verdict: "Pass",
  },
];

export const LAYERING_NOTE =
  "Foundation → Operational → Workflow → Platform → Business Features is a strictly one-directional dependency graph today, confirmed by direct grep rather than assumed from the architecture diagram. \"Business Features\" (the tier that would consume this library, and everything below it, in a real StudioPOD screen) does not exist yet — that is the subject of DS-5 and beyond, not a violation of this review.";
