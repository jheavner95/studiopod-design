import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { StatCard } from "@/components/ui";
import type { HealthMetric } from "../types";

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };

export interface ProductionHealthCardProps {
  metric: HealthMetric;
  className?: string;
}

/** A single health metric, built directly on the MS-1 StatCard primitive. */
export function ProductionHealthCard({ metric, className }: ProductionHealthCardProps) {
  const TrendIcon = metric.trend ? TREND_ICON[metric.trend] : undefined;

  return (
    <StatCard
      value={metric.value}
      label={metric.label}
      description={metric.description}
      trend={
        TrendIcon ? (
          <span className="flex items-center gap-1">
            <TrendIcon className="size-3.5" />
            {metric.trend}
          </span>
        ) : undefined
      }
      className={className}
    />
  );
}
