import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { AssetWorkspaceAnatomyExplorer } from "./_components/AssetWorkspaceAnatomyExplorer";
import { AssetCardDemo } from "./_components/AssetCardDemo";
import { SELECTION_BEHAVIORS } from "./_data/selection-model";
import { EMPTY_STATES } from "./_data/empty-states";
import { ASSET_WORKSPACE_PRINCIPLES } from "./_data/principles";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { ASSET_WORKSPACE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const APPLIES_TO = [
  "Artwork Projects",
  "Products",
  "Styles",
  "Ratios",
  "Export Presets",
  "Publishing Jobs",
  "Orders",
  "Assets",
  "Integrations",
  "AI Models",
  "Providers",
  "Future business objects",
];

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
        href="/application-components/primary-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Primary Workspace
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
      <Link
        href="/application-components/workspace-certification"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Workspace Architecture Certification
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}

export default function AssetWorkspacePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · asset workspace"
          title="Asset workspace framework"
          description="The standard object-browsing experience used throughout StudioPOD — discovering, browsing, selecting, organizing, and preparing business objects for work. Documentation and an interactive demonstration only; this doesn't touch the production application."
        >
          <div className="flex flex-col gap-4 pt-2">
            <CrossLinks />
            <div className="flex flex-wrap gap-2">
              {APPLIES_TO.map((object) => (
                <Badge key={object} tone="neutral" size="sm">
                  {object}
                </Badge>
              ))}
            </div>
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Asset workspace anatomy"
            description="Select a region to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <AssetWorkspaceAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Asset card</Eyebrow>}
            title="Asset card anatomy"
            description="A real, interactive card — hover it, tab to it, click to select, or use Quick Actions and More. Every part is documented alongside it."
            descriptionMaxWidth={false}
          />
          <AssetCardDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Selection model</Eyebrow>}
            title="Selection model"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {SELECTION_BEHAVIORS.map((behavior) => (
              <Card key={behavior.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{behavior.title}</span>
                <Body size="sm" muted>
                  {behavior.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Empty states</Eyebrow>}
            title="Empty states"
            description="Eight distinct reasons an Asset Workspace can show nothing — each needs its own messaging, not one generic empty state."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {EMPTY_STATES.map((state) => (
              <Card key={state.id} className="flex h-full flex-col gap-3">
                <span className="text-body-sm font-medium text-ink-primary">{state.name}</span>
                <Body size="sm" muted>
                  {state.purpose}
                </Body>
                <div className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                  <Caption className="text-ink-tertiary">Messaging</Caption>
                  <Body size="sm" muted>
                    {state.messaging}
                  </Body>
                </div>
                {state.actions.length > 0 ? (
                  <div className="mt-auto flex flex-col gap-2 border-t border-border-subtle pt-3">
                    <Caption className="text-ink-tertiary">Recommended actions</Caption>
                    <div className="flex flex-wrap gap-2">
                      {state.actions.map((action) => (
                        <Badge key={action} tone="neutral" size="sm">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>}
            title="Workspace principles"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {ASSET_WORKSPACE_PRINCIPLES.map((principle) => (
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
                  <dd className="flex min-w-0 flex-col gap-2 text-body-sm text-ink-secondary">
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
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the asset workspace anatomy leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {ASSET_WORKSPACE_FUTURE_EXTENSIONS.map((extension) => (
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
            <Link href="/application-components/workspace-layout" className="text-accent-400 hover:text-accent-300">
              Workspace Layout
            </Link>
            , and{" "}
            <Link href="/application-components/workspace-toolbar" className="text-accent-400 hover:text-accent-300">
              Workspace Toolbar
            </Link>{" "}
            for how this workspace fits into the full anatomy.
          </Caption>
        </div>
      </SectionShell>
    </PageShell>
  );
}
