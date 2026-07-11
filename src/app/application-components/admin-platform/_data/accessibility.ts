export interface AdminAccessibilityTopic {
  label: string;
  text: string;
}

export const ADMIN_ACCESSIBILITY_TOPICS: AdminAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "AdminActions' buttons are real Foundation UI Button elements, inherited through WorkflowActions/InspectorActions. AdminConfiguration's own PropertyToggle/PropertySelect fields are real Foundation Forms SwitchField/SelectField elements, natively keyboard-operable." },
  { label: "Focus", text: "This platform introduces no custom tabindex or focus-trap logic anywhere — every component is a re-export, so focus order is exactly whatever the composed Workflow/Operational component already establishes." },
  { label: "ARIA", text: "AdminInspector's own InspectorHeader carries a real status label/tone pair, inherited unchanged from Foundation Metadata's IdentityBlock through State Machine's own StateInspector. AdminUsers' and AdminPermissions' rows inherit Data Grid's own real markup (not a generic div grid)." },
  { label: "Status announcements", text: "No built-in aria-live region announces a user's status changing or an enrollment step completing — the same opt-in convention every prior Workflow and Operational package already follows, and the same systemic gap DS-3.9's own certification review already flagged across the whole Workflow Component Library, now inherited rather than independently re-introduced at the Platform tier." },
  { label: "Administration semantics", text: "AdminEnrollment renders Approval & Review's own WorkflowStage/ApprovalStep markup (a titled section with per-step status markers, not a native ARIA wizard or form role) — inherited unchanged rather than re-litigated here." },
  { label: "Color independence", text: "AdminEnrollment's own ApprovalStep pairs every status tone with a distinct icon, never color alone. The two disclosed free-text states (Configured/Archived) pair tone with a real text label by construction, since Foundation Badge's own children are always the visible label, never color alone." },
];
