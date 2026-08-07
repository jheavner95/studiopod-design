import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SPOTLIGHT_PADDING_MAP, type SpotlightPadding } from "@/lib/spacing";

export interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  padding?: SpotlightPadding;
  /** Layers a soft accent-blue ambient glow around the panel, for spotlight moments (an active step, a featured/enterprise callout). */
  glow?: boolean;
}

/**
 * Translucent, blurred panel. Reserve for hero moments and spotlight
 * callouts — glass is decorative and loses readability if overused.
 * For ordinary content containers use SurfacePanel instead.
 *
 * Shares its padding scale (sm/md/lg -> p-4/p-8/p-12) with SurfacePanel,
 * not with Card/Surface/Panel (p-4/p-6/p-8) — DS-5A confirmed via usage-site
 * evidence this is two deliberate families, not one drifted scale: Card
 * appears ~125 times across ordinary application UI, while GlassPanel/
 * SurfacePanel appear almost exclusively on marketing/hero/spotlight pages,
 * where a more generous register is the right call. See
 * docs/engineering-notes/14-spacing-consolidation.md.
 */
export function GlassPanel({ children, className, padding = "md", glow = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-border backdrop-blur-[20px]",
        glow ? "shadow-glass-glow" : "shadow-glass",
        SPOTLIGHT_PADDING_MAP[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
