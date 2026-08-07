import type { ReactNode } from "react";
import { Notification } from "@/components/feedback";
import { Button } from "@/components/ui";

interface BulkUndoProps {
  message: ReactNode;
  onUndo: () => void;
  onDismiss?: () => void;
  undoLabel?: string;
  /** Shown alongside the undo action once set — a caller-driven countdown, not a timer this component owns. */
  secondsRemaining?: number;
  className?: string;
}

/** The "Deleted 12 assets. Undo?" affordance after a bulk action — Foundation Feedback's own Notification shell (icon/message/action/dismiss already solved there) rather than a second transient-message implementation. Presentational only; pair with useToast() to show it as a real toast, or render inline. */
export function BulkUndo({ message, onUndo, onDismiss, undoLabel = "Undo", secondsRemaining, className }: BulkUndoProps) {
  return (
    <Notification
      tone="info"
      message={message}
      onDismiss={onDismiss}
      action={
        <Button size="sm" variant="secondary" onClick={onUndo}>
          {undoLabel}
          {secondsRemaining !== undefined ? ` (${secondsRemaining}s)` : ""}
        </Button>
      }
      className={className}
    />
  );
}
