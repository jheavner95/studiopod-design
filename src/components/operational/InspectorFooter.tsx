import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InspectorFooterProps {
  /** Typically an InspectorActions row. */
  children: ReactNode;
  className?: string;
}

/** A sticky footer pinning actions to the bottom of the panel regardless of scroll — matching the Inspector Workspace's own "Sticky actions" responsive guidance. */
export function InspectorFooter({ children, className }: InspectorFooterProps) {
  return <div className={cn("sticky bottom-0 border-t border-border-subtle bg-surface px-6 py-4", className)}>{children}</div>;
}
