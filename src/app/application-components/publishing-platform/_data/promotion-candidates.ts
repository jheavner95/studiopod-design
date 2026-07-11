export interface PublishingPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the seven subdomains this package's own work order names —
 * Publishing platform, Publishing targets, Providers, Queue, History,
 * Validation, Operations — before a single Publishing platform component
 * was written. No speculative findings: every entry below traces to a
 * specific file this audit actually read.
 */
export const PUBLISHING_PROMOTION_CANDIDATES: PublishingPromotionCandidate[] = [];

export const PUBLISHING_CLEAN_FINDINGS: string[] = [
  "Publishing platform (whole-platform level): diagram-layer only. No src/publishing/ directory exists. Platform Component Architecture's own adoption audit already confirmed this with an explicit verdict of \"diagram-layer-only\", quoting src/capabilities/components/PublishingDiagram.tsx (a ~30-line IllustrationCanvas wrapper) and src/workflows/examples/publishing.tsx (a static Workflow fixture) as the only Publishing-adjacent code — no dedicated publishing module, content model, or channel-sync logic exists anywhere.",
  "Publishing targets: naming false-positive only. The ~180 repo-wide hits for \"target\" are dominated by generic diagram-edge source/target fields used identically across every domain's static example data — the same generic graph-edge shape Dependency & Relationship Views' own audit already flagged elsewhere. No real channel/destination-list selection logic exists anywhere.",
  "Providers: re-confirms Product Platform's own finding. src/providers/ (MotionProvider) is unrelated React context. Operational's own ProviderHealthPanel is a generic DataGrid-backed health table with zero publishing-specific code. The Capability Library's own provider utils (src/capabilities/utils/providers.ts) are real filter/sort functions but confirmed to contain no fetch/axios/http calls anywhere, operating only over static example fixtures — including src/capabilities/examples/publishingCapability.tsx, which names WordPress/Shopify as providers purely as hardcoded object-literal data, not logic.",
  "Queue: re-confirms Production Platform's own finding. src/production/examples/productionHealth.tsx still has only a single \"Queue: 6\" stat-tile label. A PublishingQueueDemo exists in Queue & Job's own gallery, but it's built entirely on the already-certified generic Queue/QueueRow/QueueWidget primitives over a hardcoded fixture array — no Publishing-specific queue or job-execution code, a finding Queue & Job's own migration-notes audit already made explicit.",
  "History: genuinely nonexistent as Publishing-specific logic. Every \"history\"-named component in the repo (StateHistory, ReviewHistory, PipelineHistory, InspectorHistory, SearchHistory) is generic, type-parameterized Foundation/Workflow-tier infrastructure with zero publishing-domain fields. \"Content Revision\" and \"revision history\" appear only as forward-looking planning prose in Platform Component Architecture's own template, not implemented code.",
  "Validation: re-confirms Production and Product Platform's own finding. src/production/utils/gates.ts remains a pure synchronous reducer with no I/O. No pre-publish checklist or format-validation logic exists anywhere — Approval & Review's own generic ReviewChecklist lists \"Publishing Review\" only as an example gallery label, not a real pre-publish validator.",
  "Operations: genuinely nonexistent. Repo-wide search for real publish/deploy execution (fetch/axios/XMLHttpRequest calls, cron or scheduling logic, retry/backoff logic) returns zero real code hits anywhere in src/. \"Publishing Operations\" appears only as a documentation-page title and as reuseTargets planning strings in the Foundation Components catalog — never as real execution code.",
];
