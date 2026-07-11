export interface PromotionEntry {
  title: string;
  system: string;
  detail: string;
}

/**
 * Every real duplication finding across all eight platforms' own DS-4.x
 * promotion-candidates audits, reclassified into three buckets, plus the
 * real documentation defects this certification itself found and fixed.
 * No speculative findings — every entry below traces to a specific,
 * already-published promotion-candidates.ts (or, where noted, a source
 * citation independently re-verified during this certification) from the
 * platform named.
 */
export const RESOLVED: PromotionEntry[] = [
  {
    title: "Every platform's own \"zero real business-domain logic\" finding, independently re-verified",
    system: "All eight platforms",
    detail: "Each platform's own DS-4.x audit found zero real business-domain logic to migrate before writing a single component. This certification independently re-verified every one — re-reading the cited source files (src/production/, src/capabilities/, the Platform Component Architecture template row) directly, not trusting the prior audits' own prose.",
  },
  {
    title: "Documentation self-contradiction: Operations Platform's \"zero vocabulary gaps\" claim",
    system: "Operations Platform (DS-4.7)",
    detail: "page.tsx and the Foundation catalog entry both asserted \"the first Platform package with zero disclosed vocabulary gaps\" in the same breath as disclosing Monitoring as a close-analog-only gap — a direct self-contradiction. states.ts itself was already accurate; only the summary prose was wrong. Fixed at this certification: both files now correctly state seven of eight verbatim, one disclosed gap.",
  },
  {
    title: "Documentation defect: Admin Platform's false \"first with two gaps\" superlative",
    system: "Admin Platform (DS-4.8)",
    detail: "page.tsx and the Foundation catalog entry both called Admin \"the first Platform package with two genuine, disclosed vocabulary gaps.\" False: Commerce Platform (DS-4.5, three packages earlier) already disclosed exactly two (Draft, Archived), and Product Platform (DS-4.3) disclosed four. Fixed at this certification: both files now correctly note the count without the false ordinal claim.",
  },
  {
    title: "Documentation defect: Integrations Platform's miscounted verbatim-match ratio",
    system: "Integrations Platform (DS-4.9)",
    detail: "page.tsx, the states.ts file header comment, and the Foundation catalog entry all claimed \"7 of 8 states verbatim, Connecting the only gap\" — the correct count, visible in the same states.ts file's own Archived row, is 6 of 8, with Archived a second, undisclosed-in-the-summary gap. Fixed at this certification: all three now correctly state six verbatim, two disclosed gaps (Connecting, Archived).",
  },
  {
    title: "Naming collision found and disclosed: ProductionPipeline vs. a pre-existing interface of the same name",
    system: "Production Platform (DS-4.2)",
    detail: "The component ProductionPipeline (a re-export of Pipeline Components' own Pipeline) shares its exact identifier with a pre-existing TypeScript interface, ProductionPipeline, in src/production/types/production.ts — a real, previously-undisclosed same-name collision, no compile-time conflict. Disclosed at this certification in Production's own promotion-candidates.ts, the same class of finding Pipeline Components' own DS-3.5 audit already disclosed for PipelineStep vs. the Illustration Library's PipelineStep.",
  },
  {
    title: "Platform Architecture's own \"zero platforms exist today\" claims, corrected",
    system: "Platform Architecture (DS-4.1)",
    detail: "Several of this package's own data files (adoption.ts, architecture.ts, certification.ts, layers.ts, ownership.ts) asserted \"zero real platforms exist today\" — true when the page was first written, before any platform library existed, and stale once DS-4.2 through DS-4.9 shipped. Fixed at this certification: each file now distinguishes \"no business-domain logic exists\" (still true, re-verified) from \"no Platform-tier library exists\" (no longer true — all eight are built and certified).",
  },
];

export const DEFERRED: PromotionEntry[] = [];

export const REJECTED: PromotionEntry[] = [
  {
    title: "Production's illustration-canvas pipeline model, and the illustration engine's own DiagramPipeline primitive",
    system: "Production Platform (DS-4.2)",
    detail: "src/production/{types,utils,components} and src/illustrations/types/diagram.ts's own PipelineStage/DiagramPipeline types were investigated in full during DS-4.2's own audit and judged a different, coordinate-positioned SVG rendering layer rather than a literal duplicate of Production Platform's own DOM flex/Grid composition — re-verified to still exist and still match the original description during this certification.",
  },
  {
    title: "The pre-existing Capability Library (src/capabilities/)",
    system: "Integrations Platform (DS-4.9)",
    detail: "src/capabilities/'s own provider/failover source was investigated in full during DS-4.9's own audit and judged genuinely diagram-layer-only (real filter/sort functions over static fixture data, zero network calls, zero SDK instantiation) rather than something to migrate away from — independently spot-checked during this certification by reading providers.ts and ProviderCard.tsx directly, confirmed accurate.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Every one of DS-4.2 through DS-4.9 dispatched its own dedicated duplication audit before writing new code, and every one of those audits is still published at its own package's own _data/promotion-candidates.ts. This section reclassifies their combined output plus the real documentation defects this certification itself found — it re-verified each platform's own reuse and duplication claims independently (re-reading cited source files, not trusting prior prose) and, where a defect was found, fixed it in the same pass rather than leaving it open.";
