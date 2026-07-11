import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { ApprovalReviewGallery } from "./_components/ApprovalReviewGallery";
import { APPROVAL_ANATOMY } from "./_data/anatomy";
import { APPROVAL_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { APPROVAL_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { APPROVAL_PROMOTION_CANDIDATES, APPROVAL_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { APPROVAL_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("approval-review")!;
const relatedComponents = [getEntry("workflow-framework")!, getEntry("inspector-panel")!, getEntry("workflow-timeline")!];

const REUSE_GROUPS = [
  {
    title: "Built on Workflow Framework",
    text: "ApprovalStage, ApprovalActions, and ReviewSummary are Workflow Framework's own WorkflowStage, WorkflowActions, and WorkflowSummary — re-exported, not rebuilt.",
  },
  {
    title: "Built on Inspector Panel",
    text: "ReviewPanel is Operational Inspector Panel's own InspectorPanel, re-exported — the reviewer's comment-and-checklist workspace isn't a new implementation.",
  },
  {
    title: "Composes Workflow Timeline",
    text: "ReviewHistory composes Workflow Timeline's own WorkflowTimelineGroup, WorkflowTimelineEvent, and WorkflowTimelineConnector directly for a request's decision history.",
  },
  {
    title: "Genuinely new here",
    text: "Step, Request, Decision, Comment, and Checklist have no upstream analog in Workflow Framework or Inspector Panel — they were built for this family specifically.",
  },
];

export default function ApprovalReviewPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eight regions, one approval — four of the twelve components involved delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one delegates to Operational Inspector Panel, and one composes Workflow Timeline directly; Step, Request, Decision, Comment, and Checklist are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {APPROVAL_ANATOMY.map((region) => (
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
            description="Six ownership rules every screen composing this family already assumes — who owns state, what gates what, and where validation and thread semantics sit."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {IMPLEMENTATION_GUIDANCE.map((topic) => (
              <Card key={topic.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{topic.label}</span>
                <Body size="sm" muted>
                  {topic.text}
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
            title="Examples"
            description="Eight approval patterns, live — each demo below is a real, working composition with real local state, not a static screenshot. Try the Single Approval's Approve/Reject buttons and the Checklist Review's required items."
            descriptionMaxWidth={false}
          />
          <ApprovalReviewGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the layout responds across breakpoints."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={APPROVAL_STATES.map((item) => ({ label: item.state, value: item.note }))} />

          <div className="flex flex-col gap-10">
            <SectionHeader id="responsive-behavior" title="Responsive behavior" descriptionMaxWidth={false} />
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={APPROVAL_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="What this family is actually built from — most of it is reuse, not new surface area."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {REUSE_GROUPS.map((group) => (
              <Card key={group.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{group.title}</span>
                <Body size="sm" muted>
                  {group.text}
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
              description="A real, grep-verified check for hand-rolled approval/review/decision UI already living elsewhere in the codebase — run across six named domains plus a repo-wide identifier search, not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {APPROVAL_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">Nothing to migrate</span>
                <Body size="sm" muted>
                  No existing hand-rolled approval/review/decision UI was found anywhere in the codebase across all six
                  named domains — this exact gap had already been flagged, unbuilt, across three separate prior
                  reviews, all independently confirmed clean by the dedicated check behind this page. See the findings
                  below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Findings</span>
              {APPROVAL_CLEAN_FINDINGS.map((finding) => (
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
              {APPROVAL_FUTURE_EXTENSIONS.map((extension) => (
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
