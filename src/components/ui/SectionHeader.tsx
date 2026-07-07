import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./Typography";

interface SectionHeaderProps {
  /** Typically an <Eyebrow> or <SectionBadge>. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  descriptionMaxWidth?: boolean;
}

/** Composes eyebrow + heading + description with consistent spacing/alignment. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  descriptionMaxWidth = true,
}: SectionHeaderProps) {
  const isCentered = align === "center";
  return (
    <div className={cn("flex flex-col gap-4", isCentered && "items-center text-center", className)}>
      {eyebrow}
      <Heading level={2}>{title}</Heading>
      {description ? (
        <p
          className={cn(
            "text-body-lg text-ink-secondary",
            descriptionMaxWidth && "max-w-[var(--container-narrow)]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
