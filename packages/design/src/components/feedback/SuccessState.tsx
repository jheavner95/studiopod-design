import { CheckCircle2 } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

type SuccessStateProps = Omit<EmptyStateProps, "tone">;

/** EmptyState preset for a completed outcome — "Publish succeeded", "All checks passed" — not an absence of data. */
export function SuccessState({ icon, ...props }: SuccessStateProps) {
  return <EmptyState tone="success" icon={icon ?? <CheckCircle2 className="size-5" aria-hidden />} {...props} />;
}
