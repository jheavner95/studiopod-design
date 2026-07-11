"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui";
import { DocsBreadcrumbs } from "./DocsBreadcrumbs";
import { DocsSectionNav } from "./DocsSectionNav";
import { DocsSearchTrigger } from "./DocsSearchTrigger";
import { DocsSidebar } from "./DocsSidebar";
import { DocsMobileNav } from "./DocsMobileNav";
import { DocsPageNavigation } from "./DocsPageNavigation";
import type { NavEntry } from "@/lib/design-system-navigation";

interface DocsShellProps {
  entry: NavEntry;
  children: ReactNode;
  /** Typically a <DocsTableOfContents />; omitted entirely (no reserved column) when a page has too few headings to need one. */
  toc?: ReactNode;
}

/**
 * The outermost responsive composition every /docs/* page wraps its content
 * in: sticky context bar (section switcher + search + breadcrumbs) above a
 * three-column desktop layout (collapsible sidebar / content / optional
 * TOC) that collapses to a Drawer-based mobile nav below md.
 *
 * DS-6.1 widened this from Container's own 1440px "wide" cap to a
 * docs-specific one; DS-6.2 widened it again to 2160px total, alongside
 * bumping both the sidebar (SideNavigation's own w-72, 288px) and this
 * TOC column (w-72, 288px) into the enterprise 280–320px target. At that
 * outer cap the content column (flex-1 between them) tops out at ~1400px;
 * at a more typical 1920px desktop viewport it lands at ~1160px — both
 * inside this package's own 1100–1400px target. No separate max-width
 * sits on `main` itself: capping the whole row this way keeps sidebar,
 * content, and TOC centered together as one block past the outer cap,
 * rather than leaving a lopsided gap between a capped content column and
 * the TOC.
 */
export function DocsShell({ entry, children, toc }: DocsShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="sticky top-14 z-[var(--z-sticky)] border-b border-border-subtle bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[2160px] flex-col gap-3 px-[var(--spacing-gutter)] py-3">
          <div className="flex items-center justify-between gap-4">
            <DocsSectionNav className="hidden md:flex" />
            <div className="md:hidden">
              <DocsMobileNav section={entry.section} />
            </div>
            <DocsSearchTrigger className="ml-auto" />
          </div>
          <DocsBreadcrumbs entry={entry} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[2160px] flex-1 items-start gap-8 px-[var(--spacing-gutter)] py-8">
        <aside className="sticky top-32 hidden shrink-0 self-start md:block">
          <div className="flex items-center justify-end pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" aria-hidden />
              ) : (
                <PanelLeftClose className="size-4" aria-hidden />
              )}
            </Button>
          </div>
          <DocsSidebar section={entry.section} collapsed={collapsed} />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-10">
          {children}
          <DocsPageNavigation entry={entry} />
        </main>

        {toc ? <div className="sticky top-32 hidden w-72 shrink-0 xl:block">{toc}</div> : null}
      </div>
    </div>
  );
}
