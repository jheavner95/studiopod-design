export interface PublishingImplementationGuidance {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: PublishingImplementationGuidance[] = [
  { label: "Platform composition", text: "Every one of these 12 components is a pure re-export over an already-certified Workflow or Operational component — checked directly against Platform Rules (defined in DS-4.1) before writing each file, and in every case an existing component's prop surface already covered the need with no Publishing-specific field required. The same zero-new-wrapper-code precedent Product Platform Components (DS-4.3) already established." },
  { label: "Workflow integration", text: "PublishingValidationPanel composes Pipeline Components directly for gate-decision rendering; PublishingInspector composes State Machine directly for a single publication's own lifecycle; PublishingHistory composes State Machine's own StateHistory directly for the chronological publish record — chosen deliberately over the confusingly-named WorkflowTimeline (itself just a Workflow shell re-export, not an event log)." },
  { label: "Operational integration", text: "PublishingTargets composes Operational's own DataGrid directly for the tabular destination listing; PublishingProviders composes Operational's own ProviderHealthPanel directly for connection/service health; PublishingQueue composes Operational's own Queue directly for the publish job queue." },
  { label: "Provider management", text: "PublishingProviders does not implement real provider connections, OAuth flows, or sync logic — it renders whatever ProviderHealthRow[] the caller supplies through ProviderHealthPanel. Whether a provider connection is actually healthy is Business Feature logic, not something this platform component decides." },
  { label: "Queue handling", text: "PublishingQueue does not implement a real job scheduler or publish executor — it renders whatever QueueRowJob[] the caller supplies through Queue, the same reuse target Production Platform's own ProductionQueue already established." },
  { label: "Validation flow", text: "PublishingValidationPanel does not implement a gate-decision engine — it renders whatever ApprovalStateValue the caller supplies through PipelineGate. Whether a publication actually passes its pre-publish gate is Business Feature logic, not something this platform component decides." },
  { label: "History usage", text: "PublishingHistory's own entries prop expects caller-supplied StateHistoryEntry objects already in order — it does not fetch, persist, or re-sort history data itself, the same read-only contract every history component in this tier already follows." },
];
