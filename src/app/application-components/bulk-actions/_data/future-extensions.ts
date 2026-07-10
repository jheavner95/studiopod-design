export interface BulkFutureExtension {
  title: string;
  description: string;
}

export const BULK_FUTURE_EXTENSIONS: BulkFutureExtension[] = [
  { title: "Background jobs", description: "Handing a large bulk operation off to a server-side job queue instead of processing it in the open tab — BulkProgress's processed/total contract doesn't change, only what updates it would (polling a job status endpoint instead of a local loop)." },
  { title: "Batch scheduling", description: "Running a bulk operation at a future time rather than immediately — depends on a real screen needing it; BulkActionConfirmation could grow a \"Schedule for later\" option once one does." },
  { title: "Retry failed items", description: "A per-row or bulk retry action directly from BulkConflictList — deferred until a real screen shows the current \"see the reason and go fix it manually\" flow isn't sufficient." },
  { title: "Pause/Resume", description: "Interrupting an in-flight bulk operation and continuing it later — BulkStatus would need a paused value distinct from cancelled once this is real." },
  { title: "AI-assisted bulk actions", description: "Suggesting a bulk action based on the current selection (\"these 12 all look unpublished — archive them?\") — depends on the same usage-data access every other AI extension in this session has deferred on." },
  { title: "Saved bulk operations", description: "Naming and re-running a specific bulk action + selection criteria combination later — a natural pairing with Filter & Search's own SavedFilter, once both need to compose together on a real screen." },
];
