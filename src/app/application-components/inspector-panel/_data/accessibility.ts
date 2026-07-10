export interface InspectorAccessibilityTopic {
  label: string;
  text: string;
}

export const INSPECTOR_ACCESSIBILITY_TOPICS: InspectorAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Every interactive piece — InspectorSection's Expandable trigger, InspectorTabs' Tab buttons, InspectorProperty's edit-mode form fields, InspectorActions' buttons — is a real, natively focusable element reachable by Tab in DOM order. Nothing in this family introduces a custom roving-focus grid.",
  },
  {
    label: "Section headings",
    text: "InspectorSection's title renders as visible text in its Expandable trigger button, not a decorative label — screen readers reading the button announce the section's name alongside its aria-expanded state.",
  },
  {
    label: "Focus order",
    text: "Header, then Tabs (if present), then the scrolling body's Sections top to bottom, then Footer — the same order the DOM already puts them in, since InspectorPanel doesn't reorder focus with tabindex tricks.",
  },
  {
    label: "ARIA",
    text: "InspectorTabs inherits Navigation's full ARIA tabs pattern (tablist/tab/tabpanel, aria-selected) unchanged. InspectorSection's Expandable sets aria-expanded on its trigger. InspectorValidation's role=\"alert\"/\"status\" comes from Feedback's ValidationSummary, not a second implementation here.",
  },
  {
    label: "Validation announcements",
    text: "A validation error appearing after an edit is announced because InspectorValidation's underlying ValidationSummary is a live region (role=\"alert\" for errors) — there's no separate toast or aria-live region layered on top for the same event.",
  },
];
