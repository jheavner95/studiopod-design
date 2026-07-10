import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface, ScrollArea } from "@/components/layout";
import { LoadingState, EmptyState } from "@/components/feedback";

export interface InspectorPanelProps {
  /** An InspectorHeader element — sticky, rendered above the scroll area. */
  header: ReactNode;
  /** An InspectorTabs element — not sticky (only Header is, per the Inspector Workspace's own guidance). */
  tabs?: ReactNode;
  /** Sections/Groups/Properties/Validation/Status/History content — omit when tabs already owns all of the panel's content via TabPanels. */
  children?: ReactNode;
  /** An InspectorFooter element — sticky, rendered below the scroll area. */
  footer?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  /** Rendered in place of children when there's nothing selected — omit to render children normally. */
  emptyState?: ReactNode;
  maxHeight?: string;
  className?: string;
}

/**
 * The canonical StudioPOD Inspector Panel — the standard inspector shell
 * used across every StudioPOD platform. Composes Foundation Layout
 * (Surface, ScrollArea) and Foundation Feedback (LoadingState, EmptyState)
 * for its own chrome; Header/Tabs/Sections/etc. are separate components
 * this panel arranges rather than rendering itself.
 */
export function InspectorPanel({ header, tabs, children, footer, loading = false, loadingLabel, emptyState, maxHeight, className }: InspectorPanelProps) {
  return (
    <Surface border elevation="panel" className={cn("flex h-full flex-col overflow-hidden", className)}>
      {header}
      {tabs}
      <ScrollArea direction="vertical" maxHeight={maxHeight} className="flex-1">
        <div className="flex flex-col gap-6 p-6">
          {loading ? <LoadingState label={loadingLabel} /> : emptyState ? <EmptyState title="Nothing selected" description={emptyState} /> : children}
        </div>
      </ScrollArea>
      {footer}
    </Surface>
  );
}
