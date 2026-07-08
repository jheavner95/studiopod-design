"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

/** Persistent top-level navigation across every Design System route — the seven packages, always reachable. */
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
        <nav className="flex shrink-0 items-center gap-5" aria-label="Design system packages">
          {DESIGN_SYSTEM_SECTIONS.map((section) => {
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
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
