export interface OperationsFutureExtension {
  title: string;
  description: string;
}

export const OPERATIONS_FUTURE_EXTENSIONS: OperationsFutureExtension[] = [
  { title: "Realtime monitoring", description: "Live-updating system status as conditions change requires a real data-streaming integration, which these components do not implement themselves — a data-layer concern above them, not a rebuild." },
  { title: "Automation orchestration", description: "Real scheduled-trigger and workflow-execution logic behind OperationsAutomation's own stage display is not yet implemented. No real automation-execution engine exists anywhere in the repo yet." },
  { title: "Incident management", description: "Linking OperationsAlerts' own alerts into a tracked incident lifecycle (acknowledge, escalate, resolve) depends on real alert-triggering logic existing first." },
  { title: "Capacity planning", description: "Forecasting resource needs from OperationsMonitoring's own historical data belongs to the Intelligence platform's own components, not this platform's." },
  { title: "Operational analytics", description: "Trend analysis and historical reporting across many operational events belongs to the Intelligence platform's own components, not this platform's." },
  { title: "AI operations assistant", description: "Automated triage or root-cause suggestions for OperationsAlerts' own active alerts — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
];
