export interface LayerDefinition {
  id: string;
  name: string;
  status: "certified" | "certified-production-ready" | "future";
  owns: string;
  composesFrom: string | null;
  certificationRef: { label: string; href: string } | null;
}

/**
 * Foundation → Operational → Workflow → Platform → Business Features →
 * Application, in composition order — one layer longer than Platform
 * Architecture's own five-row stack, since this page also names the
 * Application itself as the terminal layer (the sum of shipped Business
 * Features, not a layer with components of its own). The first four rows
 * restate already-certified status; the last two are genuinely unbuilt.
 */
export const LAYER_STACK: LayerDefinition[] = [
  {
    id: "foundation",
    name: "Foundation",
    status: "certified",
    owns: "Generic UI — buttons, inputs, tables, overlays, navigation, feedback, layout primitives. No business or workflow awareness of any kind.",
    composesFrom: null,
    certificationRef: { label: "Foundation Layer Audit", href: "/application-components/foundation-audit" },
  },
  {
    id: "operational",
    name: "Operational",
    status: "certified-production-ready",
    owns: "Operational UX — composed, ready-to-use screens and panels (Data Grid, Inspector Panel, Bulk Actions, Status & Health, and six more systems) built on Foundation.",
    composesFrom: "Foundation",
    certificationRef: { label: "Operational Certification", href: "/application-components/operational-certification" },
  },
  {
    id: "workflow",
    name: "Workflow",
    status: "certified-production-ready",
    owns: "Domain-agnostic multi-step process primitives — State Machine, Pipeline Components, Approval & Review, Dependency & Relationship Views, and four more systems.",
    composesFrom: "Foundation, Operational",
    certificationRef: { label: "Workflow Certification", href: "/application-components/workflow-certification" },
  },
  {
    id: "platform",
    name: "Platform",
    status: "certified-production-ready",
    owns: "Domain-specific reusable components, scoped to one business platform — the first layer where business vocabulary (Order, Artwork, Content Item) attaches to real UI. All eight named platforms, 96 components, Certified at DS-4.10.",
    composesFrom: "Foundation, Operational, Workflow",
    certificationRef: { label: "Platform Component Library Certification", href: "/application-components/platform-certification" },
  },
  {
    id: "business-features",
    name: "Business Features",
    status: "future",
    owns: "Real screens, business rules, orchestration, and data interaction — the tier this page defines (see Business Feature Model). Composes Platform components rather than recreating reusable UI.",
    composesFrom: "Foundation, Operational, Workflow, Platform",
    certificationRef: null,
  },
  {
    id: "application",
    name: "StudioPOD Application",
    status: "future",
    owns: "Not a layer with components of its own — the sum of every shipped Business Feature, wired together by real routing, real authentication, and a real deployment. There is nothing to compose from here; this is the destination, not another tier to build against.",
    composesFrom: "Business Features",
    certificationRef: null,
  },
];

export const COMPOSITION_MODEL_STATEMENT =
  "This is a strictly one-directional composition chain — each layer composes only from the layers listed to its left, never from a layer to its right or from a sibling within the same layer. Foundation, Operational, Workflow, and Platform have each already had this independently verified by direct grep at their own certification (zero reverse-dependency violations in any direction across all 4 tiers, most recently reconfirmed for Platform at DS-4.10). Business Features and Application inherit the same rule by definition — see Composition Rules for what \"allowed\" and \"forbidden\" mean concretely at this boundary.";
