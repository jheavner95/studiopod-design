export interface PlatformRule {
  category: string;
  rule: string;
}

/**
 * The concrete, checkable rules a future DS-4.x package's own audit
 * (mirroring DS-3.9's own per-system dependency-review grep) should verify
 * against real Platform component source once any exists.
 */
export const PLATFORM_RULES: PlatformRule[] = [
  {
    category: "Allowed imports",
    rule: "A Platform component may import from: sibling files within its own platform's component set, any Foundation family (@/components/{ui,layout,table,metadata,form,overlay,navigation,feedback}), any Operational component (@/components/operational), any Workflow component (@/components/workflow), and @/lib/utils. This mirrors exactly the allowed-import set Workflow's own components already follow, one layer up.",
  },
  {
    category: "Forbidden imports",
    rule: "A Platform component may not import from another platform's own component set (Commerce importing from Production is a Platform Rules violation — shared shapes belong one layer down), from src/app (no reaching up into routing/pages), or from any of the pre-existing diagram/illustration libraries this package explicitly distinguishes itself from (src/platforms/, src/capabilities/, src/production/, src/workflows/ — all of them, confirmed by direct read during this package's own audit, are illustration-rendering libraries layered on the Illustration Engine, not real business-domain code, and Platform components must not compose them as if they were).",
  },
  {
    category: "Reuse requirements",
    rule: "Before writing a new Platform component, check Workflow, Operational, and Foundation for something that already covers the need — the same duplication-audit discipline every one of DS-3.1 through DS-3.8 already dispatched before writing a line of new code. A Platform component that reimplements WorkflowNode, InspectorPanel, or DataGrid instead of composing it is a rule violation regardless of how good the reimplementation is.",
  },
  {
    category: "Composition requirements",
    rule: "Every Platform component must be built by composing one or more Workflow/Operational/Foundation components, not by hand-rolling markup that duplicates what they already provide. The shared-ownership re-export precedent used at least nine times across DS-3 (Pipeline=Workflow, WorkflowEdge=DependencyEdge, and the rest) is the model: when a Platform component's shape genuinely matches an existing Workflow/Operational component one-to-one, re-export it under a platform-appropriate name rather than rebuilding it.",
  },
  {
    category: "Extension requirements",
    rule: "Business Features extend Platform components through props and composition only — never by copying a Platform component's source into a feature-specific fork. If a Business Feature needs behavior a Platform component doesn't expose, the fix is a new prop or a new composition point on the Platform component, not a duplicate.",
  },
];
