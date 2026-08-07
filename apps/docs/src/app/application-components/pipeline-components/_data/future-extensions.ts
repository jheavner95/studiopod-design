export interface PipelineFutureExtension {
  title: string;
  description: string;
}

export const PIPELINE_FUTURE_EXTENSIONS: PipelineFutureExtension[] = [
  { title: "Parallel execution", description: "Two or more stages genuinely running at the same time, with a shared completion state — PipelineBranch lays stages out side by side visually today, but has no runtime concept of concurrent execution." },
  { title: "Conditional routing", description: "A branch that's chosen automatically based on an earlier stage's output, rather than a caller deciding which PipelineBranch children to render, is not supported." },
  { title: "Pipeline templates", description: "Saving a stage/gate/branch arrangement as a named, reusable pipeline definition — a data-layer concern above this package's own stateless, prop-driven components." },
  { title: "Dependency visualization", description: "Showing which stages depend on which others as an explicit graph, rather than this package's own implicit top-to-bottom/left-to-right stage order — a genuinely different visual model from PipelineConnector's own linear line." },
  { title: "Simulation mode", description: "Previewing how a pipeline would run against hypothetical input before actually running it is not supported." },
  { title: "AI optimization", description: "Suggesting a faster stage ordering or flagging a likely bottleneck rather than a human reading PipelineMetrics themselves is not supported." },
];
