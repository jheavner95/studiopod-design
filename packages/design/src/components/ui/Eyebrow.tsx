import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent";
}

/** Plain uppercase tracked micro-label above a heading — no border, just type. */
export function Eyebrow({ children, className, tone = "default" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-metadata font-mono",
        tone === "accent" ? "text-accent-400" : "text-ink-tertiary",
        className,
      )}
    >
      {children}
    </span>
  );
}
