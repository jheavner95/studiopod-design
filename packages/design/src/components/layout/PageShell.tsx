import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  /**
   * Optional fixed decorative backdrop (e.g. a <SystemGrid />). Kept as a
   * slot rather than an import so layout primitives never depend on
   * illustration primitives.
   */
  background?: ReactNode;
}

/** Top-level page wrapper: canvas background, full-height flex column. */
export function PageShell({ children, className, background }: PageShellProps) {
  return (
    <div className={cn("relative flex min-h-screen flex-col bg-canvas", className)}>
      {background ? (
        <div className="pointer-events-none fixed inset-0 z-[var(--z-base)] overflow-hidden">
          {background}
        </div>
      ) : null}
      <div className="relative z-[var(--z-raised)] flex flex-1 flex-col">{children}</div>
    </div>
  );
}
