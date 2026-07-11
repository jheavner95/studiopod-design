export interface TemplateComplianceCheck {
  source: string;
  href: string;
  finding: string;
}

export const TEMPLATE_COMPLIANCE: TemplateComplianceCheck[] = [
  {
    source: "Workspace Feature Template (DS-5.3)",
    href: "/docs/business-feature-templates#workspace-feature",
    finding: "All seven named parts (Workspace shell, Navigation, Primary content, Inspector, Commands, Metrics, Actions) are present and composed from the exact components DS-5.3's own template names — ProductionWorkspace, Foundation Tabs, the domain's own Platform Catalog/list component (here, the pipeline stage list), ProductionInspector, ProductionActions, ProductionMetrics.",
  },
  {
    source: "Business Feature Framework (DS-5.2)",
    href: "/docs/business-features#feature-architecture",
    finding: "The pilot's own file tree maps one-to-one onto Feature Architecture's ten parts, and its five dialogs onto Feature Template's own thirteen-part checklist, which does separately name Dialogs — the pilot is compliant with DS-5.2 even though DS-5.3's own per-category template list doesn't repeat that part name. See deviation below.",
  },
  {
    source: "Application Composition Architecture (DS-5.1)",
    href: "/docs/application-composition#composition-model",
    finding: "The pilot's own composition chain — Business Feature → Platform (Production) → Workflow → Operational → Foundation — matches DS-5.1's own canonical model exactly, with zero components reaching past an available higher tier.",
  },
];

export interface TemplateDeviation {
  title: string;
  detail: string;
  severity: "documentation-gap" | "none";
}

export const TEMPLATE_DEVIATIONS: TemplateDeviation[] = [
  {
    title: "DS-5.3's Workspace Feature Template doesn't separately name \"Dialogs\"",
    detail: "DS-5.2's own generic thirteen-part Feature Template explicitly lists Dialogs as its own part. DS-5.3's own per-category Workspace Feature Template — a tailored subset of that generic template — lists seven parts and doesn't repeat Dialogs among them, even though every other category template also omits it (Dialogs isn't domain-specific, so DS-5.3's own design reasonably treated it as implied rather than repeated nine times). The pilot built five real dialogs correctly per DS-5.2's own template regardless. This is a minor completeness gap in DS-5.3's own documentation, not a pilot defect — see Promotion Review.",
    severity: "documentation-gap",
  },
];
