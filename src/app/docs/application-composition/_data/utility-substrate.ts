export interface UtilitySubstrateNote {
  label: string;
  text: string;
}

/**
 * src/lib, src/hooks, src/motion, and src/providers aren't one of the six
 * named tiers — they're the substrate every tier is free to depend on, in
 * strictly one direction. None of the tiers ever depend back up into them.
 */
export const UTILITY_SUBSTRATE_NOTES: UtilitySubstrateNote[] = [
  {
    label: "src/lib/",
    text: "Zero internal dependencies — only external clsx/tailwind-merge imports. The floor of the dependency graph.",
  },
  {
    label: "src/hooks/",
    text: "Depends only on itself and src/providers/MotionProvider.tsx (a React context). Every Foundation/Operational/Workflow/Platform barrel index.ts export resolves to a same-directory relative path — no cross-tier barrel re-exports anywhere.",
  },
  {
    label: "src/motion/",
    text: "Depends only on src/hooks and src/lib.",
  },
  {
    label: "src/providers/MotionProvider.tsx → src/components/motion/MotionPreference.tsx",
    text: "One hop through a small pre-tier directory that sits alongside Foundation rather than inside the six named tiers. Not a cycle and not an upward violation — MotionPreference.tsx has no further outward dependencies.",
  },
];
