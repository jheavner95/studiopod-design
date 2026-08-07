export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface PrimaryWorkspaceRegion {
  id: string;
  name: string;
  purpose: string;
  examples: string[];
  guidance: RegionGuidance[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
}

/**
 * The four regions the Primary Workspace is built from, top to bottom.
 * Unlike the Asset Workspace (discovery and selection), the Primary
 * Workspace is where creation, editing, review, execution, and
 * decision-making actually happen.
 */
export const PRIMARY_WORKSPACE_REGIONS: PrimaryWorkspaceRegion[] = [
  {
    id: "context-banner",
    name: "Context Banner",
    purpose: "A thin strip of orientation — what you're working on, before you start working on it.",
    examples: ["Current Project", "Selected Product", "Workflow Stage", "Validation State", "Session Information"],
    guidance: [
      {
        label: "When it appears",
        text: "Only when the Primary Working Surface's context isn't already obvious from the Workspace Header — a Canvas editing one specific artwork needs it; a Dashboard showing aggregate data usually doesn't.",
      },
      {
        label: "When it should be omitted",
        text: "When it would just repeat what the Workspace Header or an Asset Workspace selection already established — a second banner saying the same thing is noise, not orientation.",
      },
      {
        label: "How much information belongs here",
        text: "One line. If it needs two, the information belongs in Supporting Panels instead.",
      },
    ],
    reuseNotes: "The same Context region the Workspace Header defines, reused here for cases where the header itself is too far away (deep in a Canvas or Wizard) to serve as a reminder.",
    reuseLinks: [{ label: "Workspace Header", href: "/application-components/workspace-header#context" }],
  },
  {
    id: "primary-working-surface",
    name: "Primary Working Surface",
    purpose: "The actual work — everything else in this anatomy exists to support what happens here.",
    examples: ["Canvas", "Dashboard", "Queue", "Timeline", "Editor", "Wizard", "Analytics", "Review", "Configuration"],
    guidance: [
      { label: "Canvas", text: "Purpose: freeform visual work. Strengths: direct manipulation, spatial reasoning. Typical platforms: Publishing, Assets. Use when the task is inherently spatial, not listable." },
      { label: "Dashboard", text: "Purpose: at-a-glance aggregate understanding. Strengths: many metrics in one view. Typical platforms: Commerce, Operations. Use when the task is monitoring, not editing." },
      { label: "Queue", text: "Purpose: processing a sequence of discrete items. Strengths: throughput and prioritization. Typical platforms: Production. Use when work arrives continuously and must be triaged." },
      { label: "Timeline", text: "Purpose: understanding sequence and history. Strengths: chronology is immediately legible. Typical platforms: Production, Orders. Use when when-something-happened matters as much as what happened." },
      { label: "Editor", text: "Purpose: focused editing of one object. Strengths: depth over breadth. Typical platforms: Publishing, Assets. Use when a single object needs sustained attention." },
      { label: "Wizard", text: "Purpose: guided multi-step creation. Strengths: reduces a complex task to an ordered sequence. Typical platforms: any complex-object creation flow. Use when a task has a strict, unfamiliar order." },
      { label: "Analytics", text: "Purpose: exploratory analysis, not just monitoring. Strengths: drill-down and comparison. Typical platforms: Intelligence. Use when the task is answering a question, not just checking a number." },
      { label: "Review", text: "Purpose: evaluating something someone else produced. Strengths: side-by-side comparison, clear accept/reject actions. Typical platforms: Production, Publishing. Use when the task is judgment, not creation." },
      { label: "Configuration", text: "Purpose: setting up rather than producing. Strengths: form-first clarity. Typical platforms: any Settings-mode workspace. Use when the task is read-then-write, not browse-and-act." },
    ],
    reuseNotes: "Directly the Workspace Framework's own Primary Workspace region — this section is that region's six original examples, expanded to nine and fully documented.",
    reuseLinks: [{ label: "Workspace Framework", href: "/application-components/workspace-framework#primary-workspace" }],
  },
  {
    id: "supporting-panels",
    name: "Supporting Panels",
    purpose: "Secondary information relevant to the current task, without competing with the Primary Working Surface for attention.",
    examples: ["Reference Material", "Live Preview", "Related Assets", "Secondary Metrics", "Version Comparison", "Notes"],
    guidance: [
      {
        label: "When secondary information is appropriate",
        text: "When it directly informs the current task — a Live Preview while editing, Reference Material while reviewing — never just because it's available.",
      },
      {
        label: "How much space it should occupy",
        text: "Meaningfully less than the Primary Working Surface — see Workspace Layout's own \"inspectors should never dominate\" principle, which applies here too.",
      },
      {
        label: "Progressive disclosure",
        text: "Collapsed by default in most workspaces, expanded only for the tasks that genuinely need it — a Version Comparison panel earns permanent visibility in a Review workspace, but not in a Canvas.",
      },
    ],
    reuseNotes: "Overlaps with the Inspector's own Properties and Activity — Supporting Panels is the Primary Workspace's version of the same idea, scoped to the current task rather than the current selection.",
    reuseLinks: [{ label: "Workspace Framework", href: "/application-components/workspace-framework#inspector" }],
  },
  {
    id: "workflow-controls",
    name: "Workflow Controls",
    purpose: "Moving the current task forward — advancing a stage, or ending it.",
    examples: ["Previous", "Next", "Approve", "Reject", "Save", "Publish", "Run QA", "Generate", "Export"],
    guidance: [
      {
        label: "Primary workflow actions",
        text: "One emphasized action per stage, the same rule the Workspace Toolbar's Primary Action follows — Approve and Reject are a pair, not two competing primaries.",
      },
      {
        label: "Stage progression",
        text: "Previous and Next are always available together when a task has stages; neither appears alone.",
      },
      {
        label: "Confirmation patterns",
        text: "Anything that ends the task (Publish, Reject) confirms before running; anything that continues it (Next, Save) doesn't need to.",
      },
      {
        label: "Completion behavior",
        text: "A completed task's Workflow Controls change to reflect it — a Published object doesn't keep showing a Publish button.",
      },
    ],
    reuseNotes: "Distinct from the Workspace Toolbar's Primary Action — Toolbar actions apply to a Library selection; Workflow Controls apply to the task currently open in the Primary Working Surface.",
    reuseLinks: [{ label: "Workspace Toolbar", href: "/application-components/workspace-toolbar#primary-action" }],
  },
];
