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

export default function WorkspaceHeaderPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Workspace header anatomy"
            description="Select a region to see its full purpose, responsibilities, required and optional children, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <HeaderAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="variants"
            eyebrow={<Eyebrow tone="accent">Variants</Eyebrow>}
            title="Header variants"
            description="The same four regions, adapted to whatever mode the Primary Workspace below the header is in."
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
            id="responsive-behavior"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="The same header, three widths"
            description="What collapses first, second, and last as the viewport narrows — Identity's icon and name are the only thing guaranteed to survive down to mobile."
            descriptionMaxWidth={false}
          />
          <ResponsiveMockups />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="principles"
            eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>}
            title="Header principles"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {HEADER_PRINCIPLES.map((principle) => (
              <Card key={principle.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                <Body size="sm" muted>
                  {principle.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="common-mistakes"
            eyebrow={<Eyebrow tone="accent">Common mistakes</Eyebrow>}
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
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="implementation-guidance"
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            description="A reference checklist for whoever builds the first real Workspace Header."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={IMPLEMENTATION_GUIDANCE.map((item) => ({
              label: item.label,
              value: (
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
              ),
            }))}
          />
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
