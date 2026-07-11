export interface CommercePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the seven subdomains this package's own work order names —
 * Commerce platform, Catalog, Orders, Inventory, Fulfillment, Pricing,
 * Operations — before a single Commerce platform component was written.
 * No speculative findings: every entry below traces to a specific file
 * this audit actually read.
 */
export const COMMERCE_PROMOTION_CANDIDATES: CommercePromotionCandidate[] = [];

export const COMMERCE_CLEAN_FINDINGS: string[] = [
  "Commerce platform (whole-platform level): diagram-layer only. No src/commerce/ directory exists. Platform Component Architecture's own adoption audit already confirmed this with an explicit verdict of \"diagram-layer-only\", quoting src/capabilities/components/CommerceDiagram.tsx (a thin category-scoped IllustrationCanvas wrapper) and src/workflows/examples/commerce.tsx (a static Workflow fixture) as the only Commerce-adjacent code — no dedicated commerce module, cart, pricing, or order logic exists anywhere.",
  "Catalog: re-confirms Product Platform's own finding. Operational's own SyncStatusPanel is confirmed display-only (composes HealthIndicator + ProgressBar over a generic, caller-supplied SyncSource[]). \"Inventory sync\"/\"Sync order\" appear only as hardcoded fixture-label strings across unrelated galleries — no catalogSync or inventorySync identifier exists anywhere in the repo.",
  "Orders: genuinely nonexistent as real order-record logic. No OrderId/OrderStatus/OrderRecord/orderTotal identifier exists anywhere. \"Order #10236\" is a single recurring hardcoded label reused verbatim across unrelated already-certified galleries (State Machine, Workflow Timeline, Workflow Stepper, Dashboard Widgets, Queue & Job) as demo data, not a shared order model — no line-item array or order-status enum exists.",
  "Inventory: naming false-positive confirmed. src/app/application-components/inventory/ is DS-0.3's own component-inventory tracking page (name/purpose/status/source/priority fields for design-system components), not a commerce stock system — its own docstring states \"A planning/inventory page for the Application Components package — not implementation.\" \"SKU\" and \"stock\" hits elsewhere are hardcoded label strings in already-certified Product Platform and Inspector Panel gallery demos, matching Product Platform's own confirmed \"naming false-positive only\" finding for variant/SKU concepts.",
  "Fulfillment: prose and static pipeline-stage labels only. \"Packed\"/\"Shipped\" recur as generic stage labels reused across unrelated domains (motion demos, illustration demos, Production Platform's own gallery) — none commerce-specific. The one commerce-labeled instance hardcodes WorkflowStep labels with static status props; no pick/pack/ship state machine or carrier-integration code exists anywhere.",
  "Pricing: prose/demo-field only. The only real code hits are a plain controlled number input bound to local useState in already-certified Property Panel and Inspector Panel gallery demos, with zero calculation. The one \"pricing calculator\" reference in the repo is an EmptyComposition placeholder titled \"Pricing calculator\" with description \"Placeholder for an interactive pricing tool\" — confirming no real pricing logic exists.",
  "Operations: confirmed genuinely nonexistent, repo-wide. A repo-wide search for fetch/axios/XMLHttpRequest returns zero real-code matches anywhere in src/ — the only hits are prose inside two prior packages' own promotion-candidates files stating that no such calls were found. src/capabilities/examples/commerceCapability.tsx (the Commerce analog to Publishing's own publishingCapability.tsx) is a pure static CapabilityRegistry data object naming Printify/Gelato/Printful as providers with fabricated latency/version strings — no fetch, no real health-check, no provider-failover code.",
];
