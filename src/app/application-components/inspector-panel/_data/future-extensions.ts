export interface InspectorFutureExtension {
  title: string;
  description: string;
}

export const INSPECTOR_FUTURE_EXTENSIONS: InspectorFutureExtension[] = [
  { title: "Pinned sections", description: "Keeping a specific InspectorSection visible regardless of scroll, independent of Header/Footer's own sticky behavior — no current gallery variant has needed it." },
  { title: "Diff view", description: "Showing a property's previous value alongside its current one during editing — depends on History already tracking per-field changes, not just object-level entries." },
  { title: "Version history", description: "A dedicated, navigable list of full past object states, distinct from InspectorHistory's activity log of what happened. Not currently supported — InspectorHistory covers reading past activity, not restoring a prior version." },
  { title: "Inline comments", description: "Attaching a comment thread to a specific InspectorProperty or InspectorSection — a genuinely different interaction model from History's own read-only activity feed." },
  { title: "AI summaries", description: "A generated natural-language summary of the selected object's state, surfaced near the Header. Not currently supported — this capability belongs to an AI Operations Center, which doesn't exist yet." },
  { title: "Custom inspectors", description: "Letting a platform register its own InspectorSection set without touching InspectorPanel's own code — today every Inspector composition is hand-assembled per screen, which is fine at the current scale (see the Examples above, all 8 variants hand-composed) but would need a registration API once there are many more." },
];
