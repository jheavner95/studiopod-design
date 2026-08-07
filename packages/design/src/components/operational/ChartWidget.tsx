import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { Body } from "@/components/ui";

export interface ChartWidgetDatum {
  label: string;
  value: number;
}

interface ChartWidgetProps {
  title: ReactNode;
  description?: ReactNode;
  data: ChartWidgetDatum[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

const DEFAULT_FORMATTER = (value: number) => String(value);

/**
 * A compact column chart — no charting primitive exists anywhere in the
 * codebase, so the bars are genuinely new, minimal markup rather than a
 * charting-library dependency. Every bar prints its own value label
 * directly (not conveyed by height/color alone), and the whole chart carries
 * a role="img" text alternative summarizing every label/value pair, so a
 * screen reader gets the same data a sighted reader gets from the bars.
 */
export function ChartWidget({ title, description, data, valueFormatter = DEFAULT_FORMATTER, className }: ChartWidgetProps) {
  const max = Math.max(...data.map((datum) => datum.value), 1);
  const summary = data.map((datum) => `${datum.label}: ${valueFormatter(datum.value)}`).join(", ");

  return (
    <Panel
      header={
        <div className="flex flex-col gap-1">
          <span className="text-body-md font-medium text-ink-primary">{title}</span>
          {description ? (
            <Body size="sm" muted>
              {description}
            </Body>
          ) : null}
        </div>
      }
      className={className}
    >
      <div className="flex items-end gap-3" role="img" aria-label={summary}>
        {data.map((datum) => (
          <div key={datum.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-caption text-ink-tertiary">{valueFormatter(datum.value)}</span>
            <div
              className="w-full rounded-t-md bg-accent-500"
              style={{ height: `${Math.max((datum.value / max) * 96, 4)}px` }}
            />
            <span className="text-caption text-ink-tertiary">{datum.label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
