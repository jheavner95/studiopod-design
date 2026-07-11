export interface TemplateComplianceCheck {
  source: string;
  href: string;
  finding: string;
}

export const TEMPLATE_COMPLIANCE: TemplateComplianceCheck[] = [
  {
    source: "Workspace Feature Template",
    href: "/docs/business-feature-templates#workspace-feature",
    finding: "All seven named parts (Workspace shell, Navigation, Primary content, Inspector, Commands, Metrics, Actions) are present and composed from the exact components the templates' own list names — ProductionWorkspace, Foundation Tabs, the domain's own Platform Catalog/list component (here, the pipeline stage list), ProductionInspector, ProductionActions, ProductionMetrics.",
  },
  {
    source: "Business Feature Framework",
    href: "/docs/business-features#feature-architecture",
    finding: "The pilot's own file tree maps one-to-one onto Feature Architecture's ten parts, and its five dialogs onto Feature Template's own thirteen-part checklist, which does separately name Dialogs — the pilot is compliant with the framework even though the templates' own per-category list doesn't repeat that part name. See deviation below.",
  },
  {
    source: "Application Composition Architecture",
    href: "/docs/application-composition#composition-model",
    finding: "The pilot's own composition chain — Business Feature → Platform (Production) → Workflow → Operational → Foundation — matches the composition architecture's own canonical model exactly, with zero components reaching past an available higher tier.",
  },
];

export interface TemplateDeviation {
  title: string;
  detail: string;
  severity: "documentation-gap" | "none";
}

export const TEMPLATE_DEVIATIONS: TemplateDeviation[] = [
  {
    title: "The Workspace Feature Template doesn't separately name \"Dialogs\"",
    detail: "The framework's own generic thirteen-part Feature Template explicitly lists Dialogs as its own part. The Workspace Feature Template — a tailored subset of that generic template — lists seven parts and doesn't repeat Dialogs among them, even though every other category template also omits it (Dialogs isn't domain-specific, so its own design reasonably treated it as implied rather than repeated nine times). The pilot built five real dialogs correctly per the framework's own template regardless. This is a minor completeness gap in the templates' own documentation, not a pilot defect — see Promotion Review.",
    severity: "documentation-gap",
  },
];
