export interface WorkflowAccessibilityTopic {
  label: string;
  text: string;
}

export const WORKFLOW_ACCESSIBILITY_TOPICS: WorkflowAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "WorkflowStep renders a real <button> whenever an onClick handler is supplied, and a plain <div> otherwise — never a div-with-onClick — so every clickable step is natively Tab-reachable and Enter/Space-operable with no extra wiring.",
  },
  {
    label: "Focus order",
    text: "This framework introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Header, then Stages/Steps, then Sidebar, then Footer), the same convention Inspector Panel's own family already follows.",
  },
  {
    label: "ARIA",
    text: "WorkflowStatus inherits StatusIndicator's own dot+label semantics unchanged; WorkflowProgress inherits ProgressBar's real role=\"progressbar\"/aria-valuenow unchanged — this family adds no new ARIA roles of its own, only compositions of already-certified ones.",
  },
  {
    label: "Status announcements",
    text: "This family has no live region of its own — a screen that needs a WorkflowStatus change announced to screen readers wraps it in an aria-live=\"polite\" region itself, the same opt-in convention every prior operational package (Queue & Job, Status & Health, Dashboard Widgets) already follows, and the same gap this session's own DS-2.5.10 certification review flagged as systemic rather than package-specific.",
  },
  {
    label: "Progress updates",
    text: "WorkflowProgress's role=\"progressbar\" and aria-valuenow come from Foundation Feedback's own ProgressBar unchanged — no second progress-announcement mechanism layered on top.",
  },
  {
    label: "Color independence",
    text: "WorkflowStatus always pairs its dot with a text label, never color alone; WorkflowStep's marker pairs its tone with a distinct icon (Check/X/AlertTriangle/Ban) for Completed/Failed/Blocked/Cancelled respectively, so a colorblind reader isn't relying on hue alone to tell them apart.",
  },
];
