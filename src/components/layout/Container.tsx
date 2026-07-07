import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "narrow" | "content" | "wide" | "full";

const sizeMap: Record<ContainerSize, string> = {
  narrow: "max-w-[var(--container-narrow)]",
  content: "max-w-[var(--container-content)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-none",
};

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: ElementType;
}

/** Horizontally centers content and applies the fluid page gutter. */
export function Container({ children, size = "content", className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-[var(--spacing-gutter)]", sizeMap[size], className)}>
      {children}
    </Component>
  );
}
