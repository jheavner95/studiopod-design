export interface BulkAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const BULK_ANATOMY: BulkAnatomyRegion[] = [
  { name: "Selection", description: "Which items are currently checked — the Set<string> state every region below reads from.", component: "Data Grid's own useDataGridSelection/toggleSelection, reused unchanged" },
  { name: "Summary", description: "\"N selected\" plus a clear action.", component: "BulkSelectionSummary (Data Grid's own DataGridSelectionSummary underneath), BulkSelectionCounter" },
  { name: "Actions", description: "The buttons — and overflow menu for anything that doesn't fit inline — available for the current selection.", component: "BulkActionBar, BulkActionGroup, BulkActionButton, BulkActionMenu" },
  { name: "Confirmation", description: "The \"are you sure\" gate before a destructive or irreversible action runs.", component: "BulkActionConfirmation (Foundation Overlay's Dialog underneath)" },
  { name: "Progress", description: "What's shown while the operation is actually running.", component: "BulkProgress (Foundation Feedback's ProgressBar underneath), BulkStatus" },
  { name: "Results", description: "The outcome once the operation finishes — including which items failed and why.", component: "BulkResults (Foundation Feedback's Alert underneath), BulkConflictList" },
  { name: "Undo", description: "A time-limited chance to reverse what just happened.", component: "BulkUndo (Foundation Feedback's Notification underneath)" },
];
