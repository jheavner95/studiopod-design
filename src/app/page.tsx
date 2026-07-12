import type { ReactNode } from "react";
import Link from "next/link";
import {
  Boxes,
  Blocks,
  Waypoints,
  Rocket,
  Compass,
  Palette,
  SlidersHorizontal,
  Table,
  ArrowRight,
  Cog,
  ShieldCheck,
  Eye,
  Activity,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, SectionHeader, Button, CTAGroup, GlassPanel } from "@/components/ui";
import { DocsLinkCard } from "@/components/docs";
import { SystemGrid, AnimatedNode, AnimatedConnector } from "@/components/illustration";
import { HeroComposition, WorkflowComposition, FeatureGridComposition, CTAComposition, type WorkflowStep } from "@/compositions";
import { NAV_SECTIONS, getEntry, type NavSectionId } from "@/lib/design-system-navigation";

const LAYERS = [
  { label: "Foundations", icon: <SlidersHorizontal className="size-4" /> },
  { label: "Components", icon: <Blocks className="size-4" /> },
  { label: "Patterns", icon: <Waypoints className="size-4" /> },
  { label: "Applications", icon: <Rocket className="size-4" /> },
];

/** A compact composition diagram — four layers converging into one product — used as the hero visual instead of a decorative graphic. */
function CompositionIllustration() {
  return (
    <GlassPanel padding="lg" glow className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
      <div className="scrollbar-none w-full overflow-x-auto">
        <div className="flex w-max items-center justify-center gap-2 px-1 sm:w-full">
          {LAYERS.map((layer, index) => (
            <div key={layer.label} className="flex items-center">
              <div className="flex w-20 flex-col items-center gap-2">
                <AnimatedNode status="idle" icon={layer.icon} size="md" />
                <span className="text-caption font-medium text-ink-primary">{layer.label}</span>
              </div>
              {index < LAYERS.length - 1 ? <AnimatedConnector active length={20} /> : null}
            </div>
          ))}
        </div>
      </div>
      <AnimatedConnector orientation="vertical" active length={28} />
      <div className="flex flex-col items-center gap-2">
        <AnimatedNode status="active" icon={<Boxes className="size-6" />} size="lg" />
        <span className="text-body-md font-medium text-ink-primary">StudioPOD</span>
      </div>
    </GlassPanel>
  );
}

const SYSTEM_FLOW_STEPS = [
  {
    id: "foundations",
    label: "Foundations",
    summary: "Design tokens, motion, and layout primitives everything else is built from.",
    href: "/foundations",
    icon: <SlidersHorizontal className="size-4" />,
  },
  {
    id: "components",
    label: "Components",
    summary: "The reusable component library, organized by family.",
    href: "/application-components",
    icon: <Blocks className="size-4" />,
  },
  {
    id: "patterns",
    label: "Patterns",
    summary: "Compositions and templates for recurring problems.",
    href: "/workflow-patterns",
    icon: <Waypoints className="size-4" />,
  },
  {
    id: "applications",
    label: "Applications",
    summary: "Domain platforms built entirely from the layers above.",
    href: "/applications",
    icon: <Rocket className="size-4" />,
  },
] as const;

/** The four documentation layers, plus the terminal "StudioPOD" node the pipeline builds toward. */
function systemFlowSteps(): WorkflowStep[] {
  const linkedSteps: WorkflowStep[] = SYSTEM_FLOW_STEPS.map((step) => ({
    id: step.id,
    label: step.label,
    summary: step.summary,
    icon: step.icon,
    status: "idle",
    details: (
      <Link href={step.href} className="inline-flex items-center gap-1 font-medium text-accent-400 hover:text-accent-300">
        View documentation <ArrowRight className="size-3.5" />
      </Link>
    ),
  }));

  return [
    ...linkedSteps,
    {
      id: "studiopod",
      label: "StudioPOD",
      summary: "The real product every layer above builds toward.",
      icon: <Boxes className="size-4" />,
      status: "active",
    },
  ];
}

const FEATURED_ENTRY_IDS: { id: string; icon: ReactNode }[] = [
  { id: "foundation-table", icon: <Table className="size-5" /> },
  { id: "property-panel", icon: <SlidersHorizontal className="size-5" /> },
  { id: "workflow-framework", icon: <Waypoints className="size-5" /> },
  { id: "production-workspace-feature", icon: <Rocket className="size-5" /> },
  { id: "platform-architecture-doc", icon: <Compass className="size-5" /> },
  { id: "application-composition-doc", icon: <Boxes className="size-5" /> },
];

const DESIGN_PRINCIPLES: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <Layers className="size-5" />,
    title: "Hierarchy before decoration",
    description: "The most important thing on a screen should look like the most important thing — weight and contrast do that before color or ornament get a turn.",
  },
  {
    icon: <Rocket className="size-5" />,
    title: "Production-first interfaces",
    description: "Every pattern here is built for real production, commerce, and publishing workflows, not a mockup that breaks under real data.",
  },
  {
    icon: <Blocks className="size-5" />,
    title: "Components compose upward",
    description: "Foundation pieces combine into operational panels, which combine into workflow systems, which combine into platform screens. Nothing skips a layer.",
  },
  {
    icon: <CheckCircle2 className="size-5" />,
    title: "Consistency over novelty",
    description: "A button behaves the same whether it's confirming an order or dismissing a dialog. Predictability is the feature.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "Accessibility by default",
    description: "Keyboard support, focus states, and ARIA semantics ship with every component, not bolted on afterward.",
  },
  {
    icon: <Eye className="size-5" />,
    title: "Progressive disclosure",
    description: "Show what's needed now, reveal detail on request. Dense screens stay usable when they don't try to say everything at once.",
  },
  {
    icon: <Activity className="size-5" />,
    title: "Operational clarity",
    description: "Status, health, and progress are visible at a glance — the system is built to be monitored, not just looked at.",
  },
];

