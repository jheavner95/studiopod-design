export interface IntelligenceAccessibilityTopic {
  label: string;
  text: string;
}

export const INTELLIGENCE_ACCESSIBILITY_TOPICS: IntelligenceAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "IntelligenceActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. IntelligenceRecommendations' own HealthRecommendation action buttons are real, natively focusable elements." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "IntelligenceInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. IntelligenceOpportunities' rows inherit Data Grid's own real markup (not a generic div grid)." },
  { label: "Status announcements", text: "No built-in aria-live region announces an analysis completing or a health status changing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap DS-3.9's own certification review already flagged across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Dashboard semantics", text: "IntelligenceInsights' own ChartWidget carries a role=\"img\" text alternative summarizing every label/value pair, so a screen reader gets the same data a sighted reader gets from the bars — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "IntelligenceDiagnostics' own HealthIssueList pairs every severity with a distinct icon, never color alone. IntelligenceHealth's own HealthScore and status header pair tone with a real text label by construction. The one disclosed free-text state (Archived) pairs tone with a real text label, since Foundation Badge's own children are always the visible label, never color alone." },
];
