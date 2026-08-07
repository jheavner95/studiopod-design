export interface HeaderPrinciple {
  title: string;
  explanation: string;
}

export const HEADER_PRINCIPLES: HeaderPrinciple[] = [
  {
    title: "Headers provide context",
    explanation:
      "Everything in the header answers “what am I looking at.” Anything that changes what's on screen belongs in the Toolbar instead.",
  },
  {
    title: "Toolbars provide interaction",
    explanation: "Search, filter, sort, and bulk actions belong to the Workspace Toolbar. The header describes; the toolbar does.",
  },
  {
    title: "Do not duplicate actions",
    explanation:
      "An action lives in exactly one region. If Primary Actions already has “Publish,” the Toolbar never gets its own “Publish” button too.",
  },
  {
    title: "Status is informative",
    explanation:
      "Status badges describe state, they don't trigger anything — a Sync badge shows sync status, it doesn't start a sync. That belongs to an action.",
  },
  {
    title: "Titles are concise",
    explanation:
      "A Platform Name is a label, not a sentence — if it needs a subtitle to make sense, that subtitle is the Platform Description, not a longer title.",
  },
  {
    title: "Descriptions are optional",
    explanation:
      "First-time context, not permanent furniture — the Platform Description can fade or hide once a user already knows what the platform does.",
  },
  {
    title: "Health is always visible",
    explanation:
      "If a platform has a health signal at all, it's visible in the header without a click — collapsed to an icon before it's ever hidden behind a menu.",
  },
  {
    title: "Accessibility first",
    explanation:
      "Every region is a landmark, every status badge has a text label — not just a color — and the header stays fully usable with a screen reader before it's fully usable with a mouse.",
  },
];
