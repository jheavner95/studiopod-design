import Link from "next/link";
import { Boxes } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { SectionBadge, Display, Body, CTAGroup, Button, Heading, SectionHeader, Eyebrow, Card } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { getEntry } from "@/lib/design-system-navigation";
import { GridOverlayProvider } from "./_lib/grid-overlay-context";
import { GridOverlay } from "./_components/GridOverlay";
import { PlaygroundNav } from "./_components/PlaygroundNav";
import { FoundationPaletteSection } from "./_sections/FoundationPaletteSection";
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

/** Real, grep-verifiable accessibility affordances built into this page and the primitives it exercises. */
const ACCESSIBILITY_NOTES = [
  {
    label: "Focus visibility",
    text: "Buttons, checkboxes, radios, toggles, sliders, and search inputs all share the same .focus-ring utility (src/styles/utilities.css), so a visible focus outline on :focus-visible is systemic rather than added per component.",
  },
  {
    label: "Reduced motion",
    text: "Every animated primitive reads its motion preference from the same MotionPreferenceProvider context. The Motion gallery's \"Reduced motion\" toggle below simulates the OS-level prefers-reduced-motion setting on demand, without touching your system preferences.",
  },
  {
    label: "Toggle and control state",
    text: "Pressable toggles expose aria-pressed (the grid overlay switches, and the motion toolbar's Replay/Play/Reduced-motion buttons), and grouped controls like SegmentedControl carry an explicit aria-label — View, Density, Speed — since their visual caption lives outside the control markup.",
  },
  {
    label: "Decorative icons",
    text: "Icons that repeat information already given as text, like the palette's ramp-to-token arrow, are marked aria-hidden so assistive tech skips the redundant glyph.",
  },
];

const entry = getEntry("design-system")!;
const relatedComponents = [getEntry("core-components")!, getEntry("tokens")!, getEntry("motion")!];

/** A short eyebrow + heading banner marking the start of a canonical content group, without duplicating the divider/eyebrow already built into each section below it. */
function GroupIntro({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <SectionShell id={id} spacing="sm" divider>
      <SectionHeader
        eyebrow={<Eyebrow tone="accent">{eyebrow}</Eyebrow>}
        title={title}
        description={description}
        descriptionMaxWidth={false}
      />
    </SectionShell>
  );
}

export default function DesignSystemPage() {
  return (
    <GridOverlayProvider>
      <PageShell background={<SystemGrid />}>
        <PlaygroundNav />
        <GridOverlay />

        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD design system</SectionBadge>
            <Display>{entry.title}</Display>
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

        <GroupIntro
          id="overview"
          eyebrow="Overview"
          title="Overview"
          description="The complete token system, top to bottom — the raw color ramps every semantic token is built from, and the mapping between them."
        />
        <FoundationPaletteSection />

        <GroupIntro
          id="when-to-use"
          eyebrow="When to use"
          title="When to use"
          description="Which token to reach for, and why — semantic color, type scale, spacing, radius, and elevation, each annotated with its real usage."
        />
        <ColorsSection />
        <TypographySection />
        <SpacingSection />
        <RadiusSection />
        <ShadowSection />

        <GroupIntro
          id="examples"
          eyebrow="Examples"
          title="Examples"
          description="Every core primitive and form control, live and interactive, plus the illustration vocabulary that visualizes StudioPOD as a running system."
        />
        <ComponentGallerySection />
        <FormControlsSection />
        <IllustrationSection />

        <GroupIntro
          id="behavior"
          eyebrow="Behavior"
          title="Behavior"
          description="How the system moves — entrance animations, status pulses, and the reduced-motion toggle every animated primitive respects."
        />
        <MotionSection />

        <SectionShell id="accessibility" spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
              title="Accessibility"
              description="Affordances that are systemic across the primitives on this page, not one-off additions."
              descriptionMaxWidth={false}
            />
            <DescriptionList items={ACCESSIBILITY_NOTES.map((note) => ({ label: note.label, value: note.text }))} />
          </div>
        </SectionShell>

        <GroupIntro
          id="composition"
          eyebrow="Composition"
          title="Composition"
          description="How the layout primitives — containers, section rhythm, column and grid patterns — assemble into a real page section, built from nothing but the primitives above."
        />
        <LayoutSection />
        <ThemePreviewSection />

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-components"
              eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
              title="Related components"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {relatedComponents.map((related) => (
                <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                  <Card interactive className="flex h-full flex-col gap-2">
                    <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                    <Body size="sm" muted>
                      {related.description}
                    </Body>
                  </Card>
                </Link>
              ))}
            </CardGrid>
          </div>
        </SectionShell>

        <GroupIntro
          id="reference"
          eyebrow="Reference"
          title="Reference"
          description="Developer-only alignment tools for checking a build against the grid, fixed to the viewport so they stay visible while scrolling."
        />
        <GridToolsSection />

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
