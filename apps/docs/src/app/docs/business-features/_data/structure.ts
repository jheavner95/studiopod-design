export type StructureKind = "root" | "ui" | "service" | "data";

export interface StructurePart {
  name: string;
  kind: StructureKind;
  owner: string;
  description: string;
}

/**
 * The ten-part canonical tree this package's own work order draws literally
 * (Business Feature / Workspace, Views, Commands, Dialogs, Panels, Services,
 * Repositories, State, Validation, API). Ownership for each part is pulled
 * directly from DS-5.1's own Application Boundaries answers, not re-derived —
 * this section is that ownership model given a concrete tree shape, the same
 * "what does this own, what does it compose" pattern DS-5.1's own Feature
 * Anatomy and DS-4.1's own Platform Anatomy both used one and two tiers down.
 */
export const FEATURE_STRUCTURE: StructurePart[] = [
  {
    name: "Business Feature",
    kind: "root",
    owner: "—",
    description: "The whole — one user-facing, domain-specific capability (Application Composition Architecture's own Business Feature Model). Every part below is internal to it.",
  },
  {
    name: "Workspace",
    kind: "ui",
    owner: "Business Feature (composition)",
    description: "The feature's own outer shell — composes Workspace Architecture's own six-region blueprint scoped to this one feature, the same way a Platform's own Platform Shell does one layer down.",
  },
  {
    name: "Views",
    kind: "ui",
    owner: "Business Feature (composition)",
    description: "The feature's own distinct screens or modes within its Workspace — a list view, a detail view, a kanban view — each composing a Platform component (a Data Grid, a Catalog) rather than building its own layout primitives.",
  },
  {
    name: "Commands",
    kind: "ui",
    owner: "Business Feature (composition)",
    description: "The feature's own set of user-triggerable actions — approve, publish, archive, retry — each wired to a Business service and surfaced through a Platform component's own Actions region or a CommandPalette entry.",
  },
  {
    name: "Dialogs",
    kind: "ui",
    owner: "Business Feature (composition)",
    description: "Modal, task-focused interactions — a confirmation, a create-new form, a bulk-action review. Composed from Foundation's own Dialog/Drawer overlays, never reimplemented locally.",
  },
  {
    name: "Panels",
    kind: "ui",
    owner: "Business Feature (composition)",
    description: "Secondary, persistent regions within a View — an inspector panel, a filter panel, a property panel. Composed from a Platform-tier Inspector re-export, or directly from Operational's Inspector Panel / Property Panel where no Platform-tier equivalent exists yet.",
  },
  {
    name: "Services",
    kind: "service",
    owner: "Business Feature",
    description: "The non-visual core: orchestration across Repositories, API, and Validation below, plus permission checks. This is where a Business Feature's own code actually lives — Workspace through Panels above should be composition, not implementation.",
  },
  {
    name: "Repositories",
    kind: "data",
    owner: "Business Feature",
    description: "Data-access abstractions, however a feature chooses to talk to its own backend — see Application Composition Architecture's own Application Boundaries. No certified tier below Business Feature has ever contained a repository or a fetch call.",
  },
  {
    name: "State",
    kind: "data",
    owner: "Business Feature (local), Application (shared)",
    description: "Local state (selection, form drafts, view mode) is owned by the feature. State shared across more than one feature — current user, feature flags — is owned by the Application shell instead, per Application Composition Architecture's own Boundaries answer.",
  },
  {
    name: "Validation",
    kind: "data",
    owner: "Foundation (field-level), Business Feature (business-rule-level)",
    description: "Generic field validation is owned by Foundation's own Form System. Whether a value is valid for this domain's own business rules is owned by the Business Feature, per Application Composition Architecture's own Boundaries answer.",
  },
  {
    name: "API",
    kind: "data",
    owner: "Business Feature",
    description: "Which endpoints a feature calls and how it shapes requests/responses, per Application Composition Architecture's own Boundaries answer — the same feature-owned boundary as Repositories.",
  },
];
