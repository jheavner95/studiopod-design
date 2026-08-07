import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAGroupProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

/** Consistent gap/alignment/stacking wrapper for primary + secondary CTA buttons. */
export function CTAGroup({ children, className, align = "left" }: CTAGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        align === "center" && "justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
