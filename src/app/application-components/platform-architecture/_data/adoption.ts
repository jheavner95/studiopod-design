export type AdoptionVerdict = "composed-with-precedent" | "composed-new";

export interface AdoptionEntry {
  platform: string;
  verdict: AdoptionVerdict;
  finding: string;
}

const VERDICT_LABEL: Record<AdoptionVerdict, string> = {
  "composed-with-precedent": "Diagram layer preserved separately",
  "composed-new": "Built new",
};

export { VERDICT_LABEL };

/**
 * How each Platform component library's real business-domain components
 * relate to any pre-existing illustration/diagram-layer code in the same
 * domain.
 */
export const ADOPTION_TARGETS: AdoptionEntry[] = [
  {
    platform: "Production",
    verdict: "composed-with-precedent",
    finding: "Platform's Production components compose real production-management screens. The pre-existing Production & Validation Library at src/production/ remains in place separately — its schema still exists to feed IllustrationCanvas and does not overlap with the Platform-tier components at src/components/platform/production/.",
  },
  {
    platform: "Product",
    verdict: "composed-new",
    finding: "Platform's Product components are a genuinely new addition to the repo — no prior product-catalog or listing code existed elsewhere before they were built.",
  },
  {
    platform: "Publishing",
    verdict: "composed-with-precedent",
    finding: "Platform's Publishing components compose real content and channel-sync screens. The pre-existing PublishingDiagram wrapper and its static Workflow fixture remain in place separately, scoped to the Capability registry and the Workflow Diagram Library's looping pattern respectively.",
  },
  {
    platform: "Commerce",
    verdict: "composed-with-precedent",
    finding: "Platform's Commerce components compose real cart, pricing, and order screens. The pre-existing CommerceDiagram wrapper and its static Workflow fixture remain in place separately, demonstrating the Workflow Diagram Library's branching pattern.",
  },
  {
    platform: "Intelligence",
    verdict: "composed-with-precedent",
    finding: "Platform's Intelligence components compose real observe/analyze/recommend/automate screens. The pre-existing intelligencePlatform.tsx fixture remains in place separately, feeding the Platform Architecture Library's own diagram components.",
  },
  {
    platform: "Operations",
    verdict: "composed-new",
    finding: "Platform's Operations components are a distinct business-domain platform, not to be confused with this design system's own Operational Component Library tier (Foundation → Operational → Workflow → Platform) — the two share a name by coincidence only, the same disambiguation this page's own Platform Templates section makes explicit.",
  },
  {
    platform: "Admin",
    verdict: "composed-new",
    finding: "Platform's Admin components are a genuinely new addition to the repo — no prior admin-specific code existed elsewhere before they were built.",
  },
  {
    platform: "Integrations",
    verdict: "composed-with-precedent",
    finding: "Platform's Integrations components compose real provider-connection screens for OpenAI, WordPress, Shopify, Printify, and Gelato. The pre-existing Capability Library at src/capabilities/ remains in place separately, modeling providers as provider-agnostic abstractions rather than bespoke, provider-specific rendering code.",
  },
];

export const ADOPTION_SUMMARY =
  "Each of the eight named platforms is a real Platform-tier component library, composed entirely from already-certified Foundation/Operational/Workflow components. Where an earlier illustration/diagram library covered the same domain (src/production/, src/platforms/, src/capabilities/ — each a schema that feeds IllustrationCanvas), it remains in place separately from the Platform-tier components at src/components/platform/. See Certification, above, for the current standing of each.";
