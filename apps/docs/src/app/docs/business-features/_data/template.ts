export interface TemplatePart {
  name: string;
  description: string;
  composesFrom: string;
}

/**
 * The thirteen-part standard template this package's own work order names.
 * Where Feature Architecture (structure.ts) is the abstract ownership tree
 * every feature shares, this is the concrete checklist a real feature is
 * built against — distinct parts like Header, Navigation, Metrics, and
 * Actions that Feature Architecture's own Workspace/Views/Panels grouping
 * doesn't break out individually. `composesFrom` names a representative
 * already-certified component for a Commerce-domain instance, grounding
 * each part in something real rather than a bare description.
 */
export const FEATURE_TEMPLATE: TemplatePart[] = [
  {
    name: "Workspace",
    description: "The feature's outer shell — the full working environment this template's other twelve parts live inside.",
    composesFrom: "CommerceWorkspace (Commerce Platform), composing Workspace Architecture's own blueprint.",
  },
  {
    name: "Header",
    description: "Feature-level identity, context, and primary actions, scoped to this one feature rather than the whole application.",
    composesFrom: "CommerceHeader, composing Workspace Architecture's own Workspace Header framework.",
  },
  {
    name: "Navigation",
    description: "In-feature navigation between this feature's own Views — tabs, a side nav, or a segmented control, depending on how many Views the feature has.",
    composesFrom: "Foundation Navigation's own Tabs, SideNavigation, or SegmentedControl.",
  },
  {
    name: "Primary View",
    description: "The main content surface — a list, a detail screen, a canvas — the one View a user spends the most time in.",
    composesFrom: "CommerceOrders or CommerceCatalog (Data Grid underneath), depending on the feature's own Category.",
  },
  {
    name: "Inspector",
    description: "The secondary detail/edit surface opened from the Primary View — most commonly a drill-down into one selected record.",
    composesFrom: "CommerceInspector, itself composing Operational's own Inspector Panel.",
  },
  {
    name: "Dialogs",
    description: "Modal, task-focused interactions layered over the Workspace — confirmations, create-new forms, bulk-action review.",
    composesFrom: "Foundation's own Dialog and Drawer overlays, never reimplemented locally.",
  },
  {
    name: "Commands",
    description: "Single-object, user-triggerable actions — approve, publish, archive, retry — wired to Services and surfaced near the object they act on.",
    composesFrom: "A Platform component's own Actions region, or a CommandPalette entry for keyboard-driven access.",
  },
  {
    name: "Validation",
    description: "Surfaced feedback when a Command or Dialog submission fails a field-level or business-rule check.",
    composesFrom: "Foundation Feedback's own Alert and InlineMessage components.",
  },
  {
    name: "Metrics",
    description: "Feature-level KPIs and health indicators, typically shown in the Header or a dedicated summary region.",
    composesFrom: "CommerceMetrics, or Operational's own Dashboard Widgets directly where no Platform-tier Metrics component exists yet.",
  },
  {
    name: "Actions",
    description: "Bulk or cross-object operations, distinct from Commands' single-object scope — approve twelve orders at once, not one.",
    composesFrom: "Operational's own Bulk Actions system, or a Platform component's own Actions wrapper around it.",
  },
  {
    name: "State",
    description: "This instance's own local state — current selection, active View, open Dialog, form drafts in progress.",
    composesFrom: "Owned entirely by the feature; no certified tier below Business Features holds UI state on a feature's behalf.",
  },
  {
    name: "Repositories",
    description: "The data-access layer this feature's Services call into — however this feature talks to its own backend.",
    composesFrom: "Owned entirely by the feature; see Feature Architecture and Application Composition Architecture's own Application Boundaries.",
  },
  {
    name: "API",
    description: "The actual endpoints called and how requests/responses are shaped — the concrete implementation behind Repositories.",
    composesFrom: "Owned entirely by the feature; see Feature Architecture and Application Composition Architecture's own Application Boundaries.",
  },
];
