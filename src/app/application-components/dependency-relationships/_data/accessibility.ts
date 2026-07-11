export interface DependencyAccessibilityTopic {
  label: string;
  text: string;
}

export const DEPENDENCY_ACCESSIBILITY_TOPICS: DependencyAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "DependencyNode renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable node (open its own DependencyInspector detail) is natively Tab-reachable and Enter/Space-operable. DependencyActions' buttons are real <button> elements via Foundation UI's own Button, inherited unchanged through WorkflowActions/InspectorActions.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Nodes/Edges/Groups, then Filters, then Actions in the footer). Selecting a different node does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "DependencyInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock. DependencyFilters' SegmentedControl options are native radio-group semantics inherited unchanged from Foundation Navigation.",
  },
  {
    label: "Relationship announcements",
    text: "No built-in aria-live region announces a node's status changing or a new edge appearing — the same opt-in convention every prior Workflow Component Library package already follows, and the systemic gap this session's own DS-2.5.10 certification review already flagged across the whole library rather than fixed ad hoc in one package.",
  },
  {
    label: "Graph semantics",
    text: "This family renders plain <div>/<span>/<svg-free> markup, not a native ARIA graph role or the illustration-canvas layer's own SVG connector geometry — a screen composing a live, canvas-positioned dependency diagram should reach for the illustration engine's own IllustrationCanvas/IllustrationNode/IllustrationConnection instead, since this family is the DOM-flow (flex/Grid) alternative, not a replacement for coordinate-positioned rendering.",
  },
  {
    label: "Color independence",
    text: "DependencyNode never relies on marker color alone — Connected/Healthy (Check/Link2), Critical (X), Blocked (Ban), Warning/Circular (AlertTriangle/RefreshCw), and Hidden (EyeOff, plus a struck-through label) each pair their tone with a distinct icon, the same color-independence guarantee WorkflowStep/PipelineStep/StateNode already established one layer below.",
  },
];
