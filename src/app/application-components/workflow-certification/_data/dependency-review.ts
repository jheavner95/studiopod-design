export interface LayerCheck {
  label: string;
  result: string;
  verdict: "Pass" | "Fail";
}

/**
 * Four greps ran directly against the repo during this certification (not
 * delegated, not estimated) to confirm the tier's own one-directional
 * dependency chain: Foundation → Operational → Workflow → Platform. Every
 * import statement in src/components/workflow/*.tsx was checked for a
 * reverse dependency upward into src/app/, src/production/, src/publishing/,
 * src/capabilities/, src/platforms/, or src/workflows/ (the unrelated
 * plural Workflow Diagram Library); src/components/operational/*.tsx was
 * checked for any import reaching into src/components/workflow/; and both
 * Foundation-family directories (src/components/{ui,layout,table,metadata,
 * form,overlay,navigation,feedback}) were checked for any import reaching
 * into either src/components/operational or src/components/workflow. All
 * four were cross-checked independently inside the eight per-system agent
 * audits and returned the same result.
 */
export const LAYER_CHECKS: LayerCheck[] = [
  {
    label: "Workflow → Foundation / Operational (expected)",
    result: "Every one of the 92 Workflow components' imports resolves to a sibling Workflow file, another Workflow Component Library system, an Operational component (@/components/operational), one of the eight Foundation families, @/lib/utils, or a legitimate framework import (react, lucide-react). Confirmed independently in all eight per-system audits.",
    verdict: "Pass",
  },
  {
    label: "Workflow → Platform / app layer (must not exist)",
    result: "Zero matches for any import from @/app, @/production, @/publishing, @/capabilities, @/platforms, or @/workflows (the plural diagram library) anywhere in src/components/workflow/*.tsx — reconfirmed by a direct repo-wide grep during synthesis, not just the per-system audits.",
    verdict: "Pass",
  },
  {
    label: "Operational → Workflow (must not exist, reverse)",
    result: "Zero matches for any import from @/components/workflow anywhere in src/components/operational/*.tsx.",
    verdict: "Pass",
  },
  {
    label: "Foundation → Operational or Workflow (must not exist, reverse)",
    result: "Zero matches for any import from @/components/operational or @/components/workflow anywhere in the eight Foundation-family directories.",
    verdict: "Pass",
  },
];

export const LAYERING_NOTE =
  "Foundation → Operational → Workflow → Platform Components is a strictly one-directional dependency graph today, confirmed by direct grep rather than assumed from the architecture diagram. \"Platform Components\" (the tier that would consume this library, and everything below it, in a real StudioPOD screen) does not exist yet — that is the subject of DS-4 and beyond, not a violation of this review.";
