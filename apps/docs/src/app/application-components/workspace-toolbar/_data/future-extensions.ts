export interface ToolbarFutureExtension {
  title: string;
  description: string;
}

/** Concepts the toolbar anatomy makes room for but doesn't define yet — reserved, not promised. */
export const TOOLBAR_FUTURE_EXTENSIONS: ToolbarFutureExtension[] = [
  {
    title: "AI Assistant",
    description: "A conversational control that can execute several of the Toolbar's own actions from a single natural-language request.",
  },
  {
    title: "Natural-language search",
    description: "Search evolving past keyword matching — \"products added last week\" resolving to the same result a manual filter combination would.",
  },
  {
    title: "Saved workspace layouts",
    description: "A named combination of View, Sort, and active Filters, restorable in one click instead of rebuilt by hand every session.",
  },
  {
    title: "Personalized toolbars",
    description: "A user's own most-used controls surfacing first, without changing the default order for anyone else.",
  },
  {
    title: "Plugin actions",
    description: "Third-party or provider-specific actions registering into Workspace Actions or Overflow without a core Toolbar change.",
  },
  {
    title: "Workspace macros",
    description: "A recorded sequence of Toolbar actions, replayable as a single command — the automation counterpart to Bulk Actions.",
  },
  {
    title: "Command palette integration",
    description: "The Search region doubling as a command palette entry point, the way Command Search already hints at.",
  },
  {
    title: "Voice commands",
    description: "Toolbar actions triggerable by voice, for hands-busy production-floor contexts.",
  },
];
