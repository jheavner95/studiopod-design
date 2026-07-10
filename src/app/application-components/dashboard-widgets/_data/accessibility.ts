export interface DashboardAccessibilityTopic {
  label: string;
  text: string;
}

export const DASHBOARD_ACCESSIBILITY_TOPICS: DashboardAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Every interactive element inside a widget — QueueWidget's rows, RecommendationWidget's action buttons — inherits its source component's own keyboard behavior unchanged; this family adds no new interactive controls beyond what Queue/HealthRecommendation already handle.",
  },
  {
    label: "Focus",
    text: "DashboardSection's loading swap unmounts its children entirely, so focus that was inside them is not preserved across a refresh — a known limitation, consistent with LoadingState's own full-region-replacement behavior elsewhere in Foundation Feedback.",
  },
  {
    label: "ARIA",
    text: "EmptyState's role=\"status\", LoadingState's role=\"status\", and ChartWidget's role=\"img\"/aria-label are the only ARIA roles this family adds directly — every other widget inherits its roles from the Status & Health, Queue & Job, or Feedback component it composes.",
  },
  {
    label: "Announcements",
    text: "This family has no live region of its own — a screen that needs a metric or status change announced to screen readers wraps that widget in an aria-live=\"polite\" region itself, the same opt-in convention Status & Health's own components already follow.",
  },
  {
    label: "Charts",
    text: "ChartWidget's bars and TrendWidget's sparkline are aria-hidden; ChartWidget pairs its SVG with a role=\"img\" aria-label summarizing every label/value pair, and both widgets print their headline value and trend as real text, so a screen reader is never dependent on the graphic itself.",
  },
  {
    label: "Color independence",
    text: "HealthIndicator/QueueStatus tones always pair with a text label, never color alone; MetricCard's/TrendWidget's trend direction is conveyed by an arrow icon and the value's own sign, not by color alone.",
  },
];
