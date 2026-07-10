export interface QueueFutureExtension {
  title: string;
  description: string;
}

export const QUEUE_FUTURE_EXTENSIONS: QueueFutureExtension[] = [
  { title: "Realtime streaming", description: "Live-updating job rows over a websocket or polling connection — this family's components already accept plain props each render, so realtime is a data-layer concern above them, not a rebuild." },
  { title: "Background workers", description: "Surfacing which worker process picked up a job — depends on Worker Assignment existing first." },
  { title: "Job dependencies", description: "Showing that one job is Blocked because it's waiting on another — QueueStatus's own \"blocked\" value already reserves the state; a real dependency graph is deferred until a real screen needs it." },
  { title: "Scheduling", description: "Queuing a job to start at a future time rather than immediately — a genuinely different flow from this family's own run-now queue, deferred pending real usage." },
  { title: "Concurrency visualization", description: "Showing how many jobs are running in parallel against a worker pool's capacity — depends on Background Workers existing first." },
  { title: "Worker assignment", description: "Manually assigning a job to a specific worker or priority lane — deferred until a real operational screen needs more control than QueuePriority's own display-only signal gives." },
];
