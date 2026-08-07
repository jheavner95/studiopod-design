export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Selection thresholds",
    text: "BulkActionBar renders at count > 0 with no built-in minimum — if a screen only wants bulk actions to appear past some threshold (e.g. 2+), gate the count passed in at the call site rather than adding a prop here.",
  },
  {
    label: "Confirmation rules",
    text: "Not every bulk action needs BulkActionConfirmation — reserve it for destructive or hard-to-reverse operations (delete, unpublish everywhere). A reversible action with BulkUndo available afterward is often a better UX than a confirmation gate before it runs.",
  },
  {
    label: "Destructive actions",
    text: "BulkActionButton's destructive prop and BulkActionConfirmation's destructive prop are independent — a destructive button doesn't require a confirmation dialog, and a confirmation dialog can gate a non-destructive-styled action (e.g. \"Send to 40 recipients?\").",
  },
  {
    label: "Undo strategy",
    text: "BulkUndo is presentational only — it doesn't run a timer or auto-dismiss itself. Pair its secondsRemaining prop with a caller-owned countdown (setInterval, or a toast's own auto-dismiss duration if shown via useToast()) and call onUndo before that window closes.",
  },
  {
    label: "Progress reporting",
    text: "BulkProgress expects processed/total as plain numbers the caller updates as each item finishes — this family has no opinion on whether the underlying operation runs sequentially, in parallel, or via a background job (see Future Extensions).",
  },
  {
    label: "Conflict handling",
    text: "BulkConflictList expects one entry per failed item with a human-readable reason string already resolved — mapping a raw API error to that reason is the caller's responsibility, not something this family infers.",
  },
];
