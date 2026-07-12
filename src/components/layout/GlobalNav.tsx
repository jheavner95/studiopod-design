"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/lib/design-system-navigation";

/**
 * Persistent top-level navigation across every Design System route — the
 * seven DS-7.1 goal-first sections (Overview/Components/Patterns/
 * Applications/Architecture/Playground/Quality), always reachable. This
 * used to read the pre-DS-7.1 DESIGN_SYSTEM_SECTIONS list (Foundations/
 * Tokens/Core Components/Marketing Components/Application Components/
 * Workflow Patterns/Documentation) — exactly the architecture-first
 * primary navigation DS-7.1 Part 2 requires removing.
 */
export function GlobalNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center gap-6 overflow-x-auto px-[var(--spacing-gutter)] py-3">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-md">
          <Boxes className="size-4 text-accent-400" aria-hidden />
          <span className="whitespace-nowrap text-body-sm font-semibold text-ink-primary">
            StudioPOD Design System
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-5" aria-label="Design system sections">
          {NAV_SECTIONS.filter((section) => section.id !== "overview").map((section) => {
            const active = pathname === section.href;
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring whitespace-nowrap rounded-md text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  active ? "text-accent-400" : "text-ink-tertiary hover:text-ink-secondary",
                )}
              >
                {section.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
