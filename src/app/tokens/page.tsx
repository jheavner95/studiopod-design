import { SectionShell } from "@/components/layout";
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

export default function TokensPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

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
