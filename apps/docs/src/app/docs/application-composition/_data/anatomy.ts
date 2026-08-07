export interface AnatomyRegion {
  name: string;
  kind: "feature" | "internal" | "composition";
  description: string;
}

/**
 * The eleven-part internal shape this package's own work order names for
 * a single Business Feature — five internal UI regions (Workspace/Views/
 * Panels/Dialogs/Commands), one internal non-UI region (Business services),
 * and four composition points (Platform/Workflow/Operational/Foundation),
 * in the same "what does this own, what does it compose" shape DS-4.1's own
 * Platform Anatomy used one tier down.
 */
export const FEATURE_ANATOMY: AnatomyRegion[] = [
  {
    name: "Business Feature",
    kind: "feature",
    description: "The whole — one user-facing, domain-specific capability (see Business Feature Model). Everything below this row is internal to it.",
  },
  {
    name: "Workspace",
    kind: "internal",
    description: "The feature's own outer shell — composes Workspace Architecture's own six-tier blueprint (Global Navigation, Header, Toolbar, Asset/Primary/Inspector regions) scoped to this one feature, the same way a Platform's own Platform Shell does one layer down.",
  },
  {
    name: "Views",
    kind: "internal",
    description: "The feature's own distinct screens or modes within its Workspace — a list view, a detail view, a kanban view. Each View composes Platform components (a Data Grid, a Board) rather than building its own layout primitives.",
  },
  {
    name: "Panels",
    kind: "internal",
    description: "Secondary, persistent regions within a View — an inspector panel, a filter panel, a property panel. Composed from Platform's own Inspector components or directly from Operational's Inspector Panel / Property Panel where a Platform-tier equivalent doesn't yet exist.",
  },
  {
    name: "Dialogs",
    kind: "internal",
    description: "Modal, task-focused interactions — a confirmation, a create-new form, a bulk-action review. Composed from Foundation's own Dialog/Drawer overlays, never reimplemented locally.",
  },
  {
    name: "Commands",
    kind: "internal",
    description: "The feature's own set of user-triggerable actions — approve, publish, archive, retry — each wired to a Business Service (below) and typically surfaced through a Platform component's own Actions region (e.g. ProductionActions, CommerceActions) or a CommandPalette entry.",
  },
  {
    name: "Business services",
    kind: "internal",
    description: "The non-visual core: data fetching, validation rules, orchestration across multiple Platform components, permission checks. This is where a Business Feature's own code actually lives — everything above this row should be composition, not implementation.",
  },
  {
    name: "Platform composition",
    kind: "composition",
    description: "What the feature pulls from its own domain's Platform library — a Commerce feature composes Commerce Platform's own CommerceCatalog, CommerceOrders, CommerceInspector, and so on, never a sibling platform's components.",
  },
  {
    name: "Workflow composition",
    kind: "composition",
    description: "What the feature pulls directly from Workflow when a Platform-tier equivalent doesn't cover the need — e.g. composing State Machine directly for a process a Platform component didn't already wrap.",
  },
  {
    name: "Operational composition",
    kind: "composition",
    description: "What the feature pulls directly from Operational for generic composed UX a Platform component doesn't specialize — e.g. Filter & Search or Bulk Actions used as-is rather than through a Platform-tier wrapper.",
  },
  {
    name: "Foundation composition",
    kind: "composition",
    description: "What the feature pulls directly from Foundation for primitives with no Operational/Workflow/Platform equivalent needed — a Button, a Badge, a form field used exactly as Foundation ships it.",
  },
];
