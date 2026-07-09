export interface FutureInspectorExtension {
  title: string;
  description: string;
}

/** Concepts the Inspector anatomy makes room for but doesn't define yet — reserved, not promised. */
export const FUTURE_INSPECTOR_EXTENSIONS: FutureInspectorExtension[] = [
  {
    title: "AI Analysis",
    description: "An automated first pass at Validation findings, reviewed rather than trusted outright.",
  },
  {
    title: "Suggested Fixes",
    description: "One-click resolutions for specific Validation findings, where a fix is unambiguous enough to offer directly.",
  },
  {
    title: "Automation Rules",
    description: "Rules that act on this specific object automatically — the Inspector-level counterpart to Workspace Toolbar's own Automation Console extension.",
  },
  {
    title: "Workflow Assistant",
    description: "A guided path through Inspector Actions for objects with more than one required next step.",
  },
  {
    title: "Live Collaboration",
    description: "Presence indicators when more than one person has the same object selected at once.",
  },
  {
    title: "Related Conversations",
    description: "Linking external discussion (chat threads, tickets) into Activity without duplicating it there.",
  },
  {
    title: "Embedded Documentation",
    description: "Inline help scoped to the specific object type being inspected, not a separate documentation tab.",
  },
  {
    title: "Custom Inspector Plugins",
    description: "Provider- or platform-specific regions that extend the standard eight without forking the anatomy itself.",
  },
];
