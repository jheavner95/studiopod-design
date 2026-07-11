"use client";

import { SideNavigation, NavigationSection } from "@/components/navigation";
import { DocsSidebarGroup } from "./DocsSidebarGroup";
import {
  CANONICAL_APPLICATION_GROUPS,
  getGroupsForSection,
  getSection,
  type NavSectionId,
} from "@/lib/design-system-navigation";

interface DocsSidebarProps {
  section: NavSectionId;
  collapsed?: boolean;
}

/**
 * The persistent sidebar for one top-level section. Application Components
 * renders its 6 canonical groups (workspace/foundation/operational/
 * workflow/platform/certification); every other section renders its own
 * single matching group.
 */
export function DocsSidebar({ section, collapsed = false }: DocsSidebarProps) {
  const sectionMeta = getSection(section);
  const groups =
    section === "application-components"
      ? CANONICAL_APPLICATION_GROUPS
      : getGroupsForSection(section).map((group) => group.id);

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
