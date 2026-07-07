import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerSize } from "./Container";

type SectionBackground = "transparent" | "raised" | "surface";
type SectionSpacing = "xs" | "sm" | "md" | "lg" | "xl";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  containerSize?: ContainerSize;
  spacing?: SectionSpacing;
  background?: SectionBackground;
  /** Adds a subtle top border to separate this section from the previous one. */
  divider?: boolean;
  id?: string;
}

const spacingMap: Record<SectionSpacing, string> = {
  xs: "py-[var(--spacing-section-xs)]",
  sm: "py-[var(--spacing-section-sm)]",
  md: "py-[var(--spacing-section-md)]",
  lg: "py-[var(--spacing-section-lg)]",
  xl: "py-[var(--spacing-section-xl)]",
};

const backgroundMap: Record<SectionBackground, string> = {
  transparent: "bg-transparent",
  raised: "bg-canvas-raised",
  surface: "bg-surface",
};

/** Vertical rhythm + container wrapper every page section should use. */
export function SectionShell({
  children,
  className,
  containerSize = "content",
  spacing = "md",
  background = "transparent",
  divider = false,
  id,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        spacingMap[spacing],
        backgroundMap[background],
        divider && "border-t border-border-subtle",
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
