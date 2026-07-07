import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PulseStatus, type PulseTone } from "@/components/motion/PulseStatus";

export type SystemStatus = "idle" | "active" | "success" | "warning" | "error";

const statusConfig: Record<SystemStatus, { tone: PulseTone; label: string; pulse: boolean }> = {
  idle: { tone: "neutral", label: "Idle", pulse: false },
  active: { tone: "accent", label: "Active", pulse: true },
  success: { tone: "success", label: "Complete", pulse: false },
  warning: { tone: "warning", label: "Attention", pulse: true },
  error: { tone: "error", label: "Failed", pulse: false },
};

interface StatusIndicatorProps {
  status: SystemStatus;
  label?: ReactNode;
  className?: string;
}

/** Dot + label. The dot pulses only for statuses that represent live/in-progress work. */
export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <PulseStatus tone={config.tone} active={config.pulse} size="sm" />
      <span className="text-caption text-ink-secondary">{label ?? config.label}</span>
    </div>
  );
}
