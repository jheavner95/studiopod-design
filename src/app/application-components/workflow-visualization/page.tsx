import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WorkflowVisualizationGallery } from "./_components/WorkflowVisualizationGallery";
import { WORKFLOW_VIZ_ANATOMY } from "./_data/anatomy";
import { WORKFLOW_VIZ_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { WORKFLOW_VIZ_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { WORKFLOW_VIZ_PROMOTION_CANDIDATES, WORKFLOW_VIZ_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { WORKFLOW_VIZ_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workflow-visualization")!;
const relatedComponents = [getEntry("workflow-framework")!, getEntry("dependency-relationships")!, getEntry("inspector-panel")!];

const WHEN_TO_USE = [
  {
    title: "Operational, DOM-flow diagrams",
    explanation:
      "Production, publishing, and commerce workflow status, dependency checks, and pipeline runs rendered as flex/Grid inside a real application screen — this system is the operational, interactive visualization layer for those screens, explicitly not the Illustration Library.",
  },
  {
    title: "Multi-node selection and bulk actions",
    explanation:
      "A canvas where several nodes can be selected at once and acted on together — WorkflowSelection is built directly on Bulk Actions System's own BulkActionBar and Data Grid's own selection helpers, not a bespoke selection model.",
  },
  {
    title: "Not real coordinate-positioned rendering",
    explanation:
      "A screen composing a live, canvas-positioned diagram with pan/zoom and precise node coordinates belongs to the Illustration Library's own IllustrationCanvas/IllustrationNode/IllustrationConnection instead — this family has no transform/offset state of its own, and WorkflowControls' zoom/fit buttons stay inert until that lands.",
  },
];

export default function WorkflowVisualizationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Ten regions, twelve components"
            description="Every component in this family maps to one of the regions below — two of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), two more re-export Dependency & Relationship Views' own Edge/Group, one composes a bulk-selection pattern reused from Operational, and one composes Operational Inspector Panel directly; Viewport, Node, Toolbar, Overview, MiniMap, Legend, and Controls are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WORKFLOW_VIZ_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.component}</Caption>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="What belongs on a Workflow Visualization canvas, and where the line sits against the Illustration Library's own coordinate-positioned rendering."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WHEN_TO_USE.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight workflow visualization patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Production Workflow demo's click-to-inspect node and the Large Workflow demo's multi-select bulk bar."
            descriptionMaxWidth={false}
          />
          <WorkflowVisualizationGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the layout itself adapts across breakpoints."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={WORKFLOW_VIZ_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          <CardGrid columns={3}>
            {BREAKPOINT_NOTES.map((item) => (
              <Card key={item.breakpoint} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.breakpoint}</span>
                <Body size="sm" muted>
                  {item.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <DescriptionList items={RESPONSIVE_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={WORKFLOW_VIZ_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How the pieces fit together — viewport ownership, selection state, node ownership, grouping, navigation, and inspector integration."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
          <CardGrid columns={3}>
            {relatedComponents.map((related) => (
              <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                  <Body size="sm" muted>
                    {related.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="migration-notes"
              title="Migration notes"
              description="Real, grep-verified findings from checking this system's own domains for overlap, including a full read of the Illustration Library itself — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {WORKFLOW_VIZ_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">Nothing found to migrate</span>
                <Body size="sm" muted>
                  No genuine canvas/viewport/pan-state/minimap/multi-select implementation was found anywhere
                  outside src/components/workflow/ — including the Illustration Library itself, confirmed by a full
                  read of IllustrationCanvas and its dev-mode context to have no transform/offset state, no
                  multi-select, and no minimap or toolbar concept. See the findings below for what was actually
                  checked, including two misleadingly-named &ldquo;MiniMap&rdquo; components elsewhere in the repo
                  that turned out to be plain node/connector strips, not spatial viewport thumbnails.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Findings</span>
              {WORKFLOW_VIZ_CLEAN_FINDINGS.map((finding) => (
                <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                  <Body size="sm" muted>
                    {finding}
                  </Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {WORKFLOW_VIZ_FUTURE_EXTENSIONS.map((extension) => (
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
