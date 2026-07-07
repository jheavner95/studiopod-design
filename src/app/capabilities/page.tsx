import { Blocks } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { IllustrationDevProvider } from "@/illustrations";
import { ControlDock } from "./_components/ControlDock";
import { RegistryGallerySection } from "./_sections/RegistryGallerySection";
import { AICapabilitySection } from "./_sections/AICapabilitySection";
import { PublishingAndCommerceSection } from "./_sections/PublishingAndCommerceSection";
import { RegistryHealthSection } from "./_sections/RegistryHealthSection";
import { FailoverSection } from "./_sections/FailoverSection";
import { FocusModeSection } from "./_sections/FocusModeSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

export default function CapabilitiesPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Blocks className="size-3.5" />}>StudioPOD / MS-2.6</SectionBadge>
            <Display>Marketplace and AI capability library</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Reusable diagrams that explain how StudioPOD integrates AI, publishing, and commerce providers through a
              provider-agnostic capability architecture:{" "}
              <code>{"<CapabilityRegistryDiagram registry={data} />"}</code>. Every provider is an interchangeable
              implementation, no future provider requires a new diagram.
            </Body>
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
