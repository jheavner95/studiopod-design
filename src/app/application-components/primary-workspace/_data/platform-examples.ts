export interface PlatformExample {
  id: string;
  title: string;
  workspaceType: string;
  why: string;
  supportingRegions: string[];
  workflow: string;
}

/**
 * Six named screens, each paired with a specific Primary Working Surface
 * type. Note these describe one specific screen, not a whole platform's
 * default mode — Production's main job-monitoring screen is Queue-mode
 * (see Workspace Framework's Platform Examples), while its artwork
 * validation screen, shown here, is Canvas-mode. A platform can and does
 * use more than one workspace type across its different screens.
 */
export const PLATFORM_EXAMPLES: PlatformExample[] = [
  {
    id: "production-canvas",
    title: "Production Canvas",
    workspaceType: "Canvas",
    why: "Validating artwork placement and print-safe zones is inherently spatial — a specific Production task that needs direct manipulation, distinct from the platform's own Queue-mode job monitoring.",
    supportingRegions: ["Reference Material (safe-zone overlays)", "Version Comparison"],
    workflow: "Approve / Reject pair, with Run QA as a secondary control.",
  },
  {
    id: "publishing-queue",
    title: "Publishing Queue",
    workspaceType: "Queue",
    why: "Publishing jobs arrive continuously and need triage before any single one gets the Editor's full attention.",
    supportingRegions: ["Secondary Metrics (throughput)", "Notes"],
    workflow: "Workspace-wide Pause / Retry, plus per-item Approve to release a job.",
  },
  {
    id: "commerce-dashboard",
    title: "Commerce Dashboard",
    workspaceType: "Dashboard",
    why: "Commerce is a Monitor-mode task most of the time — sales, sync status, and catalog health all at a glance.",
    supportingRegions: ["Secondary Metrics", "Live Preview (of a selected listing)"],
    workflow: "Export and Refresh — no per-object Workflow Controls at the dashboard level.",
  },
  {
    id: "intelligence-analytics",
    title: "Intelligence Analytics",
    workspaceType: "Analytics",
    why: "Intelligence exists specifically to answer questions, not just display numbers — the Analyze mode's exploratory depth is the whole point of the platform.",
    supportingRegions: ["Secondary Metrics", "Version Comparison (period over period)"],
    workflow: "Export is close to the only Workflow Control — Analyze mode rarely transitions onward.",
  },
  {
    id: "asset-review",
    title: "Asset Review",
    workspaceType: "Review",
    why: "Evaluating a submitted asset against brief and quality bar is judgment, not creation — Review mode's Approve/Reject pair is the entire task.",
    supportingRegions: ["Reference Material (the original brief)", "Version Comparison"],
    workflow: "Approve / Reject, both resolving back to the Asset Workspace.",
  },
  {
    id: "configuration-editor",
    title: "Configuration Editor",
    workspaceType: "Configuration",
    why: "Setting up a provider, integration, or workspace preference is read-then-write, not browse-and-act — Configuration mode's form-first UI fits it exactly.",
    supportingRegions: ["Notes (inline help text)"],
    workflow: "Save is the only meaningful control — nothing here progresses to another stage.",
  },
];
