import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";

const SIZE_MAP = { sm: "size-4", md: "size-6", lg: "size-8" };

interface LoadingStateProps {
  label?: ReactNode;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

/**
 * A full-region loading placeholder — spinner + label, centered. For an
 * action's own loading state, Button already has a built-in `loading` prop
 * (the same Loader2 + animate-spin pattern reused here); for a shape-accurate
 * placeholder while content streams in, use Skeleton instead of this.
 */
export function LoadingState({ label = "Loading…", size = "md", className }: LoadingStateProps) {
  return (
    <div role="status" className={cn("flex flex-col items-center justify-center gap-3 py-10 text-center", className)}>
      <Loader2 className={cn("animate-spin text-ink-tertiary", SIZE_MAP[size])} aria-hidden />
      <Body size="sm" muted>
        {label}
      </Body>
    </div>
  );
}
