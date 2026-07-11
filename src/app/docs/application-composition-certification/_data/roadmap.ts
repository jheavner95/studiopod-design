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
  { id: "workspace-architecture", title: "Workspace Architecture", description: "DS-1 — the six-tier blueprint every following stage assumes already exists, certified at its own capstone.", status: "complete" },
  { id: "foundation-layer", title: "Foundation Layer", description: "DS-2.1–2.4 — Layout, Table, Metadata, Forms, Overlay, Navigation, and Feedback, certified before any operational system was allowed to compose from it.", status: "complete" },
  { id: "operational-component-library", title: "Operational Component Library", description: "DS-2.5.1–2.5.9 — nine composed systems (113 components) built entirely on Foundation, certified Production Ready at DS-2.5.10.", status: "complete" },
  { id: "workflow-component-library", title: "Workflow Component Library", description: "DS-3.1–3.8 — eight systems (92 components) for multi-step processes and cross-cutting visualization, certified Production Ready at DS-3.9.", status: "complete" },
  { id: "platform-component-libraries", title: "Platform Component Libraries", description: "DS-4.1–4.9 — the architecture blueprint plus eight domain platforms (96 components), Certified at DS-4.10.", status: "complete" },
  { id: "application-composition", title: "Application Composition", description: "DS-5.1–5.4 — the composition architecture, the Business Feature framework, per-category templates, and the first real Business Feature pilot. Certified at this page, DS-5.5.", status: "complete" },
  { id: "enterprise-design-system-certification", title: "Enterprise Design System Certification", description: "DS-6 — the point at which every certified tier, from Foundation through Application Composition, is reviewed together as one coherent product rather than tier by tier.", status: "next" },
];
