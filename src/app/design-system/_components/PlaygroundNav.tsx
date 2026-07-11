"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "foundation-palette", label: "Foundation palette" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "components", label: "Components" },
  { id: "form-controls", label: "Forms & controls" },
  { id: "illustration", label: "Illustration" },
  { id: "motion", label: "Motion" },
  { id: "layout", label: "Layout" },
  { id: "theme-preview", label: "Theme preview" },
  { id: "grid-tools", label: "Grid tools" },
];

/** Sticky scroll-spy nav for jumping between showcase sections. Hidden below xl — the page is still fully usable via normal scroll. */
export function PlaygroundNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 z-[var(--z-sticky)] hidden -translate-y-1/2 2xl:block">
      <ol className="flex flex-col gap-1 border-l border-border pl-4">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block py-1 text-caption transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                active === s.id ? "font-medium text-accent-400" : "text-ink-tertiary hover:text-ink-secondary",
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
