import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetadataValueProps {
  children?: ReactNode;
  className?: string;
  /** Rendered when there's genuinely no value — an explicit "—" reads as "known to be empty," not as a loading bug. */
  emptyFallback?: ReactNode;
}

/** The value half of a metadata pairing. Wraps rather than truncates by default — see the Foundation Table's own Cell Types guidance for when truncation is the right call instead. */
export function MetadataValue({ children, className, emptyFallback = "—" }: MetadataValueProps) {
  const isEmpty = children === undefined || children === null || children === "";
  return (
    <span className={cn("min-w-0 break-words text-body-sm", isEmpty ? "text-ink-tertiary" : "text-ink-secondary", className)}>
      {isEmpty ? emptyFallback : children}
    </span>
  );
}
