export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "next" | "future";
}

export const PLATFORM_ROADMAP: RoadmapStage[] = [
  {
    id: "workspace-architecture",
    title: "Workspace Architecture",
    description: "DS-1 — the six-tier blueprint every following stage assumes already exists, certified at its own capstone.",
    status: "complete",
  },
  {
    id: "foundation-layer",
    title: "Foundation Layer",
    description: "DS-2.1–2.4 — Layout, Table, Metadata, Forms, Overlay, Navigation, and Feedback, each certified before any operational system was allowed to compose from it.",
    status: "complete",
  },
  {
    id: "operational-component-library",
    title: "Operational Component Library",
    description: "DS-2.5.1–2.5.9 — nine composed, ready-to-use systems (113 components) built entirely on the certified Foundation Layer, certified Production Ready at DS-2.5.10.",
    status: "complete",
  },
  {
    id: "workflow-component-library",
    title: "Workflow Component Library",
    description: "DS-3.1–3.8 — eight systems (92 components) representing multi-step processes and cross-cutting visualization, built entirely on the certified Foundation and Operational layers. Certified Production Ready at DS-3.9.",
    status: "complete",
  },
  {
    id: "platform-component-libraries",
    title: "Platform Component Libraries",
    description: "DS-4.1–4.9 — the architecture blueprint plus eight domain platforms (Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, Integrations — 96 components), each scoping business vocabulary onto the certified Operational and Workflow layers. Certified at this page, DS-4.10.",
    status: "complete",
  },
  {
    id: "application-composition",
    title: "Application Composition",
    description: "DS-5 — real Business Feature screens, the tier this certification's own Adoption readiness gap is waiting on: actual data fetching, actual business rules, actual users, composed from the eight certified Platform libraries.",
    status: "next",
  },
  {
    id: "enterprise-design-language",
    title: "Enterprise Design Language",
    description: "The point at which every certified platform, template, and pattern reads as one coherent product to an enterprise customer.",
    status: "future",
  },
];
