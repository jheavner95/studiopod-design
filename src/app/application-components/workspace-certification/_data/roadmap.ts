export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "future";
}

/** How DS-2 and beyond build directly on top of the workspace architecture this page certifies. */
export const ARCHITECTURE_ROADMAP: RoadmapStage[] = [
  {
    id: "workspace-architecture",
    title: "Workspace Architecture",
    description: "DS-1 — the six-tier blueprint, certified here, that every following stage assumes already exists.",
    status: "complete",
  },
  {
    id: "operational-component-library",
    title: "Operational Component Library",
    description: "The reusable components that fill each blueprint tier — tracked today in the Component Architecture and Coverage pages, now underway with the Foundation Component Catalog and its first nine shipped primitives in Foundation Layout.",
    status: "future",
  },
  {
    id: "workflow-pattern-library",
    title: "Workflow Pattern Library",
    description: "Multi-step processes that span several tiers at once — a publish flow moving from Asset Workspace through Primary Workspace to Status Workspace.",
    status: "future",
  },
  {
    id: "platform-templates",
    title: "Platform Templates",
    description: "Full platform layouts assembled from the Operational Component Library and Workflow Pattern Library — tracked today in the Platform Templates page.",
    status: "future",
  },
  {
    id: "enterprise-design-language",
    title: "Enterprise Design Language",
    description: "The point at which every certified platform, template, and pattern reads as one coherent product to an enterprise customer.",
    status: "future",
  },
];
