import type { ReactNode } from "react";
import Link from "next/link";
import {
  Boxes,
  Palette,
  Blocks,
  LayoutTemplate,
  Sparkles,
  Waypoints,
  FileText,
  Globe,
  Layers,
  Rocket,
} from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, SectionHeader, Eyebrow, Display, Body, Card, Badge, Caption } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const SECTION_ICONS: Record<string, ReactNode> = {
  foundations: <Boxes className="size-5" />,
  tokens: <Palette className="size-5" />,
  "core-components": <Blocks className="size-5" />,
  "marketing-components": <LayoutTemplate className="size-5" />,
  "application-components": <Sparkles className="size-5" />,
  "workflow-patterns": <Waypoints className="size-5" />,
  documentation: <FileText className="size-5" />,
};

const PRINCIPLES: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Globe className="size-5" />,
    title: "Powers Web and App",
    body: "One set of tokens and primitives, consumed by both the StudioPOD marketing site and the StudioPOD application — not maintained twice.",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Marketing is one package",
    body: "The marketing-site work this project started as is now a single package among seven, not the whole project.",
  },
  {
    icon: <Rocket className="size-5" />,
    title: "Application is next",
    body: "Application and operational components — the patterns the StudioPOD app itself is built from — are the next major focus.",
  },
];

/**
 * The Design System's root: what this project is, who it's for, and where
 * to go next. Replaces the old internal playground index now that this
 * repo's purpose has shifted from "marketing site under construction" to
 * "design system product."
 */
export default function Home() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD Design System</SectionBadge>
          <Display>One design system. Two products.</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            This is the StudioPOD Design System — the shared source of truth for the StudioPOD marketing site and the
            StudioPOD application. Every token, primitive, and pattern below is built once, here, and consumed by
            whichever product needs it.
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <CardGrid columns={3}>
          {PRINCIPLES.map((principle) => (
            <Card key={principle.title} className="flex flex-col gap-4">
              <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
                {principle.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-body-md font-medium text-ink-primary">{principle.title}</span>
                <Body size="sm" muted>
                  {principle.body}
                </Body>
              </div>
            </Card>
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Packages</Eyebrow>}
            title="Explore the design system"
            description="Seven packages, each with its own section. Nothing below was deleted in this restructure — existing work has been reclassified, not removed."
            descriptionMaxWidth={false}
          />

          <CardGrid columns={3}>
            {DESIGN_SYSTEM_SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="focus-ring rounded-lg"
                aria-label={`${section.label}: ${section.description}`}
              >
                <Card interactive className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
                      {SECTION_ICONS[section.id]}
                    </div>
                    <Badge size="sm">{section.references.length} ref{section.references.length === 1 ? "" : "s"}</Badge>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-body-md font-medium text-ink-primary">{section.label}</span>
                    <Caption className="font-mono text-ink-tertiary">{section.href}</Caption>
                  </div>
                  <Body size="sm" muted>
                    {section.description}
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
