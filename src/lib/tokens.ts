/**
 * GENERATED FROM @studiopod/foundation — DO NOT EDIT.
 *
 * The public `@studiopod/design/tokens` surface. Values are owned by
 * @studiopod/foundation and written here as literals by
 * scripts/generate-tokens-from-foundation.mjs; the stylesheets in src/styles
 * are generated from the same source, so the JS mirror and the CSS cannot
 * drift apart. Regenerate with `npm run token:bridge`.
 *
 * Literals rather than a re-export: importing Foundation at module level makes
 * tsup bundle its token tree into dist/, which Tailwind's scanner then mines
 * for class names in every consumer. Emitting values keeps dist byte-identical.
 *
 * The exported shape is frozen — same five names, same types, same values as
 * before DS-7.5D. Consumers need no change.
 */

/** Seconds, for framer-motion. Mirrors `--duration-*` (MS-1 UI scale). */
export const motionDuration = {
  instant: 0.08,
  fast: 0.16,
  base: 0.24,
  slow: 0.4,
  slower: 0.6,
} as const;

export const motionEase = {
  /** Confident, decelerating "arrive" curve. Default for entrances. */
  standard: [0.16,1,0.3,1],
  /** Symmetric ease for looping/pulsing motion. */
  inOut: [0.65,0,0.35,1],
  /** Mechanical, constant-rate motion for progress/fill indicators. */
  linear: [0,0,1,1],
} as const;

/** Mirrors `--z-*`. */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 20,
  dropdown: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

/**
 * RGB triples mirroring `--color-accent-500` / `--color-success`, for the
 * framer-motion boxShadow values that interpolate a colour's alpha channel.
 * Framer-motion cannot tween a `var(--color-x)` reference — it needs literal
 * components — so these are the single source those call sites build an
 * `rgba(${accentRgb}, alpha)` string from.
 */
export const accentRgb = "59, 130, 246";
export const successRgb = "34, 197, 94";
