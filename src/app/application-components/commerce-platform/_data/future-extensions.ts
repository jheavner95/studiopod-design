export interface CommerceFutureExtension {
  title: string;
  description: string;
}

export const COMMERCE_FUTURE_EXTENSIONS: CommerceFutureExtension[] = [
  { title: "Realtime inventory", description: "Live stock-level updates as orders consume inventory require a real data-streaming integration, which these components do not implement themselves." },
  { title: "Marketplace synchronization", description: "Real push/pull sync between the catalog and external marketplaces is not yet implemented. No real provider-sync integration exists anywhere in the repo yet." },
  { title: "Pricing intelligence", description: "Automated price/margin recommendations depend on real Marketplace synchronization and Provider connections existing first." },
  { title: "Order forecasting", description: "Predicting order volume from historical data belongs to the Intelligence platform's own components, not this platform's." },
  { title: "Commerce analytics", description: "Trend analysis and historical reporting across many orders and products belongs to the Intelligence platform's own components, not this platform's." },
  { title: "AI commerce optimization", description: "Automated catalog enrichment, pricing, or fulfillment-routing recommendations — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
];
