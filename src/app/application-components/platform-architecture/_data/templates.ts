export interface PlatformTemplate {
  id: string;
  name: string;
  purpose: string;
  businessObjects: string[];
  workspaceModel: string;
  workflowUsage: string;
  operationalUsage: string;
  foundationUsage: string;
  extensionBoundary: string;
}

/**
 * The eight platforms this package's own work order names — Production,
 * Product, Publishing, Commerce, Intelligence, Operations, Admin,
 * Integrations. This list is deliberately not identical to any prior
 * platform list already in the codebase (see Adoption Targets' own
 * discrepancy note): coverage.ts and templates.ts (DS-0.3) both include
 * "Assets" and omit "Product"; platform-certification.ts (DS-1.9) includes
 * both "Assets" and "Product" for nine platforms; workflow-certification's
 * own roadmap.ts (DS-3.9) lists a six-platform set including "Planning" and
 * "Automation" that appear nowhere else. This page adopts the eight-platform
 * list its own work order specifies, since DS-4 is the first package
 * actually scoped to define the Platform layer rather than mention it in
 * passing — later DS-4.x packages should treat this list, not the earlier
 * ones, as canonical, though reconciling the older pages is a migration
 * this package explicitly does not perform.
 *
 * Every field below is a forward-looking architecture proposal, not a
 * description of existing code — Adoption Targets confirms zero real
 * components exist for any of these eight platforms today. Workflow/
 * Operational/Foundation usage cites real, already-certified systems by
 * name specifically so a future DS-4.x package can build against a
 * concrete composition plan rather than starting from a blank page.
 */
