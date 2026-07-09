import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { WorkspaceAnatomyExplorer } from "./_components/WorkspaceAnatomyExplorer";
import { PlatformPreviewCard } from "./_components/PlatformPreviewCard";
import { WORKSPACE_PRINCIPLES } from "./_data/principles";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { FUTURE_EXTENSIONS } from "./_data/future-extensions";

export default function WorkspaceFrameworkPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · workspace framework"
          title="Workspace shell anatomy"
          description="Every StudioPOD platform — Publishing, Commerce, Production, and beyond — shares one workspace anatomy: seven regions, always in the same place. Documentation and an interactive demonstration only; this doesn't touch the production application."
        >
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/application-components/workspace-header"
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Workspace Header framework
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/application-components/workspace-layout"
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Workspace Layout rules
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/application-components/workspace-toolbar"
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Workspace Toolbar framework
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/application-components/asset-workspace"
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Asset Workspace framework
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/application-components/primary-workspace"
              className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Primary Workspace region
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
    </PageShell>
  );
}
