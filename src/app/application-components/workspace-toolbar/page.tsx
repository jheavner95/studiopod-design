import Link from "next/link";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { ResponsiveRulesTable } from "@/components/table";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
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
const relatedComponents = [getEntry("workspace-framework")!, getEntry("workspace-header")!, getEntry("workspace-layout")!];

function guidanceItems(category: "composition" | "accessibility") {
  return TOOLBAR_IMPLEMENTATION_GUIDANCE.filter((item) => item.category === category).map((item) => ({
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
              </Link>
            ))}
          </span>
        ) : null}
      </div>
    ),
  }));
}

export default function WorkspaceToolbarPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eight regions, left to right — select one to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <ToolbarAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The principles every region in this toolbar follows — where interaction belongs, and how it stays out of the Workspace Header's way."
            descriptionMaxWidth={false}
          />
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
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Seven ways the same eight regions adapt to whatever mode the Primary Workspace is in — see Workspace Header's own variants for the header half of each pairing."
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
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Five dimensions of behavior across three conceptual breakpoints, plus the mistakes that show up when those rules aren't followed — see Workspace Layout's own Responsive Rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
          <ResponsiveRulesTable
            caption="Responsive rules: how five dimensions of toolbar behavior change across desktop, tablet, and mobile."
            rows={TOOLBAR_RESPONSIVE_RULES}
          />
          <CardGrid columns={4}>
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
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Accessibility"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={guidanceItems("accessibility")} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="A reference checklist for whoever builds the first real Workspace Toolbar."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={guidanceItems("composition")} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="How this toolbar fits into the full workspace anatomy."
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
              description="Room the current anatomy leaves for later — reserved, not scoped or committed."
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
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
