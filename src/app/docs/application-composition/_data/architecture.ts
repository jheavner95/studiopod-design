export interface ArchitectureTopic {
  label: string;
  text: string;
}

/**
 * The same six-question framing DS-4.1 used one tier down for Platform,
 * applied here to the boundary between Platform and the real application —
 * Purpose, Goals, Composition philosophy, Layer responsibilities, Reuse
 * strategy, Business Feature definition.
 */
export const COMPOSITION_ARCHITECTURE_TOPICS: ArchitectureTopic[] = [
  {
    label: "Purpose",
    text: "This page defines how the real StudioPOD application gets built from the four certified design-system tiers below it — Foundation, Operational, Workflow, and Platform (96 components across eight platforms, all Certified) — without duplicating any of them. It exists because certifying reusable components is not the same problem as composing them into real, working product screens with real data, real routing, and real users; the certified component tiers solved the first problem, this architecture layer solves the second.",
  },
  {
    label: "Goals",
    text: "Three goals, in order: first, prove that a real screen can be built entirely by composing already-certified components, with zero new reusable UI invented at the feature level. Second, give every future Business Feature a consistent internal shape (see Feature Anatomy) so two unrelated features look structurally similar to a new contributor. Third, draw a bright, checkable line between what belongs in a Business Feature and what belongs one layer down in Platform — the same discipline that kept Platform from reimplementing Workflow, and Workflow from reimplementing Operational, all the way down.",
  },
  {
    label: "Composition philosophy",
    text: "Compose, don't recreate — the same rule that has held at every boundary in this design system since its earliest Foundation work, re-verified with zero violations at every tier by direct grep against the codebase. A Business Feature is not a place to build a new button, a new table, or a new status badge; if a feature screen needs one, that need almost always resolves to an existing Foundation, Operational, Workflow, or Platform component, and on the rare occasion it doesn't, the fix is a new Platform-tier component, not a one-off feature-level fork.",
  },
  {
    label: "Layer responsibilities",
    text: "Each of the six layers in the Composition Model owns exactly one concern and composes only from the layers below it (see Composition Model and Composition Rules). Foundation owns generic UI. Operational owns composed, ready-to-use panels. Workflow owns domain-agnostic multi-step process primitives. Platform owns domain-specific reusable components, one platform at a time. Business Features own real screens, routing, data fetching, and business logic — the tier this package finally defines. The Application is the sum of every shipped Business Feature, not a layer with components of its own.",
  },
  {
    label: "Reuse strategy",
    text: "The same shared-ownership re-export precedent that let most Platform components ship as one-line re-exports of Workflow/Operational components (nine or more components reused across three or more platforms) is expected to repeat one layer up: most of what a Business Feature needs — a workspace shell, an inspector, a data grid, an approval flow — already exists as a certified Platform component. A Business Feature's own code should be almost entirely business logic (data fetching, validation rules, orchestration) wired to already-built UI, not new UI.",
  },
  {
    label: "Business Feature definition",
    text: "\"Business Features\" is not a new term — Platform Architecture coined it to name the tier above Platform, and it has since propagated consistently into every platform library's own migration-notes and implementation-guidance data. This page is the first to actually define what one looks like in practice — see Business Feature Model, below — rather than mention it only as the boundary Platform stops at.",
  },
];
