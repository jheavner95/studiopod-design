import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { FeedbackGallery } from "./_components/FeedbackGallery";
import { FEEDBACK_ANATOMY } from "./_data/anatomy";
import { FEEDBACK_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { FEEDBACK_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { FEEDBACK_PROMOTION_CANDIDATES, FEEDBACK_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { FEEDBACK_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Layout Primitives", href: "/application-components/foundation-layout" },
    { label: "Foundation Table System", href: "/application-components/foundation-table" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
    { label: "Foundation Form System", href: "/application-components/foundation-forms" },
    { label: "Foundation Overlay System", href: "/application-components/foundation-overlays" },
    { label: "Foundation Navigation System", href: "/application-components/foundation-navigation" },
    { label: "Foundation Layer Audit", href: "/application-components/foundation-audit" },
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

export default function FoundationFeedbackPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · foundation feedback"
          title="Foundation feedback system"
          description="Alert, Toast, Banner, Notification, Inline Message, Empty State, Loading State, Skeleton, Progress Bar, Progress Ring, Status Indicator, Validation Summary, and four tone-preset outcome states — every way this platform communicates status, progress, validation, and outcome, built once. Built in DS-2.4; not yet adopted by any real screen — migration is a later work package, the same sequencing Table, Metadata, Forms, Overlays, and Navigation followed."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-2.4
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
            eyebrow={<Eyebrow tone="accent">Feedback anatomy</Eyebrow>}
            title="Six axes, one family"
            description="Transient, Persistent, Blocking, Non-blocking, Inline, and Global — most components sit on more than one; this groups by the axis each is most defined by."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FEEDBACK_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.components}</Caption>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Component gallery</Eyebrow>}
            title="Every component, live"
            description="Each demo below is a real, working component with real local state — not a static screenshot. Try Toast's button, Progress Bar's ± controls, and each dismissible component's close button."
            descriptionMaxWidth={false}
          />
          <FeedbackGallery />
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
          <DescriptionList items={FEEDBACK_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={FEEDBACK_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
            description="Real, grep-verified duplication found while building this system — not estimated or carried over from memory. This audit came back almost entirely clean, a genuinely different result from every prior Foundation package."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {FEEDBACK_PROMOTION_CANDIDATES.map((candidate) => (
              <Card key={candidate.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{candidate.pattern}</span>
                  <Badge tone="warning" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {candidate.files.length} {candidate.files.length === 1 ? "file" : "files"}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {candidate.description}
                </Body>
                <ul className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                  {candidate.files.map((file) => (
                    <li key={file} className="text-metadata text-ink-tertiary">
                      <code className="break-words">{file}</code>
                    </li>
                  ))}
                </ul>
                <Body size="sm" muted className="border-t border-border-subtle pt-3">
                  {candidate.migrationNote}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {FEEDBACK_CLEAN_FINDINGS.map((finding) => (
              <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <Body size="sm" muted>
                  {finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current system leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FEEDBACK_FUTURE_EXTENSIONS.map((extension) => (
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
