export type CertificationLevelId = "prototype" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
}

export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  { id: "prototype", name: "Prototype", description: "Working, non-production implementation validating a direction before committing to real code." },
  { id: "production-ready", name: "Production Ready", description: "Functional, well-composed, and documented — safe to build against, but not every dimension has been formally verified with zero exceptions." },
  { id: "certified", name: "Certified", description: "Every system clears the full verification bar: Foundation compliance and accessibility are verified in code, not just documented, with no open exceptions." },
  { id: "enterprise-certified", name: "Enterprise Certified", description: "Certified, plus real-screen adoption evidence — at least one production platform screen genuinely built on top of the library." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "production-ready";

export const CERTIFICATION_JUSTIFICATION = [
  "Four of the nine systems (Data Grid, Filter & Search, Bulk Actions, Queue & Job) individually cleared their own dedicated audit's bar for Certified. The other five (Inspector Panel, Property Panel, Asset Browser, Status & Health, Dashboard Widgets) each carry at least one real, named, unresolved accessibility or documentation-accuracy gap that its own auditor declined to wave through.",
  "Foundation compliance and dependency layering are both a clean 9/9 across every system — zero duplicated Forms/Tables/Metadata/Navigation/Feedback/Overlay/Layout functionality, and zero reverse-dependency imports into the app or diagram-library tiers, in either direction. This is the library's strongest result and the reason it clears Production Ready comfortably rather than marginally.",
  "The one gap every single one of the nine independent audits found on its own, without being prompted to look for it specifically, is that no system implements a first-party aria-live announcement pattern — every one treats it as an opt-in the consuming screen must add. That gap alone, plus the five systems' individual accessibility/documentation findings, is what keeps the library as a whole below Certified: a library-wide certification should require every member system to clear the bar, not a majority of them.",
  "Enterprise Certified is not reachable regardless of the above — real-screen adoption evidence does not exist anywhere in the codebase today, confirmed independently by all nine audits and a direct repo-wide grep. This is a structural fact about where DS-2.5 sits in the roadmap (Platform Components, the tier that would consume this library, is DS-3 and beyond), not a quality defect in the library itself.",
];

export interface RemainingBlocker {
  toLevel: "certified" | "enterprise-certified";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "certified", item: "Add a first-party aria-live announcement pattern (or an explicitly documented, tested opt-in hook) to at least Data Grid, Bulk Actions, and Queue & Job, where selection/status changes are most frequent." },
  { toLevel: "certified", item: "Close Inspector Panel's undemonstrated Drawer/focus-composition gap with a real gallery demo that nests an Inspector Panel inside a Drawer at mobile width." },
  { toLevel: "certified", item: "Fix Dashboard Widgets' DashboardSection so a refresh doesn't unmount focused content." },
  { toLevel: "certified", item: "Resolve (or explicitly rename) the FilterBar/FilterChip and PropertyEditor/PropertyGroup/PropertySection naming collisions with their Foundation-layer namesakes." },
  { toLevel: "enterprise-certified", item: "Ship at least one real Platform Components screen that adopts one or more of these nine systems in production." },
];
