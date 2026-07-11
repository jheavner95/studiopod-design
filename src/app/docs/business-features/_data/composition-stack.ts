export type StackStatus = "certified" | "certified-production-ready" | "documented" | "future";

export interface StackLayer {
  id: string;
  name: string;
  status: StackStatus;
  contributes: string;
  certificationRef: { label: string; href: string } | null;
}

/**
 * The same six-layer chain DS-5.1's own Composition Model established
 * (Foundation → Operational → Workflow → Platform → Business Features →
 * Application), reframed here around one question: what does each layer
 * hand a Business Feature specifically, rather than the general composition
 * relationship DS-5.1 already covers. "documented" is a status DS-5.1's own
 * LAYER_STACK didn't need — Business Features now has two architecture
 * packages behind it (DS-5.1, DS-5.2) despite zero implementation, a state
 * between "future" and "certified" worth naming honestly rather than
 * collapsing into either.
 */
export const COMPOSITION_STACK: StackLayer[] = [
  {
    id: "foundation",
    name: "Foundation",
    status: "certified",
    contributes: "Every primitive a feature might need with no higher-tier equivalent — buttons, form fields, dialogs, feedback — composed directly wherever Platform, Workflow, or Operational doesn't already wrap it.",
    certificationRef: { label: "Foundation Audit", href: "/application-components/foundation-audit" },
  },
  {
    id: "operational",
    name: "Operational",
    status: "certified-production-ready",
    contributes: "Generic composed UX a feature can use as-is — Data Grid, Filter & Search, Bulk Actions, Status & Health, Dashboard Widgets — the layer richest in ready-made screens a feature never has to build itself.",
    certificationRef: { label: "Operational Certification", href: "/application-components/operational-certification" },
  },
  {
    id: "workflow",
    name: "Workflow",
    status: "certified-production-ready",
    contributes: "Domain-agnostic process and visualization systems — State Machine, Approval & Review, Pipeline Components — for any lifecycle a feature's own object moves through.",
    certificationRef: { label: "Workflow Certification", href: "/application-components/workflow-certification" },
  },
  {
    id: "platform",
    name: "Platform",
    status: "certified",
    contributes: "A domain's own certified component library — CommerceCatalog, ProductionPipeline, AdminUsers — 96 components across eight platforms, ready to compose directly with zero new UI invented.",
    certificationRef: { label: "Platform Certification", href: "/application-components/platform-certification" },
  },
  {
    id: "business-features",
    name: "Business Features",
    status: "documented",
    contributes: "The layer this page defines — one user-facing, domain-specific capability that composes everything below it, owning its own business logic, state, and data access. See Feature Architecture, below, for the concrete part list.",
    certificationRef: { label: "Application Composition Architecture", href: "/docs/application-composition" },
  },
  {
    id: "application",
    name: "Application",
    status: "future",
    contributes: "Routing, cross-feature shared state, and installing Business Features into real screens — the only layer with zero design-system documentation today. Future Extensions, below, is the closest this page gets to describing it.",
    certificationRef: null,
  },
];
