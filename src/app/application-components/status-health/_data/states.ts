export interface HealthStateNote {
  state: string;
  note: string;
}

export const HEALTH_STATES: HealthStateNote[] = [
  { state: "Healthy", note: "HealthIndicator's \"healthy\" value maps to StatusIndicator's non-pulsing success dot." },
  { state: "Warning", note: "HealthIndicator's \"warning\" value maps to StatusIndicator's pulsing warning dot — pulsing because it represents something that needs attention soon." },
  { state: "Critical", note: "HealthIndicator's \"critical\" value maps to StatusIndicator's non-pulsing error dot — already at maximum severity, no further attention-grabbing motion needed." },
  { state: "Offline", note: "HealthIndicator's \"offline\" value maps to StatusIndicator's idle dot with an \"Offline\" label — distinct from Critical, since offline isn't necessarily an error state (e.g. a paused integration)." },
  { state: "Syncing", note: "HealthIndicator's \"syncing\" value maps to StatusIndicator's pulsing accent dot; SyncStatusPanel additionally shows a live ProgressBar while this state holds." },
  { state: "Paused", note: "HealthIndicator's \"paused\" value maps to StatusIndicator's idle dot with a \"Paused\" label — an intentional, caller-initiated state, not a failure." },
  { state: "Recovering", note: "HealthIndicator's \"recovering\" value maps to StatusIndicator's pulsing accent dot, the same treatment as Syncing — both represent active, in-progress work." },
  { state: "Unknown", note: "HealthIndicator's \"unknown\" value maps to StatusIndicator's idle dot — the honest default when no health signal has arrived yet, never silently treated as Healthy." },
];
