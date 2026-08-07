import type { ReactNode } from "react";
import { Alert } from "@/components/feedback";

interface JobResultsProps {
  success: boolean;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * A completed job's outcome — a thin preset over Foundation Feedback's own
 * Alert (success/error tone by outcome). Distinct from Bulk Actions' own
 * BulkResults, which reports succeeded/failed counts across many selected
 * items; this describes the outcome of one single job (output, duration,
 * a link to what it produced), a different shape.
 */
export function JobResults({ success, title, children, action, className }: JobResultsProps) {
  return (
    <Alert tone={success ? "success" : "error"} title={title} action={action} className={className}>
      {children}
    </Alert>
  );
}
