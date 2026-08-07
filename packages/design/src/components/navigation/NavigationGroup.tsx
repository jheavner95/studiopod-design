import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useNavigationCollapsed } from "./NavigationItem";

interface NavigationGroupProps {
  /** A small caption heading above the group's items — omitted entirely (not just hidden) when collapsed, since there's no room for it. */
  label?: string;
  /** Defaults to the nearest SideNavigation/NavigationRail's own collapsed state. */
  collapsed?: boolean;
  children: ReactNode;
  className?: string;
}

/** A labeled cluster of NavigationItems within a NavigationSection — the "With section grouping" variant of SideNavigation is built from one or more of these. */
export function NavigationGroup({ label, collapsed, children, className }: NavigationGroupProps) {
  const contextCollapsed = useNavigationCollapsed();
  const isCollapsed = collapsed ?? contextCollapsed;

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && !isCollapsed ? <span className="px-3 py-1.5 text-metadata text-ink-tertiary">{label}</span> : null}
      {children}
    </div>
  );
}
