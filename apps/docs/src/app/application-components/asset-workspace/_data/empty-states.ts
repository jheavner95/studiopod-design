export interface EmptyStateExample {
  id: string;
  name: string;
  purpose: string;
  messaging: string;
  actions: string[];
}

export const EMPTY_STATES: EmptyStateExample[] = [
  {
    id: "first-use",
    name: "First Use",
    purpose: "The very first time this workspace has ever been opened — before the user has created anything.",
    messaging: "Explains what belongs here, not just that it's empty.",
    actions: ["Create the first object", "Link to relevant documentation"],
  },
  {
    id: "no-results",
    name: "No Results",
    purpose: "Filters or search produced a genuinely empty result from an otherwise non-empty workspace.",
    messaging: "States what was searched for, so the user can judge whether to adjust it.",
    actions: ["Clear filters", "Broaden search"],
  },
  {
    id: "no-permission",
    name: "No Permission",
    purpose: "The workspace exists and likely has content, but this user can't see it.",
    messaging: "Says so plainly — never indistinguishable from No Results.",
    actions: ["Request access", "Contact an admin"],
  },
  {
    id: "loading",
    name: "Loading",
    purpose: "Content is on its way — the workspace isn't actually empty, it hasn't resolved yet.",
    messaging: "A skeleton of the expected layout, not a spinner alone — sets shape expectations early.",
    actions: [],
  },
  {
    id: "offline",
    name: "Offline",
    purpose: "The workspace can't reach its data source right now.",
    messaging: "Distinguishes a connectivity problem from an empty result — the user shouldn't conclude there's nothing here.",
    actions: ["Retry", "Work from cached data, if available"],
  },
  {
    id: "error",
    name: "Error",
    purpose: "Something failed loading the workspace, and it isn't connectivity.",
    messaging: "Honest about failure without technical detail that doesn't help the user.",
    actions: ["Retry", "Report the issue"],
  },
  {
    id: "filtered-out",
    name: "Filtered Out",
    purpose: "A specific, common case of No Results: an active filter is the reason, and removing it would fix it.",
    messaging: "Names the specific filter responsible, not a generic \"no results.\"",
    actions: ["Remove that one filter", "Clear all filters"],
  },
  {
    id: "archive-empty",
    name: "Archive Empty",
    purpose: "An intentionally empty state, not a problem — nothing has been archived yet.",
    messaging: "Neutral, not apologetic — an empty Archive is a healthy, normal state.",
    actions: [],
  },
];
