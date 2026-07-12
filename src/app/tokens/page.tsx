import { SectionShell, DescriptionList } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FoundationPaletteSection } from "./_sections/FoundationPaletteSection";
import { ColorsSection } from "./_sections/ColorsSection";
import { TypographySection } from "./_sections/TypographySection";
import { SpacingSection } from "./_sections/SpacingSection";
import { RadiusSection } from "./_sections/RadiusSection";
import { ShadowSection } from "./_sections/ShadowSection";

const entry = getEntry("tokens")!;

const relatedComponents = [getEntry("foundations")!, getEntry("core-components")!, getEntry("marketing-components")!];

const TOKEN_CATEGORIES = [
  { label: "Color", value: "Raw palette ramps plus the semantic layer (Canvas, Surface, Ink, Accent, Success, Warning, Error) components should actually consume." },
  { label: "Typography", value: "The type scale and weight pairings used across headings, body copy, and captions." },
  { label: "Spacing", value: "The scale that drives padding, gaps, and layout rhythm everywhere in the system." },
  { label: "Radius", value: "Corner-rounding values, from sharp to fully circular." },
  { label: "Shadow", value: "The elevation scale used to lift surfaces like popovers, dialogs, and dropdowns off the page." },
];

export default function TokensPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Five categories, one source of truth"
            description="Every color, size, and spacing value in the system traces back to a token defined here. Reach for these — and the semantic color layer in particular — before hand-typing a raw value."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={TOKEN_CATEGORIES} />
        </div>
      </SectionShell>

      {/* Foundation palette is placed first so the derivation reads
          top-down: the raw ramps, then the semantic meaning layered on
          top of them in Colors right after. */}
      <FoundationPaletteSection />
      <ColorsSection />
      <TypographySection />
      <SpacingSection />
      <RadiusSection />
      <ShadowSection />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
