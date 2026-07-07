import { ShieldCheck } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { ControlDock } from "./_components/ControlDock";
import { PipelineGallerySection } from "./_sections/PipelineGallerySection";
import { QualityGatesSection } from "./_sections/QualityGatesSection";
import { HealthDashboardSection } from "./_sections/HealthDashboardSection";
import { ArtifactLifecycleSection } from "./_sections/ArtifactLifecycleSection";
import { TimelineSection } from "./_sections/TimelineSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

export default function ProductionPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<ShieldCheck className="size-3.5" />}>StudioPOD / MS-2.5</SectionBadge>
            <Display>Production and validation library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD ensures production quality, built on the motion,
              illustration, workflow, and platform architecture engines:{" "}
              <code>{"<ProductionPipelineDiagram pipeline={data} />"}</code>. Every diagram on this page is rendered
              from a plain data value, no production-specific rendering code exists anywhere here.
            </Body>
          </div>
        </SectionShell>

        <ControlDock />

        <PipelineGallerySection />
        <QualityGatesSection />
        <HealthDashboardSection />
        <ArtifactLifecycleSection />
        <TimelineSection />
        <ResponsiveSection />

        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col items-center gap-4 text-center">
            <Body muted className="max-w-[var(--container-narrow)]">
              StudioPOD now has a reusable Production &amp; Validation Library. The system can explain how it ensures
              production quality using structured data rather than custom illustrations.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
