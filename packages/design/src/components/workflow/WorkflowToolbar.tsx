import type { ReactNode } from "react";
import { Inline } from "@/components/layout";
import { cn } from "@/lib/utils";

interface WorkflowToolbarProps {
  /** Button elements — canvas-level actions (Refresh, Export, Filter), never a single node's own actions. */
  children: ReactNode;
  className?: string;
}

/**
 * A row of canvas-level actions, positioned above WorkflowViewport — built
 * on Foundation Layout's own Inline directly, the same primitive
 * Operational Inspector Panel's own InspectorActions already uses.
 * Deliberately not a reuse of InspectorActions/WorkflowActions: those are
 * explicitly scoped to "object-level actions only... never bulk/
 * workspace-wide ones" (InspectorActions' own doc comment), while
 * WorkflowToolbar is exactly that workspace-wide row for the whole canvas
 * — Refresh the graph, Export the diagram — not actions on any one
 * selected node. No generic Toolbar primitive exists in Foundation to
 * reuse instead: the only "toolbar" components in the repo (TableToolbar,
 * DataGridToolbar, AssetBrowserToolbar) are all table/asset-scoped.
 */
export function WorkflowToolbar({ children, className }: WorkflowToolbarProps) {
  return (
    <Inline gap="sm" justify="end" className={cn("border-b border-border-subtle pb-3", className)}>
      {children}
    </Inline>
  );
}
