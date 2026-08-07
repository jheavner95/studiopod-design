export interface LayoutPrinciple {
  title: string;
  explanation: string;
}

export const LAYOUT_PRINCIPLES: LayoutPrinciple[] = [
  {
    title: "Whitespace communicates hierarchy",
    explanation:
      "The amount of space around something says how important it is before any color or size does — a cramped Primary Action reads as an afterthought even if it's technically the biggest button.",
  },
  {
    title: "Scrolling should be predictable",
    explanation: "A user should always know, before they scroll, which region is about to move — see Scrolling Rules above.",
  },
  {
    title: "Sticky regions preserve context",
    explanation:
      "Header and Toolbar stay put specifically so a long scroll session never loses track of what's being filtered or which platform this is.",
  },
  {
    title: "Avoid nested scrolling unless necessary",
    explanation:
      "A scrollbar inside a scrollbar is confusing by default — Library, Primary Workspace, and Inspector each get their own because they're genuinely independent, not because nested scroll is free.",
  },
  {
    title: "Canvas regions maximize working space",
    explanation:
      "When Primary Workspace is in Canvas mode, everything else yields — Library and Inspector collapse to overlays rather than permanently claiming width from a spatial task.",
  },
  {
    title: "Inspectors should never dominate",
    explanation: "An Inspector wider than the Primary Workspace has inverted the workspace's own priorities — see Dual Inspector's width limits.",
  },
  {
    title: "Responsive changes preserve workflows",
    explanation:
      "Collapsing to mobile changes what's visible, never what's possible — every action reachable on desktop stays reachable, just relocated into an Overflow Menu.",
  },
  {
    title: "Consistency beats optimization",
    explanation: "A slightly-less-perfect layout that matches every other platform beats a locally-optimal one that has to be relearned per platform.",
  },
];
