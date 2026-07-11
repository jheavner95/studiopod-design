import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { ResponsiveRulesTable } from "@/components/table";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { ToolbarAnatomyExplorer } from "./_components/ToolbarAnatomyExplorer";
import { VariantCard } from "./_components/VariantCard";
import { TOOLBAR_VARIANTS } from "./_data/variants";
import { TOOLBAR_PRINCIPLES } from "./_data/principles";
import { TOOLBAR_MISTAKES } from "./_data/mistakes";
import { TOOLBAR_IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { TOOLBAR_RESPONSIVE_RULES } from "./_data/responsive-rules";
import { TOOLBAR_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workspace-toolbar")!;

export default function WorkspaceToolbarPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Toolbar anatomy"
            description="Select a region to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <ToolbarAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="variants"
            eyebrow={<Eyebrow tone="accent">Variants</Eyebrow>}
            title="Toolbar variants"
            description="The same eight regions, adapted to whatever mode the Primary Workspace is in — see Workspace Header's own variants for the header half of each pairing."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {TOOLBAR_VARIANTS.map((variant) => (
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
            title="Responsive behavior"
            description="Five dimensions of behavior across three conceptual breakpoints — see Workspace Layout's own Responsive Rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
          <ResponsiveRulesTable
            caption="Responsive rules: how five dimensions of toolbar behavior change across desktop, tablet, and mobile."
            rows={TOOLBAR_RESPONSIVE_RULES}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="principles" eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>} title="Toolbar principles" descriptionMaxWidth={false} />
          <CardGrid columns={4}>
            {TOOLBAR_PRINCIPLES.map((principle) => (
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
            {TOOLBAR_MISTAKES.map((mistake) => (
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
            description="A reference checklist for whoever builds the first real Workspace Toolbar."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={TOOLBAR_IMPLEMENTATION_GUIDANCE.map((item) => ({
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the toolbar anatomy leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {TOOLBAR_FUTURE_EXTENSIONS.map((extension) => (
              <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                <Body size="sm" muted>
                  {extension.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <Caption className="text-ink-tertiary">
            See also{" "}
            <Link href="/application-components/workspace-framework" className="text-accent-400 hover:text-accent-300">
              Workspace Framework
            </Link>
            ,{" "}
            <Link href="/application-components/workspace-header" className="text-accent-400 hover:text-accent-300">
              Workspace Header
            </Link>
            , and{" "}
            <Link href="/application-components/workspace-layout" className="text-accent-400 hover:text-accent-300">
              Workspace Layout
            </Link>{" "}
            for how this toolbar fits into the full workspace anatomy.
          </Caption>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
