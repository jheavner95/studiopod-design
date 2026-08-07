import { cn } from "@/lib/utils";
import { accentRgb } from "@/lib/tokens";

interface SystemGridProps {
  variant?: "dots" | "lines";
  glow?: boolean;
  className?: string;
}

/**
 * Static backdrop texture representing "system" structure behind hero/section
 * content. Deliberately non-animated — a decorative background shouldn't
 * compete for attention; motion is reserved for things that explain state.
 */
export function SystemGrid({ variant = "dots", glow = true, className }: SystemGridProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div
        className={cn("absolute inset-0", variant === "dots" ? "bg-grid-dots" : "bg-grid-lines")}
        style={{
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />
      {glow ? (
        <div
          className="absolute left-1/2 top-0 size-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(${accentRgb}, 0.25), transparent 70%)` }}
        />
      ) : null}
    </div>
  );
}
