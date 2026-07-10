export interface HealthFutureExtension {
  title: string;
  description: string;
}

export const HEALTH_FUTURE_EXTENSIONS: HealthFutureExtension[] = [
  { title: "Realtime monitoring", description: "Live-updating health values over a websocket or polling connection — this family's components already accept plain values/props each render, so realtime is a data-layer concern above them, not a rebuild." },
  { title: "Historical trends", description: "A sparkline or chart of a metric/score over time — deferred until a real screen needs it; StatusTimeline covers discrete events, not continuous trend data." },
  { title: "Predictive health", description: "Forecasting a future health state from current trends — depends on Historical Trends existing first." },
  { title: "Provider SLA", description: "Tracking a provider's uptime against a contracted SLA threshold — ProviderHealthPanel's uptime column is a natural place to surface this once SLA data exists." },
  { title: "AI recommendations", description: "Generating HealthRecommendation content automatically from current issues — the same reasoning this whole session's AI extensions have deferred on, pending real usage data." },
  { title: "Health notifications", description: "Pushing a critical HealthIndicator change to email/Slack/a notification center — depends on Toast's own Notification Center future extension existing as a real destination first." },
];
