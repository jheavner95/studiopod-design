export interface WorkPackageSummary {
  code: string;
  title: string;
  href: string;
  oneLiner: string;
}

export const DS3_WORK_PACKAGES: WorkPackageSummary[] = [
  { code: "01", title: "Workflow Framework", href: "/application-components/workflow-framework", oneLiner: "The shared header/sidebar/stage/step/transition/progress/summary/actions/footer shell every other system in the tier composes from." },
  { code: "02", title: "Workflow Stepper", href: "/application-components/workflow-stepper", oneLiner: "A multi-step wizard/progress system, mostly re-exporting the Framework directly, with a fresh Back/Next control built to avoid Pagination's ARIA mismatch." },
  { code: "03", title: "Workflow Timeline", href: "/application-components/workflow-timeline", oneLiner: "A history/audit-trail timeline later composed directly by three downstream *History components (Approval & Review, Pipeline, State Machine)." },
  { code: "04", title: "Approval & Review", href: "/application-components/approval-review", oneLiner: "The standard approval workflow — Request/Stage/Step/Decision plus a Review workspace — and the system that found and fixed a real hydration bug." },
  { code: "05", title: "Pipeline Components", href: "/application-components/pipeline-components", oneLiner: "The standard business-pipeline representation, composing Approval & Review's own ApprovalDecision for its Gate component." },
  { code: "06", title: "State Machine", href: "/application-components/state-machine", oneLiner: "The standard state-driven-process representation — the first system in the tier to clear a clean 12/12 certification bar with zero exceptions." },
  { code: "07", title: "Dependency & Relationship Views", href: "/application-components/dependency-relationships", oneLiner: "Dependency graphs, relationship views, and impact inspection — the second system to clear a clean 12/12 bar, and the source of real Rejected-bucket prior-art findings (PlatformRelationshipMap, CapabilityRegistryDiagram)." },
  { code: "08", title: "Workflow Visualization", href: "/application-components/workflow-visualization", oneLiner: "The operational, interactive visualization layer for real application screens — explicitly not the Illustration Library — and the tier's first real multi-select model, reused from Operational's own Bulk Actions and Data Grid selection helpers." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS = [
  "Zero Foundation-layer or Operational-layer duplication found anywhere across 92 components in eight systems — every one composes Layout/Metadata/Forms/Navigation/Feedback/Inspector Panel/Bulk Actions/Data Grid selection rather than reimplementing any of it.",
  "Zero reverse-dependency violations in any direction — Workflow never reaches up into the app/Platform/diagram-library tiers, Operational never reaches down into Workflow, and Foundation never reaches down into either — confirmed by both eight independent per-system audits and a direct repo-wide grep run during synthesis.",
  "A shared-ownership re-export precedent used at least nine times across the tier (five systems re-exporting the same root Workflow panel alone), each one catching a name/scope collision before it shipped as silent duplication — including Workflow Visualization reusing Dependency & Relationship Views' own DependencyEdge/DependencyGroup and Operational's Bulk Actions/Data Grid selection helpers directly rather than building a fourth graph-edge implementation or a bespoke multi-select model.",
  "Two of eight systems (State Machine, Dependency & Relationship Views) independently cleared a clean 12/12 dimension bar with zero exceptions — every gallery demo across all eight docs pages spot-checked and confirmed to run real local state, not static screenshots.",
  "Zero stale or inaccurate documentation claims found anywhere in the tier — a stronger result than the Operational Component Library's own certification, which found and had to correct one inaccurate gallery claim.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES = [
  "No system implements a first-party aria-live announcement pattern — the same systemic gap the Operational Component Library's own certification already found one tier down, now confirmed unresolved one tier up.",
  "A real, verified accessibility regression: WorkflowStepperStep never sets aria-current=\"step\" despite explicitly modeling its visual idiom on the one Foundation Navigation component that does.",
  "Seven real naming collisions accumulated across the tier against the plural Workflow Diagram Library and the Illustration Library — five disclosed at build time, but two (a WorkflowStep type collision, and a PipelineStage component-vs-interface collision) were found only during this certification audit, meaning the systems' own migration-notes/clean-findings data wasn't fully thorough on naming specifically.",
  "Zero real-screen adoption anywhere in the codebase — every one of the 92 components has only ever been exercised inside its own documentation gallery, the same structural gap the Operational Component Library's own certification found, and one this tier cannot close on its own (it's waiting on the Platform Component Libraries stage).",
];

export const DS3_COMPLETION_SUMMARY =
  "This tier set out to prove that a real, usable Workflow Component Library — multi-step processes and cross-cutting visualization spanning several Operational systems at once — could be built entirely on top of the certified Foundation and Operational layers without duplicating either. On the evidence gathered across eight independent per-system audits, it did: 92 components across eight systems, zero Foundation-layer duplication, zero Operational-layer duplication, zero reverse-dependency violations in any direction, and a now-mature shared-ownership re-export precedent used at least nine times. What it could not yet prove, the same as the Operational Component Library before it, is that any of this holds up under real adoption, because nothing has adopted it yet — that's the Platform Component Libraries stage's job. Two systems (State Machine, Dependency & Relationship Views) are individually Certified; the tier as a whole is Production Ready, held back from a library-wide Certified by one verified accessibility regression, two newly-found naming collisions, and the same aria-live gap inherited from one tier down — all named, all fixable, none of them structural.";
