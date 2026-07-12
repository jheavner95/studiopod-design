import Link from "next/link";
import { Blocks } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { Alert } from "@/components/feedback";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { getEntry } from "@/lib/design-system-navigation";
import { DocsRelatedGrid } from "@/components/docs";
import { ControlDock } from "./_components/ControlDock";
import { RegistryGallerySection } from "./_sections/RegistryGallerySection";
import { AICapabilitySection } from "./_sections/AICapabilitySection";
import { PublishingAndCommerceSection } from "./_sections/PublishingAndCommerceSection";
import { RegistryHealthSection } from "./_sections/RegistryHealthSection";
import { FailoverSection } from "./_sections/FailoverSection";
import { FocusModeSection } from "./_sections/FocusModeSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

const relatedComponents = [
  {
    entry: getEntry("integrations-platform")!,
    description:
      "The real, certified platform this playground's provider and capability diagrams describe — provider registry, connections, mappings, and sync monitoring.",
  },
  {
    entry: getEntry("platforms-library")!,
    description:
      "The sibling illustration-canvas playground for platform architecture diagrams — diagram data, not real components.",
  },
  {
    entry: getEntry("production-library")!,
    description:
      "The sibling illustration-canvas playground for production and validation diagrams — diagram data, not real components.",
  },
];

export default function CapabilitiesPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Blocks className="size-3.5" />}>Historical Reference</SectionBadge>
            <Display>Marketplace and AI capability library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD integrates AI, publishing, and commerce providers through a
              provider-agnostic capability architecture:{" "}
              <code>{"<CapabilityRegistryDiagram registry={data} />"}</code>. Every provider is an interchangeable
              implementation, no future provider requires a new diagram.
            </Body>
            <Alert tone="info" title="Historical Reference">
              This page shows an earlier version of these diagrams, kept for reference. See{" "}
              <Link
                href="/application-components/integrations-platform"
                className="text-accent-400 hover:text-accent-300"
              >
                Integrations
              </Link>{" "}
              for the current version.
            </Alert>
          </div>
        </SectionShell>

        <ControlDock />

        <RegistryGallerySection />
        <AICapabilitySection />
        <PublishingAndCommerceSection />
        <RegistryHealthSection />
        <FailoverSection />
        <FocusModeSection />
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
              StudioPOD now has a reusable Capability Library. Every provider is treated as an interchangeable
              implementation of a capability, no future provider should require building a new diagram.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
