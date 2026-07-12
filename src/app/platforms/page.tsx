import Link from "next/link";
import { Network } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { Alert } from "@/components/feedback";
import { SystemGrid } from "@/components/illustration";
import { DocsRelatedGrid } from "@/components/docs";
import { IllustrationDevProvider } from "@/illustrations";
import { getEntry } from "@/lib/design-system-navigation";
import { DOCK_CLEARANCE_CLASS } from "@/motion";
import { ControlDock } from "./_components/ControlDock";
import { ArchitectureGallerySection } from "./_sections/ArchitectureGallerySection";
import { LayerViewSection } from "./_sections/LayerViewSection";
import { DependencyViewSection } from "./_sections/DependencyViewSection";
import { ArtifactFlowSection } from "./_sections/ArtifactFlowSection";
import { NavigatorSection } from "./_sections/NavigatorSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

const relatedComponents = [
  {
    entry: getEntry("platform-architecture-doc")!,
    description:
      "The blueprint every domain platform is built against — layer composition, ownership model, and certification ladder.",
  },
  {
    entry: getEntry("production-library")!,
    description:
      "The sibling illustration-canvas playground for production and validation diagrams — diagram data, not real components.",
  },
  {
    entry: getEntry("capabilities-library")!,
    description:
      "The sibling illustration-canvas playground for capability and provider diagrams — diagram data, not real components.",
  },
];

export default function PlatformsPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />} className={DOCK_CLEARANCE_CLASS}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Network className="size-3.5" />}>Historical Reference</SectionBadge>
            <Display>Platform architecture library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD&apos;s platforms relate, built on the illustration and
              workflow engines:{" "}
              <code>{"<PlatformArchitectureDiagram architecture={data} />"}</code>. Every diagram on this page is
              rendered from a plain data value, no platform-specific rendering code exists anywhere here.
            </Body>
            <Alert tone="info" title="Historical Reference">
              This page shows an earlier version of these diagrams, kept for reference. See{" "}
              <Link
                href="/application-components/platform-architecture"
                className="text-accent-400 hover:text-accent-300"
              >
                Platform Architecture
              </Link>{" "}
              for the current version.
            </Alert>
          </div>
        </SectionShell>

        <ControlDock />

        <ArchitectureGallerySection />
        <LayerViewSection />
        <DependencyViewSection />
        <ArtifactFlowSection />
        <NavigatorSection />
        <ResponsiveSection />

        <SectionShell spacing="lg">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-components"
              eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
              title="Related components"
              descriptionMaxWidth={false}
            />
            <DocsRelatedGrid
              entries={relatedComponents.map(({ entry, description }) => ({
                id: entry.id,
                href: entry.href,
                title: entry.title,
                description,
              }))}
            />
          </div>
        </SectionShell>

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
