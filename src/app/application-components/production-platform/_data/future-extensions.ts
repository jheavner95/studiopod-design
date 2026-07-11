export interface ProductionFutureExtension {
  title: string;
  description: string;
}

export const PRODUCTION_FUTURE_EXTENSIONS: ProductionFutureExtension[] = [
  { title: "Realtime production", description: "Live status updates as a real production job progresses through its pipeline — deferred pending a real data-streaming integration, the same stance State Machine's own future-extensions already took on live state transitions." },
  { title: "Multi-user production", description: "Multiple users viewing or acting on the same production run simultaneously, with real-time presence — a genuinely different capability layer (websockets, presence state) from this package's own single-user, prop-driven components." },
  { title: "Canvas collaboration", description: "Shared cursor/selection state on ProductionCanvas's own dependency graph — meaningless before real pan/zoom exists on WorkflowViewport itself, which Workflow Visualization's own future-extensions already defers." },
  { title: "AI orchestration", description: "Real generation-job triggering and monitoring for the \"AI Generation\" gallery pattern this package only demos visually today — this audit confirmed no real AI-generation integration exists anywhere in the repo (see Promotion Candidates), so this is genuinely greenfield, deferred pending real usage." },
  { title: "Simulation", description: "Previewing how a production run would execute before running it for real — deferred pending real usage, the same stance Pipeline Components' own future-extensions already took." },
  { title: "Production analytics", description: "Trend analysis and historical reporting across many production runs — belongs to the Intelligence platform template (DS-4.1's own architecture), not this one; deferred here rather than duplicated." },
];
