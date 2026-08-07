import type { ReactNode } from "react";
import { Alert, type FeedbackTone } from "@/components/feedback";

interface BulkResultsProps {
  succeeded: number;
  failed: number;
  itemLabel?: string;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** The aggregate outcome of a finished bulk operation — a thin preset over Foundation Feedback's own Alert (tone/icon/role="alert" vs role="status" already solved there), not a second banner implementation. */
export function BulkResults({ succeeded, failed, itemLabel = "items", action, onDismiss, className }: BulkResultsProps) {
  const tone: FeedbackTone = failed === 0 ? "success" : succeeded === 0 ? "error" : "warning";
  const title =
    failed === 0
      ? `${succeeded} ${itemLabel} updated successfully`
      : succeeded === 0
        ? `${failed} ${itemLabel} failed`
        : `${succeeded} succeeded, ${failed} failed`;

  return (
    <Alert tone={tone} title={title} action={action} onDismiss={onDismiss} className={className}>
      {failed > 0 ? "See the list below for what went wrong and why." : "No further action needed."}
    </Alert>
  );
}
