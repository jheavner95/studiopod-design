export interface LayoutFutureExtension {
  title: string;
  description: string;
}

/**
 * Layout concepts the current primitive family (see ./primitives.ts's
 * LAYOUT_PRIMITIVES for the live count) makes room for but doesn't
 * implement yet — reserved, not promised.
 *
 * "Split Pane" / "Resizable Panels" were both listed here until DS-3
 * shipped SplitView (src/components/layout/SplitView.tsx) — see
 * /application-components/foundation-splitview. Removed rather than left
 * stale: they're not future extensions anymore, they're a real primitive.
 */
export const LAYOUT_FUTURE_EXTENSIONS: LayoutFutureExtension[] = [
  {
    title: "Dock Layout",
    description: "Panels that can be rearranged, floated, or docked to an edge — the eventual home for a fully customizable workspace layout.",
  },
  {
    title: "Masonry",
    description: "A variable-height column layout for content like an asset gallery, where Grid's uniform row heights don't fit.",
  },
  {
    title: "Virtualized Layout",
    description: "A Stack or Grid variant that only renders the rows currently in view — needed once a List or Table primitive has to handle thousands of rows.",
  },
  {
    title: "Canvas Layout",
    description: "Free-form, absolutely-positioned composition for a future whiteboard-style or node-based editing surface.",
  },
];
