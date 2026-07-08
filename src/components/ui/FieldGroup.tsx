import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FieldGroupLayout = "vertical" | "horizontal" | "compact" | "card";

export interface FieldGroupProps {
  className?: string;
  children: ReactNode;
  layout?: FieldGroupLayout;
  /** Heading shown above the group — only meaningful for the "card" layout. */
  title?: ReactNode;
  description?: ReactNode;
}

const layoutStyles: Record<FieldGroupLayout, string> = {
  vertical: "flex flex-col gap-6",
  horizontal: "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start",
  compact: "flex flex-col gap-3",
  card: "flex flex-col gap-6 rounded-lg border border-border bg-surface p-6",
};

const childWrapStyles: Record<FieldGroupLayout, string> = {
  vertical: "flex flex-col gap-6",
  horizontal: "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start",
  compact: "flex flex-col gap-3",
  card: "flex flex-col gap-6",
};

/** Groups related fields (a settings section, a filter panel) with consistent spacing. */
export function FieldGroup({ className, children, layout = "vertical", title, description }: FieldGroupProps) {
  const hasHeading = Boolean(title || description);

  return (
    <div className={cn(layoutStyles[layout], className)}>
      {hasHeading ? (
        <div className="flex flex-col gap-1">
          {title ? <span className="text-body-md font-medium text-ink-primary">{title}</span> : null}
          {description ? <p className="text-body-sm text-ink-secondary">{description}</p> : null}
        </div>
      ) : null}
      {hasHeading ? <div className={childWrapStyles[layout]}>{children}</div> : children}
    </div>
  );
}
