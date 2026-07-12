export interface PublishingAccessibilityTopic {
  label: string;
  text: string;
}

export const PUBLISHING_ACCESSIBILITY_TOPICS: PublishingAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "PublishingActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. PublishingQueue's own row actions are real buttons, inherited unchanged from Operational's own Queue." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "PublishingInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. PublishingTargets' and PublishingProviders' rows inherit Data Grid's own real markup (not a generic div grid)." },
  { label: "Status announcements", text: "No built-in aria-live region announces a publish job completing or a provider's health changing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap that exists across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Queue semantics", text: "PublishingQueue renders Data Grid's own real table markup (via Queue), not a generic div-based list — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "PublishingProviders' own HealthIndicator pairs every status tone with a distinct label, never color alone. PublishingHistory's own WorkflowTimelineEvent markers pair tone with a distinct icon per status, inherited unchanged from Workflow Timeline." },
];
