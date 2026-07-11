export interface WorkPackageSummary {
  code: string;
  title: string;
  href: string;
  oneLiner: string;
}

export const DS5_WORK_PACKAGES: WorkPackageSummary[] = [
  { code: "DS-5.1", title: "Application Composition Architecture", href: "/docs/application-composition", oneLiner: "The blueprint every later package in this tier built against — the composition chain, the Business Feature Model, and a grep-grounded audit finding six of ten prospective features already architecture-ready." },
  { code: "DS-5.2", title: "Business Feature Composition Framework", href: "/docs/business-features", oneLiner: "The ten-part Feature Architecture and thirteen-part Feature Template every real feature — including the Production Workspace Feature pilot — is built from." },
  { code: "DS-5.3", title: "Business Feature Templates", href: "/docs/business-feature-templates", oneLiner: "Eight category-specific standard layouts, each grounded in real certified components by name; Automation Feature explicitly and honestly excluded." },
  { code: "DS-5.4", title: "Production Workspace Feature Pilot", href: "/application-components/business-features/production-workspace", oneLiner: "The first real Business Feature — proved the whole framework produces a working, accessible, responsive screen, not just a paper design." },
  { code: "DS-5.5", title: "Application Composition Certification", href: "/docs/application-composition-certification", oneLiner: "This tier's own capstone — every package re-audited against its own real source, two real defects found and fixed, and a Certified verdict for the whole tier." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS = [
  "The one real Business Feature this tier has produced passes sixteen of eighteen VERIFY dimensions with a clean Pass — zero layer violations, zero reverse dependencies, and a mock repository confirmed isolated by direct grep for network calls.",
  "Every certified tier below Application Composition (Workspace, Foundation, Operational, Workflow, Platform) is composed correctly by the pilot with zero new reusable UI invented — 11 of Production Platform's own 12 components, plus WorkflowStep, InspectorSection, PropertyToggle, Dialog, Button, Badge, SwitchField, Alert, InlineMessage, and Tabs, all at their correct tier.",
  "Two real defects were found and fixed during this certification's own re-audit of the templates' and the pilot's own browser QA history — both are documented in Promotion Review rather than left implicit in each package's own report.",
  "The framework is self-validating in an unusual and genuinely useful way: the pilot satisfies Platform Certification's own remaining blocker to Enterprise Certified (real-screen Platform-tier adoption) even though it doesn't clear this tier's own, stricter production bar for itself — a real cross-tier proof point, not a coincidence.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES = [
  "Exactly one Business Feature exists. The framework's own claim that it scales to Products, Publishing, Commerce, and the other planned adoption targets rests on one real implementation, not two or more — disclosed as Mostly ready rather than Ready in Readiness Review.",
  "No aria-live wiring exists for the pilot's own state changes, even though Foundation's own Toast component already implements the pattern one tier down — a real, fixable gap, not a missing capability in the design system as a whole.",
  "Zero production adoption exists anywhere — the pilot is explicitly mock-data-only by its own defined scope. This tier cannot close that gap alone; it requires an actual production feature to ship, which is out of this tier's own scope by design.",
];

export const DS5_COMPLETION_SUMMARY =
  "Application Composition set out to prove that the certified Foundation → Operational → Workflow → Platform stack could actually be composed into a real, working Business Feature — not just described as composable in an architecture document. On the evidence gathered across this certification's own re-audit of all four packages, it did: a documented composition chain (the Application Composition Architecture), a concrete internal structure and template (the Business Feature Composition Framework and the Business Feature Templates), and a fully interactive pilot feature (the Production Workspace Feature pilot) that passes sixteen of eighteen independently re-verified dimensions with zero layer violations and zero reverse dependencies. This certification found two real defects along the way — a DescriptionList collision in the templates and a metrics-overflow bug in the pilot — and fixed both in the same pass each was found, plus disclosed two honest, non-blocking gaps (a documentation omission in the templates' own list, and missing aria-live wiring in the pilot). What this tier could not yet prove, the same as the Platform tier before it, is that this framework holds up under real production adoption, because nothing produced here is production yet — that is explicitly out of this tier's own scope, and the next real test of the framework. All four packages plus this capstone are independently sound; the tier as a whole is Certified, held back from Enterprise Certified only by the deliberate absence of real production adoption — a structural fact about where Application Composition sits in the roadmap, not a defect in the framework itself.";
