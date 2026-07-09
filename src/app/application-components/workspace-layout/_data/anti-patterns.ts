export interface LayoutAntiPattern {
  title: string;
  explanation: string;
}

export const LAYOUT_ANTI_PATTERNS: LayoutAntiPattern[] = [
  {
    title: "Multiple independent toolbars",
    explanation:
      "Two toolbars means two different sets of \"what am I filtering right now\" — the user has to track state in two places instead of one.",
  },
  {
    title: "Excessive nested scrolling",
    explanation:
      "A scrollbar inside a scrollbar inside a scrollbar means a trackpad gesture stops being predictable — the wrong region catches the scroll and the user loses their place.",
  },
  {
    title: "Oversized inspectors",
    explanation:
      "An Inspector wider than the Primary Workspace has quietly become the main event — the thing the user came to do gets squeezed into a sidebar.",
  },
  {
    title: "Tiny workspaces",
    explanation:
      "A Compact-width mode stretched across a screen it wasn't designed for leaves acres of dead canvas on either side — width modes exist so this never has to happen.",
  },
  {
    title: "Competing sticky regions",
    explanation:
      "Two sticky regions stacking on top of each other as you scroll eats into the one thing a Canvas or Library region has to offer: vertical space.",
  },
  {
    title: "Unbalanced layouts",
    explanation:
      "A 10/80/10 split technically fits the anatomy but starves the Library and Inspector of enough room to be useful — see Canonical Region Layout's tested proportions instead.",
  },
];
