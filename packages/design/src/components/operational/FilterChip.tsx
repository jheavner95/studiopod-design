import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_TONE_PILL_CLASSES, type StatusTone } from "@/lib/tone";

interface FilterChipProps {
  label: ReactNode;
  /** DS-5B: reads the same shared pill treatment Badge does — was an independent, byte-identical copy before this consolidation. */
  tone?: StatusTone;
  onRemove?: () => void;
  className?: string;
}

/**
 * A compact, optionally-dismissible token representing one applied filter or
 * search term — the standalone Chip the Foundation Component Catalog has
 * tracked as Needed since DS-2.1.1 (src/components/ui/FilterBar.tsx only
 * ever defined an inline FilterChip data shape, never a reusable component).
 */
export function FilterChip({ label, tone = "neutral", onRemove, className }: FilterChipProps) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-1 rounded-full py-0.5 pl-2.5 font-medium text-caption", onRemove ? "pr-1" : "pr-2.5", STATUS_TONE_PILL_CLASSES[tone], className)}>
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={typeof label === "string" ? `Remove ${label} filter` : "Remove filter"}
          className="focus-ring flex shrink-0 items-center justify-center rounded-full p-0.5 hover:bg-black/10"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  );
}
