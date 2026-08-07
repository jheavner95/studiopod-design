export interface CommerceImplementationGuidance {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: CommerceImplementationGuidance[] = [
  { label: "Platform composition", text: "Every one of these 12 components is a re-export over a Workflow or Operational component. Each one is reused as-is because its existing prop surface already covered the need, without a Commerce-specific field." },
  { label: "Workflow integration", text: "CommerceFulfillment composes Pipeline Components' own PipelineStage directly for pick/pack/ship stage progression — the same shape ProductionStagePanel uses for stage-by-stage progress. CommerceInspector composes State Machine directly for a single record's own lifecycle." },
  { label: "Operational integration", text: "CommerceCatalog, CommerceOrders, and CommerceInventory each compose Operational's own DataGrid directly for their own tabular listing — three distinct row shapes (synced products, transactional order records, per-SKU stock levels) composed through the same generic, arbitrary-column component rather than three bespoke tables." },
  { label: "Catalog synchronization", text: "CommerceCatalog does not implement sync logic, polling, or webhook handling — it renders whatever columns and rows the caller supplies through Data Grid's own controlled props, including a per-row sync-status column when needed. Whether a catalog entry is actually in sync with its source is decided by your application logic, not this component." },
  { label: "Order lifecycle", text: "CommerceOrders composes Data Grid rather than Queue, deliberately: an order is a structured transactional record (line items, total, ship-to), not a job-in-flight with priority and progress the way a print job in ProductionQueue is. Whether an order is actually fulfilled is decided by your application logic." },
  { label: "Inventory management", text: "CommerceInventory renders whatever SKU, quantity, and location columns the caller supplies through Data Grid — it does not calculate stock levels, reservations, or reorder thresholds itself." },
  { label: "Fulfillment flow", text: "CommerceFulfillment's own children slot is where WorkflowStep content belongs for each pick/pack/ship stage, the same composition pattern ProductionStagePanel uses — the shell holds no logic about stage ordering or gating." },
  { label: "Pricing presentation", text: "CommercePricing's own children slot is where PropertyRow/PropertyNumber content belongs for base price, sale price, and currency. No Property-family component has a dedicated currency-symbol field, so currency is expressed through the field's own label — for example \"Base Price (USD)\" — rather than a formatting prop." },
];
