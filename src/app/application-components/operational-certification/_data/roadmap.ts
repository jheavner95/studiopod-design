export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "next" | "future";
}

export const OPERATIONAL_ROADMAP: RoadmapStage[] = [
  {
    id: "workspace-architecture",
    title: "Workspace Architecture",
    description: "The six-tier workspace blueprint every following stage assumes already exists, certified at its own capstone.",
    status: "complete",
  },
  {
    id: "foundation-layer",
    title: "Foundation Layer",
    description: "Layout, Table, Metadata, Forms, Overlay, Navigation, and Feedback — each certified before any operational system was allowed to compose from it.",
    status: "complete",
  },
  {
    id: "operational-component-library",
    title: "Operational Component Library",
    description: "Nine composed, ready-to-use systems (113 components total) built entirely on the certified Foundation Layer, certified at Production Ready by this page.",
    status: "complete",
  },
  {
    id: "workflow-pattern-library",
    title: "Workflow Pattern Library",
    description: "Multi-step processes that span several operational systems at once — for example, a publish flow moving from Asset Browser through Queue & Job to Status & Health.",
    status: "next",
  },
  {
    id: "platform-templates",
    title: "Platform Templates",
    description: "Full platform screens assembled from the Operational Component Library and Workflow Pattern Library — the tier this certification's own \"Adoption readiness\" gap is waiting on.",
    status: "future",
  },
  {
    id: "enterprise-design-language",
    title: "Enterprise Design Language",
    description: "The point at which every certified platform, template, and pattern reads as one coherent product to an enterprise customer.",
    status: "future",
  },
];
