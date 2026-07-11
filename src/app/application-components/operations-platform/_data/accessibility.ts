export interface OperationsAccessibilityTopic {
  label: string;
  text: string;
}

export const OPERATIONS_ACCESSIBILITY_TOPICS: OperationsAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "OperationsActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. OperationsAlerts' own Alert action and dismiss buttons are real, natively focusable elements." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "OperationsInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. OperationsMonitoring's rows inherit Data Grid's own real markup (not a generic div grid). OperationsAlerts' own Alert carries the correct alert/status role per tone, inherited unchanged from Foundation Feedback." },
  { label: "Status announcements", text: "No built-in aria-live region announces a system status changing or an alert firing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap the Workflow Certification review already flagged across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Dashboard semantics", text: "OperationsAutomation renders Pipeline Components' own WorkflowStage markup (a titled section, not a native ARIA graph or process role) — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "OperationsMonitoring's own HealthIndicator pairs every status tone with a distinct label, never color alone. OperationsHealth's own HealthScore and status header pair tone with a real text label by construction. Every one of this package's own eight states has at least one verbatim vocabulary match — no free-text Badge fallback was needed anywhere in this package." },
];