export const PLATFORM_TEMPLATES: PlatformTemplate[] = [
  {
    id: "production",
    name: "Production",
    purpose: "Managing the artwork-to-print production pipeline, from creative brief through quality gates to a finished commercial artifact.",
    businessObjects: ["Creative Brief", "Artwork", "Print Job", "Quality Gate", "Production Artifact"],
    workspaceModel: "Asset Workspace (artwork library) as the primary region, with an Inspector Workspace for a selected artifact's own detail and dependency graph.",
    workflowUsage: "Pipeline Components for the production run itself (stage/gate progression); State Machine for a single artifact's own lifecycle; Dependency & Relationship Views for artwork/font dependency checks — the same domain DS-3.7's own gallery already demos (\"Artwork Dependencies\").",
    operationalUsage: "Data Grid for job listings; Queue & Job for the render/print queue; Status & Health for printer and pipeline health; Asset Browser for the underlying artwork library.",
    foundationUsage: "Forms for brief intake; Table for job/artifact listings inherited through Data Grid.",
    extensionBoundary: "Real print-vendor API integration, file-format conversion, and color-management logic stay in Business Features — Platform only owns the reusable job/artifact UI, not how a job is actually sent to a printer.",
  },
  {
    id: "product",
    name: "Product",
    purpose: "The product catalog and listing platform — SKUs, variants, pricing, and publish status across every sales channel.",
    businessObjects: ["Product", "Variant", "Listing", "Price", "Catalog Category"],
    workspaceModel: "Primary Workspace as a catalog grid, with an Inspector Workspace for a selected product's own variant/pricing detail.",
    workflowUsage: "Approval & Review for listing approval before a product goes live; Workflow Stepper for a guided product-creation wizard.",
    operationalUsage: "Data Grid for the catalog table; Filter & Search for catalog search/filtering; Bulk Actions for bulk price or status updates across many products at once.",
    foundationUsage: "Forms for product/variant editing; Table inherited through Data Grid.",
    extensionBoundary: "Inventory/warehouse tracking and vendor sourcing logic stay in Business Features — Platform only owns the catalog's own reusable listing and editing UI.",
  },
  {
    id: "publishing",
    name: "Publishing",
    purpose: "Content authoring and multi-channel publishing — drafting, reviewing, scheduling, and syncing content across channels.",
    businessObjects: ["Content Item", "Channel", "Publish Schedule", "Content Revision"],
    workspaceModel: "Primary Workspace as the content editor, with an Inspector Workspace for metadata/SEO fields and a revision history panel.",
    workflowUsage: "Approval & Review for editorial review before publish; Workflow Timeline for revision history (the same composition pattern ReviewHistory already establishes); State Machine for the draft→review→scheduled→published lifecycle.",
    operationalUsage: "Queue & Job for scheduled publish jobs; Status & Health for channel-sync health; Data Grid for the content listing.",
    foundationUsage: "Forms for rich-text and metadata editing; Overlay for the schedule picker.",
    extensionBoundary: "Real channel API integrations (a CMS, a social platform) stay in Business Features — Platform owns the editor/review/schedule UI, not the sync mechanics to any specific channel.",
  },
  {
    id: "commerce",
    name: "Commerce",
    purpose: "Order, cart, and fulfillment management from checkout through delivery.",
    businessObjects: ["Order", "Cart", "Payment", "Fulfillment", "Line Item"],
    workspaceModel: "Primary Workspace as the order list, with an Inspector Workspace for a single order's own detail and fulfillment status.",
    workflowUsage: "State Machine for order lifecycle — the same domain DS-3.6's own gallery already demos (\"Commerce Order Flow\"); Approval & Review for refund or high-value-order approval; Pipeline Components for the fulfillment pipeline.",
    operationalUsage: "Data Grid for the orders table; Queue & Job for the fulfillment queue; Status & Health for payment-gateway health; Bulk Actions for bulk fulfillment updates.",
    foundationUsage: "Table inherited through Data Grid; Forms for order-adjustment/refund fields.",
    extensionBoundary: "Real payment processing and tax calculation logic stay in Business Features — Platform owns the order/cart UI, not the transaction itself.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    purpose: "Analytics, insights, and automated recommendations surfaced across every other platform.",
    businessObjects: ["Metric", "Insight", "Recommendation", "Dashboard", "Report"],
    workspaceModel: "Status Workspace (DS-1's own operational-status tier) as the primary region, composing a dashboard of Platform-level metrics.",
    workflowUsage: "Dependency & Relationship Views for cross-platform impact analysis — the same domain DS-3.7's own gallery already demos (\"Cross-platform Impact\").",
    operationalUsage: "Dashboard Widgets heavily (MetricCard, TrendWidget, ChartWidget, RecommendationWidget); Status & Health for the systems a metric is measuring.",
    foundationUsage: "Metadata's own StatGroup, inherited through Dashboard Widgets and Workflow Framework's own WorkflowSummary/WorkflowOverview.",
    extensionBoundary: "The actual analytics computation, ML inference, and data pipeline stay in Business Features (or a future data-services layer) — Platform only owns how an insight is displayed and navigated, not how it's computed.",
  },
  {
    id: "operations",
    name: "Operations",
    purpose: "Internal operational monitoring and incident response for StudioPOD's own running systems — a real business platform, deliberately distinct from the design system's own \"Operational Component Library\" tier one layer below Platform, which the two share a name with only by coincidence.",
    businessObjects: ["Incident", "Alert", "System Health Check", "Runbook"],
    workspaceModel: "Status Workspace as the primary region, the same tier this platform's own name would suggest even though it is a different concept from the Operational tier itself.",
    workflowUsage: "State Machine for an incident's own lifecycle; Approval & Review for incident postmortem sign-off.",
    operationalUsage: "Status & Health heavily — this is precisely the domain that system was built for; Queue & Job for background-job monitoring; Dashboard Widgets for an operations overview.",
    foundationUsage: "Feedback's own Alert, inherited through Status & Health's own alert panels.",
    extensionBoundary: "Real alerting/paging integration and runbook automation stay in Business Features — Platform owns the incident/alert UI, not the paging mechanics.",
  },
  {
    id: "admin",
    name: "Admin",
    purpose: "User, team, and tenant administration — who can access what, and how access is granted or revoked.",
    businessObjects: ["User", "Role", "Permission", "Team", "Tenant Setting"],
    workspaceModel: "Primary Workspace as the user/team list, with an Inspector Workspace for a selected user's own permission detail.",
    workflowUsage: "Approval & Review for access-request approval; State Machine for the invited→active→suspended account lifecycle.",
    operationalUsage: "Data Grid for the user table; Bulk Actions for bulk role assignment; Filter & Search for user search.",
    foundationUsage: "Forms for permission/role editing; Table inherited through Data Grid.",
    extensionBoundary: "Real authentication, session management, and SSO logic stay in Business Features — Platform owns the admin UI's reusable pieces, not identity itself.",
  },
  {
    id: "integrations",
    name: "Integrations",
    purpose: "Managing connections to third-party providers and services — deliberately distinct from the pre-existing Capability registry (src/capabilities/), which models integrations only as illustration-diagram data, not real connectors.",
    businessObjects: ["Provider Connection", "Integration Config", "Sync Log", "Webhook"],
    workspaceModel: "Primary Workspace as the connections list, with an Inspector Workspace for a single connection's own configuration and sync history.",
    workflowUsage: "State Machine for a connection's own lifecycle (disconnected→connecting→connected→error); Approval & Review for new-integration approval.",
    operationalUsage: "Status & Health for connection health — a real Platform-tier consumer of exactly the system Status & Health was built for; Queue & Job for sync-job monitoring; Data Grid for the connections table.",
    foundationUsage: "Forms for API-key and configuration fields.",
    extensionBoundary: "Real OAuth flows and provider SDK calls stay in Business Features — Platform owns the connection-management UI, not the third-party API integration itself.",
  },
];
