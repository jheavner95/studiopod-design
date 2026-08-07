import { Info } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

type InfoStateProps = Omit<EmptyStateProps, "tone">;

/** EmptyState preset for a neutral, non-urgent heads-up that isn't an absence, a success, a warning, or an error. */
export function InfoState({ icon, ...props }: InfoStateProps) {
  return <EmptyState tone="info" icon={icon ?? <Info className="size-5" aria-hidden />} {...props} />;
}
