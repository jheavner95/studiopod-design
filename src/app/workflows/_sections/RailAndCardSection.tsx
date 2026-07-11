import { WorkflowRail, WorkflowCard } from "@/workflows";
import { publishing } from "@/workflows/examples";
import { DemoLabel } from "../_components/preview-primitives";

/** WorkflowRail (built on ProgressRail) and WorkflowCard (built on FlowCard), both compact, embeddable summaries. */
export function RailAndCardSection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <DemoLabel>Rail</DemoLabel>
        <div className="rounded-lg border border-border bg-surface p-6">
          <WorkflowRail workflow={publishing} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <DemoLabel>Cards</DemoLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publishing.steps.map((step) => (
            <WorkflowCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}
