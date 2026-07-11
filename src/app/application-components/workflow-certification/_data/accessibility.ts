export interface AccessibilityTopic {
  label: string;
  text: string;
}

export const ACCESSIBILITY_STRENGTHS: AccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Verified real across all eight systems — every clickable Node/Step (WorkflowStep, PipelineStep, StateNode, DependencyNode, WorkflowNode) renders a real <button> only when onClick is supplied, never a div-with-onClick, confirmed by direct source comparison across all five sibling implementations.",
  },
  {
    label: "Color independence",
    text: "Verified in every status-bearing component across all eight systems: every marker pairs a tone with a distinct lucide icon (Check/X/AlertTriangle/Ban/Pause/Play/Circle/etc.), and Filtered/Hidden/Cancelled states additionally strike through the label — never color alone.",
  },
  {
    label: "Focus management",
    text: "No system in the tier introduces custom tabindex or focus-trap logic — DOM order is reading order throughout, and the one system with a real interactive multi-select (Workflow Visualization) was independently confirmed to wire live useState/Set-based selection into real WorkflowNode buttons, not decorative markup.",
  },
  {
    label: "ARIA (structural)",
    text: "InspectorHeader's real status label/tone pair (inherited unchanged from Foundation Metadata's IdentityBlock) is composed correctly by every Inspector-family component in the tier (StateInspector, DependencyInspector, WorkflowInspector, ReviewPanel); Foundation Navigation's SegmentedControl (composed by WorkflowTimelineFilters, DependencyFilters) carries native radiogroup semantics unchanged.",
  },
];

export const ACCESSIBILITY_GAPS: AccessibilityTopic[] = [
  {
    label: "No first-party announcement pattern",
    text: "The one gap every one of the eight independent audits confirmed as inherited: no system in the tier implements a built-in aria-live region. Selection-count changes (Workflow Visualization) and status changes (State Machine, Approval & Review, Pipeline Components) are all left as an opt-in the consuming screen must add itself — the same systemic gap DS-2.5.10 already found across the Operational Component Library, now confirmed unresolved one tier up.",
  },
  {
    label: "WorkflowStepperStep missing aria-current",
    text: "A real, verified regression, not merely a documentation gap: WorkflowStepperStep never sets aria-current=\"step\" on the current step, even though it explicitly models its visual idiom on Foundation Navigation's own Stepper — which does implement aria-current={status === \"current\" ? \"step\" : undefined} and lists it as a required accessibility feature in its own catalog entry. Confirmed by direct source comparison, not inferred.",
  },
  {
    label: "Reduced motion",
    text: "Not independently re-verified component-by-component in this pass — the tier's own animated primitives (Expandable, used by several systems for stage/section collapse) already gate behind useMotionPreference() per DS-2.5.10's own prior finding, and none of the eight systems introduce new animation of their own, so this is inherited rather than freshly confirmed.",
  },
];
