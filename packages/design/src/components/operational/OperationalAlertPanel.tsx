import type { ReactNode } from "react";
import { Alert, type FeedbackTone } from "@/components/feedback";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface OperationalAlertEntry {
  id: string;
  tone: FeedbackTone;
  title: ReactNode;
  message: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
}

interface OperationalAlertPanelProps {
  alerts: OperationalAlertEntry[];
  emptyMessage?: string;
  className?: string;
}

/** Every currently active operational alert, stacked — Foundation Feedback's own boxed, inline Alert (not Banner, which is full-bleed and meant for a single page-level announcement) repeated per entry. */
export function OperationalAlertPanel({ alerts, emptyMessage = "No active alerts", className }: OperationalAlertPanelProps) {
  if (alerts.length === 0) {
    return <Caption className={cn("text-ink-tertiary", className)}>{emptyMessage}</Caption>;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {alerts.map((alert) => (
        <Alert key={alert.id} tone={alert.tone} title={alert.title} action={alert.action} onDismiss={alert.onDismiss}>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
