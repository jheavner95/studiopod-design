import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { renderMetricTrend, type MetricTrendDirection } from "./MetricCard";

interface TrendWidgetProps {
  title: ReactNode;
  value: ReactNode;
  /** Oldest-first; rendered as a lightweight sparkline. */
  series: number[];
  trendValue?: ReactNode;
  trendDirection?: MetricTrendDirection;
  className?: string;
}

function toSparklinePoints(series: number[]): string {
  if (series.length === 0) return "";
  if (series.length === 1) return `0,16 100,16`;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = 32 - ((point - min) / range) * 32;
      return `${x},${y}`;
    })
    .join(" ");
}

/**
 * A headline value plus a lightweight trend line — no charting/sparkline
 * primitive exists anywhere in the codebase, so the line itself is a
 * genuinely new, minimal inline SVG polyline (no charting library in this
 * project). The SVG is decorative (aria-hidden): the headline value and
 * trend chip carry the same information as text, so the visual alone never
 * carries meaning a screen reader would miss.
 */
export function TrendWidget({ title, value, series, trendValue, trendDirection, className }: TrendWidgetProps) {
  return (
    <Panel className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{title}</span>
          {renderMetricTrend(trendValue, trendDirection)}
        </div>
        <span className="text-display-2 font-semibold text-ink-primary">{value}</span>
        <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-8 w-full text-accent-400" aria-hidden>
          <polyline points={toSparklinePoints(series)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Panel>
  );
}
