import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { HeaderAnatomyExplorer } from "./_components/HeaderAnatomyExplorer";
import { VariantCard } from "./_components/VariantCard";
import { ResponsiveMockups } from "./_components/ResponsiveMockups";
import { HEADER_VARIANTS } from "./_data/variants";
import { HEADER_PRINCIPLES } from "./_data/principles";
import { HEADER_MISTAKES } from "./_data/mistakes";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";

const entry = getEntry("workspace-header")!;
const relatedComponents = [getEntry("workspace-framework")!, getEntry("workspace-layout")!, getEntry("workspace-toolbar")!];

// The single accessibility-focused principle lives in its own Accessibility
// section instead of the general "When to use" grid.
const USAGE_PRINCIPLES = HEADER_PRINCIPLES.filter((principle) => principle.title !== "Accessibility first");
const ACCESSIBILITY_PRINCIPLE = HEADER_PRINCIPLES.find((principle) => principle.title === "Accessibility first");

// implementation-guidance.ts covers three different concerns — how the
// header is put together (Composition), how it's made usable (Accessibility),
// and forward-looking notes (Reference) — split across those sections below.
const COMPOSITION_LABELS = ["Required regions", "Optional regions", "Recommended spacing", "Action limits", "Badge limits", "Responsive rules"];
const COMPOSITION_GUIDANCE = IMPLEMENTATION_GUIDANCE.filter((item) => COMPOSITION_LABELS.includes(item.label));
const ACCESSIBILITY_GUIDANCE = IMPLEMENTATION_GUIDANCE.find((item) => item.label === "Accessibility guidance");
const MIGRATION_NOTES = IMPLEMENTATION_GUIDANCE.find((item) => item.label === "Reuse opportunities");
const FUTURE_ENHANCEMENTS = IMPLEMENTATION_GUIDANCE.find((item) => item.label === "Future extensions");

function renderGuidanceValue(item: { text: string; links?: { label: string; href: string }[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="min-w-0 break-words">{item.text}</span>
      {item.links ? (
        <span className="flex flex-wrap gap-4">
          {item.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 hover:text-accent-300"
            >
              {link.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          ))}
        </span>
      ) : null}
    </div>
  );
}

export default function WorkspaceHeaderPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Four regions, arranged left to right across the header — select one to see its full purpose, responsibilities, required and optional children, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <HeaderAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every Workspace Header follows, and what happens when a screen doesn't follow them."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <SectionHeader id="principles" title="Header principles" descriptionMaxWidth={false} />
            <CardGrid columns={4}>
              {USAGE_PRINCIPLES.map((principle) => (
                <Card key={principle.title} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                  <Body size="sm" muted>
                    {principle.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="common-mistakes"
              title="Common mistakes"
              description="Every one of these has shipped somewhere before — the anatomy above exists specifically to make them harder to repeat."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {HEADER_MISTAKES.map((mistake) => (
                <Card key={mistake.title} className="flex flex-col gap-2 border-error/30 bg-error-soft/20">
                  <span className="text-body-sm font-medium text-ink-primary">{mistake.title}</span>
                  <Body size="sm" muted>
                    {mistake.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Seven ways the same four regions adapt to whatever mode the Primary Workspace below the header is in — each card notes when to reach for it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {HEADER_VARIANTS.map((variant) => (
              <VariantCard key={variant.id} variant={variant} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="The same header, three widths"
            description="What collapses first, second, and last as the viewport narrows — Identity's icon and name are the only thing guaranteed to survive down to mobile."
            descriptionMaxWidth={false}
          />
          <ResponsiveMockups />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList
            items={[
              ...(ACCESSIBILITY_PRINCIPLE ? [{ label: ACCESSIBILITY_PRINCIPLE.title, value: ACCESSIBILITY_PRINCIPLE.explanation }] : []),
              ...(ACCESSIBILITY_GUIDANCE ? [{ label: ACCESSIBILITY_GUIDANCE.label, value: ACCESSIBILITY_GUIDANCE.text }] : []),
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="A reference checklist for whoever builds the first real Workspace Header."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={COMPOSITION_GUIDANCE.map((item) => ({
              label: item.label,
              value: renderGuidanceValue(item),
            }))}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="The other pieces of the Workspace Architecture group this header sits between."
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

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader id="migration-notes" title="Migration notes" descriptionMaxWidth={false} />
            <DescriptionList
              items={MIGRATION_NOTES ? [{ label: MIGRATION_NOTES.label, value: renderGuidanceValue(MIGRATION_NOTES) }] : []}
            />
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader id="future-enhancements" title="Future enhancements" descriptionMaxWidth={false} />
            <DescriptionList
              items={FUTURE_ENHANCEMENTS ? [{ label: FUTURE_ENHANCEMENTS.label, value: FUTURE_ENHANCEMENTS.text }] : []}
            />
          </div>

          <Caption className="text-ink-tertiary">
            See also the{" "}
            <Link href="/application-components/workspace-framework" className="text-accent-400 hover:text-accent-300">
              Workspace Framework
            </Link>{" "}
            for how this header fits into the full seven-region workspace anatomy.
          </Caption>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
