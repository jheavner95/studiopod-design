import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type HealthIssueSeverity = "critical" | "warning" | "info";

export interface HealthIssueEntry {
  id: string;
  title: string;
  detail?: string;
  severity: HealthIssueSeverity;
}

interface HealthIssueListProps {
  issues: HealthIssueEntry[];
  emptyMessage?: string;
  className?: string;
}

const SEVERITY_ICON: Record<HealthIssueSeverity, typeof AlertCircle> = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const SEVERITY_TEXT: Record<HealthIssueSeverity, string> = {
  critical: "text-error",
  warning: "text-warning",
  info: "text-accent-400",
};

/** What's currently wrong, one row per issue, ranked by the caller (this component doesn't re-sort by severity). Fills the "QA Finding Card" gap the DS-0.2 inventory has tracked as Needed. */
export function HealthIssueList({ issues, emptyMessage = "No active issues", className }: HealthIssueListProps) {
  if (issues.length === 0) {
    return <Caption className={cn("text-ink-tertiary", className)}>{emptyMessage}</Caption>;
  }

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {issues.map((issue) => {
        const Icon = SEVERITY_ICON[issue.severity];
        return (
          <li key={issue.id} className="flex items-start gap-2.5 rounded-md border border-border-subtle px-3 py-2">
            <Icon className={cn("mt-0.5 size-3.5 shrink-0", SEVERITY_TEXT[issue.severity])} aria-hidden />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-body-sm font-medium text-ink-primary">{issue.title}</span>
              {issue.detail ? <Caption className="text-ink-tertiary">{issue.detail}</Caption> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
