import { LayoutDashboard } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "@/components/feedback";

type DashboardEmptyStateProps = Omit<EmptyStateProps, "tone" | "title" | "description"> & {
  title?: EmptyStateProps["title"];
  description?: EmptyStateProps["description"];
};

/** A thin preset over Foundation Feedback's own EmptyState — the same pattern SuccessState/WarningState/ErrorState/InfoState already establish, just with dashboard-flavored default copy and icon rather than a new layout. */
export function DashboardEmptyState({
  icon = <LayoutDashboard className="size-5" aria-hidden />,
  title = "No widgets yet",
  description = "Add a widget to start building this dashboard.",
  action,
  className,
}: DashboardEmptyStateProps) {
  return <EmptyState tone="neutral" icon={icon} title={title} description={description} action={action} className={className} />;
}
