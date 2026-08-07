import { CheckCircle2, XCircle } from "lucide-react";
import { Expand } from "@/motion";
import { Badge, Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ProductionPipelineDiagram, type ProductionPipelineDiagramProps } from "./ProductionPipelineDiagram";
import { getResultsForStage } from "../utils";
import type { ValidationSeverity } from "../types";

const SEVERITY_TONE: Record<ValidationSeverity, "neutral" | "warning" | "error"> = {
  info: "neutral",
  warning: "warning",
  error: "error",
  critical: "error",
};

export type ValidationDiagramProps = ProductionPipelineDiagramProps;

/**
 * Decorates ProductionPipelineDiagram with the validation rules and
 * results for whichever stage is selected, rather than reimplementing the
 * stage-chain rendering itself.
 */
export function ValidationDiagram({
  pipeline,
  selectedStageId,
  onSelectStage,
  className,
  ...rest
}: ValidationDiagramProps) {
  const selectedStage = pipeline.stages.find((stage) => stage.id === selectedStageId);
  const results = selectedStage ? getResultsForStage(selectedStage.id, pipeline.results) : [];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ProductionPipelineDiagram
        pipeline={pipeline}
        selectedStageId={selectedStageId}
        onSelectStage={onSelectStage}
        {...rest}
      />

      <Expand open={Boolean(selectedStage)}>
        {selectedStage && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body-sm font-medium text-ink-primary">{selectedStage.title}</span>
              {selectedStage.blocking && (
                <Badge tone="error" size="sm">
                  Blocking
                </Badge>
              )}
            </div>
            {selectedStage.rules && selectedStage.rules.length > 0 && (
              <ul className="flex flex-col gap-2">
                {selectedStage.rules.map((rule) => {
                  const result = results.find((item) => item.ruleId === rule.id);
                  const passed = result?.passed ?? false;
                  return (
                    <li key={rule.id} className="flex items-start gap-2">
                      {passed ? (
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                      ) : (
                        <XCircle className="mt-0.5 size-4 shrink-0 text-error" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-body-sm text-ink-primary">{rule.title}</span>
                        {result?.message && <Caption className="text-ink-tertiary">{result.message}</Caption>}
                      </div>
                      <Badge tone={SEVERITY_TONE[rule.severity]} size="sm" className="ml-auto">
                        {rule.severity}
                      </Badge>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </Expand>
    </div>
  );
}
