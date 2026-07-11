export interface CommerceFutureExtension {
  title: string;
  description: string;
}

export const COMMERCE_FUTURE_EXTENSIONS: CommerceFutureExtension[] = [
  { title: "Realtime inventory", description: "Live stock-level updates as orders consume inventory — deferred pending a real data-streaming integration, the same stance Production and Publishing Platform's own future-extensions already took on live status updates." },
  { title: "Marketplace synchronization", description: "Real push/pull sync between the catalog and external marketplaces — this audit confirmed no real provider-sync integration exists anywhere in the repo (see Migration Notes), so this is genuinely greenfield, deferred pending real usage." },
  { title: "Pricing intelligence", description: "Automated price/margin recommendations — depends on real Marketplace synchronization and Provider connections existing first; deferred pending that groundwork." },
  { title: "Order forecasting", description: "Predicting order volume from historical data — belongs to the Intelligence Platform's own architecture, not this one; deferred here rather than duplicated." },
  { title: "Commerce analytics", description: "Trend analysis and historical reporting across many orders and products — the same Intelligence-platform deferral every prior Platform package's own future-extensions already made for its own analytics extension." },
  { title: "AI commerce optimization", description: "Automated catalog enrichment, pricing, or fulfillment-routing recommendations — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components; deferred pending real usage, the same stance Product Platform's own \"AI product enrichment\" extension already took." },
];
