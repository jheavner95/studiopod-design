import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  trend?: ReactNode;
  className?: string;
}

/** Large metric + supporting label, for dashboards-in-marketing-copy moments. */
export function StatCard({ value, label, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2", className)}>
      <span className="text-display-2 font-semibold text-ink-primary">{value}</span>
      <span className="text-body-sm font-medium text-ink-secondary">{label}</span>
      {description ? <span className="text-caption text-ink-tertiary">{description}</span> : null}
      {trend ? <span className="text-caption text-success">{trend}</span> : null}
    </Card>
  );
}
