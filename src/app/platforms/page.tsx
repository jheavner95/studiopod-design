import { Network } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { ControlDock } from "./_components/ControlDock";
import { ArchitectureGallerySection } from "./_sections/ArchitectureGallerySection";
import { LayerViewSection } from "./_sections/LayerViewSection";
import { DependencyViewSection } from "./_sections/DependencyViewSection";
import { ArtifactFlowSection } from "./_sections/ArtifactFlowSection";
import { NavigatorSection } from "./_sections/NavigatorSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

export default function PlatformsPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Network className="size-3.5" />}>StudioPOD / MS-2.4</SectionBadge>
            <Display>Platform architecture library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD&apos;s platforms relate, built on the illustration and
              workflow engines:{" "}
              <code>{"<PlatformArchitectureDiagram architecture={data} />"}</code>. Every diagram on this page is
              rendered from a plain data value, no platform-specific rendering code exists anywhere here.
            </Body>
          </div>
        </SectionShell>

        <ControlDock />

        <ArchitectureGallerySection />
        <LayerViewSection />
        <DependencyViewSection />
        <ArtifactFlowSection />
        <NavigatorSection />
        <ResponsiveSection />

        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col items-center gap-4 text-center">
            <Body muted className="max-w-[var(--container-narrow)]">
              StudioPOD now has a reusable Platform Architecture Library. The architecture can be explained anywhere
              in the product using structured data instead of custom illustrations.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
