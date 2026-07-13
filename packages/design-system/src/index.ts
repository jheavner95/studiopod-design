/**
 * @studiopod/design-system — root entry point.
 *
 * Shared presentation primitives only: no business logic, no API clients,
 * no repository/auth/routing state, no application orchestration.
 *
 * A handful of names collide across the source folders this barrel
 * combines. Six of those are intentional cross-family re-exports of the
 * exact same component (documented as "shared ownership" in their own
 * source comments) — only the canonical copy is re-exported here. One
 * (`PropertyEditor`) is a genuine second implementation specific to the
 * operational inspector family, so it is re-exported under a distinct
 * name (`InspectorPropertyEditor`) instead of being dropped.
 */

// Core UI primitives
export * from "@/components/ui";

// Layout primitives — GlobalNav and Footer are intentionally excluded:
// both are documentation-site app shell chrome (they import "@/components/docs"
// and "@/lib/design-system-navigation", which are internal doc-site tooling,
// not generic reusable layout). Imported from their individual source
// files rather than the "@/components/layout" barrel: the barrel's
// module also contains `export { GlobalNav } from "./GlobalNav"` and
// `export { Footer } from "./Footer"`, and since this repo has no
// "sideEffects": false in package.json, the bundler conservatively
// evaluates the whole barrel (including those two files and their
// doc-site imports) the moment anything is imported from it — even
// though nothing here re-exports them onward. Importing each file
// directly avoids ever loading GlobalNav.tsx/Footer.tsx at all.
export { Container, type ContainerSize } from "@/components/layout/Container";
export { PageShell } from "@/components/layout/PageShell";
export { SectionShell } from "@/components/layout/SectionShell";
export { ContentColumns } from "@/components/layout/ContentColumns";
export { CardGrid } from "@/components/layout/CardGrid";
export { Stack, type StackGap, type StackAlign, type StackJustify } from "@/components/layout/Stack";
export { Inline, type InlineGap, type InlineAlign, type InlineJustify } from "@/components/layout/Inline";
export { Grid, type GridStrategy, type GridGap } from "@/components/layout/Grid";
export { Cluster } from "@/components/layout/Cluster";
export { Surface, type SurfaceElevation, type SurfacePadding } from "@/components/layout/Surface";
export { Panel } from "@/components/layout/Panel";
export { ScrollArea, type ScrollDirection } from "@/components/layout/ScrollArea";
export { Separator, type SeparatorOrientation } from "@/components/layout/Separator";
export {
  DescriptionList,
  type DescriptionListItem,
  type DescriptionListLayout,
} from "@/components/layout/DescriptionList";

// Form primitives — FormField is dropped here: it's the exact same
// component already re-exported from "@/components/ui" above.
export {
  Form,
  FormSection,
  FormRow,
  FormActions,
  FieldLabel,
  FieldHelp,
  FieldError,
  type FieldMessageTone,
  RequiredIndicator,
  InputField,
  TextareaField,
  SelectField,
  ComboboxField,
  type ComboboxOption,
  CheckboxField,
  RadioGroupField,
  SwitchField,
  SliderField,
  DatePickerField,
  FileUploadField,
  PropertyEditor,
  type PropertyEditorField,
  ValidationSummary,
  type ValidationSummaryItem,
  UnsavedChangesBanner,
  FormDivider,
} from "@/components/form";

// Feedback primitives — Skeleton and ValidationSummary are dropped here:
// both are the exact same components already re-exported above (from
// "@/components/ui" and "@/components/form" respectively).
export {
  Alert,
  FEEDBACK_TONE_ICON,
  FEEDBACK_TONE_TEXT,
  FEEDBACK_TONE_BG,
  feedbackRole,
  type FeedbackTone,
  Banner,
  InlineMessage,
  ToastProvider,
  useToast,
  type ToastOptions,
  Notification,
  type NotificationProps,
  LiveRegionProvider,
  useAnnounce,
  EmptyState,
  type EmptyStateProps,
  type EmptyStateTone,
  LoadingState,
  ProgressBar,
  type ProgressTone,
  ProgressRing,
  StatusIndicator,
  type SystemStatus,
  SuccessState,
  WarningState,
  ErrorState,
  InfoState,
} from "@/components/feedback";

