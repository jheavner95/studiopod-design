import type { ReactNode } from "react";
import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/layout";
import { Heading, Body } from "@/components/ui";
import { ScaleIn } from "@/components/motion";
import { AnimatedNode, SystemGrid } from "@/components/illustration";

export type EmptyVariant = "default" | "dashed" | "grid";

export interface EmptyCompositionProps {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** A pre-built <Button> or <CTAGroup>. */
  cta?: ReactNode;
  /** dashed: a clearly-a-placeholder dev-mode box. grid: adds a SystemGrid backdrop for a more finished look. */
  variant?: EmptyVariant;
  className?: string;
}

/** A polished stand-in for a section that hasn't been built yet — for staging pages incrementally without an ugly gap. */
export function EmptyComposition({
  icon,
  title = "Coming soon",
  description,
  cta,
  variant = "default",
  className,
}: EmptyCompositionProps) {
  const content = (
    <div className="relative flex flex-col items-center gap-4 py-4 text-center">
      <ScaleIn>
        <AnimatedNode status="idle" icon={icon ?? <Boxes className="size-5" />} size="lg" />
      </ScaleIn>
      <Heading level={3}>{title}</Heading>
      {description ? (
        <Body muted className="max-w-[var(--container-narrow)]">
          {description}
        </Body>
      ) : null}
      {cta ? <div className="pt-2">{cta}</div> : null}
    </div>
  );

  return (
    <SectionShell spacing="lg" className={cn("relative", className)}>
      {variant === "grid" ? <SystemGrid className="opacity-60" /> : null}
      <div
        className={cn(
          "relative flex items-center justify-center",
          variant === "dashed" && "rounded-2xl border-2 border-dashed border-border-strong py-16",
        )}
      >
        {content}
      </div>
    </SectionShell>
  );
}
