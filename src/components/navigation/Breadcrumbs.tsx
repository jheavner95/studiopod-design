"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "@/components/overlay";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Collapse middle items behind an overflow menu once there are more than this many — keeps deep hierarchies from wrapping instead of truncating gracefully. */
  maxVisible?: number;
  className?: string;
}

/**
 * A path trail — nav landmark, aria-current="page" on the last crumb, and truncation for
 * deep hierarchies via the same Menu overflow pattern the rest of this system already uses,
 * rather than a bespoke dropdown.
 */
export function Breadcrumbs({ items, maxVisible = 4, className }: BreadcrumbsProps) {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const lastIndex = items.length - 1;

  const needsTruncation = items.length > maxVisible;
  const headCount = needsTruncation ? 1 : items.length;
  const tailCount = needsTruncation ? Math.max(maxVisible - headCount - 1, 1) : 0;
  const headItems = items.slice(0, headCount);
  const tailItems = needsTruncation ? items.slice(items.length - tailCount) : [];
  const hiddenItems = needsTruncation ? items.slice(headCount, items.length - tailCount) : [];

  function renderCrumb(item: BreadcrumbItem, index: number) {
    const isCurrent = index === lastIndex;
    return (
      <li key={`${item.label}-${index}`} className="flex items-center gap-1">
        {item.href && !isCurrent ? (
          <Link
            href={item.href}
            className="focus-ring rounded-md text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary"
          >
            {item.label}
          </Link>
        ) : (
          <span aria-current={isCurrent ? "page" : undefined} className={cn(isCurrent ? "font-medium text-ink-primary" : "text-ink-tertiary")}>
            {item.label}
          </span>
        )}
        {index < lastIndex ? <ChevronRight className="size-3.5 shrink-0 text-ink-tertiary" aria-hidden /> : null}
      </li>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-body-sm">
        {headItems.map((item, index) => renderCrumb(item, index))}
        {needsTruncation ? (
          <li className="flex items-center gap-1">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOverflowOpen(true)}
              aria-label="Show hidden breadcrumb items"
              className="focus-ring rounded-md p-1 text-ink-tertiary hover:text-ink-primary"
            >
              <MoreHorizontal className="size-4" />
            </button>
            <Menu open={overflowOpen} onOpenChange={setOverflowOpen} triggerRef={triggerRef}>
              {hiddenItems.map((item) => (
                <MenuItem key={item.label} onSelect={() => {}}>
                  {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                </MenuItem>
              ))}
            </Menu>
            <ChevronRight className="size-3.5 shrink-0 text-ink-tertiary" aria-hidden />
          </li>
        ) : null}
        {tailItems.map((item, index) => renderCrumb(item, headCount + hiddenItems.length + index))}
      </ol>
    </nav>
  );
}
