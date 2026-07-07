import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelPadding = "sm" | "md" | "lg";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  padding?: PanelPadding;
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
export function GlassPanel({ children, className, padding = "md" }: GlassPanelProps) {
  return (
    <div
      className={cn("glass-panel rounded-xl border border-border-subtle shadow-lg", paddingMap[padding], className)}
    >
      {children}
    </div>
  );
}
