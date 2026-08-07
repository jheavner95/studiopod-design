export interface QueuePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all five named domains
 * (Publishing, Production, Commerce, Automation, Operations) plus a direct
 * read of the Workflow Diagram Library's own WorkflowCard/WorkflowProgress/
 * WorkflowTimeline components. Automation and Operations have no
 * standalone component-library directory at all. Every real hit is a
 * diagram/metric visualization, not a job queue with per-item status,
 * progress, and retry — this package is genuinely new capability.
 */
export const QUEUE_PROMOTION_CANDIDATES: QueuePromotionCandidate[] = [];

export const QUEUE_CLEAN_FINDINGS: string[] = [
  "Production: HealthDashboardDiagram.tsx renders aggregate metric tiles (\"Jobs: 12\", \"Queue: 6\") via ProductionHealthCard — counts, not a list of individual job rows with per-item status/progress/retry. ValidationDiagram.tsx/QualityGateDiagram.tsx are rule-checklist diagrams with no retry semantics. No \"retry\"/\"Retry\" string exists anywhere in src/production.",
  "Publishing, Commerce: PublishingAndCommerceSection.tsx renders PublishingDiagram/CommerceDiagram, both explicitly \"generic, category-scoped views with zero provider-specific rendering code\" — capability registry diagrams, not job queues.",
  "Automation, Operations: neither exists as a standalone src/{name} component-library directory. The only \"Operations\" hit is unrelated architecture-layer example data (platformLayers.tsx).",
  "Workflows library: WorkflowCard.tsx is a generic FlowCard wrapper (icon/title/description/status) for one pipeline step, not a job with progress/retry/results. WorkflowProgress.tsx/WorkflowTimeline.tsx are diagram-pipeline visualizations, confirmed by direct read — a diagram library only, no real job-queue mechanics.",
  "grep for JobCard|JobProgress|JobRetry|QueueRow|QueueStatus|retryJob|jobStatus and priority.*Badge|PriorityBadge|jobPriority across src/**/*.tsx: no independent implementation exists — QueuePriority in particular is genuinely new ground, no priority-badge pattern existed anywhere before this family.",
  "The existing component inventory (inventory.ts, section \"4. Workflow Operations\") already tracks several of this family's gaps honestly: \"Queue Table\" (Needed, explicitly noting QueueFlow.tsx is \"a decorative animation of items moving along a track, not a data table\" — filled by Queue/QueueRow), \"Job Status Card\" (Partial, source WorkflowCard.tsx, \"the summarize-one-item-as-a-card pattern is well established, just not for a literal job\" — filled by JobCard), \"Batch Action Bar\" (Needed — filled by this family composing Bulk Actions directly), \"Progress Indicator\" (Exists, source motion/primitives/Progress.tsx, \"reusable but not job-specific\" — filled by JobProgress), \"Activity Timeline\" (Partial — filled by JobTimeline), \"Approval Panel\" (Needed, not addressed here — a genuinely separate future concern).",
];
