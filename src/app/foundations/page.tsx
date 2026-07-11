import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, Display, Body, Badge, Card, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { MetricCard } from "@/components/operational";
import { getEntry, getGroupEntries, getSection } from "@/lib/design-system-navigation";

const entry = getEntry("foundations")!;
const children = getGroupEntries("foundations").filter((e) => e.id !== entry.id);

// The three richest, most fully built pages in this group — the Design
// System Overview alone exercises thirteen real sections (palette, colors,
// typography, spacing, radius, shadow, motion, illustration, components,
// form controls, layout, grid tools, theme preview).
const primaryEntryPoints = children.filter((e) => e.id === "design-system" || e.id === "motion" || e.id === "illustrations");
const remainingEntries = children.filter((e) => !primaryEntryPoints.includes(e));

const relatedSections = [getSection("core-components")!, getSection("application-components")!, getSection("documentation")!];

// Real counts, grounded in the motion engine page's own copy ("five hooks,
// fourteen primitives, one provider, one token set") and this group's own
// registry membership — never guessed.
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Animation primitives", value: "14" },
  { label: "Motion hooks", value: "5" },
];

export default function FoundationsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge>section · {entry.section}</SectionBadge>
          <Display>{entry.title}</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            {entry.description}
          </Body>
          <Badge size="sm" className="w-fit">
            {entry.status}
          </Badge>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              Foundations is the structural, token, and motion layer every other package in the system builds on. It
              covers the raw and semantic design tokens that drive color, typography, spacing, radius, and shadow
              across the whole site; the layout primitives (Container, PageShell, SectionShell, CardGrid) every page
              composes from; the motion engine&apos;s tokens, hooks, and primitives that every animation traces back
              to; and the illustration engine every workflow and architecture diagram renders through. Nothing in
              Core Components, Application Components, or Workflow Patterns exists without this layer coming first.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {[
                "Where the raw and semantic token scales live — color ramps, typography, spacing, radius, and shadow — and how they come together as one interactive showcase on the Design System Overview page.",
                "The layout primitives and dev grid-overlay tooling every page in the system composes from.",
                "How the motion engine's five hooks and fourteen reusable animation primitives compose into every future animation, instead of one-off page effects.",
                "How the illustration engine renders diagrams from data through a single IllustrationCanvas component, and why no real workflow diagram lives on this page yet — only the machinery it's built from.",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <CardGrid columns={3} gap="md">
          {STATS.map((stat) => (
            <MetricCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="entry-points"
            eyebrow={<Eyebrow tone="accent">Start here</Eyebrow>}
            title="Primary entry points"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {primaryEntryPoints.map((item) => (
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
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-sections"
            eyebrow={<Eyebrow tone="accent">Continue exploring</Eyebrow>}
            title="Related sections"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {relatedSections.map((section) => (
              <Link key={section.id} href={section.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{section.title}</span>
                  <Body size="sm" muted>
                    {section.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="browse-everything"
            eyebrow={<Eyebrow tone="accent">Also in this section</Eyebrow>}
            title="Browse everything"
            description="The remaining page in Foundations, not yet built out beyond pointing into the Design System Overview's own token sections."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={remainingEntries.length > 2 ? 3 : 2} gap="md">
            {remainingEntries.map((item) => (
              <Link key={item.id} href={item.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-body-md font-medium text-ink-primary">{item.title}</span>
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
      </SectionShell>
    </PageShell>
  );
}
