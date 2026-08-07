export interface WorkflowVizAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const WORKFLOW_VIZ_ANATOMY: WorkflowVizAnatomyRegion[] = [
  { name: "Canvas", description: "The panel shell everything else renders inside.", component: "WorkflowCanvas (Workflow Framework's own Workflow, re-exported)" },
  { name: "Viewport", description: "The scrollable sub-region inside the canvas that actually holds node/edge content.", component: "WorkflowViewport (Foundation Layout's own ScrollArea, both-axis)" },
  { name: "Nodes", description: "One node in the visualization — a status marker plus a label.", component: "WorkflowNode" },
  { name: "Edges", description: "The connection between two nodes, with a direction arrowhead.", component: "WorkflowEdge (Dependency & Relationship Views' own DependencyEdge, re-exported)" },
  { name: "Groups", description: "A cluster of nodes that share a common boundary.", component: "WorkflowGroup (Dependency & Relationship Views' own DependencyGroup, re-exported)" },
  { name: "Selection", description: "Multi-node selection and the bulk actions that follow from it.", component: "WorkflowSelection, useWorkflowSelection (Bulk Actions System's own BulkActionBar + Data Grid's own selection helpers, reused)" },
  { name: "Toolbar", description: "Canvas-level actions — Refresh, Export, Filter.", component: "WorkflowToolbar" },
  { name: "Inspector", description: "The detail view for a single selected node.", component: "WorkflowInspector (composes Operational Inspector Panel directly)" },
  { name: "Overview", description: "A titled stat summary, a compact visual node preview, and a marker legend.", component: "WorkflowOverview, WorkflowMiniMap, WorkflowLegend" },
  { name: "Controls", description: "Zoom-in / zoom-out / fit-to-view — inert until real pan & zoom lands.", component: "WorkflowControls" },
];
