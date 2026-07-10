import type { ReactNode } from "react";
import { TableToolbar } from "@/components/table";
import { Body, Caption } from "@/components/ui";

interface QueueHeaderProps {
  title: ReactNode;
  count: number;
  itemLabel?: string;
  children?: ReactNode;
  className?: string;
}

/** The region above a Queue's table — a title and count paired with a slot for QueueFilters/actions, built on Foundation Table's own TableToolbar chrome rather than a second toolbar surface. */
export function QueueHeader({ title, count, itemLabel = "jobs", children, className }: QueueHeaderProps) {
  return (
    <TableToolbar className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <Body size="sm" className="font-medium text-ink-primary">
          {title}
        </Body>
        <Caption className="text-ink-tertiary">
          {count} {itemLabel}
        </Caption>
      </div>
      {children}
    </TableToolbar>
  );
}
