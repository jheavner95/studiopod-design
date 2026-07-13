import Link from "next/link";
import { ArrowUpRight, ArrowDown, Blocks, Table2, Waypoints, Layers3, LayoutDashboard, Globe, SlidersHorizontal, GitBranch, Search, ListChecks, Gauge, Activity, ShieldCheck, Boxes, Rocket, ShoppingCart, Sparkles } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, GlassPanel } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid, DocsLinkCard } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { COMPOSITION_ARCHITECTURE_TOPICS } from "./_data/architecture";
import { UTILITY_SUBSTRATE_NOTES } from "./_data/utility-substrate";
import { LAYER_STACK, COMPOSITION_MODEL_STATEMENT } from "./_data/layers";
import { FEATURE_TRAITS } from "./_data/feature-model";
import { FEATURE_ANATOMY } from "./_data/anatomy";
import { APPLICATION_TEMPLATES } from "./_data/templates";
import { ALLOWED_RULES, FORBIDDEN_RULES } from "./_data/rules";
import { APPLICATION_BOUNDARIES } from "./_data/boundaries";
import { APPLICATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("application-composition-doc")!;
const relatedComponents = [
  getEntry("platform-architecture-doc")!,
  getEntry("workflows-library")!,
  getEntry("business-features-doc")!,
  getEntry("templates")!,
];

const LAYER_STATUS_TONE: Record<string, "success" | "warning" | "neutral"> = {
  certified: "success",
  "certified-production-ready": "warning",
  future: "neutral",
};

const LAYER_STATUS_LABEL: Record<string, string> = {
  certified: "Established",
  "certified-production-ready": "Production Ready",
  future: "Not yet available",
};

const TRAIT_TONE: Record<"defining" | "forbidden", "accent" | "warning"> = {
  defining: "accent",
  forbidden: "warning",
};

const ANATOMY_TONE: Record<"feature" | "internal" | "composition", "accent" | "neutral" | "success"> = {
  feature: "accent",
  internal: "neutral",
  composition: "success",
};

/** One icon per composition tier — distinct from the canonical production-flow icon set (Lightbulb/Package/Rocket/etc.) used elsewhere, since this ladder is about code layers, not business stages. */
const LAYER_ICONS: Record<string, React.ReactNode> = {
  foundation: <Blocks className="size-5" />,
  operational: <Table2 className="size-5" />,
  workflow: <Waypoints className="size-5" />,
  platform: <Layers3 className="size-5" />,
  "business-features": <LayoutDashboard className="size-5" />,
  application: <Globe className="size-5" />,
};

/** The same Trailhead mug wrap, followed through every composition tier — the production-story thread the hero stack tells alongside the generic "what this tier owns" description. */
const LAYER_TRAILHEAD_NOTE: Record<string, string> = {
  foundation: "Renders the same Button, Input, and Badge every Trailhead mug wrap screen reuses.",
  operational: "Data Grid lists the Trailhead mug wrap as one row among every job in production.",
  workflow: "Pipeline Components track its production stage without knowing what a “mug wrap” even is.",
  platform: "Production Platform's own inspector shows its SKU — MUG-TH-014.",
  "business-features": "A Business Feature is where an object like this would move through review before shipping.",
  application: "It ships, sells, and its Performance Intelligence shapes the next Creative Brief.",
};

interface RealApplicationEntry {
  entryId: string;
  icon: React.ReactNode;
  note: string;
}

/** The four real, composed applications this page's story points to — not hypothetical destinations, live pages built from the same six-tier stack above. */
const REAL_APPLICATIONS: RealApplicationEntry[] = [
  { entryId: "publishing-platform", icon: <Rocket className="size-5" />, note: "The same layers publish Poster proof #118 to Etsy and Shopify." },
  { entryId: "commerce-platform", icon: <ShoppingCart className="size-5" />, note: "Route a Studio Tee order from catalog to fulfillment." },
  { entryId: "product-platform", icon: <Boxes className="size-5" />, note: "Catalog every SKU, from the Trailhead mug wrap to a Holiday collection." },
  { entryId: "intelligence-platform", icon: <Sparkles className="size-5" />, note: "Turn sell-through data into the next Creative Brief." },
];

interface BuildingBlockEntry {
  entryId: string;
  icon: React.ReactNode;
}

/** Capabilities that show up inside almost every Platform component and Business Feature — shared, not reinvented per application. */
const RECURRING_BUILDING_BLOCKS: BuildingBlockEntry[] = [
  { entryId: "property-panel", icon: <SlidersHorizontal className="size-5" /> },
  { entryId: "workflow-framework", icon: <GitBranch className="size-5" /> },
  { entryId: "inspector-panel", icon: <Search className="size-5" /> },
  { entryId: "queue-jobs", icon: <ListChecks className="size-5" /> },
  { entryId: "dashboard-widgets", icon: <Gauge className="size-5" /> },
  { entryId: "status-health", icon: <Activity className="size-5" /> },
  { entryId: "foundation-forms", icon: <ShieldCheck className="size-5" /> },
];

export default function ApplicationCompositionPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <Body size="lg" className="max-w-[var(--container-narrow)] font-medium text-ink-primary">
          Every StudioPOD application is assembled, not handcrafted. Production Workspace, Publishing, Commerce,
          Product, and Intelligence are all built from the same shared systems — composed differently for each job,
          never rebuilt from scratch.
        </Body>
      </DocsPageHeader>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition-story"
            eyebrow={<Eyebrow tone="accent">Composition story</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Features → Application"
            description={COMPOSITION_MODEL_STATEMENT}
            descriptionMaxWidth={false}
          />
          <GlassPanel padding="lg" glow className="flex w-full flex-col gap-3">
            {LAYER_STACK.map((layer, index) => (
              <div key={layer.id} className="flex flex-col items-center gap-3">
                <Card className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-500/40 bg-accent-soft text-accent-400">
                      {LAYER_ICONS[layer.id]}
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-body-md font-medium text-ink-primary">{layer.name}</span>
                        <Badge tone={LAYER_STATUS_TONE[layer.status]} size="sm">
                          {LAYER_STATUS_LABEL[layer.status]}
                        </Badge>
                      </div>
                      <Body size="sm" muted className="max-w-[var(--container-narrow)]">
                        {layer.owns}
                      </Body>
                      {layer.composesFrom ? <Caption className="text-ink-tertiary">Composes from: {layer.composesFrom}</Caption> : null}
                      <Caption className="text-accent-400">{LAYER_TRAILHEAD_NOTE[layer.id]}</Caption>
                    </div>
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
          </GlassPanel>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="real-applications"
            eyebrow={<Eyebrow tone="accent">Real applications</Eyebrow>}
            title="The same composition model builds every platform"
            description="Not four different architectures — one, composed four different ways. Each of these is a live page, not a mockup."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {REAL_APPLICATIONS.map(({ entryId, icon, note }) => {
              const application = getEntry(entryId)!;
              return (
                <DocsLinkCard
                  key={entryId}
                  href={application.href}
                  title={application.title}
                  description={note}
                  adornment={<span className="text-accent-400">{icon}</span>}
                  actionLabel="View"
                />
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="recurring-building-blocks"
            eyebrow={<Eyebrow tone="accent">Recurring building blocks</Eyebrow>}
            title="Shared capabilities, not isolated components"
            description="These seven show up inside nearly every Platform component and Business Feature above — the same panel, the same queue, the same status treatment, everywhere it's needed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {RECURRING_BUILDING_BLOCKS.map(({ entryId, icon }) => {
              const block = getEntry(entryId)!;
              return (
                <DocsLinkCard
                  key={entryId}
                  href={block.href}
                  title={block.title}
                  adornment={<span className="text-accent-400">{icon}</span>}
                />
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Why Business Features exist, and what they own"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMPOSITION_ARCHITECTURE_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="Seven traits, one prohibition"
            description="“Business Features” is not a new term — Platform Architecture coined it one tier down. This section is the first to define what one actually looks like, and where the line sits: six traits describe when something qualifies as a Business Feature, the seventh names the one thing it must never do."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FEATURE_TRAITS.map((trait) => (
              <Card key={trait.trait} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{trait.trait}</span>
                  <Badge tone={TRAIT_TONE[trait.polarity]} size="sm">
                    {trait.polarity === "defining" ? "Defining" : "Forbidden"}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {trait.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Eight composition plans for the templates real applications above are actually built from."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="application-templates"
              title="Eight templates, one composition plan each"
              description="Every field below is a composition plan citing real, existing components by name. A real feature is expected to blend more than one template, not be a pure instance of exactly one."
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-6">
              {APPLICATION_TEMPLATES.map((template) => (
                <Card key={template.id} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-body-lg font-medium text-ink-primary">{template.name}</span>
                    <Body size="sm" muted>
                      {template.purpose}
                    </Body>
                  </div>
                  <DescriptionList
                    items={[
                      { label: "Platform composition", value: template.platformComposition },
                      { label: "Workflow composition", value: template.workflowComposition },
                      { label: "Operational composition", value: template.operationalComposition },
                      { label: "Foundation composition", value: template.foundationComposition },
                      { label: "Extension boundary", value: template.extensionBoundary },
                    ]}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader id="behavior" eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>} title="Behavior" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader id="composition-rules" title="Allowed and forbidden dependency directions" descriptionMaxWidth={false} />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Caption className="uppercase tracking-wide text-success">Allowed</Caption>
                <DescriptionList items={ALLOWED_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
              </div>
              <div className="flex flex-col gap-3">
                <Caption className="uppercase tracking-wide text-warning">Forbidden</Caption>
                <DescriptionList items={FORBIDDEN_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader id="application-boundaries" title="Nine ownership questions, answered" descriptionMaxWidth={false} />
            <CardGrid columns={2}>
              {APPLICATION_BOUNDARIES.map((boundary) => (
                <Card key={boundary.concern} className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-body-sm font-medium text-ink-primary">{boundary.concern}</span>
                    <Badge tone="accent" size="sm">
                      {boundary.owner}
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {boundary.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="utility-substrate"
              title="The utility layers beneath every tier"
              description="src/lib, src/hooks, src/motion, and src/providers sit underneath the six named tiers rather than inside them — every tier can depend on these, but they never depend back up into any tier."
              descriptionMaxWidth={false}
            />
            <DescriptionList items={UTILITY_SUBSTRATE_NOTES.map((n) => ({ label: n.label, value: n.text }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="One feature, eleven parts"
            description="Five internal UI regions, one internal non-UI region, and four composition points — the same “what does this own, what does it compose” shape Platform Architecture used one tier down."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FEATURE_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                  <Badge tone={ANATOMY_TONE[region.kind]} size="sm">
                    {region.kind === "feature" ? "Feature" : region.kind === "internal" ? "Internal" : "Composition"}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {region.description}
                </Body>
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
              description="Capabilities this architecture does not implement today, and what each would require."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {APPLICATION_FUTURE_EXTENSIONS.map((extension) => (
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
