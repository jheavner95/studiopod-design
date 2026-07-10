import type { ReactNode } from "react";
import { InspectorPanel } from "@/components/operational";
import { cn } from "@/lib/utils";

interface WorkflowProps {
  /** A WorkflowHeader element — sticky, rendered above the scrollable body. */
  header: ReactNode;
  /** A WorkflowSidebar element — rendered alongside the main content, hidden below lg. */
  sidebar?: ReactNode;
  /** WorkflowStage/WorkflowStageGroup content. */
  children?: ReactNode;
  /** A WorkflowFooter element — sticky, rendered below the scrollable body. */
  footer?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  /** Rendered in place of children when there's no active workflow — a full node, not a description string, since "Nothing selected" isn't the right default copy for a workflow. */
  emptyState?: ReactNode;
  className?: string;
}

/**
 * The root workflow shell. Composes Operational Inspector Panel's own
 * InspectorPanel directly for the header/scrollable-body/footer/loading
 * chrome — all of it domain-agnostic already — rather than re-declaring a
 * second Surface/ScrollArea shell. The only genuinely new structure here is
 * the two-column layout wrapper and the WorkflowSidebar slot, since
 * InspectorPanel itself has no sidebar concept.
 */
export function Workflow({ header, sidebar, children, footer, loading, loadingLabel, emptyState, className }: WorkflowProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden lg:flex-row", className)}>
      <div className="min-w-0 flex-1">
        <InspectorPanel header={header} footer={footer} loading={loading} loadingLabel={loadingLabel}>
          {emptyState ?? children}
        </InspectorPanel>
      </div>
      {sidebar}
    </div>
  );
}
