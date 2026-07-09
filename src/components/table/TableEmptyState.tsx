import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";

interface TableEmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  /** Pass the table's real column count so the cell spans the full width. */
  colSpan: number;
  className?: string;
}

/** A full-width row replacing the table body — covers empty, no-results, error, and offline states alike; only the title/description/action content changes between them. */
export function TableEmptyState({ title, description, action, colSpan, className }: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn("px-6 py-12 text-center", className)}>
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
