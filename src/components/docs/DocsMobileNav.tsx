"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Drawer } from "@/components/overlay";
import { NavigationSection } from "@/components/navigation";
import { Button } from "@/components/ui";
import { DocsSidebarGroup } from "./DocsSidebarGroup";
import { DocsSectionNav } from "./DocsSectionNav";
import {
  CANONICAL_APPLICATION_GROUPS,
  getGroupsForSection,
  getSection,
  type NavSectionId,
} from "@/lib/design-system-navigation";

interface DocsMobileNavProps {
  section: NavSectionId;
}

/** The mobile/tablet equivalent of DocsSidebar — a bottom-edge Drawer holding the same section-nav + group navigation, triggered from the sticky context bar. */
export function DocsMobileNav({ section }: DocsMobileNavProps) {
  const [open, setOpen] = useState(false);
  const sectionMeta = getSection(section);
  const groups =
    section === "application-components"
      ? CANONICAL_APPLICATION_GROUPS
      : getGroupsForSection(section).map((group) => group.id);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Menu className="size-4" aria-hidden />
        Menu
      </Button>
      <Drawer open={open} onOpenChange={setOpen} edge="bottom" labelledBy="docs-mobile-nav-title">
        <div className="flex items-center justify-between">
          <span id="docs-mobile-nav-title" className="text-body-md font-medium text-ink-primary">
            {sectionMeta?.title ?? "Navigate"}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close navigation menu">
            <X className="size-4" aria-hidden />
          </Button>
        </div>
        <DocsSectionNav className="border-t border-border-subtle pt-3" />
        <NavigationSection title={sectionMeta?.title} className="max-h-[55vh] overflow-y-auto border-t border-border-subtle pt-3">
          {groups.map((groupId) => (
            <DocsSidebarGroup key={groupId} group={groupId} />
          ))}
        </NavigationSection>
      </Drawer>
    </>
  );
}
