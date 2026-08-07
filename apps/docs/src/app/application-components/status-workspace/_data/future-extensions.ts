export interface StatusFutureExtension {
  title: string;
  description: string;
}

/** Concepts the Operational Status anatomy makes room for but doesn't define yet — reserved, not promised. */
export const STATUS_FUTURE_EXTENSIONS: StatusFutureExtension[] = [
  {
    title: "AI Operations Center",
    description: "A consolidated view of every AI-driven background job across the workspace, not just the Generation-specific ones.",
  },
  {
    title: "Autonomous Agents",
    description: "Background Jobs run by an agent rather than triggered by a person — the automation counterpart to a manually-started job.",
  },
  {
    title: "Workflow Assistant",
    description: "The Operational Status counterpart to Workspace Toolbar's own Workflow Assistant extension — surfaced here once a guided task is already running in the background.",
  },
  {
    title: "Production Timeline",
    description: "A Production-specific expansion of Activity Timeline, deep enough to replace a dedicated Production Timeline primary-workspace mode for quick checks.",
  },
  {
    title: "Incident Center",
    description: "A dedicated escalation path for a Diagnostics finding serious enough to need coordinated response, not just a read.",
  },
  {
    title: "Collaboration Feed",
    description: "Activity Timeline extended to include what teammates are doing right now, not just what the system logged.",
  },
  {
    title: "Live Team Presence",
    description: "Who else is in this workspace right now — the workspace-wide counterpart to Primary Workspace's own Collaborative Workspace extension.",
  },
  {
    title: "Automation History",
    description: "A dedicated audit trail for everything an Automation Console has ever triggered, distinct from the general Activity Timeline.",
  },
];
