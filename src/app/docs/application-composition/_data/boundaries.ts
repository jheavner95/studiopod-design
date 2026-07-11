export interface BoundaryEntry {
  concern: string;
  owner: string;
  description: string;
}

/**
 * The nine ownership questions this package's own work order names. Each
 * answer names the layer or tier that owns the concern, and is deliberately
 * concrete about what the design-system layers (Foundation through
 * Platform) explicitly do NOT own — routing, state, data, and persistence
 * are Business Feature/Application concerns none of the four certified
 * tiers touch today, confirmed by direct grep at every one of their own
 * certifications finding zero such logic anywhere in src/components/.
 */
export const APPLICATION_BOUNDARIES: BoundaryEntry[] = [
  {
    concern: "Routing",
    owner: "Application",
    description: "Which URL maps to which Business Feature, and how features link to one another, is owned entirely by the Application shell — no Platform or Workflow component has ever contained a route or a navigation side effect, confirmed at every certification through DS-4.10.",
  },
  {
    concern: "State",
    owner: "Business Feature (local), Application (global/shared)",
    description: "A Business Feature owns whatever local state its own screen needs (selection, form drafts, view mode). State shared across more than one feature — the current user, feature flags, cross-feature notifications — is owned by the Application shell, not duplicated into every feature that needs it.",
  },
  {
    concern: "Repositories",
    owner: "Business Feature",
    description: "Data-access abstractions (however a Business Feature chooses to talk to its own backend) are owned by the feature itself. No Platform component today contains a repository, a fetch call, or a persistence abstraction of any kind — Platform components render props, they don't fetch them.",
  },
  {
    concern: "API",
    owner: "Business Feature",
    description: "Which endpoints a feature calls, request/response shaping, and error handling for those calls are owned by the Business Feature — the same boundary as Repositories, since in practice a Business Feature's own data-interaction code covers both.",
  },
  {
    concern: "Domain logic",
    owner: "Business Feature",
    description: "Business rules specific to one domain — pricing calculations, eligibility checks, workflow-transition guards specific to this feature's own process — are owned by the Business Feature (see Business Feature Model's own \"owns business rules\" trait). Workflow's own State Machine models the generic shape of a process; the actual rules governing one domain's transitions live in the feature that composes it.",
  },
  {
    concern: "Presentation",
    owner: "Platform (reusable), Business Feature (feature-specific composition)",
    description: "Reusable presentation — how an inspector, a data grid, a status badge looks and behaves — is owned by Platform (or the tier below it a Platform component composes). How those pieces are arranged for one specific screen is owned by the Business Feature composing them.",
  },
  {
    concern: "Interaction",
    owner: "Platform (component-level), Business Feature (cross-component orchestration)",
    description: "A single component's own interaction behavior (a button's hover state, a table's own sort click) is owned wherever that component is defined. Orchestrating interaction across more than one component for one screen's own workflow is owned by the Business Feature (see Feature Anatomy's own \"owns orchestration\").",
  },
  {
    concern: "Validation",
    owner: "Foundation (field-level), Business Feature (business-rule-level)",
    description: "Generic field validation (required, format, min/max) is owned by Foundation's own Form System. Whether a specific value is actually valid for this domain's own business rules (can this order total exceed this customer's credit limit) is owned by the Business Feature.",
  },
  {
    concern: "Persistence",
    owner: "Business Feature / Application infrastructure",
    description: "How and where data is actually stored is entirely outside every certified design-system tier's own scope — no Foundation, Operational, Workflow, or Platform component has ever touched persistence, and none should. This is Application infrastructure the Business Feature's own repository layer talks to.",
  },
];
