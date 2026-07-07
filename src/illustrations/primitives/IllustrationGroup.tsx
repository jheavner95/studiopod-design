"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Expand } from "@/motion";
import { Caption } from "@/components/ui";
import type { DiagramGroup } from "../types";

export interface IllustrationGroupProps {
  group: DiagramGroup;
  /** The group's nodes, already rendered and positioned by the caller. */
  children: ReactNode;
  onToggleCollapsed?: (id: string, collapsed: boolean) => void;
  className?: string;
}

/** A bounding region for a cluster of nodes — title, description, badge, metrics, and collapse/expand built on the Expand primitive. */
export function IllustrationGroup({ group, children, onToggleCollapsed, className }: IllustrationGroupProps) {
  const collapsed = group.collapsed ?? false;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border p-4",
        group.focused ? "border-accent-500 bg-accent-soft/20" : "border-border-subtle bg-surface/60",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-body-sm font-medium text-ink-primary">{group.title}</span>
            {group.badge}
          </div>
          {group.description ? <Caption>{group.description}</Caption> : null}
        </div>
        {onToggleCollapsed ? (
          <button
            type="button"
            onClick={() => onToggleCollapsed(group.id, !collapsed)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? `Expand ${group.title}` : `Collapse ${group.title}`}
            className="focus-ring flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-ink-tertiary hover:text-ink-primary"
          >
            <ChevronDown className={cn("size-3.5 transition-transform", collapsed && "-rotate-90")} />
          </button>
        ) : null}
      </div>

      {group.metrics && group.metrics.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {group.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-body-sm font-semibold text-ink-primary">{metric.value}</span>
              <Caption>{metric.label}</Caption>
            </div>
          ))}
        </div>
      ) : null}

      <Expand open={!collapsed} duration="fast">
        {children}
      </Expand>
    </div>
  );
}
