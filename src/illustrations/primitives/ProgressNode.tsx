import { cn } from "@/lib/utils";
import { Progress } from "@/motion";
import { IllustrationNode, type IllustrationNodeProps } from "./IllustrationNode";

export interface ProgressNodeProps extends IllustrationNodeProps {
  /** 0–1. */
  progress: number;
}

/**
 * An IllustrationNode with a progress fill beneath it. IllustrationNode's
 * own label overflows below its box via absolute positioning (so the
 * Canvas can center connectors on the icon, not the label) — the gap here
 * is generous enough to clear a two-line label before the fill starts.
 */
export function ProgressNode({ progress, className, ...nodeProps }: ProgressNodeProps) {
  return (
    <div className={cn("flex flex-col items-center gap-16", className)}>
      <IllustrationNode {...nodeProps} />
      <Progress value={progress} className="w-16" />
    </div>
  );
}
