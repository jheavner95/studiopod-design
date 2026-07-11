import type { WorkflowStateValue, ApprovalStateValue, StateValue } from "@/components/workflow";
import type { QueueRowJob, QueuePriorityValue } from "@/components/operational";

/**
 * This module is the Business Feature's own mock repository — the "Mock
 * repository" responsibility DS-5.2's own Feature Structure assigns to the
 * feature, not to any certified tier. Nothing here is a reusable component;
 * it's pure data and pure transform functions the useProductionWorkspace
 * hook calls into, standing in for a real backend per this package's own
 * "local state and mock data only" instruction.
 */

export type ProductionStageId = "composition" | "generation" | "validation" | "publishing";

export interface ProductionStageDef {
  id: ProductionStageId;
  label: string;
  description: string;
}

/** The four pipeline stages an artwork moves through — rendered as ProductionStagePanel (Workflow's own PipelineStage) entries. */
export const PRODUCTION_STAGES: ProductionStageDef[] = [
  { id: "composition", label: "Composition", description: "Artwork layout and print-area placement." },
  { id: "generation", label: "Generation", description: "Render variants across product templates." },
  { id: "validation", label: "Validation", description: "Automated and manual quality gates." },
  { id: "publishing", label: "Publishing", description: "Push approved artwork to the storefront." },
];

/** This package's own explicit Draft → Ready → Validating → Validated → Complete flow — owned entirely by the Business Feature, distinct from and orthogonal to ProductionStageId above (an artwork can be "Validating" while sitting in any pipeline stage). */
export type ValidationFlowStatus = "draft" | "ready" | "validating" | "validated" | "complete";

export const VALIDATION_FLOW_ORDER: ValidationFlowStatus[] = ["draft", "ready", "validating", "validated", "complete"];

export const VALIDATION_FLOW_LABEL: Record<ValidationFlowStatus, string> = {
  draft: "Draft",
  ready: "Ready",
  validating: "Validating",
  validated: "Validated",
  complete: "Complete",
};

/** Workflow's own ApprovalStateValue vocabulary has no literal "Validated" — this is the mapping the feature owns to render its own flow through PipelineGate/ProductionValidationPanel without inventing a new status prop. */
export const VALIDATION_FLOW_TO_APPROVAL_STATE: Record<ValidationFlowStatus, ApprovalStateValue> = {
  draft: "pending",
  ready: "pending",
  validating: "in-review",
  validated: "approved",
  complete: "completed",
};

/** Mapping into Workflow's own StateValue vocabulary for ProductionInspector's status prop. */
export const VALIDATION_FLOW_TO_STATE_VALUE: Record<ValidationFlowStatus, StateValue> = {
  draft: "initial",
  ready: "waiting",
  validating: "active",
  validated: "completed",
  complete: "terminal",
};

/** Mapping into Workflow's own WorkflowStateValue vocabulary for ProductionStagePanel/WorkflowStep status props. */
export const STAGE_INDEX_TO_STEP_STATE: (stageIndex: number, artworkStageIndex: number) => WorkflowStateValue = (
  stageIndex,
  artworkStageIndex,
) => {
  if (artworkStageIndex > stageIndex) return "completed";
  if (artworkStageIndex === stageIndex) return "running";
  return "not-started";
};

export interface ValidationIssue {
  id: string;
  title: string;
  severity: "error" | "warning";
  resolved: boolean;
}

export interface ProductionArtwork {
  id: string;
  name: string;
  sku: string;
  stage: ProductionStageId;
  validationStatus: ValidationFlowStatus;
  priority: QueuePriorityValue;
  assignee: string;
  updatedAt: string;
  issues: ValidationIssue[];
  published: boolean;
  exported: boolean;
}

