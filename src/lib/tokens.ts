/**
 * JS-side mirror of the motion + z-index tokens defined in
 * src/styles/tokens.css. Framer-motion needs numeric seconds and
 * cubic-bezier arrays rather than CSS strings, so these live here
 * instead of being read off custom properties at runtime.
 *
 * Keep the two files in sync if you change a value.
 */

export const motionDuration = {
  instant: 0.08,
  fast: 0.16,
  base: 0.24,
  slow: 0.4,
  slower: 0.6,
} as const;

export const motionEase = {
  /** Confident, decelerating "arrive" curve. Default for entrances. */
  standard: [0.16, 1, 0.3, 1],
  /** Symmetric ease for looping/pulsing motion. */
  inOut: [0.65, 0, 0.35, 1],
  /** Mechanical, constant-rate motion for progress/fill indicators. */
  linear: [0, 0, 1, 1],
} as const;

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
 * RGB triples mirroring theme.css's --color-accent-500 / --color-success,
 * for the handful of framer-motion `animate`/`initial` boxShadow values
 * that interpolate a color's alpha channel. Framer-motion can't tween a
 * `var(--color-x)` reference (it needs literal rgb components to animate
 * between), so these exist as the single source those call sites build
 * an `rgba(${accentRgb}, alpha)` string from, instead of each repeating
 * the digits. Keep in sync with theme.css if the palette changes.
 */
export const accentRgb = "59, 130, 246";
export const successRgb = "34, 197, 94";
