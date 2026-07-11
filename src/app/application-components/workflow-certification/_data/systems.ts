export type SystemReadiness = "Production Ready" | "Certified";

export interface WorkflowSystem {
  code: string;
  name: string;
  href: string;
  componentCount: number;
  readiness: SystemReadiness;
  composesFrom: string[];
  keyGaps: string[];
}

/**
 * The eight systems built across DS-3.1–3.8, in build order. Component
 * counts, readiness labels, and gaps below are the direct output of eight
 * independent DS-3.9 audit passes (one per system, each re-reading every
 * component file rather than trusting that system's own docs page) — not
 * estimated or carried over from memory.
 */
export const WORKFLOW_SYSTEMS: WorkflowSystem[] = [
  {
    code: "01",
    name: "Workflow Framework",
    href: "/application-components/workflow-framework",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Foundation Layout", "Foundation Metadata", "Foundation Feedback", "Operational Inspector Panel"],
    keyGaps: ["WorkflowProgress (component) and WorkflowStep (type) share names with distinct src/workflows/ (plural Workflow Diagram Library) and src/compositions/WorkflowComposition.tsx exports — disclosed, import-path-distinct, but a real discoverability cost"],
  },
  {
    code: "02",
    name: "Workflow Stepper",
    href: "/application-components/workflow-stepper",
    componentCount: 10,
    readiness: "Production Ready",
    composesFrom: ["Workflow Framework", "Foundation Navigation", "Foundation Metadata", "Foundation Feedback"],
    keyGaps: ["WorkflowStepperStep never sets aria-current=\"step\" on the current step — a real, verified regression from the exact Foundation Navigation Stepper pattern it claims its visual idiom from, which does implement aria-current"],
  },
  {
    code: "03",
    name: "Workflow Timeline",
    href: "/application-components/workflow-timeline",
    componentCount: 10,
    readiness: "Production Ready",
    composesFrom: ["Workflow Framework", "Foundation UI", "Foundation Navigation", "Foundation Metadata"],
    keyGaps: ["WorkflowTimeline shares its exact export name with src/workflows/components/WorkflowTimeline.tsx (plural Workflow Diagram Library) — disclosed, import-path-distinct"],
  },
  {
    code: "04",
    name: "Approval & Review",
    href: "/application-components/approval-review",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Workflow Framework", "Workflow Timeline", "Operational Inspector Panel", "Foundation Forms", "Foundation Feedback"],
    keyGaps: [],
  },
  {
    code: "05",
    name: "Pipeline Components",
    href: "/application-components/pipeline-components",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Workflow Framework", "Workflow Timeline", "Approval & Review", "Foundation Layout", "Foundation Metadata"],
    keyGaps: ["PipelineStep's collision with src/components/illustration/PipelineStep.tsx is documented, but this audit found a second, undocumented collision: PipelineStage (this system's component) vs. src/illustrations/types/diagram.ts's own PipelineStage interface — same name, never previously flagged in this system's own migration notes or clean-findings data"],
  },
  {
    code: "06",
    name: "State Machine",
    href: "/application-components/state-machine",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Pipeline Components", "Workflow Timeline", "Operational Inspector Panel"],
    keyGaps: [],
  },
  {
    code: "07",
    name: "Dependency & Relationship Views",
    href: "/application-components/dependency-relationships",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Pipeline Components", "State Machine", "Operational Inspector Panel"],
    keyGaps: [],
  },
  {
    code: "08",
    name: "Workflow Visualization",
    href: "/application-components/workflow-visualization",
    componentCount: 12,
    readiness: "Production Ready",
    composesFrom: ["Workflow Framework", "Dependency & Relationship Views", "Pipeline Components", "State Machine", "Operational Bulk Actions", "Operational Inspector Panel"],
    keyGaps: ["WorkflowNode's selected/filtered boolean props are a real, documented API drift from StateNode/DependencyNode's pure-status-enum shape — justified (this tier's first real multi-select model) but not full alignment across the tier"],
  },
];

export const TOTAL_COMPONENT_COUNT = WORKFLOW_SYSTEMS.reduce((sum, system) => sum + system.componentCount, 0);
