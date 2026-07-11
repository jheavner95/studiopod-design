export interface CompositionRule {
  category: string;
  rule: string;
}

/**
 * The six allowed and five forbidden rules this package's own work order
 * names literally. Four of the six allowed rules restate DS-5.1's own
 * Composition Rules verbatim in direction (Platform → Business Feature,
 * Workflow → Platform, Operational → Workflow, Foundation → Operational);
 * two are new — Business Feature → Repository and Business Feature → API —
 * making explicit as dependency-direction rules what DS-5.1's own
 * Application Boundaries only stated as ownership. All five forbidden rules
 * restate DS-5.1's own Forbidden Rules, reworded around a Business
 * Feature's own internal parts (Feature Structure/Feature Template) rather
 * than the tier-to-tier language DS-5.1 used.
 */
export const ALLOWED_RULES: CompositionRule[] = [
  {
    category: "Platform → Business Feature",
    rule: "A Business Feature may compose any Platform component from its own domain's platform directly — this is the default, expected path for every Feature Category above except Configuration and Automation, where no dedicated Platform exists yet.",
  },
  {
    category: "Workflow → Platform",
    rule: "A Platform component may compose any Workflow component — how 95 of 96 certified Platform components already ship, per DS-4.10's own certification finding.",
  },
  {
    category: "Operational → Workflow",
    rule: "A Workflow component may compose any Operational component — Workflow Framework's own shell composes Inspector Panel and Status & Health directly, for example.",
  },
  {
    category: "Foundation → Operational",
    rule: "An Operational component may compose any Foundation component — every one of the nine Operational systems is built entirely on Foundation primitives, per DS-2.5.10's own certification finding.",
  },
  {
    category: "Business Feature → Repository",
    rule: "A Business Feature's own Services may call its own Repositories directly — the only layer permitted to do so, per Feature Structure's own ownership answer for Repositories.",
  },
  {
    category: "Business Feature → API",
    rule: "A Business Feature's own Repositories may call its own API layer directly — the only layer permitted to do so, per Feature Structure's own ownership answer for API.",
  },
];

export const FORBIDDEN_RULES: CompositionRule[] = [
  {
    category: "Business Feature recreating reusable UI",
    rule: "If a Platform, Workflow, or Operational component already covers a Feature Template part — a Header, an Inspector, a Dialog — a Business Feature must compose that component rather than hand-rolling a new one. This is the single most common way duplication re-enters a codebase, per every DS-3.x and DS-4.x package's own duplication audit one and two tiers down.",
  },
  {
    category: "Platform importing Business Features",
    rule: "A Platform component must never import from a Business Feature, or from src/app at all. Platform components are reusable across every feature that might compose them; importing downward would break that reusability for everyone else.",
  },
  {
    category: "Workflow importing Business Features",
    rule: "A Workflow component must never import from a Business Feature. Workflow stays domain-agnostic specifically so every Platform and every Business Feature can reuse it — reaching up into one feature's own code would compromise that for all the others.",
  },
  {
    category: "Cross-feature dependencies",
    rule: "One Business Feature must never import another Business Feature's own Views, Panels, Services, or Repositories directly. Two features sharing a real need compose the same lower-tier component independently, or the need is promoted into a new Platform-tier component — it is never satisfied by one feature reaching into another's own internals.",
  },
  {
    category: "Reverse dependencies",
    rule: "No layer may import from a layer to its right in the Composition Stack, and no component may import a sibling from a different platform, domain, or feature at the same tier — the same zero-reverse, zero-sideways rule independently re-verified by direct grep at every capstone from Foundation through Application Composition Architecture.",
  },
];
