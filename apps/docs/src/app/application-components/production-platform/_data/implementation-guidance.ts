export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Platform composition",
    text: "Every one of these 12 components is a re-export or a thin wrapper over a Workflow or Operational component. Each one is reused as-is because its existing prop surface already covered the need, without a Production-specific field.",
  },
  {
    label: "Workflow integration",
    text: "ProductionPipeline/ProductionStagePanel compose Pipeline Components directly for stage-by-stage progression; ProductionInspector composes State Machine directly for a single artifact's own lifecycle; ProductionCanvas composes Workflow Visualization directly for the dependency graph — three different systems, each reused for the sub-concern it was actually built for, not one generic \"Workflow\" dependency.",
  },
  {
    label: "Operational integration",
    text: "ProductionQueue composes Operational's own Queue directly — real selection state, filtering, and bulk-action integration inherited unchanged, not reimplemented at the platform level.",
  },
  {
    label: "Validation flow",
    text: "ProductionValidationPanel does not implement a gate-decision engine — it renders whatever approval state the caller supplies through PipelineGate. Whether an artifact actually passes validation is decided by your application logic, not by this component.",
  },
  {
    label: "Inspector usage",
    text: "ProductionInspector's own children slot is where a dependency graph (DependencyGroup/DependencyNode content) belongs when an artifact has real dependencies to show — the same children-slot pattern every inspector in this family uses, rather than a second inspector variant.",
  },
  {
    label: "Metrics placement",
    text: "ProductionSummary is the at-a-glance overview row (job counts, completion percentage); ProductionMetrics is the sibling for measured run-time numbers (throughput, cycle time) — the same Summary/Metrics split used across Pipeline Components.",
  },
];
