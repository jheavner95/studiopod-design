export interface ProductFutureExtension {
  title: string;
  description: string;
}

export const PRODUCT_FUTURE_EXTENSIONS: ProductFutureExtension[] = [
  { title: "Bulk product editing", description: "Multi-select across ProductLibrary/ProductCatalog with a shared bulk-edit form — deferred pending real usage; Operational's own Bulk Actions System already covers the selection/action-bar mechanics whenever this is built." },
  { title: "Version history", description: "Tracking a product record's own edit history over time — Workflow Timeline already covers the event/history rendering shape whenever this is built; deferred pending real usage." },
  { title: "Provider synchronization", description: "Real push/pull sync between a product and its mapped external providers — this audit confirmed no real provider-integration code exists anywhere in the repo (see Migration Notes), so this is genuinely greenfield, deferred pending real usage." },
  { title: "AI product enrichment", description: "Automated description/tag/image generation for a product listing — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components; deferred pending real usage, the same stance Production Platform Components' own \"AI orchestration\" extension already took." },
  { title: "Catalog analytics", description: "Trend analysis and historical reporting across many products — belongs to the Intelligence platform's own architecture template, not this one; deferred here rather than duplicated." },
  { title: "Marketplace optimization", description: "Automated pricing/listing recommendations per provider — depends on real Provider synchronization existing first (see above); deferred pending that groundwork." },
];
