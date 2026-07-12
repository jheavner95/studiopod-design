/**
 * LEGACY — this is the old, hand-authored, tier-first marketing-site
 * section list (Foundations/Tokens/Core Components/Marketing Components/
 * Application Components/Workflow Patterns/Documentation as seven flat,
 * independent packages). It predates and is completely separate from the
 * DS-7.1 product information architecture in design-system-navigation.ts
 * (NAV_SECTIONS/NAV_GROUPS/NAV_REGISTRY), which is the current single
 * source of truth for the seven goal-first sections (Overview/Components/
 * Patterns/Applications/Architecture/Playground/Quality) and every page
 * built against it, including the homepage (src/app/page.tsx) and
 * src/app/documentation/page.tsx.
 *
 * DS-7.1 Part 7 retired this file as the homepage's and GlobalNav's data
 * source (both now read NAV_SECTIONS) but did NOT delete it:
 * application-components/page.tsx, marketing-components/page.tsx,
 * tokens/page.tsx, core-components/page.tsx, and
 * components/layout/SectionPlaceholder.tsx still import
 * DESIGN_SYSTEM_SECTIONS or DesignSystemSection from here for their own
 * page-header content (title/eyebrow/description/status/references) — that
 * content has been corrected to match the new framing, but the plumbing
 * itself is still this legacy shape. Don't delete this file, and don't
 * change its exported shape, until those call sites are migrated to
 * design-system-navigation.ts too.
 */

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
    eyebrow: "components · foundations & tokens",
    title: "Tokens",
    description:
      "The raw and semantic design tokens StudioPOD Web and App both consume: color ramps, typography, spacing, radius, and shadow scales. Part of Components' own Foundations & Tokens family.",
    status: "Established.",
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
    eyebrow: "components · core ui kit",
    title: "Core Components",
    description:
      "The shared UI kit every product surface — marketing or application — is built from: buttons, cards, badges, form inputs, and controls. Part of Components' own Core UI Kit family.",
    status: "Established.",
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
    eyebrow: "components · marketing sections",
    title: "Marketing Components",
    description:
      "Reusable marketing page-section compositions built entirely from Core Components and Foundations. Part of Components' own Marketing Sections family.",
    status: "Established.",
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
    label: "Components",
    href: "/application-components",
    eyebrow: "components · overview",
    title: "Components",
    description:
      "The reusable component library the StudioPOD application itself is built from, organized by family (Layout, Navigation, Data Display, Forms, Overlays, Feedback, Search & Filter, Inspector & Properties, Workflow & Process) rather than by build history — see the Components landing page for the full family index.",
    status: "Established — nine certifications complete, see Quality for the full record.",
    references: [
      {
        title: "Components landing page",
        href: "/application-components",
        description: "The full family index — every reusable component grouped by what it's for, not which package built it.",
      },
      {
        title: "Applications",
        href: "/applications",
        description: "The eight domain platform libraries and the real Business Feature pilot built from these components.",
      },
      {
        title: "Quality",
        href: "/docs/certification",
        description: "Every certification and audit, including the nine capstones covering this component library.",
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
