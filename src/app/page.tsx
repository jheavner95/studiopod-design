import type { ReactNode } from "react";
import Link from "next/link";
import { Boxes, Blocks, Waypoints, Rocket, Compass, Sparkles, ShieldCheck, Globe, GitBranch, Layers } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, SectionHeader, Eyebrow, Display, Body, Card, Badge, Caption } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { NAV_SECTIONS, type NavSectionId } from "@/lib/design-system-navigation";

/**
 * The five real working areas this homepage cards into, in reading order.
 * "Overview" isn't cardable (it's this page); "Patterns" gets folded in as
 * a sixth card rather than a full standalone tier, per DS-7.1 Part 7's own
 * five-name example list (Components/Applications/Architecture/Playground/
 * Quality) plus Patterns as the one addition worth surfacing on its own.
 */
const ENTRY_SECTION_IDS: NavSectionId[] = ["components", "patterns", "applications", "architecture", "playground", "quality"];

const SECTION_ICONS: Record<NavSectionId, ReactNode> = {
  overview: <Boxes className="size-5" />,
  components: <Blocks className="size-5" />,
  patterns: <Waypoints className="size-5" />,
  applications: <Rocket className="size-5" />,
  architecture: <Compass className="size-5" />,
  playground: <Sparkles className="size-5" />,
  quality: <ShieldCheck className="size-5" />,
};

const IDENTITY_FACTS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Globe className="size-5" />,
    title: "One system, two products",
    body: "The shared source of truth for both the StudioPOD marketing site and the StudioPOD application — every token, primitive, and pattern is built once, here.",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Organized by goal, not by history",
    body: "Seven sections — Overview, Components, Patterns, Applications, Architecture, Playground, Quality — grouped by what you're trying to do, not by which package built it.",
  },
  {
    icon: <GitBranch className="size-5" />,
    title: "Nothing moved, everything reframed",
    body: "Every route below already existed before this page did. This restructure changed how the system is organized and explained, not where anything lives.",
  },
];

const ENTRY_SECTIONS = ENTRY_SECTION_IDS.map((id) => NAV_SECTIONS.find((section) => section.id === id)!);

/**
 * The Design System's root: what this project is, who each part is for, and
 * where to begin. Reads its section data from design-system-navigation.ts's
 * NAV_SECTIONS — the DS-7.1 registry every other page in this package is
 * already built against — rather than the older, hand-authored
 * design-system-nav.ts list this page used before.
 */
export default function Home() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD Design System</SectionBadge>
          <Eyebrow tone="accent">What is this?</Eyebrow>
          <Display>The design system behind every StudioPOD surface.</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            StudioPOD Design System is the shared source of truth for the StudioPOD marketing site and the StudioPOD
            application: the tokens, components, patterns, and architecture both products are built from, organized
            around what you&rsquo;re trying to do rather than which team or package built it.
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <CardGrid columns={3}>
          {IDENTITY_FACTS.map((fact) => (
            <Card key={fact.title} className="flex flex-col gap-4">
              <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
                {fact.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-body-md font-medium text-ink-primary">{fact.title}</span>
                <Body size="sm" muted>
                  {fact.body}
                </Body>
              </div>
            </Card>
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Who is it for, and where should I begin?</Eyebrow>}
            title="Find your section"
            description="Each section below names who it's built for. Pick the one that matches what you're trying to do — everything here is a real, working page, not a placeholder."
            descriptionMaxWidth={false}
          />

          <CardGrid columns={3}>
            {ENTRY_SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="focus-ring rounded-lg"
                aria-label={`${section.title}: ${section.description}`}
              >
                <Card interactive className="flex h-full flex-col gap-4">
                  <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
                    {SECTION_ICONS[section.id]}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-body-md font-medium text-ink-primary">{section.title}</span>
                    <Caption className="font-mono text-ink-tertiary">{section.href}</Caption>
                  </div>
                  <Body size="sm" muted>
                    {section.description}
                  </Body>
                  <Badge size="sm" className="mt-auto w-fit">
                    For: {section.audience}
                  </Badge>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
