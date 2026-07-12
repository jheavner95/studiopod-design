"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Drawer } from "@/components/overlay";
import { NavigationItem } from "@/components/navigation";
import { DocsSearchTrigger } from "@/components/docs";
import { NAV_SECTIONS } from "@/lib/design-system-navigation";

const SECTIONS = NAV_SECTIONS.filter((section) => section.id !== "overview");

function isActiveSection(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/**
 * The single persistent top-level navigation across every route: identity,
 * the six goal-first sections, and search — nothing else. Breadcrumbs live
 * one level down in DocsShell's own context bar, in-section pages in
 * DocsSidebar, and on-page sections in DocsTableOfContents; each of those
 * owns its own distinct active-state treatment so no two levels read the
 * same way (this one uses an underline, not a filled pill).
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

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center gap-6 px-[var(--spacing-gutter)] py-2.5">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-md">
          <Boxes className="size-4 text-accent-400" aria-hidden />
          <span className="hidden whitespace-nowrap text-body-sm font-semibold text-ink-primary sm:inline">
            StudioPOD Design System
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-5 overflow-x-auto md:flex" aria-label="Design system sections">
          {SECTIONS.map((section) => {
            const active = isActiveSection(pathname, section.href);
            return (
              <Link
                key={section.id}
                ref={active ? activeLinkRef : undefined}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring whitespace-nowrap border-b-2 pb-[3px] text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  active ? "border-accent-400 text-ink-primary" : "border-transparent text-ink-tertiary hover:text-ink-secondary",
                )}
              >
                {section.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <DocsSearchTrigger className="hidden md:flex" />
          <DocsSearchTrigger compact className="md:hidden" />
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
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
              <NavigationItem href={section.href} active={isActiveSection(pathname, section.href)}>
                {section.title}
              </NavigationItem>
            </div>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
