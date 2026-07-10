export interface QueueAccessibilityTopic {
  label: string;
  text: string;
}

export const QUEUE_ACCESSIBILITY_TOPICS: QueueAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "QueueRow's selection checkbox is a real, native input reachable by Tab; QueueFilters inherits Foundation Navigation's SegmentedControl roving-tabindex radiogroup unchanged.",
  },
  {
    label: "Status announcements",
    text: "This family has no live region of its own — a screen that needs a QueueStatus change announced to screen readers wraps it in an aria-live=\"polite\" region itself, the same opt-in convention Status & Health's own components already follow.",
  },
  {
    label: "Progress updates",
    text: "JobProgress's role=\"progressbar\" and aria-valuenow come from Foundation Feedback's own ProgressBar (via Bulk Actions' BulkProgress) unchanged.",
  },
  {
    label: "Focus",
    text: "JobRetry's confirmation dialog inherits BulkActionConfirmation's (Dialog's) focus-trap-in/restore-on-close guarantee — nothing in this family adds a second focus implementation.",
  },
  {
    label: "ARIA",
    text: "Queue's table inherits every ARIA guarantee Foundation Table and Data Grid's own selection helpers already make (real <th scope>, aria-selected, a required caption prop) — this family doesn't relax any of them for a queue-specific shortcut.",
  },
];
