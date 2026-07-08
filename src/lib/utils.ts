import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge doesn't know about our hand-written fluid typography
// classes (src/styles/typography.css) — its default heuristics fall back
// to treating any unrecognized "text-*" class as a text-color utility, so
// e.g. "text-heading-1 text-ink-primary" reads as two conflicting colors
// and silently drops the size class, leaving every Typography component
// (Display/Heading/Body/Caption/Metadata) rendering at the browser
// default size. Registering them as their own group keeps them from
// conflicting with real color utilities while still overriding each other.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-2",
        "text-heading-1",
        "text-heading-2",
        "text-heading-3",
        "text-heading-4",
        "text-body-lg",
        "text-body-md",
        "text-body-sm",
        "text-caption",
        "text-metadata",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
