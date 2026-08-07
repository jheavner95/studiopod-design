export interface PropertyAccessibilityTopic {
  label: string;
  text: string;
}

export const PROPERTY_ACCESSIBILITY_TOPICS: PropertyAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Every editor — PropertyToggle's native button role=\"switch\", PropertySelect's native <select>, PropertyNumber's native number input, PropertyColor's native color input — is a real, natively focusable/operable element. Nothing in this family introduces a custom widget needing its own keyboard model.",
  },
  {
    label: "Labels",
    text: "PropertyLabel (read mode) and every Foundation Forms field passed as an editor (edit mode) render a real, associated <label> — never a placeholder standing in for one, the same rule Foundation Forms already enforces everywhere.",
  },
  {
    label: "Descriptions",
    text: "PropertyToggle/PropertySelect both pass through Foundation Forms' own helperText/description slots unchanged — this family doesn't add a second description mechanism on top.",
  },
  {
    label: "Focus order",
    text: "Header, then each PropertySection's rows top to bottom, then Footer — plain DOM order, matching Inspector Panel's own rule of never reordering focus with tabindex tricks.",
  },
  {
    label: "Validation",
    text: "A field's own error is announced via its underlying Foundation Forms field's existing aria-describedby wiring (InputField/SelectField/SwitchField) or PropertyColor's own matching pattern — not a second, redundant announcement layered on top.",
  },
  {
    label: "Screen readers",
    text: "PropertyReset's button carries a real aria-label (\"Reset to default\") rather than an icon-only control with no accessible name.",
  },
];
