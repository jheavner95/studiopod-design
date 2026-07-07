import type { ReactNode } from "react";
import Link from "next/link";
import {
  Palette,
  LayoutTemplate,
  Waves,
  Boxes,
  Waypoints,
  Network,
  ShieldCheck,
  Blocks,
  Construction,
} from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, SectionHeader, Eyebrow, Display, Body, Card, Badge, Caption } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";

interface IndexLink {
  title: string;
  route: string;
  description: string;
  icon: ReactNode;
}

interface IndexGroup {
  id: string;
  title: string;
  description: string;
  links: IndexLink[];
}

const GROUPS: IndexGroup[] = [
  {
    id: "foundation",
    title: "Foundation",
    description: "Tokens, primitives, and the reusable section compositions every page is assembled from.",
    links: [
      {
        title: "Design System",
        route: "/design-system",
        description: "Tokens, typography, layout, and every UI, motion, and illustration primitive.",
        icon: <Palette className="size-5" />,
      },
      {
        title: "Composition Playground",
        route: "/compositions",
        description: "Reusable marketing section compositions, built entirely from the design system below them.",
        icon: <LayoutTemplate className="size-5" />,
      },
    ],
  },
  {
    id: "motion-illustration",
    title: "Motion & Illustration",
    description: "The animation and diagram engines every data-driven visual in the product is built on.",
    links: [
      {
        title: "Motion Engine",
        route: "/motion",
        description: "Semantic motion tokens, hooks, and fourteen reusable animation primitives.",
        icon: <Waves className="size-5" />,
      },
      {
        title: "Illustration Engine",
        route: "/illustrations",
        description: "The data-driven diagram engine every workflow and architecture visual renders through.",
        icon: <Boxes className="size-5" />,
      },
    ],
  },
  {
    id: "domain-libraries",
    title: "Domain Libraries",
    description: "Purpose-built diagram libraries, layered on the engines above, one per StudioPOD subsystem.",
    links: [
      {
        title: "Workflow Library",
        route: "/workflows",
        description: "Reusable workflow diagrams that explain StudioPOD's processes from structured data.",
        icon: <Waypoints className="size-5" />,
      },
      {
        title: "Platform Architecture",
        route: "/platforms",
        description: "Diagrams explaining how StudioPOD's platforms and their relationships fit together.",
        icon: <Network className="size-5" />,
      },
      {
        title: "Production & Validation",
        route: "/production",
        description: "How StudioPOD validates artwork, tracks quality gates, and reports production health.",
        icon: <ShieldCheck className="size-5" />,
      },
      {
        title: "Capability Library",
        route: "/capabilities",
        description: "Provider-agnostic AI, publishing, and commerce capability and adapter diagrams.",
        icon: <Blocks className="size-5" />,
      },
    ],
  },
];

/**
 * The internal index for every preview/playground page built so far. Not
 * the homepage: the public marketing homepage hasn't been started, this
 * route exists purely so the engines and libraries under development have
 * a central place to navigate from.
 */
export default function Home() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Construction className="size-3.5" />}>StudioPOD / Internal Index</SectionBadge>
          <Display>StudioPOD Marketing Platform</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            An internal index of every preview and playground page built so far, grouped by system area. This is a
            navigation hub for development, not the public site.
          </Body>
          <Caption className="text-ink-tertiary">
            The public homepage has not started yet. Every page linked below is a developer playground for a
            foundation layer or engine, not a finished marketing page.
          </Caption>
        </div>
      </SectionShell>

      {GROUPS.map((group, index) => (
        <SectionShell key={group.id} id={group.id} spacing="lg" divider={index > 0}>
          <div className="flex flex-col gap-10">
            <SectionHeader
              eyebrow={<Eyebrow tone="accent">{group.title}</Eyebrow>}
              title={group.title}
              description={group.description}
              descriptionMaxWidth={false}
            />

            <CardGrid columns={group.links.length > 2 ? 4 : 2}>
              {group.links.map((link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className="focus-ring rounded-lg"
                  aria-label={`${link.title}: ${link.description}`}
                >
                  <Card interactive className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-10 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
                        {link.icon}
                      </div>
                      <Badge tone="success" size="sm">
                        Certified
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-body-md font-medium text-ink-primary">{link.title}</span>
                      <Caption className="font-mono text-ink-tertiary">{link.route}</Caption>
                    </div>
                    <Body size="sm" muted>
                      {link.description}
                    </Body>
                  </Card>
                </Link>
              ))}
            </CardGrid>
          </div>
        </SectionShell>
      ))}
    </PageShell>
  );
}
