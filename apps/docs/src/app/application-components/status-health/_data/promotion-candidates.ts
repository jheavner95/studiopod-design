export interface HealthPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains
 * (Production, Publishing, Commerce, Intelligence, Operations, Diagnostics)
 * plus a deep read of Production's three existing health files. Publishing,
 * Commerce, Intelligence, Operations, and Diagnostics have no standalone
 * component-library directory at all — they only exist as documentation
 * concepts, not implementation code. Production's own health components
 * are real but narrowly scoped (a metric-grid layout and a single StatCard
 * preset), not a duplicate of this package's score/issue-list/recommendation
 * abstractions.
 */
export const HEALTH_PROMOTION_CANDIDATES: HealthPromotionCandidate[] = [];

export const HEALTH_CLEAN_FINDINGS: string[] = [
  "Production: HealthDashboardDiagram.tsx (19 lines) is a bare responsive grid mapping HealthMetric[] to ProductionHealthCard — no score computation, no issue list. ProductionHealthCard.tsx (32 lines) is a single metric card built directly on StatCard, with an optional trend icon — no percentage ring, no health-score widget. productionHealth.tsx is pure fixture data (7 HealthMetric objects, including a \"Health Score\" entry that's just the string \"96%\" in a list, not a rendered score component). None of the three render an issue list or recommendations — this package's HealthScore/HealthIssueList/HealthRecommendation are a genuinely different, more general abstraction layer.",
  "Publishing, Commerce, Intelligence, Operations, Diagnostics: none of these exist as standalone src/{name}/components directories — only src/production, src/platforms, src/capabilities, src/workflows do, and none of those three contain any file matching *health* or *status*. These domain names only appear as documentation-page/section concepts (e.g. PublishingAndCommerceSection.tsx, DiagnosticsSection.tsx) — no hand-rolled implementation exists under them.",
  "grep for healthScore|HealthScore|health.*percent|HealthIssue|health.*recommend across src/**/*.tsx: zero hits before this package. grep for SyncStatus|ProviderHealth|OperationalAlert: zero hits before this package.",
  "Capabilities' own ProviderCard.tsx (built on the illustration engine's FlowCard, for the Capability Library's diagram canvas) is a different family and presentation than this package's own ProviderHealthPanel (a real Operational Data Grid table) — not a duplicate, a diagram card versus a dashboard table.",
  "The component inventory tracked in inventory.ts already notes several of this package's gaps honestly: \"Health Summary\" (status: Exists, source: HealthDashboardDiagram.tsx — now sitting alongside this package's own HealthPanel/HealthScore as a more general layer), \"QA Finding Card\" (Needed — filled by HealthIssueList), \"Recommendation Card\" (Needed — filled by HealthRecommendation), \"Score Badge\" (Partial — filled by HealthScore), \"Sync Status\" (Partial, explicitly noting the illustration engine's HealthIndicator \"covers live/healthy/warning states, not a literal last-synced timestamp indicator\" — filled by SyncStatusPanel), \"Diagnostics Panel\" (Partial), \"Provider Card\" (Exists, source: capabilities/components/ProviderCard.tsx, a different family per above).",
  "The Status Workspace docs' own regions.ts explicitly points to Platform Operations' Health Summary and Sync Status as \"that family's workspace-level home\" for Operational Health — consistent with this package now being the real, general-purpose implementation those workspace docs were describing in the abstract.",
];
