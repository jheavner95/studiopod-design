"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
}

interface DocsTableOfContentsProps {
  /** Selector for headings to index — every real docs page section heading carries this attribute. */
  selector?: string;
  className?: string;
}

/**
 * Self-contained scroll-spy — no shared IntersectionObserver hook exists
 * elsewhere in the codebase for a single consumer, so this owns its own
 * small observer rather than manufacturing new shared infra.
 */
export function DocsTableOfContents({ selector = "[data-toc-heading]", className }: DocsTableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((heading) => heading.id);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setItems((current) =>
          current.length ? current : headings.map((heading) => ({ id: heading.id, label: heading.textContent ?? "" })),
        );

        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [selector]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className={cn("flex flex-col gap-3", className)}>
      <Caption className="uppercase tracking-wide text-ink-tertiary">On this page</Caption>
      <ul className="flex flex-col gap-2 border-l border-border-subtle pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "focus-ring block text-caption transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                activeId === item.id ? "font-medium text-accent-400" : "text-ink-tertiary hover:text-ink-secondary",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
