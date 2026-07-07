import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ProductionStatus, ValidationSeverity } from "../types";

const ALL_STATUSES: ProductionStatus[] = [
  "pending",
  "running",
  "passed",
  "warning",
  "failed",
  "blocked",
  "completed",
  "archived",
];

const STATUS_TONE: Record<ProductionStatus, "neutral" | "accent" | "success" | "warning" | "error"> = {
  pending: "neutral",
  running: "accent",
  passed: "success",
  warning: "warning",
  failed: "error",
  blocked: "error",
  completed: "success",
  archived: "neutral",
};

const STATUS_LABEL: Record<ProductionStatus, string> = {
  pending: "Pending",
  running: "Running",
  passed: "Passed",
  warning: "Warning",
  failed: "Failed",
  blocked: "Blocked",
  completed: "Completed",
  archived: "Archived",
};

const ALL_SEVERITIES: ValidationSeverity[] = ["info", "warning", "error", "critical"];

const SEVERITY_TONE: Record<ValidationSeverity, "neutral" | "warning" | "error"> = {
  info: "neutral",
  warning: "warning",
  error: "error",
  critical: "error",
};

export interface ValidationLegendProps {
  /** When provided, only shows statuses/severities actually used across these statuses/severities. */
  statuses?: ProductionStatus[];
  severities?: ValidationSeverity[];
  className?: string;
}

/** A legend of this library's own 8-value status vocabulary and 4-value severity scale. */
export function ValidationLegend({ statuses, severities, className }: ValidationLegendProps) {
  const shownStatuses = statuses
    ? ALL_STATUSES.filter((status) => statuses.includes(status))
    : ALL_STATUSES;
  const shownSeverities = severities
    ? ALL_SEVERITIES.filter((severity) => severities.includes(severity))
    : ALL_SEVERITIES;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2">
        {shownStatuses.map((status) => (
          <Badge key={status} tone={STATUS_TONE[status]} size="sm">
            {STATUS_LABEL[status]}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {shownSeverities.map((severity) => (
          <Badge key={severity} tone={SEVERITY_TONE[severity]} size="sm">
            {severity}
          </Badge>
        ))}
      </div>
    </div>
  );
}
