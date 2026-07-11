export type AdoptionVerdict = "no-candidate" | "diagram-layer-only" | "does-not-exist";

export interface AdoptionEntry {
  platform: string;
  verdict: AdoptionVerdict;
  finding: string;
}

const VERDICT_LABEL: Record<AdoptionVerdict, string> = {
  "no-candidate": "No real candidate",
  "diagram-layer-only": "Diagram-layer only",
  "does-not-exist": "Does not exist",
};

export { VERDICT_LABEL };

/**
 * A dedicated audit read src/production/, src/platforms/, src/capabilities/,
 * and every "*admin*"/"*intel*"/"*product*"/"*integrations*"-named path in
 * the repo in full before this table was written. No migrations were
 * performed — per this package's own instruction, only identification.
 */
export const ADOPTION_TARGETS: AdoptionEntry[] = [
  {
    platform: "Production",
    verdict: "diagram-layer-only",
    finding: "src/production/ is confirmed to be the pre-existing Production & Validation Library (MS-2.5) — its own type docstring says its schema exists \"to be compiled into Diagram values for IllustrationCanvas.\" ValidationStage/QualityGate/ProductionPipeline/ProductionArtifact all exist, but only as illustration data; no real pipeline execution, job queue, or persistence logic exists anywhere in it. src/app/production/ is a gallery/demo page consuming static examples, not a real production-management screen.",
  },
  {
    platform: "Product",
    verdict: "does-not-exist",
    finding: "No src/product/ directory, and no ProductCatalog/ProductPlatform/ProductListing type or component anywhere in the repo — confirmed by direct search. \"Product\" appears only as a bare string in planning data (workspace-certification's own platform-certification.ts), which the design system's own foundation-audit readiness data already flags as inconsistent with coverage.ts over whether \"Product\" is tracked at all.",
  },
  {
    platform: "Publishing",
    verdict: "diagram-layer-only",
    finding: "No src/publishing/ directory. The only code is src/capabilities/components/PublishingDiagram.tsx (a ~30-line IllustrationCanvas wrapper scoping the Capability registry to the \"publishing\" category) and src/workflows/examples/publishing.tsx (a static Workflow fixture demoing the Workflow Diagram Library's own looping pattern). No dedicated publishing module, content model, or channel-sync logic exists.",
  },
  {
    platform: "Commerce",
    verdict: "diagram-layer-only",
    finding: "Same shape as Publishing: src/capabilities/components/CommerceDiagram.tsx (thin wrapper) and src/workflows/examples/commerce.tsx (static fixture demoing the \"branching\" pattern). No dedicated commerce module, cart, pricing, or order logic exists anywhere.",
  },
  {
    platform: "Intelligence",
    verdict: "diagram-layer-only",
    finding: "Only src/platforms/examples/intelligencePlatform.tsx — a static PlatformArchitecture fixture (Observe→Analyze→Recommend→Automate) feeding the Platform Architecture Library's own diagram components. A repo-wide search for any *intel*/*analytic*/*insight*/*ai*-named directory found nothing beyond src/platforms/ itself.",
  },
  {
    platform: "Operations",
    verdict: "does-not-exist",
    finding: "No real business-domain Operations module exists. The only concrete hit is src/components/operational/ and its own operational-certification docs page — the design system's own Operational Component Library tier (Foundation→Operational→Workflow→Platform), unrelated to a business \"Operations\" platform beyond sharing a name by coincidence, the same disambiguation this page's own Platform Templates section makes explicit for the Operations template.",
  },
  {
    platform: "Admin",
    verdict: "does-not-exist",
    finding: "No src/admin/ or *admin*-named directory anywhere. Every grep hit is either prose (\"Admin\" as a platform-list entry in coverage.ts/platform-certification.ts) or unrelated substring noise (a row-density note mentioning \"admin/reference lists,\" a generic \"Contact an admin\" empty-state string) — none of it is real admin functionality.",
  },
  {
    platform: "Integrations",
    verdict: "diagram-layer-only",
    finding: "src/capabilities/ is confirmed to be the pre-existing Capability Library (MS-2.6) — its own type docstring describes it as modeling providers \"as provider-agnostic abstractions... never bespoke, provider-specific rendering code.\" Every provider (OpenAI, WordPress, Shopify, Printify, Gelato) exists only as static example data with fake latency/health fields — zero real API client, adapter implementation, or provider SDK exists anywhere in it.",
  },
];

export const ADOPTION_SUMMARY =
  "Zero of the eight named platforms had a real business-domain adoption candidate at the time this audit ran, before any Platform-tier library existed. Every one resolved to a pre-existing illustration/diagram library (src/production/, src/platforms/, src/capabilities/ — all three self-documented as schemas that exist to feed IllustrationCanvas, not real operational logic), a static example fixture, or a bare string in planning/prose data that the design system's own prior audits already flagged as internally inconsistent. That prediction was independently validated: DS-4.2 through DS-4.9 have since built all eight platform libraries, and every one of their own dedicated duplication audits reconfirmed zero real business-domain logic to migrate — each shipped as pure re-exports of already-certified Foundation/Operational/Workflow components, genuinely greenfield, not migrated from anything. DS-4.10's own certification re-verified this holds: see the Platform Component Library Certification page.";

/**
 * As of DS-4.10 (the DS-4 capstone), every entry below is stale in one
 * specific way: each verdict ("does-not-exist" / "diagram-layer-only") was
 * accurate for real BUSINESS-DOMAIN logic at the time of the original
 * audit, and that underlying finding still holds — DS-4.10 independently
 * re-confirmed zero business-domain logic exists for any of the eight
 * platforms. What has changed is that a real Platform-tier COMPONENT
 * LIBRARY now exists for all eight (src/components/platform/{production,
 * product,publishing,commerce,intelligence,operations,admin,integrations}/),
 * built DS-4.2 through DS-4.9. Read each entry below as "no business-domain
 * logic exists to migrate" — not as "no Platform library exists," which is
 * no longer true.
 */
export const ADOPTION_TARGETS_STALENESS_NOTE =
  "Every verdict below describes the absence of real business-domain code (an order-processing engine, a content-sync pipeline, a permission-evaluation system), confirmed accurate by DS-4.10's own re-audit. It does not describe the absence of a Platform-tier component library — all eight now exist, certified Platform Ready or better. See the DS-4.10 Platform Component Library Certification page for the current, built state of each.";

export const PLATFORM_LIST_DISCREPANCY =
  "This page's own eight-platform list (Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, Integrations) does not match any prior platform list already in the codebase: coverage.ts and templates.ts (DS-0.3) both include \"Assets\" and omit \"Product\"; workspace-certification's own platform-certification.ts (DS-1.9) lists nine platforms, including both \"Assets\" and \"Product\"; workflow-certification's own roadmap.ts (DS-3.9) lists a six-platform set including \"Planning\" and \"Automation\" found nowhere else. This page adopts the eight-platform list its own work order specifies and treats it as canonical for DS-4 going forward — reconciling the older pages against it is a migration this package does not perform.";
