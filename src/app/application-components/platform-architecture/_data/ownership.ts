export interface OwnershipEntry {
  layer: string;
  owns: string;
  doesNotOwn: string;
}

/**
 * Five layers, each answering the same two questions: what does this layer
 * own, and — just as important, since every prior naming-collision finding
 * in this session traced back to an unclear ownership line — what does it
 * explicitly NOT own, so a future contributor knows which layer to reach
 * for instead.
 */
export const OWNERSHIP_MODEL: OwnershipEntry[] = [
  {
    layer: "Foundation",
    owns: "Generic UI with zero business or workflow awareness — a Button doesn't know if it's approving an order or saving a draft.",
    doesNotOwn: "Anything composed from more than one Foundation family, and anything with a status/lifecycle vocabulary of its own — that starts at Operational.",
  },
  {
    layer: "Operational",
    owns: "Operational UX — composed, ready-to-use panels and screens (grids, inspectors, bulk actions, status/health) built entirely on Foundation.",
    doesNotOwn: "Multi-step process modeling (that's Workflow) and business-domain vocabulary (that's Platform) — an Operational Data Grid renders rows, it doesn't know what an Order is.",
  },
  {
    layer: "Workflow",
    owns: "Business workflow primitives — state machines, pipelines, approval flows, dependency graphs — domain-agnostic by design.",
    doesNotOwn: "Any real business vocabulary. StateNode's own StateValue is a generic lifecycle enum (Initial/Active/Blocked/...), never an order-specific or content-specific status — that attachment point is Platform.",
  },
  {
    layer: "Platform",
    owns: "Domain-specific reusable components, scoped to one business platform, composed from Foundation/Operational/Workflow — the first layer where business vocabulary attaches to real UI.",
    doesNotOwn: "Page routing, data fetching, authentication, or one-off feature UI — those are Business Features. Platform also does not own components shared sideways across platforms; that belongs one layer down.",
  },
  {
    layer: "Business Features",
    owns: "Feature implementations — real screens, business logic, data fetching, and side effects. A genuinely new term this package introduces (see below); this is the tier a real product screen actually lives in.",
    doesNotOwn: "Reusable UI of any kind — if a Business Feature finds itself building something a second screen could also use, that's a signal the component belongs one layer down, in Platform.",
  },
];

export const BUSINESS_FEATURES_NOTE =
  "\"Business Features\" does not appear anywhere else in this codebase — confirmed by direct search across every prior DS-0 through DS-3 package's own data files. Every other term this session has introduced (Workflow Component Library, Platform Components, even \"Platform Templates\" from DS-0.3's own component-family list) had some prior mention to reconcile against; this one is a blank slate, and this package is the first to define it. It names the tier where a real StudioPOD screen — with actual data fetching, actual business rules, actual users — would live, sitting above everything this design system itself builds.";
