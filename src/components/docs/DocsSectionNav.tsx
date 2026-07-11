"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/design-system-navigation";
import { cn } from "@/lib/utils";

interface DocsSectionNavProps {
  className?: string;
}

/** The 6 canonical top-level sections, always reachable from any docs page. */
export function DocsSectionNav({ className }: DocsSectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Design System sections" className={cn("flex flex-wrap items-center gap-1", className)}>
      {NAV_SECTIONS.map((section) => {
        const active = pathname === section.href || pathname.startsWith(`${section.href}/`);
        return (
          <Link
            key={section.id}
            href={section.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring whitespace-nowrap rounded-md px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              active ? "bg-accent-soft text-accent-400" : "text-ink-tertiary hover:text-ink-secondary",
            )}
          >
            {section.title}
          </Link>
        );
      })}
    </nav>
  );
}
