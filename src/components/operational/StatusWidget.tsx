import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { HealthIndicator, type HealthStatusValue } from "./HealthIndicator";

export interface StatusWidgetItem {
  id: string;
  label: ReactNode;
  status: HealthStatusValue;
}

interface StatusWidgetProps {
  title: ReactNode;
  items: StatusWidgetItem[];
  className?: string;
}

/** A compact multi-item status list — one row per system/service, each rendered with Status & Health's own HealthIndicator rather than a new status vocabulary. For a single subject's fuller health picture (score, issues, recommendations), use HealthWidget instead. */
export function StatusWidget({ title, items, className }: StatusWidgetProps) {
  return (
    <Panel header={<span className="text-body-md font-medium text-ink-primary">{title}</span>} className={className}>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3">
            <span className="text-body-sm text-ink-primary">{item.label}</span>
            <HealthIndicator value={item.status} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
