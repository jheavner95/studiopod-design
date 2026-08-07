export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "Queue's table shows every column — Job, Status, Priority, Progress, Actions — at once, same as any other Foundation Table." },
  { breakpoint: "Tablet", note: "Foundation Table's own horizontal ScrollArea (built into every Table) handles a queue with more columns than fit, rather than a second responsive table implementation." },
  { breakpoint: "Mobile", note: "The same horizontal scroll applies; JobCard is the better fit for a narrow single-job detail view than trying to read a wide table row by row." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Compact rows",
    note: "QueueRow inherits whatever density (comfortable/compact/dense) the surrounding Table sets — this family doesn't add a second density system on top of Foundation Table's own.",
  },
  {
    label: "Inspector integration",
    note: "JobCard is built on StatusPanel (Inspector Panel underneath), so it composes into an inspector slot exactly the way Asset Browser's own inspector integration already works — select a queue row, show its JobCard alongside.",
  },
  {
    label: "Progress behavior",
    note: "JobProgress only appears in QueueRow while a job's status is \"running\" or \"retrying\" — a completed or queued row doesn't show a stale or empty progress bar.",
  },
];
