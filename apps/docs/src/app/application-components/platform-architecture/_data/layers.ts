export interface LayerDefinition {
  id: string;
  name: string;
  status: "certified" | "certified-production-ready" | "defined" | "future";
  owns: string;
  composesFrom: string | null;
  certificationRef: { label: string; href: string } | null;
}

/**
 * Foundation → Operational → Workflow → Platform → Business Features, in
 * composition order. The first four rows are not proposals — they're the
 * actual certification status of already-shipped work (DS-1/DS-2/DS-3, all
 * independently certified at their own capstones, and DS-4, certified
 * Platform Ready at DS-4.10). Business Features has no certification page
 * at all — it's the tier real product screens live in, outside this design
 * system's own scope, and remains genuinely unbuilt.
 */
export const LAYER_STACK: LayerDefinition[] = [
  {
    id: "foundation",
    name: "Foundation",
    status: "certified",
    owns: "Generic UI — buttons, inputs, tables, overlays, navigation, feedback, layout primitives. No business or workflow awareness of any kind.",
    composesFrom: null,
    certificationRef: { label: "Foundation Tier", href: "/docs/foundation" },
  },
  {
    id: "operational",
    name: "Operational",
    status: "certified-production-ready",
    owns: "Operational UX — composed, ready-to-use screens and panels (Data Grid, Inspector Panel, Bulk Actions, Status & Health, and six more systems) built on Foundation, not new primitives themselves.",
    composesFrom: "Foundation",
    certificationRef: { label: "Operational Tier", href: "/docs/operational" },
  },
  {
    id: "workflow",
    name: "Workflow",
    status: "certified-production-ready",
    owns: "Business workflow primitives — multi-step processes and cross-cutting visualization (State Machine, Pipeline Components, Approval & Review, Dependency & Relationship Views, and four more systems) that are domain-agnostic by design: a WorkflowNode has no idea what business object it represents.",
    composesFrom: "Foundation, Operational",
    certificationRef: { label: "Workflow Tier", href: "/docs/workflow" },
  },
  {
    id: "platform",
    name: "Platform",
    status: "certified-production-ready",
    owns: "Domain-specific reusable components — the first layer where business vocabulary (Order, Artwork, Content Item) attaches to real UI, scoped to exactly one platform, composed entirely from Foundation/Operational/Workflow. All eight named platforms (96 components total) have been built.",
    composesFrom: "Foundation, Operational, Workflow",
    certificationRef: { label: "Platform Tier", href: "/docs/platform" },
  },
  {
    id: "business-features",
    name: "Business Features",
    status: "future",
    owns: "Feature implementations — real screens, routing, data fetching, and business logic that compose Platform, Workflow, Operational, and Foundation components into finished product experiences.",
    composesFrom: "Foundation, Operational, Workflow, Platform",
    certificationRef: null,
  },
];

export const LAYERING_STATEMENT =
  "This is a strictly one-directional composition chain — each layer composes only from the layers listed to its left, never from a layer to its right or from a sibling within the same layer. Foundation, Operational, and Workflow have each had this independently verified by direct grep against the codebase (zero reverse-dependency violations across all three). Platform inherits the same rule by definition: see Behavior for what \"allowed imports\" and \"forbidden imports\" mean concretely for a Platform component.";
