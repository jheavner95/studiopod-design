export interface PipelineAccessibilityTopic {
  label: string;
  text: string;
}

export const PIPELINE_ACCESSIBILITY_TOPICS: PipelineAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "PipelineStep renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable step (jump to its detail) is natively Tab-reachable and Enter/Space-operable. PipelineActions' Retry/Pause/Cancel are real <button> elements via Foundation UI's own Button, inherited unchanged through WorkflowActions/InspectorActions.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Stages/Steps/Branches/Gates, then Progress/Metrics, then Actions in the footer, then History). Advancing a stage does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "PipelineProgress inherits WorkflowProgress's real role=\"progressbar\"/aria-valuenow unchanged. PipelineGate's non-compact form inherits ApprovalDecision's own role=\"alert\"/role=\"status\" split (error-toned gate outcomes are assertive, everything else polite) via Foundation Feedback's feedbackRole() convention.",
  },
  {
    label: "Progress announcements",
    text: "No built-in aria-live region announces a new stage completing or PipelineProgress's label changing — the same opt-in convention every prior Workflow Component Library package already follows, and the systemic gap this session's own DS-2.5.10 certification review already flagged across the whole library rather than fixed ad hoc in one package.",
  },
  {
    label: "Pipeline semantics",
    text: "This family renders plain <div>/<span> markup, not a native ARIA \"progressbar\" group or graph role for the pipeline as a whole (only PipelineProgress itself carries role=\"progressbar\", inherited from WorkflowProgress) — a screen composing a live-updating pipeline dashboard from this family should add its own live region and heading structure around it, the same opt-in convention this whole tier already follows.",
  },
  {
    label: "Color independence",
    text: "PipelineStep/PipelineStatus never rely on marker color alone — Completed/Failed/Blocked/Cancelled each pair their tone with a distinct icon (Check/X/AlertTriangle) or a struck-through label, the same color-independence guarantee WorkflowStep already established one layer below.",
  },
];
