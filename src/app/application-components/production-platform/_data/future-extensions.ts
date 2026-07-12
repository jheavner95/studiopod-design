export interface ProductionFutureExtension {
  title: string;
  description: string;
}

export const PRODUCTION_FUTURE_EXTENSIONS: ProductionFutureExtension[] = [
  { title: "Realtime production", description: "Live status updates as a production job progresses through its pipeline require a real-time data connection, which these components don't provide on their own." },
  { title: "Multi-user production", description: "Multiple people viewing or acting on the same production run at once, with live presence, needs a different capability layer — websockets and shared presence state — beyond this package's single-user, prop-driven components." },
  { title: "Canvas collaboration", description: "Shared cursor and selection state on the dependency graph depends on pan and zoom support landing in the canvas first." },
  { title: "AI orchestration", description: "Real generation-job triggering and monitoring for the AI Generation pattern shown in the gallery — today it's a visual demo only, with no generation service behind it." },
  { title: "Simulation", description: "Previewing how a production run would execute before running it for real is not yet supported." },
  { title: "Production analytics", description: "Trend analysis and historical reporting across many production runs belongs with Intelligence Platform, not here." },
];
