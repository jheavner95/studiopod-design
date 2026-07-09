import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
  /** Keeps the header pinned to the top of its ScrollArea while rows scroll beneath it — on by default, matching every hand-rolled table in this design system today. */
  sticky?: boolean;
}

export function TableHeader({ children, className, sticky = true }: TableHeaderProps) {
  return <thead className={cn("border-b border-border", sticky && "sticky top-0 z-10 bg-surface", className)}>{children}</thead>;
}
