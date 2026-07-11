export interface ComplianceFinding {
  system: string;
  finding: string;
}

/**
 * One concrete composition citation per platform, drawn directly from each
 * platform's own DS-4.10 audit — every claim below traces to an import
 * line an auditor actually read, not a restatement of that platform's
 * docs. This tier's own composition chain is Foundation → Operational →
 * Workflow → Platform, so each finding below names the Operational and
 * Workflow reuse points a platform actually composes from; Foundation
 * reuse is always indirect (inherited through the Operational/Workflow
 * component composed), the expected shape for a tier that composes one
 * layer down only.
 */
export const COMPLIANCE_FINDINGS: ComplianceFinding[] = [
  { system: "Production Platform", finding: "11 of 12 components are one-line re-exports of Workflow Framework/Pipeline Components/State Machine/Workflow Visualization siblings; ProductionCanvas is the sole genuine wrapper anywhere in all eight platforms — a 31-line function passing props straight through to Workflow Visualization's own WorkflowViewport, chosen over the shell-bearing WorkflowCanvas specifically to avoid a double shell. ProductionQueue re-exports Operational's own Queue directly." },
  { system: "Product Platform", finding: "All 12 components are one-line re-exports — the first platform to reach 12-of-12 pure re-exports with zero new wrapper code. ProductCatalog re-exports Operational's own DataGrid; ProductVariantPanel re-exports PropertyPanel; ProductLibrary re-exports AssetBrowser. ProductProviderMappings re-exports Dependency & Relationship Views' own RelationshipView — itself a bare re-export of the Workflow shell, a lower-tier decision this platform inherits rather than introduces." },
  { system: "Publishing Platform", finding: "All 12 components are one-line re-exports. PublishingTargets re-exports DataGrid; PublishingQueue re-exports Queue; PublishingProviders re-exports ProviderHealthPanel. PublishingHistory re-exports State Machine's own StateHistory — confirmed the correct choice over the confusingly-named WorkflowTimeline, which is itself a bare re-export of the Workflow shell with no event-log shape of its own." },
  { system: "Commerce Platform", finding: "All 12 components are one-line re-exports. CommerceCatalog, CommerceOrders, and CommerceInventory all re-export the same generic DataGrid against three structurally distinct row shapes — confirmed genuinely distinct usage, not fabricated distinctness. CommerceFulfillment re-exports Pipeline Components' own PipelineStage (itself a re-export of WorkflowStage, a real distinct stage shape), confirmed the correct choice over WorkflowStepper, which is a bare Workflow-shell re-export." },
  { system: "Intelligence Platform", finding: "All 12 components are one-line re-exports, reusing five distinct Operational widgets (RecommendationWidget, DataGrid, HealthPanel, HealthIssueList, ChartWidget) — more distinct Operational reuse than any sibling platform. IntelligenceInspector re-exports State Machine's own StateInspector; IntelligenceMetrics/IntelligenceSummary re-export Pipeline Components' own PipelineMetrics/PipelineSummary." },
  { system: "Operations Platform", finding: "All 12 components are one-line re-exports. OperationsMonitoring re-exports ProviderHealthPanel generalized for generic multi-system monitoring (name/status/latency/uptime rows, no literal provider concept required) rather than literally external providers — confirmed structurally sound by reading ProviderHealthPanel's own source directly. OperationsAutomation re-exports Pipeline Components' own PipelineStage." },
  { system: "Admin Platform", finding: "All 12 components are one-line re-exports. AdminUsers and AdminPermissions both re-export DataGrid; AdminConfiguration re-exports PropertyPanel. AdminEnrollment re-exports Approval & Review's own ApprovalStage — confirmed the correct choice over Pipeline Components' own PipelineStage (both are, at bottom, the same WorkflowStage) and over WorkflowStepper (a bare shell re-export). AdminAudit re-exports State Machine's own StateHistory, not the WorkflowTimeline naming trap." },
  { system: "Integrations Platform", finding: "All 12 components are one-line re-exports. IntegrationsProviders re-exports DataGrid directly for a heterogeneous-column registry, while IntegrationsConnections re-exports the narrower ProviderHealthPanel for uniform per-connection health — confirmed structurally distinct, not a cosmetic split, by reading both sources. IntegrationsMappings re-exports RelationshipView, the second Platform-tier reuse of that component after Product Platform's own ProductProviderMappings. IntegrationsSync re-exports Status & Health's own SyncStatusPanel, its first real Platform-tier consumer." },
];

/**
 * Genuinely new, non-Foundation, non-Operational, non-Workflow code found
 * during the audit — checked in every case and confirmed justified (fills
 * a real gap no lower tier covers) rather than an unnecessary parallel
 * implementation.
 */
export const NEW_CODE_JUSTIFICATIONS: ComplianceFinding[] = [
  { system: "Production Platform", finding: "ProductionCanvas is the only genuinely new code across all 96 Platform-tier components — a thin prop-passthrough wrapper over WorkflowViewport, not a reimplementation of anything. Verified by grepping every other platform's own component directory for exported function/const bodies: zero matches anywhere else." },
];

/** Zero violations were found in any of the eight platforms, across the Foundation-reuse, Operational-reuse, or Workflow-reuse dimensions. */
export const VIOLATIONS_FOUND = 0;
