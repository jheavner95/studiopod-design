export interface PromotionEntry {
  title: string;
  system: string;
  detail: string;
}

/**
 * Every real duplication finding across all nine systems' own DS-2.5.x
 * promotion-candidates audits, reclassified into three buckets. No
 * speculative findings — every entry below traces to a specific, already-
 * published promotion-candidates.ts file from the system named.
 */
export const RESOLVED: PromotionEntry[] = [
  {
    title: "Pagination summary math duplicated across two components",
    system: "Filter & Search (DS-2.5.5)",
    detail: "DataGridPagination and AssetPagination each inlined an identical \"X–Y of Z\" calculation. Extracted into a new ResultSummary component and retrofitted both call sites to import it instead — a real duplication removed, not just avoided.",
  },
  {
    title: "Six shared-ownership re-exports, each catching a real name/scope collision before it shipped as a duplicate",
    system: "Property Panel, Status & Health, Queue & Job",
    detail: "StatusSummary/StatusMetric/StatusTimeline (re-exports of Foundation Metadata's StatusSummary, Foundation UI's StatCard, and Inspector Panel's InspectorHistory), PropertyPanel/Section/Group/Actions (re-exports of Inspector Panel's own equivalents), QueueEmptyState (re-export of DataGridEmptyState), and JobProgress/JobTimeline (re-exports of BulkProgress/StatusTimeline) — in every case, a system that could have rebuilt a near-identical component instead re-exported the existing one under a family-appropriate name.",
  },
  {
    title: "SegmentedControl extended, not forked",
    system: "Asset Browser (DS-2.5.4)",
    detail: "AssetViewToggle needed an icon-only accessible name that SegmentedControl's API didn't yet support. Rather than forking a second segmented-control implementation, the Foundation primitive itself gained an optional per-option aria-label field — verified present and correctly used by this certification's own Asset Browser audit.",
  },
];

export const DEFERRED: PromotionEntry[] = [
  {
    title: "Expandable object detail panel, duplicated three times outside this library",
    system: "Inspector Panel (DS-2.5.2)",
    detail: "src/platforms/components/PlatformDetailsPanel.tsx, src/capabilities/components/CapabilityDetails.tsx, and src/workflows/components/WorkflowStepDetails.tsx each hand-roll an near-identical shell (a bordered card, a status row, and one or more labeled lists) that InspectorSection + InspectorGroup + InspectorProperty already solves. Real, grep-verified duplication — correctly not migrated by DS-2.5.2, which only builds new components and doesn't touch src/platforms, src/capabilities, or src/workflows. A genuine candidate for a future Foundation Adoption Pilot.",
  },
];

export const REJECTED: PromotionEntry[] = [
  {
    title: "Production's HealthDashboardDiagram / ProductionHealthCard",
    system: "Status & Health (DS-2.5.7), Dashboard Widgets (DS-2.5.9)",
    detail: "Investigated independently by two different packages built two months apart in this same effort. Both times, the real code was read in full and judged too narrow to migrate — a 19-line responsive grid mapping metrics to StatCard-based tiles, with no score computation, issue list, or recommendation layer. Both packages chose to build the more general abstraction alongside it rather than replace it, and documented that choice rather than silently duplicating.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Every one of DS-2.5.1 through DS-2.5.9 dispatched its own dedicated duplication audit before writing new code, and every one of those audits is still published at its own package's _data/promotion-candidates.ts. This section reclassifies their combined output — it does not re-run the searches, since the nine per-system DS-2.5.10 audits above already re-verified each system's own reuse claims independently.";
