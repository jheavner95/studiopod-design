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
    text: "WorkflowStatus now announces its own transition (e.g. \"Workflow status: Blocked.\") through the shared LiveRegionProvider mounted at the app root whenever its value prop changes — blocked/failed assertively, everything else politely — the same fix its sibling presets (Queue & Job's QueueStatus, Status & Health's HealthIndicator) picked up, closing the gap that was previously flagged as systemic across this design system.",
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
