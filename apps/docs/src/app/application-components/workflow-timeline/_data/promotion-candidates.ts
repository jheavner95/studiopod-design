export interface TimelinePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified six named domains — Production,
 * Publishing, Commerce, Automation, Operations, Audit — plus a broad
 * repo-wide grep for Timeline/HistoryList/AuditLog/ActivityLog/EventLog/
 * ActivityFeed identifiers, independently confirming rather than assuming
 * where real chronological-event-list duplication does and doesn't exist.
 */
export const TIMELINE_PROMOTION_CANDIDATES: TimelinePromotionCandidate[] = [];

export const TIMELINE_CLEAN_FINDINGS: string[] = [
  "Production: src/production/components/ValidationTimeline.tsx is a thin adapter — it maps pipeline.stages into TimelineItem[] and delegates all rendering (nodes, connectors, orientation) to src/compositions/TimelineComposition.tsx. No hand-rolled list/DOM of its own, so nothing to promote from it directly.",
  "Publishing: src/publishing/ does not exist as a directory. Every \"publish\"-named hit in the repo (PublishingDiagram.tsx, publishingCapability.tsx, PublishFlow.tsx, workflows/examples/publishing.tsx) is a capability-registry relationship diagram or motion primitive, not a timeline/history component.",
  "Commerce: src/capabilities/ and src/platforms/ contain only diagram/card components (CommerceDiagram, CapabilityCard, PlatformCard, etc.) — a case-insensitive grep for history|activity|audit trail|event log across all of src/capabilities/ returned zero hits, and a Timeline grep returned zero hits.",
  "Automation: no src/automation/ (or similarly named) directory exists anywhere in the repo — every \"Automation\" reference is a future-extension doc entry or a reuseTargets label, none implemented.",
  "Operations: src/components/operational/InspectorHistory.tsx is the one real, from-scratch chronological event-list implementation in the repo (actor + description + newest-first timestamp, collapse-to-N-then-expand). StatusTimeline.tsx and JobTimeline.tsx are both pure re-exports of it (StatusTimeline = InspectorHistory, JobTimeline = StatusTimeline) — that consolidation already happened; there is no live duplication left in this domain to promote.",
  "Audit: the only \"audit\"-named UI is src/app/application-components/foundation-audit/_components/AuditMatrix.tsx, a plain sortable/columnar Table — a data table with a date column, not a chronological event-list pattern, so it does not count as a duplicate of this family.",
  "Broad repo-wide grep for Timeline/HistoryList/AuditLog/ActivityLog/EventLog/ActivityFeed: the only additional hits beyond the domains above are src/compositions/TimelineComposition.tsx (the shared milestone/stage-diagram engine, an illustration-canvas layer this package deliberately does not compose from — the same reason InspectorHistory itself was built fresh rather than on top of it) and its second adapter, src/workflows/components/WorkflowTimeline.tsx (the pre-existing Workflow Diagram Library's own animated milestone rail — a different family at a different import path, the same naming overlap this package's own WorkflowTimeline.tsx doc comment explicitly calls out and accepts, mirroring the precedent WorkflowProgress.tsx already set).",
];
