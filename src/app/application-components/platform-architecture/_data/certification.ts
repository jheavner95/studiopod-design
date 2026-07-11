export type CertificationLevelId = "platform-ready" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
  entryCriteria: string;
  exitCriteria: string;
}

/**
 * A four-level ladder, deliberately consistent with the one DS-1.9 and
 * DS-3.9 already certified Foundation/Workflow against — but with a new
 * bottom rung, "Platform Ready," in place of "Prototype." Platform
 * components are always built to compose already-certified Foundation/
 * Operational/Workflow primitives, so a genuinely uncertified "prototype"
 * stage the way Foundation/Workflow needed one (validating a direction
 * before committing to real code) doesn't apply the same way here — the
 * first real question for a Platform component is whether it's actually
 * scoped to one platform and composed correctly, which "Platform Ready"
 * names directly.
 */
export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  {
    id: "platform-ready",
    name: "Platform Ready",
    description: "A working component, correctly scoped to one platform and composed from Foundation/Operational/Workflow rather than reimplementing them — validated in a docs gallery, not yet proven against a real screen.",
    entryCriteria: "The component exists, compiles, and its own docs page demonstrates real interactive behavior (not a static screenshot) — the same bar DS-3's own gallery convention already sets.",
    exitCriteria: "A dedicated duplication audit (mirroring every DS-3.x package's own promotion-candidates.ts) finds zero unjustified reimplementation of Foundation/Operational/Workflow, and a dependency review (mirroring DS-3.9's own LAYER_CHECKS) confirms zero Platform Rules violations.",
  },
  {
    id: "production-ready",
    name: "Production Ready",
    description: "Functional, well-composed, and documented — safe to build a real Business Feature against, but not every dimension has been formally verified with zero exceptions.",
    entryCriteria: "Platform Ready, plus a full docs page covering anatomy, gallery, states, responsive behavior, accessibility, implementation guidance, promotion candidates, and future extensions — the same eight-section bar every DS-3.x package's own docs page already met.",
    exitCriteria: "A per-platform certification audit (mirroring DS-3.9's own eight-system, twelve-dimension scorecard) finds no outright Fail on any quality dimension, with named, tracked Partials acceptable.",
  },
  {
    id: "certified",
    name: "Certified",
    description: "Every component in the platform clears the full verification bar: Foundation/Operational/Workflow compliance and accessibility are verified in code, not just documented, with no open exceptions.",
    entryCriteria: "Production Ready, plus zero Partial verdicts remaining on any quality dimension across every component in the platform's own component set.",
    exitCriteria: "Independently re-audited, the same way DS-3.9 re-audited all eight Workflow systems rather than trusting each system's own docs page.",
  },
  {
    id: "enterprise-certified",
    name: "Enterprise Certified",
    description: "Certified, plus real-screen adoption evidence — at least one production Business Feature genuinely built on top of the platform's own components.",
    entryCriteria: "Certified, plus a real Business Feature (not a docs gallery demo) importing and using the platform's own components in a genuine product screen.",
    exitCriteria: "N/A — this is the top of the ladder.",
  },
];

export const CERTIFICATION_MODEL_NOTE =
  "This ladder was published before any Platform component existed, so the first platform built would have a bar to clear from day one — the same way DS-1's own certification model existed before DS-2's Foundation Layer was built against it. DS-4.2 through DS-4.9 have since built all eight named platforms, and DS-4.10, the DS-4 capstone, independently certified every one of them Platform Ready against exactly this ladder. See the Platform Component Library Certification page for the per-platform verdicts.";