const START_HERE_PATHS: { title: string; description: string; href: string; icon: ReactNode; audience: string }[] = [
  {
    title: "Design",
    description: "Explore components, layouts, interaction patterns, and accessibility.",
    href: "/application-components",
    icon: <Palette className="size-5" />,
    audience: "Design",
  },
  {
    title: "Engineering",
    description: "Learn implementation patterns, architecture, composition, and reusable systems.",
    href: "/application-components/architecture",
    icon: <Cog className="size-5" />,
    audience: "Engineering",
  },
  {
    title: "Product",
    description: "Understand application architecture, workflows, and production thinking.",
    href: "/applications",
    icon: <Rocket className="size-5" />,
    audience: "Product",
  },
  {
    title: "Architecture",
    description: "Explore the Production Operating System and how every layer composes together.",
    href: "/docs",
    icon: <Compass className="size-5" />,
    audience: "Architecture",
  },
];

const DOC_AREA_IDS: NavSectionId[] = ["components", "patterns", "applications", "architecture", "playground"];

/**
 * The design system's front door. A first-time visitor should understand what
 * this is, who it's for, and where to begin within seconds — everything below
 * is built from the same illustration and composition primitives the rest of
 * the system teaches, so the homepage is itself a working example.
 */
export default function Home() {
  const docAreas = DOC_AREA_IDS.map((id) => NAV_SECTIONS.find((section) => section.id === id)!);
  const aboutEntry = getEntry("documentation")!;

  return (
    <PageShell background={<SystemGrid />}>
      <HeroComposition
        eyebrow={<SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD Design System</SectionBadge>}
        title="Design, build, and scale production-ready interfaces."
        subtitle="The same components, patterns, and architecture that power StudioPOD — one system for the marketing site and the product, so every screen looks, behaves, and composes the same way."
        cta={
          <CTAGroup align="center">
            <Button href="/application-components" size="lg">
              Explore Components
            </Button>
            <Button href="#start-here" variant="secondary" size="lg">
              Start Here
            </Button>
          </CTAGroup>
        }
        illustration={<CompositionIllustration />}
        trustRow={{
          items: [
            "Production Operating System",
            "Enterprise-ready architecture",
            "Accessibility-first",
            "Reusable across every StudioPOD platform",
          ],
        }}
        layout="centered"
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="start-here"
            eyebrow={<SectionBadge>Where should I begin?</SectionBadge>}
            title="Start here"
            description="Four paths in, based on what you're trying to do — each one leads somewhere specific."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {START_HERE_PATHS.map((path) => (
              <DocsLinkCard
                key={path.title}
                href={path.href}
                title={path.title}
                description={path.description}
                adornment={<span className="text-accent-400">{path.icon}</span>}
                actionLabel={`For: ${path.audience}`}
                size="lg"
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <WorkflowComposition
        eyebrow={<SectionBadge>How it fits together</SectionBadge>}
        title="How the system works"
        description="Five layers, one direction — each one composes the layer before it."
        steps={systemFlowSteps()}
      />

      <FeatureGridComposition
        eyebrow={<SectionBadge>Worth a look</SectionBadge>}
        title="Featured pages"
        description="Six pages that show the breadth of the system — pick one and jump in."
        columns={3}
        items={FEATURED_ENTRY_IDS.map(({ id, icon }) => {
          const entry = getEntry(id)!;
          return {
            icon,
            title: entry.title,
            description: entry.description,
            cta: (
              <Button href={entry.href} variant="ghost" size="sm" trailingIcon={<ArrowRight className="size-4" />}>
                View
              </Button>
            ),
          };
        })}
      />

      <FeatureGridComposition
        eyebrow={<SectionBadge>Philosophy</SectionBadge>}
        title="Design principles"
        description="The rules that keep every screen consistent, whether it ships from us or gets built on top of what we ship."
        columns={4}
        items={DESIGN_PRINCIPLES.map((principle) => ({
          icon: principle.icon,
          title: principle.title,
          description: principle.description,
        }))}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<SectionBadge>Documentation overview</SectionBadge>}
            title="Six areas, one system"
            description="Where to go once you know what you're looking for."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {docAreas.map((section) => (
              <DocsLinkCard
                key={section.id}
                href={section.href}
                title={section.title}
                description={section.description}
                actionLabel={`For: ${section.audience}`}
              />
            ))}
            <DocsLinkCard
              href={aboutEntry.href}
              title="Overview"
              description="The system's guiding principles, and how to contribute new components or improvements."
              actionLabel="For: Anyone arriving for the first time"
            />
          </CardGrid>
        </div>
      </SectionShell>

      <CTAComposition
        title="Ready to build?"
        layout="centered"
        size="lg"
        cta={
          <CTAGroup align="center">
            <Button href="/application-components" size="lg">
              Explore Components
            </Button>
            <Button href="/applications" variant="secondary" size="lg">
              Browse Applications
            </Button>
            <Button href="/docs" variant="secondary" size="lg">
              Learn the Architecture
            </Button>
          </CTAGroup>
        }
      />
    </PageShell>
  );
}
