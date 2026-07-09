import { cn } from "@/lib/utils";

export type NavigationDividerOrientation = "horizontal" | "vertical";

interface NavigationDividerProps {
  orientation?: NavigationDividerOrientation;
  className?: string;
}

/** A plain separator between navigation groups or sections, for when no group heading is needed. */
export function NavigationDivider({ orientation = "horizontal", className }: NavigationDividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === "horizontal" ? "my-2 h-px w-full bg-border-subtle" : "mx-2 h-full w-px bg-border-subtle", className)}
    />
  );
}
