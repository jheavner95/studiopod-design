import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { CardGrid, SectionPlaceholder } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { MetricCard } from "@/components/operational";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";
import { getGroup } from "@/lib/design-system-navigation";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "marketing-components")!;

// Real counts, verified against src/app/compositions/_lib/registry.tsx: 11 distinct
// `group` values (Hero, Workflow, Platform, Feature grid, Comparison, Metrics,
// Timeline, CTA, FAQ, Testimonial, Empty), 24 total registry entries across them.
const STATS = [
  { label: "Composition types", value: "11" },
  { label: "Composition variants", value: "24" },
  { label: "Pages in this section", value: "1" },
];

const WHAT_YOULL_LEARN = [
  "The 11 reusable section types this layer provides: Hero, Feature grid, Comparison, Metrics, Timeline, CTA, FAQ, Testimonial, Workflow, Platform, and Empty-state stand-ins.",
  "How every composition accepts data as props instead of hardcoded copy, so a real page gets assembled from these instead of new one-off sections.",
  "How many variants each composition type ships with today, on the Composition Playground.",
  "Where the underlying primitives live — Core Components for the shared UI kit, Foundations for layout and tokens — since every composition here is built entirely from those two packages.",
];

const PRIMARY_ENTRY_POINTS = [
  {
    href: "/compositions",
    title: "Composition Playground",
    description: "All 11 composition types and their 24 variants, assembled entirely from Foundation and Core Components.",
  },
  {
    href: "/compositions#hero",
    title: "Hero compositions",
    description: "The top-of-page opener. Centered, split, and illustration-first layouts share one content model.",
  },
  {
    href: "/compositions#cta",
    title: "CTA compositions",
    description: "A closing call-to-action band, in three sizes and three layouts, with an enterprise treatment.",
  },
];

const RELATED_GROUPS = [getGroup("core-ui")!, getGroup("foundations-tokens")!];

export default function MarketingComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <div className="flex flex-col gap-10">
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Info className="size-5 shrink-0 text-accent-400" aria-hidden />
          <Body size="sm" muted>
            This package used to be the entire project. It has been reclassified: the compositions below are early
            design-system examples of how Foundation and Core Components compose into marketing page sections — not a
            roadmap toward a finished marketing site. That work is paused while{" "}
            <span className="font-medium text-ink-secondary">the Components section</span> becomes the priority.
          </Body>
        </Card>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              Marketing Components is the composition layer that turns Foundation and Core Components primitives into
              ready-to-use marketing page sections — heroes, feature grids, CTAs, FAQs, testimonials, and more. Its one
              page, the Composition Playground, is the reference implementation for all 11 composition types and their
              24 variants, proving the composition model end to end rather than serving as this project&rsquo;s actual
              marketing site.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {WHAT_YOULL_LEARN.map((item) => (
                <li key={item} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CardGrid columns={3} gap="md">
          {STATS.map((stat) => (
            <MetricCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </CardGrid>

        <div className="flex flex-col gap-6">
          <SectionHeader
            id="entry-points"
            eyebrow={<Eyebrow tone="accent">Start here</Eyebrow>}
            title="Primary entry points"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {PRIMARY_ENTRY_POINTS.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring block rounded-lg">
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

        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-sections"
            eyebrow={<Eyebrow tone="accent">Continue exploring</Eyebrow>}
            title="Related sections"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {RELATED_GROUPS.map((group) => (
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
      </div>
    </SectionPlaceholder>
  );
}
