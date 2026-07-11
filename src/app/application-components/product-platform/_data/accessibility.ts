export interface ProductAccessibilityTopic {
  label: string;
  text: string;
}

export const PRODUCT_ACCESSIBILITY_TOPICS: ProductAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "Every clickable node in ProductProviderMappings (RelationshipNode) renders a real <button> only when onClick is supplied, inherited unchanged from Dependency & Relationship Views. ProductActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "ProductInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. ProductCatalog's rows inherit Data Grid's own real markup (not a generic div grid)." },
  { label: "Status announcements", text: "No built-in aria-live region announces a product publishing or a validation gate resolving — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap already flagged during the Workflow Component Library's own certification review, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Library semantics", text: "ProductLibrary renders plain DOM-flow markup (via AssetBrowser's AssetGrid/AssetList), not a native ARIA grid/listbox role beyond what AssetBrowser itself already provides — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "Every status marker this platform renders (PipelineGate's ApprovalStatus, StateInspector's status pair) already pairs a tone with a distinct icon rather than relying on color alone. The four free-text Badge states this platform discloses (Draft/Published/Archived/Retired, see States) pair tone with a real text label by construction, since Badge's own children are always the visible label, never color alone." },
];
