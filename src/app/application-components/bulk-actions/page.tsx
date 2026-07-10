import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { BulkActionsGallery } from "./_components/BulkActionsGallery";
import { BULK_ANATOMY } from "./_data/anatomy";
import { BULK_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { BULK_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { BULK_PROMOTION_CANDIDATES, BULK_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { BULK_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Overlay System", href: "/application-components/foundation-overlays" },
    { label: "Foundation Feedback System", href: "/application-components/foundation-feedback" },
    { label: "Foundation Form System", href: "/application-components/foundation-forms" },
    { label: "Foundation Navigation System", href: "/application-components/foundation-navigation" },
    { label: "Data Grid", href: "/application-components/data-grid" },
    { label: "Asset Browser", href: "/application-components/asset-browser" },
    { label: "Filter & Search System", href: "/application-components/filter-search" },
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

export default function BulkActionsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · bulk actions"
          title="Bulk actions system"
          description="The canonical StudioPOD Bulk Actions System — the standard experience for performing operations on multiple selected items across every StudioPOD platform. Composes Foundation Overlay/Feedback/Forms/Navigation end to end, and Operational Data Grid, Asset Browser, and Filter & Search directly, rather than duplicating any of them. Built in DS-2.5.6; not yet adopted by any real screen."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-2.5.6
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
            eyebrow={<Eyebrow tone="accent">Bulk action anatomy</Eyebrow>}
            title="Seven regions, one system"
            description="Every component in this family maps to exactly one region below — most delegate directly to an already-certified Foundation or Operational component."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {BULK_ANATOMY.map((region) => (
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
            title="Eight bulk-action patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try Confirmation Flow's dialog, Progress Flow's live run, and Undo Flow's countdown."
            descriptionMaxWidth={false}
          />
          <BulkActionsGallery />
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
          <DescriptionList items={BULK_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={BULK_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
          {BULK_PROMOTION_CANDIDATES.length === 0 ? (
            <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <span className="text-body-sm font-medium text-ink-primary">Zero real candidates found</span>
              <Body size="sm" muted>
                No existing hand-rolled bulk-action UI was found anywhere in the codebase across all seven named domains, including a fresh re-check of this repo&rsquo;s own four MS-2.x Library Playground pages. See the clean findings below for what was actually checked.
              </Body>
            </Card>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {BULK_CLEAN_FINDINGS.map((finding) => (
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
            {BULK_FUTURE_EXTENSIONS.map((extension) => (
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
