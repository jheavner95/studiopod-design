"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Container } from "@/components/layout";
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
 */
export function DocsShell({ entry, children, toc }: DocsShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="sticky top-14 z-[var(--z-sticky)] border-b border-border-subtle bg-canvas/95 backdrop-blur">
        <Container size="wide" className="flex flex-col gap-3 py-3">
          <div className="flex items-center justify-between gap-4">
            <DocsSectionNav className="hidden md:flex" />
            <div className="md:hidden">
              <DocsMobileNav section={entry.section} />
            </div>
            <DocsSearchTrigger className="ml-auto" />
          </div>
          <DocsBreadcrumbs entry={entry} />
        </Container>
      </div>

      <Container size="wide" className="flex flex-1 items-start gap-8 py-8">
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

        {toc ? <div className="sticky top-32 hidden w-56 shrink-0 xl:block">{toc}</div> : null}
      </Container>
    </div>
  );
}
