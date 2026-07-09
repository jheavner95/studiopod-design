import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableFooterProps {
  children: ReactNode;
  className?: string;
}

/** For a totals row or pagination controls — rendered outside the scrolling body's row count so it never counts against a fixed max-height ScrollArea. */
export function TableFooter({ children, className }: TableFooterProps) {
  return <tfoot className={cn("border-t border-border bg-canvas-raised", className)}>{children}</tfoot>;
}
