"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NavigationItem, NavigationCollapsedContext } from "./NavigationItem";

export interface NavigationRailItemDef {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  /** For a plain rail (scrollSpy off) — the destination this item links to. */
  href?: string;
}

interface NavigationRailProps {
  items: NavigationRailItemDef[];
  orientation?: "vertical" | "horizontal";
  /** Icon-only mode — cascades to every NavigationItem inside via context. */
  collapsed?: boolean;
  /** Highlights whichever item's matching in-page #id section is currently in view and scrolls to it on click — generalizes the scroll-spy pattern already hand-built once for src/app/design-system/_components/PlaygroundNav.tsx. */
  scrollSpy?: boolean;
  /**
   * DS-5E: which item counts as current when scrollSpy is off — a plain href-based
   * rail otherwise never marked anything active (no aria-current, no visual state)
   * since it had no way to know which destination the caller is already on. Ignored
   * when scrollSpy is true, since the observer owns activeId in that mode.
   */
  activeId?: string;
  "aria-label"?: string;
  className?: string;
}

/** An in-page anchor nav that highlights the section currently in view while scrolling (Vertical rail or Horizontal scroll-spy bar), or a plain compact icon rail when scrollSpy is off. */
export function NavigationRail({
  items,
  orientation = "vertical",
  collapsed = false,
  scrollSpy = false,
  activeId: controlledActiveId,
  "aria-label": ariaLabel = "Section",
  className,
}: NavigationRailProps) {
  const [scrollSpyActiveId, setScrollSpyActiveId] = useState<string | undefined>(items[0]?.id);
  const activeId = scrollSpy ? scrollSpyActiveId : controlledActiveId;

  useEffect(() => {
    if (!scrollSpy) return;
    const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setScrollSpyActiveId(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollSpy, items]);

  return (
    <NavigationCollapsedContext.Provider value={collapsed}>
      <nav aria-label={ariaLabel} className={cn("flex gap-1", orientation === "vertical" ? "flex-col" : "flex-row items-center", className)}>
        {items.map((item) => (
          <NavigationItem
            key={item.id}
            href={scrollSpy ? `#${item.id}` : item.href}
            icon={item.icon}
            badge={item.badge}
            active={item.id === activeId}
          >
            {item.label}
          </NavigationItem>
        ))}
      </nav>
    </NavigationCollapsedContext.Provider>
  );
}
