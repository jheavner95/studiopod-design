export interface FutureWorkspaceType {
  title: string;
  description: string;
}

/** Workspace types the anatomy makes room for but doesn't define yet — reserved, not promised. */
export const FUTURE_WORKSPACE_TYPES: FutureWorkspaceType[] = [
  {
    title: "AI Copilot Workspace",
    description: "A Primary Working Surface built around conversation, with generated output reviewed and refined rather than directly authored.",
  },
  {
    title: "Collaborative Workspace",
    description: "Multiple users editing the same Primary Working Surface at once, with presence and live cursors — the workspace-level counterpart to Workspace Layout's own Collaboration extension.",
  },
  {
    title: "Multi-user Review",
    description: "Review mode extended to multiple reviewers at once, with each reviewer's Approve/Reject tracked and reconciled separately.",
  },
  {
    title: "Real-time Production Monitor",
    description: "A Monitor-mode workspace that updates continuously rather than on refresh — the Queue and Dashboard types, pushed to their most live form.",
  },
  {
    title: "Automation Console",
    description: "A workspace for authoring and monitoring the automation rules that act on other workspaces, rather than acting on business objects directly.",
  },
  {
    title: "Visual Pipeline Editor",
    description: "A Canvas type specialized for connecting stages together — closer to the Illustration Engine's own diagram canvases than to an artwork Canvas.",
  },
  {
    title: "Command Center",
    description: "A Monitor type spanning multiple platforms at once — the Operations Workspace's own Primary Working Surface, if it needs to exist as more than a Dashboard.",
  },
  {
    title: "Mixed Reality Workspace",
    description: "A spatial variant of Canvas mode, for a future where the working surface isn't a flat screen at all.",
  },
];