// Navigation primitives — SegmentedControl is dropped here: the exact
// same component already re-exported above (from "@/components/ui").
// Depends on `next` (next/link, next/navigation) at runtime.
export {
  NavigationItem,
  NavigationCollapsedContext,
  useNavigationCollapsed,
  type NavigationItemProps,
  NavigationGroup,
  NavigationDivider,
  type NavigationDividerOrientation,
  NavigationSection,
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  Breadcrumbs,
  type BreadcrumbItem,
  Pagination,
  type PaginationVariant,
  Stepper,
  type Step,
  type StepStatus,
  SideNavigation,
  TopNavigation,
  type TopNavigationItemDef,
  NavigationRail,
  type NavigationRailItemDef,
  TreeNavigation,
  type TreeNode,
  CommandNavigation,
  ContextNavigation,
  type ContextNavigationLink,
} from "@/components/navigation";

// Overlay primitives
export * from "@/components/overlay";

// Table primitives
export * from "@/components/table";

// Metadata primitives — DescriptionList/DescriptionListItem are dropped
// here: the exact same component already re-exported above (from
// "@/components/layout").
export {
  MetadataGroup,
  MetadataRow,
  type MetadataRowLayout,
  MetadataField,
  MetadataValue,
  MetadataLabel,
  IdentityBlock,
  PropertyGroup,
  PropertySection,
  RelationshipList,
  type RelationshipItem,
  StatusSummary,
  type StatusSummaryItem,
  HealthSummary,
  type HealthMetric,
  type HealthState,
  StatGroup,
  type StatGroupItem,
  TagCollection,
  EmptyMetadata,
  LoadingMetadata,
} from "@/components/metadata";

// Motion — React composition components (FadeIn/SlideUp/StaggerGroup/etc.)
export * from "@/components/motion";

// Motion — lower-level engine (tokens, transition/stagger/sequence
// builders, and the Fade/Slide/Scale/Expand/Collapse/Crossfade/Pulse/
// Highlight/Progress/ConnectorFlow/PublishFlow/QueueFlow primitives it's
// built from). A separate, required transitive dependency of several of
// the folders above (SelectableCard, ProgressBar, Toast, Popover,
// CommandPalette, Drawer, Menu, Tooltip, Dialog) — not part of the
// originally-scoped folder list, but unavoidable: 21 files across the
// approved scope import from it and the package cannot build without it.
// Its own Stagger/StaggerGroup/StaggerItem primitives collide with
// "@/components/motion"'s (a different, framer-motion-variant-based
// implementation) above — the composition-level one keeps the bare
// name since the marketing compositions already depend on that exact
// shape; the engine's versions are re-exported under an "Engine*" prefix.
export * from "@/motion";
export { StaggerGroup, StaggerItem } from "@/components/motion";
export {
  Stagger as EngineStagger,
  StaggerGroup as EngineStaggerGroup,
  StaggerItem as EngineStaggerItem,
} from "@/motion";

