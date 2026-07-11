export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Platform composition",
    text: "Every one of these 12 components is a pure re-export or a thin wrapper over an already-certified Workflow or Operational component — checked directly against the Platform Rules defined on the Platform Architecture page before writing each file, and in every case an existing component's prop surface already covered the need with no Production-specific field required.",
  },
  {
    label: "Workflow integration",
    text: "ProductionPipeline/ProductionStagePanel compose Pipeline Components directly for stage-by-stage progression; ProductionInspector composes State Machine directly for a single artifact's own lifecycle; ProductionCanvas composes Workflow Visualization directly for the dependency graph. Three different Workflow systems, each reused for the sub-concern it was actually built for, not one generic \"Workflow\" dependency.",
  },
  {
    label: "Operational integration",
    text: "ProductionQueue composes Operational's own Queue directly — real selection state, filtering, and bulk-action integration inherited unchanged, not reimplemented at the Platform tier.",
  },
  {
    label: "Validation flow",
    text: "ProductionValidationPanel does not implement a gate-decision engine — it renders whatever ApprovalStateValue the caller supplies through PipelineGate. Whether an artifact actually passes validation is Business Feature logic, not something this platform component decides.",
  },
  {
    label: "Inspector usage",
    text: "ProductionInspector's own children slot is where a dependency graph (DependencyGroup/DependencyNode content) belongs when an artifact has real dependencies to show — the same \"children slot for extra context\" pattern every Inspector in this tier already uses, rather than a second Inspector variant.",
  },
  {
    label: "Metrics placement",
    text: "ProductionSummary is the at-a-glance overview row (job counts, completion percentage); ProductionMetrics is the sibling for measured run-time numbers (throughput, cycle time) — the identical Summary/Metrics split Pipeline Components already established one tier down, inherited rather than re-decided here.",
  },
];
