export interface IntegrationsAccessibilityTopic {
  label: string;
  text: string;
}

export const INTEGRATIONS_ACCESSIBILITY_TOPICS: IntegrationsAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "IntegrationsActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. IntegrationsProviders' and IntegrationsConnections' own DataGrid rows are natively keyboard-operable, sortable table markup, not a generic clickable div grid." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "IntegrationsInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. IntegrationsConnections' rows inherit Data Grid's own real markup, and each row's HealthIndicator carries its own accessible status label, not color alone." },
  { label: "Status announcements", text: "No built-in aria-live region announces a connection changing status or a sync completing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap DS-3.9's own certification review already flagged across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Integration semantics", text: "IntegrationsMappings renders Dependency & Relationship Views' own RelationshipNode/RelationshipEdge markup (a peer graph with status-marker nodes and labeled edges, not a native ARIA graph or tree role) — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "IntegrationsConnections' own HealthIndicator pairs every status tone with a distinct icon and text label, never color alone. IntegrationsMappings' own RelationshipNode pairs every DependencyStatusValue with a distinct icon (Link2/Unlink2/Ban/Check/AlertTriangle/X/RefreshCw/EyeOff), the same discipline. The one disclosed free-text state (Archived) pairs tone with a real text label by construction, since Foundation Badge's own children are always the visible label, never color alone." },
];
