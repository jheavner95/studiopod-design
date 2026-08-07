import { cn } from "@/lib/utils";
import { ProductionHealthCard } from "./ProductionHealthCard";
import type { HealthMetric } from "../types";

export interface HealthDashboardDiagramProps {
  metrics: HealthMetric[];
  className?: string;
}

/** A responsive grid of health metrics, e.g. Jobs, Queue, Errors, Warnings, Completed, Average Time, Health Score. */
export function HealthDashboardDiagram({ metrics, className }: HealthDashboardDiagramProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {metrics.map((metric) => (
        <ProductionHealthCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
