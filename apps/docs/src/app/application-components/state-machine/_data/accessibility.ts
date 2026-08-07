export interface StateAccessibilityTopic {
  label: string;
  text: string;
}

export const STATE_ACCESSIBILITY_TOPICS: StateAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "StateNode renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable state (open its own StateInspector detail) is natively Tab-reachable and Enter/Space-operable. StateActions' buttons are real <button> elements via Foundation UI's own Button, inherited unchanged through WorkflowActions/InspectorActions.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (States/Transitions/Conditions, then Events, then History, then Actions in the footer). Selecting a different state does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "StateInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock. StateCondition's met/unmet marker inherits StatusIndicator's own accessible label text rather than color alone.",
  },
  {
    label: "State announcements",
    text: "StateMachine doesn't announce a state transition through an aria-live region by default. If your process needs transitions read aloud as they happen, wrap the relevant state value in your own live region.",
  },
  {
    label: "Transition semantics",
    text: "StateTransition renders plain <div>/<span> markup, not a native ARIA graph or state-diagram role — a screen composing a live state-diagram visualization from this family should add its own semantics around it. StateEvents' from→to summary is plain text, readable by any screen reader without extra markup.",
  },
  {
    label: "Color independence",
    text: "StateNode never relies on marker color alone — Completed/Failed/Blocked/Cancelled/Terminal each pair their tone with a distinct icon (Check/X/AlertTriangle/Ban/Square) or a struck-through label, the same color-independence guarantee WorkflowStep/PipelineStep already established one layer below.",
  },
];
