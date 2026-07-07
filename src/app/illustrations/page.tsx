import { Boxes } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { DevControlsPanel } from "./_components/DevControlsPanel";
import { NodeGallerySection } from "./_sections/NodeGallerySection";
import { ConnectionGallerySection } from "./_sections/ConnectionGallerySection";
import { StatusGallerySection } from "./_sections/StatusGallerySection";
import { GroupGallerySection } from "./_sections/GroupGallerySection";
import { PipelineGallerySection } from "./_sections/PipelineGallerySection";
import { LayoutGallerySection } from "./_sections/LayoutGallerySection";
import { ResponsiveGallerySection } from "./_sections/ResponsiveGallerySection";
import { StateGallerySection } from "./_sections/StateGallerySection";
import { DeveloperControlsSection } from "./_sections/DeveloperControlsSection";

export default function IllustrationsPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD / MS-2.2</SectionBadge>
            <Display>Illustration engine</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              A reusable engine that renders diagrams from data: <code>{"<IllustrationCanvas diagram={data} />"}</code>.
              Built on the MS-2.1 motion engine, not duplicating a single animation. No StudioPOD workflow or
              platform diagram lives here yet, only the machinery they&apos;ll be built from.
            </Body>
          </div>
        </SectionShell>

        <DevControlsPanel />

        <NodeGallerySection />
        <ConnectionGallerySection />
        <StatusGallerySection />
        <GroupGallerySection />
        <PipelineGallerySection />
        <LayoutGallerySection />
        <ResponsiveGallerySection />
        <StateGallerySection />
        <DeveloperControlsSection />

        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col items-center gap-4 text-center">
            <Body muted className="max-w-[var(--container-narrow)]">
              A complete reusable illustration engine now exists. Future work packages should only define data;
              ready for MS-2.3, the workflow diagrams built on top of it.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
