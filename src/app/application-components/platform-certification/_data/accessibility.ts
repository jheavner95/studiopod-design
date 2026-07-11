export interface AccessibilityTopic {
  label: string;
  text: string;
}

export const ACCESSIBILITY_STRENGTHS: AccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Verified real across all eight platforms — every action row (AdminActions, CommerceActions, IntegrationsActions, and their siblings) inherits real Foundation UI Button elements through WorkflowActions/InspectorActions, never a div-with-onClick. Data-grid-backed components (Users, Permissions, Catalog, Orders, Inventory, Providers) inherit Data Grid's own real, sortable table markup, confirmed by direct source read across multiple platforms.",
  },
  {
    label: "Color independence",
    text: "Verified in every status-bearing component: HealthIndicator, WorkflowStatus, and DependencyNode/RelationshipNode markers all pair a tone with a distinct icon and text label, never color alone — confirmed directly in Commerce, Integrations, and Admin's own audits, each independently re-reading the underlying icon-map source. Every disclosed free-text-Badge state (Configured, Archived, and siblings) pairs tone with a real visible text label by construction, since Foundation Badge's own children are always the label.",
  },
  {
    label: "Focus management",
    text: "No platform in the tier introduces custom tabindex or focus-trap logic — every one of the 96 components is either a pure re-export or (Production Platform's own ProductionCanvas) a thin passthrough wrapper, so DOM order is exactly whatever the composed Workflow/Operational component already establishes.",
  },
  {
    label: "ARIA (structural)",
    text: "Every Inspector-family component in the tier (AdminInspector, CommerceInspector, IntegrationsInspector, and siblings) composes State Machine's own StateInspector, which carries a real status label/tone pair inherited unchanged from Foundation Metadata's IdentityBlock — confirmed by direct source read in four independent platform audits. Data Grid's own caption prop renders as a real sr-only &lt;caption&gt;, confirmed directly in Intelligence Platform's own audit.",
  },
];

export const ACCESSIBILITY_GAPS: AccessibilityTopic[] = [
  {
    label: "No first-party announcement pattern",
    text: "The one gap every platform audit confirmed as inherited, not introduced: no platform in the tier implements a built-in aria-live region for status changes, sync completions, or selection changes — the same systemic gap the Operational tier's own certification found across the Operational Component Library and the Workflow tier's own certification reconfirmed unresolved across the Workflow Component Library, now confirmed unresolved a third tier up. Every platform's own docs honestly disclose this as an opt-in the consuming screen must add, rather than hiding it.",
  },
  {
    label: "Reduced motion",
    text: "Not independently re-verified component-by-component in this pass — no platform in the tier introduces new animation of its own (all 96 components are re-exports or a single passthrough wrapper), so this is inherited from the already-certified Workflow/Operational tiers' own useMotionPreference() gating rather than freshly confirmed here.",
  },
];
