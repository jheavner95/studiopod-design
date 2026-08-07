export interface HeaderMistake {
  title: string;
  explanation: string;
}

export const HEADER_MISTAKES: HeaderMistake[] = [
  {
    title: "Too many buttons",
    explanation:
      "Every visible action competes for the same half-second of attention as the one that actually matters. More than two or three visible actions means most of them belong in the Overflow Menu.",
  },
  {
    title: "Two primary actions",
    explanation:
      "Two equally-weighted buttons is the same as zero — the user has to stop and decide which one the platform actually wants them to click.",
  },
  {
    title: "Toolbar actions inside header",
    explanation:
      "Search and filter controls in the header blur the line between “what platform am I in” and “what am I currently filtering” — two different questions that deserve two different regions.",
  },
  {
    title: "Long wrapped titles",
    explanation:
      "A Platform Name that wraps to two lines pushes Status and Actions down with it, breaking the header's fixed height on every screen in that platform.",
  },
  {
    title: "Missing health",
    explanation:
      "A platform with no health signal at all reads as either perfectly healthy or not yet finished — there's no way to tell which, and users default to assuming the worse one.",
  },
  {
    title: "No breadcrumbs when required",
    explanation:
      "Below the platform root with no breadcrumb, the only way back is the browser's back button — which StudioPOD shouldn't rely on for primary navigation.",
  },
  {
    title: "Duplicate status indicators",
    explanation:
      "The same health signal shown in both the header and the Inspector (or Status/Activity Bar) invites the two to drift out of sync, and doubles the places a bug can hide.",
  },
];
