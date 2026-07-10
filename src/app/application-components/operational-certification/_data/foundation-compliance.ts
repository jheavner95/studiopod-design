export interface ComplianceFinding {
  system: string;
  finding: string;
}

/**
 * One concrete composition citation per system, drawn directly from each
 * system's own DS-2.5.10 audit — every claim below traces to an import
 * line an auditor actually read, not a restatement of that system's docs.
 */
export const COMPLIANCE_FINDINGS: ComplianceFinding[] = [
  { system: "Data Grid", finding: "DataGrid.tsx composes Table/TableHeader/TableBody/TableRow/TableHead/TableCell/TableSelectionCell directly; DataGridSearch/Pagination/ColumnPicker wrap SearchInput/Pagination/Popover respectively." },
  { system: "Inspector Panel", finding: "InspectorPanel composes Surface/ScrollArea (Layout) and LoadingState/EmptyState (Feedback); InspectorHeader composes IdentityBlock (Metadata); InspectorTabs composes Tabs/TabsList/Tab/TabPanel (Navigation)." },
  { system: "Property Panel", finding: "PropertyPanel/Section/Group/Actions are literal re-exports of Inspector Panel's own InspectorPanel/Section/Group/Actions; PropertyToggle/Select/Number wrap SwitchField/SelectField/InputField (Forms) with no reimplemented markup." },
  { system: "Asset Browser", finding: "AssetList composes DataGrid directly for its List View; AssetBrowserToolbar/Search/Filters/Selection are literal re-exports of the equivalent DataGrid* components; AssetEmptyState/LoadingState use Feedback's EmptyState/Skeleton." },
  { system: "Filter & Search", finding: "SearchScope composes SegmentedControl (Navigation); FilterGroup composes Checkbox/Badge (UI) + FilterPopover; FilterPopover composes Popover (Overlay); SortControl composes Select (UI) + Table's own SortDirection type." },
  { system: "Bulk Actions", finding: "BulkActionBar composes Foundation Table's own TableToolbar bulk-mode chrome; BulkActionConfirmation composes Dialog (Overlay); BulkActionMenu composes Menu/MenuItem (Overlay); BulkProgress/Status/Results/Undo wrap ProgressBar/StatusIndicator/Alert/Notification (Feedback) directly." },
  { system: "Status & Health", finding: "HealthScore wraps ProgressRing (Feedback); HealthIndicator wraps StatusIndicator (Feedback); HealthRecommendation/OperationalAlertPanel wrap Alert (Feedback); ProviderHealthPanel composes DataGrid directly rather than a hand-rolled table." },
  { system: "Queue & Job", finding: "Queue composes Foundation Table primitives + Bulk Actions' own BulkActionBar; JobProgress/JobTimeline/QueueEmptyState are literal re-exports of BulkProgress/StatusTimeline/DataGridEmptyState; JobCard composes Status & Health's StatusPanel/InspectorHeader/InspectorSection." },
  { system: "Dashboard Widgets", finding: "DashboardGrid wraps Layout's own Grid (auto-fit mode); DashboardSection wraps Feedback's LoadingState; MetricCard wraps UI's StatCard; HealthWidget/StatusWidget/RecommendationWidget compose Status & Health's HealthScore/HealthIssueList/HealthIndicator/HealthRecommendation directly." },
];

/**
 * Genuinely new, non-Foundation code found during the audit — in every
 * case independently confirmed as justified (fills a real gap the
 * Foundation layer doesn't cover) rather than an unnecessary parallel
 * implementation.
 */
export const NEW_CODE_JUSTIFICATIONS: ComplianceFinding[] = [
  { system: "Property Panel", finding: "PropertyColor is genuinely new — no color field exists anywhere in Foundation Forms to reuse, confirmed absent by direct search." },
  { system: "Inspector Panel", finding: "InspectorHistory is genuinely new — the closest existing precedent (TimelineComposition) lives in the marketing-page compositions layer, which this package doesn't compose from." },
  { system: "Dashboard Widgets", finding: "TrendWidget's sparkline and ChartWidget's column bars are genuinely new — no charting or sparkline primitive exists anywhere in the codebase (confirmed by a repo-wide grep for chart/sparkline terms). Both are minimal (~10 lines each), scoped tightly to their own widget, and explicitly listed as deferred future work by Status & Health's own future-extensions data before this package built them." },
];

/** Zero violations were found in any of the nine systems. */
export const VIOLATIONS_FOUND = 0;
