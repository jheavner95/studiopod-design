import type { ReactNode } from "react";
import { Inline } from "@/components/layout";
import { cn } from "@/lib/utils";

interface JobActionsProps {
  children: ReactNode;
  className?: string;
}

/** A row of per-job actions — pass Bulk Actions' own BulkActionButton elements (Retry, Cancel, View) as children, the same action-button preset Bulk Actions already established, not a second button row implementation. Used inside a QueueRow's TableActionCell or standalone in a JobCard. */
export function JobActions({ children, className }: JobActionsProps) {
  return (
    <Inline gap="xs" justify="end" wrap={false} className={cn(className)}>
      {children}
    </Inline>
  );
}
