/**
 * DS-5A — the canonical owner of the two structural padding vocabularies
 * this design system actually has. `src/lib` is the dependency graph's
 * floor (zero internal dependencies, per the certification-history
 * engineering note), so this file imports nothing and everything else is
 * free to import it without risk of a cycle.
 *
 * Audited during DS-4/DS-5A: Card, Surface, and Panel independently
 * declared byte-identical `sm`/`md`/`lg` (+ Surface/Panel's `none`)
 * padding maps — real duplication, consolidated here. GlassPanel and
 * SurfacePanel independently declared a SECOND byte-identical map at
 * different pixel values. That second map is NOT the same drifted
 * mistake — usage-site evidence settles it: Card appears ~125 times
 * across ordinary application UI, while GlassPanel/SurfacePanel appear
 * almost exclusively on marketing/hero/spotlight pages (the homepage,
 * `/compositions`, `/workflows`, `/core-components`'s gallery). Two
 * families, two deliberate registers — denser for pervasive UI chrome,
 * more generous for hero moments — not one vocabulary that drifted. See
 * docs/engineering-notes/14-spacing-consolidation.md for the full audit.
 */

/**
 * The structural family — Card, Surface, Panel. Ordinary UI containers
 * used pervasively across real application screens; a tighter, denser
 * register. `SurfacePadding` is this design system's oldest public name
 * for this vocabulary (originally declared in Surface.tsx, which still
 * re-exports it at the same public path for compatibility) — kept as the
 * canonical name rather than inventing a new one two components already
 * depend on publicly.
 */
export type SurfacePadding = "none" | "sm" | "md" | "lg";

export const STRUCTURAL_PADDING_MAP: Record<SurfacePadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * The spotlight family — GlassPanel, SurfacePanel. Hero and spotlight
 * moments (a featured callout, a landing-page panel) — a more generous
 * register than the structural family. Deliberately has no `none`: a
 * zero-padding hero/glass panel serves neither component's documented
 * purpose, unlike Surface/Panel's `none`, which supports embedding
 * pre-padded content.
 */
export type SpotlightPadding = "sm" | "md" | "lg";

export const SPOTLIGHT_PADDING_MAP: Record<SpotlightPadding, string> = {
  sm: "p-4",
  md: "p-8",
  lg: "p-12",
};
