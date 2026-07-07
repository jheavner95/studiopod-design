import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelPadding = "sm" | "md" | "lg";

interface SurfacePanelProps {
  children: ReactNode;
  className?: string;
  padding?: PanelPadding;
  elevated?: boolean;
}

const paddingMap: Record<PanelPadding, string> = {
  sm: "p-4",
  md: "p-8",
  lg: "p-12",
};

/** Opaque solid panel — the default, functional container. Use over GlassPanel unless the moment calls for glass. */
export function SurfacePanel({ children, className, padding = "md", elevated = false }: SurfacePanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border",
        elevated ? "bg-surface-active shadow-md" : "bg-surface",
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
