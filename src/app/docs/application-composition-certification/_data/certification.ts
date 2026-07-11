export type CertificationLevelId = "application-ready" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
}

/**
 * The exact four-level ladder this package's own work order names,
 * adapted from DS-4.1's own ladder (Platform Ready → ... → Enterprise
 * Certified) one tier up: "Platform Ready" becomes "Application Ready",
 * reused rather than reinvented since DS-5 is being certified against the
 * same shape of ladder DS-4 already proved out.
 */
export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  { id: "application-ready", name: "Application Ready", description: "A working Business Feature, correctly composed from Platform/Workflow/Operational/Foundation rather than reimplementing them — validated as a standalone pilot, not yet proven against real production data." },
  { id: "production-ready", name: "Production Ready", description: "Functional, well-composed, and documented — safe to build a real production feature against this framework, but not every dimension has been formally verified with zero exceptions." },
  { id: "certified", name: "Certified", description: "The framework and its one real implementation both clear the full verification bar — architecture consistency, layer composition, accessibility, and dependency direction are all verified in code, not just documented, with every open exception disclosed rather than hidden." },
  { id: "enterprise-certified", name: "Enterprise Certified", description: "Certified, plus real production adoption evidence — at least one Business Feature genuinely shipped with real repositories, real APIs, and real business logic, not mock data." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "certified";

export const CERTIFICATION_JUSTIFICATION = [
  "All four Application Composition packages are internally consistent and independently re-verified in this same pass, not trusted from their own reports: the composition architecture's own composition chain, the framework's own Feature Architecture, and the templates' own per-category layouts are all reused verbatim by the pilot rather than each package inventing a competing vocabulary.",
  "The Production Workspace Feature pilot — the first and only real Business Feature this tier has produced — passes sixteen of eighteen VERIFY dimensions with a clean Pass, re-derived here from the actual source rather than the pilot's own report: zero layer violations, zero reverse dependencies, zero cross-feature imports, zero reusable UI recreated, and a mock repository confirmed isolated by direct grep for network calls (zero matches).",
  "This certification found and fixed two real defects during its own re-audit of the templates' and the pilot's own browser QA history (a DescriptionList collision and a metrics-overflow bug), and disclosed one real but honest gap each in Template compliance (the templates' own Workspace Feature Template doesn't separately name Dialogs) and Accessibility (no aria-live wiring for feature-level state changes, though Foundation's own Toast already has the pattern). Every finding is classified Resolved, Deferred, or Rejected in Promotion Review — none left unclassified.",
  "Enterprise Certified is not reachable regardless of the above, for the same structural reason Platform Certification named as its own remaining blocker: real production adoption evidence does not exist. The pilot is explicitly non-production by its own defined scope (mock data, local state, no real repositories or APIs) — this satisfies Platform Certification's own definition of \"real-screen adoption\" for the Platform tier it certified, but not this tier's own, stricter bar of a genuinely production Business Feature.",
];

export interface RemainingBlocker {
  toLevel: "certified" | "enterprise-certified";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "enterprise-certified", item: "Ship at least one Business Feature with real repositories, real API calls, and real business logic — not mock data — genuinely built on this framework in production. This is the sole remaining blocker to the top of the ladder, and is out of scope for this tier by its own defined scope." },
];
