export interface OperationsFutureExtension {
  title: string;
  description: string;
}

export const OPERATIONS_FUTURE_EXTENSIONS: OperationsFutureExtension[] = [
  { title: "Realtime monitoring", description: "Live-updating system status as conditions change — deferred pending a real data-streaming integration, the same stance Status & Health's own future-extensions already took: \"a data-layer concern above them, not a rebuild.\"" },
  { title: "Automation orchestration", description: "Real scheduled-trigger and workflow-execution logic behind OperationsAutomation's own stage display — this audit confirmed no real automation-execution engine exists anywhere in the repo (see Migration Notes), so this is genuinely greenfield, deferred pending real usage." },
  { title: "Incident management", description: "Linking OperationsAlerts' own alerts into a tracked incident lifecycle (acknowledge, escalate, resolve) — depends on real alert-triggering logic existing first; deferred pending that groundwork." },
  { title: "Capacity planning", description: "Forecasting resource needs from OperationsMonitoring's own historical data — belongs to the Intelligence platform template (see Platform Architecture), not this one; deferred here rather than duplicated." },
  { title: "Operational analytics", description: "Trend analysis and historical reporting across many operational events — the same Intelligence-platform deferral every prior Platform package's own future-extensions already made for its own analytics extension." },
  { title: "AI operations assistant", description: "Automated triage or root-cause suggestions for OperationsAlerts' own active alerts — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components; deferred pending real usage, the same stance Intelligence Platform's own \"AI explanations\" extension already took." },
];
