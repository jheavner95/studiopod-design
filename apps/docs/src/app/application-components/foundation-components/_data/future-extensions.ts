export interface FoundationFutureExtension {
  title: string;
  description: string;
}

/** Concepts the foundation layer makes room for but doesn't define yet — reserved, not promised. */
export const FOUNDATION_FUTURE_EXTENSIONS: FoundationFutureExtension[] = [
  {
    title: "Theming",
    description: "A second first-class theme beyond StudioPOD's own dark premium palette, swapped through tokens rather than component code.",
  },
  {
    title: "Token-driven variants",
    description: "Component variants (tone, size, density) resolved entirely from design tokens, so a token change can restyle a variant without touching a component's source.",
  },
  {
    title: "Animation presets",
    description: "A shared set of entrance/exit motion presets every overlay component (Dialog, Drawer, Popover, Toast) draws from, instead of each one defining its own.",
  },
  {
    title: "Density modes",
    description: "Compact/comfortable/spacious presets applied consistently across every foundation component at once, extending Workspace Layout's own density rules down to this layer.",
  },
  {
    title: "Internationalization",
    description: "RTL layout support and locale-aware formatting (dates, numbers) built into the components that need it, not bolted on per-usage.",
  },
  {
    title: "Mobile patterns",
    description: "Native-feeling mobile equivalents for overlay components — a Dialog that becomes a full-screen sheet, a Menu that becomes a bottom action sheet.",
  },
  {
    title: "Plugin-safe components",
    description: "A constrained subset of the foundation layer safe to expose to third-party plugin UI, sandboxed from the rest of the design system's surface area.",
  },
];
