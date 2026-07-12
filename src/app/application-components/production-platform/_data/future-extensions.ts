export interface ProductionFutureExtension {
  title: string;
  description: string;
}

export const PRODUCTION_FUTURE_EXTENSIONS: ProductionFutureExtension[] = [
  { title: "Realtime production", description: "Live status updates as a real production job progresses through its pipeline require a real data-streaming integration, which these components do not implement themselves." },
  { title: "Multi-user production", description: "Multiple users viewing or acting on the same production run simultaneously, with real-time presence — a genuinely different capability layer (websockets, presence state) from this package's own single-user, prop-driven components." },
  { title: "Canvas collaboration", description: "Shared cursor/selection state on ProductionCanvas's own dependency graph depends on real pan/zoom existing on WorkflowViewport itself." },
  { title: "AI orchestration", description: "Real generation-job triggering and monitoring for the \"AI Generation\" gallery pattern this package only demos visually today. No real AI-generation integration exists anywhere in the repo yet." },
  { title: "Simulation", description: "Previewing how a production run would execute before running it for real is not yet implemented." },
  { title: "Production analytics", description: "Trend analysis and historical reporting across many production runs belongs to the Intelligence platform's own components, not this platform's." },
];
