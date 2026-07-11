export interface AdoptionFinding {
  label: string;
  text: string;
}

/**
 * Re-derived directly from current source, not copied from Application
 * Composition Certification's own readiness.ts — that page's own "one real
 * (non-production) Business Feature exists" verdict was re-checked and
 * still holds, but the pilot itself has grown since that page was written
 * and neither that page nor any later one records the growth.
 */
export const ADOPTION_FINDINGS: AdoptionFinding[] = [
  {
    label: "Real Business Features in the codebase",
    text: "Still exactly one: src/app/application-components/business-features/production-workspace/. A repo-wide check for a second business-features/* directory found none.",
  },
  {
    label: "Production readiness of that one feature",
    text: "Still explicitly non-production by its own defined scope — mock data (mock-production.ts's own pure, synchronous transform functions), local component state, zero fetch/axios/XHR calls anywhere in the pilot (re-confirmed by direct grep). This has not changed.",
  },
  {
    label: "What has changed since Application Composition Certification",
    text: "The pilot's own useProductionWorkspace hook now wires useAnnounce() (src/components/feedback/LiveRegion.tsx) into every selection change, stage advance, validation transition, and dialog-confirm action — closing the exact \"no aria-live wiring for feature-level state changes\" gap Application Composition Certification's own promotion-review.ts explicitly deferred. ProductionFeatureInspector.tsx also gained a focus-restoration fix for the delete-while-selected case (moving focus to the empty-state message on the had-a-selection → lost-it transition, rather than letting focus silently drop to <body>). Neither fix is recorded in any existing certification page — both independently re-verified present in current source during this audit.",
  },
  {
    label: "Platform-tier adoption breadth",
    text: "The pilot adopts exactly one platform (Production) of the eight that exist. Platform Architecture's own scalability claim — that the framework generalizes to Products, Publishing, Commerce, and the rest — still rests on this one real implementation, not two or more, the same gap Application Composition Certification's own readiness.ts already disclosed as \"Mostly ready\" rather than \"Ready.\"",
  },
  {
    label: "Cross-feature composition rules",
    text: "Still structurally untested — with exactly one Business Feature, the Composition Framework's own \"no cross-feature dependencies\" rule has no second feature to violate it against. Disclosed, not assumed proven.",
  },
];

export const ADOPTION_SUMMARY =
  "Adoption evidence improved in kind, not in breadth, since the last time it was measured: the one real Business Feature pilot got measurably more production-grade (live-region announcements, a focus-restoration fix) without a second feature, a second platform, or a production deployment appearing anywhere in the codebase. Enterprise Certified — as every one of Platform Certification, Accessibility Certification, and Application Composition Certification's own certification ladders define it — remains unreached for the same structural reason each of those pages already gave: real-screen, production adoption evidence doesn't exist yet. This is a fact about where the roadmap sits, re-confirmed rather than newly discovered.";
