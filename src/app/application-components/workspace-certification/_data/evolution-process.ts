export interface EvolutionStep {
  id: string;
  title: string;
  description: string;
}

/** How the workspace architecture itself is allowed to change — six steps, in order. */
export const WORKSPACE_EVOLUTION_STEPS: EvolutionStep[] = [
  {
    id: "propose",
    title: "A new workspace is proposed",
    description: "A platform team states the workspace's purpose and maps it against the canonical blueprint before writing any implementation.",
  },
  {
    id: "identify-patterns",
    title: "Reusable patterns are identified",
    description: "Anything the proposal needs that already exists in another workspace — a region, a variant, a responsive mode — is reused, not reinvented.",
  },
  {
    id: "review-exceptions",
    title: "Exceptions are reviewed",
    description: "Where the proposal genuinely can't fit the canonical anatomy, the exception is reviewed explicitly and the reason recorded, rather than silently diverging.",
  },
  {
    id: "generalize",
    title: "Patterns become part of the Design System",
    description: "An exception that turns out to recur across more than one platform is promoted into the shared anatomy, not left duplicated in each workspace that needed it.",
  },
  {
    id: "new-architecture",
    title: "A platform may introduce new architecture",
    description: "Reserved for genuinely novel operational needs no existing tier covers — not for a platform team preferring a different layout.",
  },
  {
    id: "generalize-extensions",
    title: "Extensions are generalized",
    description: "A Future Extension proposed on one DS-1 page (see each page's own Future Extensions section) graduates into shared architecture once more than one platform needs it.",
  },
];
