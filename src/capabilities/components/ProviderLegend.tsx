import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { CapabilityStatus } from "../types";

const ALL_STATUSES: CapabilityStatus[] = [
  "available",
  "unavailable",
  "healthy",
  "warning",
  "offline",
  "preferred",
  "fallback",
  "deprecated",
];

const STATUS_TONE: Record<CapabilityStatus, "neutral" | "accent" | "success" | "warning" | "error"> = {
  available: "success",
  unavailable: "error",
  healthy: "success",
  warning: "warning",
  offline: "error",
  preferred: "accent",
  fallback: "neutral",
  deprecated: "warning",
};

const STATUS_LABEL: Record<CapabilityStatus, string> = {
  available: "Available",
  unavailable: "Unavailable",
  healthy: "Healthy",
  warning: "Warning",
  offline: "Offline",
  preferred: "Preferred",
  fallback: "Fallback",
  deprecated: "Deprecated",
};

export interface ProviderLegendProps {
  /** When provided, only shows these statuses. Defaults to the full 8-value vocabulary. */
  statuses?: CapabilityStatus[];
  className?: string;
}

/** A legend of the availability, health, and priority states a provider or adapter can be in. */
export function ProviderLegend({ statuses, className }: ProviderLegendProps) {
  const shown = statuses ? ALL_STATUSES.filter((status) => statuses.includes(status)) : ALL_STATUSES;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {shown.map((status) => (
        <Badge key={status} tone={STATUS_TONE[status]} size="sm">
          {STATUS_LABEL[status]}
        </Badge>
      ))}
    </div>
  );
}
