export interface WorkflowVizFutureExtension {
  title: string;
  description: string;
}

export const WORKFLOW_VIZ_FUTURE_EXTENSIONS: WorkflowVizFutureExtension[] = [
  { title: "Pan & zoom", description: "Real coordinate-based camera movement over WorkflowViewport's content — today's viewport is a plain both-axis ScrollArea with no transform/offset state. Zoom controls are present but not yet wired to a live viewport transform." },
  { title: "Auto-layout", description: "Automatically computing node positions from the graph's own edge structure rather than a caller-authored DOM order — the illustration engine's own IllustrationCanvas already does this for canvas-positioned diagrams; this family would need a comparable algorithm adapted to DOM flow." },
  { title: "Snap-to-grid", description: "Constraining node placement to a regular grid during a future drag-to-reposition interaction is not supported — meaningless without a coordinate system." },
  { title: "Live collaboration", description: "Multiple users viewing or editing the same workflow visualization simultaneously, with real-time cursor/selection presence — a genuinely different capability layer (websockets, presence state) from this package's own single-user rendering." },
  { title: "Realtime updates", description: "Node status changing live as the underlying workflow actually executes, rather than the static props this package renders today, is not supported." },
  { title: "Simulation mode", description: "Previewing how a workflow would execute before running it for real is not supported." },
  { title: "AI layout optimization", description: "Automatically rearranging a large, tangled workflow for readability is not supported." },
];
