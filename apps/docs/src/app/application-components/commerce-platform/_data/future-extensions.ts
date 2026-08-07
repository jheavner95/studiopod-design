export interface CommerceFutureExtension {
  title: string;
  description: string;
}

export const COMMERCE_FUTURE_EXTENSIONS: CommerceFutureExtension[] = [
  { title: "Realtime inventory", description: "Live stock-level updates as orders consume inventory require a real-time data connection, which these components don't provide on their own." },
  { title: "Marketplace synchronization", description: "Push/pull sync between the catalog and external marketplaces is not yet supported — there's no provider-sync integration behind it yet." },
  { title: "Pricing intelligence", description: "Automated price and margin recommendations depend on marketplace synchronization and provider connections existing first." },
  { title: "Order forecasting", description: "Predicting order volume from historical data belongs with Intelligence Platform, not here." },
  { title: "Commerce analytics", description: "Trend analysis and historical reporting across many orders and products belongs with Intelligence Platform, not here." },
  { title: "AI commerce optimization", description: "Automated catalog enrichment, pricing, or fulfillment-routing recommendations depend on a different capability layer — external AI service calls — beyond this package's single-user, prop-driven components." },
];
