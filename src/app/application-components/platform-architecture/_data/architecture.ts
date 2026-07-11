export interface ArchitectureTopic {
  label: string;
  text: string;
}

/**
 * The six-question framing every prior architecture capstone in this
 * session used (DS-1.9's own workspace blueprint, DS-3.9's own layering
 * review) — Purpose, Responsibilities, Composition rules, Ownership,
 * Extension points, Certification goals — applied here to the Platform
 * layer itself before any per-platform template is defined.
 */
export const PLATFORM_ARCHITECTURE_TOPICS: ArchitectureTopic[] = [
  {
    label: "Purpose",
    text: "Platform is the layer where StudioPOD's real business domains — Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, Integrations — get their own reusable, domain-specific components, composed entirely from the certified Foundation, Operational, and Workflow tiers below it. It exists because Workflow's own components (State Machine, Pipeline Components, Approval & Review, and the rest) are deliberately domain-agnostic — a WorkflowNode has no idea whether it represents a print job or a support ticket. Platform is where that domain vocabulary (Order, Artwork, Content Item, Provider Connection) finally attaches to real UI.",
  },
  {
    label: "Responsibilities",
    text: "Platform owns exactly one thing: domain-specific reusable components, scoped to one business platform, composed from Foundation/Operational/Workflow. It does not own page routing, data fetching, authentication, business logic, or one-off feature UI — those belong to Business Features, the layer above it. A Platform component like a Commerce OrderInspector renders order data and exposes the right composed primitives (WorkflowStatus for order state, InspectorPanel for the shell); it does not decide how orders are fetched or what happens when Approve is clicked — that decision lives in the Business Feature that composes the OrderInspector.",
  },
  {
    label: "Composition rules",
    text: "Every Platform component must compose from Foundation, Operational, and/or Workflow directly — the same \"compose, don't reimplement\" discipline that produced a zero-Foundation-violation, zero-Operational-violation result across all eight Workflow systems at Workflow Certification. A Platform component that reimplements a status marker, an inspector shell, or a data table instead of composing WorkflowNode/InspectorPanel/DataGrid is a Platform Rules violation before it ships (see Behavior, below).",
  },
  {
    label: "Ownership",
    text: "One platform, one owner. A Commerce component belongs to the Commerce platform's own component set — it is not shared sideways into Publishing just because both happen to render a list. If two platforms genuinely need the same domain-agnostic shape, that shape belongs one layer down, in Workflow or Operational, not duplicated across two Platform component sets or awkwardly shared between them.",
  },
  {
    label: "Extension points",
    text: "Business Features extend Platform components the same way Platform extends Workflow: through props and composition, never by forking or copying a Platform component's source into a feature-specific variant. Each of the eight platform templates below documents its own extension boundary — the explicit line between what Platform owns (the reusable shell/inspector/list) and what a real feature screen must supply itself (data fetching, business rules, side effects).",
  },
  {
    label: "Certification goals",
    text: "The same four-level ladder already established for Workspace Architecture and Workflow Certification (Prototype → Production Ready → Certified → Enterprise Certified) applies to Platform. At the time this page was first written, every one of the eight platforms audited had zero real components (see Migration Notes, below) — a structural fact, not a defect, since no platform can be more than a documented architecture until it's actually built. All eight platforms have since been built, and the Platform Component Library Certification — the capstone this page's own architecture set the bar for — independently certified all eight Platform Ready. This page itself certified the architecture in advance; that certification pass certifies what was built against it.",
  },
];
