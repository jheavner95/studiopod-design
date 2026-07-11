export interface ProductAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const PRODUCT_ANATOMY: ProductAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "ProductWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What product record is open, and its current state.", component: "ProductHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a category tree, related products.", component: "ProductSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Library", description: "The browsable collection of products — search, filter, grid/list toggle, selection.", component: "ProductLibrary (Operational's own AssetBrowser, re-exported)" },
  { name: "Catalog", description: "The tabular listing of products — sortable columns, structured rows.", component: "ProductCatalog (Operational's own DataGrid, re-exported)" },
  { name: "Variants", description: "SKU/size/color combinations for a single product, edited in place.", component: "ProductVariantPanel (Operational's own PropertyPanel, re-exported)" },
  { name: "Provider Mappings", description: "How a product maps to external providers or marketplaces — a peer relationship, not a strict dependency.", component: "ProductProviderMappings (Dependency & Relationship Views' own RelationshipView, re-exported)" },
  { name: "Validation", description: "Whether a product record clears its own quality/listing gate.", component: "ProductValidationPanel (Pipeline Components' own PipelineGate, re-exported)" },
  { name: "Inspector", description: "A single selected product's own lifecycle detail.", component: "ProductInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured catalog numbers and an at-a-glance overview row.", component: "ProductMetrics, ProductSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Publish, Archive, Retire.", component: "ProductActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
