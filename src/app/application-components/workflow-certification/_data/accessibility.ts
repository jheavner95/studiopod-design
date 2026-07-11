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
    label: "No first-party announcement pattern (partially closed since this audit)",
    text: "Correction (re-verified against current source, not carried over from this page's original text): at the time of the eight independent per-system audits, no system in the tier implemented a built-in aria-live region — that part of the finding was accurate then. Since this page was written, a later live-region rollout (the same one that added useAnnounce() to Operational's QueueStatus/HealthIndicator/BulkStatus) reached two Workflow components: WorkflowStatus.tsx (Workflow Framework) and WorkflowStepperProgress.tsx (Workflow Stepper) both now call useAnnounce() on value change, confirmed by direct source read. The rollout is incomplete, not tier-wide: PipelineStatus.tsx (Pipeline Components) and ApprovalStatus.tsx (Approval & Review) share WorkflowStatus's exact STATUS_MAP architecture but still have zero useAnnounce/useRef/useEffect wiring, and Workflow Visualization's WorkflowSelection.tsx (selection-count changes) and State Machine's StateNode.tsx (status changes) also remain unannounced — StateNode instead gained a different, real fix (sr-only status text plus aria-current) rather than a live-region announcement. So 2 of 92 components across the tier now announce; the other 90, including every other status-bearing component, do not.",
  },
  {
    label: "WorkflowStepperStep missing aria-current (resolved since this audit)",
    text: "At the time of this audit this was a real, verified regression: WorkflowStepperStep never set aria-current=\"step\" on the current step, even though it explicitly modeled its visual idiom on Foundation Navigation's own Stepper, which does implement aria-current and lists it as a required accessibility feature in its own catalog entry. Correction, re-verified against current source: WorkflowStepperStep.tsx now computes ariaCurrent = status === \"current\" ? \"step\" : undefined and renders aria-current={ariaCurrent} on both its button and div render paths — the same pattern independently confirmed for its six siblings (ApprovalStep, StateNode, WorkflowStep, PipelineStep, WorkflowNode all render aria-current the same way; DependencyNode has no \"current\" concept by design and instead gives every status an sr-only label). No longer an open gap.",
  },
  {
    label: "Reduced motion",
    text: "Not independently re-verified component-by-component in this pass — the tier's own animated primitives (Expandable, used by several systems for stage/section collapse) already gate behind useMotionPreference() per the Operational Component Library's own prior finding, and none of the eight systems introduce new animation of their own, so this is inherited rather than freshly confirmed.",
  },
];
