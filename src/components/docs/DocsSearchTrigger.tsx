"use client";

import { useRouter } from "next/navigation";
import { CommandNavigation } from "@/components/navigation";
import type { CommandPaletteItem } from "@/components/overlay";
import { NAV_REGISTRY, getGroup } from "@/lib/design-system-navigation";

interface DocsSearchTriggerProps {
  className?: string;
}

/** Every routable destination, searchable — built directly from NAV_REGISTRY, never a hand-maintained list. */
export function DocsSearchTrigger({ className }: DocsSearchTriggerProps) {
  const router = useRouter();

  const items: CommandPaletteItem[] = NAV_REGISTRY.map((entry) => ({
    id: entry.id,
    label: entry.title,
    group: getGroup(entry.group)?.title ?? entry.group,
    onSelect: () => router.push(entry.href),
  }));

  return <CommandNavigation items={items} placeholder="Search the Design System…" className={className} />;
}
