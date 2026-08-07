import { defineShowcase, type ShowcaseMeta } from "@/lib/showcase-registry";

/**
 * DS-1E pilot: showcase metadata for the pattern-gallery workflow examples
 * (`exampleWorkflows` in ./index.ts) — the five WorkflowPattern demos shown
 * on /workflows below the three signature workflows. Additive only: does
 * not change `exampleWorkflows` or any consuming page, and does not extend
 * to `src/platforms/examples/`, `src/production/examples/`, or
 * `src/capabilities/examples/` — one family, demonstrating the pattern, per
 * DS-1E's "do not migrate the whole site."
 */
export const WORKFLOW_SHOWCASES: ShowcaseMeta[] = [
  defineShowcase({
    id: "artwork-production",
    title: "Artwork Production",
    category: "Production flow",
    tags: ["linear", "creative-brief", "validation"],
    difficulty: "beginner",
    relatedPages: ["workflows-library", "production-platform"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
  defineShowcase({
    id: "publishing",
    title: "Publishing Pipeline",
    category: "Publishing",
    tags: ["looping", "monitoring", "syndication"],
    difficulty: "intermediate",
    relatedPages: ["workflows-library", "publishing-platform"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
  defineShowcase({
    id: "commerce",
    title: "Commerce Fulfillment",
    category: "Commerce",
    tags: ["branching", "parallel-paths", "fulfillment"],
    difficulty: "intermediate",
    relatedPages: ["workflows-library", "commerce-platform"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
  defineShowcase({
    id: "quality-assurance",
    title: "Quality Assurance",
    category: "Production flow",
    tags: ["linear", "validation", "gates"],
    difficulty: "beginner",
    relatedPages: ["workflows-library", "production-platform"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
  defineShowcase({
    id: "multi-channel-publishing",
    title: "Multi-Channel Publishing",
    category: "Publishing",
    tags: ["branching", "parallel-paths", "syndication"],
    difficulty: "advanced",
    relatedPages: ["workflows-library", "publishing-platform"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
];
