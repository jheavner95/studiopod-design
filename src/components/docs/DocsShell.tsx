"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui";
import { DocsSidebar } from "./DocsSidebar";
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
 * in. DS-7.3 removed the breadcrumb context bar this used to render below
 * GlobalNav — content now begins directly under the header — and the
 * mobile "Pages" trigger that used to live in that bar moved into
 * GlobalNav's own drawer (see GlobalNav.tsx), so there's exactly one mobile
 * nav surface, not two. What's left is a three-column desktop layout
 * (collapsible sidebar / content / optional TOC); the sidebar is simply
 * hidden below md, with GlobalNav's drawer standing in for it there.
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
 * the TOC. GlobalNav now shares this same 2160px cap (DS-7.3 Part 2) so
 * the logo and this row's sidebar share one left edge at every width.
 *
 * The `top-14` sticky offset below is coupled to GlobalNav's own rendered
 * height (~55px) — it no longer has a second header row to account for.
 */
export function DocsShell({ entry, children, toc }: DocsShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[2160px] flex-1 items-start gap-8 px-[var(--spacing-gutter)] py-8">
        <aside className="sticky top-14 hidden shrink-0 self-start md:block">
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

        {toc ? <div className="sticky top-14 hidden w-72 shrink-0 xl:block">{toc}</div> : null}
      </div>
    </div>
  );
}
