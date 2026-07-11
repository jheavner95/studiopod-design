import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { StateMachineGallery } from "./_components/StateMachineGallery";
import { STATE_ANATOMY } from "./_data/anatomy";
import { MACHINE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { STATE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { STATE_PROMOTION_CANDIDATES, STATE_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { STATE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
    { label: "Foundation Feedback System", href: "/application-components/foundation-feedback" },
    { label: "Workflow Framework", href: "/application-components/workflow-framework" },
    { label: "Pipeline Components", href: "/application-components/pipeline-components" },
    { label: "Workflow Timeline", href: "/application-components/workflow-timeline" },
    { label: "Status & Health Panels", href: "/application-components/status-health" },
    { label: "Inspector Panel", href: "/application-components/inspector-panel" },
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

export default function StateMachinePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · state machine"
          title="State machine"
          description="The canonical StudioPOD State Machine System — the standard representation of state-driven business processes throughout StudioPOD, composing the Workflow Framework, Pipeline Components, Workflow Timeline, and Operational Status & Health directly rather than duplicating any of them. Built in DS-3.6, the sixth package of the Workflow Component Library; not yet adopted by any real screen."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-3.6
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
            eyebrow={<Eyebrow tone="accent">State machine anatomy</Eyebrow>}
            title="Nine regions, twelve components"
            description="Every component in this family maps to one of the regions below — three of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one composes Operational Inspector Panel directly, and one composes Workflow Timeline directly; Node, Transition, Condition, Action, and Events are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {STATE_ANATOMY.map((region) => (
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
            title="Eight state machine patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Linear State Machine's Advance button and the Failure Recovery's Retry button."
            descriptionMaxWidth={false}
          />
          <StateMachineGallery />
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
          <DescriptionList items={MACHINE_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={STATE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
            description="Real, grep-verified duplication found while building this system — not estimated or carried over from memory."
            descriptionMaxWidth={false}
          />
          {STATE_PROMOTION_CANDIDATES.length === 0 ? (
            <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <span className="text-body-sm font-medium text-ink-primary">Zero real candidates found</span>
              <Body size="sm" muted>
                No genuine state-machine implementation — states plus explicit allowed-transition rules plus guard
                conditions — was found anywhere in the codebase across all six named domains. What exists everywhere
                is the same recurring status-display-bridge pattern (a flat status enum mapped through a lookup
                table to a visual tone), which this package is positioned as formalizing into a real state-transition
                vocabulary for the first time, not deduplicating. See the clean findings below for what was actually
                checked, including the pre-existing (plural) Workflow Diagram Library&rsquo;s own playback hook,
                confirmed to be a simple index-stepping timer rather than real transition logic.
              </Body>
            </Card>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {STATE_CLEAN_FINDINGS.map((finding) => (
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
            {STATE_FUTURE_EXTENSIONS.map((extension) => (
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
