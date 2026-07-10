export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Queue ordering",
    text: "Queue renders jobs in the order given — sort by priority, queued time, or whatever a screen needs before passing the array in; this family doesn't re-sort for you.",
  },
  {
    label: "Priority",
    text: "QueuePriority is a display-only signal — whether higher-priority jobs actually run first is a backend/worker concern this design-system layer has no opinion on.",
  },
  {
    label: "Retries",
    text: "JobRetry's confirmAfterAttempts prop is optional — gate a confirmation dialog behind it once retries start looking suspicious (e.g. after 3 failed attempts), and let early retries run immediately without one.",
  },
  {
    label: "Failure handling",
    text: "JobError is for one job's own failure detail (inside a JobCard or an expanded row) — for a whole batch's mixed outcomes, Bulk Actions' own BulkResults/BulkConflictList are the right components instead.",
  },
  {
    label: "Progress reporting",
    text: "JobProgress expects processed/total as plain numbers the caller updates as work happens — same contract Bulk Actions' own BulkProgress already established, since this is a direct re-export of it.",
  },
  {
    label: "Results",
    text: "JobResults' success prop drives its tone (success/error) — pass whatever output detail is relevant as children (a file link, an execution time, a record count).",
  },
];
