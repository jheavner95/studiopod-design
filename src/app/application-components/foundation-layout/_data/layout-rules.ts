export interface LayoutRule {
  title: string;
  explanation: string;
}

export const LAYOUT_RULES: LayoutRule[] = [
  {
    title: "Prefer Stack before a custom flex-column",
    explanation: "flex flex-col gap-N is the single most repeated exact className in this codebase — see Migration Notes in Reference below. If it's vertical composition with a gap, it's a Stack.",
  },
  {
    title: "Prefer Inline before a custom flex-row",
    explanation: "The same reasoning as Stack, applied horizontally — with wrapping handled correctly by default instead of re-decided at every call site.",
  },
  {
    title: "Prefer Grid before an ad hoc responsive grid",
    explanation: "A hand-written grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 string is a Grid or CardGrid that hasn't been named yet.",
  },
  {
    title: "Prefer Description List for metadata",
    explanation: "Any label/value row — Inspector identity, accessibility guidance, read-only properties — is a Description List, not a hand-rolled dl.",
  },
  {
    title: "Prefer Panel over a custom bordered container",
    explanation: "rounded-lg border border-border-subtle bg-surface p-4 sm:p-6, applied to a region with actual internal structure (a header, a body), is a Panel.",
  },
];
