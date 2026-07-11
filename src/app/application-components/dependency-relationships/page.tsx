import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { DependencyGallery } from "./_components/DependencyGallery";
import { DEPENDENCY_ANATOMY } from "./_data/anatomy";
import { DEPENDENCY_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { DEPENDENCY_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { DEPENDENCY_PROMOTION_CANDIDATES, DEPENDENCY_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { DEPENDENCY_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
    { label: "Foundation Feedback System", href: "/application-components/foundation-feedback" },
    { label: "Workflow Framework", href: "/application-components/workflow-framework" },
    { label: "Pipeline Components", href: "/application-components/pipeline-components" },
    { label: "State Machine", href: "/application-components/state-machine" },
    { label: "Inspector Panel", href: "/application-components/inspector-panel" },
    { label: "Platform Architecture", href: "/platforms" },
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

export default function DependencyRelationshipsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · dependency & relationships"
          title="Dependency & relationship views"
          description="The canonical StudioPOD Dependency & Relationship System — the standard representation of dependencies, relationships, references, and impact analysis across every StudioPOD platform, composing the Workflow Framework, Pipeline Components, State Machine, and Operational Inspector Panel directly rather than duplicating any of them. Built in DS-3.7, the seventh package of the Workflow Component Library; not yet adopted by any real screen."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-3.7
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
            eyebrow={<Eyebrow tone="accent">Dependency anatomy</Eyebrow>}
            title="Ten regions, twelve components"
            description="Every component in this family maps to one of the regions below — four of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one composes Operational Inspector Panel directly, and Relationships is its own sibling node/edge pair built on the same primitives; Node, Edge, Group, and Filters are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {DEPENDENCY_ANATOMY.map((region) => (
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
            title="Eight dependency and relationship patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Artwork Dependencies demo's click-to-inspect node and the Platform Dependencies demo's status filter."
            descriptionMaxWidth={false}
          />
          <DependencyGallery />
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
          <DescriptionList items={DEPENDENCY_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={DEPENDENCY_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
            description="Real, grep-verified findings from building this system — including genuine pre-existing dependency and relationship models this package deliberately does not replace, since they render through a different layer entirely."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {DEPENDENCY_PROMOTION_CANDIDATES.map((candidate) => (
              <Card key={candidate.id} className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
                <span className="text-body-sm font-medium text-ink-primary">{candidate.pattern}</span>
                <Body size="sm" muted>
                  {candidate.description}
                </Body>
                <Caption className="text-ink-tertiary">{candidate.files.join(" · ")}</Caption>
                <Body size="sm" muted className="border-t border-border-subtle pt-2">
                  {candidate.migrationNote}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {DEPENDENCY_CLEAN_FINDINGS.map((finding) => (
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
            {DEPENDENCY_FUTURE_EXTENSIONS.map((extension) => (
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
