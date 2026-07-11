import { FOUNDATION_COMPONENTS, type FoundationComponent } from "../../foundation-components/_data/catalog";

export interface DocTopic {
  label: string;
  note: string;
}

export interface LayoutPrimitiveDoc {
  /** Matches a FOUNDATION_COMPONENTS id — purpose and accessibility are read from there, never restated. */
  id: string;
  name: string;
  examples: string[];
  topics: DocTopic[];
  usage: string;
  responsiveNotes: string;
  commonMistakes: string[];
}

export const LAYOUT_PRIMITIVES: LayoutPrimitiveDoc[] = [
  {
    id: "stack",
    name: "Stack",
    examples: ["Forms", "Inspector sections", "Cards", "Dialogs"],
    topics: [
      { label: "Gap behavior", note: "One gap value applies uniformly between every child — never a mix of manual margin-top/margin-bottom on individual items." },
      { label: "Alignment", note: "align controls the cross-axis (horizontal) placement of children — start/center/end/stretch, matching CSS align-items exactly." },
      { label: "Distribution", note: "justify controls the main-axis (vertical) distribution when a Stack is taller than its content — rarely needed outside a fixed-height container." },
      { label: "Nested stacks", note: "A Stack inside a Stack is normal and expected — each level only ever owns its own gap, so nesting never compounds spacing unexpectedly." },
      { label: "Responsive behavior", note: "Stack itself doesn't change behavior across breakpoints — vertical composition reads the same at every width. Responsive layout changes belong to Grid or Inline instead." },
    ],
    usage: "<Stack gap=\"md\">{children}</Stack> — the default choice for any vertical arrangement. Reach for a plain div only when no gap or alignment behavior is needed at all.",
    responsiveNotes: "No responsive props — a Stack is a Stack at every breakpoint. If content needs to become horizontal above a breakpoint, that's a different primitive (Inline), not a Stack variant.",
    commonMistakes: [
      "Adding a wrapping div with its own padding/gap around a Stack instead of passing className to the Stack directly.",
      "Reaching for space-y-N utility classes instead of Stack's gap prop, losing the single source of truth for vertical rhythm.",
    ],
  },
  {
    id: "inline",
    name: "Inline",
    examples: ["Toolbar groups", "Badges", "Metadata rows", "Button groups", "Status chips"],
    topics: [
      { label: "Wrapping", note: "wrap defaults to true — content flows onto additional lines rather than overflowing or forcing the page wider. Set wrap={false} only for a toolbar that must always stay one line." },
      { label: "Alignment", note: "align defaults to center, matching how a toolbar's icon buttons and text should line up regardless of their individual heights." },
      { label: "Spacing", note: "gap uses a tighter default scale than Stack's — horizontal rhythm reads correctly at a smaller value than vertical rhythm does." },
      { label: "Overflow", note: "Inline wraps rather than scrolls. A row that must never wrap and might overflow belongs in a ScrollArea with direction=\"horizontal\" instead." },
    ],
    usage: "<Inline gap=\"sm\">{children}</Inline> — the default choice for any horizontal arrangement that should wrap gracefully rather than overflow.",
    responsiveNotes: "Wrapping is itself the responsive behavior — no breakpoint props needed. A toolbar built from Inline reflows onto multiple lines at narrow widths automatically.",
    commonMistakes: [
      "Setting wrap={false} by default and only special-casing the rare toolbar that truly needs one unbroken line.",
      "Using Inline where Cluster's semantics (a group of same-weight peers) would communicate intent more clearly.",
    ],
  },
  {
    id: "grid",
    name: "Grid",
    examples: ["Card grids", "Dashboard cards", "Asset galleries", "Metrics", "Responsive grids"],
    topics: [
      { label: "Auto-fit", note: "columns=\"auto-fit\" collapses empty tracks — a row of 2 items in a 4-column-capable space stays wide instead of leaving 2 empty columns visible." },
      { label: "Auto-fill", note: "columns=\"auto-fill\" preserves empty tracks — items stay at their target width and left-align, useful when consistent item width matters more than filling the row." },
      { label: "Column strategies", note: "A fixed count (1–6) reuses the same responsive breakpoints as CardGrid; auto-fit/auto-fill instead reads minChildWidth and lets the browser compute the count." },
      { label: "Responsive collapse", note: "Fixed-column mode collapses to fewer columns at narrower breakpoints automatically — the same behavior documented in Workspace Layout's own responsive rules." },
    ],
    usage: "<Grid columns={3}>{children}</Grid> for a known card count, or <Grid columns=\"auto-fit\" minChildWidth=\"240px\">{children}</Grid> when the item count is unpredictable.",
    responsiveNotes: "Fixed columns collapse at sm:/lg: breakpoints exactly like CardGrid. Auto-fit/auto-fill need no breakpoints at all — the column count is a function of container width divided by minChildWidth.",
    commonMistakes: [
      "Writing a bespoke grid-cols-1 sm:grid-cols-3 className instead of reaching for Grid or CardGrid.",
      "Using auto-fit when auto-fill's preserve-empty-tracks behavior is what the layout actually needs (a gallery that shouldn't stretch its last row).",
    ],
  },
  {
    id: "cluster",
    name: "Cluster",
    examples: ["Tags", "Filter chips", "Action groups", "Badge collections"],
    topics: [
      { label: "Wrapping", note: "Always wraps — a Cluster with no room for its next item starts a new line rather than compressing or scrolling." },
      { label: "Spacing", note: "Defaults to a smaller gap than Inline's own default, appropriate for small discrete tokens like tags and chips rather than toolbar-sized controls." },
      { label: "Alignment", note: "Always center-aligned on the cross axis — a Cluster of same-height chips never needs to individually control alignment." },
    ],
    usage: "<Cluster>{tags}</Cluster> — reach for this over Inline specifically when every child is a same-weight peer (a tag, a chip, a badge), not a mix of different-purpose controls.",
    responsiveNotes: "Identical to Inline's — wrapping is the only responsive behavior, and it needs no breakpoint props.",
    commonMistakes: [
      "Reaching for Inline when the content is genuinely a peer collection — Cluster communicates that intent to the next reader, Inline doesn't.",
    ],
  },
  {
    id: "surface",
    name: "Surface",
    examples: ["Cards", "Panels", "Sections", "Inspector blocks"],
    topics: [
      { label: "Elevation", note: "Five tiers (none/subtle/card/panel/floating) reuse the design system's own semantic shadow scale directly — never a hand-typed box-shadow value." },
      { label: "Borders", note: "border defaults to true. Turn it off only for a Surface that's meant to visually blend into its parent (e.g. a nested region inside an already-bordered Panel)." },
      { label: "Backgrounds", note: "Always bg-surface — Surface doesn't expose a background prop, since a component needing a different background is choosing a different visual role, not a Surface variant." },
      { label: "Padding", note: "Defaults to none — Surface is the bare treatment other components add their own padding on top of. Card and Panel both apply padding themselves rather than inheriting Surface's." },
    ],
    usage: "<Surface elevation=\"card\">{children}</Surface> — the layer Card, Panel, and every other bordered/elevated container in this system ultimately reduces to.",
    responsiveNotes: "No responsive behavior of its own — elevation and borders read the same at every breakpoint.",
    commonMistakes: [
      "Hand-writing rounded-lg border border-border-subtle bg-surface directly instead of reaching for Surface — the exact className this primitive exists to replace.",
    ],
  },
  {
    id: "panel",
    name: "Panel",
    examples: ["Inspector", "Sidebar", "Drawer", "Library", "Supporting panel"],
    topics: [
      { label: "Fixed", note: "Today's Panel is a fixed-width/fixed-height content region by default — width and height are controlled entirely through className, same as any other component." },
      { label: "Flexible", note: "A Panel with no explicit width/height className grows to fill its flex or grid parent — the flexible case needs no special prop, just the absence of a fixed size." },
      { label: "Resizable", note: "Not implemented. A drag-to-resize Panel needs pointer-tracking state this primitive intentionally doesn't own — see Future Enhancements below (Resizable Panels)." },
      { label: "Collapsible", note: "Not implemented. Collapse/expand needs its own open state and transition, which belongs to a future composed component built on top of Panel, not Panel itself." },
    ],
    usage: "<Panel header={<Heading level={4}>Title</Heading>}>{children}</Panel> — a bounded workspace subdivision built directly on Surface.",
    responsiveNotes: "Panel itself has no responsive logic — a Panel that should become a Drawer at narrower widths (see Inspector Workspace's own responsive modes) composes Panel with that decision made by the caller, not by Panel internally.",
    commonMistakes: [
      "Reimplementing Panel's border+background+header pattern by hand inside a new page instead of importing it.",
      "Expecting Panel to manage its own resize or collapse state today — neither exists yet.",
    ],
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    examples: ["Inspector", "Library", "Tables", "Dialogs", "Activity"],
    topics: [
      { label: "Independent scrolling", note: "A ScrollArea scrolls on its own axis without the page itself scrolling — the same job overflow-x-auto has been doing by hand in every table in this design system." },
      { label: "Sticky headers", note: "ScrollArea doesn't manage sticky positioning itself — a child with position: sticky (like CoverageMatrix's own <thead>) sticks correctly inside it, the same as inside any scroll container." },
      { label: "Nested scrolling", note: "A ScrollArea inside a ScrollArea works natively — the inner region captures scroll input until it reaches its own boundary, standard browser scroll-chaining behavior." },
      { label: "Overscroll behavior", note: "overscroll-contain is applied by default, so scrolling past a nested ScrollArea's boundary doesn't also scroll the page behind it." },
    ],
    usage: "<ScrollArea direction=\"horizontal\">{table}</ScrollArea> — replaces a hand-written overflow-x-auto wrapper with the same behavior plus overscroll containment.",
    responsiveNotes: "direction can differ by breakpoint at the call site (e.g. \"vertical\" on mobile, \"both\" on desktop) by passing a responsive className — ScrollArea doesn't yet accept responsive props directly.",
    commonMistakes: [
      "Applying overflow-x-auto directly instead of ScrollArea, losing the consistent overscroll-contain behavior.",
      "Wrapping content in a ScrollArea with no maxHeight at all when vertical scrolling was actually the intent — without a height constraint there's nothing to scroll.",
    ],
  },
  {
    id: "separator",
    name: "Separator",
    examples: ["Sections", "Toolbar groups", "Inspector groups", "Lists"],
    topics: [
      { label: "Horizontal", note: "The default orientation — a full-width single-pixel rule using the same border-subtle color as every border in this design system." },
      { label: "Vertical", note: "orientation=\"vertical\" requires an explicit height from its flex parent (h-full) to have any visible length — a common integration mistake, see below." },
      { label: "Inset", note: "inset shrinks the rule in from both ends by one spacing unit, appropriate inside already-padded content rather than flush against a container edge." },
      { label: "Spacing", note: "Separator carries no margin of its own — the gap around it comes from its parent Stack/Inline's own gap prop, keeping spacing decisions in one place." },
    ],
    usage: "<Separator /> between two Stack children, or <Separator orientation=\"vertical\" /> inside an Inline toolbar group.",
    responsiveNotes: "No responsive behavior of its own — a Separator that should disappear at a breakpoint (e.g. collapsing a two-column layout to one) is a decision the parent layout makes, not Separator itself.",
    commonMistakes: [
      "Using orientation=\"vertical\" inside a parent with no defined height, producing an invisible zero-height rule.",
      "Hand-writing a border-t utility class directly instead of reaching for Separator — this primitive exists specifically to replace that pattern.",
    ],
  },
  {
    id: "description-list",
    name: "Description List",
    examples: ["Inspector identity", "Metadata", "Accessibility examples", "Read-only properties", "Operational information"],
    topics: [
      { label: "Single column", note: "layout=\"stacked\" always stacks label above value — appropriate for long-form values that never benefit from a side-by-side label." },
      { label: "Two column", note: "layout=\"two-column\" always sits label and value side by side, even at mobile widths — reserve for short, predictable values." },
      { label: "Responsive", note: "layout=\"responsive\" (the default) stacks below sm: and goes side-by-side from sm: up — exactly the behavior every Accessibility section in this system already hand-implemented." },
      { label: "Long values", note: "Every value cell carries min-w-0 break-words by default — the same CSS Grid blowout fix diagnosed earlier in this system, now built into the primitive instead of re-applied by hand each time." },
      { label: "Wrapping", note: "Labels never wrap oddly mid-word (shrink-0 holds their width); values wrap freely, since values are the field expected to contain longer, less predictable content." },
    ],
    usage: "<DescriptionList items={[{ label: \"...\", value: \"...\" }]} /> — replaces the bordered dl/dt/dd block hand-rolled identically across every Accessibility section in this system.",
    responsiveNotes: "The default responsive layout is the one every existing Accessibility section already uses by hand — adopting this primitive changes no visual behavior, only removes duplication.",
    commonMistakes: [
      "Hand-rolling the dl/dt/dd + border-b + first:pt-0 block again in a new page instead of importing DescriptionList — the exact duplication this primitive exists to end.",
      "Using layout=\"two-column\" for values long enough to need to wrap onto their own line at mobile width.",
    ],
  },
];

export function catalogEntryFor(id: string): FoundationComponent {
  const component = FOUNDATION_COMPONENTS.find((c) => c.id === id);
  if (!component) throw new Error(`Layout primitive doc references unknown catalog id: ${id}`);
  return component;
}
