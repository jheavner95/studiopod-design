import { SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WorkspaceAnatomyExplorer } from "./_components/WorkspaceAnatomyExplorer";
import { PlatformPreviewCard } from "./_components/PlatformPreviewCard";
import { WORKSPACE_PRINCIPLES } from "./_data/principles";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workspace-framework")!;

export default function WorkspaceFrameworkPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="The seven regions"
            description="Select a region to see its full purpose, responsibilities, required and optional children, and how it reuses what's already been built."
            descriptionMaxWidth={false}
          />
          <WorkspaceAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="principles"
            eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>}
            title="Workspace design principles"
            description="What holds the anatomy together across platforms that otherwise have nothing in common."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WORKSPACE_PRINCIPLES.map((principle) => (
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
            id="platform-examples"
            eyebrow={<Eyebrow tone="accent">Platform examples</Eyebrow>}
            title="The same framework, six ways"
            description="Each platform picks a Primary Workspace mode and fills the Library with different objects — the anatomy around them never moves."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_EXAMPLES.map((example) => (
              <PlatformPreviewCard key={example.id} example={example} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future workspace extensions"
            description="Room the anatomy leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FUTURE_EXTENSIONS.map((extension) => (
              <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                <Body size="sm" muted>
                  {extension.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
