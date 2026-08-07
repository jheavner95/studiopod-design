export interface BulkStateNote {
  state: string;
  note: string;
}

export const BULK_STATES: BulkStateNote[] = [
  { state: "No Selection", note: "BulkActionBar renders nothing at count === 0 — there's no empty bar taking up layout space between selections." },
  { state: "Selected", note: "BulkActionBar appears with BulkSelectionSummary and whatever BulkActionGroup/BulkActionMenu actions apply to the current selection." },
  { state: "Processing", note: "BulkStatus's \"processing\" value maps to StatusIndicator's pulsing accent dot; BulkProgress shows the live X-of-Y count alongside it." },
  { state: "Completed", note: "BulkStatus's \"completed\" value (success, non-pulsing) plus BulkResults reporting 0 failed." },
  { state: "Partial Success", note: "BulkStatus's \"partial\" value (warning) plus BulkResults reporting both succeeded and failed counts, with BulkConflictList itemizing the failures." },
  { state: "Failed", note: "BulkStatus's \"failed\" value (error, non-pulsing) plus BulkResults reporting 0 succeeded." },
  { state: "Cancelled", note: "BulkStatus's \"cancelled\" value — mapped to StatusIndicator's idle dot with a \"Cancelled\" label rather than a sixth dot color this family would need to invent." },
  { state: "Undo Available", note: "BulkUndo renders after a completed action, with an optional caller-driven secondsRemaining countdown before the window closes." },
];
