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
    system: "Filter & Search",
    detail: "DataGridPagination and AssetPagination each inlined an identical \"X–Y of Z\" calculation. Extracted into a new ResultSummary component and retrofitted both call sites to import it instead — a real duplication removed, not just avoided.",
  },
  {
    title: "Six shared-ownership re-exports, each catching a real name/scope collision before it shipped as a duplicate",
    system: "Property Panel, Status & Health, Queue & Job",
    detail: "StatusSummary/StatusMetric/StatusTimeline (re-exports of Foundation Metadata's StatusSummary, Foundation UI's StatCard, and Inspector Panel's InspectorHistory), PropertyPanel/Section/Group/Actions (re-exports of Inspector Panel's own equivalents), QueueEmptyState (re-export of DataGridEmptyState), and JobProgress/JobTimeline (re-exports of BulkProgress/StatusTimeline) — in every case, a system that could have rebuilt a near-identical component instead re-exported the existing one under a family-appropriate name.",
  },
  {
    title: "SegmentedControl extended, not forked",
    system: "Asset Browser",
    detail: "AssetViewToggle needed an icon-only accessible name that SegmentedControl's API didn't yet support. Rather than forking a second segmented-control implementation, the Foundation primitive itself gained an optional per-option aria-label field, now used by Asset Browser's own AssetViewToggle.",
  },
];

export const DEFERRED: PromotionEntry[] = [
  {
    title: "Expandable object detail panel, duplicated three times outside this library",
    system: "Inspector Panel",
    detail: "src/platforms/components/PlatformDetailsPanel.tsx, src/capabilities/components/CapabilityDetails.tsx, and src/workflows/components/WorkflowStepDetails.tsx each hand-roll a near-identical shell (a bordered card, a status row, and one or more labeled lists) that InspectorSection + InspectorGroup + InspectorProperty already solves. Inspector Panel itself only builds new components and doesn't touch src/platforms, src/capabilities, or src/workflows, so this duplication remains outside the library today.",
  },
];

export const REJECTED: PromotionEntry[] = [
  {
    title: "Production's HealthDashboardDiagram / ProductionHealthCard",
    system: "Status & Health, Dashboard Widgets",
    detail: "Investigated independently by two different systems. Both times, the real code was read in full and judged too narrow to migrate — a 19-line responsive grid mapping metrics to StatCard-based tiles, with no score computation, issue list, or recommendation layer. Both systems chose to build the more general abstraction alongside it rather than replace it, and documented that choice rather than silently duplicating.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Overlaps checked against the rest of the component library and how each was resolved — genuine duplication removed, real prior art preserved and disclosed, and no speculative findings.";
