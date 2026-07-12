import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { Alert } from "@/components/feedback";
import { DocsRelatedGrid } from "@/components/docs";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { getEntry } from "@/lib/design-system-navigation";
import { ControlDock } from "./_components/ControlDock";
import { PipelineGallerySection } from "./_sections/PipelineGallerySection";
import { QualityGatesSection } from "./_sections/QualityGatesSection";
import { HealthDashboardSection } from "./_sections/HealthDashboardSection";
import { ArtifactLifecycleSection } from "./_sections/ArtifactLifecycleSection";
import { TimelineSection } from "./_sections/TimelineSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

const relatedComponents = [getEntry("production-platform")!];

export default function ProductionPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<ShieldCheck className="size-3.5" />}>Playground · Historical Reference</SectionBadge>
            <Display>Production and validation library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD ensures production quality, built on the motion,
              illustration, workflow, and platform architecture engines:{" "}
              <code>{"<ProductionPipelineDiagram pipeline={data} />"}</code>. Every diagram on this page is rendered
              from a plain data value, no production-specific rendering code exists anywhere here.
            </Body>
            <Alert tone="info" title="Historical Reference">
              This page shows an earlier version of these diagrams, kept for reference. See{" "}
              <Link
                href="/application-components/production-platform"
                className="text-accent-400 hover:text-accent-300"
              >
                Production
              </Link>{" "}
              for the current version.
            </Alert>
          </div>
        </SectionShell>

        <ControlDock />

        <PipelineGallerySection />
        <QualityGatesSection />
        <HealthDashboardSection />
        <ArtifactLifecycleSection />
        <TimelineSection />
        <ResponsiveSection />

        <SectionShell spacing="lg">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-components"
              eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
              title="Related components"
              description="Where this diagram library's subject matter is implemented as real, certified components."
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-4 sm:max-w-sm">
              <DocsRelatedGrid entries={relatedComponents} />
            </div>
          </div>
        </SectionShell>

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
