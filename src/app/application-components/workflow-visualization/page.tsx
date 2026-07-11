import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { WorkflowVisualizationGallery } from "./_components/WorkflowVisualizationGallery";
import { WORKFLOW_VIZ_ANATOMY } from "./_data/anatomy";
import { WORKFLOW_VIZ_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { WORKFLOW_VIZ_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { WORKFLOW_VIZ_PROMOTION_CANDIDATES, WORKFLOW_VIZ_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { WORKFLOW_VIZ_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
    { label: "Foundation Feedback System", href: "/application-components/foundation-feedback" },
    { label: "Workflow Framework", href: "/application-components/workflow-framework" },
    { label: "Dependency & Relationships", href: "/application-components/dependency-relationships" },
    { label: "Pipeline Components", href: "/application-components/pipeline-components" },
    { label: "State Machine", href: "/application-components/state-machine" },
    { label: "Illustration Engine", href: "/illustrations" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ))}
    </div>
  );
}

export default function WorkflowVisualizationPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · workflow visualization"
          title="Workflow visualization"
          description="The canonical StudioPOD Workflow Visualization System — the operational, interactive, DOM-composed visualization layer used by real StudioPOD application screens, composing the Workflow Framework, Dependency & Relationship Views, Pipeline Components, State Machine, Foundation Metadata, and Foundation Feedback directly rather than duplicating any of them. This is NOT the Illustration Library, which remains responsible for static diagrams, marketing graphics, and documentation visuals. Built in DS-3.8, the eighth package of the Workflow Component Library; not yet adopted by any real screen."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-3.8
            </Badge>
          </div>
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={WORKFLOW_VIZ_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
    </PageShell>
  );
}
