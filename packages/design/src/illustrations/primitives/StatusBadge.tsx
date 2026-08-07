import type { ReactNode } from "react";
import { Badge } from "@/components/ui";
import type { NodeStatus } from "../types";

const STATUS_TONE: Record<NodeStatus, "neutral" | "accent" | "success" | "warning" | "error"> = {
  idle: "neutral",
  active: "accent",
  processing: "accent",
  complete: "success",
  warning: "warning",
  error: "error",
};

const STATUS_LABEL: Record<NodeStatus, string> = {
  idle: "Idle",
  active: "Active",
  processing: "Processing",
  complete: "Complete",
  warning: "Warning",
  error: "Error",
};

interface StatusBadgeProps {
  status: NodeStatus;
  label?: ReactNode;
  className?: string;
}

/** Maps a workflow status to the existing Badge primitive — no new tone/color logic, just the mapping. */
export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge tone={STATUS_TONE[status]} className={className}>
      {label ?? STATUS_LABEL[status]}
    </Badge>
  );
}
