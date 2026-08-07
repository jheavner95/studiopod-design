export interface FormAccessibilityTopic {
  label: string;
  text: string;
}

export const FORM_ACCESSIBILITY_TOPICS: FormAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "Every control in the Field Gallery is a native form element (input, select, textarea, button) or follows an ARIA APG pattern exactly (Combobox, the ToggleSwitch's role=\"switch\") — nothing is a styled div pretending to be interactive." },
  { label: "Focus order", text: "FormRow and FormSection never reorder fields visually with CSS — DOM order, tab order, and visual order always agree, the same rule Foundation Layout's own primitives establish." },
  { label: "Labels", text: "Every *Field component either renders a real <label htmlFor> (Input, Textarea, Select, Combobox, Date Picker, File Upload) or an inline <label> wrapping the control directly (Checkbox, Radio, Switch) — never a floating span with no programmatic association." },
  { label: "Descriptions", text: "A field's optional description line renders before the control and isn't currently wired to aria-describedby — see Future Extensions for closing that gap consistently across every *Field component." },
  { label: "Error announcements", text: "FieldError uses role=\"alert\" for errors (assertive) and role=\"status\" for warnings (polite) — the same blocking/non-blocking distinction Validation documents." },
  { label: "Required fields", text: "RequiredIndicator is marked aria-hidden — the label's own text or a required attribute on the control itself is what a screen reader actually announces, the asterisk is a sighted-user affordance only." },
  { label: "Color independence", text: "Error/warning/success all pair a border color with real text (FieldError's message, or the control's own helperText) — no status is color-only." },
  { label: "Touch targets", text: "Checkbox and Radio's custom dot/box are 20px visually but sit inside a full-height <label>, so the actual tappable area is the whole label row, not just the small custom control." },
];
