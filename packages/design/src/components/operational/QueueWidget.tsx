import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { Caption } from "@/components/ui";
import type { LinkComponent } from "@/framework";
import { Queue } from "./Queue";
import type { QueueRowJob } from "./QueueRow";

export interface QueueWidgetProps<T extends QueueRowJob> {
  title: ReactNode;
  caption: ReactNode;
  jobs: T[];
  /** Caps the visible rows for a dashboard-tile-sized footprint; the remainder surfaces as a "+N more" count rather than an unbounded table. */
  limit?: number;
  viewAllHref?: string;
  onRowClick?: (job: T) => void;
  className?: string;
  /** What renders the link. Defaults to `"a"`; pass your framework's link component for client-side navigation. A prop, not context, so this component stays server-safe. */
  linkComponent?: LinkComponent;
}

/** The dashboard-tile-shaped preset of Queue & Job's own Queue — same table underneath, with a row limit and a "view all" link added for a bounded dashboard footprint rather than an unbounded queue view. */
export function QueueWidget<T extends QueueRowJob>({ title, caption, jobs, limit, viewAllHref, onRowClick, className, linkComponent }: QueueWidgetProps<T>) {
  const LinkEl = linkComponent ?? "a";
  const visible = limit ? jobs.slice(0, limit) : jobs;
  const overflow = limit ? Math.max(jobs.length - limit, 0) : 0;

  return (
    <Panel padding="none" className={className}>
      <Queue title={title} caption={caption} jobs={visible} onRowClick={onRowClick} />
      {overflow > 0 || viewAllHref ? (
        <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-3">
          {overflow > 0 ? <Caption className="text-ink-tertiary">+{overflow} more</Caption> : <span />}
          {viewAllHref ? (
            <LinkEl href={viewAllHref} className="focus-ring rounded-md text-caption font-medium text-accent-400 hover:text-accent-300">
              View all
            </LinkEl>
          ) : null}
        </div>
      ) : null}
    </Panel>
  );
}
