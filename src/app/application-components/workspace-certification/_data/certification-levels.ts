export type CertificationLevelId = "draft" | "prototype" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  /** The minimum Scorecard percentage (see scorecard.ts) a workspace needs to sit at this level. */
  minScorePercent: number;
  requirements: string[];
  typicalUse: string;
  reviewExpectations: string;
}

/**
 * The five stages a workspace moves through on its way to full certification.
 * Ordered ascending — `levelForScore` below is the single source of truth
 * every score-to-level mapping on this page reads from.
 */
export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  {
    id: "draft",
    name: "Draft",
    minScorePercent: 0,
    requirements: ["A named workspace with a stated purpose", "No anatomy commitments yet"],
    typicalUse: "Early proposal stage — a platform team sketching what a workspace needs.",
    reviewExpectations: "None required. A Draft is an unreviewed proposal, not yet checked against the canonical anatomy.",
  },
  {
    id: "prototype",
    name: "Prototype",
    minScorePercent: 25,
    requirements: ["Anatomy regions identified and mapped to the canonical blueprint", "Working, non-production implementation"],
    typicalUse: "A platform team validating layout and content decisions before committing to production code.",
    reviewExpectations: "An informal walkthrough against the Design Review Checklist — gaps are expected and tracked, not blocking.",
  },
  {
    id: "production-ready",
    name: "Production Ready",
    minScorePercent: 50,
    requirements: ["All required anatomy regions implemented", "Responsive behavior documented for its breakpoints"],
    typicalUse: "Shipping to real users for the first time — functional, but not yet formally reviewed.",
    reviewExpectations: "A completed Design Review Checklist pass, with any \"no\" answers tracked as follow-up work.",
  },
  {
    id: "certified",
    name: "Certified",
    minScorePercent: 80,
    requirements: ["Every Scorecard category passes its own passing criteria", "Accessibility guidance verified, not just documented"],
    typicalUse: "The bar every StudioPOD workspace should eventually clear — the anatomy is followed faithfully and the workspace would feel unmistakably StudioPOD to any user.",
    reviewExpectations: "A formal Scorecard review with a recorded score, following the same process this page defines.",
  },
  {
    id: "enterprise-certified",
    name: "Enterprise Certified",
    minScorePercent: 95,
    requirements: ["Certified, plus a near-perfect Scorecard result", "No open accessibility or responsive exceptions"],
    typicalUse: "Reserved for workspaces enterprise customers will hold up as the reference implementation — the anatomy applied with no compromises.",
    reviewExpectations: "The same formal review as Certified, held to a stricter score threshold with no unresolved exceptions.",
  },
];

/** The highest level whose threshold a given Scorecard percentage clears. */
export function levelForScore(percent: number): CertificationLevel {
  const sorted = [...CERTIFICATION_LEVELS].sort((a, b) => b.minScorePercent - a.minScorePercent);
  return sorted.find((level) => percent >= level.minScorePercent) ?? CERTIFICATION_LEVELS[0];
}
