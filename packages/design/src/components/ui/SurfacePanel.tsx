import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SPOTLIGHT_PADDING_MAP, type SpotlightPadding } from "@/lib/spacing";

export interface SurfacePanelProps {
  children: ReactNode;
  className?: string;
  padding?: SpotlightPadding;
  elevated?: boolean;
}

/**
 * Opaque solid panel — the default, functional container for hero/spotlight
 * compositions. Use over GlassPanel unless the moment calls for glass.
 *
 * Shares GlassPanel's padding scale (sm/md/lg -> p-4/p-8/p-12), not Card's —
 * see GlassPanel's own doc comment for why that's a deliberate second
 * vocabulary, not drift.
 */
export function SurfacePanel({ children, className, padding = "md", elevated = false }: SurfacePanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border",
        elevated ? "bg-surface-active shadow-md" : "bg-surface",
        SPOTLIGHT_PADDING_MAP[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
