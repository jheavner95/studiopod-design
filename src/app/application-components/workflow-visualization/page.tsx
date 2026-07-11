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

export default function WorkflowVisualizationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="visualization-anatomy"
            eyebrow={<Eyebrow tone="accent">Visualization anatomy</Eyebrow>}
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
            id="gallery"
            eyebrow={<Eyebrow tone="accent">Gallery</Eyebrow>}
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
            id="states"
            eyebrow={<Eyebrow tone="accent">States</Eyebrow>}
            title="States"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={WORKFLOW_VIZ_STATES.map((item) => ({ label: item.state, value: item.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="responsive-behavior"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            descriptionMaxWidth={false}
          />
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
            id="implementation-guidance"
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="promotion-candidates"
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description="Real, grep-verified duplication found while building this system — including a full read of the Illustration Library itself, per this package's own explicit instruction to audit it."
            descriptionMaxWidth={false}
          />
          {WORKFLOW_VIZ_PROMOTION_CANDIDATES.length === 0 ? (
            <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <span className="text-body-sm font-medium text-ink-primary">Zero real candidates found</span>
              <Body size="sm" muted>
                No genuine canvas/viewport/pan-state/minimap/multi-select implementation was found anywhere
                outside src/components/workflow/ — including the Illustration Library itself, confirmed by a full
                read of IllustrationCanvas and its dev-mode context to have no transform/offset state, no
                multi-select, and no minimap or toolbar concept. See the clean findings below for what was
                actually checked, including two misleadingly-named &ldquo;MiniMap&rdquo; components elsewhere in
                the repo that turned out to be plain node/connector strips, not spatial viewport thumbnails.
              </Body>
            </Card>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {WORKFLOW_VIZ_CLEAN_FINDINGS.map((finding) => (
              <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <Body size="sm" muted>
                  {finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
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
      </SectionShell>
    </DocsShell>
  );
}
