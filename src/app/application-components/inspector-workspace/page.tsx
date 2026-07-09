import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { InspectorAnatomyExplorer } from "./_components/InspectorAnatomyExplorer";
import { VariantCard } from "./_components/VariantCard";
import { PlatformExampleCard } from "./_components/PlatformExampleCard";
import { INSPECTOR_VARIANTS } from "./_data/variants";
import { INSPECTOR_PRINCIPLES } from "./_data/principles";
import { INSPECTOR_RESPONSIVE_MODES } from "./_data/responsive-modes";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { FUTURE_INSPECTOR_EXTENSIONS } from "./_data/future-extensions";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { DESIGN_CONTRACT } from "./_data/design-contract";

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
        href="/application-components/primary-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Primary Workspace
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
      <Link
        href="/application-components/status-workspace"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Status Workspace
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

export default function InspectorWorkspacePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · inspector workspace"
          title="Inspector workspace framework"
          description="The standard contextual information and editing environment used throughout StudioPOD. The Inspector is never the primary workspace — it responds to the current selection and should feel identical across every platform. Documentation and an interactive demonstration only; this doesn't touch the production application."
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
            title="Inspector anatomy"
            description="Select a region to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <InspectorAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Variants</Eyebrow>}
            title="Inspector variants"
            description="The same eight regions, weighted differently depending on what's selected."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INSPECTOR_VARIANTS.map((variant) => (
              <VariantCard key={variant.id} variant={variant} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>} title="Inspector principles" descriptionMaxWidth={false} />
          <CardGrid columns={4}>
            {INSPECTOR_PRINCIPLES.map((principle) => (
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
            description="Five presentation modes, each appropriate at a different breakpoint — see Workspace Layout's own Responsive Rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INSPECTOR_RESPONSIVE_MODES.map((mode) => (
              <Card key={mode.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm font-medium text-ink-primary">{mode.name}</span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {mode.appropriateAt.map((breakpoint) => (
                      <Badge key={breakpoint} tone="accent" size="sm">
                        {breakpoint}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Body size="sm" muted>
                  {mode.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={ACCESSIBILITY_GUIDANCE.map((item) => ({ label: item.label, value: item.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future inspector extensions"
            description="Room the anatomy leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {FUTURE_INSPECTOR_EXTENSIONS.map((extension) => (
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

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Platform examples</Eyebrow>}
            title="Platform examples"
            description="Six named Inspectors, each built from the same eight regions with a different emphasis."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_EXAMPLES.map((example) => (
              <PlatformExampleCard key={example.id} example={example} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Design contract</Eyebrow>}
            title="Inspector design contract"
            description="The official checklist every future Inspector implementation must satisfy."
            descriptionMaxWidth={false}
          />
          <div className="rounded-lg border border-accent-500/30 bg-accent-soft/10 p-4 sm:p-6">
            <ul className="flex flex-col">
              {DESIGN_CONTRACT.map((item, index) => (
                <li
                  key={item.label}
                  className={
                    index < DESIGN_CONTRACT.length - 1
                      ? "flex items-start gap-3 border-b border-border-subtle py-4 first:pt-0"
                      : "flex items-start gap-3 py-4 first:pt-0"
                  }
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-body-sm font-medium text-ink-primary">{item.label}</span>
                    <Body size="sm" muted className="min-w-0 break-words">
                      {item.note}
                    </Body>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Caption className="text-ink-tertiary">
            See also{" "}
            <Link href="/application-components/workspace-framework" className="text-accent-400 hover:text-accent-300">
              Workspace Framework
            </Link>
            ,{" "}
            <Link href="/application-components/workspace-layout" className="text-accent-400 hover:text-accent-300">
              Workspace Layout
            </Link>
            ,{" "}
            <Link href="/application-components/workspace-toolbar" className="text-accent-400 hover:text-accent-300">
              Workspace Toolbar
            </Link>
            ,{" "}
            <Link href="/application-components/asset-workspace" className="text-accent-400 hover:text-accent-300">
              Asset Workspace
            </Link>
            , and{" "}
            <Link href="/application-components/primary-workspace" className="text-accent-400 hover:text-accent-300">
              Primary Workspace
            </Link>{" "}
            for how the Inspector fits into the full workspace anatomy.
          </Caption>
        </div>
      </SectionShell>
    </PageShell>
  );
}
