export interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  relatedTemplateId: string | null;
  namingNote: string | null;
}

/**
 * The nine canonical categories this package's own work order names. Eight
 * map directly onto DS-5.1's own eight Application Templates by id — this
 * page doesn't redefine their composition plans, only names the category
 * and cross-links to DS-5.1's own field-by-field breakdown (Platform/
 * Workflow/Operational/Foundation composition, extension boundary). Two
 * differences from DS-5.1's own naming are called out explicitly via
 * `namingNote` rather than silently renamed: "Settings Feature" becomes
 * "Configuration Feature" here, and "Automation Feature" is new — grounded
 * in DS-5.1's own Adoption Targets finding that Operations Platform already
 * ships a real OperationsAutomation component with partial coverage.
 */
export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "workspace-feature",
    name: "Workspace Feature",
    description: "A full working environment for one domain — composing an entire Platform Workspace rather than a single view within it. The broadest category; every one of Application Composition Architecture's five Platform-certified \"Workspace\" prospects (Production, Product, Publishing, Commerce, Intelligence) is expected to be built as this category.",
    relatedTemplateId: "workspace-feature",
    namingNote: null,
  },
  {
    id: "library-feature",
    name: "Library Feature",
    description: "Browsing, searching, and selecting from a collection of one domain's objects — the most common entry point into a domain's own object set, typically the first View inside a Workspace Feature.",
    relatedTemplateId: "library-feature",
    namingNote: null,
  },
  {
    id: "editor-feature",
    name: "Editor Feature",
    description: "Creating or modifying one object in detail — the template for any \"open one thing and change it\" screen, typically reached from a Library Feature's own selection.",
    relatedTemplateId: "editor-feature",
    namingNote: null,
  },
  {
    id: "dashboard-feature",
    name: "Dashboard Feature",
    description: "An at-a-glance overview of one domain's health and activity — the entry point a user lands on before drilling into a Workspace or Library Feature.",
    relatedTemplateId: "dashboard-feature",
    namingNote: null,
  },
  {
    id: "management-feature",
    name: "Management Feature",
    description: "Administering a set of entities in bulk — users, permissions, configuration records — rather than working one at a time. The category Administration's own Business Feature is expected to be built as.",
    relatedTemplateId: "management-feature",
    namingNote: null,
  },
  {
    id: "monitoring-feature",
    name: "Monitoring Feature",
    description: "Watching ongoing activity in real or near-real time — job queues, sync status, system health — rather than working on a fixed set of records.",
    relatedTemplateId: "monitoring-feature",
    namingNote: null,
  },
  {
    id: "review-feature",
    name: "Review Feature",
    description: "Evaluating and deciding on something someone else produced — approvals, quality checks, moderation queues — the category Approval & Review's own components were purpose-built for.",
    relatedTemplateId: "review-feature",
    namingNote: null,
  },
  {
    id: "configuration-feature",
    name: "Configuration Feature",
    description: "Configuring behavior for one domain, one user, or the whole application — narrower and more form-heavy than a Management Feature, and the category Settings' own Business Feature is expected to be built as.",
    relatedTemplateId: "settings-feature",
    namingNote: "Application Composition Architecture's own Application Templates named this \"Settings Feature.\" This page renames it \"Configuration Feature\" for consistency with the Feature Structure's own \"Configuration\" data concern — the underlying composition plan is unchanged; see Settings Feature in Application Composition Architecture.",
  },
  {
    id: "automation-feature",
    name: "Automation Feature",
    description: "Running domain logic on a schedule, trigger, or condition rather than in direct response to one user's own action — sync jobs, scheduled publishing, rule-driven alerts.",
    relatedTemplateId: null,
    namingNote: "New on this page. Application Composition Architecture's own Adoption Targets found real, if partial, coverage for this already — Operations Platform ships a generalized OperationsAutomation component (partial-platform-coverage, not a dedicated platform). An Automation Feature composes that component directly, supplemented by Queue & Jobs for scheduled/triggered execution and Workflow's own State Machine for any multi-step automation logic.",
  },
];

export const CATEGORY_SUMMARY =
  "Eight of these nine categories are a direct rename-free carry-over of Application Composition Architecture's own Application Templates — this page adds category identity and a canonical name, not a new composition plan. Two differences are called out rather than silently applied: \"Settings Feature\" is renamed \"Configuration Feature\" for naming consistency with Feature Structure's own \"Validation\"/\"State\"/\"API\" concern-naming convention, and \"Automation Feature\" is new, grounded in Application Composition Architecture's own partial-platform-coverage finding for Operations Platform's OperationsAutomation component.";