export const INITIAL_ARTWORKS: ProductionArtwork[] = [
  {
    id: "art-1",
    name: "Sunset ridge tee — front print",
    sku: "TEE-SR-001",
    stage: "composition",
    validationStatus: "draft",
    priority: "normal",
    assignee: "Priya N.",
    updatedAt: "12 min ago",
    issues: [],
    published: false,
    exported: false,
  },
  {
    id: "art-2",
    name: "Sunset ridge tee — back print",
    sku: "TEE-SR-002",
    stage: "generation",
    validationStatus: "ready",
    priority: "normal",
    assignee: "Priya N.",
    updatedAt: "8 min ago",
    issues: [],
    published: false,
    exported: false,
  },
  {
    id: "art-3",
    name: "Trailhead mug wrap",
    sku: "MUG-TH-014",
    stage: "generation",
    validationStatus: "validating",
    priority: "high",
    assignee: "Marcus D.",
    updatedAt: "3 min ago",
    issues: [
      { id: "iss-1", title: "Bleed area crosses the handle seam", severity: "error", resolved: false },
      { id: "iss-2", title: "CMYK profile drifted from print spec", severity: "warning", resolved: false },
    ],
    published: false,
    exported: false,
  },
  {
    id: "art-4",
    name: "Canyon poster A2",
    sku: "PST-CN-007",
    stage: "validation",
    validationStatus: "validating",
    priority: "urgent",
    assignee: "Marcus D.",
    updatedAt: "1 min ago",
    issues: [{ id: "iss-3", title: "Text crosses the safe-zone boundary", severity: "error", resolved: false }],
    published: false,
    exported: false,
  },
  {
    id: "art-5",
    name: "Canyon poster A3",
    sku: "PST-CN-008",
    stage: "validation",
    validationStatus: "validated",
    priority: "normal",
    assignee: "Priya N.",
    updatedAt: "18 min ago",
    issues: [{ id: "iss-4", title: "Color profile matches print spec", severity: "warning", resolved: true }],
    published: false,
    exported: false,
  },
  {
    id: "art-6",
    name: "Basecamp hoodie — chest print",
    sku: "HOOD-BC-021",
    stage: "publishing",
    validationStatus: "complete",
    priority: "low",
    assignee: "Jordan K.",
    updatedAt: "1 hr ago",
    issues: [],
    published: true,
    exported: true,
  },
];

export const INITIAL_QUEUE_JOBS: QueueRowJob[] = [
  { id: "job-1", name: "Render preview — Trailhead mug wrap", status: "running", priority: "high", progress: { processed: 6, total: 10 } },
  { id: "job-2", name: "Render preview — Canyon poster A2", status: "queued", priority: "urgent" },
  { id: "job-3", name: "Export approved assets — Basecamp hoodie", status: "completed", priority: "low" },
  { id: "job-4", name: "Color profile check — Sunset ridge tee (back)", status: "queued", priority: "normal" },
];

// ---------------------------------------------------------------------
// Repository — the small set of pure, in-memory operations the hook calls
// instead of a real API/DB. Every function returns a new array/object
// rather than mutating in place, matching how the hook's own React state
// updates are expected to work.
// ---------------------------------------------------------------------

export function advanceProductionStage(artwork: ProductionArtwork): ProductionArtwork {
  const index = PRODUCTION_STAGES.findIndex((s) => s.id === artwork.stage);
  const next = PRODUCTION_STAGES[Math.min(index + 1, PRODUCTION_STAGES.length - 1)];
  return { ...artwork, stage: next.id, updatedAt: "just now" };
}

export function advanceValidationStatus(artwork: ProductionArtwork): ProductionArtwork {
  const index = VALIDATION_FLOW_ORDER.indexOf(artwork.validationStatus);
  const next = VALIDATION_FLOW_ORDER[Math.min(index + 1, VALIDATION_FLOW_ORDER.length - 1)];
  return { ...artwork, validationStatus: next, updatedAt: "just now" };
}

export function toggleIssueResolved(artwork: ProductionArtwork, issueId: string): ProductionArtwork {
  return {
    ...artwork,
    issues: artwork.issues.map((issue) => (issue.id === issueId ? { ...issue, resolved: !issue.resolved } : issue)),
    updatedAt: "just now",
  };
}

export function publishArtwork(artwork: ProductionArtwork): ProductionArtwork {
  return { ...artwork, published: true, validationStatus: "complete", updatedAt: "just now" };
}

export function exportArtwork(artwork: ProductionArtwork): ProductionArtwork {
  return { ...artwork, exported: true, updatedAt: "just now" };
}
