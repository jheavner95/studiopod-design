export interface QueueStateNote {
  state: string;
  note: string;
}

export const QUEUE_STATES: QueueStateNote[] = [
  { state: "Queued", note: "QueueStatus's \"queued\" value maps to StatusIndicator's idle dot — waiting its turn, not yet started." },
  { state: "Running", note: "QueueStatus's \"running\" value maps to StatusIndicator's pulsing accent dot; QueueRow additionally shows JobProgress inline while this state holds." },
  { state: "Completed", note: "QueueStatus's \"completed\" value maps to StatusIndicator's non-pulsing success dot; JobResults reports the outcome." },
  { state: "Failed", note: "QueueStatus's \"failed\" value maps to StatusIndicator's non-pulsing error dot; JobError explains what went wrong, JobRetry offers a way back." },
  { state: "Retrying", note: "QueueStatus's \"retrying\" value maps to StatusIndicator's pulsing accent dot, the same treatment as Running — both represent active, in-progress work." },
  { state: "Paused", note: "QueueStatus's \"paused\" value maps to StatusIndicator's idle dot — an intentional, caller-initiated state, not a failure." },
  { state: "Cancelled", note: "QueueStatus's \"cancelled\" value maps to StatusIndicator's idle dot — stopped before completion, distinct from Failed (no error occurred)." },
  { state: "Blocked", note: "QueueStatus's \"blocked\" value maps to StatusIndicator's warning dot — waiting on something outside the queue itself (a dependency, a rate limit), not a failure and not actively running." },
];
