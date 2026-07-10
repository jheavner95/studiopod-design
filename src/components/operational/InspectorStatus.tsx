import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusIndicator, type SystemStatus } from "@/components/feedback";

export interface InspectorStatusItem {
  label: ReactNode;
  status: SystemStatus;
}

interface InspectorStatusProps {
  items: InspectorStatusItem[];
  className?: string;
}

/**
 * Read-only operational awareness for the selected object — Sync Status,
 * Publishing Status, Generation Status, Provider Status can all appear at
 * once, each its own row. Composes Foundation Feedback's StatusIndicator
 * (which itself re-exports the illustration engine's dot+label primitive)
 * rather than a third status-dot implementation.
 */
export function InspectorStatus({ items, className }: InspectorStatusProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-3">
          <span className="text-body-sm text-ink-secondary">{item.label}</span>
          <StatusIndicator status={item.status} />
        </div>
      ))}
    </div>
  );
}
