export interface SearchStateNote {
  state: string;
  note: string;
}

export const SEARCH_STATES: SearchStateNote[] = [
  { state: "Empty", note: "No query, no filters — SearchHistory (recent queries) is the useful thing to show here, not a blank field." },
  { state: "Searching", note: "SearchField's own loading prop shows an inline spinner in place of the clear button, inherited from Foundation Forms' SearchInput unchanged." },
  { state: "Filtered", note: "One or more FilterGroup dimensions has a non-empty selected Set — ActiveFilterList and FilterSummary both reflect it." },
  { state: "No Results", note: "SearchField's own emptyStateHelper prop ('No results for “x”') covers this inline, the same helper Foundation Forms' SearchInput already exposes." },
  { state: "Loading", note: "Initial fetch before any query has run — a caller-composed skeleton (Foundation Feedback's Skeleton), not a state this system owns." },
  { state: "Busy", note: "A search or filter change in flight while prior results still show — SearchField's loading prop again, without clearing the existing result list underneath." },
  { state: "Saved", note: "The active filter combination matches a SavedFilter entry exactly — that entry renders in its accent tone." },
  { state: "Modified", note: "The active state has diverged from the applied SavedFilter entry — no saved entry matches, so none renders in accent tone; a caller can offer 'Update saved filter' once it detects this." },
];
