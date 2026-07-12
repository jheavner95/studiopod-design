export interface HealthFutureExtension {
  title: string;
  description: string;
}

export const HEALTH_FUTURE_EXTENSIONS: HealthFutureExtension[] = [
  { title: "Realtime monitoring", description: "Live-updating health values over a websocket or polling connection — this family's components already accept plain values/props each render, so realtime is a data-layer concern above them, not a rebuild." },
  { title: "Historical trends", description: "A sparkline or chart of a metric/score over time. Not currently supported; StatusTimeline covers discrete events, not continuous trend data." },
  { title: "Predictive health", description: "Forecasting a future health state from current trends. Not currently supported — Historical Trends, which this would build on, isn't supported yet either." },
  { title: "Provider SLA", description: "Tracking a provider's uptime against a contracted SLA threshold — ProviderHealthPanel's uptime column is a natural place to surface this once SLA data exists." },
  { title: "AI recommendations", description: "Generating HealthRecommendation content automatically from current issues. Not currently supported — this design-system layer has no access to the usage data it would need." },
  { title: "Health notifications", description: "Pushing a critical HealthIndicator change to email/Slack/a notification center — depends on Toast's own Notification Center future extension existing as a real destination first." },
];
