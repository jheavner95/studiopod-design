export interface SearchFutureExtension {
  title: string;
  description: string;
}

export const SEARCH_FUTURE_EXTENSIONS: SearchFutureExtension[] = [
  { title: "AI Search", description: "A conversational search box that interprets an open-ended request rather than matching literal text — deferred until a real screen needs it; SearchField's plain text contract doesn't preclude swapping the matching engine behind it later." },
  { title: "Semantic Search", description: "Matching by meaning/embedding similarity rather than substring — same reasoning as AI Search: this family's SearchField contract (value/onChange, a query string) doesn't change, only what runs behind onChange would." },
  { title: "Natural Language Filters", description: "Parsing \"published this week\" into a structured FilterGroup selection automatically — depends on Natural Language Filters having a real screen to prove out matching rules against first." },
  { title: "Recent Searches", description: "Already partially covered by SearchHistory — this extension specifically means persisting history across sessions (not just this component's caller-supplied entries) and de-duplicating near-identical queries." },
  { title: "Smart Suggestions", description: "Ranking SearchSuggestions by the current user's own behavior rather than a static list — depends on usage data this design-system layer has no access to." },
  { title: "Pinned Filters", description: "Letting a user pin specific FilterGroup dimensions to always show first in FilterBar's row, ahead of the default order — a real ordering/preference concern a caller-side layer would own, not FilterBar itself." },
  { title: "Shared Filters", description: "A SavedFilter entry visible to a whole team rather than just the user who saved it — depends on Saved Filters having a persistence layer first (see Implementation Guidance: this family only reports which entry is active, it never persists one)." },
];
