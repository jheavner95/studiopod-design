export interface QueueAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const QUEUE_ANATOMY: QueueAnatomyRegion[] = [
  { name: "Header", description: "The queue's title and job count.", component: "QueueHeader (Foundation Table's own TableToolbar underneath)" },
  { name: "Filters", description: "Narrowing the queue to one execution state at a time.", component: "QueueFilters (Foundation Navigation's SegmentedControl underneath)" },
  { name: "Jobs", description: "The rows themselves, one per job.", component: "Queue (Foundation Table underneath), QueueRow" },
  { name: "Status", description: "A job's current execution state.", component: "QueueStatus (Foundation Feedback's StatusIndicator underneath)" },
  { name: "Priority", description: "A job's queue priority.", component: "QueuePriority (Foundation UI's Badge underneath)" },
  { name: "Progress", description: "How far a running job has gotten.", component: "JobProgress (Bulk Actions' own BulkProgress underneath)" },
  { name: "Actions", description: "What can be done to a job right now.", component: "JobActions, JobRetry (Bulk Actions' BulkActionButton/BulkActionConfirmation underneath)" },
  { name: "Results", description: "What a finished job produced, or why it failed.", component: "JobResults, JobError (Foundation Feedback's Alert underneath)" },
];
