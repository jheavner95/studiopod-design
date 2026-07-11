import Link from "next/link";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { ResponsiveRulesTable } from "@/components/table";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PrimaryWorkspaceAnatomyExplorer } from "./_components/PrimaryWorkspaceAnatomyExplorer";
import { PlatformExampleCard } from "./_components/PlatformExampleCard";
import { WORKSPACE_MODES } from "./_data/modes";
import { PRIMARY_WORKSPACE_PRINCIPLES } from "./_data/principles";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { FUTURE_WORKSPACE_TYPES } from "./_data/future-types";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { PRIMARY_WORKSPACE_RESPONSIVE_RULES } from "./_data/responsive-rules";

const entry = getEntry("primary-workspace")!;

export default function PrimaryWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Primary workspace anatomy"
            description="Select a region to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <PrimaryWorkspaceAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="modes"
            eyebrow={<Eyebrow tone="accent">Modes</Eyebrow>}
            title="Workspace modes"
            description="Nine canonical modes a Primary Workspace can be in — purpose, typical UI, and how each transitions to the next."
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="principles" eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>} title="Workspace principles" descriptionMaxWidth={false} />
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
            id="responsive-behavior"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            description="Five dimensions of behavior across three conceptual breakpoints — see Workspace Layout's own Responsive Rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
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
            id="future-workspace-types"
            eyebrow={<Eyebrow tone="accent">Future workspace types</Eyebrow>}
            title="Future workspace types"
            description="Room the anatomy leaves for later — reserved, not scoped or committed."
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
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-examples"
            eyebrow={<Eyebrow tone="accent">Platform examples</Eyebrow>}
            title="Platform examples"
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
    </DocsShell>
  );
}
