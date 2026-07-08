import { Boxes } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body, CTAGroup, Button, Heading } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { GridOverlayProvider } from "./_lib/grid-overlay-context";
import { GridOverlay } from "./_components/GridOverlay";
import { PlaygroundNav } from "./_components/PlaygroundNav";
import { ColorsSection } from "./_sections/ColorsSection";
import { TypographySection } from "./_sections/TypographySection";
import { SpacingSection } from "./_sections/SpacingSection";
import { RadiusSection } from "./_sections/RadiusSection";
import { ShadowSection } from "./_sections/ShadowSection";
import { MotionSection } from "./_sections/MotionSection";
import { IllustrationSection } from "./_sections/IllustrationSection";
import { ComponentGallerySection } from "./_sections/ComponentGallerySection";
import { FormControlsSection } from "./_sections/FormControlsSection";
import { LayoutSection } from "./_sections/LayoutSection";
import { GridToolsSection } from "./_sections/GridToolsSection";
import { ThemePreviewSection } from "./_sections/ThemePreviewSection";

export default function DesignSystemPage() {
  return (
    <GridOverlayProvider>
      <PageShell background={<SystemGrid />}>
        <PlaygroundNav />
        <GridOverlay />

        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD / MS-1.2</SectionBadge>
            <Display>Design system showcase</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              A living demonstration of the StudioPOD design language, not documentation. Every token, motion
              curve, and primitive below is the real thing, wired up and interactive.
            </Body>
            <CTAGroup>
              <Button variant="primary" size="lg" href="#components">
                Explore components
              </Button>
              <Button variant="secondary" size="lg" href="#grid-tools">
                Grid tools
              </Button>
            </CTAGroup>
          </div>
        </SectionShell>

        <ColorsSection />
        <TypographySection />
        <SpacingSection />
        <RadiusSection />
        <ShadowSection />
        <MotionSection />
        <IllustrationSection />
        <ComponentGallerySection />
        <FormControlsSection />
        <LayoutSection />
        <GridToolsSection />
        <ThemePreviewSection />

        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col items-center gap-4 text-center">
            <Heading level={3}>Showcase complete</Heading>
            <Body muted className="max-w-[var(--container-narrow)]">
              Every primitive has been exercised on this page. The foundation is validated and ready for real
              page development to begin.
            </Body>
          </div>
        </SectionShell>
      </PageShell>
    </GridOverlayProvider>
  );
}
