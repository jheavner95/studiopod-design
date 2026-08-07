import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { StatGroup } from "@/components/metadata";
import { renderMetricTrend, type MetricTrendDirection } from "./MetricCard";

export interface KPIWidgetItem {
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  trendValue?: ReactNode;
  trendDirection?: MetricTrendDirection;
}

interface KPIWidgetProps {
  title: ReactNode;
  items: KPIWidgetItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/** A titled group of KPIs — Foundation Layout's Panel chrome around Foundation Metadata's own StatGroup, reusing MetricCard's tone-aware trend renderer for each item rather than StatGroup's own flat-green trend slot. Use MetricCard directly for a single standalone tile; use KPIWidget when several related metrics belong in one dashboard card. */
export function KPIWidget({ title, items, columns = 3, className }: KPIWidgetProps) {
  return (
    <Panel header={<span className="text-body-md font-medium text-ink-primary">{title}</span>} className={className}>
      <StatGroup
        columns={columns}
        items={items.map((item) => ({
          value: item.value,
          label: item.label,
          description: item.description,
          trend: renderMetricTrend(item.trendValue, item.trendDirection),
        }))}
      />
    </Panel>
  );
}
