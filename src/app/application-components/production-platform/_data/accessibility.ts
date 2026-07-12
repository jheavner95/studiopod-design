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
    text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export or thin wrapper, so focus order is exactly whatever the composed Workflow or Operational component already establishes.",
  },
  {
    label: "ARIA",
    text: "ProductionInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. ProductionQueue's rows inherit Foundation Table's own real markup, not a generic div grid.",
  },
  {
    label: "Status announcements",
    text: "No built-in aria-live region announces a stage completing or a job's status changing. If your screen needs to surface those changes to assistive technology, wrap the relevant status text in an aria-live region of your own.",
  },
  {
    label: "Canvas semantics",
    text: "ProductionCanvas renders plain DOM-flow markup (via WorkflowViewport), not a native ARIA graph role or the illustration-canvas layer's coordinate-positioned SVG connectors.",
  },
  {
    label: "Color independence",
    text: "Every status marker this platform renders (WorkflowNode, DependencyNode, PipelineStage, ApprovalStatus) pairs a tone with a distinct icon rather than relying on color alone, inherited from each composed component's own accessibility treatment.",
  },
];
