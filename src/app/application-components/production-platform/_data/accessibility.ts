export interface ProductionAccessibilityTopic {
  label: string;
  text: string;
}

export const PRODUCTION_ACCESSIBILITY_TOPICS: ProductionAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Every clickable node in ProductionCanvas (WorkflowNode, DependencyNode) renders a real <button> only when onClick is supplied, inherited unchanged from Workflow Visualization and Dependency & Relationship Views. ProductionActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions.",
  },
  {
    label: "Focus",
    text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export or thin wrapper, so focus order is exactly whatever the composed Workflow/Operational component already establishes.",
  },
  {
    label: "ARIA",
    text: "ProductionInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. ProductionQueue's rows inherit Foundation Table's own real markup (not a generic div grid).",
  },
  {
    label: "Status announcements",
    text: "No built-in aria-live region announces a stage completing or a job's status changing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap that exists across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier.",
  },
  {
    label: "Canvas semantics",
    text: "ProductionCanvas renders plain DOM-flow markup (via WorkflowViewport), not a native ARIA graph role or the illustration-canvas layer's own SVG connector geometry — the same DOM-flow-vs-coordinate-positioned distinction Workflow Visualization and Dependency & Relationship Views already established one tier down, inherited unchanged rather than re-litigated here.",
  },
  {
    label: "Color independence",
    text: "Every status marker this platform renders (WorkflowNode, DependencyNode, PipelineStage, ApprovalStatus) already pairs a tone with a distinct icon rather than relying on color alone — inherited unchanged from each composed component's own certified accessibility treatment.",
  },
];
