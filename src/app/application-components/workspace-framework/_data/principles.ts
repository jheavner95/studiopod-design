export interface WorkspacePrinciple {
  title: string;
  explanation: string;
}

export const WORKSPACE_PRINCIPLES: WorkspacePrinciple[] = [
  {
    title: "Every platform shares one anatomy",
    explanation:
      "Publishing, Commerce, Production, and every other platform reuse the exact seven regions above. Only what fills the Library and Primary Workspace changes.",
  },
  {
    title: "Business objects change, layout does not",
    explanation:
      "A Library Grid of products and a Library Grid of production jobs are the same component with different data — never a bespoke layout per platform.",
  },
  {
    title: "Inspectors are always contextual",
    explanation:
      "The Inspector only ever describes whatever is currently selected in the Library or Primary Workspace. It never has its own independent navigation.",
  },
  {
    title: "Toolbars never duplicate header actions",
    explanation:
      "If an action already lives in the Workspace Header, it doesn't get a second home in the Toolbar. Each region owns its actions exclusively.",
  },
  {
    title: "Validation is visible",
    explanation:
      "Health and validation state surface in the Header, the Inspector, and the Status bar simultaneously — never buried behind a click.",
  },
  {
    title: "Empty states are first-class",
    explanation:
      "A Library or Primary Workspace with nothing in it is a designed state, not a blank screen — see the Library Region's Empty State child.",
  },
  {
    title: "Progressive disclosure",
    explanation:
      "The Inspector defaults to Identity and Properties; Validation, Health, Activity, and Relationships are one click deeper, not all shown at once.",
  },
  {
    title: "Responsive behavior",
    explanation:
      "Below desktop width, Library and Inspector collapse behind the Toolbar rather than competing with the Primary Workspace for space.",
  },
  {
    title: "Accessibility first",
    explanation:
      "Every region is a landmark with its own label — keyboard and screen-reader users can jump straight to Library, Inspector, or Status without scanning past the others.",
  },
];
