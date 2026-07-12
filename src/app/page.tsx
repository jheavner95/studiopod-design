import type { ReactNode } from "react";
import {
  Boxes,
  Blocks,
  Waypoints,
  Rocket,
  Compass,
  Sparkles,
  ShieldCheck,
  Globe,
  Layers,
  CheckCircle2,
  BookOpen,
  SlidersHorizontal,
  Palette,
} from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, SectionHeader, Eyebrow, Display, Body, Card } from "@/components/ui";
import { DocsLinkCard } from "@/components/docs";
import { SystemGrid } from "@/components/illustration";
import { NAV_SECTIONS, getEntry, type NavSectionId } from "@/lib/design-system-navigation";

/**
 * The four highest-value working areas for a first-time visitor, in the
 * order most people actually move through them: build with the library,
 * see it running in a real product surface, assemble a new screen from
 * ready-made compositions, then check the evidence behind the quality bar.
 */
const PRIMARY_SECTION_IDS: NavSectionId[] = ["components", "applications", "patterns", "quality"];

/** The two remaining top-level areas, surfaced lower on the page as "explore next." */
const RELATED_SECTION_IDS: NavSectionId[] = ["architecture", "playground"];

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
    title: "Organized by what you need",
    body: "Components, Patterns, Applications, Architecture, Playground, and Quality — six areas grouped by what you're trying to do, whether that's building a screen, seeing a real example, or checking the evidence behind a claim.",
  },
  {
    icon: <CheckCircle2 className="size-5" />,
    title: "Every page is a real page",
    body: "Everything you reach from here is a working page — live components, real application examples, and actual certification records, not placeholders waiting to be filled in.",
  },
];

const QUICK_STARTS: { entryId: string; icon: ReactNode }[] = [
  { entryId: "foundations", icon: <SlidersHorizontal className="size-4" /> },
  { entryId: "tokens", icon: <Palette className="size-4" /> },
  { entryId: "documentation", icon: <BookOpen className="size-4" /> },
];

const primarySections = PRIMARY_SECTION_IDS.map((id) => NAV_SECTIONS.find((section) => section.id === id)!);
const relatedSections = RELATED_SECTION_IDS.map((id) => NAV_SECTIONS.find((section) => section.id === id)!);

/**
 * The Design System's root: what this project is, who each part is for, and
 * where to begin. Section copy is read from design-system-navigation.ts's
 * NAV_SECTIONS so this page and every section landing it links to stay in
 * sync automatically as that registry changes.
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
            application: the tokens, components, patterns, and architecture both products are built from. It&rsquo;s
            for anyone building, assembling, or evaluating a StudioPOD screen — engineers reaching for a component,
            designers assembling a new feature, and reviewers checking whether something is production-ready.
          </Body>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            Everything on this site is organized around what you&rsquo;re trying to do. If you&rsquo;re not sure
            where to start, the four cards below cover the most common reasons people come here first.
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
            eyebrow={<Eyebrow tone="accent">Where should I begin?</Eyebrow>}
            title="Start here"
            description="The four highest-value destinations for a first-time visitor — pick the one that matches what you're trying to do. Every card is a real, working page, not a placeholder."
            descriptionMaxWidth={false}
          />

          <CardGrid columns={2}>
            {primarySections.map((section) => (
              <DocsLinkCard
                key={section.id}
                href={section.href}
                title={section.title}
                description={section.description}
                adornment={<span className="text-accent-400">{SECTION_ICONS[section.id]}</span>}
                actionLabel={`For: ${section.audience}`}
                size="lg"
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">A few concrete starting points</Eyebrow>}
            title="Quick starts"
            description="A handful of specific pages worth knowing about early, rather than a full list of everything in the system."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {QUICK_STARTS.map(({ entryId, icon }) => {
              const item = getEntry(entryId)!;
              return (
                <DocsLinkCard
                  key={item.id}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  adornment={<span className="text-accent-400">{icon}</span>}
                />
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Explore next</Eyebrow>}
            title="Related areas"
            description="Once you've found your footing, these two areas are worth a look — the composition rules behind every screen, and the hands-on tools for exploring the system by trial and error."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {relatedSections.map((section) => (
              <DocsLinkCard
                key={section.id}
                href={section.href}
                title={section.title}
                description={section.description}
                adornment={<span className="text-accent-400">{SECTION_ICONS[section.id]}</span>}
                actionLabel={`For: ${section.audience}`}
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
