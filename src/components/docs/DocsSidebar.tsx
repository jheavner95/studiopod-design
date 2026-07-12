"use client";

import { SideNavigation } from "@/components/navigation";
import { DocsSidebarGroup } from "./DocsSidebarGroup";
import { getGroupsForSection, getSection, type NavSectionId } from "@/lib/design-system-navigation";

interface DocsSidebarProps {
  section: NavSectionId;
}

/**
 * The persistent sidebar for one top-level section — DS-7.1 Part 8: only
 * the current section's own groups render, never the whole site's. Every
 * section (including the now-large Components section) queries its real
 * groups dynamically; there is no hardcoded "canonical subset" anymore
 * since DocsSidebarGroup's own per-group collapse (see that file) is what
 * keeps a many-group section from reading as the full sitemap at once.
 *
 * DS-7.4 removed the desktop collapse toggle this used to support — the
 * sidebar is always fully expanded on desktop now, so there's no
 * `collapsed` concept left to thread through here.
 *
 * The section caption below is rendered as plain text, not a nested
 * NavigationSection — SideNavigation already supplies the one nav landmark
 * this sidebar needs (labeled with the same section title), and nesting a
 * second identically-labeled <nav> inside it was a real duplicate-landmark
 * bug (DS-7.3 Part 9).
 */
export function DocsSidebar({ section }: DocsSidebarProps) {
  const sectionMeta = getSection(section);
  const groups = getGroupsForSection(section).map((group) => group.id);

  return (
    <SideNavigation aria-label={sectionMeta?.title ?? "Documentation"}>
      <div className="flex flex-col gap-4">
        {sectionMeta?.title ? (
          <span className="px-3 text-caption font-semibold uppercase tracking-wide text-ink-tertiary">{sectionMeta.title}</span>
        ) : null}
        {groups.map((groupId) => (
          <DocsSidebarGroup key={groupId} group={groupId} />
        ))}
      </div>
    </SideNavigation>
  );
}
