export interface StateFutureExtension {
  title: string;
  description: string;
}

export const STATE_FUTURE_EXTENSIONS: StateFutureExtension[] = [
  { title: "Parallel states", description: "Two or more states genuinely active at the same time within one machine — this package's own StateNode model is single-active-state-at-a-time, the same simplification Pipeline Components' own PipelineBranch made for parallel stages." },
  { title: "Hierarchical states", description: "A state that is itself a nested state machine (a sub-machine entered/exited as a unit) — a genuinely different structural model from this package's own flat state list." },
  { title: "State simulation", description: "Previewing how a machine would respond to a hypothetical event sequence before it actually happens — deferred pending real usage, the same stance Pipeline Components' own future-extensions already took on simulation mode." },
  { title: "Replay", description: "Re-running a machine's own StateHistory to reconstruct exactly what happened, step by step, rather than reading the static list this package renders today." },
  { title: "Time-travel debugging", description: "Jumping to any prior point in a machine's own history and inspecting its full state at that moment — a genuinely different capability from StateInspector's own current-state-only detail view." },
  { title: "AI transition analysis", description: "Flagging an unusual or high-risk transition pattern rather than a human reading StateHistory/StateMetrics themselves — deferred pending real usage, the same stance Workflow Stepper's, Approval & Review's, and Pipeline Components' own future-extensions already took on AI assistance." },
];
