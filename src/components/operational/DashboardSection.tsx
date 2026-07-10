import type { ReactNode } from "react";
import { Inline } from "@/components/layout";
import { Body } from "@/components/ui";
import { LoadingState } from "@/components/feedback";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** True for both an initial load and a caller-triggered refresh — the region swaps to Foundation Feedback's own LoadingState either way rather than a second placeholder implementation. */
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
  className?: string;
}

/** One titled region of a dashboard — a header row (title/description/actions) above a widget collection, distinct from DashboardGrid itself so a dashboard can stack several titled sections, each with its own grid. */
export function DashboardSection({ title, description, actions, loading, loadingLabel, children, className }: DashboardSectionProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-body-md font-medium text-ink-primary">{title}</span>
          {description ? (
            <Body size="sm" muted>
              {description}
            </Body>
          ) : null}
        </div>
        {actions ? <Inline gap="xs">{actions}</Inline> : null}
      </div>
      {loading ? <LoadingState label={loadingLabel} /> : children}
    </div>
  );
}
