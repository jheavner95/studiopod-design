export interface AssetWorkspacePrinciple {
  title: string;
  explanation: string;
}

export const ASSET_WORKSPACE_PRINCIPLES: AssetWorkspacePrinciple[] = [
  {
    title: "Recognition over recall",
    explanation:
      "A user should recognize the object they want by looking at it, not have to remember its exact name to search for it — this is why Thumbnail and Title both matter.",
  },
  {
    title: "Objects should be identifiable before opening",
    explanation: "Title, Subtitle, and Status together should answer \"is this the one I want\" without a click — see Asset Card Anatomy.",
  },
  {
    title: "Selection is predictable",
    explanation: "The same modifier keys do the same thing in every Asset Workspace — see Selection Model.",
  },
  {
    title: "Metadata supports decision-making",
    explanation: "Every metadata field earns its place by helping a user decide something — sort, filter, or open — not by being available.",
  },
  {
    title: "Filtering reduces cognitive load",
    explanation: "A well-chosen Quick Filter does more for scanability than any amount of extra Metadata on every card.",
  },
  {
    title: "Views are interchangeable",
    explanation: "Grid, Table, and List all describe the exact same underlying objects — switching views never changes what's selected or filtered.",
  },
  {
    title: "Quick actions never replace the Inspector",
    explanation: "A Quick Action handles the one most common case fast; anything with more than one meaningful choice belongs in the Inspector instead.",
  },
];
