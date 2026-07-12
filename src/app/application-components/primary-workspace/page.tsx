import Link from "next/link";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { ResponsiveRulesTable } from "@/components/table";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PrimaryWorkspaceAnatomyExplorer } from "./_components/PrimaryWorkspaceAnatomyExplorer";
import { PlatformExampleCard } from "./_components/PlatformExampleCard";
import { WORKSPACE_MODES } from "./_data/modes";
import { PRIMARY_WORKSPACE_PRINCIPLES } from "./_data/principles";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { FUTURE_WORKSPACE_TYPES } from "./_data/future-types";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { PRIMARY_WORKSPACE_RESPONSIVE_RULES } from "./_data/responsive-rules";
import { PRIMARY_WORKSPACE_REGIONS } from "./_data/regions";

const entry = getEntry("primary-workspace")!;
const relatedComponents = [getEntry("asset-workspace")!, getEntry("inspector-workspace")!, getEntry("workspace-framework")!];

export default function PrimaryWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Four regions, top to bottom — select one to see its full purpose, examples, and how it reuses components defined elsewhere in the anatomy."
            descriptionMaxWidth={false}
          />
          <PrimaryWorkspaceAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The principles every region, mode, and control in this anatomy follows — and where the line sits against Asset Workspace, which handles discovery and selection rather than the creation, editing, review, and decision-making that happen here."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {PRIMARY_WORKSPACE_PRINCIPLES.map((principle) => (
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
            description="Six named screens, each paired with the Primary Working Surface type suited to that specific task — a platform can and does use more than one type across its different screens."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_EXAMPLES.map((example) => (
              <PlatformExampleCard key={example.id} example={example} />
            ))}
          </CardGrid>
          <Caption className="text-ink-tertiary">
            See also{" "}
            <Link href="/application-components/workspace-framework" className="text-accent-400 hover:text-accent-300">
              Workspace Framework
            </Link>
            &rsquo;s own Platform Examples, which describe each platform&rsquo;s default mode rather than one specific screen.
          </Caption>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Nine canonical modes a Primary Workspace can be in — purpose, typical UI, and how each transitions to the next — plus how five dimensions of that behavior change across desktop, tablet, and mobile."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WORKSPACE_MODES.map((mode) => (
              <Card key={mode.id} padding="lg" className="flex h-full flex-col gap-3">
                <span className="text-body-md font-medium text-ink-primary">{mode.name}</span>
                <Body size="sm" muted>
                  {mode.purpose}
                </Body>
                <div className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                  <Caption className="text-ink-tertiary">Typical UI characteristics</Caption>
                  <Body size="sm" muted>
                    {mode.uiCharacteristics}
                  </Body>
                </div>
                <div className="mt-auto flex flex-col gap-1 border-t border-border-subtle pt-3">
                  <Caption className="text-ink-tertiary">Transitions</Caption>
                  <Body size="sm" muted>
                    {mode.transitions}
                  </Body>
                </div>
              </Card>
            ))}
          </CardGrid>
          <ResponsiveRulesTable
            caption="Responsive rules: how five dimensions of Primary Workspace behavior change across desktop, tablet, and mobile."
            rows={PRIMARY_WORKSPACE_RESPONSIVE_RULES}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={ACCESSIBILITY_GUIDANCE.map((item) => ({ label: item.label, value: item.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How each region composes with — or reuses — components defined elsewhere in the design system, rather than reinventing the same idea locally."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {PRIMARY_WORKSPACE_REGIONS.map((region) => (
              <Card key={region.id} className="flex flex-col gap-3">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.reuseNotes}
                </Body>
                {region.reuseLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-4 border-t border-border-subtle pt-3">
                    {region.reuseLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="focus-ring rounded-md text-caption font-medium text-accent-400 hover:text-accent-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </CardGrid>
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
              description="Capabilities this anatomy does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {FUTURE_WORKSPACE_TYPES.map((type) => (
                <Card key={type.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{type.title}</span>
                  <Body size="sm" muted>
                    {type.description}
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
