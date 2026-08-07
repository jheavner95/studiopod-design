export interface FeatureTrait {
  trait: string;
  description: string;
  polarity: "defining" | "forbidden";
}

/**
 * The seven traits this package's own work order names — six defining
 * characteristics plus the one explicit prohibition. Each restates and
 * sharpens the Business Feature definition DS-4.1 first coined, rather than
 * introducing a competing definition.
 */
export const FEATURE_TRAITS: FeatureTrait[] = [
  {
    trait: "User-facing capability",
    description: "A Business Feature is something a real StudioPOD user opens, works in, and accomplishes a task with — not an internal abstraction. If nothing points a browser at it, it isn't a Business Feature yet.",
    polarity: "defining",
  },
  {
    trait: "Domain-specific",
    description: "A Business Feature is scoped to one business domain — Production, Commerce, Publishing — the same one-platform-one-owner rule Platform already follows one layer down. A feature that genuinely spans domains is a sign the domains should each get their own feature, composing shared Platform components rather than one feature reaching across two domains.",
    polarity: "defining",
  },
  {
    trait: "Composed entirely from lower layers",
    description: "Every piece of reusable UI in a Business Feature already exists in Platform, Workflow, Operational, or Foundation before the feature is built. A Business Feature assembles; it does not manufacture new reusable components — see Reuse Strategy and Composition Rules.",
    polarity: "defining",
  },
  {
    trait: "Owns business rules",
    description: "Validation logic, eligibility checks, pricing rules, permission decisions — the \"what is and isn't allowed\" knowledge specific to this one domain lives in the Business Feature, not in any Platform component it composes. A Platform component exposes the hooks (a disabled prop, a validation callback); the feature decides when to use them.",
    polarity: "defining",
  },
  {
    trait: "Owns orchestration",
    description: "Multi-step sequencing across more than one Platform component — opening an Inspector after a Data Grid row is selected, advancing a Pipeline stage after a Dialog confirms — is the Business Feature's job. Platform components stay decoupled from each other by design; the feature is where they're wired together for one specific screen.",
    polarity: "defining",
  },
  {
    trait: "Owns data interaction",
    description: "API calls, repository access, cache invalidation, optimistic updates — every real network or persistence boundary lives in the Business Feature (see Application Boundaries). Platform components render data they're given; they never fetch it themselves.",
    polarity: "defining",
  },
  {
    trait: "Does NOT recreate reusable UI",
    description: "The one hard prohibition: if a Business Feature finds itself hand-rolling a button, a table, a status badge, or an inspector shell instead of composing the certified Foundation/Operational/Workflow/Platform equivalent, that is a Composition Rules violation, full stop — regardless of how small or how well-implemented the new UI is. The fix is either to use what already exists, or, if a genuine gap is found, to route it back down to Platform as a new reusable component rather than build it once at the feature level.",
    polarity: "forbidden",
  },
];
