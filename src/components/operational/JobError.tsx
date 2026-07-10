import type { ReactNode } from "react";
import { Alert } from "@/components/feedback";

interface JobErrorProps {
  title?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** What went wrong with a failed job — a thin preset over Foundation Feedback's own Alert (error tone), not a second error-display implementation. */
export function JobError({ title = "Job failed", children, action, className }: JobErrorProps) {
  return (
    <Alert tone="error" title={title} action={action} className={className}>
      {children}
    </Alert>
  );
}
