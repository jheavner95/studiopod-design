import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface FeatureCardProps {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Icon + title + description card for feature grids. */
export function FeatureCard({ icon, title, description, footer, className }: FeatureCardProps) {
  return (
    <Card interactive className={cn("flex h-full flex-col gap-4", className)}>
      {icon ? (
        <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        <h3 className="text-heading-4 text-ink-primary">{title}</h3>
        <p className="text-body-sm text-ink-secondary">{description}</p>
      </div>
      {footer ? <div className="mt-auto pt-2">{footer}</div> : null}
    </Card>
  );
}
