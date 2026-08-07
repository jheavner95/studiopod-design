import type { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { StatCard } from "@/components/ui";
import { cn } from "@/lib/utils";

export type MetricTrendDirection = "up" | "down" | "flat";

interface MetricCardProps {
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  trendValue?: ReactNode;
  trendDirection?: MetricTrendDirection;
  className?: string;
}

const TREND_ICON: Record<MetricTrendDirection, typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const TREND_TONE: Record<MetricTrendDirection, string> = {
  up: "text-success",
  down: "text-error",
  flat: "text-ink-tertiary",
};

/**
 * Renders a tone-and-icon trend chip for the `trend` slot StatCard/StatGroup
 * already expose. No trend-direction/tone vocabulary exists anywhere in the
 * codebase today (StatCard's own `trend` prop is a bare ReactNode styled a
 * flat success green) — this is genuinely new, shared by MetricCard,
 * KPIWidget, and TrendWidget rather than reimplemented three times.
 */
export function renderMetricTrend(trendValue: ReactNode, trendDirection?: MetricTrendDirection) {
  if (!trendValue || !trendDirection) return undefined;
  const TrendIcon = TREND_ICON[trendDirection];
  return (
    <span className={cn("inline-flex items-center gap-1", TREND_TONE[trendDirection])}>
      <TrendIcon className="size-3.5" aria-hidden />
      {trendValue}
    </span>
  );
}

/** The atomic dashboard tile — a thin extension of Foundation UI's own StatCard, adding an optional corner icon and a tone-aware trend (StatCard's `trend` slot is otherwise a flat success-green ReactNode). KPIWidget composes several of these via StatGroup; use MetricCard directly for a single standalone tile. */
export function MetricCard({ value, label, description, icon, trendValue, trendDirection, className }: MetricCardProps) {
  return (
    <div className={cn("relative", className)}>
      {icon ? (
        <span className="absolute right-4 top-4 text-ink-tertiary" aria-hidden>
          {icon}
        </span>
      ) : null}
      <StatCard value={value} label={label} description={description} trend={renderMetricTrend(trendValue, trendDirection)} />
    </div>
  );
}
