export interface PromotionEntry {
  title: string;
  system: string;
  detail: string;
}

/**
 * Every real duplication finding across all eight systems' own DS-3.x
 * promotion-candidates audits, reclassified into three buckets. No
 * speculative findings — every entry below traces to a specific,
 * already-published promotion-candidates.ts file (or, where noted, a
 * source-file citation re-verified during this certification) from the
 * system named.
 */
export const RESOLVED: PromotionEntry[] = [
  {
    title: "Five systems re-export the same root panel rather than rebuilding it",
    system: "Pipeline, State Machine, Dependency & Relationship Views, Workflow Visualization",
    detail: "Pipeline=Workflow, StateMachine=Workflow, DependencyGraph=Workflow, RelationshipView=Workflow, WorkflowCanvas=Workflow — every top-level shell across the tier is a literal re-export of Workflow Framework's own Workflow, confirmed by direct source read in all four downstream audits, not five near-identical InspectorPanel-composition implementations.",
  },
  {
    title: "WorkflowActions/WorkflowSummary/WorkflowFooter re-exported at least six times combined",
    system: "Every system built on Workflow Framework",
    detail: "ApprovalActions, PipelineActions, StateActions, DependencyActions all re-export WorkflowActions (itself a re-export of Operational's InspectorActions); ReviewSummary, PipelineSummary, StateSummary, DependencySummary all re-export WorkflowSummary — a real, repeated shared-ownership pattern catching what would otherwise be six-plus duplicate action-row/stat-row implementations.",
  },
  {
    title: "WorkflowEdge/WorkflowGroup reuse Dependency & Relationship Views' own components directly",
    system: "Workflow Visualization",
    detail: "Rather than rebuild a direction-arrow edge and a node-cluster boundary a second time, WorkflowEdge and WorkflowGroup are literal re-exports of Dependency & Relationship Views' own DependencyEdge/DependencyGroup — confirmed by direct source read, not restated from docs.",
  },
  {
    title: "WorkflowSelection reuses Operational's Bulk Actions and Data Grid selection helpers verbatim",
    system: "Workflow Visualization",
    detail: "Rather than invent a bespoke multi-select model — the first real one in this tier — WorkflowSelection composes Operational's own BulkActionBar directly and re-exports Data Grid's own Set<string> selection helpers (toggleSelection/selectAll/isAllSelected/isPartiallySelected/useDataGridSelection) under workflow-specific names, the same reuse Asset Browser's own AssetSelection.tsx already made one tier below.",
  },
];

export const DEFERRED: PromotionEntry[] = [];

export const REJECTED: PromotionEntry[] = [
  {
    title: "Production's illustration-canvas pipeline model, and the illustration engine's own DiagramPipeline primitive",
    system: "Pipeline Components",
    detail: "src/production/{types,utils,components} (ValidationStage/QualityGate/ProductionPipeline data model, gates.ts/status.ts/compile.tsx utils, QualityGateDiagram/ValidationDiagram/ProductionPipelineDiagram) and src/illustrations/types/diagram.ts's own PipelineStage/DiagramPipeline types were investigated in full and judged a different, coordinate-positioned SVG rendering layer rather than a literal duplicate of this system's own DOM flex/Grid composition — re-verified to still exist and still match the original description during this certification.",
  },
  {
    title: "PlatformRelationshipMap and CapabilityRegistryDiagram",
    system: "Dependency & Relationship Views",
    detail: "src/platforms/components/PlatformRelationshipMap.tsx and src/capabilities/components/CapabilityRegistryDiagram.tsx were investigated in full and judged real, coexisting prior art at a different rendering layer (illustration-canvas, coordinate-positioned SVG) rather than something to migrate away from — re-verified to still exist and still match the original description during this certification.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Every one of the eight systems dispatched its own dedicated duplication audit before writing new code, and every one of those audits is still published in its own migration-notes data. This section reclassifies their combined output — it does not re-run the searches from scratch, since the eight per-system audits above already independently re-verified each system's own reuse and duplication claims, including re-confirming that the two Rejected-bucket citations (Production's pipeline model, PlatformRelationshipMap/CapabilityRegistryDiagram) still exist and still match their original descriptions.";
