export interface CommerceAccessibilityTopic {
  label: string;
  text: string;
}

export const COMMERCE_ACCESSIBILITY_TOPICS: CommerceAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "CommerceActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. CommercePricing's own PropertyNumber fields are real Foundation Forms InputField elements, natively keyboard-operable." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow or Operational component already establishes." },
  { label: "ARIA", text: "CommerceInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. CommerceCatalog's, CommerceOrders', and CommerceInventory's rows inherit Data Grid's own real markup, not a generic div grid." },
  { label: "Status announcements", text: "No built-in aria-live region announces a catalog sync completing or an order's status changing. If your screen needs to surface those changes to assistive technology, wrap the relevant status text in an aria-live region of your own." },
  { label: "Commerce semantics", text: "CommerceFulfillment renders Pipeline Components' own WorkflowStage markup — a titled section, not a native ARIA graph or process role." },
  { label: "Color independence", text: "CommerceFulfillment's own WorkflowStatus pairs every status tone with a distinct label, never color alone. Draft and Archived pair tone with a real text label by construction, since Foundation Badge's children are always the visible label, never color alone." },
];
