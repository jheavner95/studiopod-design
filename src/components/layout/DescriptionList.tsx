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
  /** Overrides the label column's width class at sm: and up. Default (sm:w-56) matches every existing Accessibility-block usage; a couple of pages with shorter labels (e.g. a certification-level name) use a narrower column instead. */
  labelWidth?: string;
}

/**
 * Label/value rows — generalizes the dl/dt/dd pattern hand-rolled
 * identically across every DS-1.x page's own Accessibility section since
 * DS-1.2 (see the Promotion Candidates section on this page for the
 * exact count). "responsive" stacks on mobile and goes side-by-side from
 * sm: up; "stacked" always stacks; "two-column" always sits side-by-side.
 */
export function DescriptionList({ items, className, layout = "responsive", bordered = true, labelWidth = "sm:w-56" }: DescriptionListProps) {
  const rowDirection = layout === "stacked" ? "flex-col" : layout === "two-column" ? "flex-row" : "flex-col sm:flex-row";

  const list = (
    <dl className={cn("flex flex-col", !bordered && className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex gap-1.5 py-4 first:pt-0",
            rowDirection,
            layout !== "stacked" && "sm:gap-6",
            index < items.length - 1 && "border-b border-border-subtle",
          )}
        >
          <dt className={cn("w-full shrink-0 text-body-sm font-medium text-ink-primary", labelWidth)}>{item.label}</dt>
          <dd className="min-w-0 break-words text-body-sm text-ink-secondary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );

  if (!bordered) return list;

  return <div className={cn("rounded-lg border border-border-subtle bg-surface p-4 sm:p-6", className)}>{list}</div>;
}
