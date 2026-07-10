import type { ReactNode } from "react";
import { Surface, ScrollArea } from "@/components/layout";
import { cn } from "@/lib/utils";

interface WorkflowSidebarProps {
  header?: ReactNode;
  children: ReactNode;
  /** Shrinks to an icon-only rail — the caller owns the toggle (a WorkflowActions button), this component only renders the collapsed width, not the open/close state itself. */
  collapsed?: boolean;
  className?: string;
}

/**
 * Contextual detail alongside the main workflow content — summary stats,
 * related items, a mini activity feed. Built on Foundation Layout's Surface
 * + ScrollArea directly, the same construction Inspector Panel's own
 * InspectorPanel uses for its own chrome, since no existing sidebar
 * component fits: Foundation Navigation's SideNavigation is nav-item-scoped
 * (real <nav> semantics around NavigationItem children), not a generic
 * content shell. Hidden below lg — a workflow's sidebar content is
 * secondary, not required to operate the workflow on a narrow screen.
 */
export function WorkflowSidebar({ header, children, collapsed = false, className }: WorkflowSidebarProps) {
  return (
    <Surface
      border
      elevation="none"
      className={cn("hidden shrink-0 flex-col overflow-hidden border-l lg:flex", collapsed ? "w-14" : "w-72", className)}
    >
      {header ? <div className={cn("border-b border-border-subtle px-4 py-3", collapsed && "px-2")}>{header}</div> : null}
      <ScrollArea direction="vertical" className="flex-1">
        <div className={cn("flex flex-col gap-4 p-4", collapsed && "items-center p-2")}>{children}</div>
      </ScrollArea>
    </Surface>
  );
}
