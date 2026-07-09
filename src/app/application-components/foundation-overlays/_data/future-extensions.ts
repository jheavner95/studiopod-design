export interface OverlayFutureExtension {
  title: string;
  description: string;
}

export const OVERLAY_FUTURE_EXTENSIONS: OverlayFutureExtension[] = [
  {
    title: "Submenus",
    description: "Menu has no concept of a nested MenuItem that opens a further Menu on hover/focus — every action list built so far is flat. Add only once a real screen needs a genuine hierarchy, not preemptively.",
  },
  {
    title: "Full collision-aware auto-placement",
    description: "useAnchoredPosition flips between two opposite sides and clamps to the viewport — it doesn't try every side, doesn't account for scrollable ancestors other than the window, and doesn't auto-flip alignment independently of placement. Sufficient for this system's real anchors (buttons in a toolbar, a table cell); would need real work for content living inside its own scroll container.",
  },
  {
    title: "Toast",
    description: "Deliberately out of scope here — Toast already has a reserved z-index (--z-toast, above modals) but belongs to the Feedback system (Chip, Tag, Alert), not Overlays. Listed so nobody re-derives it inside this family later.",
  },
  {
    title: "Non-modal Dialog",
    description: "Every Dialog in this system traps focus and dims the page. A lighter \"inert but not blocking\" variant (background stays interactive-adjacent, just visually deprioritized) isn't built — no real screen has asked for it yet.",
  },
  {
    title: "Command Palette recent/frecency ranking",
    description: "Results are filtered by substring match only, in the order items were passed in. Ranking by recency or usage frequency would need real usage data this system doesn't have yet.",
  },
];
