export interface WorkPackageSummary {
  code: string;
  title: string;
  href: string;
  oneLiner: string;
}

export const DS25_WORK_PACKAGES: WorkPackageSummary[] = [
  { code: "01", title: "Data Grid", href: "/application-components/data-grid", oneLiner: "The base sortable, selectable, paginated table every other system builds on." },
  { code: "02", title: "Inspector Panel", href: "/application-components/inspector-panel", oneLiner: "The shared detail-panel shell that Property Panel and Status & Health both re-export directly." },
  { code: "03", title: "Property Panel", href: "/application-components/property-panel", oneLiner: "Editable field rows for object inspection, composed on Inspector Panel rather than a second panel shell." },
  { code: "04", title: "Asset Browser", href: "/application-components/asset-browser", oneLiner: "Grid/list library browsing, with its List View composing Data Grid directly." },
  { code: "05", title: "Filter & Search", href: "/application-components/filter-search", oneLiner: "The discovery toolbar every browsing surface needs — and the package that deduplicated pagination-summary math out of Data Grid and Asset Browser." },
  { code: "06", title: "Bulk Actions", href: "/application-components/bulk-actions", oneLiner: "Selection-driven action bars, confirmation, progress, and results — reused directly by Queue & Job." },
  { code: "07", title: "Status & Health", href: "/application-components/status-health", oneLiner: "Score, issue, and recommendation components, composed by both Queue & Job and Dashboard Widgets." },
  { code: "08", title: "Queue & Job", href: "/application-components/queue-jobs", oneLiner: "The standard execution-queue interface, composing Bulk Actions and Status & Health directly." },
  { code: "09", title: "Dashboard Widgets", href: "/application-components/dashboard-widgets", oneLiner: "The dashboard framework tying nearly every prior system together into metric, trend, chart, status, and queue tiles." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS = [
  "Zero Foundation-layer duplication found anywhere across 113 components in nine systems — every one composes Forms/Tables/Metadata/Navigation/Feedback/Overlay/Layout rather than reimplementing it.",
  "Zero reverse-dependency violations in either direction — Operational never reaches up into the app/diagram-library tiers, and Foundation never reaches down into Operational.",
  "A real, working shared-ownership re-export precedent used six times across the library, each one catching a name/scope collision before it shipped as silent duplication.",
  "Every gallery demo across all nine systems runs on real local state, not static screenshots — this was spot-checked live in the browser at the end of each package, not just asserted in docs.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES = [
  "No system implements a first-party aria-live announcement pattern — a real, systemic accessibility gap found independently by all nine certification audits.",
  "Two real (but legitimately-scoped) naming collisions with the Foundation layer — FilterBar/FilterChip and PropertyEditor/PropertyGroup/PropertySection — add a discoverability cost for future contributors.",
  "Zero real-screen adoption anywhere in the codebase — every one of the 113 components has only ever been exercised inside its own documentation gallery.",
];

export const DS25_COMPLETION_SUMMARY =
  "This effort set out to prove that a real, usable operational component library could be built entirely on top of a certified Foundation Layer without duplicating any of it — and, on the evidence gathered across nine independent audits, it did. 113 components across nine systems, zero Foundation-layer duplication, zero reverse-dependency violations, and a real deduplication (ResultSummary) and a real Foundation API extension (SegmentedControl's per-option aria-label) along the way. What it could not yet prove is that any of this holds up under real adoption, because nothing has adopted it yet — that's future roadmap work, not a gap in what this library itself was scoped to deliver.";
