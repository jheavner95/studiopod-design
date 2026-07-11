export interface DashboardPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains (Production,
 * Publishing, Commerce, Operations, Intelligence, Admin), plus a direct
 * search for MetricCard/KPIWidget/DashboardGrid/TrendWidget/ChartWidget/
 * WidgetGrid across the whole src/ tree. The only real overlap found —
 * Production's own HealthDashboardDiagram/ProductionHealthCard — was already
 * documented as a narrow, non-duplicative metric-grid by the Status & Health
 * package's own promotion-candidates audit; this package treats it the same
 * way rather than re-litigating it.
 */
export const DASHBOARD_PROMOTION_CANDIDATES: DashboardPromotionCandidate[] = [];

export const DASHBOARD_CLEAN_FINDINGS: string[] = [
  "Production: HealthDashboardDiagram.tsx (19 lines) is a bare responsive grid (grid-cols-2 sm:grid-cols-3 lg:grid-cols-4) mapping HealthMetric[] to ProductionHealthCard, itself a thin StatCard wrapper with an optional trend icon. It's a real, working metric-tile grid, but narrower than a general dashboard system — no widget registry, no chart types beyond a trend icon, no drag/resize, no cross-domain reuse. Two prior sections (Status & Health's and Foundation Metadata's own migration-notes reviews) already reached this same conclusion and treated their own additions as additive; this family does the same rather than re-deriving it.",
  "Publishing, Commerce: only diagram components exist (PublishingDiagram.tsx, CommerceDiagram.tsx) — IllustrationCanvas node/edge diagrams of a capability registry, not metric-tile or widget-grid UI. PublishingAndCommerceSection.tsx's own grid-cols-1 lg:grid-cols-2 is a page layout for two diagrams side by side, not a dashboard grid.",
  "Operations: no src/operations/ directory or Operations*.tsx file exists anywhere in the repo — re-confirmed, consistent with every prior section's own audit of this same domain.",
  "Intelligence: no src/intelligence/ directory exists. The only real code hit is src/platforms/examples/intelligencePlatform.tsx, a PlatformArchitecture data object (Observe → Analyze → Recommend → Automate) consumed by a flow/architecture diagram — not a dashboard or widget-grid UI.",
  "Admin: no src/admin/ directory or Admin*.tsx file exists anywhere. Every \"Admin\" hit is a text tag/label inside documentation _data/*.ts arrays (platform tags, two documentation-only example titles) — Admin does not exist as an implemented domain, dashboard or otherwise.",
  "Direct grep for MetricCard, KPIWidget, DashboardGrid, TrendWidget, ChartWidget, dashboard-widget, and WidgetGrid across src/: zero hits for every term, including in the Workflow/Platform diagram libraries — none of these 12 components were built under a different name before this family.",
  "catalog.ts has no dedicated Dashboard/Widget catalog entry — only two incidental text mentions inside unrelated components' reuseTargets/requiredVariants arrays. The existing component inventory (inventory.ts) does track this space, as \"Health Summary\" (status: Exists, source: HealthDashboardDiagram.tsx) — a domain-specific implementation this family's own HealthWidget sits alongside as a more general, dashboard-flavored layer, not a replacement.",
];
