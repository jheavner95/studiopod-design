import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./NavigationItem";

export interface TopNavigationItemDef {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

interface TopNavigationProps {
  /** Logo + product name slot. */
  brand: ReactNode;
  items: TopNavigationItemDef[];
  /** The current route's href — pass the caller's own router pathname; this component doesn't assume a router. */
  activeHref?: string;
  /** Right-aligned slot — a CommandNavigation trigger, account menu, theme toggle, etc. */
  trailing?: ReactNode;
  sticky?: boolean;
  className?: string;
}

/**
 * The persistent, app-wide top bar — generalizes the exact shape already proven by this
 * design system's own GlobalNav (src/components/layout/GlobalNav.tsx), so a future app-level
 * top bar doesn't hand-roll the same sticky/backdrop-blur/horizontal-scroll link row again.
 */
export function TopNavigation({ brand, items, activeHref, trailing, sticky = true, className }: TopNavigationProps) {
  return (
    <header className={cn(sticky && "sticky top-0 z-[var(--z-sticky)]", "border-b border-border-subtle bg-canvas/80 backdrop-blur-md", className)}>
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center gap-6 overflow-x-auto px-[var(--spacing-gutter)] py-3">
        <div className="flex shrink-0 items-center gap-2">{brand}</div>
        <nav className="flex shrink-0 items-center gap-5" aria-label="Primary">
          {items.map((item) => (
            <NavigationItem
              key={item.id}
              href={item.href}
              active={item.href === activeHref}
              icon={item.icon}
              badge={item.badge}
              className="w-auto gap-0 rounded-none bg-transparent p-0 text-caption font-medium hover:bg-transparent"
            >
              {item.label}
            </NavigationItem>
          ))}
        </nav>
        {trailing ? <div className="ml-auto flex shrink-0 items-center gap-3">{trailing}</div> : null}
      </div>
    </header>
  );
}
