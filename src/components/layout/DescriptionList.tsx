import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DescriptionListItem {
  label: ReactNode;
  value: ReactNode;
}

export type DescriptionListLayout = "stacked" | "responsive" | "two-column";

interface DescriptionListProps {
  items: DescriptionListItem[];
  className?: string;
  layout?: DescriptionListLayout;
  /** Wraps the list in the same rounded-border card every DS-1.x Accessibility section already uses — turn off to embed the bare <dl> inside a container of your own. */
  bordered?: boolean;
}

const ROW_GRID: Record<DescriptionListLayout, string> = {
  stacked: "grid-cols-1",
  "two-column": "grid-cols-[auto_minmax(0,1fr)]",
  responsive: "grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)]",
};

/**
 * DS-6.2 — label/value rows built on `grid-template-columns: auto
 * minmax(0,1fr)` rather than a fixed-width label column: the label track
 * sizes to its own content, capped per breakpoint by a max-width on `dt`
 * itself (110px on tablet, 220px from lg up) so a short label like
 * "Status" never drags a wide column behind it and a long label wraps
 * within its own cap instead of pushing the value column to near-zero —
 * the exact "label starvation" and desktop-squeeze failures the prior
 * fixed `sm:w-56` column produced. "stacked" always stacks; "two-column"
 * always sits side-by-side (no mobile stack); "responsive" (default)
 * stacks below sm: and goes side-by-side from sm: up. `value` accepts any
 * ReactNode — code, links, badges, or a caller-composed flex-wrap list —
 * `dd` itself stays a plain block so inline content wraps naturally.
 */
export function DescriptionList({ items, className, layout = "responsive", bordered = true }: DescriptionListProps) {
  const list = (
    <dl className={cn("flex flex-col", !bordered && className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "grid gap-x-6 gap-y-1 py-4 first:pt-0",
            ROW_GRID[layout],
            index < items.length - 1 && "border-b border-border-subtle",
          )}
        >
          <dt
            className={cn(
              "min-w-0 text-body-sm text-ink-secondary",
              layout !== "stacked" && "sm:max-w-[110px] lg:max-w-[220px]",
            )}
          >
            {item.label}
          </dt>
          <dd className="min-w-0 break-words text-body-sm font-medium text-ink-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );

  if (!bordered) return list;

  return <div className={cn("rounded-lg border border-border-subtle bg-surface p-4 sm:p-6", className)}>{list}</div>;
}
