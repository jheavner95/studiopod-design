import type { Variants } from "framer-motion";
import { motionDuration, motionEase } from "@/lib/tokens";

/**
 * Simple opacity entrance. Use for text, metadata, anything that shouldn't
 * shift position. Deliberately has no embedded `transition` — FadeIn sets
 * that explicitly (with `delay`) as a component-level prop so it applies
 * predictably instead of competing with a variant-level transition.
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Opacity + upward settle. The default entrance for cards, headings, sections. */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Opacity + scale settle. Use for elements entering from "nothing" — icons, badges, nodes appearing. */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

/** Parent container: staggers whichever children use fadeIn/slideUp variants. */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Expanding ring "ping" loop for live status dots (active nodes, pending states). */
export const pulseVariants: Variants = {
  idle: {
    scale: [1, 1.6, 1],
    opacity: [0.6, 0, 0.6],
    transition: { duration: 1.8, ease: motionEase.inOut, repeat: Infinity },
  },
};

/** State transition for a system node moving between inactive/active/complete. */
export const activeNodeVariants: Variants = {
  inactive: {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(91, 127, 255, 0)",
  },
  active: {
    scale: 1.06,
    boxShadow: "0 0 0 6px rgba(91, 127, 255, 0.15)",
    transition: { duration: motionDuration.base, ease: motionEase.standard },
  },
  complete: {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(52, 211, 153, 0)",
    transition: { duration: motionDuration.base, ease: motionEase.standard },
  },
};

/**
 * Fill transition for progress rails / pipeline connectors.
 * Pass the target fraction (0–1) as the `custom` prop on the motion element.
 */
export const progressLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (progress: number = 1) => ({
    scaleX: progress,
    transition: { duration: motionDuration.slower, ease: motionEase.standard },
  }),
};
