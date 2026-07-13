"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Drawer } from "@/components/overlay";
import { NavigationItem, NavigationSection } from "@/components/navigation";
import { DocsSearchTrigger, DocsSidebarGroup } from "@/components/docs";
import { NAV_SECTIONS, getEntryByHref, getGroupsForSection, getSection, type NavSectionId } from "@/lib/design-system-navigation";

const SECTIONS = NAV_SECTIONS.filter((section) => section.id !== "overview");

/**
 * Exactly one section can be "active" for a given pathname. Several
 * registry entries — Tokens, Foundations, Core Components, Marketing
 * Components — live at a standalone top-level route (e.g. "/tokens")
 * rather than nested under their own section's own href ("/application-
 * components"), a legacy artifact of routes that predate the DS-7.1
 * information architecture. A plain prefix check against NAV_SECTIONS
 * hrefs misses those entirely (DS-7.4 fix), so the registry itself — the
 * single source of truth for which section a page belongs to — is
 * checked first via an exact href lookup. Only pages absent from the
 * registry (e.g. sub-routes not individually registered) fall back to
 * prefix matching: an exact section-href match wins, then the longest
 * matching prefix (never "whichever section happens to come first").
 */
function resolveActiveSectionId(pathname: string): NavSectionId | null {
  const registryEntry = getEntryByHref(pathname);
  if (registryEntry) return registryEntry.section;

  const exact = SECTIONS.find((section) => pathname === section.href);
  if (exact) return exact.id;

  let bestId: NavSectionId | null = null;
  let bestLength = -1;
  for (const section of SECTIONS) {
    if (section.href !== "/" && pathname.startsWith(`${section.href}/`) && section.href.length > bestLength) {
      bestId = section.id;
      bestLength = section.href.length;
    }
  }
  return bestId;
}

/**
 * The single persistent top-level navigation across every route: identity,
 * the six goal-first sections, and search — nothing else. DS-7.3 removed
 * the breadcrumb context bar that used to sit below this, so on desktop
 * this is the only fixed chrome above page content; the sidebar (in-section
 * pages), page header (title/status/purpose), and TOC (in-page sections)
 * carry the rest of the wayfinding load. On mobile, where the sidebar is
 * hidden, this component's own drawer stands in for it: it shows both the
 * site-wide sections AND (below a divider) the current section's own pages,
 * so there's exactly one mobile nav surface, not two.
 */
export function GlobalNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  // The nav row shrinks and scrolls internally rather than pushing search/menu off-screen
  // at narrower widths (see the fixed overflow bug this replaced) — that means the active
  // section can start out of view; keep it visible without the user having to scroll for it.
  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  const activeSectionId = resolveActiveSectionId(pathname);
  const activeSectionMeta = activeSectionId ? getSection(activeSectionId) : null;
  const activeSectionGroups = activeSectionId ? getGroupsForSection(activeSectionId).map((group) => group.id) : [];

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[2160px] items-center gap-6 px-[var(--spacing-gutter)] py-2.5">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-md">
          <Boxes className="size-4 text-accent-400" aria-hidden />
          <span className="hidden whitespace-nowrap text-body-sm font-semibold text-ink-primary sm:inline">
            StudioPOD Design System
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-6 overflow-x-auto lg:flex" aria-label="Design system sections">
          {SECTIONS.map((section) => {
            const active = section.id === activeSectionId;
            return (
              <Link
                key={section.id}
                ref={active ? activeLinkRef : undefined}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring whitespace-nowrap border-b-2 px-0.5 pb-[3px] text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  active
                    ? "border-accent-400 text-ink-primary"
                    : "border-transparent text-ink-tertiary hover:border-accent-400/40 hover:text-ink-secondary",
                )}
              >
                {section.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <DocsSearchTrigger className="hidden lg:flex" />
          <DocsSearchTrigger compact className="lg:hidden" />
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} edge="right" labelledBy="global-nav-drawer-title">
        <div className="flex items-center justify-between">
          <span id="global-nav-drawer-title" className="text-body-md font-medium text-ink-primary">
            Navigate
          </span>
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
            <X className="size-4" aria-hidden />
          </Button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Design system sections">
          {SECTIONS.map((section) => (
            <div key={section.id} onClick={() => setMobileOpen(false)}>
              <NavigationItem href={section.href} active={section.id === activeSectionId}>
                {section.title}
              </NavigationItem>
            </div>
          ))}
        </nav>

        {activeSectionId && activeSectionGroups.length ? (
          <div onClick={() => setMobileOpen(false)}>
            <NavigationSection
              title={activeSectionMeta?.title}
              className="max-h-[55vh] overflow-y-auto border-t border-border-subtle pt-3"
            >
              {activeSectionGroups.map((groupId) => (
                <DocsSidebarGroup key={groupId} group={groupId} />
              ))}
            </NavigationSection>
          </div>
        ) : null}
      </Drawer>
    </header>
  );
}
