import { AlertTriangle } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

type WarningStateProps = Omit<EmptyStateProps, "tone">;

/** EmptyState preset for a non-blocking concern worth surfacing — "3 assets are missing metadata" — the reader can still proceed. */
export function WarningState({ icon, ...props }: WarningStateProps) {
  return <EmptyState tone="warning" icon={icon ?? <AlertTriangle className="size-5" aria-hidden />} {...props} />;
}
