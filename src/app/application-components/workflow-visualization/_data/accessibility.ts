export interface WorkflowVizAccessibilityTopic {
  label: string;
  text: string;
}

export const WORKFLOW_VIZ_ACCESSIBILITY_TOPICS: WorkflowVizAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "WorkflowNode renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable node is natively Tab-reachable and Enter/Space-operable. WorkflowControls' and WorkflowToolbar's buttons are real <button> elements via Foundation UI's own Button.",
  },
  {
    label: "Focus management",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Toolbar, then Nodes/Edges/Groups inside the Viewport, then Overview/Controls). Selecting a different node does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "WorkflowInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock. WorkflowSelection's underlying BulkActionBar/TableToolbar bulk-mode chrome is inherited unchanged from Foundation Table.",
  },
  {
    label: "Selection announcements",
    text: "No built-in aria-live region announces a node being selected or a bulk-selection count changing — the same opt-in convention every prior Workflow Component Library package already follows, and the systemic gap this session's own DS-2.5.10 certification review already flagged across the whole library rather than fixed ad hoc in one package.",
  },
  {
    label: "Canvas semantics",
    text: "This family renders plain <div>/<span> markup, not a native ARIA graph role or the illustration-canvas layer's own SVG connector geometry — a screen composing a live, canvas-positioned diagram should reach for the illustration engine's own IllustrationCanvas/IllustrationNode/IllustrationConnection instead, since this family is the DOM-flow (flex/Grid) alternative for the StudioPOD application's own operational screens, not a replacement for coordinate-positioned rendering.",
  },
  {
    label: "Color independence",
    text: "WorkflowNode never relies on marker color alone — Idle (Circle), Running (Play), Paused (Pause), Blocked (Ban), Completed (Check), and Failed (X) each pair their tone with a distinct icon, and Filtered additionally strikes the label, the same color-independence guarantee WorkflowStep/PipelineStep/StateNode/DependencyNode already established one layer below.",
  },
];
