export interface PrimaryWorkspacePrinciple {
  title: string;
  explanation: string;
}

export const PRIMARY_WORKSPACE_PRINCIPLES: PrimaryWorkspacePrinciple[] = [
  {
    title: "One primary task per workspace",
    explanation: "A Primary Working Surface doing two unrelated jobs at once is really two workspaces sharing screen space badly.",
  },
  {
    title: "Reduce competing visual priorities",
    explanation: "Only one region gets to be visually dominant — see Supporting Panels' own space-occupancy rule.",
  },
  {
    title: "Large work areas improve productivity",
    explanation: "The Primary Working Surface gets the width first; every other region's size is what's left over, not the other way around.",
  },
  {
    title: "Supporting information should remain contextual",
    explanation: "A Supporting Panel showing something unrelated to the current task is worse than no panel at all.",
  },
  {
    title: "Workflow actions should reflect the current stage",
    explanation: "Workflow Controls change as a task progresses — see Workflow Controls' own completion-behavior rule.",
  },
  {
    title: "Avoid modal overload",
    explanation: "A task that needs three stacked modals to complete probably belongs in a Wizard mode instead.",
  },
  {
    title: "Progress should always be visible",
    explanation: "A multi-stage task shows where it is in that sequence at all times, not just at the start and the end.",
  },
];
