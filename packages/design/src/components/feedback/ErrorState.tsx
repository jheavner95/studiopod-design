import { AlertCircle } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

type ErrorStateProps = Omit<EmptyStateProps, "tone">;

/** EmptyState preset for a failed load/action — pair with a retry action via the `action` prop. */
export function ErrorState({ icon, ...props }: ErrorStateProps) {
  return <EmptyState tone="error" icon={icon ?? <AlertCircle className="size-5" aria-hidden />} {...props} />;
}
