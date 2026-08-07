import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";
import { type ControlSize } from "@/lib/control-size";

interface TableEmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  /** Pass the table's real column count so the cell spans the full width. */
  colSpan: number;
  /**
   * DS-5P — the shared `ControlSize` density. This row's *type* is already
   * dense at both steps (a `text-body-sm` title, not a Heading — a table body
   * is an operational surface), so `size` scales the cell padding only:
   * `md` (default) keeps `py-12`, `sm` tightens to `py-6` for compact tables.
   */
  size?: ControlSize;
  className?: string;
}

/** A full-width row replacing the table body — covers empty, no-results, error, and offline states alike; only the title/description/action content changes between them. */
export function TableEmptyState({ title, description, action, colSpan, size = "md", className }: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn("px-6 text-center", size === "sm" ? "py-6" : "py-12", className)}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-body-sm font-medium text-ink-primary">{title}</span>
          {description ? (
            <Body size="sm" muted className="max-w-sm">
              {description}
            </Body>
          ) : null}
          {action}
        </div>
      </td>
    </tr>
  );
}
