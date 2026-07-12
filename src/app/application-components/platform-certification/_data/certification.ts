export type CertificationLevelId = "platform-ready" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
}

/**
 * The exact four-level ladder Platform Architecture (DS-4.1) itself
 * defined before any platform existed — reused verbatim here rather than
 * inventing a new one, since this page certifies what was built against
 * that ladder.
 */
export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  { id: "platform-ready", name: "Platform Ready", description: "A working component, correctly scoped to one platform and composed from Foundation/Operational/Workflow rather than reimplementing them — validated in a docs gallery, not yet proven against a real screen." },
  { id: "production-ready", name: "Production Ready", description: "Functional, well-composed, and documented — safe to build a real Business Feature against, but not every dimension has been formally verified with zero exceptions." },
  { id: "certified", name: "Certified", description: "Every component in the platform clears the full verification bar: Foundation/Operational/Workflow compliance and accessibility are verified in code, not just documented, with no open exceptions." },
  { id: "enterprise-certified", name: "Enterprise Certified", description: "Certified, plus real-screen adoption evidence — at least one production Business Feature genuinely built on top of the platform's own components." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "certified";

export const CERTIFICATION_JUSTIFICATION = [
  "Every one of the eight platforms cleared 12 of 13 verification dimensions with a clean Pass, independently re-audited rather than trusting each platform's own docs page — Foundation/Operational/Workflow composition, platform boundary compliance, accessibility, responsive behavior, naming, dependencies, state handling, and interaction patterns are all a clean 8/8 Pass except one disclosed naming collision (Production Platform's own ProductionPipeline). 95 of 96 components across the tier are literal one-line re-exports of already-certified lower-tier components; the 96th (ProductionCanvas) is a thin passthrough wrapper introducing zero new logic.",
  "Zero platform-boundary violations were found in any of the 96 components — no real business-domain logic (authentication, payment processing, sync execution, RBAC evaluation, OAuth flows) exists anywhere in the tier, confirmed by reading each platform's own cited source files directly. Zero reverse-dependency violations in any direction — Platform never reaches up into Business Features, Workflow/Operational never reach down into Platform, and Foundation never reaches down into any of the three.",
  "Five real documentation defects were found and corrected — a self-contradictory vocabulary-gap claim (Operations Platform), a false \"first with two gaps\" superlative (Admin Platform), a miscounted verbatim-match ratio (Integrations Platform), an undisclosed naming collision (Production Platform), and several stale \"zero platforms exist\" claims in Platform Architecture's own founding documentation — and every one is now resolved, not merely disclosed.",
  "Enterprise Certified is not reachable regardless of the above — real-screen adoption evidence does not exist anywhere in the codebase today. This is a structural fact about where the platform tier sits in the roadmap (Business Features, the tier that would consume this library, is the next major phase and beyond) not a quality defect in the library itself.",
];

export interface RemainingBlocker {
  toLevel: "certified" | "enterprise-certified";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "enterprise-certified", item: "Ship at least one real Business Feature screen that adopts one or more of these eight Platform libraries in production — the sole remaining blocker to the top of the ladder, and the explicit subject of the next tier, Application Composition." },
];
