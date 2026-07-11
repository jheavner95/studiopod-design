export interface LifecycleStage {
  id: string;
  name: string;
  description: string;
  gate: string;
}

/**
 * The seven lifecycle stages this package's own work order names, extending
 * the same Concept → Prototype → Production Ready → Certified → Locked
 * maturity ladder every certified tier below Business Features already
 * uses (see Application Components' own Maturity Model) one tier further.
 * Each stage's own `gate` is the concrete condition that must be true
 * before the next stage starts — the same accountable-handoff shape DS-3.x's
 * own Workflow Stepper and Approval & Review systems already model for a
 * generic multi-step process, applied here to the feature-build process
 * itself.
 */
export const FEATURE_LIFECYCLE: LifecycleStage[] = [
  {
    id: "planning",
    name: "Planning",
    description: "Choose the Feature Category this feature belongs to, identify which Platform (if any) it composes per Application Composition Architecture's own Adoption Targets, and map its own Feature Template parts to real components by name before any code is written.",
    gate: "A written composition plan exists naming every Feature Template part and the certified component it composes — the same per-field shape Application Composition Architecture's own Application Templates already model.",
  },
  {
    id: "composition",
    name: "Composition",
    description: "Assemble the feature's own Workspace, Views, Panels, Dialogs, and Commands entirely from already-certified Platform/Workflow/Operational/Foundation components, per the plan from Planning. No business logic is written yet — this stage proves the UI can be built with zero new reusable components invented.",
    gate: "Every Feature Template UI part (Workspace, Header, Navigation, Primary View, Inspector, Dialogs, Commands) renders from composed components alone, with placeholder or mock data.",
  },
  {
    id: "implementation",
    name: "Implementation",
    description: "Write the feature's own Services, Repositories, State, Validation, and API layers — the business logic Feature Structure assigns entirely to the Business Feature — and wire them to the composed UI from Composition.",
    gate: "The feature functions end to end against real data with no mocked layers remaining.",
  },
  {
    id: "validation",
    name: "Validation",
    description: "Verify the finished feature against Composition Rules (zero recreated UI, zero cross-feature or reverse dependencies) and Feature Architecture's own ownership boundaries — the same grep-based duplication and dependency-direction audit every Workflow-tier and Platform-tier certification ran on itself one and two tiers down.",
    gate: "A grep-based audit confirms zero forbidden-rule violations, matching the audit methodology Operational Certification through Platform Certification each ran before certifying.",
  },
  {
    id: "testing",
    name: "Testing",
    description: "Exercise the feature's own business logic (Services, Repositories, Validation) and its composed UI's own interactive states, at desktop, tablet, and mobile viewports with keyboard navigation — the same verification depth every DS package in this system runs before its own report.",
    gate: "Desktop/tablet/mobile/keyboard verification passes with zero collisions and zero overflow, and the feature's own business logic has test coverage.",
  },
  {
    id: "certification",
    name: "Certification",
    description: "The feature is reviewed against this framework as a whole — Feature Structure, Feature Template, its own Feature Category's composition plan, and Composition Rules — and marked Certified, the same finish line Workspace Architecture, Foundation, Operational, Workflow, and Platform each already reached.",
    gate: "A capstone certification page or entry documents the feature as Certified, citing the specific components it composes — the same disclosure pattern every prior tier's own certification capstone used.",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "As lower tiers evolve — a Platform component gains a new prop, a Workflow system adds a variant — the feature's own composition is revisited to adopt improvements rather than drift from the certified components it depends on.",
    gate: "No fixed exit condition — Maintenance is ongoing for as long as the feature exists, mirroring how a Certified component at any lower tier remains subject to future adoption passes.",
  },
];
