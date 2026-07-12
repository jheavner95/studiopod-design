"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavigationGroup, NavigationItem } from "@/components/navigation";
import { Expandable } from "@/components/ui";
import { getGroup, getGroupEntries, type NavGroupId } from "@/lib/design-system-navigation";

interface DocsSidebarGroupProps {
  group: NavGroupId;
  collapsed?: boolean;
}

/**
 * One group's worth of NavigationItems, read straight from the registry —
 * no hand-copied route list. Per DS-7.1 Part 8, groups are independently
 * collapsible (Foundation UI's own Expandable, not a bespoke disclosure
 * widget) rather than always-expanded, so a section with many families
 * doesn't read as the whole sitemap at once — the group containing the
 * current page starts open, every other group starts closed.
 */
export function DocsSidebarGroup({ group, collapsed }: DocsSidebarGroupProps) {
  const pathname = usePathname();
  const groupMeta = getGroup(group);
  const entries = getGroupEntries(group);

  if (!entries.length) return null;

  const containsActive = entries.some((entry) => entry.href === pathname);

  if (collapsed) {
    return (
      <NavigationGroup label={groupMeta?.title} collapsed>
        {entries.map((entry) => (
          <NavigationItem key={entry.id} href={entry.href} active={entry.href === pathname}>
            {entry.title}
          </NavigationItem>
        ))}
      </NavigationGroup>
    );
  }

  return (
    <Expandable
      defaultOpen={containsActive || group.endsWith("-overview") || group === "overview"}
      trigger={
        <div className="flex w-full items-center justify-between gap-2 px-2 py-1.5">
          <span className="text-caption font-semibold uppercase tracking-wide text-ink-tertiary">{groupMeta?.title}</span>
          <ChevronDown className="size-3.5 shrink-0 text-ink-tertiary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-aria-expanded:rotate-180" aria-hidden />
        </div>
      }
      triggerClassName={cn("group rounded-md hover:bg-canvas-raised")}
    >
      <NavigationGroup>
        {entries.map((entry) => (
          <NavigationItem key={entry.id} href={entry.href} active={entry.href === pathname}>
            {entry.title}
          </NavigationItem>
        ))}
      </NavigationGroup>
    </Expandable>
  );
}
