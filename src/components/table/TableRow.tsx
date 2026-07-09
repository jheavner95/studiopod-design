import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableRowProps {
  children: ReactNode;
  className?: string;
  selected?: boolean;
  /** Adds hover feedback and a pointer cursor — set when the whole row (not just an action inside it) responds to a click. */
  interactive?: boolean;
  /** Receives the native click event so callers can read modifier keys (event.shiftKey) for range selection. */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
}

export function TableRow({ children, className, selected = false, interactive = false, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      aria-selected={selected || undefined}
      className={cn(
        "border-b border-border-subtle last:border-b-0",
        selected && "bg-accent-soft/20",
        interactive &&
          "cursor-pointer transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-canvas-raised",
        className,
      )}
    >
      {children}
    </tr>
  );
}
