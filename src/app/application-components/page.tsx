import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionPlaceholder, CardGrid } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { MetricCard } from "@/components/operational";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";
import { getEntry, getGroupEntries, getGroupsForSection, getSection, getSectionEntries } from "@/lib/design-system-navigation";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "application-components")!;
const selfEntry = getEntry("application-components")!;

// The twelve real component families — everything in the "components" section
// except this page's own "components-overview" group.
const FAMILY_GROUPS = getGroupsForSection("components").filter((group) => group.id !== "components-overview");

const GROUP_CARDS = FAMILY_GROUPS.map((group) => ({
  group,
  entries: getGroupEntries(group.id),
}));

// Real, derived-not-guessed counts pulled straight from NAV_REGISTRY rather
// than hardcoded.
const TOTAL_SECTION_PAGES = getSectionEntries("components").length;
const MULTI_PAGE_FAMILIES = GROUP_CARDS.filter(({ entries }) => entries.length > 1).length;

const PRIMARY_ENTRY_POINTS = [getEntry("foundations")!, getEntry("foundation-forms")!, getEntry("workflow-framework")!];

const RELATED_SECTIONS = [getSection("patterns")!, getSection("applications")!, getSection("architecture")!];

export default function ApplicationComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <div className="flex flex-col gap-12">
        <Card className="flex flex-col gap-4 border-accent-500/30 bg-accent-soft/40 sm:flex-row sm:items-start">
          <Sparkles className="size-5 shrink-0 text-accent-400" aria-hidden />
          <div className="flex flex-col gap-3">
            <Body size="sm" muted>
              The reusable component library the StudioPOD application&rsquo;s own screens are built from —
              organized by family (Layout, Navigation, Data Display, Forms, Overlays, Feedback, Search &amp;
              Filter, Inspector &amp; Properties, Workflow &amp; Process) instead of by build history, plus the
              shared Core UI Kit and Marketing Sections every product surface draws from.
            </Body>
            <Link
              href="/docs"
              className="focus-ring w-fit rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              See how these compose in Architecture →
            </Link>
          </div>
        </Card>

        <div className="grid gap-8 border-t border-border-subtle pt-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              {selfEntry.description} Twelve families cover everything from raw design tokens up through
              multi-step workflow systems — Foundations &amp; Tokens, Layout, Navigation, Data Display, Forms,
              Overlays, Feedback, Search &amp; Filter, Inspector &amp; Properties, and Workflow &amp; Process for
              building application screens, plus the shared Core UI Kit and Marketing Sections every product
              surface, application or marketing, draws from.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {[
                "The twelve families the component library is organized into, and which family to reach for a given UI problem.",
                "Which families are single-page references versus multi-page systems — Data Display and Workflow & Process are the largest, at six and eight pages each.",
                "How Foundations & Tokens underpins every other family, and how Core UI Kit and Marketing Sections extend the same primitives to non-application surfaces.",
                "Where to go next for composition rules (Architecture), reusable templates (Patterns), and real domain platforms (Applications) built from these same components.",
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
            <MetricCard value={String(FAMILY_GROUPS.length)} label="Component families" />
            <MetricCard value={String(TOTAL_SECTION_PAGES)} label="Pages in this section" />
            <MetricCard value={String(MULTI_PAGE_FAMILIES)} label="Multi-page families" />
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
            {RELATED_SECTIONS.map((related) => (
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

        <div className="flex flex-col gap-6 border-t border-border-subtle pt-10">
          <SectionHeader
            id="browse-everything"
            eyebrow={<Eyebrow tone="accent">Browse everything</Eyebrow>}
            title="All twelve families"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {GROUP_CARDS.map(({ group, entries }) => (
              <Card key={group.id} className="flex h-full flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-body-md font-medium text-ink-primary">{group.title}</span>
                  <Body size="sm" muted>
                    {group.description}
                  </Body>
                </div>
                <Caption className="text-ink-tertiary">
                  {entries.length} {entries.length === 1 ? "page" : "pages"}
                </Caption>
                <div className="mt-auto flex flex-wrap gap-2 border-t border-border-subtle pt-3">
                  {entries.map((entry) => (
                    <Link
                      key={entry.id}
                      href={entry.href}
                      className="focus-ring rounded-md border border-border px-2.5 py-1 text-caption text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:text-ink-primary"
                    >
                      {entry.title}
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </div>
    </SectionPlaceholder>
  );
}
