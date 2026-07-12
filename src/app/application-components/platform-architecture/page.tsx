import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Lightbulb,
  FolderOpen,
  Layers,
  ShieldCheck,
  Package,
  Rocket,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, GlassPanel } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PlatformArchitectureDiagram, PlatformLegend } from "@/platforms";
import { completeArchitecture } from "@/platforms/examples";
import { WorkflowDiagram } from "@/workflows";
import { canonicalProductionFlow } from "@/workflows/examples";
import { CANONICAL_PRODUCTION_FLOW, CANONICAL_VOCABULARY } from "@/lib/canonical";
import { PLATFORM_ARCHITECTURE_TOPICS } from "./_data/architecture";
import { PLATFORM_ANATOMY } from "./_data/anatomy";
import { PLATFORM_TEMPLATES } from "./_data/templates";
import { LAYER_STACK, LAYERING_STATEMENT } from "./_data/layers";
import { OWNERSHIP_MODEL } from "./_data/ownership";
import { PLATFORM_RULES } from "./_data/rules";
import { PLATFORM_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("platform-architecture-doc")!;
const relatedComponents = [getEntry("production-platform")!, getEntry("docs-platform")!, getEntry("application-composition-doc")!];

const LAYER_STATUS_TONE: Record<string, "success" | "warning" | "accent" | "neutral"> = {
  certified: "success",
  "certified-production-ready": "warning",
  defined: "accent",
  future: "neutral",
};

const LAYER_STATUS_LABEL: Record<string, string> = {
  certified: "Established",
  "certified-production-ready": "Production Ready",
  defined: "Defined",
  future: "Future",
};

const STAGE_ICONS: Record<string, ReactNode> = {
  "creative-brief": <Lightbulb className="size-5" />,
  "artwork-project": <FolderOpen className="size-5" />,
  composition: <Layers className="size-5" />,
  validation: <ShieldCheck className="size-5" />,
  "production-package": <Package className="size-5" />,
  publishing: <Rocket className="size-5" />,
  commerce: <ShoppingCart className="size-5" />,
  "performance-intelligence": <Sparkles className="size-5" />,
};

/** What a stage receives from the one before it, and what it hands to the one after — the same artifact, evolving. */
const STAGE_FLOW: Record<string, { enters: string; leaves: string }> = {
  "creative-brief": { enters: "An idea", leaves: "An approved concept" },
  "artwork-project": { enters: "An approved concept", leaves: "A working file" },
  composition: { enters: "A working file", leaves: "Arranged artwork" },
  validation: { enters: "Arranged artwork", leaves: "A cleared quality gate" },
  "production-package": { enters: "A cleared quality gate", leaves: "A manufacturing-ready bundle" },
  publishing: { enters: "A manufacturing-ready bundle", leaves: "A live marketplace listing" },
  commerce: { enters: "A live marketplace listing", leaves: "A fulfilled order" },
  "performance-intelligence": { enters: "A fulfilled order", leaves: "Insight for the next brief" },
};

/** One real product, followed through all eight stages — the same running example the rest of the documentation reuses. */
const STAGE_EXAMPLE: Record<string, string> = {
  "creative-brief": "Trailhead mug wrap: a redesign brief is approved.",
  "artwork-project": "Trailhead mug wrap: the working file opens against the drinkware template.",
  composition: "Trailhead mug wrap: new artwork is arranged inside the wrap's safe zone.",
  validation: "Trailhead mug wrap: clears its quality gate — bleed, resolution, color profile.",
  "production-package": "Trailhead mug wrap: packaged as MUG-TH-014 and added to Batch run #204.",
  publishing: "Trailhead mug wrap: goes live as a marketplace listing on Etsy and Shopify.",
  commerce: "Trailhead mug wrap: first order captured, payment confirmed, routed to fulfillment.",
  "performance-intelligence": "Trailhead mug wrap: strong week-one sell-through informs the next brief.",
};

const BUSINESS_ARTIFACTS: { term: string; icon: ReactNode }[] = [
  { term: "Creative Brief", icon: <Lightbulb className="size-5" /> },
  { term: "Artwork Project", icon: <FolderOpen className="size-5" /> },
  { term: "Production Package", icon: <Package className="size-5" /> },
  { term: "Marketplace Listing", icon: <Store className="size-5" /> },
  { term: "Commerce", icon: <ShoppingCart className="size-5" /> },
  { term: "Performance Intelligence", icon: <Sparkles className="size-5" /> },
];

function vocabDefinition(term: string): string {
  return CANONICAL_VOCABULARY.find((entry) => entry.term === term)?.definition ?? "";
}

export default function PlatformArchitecturePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <Body size="lg" className="max-w-[var(--container-narrow)] font-medium text-ink-primary">
          StudioPOD is a Production Operating System — not a design system, not a workflow tool, not a UI library.
          Every screen and every component exists to move one thing forward: a real product, from a Creative Brief
          to a completed sale.
        </Body>
      </DocsPageHeader>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="production-flow"
            eyebrow={<Eyebrow tone="accent">The production flow</Eyebrow>}
            title="One flow. Eight stages. Every layer builds toward it."
            description="This is the flow every platform, workflow, and component in this system ultimately serves — a Creative Brief becoming a shipped, selling product."
            descriptionMaxWidth={false}
          />

          <GlassPanel padding="lg" glow className="flex w-full flex-col gap-8">
            <div className="scrollbar-none overflow-x-auto py-2">
              <div className="w-max min-w-[960px]">
                <WorkflowDiagram workflow={canonicalProductionFlow} layout="horizontal" nodeSize="lg" />
              </div>
            </div>
          </GlassPanel>

          <CardGrid columns={4}>
            {CANONICAL_PRODUCTION_FLOW.map((stage) => (
              <Card key={stage.id} className="flex flex-col gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-accent-500/40 bg-accent-soft text-accent-400">
                  {STAGE_ICONS[stage.id]}
                </span>
                <span className="text-body-md font-medium text-ink-primary">{stage.title}</span>
                <Body size="sm" muted>
                  {stage.description}
                </Body>
                <Caption className="text-ink-tertiary">
                  In: {STAGE_FLOW[stage.id].enters} · Out: {STAGE_FLOW[stage.id].leaves}
                </Caption>
                <div className="rounded-md border border-accent-500/20 bg-accent-soft/60 px-3 py-2">
                  <Caption className="text-accent-400">{STAGE_EXAMPLE[stage.id]}</Caption>
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-relationships"
            eyebrow={<Eyebrow tone="accent">Platform relationships</Eyebrow>}
            title="Eight platforms. One operating system."
            description="Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations aren't eight separate products — each one owns exactly one stage of the value chain above, and hands its output to the next."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface p-6">
            <div className="flex flex-col gap-1">
              <span className="text-body-md font-medium text-ink-primary">{completeArchitecture.title}</span>
              <Caption className="text-ink-tertiary">{completeArchitecture.description}</Caption>
            </div>
            <div className="scrollbar-none overflow-x-auto">
              <PlatformArchitectureDiagram architecture={completeArchitecture} layout="horizontal" />
            </div>
            <PlatformLegend architecture={completeArchitecture} onlyPresent />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="business-artifacts"
            eyebrow={<Eyebrow tone="accent">Business artifacts</Eyebrow>}
            title="The landmarks worth recognizing"
            description="Six recurring objects carry a product through the whole system. Learn these, and every platform page reads the same way."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {BUSINESS_ARTIFACTS.map((artifact) => (
              <Card key={artifact.term} className="flex flex-col gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-hover text-ink-secondary">
                  {artifact.icon}
                </span>
                <span className="text-body-md font-medium text-ink-primary">{artifact.term}</span>
                <Body size="sm" muted>
                  {vocabDefinition(artifact.term)}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>}
            title="Why Platform exists, and what it owns"
            description="The engineering detail behind the story above — for anyone extending or auditing a Platform component."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <DescriptionList items={PLATFORM_ARCHITECTURE_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="platform-anatomy"
              title="Six regions, two layers"
              description="Four regions belong to Platform itself; the last two belong to Business Features, the layer this page defines the boundary against."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {PLATFORM_ANATOMY.map((region) => (
                <Card key={region.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                    <Badge tone={region.layer === "Platform" ? "accent" : "neutral"} size="sm">
                      {region.layer}
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {region.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="how-this-fits-together"
            eyebrow={<Eyebrow tone="accent">How this fits together</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Features"
            description={LAYERING_STATEMENT}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-2">
            {LAYER_STACK.map((layer, index) => (
              <div key={layer.id} className="flex flex-col items-center gap-2">
                <Card className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md font-medium text-ink-primary">{layer.name}</span>
                      <Badge tone={LAYER_STATUS_TONE[layer.status]} size="sm">
                        {LAYER_STATUS_LABEL[layer.status]}
                      </Badge>
                    </div>
                    <Body size="sm" muted className="max-w-[var(--container-narrow)]">
                      {layer.owns}
                    </Body>
                    {layer.composesFrom ? <Caption className="text-ink-tertiary">Composes from: {layer.composesFrom}</Caption> : null}
                  </div>
                  {layer.certificationRef ? (
                    <Link
                      href={layer.certificationRef.href}
                      className="focus-ring flex shrink-0 items-center gap-1 text-caption font-medium text-accent-400 hover:text-accent-300"
                    >
                      {layer.certificationRef.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </Card>
                {index < LAYER_STACK.length - 1 ? <ArrowDown className="size-4 text-ink-tertiary" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight platforms, one composition plan each"
            description="This is the architecture every domain platform is built against today. Workflow/Operational/Foundation usage cites real, existing systems by name."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {PLATFORM_TEMPLATES.map((template) => (
              <Card key={template.id} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-body-lg font-medium text-ink-primary">{template.name}</span>
                  <Body size="sm" muted>
                    {template.purpose}
                  </Body>
                </div>
                <div className="flex flex-wrap gap-2">
                  {template.businessObjects.map((obj) => (
                    <Badge key={obj} tone="neutral" size="sm">
                      {obj}
                    </Badge>
                  ))}
                </div>
                <DescriptionList
                  items={[
                    { label: "Workspace model", value: template.workspaceModel },
                    { label: "Workflow usage", value: template.workflowUsage },
                    { label: "Operational usage", value: template.operationalUsage },
                    { label: "Foundation usage", value: template.foundationUsage },
                    { label: "Extension boundary", value: template.extensionBoundary },
                  ]}
                />
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Platform rules"
            description="What a Platform component may and may not import, and what it must be built from."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PLATFORM_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Component ownership"
            description="What each of the five layers owns going into Platform, and — just as important — what it explicitly does not own, so a future contributor knows which layer to reach for instead."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {OWNERSHIP_MODEL.map((entry) => (
              <Card key={entry.layer} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{entry.layer}</span>
                <Body size="sm" muted>
                  <span className="font-medium text-ink-secondary">Owns: </span>
                  {entry.owns}
                </Body>
                <Body size="sm" muted>
                  <span className="font-medium text-ink-secondary">Does not own: </span>
                  {entry.doesNotOwn}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="Where this architecture is built and composed into real screens."
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
              description="Capabilities this architecture does not implement today, and what each would require."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {PLATFORM_FUTURE_EXTENSIONS.map((extension) => (
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
