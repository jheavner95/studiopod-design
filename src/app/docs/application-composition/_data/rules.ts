export interface CompositionRule {
  category: string;
  rule: string;
}

/**
 * The allowed and forbidden dependency directions this package's own work
 * order names, made concrete — the same "allowed imports / forbidden
 * imports" shape Platform Rules used one tier down, extended one layer
 * further to cover Business Features and the Application itself.
 */
export const ALLOWED_RULES: CompositionRule[] = [
  {
    category: "Platform → Business Feature",
    rule: "A Business Feature may compose any Platform component from its own domain's platform, plus any Workflow/Operational/Foundation component directly, when no Platform-tier equivalent exists yet (see Settings Feature in Application Templates for the clearest example of this).",
  },
  {
    category: "Workflow → Platform",
    rule: "A Platform component may compose any Workflow component — this is how most Platform components already ship, as thin wrappers or direct re-exports of Workflow primitives (confirmed at Platform Certification: 95 of 96 Platform components are pure re-exports of already-certified lower-tier components).",
  },
  {
    category: "Operational → Workflow",
    rule: "A Workflow component may compose any Operational component — Workflow Framework's own shell composes Inspector Panel and Status & Health directly, for example.",
  },
  {
    category: "Foundation → Operational",
    rule: "An Operational component may compose any Foundation component — every one of the nine Operational systems is built entirely on Foundation primitives, confirmed at Operational Certification.",
  },
];

export const FORBIDDEN_RULES: CompositionRule[] = [
  {
    category: "Business Feature → Foundation directly when a higher abstraction exists",
    rule: "If a Platform, Workflow, or Operational component already covers a need, a Business Feature must compose that component rather than reaching past it straight to Foundation. Skipping a tier to hand-roll something a higher layer already provides is the single most common way duplication re-enters a codebase — the same discipline every Workflow and Platform package's own duplication audit existed to catch one tier down.",
  },
  {
    category: "Platform → Business Feature",
    rule: "A Platform component must never import from a Business Feature, or from src/app at all. Platform components are reusable across every feature that might compose them; importing downward would make a Platform component depend on one specific feature's own implementation, breaking that reusability for everyone else.",
  },
  {
    category: "Workflow → Application",
    rule: "A Workflow component must never import from a Business Feature or from the application's own routing/data layer. Workflow stays domain-agnostic specifically so it can be reused by every Platform and every Business Feature — reaching up into one feature's own code would compromise that for all the others.",
  },
  {
    category: "Operational → Platform",
    rule: "An Operational component must never import from Platform. Operational is generic, composed UX with zero business-domain awareness; a Platform component importing something is fine, but the reverse would mean an Operational component knows about one specific business domain, which breaks the layer's entire purpose.",
  },
  {
    category: "Reverse dependencies",
    rule: "No layer may import from a layer to its right in the Composition Model, and no component may import a sibling from a different platform, domain, or feature at the same tier. This is the same zero-reverse-dependency, zero-sideways-dependency rule independently re-verified by direct grep at every capstone from Foundation through Platform — Business Features and Application inherit it unchanged.",
  },
];
