export interface LayoutFutureExtension {
  title: string;
  description: string;
}

/** Layout concepts the current nine primitives make room for but don't implement yet — reserved, not promised. */
export const LAYOUT_FUTURE_EXTENSIONS: LayoutFutureExtension[] = [
  {
    title: "Split Pane",
    description: "Two adjacent regions sharing a draggable boundary — the structural basis a future Resizable Panels primitive would build on.",
  },
  {
    title: "Resizable Panels",
    description: "Panel's own drag-to-resize extension — deferred today because it needs pointer-tracking state this primitive layer intentionally doesn't own.",
  },
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
