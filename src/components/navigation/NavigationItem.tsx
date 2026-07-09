"use client";

import { createContext, useContext, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/overlay";

/** Cascades collapsed/icon-only mode from SideNavigation or NavigationRail down to every NavigationItem and NavigationGroup inside, the same way TableDensityContext saves Table's cells from threading a density prop by hand. */
const NavigationCollapsedContext = createContext(false);

export function useNavigationCollapsed(): boolean {
  return useContext(NavigationCollapsedContext);
}

export { NavigationCollapsedContext };

export interface NavigationItemProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  icon?: ReactNode;
  /** Marks this as the current destination — renders aria-current="page". */
  active?: boolean;
  disabled?: boolean;
  /** Icon-only mode for a collapsed rail/sidebar — defaults to the nearest SideNavigation/NavigationRail's own collapsed state, only pass this to override it locally. Wraps in a Tooltip using `tooltip` (or `children`, if it's plain text) so the label isn't lost. */
  collapsed?: boolean;
  tooltip?: string;
  badge?: ReactNode;
  /** Indentation depth — used by grouped and tree navigation, 0 by default. */
  level?: number;
  className?: string;
}

const BASE =
  "focus-ring flex w-full items-center gap-2 rounded-md px-3 py-2 text-body-sm font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

/** The single leaf item every navigation composite in this family renders — SideNavigation, TopNavigation, NavigationRail, TreeNavigation, ContextNavigation all compose this instead of hand-rolling their own link/button styling. */
export function NavigationItem({
  children,
  href,
  onClick,
  icon,
  active = false,
  disabled = false,
  collapsed,
  tooltip,
  badge,
  level = 0,
  className,
}: NavigationItemProps) {
  const contextCollapsed = useNavigationCollapsed();
  const isCollapsed = collapsed ?? contextCollapsed;

  const content = (
    <>
      {icon ? (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      ) : null}
      {!isCollapsed ? <span className="min-w-0 flex-1 truncate text-left">{children}</span> : null}
      {!isCollapsed && badge ? <span className="shrink-0">{badge}</span> : null}
    </>
  );

  const sharedClassName = cn(
    BASE,
    active ? "bg-accent-soft/30 text-accent-300" : "text-ink-tertiary hover:bg-surface-hover hover:text-ink-primary",
    disabled && "pointer-events-none opacity-40",
    isCollapsed && "justify-center px-2",
    className,
  );

  const style = level > 0 ? { paddingLeft: `${12 + level * 16}px` } : undefined;

  const element =
    href && !disabled ? (
      <Link href={href} aria-current={active ? "page" : undefined} className={sharedClassName} style={style}>
        {content}
      </Link>
    ) : (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-current={active ? "page" : undefined}
        className={sharedClassName}
        style={style}
      >
        {content}
      </button>
    );

  const tooltipLabel = tooltip ?? (typeof children === "string" ? children : undefined);
  if (isCollapsed && tooltipLabel) {
    return <Tooltip label={tooltipLabel}>{element}</Tooltip>;
  }
  return element;
}
