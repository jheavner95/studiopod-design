import type { ReactNode } from "react";
import { Inline } from "@/components/layout";
import { cn } from "@/lib/utils";

interface BulkActionGroupProps {
  children: ReactNode;
  /** Rendered after a divider, visually separated from the primary actions — for destructive or less-common actions. */
  secondary?: ReactNode;
  className?: string;
}

/** A row of BulkActionButtons — Data Grid's own DataGridBulkActions already wraps its children in a plain Inline; this adds the primary/secondary divider a fuller bulk-action bar needs without a second layout implementation. */
export function BulkActionGroup({ children, secondary, className }: BulkActionGroupProps) {
  return (
    <Inline gap="sm" className={cn(className)}>
      {children}
      {secondary ? (
        <>
          <span className="h-5 w-px bg-border" aria-hidden />
          <Inline gap="sm">{secondary}</Inline>
        </>
      ) : null}
    </Inline>
  );
}
