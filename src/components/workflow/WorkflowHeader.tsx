import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IdentityBlock } from "@/components/metadata";

interface WorkflowHeaderProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  /** Typically a WorkflowStatus and/or WorkflowProgress element. */
  children?: ReactNode;
  className?: string;
}

/**
 * "What workflow is this, and where does it stand" — icon, name, type, plus
 * a slot for status/progress. Composes Foundation Metadata's IdentityBlock
 * directly, the same construction Operational Inspector Panel's own
 * InspectorHeader already uses, rather than re-declaring that icon/name/type
 * layout. Extends it with a children slot InspectorHeader doesn't need,
 * since a workflow header also carries live status/progress InspectorHeader
 * has no equivalent for.
 */
export function WorkflowHeader({ icon, name, type, children, className }: WorkflowHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-10 flex flex-col gap-3 border-b border-border-subtle bg-surface px-6 py-4", className)}>
      <IdentityBlock icon={icon} name={name} type={type} />
      {children ? <div className="flex flex-wrap items-center gap-4">{children}</div> : null}
    </div>
  );
}
