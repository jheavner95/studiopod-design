import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { PrimaryWorkspaceAnatomyExplorer } from "./_components/PrimaryWorkspaceAnatomyExplorer";
import { ResponsiveRulesTable } from "./_components/ResponsiveRulesTable";
import { PlatformExampleCard } from "./_components/PlatformExampleCard";
import { WORKSPACE_MODES } from "./_data/modes";
import { PRIMARY_WORKSPACE_PRINCIPLES } from "./_data/principles";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { FUTURE_WORKSPACE_TYPES } from "./_data/future-types";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";

function CrossLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/application-components/workspace-framework"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Workspace Framework
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/workspace-layout"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Workspace Layout
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/workspace-toolbar"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Workspace Toolbar
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/asset-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Asset Workspace
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/inspector-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Inspector Workspace
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/status-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Operational Status workspace
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}

export default function PrimaryWorkspacePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · primary workspace"
          title="Primary workspace region"
          description="The central working surface of every StudioPOD platform. Unlike the Asset Workspace, which focuses on discovery and selection, the Primary Workspace focuses on creation, editing, review, execution, and decision-making. Documentation and an interactive demonstration only; this doesn't touch the production application."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
          <SectionHeader eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>} title="Workspace principles" descriptionMaxWidth={false} />
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
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            description="Five dimensions of behavior across three conceptual breakpoints — see Workspace Layout's own Responsive Rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
          <ResponsiveRulesTable />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            <dl className="flex flex-col">
              {ACCESSIBILITY_GUIDANCE.map((item, index) => (
                <div
                  key={item.label}
                  className={
                    index < ACCESSIBILITY_GUIDANCE.length - 1
                      ? "flex flex-col gap-1.5 border-b border-border-subtle py-4 first:pt-0 sm:flex-row sm:gap-6"
                      : "flex flex-col gap-1.5 py-4 first:pt-0 sm:flex-row sm:gap-6"
                  }
                >
                  <dt className="w-full shrink-0 text-body-sm font-medium text-ink-primary sm:w-56">{item.label}</dt>
                  <dd className="min-w-0 break-words text-body-sm text-ink-secondary">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
    </PageShell>
  );
}
