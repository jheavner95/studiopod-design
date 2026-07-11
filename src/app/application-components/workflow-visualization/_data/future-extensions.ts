export interface WorkflowVizFutureExtension {
  title: string;
  description: string;
}

export const WORKFLOW_VIZ_FUTURE_EXTENSIONS: WorkflowVizFutureExtension[] = [
  { title: "Pan & zoom", description: "Real coordinate-based camera movement over WorkflowViewport's content — today's viewport is a plain both-axis ScrollArea with no transform/offset state; WorkflowControls' zoom buttons stay inert placeholders until this lands." },
  { title: "Auto-layout", description: "Automatically computing node positions from the graph's own edge structure rather than a caller-authored DOM order — the illustration engine's own IllustrationCanvas already does this for canvas-positioned diagrams; this family would need a comparable algorithm adapted to DOM flow, the same deferral Dependency & Relationship Views' own future-extensions already took." },
  { title: "Snap-to-grid", description: "Constraining node placement to a regular grid during a future drag-to-reposition interaction — meaningless without a coordinate system, so deferred alongside Pan & zoom and Auto-layout." },
  { title: "Live collaboration", description: "Multiple users viewing or editing the same workflow visualization simultaneously, with real-time cursor/selection presence — a genuinely different capability layer (websockets, presence state) from this package's own single-user rendering." },
  { title: "Realtime updates", description: "Node status changing live as the underlying workflow actually executes, rather than the static props this package renders today — deferred pending a real data-streaming integration, the same stance State Machine's own future-extensions already took on live state transitions." },
  { title: "Simulation mode", description: "Previewing how a workflow would execute before running it for real — deferred pending real usage, the same stance Pipeline Components' own future-extensions already took." },
  { title: "AI layout optimization", description: "Automatically rearranging a large, tangled workflow for readability — deferred pending real usage, the same stance every prior Workflow Component Library package's own future-extensions already took on AI assistance." },
];
