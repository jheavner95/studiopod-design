export interface PublishingFutureExtension {
  title: string;
  description: string;
}

export const PUBLISHING_FUTURE_EXTENSIONS: PublishingFutureExtension[] = [
  { title: "Realtime publishing", description: "Live status updates as a real publish job progresses through its queue require a real data-streaming integration, which these components do not implement themselves." },
  { title: "Scheduled publishing", description: "Publishing at a future date/time rather than immediately is not yet implemented. No real scheduling/cron logic exists anywhere in the repo yet." },
  { title: "Provider failover", description: "Automatically retrying a failed publish through a backup provider depends on real provider connections existing first." },
  { title: "Bulk publishing", description: "Multi-select across PublishingTargets with a shared publish action is not yet implemented; Operational's own Bulk Actions System already covers the selection/action-bar mechanics whenever it is built." },
  { title: "Publishing analytics", description: "Trend analysis and historical reporting across many publish runs belongs to the Intelligence platform's own components, not this platform's." },
  { title: "AI publishing optimization", description: "Automated timing/channel recommendations for a given publication — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
];
