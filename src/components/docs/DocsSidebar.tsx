"use client";

import { SideNavigation, NavigationSection } from "@/components/navigation";
import { DocsSidebarGroup } from "./DocsSidebarGroup";
import { getGroupsForSection, getSection, type NavSectionId } from "@/lib/design-system-navigation";

interface DocsSidebarProps {
  section: NavSectionId;
  collapsed?: boolean;
}

/**
 * The persistent sidebar for one top-level section — DS-7.1 Part 8: only
 * the current section's own groups render, never the whole site's. Every
 * section (including the now-large Components section) queries its real
 * groups dynamically; there is no hardcoded "canonical subset" anymore
 * since DocsSidebarGroup's own per-group collapse (see that file) is what
 * keeps a many-group section from reading as the full sitemap at once.
 */
export function DocsSidebar({ section, collapsed = false }: DocsSidebarProps) {
  const sectionMeta = getSection(section);
  const groups = getGroupsForSection(section).map((group) => group.id);

  return (
    <SideNavigation collapsed={collapsed} aria-label={sectionMeta?.title ?? "Documentation"}>
      <NavigationSection title={sectionMeta?.title}>
        {groups.map((groupId) => (
          <DocsSidebarGroup key={groupId} group={groupId} />
        ))}
      </NavigationSection>
    </SideNavigation>
  );
}