// Operational component family. Four names collide with folders already
// exported above, resolved as follows: StatusSummary is dropped (exact
// same component already re-exported from "@/components/metadata");
// PropertyGroup/PropertySection are dropped (both are this family's own
// re-exports of InspectorGroup/InspectorSection, which are already
// exported below under their real names — re-exporting them a second
// time under the "PropertyGroup"/"PropertySection" alias would just
// duplicate InspectorGroup/InspectorSection while also colliding with
// metadata's real, independent PropertyGroup/PropertySection above);
// PropertyEditor, FilterBar, and FilterChip are genuine second
// implementations specific to this family (an inspector field editor, a
// SearchField-based filter bar, and a real filter-chip component,
// distinct from the form system's PropertyEditor and the ui system's
// FilterBar/FilterChip type) and are re-exported under distinct names.
export {
  DataGrid,
  type DataGridProps,
  type DataGridColumn,
  type DataGridColumnAlign,
  type DataGridColumnPriority,
  DataGridToolbar,
  DataGridSearch,
  DataGridFilters,
  type DataGridFilterDef,
  DataGridBulkActions,
  useDataGridSelection,
  DataGridSelectionSummary,
  toggleSelection,
  selectAll,
  isAllSelected,
  isPartiallySelected,
  DataGridColumnPicker,
  type DataGridColumnPickerOption,
  DataGridEmptyState,
  type DataGridEmptyVariant,
  DataGridLoadingState,
  DataGridPagination,
  InspectorPanel,
  type InspectorPanelProps,
  InspectorHeader,
  InspectorSection,
  InspectorGroup,
  InspectorProperty,
  InspectorTabs,
  InspectorTabPanel,
  type InspectorTabDef,
  InspectorValidation,
  InspectorStatus,
  type InspectorStatusItem,
  InspectorHistory,
  type InspectorHistoryEntry,
  InspectorActions,
  InspectorFooter,
  PropertyPanel,
  type PropertyPanelProps,
  PropertyActions,
  PropertyRow,
  PropertyLabel,
  PropertyValue,
  PropertyReset,
  PropertyToggle,
  PropertySelect,
  PropertyNumber,
  PropertyColor,
  PropertyEditor as InspectorPropertyEditor,
  type PropertyEditorField as InspectorPropertyEditorField,
  AssetBrowser,
  type AssetBrowserPagination,
  AssetBrowserToolbar,
  AssetGrid,
  type AssetGridRenderer,
  type AssetGridProps,
  AssetList,
  type AssetListProps,
  AssetCard,
  AssetThumbnail,
  AssetMetadata,
  useAssetSelection,
  AssetSelectionSummary,
  AssetFilters,
  type AssetFilterDef,
  AssetSearch,
  AssetViewToggle,
  type AssetViewMode,
  AssetEmptyState,
  type AssetEmptyVariant,
  AssetLoadingState,
  AssetPagination,
  SearchField,
  SearchScope,
  type SearchScopeOption,
  SearchSuggestions,
  type SearchSuggestion,
  SearchHistory,
  type SearchHistoryEntry,
  FilterBar as OperationalFilterBar,
  FilterGroup,
  type FilterGroupOption,
  FilterChip as OperationalFilterChip,
  FilterPopover,
  FilterSummary,
  SavedFilter,
  type SavedFilterEntry,
  SortControl,
  type SortOption,
  ResultSummary,
  ActiveFilterList,
  type ActiveFilterEntry,
  ClearFilters,
  BulkActionBar,
  BulkActionGroup,
  BulkActionButton,
  BulkSelectionSummary,
  BulkSelectionCounter,
  BulkActionMenu,
  type BulkActionMenuItem,
  BulkActionConfirmation,
  BulkProgress,
  BulkStatus,
  type BulkStatusValue,
  BulkResults,
  BulkUndo,
  BulkConflictList,
  type BulkConflictEntry,
  StatusPanel,
  type StatusPanelProps,
  HealthPanel,
  HealthScore,
  HealthIndicator,
  type HealthStatusValue,
  StatusMetric,
  StatusTimeline,
  type StatusTimelineEntry,
  HealthIssueList,
  type HealthIssueEntry,
  type HealthIssueSeverity,
  HealthRecommendation,
  SyncStatusPanel,
  type SyncSource,
  ProviderHealthPanel,
  type ProviderHealthRow,
  OperationalAlertPanel,
  type OperationalAlertEntry,
  Queue,
  QueueHeader,
  QueueFilters,
  type QueueFilterValue,
  QueueRow,
  type QueueRowJob,
  QueueStatus,
  type QueueStatusValue,
  QueuePriority,
  type QueuePriorityValue,
  JobCard,
  JobProgress,
  JobTimeline,
  type JobTimelineEntry,
  JobActions,
  JobError,
  JobRetry,
  JobResults,
  QueueEmptyState,
  type QueueEmptyVariant,
  DashboardGrid,
  DashboardSection,
  MetricCard,
  renderMetricTrend,
  type MetricTrendDirection,
  KPIWidget,
  type KPIWidgetItem,
  TrendWidget,
  ChartWidget,
  type ChartWidgetDatum,
  StatusWidget,
  type StatusWidgetItem,
  ActivityWidget,
  QueueWidget,
  HealthWidget,
  RecommendationWidget,
  type RecommendationEntry,
  DashboardEmptyState,
} from "@/components/operational";

// Workflow component family — no collisions with anything above (its own
// selection-helper functions are already aliased internally, e.g.
// `toggleWorkflowSelection`, to avoid clashing with operational's
// DataGrid selection helpers of the same bare names).
export * from "@/components/workflow";

// Hooks
export * from "@/hooks";

// Providers
export * from "@/providers";

// Shared utility
export { cn } from "@/lib/utils";
