import { COMPONENT_FAMILIES, familyCompletion } from "./families";

export interface PlatformTemplate {
  id: string;
  title: string;
  purpose: string;
  /** Family ids, resolved against COMPONENT_FAMILIES — never restates a family's own description. */
  requiredFamilyIds: string[];
  layoutPattern: string;
  reuseOpportunities: string;
}

export const PLATFORM_TEMPLATES: PlatformTemplate[] = [
  {
    id: "publishing",
    title: "Publishing Workspace",
    purpose: "Managing StudioPOD's content and design publishing pipeline.",
    requiredFamilyIds: ["workspace", "navigation", "asset-management", "forms-editing", "workflow"],
    layoutPattern:
      "Shell → sidebar Navigation → Library grid of content/designs → Inspector drawer for the selected item → Workflow rail showing publish-pipeline status.",
    reuseOpportunities: "Shares Asset Management and Workflow almost entirely with the Assets and Production workspaces.",
  },
  {
    id: "commerce",
    title: "Commerce Workspace",
    purpose: "Managing the product catalog and its commerce/channel integrations.",
    requiredFamilyIds: ["workspace", "navigation", "asset-management", "forms-editing", "platform-operations", "analytics"],
    layoutPattern:
      "Shell → sidebar Navigation → Library table of products/listings → Inspector drawer for pricing/channel properties → Platform Operations panel for channel sync status.",
    reuseOpportunities: "Library Table and Forms & Editing are shared with every workspace that edits structured records.",
  },
  {
    id: "production",
    title: "Production Workspace",
    purpose: "Running and monitoring production jobs and their quality gates.",
    requiredFamilyIds: ["workspace", "navigation", "workflow", "validation-qa", "asset-management"],
    layoutPattern:
      "Shell → sidebar Navigation → Queue Table of production jobs → Job Status cards → Validation Panel + QA Finding list for the selected job.",
    reuseOpportunities: "The Workflow + Validation & QA pairing is identical to what the Assets and Operations workspaces need.",
  },
  {
    id: "assets",
    title: "Assets Workspace",
    purpose: "A central digital-asset library: browse, preview, and validate every asset in one place.",
    requiredFamilyIds: ["workspace", "navigation", "asset-management", "forms-editing", "validation-qa"],
    layoutPattern:
      "Shell → sidebar Navigation → Library grid/table toggle → Asset Preview + Inspector Properties → Validation/health badges per asset.",
    reuseOpportunities: "The most Asset-Management-heavy workspace — its Library/Inspector pairing is the template every other workspace's asset views borrow from.",
  },
  {
    id: "integrations",
    title: "Integrations Workspace",
    purpose: "Managing the providers and capabilities StudioPOD integrates with.",
    requiredFamilyIds: ["workspace", "navigation", "platform-operations", "forms-editing"],
    layoutPattern:
      "Shell → sidebar Navigation → Provider Card grid → Diagnostics Panel + Capability Matrix for the selected provider.",
    reuseOpportunities: "Platform Operations here is the same family the Operations workspace uses for cross-platform health.",
  },
  {
    id: "intelligence",
    title: "Intelligence Workspace",
    purpose: "Cross-platform reporting and trend analysis.",
    requiredFamilyIds: ["workspace", "navigation", "analytics", "platform-operations"],
    layoutPattern:
      "Shell → sidebar Navigation → Metrics Card dashboard grid → drill-down detail panel (scope pending Analytics family definition).",
    reuseOpportunities: "Metrics Card is the one Platform Operations component every workspace's dashboard view will reuse.",
  },
  {
    id: "operations",
    title: "Operations Workspace",
    purpose: "A cross-cutting command center for triaging work across every other platform.",
    requiredFamilyIds: ["workspace", "navigation", "workflow", "validation-qa", "platform-operations", "analytics"],
    layoutPattern:
      "Shell → sidebar Navigation → Health Summary dashboard → Queue Table + Activity Timeline + Batch Action Bar for cross-platform triage.",
    reuseOpportunities: "Requires the most families of any workspace — effectively a superset view over Production, Integrations, and Intelligence.",
  },
];

/** "N% complete, based on required-family completion," derived live from each required family's own completion, never a hand-typed number. */
export function templateReadiness(template: PlatformTemplate): number {
  const families = template.requiredFamilyIds
    .map((id) => COMPONENT_FAMILIES.find((f) => f.id === id))
    .filter((f): f is (typeof COMPONENT_FAMILIES)[number] => f !== undefined);
  if (families.length === 0) return 0;
  const total = families.reduce((sum, family) => sum + familyCompletion(family), 0);
  return Math.round(total / families.length);
}
