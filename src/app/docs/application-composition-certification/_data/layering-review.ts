export type LayerVerdict = "Pass" | "Fail";

export interface LayerCheck {
  label: string;
  verdict: LayerVerdict;
  result: string;
}

/**
 * The five confirmations this package's own work order names under
 * LAYERING REVIEW, each checked against the pilot's own actual source —
 * the only real component-composing artifact DS-5 has produced — rather
 * than the architecture documents' own claims about themselves.
 */
export const LAYER_CHECKS: LayerCheck[] = [
  {
    label: "No reverse dependencies",
    verdict: "Pass",
    result: "A repo-wide grep for \"business-features\" or \"production-workspace\" inside src/components/ returns zero matches — no Platform, Workflow, Operational, or Foundation component has ever heard of this Business Feature.",
  },
  {
    label: "No skipped layers",
    verdict: "Pass",
    result: "Every pilot import resolves to Platform, Workflow, Operational, or Foundation directly — confirmed by listing every unique import source across all thirteen pilot files. No component reaches past an available higher-tier equivalent to a lower one.",
  },
  {
    label: "No duplicated ownership",
    verdict: "Pass",
    result: "The pilot's own Validation flow (Draft → Ready → Validating → Validated → Complete) is the one genuinely new piece of domain logic in DS-5 — it doesn't re-implement Workflow's own ApprovalStateValue vocabulary, it maps into it for rendering. No certified-tier concept is re-owned by the feature.",
  },
  {
    label: "No reusable UI recreated",
    verdict: "Pass",
    result: "All nine pilot components are feature-specific arrangements of certified components, not new primitives. The only genuinely new visual pattern is the two-column dashboard metrics layout, which is a prop choice (columns={2}) on an existing Platform component, not a new component.",
  },
  {
    label: "Business Features own orchestration only",
    verdict: "Pass",
    result: "useProductionWorkspace contains 100% of the pilot's own logic: state, commands, undo/redo, dialog state, selection, and the mock repository calls. Every composed component is a controlled, presentation-only child with zero internal business state.",
  },
];

export const LAYERING_NOTE =
  "The full Foundation → Operational → Workflow → Platform → Business Feature → Application chain, checked against the one artifact in DS-5 that actually composes components — the Production Workspace Feature pilot — rather than re-reading DS-5.1–5.3's own architecture claims about themselves.";
