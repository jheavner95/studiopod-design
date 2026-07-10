export interface BulkAccessibilityTopic {
  label: string;
  text: string;
}

export const BULK_ACCESSIBILITY_TOPICS: BulkAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "BulkActionButton is a real, native <button> reachable by Tab in DOM order; BulkActionMenu inherits Foundation Overlay's Menu ARIA menu pattern (roving highlight via Up/Down, Home/End, type-ahead) unchanged.",
  },
  {
    label: "Focus",
    text: "BulkActionConfirmation inherits Dialog's focus-trap-in/restore-on-close guarantee; nothing else in this family traps or redirects focus.",
  },
  {
    label: "ARIA",
    text: "BulkProgress's role=\"progressbar\" and aria-valuenow come from Foundation Feedback's own ProgressBar unchanged; BulkResults' role=\"alert\"/role=\"status\" choice comes from Alert's own feedbackRole(tone) helper, not a second convention.",
  },
  {
    label: "Selection announcements",
    text: "BulkSelectionSummary's \"N selected\" text updates in the DOM on every toggle — a screen that needs it announced to screen readers wraps it in an aria-live=\"polite\" region itself, the same opt-in ValidationSummary's own live region already establishes.",
  },
  {
    label: "Confirmation dialogs",
    text: "BulkActionConfirmation always sets labelledBy/describedBy on Dialog, so a screen reader announces both the \"Delete 12 items?\" title and its consequences text the moment the dialog opens, not just \"dialog.\"",
  },
  {
    label: "Progress updates",
    text: "BulkProgress's label text (\"Processing 12 of 40\") is real DOM content inside the progressbar's accessible name path, not an image or canvas — a screen reader can already read the current count without a separate live region, though one can be added at the call site for continuous updates.",
  },
];
