"use client";

import { useState } from "react";
import { List, X } from "lucide-react";
import { Drawer } from "@/components/overlay";
import { NavigationSection } from "@/components/navigation";
import { Button } from "@/components/ui";
import { DocsSidebarGroup } from "./DocsSidebarGroup";
import { getGroupsForSection, getSection, type NavSectionId } from "@/lib/design-system-navigation";

interface DocsMobileNavProps {
  section: NavSectionId;
}

/**
 * The mobile/tablet equivalent of DocsSidebar — a bottom-edge Drawer holding
 * only the current section's own pages. Site-wide section switching lives in
 * GlobalNav's own (right-edge) drawer, not here — this is deliberately
 * scoped to "in-section pages" per DS-7.2's ownership boundaries, so the two
 * drawers never show the same destinations.
 */
export function DocsMobileNav({ section }: DocsMobileNavProps) {
  const [open, setOpen] = useState(false);
  const sectionMeta = getSection(section);
  const groups = getGroupsForSection(section).map((group) => group.id);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <List className="size-4" aria-hidden />
        Pages
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
        <NavigationSection title={sectionMeta?.title} className="max-h-[65vh] overflow-y-auto">
          {groups.map((groupId) => (
            <DocsSidebarGroup key={groupId} group={groupId} />
          ))}
        </NavigationSection>
      </Drawer>
    </>
  );
}
