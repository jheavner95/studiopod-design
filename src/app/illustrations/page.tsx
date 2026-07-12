import { Boxes } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { SectionBadge, Display, Body, Card, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { DocsRelatedGrid } from "@/components/docs";
import { IllustrationDevProvider } from "@/illustrations";
import { getEntry } from "@/lib/design-system-navigation";
import { DevControlsPanel } from "./_components/DevControlsPanel";
import { NodeGallerySection } from "./_sections/NodeGallerySection";
import { ConnectionGallerySection } from "./_sections/ConnectionGallerySection";
import { StatusGallerySection } from "./_sections/StatusGallerySection";
import { LayoutGallerySection } from "./_sections/LayoutGallerySection";
import { ResponsiveGallerySection } from "./_sections/ResponsiveGallerySection";
import { StateGallerySection } from "./_sections/StateGallerySection";
import { GroupGallerySection } from "./_sections/GroupGallerySection";
import { PipelineGallerySection } from "./_sections/PipelineGallerySection";
import { DeveloperControlsSection } from "./_sections/DeveloperControlsSection";

const WHEN_TO_USE = [
  {
    title: "One entry point",
    text: "Every diagram renders through <IllustrationCanvas diagram={...} />. A page only ever supplies data — nodes, connections, groups, layout — never its own rendering logic.",
  },
  {
    title: "Built on the motion engine",
    text: "Node activation and group collapse reuse the motion engine's own Activate and Expand primitives directly, instead of duplicating animation logic here.",
  },
  {
    title: "Machinery, not diagrams",
    text: "This page ships zero StudioPOD-specific diagrams — only the primitives, layout engine, and state system real diagrams get built from.",
  },
  {
    title: "Already adopted downstream",
    text: "Workflows, Platforms, Capabilities, and Production each render their real diagrams through this engine today.",
  },
];

const ACCESSIBILITY_TOPICS = [
  {
    label: "Node selection",
    text: "Interactive nodes render as a real <button>, with aria-pressed reflecting selection state, aria-label set to the node's own label, and the shared focus-ring treatment on keyboard focus.",
  },
  {
    label: "Diagram container",
    text: 'The canvas root carries role="group" and aria-label="Diagram", so assistive tech announces the whole diagram as one composite region instead of a bag of unlabeled positioned divs.',
  },
  {
    label: "Group collapse",
    text: 'The group collapse/expand toggle exposes aria-expanded plus a dynamic aria-label ("Expand {title}" / "Collapse {title}"), not just an icon rotation.',
  },
  {
    label: "Reduced motion",
    text: "Every animated primitive used here (Activate on nodes, Expand on groups) is gated by useMotionEnabled(), which turns off automatically when the OS-level prefers-reduced-motion setting is on.",
  },
];

const FUTURE_ENHANCEMENTS = [
  {
    title: "Engine considered complete",
    text: "Every primitive, layout, and state a diagram needs already exists here. Extending to a new domain should only mean defining a new Diagram object — nodes, connections, layout — never new rendering logic.",
  },
  {
    title: "Deliberately abstract data",
    text: "Every example on this page uses placeholder data (Stage 1/2a/2b/3, Node A/B/C) on purpose, so a passing demo proves the primitives generically instead of proving one specific diagram.",
  },
];

const relatedComponents = [getEntry("motion")!, getEntry("tokens")!];

export default function IllustrationsPlaygroundPage() {
  return (
    <IllustrationDevProvider>
      <PageShell background={<SystemGrid />}>
        <SectionShell spacing="xl">
          <div className="flex flex-col gap-6">
            <SectionBadge icon={<Boxes className="size-3.5" />}>Playground</SectionBadge>
            <Display>Illustration engine</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              A reusable engine that renders diagrams from data: <code>{"<IllustrationCanvas diagram={data} />"}</code>,
              built on the motion engine rather than duplicating a single animation.
            </Body>
          </div>
        </SectionShell>

        <DevControlsPanel />

        {/* Overview */}
        <NodeGallerySection />
        <ConnectionGallerySection />
        <StatusGallerySection />

        {/* When to use */}
        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="when-to-use"
              eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
              title="When to use"
              description="The rules this engine follows, and what already relies on it."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {WHEN_TO_USE.map((rule) => (
                <Card key={rule.title} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                  <Body size="sm" muted>
                    {rule.text}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </SectionShell>

        {/* Examples */}
        <LayoutGallerySection />
        <ResponsiveGallerySection />

        {/* Behavior */}
        <StateGallerySection />

        {/* Accessibility */}
        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="accessibility"
              eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
              title="Accessibility"
              descriptionMaxWidth={false}
            />
            <DescriptionList items={ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
          </div>
        </SectionShell>

        {/* Composition */}
        <GroupGallerySection />
        <PipelineGallerySection />
        <DeveloperControlsSection />

        {/* Related components */}
        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-components"
              eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
              title="Related components"
              descriptionMaxWidth={false}
            />
            <DocsRelatedGrid entries={relatedComponents} columns={2} />
          </div>
        </SectionShell>

        {/* Reference */}
        <SectionShell spacing="xl" background="raised">
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="reference"
              eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>}
              title="Reference"
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-10">
              <SectionHeader
                id="future-enhancements"
                title="Future enhancements"
                description="Room the current engine leaves for later — reserved, not scoped or committed."
                descriptionMaxWidth={false}
              />
              <CardGrid columns={2}>
                {FUTURE_ENHANCEMENTS.map((extension) => (
                  <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                    <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                    <Body size="sm" muted>
                      {extension.text}
                    </Body>
                  </Card>
                ))}
              </CardGrid>
            </div>
          </div>
        </SectionShell>
      </PageShell>
    </IllustrationDevProvider>
  );
}
