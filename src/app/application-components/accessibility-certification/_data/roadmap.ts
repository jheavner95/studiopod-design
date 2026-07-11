export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "next" | "future";
}

export const ACCESSIBILITY_ROADMAP: RoadmapStage[] = [
  { id: "foundation-operational-audit", title: "Foundation & Operational accessibility audit", description: "This certification — ten real defects found and fixed, five real gaps found and deferred, across the two tiers every higher tier composes from.", status: "complete" },
  { id: "live-region-wiring", title: "Wire useAnnounce() into real-time Operational components", description: "Queue/Job status and Dashboard Widgets both still update visually with no announcement — the primitive exists, the wiring doesn't yet.", status: "next" },
  { id: "touch-target-sweep", title: "Touch-target remediation sweep", description: "Measure and fix the four icon-only affordances found under the WCAG 2.5.8 24×24 CSS px minimum, likely via one shared utility class rather than four one-off changes.", status: "next" },
  { id: "table-row-keyboard", title: "TableRow keyboard-activation gap", description: "Decide and implement a keyboard-equivalent convention for row activation and range-select, shared by Foundation's own docs demo and Operational's DataGrid/Queue consumers.", status: "next" },
  { id: "workflow-platform-audit", title: "Extend this same audit to Workflow and Platform tiers", description: "This certification's scope stopped at Foundation and Operational. Workflow and Platform are largely re-exports of these two tiers, but that composition claim has not itself been re-verified for accessibility the way Foundation/Operational composition was re-verified at each tier's own capstone.", status: "future" },
];
