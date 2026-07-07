import { Progress } from "@/motion";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getGateSummary } from "../utils";
import type { QualityGate } from "../types";

export interface QualitySummaryProps {
  gates: QualityGate[];
  className?: string;
}

/** An aggregate pass rate across a set of quality gates, built directly on the MS-2.1 Progress primitive. */
export function QualitySummary({ gates, className }: QualitySummaryProps) {
  const summary = getGateSummary(gates);
  const value = summary.total ? summary.passed / summary.total : 0;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <Caption>
          {summary.passed}/{summary.total} passed
        </Caption>
        <Caption className="text-ink-tertiary">
          {summary.failed > 0 && `${summary.failed} failed`}
          {summary.failed > 0 && summary.warning > 0 && ", "}
          {summary.warning > 0 && `${summary.warning} warning`}
        </Caption>
      </div>
      <Progress value={value} />
    </div>
  );
}
