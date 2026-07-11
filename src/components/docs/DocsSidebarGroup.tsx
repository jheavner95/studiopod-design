"use client";

import { usePathname } from "next/navigation";
import { NavigationGroup, NavigationItem } from "@/components/navigation";
import { getGroup, getGroupEntries, type NavGroupId } from "@/lib/design-system-navigation";

interface DocsSidebarGroupProps {
  group: NavGroupId;
  collapsed?: boolean;
}

/** One group's worth of NavigationItems, read straight from the registry — no hand-copied route list. */
export function DocsSidebarGroup({ group, collapsed }: DocsSidebarGroupProps) {
  const pathname = usePathname();
  const groupMeta = getGroup(group);
  const entries = getGroupEntries(group);

  if (!entries.length) return null;

  return (
    <NavigationGroup label={groupMeta?.title} collapsed={collapsed}>
      {entries.map((entry) => (
        <NavigationItem key={entry.id} href={entry.href} active={pathname === entry.href}>
          {entry.title}
        </NavigationItem>
      ))}
    </NavigationGroup>
  );
}
