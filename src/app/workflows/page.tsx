import { Waypoints } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { ControlDock } from "./_components/ControlDock";
import { WorkflowGallerySection } from "./_sections/WorkflowGallerySection";
import { PlaybackSection } from "./_sections/PlaybackSection";
import { TimelineSection } from "./_sections/TimelineSection";
import { RailAndCardSection } from "./_sections/RailAndCardSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

export default function WorkflowsPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Waypoints className="size-3.5" />}>StudioPOD / MS-2.3</SectionBadge>
            <Display>Workflow diagram library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain StudioPOD&apos;s workflows, built entirely on the illustration engine:{" "}
              <code>{"<WorkflowDiagram workflow={data} />"}</code>. Every diagram on this page is rendered from a
              plain data value, no page-specific rendering code exists anywhere here.
            </Body>
          </div>
        </SectionShell>

        <ControlDock />

        <WorkflowGallerySection />
        <PlaybackSection />
        <TimelineSection />
        <RailAndCardSection />
        <ResponsiveSection />

        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col items-center gap-4 text-center">
            <Body muted className="max-w-[var(--container-narrow)]">
              StudioPOD now has a reusable Workflow Diagram Library. Future marketing pages should choose a workflow
              definition rather than implementing a custom diagram.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
