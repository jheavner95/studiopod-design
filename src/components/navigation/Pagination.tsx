"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaginationVariant = "numbered" | "compact" | "load-more";

interface PaginationProps {
  /** 1-indexed current page. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  /** Required when variant="load-more". */
  onLoadMore?: () => void;
  loading?: boolean;
  className?: string;
}

function pageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

const ICON_BUTTON =
  "focus-ring flex size-8 shrink-0 items-center justify-center rounded-md text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover hover:text-ink-primary disabled:pointer-events-none disabled:opacity-40";

/** Moving through a large result set page by page — Numbered, Prev/next only ("compact"), and Load more variants. */
export function Pagination({ page, pageCount, onPageChange, variant = "numbered", onLoadMore, loading = false, className }: PaginationProps) {
  if (variant === "load-more") {
    return (
      <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loading || page >= pageCount}
          className="focus-ring rounded-md border border-border px-4 py-2 text-body-sm font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40"
        >
          {loading ? "Loading…" : "Load more"}
        </button>
      </nav>
    );
  }

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button type="button" onClick={() => canPrev && onPageChange(page - 1)} disabled={!canPrev} aria-label="Previous page" className={ICON_BUTTON}>
        <ChevronLeft className="size-4" />
      </button>

      {variant === "numbered" ? (
        pageRange(page, pageCount).map((p, index) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1.5 text-ink-tertiary">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={cn(
                "focus-ring flex size-8 shrink-0 items-center justify-center rounded-md text-body-sm font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                p === page ? "bg-accent-500 text-white" : "text-ink-tertiary hover:bg-surface-hover hover:text-ink-primary",
              )}
            >
              {p}
            </button>
          ),
        )
      ) : (
        <span aria-current="page" className="px-2 text-body-sm text-ink-secondary">
          Page {page} of {pageCount}
        </span>
      )}

      <button type="button" onClick={() => canNext && onPageChange(page + 1)} disabled={!canNext} aria-label="Next page" className={ICON_BUTTON}>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
