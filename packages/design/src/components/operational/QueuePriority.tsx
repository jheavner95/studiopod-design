import { Badge } from "@/components/ui";

export type QueuePriorityValue = "low" | "normal" | "high" | "urgent";

const PRIORITY_TONE: Record<QueuePriorityValue, "neutral" | "accent" | "warning" | "error"> = {
  low: "neutral",
  normal: "accent",
  high: "warning",
  urgent: "error",
};

const PRIORITY_LABEL: Record<QueuePriorityValue, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

interface QueuePriorityProps {
  value: QueuePriorityValue;
  className?: string;
}

/** A job's queue priority — a thin preset over Foundation UI's own Badge, not a second pill implementation. */
export function QueuePriority({ value, className }: QueuePriorityProps) {
  return (
    <Badge tone={PRIORITY_TONE[value]} size="sm" className={className}>
      {PRIORITY_LABEL[value]}
    </Badge>
  );
}
