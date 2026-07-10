export interface LayerCheck {
  label: string;
  result: string;
  verdict: "Pass" | "Fail";
}

/**
 * Two greps ran directly against the repo during this certification (not
 * delegated, not estimated): every import statement in
 * src/components/operational/*.tsx was checked for a reverse dependency
 * upward into src/app/, src/production/, src/publishing/, src/capabilities/,
 * src/platforms/, or src/workflows/; and every Foundation-layer file
 * (src/components/{ui,layout,table,metadata,form,overlay,navigation,
 * feedback}/*.tsx) was checked for a downward import from
 * @/components/operational. Both of these were cross-checked independently
 * inside all nine per-system agent audits and returned the same result.
 */
export const LAYER_CHECKS: LayerCheck[] = [
  {
    label: "Operational → Foundation (expected)",
    result: "Every operational component's imports resolve to a sibling operational file, one of the eight Foundation families (@/components/{ui,layout,table,metadata,form,overlay,navigation,feedback}), @/lib/utils, or a legitimate framework import (react, next/image, next/link, lucide-react).",
    verdict: "Pass",
  },
  {
    label: "Operational → Platform / app layer (must not exist)",
    result: "Zero matches for any import from @/app, @/production, @/publishing, @/capabilities, @/platforms, or @/workflows anywhere in src/components/operational/*.tsx.",
    verdict: "Pass",
  },
  {
    label: "Foundation → Operational (must not exist)",
    result: "Zero matches for any import from @/components/operational anywhere in the eight Foundation-family directories.",
    verdict: "Pass",
  },
];

export const LAYERING_NOTE =
  "Foundation → Operational → Platform Components is a strictly one-directional dependency graph today, confirmed by direct grep rather than assumed from the architecture diagram. \"Platform Components\" (the tier that would consume these nine systems in a real StudioPOD screen) does not exist yet — that is the subject of DS-3 and beyond, not a violation of this review.";
