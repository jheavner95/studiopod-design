import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelPadding = "sm" | "md" | "lg";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  padding?: PanelPadding;
  /** Layers a soft accent-blue ambient glow around the panel, for spotlight moments (an active step, a featured/enterprise callout). */
  glow?: boolean;
}

const paddingMap: Record<PanelPadding, string> = {
  sm: "p-4",
  md: "p-8",
  lg: "p-12",
};

/**
 * Translucent, blurred panel. Reserve for hero moments and spotlight
 * callouts — glass is decorative and loses readability if overused.
 * For ordinary content containers use SurfacePanel instead.
 */
export function GlassPanel({ children, className, padding = "md", glow = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-border backdrop-blur-[20px]",
        glow ? "shadow-glass-glow" : "shadow-glass",
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
