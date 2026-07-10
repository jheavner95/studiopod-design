export type SystemReadiness = "Production Ready" | "Certified";

export interface OperationalSystem {
  code: string;
  name: string;
  href: string;
  componentCount: number;
  readiness: SystemReadiness;
  composesFrom: string[];
  keyGaps: string[];
}

/**
 * The nine systems built across DS-2.5.1–2.5.9, in build order. Component
 * counts, readiness labels, and gaps below are the direct output of nine
 * independent DS-2.5.10 audit passes (one per system, each re-reading every
 * component file rather than trusting that system's own docs page) — not
 * estimated or carried over from memory.
 */
export const OPERATIONAL_SYSTEMS: OperationalSystem[] = [
  {
    code: "DS-2.5.1",
    name: "Data Grid",
    href: "/application-components/data-grid",
    componentCount: 11,
    readiness: "Certified",
    composesFrom: ["Foundation Table", "Foundation Forms", "Foundation Navigation", "Foundation Overlay"],
    keyGaps: ["No live-region announcement when a filter narrows results to zero", "No explicit reduced-motion guard in this system's own files (inherited gap, not introduced here)"],
  },
  {
    code: "DS-2.5.2",
    name: "Inspector Panel",
    href: "/application-components/inspector-panel",
    componentCount: 11,
    readiness: "Production Ready",
    composesFrom: ["Foundation Layout", "Foundation Metadata", "Foundation Navigation", "Foundation Feedback"],
    keyGaps: ["No component in the family owns focus management — its documented Drawer/mobile composition is never demonstrated end-to-end", "InspectorStatus has no live region for a status change while the panel is open"],
  },
  {
    code: "DS-2.5.3",
    name: "Property Panel",
    href: "/application-components/property-panel",
    componentCount: 13,
    readiness: "Production Ready",
    composesFrom: ["Inspector Panel", "Foundation Metadata", "Foundation Forms"],
    keyGaps: ["No live announcement when a value resets or a row is marked modified", "PropertyEditor/PropertyGroup/PropertySection share names with distinct Foundation Forms/Metadata files — legitimately different scope, but only distinguishable by import path"],
  },
  {
    code: "DS-2.5.4",
    name: "Asset Browser",
    href: "/application-components/asset-browser",
    componentCount: 14,
    readiness: "Production Ready",
    composesFrom: ["Data Grid", "Foundation Feedback", "Foundation Navigation", "Foundation Forms"],
    keyGaps: ["No live-region announcement for selection-count or bulk-bar changes"],
  },
  {
    code: "DS-2.5.5",
    name: "Filter & Search",
    href: "/application-components/filter-search",
    componentCount: 14,
    readiness: "Certified",
    composesFrom: ["Foundation Forms", "Foundation Navigation", "Foundation Overlay", "Data Grid"],
    keyGaps: ["FilterBar/FilterChip share names with distinct src/components/ui/ exports — no compile-time collision yet, but a real ergonomic risk for a future caller needing both", "No live-region announcement when a result count changes"],
  },
  {
    code: "DS-2.5.6",
    name: "Bulk Actions",
    href: "/application-components/bulk-actions",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Foundation Overlay", "Foundation Feedback", "Foundation Table", "Data Grid"],
    keyGaps: ["Live-region announcements for selection/progress changes are opt-in at the call site, not built in", "Reduced-motion handling for the pulsing status dot is inherited from the Foundation illustration layer, not independently verified here"],
  },
  {
    code: "DS-2.5.7",
    name: "Status & Health",
    href: "/application-components/status-health",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Inspector Panel", "Data Grid", "Foundation Metadata", "Foundation Feedback"],
    keyGaps: ["The docs page's own gallery copy claimed Provider Health's demo table was sortable when no sort wiring exists — found during this audit and corrected", "No live-region announcement for a health-status change"],
  },
  {
    code: "DS-2.5.8",
    name: "Queue & Job",
    href: "/application-components/queue-jobs",
    componentCount: 14,
    readiness: "Certified",
    composesFrom: ["Foundation Table", "Bulk Actions", "Status & Health", "Data Grid"],
    keyGaps: ["No live-region announcement for a job status change", "No built-in pending indicator while a retry request is in flight"],
  },
  {
    code: "DS-2.5.9",
    name: "Dashboard Widgets",
    href: "/application-components/dashboard-widgets",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Foundation Layout", "Foundation Metadata", "Foundation Feedback", "Status & Health", "Queue & Job"],
    keyGaps: ["DashboardSection's loading state fully unmounts its children, dropping focus that was inside them on refresh"],
  },
];

export const TOTAL_COMPONENT_COUNT = OPERATIONAL_SYSTEMS.reduce((sum, system) => sum + system.componentCount, 0);
