import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NavigationCollapsedContext } from "./NavigationItem";

interface SideNavigationProps {
  /** NavigationSection/NavigationGroup/NavigationItem elements. */
  children: ReactNode;
  /** Icon-only mode — cascades to every NavigationItem/NavigationGroup inside via context. */
  collapsed?: boolean;
  "aria-label"?: string;
  className?: string;
}

/**
 * The primary sidebar for moving between an app's top-level sections — Expanded, Collapsed
 * (icon-only), and With-section-grouping variants, composed from NavigationSection,
 * NavigationGroup, and NavigationItem rather than hand-rolling its own item styling.
 */
export function SideNavigation({ children, collapsed = false, "aria-label": ariaLabel = "Primary", className }: SideNavigationProps) {
  return (
    <NavigationCollapsedContext.Provider value={collapsed}>
      <nav
        aria-label={ariaLabel}
        className={cn(
          "flex h-full flex-col gap-4 overflow-y-auto border-r border-border-subtle bg-surface py-4 transition-[width] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          collapsed ? "w-16 px-2" : "w-64 px-3",
          className,
        )}
      >
        {children}
      </nav>
    </NavigationCollapsedContext.Provider>
  );
}
