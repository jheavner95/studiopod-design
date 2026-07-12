export interface ReviewedPackage {
  code: string;
  title: string;
  href: string;
  summary: string;
}

export const REVIEWED_PACKAGES: ReviewedPackage[] = [
  {
    code: "DS-5.1",
    title: "Application Composition Architecture",
    href: "/docs/application-composition",
    summary: "The canonical composition chain (Foundation → Operational → Workflow → Platform → Business Features → Application), the Business Feature trait/anatomy/template model, composition rules, and a grep-grounded audit of ten prospective features already in the codebase.",
  },
  {
    code: "DS-5.2",
    title: "Business Feature Composition Framework",
    href: "/docs/business-features",
    summary: "The ten-part Feature Architecture ownership tree, a generic thirteen-part Feature Template, nine reusable Feature Categories, composition rules, a seven-stage lifecycle, and a category mapping for all ten prospective features.",
  },
  {
    code: "DS-5.3",
    title: "Business Feature Templates",
    href: "/docs/business-feature-templates",
    summary: "Eight category-specific standard layouts (Automation Feature explicitly excluded and disclosed), each citing real certified components by name, plus a Foundation/Operational/Workflow/Platform/Business-Feature composition matrix.",
  },
  {
    code: "DS-5.4",
    title: "Production Workspace Feature Pilot",
    href: "/application-components/business-features/production-workspace",
    summary: "The first real Business Feature — a fully interactive Production Workspace composing only certified Platform/Workflow/Operational/Foundation components, with local state, undo/redo, five dialogs, and a mock in-memory repository.",
  },
];

export type VerifyVerdict = "Pass" | "Partial" | "Fail";

export interface VerifyDimension {
  dimension: string;
  verdict: VerifyVerdict;
  finding: string;
}

/**
 * The eighteen dimensions this package's own work order names under
 * VERIFY, each independently re-checked against the actual DS-5.1–5.4
 * source rather than trusting each package's own report. Grounded in real
 * evidence gathered during this same certification pass — see Layering
 * Review, Business Feature Review, Accessibility Review, and Dependency
 * Review below for the detail behind each verdict.
 */
export const VERIFY_DIMENSIONS: VerifyDimension[] = [
  { dimension: "Architecture consistency", verdict: "Pass", finding: "The framework, the templates, and the pilot all reuse the composition architecture's own vocabulary verbatim (Feature Architecture, Composition Stack, Business Feature Model) rather than each coining a competing term for the same concept." },
  { dimension: "Business Feature framework compliance", verdict: "Pass", finding: "The pilot's own nine components plus hook plus mock-data file map one-to-one onto the framework's own ten-part Feature Architecture — confirmed field-by-field in the pilot's own Feature Anatomy section, re-verified here against the actual file tree." },
  { dimension: "Template compliance", verdict: "Partial", finding: "The pilot's Workspace shell, Navigation, Primary content, Inspector, Commands, Metrics, and Actions all match the templates' own Workspace Feature Template exactly. One gap: the templates' own seven-part list has no separately named \"Dialogs\" entry, though the pilot correctly built five dialogs per the framework's own thirteen-part generic template. See Promotion Review." },
  { dimension: "Layer composition", verdict: "Pass", finding: "Grep-verified: every import in every pilot file resolves to Platform, Workflow, Operational, or Foundation. Zero skipped tiers, zero components reaching past an available higher-tier equivalent." },
  { dimension: "Platform usage", verdict: "Pass", finding: "Eleven of Production Platform's twelve components are composed directly (ProductionSummary is the one not needed by this pilot's own scope)." },
  { dimension: "Workflow usage", verdict: "Pass", finding: "WorkflowStep and WorkflowFooter are composed directly — correct, since neither has a Platform-tier re-export, matching the framework's own Composition Rules allowance for composing Workflow directly when no Platform-tier equivalent exists." },
  { dimension: "Operational usage", verdict: "Pass", finding: "InspectorSection, PropertyToggle, and Queue are composed directly for the quality-issue checklist and render queue, each at the correct tier." },
  { dimension: "Foundation usage", verdict: "Pass", finding: "Dialog, Button, Badge, SwitchField, Alert, InlineMessage, and Tabs are all composed directly for the five dialogs, feature navigation, and feedback — zero new Foundation-equivalent primitives invented." },
  { dimension: "Accessibility", verdict: "Pass", finding: "Keyboard tab order, focus rings, Dialog's own focus trap/Escape/focus-return, and Tabs' own full ARIA pattern all confirmed working in the live pilot. One disclosed gap (no aria-live wiring for state changes) — see Accessibility Review." },
  { dimension: "Documentation", verdict: "Pass", finding: "All four packages document their own composition diagrams, anatomy, and rules in full; this capstone found one minor completeness gap (see Template compliance above), not a missing-documentation defect." },
  { dimension: "Naming", verdict: "Pass", finding: "Zero collisions found — a direct grep for every ProductionFeature* component name against the rest of src/components/ returns no matches." },
  { dimension: "Dependencies", verdict: "Pass", finding: "Zero reverse-dependency violations and zero cross-feature imports — see Dependency Review." },
  { dimension: "State ownership", verdict: "Pass", finding: "All feature state (artworks, selection, view, dialog, undo/redo history) lives in useProductionWorkspace; every composed component is controlled and presentational." },
  { dimension: "Dialog ownership", verdict: "Pass", finding: "A single `dialog: ProductionDialogState | null` in the hook drives all five dialogs; Foundation's own Dialog component owns none of that state, only `open`/`onOpenChange`." },
  { dimension: "Validation ownership", verdict: "Pass", finding: "The Draft → Ready → Validating → Validated → Complete flow and its mapping into Workflow's own ApprovalStateValue vocabulary are both feature-owned — Workflow has no such flow built in, confirmed by direct source read during the pilot's own research phase." },
  { dimension: "Feature orchestration", verdict: "Pass", finding: "useProductionWorkspace is the single orchestration point for every command; no certified-tier component contains business logic of its own." },
  { dimension: "Mock repository isolation", verdict: "Pass", finding: "A direct grep of the pilot's own _data/ and _hooks/ directories for fetch(/axios/XMLHttpRequest/.then( returns zero matches — every repository function is a pure, synchronous, local transform." },
  { dimension: "Adoption readiness", verdict: "Partial", finding: "Exactly one Business Feature exists (this pilot), and it is explicitly non-production by its own scope (mock data, local state, no real repositories or APIs). Real, if not yet production, adoption evidence now exists, but not yet a production feature." },
];
