export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "next" | "future";
}

/**
 * A fresh, up-to-date snapshot of the whole roadmap at the moment DS-5 is
 * certified — not a patch to any earlier capstone's own roadmap.ts, each
 * of which is a point-in-time record of what was known when it was
 * written, matching how platform-certification's own roadmap never
 * retroactively updated workflow-certification's.
 */
export const APPLICATION_COMPOSITION_ROADMAP: RoadmapStage[] = [
  { id: "workspace-architecture", title: "Workspace Architecture", description: "The six-tier blueprint every following stage assumes already exists, certified at its own capstone.", status: "complete" },
  { id: "foundation-layer", title: "Foundation Layer", description: "Layout, Table, Metadata, Forms, Overlay, Navigation, and Feedback, certified before any operational system was allowed to compose from it.", status: "complete" },
  { id: "operational-component-library", title: "Operational Component Library", description: "Nine composed systems (113 components) built entirely on Foundation, certified Production Ready at its own capstone.", status: "complete" },
  { id: "workflow-component-library", title: "Workflow Component Library", description: "Eight systems (92 components) for multi-step processes and cross-cutting visualization, certified Production Ready at its own capstone.", status: "complete" },
  { id: "platform-component-libraries", title: "Platform Component Libraries", description: "The architecture blueprint plus eight domain platforms (96 components), Certified at its own capstone.", status: "complete" },
  { id: "application-composition", title: "Application Composition", description: "The composition architecture, the Business Feature framework, per-category templates, and the first real Business Feature pilot. Certified at this page.", status: "complete" },
  { id: "enterprise-design-system-certification", title: "Enterprise Design System Certification", description: "The point at which every certified tier, from Foundation through Application Composition, is reviewed together as one coherent product rather than tier by tier.", status: "next" },
];
