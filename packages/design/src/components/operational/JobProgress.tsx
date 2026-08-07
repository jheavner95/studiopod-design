/**
 * Re-export, not a rebuild. Bulk Actions' own BulkProgress ("Processing N
 * of M", a thin preset over Foundation Feedback's ProgressBar) already
 * covers a job's own processed/total progress exactly — nothing
 * bulk-action-specific in its implementation — so this system reuses it
 * directly under a family-appropriate name.
 */
export { BulkProgress as JobProgress } from "./BulkProgress";
