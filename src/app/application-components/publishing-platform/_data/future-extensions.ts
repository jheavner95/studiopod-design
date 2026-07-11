export interface PublishingFutureExtension {
  title: string;
  description: string;
}

export const PUBLISHING_FUTURE_EXTENSIONS: PublishingFutureExtension[] = [
  { title: "Realtime publishing", description: "Live status updates as a real publish job progresses through its queue — deferred pending a real data-streaming integration, the same stance Production Platform's own future-extensions already took on live status updates." },
  { title: "Scheduled publishing", description: "Publishing at a future date/time rather than immediately — this audit confirmed no real scheduling/cron logic exists anywhere in the repo (see Promotion Candidates), so this is genuinely greenfield, deferred pending real usage." },
  { title: "Provider failover", description: "Automatically retrying a failed publish through a backup provider — depends on real provider connections existing first (see Promotion Candidates' own Providers finding); deferred pending that groundwork." },
  { title: "Bulk publishing", description: "Multi-select across PublishingTargets with a shared publish action — deferred pending real usage; Operational's own Bulk Actions System (DS-2.5.6) already covers the selection/action-bar mechanics whenever this is built." },
  { title: "Publishing analytics", description: "Trend analysis and historical reporting across many publish runs — belongs to the Intelligence platform template (DS-4.1's own architecture), not this one; deferred here rather than duplicated." },
  { title: "AI publishing optimization", description: "Automated timing/channel recommendations for a given publication — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components; deferred pending real usage, the same stance Product Platform's own \"AI product enrichment\" extension already took." },
];
