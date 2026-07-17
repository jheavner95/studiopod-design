import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry, getRelatedLinks } from "@/lib/design-system-navigation";
import { PrimitiveGallery } from "./_components/PrimitiveGallery";
import { CompositionExamples } from "./_components/CompositionExamples";
import { LAYOUT_RULES } from "./_data/layout-rules";
import { LAYOUT_FUTURE_EXTENSIONS } from "./_data/future-extensions";
import { LAYOUT_PRIMITIVES } from "./_data/primitives";

const entry = getEntry("foundation-layout")!;
const relatedComponents = getRelatedLinks(entry);
const PRIMITIVE_COUNT = LAYOUT_PRIMITIVES.length;

const ACCESSIBILITY_TOPICS = [
  { label: "Reading order", note: "Every primitive renders its children in the same order they're passed — layout never reorders content visually in a way that diverges from DOM order." },
  { label: "Keyboard flow", note: "Primitives carry no focus behavior of their own; tab order follows DOM order exactly, which follows source order, which follows the order children are passed." },
  { label: "Focus order", note: "Because CSS (not DOM reordering) drives every responsive change here, focus order stays identical at every breakpoint — nothing a keyboard user experiences differs from what a screen-width change alone would suggest." },
  { label: "Responsive reflow", note: "Grid's column collapse and Inline's wrapping both reflow visually without touching DOM order — a sighted user resizing the window and a screen-reader user both encounter content in the same sequence." },
  { label: "Logical DOM order", note: `None of the ${PRIMITIVE_COUNT} primitives use CSS order or flex-direction: row-reverse — visual position always matches source position, the precondition for reading order and keyboard flow to agree.` },
];

export default function FoundationLayoutPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="overview" eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>} title="Primitives vs. components" descriptionMaxWidth={false} />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Components compose primitives</span>
              <Body size="sm" muted>
                A Queue Table is a Table (once built) arranging Job Status Cards inside a Stack — the operational
                component owns the domain meaning, the primitive owns the arrangement.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Primitives never contain business logic</span>
              <Body size="sm" muted>
                None of the {PRIMITIVE_COUNT} primitives on this page know what an asset, a job, or a provider is — they take
                children and a small set of layout props, nothing else. That&rsquo;s what makes them safe to reuse
                everywhere.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="Five rules for choosing a primitive over a hand-written layout — the line every arrangement in this system is expected to follow."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {LAYOUT_RULES.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="spacing"
            eyebrow={<Eyebrow tone="accent">Spacing</Eyebrow>}
            title="Padding vs. gap — two separate vocabularies, not one"
            description="DS-5A consolidated the padding/gap drift a token audit found across these primitives. The result is two padding scales and several intentionally distinct gap scales — not one universal spacing system. See docs/engineering-notes/14-spacing-consolidation.md for the full audit."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "Padding — structural scale", value: "Card, Surface, and Panel share one none/sm/md/lg -> p-0/p-4/p-6/p-8 map (src/lib/spacing.ts's SurfacePadding) — the register for ordinary, pervasive application UI." },
              { label: "Padding — spotlight scale", value: "GlassPanel and SurfacePanel share a separate sm/md/lg -> p-4/p-8/p-12 map (SpotlightPadding) — a deliberately more generous register, reserved for hero/marketing/spotlight moments, not merged with the structural scale despite the similar-looking prop shape." },
              { label: "Gap — Stack vs. Inline", value: "Different scales on purpose: Inline is tighter than Stack at every shared level, because horizontal row items (badges, toolbar controls) read as more related at a given distance than stacked vertical blocks do." },
              { label: "Gap — Grid/CardGrid", value: "Its own 3-level scale (sm/md/lg only), scoped to card-collection density. It happens to equal Stack's at md/lg — coincidence, not a shared dependency; Grid has no xs/xl level to align on." },
              { label: "Gap — ContentColumns", value: "An order of magnitude looser than every item-level gap in the system — it governs page-level column separation (two major content blocks), a categorically different job from item spacing." },
              { label: "Why not one shared gap map", value: "Every divergence above has a defensible semantic reason, confirmed during DS-5A's audit — forcing a single vocabulary across components whose named levels don't even line up would cost real clarity for a resemblance that's mostly coincidental." },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Interactive gallery"
            description="Select a primitive for its purpose, a live example, usage guidance, and common mistakes."
            descriptionMaxWidth={false}
          />
          <PrimitiveGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={ACCESSIBILITY_TOPICS.map((item) => ({ label: item.label, value: item.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition examples"
            description="Five recognizable shapes, each assembled entirely from the primitives above — no business logic, no fetched data."
            descriptionMaxWidth={false}
          />
          <CompositionExamples />
        </div>
      </SectionShell>

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

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description={`Capabilities the current ${PRIMITIVE_COUNT} primitives do not currently include:`}
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {LAYOUT_FUTURE_EXTENSIONS.map((extension) => (
                <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                  <Body size="sm" muted>
                    {extension.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
