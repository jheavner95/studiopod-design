export type FeatureAdoptionVerdict = "platform-certified" | "partial-platform-coverage" | "no-platform-coverage";

export interface FeatureAdoptionEntry {
  candidate: string;
  verdict: FeatureAdoptionVerdict;
  finding: string;
}

export const VERDICT_LABEL: Record<FeatureAdoptionVerdict, string> = {
  "platform-certified": "Platform certified, feature unbuilt",
  "partial-platform-coverage": "Partial Platform coverage",
  "no-platform-coverage": "No Platform coverage",
};

/**
 * The ten Business Feature candidates this package's own work order names.
 * A dedicated grep audit (src/components/platform/, src/app/application-
 * components/*-platform/, and a repo-wide search for each candidate's own
 * name) ran before this table was written — no implementation was
 * performed, only identification, per this package's own instruction.
 */
export const ADOPTION_TARGETS: FeatureAdoptionEntry[] = [
  {
    candidate: "Production",
    verdict: "platform-certified",
    finding: "Production Platform is Certified — 12 components under src/components/platform/production/, all composed from Foundation/Operational/Workflow. Zero Business Feature exists: no routing, no data fetching, no real production-pipeline screen anywhere in the repo. This is the clearest composition opportunity — the Workspace Feature template maps almost directly onto ProductionWorkspace.",
  },
  {
    candidate: "Products",
    verdict: "platform-certified",
    finding: "Product Platform is Certified — 12 components, the first platform to reach 12-of-12 pure re-exports with zero new wrapper code. This page's own name (\"Products\", plural) does not exactly match the Platform's own name (\"Product\", singular) — a naming note for whoever builds this feature, not a discrepancy this page resolves. Zero Business Feature exists.",
  },
  {
    candidate: "Publishing",
    verdict: "platform-certified",
    finding: "Publishing Platform is Certified — 12 components, correctly composing State Machine's own StateHistory for chronological publishing history rather than duplicating Workflow Timeline. Zero Business Feature exists.",
  },
  {
    candidate: "Commerce",
    verdict: "platform-certified",
    finding: "Commerce Platform is Certified — 12 components spanning three distinct Data Grid consumers (Catalog, Orders, Inventory) over structurally different row shapes. Zero Business Feature exists.",
  },
  {
    candidate: "Intelligence",
    verdict: "platform-certified",
    finding: "Intelligence Platform is Certified — 12 components with the widest Operational reuse of any platform (five distinct Operational widgets composed directly). Zero Business Feature exists.",
  },
  {
    candidate: "Administration",
    verdict: "platform-certified",
    finding: "Admin Platform is Certified — 12 components, the first real Platform-tier consumer of Approval & Review's own ApprovalStage. Zero Business Feature exists.",
  },
  {
    candidate: "Settings",
    verdict: "partial-platform-coverage",
    finding: "No dedicated Settings platform exists, and none should be built — confirmed by grep, \"Settings\" appears only inside Admin Platform's own anatomy/gallery/implementation-guidance data as a concept AdminConfiguration already covers, never as a separate platform. A Settings Business Feature is expected to compose Admin Platform's AdminConfiguration directly, supplemented by Foundation's own Form System for anything domain-specific — see the Settings Feature template.",
  },
  {
    candidate: "Automation",
    verdict: "partial-platform-coverage",
    finding: "No dedicated Automation platform exists, but real coverage does: Operations Platform ships a real OperationsAutomation component (src/components/platform/operations/OperationsAutomation.tsx), confirmed by grep — generalized for cross-system automation, not a literal one-provider integration. An Automation Business Feature composes this directly rather than waiting on a dedicated platform.",
  },
  {
    candidate: "Planning",
    verdict: "no-platform-coverage",
    finding: "No dedicated component exists anywhere for Planning. The only related material is the illustration-canvas Platform Architecture Library's own example data (src/platforms/examples/) and unrelated \"planning\" prose in Workflow gallery copy — neither is real planning-tool logic. A Planning Business Feature has no Platform-tier shell to compose yet; it would require new Platform-tier support first, or compose Workflow's own Pipeline Components / State Machine directly with no Platform-tier layer in between.",
  },
  {
    candidate: "Creative",
    verdict: "no-platform-coverage",
    finding: "No dedicated component exists anywhere for Creative. The only related material is inside the illustration-canvas Platform Architecture Library (src/platforms/types/platform.ts, src/platforms/components/PlatformFlowDiagram.tsx) and Workflow Visualization's own gallery copy — none of it real creative-tooling logic. Distinct from Intelligence (which does have a Certified Platform), Creative has no Platform-tier coverage at all.",
  },
];

export const ADOPTION_SUMMARY =
  "Six of the ten features (Production, Products, Publishing, Commerce, Intelligence, Administration) have a Certified Platform-tier component library to compose. Two (Settings, Automation) have real but partial Platform coverage through a sibling platform's own component (Admin's AdminConfiguration, Operations' OperationsAutomation) rather than a dedicated platform of their own. Two (Planning, Creative) have no Platform-tier coverage at all, confirmed by direct grep, not assumed from the name; each would require new Platform-tier support.";
