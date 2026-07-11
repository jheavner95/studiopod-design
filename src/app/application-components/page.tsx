import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionPlaceholder, CardGrid } from "@/components/layout";
import { Card, Body, Badge, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { MetricCard } from "@/components/operational";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";
import { CANONICAL_APPLICATION_GROUPS, getGroup, getGroupEntries, getEntry } from "@/lib/design-system-navigation";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "application-components")!;
const selfEntry = getEntry("application-components")!;

const GROUP_CARDS = CANONICAL_APPLICATION_GROUPS.map((groupId) => {
  const group = getGroup(groupId)!;
  const entries = getGroupEntries(groupId);
  // Every group's own landing entry (order 0) isn't a "page" to browse to from this card — subtract it.
  const itemCount = entries.length - 1;
  const certifiedCount = entries.filter((entry) => entry.status === "certified").length;
  return { group, itemCount, certifiedCount };
});

const META_ENTRIES = getGroupEntries("app-meta").filter((entry) => entry.id !== "application-components");

// Real, derived-not-guessed counts for the stats scorecard: every canonical
// system's own page count plus the cross-cutting overview/meta pages, all
// pulled from NAV_REGISTRY rather than hardcoded.
const TOTAL_PAGES = GROUP_CARDS.reduce((sum, { itemCount }) => sum + itemCount, 0) + META_ENTRIES.length;
const CERTIFIED_SYSTEMS = GROUP_CARDS.filter(({ certifiedCount }) => certifiedCount > 0).length;

const PRIMARY_ENTRY_POINTS = [getEntry("inventory")!, getEntry("architecture")!, getEntry("docs-foundation")!];

const RELATED_SECTION_IDS = ["foundations", "core-components", "workflow-patterns"] as const;
const RELATED_SECTIONS = RELATED_SECTION_IDS.map((id) => getGroup(id)!);

export default function ApplicationComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <div className="flex flex-col gap-12">
        <Card className="flex flex-col gap-4 border-accent-500/30 bg-accent-soft/40 sm:flex-row sm:items-start">
          <Sparkles className="size-5 shrink-0 text-accent-400" aria-hidden />
          <div className="flex flex-col gap-3">
            <Body size="sm" muted>
              The components, patterns, and diagram libraries the StudioPOD application&rsquo;s own screens are built
              from — organized into six systems, from workspace architecture up through platform-specific libraries
              and certification.
            </Body>
            <Link
              href="/docs"
              className="focus-ring w-fit rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Browse the full documentation IA →
            </Link>
          </div>
        </Card>

        <div className="grid gap-8 border-t border-border-subtle pt-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              {selfEntry.description} It is the umbrella for six systems — Workspace Architecture, Foundation
              Systems, Operational Systems, Workflow Systems, Platform Systems, and Certification — plus the
              cross-cutting inventory, architecture, coverage, and maturity views that span all of them. Start here
              to understand how a StudioPOD application screen is actually assembled, tier by tier.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {[
                "The six systems every application screen is composed from, and the order they build on each other in — Workspace, Foundation, Operational, Workflow, then Platform.",
                "Which systems have reached a Certified capstone today versus which are still Established.",
                "Where the cross-cutting Inventory, Architecture, Coverage, and Maturity views live, for questions that span more than one system.",
                "How the legacy diagram-library playgrounds below relate to, and differ from, their same-named Platform-tier counterparts, despite predating them.",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-10">
          <CardGrid columns={3} gap="md">
            <MetricCard value={String(CANONICAL_APPLICATION_GROUPS.length)} label="Component systems" />
            <MetricCard value={String(TOTAL_PAGES)} label="Pages in this section" />
            <MetricCard value={`${CERTIFIED_SYSTEMS} of ${CANONICAL_APPLICATION_GROUPS.length}`} label="Certified systems" />
          </CardGrid>
        </div>

        <div className="flex flex-col gap-6 border-t border-border-subtle pt-10">
          <SectionHeader
            id="entry-points"
            eyebrow={<Eyebrow tone="accent">Start here</Eyebrow>}
            title="Primary entry points"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {PRIMARY_ENTRY_POINTS.map((item) => (
              <Link key={item.id} href={item.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-lg font-medium text-ink-primary">{item.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
                  </div>
                  <Body size="sm" muted>
                    {item.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>

        <div className="flex flex-col gap-6 border-t border-border-subtle pt-10">
          <SectionHeader
            id="related-sections"
            eyebrow={<Eyebrow tone="accent">Continue exploring</Eyebrow>}
            title="Related sections"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {RELATED_SECTIONS.map((group) => (
              <Link key={group.id} href={group.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{group.title}</span>
                  <Body size="sm" muted>
                    {group.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>

        <div className="flex flex-col gap-6 border-t border-border-subtle pt-10">
          <SectionHeader
            id="browse-everything"
            eyebrow={<Eyebrow tone="accent">Browse everything</Eyebrow>}
            title="All six systems"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {GROUP_CARDS.map(({ group, itemCount, certifiedCount }) => (
              <Link key={group.id} href={group.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-md font-medium text-ink-primary">{group.title}</span>
                    {certifiedCount > 0 ? (
                      <Badge tone="success" size="sm">
                        Certified
                      </Badge>
                    ) : null}
                  </div>
                  <Body size="sm" muted className="flex-1">
                    {group.description}
                  </Body>
                  <Caption className="text-ink-tertiary">
                    {itemCount} {itemCount === 1 ? "page" : "pages"}
                  </Caption>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>

        <div className="flex flex-col gap-3">
          <Caption className="uppercase tracking-wide text-ink-tertiary">Overview & meta</Caption>
          <div className="flex flex-wrap gap-3">
            {META_ENTRIES.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="focus-ring rounded-md border border-border px-3 py-1.5 text-caption text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:text-ink-primary"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionPlaceholder>
  );
}
