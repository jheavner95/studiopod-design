/**
 * Metadata layer for example/demo data — the piece DS-1E's audit found
 * completely absent from `src/workflows/examples/`, `src/platforms/examples/`,
 * `src/production/examples/`, and `src/capabilities/examples/`. Each of
 * those trees is a flat array of plain rendering data (`Workflow`,
 * `PlatformArchitecture`, `ProductionPipeline`, `CapabilityRegistry`) with
 * no title/category/tag/difficulty/ownership metadata attached, and no
 * registry of what exists.
 *
 * This is deliberately a metadata layer ALONGSIDE the rendering data, not a
 * change to it — `Workflow`/`PlatformArchitecture`/etc. already carry
 * everything the illustration/motion engines need to render; adding
 * showcase fields to those types would conflate two different concerns
 * (how to draw it vs. how to catalog it). See
 * `src/workflows/examples/showcase.ts` for the pilot registration — one
 * example family, not a site-wide migration (per DS-1E's own brief).
 */

export type ShowcaseDifficulty = "beginner" | "intermediate" | "advanced";

export interface ShowcaseMeta {
  /** Must match the underlying example data's own `id`. */
  id: string;
  title: string;
  category: string;
  tags: string[];
  difficulty: ShowcaseDifficulty;
  /** NavEntry ids (from design-system-navigation.ts) this example is shown on or explains. */
  relatedPages: string[];
  /** The component that renders this example — a file path or component name, for "who owns this if it breaks." */
  owningComponent: string;
}

/**
 * Identity function with a name — the one call-site convention every
 * showcase registration goes through, so `grep "defineShowcase("` finds
 * every registered example regardless of which family it's in.
 */
export function defineShowcase(meta: ShowcaseMeta): ShowcaseMeta {
  return meta;
}
