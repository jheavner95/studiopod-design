import { WorkflowTimeline } from "@/workflows";
import { artworkProduction } from "@/workflows/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** WorkflowTimeline in both orientations, built on the MS-1.3 TimelineComposition. */
export function TimelineSection() {
  return (
    <PreviewSection
      id="workflow-timeline"
      eyebrow="timeline"
      title="Timeline variants"
      description="A workflow rendered as a status timeline instead of a diagram, useful anywhere a step-by-step narrative reads better than a spatial layout."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <DemoLabel>Vertical</DemoLabel>
          <div className="rounded-lg border border-border bg-surface p-6">
            <WorkflowTimeline workflow={artworkProduction} orientation="vertical" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <DemoLabel>Horizontal</DemoLabel>
          <div className="scrollbar-none overflow-x-auto rounded-lg border border-border bg-surface p-6">
            <WorkflowTimeline workflow={artworkProduction} orientation="horizontal" />
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
