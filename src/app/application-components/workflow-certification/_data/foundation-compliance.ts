export interface ComplianceFinding {
  system: string;
  finding: string;
}

/**
 * One concrete composition citation per system, drawn directly from each
 * system's own DS-3.9 audit — every claim below traces to an import line an
 * auditor actually read, not a restatement of that system's docs. This
 * tier's own composition chain is Foundation → Operational → Workflow →
 * Platform, so each finding below names both the Foundation and the
 * Operational reuse point where one exists.
 */
export const COMPLIANCE_FINDINGS: ComplianceFinding[] = [
  { system: "Workflow Framework", finding: "Workflow.tsx composes Operational's InspectorPanel directly for header/scroll/footer/loading chrome; WorkflowHeader wraps Foundation Metadata's IdentityBlock; WorkflowSidebar wraps Foundation Layout's Surface/ScrollArea; WorkflowProgress/WorkflowStatus wrap Foundation Feedback's ProgressBar/StatusIndicator; WorkflowFooter/WorkflowActions are literal re-exports of Operational's InspectorFooter/InspectorActions." },
  { system: "Workflow Stepper", finding: "8 of 10 components delegate directly to Workflow Framework (Workflow, WorkflowHeader, WorkflowStage, WorkflowTransition, WorkflowProgress, WorkflowSummary, WorkflowActions, WorkflowFooter); only WorkflowStepperStep/WorkflowStepperNavigation contain original render logic, both composing Foundation UI's Caption/Button." },
  { system: "Workflow Timeline", finding: "5 of 10 re-export Workflow Framework siblings; WorkflowTimelineConnector wraps WorkflowTransition; WorkflowTimelineFilters wraps Foundation Navigation's SegmentedControl; WorkflowTimelineEvent/Group deliberately do not reuse Operational's InspectorHistory after confirming it has no connector mechanism or status-driven marker." },
  { system: "Approval & Review", finding: "ApprovalFlow/ApprovalStage/ApprovalActions/ReviewSummary are literal re-exports of Workflow/WorkflowStage/WorkflowActions/WorkflowSummary; ReviewPanel is a direct re-export of Operational's InspectorPanel; ReviewComment/ReviewChecklist wrap Foundation Forms' TextareaField/CheckboxField; ReviewHistory composes Workflow Timeline's own Group/Event/Connector directly." },
  { system: "Pipeline Components", finding: "Pipeline/PipelineStage/PipelineActions/PipelineSummary re-export Workflow Framework siblings; PipelineConnector wraps WorkflowTransition; PipelineGate composes Approval & Review's own ApprovalDecision/ApprovalStatus directly; PipelineHistory composes Workflow Timeline's Group/Event/Connector; PipelineBranch wraps Foundation Layout's Grid; PipelineMetrics wraps Foundation Metadata's StatGroup." },
  { system: "State Machine", finding: "StateMachine/StateActions/StateSummary re-export Workflow Framework siblings; StateTransition wraps WorkflowTransition directly (one hop, not through PipelineConnector); StateInspector composes Operational's InspectorPanel/InspectorHeader/InspectorSection/InspectorProperty directly; StateHistory composes Workflow Timeline's Group/Event/Connector; StateCondition wraps Foundation Feedback's StatusIndicator." },
  { system: "Dependency & Relationship Views", finding: "DependencyGraph/RelationshipView/DependencySummary/DependencyActions re-export Workflow Framework siblings; DependencyEdge wraps WorkflowTransition; DependencyGroup wraps Foundation Layout's Grid; DependencyInspector composes Operational's InspectorPanel family directly; DependencyFilters wraps Foundation Navigation's SegmentedControl." },
  { system: "Workflow Visualization", finding: "WorkflowCanvas re-exports Workflow (Framework); WorkflowEdge/WorkflowGroup re-export Dependency & Relationship Views' own DependencyEdge/DependencyGroup; WorkflowViewport wraps Foundation Layout's ScrollArea; WorkflowSelection re-exports Operational's BulkActionBar plus Data Grid's own Set-based selection helpers verbatim; WorkflowInspector composes Operational's InspectorPanel family directly." },
];

/**
 * Genuinely new, non-Foundation, non-Operational code found during the
 * audit — in every case independently confirmed as justified (fills a real
 * gap neither layer covers) rather than an unnecessary parallel
 * implementation.
 */
export const NEW_CODE_JUSTIFICATIONS: ComplianceFinding[] = [
  { system: "Workflow Framework", finding: "WorkflowStage/WorkflowStep/WorkflowTransition are genuinely new — Foundation Navigation's own Stepper was directly checked and correctly ruled out (its single current-index/error-index model can't represent independently-statused concurrent steps)." },
  { system: "Workflow Timeline", finding: "WorkflowTimelineGroup/Event/Marker/Connector are genuinely new — checked directly against Operational's InspectorHistory and confirmed it has no connector/status-marker mechanism to reuse instead." },
  { system: "State Machine", finding: "StateNode's own 8-value StateValue vocabulary is genuinely new — Terminal has no counterpart in WorkflowStateValue at all, a real structural gap, not an unverified assumption of novelty." },
  { system: "Dependency & Relationship Views", finding: "DependencyNode's own 8-value DependencyStatusValue vocabulary and DependencyEdge's direction-arrow layer are genuinely new — checked directly against WorkflowStateValue/StateValue/Operational's HealthStatusValue and WorkflowTransition's full prop surface, neither covers this system's own structural-graph concepts." },
  { system: "Workflow Visualization", finding: "WorkflowNode's Paused status is genuinely new — checked directly against WorkflowStateValue's own eight values, none distinguish a user-initiated halt from Waiting on an external dependency. WorkflowControls (zoom/fit buttons) and WorkflowToolbar are genuinely new — repo-wide greps confirmed no existing camera-control or generic (non-table-scoped) toolbar primitive exists to reuse instead." },
];

/** Zero violations were found in any of the eight systems, across either the Foundation-reuse or Operational-reuse dimension. */
export const VIOLATIONS_FOUND = 0;
