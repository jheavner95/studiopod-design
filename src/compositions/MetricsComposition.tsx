import type { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Card, StatCard, Caption } from "@/components/ui";
import { StaggerGroup, StaggerItem, AnimatedCounter } from "@/components/motion";
import { StatusIndicator, type SystemStatus } from "@/components/illustration";

export interface MetricTrend {
  direction: "up" | "down" | "flat";
  value: ReactNode;
}

export interface MetricItem {
  id: string;
  label: ReactNode;
  value: number;
  /** Formats the animated value, e.g. `(v) => Math.round(v) + "%"`. */
  format?: (value: number) => string;
  description?: ReactNode;
  trend?: MetricTrend;
  /** Only used by the "health" variant. */
  status?: SystemStatus;
}

export type MetricsVariant = "stats" | "health";

export interface MetricsCompositionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  metrics: MetricItem[];
  columns?: 2 | 3 | 4;
  /** stats: big animated numbers with trend indicators. health: status-driven operational tiles. */
  variant?: MetricsVariant;
  className?: string;
}

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;
const trendTone = { up: "text-success", down: "text-error", flat: "text-ink-tertiary" } as const;

function TrendIndicator({ trend }: { trend: MetricTrend }) {
  const Icon = trendIcon[trend.direction];
  return (
    <span className={cn("inline-flex items-center gap-1 text-caption font-medium", trendTone[trend.direction])}>
      <Icon className="size-3.5" />
      {trend.value}
    </span>
  );
}

function StatsVariant({ metrics, columns }: { metrics: MetricItem[]; columns: 2 | 3 | 4 }) {
  return (
    <StaggerGroup>
      <CardGrid columns={columns}>
        {metrics.map((metric) => (
          <StaggerItem key={metric.id} className="h-full">
            <StatCard
              value={<AnimatedCounter value={metric.value} format={metric.format} />}
              label={metric.label}
              description={metric.description}
              trend={metric.trend ? <TrendIndicator trend={metric.trend} /> : undefined}
            />
          </StaggerItem>
        ))}
      </CardGrid>
    </StaggerGroup>
  );
}

function HealthVariant({ metrics, columns }: { metrics: MetricItem[]; columns: 2 | 3 | 4 }) {
  return (
    <StaggerGroup>
      <CardGrid columns={columns}>
        {metrics.map((metric) => (
          <StaggerItem key={metric.id} className="h-full">
            <Card className="flex h-full flex-col gap-3">
              <StatusIndicator status={metric.status ?? "idle"} label={metric.label} />
              <span className="text-display-2 font-semibold text-ink-primary">
                <AnimatedCounter value={metric.value} format={metric.format} />
              </span>
              {metric.description ? <Caption>{metric.description}</Caption> : null}
            </Card>
          </StaggerItem>
        ))}
      </CardGrid>
    </StaggerGroup>
  );
}

/** Statistics with animated counters, or an operational health dashboard — both driven by the same metric data shape. */
export function MetricsComposition({
  eyebrow,
  title,
  description,
  metrics,
  columns = 3,
  variant = "stats",
  className,
}: MetricsCompositionProps) {
  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} description={description} /> : null}
        {variant === "health" ? (
          <HealthVariant metrics={metrics} columns={columns} />
        ) : (
          <StatsVariant metrics={metrics} columns={columns} />
        )}
      </div>
    </SectionShell>
  );
}
