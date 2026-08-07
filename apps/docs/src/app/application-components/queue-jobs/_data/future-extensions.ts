export interface QueueFutureExtension {
  title: string;
  description: string;
}

export const QUEUE_FUTURE_EXTENSIONS: QueueFutureExtension[] = [
  { title: "Realtime streaming", description: "Live-updating job rows over a websocket or polling connection — this family's components already accept plain props each render, so realtime is a data-layer concern above them, not a rebuild." },
  { title: "Background workers", description: "Surfacing which worker process picked up a job. Not currently supported — Worker Assignment, which this would build on, isn't supported yet either." },
  { title: "Job dependencies", description: "Showing that one job is Blocked because it's waiting on another. QueueStatus's own \"blocked\" value already reserves the state, but a real dependency graph is not currently built." },
  { title: "Scheduling", description: "Queuing a job to start at a future time rather than immediately — a genuinely different flow from this family's own run-now queue. Not currently supported." },
  { title: "Concurrency visualization", description: "Showing how many jobs are running in parallel against a worker pool's capacity. Not currently supported — Background Workers, which this would build on, isn't supported yet either." },
  { title: "Worker assignment", description: "Manually assigning a job to a specific worker or priority lane. Not currently supported — QueuePriority's own signal is display-only and doesn't give this level of control." },
];
