import type { ReactNode } from "react";
import { Inline } from "@/components/layout";

interface InspectorActionsProps {
  /** Button elements — object-level actions only (Duplicate, Archive, Publish, ...), never bulk/workspace-wide ones. */
  children: ReactNode;
  className?: string;
}

/** A right-aligned row of actions that apply to the one selected object — built on Foundation Layout's Inline directly. */
export function InspectorActions({ children, className }: InspectorActionsProps) {
  return (
    <Inline gap="sm" justify="end" className={className}>
      {children}
    </Inline>
  );
}
