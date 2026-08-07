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
      { label: "Padding", note: "Defaults to none — Surface is the bare treatment other components add their own padding on top of. Card and Panel both apply padding themselves rather than inheriting Surface's — and, since DS-5A, all three read the exact same none/sm/md/lg scale from one shared map (src/lib/spacing.ts), not three independent copies." },
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
      { label: "Resizable", note: "Not a Panel capability, and not going to become one — drag-to-resize is SplitView's job (src/components/layout/SplitView.tsx, DS-3). Compose a resizable region from SplitPane/SplitDivider instead of expecting Panel itself to grow pointer-tracking state." },
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
  {
    id: "card-grid",
    name: "Card Grid",
    examples: ["Feature grids", "Stat grids", "Pipeline step collections", "Every card-based section on this docs site"],
    topics: [
      { label: "Fixed breakpoints only", note: "columns accepts exactly 2, 3, 4, or 6 — not an arbitrary count. Reach for Grid directly instead when the content needs a column count outside this set, or an auto-fit/auto-fill track." },
      { label: "Shared gap scale", note: "Reads the same sm/md/lg gap map Grid exports (src/components/layout/Grid.tsx's gapMap) — DS-5A confirmed this is one shared scale, not two independent copies that happen to agree." },
      { label: "Relationship to Grid", note: "CardGrid is Grid's fixed-breakpoint specialization for card collections specifically — same underlying CSS Grid mechanics, narrower and more opinionated API." },
    ],
    usage: "<CardGrid columns={3}>{cards}</CardGrid> — the design system's most-used layout primitive (78 usage sites as of DS-5C): reach for this by default for any card collection with a known, fixed target column count.",
    responsiveNotes: "Each fixed column count collapses through the same sm:/lg: breakpoints as Grid's own fixed mode — a 4-column grid becomes 1 column on mobile, 2 at sm:, 3 at md:, 4 at lg:.",
    commonMistakes: [
      "Reaching for Grid with a manually matched columns value instead of CardGrid when the content actually is a card collection — CardGrid communicates that intent to the next reader.",
      "Requesting an unsupported column count (e.g. 5) — CardGrid's type only accepts 2, 3, 4, or 6.",
    ],
  },
  {
    id: "content-columns",
    name: "Content Columns",
    examples: ["Not yet used anywhere in this docs site — see below"],
    topics: [
      { label: "Purpose", note: "Pairs exactly two major content blocks — e.g. long-form copy alongside a diagram or screenshot — collapsing to one stacked column on mobile. Not a general-purpose grid; use CardGrid or Grid for peer collections of three or more items." },
      { label: "Ratio", note: "even/narrow-wide/wide-narrow controls the desktop column-width split; all three stack identically on mobile, so the ratio choice only matters above the md: breakpoint." },
      { label: "Gap register", note: "Its gap scale (gap-8/12/16) sits an order of magnitude looser than every item-level gap primitive in this system — DS-5A confirmed this is deliberate: it's page-level column separation, not item spacing." },
      { label: "Adoption status", note: "Fully implemented and tested, but DS-5C's audit found zero real usage sites in this docs site today — built ahead of the page shape it's meant for, not broken or unfinished. Reach for it the next time a page needs exactly this two-block asymmetric split." },
    ],
    usage: "<ContentColumns primary={<Copy />} secondary={<Diagram />} ratio=\"narrow-wide\" /> — for a page section that is genuinely two major, asymmetric content blocks, not a peer collection.",
    responsiveNotes: "Single stacked column below md:; the ratio prop only takes effect at md: and above.",
    commonMistakes: [
      "Reaching for ContentColumns when the two children are actually same-weight peers — CardGrid columns={2} communicates that relationship more accurately than an asymmetric-implying primary/secondary split.",
      "Nesting ContentColumns inside itself to build a three-or-more-block layout — compose Grid or CardGrid instead once there are more than two blocks.",
    ],
  },
  {
    id: "container",
    name: "Container",
    examples: ["Footer", "SectionShell (composed internally, on every section of this page)"],
    topics: [
      { label: "Width bounds", note: "Four fixed max-widths (narrow/content/wide/full), each reading a --container-* token — never a hand-typed max-w-[Npx] value." },
      { label: "Relationship to SectionShell", note: "Container is the lower-level primitive SectionShell wraps directly for its own width bound — reach for Container on its own only when a caller needs the width bound without SectionShell's vertical rhythm and background (Footer is the one real example today)." },
      { label: "The gutter", note: "px-[var(--spacing-gutter)] is a fluid, clamp()-based token — Container's horizontal inset grows smoothly with viewport width rather than stepping at breakpoints." },
      { label: "Polymorphic tag", note: "as lets a caller render Container as <main>, <section>, or any other element — Footer.tsx uses the div default; a caller needing a specific landmark role sets as explicitly." },
    ],
    usage: "<Container size=\"wide\">{children}</Container> — reach for this directly only when SectionShell's vertical padding and background aren't wanted; otherwise use SectionShell, which already composes this.",
    responsiveNotes: "No breakpoint-stepped behavior — both the width bound and the gutter are either a fixed token or a fluid clamp() value at every viewport width.",
    commonMistakes: [
      "Hand-writing mx-auto max-w-* px-* directly instead of reaching for Container — the exact className combination this primitive exists to replace.",
      "Reaching for Container directly for an ordinary page section instead of SectionShell, losing that section's consistent vertical rhythm with its neighbors.",
    ],
  },
  {
    id: "section-shell",
    name: "Section Shell",
    examples: ["Every top-level section on every foundation and platform documentation page — 82 usage sites"],
    topics: [
      { label: "Vertical rhythm", note: "spacing (xs–xl) reads a fluid, clamp()-based --spacing-section-* token — the page-level rhythm scale, distinct from Stack/Inline/Grid's item-level gap scale (see this page's own Spacing section)." },
      { label: "Container composed internally", note: "Every SectionShell wraps its children directly in a Container at the given containerSize — callers never need to nest a Container themselves inside one." },
      { label: "Background tiers", note: "transparent (default)/raised/surface — the same three-tier vocabulary used for alternating section backgrounds down a long page, without introducing a fourth ad hoc background value." },
      { label: "Divider", note: "divider adds a single top border, for visually separating adjacent sections that share the same background tier and would otherwise read as one continuous block." },
    ],
    usage: "<SectionShell spacing=\"lg\" divider>{children}</SectionShell> — the default wrapper for any top-level page section; this very page uses it for every section shown above.",
    responsiveNotes: "Spacing tokens are fluid (clamp()-based) rather than breakpoint-stepped, so vertical rhythm scales smoothly with viewport height/width instead of jumping at fixed widths.",
    commonMistakes: [
      "Hand-writing a py-* value plus a manual Container wrapper instead of SectionShell, losing consistent rhythm with neighboring sections.",
      "Picking a spacing value inconsistent with the surrounding sections' own rhythm, producing visibly uneven vertical spacing down the page.",
    ],
  },
];

export function catalogEntryFor(id: string): FoundationComponent {
  const component = FOUNDATION_COMPONENTS.find((c) => c.id === id);
  if (!component) throw new Error(`Layout primitive doc references unknown catalog id: ${id}`);
  return component;
}
