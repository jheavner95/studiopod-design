import type { ReactNode } from "react";
import { Grid } from "@/components/layout";
import { StatCard } from "@/components/ui";

export interface StatGroupItem {
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  trend?: ReactNode;
}

interface StatGroupProps {
  items: StatGroupItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/** Arranges existing StatCards in a Grid — reuses the foundation StatCard atom directly rather than reimplementing a metric display. */
export function StatGroup({ items, columns = 3, className }: StatGroupProps) {
  return (
    <Grid columns={columns} gap="sm" className={className}>
      {items.map((item, index) => (
        <StatCard key={index} value={item.value} label={item.label} description={item.description} trend={item.trend} />
      ))}
    </Grid>
  );
}
