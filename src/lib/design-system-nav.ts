export interface DesignSystemReference {
  title: string;
  /** Omitted for references that aren't a route yet (e.g. repo docs). */
  href?: string;
  description: string;
}

export interface DesignSystemSection {
  id: string;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  references: DesignSystemReference[];
}

/**
 * The seven packages the StudioPOD Design System is organized around.
 * Shared by the global nav and the root landing page so both stay in sync
 * with a single source of truth as sections move from placeholder to real.
 */
export const DESIGN_SYSTEM_SECTIONS: DesignSystemSection[] = [
  {
    id: "foundations",
    label: "Foundations",
    href: "/foundations",
    eyebrow: "package · foundations",
    title: "Foundations",
    description:
      "The structural and motion bedrock every other package builds on: the layout system, the motion engine, and the illustration engine other libraries render through.",
    status: "Established — consolidating into a dedicated section page.",
    references: [
      {
        title: "Layout & grid tools",
        href: "/design-system#layout",
        description: "Container, PageShell, SectionShell, CardGrid, and the dev grid-overlay tooling.",
      },
      {
        title: "Motion engine",
        href: "/motion",
        description: "Semantic motion tokens, hooks, and 14 reusable animation primitives.",
      },
      {
        title: "Illustration engine",
        href: "/illustrations",
        description: "The data-driven diagram engine every workflow and architecture visual renders through.",
      },
    ],
  },
  {
    id: "tokens",
    label: "Tokens",
    href: "/tokens",
    eyebrow: "package · tokens",
    title: "Tokens",
    description:
      "The raw and semantic design tokens StudioPOD Web and App both consume: color ramps, typography, spacing, radius, and shadow scales.",
    status: "Established — consolidating into a dedicated section page.",
    references: [
      {
        title: "Foundation color palette",
        href: "/design-system#foundation-palette",
        description: "Raw Slate/Blue/Green/Amber/Red ramps and Neutral/White/Black, with semantic cross-references.",
      },
      {
        title: "Semantic colors",
        href: "/design-system#colors",
        description: "Canvas, Surface, Panel, Border, Ink, Accent, Success, Warning, Error.",
      },
      {
        title: "Typography, spacing, radius, shadow",
        href: "/design-system#typography",
        description: "The full type scale, spacing scale, corner-radius scale, and elevation shadow scale.",
      },
    ],
  },
  {
    id: "core-components",
    label: "Core Components",
    href: "/core-components",
    eyebrow: "package · core components",
    title: "Core Components",
    description:
      "The shared UI kit every product surface — marketing or application — is built from: buttons, cards, badges, form inputs, and controls.",
    status: "Established — consolidating into a dedicated section page.",
    references: [
      {
        title: "Component gallery",
        href: "/design-system#components",
        description: "Buttons, cards, badges, status indicators, and their interactive states.",
      },
      {
        title: "Forms & controls",
        href: "/design-system#form-controls",
        description: "Text input, textarea, select, checkbox, radio, toggle, segmented control, slider, and more.",
      },
    ],
  },
  {
    id: "marketing-components",
    label: "Marketing Components",
    href: "/marketing-components",
    eyebrow: "package · marketing components",
    title: "Marketing Components",
    description:
      "Reusable marketing page-section compositions built entirely from the packages above. One package among several here, not the project's focus.",
    status: "Early design-system examples — reclassified from the original marketing-site build, not the final site.",
    references: [
      {
        title: "Composition playground",
        href: "/compositions",
        description: "11 reusable marketing section compositions: hero, feature grid, CTA, FAQ, testimonial, and more.",
      },
    ],
  },
  {
    id: "application-components",
    label: "Application Components",
    href: "/application-components",
    eyebrow: "package · application components",
    title: "Application Components",
    description:
      "The operational libraries the StudioPOD application itself is built from — architecture, production, and capability visualizations. The next major focus of this project.",
    status: "Next major focus — existing libraries reclassified as early examples.",
    references: [
      {
        title: "Platform architecture library",
        href: "/platforms",
        description: "Diagrams explaining how StudioPOD's platforms and their relationships fit together.",
      },
      {
        title: "Production & validation library",
        href: "/production",
        description: "How StudioPOD validates artwork, tracks quality gates, and reports production health.",
      },
      {
        title: "Capability library",
        href: "/capabilities",
        description: "Provider-agnostic AI, publishing, and commerce capability and adapter diagrams.",
      },
    ],
  },
  {
    id: "workflow-patterns",
    label: "Workflow Patterns",
    href: "/workflow-patterns",
    eyebrow: "package · workflow patterns",
    title: "Workflow Patterns",
    description:
      "Reusable patterns for visualizing StudioPOD's processes end to end — orchestration, step sequencing, and status propagation, built on the illustration engine.",
    status: "Established — consolidating into a dedicated section page.",
    references: [
      {
        title: "Workflow diagram library",
        href: "/workflows",
        description: "Reusable workflow diagrams that explain StudioPOD's processes from structured data.",
      },
    ],
  },
  {
    id: "documentation",
    label: "Documentation",
    href: "/documentation",
    eyebrow: "package · documentation",
    title: "Documentation",
    description:
      "Where the system's principles, package structure, and contribution workflow are written down — for whoever builds the next marketing page or the first application screen.",
    status: "Placeholder — content is being migrated out of the repo root.",
    references: [
      {
        title: "README.md",
        description: "Project purpose, architecture overview, package map, and local dev workflow.",
      },
      {
        title: "AGENTS.md",
        description: "Conventions and constraints for this repo's customized Next.js fork.",
      },
    ],
  },
];
