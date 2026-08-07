export interface ProductFutureExtension {
  title: string;
  description: string;
}

export const PRODUCT_FUTURE_EXTENSIONS: ProductFutureExtension[] = [
  { title: "Bulk product editing", description: "Multi-select across ProductLibrary/ProductCatalog with a shared bulk-edit form is not yet implemented; Operational's own Bulk Actions System already covers the selection/action-bar mechanics whenever it is built." },
  { title: "Version history", description: "Tracking a product record's own edit history over time is not yet implemented; Workflow Timeline already covers the event/history rendering shape whenever it is built." },
  { title: "Provider synchronization", description: "Real push/pull sync between a product and its mapped external providers is not yet implemented. No real provider-integration code exists anywhere in the repo yet." },
  { title: "AI product enrichment", description: "Automated description/tag/image generation for a product listing — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
  { title: "Catalog analytics", description: "Trend analysis and historical reporting across many products belongs to the Intelligence platform's own components, not this platform's." },
  { title: "Marketplace optimization", description: "Automated pricing/listing recommendations per provider depend on real Provider synchronization existing first." },
];
