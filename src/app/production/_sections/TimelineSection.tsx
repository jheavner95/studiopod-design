import { ValidationTimeline } from "@/production";
import { artworkValidation } from "@/production/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** ValidationTimeline in both orientations, built on the MS-1.3 TimelineComposition. */
export function TimelineSection() {
  return (
    <PreviewSection
      id="validation-timeline"
      eyebrow="timeline"
      title="Timeline variants"
      description="A validation run read as a narrative timeline instead of a diagram, blocking stages called out along the way."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <DemoLabel>Vertical</DemoLabel>
          <div className="rounded-lg border border-border bg-surface p-6">
            <ValidationTimeline pipeline={artworkValidation} orientation="vertical" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <DemoLabel>Horizontal</DemoLabel>
          <div className="scrollbar-none overflow-x-auto rounded-lg border border-border bg-surface p-6">
            <ValidationTimeline pipeline={artworkValidation} orientation="horizontal" />
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
