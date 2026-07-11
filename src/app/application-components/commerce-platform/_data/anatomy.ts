export interface CommerceAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const COMMERCE_ANATOMY: CommerceAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "CommerceWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What commerce record is open, and its current state.", component: "CommerceHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a category tree, related records.", component: "CommerceSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Catalog", description: "The tabular listing of synced catalog products.", component: "CommerceCatalog (Operational's own DataGrid, re-exported)" },
  { name: "Orders", description: "The tabular listing of orders — structured transactional records, not jobs-in-flight.", component: "CommerceOrders (Operational's own DataGrid, re-exported)" },
  { name: "Inventory", description: "The tabular listing of stock levels per SKU.", component: "CommerceInventory (Operational's own DataGrid, re-exported)" },
  { name: "Fulfillment", description: "A titled stage group for pick/pack/ship progression.", component: "CommerceFulfillment (Pipeline Components' own PipelineStage, re-exported)" },
  { name: "Pricing", description: "Base price, sale price, and currency, edited in place.", component: "CommercePricing (Operational's own PropertyPanel, re-exported)" },
  { name: "Inspector", description: "A single selected commerce record's own lifecycle detail.", component: "CommerceInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured commerce numbers and an at-a-glance overview row.", component: "CommerceMetrics, CommerceSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Sync, Fulfill, Cancel.", component: "CommerceActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
