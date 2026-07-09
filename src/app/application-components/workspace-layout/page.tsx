import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { WidthModeExplorer } from "./_components/WidthModeExplorer";
import { DensityCard } from "./_components/DensityCard";
import { RegionLayoutCard } from "./_components/RegionLayoutCard";
import { ResponsiveRulesTable } from "./_components/ResponsiveRulesTable";
import { ScrollingDiagram } from "./_components/ScrollingDiagram";
import { HeightComparison } from "./_components/HeightComparison";
import { DENSITY_LEVELS } from "./_data/density";
import { REGION_LAYOUTS } from "./_data/region-layouts";
import { SCROLL_CONCEPTS } from "./_data/scrolling";
import { SPACING_RULES, SPACING_SCALE_NOTE } from "./_data/spacing";
import { LAYOUT_PRINCIPLES } from "./_data/principles";
import { LAYOUT_ANTI_PATTERNS } from "./_data/anti-patterns";
import { LAYOUT_FUTURE_EXTENSIONS } from "./_data/future-extensions";

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
        href="/application-components/workspace-header"
        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
      >
        Workspace Header
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

export default function WorkspaceLayoutPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · workspace layout"
          title="Workspace layout rules"
          description="The spatial language every StudioPOD workspace follows — how regions size, align, scroll, collapse, and respond. Not what they contain; see Workspace Framework and Workspace Header for that. Documentation and an interactive demonstration only, this doesn't touch the production application."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Width modes</Eyebrow>}
            title="Workspace width modes"
            description="Select a mode to see its purpose, typical use cases, and where it shows up — every width here is expressed as intent, never a pixel value."
            descriptionMaxWidth={false}
          />
          <WidthModeExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Density</Eyebrow>}
            title="Workspace density"
            description="Three levels, the same five dimensions each — spacing, table rows, card spacing, toolbar spacing, and inspector spacing."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {DENSITY_LEVELS.map((level) => (
              <DensityCard key={level.id} level={level} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Region layout</Eyebrow>}
            title="Canonical region layout"
            description="Six proportions for the Library / Primary Workspace / Inspector row, expressed as relative weights — the bars below are proportional, not measured."
            descriptionMaxWidth={false}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {REGION_LAYOUTS.map((layout) => (
              <RegionLayoutCard key={layout.id} layout={layout} />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Responsive rules</Eyebrow>}
            title="Responsive rules"
            description="Seven dimensions of behavior across three conceptual breakpoints — see Workspace Header's Responsive Behavior section for what this looks like on an actual header."
            descriptionMaxWidth={false}
          />
          <ResponsiveRulesTable />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Scrolling rules</Eyebrow>}
            title="Scrolling rules"
            description="Five concepts, six regions. Select a region below to see why it behaves the way it does."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {SCROLL_CONCEPTS.map((concept) => (
              <Card key={concept.term} className="flex flex-col gap-1.5">
                <span className="text-body-sm font-medium text-ink-primary">{concept.term}</span>
                <Body size="sm" muted>
                  {concept.definition}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <ScrollingDiagram />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Spacing</Eyebrow>}
            title="Spacing system"
            description="Six relationships, described relative to each other rather than as pixel values."
            descriptionMaxWidth={false}
          />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            <dl className="flex flex-col">
              {SPACING_RULES.map((rule, index) => (
                <div
                  key={rule.label}
                  className={
                    index < SPACING_RULES.length - 1
                      ? "flex flex-col gap-1.5 border-b border-border-subtle py-4 first:pt-0 sm:flex-row sm:gap-6"
                      : "flex flex-col gap-1.5 py-4 first:pt-0 sm:flex-row sm:gap-6"
                  }
                >
                  <dt className="w-full shrink-0 text-body-sm font-medium text-ink-primary sm:w-52">{rule.label}</dt>
                  <dd className="min-w-0 break-words text-body-sm text-ink-secondary">{rule.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Caption className="text-ink-tertiary">{SPACING_SCALE_NOTE}</Caption>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Heights</Eyebrow>}
            title="Height rules"
            description="Four relative tiers across six named regions — intent, not implementation values."
            descriptionMaxWidth={false}
          />
          <HeightComparison />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>} title="Layout principles" descriptionMaxWidth={false} />
          <CardGrid columns={4}>
            {LAYOUT_PRINCIPLES.map((principle) => (
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
            eyebrow={<Eyebrow tone="accent">Anti-patterns</Eyebrow>}
            title="Anti-patterns"
            description="Every one of these has shipped somewhere before — the rules above exist specifically to make them harder to repeat."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {LAYOUT_ANTI_PATTERNS.map((pattern) => (
              <Card key={pattern.title} className="flex flex-col gap-2 border-error/30 bg-error-soft/20">
                <span className="text-body-sm font-medium text-ink-primary">{pattern.title}</span>
                <Body size="sm" muted>
                  {pattern.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future workspace extensions"
            description="Room the layout rules leave for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {LAYOUT_FUTURE_EXTENSIONS.map((extension) => (
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
            </Link>{" "}
            and{" "}
            <Link href="/application-components/workspace-header" className="text-accent-400 hover:text-accent-300">
              Workspace Header
            </Link>{" "}
            for the regions these rules apply to.
          </Caption>
        </div>
      </SectionShell>
    </PageShell>
  );
}
